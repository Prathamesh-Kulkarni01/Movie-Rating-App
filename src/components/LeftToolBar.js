import { styled } from "@mui/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import TheatersIcon from "@mui/icons-material/Theaters";

import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const TabHolderBox = styled(Box)({
  width: "120px",
  minHeight: "100%",
  backgroundColor: "#3c3b3c",
  overflow: "hidden",
});

const LeftToolBar = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const routes = ["/", "/tv-shows", "/movies"];

  useEffect(() => {
    let urlPath = window.location.pathname;
    let currentTab = urlPath.split("/").pop();
    if (currentTab === "") {
      setValue(0);
    } else if (currentTab === "tv-shows") {
      setValue(1);
    } else {
      setValue(2);
    }
  }, []);

  const handleChange = (event, index) => {
    setValue(index);
    navigate(routes[index]);
  };
  return (
    <TabHolderBox>
      <Tabs
        value={value}
        orientation="vertical"
        indicatorColor={"#000000"}
        
        style={{ padding: " 80px  5px 10px"  }}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab
        style={{ padding: " 30px 5px" }}
          sx={{ color: "gray",pb: "40px"  }}
          icon={<HomeIcon />}
          label="Home"
        ></Tab>
        <Tab
          style={{ padding: " 30px 5px" }}
          sx={{ color: "gray", pb: "40px" }}
          icon={<OndemandVideoIcon />}
          label="TV Shows"
        />
        <Tab
         style={{ padding: " 30px 5px" }}
          sx={{ color: "gray", pb: "40px" }}
          icon={<TheatersIcon />}
          label="Movies"
        />
      </Tabs>
    </TabHolderBox>
  );
};

export default LeftToolBar;
