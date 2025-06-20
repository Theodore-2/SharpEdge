export interface Project {
  id: number;
  name: string;
  key?: number;
  followers?: number;
  tweets?: number;
  lists?: number;
  created?: string;
  twitter?: string;
  website?: string;
  telegram?: string;
  image?: string;
  tags?: string[];
}