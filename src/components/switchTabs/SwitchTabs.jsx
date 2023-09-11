import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./style.scss";
import useWindowSize from "../../hooks/useWindowSize";

const SwitchTabs = ({ data, onTabChange }) => {
  const [currentTab, setCurrentTab] = useState({ index: 0, left: 0 });
  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 768) {
      setCurrentTab((prev) => ({ ...prev, left: "2px" }));
    } else {
      setCurrentTab((prev) => ({ ...prev, left: "4px" }));
    }
  }, [width]);

  const activeTab = (tab, index) => {
    if (width < 768) {
      // setting left for mobile screens
      setCurrentTab((prev) => ({ ...prev, left: index * 58 + 2 }));
    } else if (width < 1024) {
      // setting left for tablet screens
      setCurrentTab((prev) => ({ ...prev, left: index * 78 + 4 }));
    } else {
      // setting left for desktop screens
      setCurrentTab((prev) => ({ ...prev, left: index * 100 + 6 }));
    }

    setTimeout(() => {
      setCurrentTab((prev) => ({ ...prev, index }));
    }, 300);

    onTabChange(tab, index);
  };

  return (
    <div className="switching__tabs">
      <div className="tab__items">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${currentTab.index === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span
          className="gradient__background"
          style={{ left: currentTab.left }}
        ></span>
      </div>
    </div>
  );
};

SwitchTabs.propTypes = {
  data: PropTypes.array.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default SwitchTabs;
