import { z } from "zod";
import { TemplateTopic, QuestionType } from "@/enums";

export const templateSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(500, "Description is too long"),
    topic: z.nativeEnum(TemplateTopic, {
      errorMap: () => ({ message: "Invalid topic" }),
    }),
    type: z.enum(["private", "public"], {
      errorMap: () => ({
        message: "Template type must be either private or public",
      }),
    }),
    questions: z
      .array(
        z
          .object({
            order: z.number().int().positive(),
            questionText: z.string().min(1, "Question text is required"),
            type: z.nativeEnum(QuestionType, {
              errorMap: () => ({ message: "Invalid question type" }),
            }),
            options: z.array(z.string()).default([]),
          })
          .refine(
            (question) => {
              if (
                question.type === QuestionType.MCQ ||
                question.type === QuestionType.CHECKBOX
              ) {
                return question.options.length > 0;
              }
              return true;
            },
            {
              message: "Multiple choice questions require at least one option",
              path: ["options"],
            }
          )
      )
      .min(1, "At least one question is required"),

    tags: z
      .array(z.string())
      .min(1, "At least one tag is required")
      .max(10, "Maximum 10 tags allowed"),

    users: z.array(z.number().int().positive()).optional().default([]),
  })
  .refine((data) => data.users.length > 0 || data.type !== "private", {
    message: "Users are required for private templates",
    path: ["users"],
  });

export type TemplateSchema = z.infer<typeof templateSchema>;
