import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Pagination from "@mui/material/Pagination";
import { red } from "@mui/material/colors";

export default function Cards({ music, setOpenLogin, page, handleChangePage }) {
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ flexGrow: 1, ml: 2, mr: { xs: 2 } }}>
          <Grid container spacing={2}>
            {music?.rows.map((value) => {
              return (
                <Grid key={value.id} item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      maxWidth: { xs: "100%", md: 345 },
                      backgroundColor: "#3A3A3A",
                      marginBottom: { xs: 2, md: 5 },
                      borderRadius: 5,
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          {value.artists.name.split(" ")[0].substring(0, 2)}
                        </Avatar>
                      }
                      title={
                        <Typography variant="body1" color="white">
                          {value.artists.name}
                        </Typography>
                      }
                      subheader={
                        <Typography variant="body1" color="white">
                          {value.artists.type}
                        </Typography>
                      }
                    />
                    <img
                      style={{
                        display: "block",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: 194,
                        padding: 8,
                        borderRadius: 15,
                      }}
                      src={value.thumbnail}
                      alt="..."
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        style={{ padding: 10 }}
                        variant="h6"
                        color="white"
                      >
                        {value.title.slice(0, 10) + " ..."}
                      </Typography>
                      <Typography
                        style={{ padding: 10 }}
                        variant="h6"
                        color="white"
                      >
                        {value.year}
                      </Typography>
                    </Box>
                    <CardActions disableSpacing sx={{ mb: 2 }}>
                      <IconButton
                        sx={{ color: "white" }}
                        aria-label="share"
                        onClick={setOpenLogin}
                      >
                        <PlayCircleOutlineIcon />
                        <Typography variant="h6" sx={{ ml: 1 }} color="white">
                          Play
                        </Typography>
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: 350,
          }}
        >
          <Pagination
            sx={{
              "& .css-r93niq-MuiButtonBase-root-MuiPaginationItem-root": {
                bgcolor: "white",
              },
              "& .css-1v2lvtn-MuiPaginationItem-root": {
                color: "white",
              },
              "& .Mui-selected": {
                bgcolor: "#3A3A3A",
                color: "white",
              },
            }}
            variant="outlined"
            shape="rounded"
            color="primary"
            count={Math.ceil(music?.count / 8)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
    </Box>
  );
}
