import { ApiRequest } from "./request";

function queryString(query) {
  if (Object.keys(query).length !== 0) { // Comprobamos si el objeto no viene vacio
    return '?' + Object.keys(query).map(key => key + '=' + query[key]).join('&');
  } else {
    return '';
  }
}

class Api {
  constructor() {
    this.usuarios = {
      get: (id,rbd) => ApiRequest('get', `api/usuarios/${id}/${rbd}/obtener`, {}, true),
      put: (id,rbd,data) => ApiRequest('put', `api/usuarios/${rbd}/${id}`, data, true),
      login: (data) => ApiRequest('post', `api/usuarios/login`, data, true),
    }
    this.establecimientos = {
      put: (rbd,id,data) => ApiRequest('put', `api/establecimientos/${rbd}/${id}`, data, true),
      post: (rbd,data) => ApiRequest('post', `api/establecimientos/${rbd}`, data, true),
      get: (rbd) => ApiRequest('get', `api/establecimientos/${rbd}/obtener`, {}, true),
    }
    this.directivos = {
      post: (rbd,data) => ApiRequest('post', `api/directivos/${rbd}`, data, true),
      get: (rbd, query) => ApiRequest('get', `api/directivos/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/directivos/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/directivos/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/directivos/${rbd}/${id}`, {}, true),
    }
    this.docentes = {
      post: (rbd,data) => ApiRequest('post', `api/docentes/${rbd}`, data, true),
      get: (rbd, query) => ApiRequest('get', `api/docentes/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/docentes/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/docentes/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/docentes/${rbd}/${id}`, {}, true),
    }
    this.asistentes = {
      post: (rbd,data) => ApiRequest('post', `api/asistentes/${rbd}`, data, true),
      get: (rbd, query) => ApiRequest('get', `api/asistentes/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/asistentes/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/asistentes/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/asistentes/${rbd}/${id}`, {}, true),
    }
    this.comite = {
      post: (rbd,data) => ApiRequest('post', `api/comite/${rbd}`, data, true),
      get: (rbd, query) => ApiRequest('get', `api/comite/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/comite/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/comite/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/comite/${rbd}/${id}`, {}, true),
    }
    this.organismos = {
      post: (rbd,data) => ApiRequest('post', `api/organismos/${rbd}`, data, true),
      get: (rbd,query) => ApiRequest('get', `api/organismos/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/organismos/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/organismos/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/organismos/${rbd}/${id}`, {}, true),
    }
    this.equipos = {
      post: (rbd,data) => ApiRequest('post', `api/equipos/${rbd}`, data, true),
      get: (rbd,query) => ApiRequest('get', `api/equipos/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/equipos/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/equipos/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/equipos/${rbd}/${id}`, {}, true),
    }
    this.accidentes = {
      post: (rbd,data) => ApiRequest('post', `api/accidentes/${rbd}`, data, true),
      get: (rbd, query) => ApiRequest('get', `api/accidentes/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/accidentes/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/accidentes/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/accidentes/${rbd}/${id}`, {}, true),
    }
    this.investigaciones = {
      post: (rbd,data) => ApiRequest('post', `api/investigaciones/${rbd}`, data, true),
      get: (rbd, query) => ApiRequest('get', `api/investigaciones/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/investigaciones/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/investigaciones/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/investigaciones/${rbd}/${id}`, {}, true),
    }
    this.prioridades = {
      post: (rbd,data) => ApiRequest('post', `api/prioridades/${rbd}`, data, true),
      get: (rbd,query) => ApiRequest('get', `api/prioridades/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/prioridades/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/prioridades/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/prioridades/${rbd}/${id}`, {}, true),
    }
    this.protocolos = {
      post: (rbd,data) => ApiRequest('post', `api/protocolos/${rbd}`, data, true),
      get: (rbd) => ApiRequest('get', `api/protocolos/${rbd}/obtener`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/protocolos/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/protocolos/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/protocolos/${rbd}/${id}`, {}, true),
    }
    this.acciones = {
      post: (rbd,protocolo_id,data) => ApiRequest('post', `api/acciones/${rbd}/protocolos/${protocolo_id}`, data, true),
      get: (rbd, protocolo_id, query) => ApiRequest('get', `api/acciones/${rbd}/protocolos/${protocolo_id}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/acciones/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,protocolo_id,data) => ApiRequest('put', `api/acciones/${rbd}/${id}/protocolos/${protocolo_id}`, data, true),
      getOne: (rbd,id,protocolo_id) => ApiRequest('get', `api/acciones/${rbd}/${id}/protocolos/${protocolo_id}`, {}, true),
    }
    this.capacitaciones = {
      post: (rbd,data) => ApiRequest('post', `api/capacitaciones/${rbd}`, data, true),
      get: (rbd, query) => ApiRequest('get', `api/capacitaciones/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/capacitaciones/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/capacitaciones/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/capacitaciones/${rbd}/${id}`, {}, true),
    }
    this.simulacros = {
      post: (rbd,data) => ApiRequest('post', `api/simulacros/${rbd}`, data, true),
      get: (rbd, query) => ApiRequest('get', `api/simulacros/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/simulacros/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/simulacros/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/simulacros/${rbd}/${id}`, {}, true),
    }
    this.niveles = {
      post: (rbd,data) => ApiRequest('post', `api/niveles/${rbd}`, data, true),
      get: (rbd) => ApiRequest('get', `api/niveles/${rbd}/obtener`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/niveles/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/niveles/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/niveles/${rbd}/${id}`, {}, true),
    }
    this.planos = {
      post: (rbd,data) => ApiRequest('post', `api/planos/${rbd}`, data, true, true),
      get: (rbd) => ApiRequest('get', `api/planos/${rbd}/obtener`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/planos/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/planos/${rbd}/${id}`, data, true, true),
      getOne: (rbd,id) => ApiRequest('get', `api/niveles/${rbd}/${id}`, {}, true),
    }
    this.mapas = {
      post: (rbd,data) => ApiRequest('post', `api/mapas/${rbd}`, data, true, true),
      get: (rbd) => ApiRequest('get', `api/mapas/${rbd}/obtener`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/mapas/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/mapas/${rbd}/${id}`, data, true, true),
      getOne: (rbd,id) => ApiRequest('get', `api/niveles/${rbd}/${id}`, {}, true),
    }
    this.introduccion = {
      put: (rbd,id,data) => ApiRequest('put', `api/introducciones/${rbd}/${id}`, data, true),
      post: (rbd,data) => ApiRequest('post', `api/introducciones/${rbd}`, data, true),
      get: (rbd) => ApiRequest('get', `api/introducciones/${rbd}/obtener`, {}, true),
    }
    this.objetivos = {
      put: (rbd,id,data) => ApiRequest('put', `api/objetivos/${rbd}/${id}`, data, true),
      post: (rbd,data) => ApiRequest('post', `api/objetivos/${rbd}`, data, true),
      get: (rbd) => ApiRequest('get', `api/objetivos/${rbd}/obtener`, {}, true),
    }
    this.definiciones = {
      post: (rbd,data) => ApiRequest('post', `api/definiciones/${rbd}`, data, true),
      get: (rbd, query) => ApiRequest('get', `api/definiciones/${rbd}/obtener${queryString(query)}`, {}, true),
      delete: (rbd,id) => ApiRequest('delete', `api/definiciones/${rbd}/eliminar/${id}`, {}, true),
      put: (rbd,id,data) => ApiRequest('put', `api/definiciones/${rbd}/${id}`, data, true),
      getOne: (rbd,id) => ApiRequest('get', `api/definiciones/${rbd}/${id}`, {}, true),
    }
    this.exportar = {
      // post: (rbd,data) => ApiRequest('post', `api/definiciones/${rbd}`, data, true),
      get: (rbd) => ApiRequest('get', `api/pdf/${rbd}/obtener`, {}, true),
      // delete: (rbd,id) => ApiRequest('delete', `api/definiciones/${rbd}/eliminar/${id}`, {}, true),
      // put: (rbd,id,data) => ApiRequest('put', `api/definiciones/${rbd}/${id}`, data, true),
      // getOne: (rbd,id) => ApiRequest('get', `api/definiciones/${rbd}/${id}`, {}, true),
    }
  }
}

export default Api