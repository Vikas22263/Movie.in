import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncHandler } from "./../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removemovie } from "../store/reducers/movieSlice";
import Loading from "./templates/Loading";
import Horizontalcard from "./templates/Horizontalcard";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncHandler(id));
    return () => {
      dispatch(removemovie());
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
              ({info.detail.release_date.split("-")[0]})
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
              <h1>{info.detail.release_date}</h1>
              <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
              <h1>{info.detail.runtime}min</h1>
            </div>
          </div>
          <h1 className="text-lg md:text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>
          <h1 className="text-xl md:text-2xl italic text-white mt-5">Overview</h1>
          <p className="mb-10">{info.detail.overview}</p>
          <Link
            className="rounded-lg py-3 md:py-5 px-5 bg-[#6556CD] text-lg md:text-xl"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill text-white mr-3"></i> Play Trailer
          </Link>
        </div>
      </div>
      {/* watch-providers */}
      <div className="w-full md:w-[80%] mt-10 flex flex-col gap-5 ">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-5 items-center text-white ">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-12 h-12 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-5 items-center text-white ">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-12 h-12 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-5 items-center text-white ">
            <h1>Available To buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-12 h-12 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>
      {/* recommendations */}
      <hr className="mt-10 border-none h-[2px] bg-zinc-500"></hr>
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

export default MovieDetails;
