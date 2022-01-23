/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Popup from '../PopUpCard';
import { TextField } from '@mui/material';
import Dropdown from '../../Components/Dropdown';
import {IMaskInput} from 'react-imask';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';

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

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function AddNewClient({controller, setController, title, closeBtn}) {
    const [popupOutputsTrigger, setPopupOutputsTrigger] = useState(false)
    
    const [type, setType] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [identity, setIdentity] = useState('');
    const [cep, setCep] = useState('');
    const [classificacao, setClassficacao] = useState(null);

    const [identitySize, setIdentitySize] = useState(10);

    // Error  Flags
    const [erroEmail, setErroEmail] = useState(false);
    const [erroName, setErroName] = useState(false);

    const [newPhone, setNewPhone] = useState('');

    const maskToCpf='000.000.000-00';
    const maskToCnpj="00.000.000/0000-00";
    const maskToCep = "00-000-000";
    const maskToPhone = "(00) 0 0000-0000";

    const [phones, setPhones] = React.useState([]);
  
    const handleDelete = (chipToDelete) => () => {
      setPhones((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const handleName =(e) => {
      if (e.target.value.match('/[A-Z/gi')) {
          setErroName(true)
      } else{
          setErroName(false);
      }
    }
    
    const handleChangeIdentity = (event) => {
      setIdentity(event.target.value);
    };

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handleNewPhone = (event) => {
      setNewPhone(event.target.value);
    }

    const handleAddPhoneToList = () => {
      if(!phones.includes(phones.find(obj => {return obj.kew === newPhone;}))){
        setPhones(prev => [ ...prev,  { key: newPhone, label: newPhone },])
      }
      setNewPhone('');
    }

    const returnIdSize = () => {
        if(type===0) {
            setIdentitySize(14);
        } else if(type === 1) {
            setIdentitySize(11);
        }
    }

    useEffect(()=> {
        returnIdSize();
    }, [type])

    return(
        <Popup trigger={controller} setTrigger={setController} title={title} closeBtn={closeBtn}>
            <div className = "input-divs">
                <TextField
                    label="Nome"
                    id="nome-input"
                    error={erroName}
                    helperText={ erroName === true ? 'Campo Obrigatório' : '' }
                    sx={{ m: 1, width: '100%'}}
                    inputProps={{
                        maxLength: 100,
                    }}
                    onChange={handleName}
                />
            </div>
            <div className = "input-divs">
            <TextField
                    label="Email"
                    id="email-input"
                    sx={{ m: 1, width: '100%' }}
                    error={erroEmail}
                    helperText={erroEmail}
                    inputProps={{
                        maxLength: 100,
                    }}
                    onChange={handleEmailChange}
                />
            </div>
            <div>
                <Dropdown controller={type} setController={setType} label="Tipo" size={160} items={['Pessoa Jurídica', 'Pessoa Física']}/>
            </div>
            <div>
                <Dropdown controller={classificacao} setController={setClassficacao} label="Classificação" size={160} items={['Ativo', 'Inativo', 'Preferencial']}/>
            </div>
            <div className = "input-divs">
                {type != null ? 
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
                onChange={handleNewPhone}
                sx={{ m: 1, width: '100%'}}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      value={newPhone}
                      onClick={handleAddPhoneToList}
                    >
                      <AddCircleIcon/>
                    </IconButton>
                  </InputAdornment>
              }/>
            </div>
            <div className = "input-divs">
                <>
                <InputLabel sx={{ mt: 1 }} htmlFor="formatted-text-mask-input">CEP</InputLabel>
                <Input
                    label="CEP"
                    value={identity}
                    placeholder={maskToCep}
                    id="cep"
                    name="cep"
                    sx={{ m: 1, width: '100%' }}
                    onChange={handleChangeIdentity}
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