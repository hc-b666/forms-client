import { baseApi } from "@/services/baseApi";

interface CreateTemplateBody {
  title: string;
  description: string;
  topic: TemplateTopic;
  type: "public" | "private";
  questions: {
    order: number;
    questionText: string;
    type: QuestionType;
    options: string[];
  }[];
  tags: string[];
  users: number[];
}

export const createTemplateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUserByEmail: builder.query<{ id: number; email: string }[], string>({
      query: (query) => ({
        url: `user/search?query=${query}`,
        method: "GET",
      }),
    }),
    createTemplate: builder.mutation({
      query: (body: CreateTemplateBody) => ({
        url: "templates/create",
        method: "POST",
        body,
      }),
    }),
    searchTags: builder.query<ITag[], string>({
      query: (query) => ({
        url: `tags/search?query=${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSearchUserByEmailQuery,
  useCreateTemplateMutation,
  useSearchTagsQuery,
} = createTemplateApi;
