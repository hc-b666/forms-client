import { Button } from "@/components/ui/button";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";

export function ErrorPage(error: any) {
  let errorMessage = "An error occurred";

  if (error && error.error.data && error.error.data.message) {
    errorMessage = error.error.data.message;
  }

  return (
    <div className="container flex-grow flex justify-center">
      {errorMessage}
    </div>
  );
}

interface ErrorMessageProps {
  error: FetchBaseQueryError | SerializedError;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  const navigate = useNavigate();
  let message = "An unexpected error occurred";

  if ("status" in error) {
    switch (error.status) {
      case 403:
        message = "You do not have permission";
        break;
      case 404:
        message = "Template not found";
        break;
      case 500:
        message = "Server error occurred";
        break;
      default:
        break;
    }
  } else {
    message = error.message || "An error occurred";
  }

  return (
    <div className="container w-full flex flex-col items-center justify-center gap-3">
      <p>{message}</p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
}
