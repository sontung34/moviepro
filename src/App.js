import './index.css'
import Popcorn from "./img/popcorn.jpg"
import { useEffect, useState } from 'react'
import MovieItem from './components/MovieItem'
import SortingOption from './components/SortingOption'
import Pagination from './components/Pagination'
import Header from './components/Header'
import Footer from './components/Footer'
import Filters from './components/Filters'
import { extractYear } from './helper'
import {
  sortAscendByReleaseDate,
  sortDescendByReleaseDate,
  sortAscendByTitle,
  sortDescendByTitle,
  sortAscendByRating,
  sortDescendByRating,
  getLangList,
  getHighestValue,
  getfilteredLangList,
} from './helper'

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [result, setResult] = useState([])
  const [descend, setDescend] = useState(true)
  const [sortActive, setSortActive] = useState("")
  const [apiCalled, setApiCalled] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [moviesPerPage] = useState(20)
  const [filteredResults, setFilteredResults] = useState([])
  const [filterCriteria, setFilterCriteria] = useState({ release: 0, rate: 0, lang: [] })

  //sort
  const handleDateSort = () => {
    setDescend(!descend)
    setSortActive("date")
    descend ? setFilteredResults(sortDescendByReleaseDate(filteredResults)) :
      setFilteredResults(sortAscendByReleaseDate(filteredResults))
    setCurrentPage(1)
  }
  const handleTitleSort = () => {
    setDescend(!descend)
    setSortActive("title")
    descend ? setFilteredResults(sortDescendByTitle(filteredResults)) :
      setFilteredResults(sortAscendByTitle(filteredResults))
    setCurrentPage(1)
  }
  const handleRateSort = () => {
    setDescend(!descend)
    setSortActive("rating")
    descend ? setFilteredResults(sortDescendByRating(filteredResults)) :
      setFilteredResults(sortAscendByRating(filteredResults))
    setCurrentPage(1)
  }
  //filter
  const langList = getLangList(filteredResults)
  const handleSelect = (selectedOption) => {
    const rating = getHighestValue(selectedOption, "rating")
    const release = getHighestValue(selectedOption, "release")
    const filteredLangList = getfilteredLangList(selectedOption)
    setFilterCriteria({ rate: rating, release: release, lang: filteredLangList })
    setCurrentPage(1)

  }
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const releaseYear = currentYear - (filterCriteria.release === 0 ? 100 : filterCriteria.release)
    const filterResult = result.filter(movie => filterCriteria.lang.length === 0 ? true : filterCriteria.lang.includes(movie.original_language))
      .filter(movie => movie.vote_average > filterCriteria.rate)
      .filter(movie => extractYear(movie.release_date) > releaseYear)
    setFilteredResults(filterResult)
    console.log(filterCriteria)
  }
    , [filterCriteria, result])
  //pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredResults.slice(indexOfFirstMovie, indexOfLastMovie);
  const paginate = pageNumber => setCurrentPage(pageNumber)
  async function fetchData() {
    setSortActive("")
    if (!searchQuery) {
      return
    }
    try {
      let newResults = []
      for (let i = 1; i < 30; i++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?&api_key=6c9bb73a33ef387a3fafcdf2cfb7eec4&query=${searchQuery}&page=${i}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const { results } = await response.json();
        const updatedResult = results.map((result) => { return { ...result, showPlot: false } })
        newResults = [...newResults, ...updatedResult]
        setResult(newResults)
        setApiCalled(true)
        setCurrentPage(1)
      }
    }
    catch (error) {
      setError(error)
    }
  }
  //show plot
  const handleShowPlot = (id) => {
    const updatedResult = filteredResults.map((movie) => { return movie.id === id ? { ...movie, showPlot: !movie.showPlot } : { ...movie } })
    setFilteredResults(updatedResult)
  }
  const movieCard = currentMovies.length > 0 ? currentMovies.map(movie => <MovieItem
    key={movie.id}
    title={movie.title}
    poster={movie.poster_path ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}` : Popcorn}
    overview={movie.overview}
    language={movie.original_language}
    rating={movie.vote_average}
    release={movie.release_date}
    id={movie.id}
    handleShowPlot={handleShowPlot}
    showPlot={movie.showPlot}
  />) : (apiCalled ? <p>No result</p> : null)
  return (
    <div className="flex flex-col items-center font-display text-customColor my-24">
      <Header />
      <form className="my-4">
        <label className="flex justify-center text-xl lg:text-3xl mb-3">Search for a movie:</label>
        <div className="flex flex-col sm:flex-row">
          <input
            type="text"
            className="flex-1 sm:w-full border-2 px-4 py-2 mb-2 sm:mr-2 sm:mb-0 rounded-md hover:scale-105"
            value={searchQuery}
            placeholder='type something...'
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); fetchData(e); } }} />
          <button type="button" className="px-4 py-2 bg-green-500 text-white rounded-md hover:scale-105" onClick={fetchData}>Search</button>
        </div>
      </form>
      <SortingOption
        sortDate={handleDateSort}
        sortTitle={handleTitleSort}
        sortRating={handleRateSort}
        active={sortActive}
        descend={descend} />
      <Filters
        handleSelect={handleSelect}
        langList={langList}
      />

      <div className="flex justify-center w-2/5">
        <div className="">
          {movieCard}
        </div>
      </div>
      {error && <p>Oops failed to fetch data. {error.message}</p>}
      {filteredResults.length > moviesPerPage && <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={filteredResults.length}
        paginate={paginate}
        currentPage={currentPage}
      />}
      <Footer />
    </div>

  );
}
export default App;
