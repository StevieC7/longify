import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Callback(props) {
    const navigate = useNavigate()

    const getParametersFromHash = (url, parameter) => {
        let myRegex = new RegExp(parameter + '=([^&]+)(&|$)')
        let match = url.match(myRegex);
        return(match ? match[1] : 'none found');
    }

    const state = getParametersFromHash(useLocation().hash, 'state')
    // eslint-disable-next-line
    const code = getParametersFromHash(useLocation().hash, 'code')

    useEffect(() => {
        fetch(`https://accounts.spotify.com/api/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REACT_APP_redirect}`
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('accessToken', data.access_token)
        })
        navigate('/make')
    })

    if (state !== localStorage.getItem('spotifyState')) {
        return(
            <>
            <p>Something has gone wrong. No hacking, please.</p>
        </>
        )
    }
    return(<></>)
}