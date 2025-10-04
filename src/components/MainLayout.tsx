import { useState } from "react";
import { Board } from "./Board";
import { Form } from "./Form";

export function MainLayout() {
  const [cells, setCells] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 0]);

  return (
    <main className="bg-zinc-900 text-zinc-50 min-h-screen flex items-center justify-center p-8">
      <div className="grid grid-cols-4 gap-8 w-full max-w-6xl">
        <section className="flex items-center justify-center col-span-1">
          <Form setCells={setCells} />
        </section>

        <section className="flex items-center justify-center col-span-2">
          <Board cells={cells} />
        </section>

        <section className="flex items-center justify-center col-span-1">
          Results
        </section>
      </div>
    </main>
  );
}
