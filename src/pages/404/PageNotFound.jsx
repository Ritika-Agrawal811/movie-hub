import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import Image from "@/components/lazyLoadImage/Image";
import rightPlugImage from "@/assets/right-plug.png";
import leftPlugImage from "@/assets/left-plug.png";
const PageNotFound = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if ((event.type === "click" || event.key === "Enter") && query) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <section className="error__page">
      <ContentWrapper>
        <h2 className="error__title">404</h2>
        <div className="error__subBlock">
          <Image src={leftPlugImage} alt="left plug" className="left-plug" />
          <h3 className="error__subtitle">not found</h3>
          <Image src={rightPlugImage} alt="right plug" className="right-plug" />
        </div>

        <section className="search__container">
          <label htmlFor="searchField">
            Please enter a Movie or TV Show you are looking for.
          </label>
          <div className="searchInput">
            <input
              autoComplete="off"
              type="text"
              placeholder="Search"
              id="searchField"
              name="searchbox"
              role="search"
              value={query}
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button onClick={searchQueryHandler}>Search</button>
          </div>
        </section>
      </ContentWrapper>
    </section>
  );
};

export default PageNotFound;
