"use client";
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
const validationSchema = yup.object({
  password: yup
    .string()
    .max(20)
    .min(2)
    .required(`You cannot leave the password empty`),
});

export const Info = ({ user, index, deleteUserFunc, copylink }) => {
  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      LogIn(value.password);
    },
  });
  const [privInfo, showPrivInfo] = useState();
  const [loging, setsLoging] = useState();

  const LogIn = async (password) => {
    const res = await axios.post(`http://localhost:8080/login`, {
      username: user.username,
      password: password,
    });
    if (res.data.status == true) {
      setsLoging(true);
    } else {
      formik.setFieldError("password", "Incorrect password");
    }
  };

  return (
    <div className="flex flex-row pr-2">
      <div className="flex flex-col gap-3 w-[500px] ">
        <div className="flex flex-row gap-3">
          <p>username: {user.username}</p>
          <button
            className="underline"
            onClick={() => showPrivInfo((privInfo) => !privInfo)}>
            Show info
          </button>
        </div>

        {privInfo && !loging && (
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-row gap-3 items-center">
            <div className="flex flex-col gap-3">
              <input
                className="w-[400px] rounded-xl p-1 pl-2"
                onChange={formik.handleChange("password")}
                value={formik.values.password}
                variant={formik.errors.password ? "error" : "default"}
              />
              {formik.errors.password && <p>{formik.errors.password}</p>}
            </div>

            <button type="submit" onClick={formik.handleSubmit}>
              Log in
            </button>
          </form>
        )}
        {privInfo && loging && (
          <PrivInfo copylink={copylink} user={user} index={index} />
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={() => deleteUserFunc(user.id)}
          className="bg-blue-200 p-1 rounded-3xl border-solid border border-[#5a5a5a] p-1">
          Delete
        </button>
      </div>
    </div>
  );
};

const PrivInfo = ({ user, index, copylink }) => {
  return (
    <div
      className="flex flex-col rounded-3xl border-solid border border-[#5a5a5a] w-[300px] p-4"
      key={index}>
      <div className="flex flex-row gap-3 items-center ">
        <p>id: {user.id}</p>
        <button onClick={() => copylink(user.id)} className="underline">
          Copy
        </button>
      </div>
      <p>age: {user.age}</p>
    </div>
  );
};
