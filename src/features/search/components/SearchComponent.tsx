import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

import { Input } from "@/components/ui/input";
import { useSearchTemplatesQuery } from "../services";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function SearchComponent() {
  const intl = useIntl();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    data: suggestedTemplates = [],
    isLoading,
    isSuccess,
  } = useSearchTemplatesQuery(debouncedQuery, {
    skip: debouncedQuery.trim().length < 2,
  });

  return (
    <div className="relative" ref={containerRef}>
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        className="w-[480px] hidden lg:block"
        placeholder={intl.formatMessage({ id: "navbar.search" })}
      />
      {query.trim() && showSuggestions && (
        <div className="flex flex-col gap-3 absolute top-full left-0 w-full bg-white dark:bg-zinc-800 shadow-lg border rounded-md p-3 z-10 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            isSuccess &&
            suggestedTemplates.length > 0 &&
            suggestedTemplates.map((t) => (
              <Link
                to={
                  user?.id === t.creator.id
                    ? `/template/${t.id}/forms`
                    : `/template/${t.id}`
                }
                key={t.id}
                className="cursor-pointer w-full hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2 rounded"
              >
                {t.title}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
