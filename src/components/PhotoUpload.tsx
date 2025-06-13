import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface PhotoUploadProps {
  onUpload?: (
    file: File,
    metadata: { title: string; description: string; category: string },
  ) => void;
}

export default function PhotoUpload({ onUpload }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      alert("Пожалуйста, выберите изображение");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("Размер файла не должен превышать 10 МБ");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file || !title || !category) {
      alert("Заполните все обязательные поля");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Симуляция загрузки
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          onUpload?.(file, { title, description, category });
          // Сброс формы
          setFile(null);
          setPreview("");
          setTitle("");
          setDescription("");
          setCategory("");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Upload" size={24} />
          Загрузка фотографии
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Зона загрузки */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg"
              />
              <p className="text-sm text-muted-foreground">{file?.name}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Icon
                name="ImagePlus"
                size={48}
                className="mx-auto text-muted-foreground"
              />
              <div>
                <p className="text-lg font-medium">Перетащите фото сюда</p>
                <p className="text-sm text-muted-foreground">
                  или нажмите для выбора файла
                </p>
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && handleFile(e.target.files[0])
                }
                className="hidden"
                id="file-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Выбрать файл
              </Button>
            </div>
          )}
        </div>

        {/* Метаданные */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Название *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название фотографии"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Описание</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Расскажите о вашей фотографии"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Категория *</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nature">Природа</SelectItem>
                <SelectItem value="portrait">Портрет</SelectItem>
                <SelectItem value="street">Уличная фотография</SelectItem>
                <SelectItem value="architecture">Архитектура</SelectItem>
                <SelectItem value="abstract">Абстракция</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Прогресс загрузки */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Загрузка...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        {/* Кнопка отправки */}
        <Button
          onClick={handleSubmit}
          disabled={!file || !title || !category || uploading}
          className="w-full"
        >
          {uploading ? "Загружается..." : "Загрузить фотографию"}
        </Button>
      </CardContent>
    </Card>
  );
}
