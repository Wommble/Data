"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { ShowUsers } from "./ShowUsers/page";
import { Create_New_Account } from "./Create_Account/page";
import { Edit_Account } from "./Edit_Account/page";

export function MainFunctions(formikEdit, formik) {
  const [info, setInfo] = useState();

  const fetchData = async () => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((res) => setInfo(res.data));
  };
  const deleteUserFunc = async (id) => {
    if (typeof id == "string") {
      const res = await axios
        .delete(`http://localhost:8080/user/${id}`, {
          method: "DELETE",
        })
        .then((res) => setInfo(res.data.data));
    } else alert("something went wrong");
  };
  const createUser = async (value) => {
    if (!formik.errors.createNewUsername) {
      const res = await axios.post(`http://localhost:8080/user`, {
        id: Date.now().toString(),
        username: value.createNewUsername,
        age: value.age,
        password: value.password,
      });
      setInfo(res.data.data);
    } else {
      alert("An error has happened");
    }
  };
  const editUser = async (value) => {
    console.log(value);
    if (!formikEdit.errors.correctID && !formikEdit.errors.editPassword) {
      const res = await axios.patch(
        `http://localhost:8080/user/${value.correctID}`,
        {
          username: value.editName,
          age: value.editAge,
          password: value.editPassword,
        }
      );
      if (res.data.status == "success") {
        setInfo(res.data.data);
      }
    } else {
      alert("Something went wrong");
    }
  };
  const copylink = (e) => {
    navigator.clipboard.writeText(e);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-7 items-center mt-5">
      <ShowUsers
        deleteUserFunc={deleteUserFunc}
        formik={formik}
        info={info}
        formikEdit={formikEdit}
        copylink={copylink}
      />
      <Create_New_Account formik={formik} createUser={createUser} />
      <Edit_Account formikEdit={formikEdit} />
    </div>
  );
}
