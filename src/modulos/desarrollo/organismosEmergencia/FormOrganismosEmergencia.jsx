import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../api/routes";
import Modal from "../../../componentes/general/Modal";
import FloatingLabel from "../../../componentes/general/FLoatingLabel";

function FormOrganismosEmergencia(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue } = useForm();

  useEffect(
    () => {
      if (props.organismo.id) {
        getOrganismo();
      }
    },
    [props.organismo] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    let resultado;
    if (props.organismo.id) {
      resultado = await api.organismos.put(rbd, props.organismo.id, data);
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
      resultado = await api.organismos.post(rbd, data);
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
    let resultado = await api.organismos.getOne(rbd, props.organismo.id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.organismo;
      setValue("institucion", doc.institucion);
      setValue("tipo", doc.tipo);
      setValue("contacto", doc.contacto);
      setValue("nombre_contacto", doc.nombre_contacto);
      setValue("direccion", doc.direccion);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setValue("institucion", "");
    setValue("tipo", "");
    setValue("contacto", "");
    setValue("nombre_contacto", "");
    setValue("direccion", "");
    props.handleClose();
  }

  async function eliminar() {
    let resultado = await api.organismos.delete(rbd, props.organismo.id);
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
      titulo={`${props.organismo.id ? "Editar" : "Agregar"} Organismo de emergencia`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
      eliminar={eliminar}
    >
      <div className="flex">
        <FloatingLabel register={register} name={"institucion"} bool={true}>
          Institución
        </FloatingLabel>
      </div>
      <div className="flex lg:flex-row flex-col">
        <FloatingLabel register={register} name={"nombre_contacto"} bool={true}>
          Nombre del Contacto
        </FloatingLabel>
        <FloatingLabel register={register} name={"tipo"} bool={true}>
          Tipo Emergencia
        </FloatingLabel>
      </div>
      <div className="flex lg:flex-row flex-col">
        <FloatingLabel register={register} name={"contacto"} bool={true}>
          Contacto
        </FloatingLabel>
        <FloatingLabel register={register} name={"direccion"} bool={true}>
          Dirección
        </FloatingLabel>
      </div>
    </Modal>
  );
}

export default FormOrganismosEmergencia;
