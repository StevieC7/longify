import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Callback(props) {
    const navigate = useNavigate()

    const getParametersFromHash = (url, parameter) => {
        let myRegex = new RegExp(parameter + '=([^&]+)(&|$)')
        let match = url.match(myRegex);
        return(match ? match[1] : 'none found');
    }
    // eslint-disable-next-line
    const code = getParametersFromHash(useLocation().search, 'code')
    const state = getParametersFromHash(useLocation().search, 'state')

    useEffect(() => {
        fetch('/.netlify/functions/tokenRequest', {
            method: 'POST',
            body: JSON.stringify({code: code, redirect: `${process.env.REDIRECT}`})
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('accessToken', data.accessToken)
        })
        navigate('/make')
        // eslint-disable-next-line
    },[code])

    if (state !== localStorage.getItem('spotifyState')) {
        return(
            <>
            <p>Something has gone wrong. No hacking, please.</p>
        </>
        )
    }
    return(<></>)
}