
import './App.css';
import React from "react"
import SpotifyWebApi from "spotify-web-api-js"
var Spotify = require("spotify-web-api-js");
var s = new Spotify();

const spotifyApi = new SpotifyWebApi()
// ** read README at  https://github.com/jmperez/spotify-web-api-js
// ** Next: store access token in object


class App extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    console.log(params);
    const token = params.access_token;
    console.log(token);
    this.state = {
      loggedIn: token ? true : false,
      token: token,
      tracks: "",
    };
  }
  getHashParams() {
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
  }

 

  getTopTracks = () => {
     
     
    spotifyApi.setAccessToken(this.state.token);
     
     
    spotifyApi.getMyTopTracks(trackOptions)
    .then((r) => {
      this.setState({
        tracks: r.items[0].album.artists[0].name
      })
    })
  }

  render() {
    return (
      <>
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
        <div>Top Tracks: {this.state.tracks}</div>
      </div>
      <div className="getTracksDiv">
        <button onClick={() => this.getTopTracks() }>Get Tracks</button>
      </div>
      </>
    );
  }
}

const trackOptions = {
  "time_range": "medium_term",
  "limit": 1,
  "offset": 1
}

export default App;