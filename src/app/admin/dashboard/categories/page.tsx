import {Button} from "@/components/ui/button";
import {DataTable} from "@/app/admin/dashboard/categories/_components/data-table";
import {columns} from "@/app/admin/dashboard/categories/_components/columns";
import {getCategoryList} from "../../../../../queries/categories";

export default async function CategoriesPage() {
    const cats = await getCategoryList();
    return (
        <>
            <div className="container mx-auto p-10 relative">
                <Button className="absolute right-0 mx-10 my-5"><a href="/admin/dashboard/categories/add">Add
                    Category</a></Button>
                <DataTable columns={columns} data={cats}/>
            </div>
        </>
    )
}