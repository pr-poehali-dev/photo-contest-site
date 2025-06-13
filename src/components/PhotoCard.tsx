import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import type { Photo } from "@/types/contest";

interface PhotoCardProps {
  photo: Photo;
  isJudge?: boolean;
  onVote?: (photoId: string, score: number) => void;
  userVote?: number;
  showVoteControls?: boolean;
}

const PhotoCard = ({
  photo,
  isJudge = false,
  onVote,
  userVote,
  showVoteControls = false,
}: PhotoCardProps) => {
  const handleVote = (score: number) => {
    if (onVote) {
      onVote(photo.id, score);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden hover-scale transition-all duration-300 shadow-lg hover:shadow-xl">
      <div className="relative">
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(photo.status)}>
            {photo.status === "approved" && "Одобрено"}
            {photo.status === "pending" && "На модерации"}
            {photo.status === "rejected" && "Отклонено"}
          </Badge>
        </div>
        {photo.averageScore > 0 && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-yellow-400" />
              <span className="font-semibold">
                {photo.averageScore.toFixed(1)}
              </span>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-montserrat font-bold text-lg text-gray-900 mb-1">
              {photo.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Автор: {photo.participantName}
            </p>
            <p className="text-sm text-gray-500 mb-3">{photo.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{photo.category}</span>
          <span>{photo.votes.length} оценок</span>
        </div>
      </CardHeader>

      {isJudge && showVoteControls && (
        <CardContent className="pt-0">
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                Ваша оценка:
              </span>
              {userVote && <Badge variant="secondary">{userVote}/10</Badge>}
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[...Array(10)].map((_, index) => {
                const score = index + 1;
                const isSelected = userVote === score;

                return (
                  <Button
                    key={score}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleVote(score)}
                    className={`h-10 ${isSelected ? "bg-primary" : ""}`}
                  >
                    {score}
                  </Button>
                );
              })}
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Плохо</span>
              <span>Отлично</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PhotoCard;
