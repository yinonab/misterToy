import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadUser } from "../store/actions/user.actions"
import { showErrorMsg } from "../services/event-bus.service"
import { reviewService } from "../services/review.service"

export function UserProfile() {
    const params = useParams()
    const user = useSelector(storeState => storeState.userModule.watchedUser)
    const [reviews, setReviews] = useState([])


    console.log('user', params);
    useEffect(() => {
        loadUser(params.id)
        loadReviews()
    }, [params.id])


    async function loadReviews() {
        try {
            // Create a filter object with both aboutToyId and additional filters
            // const filter = { name: 'exampleFilter', sort: 'exampleSort' };

            // Fetch reviews based on aboutToyId and additional filters
            const reviews = await reviewService.query({ byUserId: params.id });
            console.log('reviews:', reviews)
            setReviews(reviews);
        } catch (err) {
            console.log('Had issues loading reviews', err);
            showErrorMsg('Cannot load reviews');
        }
    }

    return (
        <section className="user-profile">
            <h1>User Profile</h1>
            {user && <div>
                <h3>
                    {user.fullname}
                </h3>
                <img src={user.imgUrl} alt="user Img" />
                <ul>
                    {reviews.map((review) => (
                        <li key={review._id}>
                            By: {review.byUser.fullname}, {review.txt}
                        </li>
                    ))}
                </ul>
            </div>}

        </section>
    )
}