import type { NoteContent } from "@/types/note";

interface NoteViewProps {
  note: NoteContent;
}

export function NoteView({ note }: NoteViewProps) {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-4">
      <h1 className="text-[26px] font-bold leading-tight text-black">{note.title}</h1>
      {note.subtitle && <p className="mt-1 text-[15px] text-zinc-500">{note.subtitle}</p>}

      <div className="mt-4 flex flex-col gap-4">
        {note.sections.map((section, index) => (
          <div key={section.heading ?? index}>
            {section.heading && (
              <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-zinc-400">
                {section.heading}
              </h2>
            )}
            {Array.isArray(section.body) ? (
              <ul className="flex flex-col gap-1">
                {section.body.map((item) => (
                  <li key={item} className="flex gap-2 text-[15px] leading-[1.5] text-zinc-800">
                    <span aria-hidden className="text-zinc-400">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[15px] leading-[1.5] text-zinc-800">{section.body}</p>
            )}
          </div>
        ))}
      </div>

      {note.links && note.links.length > 0 && (
        <div className="mt-6 flex flex-col gap-2 border-t border-zinc-100 pt-4">
          {note.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-[15px] font-medium text-[#007AFF]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
