import { FcIdea } from "react-icons/fc";
import Api from "../../../../api/routes";
import LayoutSlide from "../../../../componentes/general/LayoutSlide";
import SubirImagen from "../../../../componentes/SubirImagen";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ModalEliminar from "../../../../componentes/general/ModalEliminar";
import { AiOutlineDelete } from 'react-icons/ai'
import { FiSave } from 'react-icons/fi'

function Planos(props) {

  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const [recursoImagen, setRecursoImagen] = useState(null);
  const [plano, setPlano] = useState({});
  const [eliminar, setEliminar] = useState(false);

  useEffect(()=>{
    obtenerDatos();
  },[]);

  async function obtenerDatos(){
    let resultado = await api.planos.get(rbd);
    if (resultado && resultado.status === 200) {
      setRecursoImagen(resultado.data.planos.recurso)
      setPlano(resultado.data.planos)
    } else {
      toast.error(resultado.data.msg);
    }
  }

  async function onSubmit() {
    let formData = new FormData();
    if (recursoImagen){
      formData.append(
        "file",
        recursoImagen.estado === "nuevo" ? recursoImagen : null
      );
    }
    let resultado;
    if (plano.id) {
      resultado = await api.planos.put(rbd, plano.id, formData);
      if (resultado && resultado.status === 200) {
        toast.success('Editado con éxito');
      } else {
        toast.error(resultado.data.msg);
      }
    } else {
      resultado = await api.planos.post(rbd, formData);
      if (resultado && resultado.status === 200) {
        toast.success('Guardado con éxito');
      } else {
        toast.error(resultado.data.msg);
      }
    }
  }

  async function confirmarEliminar() {
    let resultado = await api.planos.delete(rbd,plano.id);
    if (resultado && resultado.status === 200) {
      obtenerDatos();
      toast.success("Se ha eliminada con éxito");
      setEliminar(false);
    } else {
      toast.warning("No se ha eliminado");
    }
  }

  return (
    <LayoutSlide nombre={"Planos"}>
      <div className="px-4 md:px-10 bg-gray-100">
        <div className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <div className="flex px-3 py-4">
            <h1 className="text-gray-900 px-2 text-xl font-medium">
              Sugerencias
            </h1>
            <FcIdea className=" mt-1" />
          </div>
        </div>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="px-4 md:px-10 py-4 md:py-4 bg-gray-100">
              <div>
              <SubirImagen
                    recurso={recursoImagen}
                    retorno={(imagen) => {
                      if (imagen.estado === "nuevo") {
                        console.log('nuevo');
                        setRecursoImagen(imagen);
                      }
                    }}/>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="flex lg:flex-none flex-1">
                  <button
                    onClick={()=>onSubmit()}
                    type="submit"
                    className="bg-green-500 flex justify-center lg:flex-none flex-1 active:bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <div className="flex flex-row">
                      <FiSave className="mr-1 mt-1"/>
                      Guardar
                    </div>
                  </button>
                </div>
                <div className="flex ml-2 lg:flex-none flex-1">
                  <button
                    onClick={()=>{
                      if(plano.id){
                        setEliminar(true);
                      }
                    }}
                    // type="submit"
                    className="bg-red-500 active:bg-red-700 lg:flex-none flex-1 flex justify-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <div className="flex flex-row">
                      <AiOutlineDelete className="mr-1 mt-1"/>
                      Eliminar
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalEliminar confirmar={confirmarEliminar} show={eliminar} setShow={setEliminar}/>
    </LayoutSlide>
  );
}

export default Planos;
