import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LayoutSlide from "../../../componentes/general/LayoutSlide";
import Grilla from "../../../componentes/general/Grilla";
import FormEquiposEmergencias from "./FormEquiposEmergencias";
import Api from "../../../api/routes";
import ModalEliminar from "../../../componentes/general/ModalEliminar";
import Header from "../../../componentes/general/Header";
import GrillaMobile from "../../../componentes/general/GrillaMobile";

function EquiposEmergencias(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, errors } = useForm();
  const [show, setShow] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [equipo, setEquipo] = useState({});
  const [rows, setRows] = useState([]);
  const [textoBuscar, setTextoBuscar] = useState("");
  const columns = [
    { key: "equipo", name: "Equipo" },
    { key: "material", name: "Material" },
    { key: "cantidad", name: "Cantidad" },
    { key: "observaciones", name: "Observaciones" },
  ];
  const columnsMobile = [
    { key: "equipo", name: "Equipo" },
    { key: "cantidad", name: "Cantidad" },
  ];

  useEffect(
    () => {
      obtenerDatos();
    },
    [textoBuscar] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.equipos.get(rbd, {texto: textoBuscar});
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.equipos);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setEquipo(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.equipos.delete(rbd, equipo.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data) {
    setEquipo(data.rowIdx);
    setShow(true);
  }

  return (
    <LayoutSlide nombre={"Equipos Emergencias"}>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <Header
            placeholder={"Búsqueda por nombre.."}
            setShow={setShow}
            tituloButton={"Agregar Equipo"}
            setTextoBuscar={setTextoBuscar}
          />
          <div className="py-3">
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
                if (data) {
                  setShow(true);
                  setEquipo(data);
                }
              }}
            />
          </div>
        </div>
      </div>
      <FormEquiposEmergencias
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        equipo={equipo}
        errors={errors}
        handleClose={() => {
          setEquipo({});
          setShow(false);
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
      <ModalEliminar
        confirmar={confirmarEliminar}
        show={eliminar}
        setShow={setEliminar}
        nombre={equipo.material}
      />
    </LayoutSlide>
  );
}

export default EquiposEmergencias;
