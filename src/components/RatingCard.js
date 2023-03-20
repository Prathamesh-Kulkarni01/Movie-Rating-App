import { Card, CircularProgress } from "@mui/material";
import React from "react";

const RatingCard = ({ item }) => {
  return (
    <Card
      sx={{
        minWidth: "200px",
        minHeight: "200px",
        margin: "8px",
        padding: "12px",
      }}
    >
      {item.SeasonNo && (
        <h3 style={{ textAlign: "start" }}>Season {item.SeasonNo}</h3>
      )}
      <p style={{ textAlign: "start" }}>Rating</p>
      <div
        style={{ minWidth: "100px", minHeight: "100px", position: "relative" }}
      >
        <p style={{ position: "absolute", top: "25%", left: "45%" }}>
          {" "}
          {(item.rating * 10) / 100}
        </p>

        <CircularProgress
          sx={{ color: "#fbbb34", minWidth: "100px", minHeight: "100px" }}
          variant="determinate"
          value={item.rating}
        />
      </div>
    </Card>
  );
};

export default RatingCard;
