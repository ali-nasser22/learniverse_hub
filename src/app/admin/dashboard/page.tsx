import {getLoggedInUser} from "@/lib/loggedin-user";
import {redirect} from "next/navigation";

export default async function AdminDashboard() {
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser) {
        return redirect("/login");
    }
    if (loggedInUser.role !== "ADMIN") {
        return redirect("/");
    }
    return (
        <>
            <div className="p-6">
                <h1>Hello, {loggedInUser?.firstName} {loggedInUser?.lastName}</h1>
            </div>
        </>
    )
}