import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { QuestionCard } from "./QuestionCard";
import { Button } from "@/components/ui/button";
import { useQuestionManager } from "./hooks/useQuestionsManager";
import { useTranslations } from "@/hooks/useTranslations";

interface QuestionsManagerProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export function QuestionsManager({
  questions,
  setQuestions,
}: QuestionsManagerProps) {
  const { t } = useTranslations();

  const {
    addQuestion,
    updateQuestion,
    updateQuestionType,
    deleteQuestion,
    addOption,
    updateOption,
    deleteOption,
  } = useQuestionManager({ questions, setQuestions });

  const reorder = (
    questions: Question[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(questions);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((question, index) => ({
      ...question,
      order: index + 1,
    }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newQuestions = reorder(
      questions,
      result.source.index,
      result.destination.index
    );

    setQuestions(newQuestions);
  };

  console.log(questions);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold">{t("createtemplatepage.questions")}</h2>

        <p className="text-justify">
          {t("createtemplatepage.questions.reminder")}
        </p>
        <Droppable droppableId="questions">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${
                snapshot.isDraggingOver ? "bg-zinc-100 dark:bg-zinc-800" : ""
              } p-3 xl:p-5 flex flex-col gap-5 rounded border`}
            >
              {questions
                .sort((a, b) => a.order - b.order)
                .map((question, index) => (
                  <Draggable
                    key={question.id}
                    draggableId={question.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`select-none rounded-md ${
                          snapshot.isDragging
                            ? "bg-zinc-50 dark:bg-zinc-700"
                            : "bg-white dark:bg-zinc-950"
                        }`}
                        style={{ ...provided.draggableProps.style }}
                      >
                        <QuestionCard
                          question={question}
                          updateQuestion={updateQuestion}
                          updateQuestionType={updateQuestionType}
                          deleteQuestion={deleteQuestion}
                          addOption={addOption}
                          updateOption={updateOption}
                          deleteOption={deleteOption}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button onClick={addQuestion} type="button" variant={"secondary"}>
          {t("createtemplatepage.addquestion")}
        </Button>
      </div>
    </DragDropContext>
  );
}
