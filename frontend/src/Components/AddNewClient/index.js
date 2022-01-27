/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*eslint-disable no-useless-escape */

/**
 *  This component is being used to ADD a new client and also
 *  to edit an already existing client
 */

import React, { useState, useEffect } from 'react'
import Popup from '../PopUpCard';
import { responsiveFontSizes, TextField } from '@mui/material';
import Dropdown from '../../Components/Dropdown';
import {IMaskInput} from 'react-imask';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { saveNewClient, updateClient } from '../../Services/clients';
import Alert from '../../Components/Snackbar';

 // =================================================================================
 // START-Masks CONFIG ==============================================================
 // =================================================================================
const cpfMask = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  
  cpfMask.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const cnpjMask = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00.000.000/0000-00"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  
  cnpjMask.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const cepMask = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00-000-000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  
  cepMask.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const phoneMask = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(00) 0 0000-0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

cpfMask.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}; 
// ==================================================================================
// END-Masks CONFIG =================================================================
// ==================================================================================


// ==================================================================================
// START-Complements ================================================================
// ==================================================================================

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

// ==================================================================================
// END-Complements ==================================================================
// ==================================================================================

function AddNewClient({controller, setController, title, closeBtn, clientToEdit=null, responseOnRefresh}) {
    const [popupOutputsTrigger, setPopupOutputsTrigger] = useState(false)
    
    // Data
    
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    //
    // Only passed when its on edition mode
    const [id, setId] = useState();
    //
    const [email, setEmail] = useState('');
    const [identity, setIdentity] = useState('');
    const [cep, setCep] = useState('');
    const [classificacao, setClassficacao] = useState('');
    const [identitySize, setIdentitySize] = useState(10);
    const [allPhones, setAllPhones] = useState([]);
    const [newPhone, setNewPhone] = useState('');
    const [phones, setPhones] = React.useState([]);

    // Error  Flags
    const [erroEmail, setErroEmail] = useState(false);
    const [erroEmailMesssage, setErroEmailMessage] = useState('');
    const [erroName, setErroName] = useState(false);
    const [erroNameMessage, setErroNameMessage] = useState('');
    const [erroClassificacao, setErroClassificacao] = useState(false);
    const [erroClassificacaoMessage, setErroClassificacaoMessage] = useState('');
    const [erroType, setErroType] = useState(false);
    const [erroTypeMessage, setErroTypeMessage] = useState('');

    // Placeholder Masks
    const maskToCpf='000.000.000-00';
    const maskToCnpj="00.000.000/0000-00";
    const maskToCep = "00-000-000";
    const maskToPhone = "(00) 0 0000-0000";
    
    // Add Client Button
    const AddButton = () => {
      return(<Button onClick={validateAndSend} variant='contained' color="success">{clientToEdit !== null ? 'Editar' : 'Adicionar' }</Button>);
    }
    

    // START-HANDLERS /////////////////////////////////
    const handleEmailChange = (event) => {
      isValidEmail(event.target.value);
      setEmail(event.target.value);
    };

    const handleNewPhone = (event) => {
      setNewPhone(event.target.value);
    }

    const handleChangeCep = (event) => {
      setCep(event.target.value);
    };

    const handleAddPhoneToList = () => {
      if(!phones.some(el => el.key === newPhone) && (newPhone.length === 15 || newPhone.length === 16) ) {
        setPhones(prev => [ ...prev,  { key: newPhone, label: newPhone }]);
        setAllPhones(prev => [...prev, newPhone]);
        setNewPhone('');
      }
    }

    const handleDelete = (chipToDelete) => () => {
      setPhones((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
      setAllPhones((prevs) => prevs.filter((tel) => tel != chipToDelete.key));
    };

    const handleNameChange =(e) => { 
      isValidName(e.target.value);
      if (/^[a-zA-Z ]*$/.test(e.target.value)) {  
        setName(e.target.value.toUpperCase());
      }
    }
    
    const handleChangeIdentity = (event) => {
      setIdentity(event.target.value);
    };
    // END-HANDLERS /////////////////////////////////

    // START-VALIDATIONS ///////////////////////////
    const isValidClassificacao = () => {
      if(classificacao === ''){
        setErroClassificacao(true);
        setErroClassificacaoMessage('Campo Obrigatório!');
        return false;
      }else{
        setErroClassificacao(false);
        setErroClassificacaoMessage('');
        return true;
      }
    }

    const isValidTipo = () => {
      if(type === ''){
        setErroType(true);
        setErroTypeMessage('Campo Obrigatório!');
        return false;
      } else{
        setErroType(false);
        setErroTypeMessage('');
        return true;
      }
    }

    const isValidName = (nome) => {
      if(nome === '') {
        setErroName(true);
        setErroNameMessage('Campo Obrigatório!');
        return false;
      }else{
        setErroName(false);
        return true;
      }
    }

    const isValidEmail = (emailToTest) => {
      var mailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if(!mailFormat.test(emailToTest)) {
        setErroEmail(true);
        setErroEmailMessage('Por favor, informe um email válido!');
        return false;
      }else{
        setErroEmail(false);
        return true;
      }
    };
    // END-VALIDATIONS ///////////////////////////
    

    // SEND DATA TO DATABASE
    const sendDada = async () => {
      const response = await saveNewClient(name, email, type, classificacao, cep, identity, allPhones);
      setController(false);
      responseOnRefresh(response)
    }

    const sendEdittedClient = async () => {
      const response = await updateClient(id, name, email, type, classificacao, cep, identity, allPhones);
      setController(false);
      responseOnRefresh(response);
    }

    // VALIDATE ALL DATA BEFORE SEND IT TO DATABASE
    const validateAndSend = () => {
      let err = false;
      if(!isValidEmail(email)){
        err = true;
      }
      if(!isValidClassificacao()){
        err = true;
      }
      if(!isValidName(name)){
        err = true
      }
      if(!isValidTipo()){
        err = true;
      }
      if(err === false){
        // Cliente para editar
        if(clientToEdit != null){

          const res = sendEdittedClient();
        
        // Cliente para salvar no DB
        }else{
          const res = sendDada();
        }
      }
    }

    // CHANGING TO 'CPF' OR 'CNPJ' SIZES
    const returnIdSize = () => {
        if(type===0) {
            setIdentitySize(14);
        } else if(type === 1) {
            setIdentitySize(11);
        }
    }

    const emptyFields = () => {
      setName('');
      setEmail('');
      setType('');
      setClassficacao('');
      setCep('');
      setIdentity('');
      setPhones([]);
      setNewPhone('');
      setErroName(false);
      setErroEmail(false);
      setErroType(false);
      setErroTypeMessage('')
      setErroClassificacao(false);
      setErroClassificacaoMessage('');
    }

    useEffect(()=> {
        returnIdSize();
    }, [type])

    useEffect(() => {
      if(controller === false){
        emptyFields();
      }
    }, [controller])

    useEffect(()=>{
      if(erroName === false){
        setErroNameMessage('');
      }
    }, [erroName]);

    useEffect(() => {
      if(erroEmail === false){
        setErroEmailMessage('');
      }
    }, [erroEmail]);

    useEffect(() => {
      if(classificacao !== ''){
        setErroClassificacao(false);
        setErroClassificacaoMessage('');
      }
    }, [classificacao]);

    useEffect(() => {
      if(type !== ''){
        setErroType(false);
        setErroTypeMessage('');
      }
    }, [type]);

    useEffect(() => {
      if(clientToEdit != null){
        
        console.log(clientToEdit);
        setId(clientToEdit.id)
        setName(clientToEdit.nome);
        setEmail(clientToEdit.email);
        setType(clientToEdit.type);
        setCep(clientToEdit.cep);
        setClassficacao(clientToEdit.classificacao);
        clientToEdit.cpf &&  clientToEdit.type === 1 ? setIdentity(clientToEdit.cpf) : setIdentity('');
        clientToEdit.cnpj && clientToEdit.type === 0 ? setIdentity(clientToEdit.cnpj) : setIdentity('');
        clientToEdit.telefones[0] !== '' ? clientToEdit.telefones.map(phoneNumber => (setPhones(prev => [ ...prev,  { key: phoneNumber, label: phoneNumber }]))) : setPhones([]) ;
        clientToEdit.telefones[0] !== '' ? setAllPhones(clientToEdit.telefones) : setAllPhones([]);
      }
    }, [])

    return(
        <Popup trigger={controller} setTrigger={setController} title={title} closeBtn={closeBtn} complement={<AddButton/>}>
            <div className = "input-divs">
                <TextField
                    label="Nome"
                    id="nome-input"
                    value={name}
                    error={erroName}
                    helperText={erroNameMessage}
                    sx={{ m: 1, width: '100%'}}
                    inputProps={{
                        maxLength: 100,
                    }}
                    onChange={handleNameChange}
                />
            </div>
            <div className = "input-divs">
            <TextField
                    label="Email"
                    id="email-input"
                    value={email}
                    sx={{ m: 1, width: '100%' }}
                    error={erroEmail}
                    helperText={erroEmailMesssage}
                    inputProps={{
                        maxLength: 100,
                    }}
                    onChange={handleEmailChange}
                />
            </div>
            <div>
                <Dropdown controller={type} setController={setType} label="Tipo" size={160} items={['Pessoa Jurídica', 'Pessoa Física']} error={erroType} helperText={erroTypeMessage}/>
            </div>
            <div>
                <Dropdown controller={classificacao} setController={setClassficacao} label="Classificação" size={160} items={['Ativo', 'Inativo', 'Preferencial']} error={erroClassificacao} helperText={erroClassificacaoMessage} />
            </div>
            <div className = "input-divs">
                {type !== '' ? 
                <>
                <InputLabel sx={{ mt: 1 }} htmlFor="formatted-text-mask-input">{ type===0 ? 'CNPJ': 'CPF' }</InputLabel>
                <Input
                    label={type === 0 ? "CNPJ" : "CPF" }
                    value={identity}
                    placeholder={type === 0 ? maskToCnpj : maskToCpf }
                    id="identity"
                    name="identity"
                    sx={{ m: 1, width: '100%' }}
                    onChange={handleChangeIdentity}
                    inputComponent={type === 0 ? cnpjMask : cpfMask }
                /></> : <></> }
            </div>
            <div>
              <InputLabel sx={{ mt: 1 }} htmlFor="add-phone-list">Telefone(s)</InputLabel>
              <Input
                id="add-phone-list"
                type={'text'}
                value={newPhone}
                placeholder={maskToPhone}
                onChange={handleNewPhone}
                sx={{ m: 1, width: '100%'}}
                inputComponent={phoneMask}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      value={newPhone}
                      onClick={handleAddPhoneToList}
                    >
                      <SendIcon/>
                    </IconButton>
                  </InputAdornment>
              }/>
            </div>
            <div className = "input-divs">
                <>
                <InputLabel sx={{ mt: 1 }} htmlFor="formatted-text-mask-input">CEP</InputLabel>
                <Input
                    label="CEP"
                    value={cep}
                    placeholder={maskToCep}
                    id="cep"
                    name="cep"
                    sx={{ m: 1, width: '100%' }}
                    onChange={handleChangeCep}
                    inputComponent={cepMask}
                /></>
            </div>
            <div>
            { phones.length > 0 ?
            <>
              <InputLabel sx={{ mt:2, mb:1 }}htmlFor="phone-list">Lista de Telefones</InputLabel>
              <Paper
                id="phone-list"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  listStyle: 'none',
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {phones.map((data) => {
                  let icon;

                  return (
                    <ListItem key={data.key}>
                      <Chip
                        icon={icon}
                        label={data.label}
                        onDelete={ handleDelete(data)}
                      />
                    </ListItem>
                  );
                })}
              </Paper></>
            : <></>}
            </div>
        </Popup>
    );
}
export default AddNewClient;