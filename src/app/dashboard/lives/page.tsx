import {columns} from "./_components/columns";
import {DataTable} from "./_components/data-table";
import {getAllLivesForUser} from "../../../../queries/lives";
import {getLoggedInUser} from "@/lib/loggedin-user";

const LivesPage = async () => {
    const loggedInUser = await getLoggedInUser();
    const myLives = await getAllLivesForUser(loggedInUser?.id);
    const livesData = myLives.map((live) => {
        const scheduleDate = new Date(live.schedule);

        return {
            id: live._id.toString(),
            title: live.title,
            date: scheduleDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }),
            time: scheduleDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }),
            liveUrl: live.liveUrl,
        }
    });
    return (
        <div className="p-6">
            <DataTable columns={columns} data={livesData}/>
        </div>
    );
};

export default LivesPage;
