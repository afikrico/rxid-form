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
  const [record, setRecord] = useState<{[key:string]:any}>({
    name: "",
    dob: "",
    age: "",
    address: "",
    marital: 0,
    gender: 0,
    termAndCondition: true
  })

  const maritalStatusRef = useRef<HTMLSelectElement>(null)

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
      const hobiList = state.hobiList.map((item) => {
        item.isChecked = hobi.findIndex((data) => data.id === item.option.id) !== -1;
        return item
      })
      setState((state) => ({
        ...state,
        hobiList
      }))
      // console.log("record from api", record);
      // setState((state) => ({
      //   ...state,
      //   record
      // }))
      setRecord(record)

      // const maritalStatusElement = document.getElementsByName("marital")[0] as HTMLSelectElement;
      // maritalStatusElement.value = String(record.marital)
      if(maritalStatusRef.current){
        maritalStatusRef.current.value = String(record.marital)
      }
    }, 2000);
    // console.log("record ", state);
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log('state record ', record)
    const { marital, gender, ...dto} = record
    dto.gender = JenisKelamin.getById(+gender)
    dto.marital = StatusPerkawinanModel.getById(+marital)
    dto.hobbies = CheckboxModel.getValues(state.hobiList)
    console.log("dto ",dto)
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
    setRecord((record) => ({
      ...record,
      [e.target.name]: e.target.value
    }))
    console.log('record ',record)
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
              value={record.name}
              onChange={onChangeHandler}
              name="name"
              className="form-control"
              placeholder="Masukkan nama Anda"
            />
          </Components.Form.Group>
          <Components.Form.Group label="Usia" htmlFor="age" required={true}>
            <input
              type="number"
              value={record.age}
              onChange={onChangeHandler}
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
              value={record.dob}
              onChange={onChangeHandler}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Alamat" htmlFor="address">
            <textarea
              name="address"
              className="form-control"
              placeholder="Masukkan alamat Anda"
              value={record.address}
              onChange={onChangeHandler}
            />
          </Components.Form.Group>

          <Components.Form.Group label="Status Perkawinan" htmlFor="marital">
            <select
              className="form-select"
              name="marital"
              value={record.marital}
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
                  checked={jenisKelamin.id === +record.gender}
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
                  checked={!!record.termAndCondition}
                  onChange={(e) => { 
                    setRecord((record) => ({
                      ...record,
                      termAndCondition: e.target.checked,
                    }));
                  }}
                />
                <label
                  htmlFor="termAndCondition"
                  className="form-check-label"
                >
                  Term and condition
                </label>
              </div>
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
