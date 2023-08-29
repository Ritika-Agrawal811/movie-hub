import "./style.scss";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres__container">
      {data?.map((genreID) => {
        if (!genres[genreID]?.name) return;
        return (
          <div className="genre" key={genreID}>
            {genres[genreID]?.name}
          </div>
        );
      })}
    </div>
  );
};

Genres.propTypes = {
  data: PropTypes.array,
};

export default Genres;
