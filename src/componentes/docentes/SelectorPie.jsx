import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';

function SelectorPie(props) {
  const {
    control, // Props React-hook-form
    name, // nombre del componente para obtener la información
    placeholder,
    Controller,
    pie,
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
      {value : 0, label :'Coordinador PIE'},
      {value : 1, label :'Profesor/a Difetencial'},
  ]

  useEffect(
    () => {
      if (pie && valorInicial === null) {
        informacion.map(pie => {
          if (pie.label === pie) {
            setValorInicial(pie);
          }
        }
        )
      }
    },
    [informacion, pie]
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

export default SelectorPie