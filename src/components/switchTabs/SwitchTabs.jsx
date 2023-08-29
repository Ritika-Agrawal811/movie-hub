import { useState } from "react";
import PropTypes from "prop-types";

import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState("6px");

  const activeTab = (tab, index) => {
    setLeft(index * 100 + 6);

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
        <span className="movingBg" style={{ left }}></span>
      </div>
    </div>
  );
};

SwitchTabs.propTypes = {
  data: PropTypes.array.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default SwitchTabs;
