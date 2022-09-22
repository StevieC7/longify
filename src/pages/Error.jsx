import { useNavigate } from "react-router-dom";

export default function Error(props) {
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.removeItem('accessToken')
        navigate('/')
    }
    return(
        <div className="error">
            <p>An error has occurred. Please return to homepage, log in to Spotify, and try again.</p>
            <button onClick={() => handleClick()}>Try Again</button>
        </div>
    )
}