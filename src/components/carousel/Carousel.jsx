import PropTypes from "prop-types";
import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import CircleRating from "../circleRating/CircleRating";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Image from "../lazyLoadImage/Image";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";

const Carousel = ({ data, loading, endpoint, title }) => {
  const { url } = useSelector((state) => state.home);
  const carouselContainer = useRef();
  const navigate = useNavigate();

  const navigation = (direction) => {
    const container = carouselContainer.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - container.offsetWidth - 16
        : container.scrollLeft + container.offsetWidth + 16;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skeletonItem = (value) => {
    return (
      <div className="skeletonItem" key={value}>
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <h2 className="carousel__title">{title}</h2>}
        <BsFillArrowLeftCircleFill
          className="carousel__left-arrow arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel__right-arrow arrow"
          onClick={() => navigation("right")}
        />

        {!loading ? (
          <div className="carousel__items" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;

              return (
                <div
                  key={item.id}
                  className="carousel__item"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock">
                    <Image src={posterUrl} alt={item.title || item.name} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="carousel__content">
                    <h4 className="title">{item.title || item.name}</h4>
                    <time className="date">
                      {dayjs(item.release_Date).format("MMM D, YYYY")}
                    </time>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {[1, 2, 3, 4, 5].map((value) => skeletonItem(value))}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

Carousel.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,
  endpoint: PropTypes.string,
};

export default Carousel;
