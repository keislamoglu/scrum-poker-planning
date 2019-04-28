export interface Session {
  id: string; // guid
  slug: string; // default is guid but customizable.
  name: string; // max-length 200, not-empty
  numberOfVoters: number; // empty or 0 unacceptable, only numbers acceptable
  activeStoryId: string;
}
