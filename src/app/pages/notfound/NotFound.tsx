import { useNavigate } from "react-router-dom";

import { Button } from "@/app/components/ui/button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="container flex-grow flex flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-5">
        <span className="text-3xl py-3 px-5 dark:border-zinc-600 border-r">404</span>
        <span>This page could not be found.</span>
      </div>

      <Button onClick={() => navigate(-1)}>
        Go Back
      </Button>

    </div>
  );
}
