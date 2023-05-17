import logo from "./logo.svg";
import "./App.scss";
import { useState } from "react";
import CustomComponent from "./shared/components/Custom";
import { StatusPerkawinanModel } from "./shared/models";

function App() {
  const [state, setState] = useState({
    name: "Arif",
    age: 21,
    statusPerkawinanOptions: StatusPerkawinanModel.createList(),
  });
  const submitHandler = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Nama ", formData.get("name"));
    // const {dto} = Object.fromEntries(formData.entries())
    const { maritalStatus, ...dto }: { [key: string]: any } =
      Object.fromEntries(formData.entries()) || {};
    console.log("dto ", dto);
    console.log("dto ", dto.marital);

    console.log(
      StatusPerkawinanModel.getById(dto.marital ? +dto.marital : null)
    );

    dto.maritalStatus = StatusPerkawinanModel.getById(
      dto.marital ? +dto.marital : null
    );
    console.log('dto ',dto)
  };

  const onChangeHandler = (e: any) => {
    setState((state) => ({
      ...state,
      name: e.target.value,
    }));
    console.log(e.target.value);
  };
  return (
    <div className="container py-4">
      <h1 className="mb-0">React Form</h1>
      <p>Learn How to use React Form</p>
      <CustomComponent />
      <div className="card my-4">
        <div className="card-header">
          <h2 className="mb-0">User Form</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="mb-1" htmlFor="name">
                Nama
              </label>
              <input
                type="text"
                value={state.name}
                onChange={onChangeHandler}
                name="name"
                className="form-control"
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div className="mb-3">
              <label className="mb-1" htmlFor="bod">
                Tanggal Lahir
              </label>
              <input
                type="date"
                className="form-control"
                name="bod"
                placeholder="Pilih tanggal lahir Anda"
              />
            </div>
            <div className="mb-3">
              <label className="mb-1" htmlFor="age">
                Usia
              </label>
              <input
                type="number"
                className="form-control"
                name="age"
                placeholder="Masukan usia Anda"
              />
            </div>
            <div className="mb-3">
              <label className="mb-1" htmlFor="address">
                Alamat
              </label>
              <textarea
                name="address"
                className="form-control"
                placeholder="Masukkan alamat Anda"
              />
            </div>
            <div className="mb-3">
              <label className="mb-1" htmlFor="marital">
                Status Perkawinan
              </label>
              <select
                className="form-select"
                name="marital"
                placeholder="Masukan usia Anda"
              >
                <option value="">Pilih status Perkawinan</option>
                {state.statusPerkawinanOptions.map((statusPerkawinan) => (
                  <option value={statusPerkawinan.id} key={statusPerkawinan.id}>
                    {statusPerkawinan.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary">
              <em className="fas fa-plus"></em>Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
