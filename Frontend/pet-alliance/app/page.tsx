import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1>
          Welcome to PetAlliance!
        </h1>
        
        <p className="mt-3 text-2xl">
          Find your perfect companion and give them a loving home.
        </p>
      </main>
     </div>
  );
}
