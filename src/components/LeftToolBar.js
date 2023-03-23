import { styled } from "@mui/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import TheatersIcon from "@mui/icons-material/Theaters";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TabHolderBox = styled(Box)({
  width: "100px",
  minHeight: "100%",
  backgroundColor: "#3c3b3c",
  overflow: "hidden",
  position:"fixed"
});

const LeftToolBar = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const routes = ["/", "/tv-shows", "/movies"];
  const tabStack = [
    {
      icon: <HomeIcon />,
      label: "Home",
    },
    {
      icon: <OndemandVideoIcon />,
      label: "TV Shows",
    },
    {
      icon: <TheatersIcon />,
      label: "Movies",
    },
  ];

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
        sx={{mt:8}}
        orientation="vertical"
        indicatorColor={"#000000"}
        onChange={handleChange}
      >
        {tabStack.map((item,key) => {
          return (
            <Tab
            key={key}
              sx={{
                fontSize: ".6rem",
                color: "gray",
                pt: 4,
                "&.Mui-selected": {
                  color: "#FCBC34",
                },
              }}
              icon={item.icon}
              label={item.label}
            ></Tab>
          );
        })}
      </Tabs>
    </TabHolderBox>
  );
};

export default LeftToolBar;
