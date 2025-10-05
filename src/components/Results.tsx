import type { Result } from "../types/result";

type ResultsProps = {
  result: Result | null;
};

export function Results({ result }: ResultsProps) {
  return (
    <div>
      <h1 className="text-indigo-400 text-xl font-bold mb-6">Resultados</h1>

      {result?.solvable === false && (
        <span className="text-red-400 text-xl">Não solucionável!</span>
      )}

      <div className="text-lg my-4">
        <h1>Quantidade de nós visitados:</h1>
        <span>{result?.visitedNodes ? result.visitedNodes : "-"}</span>
      </div>

      <div className="text-lg mb-4">
        <h1>Tempo gasto:</h1>
        <span>{result?.time != null ? `${result.time} ms` : "-"}</span>
      </div>

      <div className="text-lg">
        <h1>Tamanho do caminho:</h1>
        <span>{result?.solutionLength ? result.solutionLength : "-"}</span>
      </div>
    </div>
  );
}
