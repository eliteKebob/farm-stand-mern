import { useContext, useState, useEffect } from "react"
import AppContext from "../context/AppContext"
import styles from "../styles/Cart.module.css"
import CartProduct from "../components/CartProduct"
import {
  FaWeightHanging,
  FaWeight,
  FaMoneyBillAlt,
  FaMoneyCheck,
} from "react-icons/fa"
import CategoryNavigate from "../components/CategoryNavigate"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import logo from "../assets/farmshop.png"

const Cart = () => {
  const { cart, setCart } = useContext(AppContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [shippingPrice, setShippingPrice] = useState(0)

  const navigate = useNavigate()

  const API_URL = `/api/orders/`

  useEffect(() => {
    setTotalPrice(cart?.reduce((acc, item) => acc + item.price, 0).toFixed(2))
  }, [cart])

  useEffect(() => {
    setShippingPrice(cart?.length * 3 + 10)
  }, [cart])

  const newOrderFunc = async () => {
    const orderItems = cart
    const token = JSON.parse(localStorage.getItem("user")).token
    const shippingAddress = JSON.parse(localStorage.getItem("user")).address

    const userData = { orderItems, shippingAddress, totalPrice }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.post(API_URL, userData, config)
      console.log(response.data)

      if (response.data) {
        toast.success("Sipariş başarıyla oluşturuldu!")

        navigate(`/order/${response.data._id}`)
      }
    } catch (error) {
      toast.error("Sipariş verilirken bir hata oluştu!")
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      newOrderFunc()
      setCart([])
    } catch (error) {
      console.log(error)
    }
  }

  if (cart.length < 1) {
    return (
      <>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <h1>Sepetiniz Boş</h1>
          <h3>ALIŞVERİŞE ŞİMDİ BAŞLAYIN</h3>
          <CategoryNavigate />
        </div>
      </>
    )
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.products}>
          {cart.length > 0
            ? cart?.map((item) => (
                <CartProduct key={item._id} productDataObj={item} />
              ))
            : ""}
        </div>
        <div className={styles.cartReport}>
          <h1>Sepet Özetiniz</h1>
          <img src={logo} alt="logo" />
          <div className={styles.breakLine}></div>

          <div className={styles.totalWeight}>
            <h5>
              <FaWeight /> Toplam Ağırlık
            </h5>
            <h3>{cart?.length * 1} KG</h3>
          </div>
          <div className={styles.shipping}>
            <h5>
              <FaWeightHanging /> Kargo Ücreti
            </h5>
            <h3>{shippingPrice} TL</h3>
          </div>
          <div className={styles.price}>
            <h5>
              <FaMoneyBillAlt /> Ürün Fiyatı
            </h5>
            <h3>{totalPrice} TL</h3>
          </div>
          <div className={styles.totalPrice}>
            <h5>
              <FaMoneyCheck /> Toplam Ücret
            </h5>
            <h3>{Number(totalPrice) + Number(shippingPrice)} TL</h3>
          </div>
          <div className={styles.checkout}>
            <form onSubmit={handleSubmit}>
              <button type="submit">Siparişi Ver</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default Cart
