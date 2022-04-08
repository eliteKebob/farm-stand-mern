import { useContext } from "react"
import styles from "../styles/Product.module.css"
import drink from "../assets/icecek.png"
import breakfast from "../assets/kahvaltilik.png"
import fruit from "../assets/meyve-sebze.png"
import flour from "../assets/kuru-gida.png"
import AppContext from "../context/AppContext"
import Spinner from "../components/Spinner"
import { FaShoppingCart, FaShieldAlt } from "react-icons/fa"
import { toast } from "react-toastify"

const SingleProduct = ({ productDataObj }) => {
  const { cart, setCart, loading } = useContext(AppContext)

  const handleClick = () => {
    setCart(cart.concat(productDataObj))
    toast.success("Ürün sepetinize eklendi!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
    })
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className={styles.product}>
        <div className={styles.productImg}>
          <img
            src={
              productDataObj.category === "meyve-sebze"
                ? fruit
                : productDataObj.category === "kuru-gida"
                ? flour
                : productDataObj.category === "kahvaltilik"
                ? breakfast
                : productDataObj.category === "icecek"
                ? drink
                : ""
            }
            alt=""
          />
        </div>
        <div className={styles.productInfo}>
          <h1>{productDataObj.name}</h1>
          <h3>
            1{" "}
            {productDataObj.category === "meyve-sebze" ||
            "kuru-gida" ||
            "kahvaltilik"
              ? "KG"
              : "LT"}
          </h3>
          <h2>{productDataObj.price} TL</h2>
        </div>
        <div className={styles.addCart}>
          <button onClick={handleClick}>
            <FaShoppingCart /> Sepete Ekle
          </button>
          <p>
            <FaShieldAlt /> Paranız güvence altındadır.
          </p>
        </div>
      </div>
    </>
  )
}
export default SingleProduct
