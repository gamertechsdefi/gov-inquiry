import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat - Nigerian Government Service Assistant",
  description: "Chat with our AI assistant for Nigerian government services in English, Yoruba, Hausa, and Igbo",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
} 