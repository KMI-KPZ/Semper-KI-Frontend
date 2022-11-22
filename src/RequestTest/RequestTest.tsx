import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import axios, { AxiosError } from "axios";
import CRSFToken from "../Hooks/CSRFToken";

interface State {
  post: string;
  get: string;
  put: string;
  delete: string;
  url: string;
  postFix: string;
  data: string;
  port: string;
  error: AxiosError | null;
  loading: boolean | null;
}

export const RequestTest = () => {
  const { csrfToken, isLoading, error } = CRSFToken();
  // axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

  const options = {
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": csrfToken,
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const url = "http://localhost:";
  const port = "8000";
  const postFix = "/test_csrf/";
  const [state, setState] = useState<State>({
    post: `${url}${port}${postFix}`,
    get: `${url}${port}${postFix}`,
    put: `${url}${port}${postFix}`,
    delete: `${url}${port}${postFix}`,
    data: "",
    port: port,
    url: url,
    postFix: postFix,
    error: null,
    loading: null,
  });

  const safeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case "url":
        setState((prevState) => ({
          ...prevState,
          url: e.target.value,
          post: `${e.target.value}${prevState.port}${prevState.postFix}`,
          get: `${e.target.value}${prevState.port}${prevState.postFix}`,
          put: `${e.target.value}${prevState.port}${prevState.postFix}`,
          delete: `${e.target.value}${prevState.port}${prevState.postFix}`,
        }));
        break;
      case "port":
        setState((prevState) => ({
          ...prevState,
          port: e.target.value,
          post: `${prevState.url}${e.target.value}${prevState.postFix}`,
          get: `${prevState.url}${e.target.value}${prevState.postFix}`,
          put: `${prevState.url}${e.target.value}${prevState.postFix}`,
          delete: `${prevState.url}${e.target.value}${prevState.postFix}`,
        }));
        break;
      case "postFix":
        setState((prevState) => ({
          ...prevState,
          postFix: e.target.value,
          post: `${prevState.url}${prevState.port}${e.target.value}`,
          get: `${prevState.url}${prevState.port}${e.target.value}`,
          put: `${prevState.url}${prevState.port}${e.target.value}`,
          delete: `${prevState.url}${prevState.port}${e.target.value}`,
        }));
        break;
      default:
        setState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        break;
    }
  };

  const safeData = (data: string) => {
    setState((prevState) => ({
      ...prevState,
      data: data,
      error: null,
      loading: false,
    }));
  };

  const safeError = (data: any) => {
    // console.log(data);

    setState((prevState) => ({
      ...prevState,
      data: "",
      error: data,
      loading: false,
    }));
  };

  const safeLoading = (data: boolean) => {
    setState((prevState) => ({
      ...prevState,
      data: "",
      error: null,
      loading: data,
    }));
  };

  const post = (url: string) => {
    console.log("Post on ", url, options);
    safeLoading(true);
    axios
      .post(url, { test: "test" }, options)
      .then((response) => {
        console.log("Post Response", url, response.data);
        safeData(response.data);
      })
      .catch((error) => {
        console.log("Post Error", error);
        safeError(error);
      });
  };
  const get = (url: string) => {
    console.log("Get on ", url, options);
    safeLoading(true);
    axios
      .get(url)
      .then((response) => {
        console.log("Get Response", url, response.data);
        safeData(response.data);
      })
      .catch((error) => {
        console.log("Get Error", error);
        safeError(error);
      });
  };
  const put = (url: string) => {
    console.log("Put on ", url, options);
    safeLoading(true);
    axios
      .put(url, { test: "test" }, options)
      .then((response) => {
        console.log("Put Response", url, response.data);
        safeData(response.data);
      })
      .catch((error) => {
        console.log("Put Error", error);
        safeError(error);
      });
  };
  const testDelete = (url: string) => {
    console.log("Delete on ", url, options);
    safeLoading(true);
    axios
      .delete(url, options)
      .then((response) => {
        console.log("Delete Respons", url, response.data);
        safeData(response.data);
      })
      .catch((error) => {
        console.log("Delete Error", error);
        safeError(error);
      });
  };

  return (
    <Container>
      <Paper
        sx={{
          padding: 1,
          marginTop: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          sx={{ margin: 1, width: "33%" }}
          name="url"
          label="urls"
          value={state.url}
          onChange={(e) => safeInput(e)}
        />
        <TextField
          sx={{ margin: 1, width: "33%" }}
          name="port"
          label="port"
          value={state.port}
          onChange={(e) => safeInput(e)}
        />
        <TextField
          sx={{ margin: 1, width: "33%" }}
          name="postFix"
          label="postFix"
          value={state.postFix}
          onChange={(e) => safeInput(e)}
        />
      </Paper>
      <Paper sx={{ marginTop: 1 }}>
        <List>
          <ListItem>
            <ListItemText sx={{ width: "20%" }}>Post</ListItemText>
            <TextField
              name="post"
              sx={{ width: "60%" }}
              label="post"
              value={state.post}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemButton
              onClick={() => post(state.post)}
              sx={{ width: "20%", justifyContent: "center" }}
            >
              <SendIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemText sx={{ width: "20%" }}>Get</ListItemText>
            <TextField
              name="get"
              sx={{ width: "60%" }}
              label="get"
              value={state.get}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemButton
              onClick={() => get(state.get)}
              sx={{ width: "20%", justifyContent: "center" }}
            >
              <SendIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemText sx={{ width: "20%" }}>Put</ListItemText>
            <TextField
              name="put"
              sx={{ width: "60%" }}
              label="put"
              value={state.put}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemButton
              onClick={() => put(state.put)}
              sx={{ width: "20%", justifyContent: "center" }}
            >
              <SendIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemText sx={{ width: "20%" }}>Delete</ListItemText>
            <TextField
              name="delete"
              sx={{ width: "60%" }}
              label="delete"
              value={state.delete}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemButton
              onClick={() => testDelete(state.delete)}
              sx={{ width: "20%", justifyContent: "center" }}
            >
              <SendIcon />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
      {state.loading !== null && state.loading === true && (
        <Paper sx={{ marginTop: 1, padding: 1 }}>
          <Typography variant="h3">Loading...</Typography>
        </Paper>
      )}
      {state.data !== "" && (
        <Paper sx={{ marginTop: 1, padding: 1 }}>
          <Typography variant="h3">Response</Typography>
          <br />
          {state.data}
        </Paper>
      )}
      {state.error && (
        <Paper sx={{ marginTop: 1, padding: 1 }}>
          <>
            <Typography variant="h3">Error</Typography>
            <br />
            <Grid container>
              <Grid item xs={3}>
                Code:
              </Grid>
              <Grid item xs={9}>
                {state.error.code}
              </Grid>
              <Grid item xs={12}>
                Config:
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2}>
                Headers:
              </Grid>
              <Grid item xs={9}>
                {JSON.stringify(state.error.config?.headers)}
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2}>
                Data:
              </Grid>
              <Grid item xs={9}>
                {state.error.config?.data}
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2}>
                URL:
              </Grid>
              <Grid item xs={9}>
                {state.error.config?.url}
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2}>
                Method:
              </Grid>
              <Grid item xs={9}>
                {state.error.config?.method}
              </Grid>
              <Grid item xs={3}>
                Message:
              </Grid>
              <Grid item xs={9}>
                {state.error.message}
              </Grid>
              <Grid item xs={3}>
                Name:
              </Grid>
              <Grid item xs={9}>
                {state.error.name}
              </Grid>
              <Grid item xs={3}>
                Stack:
              </Grid>
              <Grid item xs={9}>
                {state.error.stack}
              </Grid>
            </Grid>
            {/* {JSON.stringify(state.error)} */}
          </>
        </Paper>
      )}
    </Container>
  );
};
