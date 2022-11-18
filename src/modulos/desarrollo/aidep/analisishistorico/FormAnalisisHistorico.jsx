import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../../../componentes/general/Modal";
import Api from "../../../../api/routes";
import InputTextArea from "../../../../componentes/general/InputTextArea";
import Selector from "../../../../componentes/general/Selector";

function FormAnalisisHistorico(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue } = useForm();
  const [estamento, setEstamento] = useState({});
  const [personas, setPersona] = useState({});
  const [infraestructura, setInfraestructura] = useState({});
  const [descripcion, setDescripcion] = useState("");
  const [option, setOption] = useState([]);
  const options = [
    { value: 0, label: "Si" },
    { value: 1, label: "No" },
  ];

  useEffect(
    () => {
      if (props.accidente.id) {
        getEvento();
      }
    },
    [props.accidente] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    data.personas = personas;
    data.infraestructura = infraestructura;
    let resultado;
    if (props.accidente.id) {
      resultado = await api.accidentes.put(rbd, props.accidente.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha editado con éxito");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.accidentes.post(rbd, data);
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

  async function getEvento() {
    let resultado = await api.accidentes.getOne(rbd, props.accidente.id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.accidente;
      setPersona(doc.personas);
      setInfraestructura(doc.infraestructura);
      setValue("situacion", doc.situacion);
      setValue("como_actuo", doc.como_actuo);
      setValue("seguimiento", doc.seguimiento);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setInfraestructura({});
    setPersona({});
    setValue("situacion", "");
    setValue("como_actuo", "");
    setValue("seguimiento", "");
    props.setShow(false);
  }

  async function eliminar() {
    let resultado = await api.accidentes.delete(rbd, props.accidente.id);
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
      eliminar={eliminar}
      titulo={`${props.accidente.id ? "Editar" : "Agregar"} Evento Histórico`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
    >
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"situacion"}
        >
          ¿Qué nos Sucedió?
        </InputTextArea>
      </div>
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"como_actuo"}
        >
          ¿Cómo se Actuó?
        </InputTextArea>
      </div>
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"seguimiento"}
        >
          Seguimiento
        </InputTextArea>
      </div>
      <div className="flex lg:flex-row flex-col py-1">
        <div className="flex-1 px-2 mb-1">
          <Selector
            control={control}
            options={options}
            Controller={Controller}
            valorDefault={personas}
            name="personas"
            placeholder="Daño a personas"
            onChange={(data) => {
              if (data) {
                setPersona(data.label);
              } else {
                setPersona("");
              }
            }}
          />
        </div>
        <div className="flex-1 px-2">
          <Selector
            control={control}
            options={options}
            Controller={Controller}
            valorDefault={infraestructura}
            name="infraestructura"
            placeholder="Daño a infraestructura"
            onChange={(data) => {
              if (data) {
                setInfraestructura(data.label);
              } else {
                setInfraestructura("");
              }
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default FormAnalisisHistorico;
