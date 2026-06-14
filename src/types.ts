export interface MemoryCard {
  id: number;
  title: string;
  description: string;
  date: string;
  illustrationType: 'constellation' | 'wings' | 'rose' | 'crown' | 'universe' | 'ocean';
  glowColor: string;
}

export interface PoetryWish {
  id: number;
  verse: string;
  translation?: string;
  author?: string;
}
