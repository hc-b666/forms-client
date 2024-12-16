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
