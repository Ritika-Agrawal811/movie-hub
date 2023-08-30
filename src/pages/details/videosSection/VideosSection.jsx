import PropTypes from "prop-types";
import { useState } from "react";
import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../../../icons/PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Image from "../../../components/lazyLoadImage/Image";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoID, setVideoID] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data?.results?.map((video) => (
              <div
                className="videoItem"
                key={video.id}
                onClick={() => {
                  setVideoID(video.key);
                  setShow(true);
                }}
              >
                <div className="videoThumbnail">
                  <Image
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <h5 className="videoTitle">{video.name}</h5>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoID={videoID}
        setVideoID={setVideoID}
      />
    </div>
  );
};

VideosSection.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default VideosSection;
