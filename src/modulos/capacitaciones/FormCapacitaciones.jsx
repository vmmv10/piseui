import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../api/routes";
import FloatingLabel from "../../componentes/general/FLoatingLabel";
import InputTextArea from "../../componentes/general/InputTextArea";
import Modal from "../../componentes/general/Modal";
import Fecha from "../../componentes/general/Fecha";
import { DatePicker } from "@material-ui/pickers";

function FormCapacitaciones(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue } = useForm();
  const [fecha_inicio, setFecha_inicio] = useState(new Date());
  const [fecha_final, setFecha_final] = useState(new Date());

  useEffect(
    () => {
      if (props.capacitacion.id) {
        getCapacitacion();
      }
    },
    [props.capacitacion] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function onSubmit(data) {
    data.fecha_inicial = fecha_inicio;
    data.fecha_final = fecha_final;
    let resultado;
    if (props.capacitacion.id) {
      resultado = await api.capacitaciones.put(
        rbd,
        props.capacitacion.id,
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
      resultado = await api.capacitaciones.post(rbd, data);
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
    let resultado = await api.capacitaciones.getOne(rbd, props.capacitacion.id);
    if (resultado && resultado.status === 200) {
      let doc = resultado.data.capacitacion;
      setFecha_final(doc.fecha_final);
      setFecha_inicio(doc.fecha_inicial);
      setValue("curso", doc.curso);
      setValue("institucion", doc.institucion);
      setValue("tiempo", doc.tiempo);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  function cerrarModal() {
    setFecha_final(new Date());
    setFecha_inicio(new Date());
    setValue("curso", "");
    setValue("institucion", "");
    setValue("tiempo", "");
    props.setShow(false);
  }

  async function eliminar() {
    let resultado = await api.capacitaciones.delete(rbd, props.capacitacion.id);
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
      titulo={`${props.capacitacion.id ? "Editar" : "Agregar"} Capacitación`}
      onSubmit={handleSubmit(onSubmit)}
      cerrarModal={cerrarModal}
      eliminar={eliminar}
    >
      <div className="flex">
        <InputTextArea
          type={"textarea"}
          register={register}
          bool={true}
          name={"curso"}
        >
          Curso
        </InputTextArea>
      </div>
      <div className="flex">
        <FloatingLabel register={register} bool={true} name={"institucion"}>
          Institución
        </FloatingLabel>
      </div>
      <div className="flex">
        <FloatingLabel register={register} bool={true} name={"tiempo"}>
          Tiempo
        </FloatingLabel>
      </div>
      <div className="flex lg:flex-row flex-col py-2 px-2">
        <div className="mb-2 flex-1 grid border rounded px-3 pb-2.5 pt-1.5 text-sm text-gray-900 bg-white dark:bg-gray-700 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
          <p className="place-items-start " style={{ fontSize: "11px" }}>
            Fecha Inicio
          </p>
          <DatePicker value={fecha_inicio} onChange={setFecha_inicio} />
        </div>
        <div className="flex-1 mb-2 grid border rounded px-3 pb-2.5 pt-1.5 text-sm text-gray-900 bg-white dark:bg-gray-700 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
          <p className="place-items-start " style={{ fontSize: "11px" }}>
            Fecha Final
          </p>
          <DatePicker value={fecha_final} onChange={setFecha_final} />
        </div>
      </div>
    </Modal>
  );
}

export default FormCapacitaciones;
