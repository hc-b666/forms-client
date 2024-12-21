import { v4 as uuidv4 } from "uuid";

interface useQuestionsManagerProps {
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
}

export function useQuestionManager({ setQuestions }: useQuestionsManagerProps) {
  const addQuestion = () => {
    setQuestions((previousQuestions) => [
      ...previousQuestions,
      {
        id: uuidv4(),
        questionText: `Question ${previousQuestions.length + 1}`,
        type: "TEXT",
        options: [],
      },
    ]);
  };

  const updateQuestion = (questionId: string, newQuestionText: string) => {
    setQuestions((previousQuestions) =>
      previousQuestions.map((question) =>
        question.id === questionId 
          ? { ...question, questionText: newQuestionText } 
          : question
      )
    );
  };

  const updateQuestionType = (questionId: string, newQuestionType: QuestionType) => {
    setQuestions((previousQuestions) =>
      previousQuestions.map((question) =>
        question.id === questionId 
          ? { ...question, type: newQuestionType } 
          : question
      )
    );
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions((previousQuestions) =>
      previousQuestions.filter((question) => question.id !== questionId)
    );
  };

  const addOption = (questionId: string) => {
    setQuestions((previousQuestions) =>
      previousQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: [
                ...question.options,
                {
                  id: uuidv4(),
                  optionText: `Option ${question.options.length + 1}`,
                },
              ],
            }
          : question
      )
    );
  };

  const updateOption = (questionId: string, optionId: string, newValue: string) => {
    setQuestions((previousQuestions) =>
      previousQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                option.id === optionId
                  ? { ...option, tagName: newValue }
                  : option
              ),
            }
          : question
      )
    );
  };

  const deleteOption = (questionId: string, optionId: string) => {
    setQuestions((previousQuestions) =>
      previousQuestions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.filter(
                (option) => option.id !== optionId
              ),
            }
          : question
      )
    );
  };

  return { 
    addQuestion, 
    updateQuestion, 
    updateQuestionType, 
    deleteQuestion, 
    addOption, 
    updateOption, 
    deleteOption 
  }; 
}
