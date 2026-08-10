export function TypingIndicator() {
  return (
    <div className="msg-enter flex items-start" role="status" aria-label="Lenny's assistant is typing">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-[#E9E9EB] px-4 py-3">
        <span className="typing-dot h-2 w-2 rounded-full bg-zinc-400 [animation-delay:0ms]" />
        <span className="typing-dot h-2 w-2 rounded-full bg-zinc-400 [animation-delay:150ms]" />
        <span className="typing-dot h-2 w-2 rounded-full bg-zinc-400 [animation-delay:300ms]" />
      </div>
    </div>
  );
}
