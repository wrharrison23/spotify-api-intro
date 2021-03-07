
import './App.css';
import React, {useState, useEffect} from "react"
import SpotifyWebApi from "spotify-web-api-js"
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";

var Spotify = require("spotify-web-api-js");


const spotifyApi = new SpotifyWebApi()
// ** read README at  https://github.com/jmperez/spotify-web-api-js

export const App = () => {
  const [auth, setAuth] = useState({
    loggedIn: false,
    token: ""
  })
  const [tracks, setTracks] = useState({})



    useEffect(() => {
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


      if(!auth.token){
        const params = getHashParams();
        console.log(params);
        const token = params.access_token;
        console.log(token);
        
        setAuth(
          {
            loggedIn: token ? true : false,
            token: token,
          },
          []
      )
      }
      ;
    }, []);

    const trackOptions = {
    time_range: "medium_term",
    limit: 10,
  };

  const buildTrackArray = (r) => {
    let trackArray = [];
    r.items.forEach((track) => {
      trackArray.push(track.name);
    });
    return trackArray;
  }

  const getTopTracks = () => {
    spotifyApi.setAccessToken(auth.token); 
   
    spotifyApi.getMyTopTracks(trackOptions)
    
    .then((r) => {
      console.log(buildTrackArray(r))
      setTracks({
        trackArray: buildTrackArray(r)
      })
    })
  }

    
      if (auth.loggedIn === false) {
        return (
          <>
          <div className="App">
          <Button outline color="success" size="lg">
            <a href="http://localhost:8888" className="text-success">
              {" "}
              Login to Spotify{" "}
            </a>
          </Button>
          </div>
          </>
        )
      } else {
        return (
          <>
            <div className="App">
              <div className="getTracksDiv">
                <Button
                  outline
                  color="success"
                  size="lg"
                  onClick={() => getTopTracks()}
                >
                  Get Tracks
                </Button>
                <h3>Top Tracks: </h3>
                <div>
                  {tracks.trackArray?.map((item) => (
                    <p>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      }
}



