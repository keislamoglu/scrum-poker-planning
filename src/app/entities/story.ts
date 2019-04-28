export interface Story {
  id: string; // guid
  title: string;
  sessionId: string;
  point?: string; // 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 134, ?
}
