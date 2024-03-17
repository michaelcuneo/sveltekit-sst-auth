import { get, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { USERS } from './constants';

export const sessionStore: Writable<Session[]> = writable([]);

export const validateEmail = (email: string) => {
	const emailRegex = /[-A-Za-z0-9_.%]+@[-A-Za-z0-9.%]+\.[A-Za-z]+/gm;
	const emailRegexExec = emailRegex.exec(email);

	if (emailRegexExec && emailRegexExec[0] === email) {
		return {
			success: true
		};
	}

	return {
		error: true,
		message: 'Email is invalid'
	};
};

const createSessionById = (userId: string) => {
	const users = USERS;
	const user = users.find((user: User) => user.id === userId);

	if (!user) {
		throw new Error('User not found');
	}

	const newSession: Session = {
		id: uuidv4(),
		userId
	};

	sessionStore.update((previousSessions) => {
		const filteredSessions = previousSessions?.filter((session) => session.userId !== userId);

		return [...filteredSessions, newSession];
	});

	return newSession;
};

export const createSessionByEmail = (email: string) => {
	const emailValidationResult = validateEmail(email);

	if (emailValidationResult.error) {
		throw new Error(emailValidationResult.message);
	}

	const currentUsers = USERS;

	const userFound = currentUsers.find((user) => {
		return user.email === email;
	});

	if (!userFound) {
		throw new Error('User not found');
	}

	return createSessionById(userFound.id);
};

export const validateSession = (id: string) => {
	const sessions = get(sessionStore);
	const sessionResult = sessions.find((session) => session.id === id);

	if (!sessionResult) {
		throw new Error('Session does not exist');
	}

	const users = USERS;
	const userResult = users.find((user) => user.id === sessionResult.userId);

	if (!userResult) {
		throw new Error('User does not exist');
	}

	return {
		sessionResult,
		userResult
	};
};

export const signOut = (id: string) => {
	const session = get(sessionStore);
	const sessionFound = session.find((session) => session.id === id);

	if (!sessionFound) {
		throw new Error('Session not found');
	}

	sessionStore.update((previousSessions) => {
		return previousSessions.filter((session) => session != sessionFound);
	});
};
