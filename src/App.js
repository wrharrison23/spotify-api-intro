
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
  const [ids, setIds] = useState("")
const [features, setFeatures] = useState({})
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
        localStorage.setItem("accessToken", token)    
        setAuth({
          loggedIn: true,
          token: token
        })    
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
      trackArray.push({
        name: track.name,
        id:track.id
      });
    });
    return trackArray;
  }


  //FIX THIS//
  const getTopTracks = () => {
    spotifyApi.setAccessToken(localStorage.getItem("accessToken")); 
   
    spotifyApi.getMyTopTracks(trackOptions)
    .then((r) => {
      console.log(r)
      console.log(buildTrackArray(r))
      setTracks({
        trackArray: buildTrackArray(r)
      })
      
    })
  }
  


  const getFeatures = (trackArray) => {
    let idString = ""
      trackArray.forEach((track) => {
        idString += track.id + ",";
      });
    spotifyApi.getAudioFeaturesForTracks(idString)
    .then((r) => setFeatures(r))
  }

  const sortSong = (song) => {
   let dance = []
   let energy = []
    song.filter(() => {
      if (song.danceability > .5){
        dance.push(song.id)
      } else if (song.energy > .5){
        energy.push(song.id)
      }
    })
  }

 
    
      if (!auth.token) {
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
        );
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
                <Button
                  outline
                  color="success"
                  size="lg"
                  onClick={() => getFeatures(tracks.trackArray)}
                >
                  Get Features
                </Button>
                <h3>Top Tracks: </h3>
                <div>
                  {tracks.trackArray?.map(({ name }) => (
                    <p>{name}</p>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      }
}



