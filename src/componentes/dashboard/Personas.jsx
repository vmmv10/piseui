import { useEffect } from "react";
import { useState } from "react";
import Api from "../../api/routes";
import Asistentes from "./Asistentes";
import Docentes from "./Docentes";
import Estudiantes from "./Estudiantes";

function Personas(props) {

  let rbd = localStorage.getItem("rbd");
  let api = new Api();
  const [docentes, setDocentes] = useState();
  const [estudiantes, setEstudiantes] = useState();
  const [asistentes, setAsistentes] = useState();

  useEffect(()=>{
    obtenerDatos();
  },[])

  async function obtenerDatos(){
    let resultado = await api.niveles.get(rbd);
    if (resultado && resultado.status === 200) {
      setEstudiantes(parseInt(resultado.data.niveles.estudiantes_f) + parseInt(resultado.data.niveles.estudiantes_m));
      setAsistentes(parseInt(resultado.data.niveles.asistentes_m) + parseInt(resultado.data.niveles.asistentes_m));
      setDocentes(parseInt(resultado.data.niveles.docentes_f) + parseInt(resultado.data.niveles.docentes_m));
    } else {
      toast.error(resultado.data.msg);
    }
  }

  return (
    <>
      <Docentes docentes={docentes}/>
      <Asistentes asistentes={asistentes}/>
      <Estudiantes estudiantes={estudiantes}/>
    </>
  );
}
export default Personas;
