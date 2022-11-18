import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import LayoutSlide from '../../../../componentes/general/LayoutSlide';
import Grilla from '../../../../componentes/general/Grilla';
import FormDocentes from './FormDocentes';
import Api from '../../../../api/routes';
import ModalEliminar from '../../../../componentes/general/ModalEliminar';
import Header from '../../../../componentes/general/Header';
import GrillaMobile from '../../../../componentes/general/GrillaMobile';

function Docentes(props) {

  let api = new Api();
  let rbd = localStorage.getItem('rbd');
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [docente, setDocente] = useState({});
  const [eliminar, setEliminar] = useState(false);
  const [textoBuscar, setTextoBuscar] = useState('');
  const [rows, setRows] = useState([]);
  const columns = [
    { key: 'nombre', name: 'Nombre' },
    { key: 'cargo', name: 'Cargo' },
    { key: 'estamento', name: 'Estamento' },
  ];

  const columnsMobile = [
    { key: 'nombre', name: 'Nombre' },
  ];

  useEffect(
    () => {
      obtenerDatos();
    },[textoBuscar]// eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.docentes.get(rbd, {texto: textoBuscar});
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.docentes);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  async function MenuEliminar(data) {
    setDocente(data.rowIdx);
    setEliminar(true);
  }

  async function confirmarEliminar() {
    let resultado = await api.docentes.delete(rbd,docente.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data){
    setDocente(data.rowIdx);
    setShow(true);
  }

  return (
    <LayoutSlide nombre={'Estamento Docente'}>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <Header setTextoBuscar={setTextoBuscar} placeholder={"Búsqueda por nombre.."} setShow={setShow} tituloButton={'Agregar Docente'}/>
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
                setDocente(data);
                setShow(true);
              }}
            />
          </div>
        </div>
      </div>
      <FormDocentes
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        docente={docente}
        errors={errors}
        handleClose={()=>{
            setDocente({});
            setShow(false);
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
      />
      <ModalEliminar confirmar={confirmarEliminar} show={eliminar} setShow={setEliminar} nombre={docente.nombre}/>
    </LayoutSlide>
  )
}

export default Docentes
