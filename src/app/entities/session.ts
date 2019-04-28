export interface Session {
  id: string; // guid
  name: string; // max-length 200, not-empty
  numberOfVoters: number; // empty or 0 unacceptable, only numbers acceptable
  activeStoryId: string;
}
