import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/index.css";
import { ChatbotWidget } from "@/components/ChatbotWidget";

function ChatbotDemo() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-foreground">AI Chatbot Demo</h1>
            <p className="text-sm text-muted-foreground">Talk to the assistant about your health schedule.</p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-10">
          <p className="text-muted-foreground">
            Use the chat button at the bottom-right to open the assistant. It can reference your timeline entries if present.
          </p>
        </main>
        <ChatbotWidget />
      </div>
    </TooltipProvider>
  );
}

createRoot(document.getElementById("root")!).render(<ChatbotDemo />);


