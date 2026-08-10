import { education } from "@/content/education";
import { interests } from "@/content/interests";
import { skillGroups } from "@/content/skills";
import type { Experience } from "@/types/experience";
import type { NoteContent } from "@/types/note";
import type { Project } from "@/types/project";

export function projectToNote(project: Project): NoteContent {
  return {
    id: project.id,
    title: project.title,
    subtitle: project.summary,
    sections: [
      { body: project.description },
      { heading: "Problem", body: project.problem },
      { heading: "Features", body: project.features },
      { heading: "Architecture", body: project.architecture },
      { heading: "Technologies", body: project.technologies },
      { heading: "Challenges", body: project.challenges },
      { heading: "Results", body: project.results },
    ],
    links: project.githubUrl ? [{ label: "View on GitHub", url: project.githubUrl, external: true }] : undefined,
  };
}

export function experienceToNote(experience: Experience): NoteContent {
  return {
    id: experience.id,
    title: experience.company,
    subtitle: `${experience.role} · ${experience.period}`,
    sections: [
      { body: experience.description },
      { heading: "Technologies", body: experience.technologies },
      { heading: "Highlights", body: experience.achievements },
    ],
  };
}

export function educationToNote(): NoteContent {
  return {
    id: "education",
    title: "Education",
    sections: education.map((entry) => ({
      heading: `${entry.school} · ${entry.period}`,
      body: [entry.program, entry.description],
    })),
  };
}

export function skillsToNote(): NoteContent {
  return {
    id: "skills",
    title: "Skills",
    sections: skillGroups.map((group) => ({ heading: group.category, body: group.items })),
  };
}

export function interestsToNote(): NoteContent {
  return {
    id: "interests",
    title: "Interests & Hobbies",
    sections: interests.map((interest) => ({ heading: interest.title, body: interest.description })),
  };
}
