import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import LayoutSlide from '../../../../componentes/general/LayoutSlide';
import Grilla from '../../../../componentes/general/Grilla';
import FormAsistentes from './FormAsistentes';
import Busqueda from '../../../../componentes/general/Busqueda';
import Api from '../../../../api/routes';
import ModalEliminar from '../../../../componentes/general/ModalEliminar';
import Header from '../../../../componentes/general/Header';

function Asistentes(props) {

  let api = new Api();
  let rbd = localStorage.getItem('rbd');
  const [eliminar, setEliminar] = useState(false);
  const [asistente, setAsistente] = useState({});
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [show, setShow] = useState(false);
  const [textoBuscar, setTextoBuscar] = useState('');
  const handleShow = () => setShow(true);
  const [rows, setRows] = useState([]);
  const columns = [
    { key: 'nombre', name: 'Nombre' },
    { key: 'cargo', name: 'Cargo' },
    { key: 'estamento', name: 'Estamento' },
  ];

  useEffect(
    () => {
      obtenerDatos();
    },[textoBuscar]// eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.asistentes.get(rbd, {texto: textoBuscar});
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.asistentes);
    } else {
      toast.error(resultado.data.msg);
    }
  }

  async function MenuEliminar(data) {
    setEliminar(true);
    setAsistente(data.rowIdx);
  }

  async function confirmarEliminar() {
    let resultado = await api.asistentes.delete(rbd,asistente.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  function menuEditar(data){
    setAsistente(data.rowIdx);
    setShow(true);
  }

  return (
    <LayoutSlide nombre = {'Asistentes de la Educación'}>
     <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="px-4 py-5 flex-auto">
          <Header setTextoBuscar={setTextoBuscar} placeholder ={'Búsqueda por nombre..'} tituloButton={'Agregar Asistente de la Educación'} setShow={setShow}/>
          <div className="py-3">
            <Grilla
              columns={columns}
              rows={rows}
              eliminar={MenuEliminar}
              editar={menuEditar}
            />
          </div>
        </div>
      </div>
      <FormAsistentes
        show={show}
        handleSubmit={handleSubmit}
        register={register}
        asistente={asistente}
        errors={errors}
        handleClose={()=>{
            setAsistente({})
            setShow(false)
        }}
        setShow={setShow}
        obtenerDatos={obtenerDatos}
        />
      <ModalEliminar confirmar={confirmarEliminar} show={eliminar} setShow={setEliminar} nombre={asistente.nombre}/>
    </LayoutSlide>
  )
}

export default Asistentes
