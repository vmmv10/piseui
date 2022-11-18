import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Api from "../../../api/routes";
import FloatingLabel from "../../../componentes/general/FLoatingLabel";
import { format } from "date-fns";
import { DatePicker } from "@material-ui/pickers";
import ButtonGuardar from "../../../componentes/general/ButtonGuardar";

function Constitucion(props) {
  let api = new Api();
  let rbd = localStorage.getItem("rbd");
  const { register, handleSubmit, control, setValue, errors } = useForm();
  const [fecha, setFecha] = useState(new Date());

  useEffect(
    () => {
      obtenerDatos();
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  async function obtenerDatos() {
    // let resultado = await api.comite.get(rbd);
    // if (resultado && resultado.status === 200) {
    //   setRows(resultado.data.comite);
    // } else {
    //   toast.error("Error al obtener los datos");
    // }
  }

  return (
    <>
      <div className="px-3 py-4 bg-gray-100">
        <div className="flex">
          <FloatingLabel register={register} bool={true} name={"director"}>
            Director/a
          </FloatingLabel>
        </div>
        <div className="flex mb-2">
            <FloatingLabel register={register} bool={true} name={"coordinador"}>
              Coordinador/a Seguridad Escolar
            </FloatingLabel>
        </div>
        <div className="px-2 mb-2">
            <div className=" grid border rounded px-3 pb-2.5 pt-1.5 text-sm text-gray-900 bg-white dark:bg-gray-700 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
              <p className="place-items-start" style={{ fontSize: "11px" }}>
                Fecha
              </p>
              <DatePicker value={fecha} onChange={setFecha} />
            </div>
        </div>
        <ButtonGuardar/>
      </div>
    </>
  );
}

export default Constitucion;
