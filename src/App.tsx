import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useRef, useState } from "react";
import CustomComponent from "./shared/components/Custom";
import {
  CheckboxModel,
  HobiModel,
  JenisKelamin,
  StatusPerkawinanModel,
} from "./shared/models";
import { Components } from "./shared/components";
import { FormControl } from "./core/form";
import { Validators } from "./shared/validator";

function App() {
  const [state, setState] = useState({
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
  const [record, setRecord] = useState<{ [key: string]: any }>({
    name: new FormControl(["", Validators.required("Nama wajib diisi")]),
    dob: new FormControl([
      "",
      Validators.required("Tanggal lahir wajib dipilih"),
    ]),
    age: new FormControl(["", Validators.required("Usia wajib diisi")]),
    address: new FormControl(["", Validators.required("Alamat wajib diisi")]),
    marital: new FormControl([
      "",
      Validators.required("Status perkawinan wajib dipilih"),
    ]),
    gender: new FormControl([
      "",
      Validators.required("Jenis Kelamin wajib dipilih"),
    ]),
    termAndCondition: new FormControl([
      null,
      Validators.required("Term and codition wajib disetujui"),
    ]),
  });

  const maritalStatusRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    console.log("record ", record);
    setTimeout(() => {
      const { hobi, ...record } = {
        name: "Arif CO",
        age: "31",
        gender: 2,
        dob: "1990-03-30",
        address: "jalan Cilebut Raya",
        marital: 2,
        hobi: HobiModel.createList().slice(3, 4),
      };
      const hobiList = state.hobiList.map((item) => {
        item.isChecked =
          hobi.findIndex((data) => data.id === item.option.id) !== -1;
        return item;
      });
      setState((state) => ({
        ...state,
        hobiList,
      }));
      // console.log("record from api", record);
      // setState((state) => ({
      //   ...state,
      //   record
      // }))
      // setRecord(record)

      // const maritalStatusElement = document.getElementsByName("marital")[0] as HTMLSelectElement;
      // maritalStatusElement.value = String(record.marital)
      if (maritalStatusRef.current) {
        maritalStatusRef.current.value = String(record.marital);
      }
    }, 2000);
    // console.log("record ", state);
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();
    const value: {[key:string]: any} ={}
    Object.keys(record).forEach((key) => {
      value[key] = record[key].value
    })
    console.log('record ',record)
    // console.log("state record ", record);
    // const { marital, gender, ...dto } = record;
    // dto.gender = JenisKelamin.getById(+gender);
    // dto.marital = StatusPerkawinanModel.getById(+marital);
    // dto.hobbies = CheckboxModel.getValues(state.hobiList);
    // console.log("dto ", dto);
    // const formData = new FormData(e.target);
    // console.log("Nama ", formData.get("name"));
    // // const {dto} = Object.fromEntries(formData.entries())
    // const { maritalStatus, jenisKelamin, ...dto }: { [key: string]: any } =
    //   Object.fromEntries(formData.entries()) || {};
    // console.log("dto ", dto);
    // console.log("dto ", dto.marital);

    // console.log(
    //   StatusPerkawinanModel.getById(dto.marital ? +dto.marital : null)
    // );

    // dto.maritalStatus = StatusPerkawinanModel.getById(
    //   dto.marital ? +dto.marital : null
    // );
    // dto.jenisKelamin = JenisKelamin.getById(dto.gender ? +dto.gender : null);
    // // dto.hobi = CheckboxModel.getValues(state.hobiList).map(val => val.name)
    // dto.hobi = CheckboxModel.getValues(state.hobiList);
    // console.log("dto ", dto);
  };

  const onChangeHandler = (e: any) => {
    // setState((state) => ({
    //   ...state,
    //   name: e.target.value,
    // }));
    // console.log(e.target.value);
    // record[e.target.name] = e.target.value;
    const control: FormControl = record[e.target.name];
    control.patchValue(e.target.value);

    setRecord((record) => ({
      ...record,
      [e.target.name]: control,
    }));
    console.log("record ", record);
  };

  // console.log("hobilist ", state.hobiList);
  // console.log("hobilist ", CheckboxModel.getValues(state.hobiList));
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
              // value={record.name.value}
              {...record.name}
              onChange={onChangeHandler}
              name="name"
              className={
                "form-control " +
                (record.name.getIsValid() ? "is-valid" : "is-invalid")
              }
              placeholder="Masukkan nama Anda"
            />
            {record.name.errors && (
              <small className="text-danger">
                {record.name.errors.message}
              </small>
            )}
          </Components.Form.Group>
          <Components.Form.Group label="Usia" htmlFor="age" required={true}>
            <input
              type="number"
              // value={record.age}
              {...record.age}
              onChange={onChangeHandler}
              name="age"
              className="form-control"
              placeholder="Masukkan usia Anda"
            />
            {record.age.errors && (
              <small className="text-danger">{record.age.errors.message}</small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Tanggal Lahir" htmlFor="dob">
            <input
              type="date"
              className="form-control"
              name="dob"
              {...record.dob}
              placeholder="Pilih tanggal lahir Anda"
              // value={record.dob}
              onChange={onChangeHandler}
            />
            {record.dob.errors && (
              <small className="text-danger">{record.dob.errors.message}</small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Alamat" htmlFor="address">
            <textarea
              name="address"
              {...record.address}
              className="form-control"
              placeholder="Masukkan alamat Anda"
              // value={record.address}
              onChange={onChangeHandler}
            />
            {record.address.errors && (
              <small className="text-danger">
                {record.address.errors.message}
              </small>
            )}
          </Components.Form.Group>

          <Components.Form.Group label="Status Perkawinan" htmlFor="marital">
            <select
              className="form-select"
              name="marital"
              // value={record.marital}
              {...record.marital}
              onChange={onChangeHandler}
              // ref={maritalStatusRef}
            >
              <option value="">Pilih status Perkawinan</option>
              {state.statusPerkawinanOptions.map((statusPerkawinan) => (
                <option value={statusPerkawinan.id} key={statusPerkawinan.id}>
                  {statusPerkawinan.name}
                </option>
              ))}
            </select>
            {record.marital.errors && (
              <small className="text-danger">
                {record.marital.errors.message}
              </small>
            )}
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
                  // checked={jenisKelamin.id === +record.gender}
                  checked={jenisKelamin.id === +record.gender.value}
                  // onChange={(e) =>
                  //   setState((state) => ({
                  //     ...state,
                  //     gender: +e.target.value,
                  //   }))
                  // }
                  onChange={onChangeHandler}
                />
                <label
                  className="form-check-label"
                  htmlFor={"gender" + jenisKelamin.id}
                >
                  {jenisKelamin.name}
                </label>
              </div>
            ))}
            {record.gender.errors && (
              <small className="text-danger">
                {record.gender.errors.message}
              </small>
            )}
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

          <Components.Form.Group>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="termAndCondition"
                id="termAndCondition"
                checked={!!record.termAndCondition.value}
                // onChange={(e) => {
                //   setRecord((record) => ({
                //     ...record,
                //     termAndCondition: e.target.checked,
                //   }));
                // }}
                onChange={(e) => {
                  const control = record.termAndCondition;
                  control.patchValue(e.target.checked);
                  setRecord((record) => ({
                    ...record,
                    termAndCondition: control,
                  }));
                }}
              />
              <label htmlFor="termAndCondition" className="form-check-label">
                Term and condition
              </label>
            </div>
            {record.termAndCondition.errors && (
              <small className="text-danger">
                {record.termAndCondition.errors.message}
              </small>
            )}
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
