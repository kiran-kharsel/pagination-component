import React, { useEffect, useState } from 'react'
import './style.css'
import Card from '../card/Card';

function Pagination() {
    const [items, setItems] = useState([]);


    useEffect(()=>{
        fetch('https://dummyjson.com/recipes?limit=0&select=name,image')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setItems(data.recipes)
        })
        .catch(err => console.error(err))
    }, []);

  return (
    <div>
        <div className="content">
            {items.map((item) => {
                return (
                    <Card key={item.id} name={item.name} image={item.image}/>
                )
            })}
        </div>
        <div className="pages"></div>
    </div>
  )
}

export default Pagination