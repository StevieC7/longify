export default function Header(props) {
    return(
        <header>
            <div className="header-inner">
                <img src={`${process.env.PUBLIC_URL}/longify512.png`} className="logo" alt="logo"></img>
                <h1>Longify</h1>
                <p>A long playlist maker for Spotify</p>
            </div>
        </header>
    )
}