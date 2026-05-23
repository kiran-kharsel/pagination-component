import React, { useEffect, useState } from 'react'
import './style.css'
import Card from '../card/Card';

const ITEMS_PER_PAGE = 10;

function Pagination() {
    const [items, setItems] = useState([]);
    const [pages, setPages] = useState([]);


    useEffect(() => {
        fetch('https://dummyjson.com/recipes?limit=0&select=name,image')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setItems(data.recipes)

                let totalPages = Math.ceil(data.recipes.length / ITEMS_PER_PAGE);
                let arr = Array.from({ length: totalPages }, (_, i) => i + 1);
                setPages(arr);
            })
            .catch(err => console.error(err))
    }, []);

    // useEffect(() => {
    //     if (items.length > 0) {
    //         let totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    //         let arr = Array.from({ length: totalPages }, (_, i) => i + 1);
    //         setPages(arr);
    //         console.log(arr);
    //     }
    // }, [])

    return (
        <div>
            <h1>recipe list</h1>

            <div className="content">
                {items.map((item) => {
                    return (
                        <Card key={item.id} name={item.name} image={item.image} />
                    )
                })}
            </div>
            <div className="pages">
                {
                    pages.map((page) => {
                        return (
                            <button key={page}>{page}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Pagination