import { useNotification } from "./NotificationContext"

const Notification  = () => {

  const notificationMessage = useNotification()

  if (notificationMessage === null) return null
  
  return(
    <div className={notificationMessage.type}>
      { notificationMessage.message }
    </div>
  )
}

export default Notification