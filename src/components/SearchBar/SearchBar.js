import React, {useState} from 'react';

function SearchBar({ searchTrack }) {

    const [search, setSearch] = useState('');

    function handleSearch (event) {
        setSearch(event.target.value);
    }

    function onSubmit(event) {
        searchTrack(event, search.trimStart());
    }

    return (
            <form className='search-container' onSubmit={onSubmit}>
                <input className="search-input" type="text" name="serch" value={search} onChange={handleSearch} placeholder="Enter A Song Title" />
                <button className="search-button" type="submit">SEARCH</button>
            </form>
    )
}

export default SearchBar;