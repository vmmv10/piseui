import React, { useState } from "react";
import { ContextMenuTrigger, ContextMenu, MenuItem } from "react-contextmenu";
import { FaRegTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";

function Grilla(props) {
  function renderfila(col, row) {
    console.log(row[col.key]);
  }

  function handleClickEditar(e, data) {
    props.editar(data);
  }

  function handleClickEliminar(e, data) {
    props.eliminar(data);
  }

  return (
    <>
      {props.rows && (
        <table className="lg:table md:hidden smx:hidden sm:hidden w-full text-sm text-left shadow-lg text-gray-500 dark:text-gray-400 border-collapse">
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
                    <ContextMenuTrigger
                      id="same_unique_identifier"
                      collect={() => ({ rowIdx: row })}
                    >
                      {row[columna.key]}
                      <ContextMenu id="same_unique_identifier">
                        <MenuItem
                          onClick={handleClickEditar}
                          className=" bg-gray-100 flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-600 rounded px-3 py-2 w-full md:w-60"
                        >
                          <FaPencilAlt className="mx-2 mt-0.5" /> Editar
                        </MenuItem>
                        <MenuItem
                          onClick={handleClickEliminar}
                          className="bg-gray-100 flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-600 rounded px-3 py-2  w-full md:w-60"
                        >
                          <FaRegTrashAlt className="mx-2 mt-0.5" /> Eliminar
                        </MenuItem>
                      </ContextMenu>
                    </ContextMenuTrigger>
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

export default Grilla;
