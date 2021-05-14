import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';

export default function Pagination({ allGames, page }) {
  const totalPages = Math.ceil(allGames.length / 15);
  const pagesNeighbour = 0;
  const totalNumbers = (pagesNeighbour * 2) + 3;
  const totalButtons = totalNumbers + 2;

  function range(from, to, step = 1) {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  }

  function fetchPageNumbers() {
    if (totalPages > totalButtons) {
      const startPage = Math.max(2, page - pagesNeighbour);
      const endPage = Math.min(totalPages - 1, page + pagesNeighbour);
      let pages = range(startPage, endPage);
      const hasLeft = startPage > 2;
      const hasRight = (totalPages - endPage) > 1;
      const Offset = totalNumbers - (pages.length + 1);

      switch (true) {
        case (!hasLeft && hasRight): {
          const extraPages = range(endPage + 1, endPage + Offset);
          pages = [...pages, ...extraPages, 'right'];
          break;
        };
        case (hasLeft && !hasRight): {
          const extraPages = range(startPage - Offset, startPage - 1);
          pages = ['left', ...extraPages, ...pages];
          break;
        };
        case (hasLeft && hasRight):
        default: {
          pages = ['left', ...pages, 'right'];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    else {
      return range(1, totalPages);
    }
  }
  const pagesToRender = fetchPageNumbers();
  return (
    <div className='pagination'>
      {pagesToRender.map((p, index) => {
        if (p === 'left') return (
          <Link className='previous' key={index} to={`/home?page=${(parseInt(page) - 1)}`}>
            <button>{'<'}</button>
          </Link>
        )
        if (p === 'right') return (
          <Link className='next' key={index} to={`/home?page=${(parseInt(page) + 1)}`}>
            <button>{'>'}</button>
          </Link>
        )
        return (
          <Link key={index} className='paginationLink' to={`/home?page=${p}`}><button>{p}</button></Link>
        )
      })}
    </div>
  )
}