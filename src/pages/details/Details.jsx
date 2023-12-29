import { useParams } from "react-router-dom"
import useFetch from "@/hooks/useFetch"

import DetailsBanner from "@/pages/details/detailsBanner/DetailsBanner"
import VideosSection from "@/pages/details/videosSection/VideosSection"
import Similar from "@/pages/details/carousels/Similar"
import Recommendations from "@/pages/details/carousels/Recommendations"
import Cast from "@/pages/details/cast/Cast"

const Details = () => {
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`)
    return (
        <main>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            {data?.results?.length !== 0 && <VideosSection data={data} loading={loading} />}
            <Similar mediaType={mediaType} id={id} />
            <Recommendations mediaType={mediaType} id={id} />
        </main>
    )
}

export default Details
