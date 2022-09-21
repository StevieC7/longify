import { useState } from 'react';
import StartButton from '../components/StartButton';
export default function Home(props) {
    const [auth, setAuth] = useState({})

    return(
    <div className='home'>
        <h1>Longify</h1>
        <p>Generate long playlists of songs and podcasts for Spotify.</p>
        <StartButton setAuth={setAuth} auth={auth}/>
    </div>
    )
}