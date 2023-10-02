import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

export function Chat({ toy, toyId }) {
    const [msg, setMsg] = useState('')
    const [msgs, setMsgs] = useState([])
    // const [topic, setTopic] = useState('Love')
    // const [isBotMode, setIsBotMode] = useState(false)

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedinUser)

    const botTimeoutRef = useRef()

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            // botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [])



    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    // function sendBotResponse() {
    //     // Handle case: send single bot response (debounce).
    //     botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
    //     botTimeoutRef.current = setTimeout(() => {
    //         setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
    //     }, 1250)
    // }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg }
        console.log('newMsg:', newMsg)
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg('')
    }

    function handleFormChange(ev) {
        const { value } = ev.target
        console.log('value:', value)
        setMsg(value) // Update the message text, not the entire message object
    }


    return (
        <section className="chat">
            <h2 className='chat-title'>Lets Chat about {toy.name}</h2>

            <form className='chat-form' onSubmit={sendMsg}>
                <input
                    type="text"
                    placeholder='Chat'
                    value={msg}
                    onChange={handleFormChange}
                    name="txt"
                    autoComplete="off"
                />
                <button className='chat-btn'>Send</button>
            </form>

            <ul className='chat-ul'>
                {msgs.map((msg, idx) => (<li className='chat-li' key={idx}>{msg.from}: {msg.txt}</li>))}
            </ul>
        </section>
    )
}