import React, { useEffect, useRef, useState } from "react";

import MyAppBar from "./MyAppBar";
import Property from "./property";
import "../styles/propertyPage.css";
import axios from "axios";
import { Container, Grid, Paper, experimentalStyled as styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function loadPropertyData(setData, pageType) {
  let endpoint = "";
  if (pageType === "buy") endpoint = "http://localhost:5000/buyproperties";
  else endpoint = "http://localhost:5000/rentproperties";

  console.log(endpoint);
  // load property data according to type(buy or rent)
  axios
    .get(endpoint)
    .then((res) => {
      setData(res.data.slice(0, 100));
    })
    .catch((err) => console.log(err));
}

export default function PropertyPage({ pageType }) {
  const bg = pageType === "buy" ? true : false;
  const [propertyData, setPropertyData] = useState([]);
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();
  useEffect(() => {
    loadPropertyData(setPropertyData, pageType);
  }, [pageType]);

  useEffect(() => {
    executeScroll();
  });

  return (
    <div className="backGround">
      <MyAppBar isBg={bg} />
      {bg ? "" : <h1 style={{ marginTop: "120px" }}></h1>}
      <Container sx={{ mt: "2rem" }} fixed id="properties" ref={myRef}>
        <Grid
          container
          rowspacing={{ xs: 4, md: 6 }}
          columnspacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(propertyData.length)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Property data={propertyData[index]} type={pageType} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}