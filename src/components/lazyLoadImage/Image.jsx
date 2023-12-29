import PropTypes from "prop-types"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

const Image = ({ src, className, alt }) => {
    return <LazyLoadImage className={className || ""} alt={alt} effect='blur' src={src} />
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    alt: PropTypes.string,
}

export default Image
