import "./style.scss";

import HeroBanner from "@/pages/home/heroBanner/HeroBanner"
import Trending from "@/pages/home/trending/Trending";
import Popular from "@/pages/home/popular/Popular"
import TopRated from "@/pages/home/topRated/TopRated";


const Home = () => {
  return (
    <main className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </main>
  );
};

export default Home;
