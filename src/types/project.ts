export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  problem: string;
  features: string[];
  architecture: string;
  technologies: string[];
  challenges: string;
  results: string;
  githubUrl?: string;
  liveUrl?: string;
}
