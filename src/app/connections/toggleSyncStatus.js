import { Confirm, Notify, Report } from "notiflix";
import { updateActiveField } from "./libs/updateActiveField";
import { getUser } from "./libs/getUser";

export const toggleSyncStatus = async (user_id, syncStatus, full_name, stripeConnection, router, notionConnection, googleConnection, email, setSyncStatus) => {
    const { selected_databases_ids } = await getUser(user_id);
    Confirm.show(
        `${syncStatus ? "Stop" : "Start "} synchronization ?`,
        `${full_name.split(" ")[0]},${syncStatus
            ? "This will stop all your current Notion Databases synchronization to Google Calendar"
            : "this operation will synchronize all your selected Notion databases with your Google Calendar "
        }`,
        'Continue',
        'Cancel',
        async () => {
            if (stripeConnection) {
                Notify.success("Successfully created stripe connection")
            } else {
                Notify.failure(" Please add opt into a subscription ")
                return router.push("/subscriptions")
            }


            if (notionConnection) {
                Notify.success("Successfully created Notion connection")
            } else {
                return Notify.failure(" Please create a Notion Connection ")
            }

            if (!syncStatus) {
                if (selected_databases_ids.length > 0) {
                    Notify.success("Connected atleast one notion database")
                } else {
                    return Report.warning(
                        'No Database Selection',
                        'Please Connect Atleast one Notion Database before attempting to sync again',
                        'Okay',
                    );
                }
            }


            if (!syncStatus) {
                if (googleConnection) {
                    Notify.success("Successfully created Google Calendar connection and try agin")
                } else {
                    return Report.warning(
                        'Google Calendar not Connected!',
                        'Please create a Google Calendar  Connection',
                        'Okay',
                    );
                }
            }


            await updateActiveField(user_id, email, !syncStatus);
            Notify.success(!syncStatus ? "Successfully synced  Google Calendar and Notion" : "Succesfully stopped sync")
            setSyncStatus(!syncStatus);
        },
        () => {

        },
        {
        },
    );


}