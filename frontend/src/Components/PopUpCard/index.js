import React from  'react'
import Button from '@mui/material/Button';
import './index.css'

function Popup(props){

    //Componente DROPDOWN //
    /** 
     * Cria um POPUP parametrizado.
     * 
     * Recebe como parâmetros:
     ********** closeBtn ********** TRUE => Irá adicionar ao componente o botão Fechar --- opcional (default ->NOT TRUE)
     ********* trigger ********* FLAG que quando é definida como TRUE, renderiza o POPUP
     ******** setTrigger ******* Função responsável por alterar o estado trigger (prop anterior)
     ********** title ********** O título que irá aparecer no POPUP
     ******* complement ******** Um botão adicional no popup --- (opcional)
    */

    return(props.trigger) ? (
        <div className = "popup">
            <div className = "popup-inner-content">
                <div className="popup_title">
                    {props.title ? <span>{props.title}</span> : ''}
                </div>
                <div className="children-div">
                    {props.children}
                </div>
                <div className = "nav-popup">
                    {props.closeBtn===true ?
                        <Button color="error"className="border-btn cancelar-btn" onClick={()=>props.setTrigger(false)} variant="contained" disableElevation>
                            Fechar
                        </Button>: ''}
                    {props.complement}
                </div>
            </div>
        </div>
    ) : "";

    
}

export default Popup;
