import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./style.scss";
import useWindowSize from "../../hooks/useWindowSize";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 768) {
      setLeft("2px");
    } else {
      setLeft("4px");
    }
  }, [width]);

  const activeTab = (tab, index) => {
    if (width < 768) {
      // setting left for mobile screens
      setLeft(index * 58 + 2);
    } else if (width < 1024) {
      // setting left for tablet screens
      setLeft(index * 78 + 4);
    } else {
      // setting left for desktop screens
      setLeft(index * 100 + 6);
    }

    setTimeout(() => {
      setSelectedTab(index);
    }, 300);

    onTabChange(tab, index);
  };

  return (
    <div className="switching__tabs">
      <div className="tab__items">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="gradient__background" style={{ left }}></span>
      </div>
    </div>
  );
};

SwitchTabs.propTypes = {
  data: PropTypes.array.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default SwitchTabs;
