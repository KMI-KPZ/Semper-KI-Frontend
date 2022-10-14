import React, {ReactNode} from "react";

import "./HomeCard.scss";
import {useNavigate} from "react-router-dom";

interface Props {
    link:string,
    className: string,
    text: string,
    icon: ReactNode
}

export const HomeCard = ({link,className, icon, text}:Props) => {


    const navigate = useNavigate();

    const changeStyle = (e:any) => {
        e.preventDefault();
        navigate(link);
    }

    return (
        <a href="/" className={className} onClick={e=>changeStyle(e)}>
            {icon}
            <div className="card-text">{text}</div>
        </a>
    );
}