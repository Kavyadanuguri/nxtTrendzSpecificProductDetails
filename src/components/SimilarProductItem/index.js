// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarFetched} = props

  return (
    <div>
      <h1 className="similar-items">Similar Items</h1>
      <ul className="similar-products-ul">
        {similarFetched.map(each => (
          <li className="similar-list-container" key={each.id}>
            <img
              className="similar-img"
              alt="similar product"
              src={each.imageUrl}
            />
            <h4 className="similar-h4">{each.title}</h4>
            <p className="similar-p1">by {each.brand} </p>
            <div className="similar-con1">
              <p className="similar-cost">Rs {each.price}/-</p>
              <div className="star-similar-container">
                <p className="num-p1">{each.rating}</p>
                <img
                  className="star-img"
                  alt="star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png "
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SimilarProductItem
