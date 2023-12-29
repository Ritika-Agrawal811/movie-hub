import PropTypes from "prop-types";
import Carousel from "@/components/carousel/Carousel";
import useFetch from "@/hooks/useFetch";

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <>
      {data?.results?.length !== 0 && (
        <Carousel
          title={title}
          data={data?.results}
          loading={loading}
          endpoint={mediaType}
        />
      )}
    </>
  );
};

Similar.propTypes = {
  mediaType: PropTypes.string,
  id: PropTypes.string,
};

export default Similar;
