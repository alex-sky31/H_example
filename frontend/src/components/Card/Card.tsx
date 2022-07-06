import React from 'react';
import './Card.css';
import Location from '../../interface/Location'

type CardProps = {
  data: Location
};

const Card = (props: CardProps) => {
  return (
    <div className="card">
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
