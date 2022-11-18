import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../../api/routes";
import Modal from "../../../../componentes/general/Modal";
import InputTextArea from "../../../../componentes/general/InputTextArea";
import FloatingLabel from "../../../../componentes/general/FLoatingLabel";

function FormInvestigacionTerreno(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue } = useForm();

  useEffect(
    () => {
      if (props.investigacion.id) {
        getEvento();
      }
    },
    [props.investigacion] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    let resultado;
    if (props.investigacion.id) {
      resultado = await api.investigaciones.put(
        rbd,
        props.investigacion.id,
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
      resultado = await api.investigaciones.post(rbd, data);
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
    let resultado = await api.investigaciones.getOne(
      rbd,
      props.investigacion.id
    );
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.investigacion;
      setValue("riesgo", doc.riesgo);
      setValue("ubicacion", doc.ubicacion);
      setValue("impacto", doc.impacto);
      setValue("encargado", doc.encargado);
      setValue("recurrencia", doc.recurrencia);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setValue("riesgo", "");
    setValue("ubicacion", "");
    setValue("impacto", "");
    setValue("encargado", "");
    setValue("recurrencia", "");
    props.setShow(false);
  }

  async function eliminar() {
    let resultado = await api.investigaciones.delete(
      rbd,
      props.investigacion.id
    );
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
      titulo={`${
        props.investigacion.id ? "Editar" : "Agregar"
      } Evento Histórico`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
    >
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"riesgo"}
        >
          Riesgo
        </InputTextArea>
      </div>
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"ubicacion"}
        >
          Ubicación
        </InputTextArea>
      </div>
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"impacto"}
        >
          Impacto
        </InputTextArea>
      </div>
      <div className="flex">
        <FloatingLabel register={register} bool={true} name={"encargado"}>
          Encargado
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

export default FormInvestigacionTerreno;
