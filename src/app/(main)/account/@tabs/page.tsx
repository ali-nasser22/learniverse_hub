import { auth } from "../../../../../auth";
import { getUserByEmail } from "../../../../../queries/users";
import PersonalDetails from "../_component/personal-details";
import { IUser } from "../../../../../model/user-model";
import ContactInfo from "../_component/contact-info";
import ChangePassword from "../_component/change-password";

async function Profile() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);

  return (
    <>
      <PersonalDetails user={user as IUser} />
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white mt-[30px] flex flex-col md:flex-row gap-5">
        <div className="flex-1">
          <ContactInfo user={user as IUser} />
        </div>
        <div className="flex-1">
          <ChangePassword />
        </div>
      </div>
    </>
  );
}

export default Profile;
