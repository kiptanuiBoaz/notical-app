import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loading, Notify } from "notiflix";

export const disconnectNotion = async (user_id, email) => {
    const supabase = createClientComponentClient();
    try {
        Loading.dots({ svgColor: '#0276AA', backgroundColor: 'rgba(0,0,0,0.4)', });
        const { error, data } = await supabase.from('users').upsert({
            user_id,
            email,
            notion_secret_key: null,
            databases_all: [],
            last_database_item_ids: [],
            recently_synced_notion_items: [],
            selected_databases_ids: [],
            active: false,

        })
        if (data) console.log(data)
        if (error) throw error
        Notify.success("Notion Disconnected Successfully")

    } catch (error) {
        console.error(error.message)
    } finally {
        Loading.remove();
    }
}