import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getApiConfiguration, getGenres } from "./store/homeSlice"
import { fetchDataFromApi } from "./utils/api"

// components
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import Details from "./pages/details/Details"
import SearchResults from "./pages/searchResults/SearchResults"
import Explore from "./pages/explore/Explore"
import PageNotFound from "./pages/404/PageNotFound"

function App() {
    const dispatch = useDispatch()

    const storeGenres = async () => {
        let promises = []
        let endPoints = ["tv", "movie"]
        let allGenres = {}

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`))
        })

        const data = await Promise.all(promises)
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item))
        })

        dispatch(getGenres(allGenres))
    }

    useEffect(() => {
        const storeConfigurationData = async () => {
            try {
                const response = await fetchDataFromApi("/configuration")
                const url = {
                    backdrop: response.images.secure_base_url + "original",
                    poster: response.images.secure_base_url + "original",
                    profile: response.images.secure_base_url + "original",
                }
                dispatch(getApiConfiguration(url))
            } catch (error) {
                console.log(error.message)
            }
        }

        storeConfigurationData()
        storeGenres()
    }, [])

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:mediaType/:id' element={<Details />} />
                <Route path='/search/:query' element={<SearchResults />} />
                <Route path='/explore/:mediaType' element={<Explore />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
