import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Image from "../../../components/lazyLoadImage/Image";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;

              return (
                <div className="listItem" key={item.id}>
                  <figure className="profileImg">
                    <Image src={imgUrl} />
                  </figure>
                  <h5 className="name">{item.name}</h5>
                  <p className="chara">{item.character}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

Cast.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default Cast;
