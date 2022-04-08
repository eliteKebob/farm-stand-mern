import { useContext, useEffect } from "react"
import styles from "../styles/Header.module.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/farmshop.png"
import { HiViewList, HiSearch } from "react-icons/hi"
import Dropdown from "rc-dropdown"
import Menu, { Item as MenuItem } from "rc-menu"
import "rc-dropdown/assets/index.css"
import drink from "../assets/icecek.png"
import breakfast from "../assets/kahvaltilik.png"
import fruit from "../assets/meyve-sebze.png"
import flour from "../assets/kuru-gida.png"
import AppContext from "../context/AppContext"

const Header = () => {
  const { loggedIn, setLoggedIn, search, setSearch } = useContext(AppContext)
  const user = JSON.parse(localStorage.getItem("user"))

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setSearch("")
    // eslint-disable-next-line
  }, [location])

  const menu = (
    <Menu className={styles.dropdownMenu}>
      <MenuItem key="3" className={styles.menuItem}>
        <Link to="/categories/icecek">
          <img src={drink} alt="" />
          <span>İçecek</span>
        </Link>
      </MenuItem>
      <MenuItem key="1" className={styles.menuItem}>
        <Link to="/categories/meyve-sebze">
          <img src={fruit} alt="" /> Meyve & Sebze
        </Link>
      </MenuItem>
      <MenuItem key="2" className={styles.menuItem}>
        <Link to="/categories/kuru-gida">
          <img src={flour} alt="" /> Kuru Gıda
        </Link>
      </MenuItem>
      <MenuItem key="4" className={styles.menuItem}>
        <Link to="/categories/kahvaltilik">
          <img src={breakfast} alt="" /> Kahvaltılık
        </Link>
      </MenuItem>
    </Menu>
  )

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.categories}>
          <Dropdown trigger={["hover"]} overlay={menu} animation="slide-up">
            <p className={styles.categoryText}>
              <HiViewList /> Kategoriler
            </p>
          </Dropdown>
        </div>
        <div className={styles.searchBar}>
          <form className={styles.searchForm}>
            <input
              type="text"
              placeholder="Aramak istediğiniz ürünün adı..."
              className={styles.input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="/search" disabled={search === "" ? true : false}>
              <button
                type="submit"
                className={styles.button}
                disabled={search === "" ? true : false}
              >
                <HiSearch />
              </button>
            </Link>
          </form>
        </div>
        <div className={styles.member}>
          {loggedIn === true || user ? (
            <div className={styles.login}>
              <Link to={`/user/${user?._id}`}>Profil</Link>
            </div>
          ) : (
            <div className={styles.login}>
              <Link to="/login">Giriş Yap</Link>
            </div>
          )}
          {loggedIn === true || user ? (
            <div className={styles.register}>
              <Link to="/cart">Sepetim</Link>
            </div>
          ) : (
            ""
          )}
          {loggedIn === true || user ? (
            <div className={styles.logout}>
              <button
                onClick={() => {
                  localStorage.removeItem("user")
                  setLoggedIn(false)
                  navigate("/")
                }}
              >
                Çıkış Yap
              </button>
            </div>
          ) : (
            <div className={styles.register}>
              <Link to="/register">Kayıt Ol</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
export default Header
