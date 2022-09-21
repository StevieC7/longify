import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import StartButton from '../components/StartButton';
export default function Home(props) {
    const [auth, setAuth] = useState({})
    // Auth API call function that builds query and pings Spotify auth API
    // refactor later with backend to keep this a real secret, since React will just embed env variables at build
    // fetch('/.netlify/functions/keys')
    // .then((res) => res.json())
    // .then((data) => {
    //     console.log(data)
    //     clientID = data.clientID
    //     console.log(clientID)
    // })

    // const redirectURL = encodeURIComponent('https://splendid-dieffenbachia-118c6c.netlify.app/callback')
    // // const redirectURL = encodeURIComponent('http://localhost:3000/callback')
    // let scope = encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-modify-public user-library-read user-top-read user-read-recently-played')
    // // set state in local storage at home page render
    // let spotifyState = encodeURIComponent(uuidv4());
    // useEffect(() => {
    //     // fetch('/.netlify/functions/keys')
    //     // .then((res) => res.json())
    //     // .then((data) => {
    //     //     console.log(data.clientID)
    //     //     setAuth({clientID: data.clientID, redirectURL: redirectURL, scope: scope})
    //     // })
    //     localStorage.setItem("spotifyState", spotifyState);
    // }, [spotifyState])
    
    // click handler for the "start" button that triggers the auth API call
    return(
    <>
        <h1>Longify</h1>
        <p>Generate long playlists of songs and podcasts for Spotify.</p>
        <StartButton setAuth={setAuth}/>
    </>
    )
}