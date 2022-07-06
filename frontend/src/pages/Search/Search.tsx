import React, { useEffect, useState } from 'react';
import './Search.css';
import Location from '../../interface/Location';
import Categories from '../../interface/Category';
import Locations from '../../API/LocationCall';
import Category from '../../API/CategoriesCall';
import Card from '../../components/Card/Card';

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {
  const [location, setLocation] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Categories[]>([]);

  // Create a function to fetch all locations from database
  useEffect(() => {
    setLoading(true);
    getLoc();
    getCat();
  }, []);

  const getLoc = () => {
    let loc = new Locations();
    loc.GetAllLocation()
        .then((data: any) => {
        var tmp = data.data.sort((a: Location, b: Location) => (a.numberOfRooms > b.numberOfRooms) ? 1 : -1)
        setLocation(tmp);
        setLoading(false);
    })
    .catch((e: Error) => {
        console.log(e);
      });
  };

  const getCat = () => {
    let Cate = new Category();
    Cate.GetAllCategory().then((res: any) => {
      setCategory(res.data);
      setLoading(false);
    })
    .catch((e: Error) => {
        console.log(e);
      });
  };
 

  const toto = category.map((cat: Categories) => 
    <div className="container"> 
        <div className="Categories">{cat.name}</div> 
        <div className="CardContainer">
          {
            location.filter(location => location.categoryId == cat.id ).map(location => (
              <a href="/display" onClick={(() => { localStorage.setItem('Dataloc', JSON.stringify(location));})}> <Card data={location}></Card></a>))
           }
            </div>
    </div>
  );

  // Create a function to sort locations by categories & by number of rooms

  // Bonus: Create a search function linked to the search input in the header

  return (
    <div className="search">
      { location?.length ? (
        <div> {toto}</div>
      ) : (<div>lodaing</div>)}
      </div>
  );
};

export default SearchPage;
