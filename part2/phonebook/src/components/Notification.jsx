const Notification = ({ messages }) =>{
    if (messages.text === null) {
        return null
    }

    return(
        <div className={messages.type}>
            {messages.text}
        </div>
    )
}

export default Notification