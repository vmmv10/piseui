import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../../../../componentes/general/Input";
import Selector from "../../../../componentes/general/Selector";
import Modal from "../../../../componentes/general/Modal";
import Api from "../../../../api/routes";
import FloatingLabel from "../../../../componentes/general/FLoatingLabel";

function FormAsistentes(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue } = useForm();
  const [estamento, setEstamento] = useState({});
  const [cargo, setCargo] = useState({});
  const [option, setOption] = useState([]);

  const options = [
    { value: 0, label: "Asistente de la educación" },
    { value: 1, label: "Centros de Recursos" },
    { value: 2, label: "Extra-curricular" },
    { value: 3, label: "Administrativos" },
    { value: 4, label: "Inspectoria" },
    { value: 5, label: "Asistentes de aula" },
    { value: 6, label: "Aseo y Mantención" },
  ];

  const options0 = [
    { value: 0, label: "Psicóloga/o SEP" },
    { value: 1, label: "Psicóloga/o Integración" },
    { value: 2, label: "Encargada/o Convivencia Escolar" },
    { value: 3, label: "Fonoaudióloga" },
    { value: 4, label: "Kinesióloga/o" },
    { value: 5, label: "Trabajadora/o Social" },
  ];

  const options1 = [
    { value: 0, label: "Encargada/o Biblioteca CRA" },
    { value: 1, label: "Asistente Laboratorio de Enlaces" },
    { value: 2, label: "Enfermera/o" },
  ];

  const options2 = [{ value: 0, label: "Monitores de academias" }];

  const options3 = [
    { value: 0, label: "Contador/a General" },
    { value: 1, label: "Secretaria/o Colegio" },
    { value: 2, label: "Asistente Contable" },
    { value: 3, label: "Secretaria/o de Dirección" },
    { value: 4, label: "Encargada/o de Subvenciones" },
    { value: 5, label: "Administrador/a de recursos" },
  ];

  const options4 = [{ value: 0, label: "Inspector/a de Patio" }];

  const options5 = [{ value: 0, label: "Asistentes de Aula" }];

  const options6 = [{ value: 0, label: "Auxiliar de aseo" }];

  useEffect(() => {}, [estamento.value]);

  useEffect(
    () => {
      if (props.asistente.id) {
        getAsistente();
      }
    },
    [props.asistente] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    data.estamento = estamento;
    data.cargo = cargo;
    let resultado;
    if (props.asistente.id) {
      resultado = await api.asistentes.put(rbd, props.asistente.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha editado con éxito");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.asistentes.post(rbd, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha agregado con éxito");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    }
  }

  async function getAsistente() {
    let resultado = await api.asistentes.getOne(rbd, props.asistente.id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.asistente;
      setEstamento(doc.estamento);
      setCargo(doc.cargo);
      setValue("nombre", doc.nombre);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setCargo({});
    setEstamento({});
    setValue("nombre", "");
    props.setShow(false);
  }

  async function eliminar() {
    let resultado = await api.asistentes.delete(rbd, props.asistente.id);
    if (resultado && resultado.status === 200) {
      cerrarModal();
      props.obtenerDatos();
      toast.success("Se ha eliminada con éxito");
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  return (
    <Modal
      setShow={props.setShow}
      show={props.show}
      titulo={`${
        props.asistente.id ? "Editar" : "Agregar"
      } Asistente de la Educación`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
      eliminar={eliminar}
    >
      <div>
        <FloatingLabel register={register} name={"nombre"} bool={true}>
          Nombre Completo
        </FloatingLabel>
      </div>
      <div className="px-2 py-3">
        <Selector
          control={control}
          options={options}
          Controller={Controller}
          name="estamento"
          valorDefault={estamento}
          placeholder="Seleccione Estamento"
          onChange={(data) => {
            if (data) {
              setEstamento(data.label);
            } else {
              setEstamento("");
            }
          }}
        />
      </div>
      <div className="px-2 mt-1">
        {estamento == "Asistente de la educación" ? (
          <Selector
            control={control}
            options={options0}
            Controller={Controller}
            valorDefault={cargo}
            name="cargo"
            placeholder="Seleccione Cargo"
            onChange={(data) => {
              if (data) {
                setCargo(data.label);
              } else {
                setCargo("");
              }
            }}
          />
        ) : estamento == "Centros de Recursos" ? (
          <Selector
            control={control}
            options={options1}
            valorDefault={cargo}
            Controller={Controller}
            name="cargo"
            placeholder="Seleccione Cargo"
            onChange={(data) => {
              if (data) {
                setCargo(data.label);
              } else {
                setCargo("");
              }
            }}
          />
        ) : estamento == "Extra-curricular" ? (
          <Selector
            control={control}
            options={options2}
            valorDefault={cargo}
            Controller={Controller}
            name="cargo"
            placeholder="Seleccione Cargo"
            onChange={(data) => {
              if (data) {
                setCargo(data.label);
              } else {
                setCargo("");
              }
            }}
          />
        ) : estamento == "Administrativos" ? (
          <Selector
            control={control}
            options={options3}
            valorDefault={cargo}
            Controller={Controller}
            name="cargo"
            placeholder="Seleccione Cargo"
            onChange={(data) => {
              if (data) {
                setCargo(data.label);
              } else {
                setCargo("");
              }
            }}
          />
        ) : estamento === "Inspectoria" ? (
          <Selector
            control={control}
            options={options4}
            valorDefault={cargo}
            Controller={Controller}
            name="cargo"
            placeholder="Seleccione Cargo"
            onChange={(data) => {
              if (data) {
                setCargo(data.label);
              } else {
                setCargo("");
              }
            }}
          />
        ) : estamento === "Asistentes de aula" ? (
          <Selector
            control={control}
            valorDefault={cargo}
            options={options5}
            Controller={Controller}
            name="cargo"
            placeholder="Seleccione Cargo"
            onChange={(data) => {
              if (data) {
                setCargo(data.label);
              } else {
                setCargo("");
              }
            }}
          />
        ) : estamento == "Aseo y Mantención" ? (
          <Selector
            control={control}
            options={options6}
            valorDefault={cargo}
            Controller={Controller}
            name="cargo"
            placeholder="Seleccione Cargo"
            onChange={(data) => {
              if (data) {
                setCargo(data.label);
              } else {
                setCargo("");
              }
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
}

export default FormAsistentes;
