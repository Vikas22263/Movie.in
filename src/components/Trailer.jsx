import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Notfound from "./templates/Notfound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideos = useSelector((state) => state[category].info.videos);

  return ytvideos ?(
    <div className="absolute top-0 left-0 bg-[rgb(0,0,0,0.8)] w-full h-[100%]  ">
      <div className="h-[50%] flex items-center justify-center mt-12 ">
        <i
          onClick={() => navigate(-1)}
          className=" absolute top-5 right-20 text-white text-4xl hover:text-[#6556CD] hover:cursor-pointer ri-close-fill"
        ></i>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${ytvideos.key}`}
          width={1080}
          height={600}
          controls={true}
        />
      </div>
    </div>
  ):(<>
     <div className="absolute top-0 left-0 bg-[rgb(0,0,0,0.8)] w-full h-full  ">
     <i
          onClick={() => navigate(-1)}
          className=" absolute top-5 right-20 text-black text-4xl hover:text-[#6556CD] hover:cursor-pointer ri-close-fill"
        ></i>
      <Notfound/>
     </div>
  </>)
};

export default Trailer;
