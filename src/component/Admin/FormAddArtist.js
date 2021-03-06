import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";

export default function FormAddArtist({
  HandleSubmit,
  loading,
  type,
  handleSelect,
}) {
  return (
    <Box sx={{ width: { xs: 350, md: 600 } }}>
      {loading.alert ? (
        <Box>
          <Alert severity="success" sx={{ mb: 2, pl: 5, pr: 5 }}>
            Data telah di tambahkan
          </Alert>
        </Box>
      ) : (
        ""
      )}
      <form onSubmit={HandleSubmit}>
        <TextField
          size="small"
          fullWidth
          sx={{
            bgcolor: "gray",
            mb: 2,
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
          label="Name"
          name="name"
        />
        <TextField
          size="small"
          fullWidth
          sx={{
            bgcolor: "gray",
            mb: 2,
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
          label="Old"
          name="old"
        />
        <Select
          fullWidth
          size="small"
          sx={{
            mb: 2,
            bgcolor: "#D2D2D2",
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Gender"
          name="type"
          onChange={handleSelect}
        >
          <MenuItem value={"Solo"}>Solo</MenuItem>
          <MenuItem value={"Rock"}>Rock</MenuItem>
          <MenuItem value={"Slow Rock"}>Slow Rock</MenuItem>
        </Select>
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
          label="Start Career"
          name="startcareer"
        />
        {loading.button ? (
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
              Add Artist
            </Typography>
          </LoadingButton>
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
              Add Artist
            </Typography>
          </Button>
        )}
      </form>
    </Box>
  );
}
