import PropTypes from "prop-types"
import "./style.scss"

const SearchField = ({ query, searchQueryHandler, setQuery }) => {
    return (
        <div className='searchInput'>
            <label htmlFor='searchField'>Search for a movie or tv show</label>
            <input
                type='text'
                placeholder='Search for a Movie or TV show...'
                id='searchField'
                name='searchbox'
                role='search'
                value={query}
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button onClick={searchQueryHandler}>Search</button>
        </div>
    )
}

SearchField.propTypes = {
    query: PropTypes.string,
    setQuery: PropTypes.func,
    searchQueryHandler: PropTypes.func,
}

export default SearchField
