import { profile } from "@/content/profile";

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 2.5h7l4 4v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 2.5v3.5a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6.5 11h7M6.5 14h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.667c-4.602 0-8.333 3.731-8.333 8.333 0 3.682 2.389 6.804 5.702 7.906.417.077.57-.181.57-.402 0-.198-.007-.723-.011-1.42-2.319.504-2.808-1.118-2.808-1.118-.379-.964-.926-1.22-.926-1.22-.757-.517.057-.507.057-.507.837.059 1.277.859 1.277.859.744 1.275 1.953.907 2.429.693.075-.539.291-.907.53-1.116-1.852-.211-3.8-.926-3.8-4.121 0-.91.325-1.654.858-2.237-.086-.211-.372-1.059.082-2.208 0 0 .7-.224 2.293.854a7.98 7.98 0 0 1 2.088-.281c.708.003 1.421.096 2.088.281 1.592-1.078 2.291-.854 2.291-.854.455 1.149.169 1.997.083 2.208.535.583.857 1.327.857 2.237 0 3.204-1.951 3.908-3.809 4.114.299.258.567.766.567 1.544 0 1.114-.01 2.014-.01 2.288 0 .223.15.483.575.401A8.336 8.336 0 0 0 18.333 10c0-4.602-3.731-8.333-8.333-8.333Z"
      />
    </svg>
  );
}

export function MessageHeader() {
  return (
    <div className="sticky top-0 z-10 flex flex-col items-center gap-0.5 border-b border-zinc-200 bg-white px-4 pb-2 pt-1">
      <div className="absolute right-2 top-1 flex items-center gap-0.5">
        {profile.resumeUrl ? (
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume"
            className="flex h-9 w-9 items-center justify-center text-[#007AFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007AFF]"
          >
            <FileIcon />
          </a>
        ) : (
          <span aria-hidden className="flex h-9 w-9 items-center justify-center text-zinc-300">
            <FileIcon />
          </span>
        )}
        {profile.githubUrl && (
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile"
            className="flex h-9 w-9 items-center justify-center text-[#007AFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007AFF]"
          >
            <GitHubIcon />
          </a>
        )}
      </div>

      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-300 text-lg font-medium text-white"
        aria-hidden={profile.avatarUrl === null}
      >
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span>{profile.avatarInitials}</span>
        )}
      </div>
      <p className="flex items-center gap-0.5 text-[13px] font-medium text-zinc-900">
        {profile.name}
        <span className="text-zinc-400" aria-hidden>
          ›
        </span>
      </p>
      <p className="text-[12px] text-zinc-400">{profile.headline}</p>
    </div>
  );
}
