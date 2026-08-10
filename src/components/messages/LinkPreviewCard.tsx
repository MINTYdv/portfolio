import type { MessageAttachment } from "@/types/message";
import type { NoteContent } from "@/types/note";

interface LinkPreviewCardProps {
  attachment: MessageAttachment;
  onOpenNote: (note: NoteContent) => void;
}

const CARD_CLASSES =
  "msg-enter flex w-[220px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left shadow-sm active:bg-zinc-50";

export function LinkPreviewCard({ attachment, onOpenNote }: LinkPreviewCardProps) {
  if (attachment.kind === "external") {
    return (
      <a href={attachment.url} target="_blank" rel="noopener noreferrer" className={CARD_CLASSES}>
        <div className="border-b border-zinc-100 px-3 py-2.5">
          <p className="text-[14px] font-semibold text-black">{attachment.title}</p>
        </div>
        <div className="px-3 py-1.5 text-[11px] text-zinc-400">Tap to open</div>
      </a>
    );
  }

  const { note } = attachment;
  return (
    <button type="button" onClick={() => onOpenNote(note)} className={CARD_CLASSES}>
      <div className="border-b border-zinc-100 px-3 py-2.5">
        <p className="text-[14px] font-semibold text-black">{note.title}</p>
        {note.subtitle && <p className="mt-0.5 line-clamp-2 text-[12px] text-zinc-500">{note.subtitle}</p>}
      </div>
      <div className="px-3 py-1.5 text-[11px] text-zinc-400">Tap to open</div>
    </button>
  );
}
