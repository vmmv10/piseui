import { useState } from 'react';
import Cards from '../../../componentes/comite/Cards';
import ModalInfo from '../../../componentes/comite/ModalInfo';

function Info(props) {

  const[showDirector, setShowDirector] = useState(false);

  return (
    <>
    <div className='mb-5'><h3 className='text-1xl font-semibold text-center'>RESPONSABILIDADES Y FUNCIONES DE LOS INTEGRANTES DEL COMITÉ DE SEGURIDAD ESCOLAR</h3></div>
    <div className='flex flex-row flex-wrap justify-around'>
      <Cards titulo={'Director/a'} imagen={'director.png'} texto={'Responsable definitivo de la seguridad en el Establecimiento Educacional, preside y apoya al Comité y sus acciones.'}>
        <ul className='py-2 list-disc text-justify list-inside ...'>
          <li className="mt-1">
            Promover y dirigir el proceso de diseño y actualización permanente del Plan Integral de Seguridad Escolar del Establecimiento Educacional.
          </li>
          <li className="mt-1">
            Proporcionar las herramientas para que en el establecimiento se generen las condiciones de tiempos, espacios, recursos, equipos, etc.; para su aplicación.
          </li>
          <li className="mt-1">
            Dar cumplimiento a lo solicitado por la Superintendencia de Educación22: “El Reglamento Interno del establecimiento debe contener las medidas de prevención y los protocolos de actuación para el caso de accidentes”..
          </li>
          <li className="mt-1">
            Considerar en el PME y en los otros instrumento de gestión del Establecimiento Educacional, acciones que posibiliten el aprendizaje de la seguridad escolar y la convivencia como parte del respeto a la propia vida y la de los demás.
          </li>
          <li className="mt-1">
            Considerar la recalendarización de actividades vinculadas a la seguridad escolar, así como también el ajuste curricular y pedagógico en el caso que el proceso educativo se vea afectado, incluyendo la posibilidad de coordinar apoyos psicosociales.
          </li>
          <li className="mt-1">
            Considerar estrategias para la implementación de la seguridad escolar.
          </li>
        </ul>
      </Cards>
      <Cards titulo={'Monitor/a o Coordinador/a'} imagen={'monitor'} texto={'Designado por el Director/a, coordinará todas y cada una de las actividades que efectúe el Comité.'}>
        <ul className='py-2 list-disc text-justify list-inside ...'>
          <li className="mt-1">
          Promover que los integrantes del Comité actúen con pleno acuerdo; arbitrando las medidas que permitan administrar eficiente y eficazmente los recursos, las comunicaciones, las reuniones y la mantención de registros, documentos necesarios y actas que se generen.
          </li>
          <li className="mt-1">
          Vincular dinámicamente los distintos programas que formarán parte o son parte de la gestión educativa. Esta coordinación permitirá un trabajo armónico en función del objetivo en común que es la seguridad.
          </li>
          <li className="mt-1">
            Mantener permanente contacto con la Municipalidad, las unidades de emergencias de
            Salud, Bomberos, Carabineros, establecimientos de salud que cuentan con unidades de rehabilitación del sector donde esté situado el
            Establecimiento Educacional, a fin de recurrir
            a su apoyo especializado en acciones de prevención, capacitación, preparación, ejercitación
            y atención en caso de ocurrir una emergencia; así como también visitar periódicamente
            las páginas web de organismo técnicos tales
            como: Servicio Hidrográfico y Oceanográfico
            de la Armada de Chile (www.shoa.cl); Servicio
            de Geología y Minería (www.sernageomin.cl);
            Centro Sismológico Nacional (www.sismologia.cl);
            Corporación Nacional Forestal (www.conaf.cl);
            Dirección Meteorológica de Chile(www.meteochile.cl); Oficina Nacional de Emergencia del Ministerio del Interior y Seguridad
            Pública, ONEMI, (www.onemi.cl), entre otras, más
            aún cuando se planifiquen visitas pedagógicas,
            actividades en la montaña, viajes de estudio, etc.
          </li>
        </ul>
      </Cards>
      <Cards titulo={'Representantes Docentes, Estudiantes, Padres, Madres, Apoderados y Asistentes de la Educación'} imagen={'profesora.png'} texto={'Aportan su visión desde sus responsabilidades.'}>
        Aportan su visión desde sus responsabilidades en
        la comunidad educativa, cumplir con las acciones
        y tareas que para ellos, acuerde el Comité y proyectar o comunicar, hacia sus respectivos representados, la labor general del establecimiento en
        materia de seguridad escolar. Velando porque las
        acciones y tareas sean presentadas y acordadas
        con formato accesibles a todos y todas y respondan
        a las diferentes condiciones y necesidades.
      </Cards>
      <Cards titulo={'Representantes de las Unidades de Salud (emergencias y rehabilitación), Bomberos, Carabineros'} imagen={'bombero.png'} texto={' Constituyen instancias de apoyo técnico al Comité.'}>
        Constituyen instancias de apoyo técnico al Comité
        y su relación con el Establecimiento Educacional
        puede ser formalizada entre el Director/a y el representante local del respectivo organismo técnico
        de emergencia. Para lograr una efectiva coordinación, se puede elaborar un documento (convenio,
        oficio, memorándum, etc.) que determine el apoyo
        con el organismo de primera respuesta respectivo.
        Esta coordinación viene a reforzar toda la acción del
        Comité de Seguridad Escolar no sólo en los aspectos de prevención, sino que también en la atención
        efectiva cuando se ha producido una emergencia.
      </Cards>
      <Cards titulo={'Representantes de organismos.'} imagen={'organismo.png'} texto={'Tales como Cruz Roja, Defensa Civil, Scouts, ONG’s, etc.'}>
        Tanto del Establecimiento Educacional como del
        entorno pueden ser invitados a formar parte del
        Comité, para su aporte técnico a las diversas acciones y tareas que se acuerden.
      </Cards>

      </div>
    </>
  )
}

export default Info
