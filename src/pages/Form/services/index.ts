import { baseApi } from "@/services/baseApi";

interface EditResponseData {
  formId: number | undefined;
  body: {
    questionId: number;
    responseId: number;
    questionType: QuestionType;
    answer: string | null;
    optionId?: number | null;
    optionIds?: number[];
  }
}

export const formApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getForm: builder.query<FormResponses, { templateId: string; formId: string }>(
      {
        query: ({ templateId, formId }) => ({
          url: `forms/${templateId}/responses/${formId}`,
          method: "GET",
        }),
      }
    ),
    editResponse: builder.mutation<{ message: string }, EditResponseData >({
      query: ({ formId, body }) => ({
        url: `forms/${formId}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useGetFormQuery, useEditResponseMutation } = formApi;
