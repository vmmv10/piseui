import axios from 'axios';
import { toast } from 'react-toastify';



axios.interceptors.response.use(response => { // Cuando las consultas son con 200 y algo
    // console.log(response);
    return response;
}, function (error) { // cuando las repsuestas son distintas del 200 y algo
    console.log('Interceptor error', error.response);

	if(error.response.status === 401 || error.response.status === 422) {
        alert('Su sesión ha caducado, presione aceptar e inicie sesión nuevamente.')
        localStorage.clear();
        return false;
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export function ApiRequest(metodo, recurso, informacion={}, requiereToken=true, archivos=false) {
    const cabeceras={}
    if (requiereToken === true) {
        const token = localStorage.getItem('token');
        cabeceras['Authorization'] = `Bearer ${token}`;
    }
    if(archivos===true) {
        cabeceras['Content-Type'] = 'multipart/form-data';
    }
    // loading(true);
    return new Promise(function (resolve) {
        let ruta = '';
        if (metodo === 'get') {
            ruta = axios.get(import.meta.env.VITE_APP_API_URL + recurso, { headers: cabeceras });
        } else if (metodo === 'put') {
            ruta = axios.put(import.meta.env.VITE_APP_API_URL + recurso, informacion, { headers: cabeceras });
        } else if (metodo === 'post') {
            ruta = axios.post(import.meta.env.VITE_APP_API_URL + recurso, informacion, { headers: cabeceras });
        } else if (metodo === 'delete') {
            ruta = axios.delete(import.meta.env.VITE_APP_API_URL + recurso, { headers: cabeceras });
        }
        ruta.then(response => {
            // loading(false);
            resolve(response);
        })
        .catch((error) => {
            // loading(false);
            resolve(error.response);
        });
    });
}

export function loading(activar) {
    // loading-global se encuentra en el archivo public/index.html
    if (activar) {
        document.getElementById("loading-global").style.display = "";
    } else {
        document.getElementById("loading-global").style.display = "none";
    }
}

export function ObjectToFormdata(object){
    var form_data = new FormData();
    for ( var key in object ) {
        form_data.append(key, object[key]);
    }
    return form_data;
}


export function getApiFile(file) {
    if (file) {
        return `${import.meta.env.VITE_APP_API_URL}${file}`;
    } else {
        return '';
    }

}

export function getLocalFile(file) {
    return `${window.location.origin}/${file}`;
}

/**
 * Esta función procesa la información y crea el archivo excel temporal
 *
 * @export
 * @param {string} ruta
 * @param {Alert} alert
 */
 export async function exportar(ruta) {
    let resultado = await ApiRequest('get', ruta, {}, true);
    if (resultado && resultado.status === 200 && resultado.data.data) {
        download(`${import.meta.env.VITE_APP_API_URL}${resultado.data.data.path}`, resultado.data.data.name);
    } else {
        if( resultado && resultado.data.msg){
            toast.error(`${resultado.data.msg}`);
        } else{
            toast.error(`No se pudo exportar`);
        }
    }
}

/**
 * Descarga el archivo
 *
 * @param {string} url
 * @param {string} filename
 */
 function download(url, filename) {
    fetch(url).then(function (t) {
        return t.blob().then((b) => {
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", filename);
            a.click();
            loading(false);
        }
        ).catch((error) => {
           // console.log(error);
        });;
    });
}