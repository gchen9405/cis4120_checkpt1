// server/index.cjs
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_KEY) {
    console.warn("⚠️  Missing GEMINI_API_KEY in .env");
}

const MODEL = "gemini-2.5-flash-lite";
const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${GEMINI_KEY}`;

const SYSTEM_RULES = `
You are Lifeline's on-device health schedule assistant.
Answer ONLY using the supplied JSON "entries". If the information isn't in entries, say:
"I don’t have that yet."
Be concise, and include concrete dates/times from the entries when relevant.
If user asks broadly ("what's coming up?"), summarize the next 5 upcoming items.
`.trim();

// Normalize an ISO datetime from separate date/time strings if needed
function toISOMaybe(e) {
    // If caller already sent ISO in e.start, just use it
    if (e.start) {
        const t = new Date(e.start);
        if (!Number.isNaN(t.getTime())) return t.toISOString();
    }
    // Otherwise try to combine e.date + e.time from your TimelineEntryData
    const date = e.date ?? "";
    const time = e.time ?? "";
    const combined = `${date} ${time}`.trim();
    if (combined) {
        const dt = new Date(combined);
        if (!Number.isNaN(dt.getTime())) return dt.toISOString();
    }
    return undefined;
}

app.post("/api/chat", async (req, res) => {
    try {
        // Accept BOTH shapes:
        const body = req.body || {};
        const question = body.question ?? body.message ?? "";
        const entriesIn = body.entries ?? body.context ?? [];

        // 🔎 Debug: what did we receive?
        console.log("POST /api/chat ► received", {
            questionLen: question.length,
            entriesInCount: Array.isArray(entriesIn) ? entriesIn.length : 0,
            firstEntry: Array.isArray(entriesIn) ? entriesIn[0] : null,
        });

        // map into compact shape, preserve raw date/time too
        const compact = (Array.isArray(entriesIn) ? entriesIn : []).map((e) => {
            // try to produce ISO start, but also keep raw fields
            const startISO = toISOMaybe(e);
            return {
                id: e.id,
                type: e.type,                 // "medication" | "lab" | "appointment"
                title: e.title,
                details: e.description,
                start: startISO,              // preferred normalized time
                rawDate: e.date ?? null,      // keep raw fields so model can use them if start missing
                rawTime: e.time ?? null,
                status: e.status,
                provider: e.provider ?? undefined,
                recurring: !!e.recurring,
                allDay: false,
            };
        });

        // widen bounds: past 365 days, next 365 days
        const now = Date.now();
        const past365 = now - 365 * 24 * 60 * 60 * 1000;
        const next365 = now + 365 * 24 * 60 * 60 * 1000;

        // Keep entries with a valid start inside range; also KEEP entries with no start (let model use rawDate/rawTime)
        const safe = compact
            .filter((e) => {
                if (!e.start) return true; // keep it, model can still use rawDate/rawTime text
                const t = new Date(e.start).getTime();
                return !Number.isNaN(t) && t >= past365 && t <= next365;
            })
            .slice(0, 500);

        console.log("POST /api/chat ► after parse", {
            compactCount: compact.length,
            safeCount: safe.length,
            firstSafe: safe[0],
        });

        // If truly nothing useful, short friendly response (prevents endless fallback)
        if (safe.length === 0 && !question.match(/hi|hello|hey/i)) {
            return res.json({
                reply:
                    "I don’t see any entries I can use yet. Try adding an appointment or medication first.",
            });
        }

        const SYSTEM_RULES = `
You are Lifeline's on-device health schedule assistant.
- If the user greets you (e.g., "hi", "hello"), reply briefly and offer help.
- Otherwise, answer ONLY using the supplied JSON "entries".
- If a record has no "start" ISO time, use its "rawDate" and "rawTime" fields to infer the scheduling info.
- If the answer isn't present, say: "I don’t have that yet."
- Be concise and include concrete dates/times from the entries when relevant.
- If the user asks broadly ("what's coming up?"), summarize the next 5 upcoming items.
`.trim();

        const grounding = JSON.stringify(safe, null, 2);
        const prompt = [
            SYSTEM_RULES,
            `TODAY_ISO: ${new Date().toISOString()}`,
            `ENTRIES (JSON):\n${grounding}`,
            `QUESTION: ${question}`,
        ].join("\n\n");

        const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
        const API_VERSION = process.env.GEMINI_API_VERSION || "v1";
        const url = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${MODEL}:generateContent?key=${GEMINI_KEY}`;

        const resp = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
            }),
        });

        if (!resp.ok) {
            const txt = await resp.text();
            console.error("Gemini error", resp.status, txt);
            return res.status(502).json({ reply: "Sorry, I'm having trouble right now." });
        }

        const data = await resp.json();
        const answer =
            data?.candidates?.[0]?.content?.parts
                ?.map((p) => p?.text)
                .filter(Boolean)
                .join("") || "I don’t have that yet.";

        return res.json({ reply: answer });
    } catch (e) {
        console.error("Server error", e);
        return res.status(500).json({ reply: "Sorry, I'm having trouble right now." });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🔊 API on http://localhost:${PORT}`));