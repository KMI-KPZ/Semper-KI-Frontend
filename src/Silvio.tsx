import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import axios, { AxiosError } from "axios";

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

export const Silvio = () => {
  const url = "http://localhost:";
  const port = "49163";
  const postFix = "/test/";
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
    console.log("Post on ", url);
    safeLoading(false);
    axios
      .post(url, {})
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
    console.log("Get on ", url);
    safeLoading(false);
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
    console.log("Put on ", url);
    safeLoading(false);
    axios
      .put(url, { test: "test" })
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
    console.log("Delet on ", url);
    safeLoading(false);
    axios
      .delete(url)
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
          margin: "5px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextField
          sx={{ margin: "5px 0" }}
          name="url"
          label="url"
          value={state.url}
          onChange={(e) => safeInput(e)}
        />
        <TextField
          sx={{ margin: "5px 0" }}
          name="port"
          label="port"
          value={state.port}
          onChange={(e) => safeInput(e)}
        />
        <TextField
          sx={{ margin: "5px 0" }}
          name="postFix"
          label="postFix"
          value={state.postFix}
          onChange={(e) => safeInput(e)}
        />
      </Paper>
      <Paper>
        <List>
          <ListItem>
            <ListItemText>Post</ListItemText>
            <TextField
              name="post"
              sx={{ width: 500 }}
              label="post"
              value={state.post}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemButton onClick={() => post(state.post)}>
              <SendIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemText>Get</ListItemText>
            <TextField
              name="get"
              sx={{ width: 500 }}
              label="get"
              value={state.get}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemButton onClick={() => get(state.get)}>
              <SendIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemText>Put</ListItemText>
            <TextField
              name="put"
              sx={{ width: 500 }}
              label="put"
              value={state.put}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemButton onClick={() => put(state.put)}>
              <SendIcon />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemText>Delete</ListItemText>
            <TextField
              name="delete"
              sx={{ width: 500 }}
              label="delete"
              value={state.delete}
              onChange={(e) => safeInput(e)}
            ></TextField>
            <ListItemButton onClick={() => testDelete(state.delete)}>
              <SendIcon />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
      {state.loading !== null && state.loading === true && (
        <Paper sx={{ marginTop: 1, padding: 1 }}>
          <>Loading...</>
        </Paper>
      )}
      {state.data !== "" && (
        <Paper sx={{ marginTop: 1, padding: 1 }}>
          Response:
          <br />
          {state.data}
        </Paper>
      )}
      {state.error && (
        <Paper sx={{ marginTop: 1, padding: 1 }}>
          <>
            Error:
            <br />
            {JSON.stringify(state.error)}
          </>
        </Paper>
      )}
    </Container>
  );
};
