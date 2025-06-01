export interface User {
  id: number;
  nickname: string;
  fullName: string;
  email: string;
  password: string;
  favProjectIds: number[];
}