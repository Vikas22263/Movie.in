import { Link } from "react-router-dom";

const Sidenav = ({ navactive,func }) => {

  return (
    <div
      className=" max-lg:text-lg h-full border-r-2 border-zinc-400 p-10 max-xl:px-6 max-lg:hidden "
      style={
        navactive
          ? {
              width: "100vw ",
              display: "block",
              position: "absolute",
              zIndex: "500",
              background: "black",
            }
          : null
      }
    >
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill"></i>
        <span className="text-2xl ml-2 max-xl:text-xl max-lg:text-lg ">
          Movie-in
        </span>
        {navactive && (
          <span>
            {" "}
            <i onClick={func} className="text-[#6556CD] hover:text-zinc-500 absolute right-10 text-3xl ri-close-fill cursor-pointer"></i>
          </span>
        )}
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl w-[100%]">
        <h1 className="text-white font-semibold text-xl mt-4">New Feeds</h1>
        <Link
          to={"/trending"}
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 w-[100%] max-lg:px-2  flex "
        >
          {" "}
          <i className="mr-2 ri-fire-fill"></i>Trending
        </Link>
        <Link
          to="/popular"
          className="mr-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 w-[100%] max-lg:px-2  flex"
        >
          {" "}
          <i className="mr-2 ri-bard-line"></i> Popular
        </Link>
        <Link
          to="/movies"
          className="mr-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 w-[100%] max-lg:px-2  flex"
        >
          <i className="mr-2 ri-movie-2-fill"></i> Movies
        </Link>
        <Link
          to="/tv_shows"
          className="mr-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 w-[100%] max-lg:px-2  flex "
        >
          {" "}
          <i className="mr-2 ri-tv-2-fill"></i>Tv Show
        </Link>
        <Link
          to="/person"
          className="mr-2 hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 w-[100%] max-lg:px-2  flex"
        >
          {" "}
          <i className="mr-2 ri-team-line"></i>People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col text-zinc-400 text-xl">
        <h1 className="text-white font-semibold text-xl ">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 w-[100%] max-lg:px-2 ">
          {" "}
          <i className="mr-2 ri-information-2-fill"></i>About
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
