import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../api/routes";
import Grilla from "../../componentes/general/Grilla";
import GrillaMobile from "../../componentes/general/GrillaMobile";
import Header from "../../componentes/general/Header";
import LayoutSlide from "../../componentes/general/LayoutSlide";
import ModalEliminar from "../../componentes/general/ModalEliminar";
import FormCapacitaciones from "./FormCapacitaciones";

function Capacitaciones(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  let navigate = useNavigate();
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [capacitacion, setCapacitacion] = useState({});
  const [rows, setRows] = useState([]);
  const columns = [
    { key: "curso", name: "Curso" },
    { key: "institucion", name: "Institución" },
    { key: "tiempo", name: "Horas" },
    { key: "fecha_inicial", name: "Fecha Inicial" },
    { key: "fecha_final", name: "Fecha Final" },
  ];
  const columnsMobile = [{ key: "curso", name: "Curso" }];

  useEffect(
    () => {
      obtenerDatos();
    },
    [textoBuscar] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.capacitaciones.get(rbd, { texto: textoBuscar });
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.capacitaciones);
    } else {
      toast.error("Error al obtener los datos");
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setCapacitacion(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.capacitaciones.delete(rbd, capacitacion.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data) {
    setCapacitacion(data.rowIdx);
    setShow(true);
  }

  return (
    <LayoutSlide nombre={"Capacitaciones"}>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <Header
            placeholder={"Búsqueda por nombre.."}
            setShow={setShow}
            tituloButton={"Agregar Capacitación"}
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
                  setCapacitacion(data);
                }
              }}
            />
          </div>
        </div>
      </div>
      <ModalEliminar
        confirmar={confirmarEliminar}
        show={eliminar}
        setShow={setEliminar}
        nombre={capacitacion.curso}
      />
      <FormCapacitaciones
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        capacitacion={capacitacion}
        errors={errors}
        handleClose={() => {
          setCapacitacion({});
          setShow(false);
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
    </LayoutSlide>
  );
}

export default Capacitaciones;
