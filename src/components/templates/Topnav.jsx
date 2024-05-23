import axios from "../../utils/Axois";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "../../../images/download.png";

const Topnav = () => {
  const [query, Setquery] = useState("");
  const [result, Setresult] = useState([]);
  const getSearch = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${query}`);
      Setresult(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [query]);

  return (
    <div className="h-16 flex items-center justify-center">
      <div className="relative flex items-center w-full max-w-xl">
        <i className="text-zinc-400 text-3xl ri-search-line"></i>
        <input
          onChange={(e) => {
            Setquery(e.target.value);
          }}
          value={query}
          placeholder="Search"
          type="text"
          className="flex-grow ml-2 p-3 text-xl outline-none border-none bg-transparent text-white"
        />
        {query.length > 0 && (
          <i
            onClick={() => Setquery("")}
            className="absolute top-0 right-0 mr-2 cursor-pointer text-zinc-400 text-3xl ri-close-fill"
          ></i>
        )}
        {query.length > 0 && (
          <div className="absolute z-50 top-0 w-full mt-10 bg-zinc-200 rounded-md shadow-md">
            <div className="max-h-[50vh] overflow-auto">
              {result.map((s, i) => (
                <Link
                  key={i}
                  to={`/${s.media_type}/details/${s.id}`}
                  className="block hover:text-black hover:bg-slate-300 duration-300 font-semibold text-zinc-600 p-4 border-b border-zinc-100"
                >
                  <img
                    className="h-12 w-12 object-cover mr-4"
                    src={
                      s.backdrop_path || s.profile_path
                        ? `https://image.tmdb.org/t/p/original${
                            s.backdrop_path || s.profile_path
                          }`
                        : noimage
                    }
                    alt=""
                  />
                  <span>{s.name || s.title || s.original_name || s.original_title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topnav;
