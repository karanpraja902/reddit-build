// Shared user type for app-wide usage
// Import via alias: import { UserType } from "@/userType"

export interface UserType {
  username: string;
  imageUrl: string;
  email: string;
  joinedAt: Date;
  isReported: boolean;
}


