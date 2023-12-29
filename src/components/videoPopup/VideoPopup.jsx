import ReactPlayer from "react-player/youtube"
import PropTypes from "prop-types"
import { AiFillCloseCircle } from "react-icons/ai"
import "./style.scss"

const VideoPopup = ({ show, setShow, videoID, setVideoID }) => {
    const hidePopup = () => {
        setShow(false)
        setVideoID(null)
    }
    return (
        <section className={`video__popup ${show ? "visible" : ""}`}>
            <div className='opacity__layer' onClick={hidePopup}></div>
            <div className='video__player'>
                <button className='closeBtn' onClick={hidePopup}>
                    <AiFillCloseCircle /> Close
                </button>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${videoID}`} controls width='100%' height='100%' />
            </div>
        </section>
    )
}

VideoPopup.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func,
    videoID: PropTypes.string,
    setVideoID: PropTypes.func,
}

export default VideoPopup
