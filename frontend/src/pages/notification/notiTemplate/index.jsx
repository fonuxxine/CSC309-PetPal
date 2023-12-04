import {Link} from "react-router-dom";

function NotiTemplate({noti}) {
    return <div className="p-3">
        <b><p>{noti.message}</p></b>
          <Link to={noti.link}>link</Link>
          <p>{noti.time_created}</p>
        {noti.read ? <p>READ</p> : <p>UNREAD</p>}
      </div>
}

export default NotiTemplate;