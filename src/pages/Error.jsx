import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header'

export default function Error(props) {
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.removeItem('accessToken')
        navigate('/')
    }
    return(
        <div className="error">
            <div className="page-wrapper">
                <Header userConfig={{songMix: undefined}}></Header>
                <h2>Error: reauthentication required</h2>
                <p>Spotify requires you to sign in again for security reasons.</p>
                <Button variant='contained' sx={{margin: '2rem', backgroundColor: '#1DB954', '&:hover': {backgroundColor: '#1DB954'}}} onClick={() => handleClick()}>Sign in</Button>
            </div>
        </div>
    )
}