import { useState, useEffect } from "react";
export default function Configurator(props) {
    const initialFormState = {}
    const [formState, setFormState] = useState(initialFormState)
    console.log("Configurator has token:",localStorage.getItem('accessToken'))
    const spotifyToken = localStorage.getItem('accessToken')
    const handleClick = () => {
        fetch('https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V', {headers: {'Authorization': `Bearer ${spotifyToken}`}})
        .then((res) => res.json())
        .then((json) => console.log(json))
    }
    return(
        <>
            <p>Configurator</p>
            {/* TODO: put a button here to send a static request to Spotify API just for testing the access token */}
            <button onClick={handleClick()}>Get Song</button>
        </>
    )
}