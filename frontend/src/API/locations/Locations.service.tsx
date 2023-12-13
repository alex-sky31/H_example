import axios, { AxiosResponse } from 'axios';

import { Location } from './Location.entity';

const locationService = {
  async getAllLocation(): Promise<AxiosResponse<Location[], any>> {
    return axios.get<Location[]>('http://localhost:8000/locations/all');
  },
  async getLocationById(id: string): Promise<AxiosResponse<Location, any>> {
    return axios.get<Location>(`http://localhost:8000/locations/${id}`);
  },
  async updateLocation(location: Location) {
    const Base_URL = 'http://localhost:8000/locations/' + location.id;
    return await axios.patch(Base_URL, location);
  },
  async deleteLocation(id: number) {
    const Base_URL = 'http://localhost:8000/locations/' + id;
    return axios.delete<Location>(Base_URL);
  },

  async createLocation(location: {
    price?: number;
    description?: string;
    location?: string;
    numberOfRooms?: number;
    id: number;
    stars?: number;
    title?: string;
    picture: string;
    categoryId: number;
  }) {
    const Base_URL = 'http://localhost:8000/locations/';
    return axios.post<Location>(Base_URL, location);
  }
};
export default locationService;
