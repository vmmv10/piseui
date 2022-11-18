import { DatePicker } from "@material-ui/pickers";

function Fecha(props) {
  return (
    <>
      <div className=" grid border rounded px-3 pb-2.5 pt-1.5 text-sm text-gray-900 bg-white dark:bg-gray-700 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
        <p className="place-items-start" style={{ fontSize: "11px" }}>
          Fecha
        </p>
        <DatePicker value={props.fecha} onChange={props.setFecha} />
      </div>
    </>
  );
}

export default Fecha;