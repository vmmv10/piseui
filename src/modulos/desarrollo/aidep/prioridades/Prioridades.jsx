import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LayoutSlide from "../../../../componentes/general/LayoutSlide";
import { FcIdea } from "react-icons/fc";
import ModalEliminar from "../../../../componentes/general/ModalEliminar";
import Api from "../../../../api/routes";
import FormPrioridades from "./FormPrioridades";
import Grilla from "../../../../componentes/general/Grilla";
import GrillaMobile from "../../../../componentes/general/GrillaMobile";
import Header from "../../../../componentes/general/Header";
// import FormInvestigacionTerreno from './FormInvestigacionTerreno';
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0 , removed);
  console.log(result);
  return result;
}

function Prioridades(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [eliminar, setEliminar] = useState(false);
  const [prioridad, setPrioridad] = useState({});
  const [prioridades, setPrioridades] = useState([]);
  const columns = [
    { key: "analisis", name: "Análisis" },
    { key: "solucion", name: "Medidas" },
    { key: "nuevo_riesgo", name: "¿Nuevo Riesgo?" },
    { key: "dano", name: "Frecuencia" },
    { key: "recurrencia", name: "Daño" },
  ];
  const iniTask = [
    { id: "1", text: "Análisis" },
    { id: "2", text: "Medidas" },
    { id: "3", text: "¿Nuevo Riesgo?" },
    { id: "4", text: "Frecuencia" },
    { id: "5", text: "Daño" },
  ];
  const columnsMobile = [{ key: "analisis", name: "Análisis" }];
  const [task, setTask] = useState(iniTask);

  useEffect(
    () => {
      obtenerDatos();
    },
    [textoBuscar] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.prioridades.get(rbd, { texto: textoBuscar });
    if (resultado && resultado.status === 200) {
      setPrioridades(resultado.data.prioridades);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setPrioridad(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.prioridades.delete(rbd, prioridad.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data) {
    setPrioridad(data.rowIdx);
    setShow(true);
  }

  return (
    <LayoutSlide nombre={"Prioridades"}>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="px-4 md:px-10 py-4 md:py-4 bg-gray-100">
            <div className="flex flex-wrap w-full">
              <div className="break-words bg-white w-full mb-6 shadow-lg rounded px-4 py-4">
                <div className="flex px-3 py-4">
                  <h1 className="text-gray-900 px-2 text-xl font-medium">
                    Sugerencias
                  </h1>
                  <FcIdea className=" mt-1" />
                </div>
                <p className="px-5 py-3 text-justify">
                  En esta etapa se deben establecer prioridades de acción para
                  abordar las situaciones de riesgo detectadas en los pasos
                  anteriores, para ello se ordenará de mayor a menor prioridad
                  las situaciones de riesgo detectadas. Esta priorización se
                  puede realizar en base a dos factores: factor recurrencia
                  (eventos que se producen frecuentemente) y factor impacto
                  (mayor daño que pudiese provocar), es decir, analizar y
                  hacerse la pregunta ¿Qué nos afecta más? o ¿Qué ocurre más
                  seguido?, determinando las factibilidades de acceder a
                  recursos o medios externos cuando sea necesario.
                </p>
              </div>
            </div>
            {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"> */}
            <DragDropContext onDragEnd={(result) => {
              const {source, destination} = result;
              if (!destination) {
                return;
              }
              if (source.index === destination.index && source.droppableId === destination.droppableId) {
                return;
              }
              setTask(prevTask => reorder(prevTask, source.index, destination.index));
            }}>
              <Droppable droppableId="task">
                {(droppableProvided) => (
                  <ul
                    className="flex flex-col flex-1"
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                  >
                    {task.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(draggableProvided) => (
                          <li
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                            className="flex flex-1 justify-center mb-2"
                          >
                            <a
                              href="#"
                              className="flex-1 block p-6  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {task.id}
                              </h5>
                              <p className="font-normal text-gray-700 dark:text-gray-400">
                                {task.text}
                              </p>
                            </a>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <div className="flex justify-center">
            <Grilla
              columns={columns}
              rows={prioridades}
              eliminar={MenuEliminar}
              editar={menuEditar}
            />
            <GrillaMobile
              columns={columnsMobile}
              rows={prioridades}
              retorno={(data) => {
                setPrioridad(data);
                setShow(true);
              }}
            />
          </div>
        </div>
      </div> */}
      <FormPrioridades
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        prioridad={prioridad}
        errors={errors}
        handleClose={() => {
          setPrioridad({});
          setShow(false);
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
      <ModalEliminar
        confirmar={confirmarEliminar}
        show={eliminar}
        setShow={setEliminar}
        nombre={prioridad.riesgo}
      />
    </LayoutSlide>
  );
}

export default Prioridades;
