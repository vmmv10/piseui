import React from "react";
import { AiFillEdit } from "react-icons/ai";

function GrillaMobile(props) {
  return (
    <>
      {props.rows && (
        <table className="w-full lg:hidden text-sm text-left shadow-lg text-gray-500 dark:text-gray-400 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {props.columns.map((columna, index) => (
                <th
                  key={index + columna.key}
                  scope="col"
                  className={"text-center py-3 px-6"}
                >
                  {columna.name}
                </th>
              ))}
              <th
                key={"editar"}
                scope="col"
                className={"text-center py-3 px-6"}
              >
                Editar
              </th>
            </tr>
          </thead>
          <tbody>
            {props.rows.map((row, index2) => (
              <tr
                key={"fila" + index2}
                className="w-full text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                {props.columns.map((columna, index) => (
                  <td
                    key={index + index2}
                    scope="row"
                    className="py-3 px-6 font-medium text-gray-900 dark:text-white"
                  >
                    {row[columna.key]}
                  </td>
                ))}
                <td className="py-3 px-6 font-medium text-center text-gray-900 dark:text-white">
                  <button
                    onClick={()=>props.retorno(row)}
                  >
                    <AiFillEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default GrillaMobile;
