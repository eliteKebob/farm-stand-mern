import drink from "../assets/icecek.png"
import breakfast from "../assets/kahvaltilik.png"
import fruit from "../assets/meyve-sebze.png"
import flour from "../assets/kuru-gida.png"
import { Link } from "react-router-dom"
import styles from "../styles/Landing.module.css"

const CategoryNavigate = () => {
  return (
    <>
      <div className={styles.landing}>
        <h1>Kategorilerimiz</h1>
        <div className={styles.categories}>
          <div className={styles.singleCategory}>
            <Link to="/categories/icecek">
              <img src={drink} alt="" /> İçecek
            </Link>
          </div>
          <div className={styles.singleCategory}>
            <Link to="/categories/meyve-sebze">
              <img src={fruit} alt="" /> Meyve & Sebze
            </Link>
          </div>
          <div className={styles.singleCategory}>
            <Link to="/categories/kuru-gida">
              <img src={flour} alt="" /> Kuru Gıda
            </Link>
          </div>
          <div className={styles.singleCategory}>
            <Link to="/categories/kahvaltilik">
              <img src={breakfast} alt="" /> Kahvaltılık
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default CategoryNavigate
