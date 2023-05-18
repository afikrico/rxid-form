import logo from "./logo.svg";
import "./App.scss";
import { useState } from "react";
import CustomComponent from "./shared/components/Custom";
import {
  CheckboxModel,
  HobiModel,
  JenisKelamin,
  StatusPerkawinanModel,
} from "./shared/models";

function App() {
  const [state, setState] = useState({
    name: "Arif",
    age: 21,
    gender: 2,
    statusPerkawinanOptions: StatusPerkawinanModel.createList(),
    jenisKelaminOptions: JenisKelamin.createList(),
    hobiList: CheckboxModel.createList(HobiModel.createList())
  });
  const submitHandler = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Nama ", formData.get("name"));
    // const {dto} = Object.fromEntries(formData.entries())
    const { maritalStatus, jenisKelamin, ...dto }: { [key: string]: any } =
      Object.fromEntries(formData.entries()) || {};
    console.log("dto ", dto);
    console.log("dto ", dto.marital);

    console.log(
      StatusPerkawinanModel.getById(dto.marital ? +dto.marital : null)
    );

    dto.maritalStatus = StatusPerkawinanModel.getById(
      dto.marital ? +dto.marital : null
    );
    dto.jenisKelamin = JenisKelamin.getById(dto.gender ? +dto.gender : null);
    // dto.hobi = CheckboxModel.getValues(state.hobiList).map(val => val.name)
    dto.hobi = CheckboxModel.getValues(state.hobiList)
    console.log("dto ", dto);
  };

  const onChangeHandler = (e: any) => {
    setState((state) => ({
      ...state,
      name: e.target.value,
    }));
    console.log(e.target.value);
  };

  console.log('hobilist ',state.hobiList)
  console.log('hobilist ', CheckboxModel.getValues(state.hobiList))
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
              <select className="form-select" name="marital">
                <option value="">Pilih status Perkawinan</option>
                {state.statusPerkawinanOptions.map((statusPerkawinan) => (
                  <option value={statusPerkawinan.id} key={statusPerkawinan.id}>
                    {statusPerkawinan.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-1" htmlFor="gender">
                Jenis Kelamin
              </label>
              <div className="form-check">
                {state.jenisKelaminOptions.map((jenisKelamin) => (
                  <div className="form-check" key={jenisKelamin.id}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      id={"gender" + jenisKelamin.id}
                      value={jenisKelamin.id}
                      checked={jenisKelamin.id === state.gender}
                      onChange={(e) =>
                        setState((state) => ({
                          ...state,
                          gender: +e.target.value,
                        }))
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={"gender" + jenisKelamin.id}
                    >
                      {jenisKelamin.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label className="mb-1" htmlFor="hobi">
                Hobi
              </label>
              {state.hobiList.map((hobi, i) => (
                <div className="form-check" key={hobi.option.id}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="hobi"
                    id={"hobi" + hobi.option.id}
                    value={hobi.option.id}
                    onChange={(e) => {
                      const hobiList = state.hobiList
                      hobiList[i].isChecked = e.target.checked
                      setState((state) => ({
                        ...state,
                        hobiList
                      }));
                      console.log(e.target.checked)

                    }}
                  />
                  <label
                    htmlFor={"hobi" + hobi.option.id}
                    className="form-check-label"
                  >
                    {hobi.option.name}
                  </label>
                </div>
              ))}
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
