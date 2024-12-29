import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { capitalize } from "@/lib/utils/stringUtils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEditResponseMutation } from "../services";
import { toast } from "@/hooks/use-toast";
import { QuestionType } from "@/enums";

interface ResponseProps {
  question: {
    id: number;
    questionText: string;
    type: QuestionType;
    order: number;
    options: {
      id: number;
      option: string;
    }[];
  };
  responses: {
    id: number;
    formId: number;
    questionId: number;
    answer: string | null;
    optionId: number | null;
  }[];
  authorId: number;
  refetch: () => void;
}

export function Response({ question, authorId, responses, refetch }: ResponseProps) {
  const { user } = useAuth();
  
  const [editResponse] = useEditResponseMutation();

  const currentResponse = responses.find((res) => res.questionId === question.id);
  
  const [textAnswer, setTextAnswer] = useState(currentResponse?.answer || "");
  
  const [selectedMCQOption, setSelectedMCQOption] = useState<number | null>(
    currentResponse?.optionId || null
  );
  
  const [selectedCheckboxOptions, setSelectedCheckboxOptions] = useState<number[]>(
    responses
      .filter((res) => res.questionId === question.id)
      .map((res) => res.optionId)
      .filter((id): id is number => id !== null)
  );

  const handleSave = async () => {
    let newResponse;
    
    switch (question.type) {
      case QuestionType.TEXT:
      case QuestionType.PARAGRAPH:
        newResponse = {
          questionId: question.id,
          answer: textAnswer,
          optionId: null,
          responseId: currentResponse?.id!,
          questionType: question.type,
        };
        break;
      case QuestionType.MCQ:
        newResponse = {
          questionId: question.id,
          answer: null,
          optionId: selectedMCQOption,
          responseId: currentResponse?.id!,
          questionType: question.type,
        };
        break;
      case QuestionType.CHECKBOX:
        newResponse = {
          questionId: question.id,
          answer: null,
          optionIds: selectedCheckboxOptions,
          responseId: currentResponse?.id!,
          questionType: question.type,
        };
        break;
    }
    
    try {
      const res = await editResponse({ 
        formId: currentResponse?.formId, 
        body: newResponse,
      }).unwrap();
      toast({ description: res.message });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const renderEditDialog = () => {
    let dialogContent;

    switch (question.type) {
      case "TEXT":
        dialogContent = (
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor={`text-${question.id}`}>{question.questionText}</Label>
              <Input
                id={`text-${question.id}`}
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
        );
        break;

      case "PARAGRAPH":
        dialogContent = (
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor={`paragraph-${question.id}`}>{question.questionText}</Label>
              <Textarea
                id={`paragraph-${question.id}`}
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                className="col-span-3"
                rows={5}
              />
            </div>
          </div>
        );
        break;

      case "MCQ":
        dialogContent = (
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label>{question.questionText}</Label>
              {question.options.map((option) => (
                <div key={option.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`mcq-${option.id}`}
                    name={`mcq-${question.id}`}
                    checked={selectedMCQOption === option.id}
                    onChange={() => setSelectedMCQOption(option.id)}
                  />
                  <Label htmlFor={`mcq-${option.id}`}>{option.option}</Label>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "CHECKBOX":
        dialogContent = (
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label>{question.questionText}</Label>
              {question.options.map((option) => (
                <div key={option.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`checkbox-${option.id}`}
                    checked={selectedCheckboxOptions.includes(option.id)}
                    onChange={() => {
                      setSelectedCheckboxOptions((prev) =>
                        prev.includes(option.id)
                          ? prev.filter((id) => id !== option.id)
                          : [...prev, option.id]
                      );
                    }}
                  />
                  <Label htmlFor={`checkbox-${option.id}`}>{option.option}</Label>
                </div>
              ))}
            </div>
          </div>
        );
        break;
    }

    return (
      <Dialog>
        <DialogTrigger asChild className="mt-5">
          <Button variant="outline">Edit Response</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Response</DialogTitle>
            <DialogDescription>
              Make changes to your response here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {dialogContent}
          <DialogFooter>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div key={question.id} className="border p-5 rounded-md">
      {question.type === "TEXT" && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-medium mb-1">{question.questionText}</h3>
            <span className="text-sm">{capitalize(question.type)}</span>
          </div>
          <p>{currentResponse?.answer}</p>
        </>
      )}

      {question.type === "PARAGRAPH" && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-medium mb-1">{question.questionText}</h3>
            <span className="text-sm">{capitalize(question.type)}</span>
          </div>
          <p>{currentResponse?.answer}</p>
        </>
      )}

      {question.type === "MCQ" && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-medium mb-1">{question.questionText}</h3>
            <span className="text-sm">{capitalize(question.type)}</span>
          </div>
          <div className="flex flex-col gap-2">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={currentResponse?.optionId === option.id}
                  disabled={true}
                />
                <Label>{option.option}</Label>
              </div>
            ))}
          </div>
        </>
      )}

      {question.type === "CHECKBOX" && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="font-medium mb-1">{question.questionText}</h3>
            <span className="text-sm">{capitalize(question.type)}</span>
          </div>
          <div className="flex flex-col gap-2">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={responses.some((res) => res.optionId === option.id)}
                  disabled={true}
                />
                <Label>{option.option}</Label>
              </div>
            ))}
          </div>
        </>
      )}

      {user?.id === authorId && renderEditDialog()}
    </div>
  );
}
