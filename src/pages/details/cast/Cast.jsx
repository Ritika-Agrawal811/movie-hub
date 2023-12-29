import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./style.scss";

import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import Image from "@/components/lazyLoadImage/Image";
import avatar from "@/assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = (value) => {
    return (
      <div className="skItem" key={value}>
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <section className="cast__section">
      <ContentWrapper>
        <h2 className="heading">Cast</h2>
        {!loading && data.length !== 0 ? (
          <div className="list__items">
            {data.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;

              return (
                <div className="listItem" key={item.id}>
                  <figure className="cast__image">
                    <Image src={imgUrl} />
                  </figure>
                  <h5 className="name">{item.name}</h5>
                  <p className="character">{item.character}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {[1, 2, 3, 4, 5].map((value) => skeleton(value))}
          </div>
        )}
      </ContentWrapper>
    </section>
  );
};

Cast.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default Cast;
