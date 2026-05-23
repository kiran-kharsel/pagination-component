import React, { useEffect, useState } from 'react'
import './style.css'

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
            {/* {items[0].name} */}
            {items.map((item) => {
                return (
                    <div key={item.id}>{item.name}</div>
                )
            })}
        </div>
        <div className="pages"></div>
    </div>
  )
}

export default Pagination