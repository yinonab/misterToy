import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        loadToy()
    },[toyId])

    function loadToy(){
        toyService.getById(toyId)
        .then((toy)=> setToy(toy))
        .catch((err) => {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        })
    }
    if (!toy) return <div className="center-spinner"> <div className="lds-facebook"><div></div><div></div><div></div></div></div>

    console.log('toy.labels', toy.labels);
    return (
        <section className="toy-details">
        <h1 className="toy-name-details">Toy Name : {toy.name}</h1>
        <h5 className="toy-price-details">Price: ${toy.price}</h5>
        <h5 className="toy-created-date">Created Date: {toy.createdAt}</h5>
        <h5 className="toy-labels">Labels: {toy.labels.join(',')}</h5>
        <p className="toy-emoji">🪀🧸</p>
        <h5 className="toy-description-heading">Description</h5>
        <p className="toy-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        <Link className="back-link" to="/toy">Back</Link>
    </section>
    )
}

