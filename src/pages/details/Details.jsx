import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import DetailsBanner from "./detailsBanner/DetailsBanner";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendations from "./carousels/Recommendations";
import Cast from "./cast/Cast";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <main>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      {data?.results?.length !== 0 && (
        <VideosSection data={data} loading={loading} />
      )}
      <Similar mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </main>
  );
};

export default Details;
