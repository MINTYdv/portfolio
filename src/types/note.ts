export interface NoteLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface NoteSection {
  heading?: string;
  body: string | string[];
}

export interface NoteContent {
  id: string;
  title: string;
  subtitle?: string;
  sections: NoteSection[];
  links?: NoteLink[];
}
