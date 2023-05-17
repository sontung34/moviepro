import React from 'react'
import {BsArrowDownUp} from "react-icons/bs"
import {AiOutlineArrowDown,AiOutlineArrowUp } from "react-icons/ai"

function SortingOption({sortDate, sortRating, sortTitle, active, descend}) {
    
  return (
    <div className='flex flex-col sm:flex-row items-center mb-2 px-10'>     
      <div className={`flex items-center rounded-full px-3 py-1 mb-1 mx-2 border-2 border-customColor text-sm ${active === "date"? 'bg-green-600 font-bold text-white': 'text-green-600'} hover:cursor-pointer hover:scale-105`} onClick={sortDate}>
        <p className='mr-1'>Date </p>
        <span>
            {active === "date" ? (
                descend ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />
                ) : (
                <BsArrowDownUp />
            )}
        </span>
      </div>
      <div className={`flex items-center rounded-full px-3 py-1 mb-1 mx-2 border-2 border-customColor text-sm ${active === "rating"? 'bg-green-600 font-bold text-white': 'text-green-600'} hover:cursor-pointer hover:scale-105`} onClick={sortRating}>
        <p className='mr-1'>Rating </p>
        <span>
            {active === "rating" ? (
                descend ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />
                ) : (
                <BsArrowDownUp />
            )}
        </span>
      </div>
      <div className={`flex items-center rounded-full px-3 py-1 mb-1 mx-2 border-2 border-customColor text-sm ${active === "title"? 'bg-green-600 font-bold text-white': 'text-green-600'} hover:cursor-pointer hover:scale-105`} onClick={sortTitle}>
        <p className='mr-1'>Title </p>
        <span>
            {active === "title" ? (
                descend ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />
                ) : (
                <BsArrowDownUp />
            )}
        </span>
      </div>

    </div>

  )
}

export default SortingOption
