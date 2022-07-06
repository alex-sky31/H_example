import React, { useEffect, useState } from 'react';
import './DisplayLocation.css';
import Locations from '../../API/LocationCall';
import Location from '../../interface/Location';

type DisplayLocationPageProps = {};

const DisplayLocationPage: React.FC<DisplayLocationPageProps> = () => {
  const [location, setLocation] = useState<Location>();
  const [price, setPrice] = useState<any>();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('Dataloc') || '{}');
    if (items) {
      setLocation(items);
    }
  }, []);

  // Create a function to handle price change and persist it to database
  const handleSubmit = async () => {
    const id: number = location?.id as number;
    let UpdatePrice = new Locations;
    const data = await UpdatePrice.UpdatePriceLocation(id, price)
    console.log(data);
  };

  // Create a function to delete the location and persist it to database
  const handleSubmitD = async () => {
    console.log(location?.id);
    const id: number = location?.id as number;
    let Delete = new Locations;
    const data = await Delete.DeleteLocation(id);
    console.log(data);
  };

  return (
    <div className="Container">
      <div>
        <img className="display" src={location?.picture}></img>
      </div>
      <div className="display-location">
        <div className="display-location__content">
          <p className="Like4"> {location?.title}</p>
          <p className="Like2">{location?.description}</p>
          <p className="Like1"> Number of Roome {location?.numberOfRooms}</p>
        </div>
        <div className="display-location__edit">
          <div className="Like3">€ {location?.price} night</div>
          <div className="cards">
            <div className="ContainerCard">
              <div className="titre">Modify price</div>
              <div className="pr">
                <input className="pa" 
                              type="text" 
                              placeholder={location?.price.toString()} 
                              onChange={(e) => { setPrice(e.target.value);
                    }}></input>
              </div>
              <div className="btn">
                  <a className="btn1" href='/' onClick={handleSubmitD}>Delete</a>
                  <a className="btn2" href='/'onClick={handleSubmit}>Confirm</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayLocationPage;
