import React, { useEffect, useState } from 'react'
import './style.css'
import Card from '../card/Card';

const ITEMS_PER_PAGE = 10;

function Pagination() {
    const [items, setItems] = useState([]);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    function handlePageClick(pageNo) {
        return () => {
            setCurrentPage(pageNo)
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

    // Slice items based on current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const visibleItems = items.slice(startIndex, endIndex);


    return (
        <div>
            <h1>Recipe List</h1>

            <div className="content">
                {visibleItems.map(item => (
                    <Card key={item.id} name={item.name} image={item.image} />
                ))}
            </div>

            <div className="pages">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    Prev
                </button>

                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? 'active' : ''}
                    >
                        {page}
                    </button>
                ))}

                <button
                    disabled={currentPage === pages.length}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Pagination