import {useNavigate} from "react-router-dom";
import "./variables.scss";

export const Error = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      width: "75%",
      textAlign: "center",
      fontSize: "2em",
      margin: "1em auto 1em auto",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "grey"
    }}>
      <span>Ups da ist etwas schief gelaufen</span>
      <a
        href="/"
        onClick={(e)=>{e.preventDefault();navigate("/");}}
        style={{
          textDecoration: "none",
          fontSize: "1em",
          color: "inherit",
          border: "1px solid white",
          borderRadius:"20px",
          maxWidth: "350px",
          marginTop:"20px",
          padding: "20px"
        }}
      >Home</a>
    </div>
  );
}