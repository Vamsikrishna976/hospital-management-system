import { useState } from "react";
import { askAI } from "../services/ai.service";

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

export default function useAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (
    prompt: string,
    patientId?: string
  ) => {
    if (!prompt.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: prompt,
      },
    ]);

    try {
      setLoading(true);

      const res = await askAI(prompt, patientId);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.answer,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "❌ Failed to get AI response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
  };
}