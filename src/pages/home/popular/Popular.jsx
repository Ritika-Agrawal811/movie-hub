import { useState } from "react"
import useFetch from "@/hooks/useFetch"
import ContentWrapper from "@/components/contentWrapper/ContentWrapper"
import SwitchTabs from "@/components/switchTabs/SwitchTabs"
import Carousel from "@/components/carousel/Carousel"

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie")
    const { data, loading } = useFetch(`/${endpoint}/popular`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    }

    return (
        <section className='carousel'>
            <ContentWrapper>
                <div className='carousel__header'>
                    <h2 className='carousel__title'>What&#39;s Popular</h2>
                    <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
                </div>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </section>
    )
}

export default Popular
