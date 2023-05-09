// router
import { Link } from "react-router-dom"

export const AlbumInModal = ({album}) => {

  console.log(album.album_name, album.user_id);

  return (
        <div class="media" >
          <span class="rounded" border="1px solid black">
          <div class="media-body">
            <h4 class="media-heading"><Link className="link" to={`/profile/${album.album_name}`}>{album.album_name}</Link><br/></h4>
          </div>
          </span>
        </div>
  )
}