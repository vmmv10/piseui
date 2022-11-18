import React, { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';

function SelectorDocenteAula(props) {
  const {
    control, // Props React-hook-form
    name, // nombre del componente para obtener la información
    placeholder,
    Controller,
    docenteAula,
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
      {value : 0, label :'Profesor Jefe'},
      {value : 1, label :'Profesor Asignatura'},
  ]

  useEffect(
    () => {
      if (docenteAula && valorInicial === null) {
        informacion.map(docente => {
          if (docente.label === docenteAula) {
            setValorInicial(docente);
          }
        }
        )
      }
    },
    [informacion, docenteAula]
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

export default SelectorDocenteAula