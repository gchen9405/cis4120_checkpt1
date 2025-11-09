import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/index.css";
import { AddEntryDialog } from "@/components/AddEntryDialog";
import { useEntriesStore } from "@/store/entries";
import { TimelineEntry, TimelineEntryData, EntryStatus } from "@/components/TimelineEntry";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

function AddEntryDemo() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const entries = useEntriesStore((s) => s.entries);
  const addEntry = useEntriesStore((s) => s.addEntry);
  const setStatus = useEntriesStore((s) => s.setStatus);

  const selectedDateStr = useMemo(() => format(selectedDate, "yyyy-MM-dd"), [selectedDate]);
  const filteredEntries = useMemo(
    () => entries.filter((e) => e.date === selectedDateStr),
    [entries, selectedDateStr]
  );

  const handleAddEntry = (entry: Omit<TimelineEntryData, "id">) => {
    addEntry(entry);
  };

  const handleStatusChange = (id: string, status: EntryStatus) => {
    setStatus(id, status);
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Add Entry Demo</h1>
              <p className="text-sm text-muted-foreground">
                Create a new medication, lab result, or appointment and see it on the timeline.
              </p>
            </div>
            <AddEntryDialog onAddEntry={handleAddEntry} />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 space-y-6">
          <div className="rounded-lg border bg-card/50 p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Entries for selected date</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm text-muted-foreground">Change date</label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDateStr}
                  onChange={(e) => {
                    const val = e.target.value;
                    const d = new Date(val);
                    if (!Number.isNaN(d.getTime())) setSelectedDate(d);
                  }}
                />
              </div>
            </div>

            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No entries yet for this date.</p>
              </div>
            ) : (
              <div className="space-y-0">
                {filteredEntries.map((entry) => (
                  <TimelineEntry key={entry.id} entry={entry} onStatusChange={handleStatusChange} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}

createRoot(document.getElementById("root")!).render(<AddEntryDemo />);


