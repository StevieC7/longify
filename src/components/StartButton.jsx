import { Button } from "@mui/material"
export default function StartButton({auth, setAuth}) {
    const redirectURL = encodeURIComponent('https://splendid-dieffenbachia-118c6c.netlify.app/callback')
    // const redirectURL = encodeURIComponent('http://localhost:3000/callback')
    const scope = encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-modify-public user-library-read user-top-read user-read-recently-played')
    // set state in local storage at home page render
    const spotifyState = encodeURIComponent(uuidv4());
    localStorage.setItem("spotifyState", spotifyState)
    
    fetch('/.netlify/functions/keys')
    .then((res) => res.json())
    .then((data) => {
        console.log(data.clientID)
        setAuth({clientID: data.clientID, redirectURL: redirectURL, scope: scope, spotifyState: spotifyState})
    })


    return(
        <Button variant="contained" href={`https://accounts.spotify.com/authorize?response_type=token&client_id=`}>Start</Button>
    )
}