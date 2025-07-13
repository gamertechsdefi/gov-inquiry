import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <section className="flex flex-col p-8 text-center items-center justify-center h-screen">
          <h1 className="text-4xl font-bold pb-4">Government Service Assistant</h1>
          <p className="text-lg">This is a chatbot that can help you with government services.</p>
          <Link href="/chat" className="bg-green-700 text-white font-bold px-4 py-2 rounded-md mt-4">Get Started</Link>
        </section>
      </main>
    </div>
  );
}
