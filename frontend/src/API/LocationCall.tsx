import axios from 'axios';
//import Loca from '../interface/Location';

export default class Location {
  public GetAllLocation() {
    const data = axios.get<any>('http://localhost:8000/locations');
    return data;
  }
  public UpdatePriceLocation(id: number, Price: string) {
    const Base_URL = 'http://localhost:8000/locations/Update';
    var tmp = Number(Price);
    const data = {
      price: tmp,
      id: id
    };
    const Data = axios.post(Base_URL, data);
    return Data;
  }
  public DeleteLocation(id: number) {
    const Base_URL = 'http://localhost:8000/locations/Delete/'+ id;
    const data = axios.post<any>(Base_URL);
    return data;
  }
}
