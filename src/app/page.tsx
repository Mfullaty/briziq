import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import DrawerTest from './DrawerTest'

export default async function Page() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { data: todos } = await supabase.from('todos').select()

    return (
        <div>
            <ul>
                {todos?.map((todo) => (
                    <li key={todo.id}>{todo.name}</li>
                ))}
            </ul>
            <DrawerTest />
        </div>
    )
}