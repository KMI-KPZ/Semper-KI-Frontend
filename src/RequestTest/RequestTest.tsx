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
import CRSFToken from "../hooks/CSRFToken";

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
  const [state, setState] = useState<State>({
    post: "",
    get: "",
    put: "",
    delete: "",
    data: "",
    port: "8000",
    url: "http://localhost:",
    postFix: "/test_csrf/",
    error: null,
    loading: null,
  });
  const URL = `${state.url}${state.port}${state.postFix}`;

  const safeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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

  const post = () => {
    safeLoading(true);
    axios
      .post(URL, JSON.stringify({ post: state.post }))
      .then((response) => {
        console.log("Post Response", response.data);
        safeData(response.data);
      })
      .catch((error) => {
        console.log("Post Error", error);
        safeError(error);
      });
  };

  const get = () => {
    safeLoading(true);
    axios
      .get(URL)
      .then((response) => {
        console.log("Get Response", response.data);
        safeData(response.data);
      })
      .catch((error) => {
        console.log("Get Error", error);
        safeError(error);
      });
  };

  const put = () => {
    safeLoading(true);
    axios
      .put(URL, JSON.stringify({ put: state.put }))
      .then((response) => {
        console.log("Put Response", URL, response.data);
        safeData(response.data);
      })
      .catch((error) => {
        console.log("Put Error", error);
        safeError(error);
      });
  };
  const testDelete = () => {
    safeLoading(true);
    axios
      .delete(URL)
      .then((response) => {
        console.log("Delete Respons", URL, response.data);
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
              sx={{ width: "30%" }}
              label="post"
              value={state.post}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemText sx={{ width: "30%", margin: 1 }}>{URL}</ListItemText>
            <ListItemButton
              onClick={() => post()}
              sx={{ width: "20%", justifyContent: "center" }}
            >
              <SendIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemText sx={{ width: "20%" }}>Get</ListItemText>
            <TextField
              name="get"
              sx={{ width: "30%" }}
              label="get"
              value={state.get}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemText sx={{ width: "30%", margin: 1 }}>{URL}</ListItemText>
            <ListItemButton
              onClick={() => get()}
              sx={{ width: "20%", justifyContent: "center" }}
            >
              <SendIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemText sx={{ width: "20%" }}>Put</ListItemText>
            <TextField
              name="put"
              sx={{ width: "30%" }}
              label="put"
              value={state.put}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemText sx={{ width: "30%", margin: 1 }}>{URL}</ListItemText>
            <ListItemButton
              onClick={() => put()}
              sx={{ width: "20%", justifyContent: "center" }}
            >
              <SendIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemText sx={{ width: "20%" }}>Delete</ListItemText>
            <TextField
              name="delete"
              sx={{ width: "30%" }}
              label="delete"
              value={state.delete}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemText sx={{ width: "30%", margin: 1 }}>{URL}</ListItemText>
            <ListItemButton
              onClick={() => testDelete()}
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
          </>
        </Paper>
      )}
    </Container>
  );
};
