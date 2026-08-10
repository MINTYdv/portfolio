// Gemini function-declaration schema (REST API JSON schema subset — uppercase type strings).
export interface GeminiFunctionDeclaration {
  name: string;
  description: string;
  parameters: {
    type: "OBJECT";
    properties: Record<string, { type: string; description: string }>;
    required?: string[];
  };
}

export const AI_TOOLS: GeminiFunctionDeclaration[] = [
  {
    name: "open_note",
    description:
      "Open a Notes-style page in the portfolio showing details about a project, experience, education, skills, or interests entry.",
    parameters: {
      type: "OBJECT",
      properties: {
        noteId: {
          type: "STRING",
          description:
            "The id of the note to open, exactly as given in the knowledge base (e.g. 'copapp', 'airbus', 'skills', 'education', 'interests').",
        },
      },
      required: ["noteId"],
    },
  },
  {
    name: "open_github",
    description: "Show a card linking to a project's GitHub repository.",
    parameters: {
      type: "OBJECT",
      properties: {
        url: { type: "STRING", description: "The exact GitHub URL from the knowledge base." },
      },
      required: ["url"],
    },
  },
  {
    name: "open_resume",
    description: "Show a card linking to Lenny's resume/CV.",
    parameters: {
      type: "OBJECT",
      properties: {},
    },
  },
];
