import { useEffect, useState } from "react";

export function useDebounce() {
  const [state, setState] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(state);
    }, 300);

    return () => clearTimeout(timer);
  }, [state]);

  return { state, setState, debounced };
}
