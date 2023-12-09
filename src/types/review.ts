import { Host } from './host';

type User = Host;

export type ReviewType = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type CommentSend = {
  comment: string;
  rating: number;
}
