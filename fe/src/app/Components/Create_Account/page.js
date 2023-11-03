"use client";
export function Create_New_Account(props) {
  return (
    <form className="flex flex-col gap-4" onSubmit={props.formik.handleSubmit}>
      <div className="flex flex-col gap-1 items-center pt-3">
        <h1>To create</h1>
        <hr className="w-[400px]"></hr>
      </div>
      <div className="flex flex-col gap-3">
        <input
          onChange={props.formik.handleChange("createNewUsername")}
          value={props.formik.values.createNewUsername}
          type="string"
          variant={props.formik.errors.createNewUsername ? "error" : "default"}
          className="w-[400px] rounded-xl p-1 pl-2"
          placeholder="Need name"></input>
        {props.formik.errors.createNewUsername && (
          <p className="text-gray-400 font-xs">
            {props.formik.errors.createNewUsername}
          </p>
        )}
        <input
          onChange={props.formik.handleChange("age")}
          value={props.formik.values.age}
          variant={props.formik.errors.age ? "error" : "default"}
          className="w-[400px] rounded-xl p-1 pl-2"
          placeholder="Need age"></input>
        {props.formik.errors.age && (
          <p className="text-gray-400 font-xs">{props.formik.errors.age}</p>
        )}
        <input
          onChange={props.formik.handleChange("password")}
          value={props.formik.values.password}
          variant={props.formik.errors.password ? "error" : "default"}
          className="w-[400px] rounded-xl p-1 pl-2"
          placeholder="Need password"></input>
        {props.formik.errors.password && (
          <p className="text-gray-400 font-xs">
            {props.formik.errors.password}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-200 p-1 rounded-3xl border-solid border border-[#5a5a5a] ">
        Create user
      </button>
    </form>
  );
}
