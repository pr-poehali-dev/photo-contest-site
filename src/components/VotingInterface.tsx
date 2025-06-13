import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

interface Photo {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  imageUrl: string;
  currentScore?: number;
  voted?: boolean;
}

interface VotingInterfaceProps {
  photo: Photo;
  onVote?: (photoId: string, score: number, comment: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function VotingInterface({
  photo,
  onVote,
  onNext,
  onPrevious,
}: VotingInterfaceProps) {
  const [selectedScore, setSelectedScore] = useState<number>(
    photo.currentScore || 0,
  );
  const [comment, setComment] = useState("");
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (selectedScore === 0) {
      alert("Пожалуйста, выберите оценку");
      return;
    }

    setIsVoting(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Симуляция отправки
    onVote?.(photo.id, selectedScore, comment);
    setIsVoting(false);
    setComment("");
  };

  const scoreButtons = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Фотография */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-96 object-cover rounded-t-lg"
            />
            {photo.voted && (
              <Badge className="absolute top-4 right-4 bg-green-500">
                <Icon name="CheckCircle" size={16} className="mr-1" />
                Оценено
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Информация о фото */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{photo.title}</CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${photo.author}`}
                    />
                    <AvatarFallback>{photo.author[0]}</AvatarFallback>
                  </Avatar>
                  <span>{photo.author}</span>
                </div>
                <Badge variant="secondary">{photo.category}</Badge>
              </div>
            </div>
            {photo.currentScore && (
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {photo.currentScore}
                </div>
                <div className="text-sm text-muted-foreground">ваша оценка</div>
              </div>
            )}
          </div>
        </CardHeader>
        {photo.description && (
          <CardContent>
            <p className="text-muted-foreground">{photo.description}</p>
          </CardContent>
        )}
      </Card>

      {/* Оценка */}
      <Card>
        <CardHeader>
          <CardTitle>Оценка работы</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Кнопки оценок */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              Выберите оценку от 1 до 10
            </label>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {scoreButtons.map((score) => (
                <Button
                  key={score}
                  variant={selectedScore === score ? "default" : "outline"}
                  size="lg"
                  onClick={() => setSelectedScore(score)}
                  className="aspect-square"
                >
                  {score}
                </Button>
              ))}
            </div>
          </div>

          {/* Комментарий */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Комментарий (необязательно)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ваши комментарии к работе..."
              rows={3}
            />
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3">
            <Button onClick={onPrevious} variant="outline" className="flex-1">
              <Icon name="ChevronLeft" size={16} className="mr-2" />
              Предыдущая
            </Button>
            <Button
              onClick={handleVote}
              disabled={selectedScore === 0 || isVoting}
              className="flex-1"
            >
              {isVoting
                ? "Сохранение..."
                : photo.voted
                  ? "Обновить оценку"
                  : "Оценить"}
            </Button>
            <Button onClick={onNext} variant="outline" className="flex-1">
              Следующая
              <Icon name="ChevronRight" size={16} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
