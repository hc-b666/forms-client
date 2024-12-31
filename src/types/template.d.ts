declare global {
  interface Template {
    id: number;
    title: string;
    description: string;
    topic: TemplateTopic;
    createdAt: string;

    creator: {
      id: number;
      email: string;
    };

    responses: number;

    imageId: string;
    imageUrl: string;
  }

  interface ProfileTemplate {
    id: number;
    title: string;
    description: string;
    topic: TemplateTopic;

    createdAt: Date;

    responses: number;
    likes: number;

    tags: Tag[];
  }

  interface TemplateExtended extends Template {
    tags: {
      id: number;
      tagName: string;
    }[];

    questions: IQuestionServer[];

    accessControls: {
      id: number;
      email: string;
    }[];

    isPublic: boolean;
  }
}

export {};
