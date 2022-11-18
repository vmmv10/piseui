import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LayoutSlide from '../../../../componentes/general/LayoutSlide';
import Grilla from '../../../../componentes/general/Grilla';
import FormDirectivos from './FormDirectivos';
import Busqueda from '../../../../componentes/general/Busqueda';
import Api from '../../../../api/routes';
import ModalEliminar from '../../../../componentes/general/ModalEliminar';
import Header from '../../../../componentes/general/Header';
import GrillaMobile from '../../../../componentes/general/GrillaMobile';

function Directivos(props) {

  let api = new Api();
  let rbd = localStorage.getItem('rbd');
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const handleShow = () => setShow(true);
  const [rows, setRows] = useState([]);
  const [directivo, setDirectivo] = useState({});
  const [textoBuscar, setTextoBuscar] = useState("");
  const columns = [
    { key: 'nombre', name: 'Nombre' },
    { key: 'cargo', name: 'Cargo' },
    { key: 'estamento', name: 'Estamento' },
  ];

  const columnsMobile = [
    { key: 'nombre', name: 'Nombre' },
    { key: 'cargo', name: 'Cargo' },
  ];

  useEffect(
    () => {
      obtenerDatos();
    },[textoBuscar]// eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.directivos.get(rbd, {texto: textoBuscar});
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.directivos)
    } else {
      toast.error(resultado.data.msg);
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setDirectivo(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.directivos.delete(rbd,directivo.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data){
    setDirectivo(data.rowIdx);
    setShow(true);
  }

  return (
    <LayoutSlide nombre={"Estamento Directivo"}>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <Header placeholder={"Búsqueda por nombre.."} setShow={setShow} tituloButton={'Agregar Directivo(a)'} setTextoBuscar={setTextoBuscar}/>
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
                setDirectivo(data);
                setShow(true);
              }}
            />
          </div>
        </div>
      </div>
      <FormDirectivos
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        directivo={directivo}
        errors={errors}
        handleClose={()=>{
            setDirectivo({})
            setShow(false)
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
      <ModalEliminar confirmar={confirmarEliminar} show={eliminar} setShow={setEliminar} nombre={directivo.nombre}/>
    </LayoutSlide>
  )
}

export default Directivos
