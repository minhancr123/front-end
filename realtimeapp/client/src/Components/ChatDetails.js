import AvatarPic from "../assets/avatar.png";
import Minus from "../assets/minus.png";
import Camera from "../assets/camera.png";
import Edit from "../assets/edit.png";
import More from "../assets/more.png";
import Search from "../assets/search.png";
import Video from "../assets/video.png";
function ChatDetails() {
  return (
    <div>
      <div className="flex p-3 items-center">
        <div className="opacity-100 flex w-2/3 items-center gap-1">
          <img src={`${AvatarPic}`} className="rounded-full w-1/3 h-1/3 "></img>
          <span>John Doe</span>
        </div>
        <div className="flex gap-3">
          <img src={`${More}`} style={{ width: "20px", height: "20px" }}></img>
          <img
            src={`${Video}`}
            style={{ width: "20px", height: "20px" }}
          ></img>
          <img src={`${Edit}`} style={{ width: "20px", height: "20px" }}></img>
        </div>
      </div>
      <div className="flex gap-12 items-center flex-1">
        <div className="flex items-center gap-2 bg-zinc-950 opacity-80 rounded-lg p-2 ">
          <img src={`${Search}`} style={{ width: "20px", height: "20px" }} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none flex-1"
          ></input>
        </div>
        <img src={`${Minus}`} style={{ width: "20px", height: "20px" }}></img>
      </div>
    </div>
  );
}

export default ChatDetails;
