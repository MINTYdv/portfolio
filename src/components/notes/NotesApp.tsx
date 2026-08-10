import type { NoteContent } from "@/types/note";
import { NotesHeader } from "./NotesHeader";
import { NoteView } from "./NoteView";

interface NotesAppProps {
  note: NoteContent;
  onBack: () => void;
}

export function NotesApp({ note, onBack }: NotesAppProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      <NotesHeader onBack={onBack} />
      <NoteView note={note} />
    </div>
  );
}
