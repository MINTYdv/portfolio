"use client";

import { useCallback, useState } from "react";
import { Footer } from "@/components/common/Footer";
import { MessagesApp } from "@/components/messages/MessagesApp";
import { NotesApp } from "@/components/notes/NotesApp";
import type { NoteContent } from "@/types/note";

type View = "messages" | "notes";

const TRANSITION_CLASSES = "absolute inset-0 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]";

export function PhoneContent() {
  const [view, setView] = useState<View>("messages");
  const [activeNote, setActiveNote] = useState<NoteContent | null>(null);

  const openNote = useCallback((note: NoteContent) => {
    setActiveNote(note);
    setView("notes");
  }, []);

  const closeNote = useCallback(() => {
    setView("messages");
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          aria-hidden={view === "notes"}
          inert={view === "notes" ? true : undefined}
          className={`${TRANSITION_CLASSES} ${view === "notes" ? "-translate-x-full" : "translate-x-0"}`}
        >
          <MessagesApp onOpenNote={openNote} />
        </div>
        <div
          aria-hidden={view === "messages"}
          inert={view === "messages" ? true : undefined}
          className={`${TRANSITION_CLASSES} ${view === "notes" ? "translate-x-0" : "translate-x-full"}`}
        >
          {activeNote && <NotesApp note={activeNote} onBack={closeNote} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
