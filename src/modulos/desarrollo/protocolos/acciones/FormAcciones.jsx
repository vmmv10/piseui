import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../../api/routes";
import FloatingLabel from "../../../../componentes/general/FLoatingLabel";
import InputTextArea from "../../../../componentes/general/InputTextArea";
import Modal from "../../../../componentes/general/Modal";

function FormAcciones(props) {
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
      if (props.accion.id) {
        getEvento();
      }
    },
    [props.accion] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    let resultado;
    if (props.accion.id) {
      resultado = await api.acciones.put(
        rbd,
        props.accion.id,
        props.protocolo_id,
        data
      );
      if (resultado && resultado.status === 200) {
        toast.success("Se ha editado con éxito");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.acciones.post(rbd, props.protocolo_id, data);
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
    let resultado = await api.acciones.getOne(
      rbd,
      props.accion.id,
      props.protocolo_id
    );
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.accion;
      setValue("accion", doc.accion);
      setValue("responsables", doc.responsables);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setValue("accion", "");
    setValue("responsables", "");
    props.setShow(false);
  }

  async function eliminar() {
    let resultado = await api.acciones.delete(rbd, props.accion.id);
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
      titulo={`${props.accion.id ? "Editar" : "Agregar"} Acción`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
      eliminar={eliminar}
    >
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"accion"}
        >
          Acción
        </InputTextArea>
      </div>
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"responsables"}
        >
          Responsables
        </InputTextArea>
      </div>
    </Modal>
  );
}

export default FormAcciones;
