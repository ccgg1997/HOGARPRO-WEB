import React from "react";
import GenericTable from "../../components/tables/GenericTable";

function OfrecerServiciosPage() {
  

  const columns = [
    {
      name: "Tipo",
      selector: (row) => row.tipo,
      sortable: true,
      reorder: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      sortable: true,
      reorder: true,
    },
    {
      name: "Precio",
      selector: (row) => row.precio,
      sortable: true,
      reorder: true,
    },
    {
      name: "Unidad Precio",
      selector: (row) => row.unidadPrecio,
      sortable: true,
      reorder: true,
    },
    {
      name: "Modificar",
      selector: (row) => row.laborId,
      formatter: (row) => {
        return (
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#modalEditarLabor"
            onClick={() => {
              console.log("Modificar labor con id: ", row);
            }}
          >
            Modificar
          </button>
        );
      },
    },
  ];

  return (
    <main className="container">
      <div class="container-fluid pt-3">
        <div class="card bg-info text-white justify-content-center ">
          <div class="card-body justify-content-center ">
            <div class="row mx-auto justify-content-center">
              <form id="cargar_documento" class="form-inline">
                <div class="input-group justify-content-between">
                  <label for="" class="mr-sm-2 mt-2 h5 ">
                    Realiza la carga de tu documento de identidad:
                  </label>
                  <div class="custom-file ml-5">
                    <input
                      type="file"
                      name="documento"
                      class="custom-file-input"
                      id="documento"
                      aria-describedby="documento"
                    ></input>
                    <label
                      class="custom-file-label"
                      for="documento"
                      id="lbl_documento"
                      accept=".pdf, .jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                    >
                      Elegir Archivo
                    </label>
                  </div>
                  <input
                    type="submit"
                    class="btn btn-primary ml-2 col-sm-2"
                    value="Enviar"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="card text-white justify-content-center mt-2 ">
          <div class="card-body bg-info justify-content-center ">
            <div class="row mx-auto justify-content-center ">
              <form id="cargar_foto_perfil" class="form-inline">
                <div class="input-group justify-content-between">
                  <label for="" class="mr-sm-2 mt-2 h5 ">
                    Realiza la carga de tu foto de perfil:
                  </label>
                  <div class="custom-file ml-5">
                    <input
                      type="file"
                      name="imagen"
                      class="custom-file-input"
                      id="imagen"
                      aria-describedby="imagen"
                    ></input>
                    <label
                      class="custom-file-label"
                      for="imagen"
                      id="lbl_imagen"
                      accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                    >
                      Elegir Archivo
                    </label>
                  </div>
                  <input
                    type="submit"
                    class="btn btn-primary ml-2 col-sm-2"
                    value="Enviar"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 mb-3">
            <div class="card">
              <div class="card-body">
                <h3 class="text-center">Mis labores: </h3>
                <div class="row">
                  <GenericTable columns={columns} data={[]} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form class="border p-3 rounded-3 form-inline" id="addLaborForm">
            <div class="d-flex justify-content-between align-items-center flex-wrap">
              <div class="d-flex justify-content-between align-items-center flex-wrap">
                <label for="laborId" class="form-label justify-content-start">
                  Labor
                </label>
                <select
                  name="laborId"
                  id="formAddLaborLabor"
                  class="custom-select form-control w-100"
                  required
                >
                  <option>Seleccione un trabajo</option>
                </select>
              </div>
              <div class="col-6 col-sm-3">
                <label for="precio" class="form-label justify-content-start">
                  Precio
                </label>
                <input
                  type="number"
                  class="form-control w-100"
                  id="formAddLaborPrecio"
                  name="precio"
                  required
                ></input>
              </div>
              <div class="col-6 col-sm-3">
                <label
                  for="unidadPrecio"
                  class="form-label justify-content-start"
                >
                  Unidad Precio
                </label>
                <input
                  type="text"
                  class="form-control w-100"
                  id="formAddLaborUnidadPrecio"
                  name="unidadPrecio"
                  required
                ></input>
              </div>
              <button
                id="btnSubmitAddLabor"
                type="submit"
                class="btn btn-primary btn-block col-2 mt-4"
              >
                Añadir
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default OfrecerServiciosPage;
