import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Grilla from "../../../componentes/general/Grilla";
import FormComiteSeguridad from "./FormComiteSeguridad";
import Api from "../../../api/routes";
import ModalEliminar from "../../../componentes/general/ModalEliminar";
import Header from "../../../componentes/general/Header";
import GrillaMobile from "../../../componentes/general/GrillaMobile";

function ComiteSeguridad(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const [comite, setComite] = useState(false);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [eliminar, setEliminar] = useState(false);
  const [rows, setRows] = useState([]);
  const columns = [
    { key: "nombre", name: "Nombre" },
    { key: "genero", name: "Género" },
    { key: "estamento", name: "Estamento" },
    { key: "nivel", name: "Nivel" },
    { key: "rol", name: "Rol" },
    { key: "correo", name: "Correo" },
    { key: "telefono", name: "Teléfono" },
  ];
  const columnsMobile = [
    { key: "nombre", name: "Nombre" },
    { key: "rol", name: "Rol" },
  ];

  useEffect(
    () => {
      obtenerDatos();
    },
    [textoBuscar] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.comite.get(rbd, {texto: textoBuscar});
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.comite);
    } else {
      toast.error("Error al obtener los datos");
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setComite(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.comite.delete(rbd, comite.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data) {
    setComite(data.rowIdx);
    setShow(true);
  }

  return (
    <>
      <Header
        placeholder={"Búsqueda por nombre.."}
        tituloButton={"Agregar Miembro"}
        setShow={setShow}
        setTextoBuscar={setTextoBuscar}
      />
      {rows && (
        <Grilla
          columns={columns}
          rows={rows}
          eliminar={MenuEliminar}
          editar={menuEditar}
        />
      )}
      <GrillaMobile
        columns={columnsMobile}
        rows={rows}
        retorno={(data) => {
          if (data) {
            setShow(true);
            setComite(data);
          }
        }}
      />
      <FormComiteSeguridad
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        comite={comite}
        errors={errors}
        handleClose={() => {
          setComite({});
          setShow(false);
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
      <ModalEliminar
        confirmar={confirmarEliminar}
        show={eliminar}
        setShow={setEliminar}
        nombre={comite.nombre}
      />
    </>
  );
}

export default ComiteSeguridad;
