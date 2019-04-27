export interface Story {
  id: string; // guid
  title: string;
  description: string;
  sessionId: string;
  point: number; // 1-3, 5, 8, 13, 21, 34, 55, 89, 134, ?
}
