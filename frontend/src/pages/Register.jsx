import { useState, useContext } from "react"
import styles from "../styles/MemberForm.module.css"
import { HiUserAdd } from "react-icons/hi"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AppContext from "../context/AppContext"

const Register = () => {
  const { setLoggedIn } = useContext(AppContext)
  const API_URL = "/api/users/"

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error("Şifreler eşleşmiyor!")
    } else {
      registerFunc()
      setLoggedIn(true)
      navigate("/")
    }
  }

  const registerFunc = async () => {
    try {
      const userData = {
        name,
        email,
        password,
      }

      const response = await axios.post(API_URL, userData)

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }

      return response.data
    } catch (error) {
      console.log(error)
      toast.error("Kayıt olma işlemi başarısız :(")
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>
            <HiUserAdd /> Kayıt Ol
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
                type="email"
                className={styles.formControl}
                id="email"
                name="email"
                value={email}
                placeholder="E-postan"
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                className={styles.formControl}
                id="password"
                name="password"
                value={password}
                placeholder="Şifren"
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                className={styles.formControl}
                id="password2"
                name="password2"
                value={password2}
                placeholder="Şifreni doğrula"
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <button type="submit" className={styles.btn}>
                Kayıt Ol
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
export default Register
