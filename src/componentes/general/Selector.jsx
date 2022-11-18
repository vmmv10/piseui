import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";

function Selector(props) {
  const {
    control, // Props React-hook-form
    name, // nombre del componente para obtener la información
    placeholder,
    Controller,
    valorDefault,
    onChange,
    isDisabled,
  } = props;

  const [informacion, setInformacion] = useState([]);
  const [valorInicial, setValorInicial] = useState(null);

  useEffect(() => {
    obtenerDatos();
  }, [props.options]);

  useEffect(() => {
    if (valorDefault) {
      informacion.map((valor) => {
        if (valorDefault === valor.label) {
          setValorInicial(valor);
        }
      });
    }
  }, [informacion, valorDefault]);

  async function obtenerDatos() {
    setInformacion(props.options);
  }

  return (
    <>
      <Controller
        name={name}
        render={({ field }) => {
          return (
            <ReactSelect
              isDisabled={isDisabled ? isDisabled : false}
              placeholder={placeholder}
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
  );
}

export default Selector;
