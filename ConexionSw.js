import {useState, useEffect} from 'react';
import axios from 'axios';
import {ObtenerSession, Session} from '../utilidades/UseSession'

const URL = "http://localhost:8080/api/v1"

export const Opac = (accion = true) => {
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
      if (accion) callApi();
    }, []);
    const callApi = async (nombre) => {
      try {
        const { data, status, statusText } = await axios.get(URL + "/opac");
        setInfo(data);
        console.log(data);
      } catch (error) {
        //console.log(error);
        setError(error);
      }
    };
    return { info, error, execute: callApi };
  };
  




export const InicioSesion = (data,accion = true) => {
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (accion) callApi(data);
    },[]); 
    const callApi = async (datos) => {
        try {
            const {data,status, statusText} = await axios.post(URL+'/login',datos);
            setInfo(data);
            console.log(data);
        } catch (error) {
            setError(error);
        }
        
    }
    return {info,error,execute: callApi};
};

export const IngresarSistema = async (data) => {
    return await axios.post(URL+'/login',data)
    .then((response)=>{
        console.log(response);
      if(response.data && response.data.token){
          //PARA INICIO DE SESION COOKIES LOCAL STORE ETC.
          const session = Session(response.data.token);
          console.log("INGRESO AL SISTEMA", session);
      }
      return response.data;
    });
}

export const CerrarSistema = async () => {
    /*return await axios.post(URL+'/autenticar',data)
    .then((response)=>{
      if(response.data && response.data.token){
          //PARA INICIO DE SESION COOKIES LOCAL STORE ETC.
          const session = Session(response.data.token);
      }
      return response.data;
    });*/
    await CerrarSistema();
    return true;
}

//llamado al Servicios Web para borrar token
export const Servicios = async (token) => {
    const config = {headers: {
        'Authorization': ObtenerSession()
    }};
    return await axios.get(URL+'/servicios',config)
    .then((response)=>{
        console.log(response);
          //PARA INICIO DE SESION COOKIES LOCAL STORE ETC.
          return response.data;
    });
}


export const IngresarServicios = async (data) => {
    const config = {headers: {
        'Authorization': ObtenerSession()
    }};
    console.log(data);
    return await axios.post(URL+'/servicios/guardar',data,config).then((response)=>{
        return response.data;
    });
}





export const Habitaciones = async (token) => {
    const config = {headers: {
        'Authorization': ObtenerSession()
    }};
    return await axios.get(URL+'/habitacion',config)
    .then((response)=>{
        console.log(response);
          //PARA INICIO DE SESION COOKIES LOCAL STORE ETC.
          return response.data;
    });
}


//guardar persona
export const guardarPersona = async (data) => {
    const personaWs = {
      nombre: data.nombre,
      identificacion: data.identificacion,
      telefono: data.telefono,
      correo: data.correo,
      fechaNacimiento: data.fechaNacimiento,
      nombreRol: data.nombreRol,
      cuenta: {
        correo: data.correo,
        clave: data.clave,
      },
    };
  
    const token = ObtenerSession();
  
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    try {
      const response = await axios.post('/personas/guardar', personaWs, config);
      return { success: true, message: 'La persona se guardó correctamente' };
    } catch (error) {
      return { success: false, message: 'No se pudo guardar la persona. Error: ' + error.response.data };
    }
  };
  


/*
export const BuscarLibros = async (id) => {
    const config = {headers: {
        'access-token': ObtenerSession()
    }};
    return await axios.get(URL+'/libro/obtener/'+id,config).then((response)=>{
        console.log(id);
        return response.data;
    });
}

export const ModificarLibros = async (data) => {
    const config = {headers: {
        'access-token': ObtenerSession()
    }};
    return await axios.post(URL+'/libro/editar',data,config).then((response)=>{
        console.log(response.data);
        return response.data;
    });
}

export const CambiarEstado = async (id) => {
    const config = {headers: {
        'access-token': ObtenerSession()
    }};
    return await axios.get(URL+'/libro/cambio/'+id,config).then((response)=>{
        console.log(response);
        return response.data;
    });
}
*/

/*export const IngresarSistema = async (data) => {
    return await axios.post(URL+'/autenticar',data)
    .then((response)=>{
      if(response.data && response.data.token){
          //PARA INICIO DE SESION COOKIES LOCAL STORE ETC.
          const session = Session(response.data.token);
      }
      return response.data;
    });
}*/
