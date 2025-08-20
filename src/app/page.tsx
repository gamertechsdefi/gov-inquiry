
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <section className="flex flex-col p-8 text-center items-center justify-center h-screen">
          <h1 className="text-4xl font-bold pb-4">NACOS GIA</h1>
          <p className="text-lg">This is a goverment inquiries assistant chatbot built from the NACOS Mapoly Department</p>
          <Link href="/chat" className="bg-green-700 text-white font-bold px-4 py-2 rounded-md mt-4">Get Started</Link>
        </section>
      </main>
    </div>
  );
}
