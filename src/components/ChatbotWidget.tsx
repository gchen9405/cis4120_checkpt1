import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TimelineEntryData } from "./TimelineEntry";
import { serializeEntriesForAI } from "@/utils/serializeEntries";

interface ChatbotWidgetProps {
  entries?: TimelineEntryData[]; // make optional
}

interface Message {
  text: string;
  sender: "user" | "bot";
}

export function ChatbotWidget({ entries }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm your AI health assistant. How can I help you today?",
    },
  ]);

  const handleSend = async () => {
    const q = currentMessage.trim();
    if (!q || isLoading) return;

    const userMessage: Message = { sender: "user", text: q };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const safeEntries = entries ?? []; // guard against undefined
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q,                               // server expects "message"
          context: serializeEntriesForAI(safeEntries), // server expects "context"
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        sender: "bot",
        text: data.reply ?? "Sorry, I couldn't respond.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to get bot response:", error);
      const errorMessage: Message = {
        sender: "bot",
        text: "Sorry, I'm having trouble connecting. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 rounded-lg border bg-card shadow-lg">
          <div className="flex items-center border-b bg-medical-blue p-4">
            <h3 className="font-semibold text-white">AI Assistant</h3>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-96 space-y-4 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-2",
                  msg.sender === "user" && "justify-end"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    msg.sender === "bot"
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="max-w-[80%] rounded-lg bg-muted p-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full"></div>
                    <div className="h-2 w-2 animate-pulse rounded-full [animation-delay:0.2s]"></div>
                    <div className="h-2 w-2 animate-pulse rounded-full [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" disabled={isLoading} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn("h-14 w-14 rounded-full shadow-lg transition-all", isOpen && "rotate-0")}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}