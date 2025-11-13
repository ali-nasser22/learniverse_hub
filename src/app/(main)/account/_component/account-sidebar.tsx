import Image from "next/image";
import {auth} from "../../../../../auth";
import {getUserByEmail} from "../../../../../queries/users";
import Menu from "./account-menu";
import {redirect} from "next/navigation";

export default async function AccountSidebar() {
    const session = await auth();
    if (!session?.user) {
        redirect("/login");
    }
    const user = await getUserByEmail(session?.user?.email as string);
    return (
        <div className="lg:w-1/4 md:px-3">
            <div className="relative">
                <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white">
                    <div className="profile-pic text-center mb-5">
                        <input
                            id="pro-img"
                            name="profile-image"
                            type="file"
                            className="hidden"
                        />
                        <div>
                            <div className="relative size-28 mx-auto">
                                <Image
                                    src='/assets/images/default-avatar.png'
                                    className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                                    id="profile-banner"
                                    alt="profile-image"
                                    width={112}
                                    height={112}
                                />
                                <label
                                    className="absolute inset-0 cursor-pointer"
                                    htmlFor="pro-img"
                                />
                            </div>
                            <div className="mt-4">
                                <h5 className="text-lg font-semibold">
                                    {user?.firstName} {user?.lastName}
                                </h5>
                                <p className="text-slate-600 font-semibold my-0.5">
                                    {user?.email}
                                </p>
                                <p className="text-slate-700 font-mono my-1">
                                    {user?.role.toLocaleLowerCase()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-700">
                        <Menu/>
                    </div>
                </div>
            </div>
        </div>
    );
}
