export interface Vote {
  id: string; // guid
  point: number; // 1-3, 5, 8, 13, 21, 34, 55, 89, 134, ?
  voterId: string;
  storyId: string;
}
