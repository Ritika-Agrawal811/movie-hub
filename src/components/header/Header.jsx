import { useState, useEffect, useRef } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { SlMenu } from "react-icons/sl"
import { VscChromeClose } from "react-icons/vsc"
import { useNavigate, useLocation, Link } from "react-router-dom"

import "./style.scss"
import logo from "@/assets/movix-logo.svg"
import ContentWrapper from "@/components/contentWrapper/ContentWrapper"

const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false)
    const [scroll, setScroll] = useState({ class: "top", lastScrollY: 0 })
    const [search, setSearch] = useState({ query: "", show: false })
    const navigate = useNavigate()
    const location = useLocation()
    const searchInput = useRef(null)

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > 200) {
                if (window.scrollY > scroll.lastScrollY && !mobileMenu) {
                    setScroll((prev) => ({ ...prev, class: "hide" }))
                } else {
                    setScroll((prev) => ({ ...prev, class: "show" }))
                }
            } else {
                setScroll((prev) => ({ ...prev, class: "top" }))
            }

            setScroll((prev) => ({ ...prev, lastScrollY: window.scrollY }))
        }

        window.addEventListener("scroll", controlNavbar)

        return () => window.removeEventListener("scroll", controlNavbar)
    }, [scroll.lastScrollY, mobileMenu])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        if (search.show && searchInput && searchInput.current) {
            searchInput.current.focus()
        }
    }, [search.show])

    const openSearch = () => {
        setMobileMenu(false)
        setSearch((prev) => ({ ...prev, show: true }))
    }

    const openMobileMenu = () => {
        setMobileMenu(true)
        setSearch((prev) => ({ ...prev, show: false }))
    }

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && search.query) {
            navigate(`/search/${search.query}`)
            setTimeout(() => {
                setSearch((prev) => ({ ...prev, query: "", show: false }))
            }, 0)
        }
    }

    return (
        <header className={`page__header ${mobileMenu ? "mobile__view" : ""} ${scroll.class}`}>
            <ContentWrapper>
                <div className='logo'>
                    <img src={logo} alt='MovieHub Logo' />
                    <p>
                        <Link to='/'>MovieHub</Link>
                    </p>
                </div>
                <nav>
                    <ul className='menu__list'>
                        <li className='menuItem'>
                            <Link to='/explore/movie' onClick={() => setMobileMenu(false)}>
                                Movies
                            </Link>
                        </li>
                        <li className='menuItem'>
                            <Link to='/explore/tv' onClick={() => setMobileMenu(false)}>
                                TV Shows
                            </Link>
                        </li>
                        <li className='menuItem'>
                            <HiOutlineSearch onClick={openSearch} />
                        </li>
                    </ul>

                    <div className='mobile__menu-list'>
                        <HiOutlineSearch onClick={openSearch} />
                        {mobileMenu ? (
                            <VscChromeClose onClick={() => setMobileMenu(false)} />
                        ) : (
                            <SlMenu onClick={openMobileMenu} />
                        )}
                    </div>
                </nav>
            </ContentWrapper>

            {search.show && (
                <div className='searchBar'>
                    <ContentWrapper>
                        <div className='searchInput'>
                            <label htmlFor='searchBox'>Search for a movie for tv show</label>
                            <input
                                type='text'
                                placeholder='Search for a Movie or TV show...'
                                id='searchBox'
                                role='search'
                                autoComplete='off'
                                ref={searchInput}
                                value={search.query}
                                onKeyUp={searchQueryHandler}
                                onChange={(e) => setSearch((prev) => ({ ...prev, query: e.target.value }))}
                            />

                            <VscChromeClose onClick={() => setSearch((prev) => ({ ...prev, show: false }))} />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    )
}

export default Header
