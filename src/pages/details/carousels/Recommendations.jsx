import PropTypes from "prop-types";
import Carousel from "@/components/carousel/Carousel";
import useFetch from "@/hooks/useFetch";

const Recommendations = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <>
      {data?.results?.length !== 0 && (
        <Carousel
          title="Recommendations"
          data={data?.results}
          loading={loading}
          endpoint={mediaType}
        />
      )}
    </>
  );
};

Recommendations.propTypes = {
  mediaType: PropTypes.string,
  id: PropTypes.string,
};

export default Recommendations;
