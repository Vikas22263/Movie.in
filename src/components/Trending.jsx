import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import VerticalCards from "./templates/VerticalCards";
import Loading from "./templates/Loading";
import axios from "../utils/Axois";
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  const navigate = useNavigate();

  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
 document.title='Trending'
  const getSearch = async (newCategory, newDuration) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`trending/${newCategory}/${newDuration}`);
      setTrending(data.results);
      setLoading(false);
      setHasMore(data.results.length > 0);
      setPage(2); 
    } catch (error) {
      console.log(error);
    }
  };

  const unLimitedScroller = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/${duration}?page=${page}`);
      setTrending((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 1);
      setHasMore(data.results.length > 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTrending([]);
    setPage(1);
    setHasMore(true);
    getSearch(category, duration);
  }, [category, duration]);

  return !loading ? (
    <div className="w-full">
      <div className="flex items-center justify-center px-6">
        <h1 className="text-2xl text-zinc-400 font-semibold max-md:hidden">
          <i
            onClick={() => navigate(-1)}
            className="mr-2 hover:text-[#6556CD] hover:cursor-pointer ri-arrow-left-line"
          ></i>
       <span className="max-lg:hidden">Trending</span>
        </h1>

        <div className="flex justify-between items-center w-full ml-8">
          <Topnav />
          <div className="flex ">
            <Dropdown
              title={"Category"}
              options={["tv", "movie", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
            <div className="w-[2%]"></div>
            <Dropdown
              title={"Duration"}
              options={["week", "day"]}
              func={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-screen">
        <InfiniteScroll
          dataLength={trending.length}
          next={unLimitedScroller}
          hasMore={hasMore}
          loader={<h1>loading</h1>}
        >
          <VerticalCards trending={trending} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
