import React, { useMemo, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import logo from './logo.svg'
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es'
//modulos
//home
import Login from './modulos/home/Login'
import FormUsuario from './modulos/home/FornUsuario';
import Menu from './componentes/general/Menu';
import Home from './modulos/home/Home';
//
import HomeDashboard from './modulos/dashboard/HomeDashboard';
//
import HomeDesarrollo from './modulos/desarrollo/HomeDesarrollo';
import Informacion from './modulos/desarrollo/informacion/Informacion';
import Directivos from './modulos/desarrollo/informacionGeneral/directivo/Directivos';
import Docentes from './modulos/desarrollo/informacionGeneral/docentes/Docentes';
import Asistentes from './modulos/desarrollo/informacionGeneral/asistentes/Asistentes';
import Niveles from './modulos/desarrollo/informacionGeneral/niveles/Niveles';
//
import HomeComite from './modulos/desarrollo/comiteSeguridad/HomeComite';
//
import OrganismosEmergencia from './modulos/desarrollo/organismosEmergencia/OrganismosEmergencia';
//
import EquiposEmergencias from './modulos/desarrollo/equiposEmergencias/EquiposEmergencias';
//AIDEP
import AnalisisHistorico from './modulos/desarrollo/aidep/analisishistorico/AnalisisHistorico';
import InvestigacionTerreno from './modulos/desarrollo/aidep/investigacionTerreno/InvestigacionTerreno';
import Planos from './modulos/desarrollo/aidep/planos/Planos';
import Prioridades from './modulos/desarrollo/aidep/prioridades/Prioridades';
import Mapas from './modulos/desarrollo/aidep/mapas/Mapas';
//
import Protocolos from './modulos/desarrollo/protocolos/Protocolos';
import FormProtocolos from './modulos/desarrollo/protocolos/FormProtocolos';
//
import Perfil from './modulos/home/Perfil';
import UserState from './context/user/UserState';
//
import Capacitaciones from './modulos/capacitaciones/Capacitaciones';
//
import Simulacros from './modulos/simulacros/Simulacros';
import Introduccion from './modulos/desarrollo/introduccion/introduccion/Introduccion';
import Objetivos from './modulos/desarrollo/introduccion/objetivos/Objetivos';
import Definiciones from './modulos/desarrollo/introduccion/definiciones/Definiciones';
import Descarga from './modulos/desarrollo/descarga/Descarga';
//

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>);

function App() {

  const [user, setUser] = useState(null);
  // const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <BrowserRouter>
      <UserState>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
          <React.Suspense fallback={loading}>
            <Routes>
              {/* <Route exact path="/" component={Login} /> */}
              <Route  path="/" element={<Login/>} />
              <Route  path="/usuarios/registro" element={<FormUsuario/>}/>
              <Route  path="/usuarios/perfil" element={<Perfil/>}/>
              <Route  path="/home" element={<Home/>}/>
              <Route  path="/dashboard/home" element={<HomeDashboard/>}/>
              <Route  path="/desarrollo/home" element={<HomeDesarrollo/>}/>
              <Route  path="/desarrollo/informacion" element={<Informacion/>}/>
              <Route  path="/desarrollo/general/directivos" element={<Directivos/>}/>
              <Route  path="/desarrollo/general/docentes" element={<Docentes/>}/>
              <Route  path="/desarrollo/general/asistentes" element={<Asistentes/>}/>
              <Route  path="/desarrollo/general/niveles" element={<Niveles/>}/>
              <Route  path="/desarrollo/comite" element={<HomeComite/>}/>
              <Route  path="/desarrollo/organismos" element={<OrganismosEmergencia/>}/>
              <Route  path="/desarrollo/equipos" element={<EquiposEmergencias/>}/>
              <Route  path="/desarrollo/aidep/analisishistorico" element={<AnalisisHistorico/>}/>
              <Route  path="/desarrollo/aidep/investigacionterreno" element={<InvestigacionTerreno/>}/>
              <Route  path="/desarrollo/aidep/prioridades" element={<Prioridades/>}/>
              <Route  path="/desarrollo/aidep/mapas" element={<Mapas/>}/>
              <Route  path="/desarrollo/aidep/planos" element={<Planos/>}/>
              <Route  path="/desarrollo/protocolos" element={<Protocolos/>}/>
              <Route  path="/desarrollo/protocolos/formulario" element={<FormProtocolos/>}/>
              <Route  path="/desarrollo/protocolos/formulario/editar/:protocolo_id" element={<FormProtocolos/>}/>
              <Route  path="/desarrollo/capacitaciones" element={<Capacitaciones/>}/>
              <Route  path="/desarrollo/simulacros" element={<Simulacros/>}/>
              <Route  path="/desarrollo/introduccion/informacion" element={<Introduccion/>}/>
              <Route  path="/desarrollo/introduccion/objetivos" element={<Objetivos/>}/>
              <Route  path="/desarrollo/introduccion/definiciones" element={<Definiciones/>}/>
              <Route  path="/desarrollo/descarga" element={<Descarga/>}/>
              {/* <Route exact path="/logout" element={Logout} /> */}
              {/* <PrivateRoute exact path="/inicio" element={Inicio} />
              <PrivateRoute exact path="/usuarios" element={Usuario} /> */}
            </Routes>
          </React.Suspense>
        </MuiPickersUtilsProvider>
      </UserState>
    </BrowserRouter>
  )
}

export default App