import React from "react";
import './Header.scss';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <a href="/" className="kiss-logo" onClick={(e)=>{e.preventDefault();navigate("/");}}>
        <img className="kiss-logo-img" src={require("../images/KISS_logo_transparent.png")} alt="Kiss Logo"/>
        <div className="kiss-logo-name">KISS</div>
      </a>
      <nav className="main-nav">
        <ul>
          <li><a href="/about" onClick={(e)=>{e.preventDefault();navigate("/about");}}>About Us</a></li>
          <li><a href="/login" onClick={(e)=>{e.preventDefault();navigate("/login");}}><PersonIcon className="icon" sx={{fontSize:40}}/>Login</a></li>
        </ul>
      </nav>
    </header>
  );
}