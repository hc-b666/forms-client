export interface Comment {
  id: number;
  content: string;
  createdAt: Date;

  templateId: number;

  author: {
    id: number;
    email: string;
  };
}
