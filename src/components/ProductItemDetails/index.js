// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const stages = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    fetchedData: {},
    stageValue: stages.progress,
    similarFetched: [],
    count: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({stageValue: stages.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        title: data.title,
        totalReviews: data.reviews,
      }
      const similarFetchedData = data.similar_products
      const updatedSimilarData = similarFetchedData.map(each => ({
        availability: each.availability,
        brand: each.brand,
        description: each.description,
        id: each.id,
        imageUrl: each.image_url,
        price: each.price,
        rating: each.rating,
        title: each.title,
        totalReviews: each.reviews,
      }))
      console.log(updatedSimilarData)
      this.setState({
        fetchedData: updatedData,
        similarFetched: updatedSimilarData,
        stageValue: stages.success,
      })
    } else {
      this.setState({stageValue: stages.failure})
    }
  }

  onIncrement = () => {
    const {count} = this.state
    this.setState(prevState => ({count: prevState.count + 1}))
    console.log(count)
  }

  onDecrement = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  renderLoadingView = props => {
    console.log(props)
    return (
      <div data-testid="loader" className="products-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="100" width="100" />
      </div>
    )
  }

  renderSuccessView = () => {
    const {fetchedData, similarFetched, count} = this.state
    const {
      id,
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
    } = fetchedData

    return (
      <>
        <div className="product-item-container" key={id}>
          <img className="product-item-img" src={imageUrl} alt="product" />
          <div className="product-item-container1">
            <h1 className="product-item-h1">{title}</h1>
            <p className="cost-p1">Rs {price}</p>
            <div className="product-item-con">
              <div className="star-container">
                <p className="num-p1">{rating}</p>
                <img
                  className="star-img"
                  alt="star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png "
                />
              </div>
              <p className="reviews-p1"> Reviews</p>
            </div>
            <p className="paragraph-p1">{description}</p>
            <div className="product-item-con">
              <p className="stock-product">Available: </p>
              <p className="span-stock"> {availability}</p>
            </div>
            <div className="product-item-con">
              <p className="stock-product">Brand:</p>
              <p className="span-stock">{brand}</p>
            </div>
            <hr className="hr-line" />
            <div className="quantity-container">
              <BsDashSquare
                onClick={this.onDecrement}
                role="button"
                data-testid="minus"
              />

              <p className="quantity">{count}</p>

              <BsPlusSquare
                onClick={this.onIncrement}
                role="button"
                data-testid="plus"
              />
            </div>
            <button type="button" className="add-to-cart-btn">
              ADD TO CART
            </button>
          </div>
        </div>

        <SimilarProductItem similarFetched={similarFetched} />
      </>
    )
  }

  renderFailureView = props => {
    console.log(props)
    return (
      <div className="productItem-failureView-container">
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          className="errorView-image"
        />
        <h1 className="errorView-heading">Product Not Found</h1>
        <Link to="/products">
          <button type="button" className="add-button">
            Continue Shopping
          </button>
        </Link>
      </div>
    )
  }

  renderAllStages = () => {
    const {stageValue} = this.state
    switch (stageValue) {
      case stages.progress:
        return this.renderLoadingView()
      case stages.success:
        return this.renderSuccessView()
      case stages.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div>
          <Header />
          {this.renderAllStages()}
        </div>
      </>
    )
  }
}
export default ProductItemDetails
