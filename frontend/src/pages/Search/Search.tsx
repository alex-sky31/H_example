import React, { useEffect, useState } from 'react';
import './Search.css';
import categoryService from '../../API/categories/Categories.service';
import locationService from '../../API/locations/Locations.service';
import { Location } from '../../API/locations/Location.entity';
import { Category } from '../../API/categories/Category.entity';

import Card from '../../components/Card/Card';

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {
  const [location, setLocation] = useState<Location[]>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locations = await locationService.getAllLocation();
        const categories = await categoryService.getAllCategories();
        setLocation(locations.data);
        setCategories(categories.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const sortableCategoriesAndLocations = (
    dataCategories: Category[],
    dataLocations: Location[]
  ) => {
    return dataCategories.reduce(
      (acc: { category: Category; lc: Location[] }[], currentCategory: Category) => {
        const tmp = dataLocations?.filter(
          (location: { categoryId: number }) => location.categoryId === currentCategory.id
        );
        acc.push({ category: currentCategory, lc: tmp });
        return acc;
      },
      []
    );
  };

  return (
    <div className="search">
      {categories &&
        location &&
        sortableCategoriesAndLocations(categories, location).map((category: any) => (
          <div className="container" key={category.category.id}>
            <div className="Categories">{category.category.name}</div>
            <div className="CardContainer">
              {category.lc.map((location: Location) => (
                <Card data={location} key={location.id}></Card>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchPage;
