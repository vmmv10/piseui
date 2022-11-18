import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LayoutSlide from "../../../../componentes/general/LayoutSlide";
import FormAnalisisHistorico from "./FormAnalisisHistorico";
import Grilla from "../../../../componentes/general/Grilla";
import { FcIdea } from "react-icons/fc";
import Api from "../../../../api/routes";
import ModalEliminar from "../../../../componentes/general/ModalEliminar";
import Header from "../../../../componentes/general/Header";
import GrillaMobile from "../../../../componentes/general/GrillaMobile";

function AnalisisHistorico(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [eliminar, setEliminar] = useState(false);
  const [rows, setRows] = useState([]);
  const [evento, setEvento] = useState({});
  const columns = [
    { key: "fecha", name: "Fecha" },
    { key: "situacion", name: "Emeregencia" },
    { key: "como_actuo", name: "¿Cómo se Actuó?" },
    { key: "personas", name: "Daños a personas" },
    { key: "infraestructura", name: "Daño a la infraestroctura" },
    { key: "seguimiento", name: "Seguimiento" },
  ];
  const columnsMobile = [
    { key: "fecha", name: "Fecha" },
    { key: "situacion", name: "Emeregencia" },
  ];

  useEffect(
    () => {
      obtenerDatos();
    },
    [textoBuscar] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.accidentes.get(rbd, { texto: textoBuscar });
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.accidentes);
    } else {
      toast.error("Error al obtener los datos");
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setEvento(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.accidentes.delete(rbd, evento.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data) {
    setEvento(data.rowIdx);
    setShow(true);
  }

  return (
    <LayoutSlide nombre={"Analisis Historico"}>
      <div className="px-4 md:px-10 bg-gray-100">
        <div className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <div className="flex px-3 py-4">
            <h1 className="text-gray-900 px-2 text-xl font-medium">
              Sugerencias
            </h1>
            <FcIdea className=" mt-1" />
          </div>

          <ul className="px-5 py-3 list-disc list-inside ...">
            La historia local es una herramienta muy útil, indica cómo se ha
            desarrollado el centro educativo, cuáles son los eventos, accidentes
            o emergencias que lo han afectado.
            <li className="mt-1">
              Revisar toda aquella información que en el pasado haya puesto en
              riesgo a la comunidad educativa, provocando accidentes,
              enfermedades, lesiones, daño a la infraestructura del
              Establecimiento Educacional, al medio ambiente y a su entorno.
            </li>
            <li className="mt-1">
              Revisar en documentos o solicitar relato a la dirección
              educacional, a los vecinos del área, al municipio respectivo,
              unidades de Carabineros, Salud, Bomberos, etc. Se sugiere realizar
              esta gestión con los estudiantes a través de una actividad de
              aprendizaje.
            </li>
            <li className="mt-1">
              Considerar la información contenida en instructivos, reglamentos o
              disposiciones legales que directa o indirectamente se relacione
              con la seguridad escolar.
            </li>
          </ul>
        </div>
        <Header
          placeholder={"Búsqueda por emergencia.."}
          setShow={setShow}
          tituloButton={"Agregar Evento o Accidente"}
        />
      </div>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
            <div className="flex justify-center">
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
                    setEvento(data);
                  }
                }}
              />
            </div>
          </div>
      </div>
      <FormAnalisisHistorico
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        accidente={evento}
        errors={errors}
        handleClose={() => {
          setEvento({});
          setShow(false);
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
      <ModalEliminar
        confirmar={confirmarEliminar}
        show={eliminar}
        setShow={setEliminar}
        nombre={evento.situacion}
      />
    </LayoutSlide>
  );
}

export default AnalisisHistorico;
