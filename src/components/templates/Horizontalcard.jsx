import { Link } from "react-router-dom";
import noimage from "../../../images/download.png";

const Horizontalcard = ({ trend }) => {
  return (
    <div className="w-full  overflow-x-auto">
      <div className="flex flex-nowrap justify-start">
        {trend.length > 0 ? (
          trend.map((e) => (
            <Link
              key={e.id}
              to={`/${e.media_type}/details/${e.id}`}
              className="p-4"
              style={{ flex: "0 0 auto", minWidth: "300px", maxWidth: "15vw" }} 
            >
              <div className="w-full">
                <img
                  className="w-full h-[30vh] object-cover"
                  src={
                    e.backdrop_path || e.poster_path
                      ? `https://image.tmdb.org/t/p/original/${
                          e.backdrop_path || e.poster_path
                        }`
                      : noimage
                  }
                  alt=""
                />
              </div>
              <div className="">
                <h1 className="text-xl font-black text-zinc-300">
                  {e.name || e.title || e.original_name || e.original_title}
                </h1>
                <h2 className="text-zinc-300">
                  {e?.overview ? (
                    <>
                      {e.overview.slice(0, 50)}...{" "}
                      <Link to="#" className="text-blue-400">
                        More
                      </Link>
                    </>
                  ) : (
                    <p>No overview available.</p>
                  )}
                </h2>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-white font-black text-center mt-5">
            Nothing To show
          </h1>
        )}
      </div>
    </div>
  );
};

export default Horizontalcard;
