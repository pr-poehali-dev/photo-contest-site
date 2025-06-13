import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhotoUpload from "@/components/PhotoUpload";
import Icon from "@/components/ui/icon";

interface SubmittedPhoto {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  status: "pending" | "approved" | "rejected";
  score?: number;
  feedback?: string;
  submittedAt: string;
}

export default function ParticipantDashboard() {
  const [photos, setPhotos] = useState<SubmittedPhoto[]>([
    {
      id: "1",
      title: "Закат над городом",
      category: "Природа",
      imageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
      status: "approved",
      score: 8.5,
      submittedAt: "2025-01-10",
    },
    {
      id: "2",
      title: "Портрет музыканта",
      category: "Портрет",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      status: "pending",
      submittedAt: "2025-01-12",
    },
  ]);

  const [paymentStatus] = useState<"unpaid" | "paid" | "expired">("paid");

  const handlePhotoUpload = (
    file: File,
    metadata: { title: string; description: string; category: string },
  ) => {
    const newPhoto: SubmittedPhoto = {
      id: Date.now().toString(),
      title: metadata.title,
      category: metadata.category,
      imageUrl: URL.createObjectURL(file),
      status: "pending",
      submittedAt: new Date().toISOString().split("T")[0],
    };
    setPhotos((prev) => [...prev, newPhoto]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Одобрено";
      case "rejected":
        return "Отклонено";
      default:
        return "На рассмотрении";
    }
  };

  const contestStats = {
    totalParticipants: 156,
    totalPhotos: 423,
    daysLeft: 12,
    myPhotos: photos.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Заголовок */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Кабинет участника
          </h1>
          <p className="text-gray-600">
            Управляйте своими фотографиями и следите за результатами
          </p>
        </div>

        {/* Статистика конкурса */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Icon
                name="Users"
                size={32}
                className="mx-auto mb-2 text-blue-500"
              />
              <div className="text-2xl font-bold">
                {contestStats.totalParticipants}
              </div>
              <div className="text-sm text-muted-foreground">Участников</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Icon
                name="Camera"
                size={32}
                className="mx-auto mb-2 text-green-500"
              />
              <div className="text-2xl font-bold">
                {contestStats.totalPhotos}
              </div>
              <div className="text-sm text-muted-foreground">Всего фото</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Icon
                name="Clock"
                size={32}
                className="mx-auto mb-2 text-orange-500"
              />
              <div className="text-2xl font-bold">{contestStats.daysLeft}</div>
              <div className="text-sm text-muted-foreground">Дней осталось</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Icon
                name="Image"
                size={32}
                className="mx-auto mb-2 text-purple-500"
              />
              <div className="text-2xl font-bold">{contestStats.myPhotos}</div>
              <div className="text-sm text-muted-foreground">Ваших фото</div>
            </CardContent>
          </Card>
        </div>

        {/* Статус оплаты */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="CreditCard" size={24} />
              Статус участия
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge
                  className={
                    paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"
                  }
                >
                  {paymentStatus === "paid" ? "Оплачено" : "Не оплачено"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {paymentStatus === "paid"
                    ? "Вы можете загружать фотографии"
                    : "Оплатите участие для загрузки фото"}
                </span>
              </div>
              {paymentStatus !== "paid" && <Button>Оплатить участие</Button>}
            </div>
          </CardContent>
        </Card>

        {/* Основной контент */}
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Загрузка фото</TabsTrigger>
            <TabsTrigger value="gallery">Мои фотографии</TabsTrigger>
            <TabsTrigger value="results">Результаты</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            {paymentStatus === "paid" ? (
              <PhotoUpload onUpload={handlePhotoUpload} />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Icon
                    name="Lock"
                    size={48}
                    className="mx-auto mb-4 text-muted-foreground"
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    Оплатите участие
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Для загрузки фотографий необходимо оплатить участие в
                    конкурсе
                  </p>
                  <Button>Перейти к оплате</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="gallery">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Загруженные фотографии</h2>
              {photos.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Icon
                      name="ImageOff"
                      size={48}
                      className="mx-auto mb-4 text-muted-foreground"
                    />
                    <p className="text-muted-foreground">
                      У вас пока нет загруженных фотографий
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photos.map((photo) => (
                    <Card key={photo.id}>
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
                              {photo.category}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(photo.status)}>
                              {getStatusText(photo.status)}
                            </Badge>
                            {photo.score && (
                              <div className="text-right">
                                <div className="font-bold text-lg">
                                  {photo.score}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  балл
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Загружено: {photo.submittedAt}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="results">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Результаты и статистика</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Ваши достижения</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Средний балл</span>
                    <span className="text-2xl font-bold text-primary">8.5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Место в рейтинге</span>
                    <span className="text-2xl font-bold text-primary">12</span>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Прогресс голосования</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Отзывы жюри</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="text-sm">
                        "Отличная композиция и игра света"
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Судья №3 • Закат над городом
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="text-sm">
                        "Эмоциональный портрет, хорошо передана атмосфера"
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Судья №1 • Портрет музыканта
                      </p>
                    </div>
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
