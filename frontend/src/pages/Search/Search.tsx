import React, { useEffect, useState } from 'react';
import './Search.css';
import categoryService from '../../API/categories/Categories.service';
import locationService from '../../API/locations/Locations.service';
import { Location } from '../../API/locations/Location.entity';
import { Category } from '../../API/categories/Category.entity';

import Card from '../../components/Card/Card';
import Popup from '../../components/Modal/Modal';

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {
  const [location, setLocation] = useState<Location[]>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [isPopupOpen, setPopupOpen] = useState(false);

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
  }, [isPopupOpen]);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

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
            <div className="category-header">
              <div className="categories">{category.category.name}</div>
              <button
                className="open-button"
                onClick={() => {
                  setPopupOpen(true);
                  setSelectedCategory(category.category.id);
                }}>
                Add new location
              </button>
            </div>

            <div className="card__container">
              {category.lc.map((location: Location) => (
                <Card data={location} key={location.id} />
              ))}
            </div>
            <Popup
              isOpen={isPopupOpen}
              onClose={handleClosePopup}
              categoryId={selectedCategory ?? 0}
            />
          </div>
        ))}
    </div>
  );
};

export default SearchPage;
