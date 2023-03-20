import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, CardActionArea} from "@mui/material";
import { Context } from "../context/AppContext";

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
  }, [selectedSeriesName]);

  const handleSelectedCard = () => {
    onSeriesSelect(item.Title);
  };
  return (
    <Card
      style={
        clicked
          ? { backgroundColor: "#fbbb34", width: "410px" }
          : { width: "190px", height: "300px" }
      }
      sx={{ margin: "10px" }}
      onClick={() => handleSelectedCard()}
    >
      <CardActionArea
        sx={
          clicked
            ? {
                display: "flex",
                flexDirection: "row-reverse",
                backgroundColor: "#3FCBC34",
              }
            : { display: "flex", flexDirection: "column" }
        }
      >
        <CardMedia
          component="img"
          height={clicked ? "270px" : "210px"}
          width={clicked ? "200px" : "172px"}
          style={
            clicked
              ? {
                  maxWidth: "160px",
                  padding: "0px",
                  margin: "12px",
                  border: "3px solid white",
                }
              : { maxWidth: "172px" }
          }
          sx={{
            borderRadius: "15px",
            padding: "8px 9px 0px 9px",
            margin: "auto",
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
            margin: "0px",
            width: "100%",
          }}
        >
          <Box
            sx={
              clicked
                ? { width: "190px", marginLeft: "25px" }
                : { margin: "10px", padding: "0px", width: "100%" }
            }
          >
            <h2
              style={
                clicked
                  ? {
                      textAlign: "start",
                      margin: "0px",
                      padding: "0px",
                      color: "white",
                    }
                  : { textAlign: "start", margin: "0px" }
              }
            >
              {item.Title}
            </h2>
            <h4
              style={
                clicked
                  ? { textAlign: "start", margin: "1px", color: "white" }
                  : { display: "none" }
              }
            >
              {item.ep} Episodes
            </h4>
            <h4
         
              variant="h5"
              component="div"
              style={
                clicked
                  ? { textAlign: "start", margin: "1px", color: "white" }
                  : { display: "none" }
              }
            >
              {item.totalSeasons-1} Seasions
            </h4>
            <Box
              style={clicked ? { height: "130px" } : { height: "0px" }}
            ></Box>
          </Box>
          <Box sx={clicked ? { marginLeft: "25px" } : { marginLeft: "10px" }}>
            <p
              style={
                clicked
                  ? { textAlign: "start", color: "white" }
                  : {
                      textAlign: "start",
                      marginTop: "-2px",
                    }
              }
            >
              <strong>IMDB Rating :</strong> {item.imdbRating}
            </p>
            <p
              style={
                clicked
                  ? { textAlign: "start", color: "white" }
                  : { display: "none" }
              }
            >
              <strong>Go to IMDB Page</strong>
            </p>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
