import { useState, useContext } from "react"
import styles from "../styles/MemberForm.module.css"
import { HiUserAdd } from "react-icons/hi"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AppContext from "../context/AppContext"

const Login = () => {
  const { setLoggedIn } = useContext(AppContext)
  const API_URL = "/api/users/login"

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    try {
      loginFunc()
      setLoggedIn(true)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const loginFunc = async () => {
    try {
      const userData = {
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
      toast.error("Giriş yapma işlemi başarısız :(")
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>
            <HiUserAdd /> Giriş Yap
          </h1>
        </div>
        <section className={styles.form}>
          <form onSubmit={onSubmit}>
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
              <button type="submit" className={styles.btn}>
                Giriş Yap
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
export default Login
