import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removeperson } from "../store/reducers/personSlice";
import Loading from "./templates/Loading";
import Horizontalcard from "./templates/Horizontalcard";
import { asyncpersonHandler } from "./../store/actions/PersonAction";
const PersonDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { id } = useParams();
  const { info } = useSelector((state) => state.person);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncpersonHandler(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="w-full h-[120vh] px-[15%] flex text-zinc-100 bg-[#1F1E24] text-xl mt-5 ">
      <div className="w-[20%]">
      <i
        onClick={() => navigate(-1)}
        className=" h-[10vh]  hover:text-[#6556CD] hover:cursor-pointer ri-arrow-left-line"
      ></i>
      <div className="w-full flex flex-col">
        <div className="w-[20% ]">
          <img
            className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[30vh] w-[15vw] object-cover "
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.profile_path || info.detail.backdrop_path
            }`}
            alt=""
          />
          <hr className="w-[15vw] mt-10 border-none h-[2px] bg-zinc-500"></hr>
          {/* links */}
          <div className="text-2xl text-white flex gap-x-4 flex-wrap min-w-[20vw]">
            <a target="_blank" href={info.detail.homepage}>
              <i className="ri-external-link-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* {personinfo} */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-2">Person info</h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">Know for</h1>
          <h1 className=" text-zinc-400 ">{info.detail.known_for_department}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">Gender</h1>
          <h1 className=" text-zinc-400 ">{info.detail.gender ===2 ? "Male" :"Female"}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">Birthday</h1>
          <h1 className=" text-zinc-400 ">{info.detail.birthday}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">Place of Birth</h1>
          <h1 className=" text-zinc-400 ">{info.detail.place_of_birth}</h1>
        </div>
        <div className="w-80%"></div>
      </div>
      </div>
      <div className="w-[80%] ml-10">


        
          <h1 className="text-4xl text-zinc-400 ">{info.detail.name}</h1>
          <h1 className="text-xl text-zinc-400 font-semibold  mt-2">Overview</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>
          <h1 className="text-xl text-zinc-400 font-semibold mt-5">Summary</h1>
          <Horizontalcard trend={info.combineCredit.cast}/>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
