import {Option, Selection, SelectionMenu} from "../../Interface";

import "./PostProcessing.scss";

interface Props {
  option:Option
}

export const PostProcessingOption = ({option}:Props) => {

    return(
      <div className="post-processing-option">
        {option.checkInput &&  <input className="post-processing-option-checkbox" type="checkbox"/>}
        <div className="post-processing-option-headline">{option.name}</div>
        {option.numberInput && <input className="post-processing-option-number" type="number"/>}
        {option.stringInput && <textarea className="post-processing-option-text" placeholder={"Beschreibung zu den/dem "+option.name}/>}
        {option.selectionMenuList &&
          <>
            {option.selectionMenuList.map((selectionMenu: SelectionMenu, selectionMenuIndex:number)=>
            {
              return(
                <select className="post-processing-option-select" key={selectionMenu.name+selectionMenuIndex} defaultValue={"default"}>
                  <option value="default"  className="post-processing-option-select-option" disabled>{selectionMenu.name}</option>
                  {selectionMenu.selectionList.map((selection:Selection,selectionIndex:number)=>(
                    <option key={selectionIndex} className="post-processing-option-select-option" value={selection.value}>{selection.name} {selection.unit} {selection.price?"| "+selection.price+"€":""}</option>
                  ))}
                </select>
              );
            }
            )}
          </>
        }
      </div>
    );
}