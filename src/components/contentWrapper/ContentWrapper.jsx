import PropTypes from "prop-types";
import "./style.scss";

const ContentWrapper = ({ children }) => {
  return <section className="content__wrapper">{children}</section>;
};

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentWrapper;
