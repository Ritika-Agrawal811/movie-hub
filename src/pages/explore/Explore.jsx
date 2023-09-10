import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const { mediaType } = useParams();
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
  const [selectData, setSelectData] = useState({ genre: null, sortby: null });
  const [pageData, setPageData] = useState({
    data: null,
    pageNum: 1,
    loading: false,
  });

  const fetchInitialData = useCallback(() => {
    setPageData((prev) => ({ ...prev, loading: true }));
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setPageData((prev) => ({
        data: res,
        loading: false,
        pageNum: prev.pageNum + 1,
      }));
    });
  }, [mediaType]);

  const fetchNextPageData = () => {
    fetchDataFromApi(
      `/discover/${mediaType}?page=${pageData.pageNum}`,
      filters
    ).then((res) => {
      if (pageData.data?.results) {
        setPageData((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            results: [...prev.data.results, ...res.results],
          },
        }));
      } else {
        setPageData((prev) => ({ ...prev, data: res }));
      }
      setPageData((prev) => ({ ...prev, pageNum: prev.pageNum + 1 }));
    });
  };

  useEffect(() => {
    filters = {};
    setPageData((prev) => ({ ...prev, data: null, pageNum: 1 }));
    setSelectData({ genre: null, sortby: null });
    fetchInitialData();
  }, [mediaType, fetchInitialData]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSelectData((prev) => ({ ...prev, sortby: selectedItems }));
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setSelectData((prev) => ({ ...prev, genre: selectedItems }));
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageData((prev) => ({ ...prev, pageNum: 1 }));
    fetchInitialData();
  };

  return (
    <main className="explore__page">
      <ContentWrapper>
        <section className="explore__header">
          <div className="page__title">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={selectData.genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              placeholder="Select genres"
              onChange={onChange}
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={selectData.sortby}
              options={sortbyData}
              isClearable={true}
              placeholder="Sort by"
              onChange={onChange}
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </section>
        {pageData.loading && <Spinner initial={true} />}
        {!pageData.loading && pageData.data && (
          <>
            {pageData.data.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={pageData.data.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageData.pageNum <= pageData.data.total_pages}
                loader={<Spinner />}
              >
                {pageData.data.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )}
          </>
        )}
      </ContentWrapper>
    </main>
  );
};

export default Explore;
