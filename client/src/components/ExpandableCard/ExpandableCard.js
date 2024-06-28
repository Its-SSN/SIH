import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Chip } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ExpandableCard({
  title,
  date,
  shortContent,
  expandedContent,
  tonality,
}) {
  let ispositive = tonality === "POSITIVE";
  let isneutral = tonality === "NEUTRAL";
  let isnegative = tonality === "NEGATIVE";
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        action={
          <Chip
            sx={{
              //adjust bgcolor according to tonality
              backgroundColor: ispositive
                ? "green"
                : isnegative
                ? "red"
                : "orange",
              color: ispositive ? "white" : isnegative ? "white" : "#0f172a",
              // color: "black",
              fontWeight: "bold",
              padding: 0.1,
              m: 1,
              fontSize: "11px",
              // height: "auto",
              // "& .MuiChip-label": {
              //   display: "block",
              //   whiteSpace: "normal",
              // },
            }}
            
            label={
              tonality === "POSITIVE"
                ? "POSITIVE"
                : tonality === "NEGATIVE"
                ? "NEGATIVE"
                : "NEUTRAL"
            }
          />
        }
        sx={{
          fontSize:'0.5rem'
        }}
        title={title}
        subheader={date}
      />
      <CardContent>
        <div className="flex justify-between -my-4">
          {shortContent}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </div>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph sx={{ my: -1 }}>
            {expandedContent}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
