import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Result } from "../types/result";
import { bestFirst } from "../utils/solve";

type FormProps = {
  initialBoard: number[];
  setBoard: (board: number[]) => void;
  setResult: (result: Result | null) => void;
};

export function Form({ initialBoard, setBoard, setResult }: FormProps) {
  const [finalState, setFinalState] = useState("123456780");
  const [heuristic, setHeuristic] = useState("manhattan");
  const [algorithm, setAlgorithm] = useState("astar");
  const [level, setLevel] = useState("first");

  function handleSuffle() {
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    setBoard(array);
    setResult(null);
  }

  function handleSolve(event: React.FormEvent) {
    event.preventDefault();
    let result: Result | null = null;
    if (algorithm === "astar") {
      // Calma
    } else {
      result = bestFirst(initialBoard, finalState, heuristic, level);
    }

    setResult(result);
  }

  return (
    <form className="flex flex-col w-sm p-4" onSubmit={handleSolve} action="">
      <button
        className="bg-zinc-700 hover:bg-zinc-600 font-semibold rounded-md py-2 px-2 hover:cursor-pointer mb-2"
        onClick={handleSuffle}
        type="button"
      >
        Embaralhar
      </button>

      <label className="text-md font-semibold mb-1" htmlFor="finalState">
        Estado final
      </label>
      <input
        className="rounded-md outline-none bg-zinc-700 text-md border-2 border-zinc-600 focus-within:border-indigo-600 transition py-1 px-2 mb-2"
        id="finalState"
        type="text"
        value={finalState}
        onChange={(e) => setFinalState(e.target.value)}
      />

      <label className="text-md font-semibold mb-1" htmlFor="heuristic">
        Função de avaliação
      </label>
      <div className="relative mb-2">
        <select
          id="heuristic"
          value={heuristic}
          onChange={(e) => setHeuristic(e.target.value)}
          className="appearance-none w-full rounded-md hover:cursor-pointer bg-zinc-700 text-md border-2 border-zinc-600 focus:border-indigo-600 transition py-1 px-2"
        >
          <option value="misplaced">Peças fora do lugar</option>
          <option value="manhattan">Distância Manhattan</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
      </div>

      <label className="text-md font-semibold mb-1" htmlFor="algorithm">
        Algoritmo de busca
      </label>
      <div className="relative mb-2">
        <select
          id="algorithm"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="appearance-none w-full rounded-md hover:cursor-pointer bg-zinc-700 text-md border-2 border-zinc-600 focus:border-indigo-600 transition py-1 px-2"
        >
          <option value="astar">A*</option>
          <option value="bestfirst">Best-First</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
      </div>

      <label className="text-md font-semibold mb-1" htmlFor="level">
        Nível
      </label>
      <div className="relative mb-4">
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="appearance-none w-full rounded-md hover:cursor-pointer bg-zinc-700 text-md border-2 border-zinc-600 focus:border-indigo-600 transition py-1 px-2"
        >
          <option value="first">1º nível</option>
          <option value="second">2º nível</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" />
      </div>

      <button
        className="bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-md py-2 px-2 hover:cursor-pointer"
        type="submit"
      >
        Resolver
      </button>
    </form>
  );
}
