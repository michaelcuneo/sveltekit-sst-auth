import { get, writable } from "svelte/store";
import { v4 as uuid } from "uuid";

export type User = {
  id: string;
  email: string;
};

export type Session = {
  id: string;
  userId: string;
};

const sessionsStore = writable<Session[]>([]);

export function createSessionById(userId: string) {
  const newSession: Session = {
    id: uuid(),
    userId,
  };

  sessionsStore.update((previousSessions) => {
    const filteredSessions = previousSessions.filter(
      (session) => session.userId !== userId
    );

    return [...filteredSessions, newSession];
  });

  return newSession;
}

// Step 3
export function validateSession(id: string) {
  const sessions = get(sessionsStore);

  const sessionResult = sessions.find((session) => session.id === id);

  if (!sessionResult) {
    throw new Error("Session does not exist");
  }

  return {
    sessionResult,
  };
}

export function signOut(id: string) {
  const sessions = get(sessionsStore);

  const sessionFound = sessions.find((session) => session.id === id);

  if (!sessionFound) {
    throw new Error("Session not found");
  }

  sessionsStore.update((previousSessions) => {
    return previousSessions.filter((session) => session != sessionFound);
  });
}