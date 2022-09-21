import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
export default function Home(props) {
    // Auth API call function that builds query and pings Spotify auth API
    // refactor later with backend to keep this a real secret, since React will just embed env variables at build
    let clientID;
    fetch('/.netflify/functions/keys').then((res) => res.json()).then((json) => clientID = json)
    // const clientID = '83142baf3b354b7a901a4f46e0f371d1'
    const redirectURL = encodeURIComponent('https://splendid-dieffenbachia-118c6c.netlify.app/callback')
    // const redirectURL = encodeURIComponent('http://localhost:3000/callback')
    let scope = encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-modify-public user-library-read user-top-read user-read-recently-played')
    // set state in local storage at home page render
    let spotifyState = encodeURIComponent(uuidv4());
    useEffect(() => {
        localStorage.setItem("spotifyState", spotifyState);
    }, [spotifyState])
    
    // click handler for the "start" button that triggers the auth API call
    return(
    <>
        <h1>Longify</h1>
        <p>Generate long playlists of songs and podcasts for Spotify.</p>
        <Button variant='contained' href={`https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${scope}&redirect_uri=${redirectURL}&state=${spotifyState}&show_dialog=true`}>Build Playlist</Button>
    </>
    )
}