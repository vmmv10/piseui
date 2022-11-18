import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../api/routes";
import Modal from "../../../componentes/general/Modal";
import FloatingLabel from "../../../componentes/general/FLoatingLabel";
import { useEffect } from "react";

function FormEquiposEmergencias(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue } = useForm();

  useEffect(
    () => {
      if (props.equipo.id) {
        getEquipos();
      }
    },
    [props.equipo] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    let resultado;
    if (props.equipo.id) {
      resultado = await api.equipos.put(rbd, props.equipo.id, data);
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
      resultado = await api.equipos.post(rbd, data);
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

  async function getEquipos() {
    let resultado = await api.equipos.getOne(rbd, props.equipo.id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.equipo;
      setValue("material", doc.material);
      setValue("cantidad", doc.cantidad);
      setValue("observaciones", doc.observaciones);
      setValue("equipo", doc.equipo);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setValue("material", "");
    setValue("cantidad", "");
    setValue("observaciones", "");
    setValue("equipo", "");
    props.handleClose();
  }

  async function eliminar() {
    let resultado = await api.equipos.delete(rbd, props.equipo.id);
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
      titulo={`${props.equipo.id ? "Editar" : "Agregar"} Equipo`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
    >
      <div>
        <FloatingLabel register={register} name={"equipo"} bool={true}>
          Equipo
        </FloatingLabel>
      </div>
      <div>
        <FloatingLabel register={register} name={"material"} bool={true}>
          Material
        </FloatingLabel>
      </div>
      <div className="flex">
        <FloatingLabel register={register} name={"cantidad"} bool={true}>
          Cantidad
        </FloatingLabel>
      </div>
      <div className="flex">
        <FloatingLabel register={register} name={"observaciones"} bool={true}>
          Observaciones
        </FloatingLabel>
      </div>
    </Modal>
  );
}

export default FormEquiposEmergencias;
