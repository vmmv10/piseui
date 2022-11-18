import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import {
  BsArrowBarRight,
  BsFillPersonFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../../context/user/UserContext";
import SideBar from "./SideBar";
import Tooltip from "./Tooltip";

export default function Layout(props) {
  const [product, setProduct] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openTab, setOpenTab] = useState(false);
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  const { selectedUser } = useContext(UserContext);
  let usuario = localStorage.getItem("usuario");

  useEffect(
    () => {
      if (selectedUser) {
        setUser(selectedUser.usuario[0]);
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      <div className="flex flex-col">
        <nav className="h-16 flex items-center lg:items-stretch lg:justify-between bg-white shadow w-full relative">
          <div className="lg:hidden flex justify-start px-5">
            <button onClick={() => setOpenTab(!openTab)}>
              <FaBars style={{ fontSize: "25px" }} />
            </button>
          </div>
          <div className="flex w-full">
            <div className="w-2/3 lg:flex">
              <ul className="pr-32 xl:flex hidden items-center h-full">
                <li
                  className="hover:text-gray-500 cursor-pointer h-full flex items-center text-sm text-black tracking-normal mx-10"
                  onClick={() => navigate("/dashboard/home")}
                >
                  Dashboard
                </li>
                <li
                  className="hover:text-gray-500 cursor-pointer h-full flex items-center text-sm text-black mx-10 tracking-normal relative"
                  onClick={() => setProduct(!product)}
                >
                  {product ? (
                    <ul className="bg-white shadow rounded py-1 w-32 left-0 mt-16 -ml-4 absolute top-0">
                      <li
                        className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                        onClick={() => navigate("/desarrollo/introduccion/informacion")}
                      >
                        Desarrollo
                      </li>
                      <li
                        className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                        onClick={() => navigate("/planes/antiguos/home")}
                      >
                        Planes Antiguos
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                  Plan
                </li>
              </ul>
            </div>
            <div className="w-1/3 justify-end flex mr-10">
              <div className="w-full flex items-center pl-8 justify-end">
                <div
                  className="hover:text-gray-500 cursor-pointer h-full flex items-center text-sm text-black lg:mx-10 tracking-normal relative"
                  onClick={() => setProfile(!profile)}
                >
                  <div className="rounded-full">
                    {profile ? (
                      <ul className="bg-white shadow rounded py-1 w-32 lg:w-40 z-10 mt-10 lg:mt-16 absolute top-0">
                        <li
                          className="flex w-full justify-between text-gray-600 hover:bg-gray-100 cursor-pointer px-3 py-2 items-center"
                          onClick={() => {
                            navigate("/usuarios/perfil");
                          }}
                        >
                          <div className="flex items-center+">
                            <BsFillPersonLinesFill />
                            <span className="text-sm ml-2">Perfil</span>
                          </div>
                        </li>
                        <li
                          className="flex w-full justify-between text-gray-600 hover:bg-gray-100 cursor-pointer items-center px-3 py-2"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          <div className="flex items-center">
                            <BsArrowBarRight />
                            <span className="text-sm ml-2">Cerrar Sesión</span>
                          </div>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                    <div className="relative flex justify-end">
                      <FaUserAlt className="flex justify-end"/>
                      <div className="w-2 h-2 rounded-full bg-green-400 border border-white absolute inset-0 mb-0 mr-0 m-auto" />
                    </div>
                  </div>
                  <p className="text-gray-800 text-sm mx-3">{usuario}</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex">
          <div className={openTab ? "flex lg:hidden" : "hidden lg:hidden"}>
            <SideBar openTab={openTab} setOpenTab={setOpenTab}/>
          </div>
          <div className="lg:mt-0 mt-50">{props.children}</div>
        </div>
      </div>
    </>
  );
}
