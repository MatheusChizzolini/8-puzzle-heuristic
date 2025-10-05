export interface Node {
  board: number[];
  g: number;
  h: number;
  f: number;
  parent?: Node | null;
}
