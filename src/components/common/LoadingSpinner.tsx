import { MoonLoader, PulseLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="h-screen w-full absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-70 text-white">
      <PulseLoader color="white" />
    </div>
  );
}

export function Loader() {
  return (
    <div className="w-full h-80 flex items-center justify-center">
      <MoonLoader color="black" />
    </div>
  );
}
