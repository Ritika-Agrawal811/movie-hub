import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss";

import { fetchDataFromApi } from "@/utils/api";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import Spinner from "@/components/spinner/Spinner";
import MovieCard from "@/components/movieCard/MovieCard";
import noResults from "@/assets/no-results.png";
import Image from "@/components/lazyLoadImage/Image";

const SearchResults = () => {
  const [search, setSearch] = useState({
    data: null,
    pageNum: 1,
    loading: false,
  });
  const { query } = useParams();

  const fetchNextPageData = () => {
    setSearch((prev) => ({ ...prev, loading: true }));
    fetchDataFromApi(
      `/search/multi?query=${query}&page=${search.pageNum}`
    ).then((res) => {
      if (search.data.results) {
        setSearch((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            results: [...prev.data.results, ...res.results],
          },
        }));
      } else {
        setSearch((prev) => ({ ...prev, data: res }));
      }

      setSearch((prev) => ({
        ...prev,
        pageNum: prev.pageNum + 1,
        loading: false,
      }));
    });
  };

  const fetchInitialData = useCallback(() => {
    setSearch((prev) => ({ ...prev, loading: true }));
    fetchDataFromApi(
      `/search/multi?query=${query}&page=${search.pageNum}`
    ).then((res) => {
      setSearch((prev) => ({
        data: res,
        loading: false,
        pageNum: prev.pageNum + 1,
      }));
    });
  }, [query]);

  useEffect(() => {
    setSearch((prev) => ({ ...prev, pageNum: 1 }));
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <section className="searchResultsPage">
      {search.loading && <Spinner initial={true} />}
      {!search.loading && (
        <ContentWrapper>
          {search.data?.results?.length > 0 ? (
            <>
              <h3 className="page__title">
                {`Search ${
                  search.data.total_results > 1 ? "results" : "result"
                } of "${query}"`}
              </h3>
              <InfiniteScroll
                className="content"
                dataLength={search.data.results.length || []}
                next={fetchNextPageData}
                hasMore={search.pageNum <= search.data.total_pages}
                loader={<Spinner />}
              >
                {search.data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;

                  return <MovieCard key={index} data={item} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <>
              <Image src={noResults} />
              <span className="resultNotFound">Sorry, no results found!</span>
            </>
          )}
        </ContentWrapper>
      )}
    </section>
  );
};

export default SearchResults;
