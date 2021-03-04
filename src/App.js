
import './App.css';
import React, {useState, useEffect} from "react"
import SpotifyWebApi from "spotify-web-api-js"
import { useParams } from "react-router-dom";

var Spotify = require("spotify-web-api-js");


const spotifyApi = new SpotifyWebApi()
// ** read README at  https://github.com/jmperez/spotify-web-api-js

export const App = () => {
  const [auth, setAuth] = useState({})
  const [tracks, setTracks] = useState({})

  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

    useEffect(() => {
      debugger;
      if(!auth.token){
        const params = getHashParams();
        console.log(params);
        const token = params.access_token;
        console.log(token);
        debugger;
        setAuth(
          {
            loggedIn: token ? true : false,
            token: token,
          },
          []
      )
      }
      ;
    });


  const getTopTracks = () => {
    spotifyApi.setAccessToken(auth.token); 
   
    spotifyApi.getMyTopTracks(trackOptions)
    
    .then((r) => {
      debugger
      setTracks({
        tracks: r.items[0].album.artists[0].name
      })
    })
  }

  const trackOptions = {
    time_range: "medium_term",
    limit: 1,
    offset: 1,
  };
  
    return (
      <>
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
        <div>Top Tracks: {tracks.tracks}</div>
      </div>
      <div className="getTracksDiv">
        <button onClick={() => getTopTracks()}>Get Tracks</button>
      </div>
      </>
    );
  



}