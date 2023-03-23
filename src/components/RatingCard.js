import { Box, Card, CircularProgress } from "@mui/material";
import { styled } from "@mui/styles";
import React from "react";

const CardWrapper = styled(Card)(() => ({
  minWidth: "200px",
  minHeight: "200px",
  margin: "8px",
  padding: "12px",
}));
const Rating = styled("p")(() => ({
  position: "absolute",
  top: "25%",
  left: "45%",
}));

const RatingText = styled("p")(() => ({
  textAlign: "start",
}));
const RatingTextHeader = styled("h3")(() => ({
  textAlign: "start",
}));

const RatingCard = ({ item }) => {
  return (
    <CardWrapper>
      {item.SeasonNo && (
        <RatingTextHeader>Season {item.SeasonNo}</RatingTextHeader>
      )}
      <RatingText>Rating</RatingText>
      <Box sx={{ minWidth: "100px", minHeight: "100px", position: "relative" }}>
        <Rating> {(item.rating * 10) / 100}</Rating>

        <CircularProgress
          sx={{ color: "#fbbb34", minWidth: "100px", minHeight: "100px" }}
          variant="determinate"
          value={item.rating}
        />
      </Box>
    </CardWrapper>
  );
};

export default RatingCard;
