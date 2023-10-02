import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadUser } from "../store/actions/user.actions"

export function UserProfile() {
    const params = useParams()
    const user = useSelector(storeState => storeState.userModule.watchedUser)

    useEffect(() => {
        loadUser(params.id)
    }, [params.id])
console.log('user', user);

    return (
        <section className="user-profile">
            <h1>User Profile</h1>
            {user && <div>
                <h3>
                    {user.fullname}
                </h3>
                <pre>
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>}

        </section>
    )
}