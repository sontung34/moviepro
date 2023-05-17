import React from 'react'

const MovieItem = ({
  title, 
  poster, 
  overview, 
  language, 
  release, 
  rating, 
  id, 
  showPlot,
  handleShowPlot

}) => {

    return (
      <div className="flex items-center justify-center my-4 p-2 w-full mx-auto shadow-lg rounded-lg bg-custom-color">
        <div className="w-1/3 text-customColor">
          <img src={poster} 
            alt={`poster of ${title}`}
            className='h-1/2 w-3/4'
            />
        </div>
        <div className="flex-1 flex flex-col">
          <div>
            <h1 className="font-bold text-xs md:text-base mb-2">{title}</h1>
            <p className="md:mb-2 text-xs md:text-lg">Language: {language.toUpperCase()}</p>
            <p className="md:mb-2 text-xs md:text-lg">Release: {release}</p>
            <p className="md:mb-2 text-xs md:text-lg">Rating: {rating.toFixed(2)}⭐</p>
            <p className={`${showPlot ? "block":"hidden"} lg:block text-xs md:text-lg`}>Overview: {overview}</p>
            <p className='text-xs md:text-sm lg:hidden hover:text-green-500 hover:cursor-pointer font-light' onClick={() => handleShowPlot(id)}>{showPlot? "Hide plot":"Show plot"}</p>
          </div>
        </div>
      </div>
    )
  }
  
  
  

export default MovieItem
