import React, { useEffect, useState } from "react";
import "../css/Bootstrap.css";
import { guardarPersona } from "../hooks/ConexionSw";


import swal from "sweetalert";
import { useForm } from "react-hook-form";

//mensajes de error
const mensaje = (texto) =>
  swal({
    title: "Error",
    text: texto,
    icon: "error",
    button: "Aceptar",
    timer: 2000,
  });
//mensaje de correctamente ingresado
const mensajeOk = (texto) =>
  swal({
    title: "Ingresado Correctamente",
    text: texto,
    icon: "success",
    button: "Aceptar",
    timer: 2000,
  });

const CrearCuenta = () => {
  const [info, setInfo] = useState(undefined);
  //const [llamada, setllamada] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //que se muestre mensaje cuando se presiona en gguardar
  const [llamada, setLlamada] = useState(false);
  const [guardar, setGuardar] = useState(false);

  const onSubmit = (data) => {
    useEffect(() => {
      if (guardar && !llamada) {
        const datos = guardarPersona(data).then(
          (data) => {
            setLlamada(true);
            setInfo(data);
          },
          (error) => {
            mensaje(error.mensaje);
          }
        );
      }
    }, [llamada, guardar]);
  };


  //para automaticamente escoger el tipo de documento
  const [identificacion, setIdentificacion] = useState("");
  const [tipoIdentificacion, setTipoIdentificacion] = useState("");

  const validarIdentificacion = (value) => {
    const regexCedula = /^[0-9]{10}$/;
    const regexRucPersonaNatural = /^[0-9]{10}001$/;
    const regexRucSociedadPrivada = /^[0-9]{13}$/;
    const regexRucSociedadPublica = /^[0-6]{3}[0-9]{9}$/;
    const regexPasaporte = /^[a-zA-Z]{1}[0-9]{6}[a-zA-Z0-9]{3}$/;
    if (regexCedula.test(value)) {
      setTipoIdentificacion("cedula");
    } else if (regexRucPersonaNatural.test(value)) {
      setTipoIdentificacion("ruc");
    } else if (regexRucSociedadPrivada.test(value)) {
      setTipoIdentificacion("ruc");
    } else if (regexRucSociedadPublica.test(value)) {
      setTipoIdentificacion("ruc");
    } else if (regexPasaporte.test(value)) {
      setTipoIdentificacion("pasaporte");
    } else {
      setTipoIdentificacion("");
    }
  };
  //y para cambiarlo dinamicamente
  useEffect(() => {
    validarIdentificacion(identificacion);
  }, [identificacion]);

  //para verificar que las constrasenas coincidan

  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordValidation = () => {
    const password = watch("cuenta.clave");
    const confirmPassword = watch("confirmarContrasena");
    setPasswordError(password !== confirmPassword);
  };

  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "rgba(210, 188, 151, 1)" }}
    >
      <div
        className="container py-5 h-100"
        style={{ height: "1460px", width: "2600px" }}
      >
        <div className="row d-flex justify-content-center">
          {" "}
          <h1>
            {" "}
            <b>HOTEL EL CARDENAL </b>{" "}
          </h1>
        </div>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div
                  className="col-lg-6"
                  style={{ backgroundColor: "#D6D6D6" }}
                >
                  <div className="card-body p-md-5 mx-md-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row d-flex justify-content-center">
                        <h2>
                          <b>CREAR CUENTA </b>
                        </h2>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/860/860784.png"
                          width={"40"}
                          height={"45"}
                        />
                      </div>

                      {/* nombres */}
                      <div className="form-outline mb-4">
                        <input
                          {...register("nombre", { required: true })}
                          type="text"
                          className="form-control"
                          placeholder="Nombres Completos"
                        />
                        <label className="form-label">Nombres</label>
                      </div>

                      {/* apellidos */}
                      <div className="form-outline mb-4">
                        <input
                          {...register("apellidos", { required: true })}
                          type="text"
                          className="form-control"
                          placeholder="Apellidos Completos"
                        />
                        <label className="form-label">Apellidos</label>
                      </div>

                      {/* direccion */}
                      <div className="form-outline mb-4">
                        <input
                          {...register("direccion", { required: true })}
                          type="text"
                          className="form-control"
                          placeholder="Direccion"
                        />
                        <label className="form-label">Direccion</label>
                      </div>

                      {/* telefono */}
                      <div className="form-outline mb-4">
                        <input
                          {...register("telefono", {
                            required: true,
                            pattern: /^\d{10}$/,
                          })}
                          type="text"
                          className="form-control"
                          placeholder="Telefono"
                        />
                        <label className="form-label">Telefono</label>
                      </div>

                      {/* identificacion */}
                      <div>
                        <input
                          {...register("identificacion", {
                            required: true,
                            pattern: /^\d{10}$/,
                          })}
                          type="text"
                          className="form-control"
                          placeholder="# de Cedula"
                          value={identificacion}
                          onChange={(e) => {
                            setIdentificacion(e.target.value);
                            validarIdentificacion(e.target.value);
                          }}
                        />
                        {/* tipo de identificacion */}
                        <input
                          {...register("tipoIdentificacion")}
                          type="text"
                          className="form-control"
                          disabled
                          placeholder="Tipo de Identificación"
                          value={tipoIdentificacion}
                        />
                      </div>
                      <br></br>
                      {/*   correo */}
                      <div className="form-outline mb-4">
                        <input
                          {...register("cuenta.correo", {
                            required: true,
                            pattern:
                              /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          })}
                          type="email"
                          className="form-control"
                          placeholder="Correo Electronico"
                        />
                        <label className="form-label">Correo Electronico</label>
                        {errors.cuenta?.correo?.type === "required" && (
                          <span className="text-danger">
                            Este campo es requerido
                          </span>
                        )}
                        {errors.cuenta?.correo?.type === "pattern" && (
                          <span className="text-danger">Correo invalido</span>
                        )}
                      </div>

                      {/* clave */}
                      <div className="form-outline mb-4">
                        <input
                          {...register("cuenta.clave", {
                            required: true,
                            minLength: 6,
                          })}
                          type="password"
                          className="form-control"
                          placeholder="Contraseña"
                          onChange={() => handlePasswordValidation()}
                        />
                        <label className="form-label">Contraseña</label>
                        {errors.cuenta?.clave?.type === "required" && (
                          <span className="text-danger">
                            Este campo es requerido
                          </span>
                        )}
                        {errors.cuenta?.clave?.type === "minLength" && (
                          <span className="text-danger">
                            La contraseña debe tener al menos 6 caracteres
                          </span>
                        )}
                      </div>

                      {/* confirmacion de contrasena */}
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          /* {...register("confirmarContrasena", {
                            required: true,
                          })} */
                          className={`form-control ${
                            passwordError ? "border-danger" : ""
                          }`}
                          placeholder="Confirmar Contraseña"
                          onChange={() => handlePasswordValidation()}
                        />
                        <label className="form-label">
                          Confirmar Contraseña&nbsp;
                        </label>
                        {errors.confirmarContrasena?.type === "required" && (
                          <span className="text-danger">
                            Este campo es requerido
                          </span>
                        )}
                        {passwordError && (
                          <span className="text-danger">
                            Las contraseñas no coinciden
                          </span>
                        )}
                      </div>

                      <div className="form-outline mb-4">
                        <select
                          {...register("nombreRol", {
                            required: true,
                          })}
                          className="form-control"
                        >
                          <option value="">Seleccione un rol</option>
                          <option value="cliente">Cliente</option>
                          <option value="admin">Administrador</option>
                          <option value="cliente">Cliente</option>
                        </select>
                        <label className="form-label">Rol</label>
                      </div>
                      {/* boton de guardar persona */}
                      <div
                        type="submit"
                        className="d-flex align-items-center justify-content-center pb-4"
                      >
                        <button
                          type="button"
                          className="btn btn-dark"
                          onClick={() => setGuardar(true)}
                        >
                          GUARDAR
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div
                  className="col-lg-6 d-flex align-items-center gradient-custom-2"
                  style={{ backgroundColor: "#925656" }}
                >
                  <div className="container ">
                    <img
                      src="https://img.freepik.com/vector-premium/hotel-cerca-ilustracion-vector-vista-resort-mar-u-oceano-edificio-hotel-dibujos-animados-plana-playa-calle-paisaje-ciudad-grandes-rascacielos-panorama-paisaje-urbano_101884-679.jpg"
                      className="img-fluid form-outline mb-4"
                      alt="Sample image"
                      style={{ borderStyle: "solid" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrearCuenta;
