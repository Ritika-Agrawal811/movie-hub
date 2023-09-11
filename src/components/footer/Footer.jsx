import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";
import logo from "../../assets/movix-logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const today = new Date();

  return (
    <footer className="page__footer">
      <ContentWrapper>
        <div className="col company__details">
          <div className="logo">
            <img src={logo} alt="MovieHub Logo" />
            <p>
              <Link to="/">MovieHub</Link>
            </p>
          </div>
          <p className="company__info">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia,
            corrupti placeat inventore eligendi obcaecati recusandae sit
            voluptate quis nisi exercitationem, accusantium sapiente, rem
            molestiae nostrum error nulla vero explicabo modi.
          </p>
        </div>

        <div className="col">
          <ul className="menu__list">
            <li className="menuItem">
              <Link to="/explore/movie">Movies</Link>
            </li>
            <li className="menuItem">
              <Link to="/explore/tv">TV Shows</Link>
            </li>
          </ul>

          <ul className="menu__list">
            <li className="menuItem">About</li>
            <li className="menuItem">Blog</li>
            <li className="menuItem">Terms of Use</li>
            <li className="menuItem">Privacy Policy</li>
          </ul>
        </div>

        <div className="col company__contact-block">
          <address>
            <p>All Park Avenue</p>
            <p>East, 21st Street</p>
            <p>San Francisco</p>
            <p>Email: help@moviehub.com</p>
          </address>
          <div className="socialIcons">
            <span className="icon">
              <FaFacebookF />
            </span>
            <span className="icon">
              <FaInstagram />
            </span>
            <span className="icon">
              <FaTwitter />
            </span>
            <span className="icon">
              <FaLinkedin />
            </span>
          </div>
        </div>
      </ContentWrapper>
      <hr />
      <ContentWrapper>
        <p className="company__copyright">
          Copyright &copy; {today.getFullYear()}
        </p>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
