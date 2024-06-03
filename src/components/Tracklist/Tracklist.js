import React from 'react';
import Track from "../Track/Track";

function TrackList({ tracks, action, isPlaylist, selectedTracks }) {
    return (
        <div className="tracklist-container">
            {tracks.map(track => (
                <Track key={track.id} isSelected={isPlaylist ? [] : selectedTracks.includes(track.id)} track={track} action={action} isPlaylist={isPlaylist} />
            ))}
        </div>

    )
}

export default TrackList;