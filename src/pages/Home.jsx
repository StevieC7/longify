import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
export default function Home(props) {
    // Auth API call function that builds query and pings Spotify auth API
    // refactor later with backend to keep this a real secret, since React will just embed env variables at build
    const clientID = '83142baf3b354b7a901a4f46e0f371d1'
    const redirectURL = encodeURIComponent('http://localhost:3000/callback')
    let scope = encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-modify-private user-library-read user-top-read user-read-recently-played')
    // set state in local storage at home page render
    let spotifyState = encodeURIComponent(uuidv4());
    useEffect(() => {
        console.log('use effect ran')
        localStorage.setItem("spotifyStateKey", spotifyState);
    }, [spotifyState])
    
    // click handler for the "start" button that triggers the auth API call
    return(
    <>
        <p>Home</p>
        <button><a href={`https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=${scope}&redirect_uri=${redirectURL}&state=${spotifyState}`}>Build Playlist</a></button>
    </>
    )
}