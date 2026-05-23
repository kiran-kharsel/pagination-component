import React from 'react'
import './card.css'

function Card({name, image}) {
  return (
    <div className='card'>
        <img src={image} alt="card-image" />
        <h5>{name}</h5>
    </div>
  )
}

export default Card