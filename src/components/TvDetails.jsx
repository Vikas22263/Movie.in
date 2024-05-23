import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import noimage from "../../images/download.png";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { removetv } from "../store/reducers/tvSlice";
import Loading from "./templates/Loading";
import Horizontalcard from "./templates/Horizontalcard";
import { asynctvHandler } from "../store/actions/TvActions";

const TvDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asynctvHandler(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative px-6 md:px-10 py-10 md:py-20 overflow-x-hidden"
    >
      {/* navigation */}
      <nav className="h-16 md:h-20 w-full text-zinc-100 flex justify-between items-center">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-2xl md:text-3xl hover:text-[#6556CD] hover:cursor-pointer"
        ></i>
        <div className="flex gap-4">
          <a target="_blank" href={info.detail.homepage}>
            <i className="ri-external-link-fill text-2xl md:text-3xl"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-earth-fill text-2xl md:text-3xl"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          >
            imdb
          </a>
        </div>
      </nav>
      {/* poster and details */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-6 md:mt-12 text-white">
        <img
          className="w-full md:w-1/3 md:mr-10 h-auto md:h-[50vh] md:object-cover rounded-md"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />
        <div className="mt-6 md:mt-0 md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-lg md:text-xl font-bold text-zinc-300 ml-2">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>
          <div className="flex items-center mt-3 mb-5">
            <span className="rounded-full text-xl md:text-lg font-semibold bg-yellow-600 text-white w-12 md:w-16 h-12 md:h-16 flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <div className="ml-4">
              <h1 className="font-semibold text-xl md:text-lg leading-6">
                User Score
              </h1>
              <h1>{info.detail.first_air_date}</h1>
              <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
              <h1>{info.detail.runtime}min</h1>
            </div>
          </div>
          <h1 className="text-lg md:text-md font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>
          <h1 className="text-xl md:text-lg italic text-white mt-5">Overview</h1>
          <p className="mb-10 text-base md:text-sm">{info.detail.overview}</p>
          <Link
            className="rounded-lg py-3 md:py-5 px-5 bg-[#6556CD] text-lg md:text-xl"
            to={`${pathname}/trailer`}
          >
            <i className="text-white ri-play-fill mr-3"></i> Play Trailer
          </Link>
        </div>
      </div>
      {/* watch providers */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center mt-10 gap-y-5 md:gap-x-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-14 h-14 md:w-[7vh] md:h-[7vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-14 h-14 md:w-[7vh] md:h-[7vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available To buy</h1>
            {info.watchproviders.buy.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-14 h-14 md:w-[7vh] md:h-[7vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>
      {/* seasons */}
      <hr className="mt-10 border-none h-1 bg-zinc-500" />
      <h1 className="text-3xl md:text-4xl font-bold text-white mt-10">Seasons</h1>
      <div className="w-full flex overflow-x-auto mt-5 p-5">
        {info.detail.seasons.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <div key={i} className="mr-5">
              <img
                className="h-[30vh] w-[15vw] md:w-[10vw] object-cover"
                src={s.poster_path ? `https://image.tmdb.org/t/p/original/${s.poster_path}` : noimage}
                alt=""
              />
              <h1 className="text-2xl text-zinc-300 mt-3 font-semibold">
                {s.name}
              </h1>
            </div>
          ))
        ) : (
          <h1>No Seasons Available</h1>
        )}
      </div>
      {/* recommendations */}
      <hr className="mt-10 border-none h-1 bg-zinc-500" />
      <h1 className="text-3xl md:text-4xl font-bold text-white mt-10">
        Recommendations & Similar Items
      </h1>
      <Horizontalcard
        trend={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
