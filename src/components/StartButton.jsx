import { Button } from "@mui/material"
export default function StartButton({auth, setAuth}) {

    return(
        <Button 
            variant="contained" 
            sx={{margin: '2rem', backgroundColor: '#1DB954', '&:hover': {backgroundColor: '#1DB954'}}}
            href={'/.netlify/functions/auth'}
        >
            Log in to Spotify
        </Button>
    )
}