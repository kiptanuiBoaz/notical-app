import { Confirm, Notify, Report } from "notiflix";
import { updateActiveField } from "../supabase/updateActiveField";
import { getUserProfile } from "../supabase/getUserProfile";

export const toggleSyncStatus = async (user_id, syncStatus, full_name, stripeSubscriptionStatus, router, notionConnection, googleConnection, email, setSyncStatus, setLastSync) => {

    Confirm.show(
        `${syncStatus ? "Stop" : "Start "} synchronization ?`,
        `${full_name.split(" ")[0]},${syncStatus
            ? "This will stop all your current Notion Databases synchronization to Google Calendar"
            : "this operation will synchronize all your selected Notion databases with your Google Calendar "
        }`,
        'Continue',
        'Cancel',
        async () => {
            const { selected_databases_ids } = await getUserProfile(user_id);
            if (!stripeSubscriptionStatus) {
                Notify.failure(" Please add opt into a subscription ")
                return router.push("/subscriptions")
            }

            if (!notionConnection) return Notify.failure(" Please create a Notion Connection ");

            if (!syncStatus && !selected_databases_ids.length > 0) return Report.warning(
                'No Database Selection',
                'Please Connect Atleast one Notion Database before attempting to sync again',
                'Okay',
            );

            if (!syncStatus && !googleConnection) return Report.warning(
                'Google Calendar not Connected!',
                'Please create a Google Calendar  Connection',
                'Okay',
            );


            await updateActiveField(user_id, email, !syncStatus);
            const { notion_last_poll } = await getUserProfile(user_id);
            setSyncStatus(!syncStatus);
            setLastSync(notion_last_poll);
            Notify.success(!syncStatus ? "Successfully synced  Google Calendar and Notion" : "Succesfully stopped sync")
        },
        () => { },
        {
            titleFontSize: "21px",
            messageFontSize: "17px",
            buttonsFontSize: "19px",
            width: "400px",
            titleColor: "#0276AA",
            okButtonBackground: "#0276AA",
        },
    );


}