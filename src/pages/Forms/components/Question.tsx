// import { useState } from "react";
// import { X } from "lucide-react";
// import { v4 as uuidv4 } from "uuid";
// import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils/stringUtils";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { SelectComponent } from "@/components/common/SelectComponent";

// const questionTypes = ["TEXT", "PARAGRAPH", "MCQ", "CHECKBOX"];

export function Question({ question }: { question: IQuestionServer }) {
  // const [questionText, setQuestionText] = useState(question.questionText);
  // const [questionType, setQuestionType] = useState(question.type);
  // const [options, setOptions] = useState(question.options);

  // const resetStates = () => {
  //   setQuestionText(question.questionText);
  //   setQuestionType(question.type);
  //   setOptions(question.options);
  // };

  // const addOption = () => {
  //   setOptions(() => [...options, { id: uuidv4(), option: "" }]);
  // };

  // const updateOption = (optionId: number | string, value: string) => {
  //   setOptions((prev) =>
  //     prev.map((option) =>
  //       option.id === optionId ? { ...option, option: value } : option
  //     )
  //   );
  // };

  // const deleteOption = (optionId: number | string) => {
  //   setOptions((prev) => prev.filter((option) => option.id !== optionId));
  // };

  // const handleUpdateQuestion = () => {
  //   const data = {
  //     id: question.id,
  //     questionText,
  //     type: questionType,
  //     order: question.order,
  //     options,
  //   };

  //   console.log(data);
  // };

  return (
    <div className="flex flex-col gap-3 items-start border rounded-md p-5">
      <div className="flex gap-1">
        <span>{question.order}.</span>
        <p>{question.questionText}</p>
      </div>
      <span>Question Type: {capitalize(question.type)}</span>
      {(question.type === "MCQ" || question.type === "CHECKBOX") && (
        <div className="flex flex-col gap-1">
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center gap-1">
              <p>{option.option}</p>
            </div>
          ))}
        </div>
      )}
      {/* <Dialog onOpenChange={() => resetStates()}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Question</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
            <DialogDescription>
              Make changes to this question here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                value={questionText}
                className="col-span-3"
                onChange={(e) => setQuestionText(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="questionType">Question Type</Label>
              <SelectComponent
                onValueChange={(v: string) =>
                  setQuestionType(v as QuestionType)
                }
                options={questionTypes}
                defaultValue={questionType}
                placeholder="Select a question type"
                label="Question Type"
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-3">
              {(questionType === "MCQ" || questionType === "CHECKBOX") && (
                <div className="flex flex-col gap-4">
                  <Label htmlFor="options">Options</Label>
                  {options.map((option, index) => (
                    <div key={option.id} className="flex items-center gap-4">
                      <Input
                        id={`option-${index}`}
                        value={option.option}
                        className="col-span-3"
                        onChange={(e) =>
                          updateOption(option.id, e.target.value)
                        }
                      />
                      <button onClick={() => deleteOption(option.id)}>
                        <X />
                      </button>
                    </div>
                  ))}
                  <Button onClick={addOption}>Add Option</Button>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleUpdateQuestion}>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
