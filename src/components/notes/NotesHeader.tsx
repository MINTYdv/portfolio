interface NotesHeaderProps {
  onBack: () => void;
}

export function NotesHeader({ onBack }: NotesHeaderProps) {
  return (
    <div className="flex items-center border-b border-zinc-100 px-3 py-2">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to Messages"
        className="flex items-center gap-0.5 py-1 pr-2 text-[15px] text-[#007AFF]"
      >
        <ChevronLeftIcon />
        Messages
      </button>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden>
      <path
        d="M9 1 2 8l7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
