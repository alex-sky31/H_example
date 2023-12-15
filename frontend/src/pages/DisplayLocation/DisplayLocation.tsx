import React, { useEffect, useState } from 'react';
import './DisplayLocation.css';
import { Location } from '../../API/locations/Location.entity';

import { useRecoilValue } from 'recoil';
import { currentLocationStore } from '../../stores/Location.store';
import { useNavigate, useParams } from 'react-router-dom';
import locationService from '../../API/locations/Locations.service';

type DisplayLocationPageProps = {};

const DisplayLocationPage: React.FC<DisplayLocationPageProps> = () => {
  const currentLocation = useRecoilValue(currentLocationStore);
  const [location, setLocation] = useState<Location>();
  const [price, setPrice] = useState<number>();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataLocation = await locationService.getLocationById(id || '');
        setLocation(dataLocation.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    if (currentLocation && id) {
      setLocation(currentLocation);
    } else {
      fetchData();
    }
  }, [id, currentLocation]);

  const updateLocation = async (location: Location, updatedPrice: number) => {
    const updatedLocation = { ...location, price: updatedPrice };
    try {
      const data = await locationService.updateLocation(updatedLocation);
      setLocation(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteLocation = async (locationId: number) => {
    try {
      await locationService.deleteLocation(locationId);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {location && (
        <div className="container">
          <div>
            <img className="display" src={location?.picture} alt="Location"></img>
          </div>
          <div className="display__location">
            <div className="display__location__content">
              <p className="like__4">{location?.title}</p>
              <p className="like__2">{location?.description}</p>
              <p className="like__1">Number of Rooms: {location?.numberOfRooms}</p>
            </div>
            <div className="display__location__edit">
              <div className="like__3">€ {location?.price} per night</div>
              <div className="cards">
                <div className="container__card">
                  <div className="titre">Modify price</div>
                  <div className="pr">
                    <input
                      className="pa"
                      type="number"
                      defaultValue={location?.price}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        setPrice(parseFloat(inputValue));
                      }}
                    />
                  </div>
                  <div className="btn">
                    <button className="btn1" onClick={() => deleteLocation(location.id)}>
                      Delete
                    </button>
                    <button
                      className="btn2"
                      onClick={() => price && updateLocation(location, price)}>
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayLocationPage;
