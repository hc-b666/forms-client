declare global {
  enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
  }

  enum TemplateTopic {
    EDU = "EDU",
    QUIZ = "QUIZ",
    OTHER = "OTHER",
  }

  enum QuestionType {
    TEXT = "TEXT",
    PARAGRAPH = "PARAGRAPH",
    MCQ = "MCQ",
    CHECKBOX = "CHECKBOX",
  } 
}

export {}
