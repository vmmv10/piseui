import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LayoutSlide from "../../../componentes/general/LayoutSlide";
import Grilla from "../../../componentes/general/Grilla";
import FormOrganismosEmergencia from "./FormOrganismosEmergencia";
import Busqueda from "../../../componentes/general/Busqueda";
import Api from "../../../api/routes";
import ModalEliminar from "../../../componentes/general/ModalEliminar";
import Header from "../../../componentes/general/Header";
import GrillaMobile from "../../../componentes/general/GrillaMobile";

function OrganismosEmergencia(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [rows, setRows] = useState([]);
  const [organismo, setOrganismo] = useState({});
  const [textoBuscar, setTextoBuscar] = useState("");
  const [eliminar, setEliminar] = useState(false);
  const columns = [
    { key: "institucion", name: "Institución" },
    { key: "tipo", name: "Tipo Emergencia" },
    { key: "contacto", name: "Contacto" },
    { key: "direccion", name: "Dirección" },
    { key: "nombre_contacto", name: "Nombre Contacto" },
  ];
  const columnsMobile = [
    { key: "institucion", name: "Institución" },
    { key: "contacto", name: "Contacto" },
  ];

  useEffect(
    () => {
      obtenerDatos();
    },
    [textoBuscar] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.organismos.get(rbd, {texto: textoBuscar});
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.organismmos);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setOrganismo(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.organismos.delete(rbd, organismo.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data) {
    setOrganismo(data.rowIdx);
    setShow(true);
  }

  return (
    <LayoutSlide nombre={"Organismos de Emergencia"}>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <Header
            placeholder={"Búsqueda por nombre.."}
            tituloButton={"Agregar Organismo de Emergencia"}
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
                setOrganismo(data);
                setShow(true);
              }}
            />
          </div>
        </div>
      </div>
      <FormOrganismosEmergencia
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        organismo={organismo}
        errors={errors}
        handleClose={() => {
          setOrganismo({});
          setShow(false);
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
      <ModalEliminar
        confirmar={confirmarEliminar}
        show={eliminar}
        setShow={setEliminar}
        nombre={organismo.institucion}
      />
    </LayoutSlide>
  );
}

export default OrganismosEmergencia;
