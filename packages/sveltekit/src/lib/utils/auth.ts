import { get, writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';

export type User = {
	id: string;
	email: string;
};

export type Session = {
	id: string;
	userId: string;
};

const sessionsStore = writable<Session[]>([]);

/**
 * Creates a session for a user.
 *
 * @param userId The ID of the user to create a session for.
 * @returns The newly created session.
 */
export function createSessionForUser(userId: string): Session {
	// Create a new session object with a unique ID and the provided user ID.
	const session: Session = {
		id: uuid(), // Generate a unique ID for the session using the uuid package.
		userId // Use the provided user ID for the session.
	};

	// Update the sessions store by filtering out any existing sessions for the provided user,
	// and adding the new session to the list.
	sessionsStore.update((prevSessions) => [
		...prevSessions.filter((s) => s.userId !== userId), // Filter out any existing sessions for the user.
		session // Add the new session to the list.
	]);

	return session; // Return the newly created session.
}

/**
 * Validates a session by its ID.
 *
 * @param sessionId - The ID of the session to validate.
 * @returns An object containing the valid session.
 * @throws {Error} If the session does not exist.
 */
export function validateSession(sessionId: string): { session: Session } {
	// Get the current list of sessions from the store.
	const sessions = get(sessionsStore);

	// Find the session with the provided ID.
	const session = sessions.find((session) => session.id === sessionId);

	// If the session does not exist, throw an error.
	if (!session) {
		throw new Error('Session does not exist');
	}

	// Return the valid session.
	return { session };
}

/**
 * Signs out a user by removing their session from the store.
 *
 * @param sessionId - The ID of the session to sign out.
 * @throws {Error} If the session is not found.
 */
export function signOut(sessionId: string) {
	// Get the current list of sessions from the store.
	const sessions = get(sessionsStore);

	// Find the session with the provided ID.
	const sessionToRemove = sessions.find((session) => session.id === sessionId);

	// If the session does not exist, throw an error.
	if (!sessionToRemove) {
		throw new Error('Session not found');
	}

	// Update the sessions store by filtering out the session to be removed.
	sessionsStore.update((previousSessions) =>
		previousSessions.filter((session) => session !== sessionToRemove)
	);
}
