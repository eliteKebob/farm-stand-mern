import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom"
import AppContext from "../context/AppContext"
import Spinner from "../components/Spinner"
import styles from "../styles/Profile.module.css"
import avatar from "../assets/avatar.png"

const Profile = () => {
  const [userDataObj, setUserDataObj] = useState(null)
  const { loading, setLoading } = useContext(AppContext)

  const params = useParams()

  const API_URL = `/api/users/`

  const fetchUser = async () => {
    setLoading(true)
    try {
      setLoading(false)
      const response = await axios.get(API_URL + params.id)
      setUserDataObj(response.data)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line
  }, [params.id])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className={styles.container}>
      <div className={styles.userCard}>
        <div className={styles.userImg}>
          <img src={avatar} alt="img" />
        </div>
        <div className={styles.userInfo}>
          <h1>{userDataObj?.name}</h1>
          <h3>{userDataObj?.email}</h3>
          <div className={styles.address}>
            {userDataObj?.address ? (
              userDataObj?.address
            ) : (
              <Link to={`/user/${userDataObj?._id}/edit`}>
                Henüz bir adres eklenmemiş. Adresinizi eklemek için tıklayın.
              </Link>
            )}
          </div>
          <span className={styles.isBuyer}>
            {userDataObj?.isBuyer === true ? "Alıcı" : "Satıcı"}
          </span>
        </div>
        <div className={styles.userButtons}>
          <div className={styles.edit}>
            <Link to={`/user/${userDataObj?._id}/edit`}>Profili Düzenle</Link>
          </div>
          <div className={styles.newProduct}>
            <Link to="/sell-product">Ürününü Sat</Link>
          </div>
          <div className={styles.order}>
            <Link to={`/orders/${userDataObj?._id}`}>Siparişlerim</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
