import React from 'react'
import "../style-sheets/paginate.css"
export default function Paginate({countriesPerPage, allCountries, paginate, currentPage}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allCountries/10); i++) {
        pageNumbers.push(i)   
    }
  return (
    <nav>
        <ul className='pagination'>
            {pageNumbers &&
             pageNumbers.map(number =>(
                <li className='number' key={number}>
                <a  onClick={()=>paginate(number)}>
                    {number}
                </a>
                </li>
            ))}
        </ul>
    </nav>
  )
}
