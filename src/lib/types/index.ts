export type Category = 'Action' | 'RPG' | 'Adventure' | 'Strategy' | 'Indie' | 'Sport' | 'Horror';

export type Platform = 'PC' | 'Xbox' | 'PlayStation' | 'Nintendo Switch';

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  category: Category;
  platforms: Platform[];
  releaseYear: number;
  developer: string;
  rating: number;
  featured: boolean;
  tags: string[]; 
}