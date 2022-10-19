import React from "react";
import './Header.scss';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


interface Language {
  code: string
  name: string
  country_code: string
}

const languages:Language[] = [
  {
    code: 'de',
    name: 'Deutsch',
    country_code: 'de'
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb'
  }
]

export const Header = () => {
  const navigate = useNavigate();
  const {t,i18n} = useTranslation();

  const onClickCountry = (e: React.MouseEvent<HTMLOptionElement, MouseEvent>,code:string) => {
    console.log(code);
    e.preventDefault();
    i18n.changeLanguage(code);
  }

  return (
    <header>
      <a href="/" className="kiss-logo" onClick={(e)=>{e.preventDefault();navigate("/");}}>
        <img className="kiss-logo-img" src={require("../images/KISS_logo_transparent.png")} alt="Kiss Logo"/>
        <div className="kiss-logo-name">KISS</div>
      </a>
      <nav className="main-nav">
        <ul>
          <li>
            <select className="main-nav-select">
              {languages.map(({code,name,country_code}:Language)=>(
                  <option value={code} key={country_code} onClick={e=>onClickCountry(e,code)}>{name}</option>
                ))
              }
            </select>
          </li>
          <li>
            <a
              href="/about"
              onClick={(e)=>{e.preventDefault();navigate("/about");}}
            >
              {t('header.about_us')}
            </a>
          </li>
          <li>
            <a
              href="/login"
              onClick={(e)=>{e.preventDefault();navigate("/login");}}
            >
              <PersonIcon
                className="icon"
                sx={{fontSize:40}}
              />
              {t('header.login')}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}