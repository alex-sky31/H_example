import axios, { AxiosResponse } from 'axios';

import { Location } from './Location.entity';

const locationService = {
  async getAllLocation(): Promise<AxiosResponse<Location[], any>> {
    return axios.get<Location[]>('http://localhost:8000/locations/all');
  },
  async getLocationById(id: string): Promise<AxiosResponse<Location, any>> {
    return axios.get<Location>(`http://localhost:8000/locations/${id}`);
  },
  updateLocation(location: Location) {
    console.log(location);
    const Base_URL = 'http://localhost:8000/locations/' + location.id;

    const Data = axios.patch(Base_URL, location);
    return Data;
  },
  deleteLocation(id: number) {
    const Base_URL = 'http://localhost:8000/locations/' + id;
    return axios.delete<any>(Base_URL);
  }
};
export default locationService;
