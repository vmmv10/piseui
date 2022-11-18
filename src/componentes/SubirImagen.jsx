import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

const img = {
  display: "block",
  width: "100%",
  height: "100%",
};

function SubirImagen(props) {
  const { recurso, retorno } = props;
  const [imagenPrincipal, setImagenPrincipal] = useState({name:'imagen-no-disponible', ruta: window.location.origin + '/imagen-no-disponible.png'});
  const [showImg, setShowImg] = useState(true);

  useEffect(() => {
    if (recurso && recurso.ruta) {
      setShowImg(true);
      setImagenPrincipal(recurso);
    }
  }, [recurso]);

  useEffect(() => {
    if (imagenPrincipal) {
      retorno(imagenPrincipal);
    }
  }, [imagenPrincipal, retorno]);

  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        acceptedFiles[0].preview = URL.createObjectURL(acceptedFiles[0]);
        acceptedFiles[0].estado = "nuevo";
        setShowImg(true);
        setImagenPrincipal(acceptedFiles[0]);
      }}
      maxFiles={1}
      accept={{ "image/*": [] }}
      useFsAccessApi={false}
    >
      {({ getRootProps, getInputProps }) => (
        <section className="flex flex-col">
          <aside className="flex justify-center">
            {showImg && (
              <div key={imagenPrincipal.name} style={{ textAlign: "center" }}>
                <div className="lg:w-96" style={{ textAlign: "center" }}>
                  <img
                    alt="imagen no encontrada"
                    src={
                      imagenPrincipal.ruta
                        ? imagenPrincipal.ruta
                        : imagenPrincipal.preview
                    }
                    style={img}
                    onLoad={() => {
                      URL.revokeObjectURL(imagenPrincipal.preview);
                    }}
                  />
                </div>
              </div>
            )}
          </aside>
          <div {...getRootProps({ className: "dropzone" })} className="flex justify-center py-3 items-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <FaCloudUploadAlt className="mb-3 w-10 h-10 text-gray-400"/>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para cargar</span> o suelte una Imagen</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG o JPG</p>
                </div>
                <input {...getInputProps()} className="hidden" />
            </label>
        </div>
        </section>
      )}
    </Dropzone>
  );
}

export default SubirImagen;