import Box from "@mui/material/Box";
import React from "react";
import AppbarUser from "../component/User/AppbarUser";
import Home from "../component/User/Home";
import { API } from "../config/axios";

export default function UserPage() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const pages = ["Home", "Pay", "Complain", "Logout"];
  const [music, setMusic] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [attache, setAttache] = React.useState({
    attache: "",
    title: "",
  });
  const [hideMusic, sethideMusic] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState(null);

  React.useEffect(() => {
    const getMusicPagination = async () => {
      try {
        const response = await API.get("/musics/pagination/" + page);
        setMusic(response.data.musics);
      } catch (error) {
        console.log(error);
      }
    };
    getMusicPagination();
    const getUserStatus = async () => {
      try {
        const response = await API.get("/transactions/user");
        setStatus(response.data.data.dataTransaction.status);
      } catch (error) {
        console.log(error);
      }
    };
    getUserStatus();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleOpenMusic = async (id) => {
    try {
      sethideMusic(true);
      const response = await API.get("/music/" + id);
      setAttache({
        attache: response.data.data.musics.attache,
        title: response.data.data.musics.title,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Search = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (e.target.search.value === "") {
      setSearch(null);
    } else {
      let data = {
        title: e.target.search.value,
      };
      const dataTitle = await API.post("/musics/search/", data, config);
      setSearch(dataTitle.data.musics);
    }
  };

  return (
    <Box style={{ backgroundColor: "black" }}>
      <Box
        style={{
          backgroundImage: `url(${require("../assets/img/bgheader.png")})`,
          height: 630,
        }}
      >
        <AppbarUser
          isPayment={false}
          pages={pages}
          anchorElNav={anchorElNav}
          handleOpenNavMenu={handleOpenNavMenu}
          handleCloseNavMenu={handleCloseNavMenu}
        />
      </Box>
      <Box>
        <Home
          music={music}
          status={status}
          attache={attache}
          hideMusic={hideMusic}
          page={page}
          handleChangePage={handleChangePage}
          handleOpenMusic={handleOpenMusic}
          Search={Search}
          search={search}
        />
      </Box>
    </Box>
  );
}
