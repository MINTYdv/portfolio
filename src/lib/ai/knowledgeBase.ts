import { education } from "@/content/education";
import { experiences } from "@/content/experience";
import { interests } from "@/content/interests";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";

// Small, fully-structured knowledge base sent as context on every request.
// The content is small enough that this stays cheap — no retrieval/RAG needed yet.
export function buildKnowledgeBase(): string {
  const projectsText = projects
    .map((p) => {
      const github = p.githubUrl ? `\n  GitHub: ${p.githubUrl}` : "";
      return `- id: ${p.id} | ${p.title} — ${p.summary}\n  ${p.description}\n  Technologies: ${p.technologies.join(", ")}${github}`;
    })
    .join("\n");

  const experienceText = experiences
    .map(
      (e) =>
        `- id: ${e.id} | ${e.company}, ${e.role} (${e.period})\n  ${e.description}\n  Technologies: ${e.technologies.join(", ")}`
    )
    .join("\n");

  const educationText = education
    .map((e) => `- ${e.school} — ${e.program} (${e.period}): ${e.description}`)
    .join("\n");

  const skillsText = skillGroups.map((g) => `- ${g.category}: ${g.items.join(", ")}`).join("\n");

  const interestsText = interests.map((i) => `- ${i.title}: ${i.description}`).join("\n");

  return `Profile:
${profile.name} — ${profile.headline}
${profile.tagline}
Resume available: ${profile.resumeUrl ? "yes" : "not published yet"}

Projects (use the id when calling open_note):
${projectsText}

Experience (use the id when calling open_note):
${experienceText}

Education (use open_note with id "education" for the full page):
${educationText}

Skills (use open_note with id "skills" for the full page):
${skillsText}

Interests & Hobbies (use open_note with id "interests" for the full page):
${interestsText}`;
}
