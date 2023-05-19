import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useState } from "react";
import CustomComponent from "./shared/components/Custom";
import {
  CheckboxModel,
  HobiModel,
  JenisKelamin,
  StatusPerkawinanModel,
} from "./shared/models";
import { Components } from "./shared/components";

function App() {
  const [state, setState] = useState({
    record: {
      name: "",
      dob: "",
      age: "",
      address: "",
      marital: 0,
      gender: 0,
    },
    statusPerkawinanOptions: StatusPerkawinanModel.createList(),
    jenisKelaminOptions: JenisKelamin.createList(),
    hobiList: CheckboxModel.createList(
      HobiModel.createList(),
      (option: HobiModel) => {
        const isChecked =
          HobiModel.createList()
            .slice(0, 2)
            .findIndex((item) => item.id === option.id) !== -1;
        return isChecked;
      }
    ),
  });

  useEffect(() => {
    setTimeout(() => {
      const {hobi, ...record} = {
        name: "Arif CO",
        age: "31",
        gender: 2,
        dob: "1990-03-30",
        address: "jalan Cilebut Raya",
        marital: 2,
        hobi: HobiModel.createList().slice(3, 4)
      };
      console.log("record from api", record);
      setState((state) => ({
        ...state,
        record
      }))
    }, 2000);
    console.log("record ", state);
  }, []);

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
    dto.hobi = CheckboxModel.getValues(state.hobiList);
    console.log("dto ", dto);
  };

  const onChangeHandler = (e: any) => {
    setState((state) => ({
      ...state,
      name: e.target.value,
    }));
    console.log(e.target.value);
  };

  console.log("hobilist ", state.hobiList);
  console.log("hobilist ", CheckboxModel.getValues(state.hobiList));
  return (
    <div className="container py-4">
      <h1 className="mb-0">React Form</h1>
      <p>Learn How to use React Form</p>
      <CustomComponent />
      <Components.Card header="User Form">
        <form onSubmit={submitHandler}>
          <Components.Form.Group label="Nama" htmlFor="name" required={true}>
            <input
              type="text"
              defaultValue={state.record.name}
              onChange={onChangeHandler}
              name="name"
              className="form-control"
              placeholder="Masukkan nama Anda"
            />
          </Components.Form.Group>
          <Components.Form.Group label="Usia" htmlFor="age" required={true}>
            <input
              type="number"
              defaultValue={state.record.age}
              name="age"
              className="form-control"
              placeholder="Masukkan usia Anda"
            />
          </Components.Form.Group>

          <Components.Form.Group label="Tanggal Lahir" htmlFor="dob">
            <input
              type="date"
              className="form-control"
              name="dob"
              placeholder="Pilih tanggal lahir Anda"
              defaultValue={state.record.dob}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Alamat" htmlFor="address">
            <textarea
              name="address"
              className="form-control"
              placeholder="Masukkan alamat Anda"
              defaultValue={state.record.address}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Status Perkawinan" htmlFor="marital">
            <select
              className="form-select"
              name="marital"
              defaultValue={state.record.marital}
            >
              <option value="">Pilih status Perkawinan</option>
              {state.statusPerkawinanOptions.map((statusPerkawinan) => (
                <option value={statusPerkawinan.id} key={statusPerkawinan.id}>
                  {statusPerkawinan.name}
                </option>
              ))}
            </select>
          </Components.Form.Group>

          <Components.Form.Group label="Jenis Kelamin" htmlFor="gender">
            {state.jenisKelaminOptions.map((jenisKelamin) => (
              <div className="form-check" key={jenisKelamin.id}>
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  id={"gender" + jenisKelamin.id}
                  value={jenisKelamin.id}
                  checked={jenisKelamin.id === state.record.gender}
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
          </Components.Form.Group>

          <Components.Form.Group label="Hobi" htmlFor="hobi">
            {state.hobiList.map((hobi, i) => (
              <div className="form-check" key={hobi.option.id}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="hobi"
                  id={"hobi" + hobi.option.id}
                  value={hobi.option.id}
                  checked={hobi.isChecked}
                  onChange={(e) => {
                    const hobiList = state.hobiList;
                    hobiList[i].isChecked = e.target.checked;
                    setState((state) => ({
                      ...state,
                      hobiList,
                    }));
                    console.log(e.target.checked);
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
          </Components.Form.Group>

          <button className="btn btn-primary">
            <em className="fas fa-plus"></em>Add
          </button>
        </form>
      </Components.Card>
    </div>
  );
}

export default App;
