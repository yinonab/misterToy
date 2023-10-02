import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from "react-redux"
import { reviewService } from "../services/review.service.js"
import { Chat } from "./Chat.jsx"

export function ToyDetails() {
    const [msg, setMsg] = useState(utilService.getEmptyMsg())
    const [review, setReview] = useState(utilService.getEmptyReview())
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        loadToy()
        loadReviews()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }
    async function loadReviews() {
        try {
            // Create a filter object with both aboutToyId and additional filters
            const filter = { name: 'exampleFilter', sort: 'exampleSort' };

            // Fetch reviews based on aboutToyId and additional filters
            const reviews = await reviewService.query({ aboutToyId: toyId });
            setReviews(reviews);
        } catch (err) {
            console.log('Had issues loading reviews', err);
            showErrorMsg('Cannot load reviews');
        }
    }


    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
    }

    function handleReviewChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setReview((review) => ({ ...review, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        const savedMsg = await toyService.addMsg(toy._id, msg.txt)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: [...(prevToy.msgs || []), savedMsg],
        }))
        setMsg(utilService.getEmptyMsg())
        showSuccessMsg('Msg saved!')
    }

    async function onSaveReview(ev) {
        ev.preventDefault();
        const savedReview = await reviewService.add({ txt: review.txt, aboutToyId: toy._id });
        // Update the reviews state with the new review
        setReviews((prevReviews) => [...prevReviews, savedReview]);
        setReview(utilService.getEmptyReview());
        showSuccessMsg('Review saved!');
        console.log('savedReview:', savedReview)
    }


    async function onRemoveMsg(msgId) {
        const removedMsgId = await toyService.removeMsg(toy._id, msgId)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
        }))
        showSuccessMsg('Msg removed!')
    }

    async function onRemoveReview(reviewId) {
        try {
            const removedReviewId = await reviewService.remove(reviewId);

            // Update the reviews state by filtering out the removed review
            setReviews((prevReviews) => prevReviews.filter((review) => review._id !== removedReviewId));
            const reviews = await reviewService.query({ aboutToyId: toyId });
            console.log('reviews:', reviews)
            setReviews(reviews);
            showSuccessMsg('Review removed!');
        } catch (err) {
            console.error('Error removing review:', err);
            showErrorMsg('Failed to remove review');
        }
    }




    const { txtM } = msg
    // const { txtR } = review
    if (!toy) return <div className="center-spinner"> <div className="lds-facebook"><div></div><div></div><div></div></div></div>

    return (
        <section className="toy-details">
            <h1 className="toy-name-details">Toy Name : {toy.name}</h1>
            <h5 className="toy-price-details">Price: ${toy.price}</h5>
            <ul>
                {toy.msgs &&
                    toy.msgs.map((msg) => (
                        <li key={msg.id}>
                            By: {msg.by ? msg.by.fullname : 'Unknown User'}, {msg.txt}
                            <button type="button" onClick={() => onRemoveMsg(msg.id)}>
                                ❌
                            </button>
                        </li>
                    ))}
            </ul>

            <form className="login-form" onSubmit={onSaveMsg}>
                <input
                    type="text"
                    name="txt"
                    value={txtM}
                    placeholder="Enter Your Message"
                    onChange={handleMsgChange}
                    required
                    autoFocus
                />
                <button>Send</button>
            </form>

            <h5 className="toy-description-heading">Reviews</h5>
            <ul>
                {reviews.map((review) => (
                    <li key={review._id}>
                        By: {review.byUser.fullname}, {review.txt}
                        <button type="button" onClick={() => onRemoveReview(review._id)}>
                            ❌
                        </button>
                    </li>
                ))}
            </ul>


            <form className="login-form" onSubmit={onSaveReview}>
                <input
                    type="text"
                    name="txt"
                    value={review.txt}
                    placeholder="Write a Review"
                    onChange={handleReviewChange}
                    required
                />
                <button>Submit Review</button>
            </form>

            <h5 className="toy-created-date">Created Date: {toy.createdAt}</h5>
            <h5 className="toy-labels">Labels: {toy.labels.join(',')}</h5>
            <h1 className="toy-emoji">{toy.icon}</h1>
            <h5 className="toy-description-heading">Description</h5>
            <p className="toy-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Chat toy={toy} toyId={toyId}/>
            <Link className="back-link" to="/toy">Back</Link>
        </section>
    )
}
