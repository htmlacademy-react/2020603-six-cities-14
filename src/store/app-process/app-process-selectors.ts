import { ActiveCity } from '../../types/city';
import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getActiveCity = (state: State): ActiveCity => state[NameSpace.App].activeCity;
export const getError = (state: State): string | null => state[NameSpace.App].error;
