import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import FloatingLabelInput from '../../componentes/general/FLoatingLabel';
import { toast } from 'react-toastify';
import api from '../../api/routes';
import Layout from '../../componentes/general/Layout';
import Dashboard from './Dashboard';

function HomeDashboard() {

  return (
    <>
    <Layout/>
    <Dashboard titulo={'DashBoard'}/>
    </>

  )
}

export default HomeDashboard;
