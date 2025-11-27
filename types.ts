export enum EraId {
  BARROC = 'barroc',
  CLASSICISME = 'classicisme',
  ROMANTICISME = 'romanticisme'
}

export interface Composer {
  name: string;
  image: string;
  notableWorks: string[];
}

export interface VideoResource {
  title: string;
  url: string;
}

export interface EraData {
  id: EraId;
  title: string;
  years: string;
  description: string;
  characteristics: string[];
  forms: string[];
  composers: Composer[];
  videoLinks: VideoResource[];
  color: string;
  image: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation?: string;
}

export interface QuizResult {
  score: number;
  total: number;
}