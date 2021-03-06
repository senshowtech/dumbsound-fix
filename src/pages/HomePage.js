import Box from "@mui/material/Box";
import React from "react";
import { API } from "../config/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../redux/userSlice";
import AppbarHome from "../component/Home/AppbarHome";
import Home from "../component/Home/Home";
import ModalLogin from "../component/Home/ModalLogin";
import ModalRegister from "../component/Home/ModalRegister";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function HomePage() {
  const navigate = useNavigate();
  const pages = ["Login", "Register"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [music, setMusic] = React.useState(null);
  const [backdrop, setBackdrop] = React.useState(false);
  const [gender, setGender] = React.useState("male");
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState(null);

  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const [openRegister, setOpenRegister] = React.useState(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const [alertLogin, setalertLogin] = React.useState({
    alert: false,
    message: "",
  });
  const [alertRegister, setalertRegister] = React.useState({
    alert: false,
    message: "",
  });

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSelect = (event) => {
    setGender(event.target.value);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = {
        fullname: e.target.fullname.value,
        email: e.target.email.value,
        password: e.target.password.value,
        status: "user",
        gender: e.target.gender.value,
        phone: String(e.target.phone.value),
        address: e.target.address.value,
      };
      const response = await API.post("register", data, config);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.data.user.token);
        dispatch(LOGIN_SUCCESS(response.data.data.user));
        setOpenRegister(false);
        setBackdrop(true);
        setTimeout(() => navigate("/user"), 6000);
      }
    } catch (error) {
      setalertRegister({
        alert: true,
        message: error.response.data.message,
      });
    }
  };

  const handleCloseAlertRegister = () => {
    setalertRegister({
      alert: false,
      message: "",
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const response = await API.post("login", data, config);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.data.user.token);
        dispatch(LOGIN_SUCCESS(response.data.data.user));
        if (response.data.data.user.status === "admin") {
          setOpenLogin(false);
          setBackdrop(true);
          setTimeout(() => navigate("/admin"), 6000);
        } else {
          setOpenLogin(false);
          setBackdrop(true);
          setTimeout(() => navigate("/user"), 6000);
        }
      }
    } catch (error) {
      setalertLogin({
        alert: true,
        message: error.response.data.message,
      });
    }
  };

  const handleCloseAlertLogin = () => {
    setalertLogin({
      alert: false,
      message: "",
    });
  };

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
  }, []);

  const dispatch = useDispatch();

  return (
    <Box style={{ backgroundColor: "black" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        style={{
          backgroundImage: `url(${require("../assets/img/bgheader.png")})`,
          height: 512,
        }}
      >
        <AppbarHome
          ModalRegister={
            <ModalRegister
              alert={alertRegister}
              handleRegisterSubmit={handleRegisterSubmit}
              openRegister={openRegister}
              handleSelect={handleSelect}
              gender={gender}
              handleCloseRegister={handleCloseRegister}
              handleCloseAlertRegister={handleCloseAlertRegister}
            />
          }
          ModalLogin={
            <ModalLogin
              alert={alertLogin}
              handleLoginSubmit={handleLoginSubmit}
              openLogin={openLogin}
              handleCloseLogin={handleCloseLogin}
              handleCloseAlertLogin={handleCloseAlertLogin}
            />
          }
          handleOpenLogin={handleOpenLogin}
          handleOpenRegister={handleOpenRegister}
          pages={pages}
          anchorElNav={anchorElNav}
          setAnchorElNav={setAnchorElNav}
          handleOpenNavMenu={handleOpenNavMenu}
          handleCloseNavMenu={handleCloseNavMenu}
        />
      </Box>
      <Box>
        <Home
          music={music}
          page={page}
          handleChangePage={handleChangePage}
          setOpenLogin={setOpenLogin}
          Search={Search}
          search={search}
        />
      </Box>
    </Box>
  );
}
