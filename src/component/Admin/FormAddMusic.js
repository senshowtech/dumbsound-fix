import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function FormAddMusic({
  progressUpload,
  handleChangeThumbnail,
  handleChangeSong,
  HandleSubmit,
  Input,
  loading,
  preview,
  handleSelect,
  artist,
  artistValue,
}) {
  return (
    <Box sx={{ width: { xs: 350, md: 600 } }}>
      {loading.alert === "Data Telah Ditambahkan" ? (
        <Box>
          <Alert severity="success" sx={{ mb: 2, pl: 5, pr: 5 }}>
            Data telah di tambahkan
          </Alert>
        </Box>
      ) : loading.alert === "Tambahkan data Thumbnail" ? (
        <Box>
          <Alert severity="error" sx={{ mb: 2, pl: 5, pr: 5 }}>
            Tambahkan data Thumbnail
          </Alert>
        </Box>
      ) : loading.alert === "Tambahkan data Musik" ? (
        <Box>
          <Alert severity="error" sx={{ mb: 2, pl: 5, pr: 5 }}>
            Tambahkan data Musik
          </Alert>
        </Box>
      ) : null}
      <img
        style={{ maxWidth: 200, marginBottom: 10 }}
        src={preview.image}
        alt=""
      />
      <form onSubmit={HandleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            mb: 2,
          }}
        >
          <Box sx={{ mr: { xs: 0, md: 2 }, width: { md: 365 } }}>
            <TextField
              fullWidth
              size="small"
              name="title"
              sx={{
                bgcolor: "gray",
                "& .MuiFormLabel-filled": {
                  color: "white",
                },
                "& label.Mui-focused": {
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "black",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                  },
                },
              }}
              label="Title"
            />
          </Box>
          <Box>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                onChange={handleChangeThumbnail}
                id="contained-button-file"
                type="file"
              />
              <Button
                component="span"
                sx={{
                  borderColor: "black",
                  bgcolor: "gray",
                  paddingTop: 1,
                  paddingBotton: 1,
                  mt: { xs: 2, md: 0 },
                }}
                variant="outlined"
                endIcon={<AttachFileIcon sx={{ color: "red" }} />}
              >
                <Typography variant="body1" color="white">
                  Attach Thumbnail
                </Typography>
              </Button>
            </label>
          </Box>
        </Box>
        <Box>
          <TextField
            size="small"
            fullWidth
            sx={{
              bgcolor: "gray",
              "& .MuiFormLabel-filled": {
                color: "white",
              },
              "& label.Mui-focused": {
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "black",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
            label="Year"
            name="year"
          />
        </Box>
        <Box>
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
            label="Select Artist"
            value={artistValue}
            onChange={handleSelect}
          >
            {artist.map((value) => {
              return (
                <MenuItem key={value.id} value={value.id}>
                  {value.name}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="contained-button-file1">
            <Input
              accept="audio/*"
              onChange={handleChangeSong}
              id="contained-button-file1"
              type="file"
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Button
                component="span"
                sx={{
                  borderColor: "black",
                  bgcolor: "gray",
                  paddingTop: 1,
                  mt: 2,
                }}
                variant="outlined"
                endIcon={<AttachFileIcon sx={{ color: "red" }} />}
              >
                <Typography variant="body1" color="white">
                  Attach
                </Typography>
              </Button>
              {
                <Typography
                  sx={{ display: "flex", mt: 3, ml: 2 }}
                  variant="body1"
                  color="white"
                >
                  {preview.url}
                </Typography>
              }
            </Box>
          </label>
        </Box>
        <Box>
          {loading.button ? (
            <Box sx={{ display: "flex" }}>
              <LoadingButton
                sx={{
                  borderColor: "black",
                  bgcolor: "#F58033",
                  paddingTop: 1,
                  mt: 2,
                }}
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
              >
                <Typography variant="body1" color="white">
                  Add Song
                </Typography>
              </LoadingButton>
              <Box sx={{ mt: 2, ml: 2 }}>{progressUpload}</Box>
            </Box>
          ) : (
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
                Add Song
              </Typography>
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}
