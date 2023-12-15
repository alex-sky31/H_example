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
        setCurrentLocation(props.data);
        navigate(`/display/${props.data.id}`);
      }}>
      <div>
        <img className="card__image__2" src={props.data.picture} alt={props.data.title}></img>
      </div>
      <div className="Data">
        <div className="TrendTop">{props.data.title}</div>
        <div className="D2P"> {props.data.location}</div>
        <div className="like">€ {props.data.price}night</div>
        <div className="like__1">{props.data.numberOfRooms}Room</div>
      </div>
    </div>
  );
};

export default Card;
