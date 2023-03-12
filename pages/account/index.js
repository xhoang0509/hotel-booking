import { useSession, signIn, signOut } from "next-auth/react"

export default function Account() {
    const { data: session } = useSession()
    return (
        <div>
            <div>
                Account
            </div>
            <div>Signed in as {JSON.stringify(session)}</div>
        </div>
    )
}