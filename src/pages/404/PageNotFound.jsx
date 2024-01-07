import { useState } from "react"
import { useNavigate } from "react-router-dom"

import "./style.scss"

import ContentWrapper from "@/components/contentWrapper/ContentWrapper"
import SearchField from "@/components/searchField/SearchField"
import Image from "@/components/lazyLoadImage/Image"
import rightPlugImage from "@/assets/right-plug.png"
import leftPlugImage from "@/assets/left-plug.png"

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
                <h2 className='error__title'>404</h2>
                <div className='error__subBlock'>
                    <Image src={leftPlugImage} alt='left plug' className='left-plug' />
                    <h3 className='error__subtitle'>not found</h3>
                    <Image src={rightPlugImage} alt='right plug' className='right-plug' />
                </div>

                <section className='search__container'>
                    <SearchField query={query} setQuery={setQuery} searchQueryHandler={searchQueryHandler} />
                </section>
            </ContentWrapper>
        </section>
    )
}

export default PageNotFound
