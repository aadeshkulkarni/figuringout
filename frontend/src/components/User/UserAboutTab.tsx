import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { UserProfileContext } from './UserProfile';
import Spinner from '../Spinner';
import TextField from '../TextField';
import Avatar from '../Avatar';
import { toast } from 'react-toastify';
import { FF_IMAGE_UPLOADS } from '../../config';

const UserAboutTab = () => {
  const { currentUser, editingDetails, isAuthorizedUser, editUserDetails } = useContext(UserProfileContext);
  const [editDetails, setEditDetails] = useState<string>(currentUser.details);
  const [editName, setEditName] = useState<string>(currentUser.name);
  const [editPicture, setEditPicture] = useState<File | null>(null);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<any>();

  useEffect(() => {
    if (!editPicture) {
      setPreview(undefined);
      return;
    }
    const objectUrl = FF_IMAGE_UPLOADS ? URL.createObjectURL(editPicture) : '';
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [editPicture]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (editPicture) {
      const formData = new FormData();
      formData.append('name', editName);
      formData.append('detail', editDetails);
      formData.append('file', editPicture);

      try {
        await editUserDetails?.(formData);
        toast.info('Profile has been updated successfully.');
        // setMessage('Image uploaded successfully');
      } catch (error) {
        // setMessage('Failed to upload image');
      }
    } else {
      // setMessage('Please select a file');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {!isAuthorizedUser ? (
        <div className="p-2">
          <div className="text-lg py-2 font-bold">{editName}</div>
          <div className="font-light py-2">{editDetails}</div>
        </div>
      ) : (
        <>
          {FF_IMAGE_UPLOADS && (
            <div>
              <label>Photo</label>
              <div className="flex py-4">
                <div className="flex justify-start items-start gap-4">
                  <Avatar size="large" name={editName} imageSrc={preview || currentUser.profilePic} />
                </div>
                <div className="mx-4 sm:w-fit w-[66%]">
                  <div>
                    <button
                      type="button"
                      className="text-green-700 py-2 border-none"
                      onClick={() => inputFile?.current?.click()}
                    >
                      Update
                    </button>
                    <button
                      disabled={!editPicture}
                      type="button"
                      onClick={() => setEditPicture(null)}
                      className="text-red-700 px-4 py-2 border-none disabled:opacity-50"
                    >
                      Remove
                    </button>
                    <input
                      type="file"
                      ref={inputFile}
                      className="invisible"
                      onChange={(e) => e.target.files != null && setEditPicture(e?.target?.files[0])}
                    />
                  </div>
                  <label className="text-xs">
                    Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                  </label>
                </div>
              </div>
            </div>
          )}
          <TextField
            label="Name"
            placeholder=""
            value={editName}
            onChange={(event) => {
              setEditName(event.target.value);
            }}
            suffix="Appears on your Profile page, as your byline, and in your responses."
          />
          <TextField
            label="Bio"
            placeholder=""
            value={editDetails}
            onChange={(event) => {
              setEditDetails(event.target.value);
            }}
            suffix="Appears on your Profile and next to your stories."
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mt-4"
          >
            {editingDetails ? <Spinner className="w-4 h-4" /> : <div>Save</div>}
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="ml-4 cursor-pointer focus:outline-none text-green-700 border border-green-700 hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mt-4"
          >
            {editingDetails ? <Spinner className="w-4 h-4" /> : <div>Cancel</div>}
          </button>
        </>
      )}
    </form>
  );
};

export default UserAboutTab;
