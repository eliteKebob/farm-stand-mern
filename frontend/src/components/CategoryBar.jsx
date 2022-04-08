import styles from "../styles/Product.module.css"
import { Link } from "react-router-dom"

const CategoryBar = ({ productDataObj }) => {
  return (
    <>
      <div className={styles.categoryBar}>
        <Link to={`/categories/${productDataObj?.category}`}>
          <span>
            {productDataObj?.category === "meyve-sebze"
              ? "Meyve & Sebze"
              : productDataObj?.category === "kuru-gida"
              ? "Kuru Gıda"
              : productDataObj?.category === "kahvaltilik"
              ? "Kahvaltılık"
              : productDataObj?.category === "icecek"
              ? "İçecek"
              : ""}{" "}
          </span>
        </Link>
      </div>
    </>
  )
}
export default CategoryBar
