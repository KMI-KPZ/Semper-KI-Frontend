import "../../../styles.scss";
import "../../ProcessView.scss";
import {Model} from "../../../Interface";
import React, {useState} from "react";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface Props {
  model:Model
  selectModel: (model:Model)=>void,
  setProgressState: (progressStateIndex:number)=>void
}

interface State {
  addShoppingCartIcon:string,
  addShoppingCartIconText:string,
  expandMoreIcon:string,
  expandMoreIconBoolean:boolean
}

export const ModelCatalogCard = ({model,selectModel,setProgressState}:Props) => {
    const [state,setState] = useState<State>(
      {
        addShoppingCartIcon:"model-card-icon dark hide",
        addShoppingCartIconText:"model-card-icon dark",
        expandMoreIcon:"model-card-icon grey",
        expandMoreIconBoolean:false
      });

    const handleAddClick = () => {
      selectModel(model);
      setProgressState(1);
    }

    const handleAddMouseEnter = () => {
      setState(prevState => ({...prevState,addShoppingCartIcon:"model-card-icon dark",addShoppingCartIconText:"model-card-icon dark hide"}));
    }

    const handleAddMouseLeave = () => {
      setState(prevState => ({...prevState,addShoppingCartIcon:"model-card-icon dark hide",addShoppingCartIconText:"model-card-icon dark"}));
    }

    const handleExpandClick = () => {
      setState(prevState => ({
        ...prevState,
        expandMoreIcon:prevState.expandMoreIconBoolean?"model-card-icon grey":"model-card-icon grey rotate",
        expandMoreIconBoolean:!prevState.expandMoreIconBoolean
      }));
    }

    return(
      <div className="model-card" >
        <div className="model-card-area">
          <div className="model-card-headline">{model.file.name}</div>
          <img className="model-card-img" src={require("../../../images/model_placeholder.png")} alt="Model"/>
          <div className="model-card-description">Kurzbeschreibung</div>
          {state.expandMoreIconBoolean &&
            <div className="model-card-description">
              Langbeschreibung
              <br/>
              Zertifikat 1
              <br/>
              Zertifikat 2
              <br/>
              Maße 00x00x00cm
            </div>
          }
          <div className="model-card-buttons">
            <FavoriteBorderIcon   className="model-card-icon light"/>
            <ExpandMoreIcon       className={state.expandMoreIcon} onClick={handleExpandClick}/>
            <AddShoppingCartIcon  className={state.addShoppingCartIcon} onClick={handleAddClick} onMouseLeave={handleAddMouseLeave} />
            <div className={state.addShoppingCartIconText} onMouseEnter={handleAddMouseEnter}>$$$</div>
          </div>
        </div>
      </div>
    );
}
