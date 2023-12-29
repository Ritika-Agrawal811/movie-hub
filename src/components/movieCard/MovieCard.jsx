import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Image from "@/components/lazyLoadImage/Image";
import PosterFallback from "@/assets/no-poster.png";

const MovieCard = ({ data, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  return (
    <article
      className="movie__card"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <figure className="poster__block">
        <Image className="poster_image" src={posterUrl} />
      </figure>
      <div className="movie-card__content">
        <h3 className="title">{data.title || data.name}</h3>
        <time className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </time>
      </div>
    </article>
  );
};

MovieCard.propTypes = {
  data: PropTypes.object.isRequired,
  mediaType: PropTypes.string,
};

export default MovieCard;
