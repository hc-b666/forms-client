import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyMutation } from "@/features/auth/services/authApi";
import { toast } from "@/hooks/use-toast";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [verifyEmail, { isLoading, isError, isSuccess }] = useVerifyMutation();

  useEffect(() => {
    const handleVerifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setMessage("Verification token not found");
        return;
      }

      try {
        const response = await verifyEmail(token).unwrap();
        toast({ description: response.message });
        setMessage(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error: any) {
        setMessage(error.response?.data?.message || "Verification failed");
      }
    };

    handleVerifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {isLoading && (
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Verifying your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please wait while we verify your email address...
            </p>
          </div>
        )}

        {isSuccess && (
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Email Verified!
            </h2>
            <p className="mt-2 text-sm text-gray-600">{message}</p>
            <p className="mt-2 text-sm text-gray-600">
              Redirecting to login page...
            </p>
          </div>
        )}

        {isError && (
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Verification Failed
            </h2>
            <p className="mt-2 text-sm text-text-red-600">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
