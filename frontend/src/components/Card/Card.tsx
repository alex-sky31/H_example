import React from 'react';
import './Card.css';
import { Location } from '../../API/locations/Location.entity';
import { useSetRecoilState } from 'recoil';
import { currentLocationStore } from '../../stores/Location.store';
import { useNavigate } from 'react-router-dom';

type CardProps = {
  data: Location;
};

const Card = (props: CardProps) => {
  const setCurrentLocation = useSetRecoilState(currentLocationStore);
  const navigate = useNavigate();
  return (
    <div
      className="card"
      onClick={() => {
        console.log(location, 'location');
        setCurrentLocation(props.data);
        navigate(`/display/${props.data.id}`);
      }}>
      <div>
        <img className="CardImage2" src={props.data.picture}></img>
      </div>
      <div className="Data">
        <div className="TrendTop">{props.data.title}</div>
        <div className="D2P"> {props.data.location}</div>
        <div className="Like">€ {props.data.price} night</div>
        <div className="Like1">{props.data.numberOfRooms} Roome</div>
      </div>
    </div>
  );
};

export default Card;
