import { Button } from "@/components/ui/button";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
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
  error: FetchBaseQueryError | SerializedError | undefined;
}

export function ErrorMessage({ error }: ErrorMessageProps) {

  useEffect(() => {
    document.title = "Forms | Error";
  }, []);

  const navigate = useNavigate();
  let message = "An unexpected error occurred";

  if (error && "status" in error) {
    switch (error.status) {
      case 400:
        message = (error?.data as { message: string })?.message || "Bad request";
        break;
      case 403:
        message = (error?.data as { message: string })?.message || "You do not have permission";
        break;
      case 404:
        message = (error?.data as { message: string })?.message || "Resource not found";
        break;
      case 500:
        message = (error?.data as { message: string })?.message || "Internal server error";
        break;
      default:
        break;
    }
  } else {
    message = error?.message || "An error occurred";
  }

  return (
    <div className="container w-full flex flex-col items-center justify-center gap-3">
      <p>{message}</p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
}
