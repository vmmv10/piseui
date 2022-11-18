import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';

function SelectorEstamento(props) {
  const {
    control, // Props React-hook-form
    name, // nombre del componente para obtener la información
    placeholder,
    Controller,
    estamento,
    onChange,
    isDisabled,
  } = props;

  const [informacion, setInformacion] = useState([]);
  const [valorInicial, setValorInicial] = useState(null);

  useEffect(
    () => {
      obtenerDatos();
    },
    []
  )

  const options = [
      {value : 0, label :'Dirección'},
      {value : 1, label :'Inspectoría General'},
      {value : 2, label :'Unidad Técnica Pedagógica'},
      {value : 3, label :'Orientación'},
  ]

  useEffect(
    () => {
      if (estamento && valorInicial === null) {
        informacion.map(dato => {
          if (dato.label === estamento) {
            setValorInicial(dato);
          }
        }
        )
      }
    },
    [informacion, estamento]
  )

  async function obtenerDatos() {
    setInformacion(options)
  }

  return (
    <>
      <Controller
        name={name}
        render={({ field }) => {
          return (
            <ReactSelect
              isDisabled={isDisabled?isDisabled:false}
              placeholder={placeholder ? placeholder : "Seleccione una marca"}
              isClearable={true}
              value={valorInicial}
              options={informacion}
              onChange={(selected) => {
                if (onChange) {
                  setValorInicial(selected);
                  onChange(selected);
                } else {
                  setValorInicial(selected);
                  return selected;
                }
              }}
            />
          );
        }}
        control={control}
        rules={{ required: false }}
      />
    </>
  )
}

export default SelectorEstamento