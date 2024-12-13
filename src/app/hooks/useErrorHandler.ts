import { useToast } from "@/app/hooks/use-toast";

export const useErrorHandler = () => {
  const { toast } = useToast();

  const handleError = (
    err: any,
    defaultMsg: string = "An unexpected error occurred",
    options?: {
      logError?: boolean;
      onError?: (message: string) => void;
    }
  ) => {
    const { logError = true, onError } = options || {};

    const errorMessage = err?.data?.message || err?.message || defaultMsg;

    if (logError) {
      console.error("Error details:", err);
    }

    toast({
      variant: "destructive",
      description: errorMessage,
    });

    onError?.(errorMessage);

    return errorMessage;
  };

  return { handleError };
};
