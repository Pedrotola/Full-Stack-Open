const Notification  = ({ notificationMessage }) => {
  if (notificationMessage === null) {
    return null
  }
  return(
    <div className={notificationMessage.type}>
      { notificationMessage.text }
    </div>
  )
}

export default Notification