import { useState, useContext, useEffect } from "react"
import styles from "../styles/MemberForm.module.css"
import { HiUserAdd } from "react-icons/hi"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AppContext from "../context/AppContext"

const NewProduct = () => {
  const { loggedIn } = useContext(AppContext)
  const API_URL = "/api/products/"

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  })

  const { name, price, category } = formData

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      category: e.target.value,
    }))
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    try {
      newProductFunc()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login")
      toast.error("Önce giriş yapın!")
    } else {
      return
    }
  }, [loggedIn, navigate])

  const newProductFunc = async () => {
    const userData = { name, price, category }

    const token = JSON.parse(localStorage.getItem("user")).token

    if (
      userData.category === "meyve-sebze" ||
      userData.category === "kuru-gida" ||
      userData.category === "kahvaltilik" ||
      userData.category === "icecek"
    ) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.post(API_URL, userData, config)

        if (response.data) {
          toast.success("Ürün başarıyla eklendi")

          navigate(`/product/${response.data._id}`)
        }
      } catch (error) {
        console.log(error)
        toast.error("Ürün eklenemedi!")
      }
    } else {
      toast.error("Ürünün bilgilerini doğru biçimde giriniz!")
      return
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>
            <HiUserAdd /> Ürününü Sat
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
                placeholder="Ürünün Adı"
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="number"
                className={styles.formControl}
                id="price"
                name="price"
                value={price}
                placeholder="Ürünün fiyatı (kg / lt)"
                onChange={onChange}
              />
            </div>
            <div className={styles.formGroup}>
              <select
                name="category"
                id="category"
                value={category}
                onChange={handleChange}
              >
                <option value="">--Lütfen kategori seçin--</option>
                <option value="kahvaltilik" onChange={handleChange}>
                  Kahvaltılık
                </option>
                <option value="meyve-sebze" onChange={handleChange}>
                  Meyve & Sebze
                </option>
                <option value="kuru-gida" onChange={handleChange}>
                  Kuru Gıda
                </option>
                <option value="icecek" onChange={handleChange}>
                  İçecek
                </option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <button type="submit" className={styles.btn}>
                Ürün Ekle
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
export default NewProduct
