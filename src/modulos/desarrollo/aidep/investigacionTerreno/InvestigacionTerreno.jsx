import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LayoutSlide from "../../../../componentes/general/LayoutSlide";
import Grilla from "../../../../componentes/general/Grilla";
import { FcIdea } from "react-icons/fc";
import Busqueda from "../../../../componentes/general/Busqueda";
import ModalEliminar from "../../../../componentes/general/ModalEliminar";
import Api from "../../../../api/routes";
import FormInvestigacionTerreno from "./FormInvestigacionTerreno";
import GrillaMobile from "../../../../componentes/general/GrillaMobile";
import Header from "../../../../componentes/general/Header";

function InvestigacionTerreno(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const [textoBuscar, setTextoBuscar] = useState("");
  const handleShow = () => setShow(true);
  const [eliminar, setEliminar] = useState(false);
  const [investigacion, setInvestigacion] = useState({});
  const [rows, setRows] = useState([]);
  const columns = [
    { key: "riesgo", name: "Riesgo" },
    { key: "ubicacion", name: "Ubicación" },
    { key: "impacto", name: "Impacto Evential" },
    { key: "encargado", name: "Encargado de Gestionar" },
    { key: "recurrencia", name: "Recurrencia" },
  ];
  const columnsMobile = [{ key: "riesgo", name: "Riesgo" }];

  useEffect(
    () => {
      obtenerDatos();
    },
    [textoBuscar] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.investigaciones.get(rbd, { texto: textoBuscar });
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.investigaciones);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setInvestigacion(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.investigaciones.delete(rbd, investigacion.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data) {
    setInvestigacion(data.rowIdx);
    setShow(true);
  }

  return (
    <LayoutSlide
      nombre={"Investigación en Terreno: ¿Dónde y cómo podría volver a pasar?"}
    >
      <div className="px-4 md:px-10 bg-gray-100">
        <div className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <div className="flex px-3 py-4">
            <h1 className="text-gray-900 px-2 text-xl font-medium">
              Sugerencias
            </h1>
            <FcIdea className=" mt-1" />
          </div>
          <ul className="px-5 py-3 text-justify list-disc list-inside ...">
            Recorrer el Establecimiento Educacional para verificar si lo
            recopilado en el análisis histórico aún persiste y además se deben
            registrar nuevas condiciones de riesgo que se vayan identificando en
            el recorrido (amenazas, vulnerabilidades y capacidades).
            <li className="mt-1">
              Los participantes de esta actividad se dividen en grupos
              (estudiantes, profesores, etc.) para la asignación de sectores del
              Establecimiento Educacional y su entorno inmediato.
            </li>
            <li className="mt-1">
              Recorrer las dependencias del Establecimiento Educacional y el
              entorno inmediato, para descubrir si aún existen las condiciones
              de riesgo que fueron identificadas en el Análisis Histórico.
            </li>
            <li className="mt-1">
              Al mismo tiempo, determinar si existen nuevas situaciones de
              riesgos, considerando la variable accesibilidad como un factor de
              reducción de riesgo.
            </li>
            <li className="mt-1">
              Registrar las capacidades (humanas, materiales, financieras u
              otras) disponibles para enfrentar esos riesgos, ya sean éstos para
              evitar que se traduzcan en un daño o para estar preparados para
              una oportuna atención a la comunidad educativa.
            </li>
            <li className="mt-1">
              La información debe ir registrándose en un formato sencillo y
              accesible (considerar si es pertinente, Braille, principios de
              lectura fácil, entre otros).
            </li>
          </ul>
        </div>
      </div>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <Header
            placeholder={"Búsqueda por nombre.."}
            tituloButton={"Agregar Investigación"}
            setShow={setShow}
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
                setInvestigacion(data);
                setShow(true);
              }}
            />
          </div>
        </div>
      </div>
      <FormInvestigacionTerreno
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        investigacion={investigacion}
        errors={errors}
        handleClose={() => {
          setInvestigacion({});
          setShow(false);
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
      <ModalEliminar
        confirmar={confirmarEliminar}
        show={eliminar}
        setShow={setEliminar}
        nombre={investigacion.riesgo}
      />
    </LayoutSlide>
  );
}

export default InvestigacionTerreno;
