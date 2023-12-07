import { atom } from 'recoil';
import { Location } from '../API/locations/Location.entity';
export const currentLocationStore = atom<Location>({
  key: 'currentLocation',
  default: undefined
});
