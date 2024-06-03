import React, {useEffect, useState} from "react";
import axios from 'axios';

import Navbar from "./components/Navbar/Navbar";
import './App.css';
import './components/Navbar/Navbar.css';
import './components/Playlist/Playlist.css';
import './components/SearchBar/SearchBar.css';
import './components/Track/Track.css';
import './components/Tracklist/Tracklist.css';
import './components/SearchReasults/SearchResults.css';
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchReasults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
const SCOPES = [
  "playlist-modify-private",
  "playlist-modify-public",
  'playlist-modify',
  // Add other scopes as needed
].join("%20"); // Join scopes with '%20' (space character in URL encoding)

function App() {
  const CLIENT_ID = "42c3d09f57334b63996e0e0b14f071e3";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("")
  const [tracks, setTracks] = useState([])

  const [playlist, setPlaylist] = useState([]);


  const searchTrack = async (event, search) => {
    event.preventDefault();
    if (!search) {
      alert("Please enter a search term");
      return;
    }

    try {
      const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: search,
          type: "track"
        }
      });

      setTracks(data.tracks.items);
    } catch (error) {
      console.error("Error searching tracks:", error);
    }
  };

  const savePlaylist = async (name, onSuccess) => {
    if (!name || playlist.length === 0) {
      alert("Please enter a name for your playlist or add tracks");
      return;
    }

    const uris = playlist.map(track => track.uri);

    try {
      // Get User ID
      const { data: user } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(user)

      // Create a New Playlist
      const { data: newPlaylist } = await axios.post(
          `https://api.spotify.com/v1/users/${user.id}/playlists`,
          {
            name: name,
            description: "Created with Jammming",
            public: false
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
      );

      // Add Tracks to the New Playlist
      await axios.post(
          `https://api.spotify.com/v1/playlists/${newPlaylist.id}/tracks`,
          {
            uris
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
      );

      setPlaylist([]);
      onSuccess();
      alert("Playlist saved successfully!");
    } catch (error) {
      console.error("Error saving playlist:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  function onAdd(track) {
    const exists = playlist.some(item => item.id === track.id);
    if (exists) {
      return;
    }
    setPlaylist([...playlist, track]);
  }

  function onRemove(track) {
    const filteredList = playlist.filter(item => item.id !== track.id);
    setPlaylist(filteredList);
  }

  function getSelected() {
    return playlist.map(track => track.id);
  }

  return (
      <div className="App">
        {!token &&
            <div className="login-page">
              <h1>Welcome to Jammming!</h1>
              <h2>Authorization</h2><a
                href={`${AUTH_ENDPOINT}?scope=${SCOPES}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
              Login to Spotify
            </a></div>
        }

        {token && (
            <>
              <Navbar logout={logout}/>
              <SearchBar searchTrack={searchTrack}/>
              <div className="container">
                {/* Search results */}
                <SearchResults selectedTracks={getSelected()} list={tracks} onAdd={onAdd}/>

                {/* Playlist */}
                <Playlist list={playlist} onRemove={onRemove} savePlaylist={savePlaylist}/>
              </div>
            </>
        )}
      </div>
  )
}

export default App;