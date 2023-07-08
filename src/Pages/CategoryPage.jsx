import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination';

const CategoryPage = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const category = location.pathname.split("/").at(-1);

  return (
    <div>
        <Header/>
      <div className="w-11/12 max-w-2xl mx-auto mt-[100px] flex gap-x-2 items-center -mb-[76px]">
        <button
        onClick={() => navigation(-1)}
        className='border-2 border-gray-300 py-1 px-4 rounded-md'>
          Back
        </button>
        <h2 className='text-xl font-bold'>
          Blogs On <span className='underline'>{category}</span>
        </h2>
      </div>
      <Blogs/>
      <Pagination/>
    </div>
  )
}

export default CategoryPage