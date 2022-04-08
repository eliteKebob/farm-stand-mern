import { useState, useContext } from "react"
import styles from "../styles/MemberForm.module.css"
import { HiUserAdd } from "react-icons/hi"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import AppContext from "../context/AppContext"

const EditProfile = () => {
  const { setLoggedIn } = useContext(AppContext)
  const params = useParams()
  const API_URL = "/api/users/"

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  })

  const { name, address } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    try {
      updateFunc()
      navigate(`/user/${params.id}`)
      setLoggedIn(true)
    } catch (error) {
      console.log(error)
    }
  }

  const updateFunc = async () => {
    try {
      const userData = {
        name,
        address,
      }

      const response = await axios.put(API_URL + params.id, userData)

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }

      return response.data
    } catch (error) {
      console.log(error)
      toast.error("Profil güncelleme işlemi başarısız :(")
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>
            <HiUserAdd /> Profili Güncelle
          </h1>
        </div>
        <section className={styles.form}>
          <form onSubmit={onSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                className={styles.formControl}
                id="name"
                name="name"
                value={name}
                placeholder="Adın"
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                className={styles.formControl}
                id="address"
                name="address"
                value={address}
                placeholder="Adresin"
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <button type="submit" className={styles.btn}>
                Profili Düzenle
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
export default EditProfile
