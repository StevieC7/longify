import { Button } from "@mui/material"
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
export default function StartButton({auth, setAuth}) {
    // const redirectURL = encodeURIComponent('https://www.longify.me/callback')
    const redirectURL = encodeURIComponent('http://localhost:8888/callback')
    const scope = encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-modify-public user-library-read user-top-read user-read-recently-played')
    const spotifyState = encodeURIComponent(uuidv4());
    
    useEffect(() => {
        localStorage.setItem("spotifyState", spotifyState)
        fetch('/.netlify/functions/keys')
        .then((res) => res.json())
        .then((data) => {
            setAuth({clientID: data.clientID, redirectURL: redirectURL, scope: scope, spotifyState: spotifyState})
        })
        // eslint-disable-next-line
    }, [])

    return(
        <Button 
            variant="contained" 
            sx={{margin: '2rem', backgroundColor: '#1DB954', '&:hover': {backgroundColor: '#1DB954'}}} 
            href={`https://accounts.spotify.com/authorize?response_type=token&client_id=${auth.clientID}&scope=${auth.scope}&redirect_uri=${auth.redirectURL}&state=${auth.spotifyState}&show_dialog=true`}
        >
            Log in to Spotify
        </Button>
    )
}