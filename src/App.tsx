import { useState } from "react";
import { Form } from "./components/Form";
import { Board } from "./components/Board";

export default function App() {
  const [board, setBoard] = useState<number[]>([1, 2, 3, 5, 0, 6, 4, 7, 8]);

  return (
    <main className="bg-zinc-900 text-zinc-50 min-h-screen flex items-center justify-center p-8">
      <div className="grid grid-cols-4 gap-8 w-full max-w-6xl">
        <section className="flex items-center justify-center col-span-1">
          <Form initialBoard={board} setBoard={setBoard} />
        </section>

        <section className="flex items-center justify-center col-span-2">
          <Board board={board} />
        </section>

        <section className="flex items-center justify-center col-span-1">
          Results
        </section>
      </div>
    </main>
  );
}
