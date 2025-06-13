export interface Photo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  participantId: string;
  participantName: string;
  uploadedAt: Date;
  category: string;
  votes: Vote[];
  averageScore: number;
  status: "pending" | "approved" | "rejected";
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: Date;
  paymentStatus: PaymentStatus;
  photosSubmitted: number;
  maxPhotos: number;
}

export interface Judge {
  id: string;
  name: string;
  email: string;
  specialization: string;
  votedPhotos: string[];
  totalVotes: number;
}

export interface Vote {
  id: string;
  photoId: string;
  judgeId: string;
  score: number; // 1-10
  comment?: string;
  votedAt: Date;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  votingEndDate: Date;
  categories: string[];
  entryFee: number;
  maxPhotosPerParticipant: number;
  status: "upcoming" | "active" | "voting" | "completed";
}

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type UserRole = "participant" | "judge" | "admin";
