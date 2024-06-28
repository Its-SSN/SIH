import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { fetchNews } from "../../services/news";
const ScrapeTriggerSearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    setLoading(true)
    console.log(searchTerm);
    const res = await fetchNews(searchTerm);
    console.log(res);
    setLoading(false)
  };
  return (
    <div>
      <TextField
        onChange={(event) => {
          // console.log(event.target.value);
          setSearchTerm(event.target.value);
        }}
        size="small"
        id="outlined-basic"
        label="Begin Scraping"
        variant="outlined"
      />
      <Button onClick={handleClick} disabled={loading}>Go!</Button>
    </div>
  );
};

export default ScrapeTriggerSearchBar;
