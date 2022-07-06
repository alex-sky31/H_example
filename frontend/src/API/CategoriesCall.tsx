import axios from 'axios';
import Cate from '../interface/Category';

export default class Category {
  public GetAllCategory() {
    const data = axios.get<Cate[]>('http://localhost:8000/categories');
    return data;
  }
}
