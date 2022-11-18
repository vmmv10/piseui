import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../../api/routes";
import Modal from "../../../../componentes/general/Modal";
import InputTextArea from "../../../../componentes/general/InputTextArea";
import FloatingLabel from "../../../../componentes/general/FLoatingLabel";

function FormPrioridades(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue } = useForm();

  useEffect(
    () => {
      if (props.prioridad.id) {
        getEvento();
      }
    },
    [props.prioridad] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    let resultado;
    if (props.prioridad.id) {
      resultado = await api.prioridades.put(rbd, props.prioridad.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha editado con éxito");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.prioridades.post(rbd, data);
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
    let resultado = await api.prioridades.getOne(rbd, props.prioridad.id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.prioridad;
      setValue("analisis", doc.analisis);
      setValue("solucion", doc.solucion);
      setValue("nuevo_riesgo", doc.nuevo_riesgo);
      setValue("dano", doc.dano);
      setValue("recurrencia", doc.recurrencia);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setValue("analisis", "");
    setValue("solucion", "");
    setValue("nuevo_riesgo", "");
    setValue("dano", "");
    setValue("recurrencia", "");
    props.handleClose();
  }

  async function eliminar() {
    let resultado = await api.prioridades.delete(rbd, props.prioridad.id);
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
      titulo={`${props.prioridad.id ? "Editar" : "Agregar"} Prioridad`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
      eliminar={eliminar}
    >
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"analisis"}
        >
          Análisis
        </InputTextArea>
      </div>
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"solucion"}
        >
          ¿Se puede repetir? ¿Qué medida se adoptó para evitar que sucediera?
        </InputTextArea>
      </div>
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"nuevo_riesgo"}
        >
          ¿Se encuentra un nuevo riesgo? ¿Cuál?
        </InputTextArea>
      </div>
      <div className="flex">
        <FloatingLabel register={register} bool={true} name={"dano"}>
          Daño que provoca
        </FloatingLabel>
      </div>
      <div className="flex">
        <FloatingLabel register={register} bool={true} name={"recurrencia"}>
          Recurrencia
        </FloatingLabel>
      </div>
    </Modal>
  );
}

export default FormPrioridades;
