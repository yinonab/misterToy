import { useState, useEffect } from 'react'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { SOCKET_EVENT_REVIEW_ADDED, socketService } from '../services/socket.service'

// import { addReview, getActionAddReview, loadReviews, removeReview } from '../store/actions/review.actions'
// import { loadUsers } from '../store/actions/user.actions'
import { reviewService } from '../services/review.service'

export function ReviewExplore() {
    // const users = useSelector(storeState => storeState.userModule.users)
    // const loggedInUser = useSelector(storeState => storeState.userModule.user)
    // const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const [reviews, setReviews] = useState([])


    const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutToyId: '' })

    // const dispatch = useDispatch()

    useEffect(() => {
        loadReviews()
        // loadUsers()

        // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
        //     console.log('GOT from socket', review)
        //     dispatch(getActionAddReview(review))
        // })

        // return () => {
        //     socketService.off(SOCKET_EVENT_REVIEW_ADDED)
        // }
    }, [])
    async function loadReviews() {
        try {
            // Create a filter object with both aboutToyId and additional filters
            const filter = { name: 'exampleFilter', sort: 'exampleSort' };

            // Fetch reviews based on aboutToyId and additional filters
            const reviews = await reviewService.query();
            console.log('reviews:', reviews)
            setReviews(reviews);
            showSuccessMsg('Reviews load Successfully');
        } catch (err) {
            console.log('Had issues loading reviews', err);
            showErrorMsg('Cannot load reviews');
        }
    }



    return (
        <div className="review-explore">
            <h1>Reviews and Gossip</h1>
            <h5 className="toy-description-heading">Reviews</h5>
            <ul>
                {reviews.map((review) => (
                    <li key={review._id}>
                        By: {review.byUser.fullname}, {review.txt}
                    </li>
                ))}
            </ul>
        </div>
    )
}