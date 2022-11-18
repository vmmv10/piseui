import { useState } from "react";
import { useEffect } from "react";
import Api from "../../api/routes";
import Grilla from "../general/Grilla";
import GrillaDashboardMobile from "./GrillaDashboardMobile";

function ComiteDashBoard(props) {
  let api = new Api();
  const [rows, setRows] = useState([]);
  let rbd = localStorage.getItem("rbd");
  const columns = [
    { key: "nombre", name: "Nombre" },
    { key: "rol", name: "Rol" },
  ];

  useEffect(
    () => {
      obtenerDatos();
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    let resultado = await api.comite.get(rbd, { texto: "" });
    if (resultado && resultado.status === 200) {
      setRows(resultado.data.comite);
    } else {
      toast.error("Error al obtener los datos");
    }
  }
  return (
    <>
      <GrillaDashboardMobile columns={columns} rows={rows} />
      <Grilla columns={columns} rows={rows} />
    </>
  );
}
export default ComiteDashBoard;
