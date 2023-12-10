'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function Page() {
    const [notes, setNotes] = useState()
    const supabase = createClientComponentClient()

    // console.log(notes)

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('notes').select()
            setNotes(data)
        }

        getData()
    }, [])

    return notes ? <div style={{ marginTop: "100px" }}>
        <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div> : <p>Loading todos...</p>
}