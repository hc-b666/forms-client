import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchTemplatesQuery } from "../services";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function SearchComponent() {
  const intl = useIntl();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const {
    data: suggestedTemplates = [],
    isLoading,
    isSuccess,
  } = useSearchTemplatesQuery(debouncedQuery, {
    skip: debouncedQuery.trim().length < 2,
  });

  const handleMobileToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setQuery("");
      setShowSuggestions(false);
    }
  };

  return (
    <>
      <div className="relative hidden lg:block" ref={containerRef}>
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="w-[360px] xl:w-[480px]"
          placeholder={intl.formatMessage({ id: "navbar.search" })}
        />
        {renderSuggestions()}
      </div>

      <Search onClick={handleMobileToggle} className="lg:hidden" />

      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-background z-50 p-4"
          ref={containerRef}
        >
          <div className="flex items-center gap-2 mb-4">
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="flex-1"
              placeholder={intl.formatMessage({ id: "navbar.search" })}
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMobileToggle}
              className="h-9 w-9 p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          {renderSuggestions()}
        </div>
      )}
    </>
  );

  function renderSuggestions() {
    if (!query.trim() || !showSuggestions) return null;

    return (
      <div className="flex flex-col gap-3 absolute left-0 w-full bg-background shadow-lg border rounded-md p-3 z-10 max-h-60 overflow-y-auto">
        {isLoading ? (
          <div className="text-muted-foreground">Loading...</div>
        ) : isSuccess && suggestedTemplates.length > 0 ? (
          suggestedTemplates.map((t) => (
            <Link
              to={
                user?.id === t.creator.id
                  ? `/template/${t.id}/forms`
                  : `/template/${t.id}`
              }
              key={t.id}
              className="cursor-pointer w-full hover:bg-muted p-2 rounded"
              onClick={() => {
                setShowSuggestions(false);
                setIsSearchOpen(false);
              }}
            >
              {t.title}
            </Link>
          ))
        ) : (
          <div>No templates found</div>
        )}
      </div>
    );
  }
}
