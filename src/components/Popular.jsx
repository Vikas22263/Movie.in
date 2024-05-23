import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import VerticalCards from './templates/VerticalCards';
import Loading from './templates/Loading';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import axios from '../utils/Axois';
import { useNavigate } from 'react-router-dom';

const Popular = () => {
  const navigate = useNavigate();
  const [popular, setpopular] = useState([]);
  const [category, setCategory] = useState("movie");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  document.title=category.toUpperCase()
  const getSearch = async (newCategory) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${newCategory}/popular`);
 
      setpopular(data.results);
      setLoading(false);
      setHasMore(data.results.length > 0);
      setPage(2); 
    
    } catch (error) {
      console.log(error);
    }
  };

  const unLimitedScroller = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      setpopular((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 1);
      setHasMore(data.results.length > 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setpopular([]);
    setPage(1);
    setHasMore(true);
    getSearch(category);
  }, [category]);

  return !loading ? (
    <div className="w-full">
      <div className="flex items-center justify-center px-6">
        <h1 className="text-2xl text-zinc-400 font-semibold max-md:hidden">
          <i
            onClick={() => navigate(-1)}
            className="mr-2 hover:text-[#6556CD] hover:cursor-pointer ri-arrow-left-line "
          ></i>
        <span >
        popular
        </span>
        </h1>

        <div className="flex justify-between items-center w-full ml-8 ">
          <Topnav />
          <div className="flex max-sm:hidden">
            <Dropdown
              title={"Category"}
              options={["tv", "movie",]}
              func={(e) => setCategory(e.target.value)}
            />
           
         
          </div>
        </div>
      </div>
      <div className="w-full h-screen">
        <InfiniteScroll
          dataLength={popular.length}
          next={unLimitedScroller}
          hasMore={hasMore}
          loader={<h1>loading</h1>}
        >
          <VerticalCards trending={popular} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular