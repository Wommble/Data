import { Create_New_Account } from "../Create_Account/page";
import { Edit_Account } from "../Edit_Account/page";
import { Info } from "../Log_in/page";

export function ShowUsers(props) {
  return (
    <div className="flex flex-col gap-7 items-center mt-5">
      <div className="flex flex-col gap-3 rounded-3xl border-solid border border-[#5a5a5a] p-6">
        <h1>All users</h1>
        <hr></hr>
        {props.info?.map((user, index) => (
          <Info
            user={user}
            index={index}
            deleteUserFunc={props.deleteUserFunc}
            copylink={props.copylink}
            fixedId={props.fixedId}
          />
        ))}
      </div>
    </div>
  );
}
