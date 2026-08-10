import { experiences } from "@/content/experience";
import { projects } from "@/content/projects";
import {
  educationToNote,
  experienceToNote,
  interestsToNote,
  projectToNote,
  skillsToNote,
} from "@/lib/content/toNoteContent";
import type { NoteContent } from "@/types/note";

// Resolves an AI-provided noteId (or a locally-known one) into renderable note content.
export function resolveNoteById(noteId: string): NoteContent | null {
  const project = projects.find((p) => p.id === noteId);
  if (project) return projectToNote(project);

  const experience = experiences.find((e) => e.id === noteId);
  if (experience) return experienceToNote(experience);

  if (noteId === "education") return educationToNote();
  if (noteId === "skills") return skillsToNote();
  if (noteId === "interests") return interestsToNote();

  return null;
}
