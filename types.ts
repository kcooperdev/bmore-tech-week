export interface TechEvent {
  id: string;
  date: string;
  time?: string;
  location?: string;
  title: string;
  description: string;
  category: string;
  isHostedByUs?: boolean;
  link: string;
}

export enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  EVENTS = 'events',
  SUBMIT = 'submit',
  WHY = 'why'
}
