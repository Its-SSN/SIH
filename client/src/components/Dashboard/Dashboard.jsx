import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItems from "./ListItems";
import SplitButton from "../SplitButton/SplitButton";
import ExpandableCard from "../ExpandableCard/ExpandableCard";
import SearchBar from "../SearchBar/SearchBar";
import ScrapeTriggerSearchBar from "../ScrapeTriggerSearchBar/ScrapeTriggerSearchBar";
import { newsData } from "../../data/newsData";
import { getAllNews } from "../../services/news";
import {BeatLoader} from "react-spinners"

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [news, setNews] = React.useState(newsData);
  const [filteredNews, setFilteredNews] = React.useState(newsData);
  const [open, setOpen] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState("youtube");
  const [selectedIndex, setSelectedIndex] = React.useState(3);
  const [play, setPlay] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const options = ["POSITIVE", "NEGATIVE", "NEUTRAL", "ALL"];

  React.useEffect(()=>{
    const fun = async()=>{
      setLoading(true)
      try{
        const res = await getAllNews()
      console.log(res.data)
      setNews(res.data)
      const newData = res.data.filter(
        (item) =>
          item.Type===category 
      );
      setFilteredNews(newData);
      setLoading(false)
      }catch(err){
        setLoading(false)
        alert("error occured")
      }
    }
    fun()
  },[])

  React.useEffect(() => {
    const newData = news.filter(
      (item) =>
        item.Type===category &&
        item.Title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedIndex === 3 || item.Tonality === options[selectedIndex])
    );
    setFilteredNews(newData);
  }, [category, searchTerm, selectedIndex]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {loading ? <div className="h-screen w-screen flex justify-center items-center"><BeatLoader color="#36d7b7" /></div>:
      
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dash-board
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <div className="mx-auto uppercase text-xl font-semibold">
              Media-Mood
            </div>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItems setCategory={setCategory} setSearchTerm={setSearchTerm} play={play} setPlay={setPlay}/>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <div className="flex flex-row justify-between">
              <SplitButton
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
              <ScrapeTriggerSearchBar />
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
            <div className="py-4 flex flex-col gap-4">
              {filteredNews.map((item, key) => {
                return (
                  <ExpandableCard
                    title={item.Title}
                    date={item.Date}
                    shortContent={item.Department}
                    expandedContent={item.Description}
                    tonality={item.Tonality}
                    key={key}
                  />
                );
              })}
            </div>
          </Container>
        </Box>
      </Box>
}
    </ThemeProvider>
  );
}
