import React from "react";
import BackupIcon from "@mui/icons-material/Backup";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ShareIcon from "@mui/icons-material/Share";

import "./Naviagtion.scss";
import {useNavigate} from "react-router-dom";

interface Props {
  setProgressState: (id:number) => void,
}

export const Navigation = ({setProgressState}:Props) => {
    const navigate = useNavigate();

    const handelClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,link:string,progressState?:number):void => {
      e.preventDefault();
      if(progressState!==undefined)setProgressState(progressState);
      navigate(link);
    }

    return(
      <div className="navigation">
        <a className="box light" href="/Process/Model/Upload"  onClick={e=>handelClick(e,"/Process/Model/Upload",0)}><BackupIcon    sx={{ fontSize: 90 }} className="icon"/></a>
        <a className="box light" href="/Process/Model/Catalog" onClick={e=>handelClick(e,"/Process/Model/Catalog",0)}><MenuBookIcon  sx={{ fontSize: 90 }} className="icon"/></a>
        <a className="box dark"  href="/Partner"               onClick={e=>handelClick(e,"/Partner")}><HandshakeIcon  sx={{ fontSize: 90 }} className="icon"/></a>
        <a className="box dark"  href="/Provide"               onClick={e=>handelClick(e,"/Provide")}><ShareIcon      sx={{ fontSize: 90 }} className="icon"/></a>
      </div>
    );
}