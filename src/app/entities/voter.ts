export interface Voter {
  id: string; // guid
  nick: string;
  sessionId: string;
  type: 'dev' | 'master';
}
