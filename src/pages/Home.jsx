import { useState } from 'react';
import StartButton from '../components/StartButton';
export default function Home(props) {
    const [auth, setAuth] = useState({})

    return(
        <div className='home'>
            <div className='page-wrapper'>
                <h1>Longify</h1>
                <p>Generate long playlists mixing songs and podcasts. Only for Spotify.</p>
                <StartButton setAuth={setAuth} auth={auth}/>
            </div>
        </div>
    )
}