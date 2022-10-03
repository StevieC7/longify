import { Button } from "@mui/material"
export default function StartButton({auth, setAuth}) {
    
    const getRedirectURL = async () => {
        return await fetch('/.netlify/functions/auth').then((res) => res.json().then((json) => json))
    }
    console.log(getRedirectURL())
    return(
        <Button 
            variant="contained" 
            sx={{margin: '2rem', backgroundColor: '#1DB954', '&:hover': {backgroundColor: '#1DB954'}}}
            href='#'
        >
            Log in to Spotify
        </Button>
    )
}