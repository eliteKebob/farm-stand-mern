import { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Spinner from "../components/Spinner"
import styles from "../styles/Product.module.css"
import AppContext from "../context/AppContext"
import SingleProduct from "../components/SingleProduct"
import CategoryBar from "../components/CategoryBar"

const SingleCategory = () => {
  const [categoryData, setCategoryData] = useState([])

  const { loading, setLoading } = useContext(AppContext)

  const params = useParams()

  const API_URL = `/api/products/categories/`

  const fetchCategory = async () => {
    setLoading(true)
    try {
      setLoading(false)
      const response = await axios.get(API_URL + params.category)
      setCategoryData(response.data)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategory()
    // eslint-disable-next-line
  }, [params.category])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className={styles.container}>
      {categoryData ? <CategoryBar productDataObj={categoryData[0]} /> : ""}
      {categoryData
        ? categoryData.map((product) => (
            <SingleProduct productDataObj={product} key={product._id} />
          ))
        : ""}
    </div>
  )
}
export default SingleCategory
