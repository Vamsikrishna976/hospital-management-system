export interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

export interface Patient {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  mobile: string;
}