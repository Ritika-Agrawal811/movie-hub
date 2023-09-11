import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Image from "../../../components/lazyLoadImage/Image";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../../../icons/PlayIcon";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoID, setVideoID] = useState(null);
  const { mediaType, id } = useParams();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const _genres = data?.genres?.map((item) => item.id);
  const director = crew?.filter((item) => item.job === "Director");
  const writer = crew?.filter(
    (item) =>
      item.job === "Screenplay" || item.job === "Story" || item.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
  };

  return (
    <section className="details__banner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div>
                <figure className="backdrop__image">
                  <Image src={url.backdrop + data?.backdrop_path} />
                </figure>
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Image
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Image className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <h2 className="title">{`${data.name || data.title} (${dayjs(
                      data.release_date
                    ).format("YYYY")})`}</h2>
                    {data.tagline && <p className="subtitle">{data.tagline}</p>}
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoID(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    <div className="overview">
                      <h3 className="heading">Overview</h3>
                      <p className="description">{data.overview}</p>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status</span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date</span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime</span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director</span>
                        <span className="text">
                          {director.map((item, index) => (
                            <span key={index}>
                              {item.name}
                              {director.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer</span>
                        <span className="text">
                          {writer.map((item, index) => (
                            <span key={index}>
                              {item.name}
                              {writer.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator</span>
                        <span className="text">
                          {data?.created_by?.map((item, index) => (
                            <span key={index}>
                              {item.name}
                              {data?.created_by?.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoID={videoID}
                  setVideoID={setVideoID}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <div key={item} className="row skeleton"></div>
              ))}
            </div>
          </ContentWrapper>
        </div>
      )}
    </section>
  );
};

DetailsBanner.propTypes = {
  crew: PropTypes.array,
  video: PropTypes.object,
};

export default DetailsBanner;
