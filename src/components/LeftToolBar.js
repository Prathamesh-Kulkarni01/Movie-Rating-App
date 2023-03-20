// import { Tab, Tabs } from '@mui/material'
import React, { useEffect } from "react";

import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import TheatersIcon from "@mui/icons-material/Theaters";
import { Box, Tab, Tabs } from "@mui/material";
import {  useNavigate } from "react-router-dom";

const LeftToolBar = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const routes = ["/", "/tv-shows", "/movies"];


useEffect(() => {
  
  let urlPath = window.location.pathname;
  let currentTab = urlPath.split('/').pop();
  if(currentTab===""){
setValue(0)
  }else if(currentTab==="tv-shows"){
setValue(1)
  }else{
setValue(2)
  }

}, [])


  const handleChange = (event, index) => {
    setValue(index);
    navigate(routes[index]);
  };
  return (
    <Box
      sx={{
        width: "100px",
        minHeight: "100%",
        backgroundColor: "#3c3b3c",
        overflow: "hidden",
      }}
    >
      <Tabs
        value={value}
        orientation="vertical"
        indicatorColor={"#000000"}
        sx={{ pt: "90px" }}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab
          sx={{ color: "gray", pb: "40px" }}
          icon={<HomeIcon />}
          label="Home"
        ></Tab>
        <Tab
          sx={{ color: "gray", pb: "40px" }}
          icon={<OndemandVideoIcon />}
          label="TV Shows"
        />
        <Tab
          sx={{ color: "gray", pb: "40px" }}
          icon={<TheatersIcon />}
          label="Movies"
        />
      </Tabs>
    </Box>
  );
};

export default LeftToolBar;
