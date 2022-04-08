import { useState, useEffect, useContext } from "react"
import styles from "../styles/Product.module.css"
import axios from "axios"
import { useParams, Link } from "react-router-dom"
import AppContext from "../context/AppContext"
import Spinner from "../components/Spinner"
import SingleProduct from "../components/SingleProduct"
import CategoryBar from "../components/CategoryBar"

const Product = () => {
  const [productDataObj, setProductDataObj] = useState(null)

  const { loading, setLoading } = useContext(AppContext)

  const params = useParams()

  const API_URL = `/api/products/`

  const fetchProduct = async () => {
    setLoading(true)
    try {
      setLoading(false)
      const response = await axios.get(API_URL + params.id)
      setProductDataObj(response.data)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct()
    // eslint-disable-next-line
  }, [params.id])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className={styles.container}>
        {productDataObj ? <CategoryBar productDataObj={productDataObj} /> : ""}
        {productDataObj ? (
          <SingleProduct
            productDataObj={productDataObj}
            key={productDataObj._id}
          />
        ) : (
          ""
        )}
      </div>
      <Link to="/cart">Sepetim</Link>
    </>
  )
}
export default Product
