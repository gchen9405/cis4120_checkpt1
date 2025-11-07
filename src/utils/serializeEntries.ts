import type { TimelineEntryData } from "@/components/TimelineEntry";

/**
 * Robust ISO normalizer:
 * - supports "YYYY-MM-DD" + "2:30 PM" or "14:30"
 * - supports "today"/"tomorrow" in `date`
 * - if only time is provided, assumes today
 * - returns undefined if unparseable (server will filter it out)
 */
function toISO(date?: string, time?: string) {
    const todayISO = new Date().toISOString().slice(0, 10);

    let d = (date || "").trim();
    const t = (time || "").trim();

    // simple relative keywords
    const dLower = d.toLowerCase();
    if (dLower === "today") d = todayISO;
    else if (dLower === "tomorrow") {
        const tmp = new Date();
        tmp.setDate(tmp.getDate() + 1);
        d = tmp.toISOString().slice(0, 10);
    }

    // Prefer combined "date time"
    const combined = [d, t].filter(Boolean).join(" ").trim();
    if (combined) {
        const dt = new Date(combined);
        if (!Number.isNaN(dt.getTime())) return dt.toISOString();
    }

    // If only time is present, assume today
    if (!d && t) {
        const dt = new Date(`${todayISO} ${t}`);
        if (!Number.isNaN(dt.getTime())) return dt.toISOString();
    }

    // If only date is present
    if (d && !t) {
        const dt = new Date(d);
        if (!Number.isNaN(dt.getTime())) return dt.toISOString();
    }

    return undefined;
}

/**
 * Tolerates undefined input and strips to the minimal AI-facing shape.
 */
export function serializeEntriesForAI(entries?: TimelineEntryData[]) {
    const list = entries ?? [];
    return list.map((e) => ({
        id: e.id,
        type: e.type,                 // "medication" | "lab" | "appointment"
        title: e.title,
        details: e.description,
        start: toISO(e.date, e.time), // ISO or undefined (server filters)
        end: undefined,
        allDay: false,
        status: e.status,
        provider: e.provider ?? undefined,
        recurring: !!e.recurring,
    }));
}