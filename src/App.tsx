import { useState } from "react";
import { Form } from "./components/Form";
import { Board } from "./components/Board";
import { Results } from "./components/Results";
import type { Result } from "./types/result";

export default function App() {
  const [board, setBoard] = useState<number[]>([1, 2, 3, 0, 4, 6, 7, 5, 8]);
  const [result, setResult] = useState<Result | null>(null);

  return (
    <main className="bg-zinc-900 text-zinc-50 min-h-screen flex items-center justify-center flex-col p-8">
      <h1 className="text-2xl font-bold mb-8">8-Puzzle Heuristic</h1>

      <div className="grid grid-cols-4 gap-8 w-full max-w-6xl">
        <section className="flex items-center justify-center col-span-1">
          <Form
            initialBoard={board}
            setBoard={setBoard}
            setResult={setResult}
          />
        </section>

        <section className="flex items-center justify-center col-span-2">
          <Board board={board} />
        </section>

        <section className="flex items-center justify-center col-span-1">
          <Results result={result} />
        </section>
      </div>
    </main>
  );
}
