import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { grey, red, green, blue } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { baseUrl } from "../../constant";
const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});
const Index = () => {
  const [Data, setData] = useState({ url: "" });
  const handleChange = async (e) => {
    console.log(e.target.value);
    setData((Data) => ({ ...Data, [e.target.name]: e.target.value }));
    console.log(Data);
    console.log(selectedDateTime);
  };
  const [shortLink, setShortLink] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink);
    const time = selectedDateTime != null ? selectedDateTime : "one day ";
    toast.success("copied to ClipBoard valid till : " + time, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const onGenerate = async () => {
    try {
      const pattern =/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
        
      console.log(`${baseUrl}/generate`);
      console.log(Data);
      if (Data.url.length > 0 && pattern.test(Data.url) ) {
        const short = await fetch(`${baseUrl}/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: Data.url,
            expirationDate: selectedDateTime,
          }),
        });
        const y = await short.json();
        console.log(y);
        if (y != null) setShortLink(baseUrl + "/" + y.shortLink);
        else {
          toast.error("Error please enter valid url or try again later", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        toast.error("Error please enter valid url or try again later", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid  container sx={{display:'flex',alignItems: 'center', justifyContent: 'center'}}>
        <ToastContainer position="top-right" autoClose={5000} theme="light" />
        <ToastContainer />
        <Grid
          // mt={{ xl:15, md: 12, sm: 30, xs: 30, lg: 15 }}
          item
          xl={8}
          lg={8}
          md={10}
          sm={10}
          xs={10}
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          <Box
            p={4}
            sx={{
              boxShadow: "5px 5px white",
              width: "100%",
              background: grey[300],
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <Grid spacing={2} container>
              <Grid item xl={12} md={12} xs={12} lg={12} sm={12}>
                <Typography
                  p={1}
                  sx={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "20px",
                  }}
                >
                  Generate Short Url
                </Typography>
              </Grid>
              <Grid item xl={12} md={12} xs={12} lg={12} sm={12}>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="filled-hidden-label-small"
                  placeholder="Enter Your Url here"
                  variant="filled"
                  onChange={handleChange}
                  size="small"
                  name="url"
                />
              </Grid>
              <Grid item xl={12} md={12} xs={12} lg={12} sm={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["StaticDateTimePicker"]}>
                    <DemoItem label="Expiry Date Time">
                      <MobileDateTimePicker
                        label=""
                        renderInput={(params) => <TextField {...params} />}
                        // value={selectedDateTime}
                        onChange={(newValue) => {
                          const formattedDateTime = dayjs(newValue).format(
                            "YYYY-MM-DDTHH:mm:ss"
                          );
                          setSelectedDateTime(formattedDateTime);
                        }}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                <center>
                  <Typography pt={1}>
                  Note: URL will be valid till this date & time or by default 1 day
                  </Typography>
                </center>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                item
                xl={12}
                md={12}
                xs={12}
                lg={12}
                sm={12}
              >
                <Button variant="outlined" onClick={onGenerate} size="medium">
                  Generate Link
                </Button>
              </Grid>
              {shortLink && (
                <Grid
                  display="flex"
                  item
                  xl={12}
                  md={12}
                  xs={12}
                  lg={12}
                  sm={12}
                >
                  <TextField
                    hiddenLabel
                    disabled
                    fullWidth
                    id="filled-hidden-label-small"
                    placeholder="Enter Your Url here"
                    variant="filled"
                    value={shortLink}
                    size="small"
                    name="url"
                  />
                  <Button variant="outlined" onClick={handleCopy} size="medium">
                    copy
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Index;
