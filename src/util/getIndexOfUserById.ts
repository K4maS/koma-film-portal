import { UserType } from '../types/userTypes';

export function GetIndexOfUserById(
	usersList: UserType[],
	userId: number,
): number {
	let userIndex = 0;

	usersList.find((elem: UserType, index: number) => {
		if (elem.id === userId) {
			userIndex = index;
		}
	});
	return userIndex;
}
