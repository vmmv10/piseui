import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../../api/routes";
import FloatingLabel from "../../../../componentes/general/FLoatingLabel";
import InputTextArea from "../../../../componentes/general/InputTextArea";
import Modal from "../../../../componentes/general/Modal";

function FormDefiniciones(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue } = useForm();

  useEffect(
    () => {
      if (props.definicion.id) {
        getOrganismo();
      }
    },
    [props.definicion] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    let resultado;
    if (props.definicion.id) {
      resultado = await api.definiciones.put(rbd, props.definicion.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha editado con exito!");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
        cerrarModal();
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.definiciones.post(rbd, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha agregado con exito!");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    }
  }

  async function getOrganismo() {
    let resultado = await api.definiciones.getOne(rbd, props.definicion.id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.definicion;
      setValue("palabra", doc.palabra);
      setValue("definicion", doc.definicion);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setValue("palabra", "");
    setValue("definicion", "");
    props.handleClose();
  }

  async function eliminar() {
    let resultado = await api.definiciones.delete(rbd, props.definicion.id);
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
      titulo={`${props.definicion.id ? "Editar" : "Agregar"} Definición`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
      eliminar={eliminar}
    >
      <div className="flex">
        <FloatingLabel register={register} name={"palabra"} bool={true}>
            Palabra
        </FloatingLabel>
      </div>
      <div className="flex lg:flex-row flex-col">
        <InputTextArea rows={'6'} register={register} name={"definicion"} bool={true}>
            Definición
        </InputTextArea>
      </div>
    </Modal>
  );
}

export default FormDefiniciones;
