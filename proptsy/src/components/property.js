import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/property.css";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 310,
    transition: "transform 0.15s ease-in-out",
  },
  cardHovered: {
    transform: "scale3d(1.05, 1.05, 1)",
  },
});

export default function PropertyCard({ data, type }) {
  const navigate = useNavigate();

  const classes = useStyles();
  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  });

  function cardOnClick() {
    let obj = { data: data, type: type };
    navigate("/indivproperty", { state: obj });
  }

  return (
    <Card
      onClick={cardOnClick}
      sx={{ maxWidth: 345, lineHeight: 5 }}
      className={classes.root}
      classes={{ root: state.raised ? classes.cardHovered : "" }}
      onMouseOver={() => setState({ raised: true, shadow: 3 })}
      onMouseOut={() => setState({ raised: false, shadow: 1 })}
      raised={state.raised}
      zdepth={state.shadow}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={data["image"]}
          alt={data["name"]}
        />
        <hr style={{ margin: "0", padding: "0" }} />
        <CardContent className="cardStyle">
          <Typography
            className="textStyle"
            sx={{ m: 0 }}
            gutterBottom
            variant="subtitle1"
            component="div"
            align="left"
          >
            <strong>{data["name"]}</strong>
          </Typography>
          <Typography
            className="textStyle"
            sx={{ m: 0 }}
            gutterBottom
            variant="subtitle1"
            component="div"
            align="left"
          >
            {data["propertyType"]} {data["rooms"]}
          </Typography>
          <Typography
            className="textStyle"
            sx={{ m: 0 }}
            variant="body1"
            color="#F7F7F7"
            align="left"
          >
            In {data["location"]}, Pune
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}