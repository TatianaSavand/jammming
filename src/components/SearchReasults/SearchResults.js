import React from 'react';
import TrackList from "../Tracklist/Tracklist";

function SearchResults({list, onAdd, selectedTracks}) {

    return (
            <div className="search-result">
                <div className="result-header">Results</div>
                <TrackList tracks={list} selectedTracks={selectedTracks} action={onAdd} isPlaylist={false} />
            </div>
    )
}

export default SearchResults;
