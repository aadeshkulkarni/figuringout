import TextAreaField from "../TextAreaField";
import { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfile";
import Spinner from "../Spinner";

const UserAboutTab = () => {
  const { currentUser, editingDetails, editUserDetails } =
    useContext(UserProfileContext);
  const [editDetails, setEditDetails] = useState<string>(currentUser.details);

  const submitUserDetails = () => {
    editUserDetails(editDetails, true);
  };
  return (
    <div>
      <TextAreaField
        label="Tell the world about yourself"
        placeholder=""
        value={editDetails}
        onChange={(event) => {
          setEditDetails(event.target.value);
        }}
      />
      {editingDetails ? (
        <Spinner className="w-4 h-4" />
      ) : (
        <button
          type="button"
          onClick={submitUserDetails}
          className="cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
        >
          Edit Info
        </button>
      )}
    </div>
  );
};

export default UserAboutTab;
