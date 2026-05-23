import React, { useEffect, useState } from 'react'
import './style.css'
import Card from '../card/Card';

const ITEMS_PER_PAGE = 10;

function Pagination() {
    const [items, setItems] = useState([]);
    const [pages, setPages] = useState([]);
    const [startPoint, setStartPoint] = useState(0);
    const [endPoint, setEndPoint] = useState(ITEMS_PER_PAGE);

    function handlePageClick(pageNo) {
        return () => {
            setEndPoint(ITEMS_PER_PAGE * pageNo);
            setStartPoint(endPoint)
        }
    }



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


    return (
        <div>
            <h1>recipe list</h1>

            <div className="content">
                {
                    items.slice(startPoint, endPoint).map((item) => {
                        return (
                            <Card key={item.id} name={item.name} image={item.image} />
                        )
                    })
                }
            </div>
            <div className="pages">
                {
                    pages.map((page) => {
                        return (
                            <button onClick={handlePageClick(page)} key={page}>{page}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Pagination