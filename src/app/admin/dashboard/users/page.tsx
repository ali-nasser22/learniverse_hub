import {DataTable} from "@/app/admin/dashboard/users/_components/data-table";
import {columns} from "@/app/admin/dashboard/users/_components/columns";
import {getAllUsers} from "../../../../../queries/users";
import {Button} from "@/components/ui/button";


export default async function ManageUsers() {
    const users = await getAllUsers(true);
    return (
        <>
            <div className="container mx-auto p-10 relative">
                <Button className="absolute right-0 mx-10 my-5"><a href="/admin/dashboard/users/add">Add
                    Admin</a></Button>
                <DataTable columns={columns} data={users}/>
            </div>
        </>
    )
}