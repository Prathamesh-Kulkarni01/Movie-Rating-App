import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";

import { Context } from "../context/AppContext";
import { Typography } from "@mui/material";

const MovieCard = ({ item }) => {
  const { selectedSeriesName, onSeriesSelect } = useContext(Context);
  const [clicked, setClicked] = useState(true);

  useEffect(() => {
    if (item.Title === selectedSeriesName) {
      setClicked(true);
    } else {
      setClicked(false);
    }
    return () => {};
  }, [item.Title, selectedSeriesName]);

  const handleSelectedCard = () => {
    onSeriesSelect(item.Title);
  };
  return (
    <Card
      style={
        clicked
          ? { backgroundColor: "#fbbb34", width: "410px" }
          : { width: "170px", height: "290px" }
      }
      sx={{ margin: "10px" }}
      onClick={() => handleSelectedCard()}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: clicked ? "row-reverse" : "column",
          backgroundColor: clicked ? "#3FCBC34" : "transparent",
        }}
      >
        <CardMedia
          component="img"
          height={clicked ? "270px" : "210px"}
          width={clicked ? "210px" : "2px"}
          sx={{
            borderRadius: "15px",
            margin: "6px",
            objectFit: "fill",
            maxWidth: clicked ? "180px" : "152px",
            padding: clicked ? "0px" : "initial",
            border: clicked ? "3px solid white" : "initial",
          }}
          image={item.Poster}
          alt="poster"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            padding: "0",
            margin: clicked ? "0px" : "10px",
            width: "100%",
          }}
        >
          <Box
            sx={
              clicked
                ? { width: "190px", marginLeft: "25px" }
                : { margin: "0px 10px 10px", padding: "0px", width: "100%" }
            }
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: "start",
                margin: 0,
                ...(clicked
                  ? {
                      padding: 0,
                      color: "white",
                      fontWeight: "600",
                      fontSize: "18px",
                    }
                  : {
                      fontSize: "18px",
                    }),
              }}
            >
              {item.Title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                textAlign: "start",
                margin: "1px",
                fontSize: "13px",
                fontWeight: "600",
                color: clicked ? "white" : "initial",
                display: clicked ? "block" : "none",
              }}
            >
              {item.ep} Episodes
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{
                textAlign: "start",
                margin: "1px",
                fontSize: "13px",
                fontWeight: "600",
                color: clicked ? "white" : "initial",
                display: clicked ? "block" : "none",
              }}
            >
              {item.totalSeasons} Seasons
            </Typography>
            <Box
              sx={{
                height: clicked ? "130px" : "0px",
              }}
            ></Box>
          </Box>
          <Box sx={clicked ? { marginLeft: "25px" } : { marginLeft: "10px" }}>
            <Typography
              variant="body1"
              component="p"
              sx={{
                textAlign: "start",
                fontSize: "13px",
                fontWeight: "600",
                color: clicked ? "white" : "initial",
                marginTop: clicked ? 0 : "-2px",
              }}
            >
              <strong>IMDB Rating :</strong> {item.imdbRating}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{
                textAlign: "start",
                fontSize: "13px",
                fontWeight: "600",
                color: clicked ? "white" : "initial",
                display: clicked ? "block" : "none",
              }}
            >
              <strong>Go to IMDB Page</strong>
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
