import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { X } from "lucide-react";

import { useSearchTagsQuery } from "@/app/services/tagApi";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";

interface ITagsComponent {
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}

export function TagsComponent({ tags, setTags }: ITagsComponent) {
  const [tag, setTag] = useState("");
  const [debouncedTag, setDebouncedTag] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTag(tag);
    }, 300);

    return () => clearTimeout(timer);
  }, [tag]);

  const { data: suggestedTags = [], isLoading } = useSearchTagsQuery(debouncedTag, { skip: debouncedTag.trim().length < 2 });

  const handleAddTag = (tagToAdd?: ITag) => {
    const tagValue = tagToAdd ? tagToAdd.tagName : tag;
    
    if (!tags.some(t => t.tagName.toLowerCase() === tagValue.toLowerCase())) {
      setTags(p => [...p, { id: uuidv4(), tagName: tagValue }]);
      setTag("");
      setShowSuggestions(false);
    }
  };

  const handleDeleteTag = (id: string) => {
    setTags(p => p.filter(t => t.id !== id));
  };

  return (
    <div className="flex flex-col gap-3">
      <Label>Common tags or keys to your template</Label>
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {tags.map(t => <TagComponent t={t} key={t.id} handleDeleteTag={handleDeleteTag} />)}
        </div>
      )}
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3 relative">
          <Input
            value={tag}
            onChange={e => {
              setTag(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={e => e.key === "Enter" && handleAddTag()}
            placeholder="Write your tag" 
            className="w-full"
          />

          {tag.trim() && showSuggestions && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg border rounded-md p-3 z-10 max-h-60 overflow-y-auto">
              {isLoading ? (
                <div className="text-gray-500">Loading...</div>
              ) : suggestedTags.length > 0 ? (
                suggestedTags.map(t => (
                  <div key={t.id} className="cursor-pointer hover:bg-gray-100 p-2 rounded" onClick={() => handleAddTag(t)}>
                    {t.tagName}
                  </div>
                ))
              ) : (
                <div className="cursor-pointer hover:bg-gray-100 p-2 rounded" onClick={() => handleAddTag()}>
                  Create new tag: {tag}
                </div>
              )}
            </div>
          )}
        </div>
        <Button onClick={() => setTags([])}>Clear</Button>
      </div>
    </div>
  );
}

interface ITagComponent {
  t: ITag;
  handleDeleteTag: (id: string) => void;
}

function TagComponent({ t, handleDeleteTag }: ITagComponent) {
  return (
    <Badge className="flex items-center gap-1">
      {t.tagName}
      <X className="w-4 h-4" onClick={() => handleDeleteTag(t.id)} />
    </Badge>
  );
}
