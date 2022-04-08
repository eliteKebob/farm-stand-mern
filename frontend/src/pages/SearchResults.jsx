import { useContext, useState, useEffect } from "react"
import AppContext from "../context/AppContext"
import Spinner from "../components/Spinner"
import axios from "axios"
import styles from "../styles/Product.module.css"
import SingleProduct from "../components/SingleProduct"

const SearchResults = () => {
  const { search, loading, setLoading } = useContext(AppContext)
  const [results, setResults] = useState([])

  const API_URL = `/api/products/search/`

  const searchProduct = async () => {
    setLoading(true)
    if (search !== "") {
      try {
        setLoading(false)
        const userData = { query: search }
        const response = await axios.post(API_URL, userData)
        if (response.data) {
          setResults(response.data)
          console.log(response.data)
        }
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchProduct()
    // eslint-disable-next-line
  }, [search])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className={styles.container}>
      {results
        ? results.map((product) => (
            <SingleProduct productDataObj={product} key={product._id} />
          ))
        : ""}
    </div>
  )
}
export default SearchResults
