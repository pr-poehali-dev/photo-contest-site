import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VotingInterface from "@/components/VotingInterface";
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
  averageScore?: number;
  votesCount?: number;
}

export default function JudgeDashboard() {
  const [photos] = useState<Photo[]>([
    {
      id: "1",
      title: "Закат над городом",
      description: "Великолепный закат, снятый с крыши высотного здания",
      category: "Природа",
      author: "Анна Петрова",
      imageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      currentScore: 8,
      voted: true,
      averageScore: 7.8,
      votesCount: 5,
    },
    {
      id: "2",
      title: "Портрет музыканта",
      description: "Эмоциональный портрет джазового саксофониста",
      category: "Портрет",
      author: "Михаил Сидоров",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
      voted: false,
      averageScore: 6.5,
      votesCount: 3,
    },
    {
      id: "3",
      title: "Городская геометрия",
      description: "Абстрактная композиция из архитектурных элементов",
      category: "Архитектура",
      author: "Елена Козлова",
      imageUrl:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
      voted: false,
      averageScore: 8.2,
      votesCount: 4,
    },
  ]);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [votingProgress, setVotingProgress] = useState(33); // 1 из 3 фото оценено

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  const currentPhoto = filteredPhotos[currentPhotoIndex];

  const handleVote = (photoId: string, score: number, comment: string) => {
    console.log("Голос:", { photoId, score, comment });
    setVotingProgress((prev) => Math.min(prev + 33, 100));
  };

  const handleNext = () => {
    if (currentPhotoIndex < filteredPhotos.length - 1) {
      setCurrentPhotoIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex((prev) => prev - 1);
    }
  };

  const judgeStats = {
    totalPhotos: photos.length,
    votedPhotos: photos.filter((p) => p.voted).length,
    avgScoreGiven: 8.0,
    categoriesCount: [...new Set(photos.map((p) => p.category))].length,
  };

  const categories = ["all", ...new Set(photos.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Заголовок */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Кабинет судьи</h1>
          <p className="text-gray-600">
            Оценивайте работы участников и следите за статистикой
          </p>
        </div>

        {/* Статистика судьи */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Icon
                name="Image"
                size={32}
                className="mx-auto mb-2 text-blue-500"
              />
              <div className="text-2xl font-bold">{judgeStats.totalPhotos}</div>
              <div className="text-sm text-muted-foreground">Всего фото</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Icon
                name="CheckCircle"
                size={32}
                className="mx-auto mb-2 text-green-500"
              />
              <div className="text-2xl font-bold">{judgeStats.votedPhotos}</div>
              <div className="text-sm text-muted-foreground">Оценено</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Icon
                name="Star"
                size={32}
                className="mx-auto mb-2 text-yellow-500"
              />
              <div className="text-2xl font-bold">
                {judgeStats.avgScoreGiven}
              </div>
              <div className="text-sm text-muted-foreground">Средний балл</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Icon
                name="Grid3X3"
                size={32}
                className="mx-auto mb-2 text-purple-500"
              />
              <div className="text-2xl font-bold">
                {judgeStats.categoriesCount}
              </div>
              <div className="text-sm text-muted-foreground">Категорий</div>
            </CardContent>
          </Card>
        </div>

        {/* Прогресс голосования */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={24} />
              Прогресс оценивания
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Оценено работ</span>
                <span>{Math.round(votingProgress)}%</span>
              </div>
              <Progress value={votingProgress} />
              <p className="text-sm text-muted-foreground">
                {judgeStats.votedPhotos} из {judgeStats.totalPhotos} фотографий
                оценено
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Основной контент */}
        <Tabs defaultValue="voting" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="voting">Оценивание</TabsTrigger>
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
            <TabsTrigger value="statistics">Статистика</TabsTrigger>
          </TabsList>

          <TabsContent value="voting">
            <div className="space-y-4">
              {/* Фильтр по категориям */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Категория:</span>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                        {categories
                          .filter((c) => c !== "all")
                          .map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <div className="text-sm text-muted-foreground">
                      {currentPhotoIndex + 1} из {filteredPhotos.length}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Интерфейс голосования */}
              {currentPhoto ? (
                <VotingInterface
                  photo={currentPhoto}
                  onVote={handleVote}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Icon
                      name="CheckCircle"
                      size={48}
                      className="mx-auto mb-4 text-green-500"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      Все фото оценены!
                    </h3>
                    <p className="text-muted-foreground">
                      Вы оценили все фотографии в выбранной категории
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Все фотографии</h2>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories
                      .filter((c) => c !== "all")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhotos.map((photo) => (
                  <Card
                    key={photo.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-0">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold">{photo.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {photo.author}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{photo.category}</Badge>
                          {photo.voted && (
                            <Badge className="bg-green-500">
                              <Icon
                                name="CheckCircle"
                                size={14}
                                className="mr-1"
                              />
                              Оценено
                            </Badge>
                          )}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Средний балл: {photo.averageScore}</span>
                          <span>Голосов: {photo.votesCount}</span>
                        </div>
                        {photo.currentScore && (
                          <div className="text-center">
                            <span className="text-lg font-bold text-primary">
                              Ваша оценка: {photo.currentScore}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Распределение оценок</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((score) => (
                      <div key={score} className="flex items-center gap-3">
                        <span className="w-8 text-sm">{score}</span>
                        <Progress
                          value={Math.random() * 100}
                          className="flex-1"
                        />
                        <span className="w-8 text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 20)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Статистика по категориям</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Природа</span>
                      <div className="text-right">
                        <div className="font-semibold">7.8</div>
                        <div className="text-sm text-muted-foreground">
                          средний балл
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Портрет</span>
                      <div className="text-right">
                        <div className="font-semibold">8.2</div>
                        <div className="text-sm text-muted-foreground">
                          средний балл
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Архитектура</span>
                      <div className="text-right">
                        <div className="font-semibold">7.5</div>
                        <div className="text-sm text-muted-foreground">
                          средний балл
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Активность судей</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Судья №1</span>
                      <Badge className="bg-green-500">100% оценено</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Судья №2</span>
                      <Badge className="bg-yellow-500">75% оценено</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Судья №3 (Вы)</span>
                      <Badge className="bg-blue-500">
                        {Math.round(votingProgress)}% оценено
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Топ фотографий</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {photos
                      .sort(
                        (a, b) => (b.averageScore || 0) - (a.averageScore || 0),
                      )
                      .slice(0, 5)
                      .map((photo, index) => (
                        <div key={photo.id} className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <div className="font-medium">{photo.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {photo.author}
                            </div>
                          </div>
                          <div className="text-lg font-bold text-primary">
                            {photo.averageScore}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
