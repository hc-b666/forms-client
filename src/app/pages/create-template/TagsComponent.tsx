import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { X } from "lucide-react";

import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

interface ITagsComponent {
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}

export function TagsComponent({ tags, setTags }: ITagsComponent) {
  const [tag, setTag] = useState("");

  const handleAddTag = () => {
    setTags(p => [...p, { id: uuidv4(), value: tag }]);
    setTag("");
  };

  const handleDeleteTag = (id: string) => {
    setTags(p => p.filter(t => t.id !== id));
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold">Common tags or keys to your template</h2>
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {tags.map(t => <TagComponent t={t} key={t.id} handleDeleteTag={handleDeleteTag} />)}
        </div>
      )}
      <div className="grid grid-cols-4 gap-5">
        <Input
          value={tag}
          onChange={e => setTag(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAddTag()}
          placeholder="Write your tag" 
          className="col-span-3"
        />
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
      {t.value}
      <X className="w-4 h-4" onClick={() => handleDeleteTag(t.id)} />
    </Badge>
  );
}
