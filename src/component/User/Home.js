import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import React from "react";
import Cards from "./Card";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

export default function Home({
  music,
  status,
  handleOpenMusic,
  attache,
  hideMusic,
  page,
  handleChangePage,
  Search,
  search,
}) {
  return (
    <Box>
      <Typography
        style={{ marginTop: 20, marginBottom: 80 }}
        variant="h5"
        align="center"
        color="#EE4622"
      >
        Dengarkan Dan Rasakan
      </Typography>
      <Cards
        Search={Search}
        search={search}
        music={music}
        page={page}
        handleChangePage={handleChangePage}
        status={status}
        handleOpenMusic={handleOpenMusic}
      />
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ top: "auto", bottom: 0 }}
      >
        <Toolbar>
          {hideMusic ? (
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <AudioPlayer
                header={attache.title}
                style={{ backgroundColor: "black", color: "white" }}
                src={attache.attache}
              />
            </Box>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
