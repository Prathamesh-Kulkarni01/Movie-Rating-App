import React, { useContext } from "react";
import { Context } from "../context/AppContext";
import RatingCard from "./RatingCard";

const RatingCardHolder = () => {
  const { ratingsForSelectedItem } = useContext(Context);

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "40px",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      {ratingsForSelectedItem
        .sort((a, b) => {
          return Number(a.SeasonNo) - Number(b.SeasonNo);
        })
        .map((val, key) => {
          return (
            <div key={key}>
              {val && val.SeasonNo !== undefined && (
                <RatingCard key={key} item={val} />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default RatingCardHolder;
