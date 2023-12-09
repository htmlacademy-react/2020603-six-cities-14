import { State } from '../../types/state';
import { UserData } from '../../types/user-data';
import { AuthStatus, NameSpace } from '../../const';

export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.User].authStatus;
export const getUserData = (state: State): UserData => state[NameSpace.User].userData;
