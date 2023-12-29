import { useState } from "react"
import useFetch from "@/hooks/useFetch"
import ContentWrapper from "@/components/contentWrapper/ContentWrapper"
import SwitchTabs from "@/components/switchTabs/SwitchTabs"
import Carousel from "@/components/carousel/Carousel"

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day")
    const { data, loading } = useFetch(`/trending/all/${endpoint}`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week")
    }

    return (
        <section className='carousel'>
            <ContentWrapper>
                <div className='carousel__header'>
                    <h2 className='carousel__title'>Trending</h2>
                    <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
                </div>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </section>
    )
}

export default Trending
