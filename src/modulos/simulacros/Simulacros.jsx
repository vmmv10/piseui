import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcIdea } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../api/routes";
import Busqueda from "../../componentes/general/Busqueda";
import Grilla from "../../componentes/general/Grilla";
import GrillaMobile from "../../componentes/general/GrillaMobile";
import Header from "../../componentes/general/Header";
import LayoutSlide from "../../componentes/general/LayoutSlide";
import ModalEliminar from "../../componentes/general/ModalEliminar";
import FormSimulacros from "./FormSimulacros";

function Simulacros(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  let navigate = useNavigate();
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [simulacro, setSimulacro] = useState({});
  const handleShow = () => navigate("");
  const [openTab, setOpenTab] = useState(1);
  const [rows, setRows] = useState([]);
  const columns = [
    { key: "simulacro", name: "Simulacro" },
    { key: "fecha", name: "Fecha" },
  ];
  const columnsMobile = [
    { key: "simulacro", name: "Simulacro" },
  ];

  useEffect(
    () => {
      obtenerDatos();
    },
    [textoBuscar] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.simulacros.get(rbd, { texto: textoBuscar });
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.simulacros);
    } else {
      toast.error("Error al obtener los datos");
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setSimulacro(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.simulacros.delete(rbd, simulacro.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data) {
    setSimulacro(data.rowIdx);
    setShow(true);
  }

  return (
    <LayoutSlide nombre={"Simulacros"}>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <Header
            placeholder={"Búsqueda por nombre.."}
            setShow={setShow}
            tituloButton={"Agregar Simulacro"}
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
                  setSimulacro(data);
                  setShow(true);
                }}
              />
          </div>
        </div>
      </div>
      <ModalEliminar
        confirmar={confirmarEliminar}
        show={eliminar}
        setShow={setEliminar}
        nombre={simulacro.simulacro}
      />
      <FormSimulacros
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        simulacro={simulacro}
        errors={errors}
        handleClose={() => {
          setSimulacro({});
          setShow(false);
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
    </LayoutSlide>
  );
}

export default Simulacros;
