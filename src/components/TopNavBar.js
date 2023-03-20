import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";

import { Context } from "../context/AppContext";

export default function TopNavBar() {
  const { searchData, searchBy } = useContext(Context);

  const [searchBarShow, setSearchBarShow] = useState(false);

  const [dateTime, setDateTime] = useState("");

  setTimeout(() => {
    setDateTime(moment().format("d MMM, hh:mm"));
  }, 1000);
  return (
    <Box sx={{}}>
      <AppBar position="static" sx={{ bgcolor: "#efeeef", color: "black" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "22px" }}>
            Watch
            <strong style={{ fontWeight: "900px ", fontStyle: "bold" }}>
              This
            </strong>
          </p>

          <Box
            sx={{
              alignItems: "center",
              fontFamily: "monospace",
              fontSize: "18px",
              color: "gray",
              justifyContent: "center",
              display: {
                sm: "none",
                md: "flex",
                xs: "none",
                lg: "flex",
                xl: "flex",
              },
            }}
          >
            <AccessTimeIcon></AccessTimeIcon>

            {dateTime.slice(0, 6)}
            <span style={{ color: "black" }}> {dateTime.slice(6)}</span>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                alignItems: "center",
                display: {
                  sm: "flex",
                  md: "flex",
                  xs: "none",
                  xl: "flex",
                  lg: "flex",
                },
              }}
            >
              <select style={{ outline: "none", border: "none", ml: "20px" }}>
                <option value="">Richa Shaha</option>
              </select>
              <PersonOutlineIcon sx={{ margin: "0px auto" }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {searchBarShow && (
                  <Autocomplete
                    disablePortal
                    defaultValue = "" 
                    options={searchData}
                    getOptionLabel={(option) => option.Title}
                    sx={{ minWidth: "300px", ml: 2 }}
                    fullWidth={true}
                    disableSdItemsFocusable
                    onInputChange={(e) => {
                      console.log("" + e.target.value);
                      searchBy(e.target.value);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
                <MenuItem onClick={() => setSearchBarShow(!searchBarShow)}>
                  <SearchIcon></SearchIcon>
                </MenuItem>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}