import { useState } from 'react';
import StartButton from '../components/StartButton';
import { Button } from '@mui/material';
export default function Home(props) {
    const [auth, setAuth] = useState({})

    return(
        <div className='home'>
            <div className='page-wrapper'>
                <h1>Longify</h1>
                <p>Generate long playlists mixing songs and podcasts. Only for Spotify.</p>
                { localStorage.getItem('accessToken') ? <Button variant="contained" sx={{margin: '2rem', backgroundColor: '#1DB954', '&:hover': {backgroundColor: '#1DB954'}}} href='/make'>Make Playlist</Button>: <StartButton setAuth={setAuth} auth={auth}/>}
            </div>
        </div>
    )
}