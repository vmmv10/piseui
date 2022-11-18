import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../api/routes";
import InputTextArea from "../../componentes/general/InputTextArea";
import Modal from "../../componentes/general/Modal";
import { DatePicker } from "@material-ui/pickers";

function FormSimulacros(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, setValue } = useForm();
  const [fecha, setFecha] = useState(new Date());

  useEffect(
    () => {
      if (props.simulacro.id) {
        getCapacitacion();
      }
    },
    [props.simulacro] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    data.fecha = fecha;
    let resultado;
    if (props.simulacro.id) {
      resultado = await api.simulacros.put(rbd, props.simulacro.id, data);
      if (resultado && resultado.status === 200) {
        toast.success("Se ha editado con éxito");
        props.setShow(false);
        props.handleClose();
        props.obtenerDatos();
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.simulacros.post(rbd, data);
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

  async function getCapacitacion() {
    let resultado = await api.simulacros.getOne(rbd, props.simulacro.id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.simulacro;
      setFecha(doc.fecha);
      setValue("simulacro", doc.simulacro);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setFecha(new Date());
    setValue("simulacro", "");
    props.setShow(false);
  }

  async function eliminar() {
    let resultado = await api.simulacros.delete(rbd, props.simulacro.id);
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
        props.simulacro.id ? "Editar" : "Agregar"
      } Simulacro`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
      eliminar={eliminar}
    >
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"simulacro"}
        >
            Simulacro
        </InputTextArea>
      </div>
      <div className="grid grid-cols-1 gap-4 px-2 col-span-1">
            <div className=" grid border rounded px-3 pb-2.5 pt-1.5 text-sm text-gray-900 bg-white dark:bg-gray-700 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
              <p className="place-items-start " style={{ fontSize: "11px" }}>
                Fecha
              </p>
              <DatePicker value={fecha} onChange={setFecha} />
            </div>
          </div>
    </Modal>
  );
}

export default FormSimulacros;
