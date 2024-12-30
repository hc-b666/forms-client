import { ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useCreateTemplate } from "../CreateTemplateProvider";

export default function FileUpload() {
  const { file, setFile, preview, setPreview } = useCreateTemplate();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg shadow-md">
      <Label>Upload Image</Label>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            id="file-input"
            accept="image/*"
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <span className="text-gray-600">
              {file ? file.name : "Click to select file"}
            </span>
          </label>
        </div>

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};
