import axios from 'axios';

const categoryService = {
  async getAllCategories() {
    return axios.get('http://localhost:8000/categories');
  }
};

export default categoryService;
