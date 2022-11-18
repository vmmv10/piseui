import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import FormAcciones from "./FormAcciones";
import Api from "../../../../api/routes";
import Grilla from "../../../../componentes/general/Grilla";
import ModalEliminar from "../../../../componentes/general/ModalEliminar";
import Header from "../../../../componentes/general/Header";
import GrillaMobile from "../../../../componentes/general/GrillaMobile";

function Acciones(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [textoBuscar, setTextoBuscar] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [eliminar, setEliminar] = useState(false);
  const [rows, setRows] = useState([]);
  const [accion, setAccion] = useState({});
  const columns = [
    { key: "accion", name: "Acciones dentro del Establecimiento" },
    { key: "responsables", name: "Responsables" },
  ];
  const columnsMobile = [
    { key: "accion", name: "Acciones dentro del Establecimiento" },
  ];

  useEffect(
    () => {
      obtenerDatos();
    },
    [textoBuscar] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.acciones.get(rbd, props.protocolo_id, {
      texto: textoBuscar,
    });
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.acciones);
    } else {
      toast.error("Error al obtener los datos");
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setAccion(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.acciones.delete(rbd, accion.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data) {
    setAccion(data.rowIdx);
    setShow(true);
  }

  return (
    <>
      <div className="flex justify-space-around">
        <div className="flex bg-gray-100">
          <Header
            placeholder={"Búsqueda por Acción.."}
            tituloButton={"Agregar Acción"}
            setShow={setShow}
            setTextoBuscar={setTextoBuscar}
          />
        </div>
      </div>
      <Grilla
        columns={columns}
        rows={rows}
        eliminar={MenuEliminar}
        editar={menuEditar}
      />
      <GrillaMobile
        columns={columnsMobile}
        rows={rows}
        retorno={(data) => {
          setAccion(data);
          setShow(true);
        }}
      />
      <FormAcciones
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        accion={accion}
        errors={errors}
        protocolo_id={props.protocolo_id}
        handleClose={() => {
          setAccion({});
          setShow(false);
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
      <ModalEliminar
        confirmar={confirmarEliminar}
        show={eliminar}
        setShow={setEliminar}
        nombre={accion.situacion}
      />
    </>
  );
}

export default Acciones;
