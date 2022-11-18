import React, { useState } from "react";
import { ContextMenuTrigger, ContextMenu, MenuItem } from "react-contextmenu";
import { FaRegTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";

function GrillaDashboardMobile(props) {
  return (
    <>
      {props.rows && (
        <table className="lg:hidden w-full text-sm text-left shadow-lg text-gray-500 dark:text-gray-400 border-collapse">
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
                    className="py-3 px-6 font-medium text-center text-gray-900 dark:text-white"
                  >
                      {row[columna.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default GrillaDashboardMobile;
