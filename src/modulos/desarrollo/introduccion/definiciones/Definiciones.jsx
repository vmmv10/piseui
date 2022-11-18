import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../../api/routes";
import Grilla from "../../../../componentes/general/Grilla";
import GrillaMobile from "../../../../componentes/general/GrillaMobile";
import Header from "../../../../componentes/general/Header";
import LayoutSlide from "../../../../componentes/general/LayoutSlide";
import ModalEliminar from "../../../../componentes/general/ModalEliminar";
import FormDefiniciones from "./FormDefiniciones";

function Definiciones(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [rows, setRows] = useState([]);
  const [definicion, setDefinicion] = useState({});
  const [textoBuscar, setTextoBuscar] = useState("");
  const [eliminar, setEliminar] = useState(false);
  const columns = [
    { key: "palabra", name: "Palabra" },
    { key: "definicion", name: "Definicion" },
  ];
  const columnsMobile = [
    { key: "palabra", name: "Palabra" },
  ];

  useEffect(
    () => {
      obtenerDatos();
    },
    [textoBuscar] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.definiciones.get(rbd, {texto: textoBuscar});
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.definiciones);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setDefinicion(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.definiciones.delete(rbd, definicion.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data) {
    setDefinicion(data.rowIdx);
    setShow(true);
  }

  return (
    <LayoutSlide nombre={"Definiciones"}>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <Header
            placeholder={"Búsqueda por nombre.."}
            tituloButton={"Agregar Definición"}
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
              retorno={(data)=>{
                setDefinicion(data);
                setShow(true);
              }}
            />
          </div>
        </div>
      </div>
      <FormDefiniciones
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        definicion={definicion}
        errors={errors}
        handleClose={() => {
          setDefinicion({});
          setShow(false);
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
      <ModalEliminar
        confirmar={confirmarEliminar}
        show={eliminar}
        setShow={setEliminar}
        nombre={definicion.institucion}
      />
    </LayoutSlide>
  );
}

export default Definiciones;
