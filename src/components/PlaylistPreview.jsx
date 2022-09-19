import PlaylistActions from "./PlaylistActions";
import PlaylistGenerator from "./PlaylistGenerator";

export default function PlaylistPreview(props) {
    return(
        <>
            <p>PlaylistPreview</p>
            <PlaylistGenerator />
            <PlaylistActions />
        </>
    )
}