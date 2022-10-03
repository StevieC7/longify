import { Button } from "@mui/material"
import { useEffect, useState } from "react"


export default function StartButton({auth, setAuth}) {
    const [redir, setRedir] = useState(null)
    useEffect(() => {
        const getRedirectURL = async () => {
            const response = await fetch('/.netlify/functions/auth')
            const data = await response.json()
            return data
        }
        // const resolveURL = async () => {
            //     const redirectURL = await getRedirectURL().then(data => data)
            // }
            getRedirectURL().then(data => setRedir(data))
    }, [])
    return(
        <Button 
            variant="contained" 
            sx={{margin: '2rem', backgroundColor: '#1DB954', '&:hover': {backgroundColor: '#1DB954'}}}
            href={redir !== null ? redir.redirect : '#'}
        >
            Log in to Spotify
        </Button>
    )
}