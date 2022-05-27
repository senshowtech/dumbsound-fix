import React from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import AppbarAdmin from "../component/Admin/AppbarAdmin";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Contact from "../component/Complain/Contact";
import Chat from "../component/Complain/Chat";
let socket;

export default function ComplainAdmin() {
  document.body.style.backgroundColor = "black";
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const pages = [
    "Home",
    "Complain Music",
    "Add Music",
    "List Music",
    "Add Artist",
    "Logout",
  ];
  const [contact, setContact] = React.useState(null);
  const [contacts, setContacts] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [hide, setHide] = React.useState(false);
  const [windowDimenion, detectHW] = React.useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });
  const user = useSelector(selectUser);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  React.useEffect(() => {
    socket = io("https://api.febrisena.xyz", {
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        id: user.user?.id,
      },
    });

    socket.on("new message", () => {
      socket.emit("load messages", contact?.id);
    });

    loadContacts();
    loadMessages();

    socket.on("connect_error", (err) => {
      console.error(err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  React.useEffect(() => {
    window.addEventListener("resize", detectSize);
    if (window.innerWidth >= 900) {
      setHide(false);
    }
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  const loadContacts = () => {
    socket.emit("load custommer contacts");
    socket.emit("load admin contact");

    socket.on("custommer contacts", (data) => {
      let dataContacts = data.filter(
        (item) =>
          item.status !== "admin" &&
          (item.recipientMessage.length > 0 || item.senderMessage.length > 0)
      );
      dataContacts = dataContacts.map((item) => ({
        ...item,
        message: "Click here to start message",
      }));
      setContacts(dataContacts);
    });
  };

  const loadMessages = () => {
    socket.on("messages", (data) => {
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }));
        setMessages(dataMessages);
      }
      loadContacts();
      // const chatMessages = document.getElementById("chat-messages");
      // chatMessages.scrollTop = chatMessages?.scrollHeight;
    });
  };

  const onClickContact = (data) => {
    setContact(data);
    socket.emit("load messages", data.id);
    if (windowDimenion.winWidth <= 900) {
      setHide(true);
    }
  };

  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      };
      socket.emit("send messages", data);
      e.target.value = "";
    }
  };

  return (
    <Box>
      <Box>
        <AppbarAdmin
          pages={pages}
          anchorElNav={anchorElNav}
          handleOpenNavMenu={handleOpenNavMenu}
          handleCloseNavMenu={handleCloseNavMenu}
        />
      </Box>
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ mt: 2, borderRight: { md: "1px solid white" } }}
            >
              {hide === true && windowDimenion.winWidth <= 900 ? null : (
                <Contact
                  dataContact={contacts}
                  clickContact={onClickContact}
                  contact={contact}
                />
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                mt: 2,
                display: {
                  xs: hide === true ? "block" : "none",
                  md: "block",
                },
              }}
            >
              <Chat
                user={user.user?.id}
                contact={contact}
                messages={messages}
                sendMessage={onSendMessage}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
