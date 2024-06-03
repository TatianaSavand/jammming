import React, {useState} from 'react';
import TrackList from "../Tracklist/Tracklist";


function Playlist({list, onRemove, savePlaylist}) {
    const [name, setName] = useState("");

    function onChange(event) {
        setName(event.target.value);
    }

    function onSubmit(event) {
        savePlaylist(name, () => {
            setName("");
        });
    }

    return (
        <div className="playlist">
            <input className="playlist-name-input"
                   value={name}
                   onChange={onChange}
                   placeholder="New Playlist"/>
            <TrackList tracks={list} action={onRemove} isPlaylist={true}/>
            <button className={!name || list.length === 0 ? "btn-disabled" : "btn-save"}
                    onClick={onSubmit}
                    disabled={!name || list.length === 0}>
                SAVE TO SPOTIFY
            </button>
        </div>
    )
}

export default Playlist;