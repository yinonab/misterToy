import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from "react-redux"


export function ToyDetails() {
    const [msg, setMsg] = useState(utilService.getEmptyMsg())
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    useEffect(() => {
        loadToy()
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
    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
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

    async function onRemoveMsg(msgId) {
        const removedMsgId = await toyService.removeMsg(toy._id, msgId)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
        }))
        showSuccessMsg('Msg removed!')
    }
    const { txt } = msg
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
                    value={txt}
                    placeholder="Enter Your Message"
                    onChange={handleMsgChange}
                    required
                    autoFocus
                />
                <button>Send</button>
            </form>
            <h5 className="toy-created-date">Created Date: {toy.createdAt}</h5>
            <h5 className="toy-labels">Labels: {toy.labels.join(',')}</h5>
            <h1 className="toy-emoji">{toy.icon}</h1>
            <h5 className="toy-description-heading">Description</h5>
            <p className="toy-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link className="back-link" to="/toy">Back</Link>
        </section>
    )
}

