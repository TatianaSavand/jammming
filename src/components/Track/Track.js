import React from 'react';

function Track({track, action, isPlaylist, isSelected}) {

    const artists = () => {
        const lastIndex = track.artists.length - 1;
        return track.artists.map((artist, index) => {
            return (<span key={artist.id}>
                    {artist.name}{index !== lastIndex && ", "}
                </span>)
        })
    }

    return (
        <div className="track-container">
            <div className="track-info">
                <div className="track-text">
                    <h3 className="track-name">{track.name}</h3>
                    <p className="track-artist-album">
                        {artists().map(item => item)} | {track.album.name}
                    </p>
                </div>
                <button className={`icon-button ${isPlaylist ? 'remove' : ''}`}
                        onClick={() => action(track, isPlaylist)}>
                    {
                        isPlaylist
                            ? '-'
                            : (<>
                                    {
                                        isSelected ? '✓' : '+'
                                    }
                                </>
                            )
                    }
                </button>
            </div>
        </div>
    )
}

export default Track;