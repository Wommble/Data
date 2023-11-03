export function Edit_Account(props) {
  return (
    <form
      className="flex flex-col gap-1 items-center pt-3"
      onSubmit={props.formikEdit.handleSubmit}>
      <h1>To edit</h1>
      <hr className="w-[400px]"></hr>
      <div className="flex flex-col gap-3">
        <input
          onChange={props.formikEdit.handleChange("correctID")}
          value={props.formikEdit.values.correctID}
          type="string"
          variant={props.formikEdit.errors.correctID ? "error" : "default"}
          className="w-[400px] rounded-xl p-1 pl-2"
          placeholder="Need id"></input>
        {props.formikEdit.errors.correctID && (
          <p className="text-gray-400 font-xs">
            {props.formikEdit.errors.correctID}
          </p>
        )}
        <input
          onChange={props.formikEdit.handleChange("editPassword")}
          value={props.formikEdit.values.editPassword}
          type="string"
          variant={props.formikEdit.errors.editPassword ? "error" : "default"}
          className="w-[400px] rounded-xl p-1 pl-2"
          placeholder="Enter password"></input>
        {props.formikEdit.errors.editPassword && (
          <p className="text-gray-400 font-xs">
            {props.formikEdit.errors.editPassword}
          </p>
        )}
        <input
          onChange={props.formikEdit.handleChange("editName")}
          value={props.formikEdit.values.editName}
          type="string"
          variant={props.formikEdit.errors.editName ? "error" : "default"}
          className="w-[400px] rounded-xl p-1 pl-2"
          placeholder="Need username"></input>
        {props.formikEdit.errors.editName && (
          <p className="text-gray-400 font-xs">
            {props.formikEdit.errors.editName}
          </p>
        )}
        <input
          onChange={props.formikEdit.handleChange("editAge")}
          value={props.formikEdit.values.editAge}
          type="string"
          variant={props.formikEdit.errors.editAge ? "error" : "default"}
          className="w-[400px] rounded-xl p-1 pl-2"
          placeholder="Need age"></input>
        {props.formikEdit.errors.editAge && (
          <p className="text-gray-400 font-xs">
            {props.formikEdit.errors.editAge}
          </p>
        )}
        <button className="bg-blue-200 p-1 rounded-3xl border-solid border border-[#5a5a5a] ">
          Edit a users info
        </button>
      </div>
    </form>
  );
}
