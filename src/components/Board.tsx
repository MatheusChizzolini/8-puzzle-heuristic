type BoardProps = {
  cells: number[];
};

export function Board({ cells }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 p-6">
      {cells.map((value, index) => (
        <div
          key={index}
          className={`w-30 h-30 flex items-center justify-center text-xl font-bold
            rounded-md ${value === 0 ? "invisible" : "bg-indigo-600"}`}
        >
          {value}
        </div>
      ))}
    </div>
  );
}
