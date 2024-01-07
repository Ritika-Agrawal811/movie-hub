import { useState } from "react"
import { useNavigate } from "react-router-dom"

import "./style.scss"

import ContentWrapper from "@/components/contentWrapper/ContentWrapper"
import SearchField from "@/components/searchField/SearchField"
import Image from "@/components/lazyLoadImage/Image"
import notFoundImage from "@/assets/not-found.png"

const PageNotFound = () => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const searchQueryHandler = (event) => {
        if ((event.type === "click" || event.key === "Enter") && query) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <section className='error__page'>
            <ContentWrapper>
                <figure className='error__image-container'>
                    <Image src={notFoundImage} className='error__image' />
                </figure>
                <h2 className='error__title'>Page Not Found</h2>
                <p className='error__subtitle'>
                    Oops! Looks like the page you are looking for doesn&apos;t exist. Search for a movie or a TV show
                    from the search bar.
                </p>

                <section className='search__container'>
                    <SearchField query={query} setQuery={setQuery} searchQueryHandler={searchQueryHandler} />
                </section>
            </ContentWrapper>
        </section>
    )
}

export default PageNotFound
