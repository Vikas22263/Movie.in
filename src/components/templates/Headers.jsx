import React from "react";
import { Link } from "react-router-dom";

const Headers = ({ treding }) => {
  const imageUrl = treding.backdrop_path || treding.profile_path;

  return (
    <div className="relative">
      <img
        style={{
          height: "50vh",
          width: "100%",

          background:
            "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5))",
          transition: "ease-in-out",
        }}
        className="object-cover  "
        src={`https://image.tmdb.org/t/p/original/${imageUrl }`}
        alt=""
      />
      <div className="absolute bottom-5 p-8">
        <h1 className="w-[70%] text-4xl font-black text-zinc-300 max-sm:text-xl">
          {treding.name ||
            treding.title ||
            treding.original_name ||
            treding.original_title}
        </h1>
        <p className="w-[70%] mt-3 text-zinc-300">
          {treding?.overview ? (
            <>
              {treding.overview.slice(0, 150)}...{" "}
              <Link to={`/${treding.media_type}/details/${treding.id}`}  className="text-blue-400">
                More
              </Link>
            </>
          ) : (
            <p>No overview available.</p>
          )}
        </p>
        <p className=" py-2">
          <i className=" text-yellow-500 ri-album-fill">
            {treding.first_air_date || "No information"}
          </i>
          <i className="ml-5 text-yellow-500 ri-album-fill capitalize">
            {treding.media_type}
          </i>
        </p>
        <div className="mt-4">
          <Link to={`/${treding.media_type}/details/${treding.id}/trailer`} className=" bg-[#6556CD] p-3  rounded text-white">
            Watch Trailer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Headers;
