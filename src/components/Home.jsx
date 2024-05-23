import { useEffect, useState } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "../components/templates/Topnav";
import axios from "../utils/Axois";
import Headers from "../components/templates/Headers";
import Horizontalcard from "./templates/Horizontalcard";
import Dropdown from "./templates/Dropdown";
import Loading from "./templates/Loading";

const Home = () => {
  const [result, setResult] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setcategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [navActive, setNavactive] = useState(false);
  const getSearch = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/day`);
      setTrending(data.results);
      const randomdata =
        data.results[Math.floor(Math.random() * data.results.length)];
      setResult(randomdata);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      randomHeaders(trending);
    }, 15000);

    return () => clearInterval(interval);
  }, [trending]);

  const randomHeaders = (results) => {
    const randomdata = results[Math.floor(Math.random() * results.length)];
    setResult(randomdata);
  };

  useEffect(() => {
    getSearch();
  }, [category]);

  document.title = "Movies.in| Homepage";



  return !loading ? (
    <>
      <div
        className={`w-[20%] h-full `}
      >
        <Sidenav navactive={navActive} func={()=>setNavactive(prev=>!prev)}/>
      </div>

      <div className=" h-full overflow-auto">
        <div className="flex">
          <i
            onClick={() => setNavactive((prev) => !prev)}
            className="ri-menu-line hidden max-lg:block text-2xl text-white cursor-pointer hover:text-zinc-500 duration-100 ease-in-out p-4"
          ></i>
          <Topnav />
        </div>
        <Headers treding={result} />
        <>
          <div className="flex justify-between mt-4 p-2">
            <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
            <Dropdown
              title={"Filter"}
              options={["tv", "movie", "all"]}
              func={(e) => {
                setcategory(e.target.value);
              }}
            />
          </div>
        </>

        <Horizontalcard trend={trending} func={setcategory} />
      </div>
    </>
  ) : (
    <div>
      <Loading />
    </div>
  );
};

export default Home;
