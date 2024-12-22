import { v4 as uuidv4 } from "uuid";

interface useQuestionsManagerProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export function useQuestionManager({ questions, setQuestions }: useQuestionsManagerProps) {
  const addQuestion = () => {
    const newOrder = Math.max(...questions.map((question) => question.order), 0) + 1;

    setQuestions((previousQuestions) => [
      ...previousQuestions,
      {
        id: uuidv4(),
        questionText: `Question ${previousQuestions.length + 1}`,
        type: "TEXT",
        options: [],
        order: newOrder,
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
    const updatedQuestions = questions
      .filter(question => question.id != questionId)
      .map((question, idx) => ({
        ...question,
        order: idx + 1,
      }));

    setQuestions(updatedQuestions);
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
                  ? { ...option, optionText: newValue }
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
