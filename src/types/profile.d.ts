declare global {
  interface UserProfile {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  }

  interface FilledForm {
    id: number;
    filledAt: Date;
    
    template: {
      id: number;
      title: string;
      description: string;
      topic: TemplateTopic;
      tags: string[];
    };
  }
}

export {};
