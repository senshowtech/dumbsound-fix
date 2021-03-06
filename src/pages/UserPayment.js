import React from "react";
import { API } from "../config/axios";
import AppbarUser from "../component/User/AppbarUser";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";

export default function UserPayment() {
  document.body.style.backgroundColor = "black";
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [payment, setPayment] = React.useState(50000);
  const [status, setStatus] = React.useState(null);
  const [changeStatus, setchangeStatus] = React.useState(null);

  const pages = ["Home", "Pay", "Complain", "Logout"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSelect = (event) => {
    setPayment(event.target.value);
  };

  React.useEffect(() => {
    const getUserStatus = async () => {
      try {
        const response = await API.get("/transactions/user");
        console.log(response.data.data.dataTransaction);
        setStatus(response.data.data.dataTransaction);
      } catch (error) {
        console.log(error);
      }
    };
    getUserStatus();
  }, [changeStatus]);

  React.useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "Mid-server-zI3gLYVu6v9Y-3eoCVfSFEmq";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let data = {
        idSeller: 1,
        price: e.target.payment.value,
      };
      const response = await API.post("/transaction", data, config);
      const token = response.data.data.transaction.payment.token;
      window.snap.pay(token, {
        onSuccess: async (result) => {
          try {
            setchangeStatus("success");
            console.log(result);
          } catch (error) {
            console.log(error);
          }
        },
        onPending: (result) => {
          setchangeStatus("pending");
          console.log(result);
        },
        onError: (result) => {
          console.log(result);
        },
        onClose: () => {
          // alert("you closed the popup without finishing the payment");
          setchangeStatus("close");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const NamaPaket = (price) => {
    if (price === "50000") {
      return "Paket 1 bulan";
    } else if (price === "250000") {
      return "Paket 6 Bulan";
    } else if (price === "500000") {
      return "Paket 1 Tahun";
    }
  };

  return (
    <Box>
      <AppbarUser
        isPayment={true}
        pages={pages}
        anchorElNav={anchorElNav}
        handleOpenNavMenu={handleOpenNavMenu}
        handleCloseNavMenu={handleCloseNavMenu}
      />
      {status?.status === "success" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            mt: 17,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }} color="white">
            {`Saat ini anda di ${NamaPaket(status?.price)}`}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} color="red">
            {`Berlaku hingga ${status?.endDate.split(" ")[0]}`}
          </Typography>
        </Box>
      ) : status?.status === "pending" ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            mt: 8,
          }}
        >
          <Box>
            <AccessTimeIcon sx={{ fontSize: 70 }} color="error" />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }} color="white">
              Pembayaran Anda Terpending
            </Typography>
          </Box>
          <Box sx={{ width: 320 }}>
            <form onSubmit={HandleSubmit}>
              <Select
                fullWidth
                size="small"
                sx={{
                  bgcolor: "#D2D2D2",
                  mt: 2,
                  "& .Mui-focused": { color: "white" },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={payment}
                name="payment"
                label="payment"
                onChange={handleSelect}
              >
                <MenuItem value={50000}>Paket 1 Bulan Rp. 50.000</MenuItem>
                <MenuItem value={250000}>Paket 6 Bulan Rp. 250.000</MenuItem>
                <MenuItem value={500000}>Paket 1 Tahun Rp. 500.000</MenuItem>
              </Select>
              <Button
                type="submit"
                sx={{
                  borderColor: "black",
                  bgcolor: "#F58033",
                  paddingTop: 1,
                  mt: 2,
                }}
                variant="contained"
              >
                <Typography variant="body1" color="white">
                  Beli Lagi
                </Typography>
              </Button>
            </form>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            mt: 8,
          }}
        >
          <Box>
            <PaidIcon sx={{ fontSize: 70 }} color="error" />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }} color="white">
              Beli Paket
            </Typography>
          </Box>
          <Box sx={{ width: 320 }}>
            <form onSubmit={HandleSubmit}>
              <Select
                fullWidth
                size="small"
                sx={{
                  bgcolor: "#D2D2D2",
                  mt: 2,
                  "& .Mui-focused": { color: "white" },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "black",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={payment}
                name="payment"
                label="payment"
                onChange={handleSelect}
              >
                <MenuItem value={50000}>Paket 1 Bulan Rp. 50.000</MenuItem>
                <MenuItem value={250000}>Paket 6 Bulan Rp. 250.000</MenuItem>
                <MenuItem value={500000}>Paket 1 Tahun Rp. 500.000</MenuItem>
              </Select>
              <Button
                type="submit"
                sx={{
                  borderColor: "black",
                  bgcolor: "#F58033",
                  paddingTop: 1,
                  mt: 2,
                }}
                variant="contained"
              >
                <Typography variant="body1" color="white">
                  Beli
                </Typography>
              </Button>
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
}
