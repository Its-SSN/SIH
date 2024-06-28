import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import FlagIcon from "@mui/icons-material/Flag";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { startTask, stopTask } from "../../services/news";

const ListItems = ({ setCategory, setSearchTerm, play, setPlay }) => {
  // console.log("list items called");

  const handlePlay = async () => {
    setPlay(!play);
    if (!play) {
      console.log("started...")
      const res = await startTask();
      console.log(res);
    } else {
      const res = await stopTask();
      console.log(res);
    }
    console.log("hi")
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex flex-col justify-between h-[85vh]">
      <div>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(e) => {
            console.log("youtube");
            setCategory("youtube");
            setSearchTerm("");
            handleListItemClick(e, 0);
          }}
        >
          <ListItemIcon>
            <AssuredWorkloadIcon />
          </ListItemIcon>
          <ListItemText primary="Youtube" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(e) => {
            console.log("article");
            setCategory("article");
            setSearchTerm("");
            handleListItemClick(e, 1);
          }}
        >
          <ListItemIcon>
            <SpellcheckIcon />
          </ListItemIcon>
          <ListItemText primary="Article" />
        </ListItemButton>
        {/* <ListItemButton
          selected={selectedIndex === 2}
          onClick={(e) => {
            console.log("initiatives");
            setCategory("initiatives");
            setSearchTerm("");
            handleListItemClick(e, 2);
          }}
        >
          <ListItemIcon>
            <FlagIcon />
          </ListItemIcon>
          <ListItemText primary="Initiatives" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(e) => {
            console.log("initiatives");
            setCategory("initiatives");
            setSearchTerm("");
            handleListItemClick(e, 3);
          }}
        >
          <ListItemIcon>
            <EmojiEventsIcon />
          </ListItemIcon>
          <ListItemText primary="Achievements" />
        </ListItemButton> */}
      </div>

      <div>
        {!play ? (
          <ListItemButton>
            <Button
              variant="outlined"
              color="success"
              fullWidth
              onClick={handlePlay}
            >
              <div className="flex justify-evenly w-full">
                <PlayArrowIcon />
                <div>Start Task</div>
              </div>
            </Button>
          </ListItemButton>
        ) : (
          <ListItemButton>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handlePlay}
            >
              <div className="flex justify-evenly w-full">
                <PauseIcon />
                <div>Stop Task</div>
              </div>
            </Button>
          </ListItemButton>
        )}
      </div>
    </div>
  );
};

export default ListItems;
