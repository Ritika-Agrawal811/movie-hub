import { useState, useEffect } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useNavigate } from "react-router-dom"
import useFetch from "@/hooks/useFetch"

import Image from "@/components/lazyLoadImage/Image"
import ContentWrapper from "@/components/contentWrapper/ContentWrapper"
import SearchField from "@/components/searchField/SearchField"
import "./style.scss"

const HeroBanner = () => {
    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")
    const { data, loading } = useFetch("/movie/upcoming")
    const { url } = useSelector((state) => state.home)
    const navigate = useNavigate()

    useEffect(() => {
        const bgImage = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
        setBackground(bgImage)
    }, [data, url.backdrop])

    const searchQueryHandler = (event) => {
        if ((event.type === "click" || event.key === "Enter") && query) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <section className='hero-banner'>
            {!loading && (
                <div className='backdrop-img'>
                    <Image src={background} />
                </div>
            )}
            <div className='opacity-layer'></div>
            <ContentWrapper>
                <section className='hero-banner__content'>
                    <h1 className='title'>Welcome</h1>
                    <p className='subTitle'>Millions of movies, TV shows and people to discover. Explore now.</p>
                </section>
                <SearchField query={query} setQuery={setQuery} searchQueryHandler={searchQueryHandler} />
            </ContentWrapper>
        </section>
    )
}

export default HeroBanner
