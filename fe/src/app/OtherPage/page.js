"use client";
import axios from "axios";
import { useState, useEffect } from "react";
// import { ShowUsers } from "./Components/ShowUsers/page";
import { useFormik } from "formik";
import * as yup from "yup";
import { Create_New_Account } from "../Components/Create_Account/page";
import { Edit_Account } from "../Components/Edit_Account/page";
import { ShowUsers } from "../Components/ShowUsers/page";
// import { MainFunctions } from "./Components/MainFunctions/page";

const validationSchema = yup.object({
  createNewUsername: yup
    .string()
    .max(20)
    .min(2)
    .required(`You must fill in the the username to make a new acccount`),
  age: yup
    .string()
    .max(20)
    .min(2)
    .required(`You must fill in the the age to make a new acccount`),
  password: yup
    .string()
    .max(20)
    .min(8)
    .required(`You must make a password to make a new acccount`),
});

const validationEdit = yup.object({
  correctID: yup
    .string()
    .max(20)
    .min(13)
    .required(`You must fill in the the username to make a new acccount`),
  editName: yup
    .string()
    .max(20)
    .min(2)
    .required(`You must fill in the the username to make a new acccount`),
  editAge: yup
    .string()
    .max(20)
    .min(2)
    .required(`You must fill in the the age to make a new acccount`),
  editPassword: yup
    .string()
    .max(20)
    .min(8)
    .required(`You must make a password to make a new acccount`),
});

export default function LoggedIn() {
  const [info, setInfo] = useState();

  const formik = useFormik({
    initialValues: { createNewUsername: "", age: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      createUser(value);
    },
  });
  const formikEdit = useFormik({
    initialValues: {
      editName: "",
      editAge: "",
      correctID: "",
      editPassword: "",
    },
    validationSchema: validationEdit,
    onSubmit: async (value) => {
      window.localStorage.setItem("uidEdit", value.correctID);
      editUser(value);
    },
  });

  const fetchData = async () => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((res) => setInfo(res.data));
  };
  const deleteUserFunc = async (id) => {
    const uid = window.localStorage.getItem("uid");
    if (typeof id == "string" && uid == id) {
      const res = await axios
        .delete(`http://localhost:8080/user/${id}`, {
          method: "DELETE",
          headers: {
            token: uid,
          },
        })
        .then((res) => setInfo(res.data.data));
    } else alert("Please login before trying to delete an account");
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
    const uid = window.localStorage.getItem("uidEdit");
    console.log(typeof uid, typeof value.correctID);
    if (
      !formikEdit.errors.correctID &&
      !formikEdit.errors.editPassword &&
      uid == value.correctID
    ) {
      const res = await axios.patch(
        `http://localhost:8080/user/${value.correctID}`,
        {
          username: value.editName,
          age: value.editAge,
          password: value.editPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: uid,
          },
        }
      );
      console.log("yep");
      if (res.data.status == "success") {
        console.log("success");
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
    // <MainFunctions formikEdit={formikEdit} formik={formik} />
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
