import Personas from "../../componentes/dashboard/Personas";
import ComiteDashBoard from "../../componentes/dashboard/ComiteDashBoard";
import CapacitacionesDashBoard from "../../componentes/dashboard/CapacitacionesDashboard";

function Dashboard(props) {
  return (
    <>
      <div className="flex flex-col h-screen">
        {props.titulo && <div className={"justify-arround w-full"}>
          <div className="bg-gray-100 dark:bg-gray-800 py-6 lg:py-8">
            <div className="container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="lg:flex">
                <h4 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">
                  Dashboard
                </h4>
              </div>
            </div>
          </div>
        </div>}
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded">
        <div className="px-4 mt-5 flex-auto">
            <div className="flex px-4 py-4 bg-gray-100">
              <div className="flex flex-row flex-wrap w-full">
                <Personas />
              </div>
            </div>
          </div>
          <div className="px-4 mt-3 flex flex-col lg:flex-row flex-auto">
            <div className="flex flex-col flex-1 px-4 py-4 bg-gray-100">
              <h1 className="px-1 lg:text-xl font-bold leading-8">Miembros del Cómite de Seguridad</h1>
              <div className="flex flex-row flex-wrap w-full mt-4">
                <ComiteDashBoard />
              </div>
            </div>
            <div className="flex flex-col flex-1 px-4 py-4 bg-gray-100">
              <h1 className="px-1 lg:text-xl font-bold leading-8">Capacitaciones</h1>
              <div className="flex flex-row flex-wrap w-full mt-4">
                <CapacitacionesDashBoard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
