import { useContext, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import FloatingLabelInput from '../../componentes/general/FLoatingLabel';
import { toast } from 'react-toastify';
import api from '../../api/routes';
import Layout from '../../componentes/general/Layout';
import UserContext from '../../context/user/UserContext';

function Home() {

  const { user } = useContext(UserContext);

  return (
    <Layout>
      <h1>{JSON.stringify(user, null, 2)}</h1>
    </Layout>
  )
}

export default Home
