import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { Link } from 'react-router-dom';
import numberWithDot from '../functions/numberWithDot';


function CartScreen(props) {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const productId = props.match.params.id;

  const params = new URLSearchParams(props.location.search.substring(1));
  const name = params.get("name");
  const color = params.get("color");
  const size = parseInt(params.get("size"), 10);
  const qty = parseInt(params.get("qty"), 10);

  const chosenImage = "/images/" + name.toLowerCase().replace(' ', '-').replace(' ', '-').replace(' ', '-') +  "-" + color +".png";


  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, color, size, chosenImage));
    }
  }, [])
  console.log(cartItems);

  const quantityChange = (event) => {
    const id = event.target.dataset.id;
    if (event.target.classList.contains("qty-increase")|| event.target.classList.contains("qty-decrease")) {
      const targetColor = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.children[4].innerText;
      console.log(targetColor);
      const targetSize = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.children[2].innerText;
      const sizeNum =  Number.parseInt(targetSize.slice(8));
      const targetImage = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.src;
      if (event.target.classList.contains("qty-increase")) {
        let qtyNum = event.target.nextElementSibling.innerText;
        qtyNum++;
        dispatch(addToCart(id, qtyNum, targetColor, sizeNum, targetImage));
      } else if (event.target.classList.contains("qty-decrease")) {
        let qtyNum = event.target.previousElementSibling.innerText;
        if (qtyNum > 1) {
          qtyNum--;
        }
        dispatch(addToCart(id, qtyNum, targetColor, sizeNum, targetImage));
      }
    }
  }

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  }



  return (
    <div className="cart">
      <div className="link-path">
        <span>
          <Link to="/">Trang chủ</Link>
        </span>
        <span> &nbsp; &gt; &nbsp; </span>
        <span>
          <Link to={'/product/' + productId}>Giày chạy bộ</Link>
        </span>
        <span> &nbsp; &gt; &nbsp; </span>
        <span>
          <Link to="/cart/">Giỏ hàng</Link>
        </span>
      </div>
      <div className="cart-list">
        <ul className="cart-list-container" onClick={(event) => quantityChange(event)}>
          <li className="cart-list-title">
            <h4>Giỏ hàng <span>({
              cartItems.reduce((a, c) => a + c.qty, 0)
            } sản phẩm)</span></h4>
          </li>
          {
            cartItems.map(item => (
              <li>
                <div className="cart-image">
                  <img src={item.chosenImage} alt="product"/>
                </div>
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <h5>Màu: <span  className="cart-color" 
                  style={{backgroundColor: item.color}}> &nbsp; &nbsp; &nbsp; &nbsp; </span></h5>
                  <h5>Kích cỡ: {item.size}</h5>
                  <button className="cart-btn-delete" 
                  onClick={() => removeFromCartHandler(item.product)}>Xoá</button>
                  <h6 className="is-hidden">{item.color}</h6>
                </div>
                <div className="cart-price">
                  <h4>{ numberWithDot(item.price) }.000 đ</h4>
                </div>
                <div className="cart-qty">
                  <div className="cart-qty-container">
                    <span className="qty-increase" data-id={item.product}>+</span>
                    <span className="qty-display">{item.qty}</span>
                    <span className="qty-decrease"
                    data-id={item.product}>-</span>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="cart-action">
        <ul>
          <li className="cart-subtotal">
            <h5>Tạm tính:  </h5>
            <h5>{ numberWithDot(cartItems.reduce((a, c) => a + c.qty * c.price, 0)) }.000 đ</h5>
          </li>
          <li className="cart-total">
            <h4>Thành tiền: </h4>
            <h4>
              {
                numberWithDot(cartItems.reduce((a, c) => a + c.qty * c.price , 0))
              }.000 đ</h4>
          </li>
          <li>
            <button className="button-fullwidth"
              onClick={checkoutHandler}
              >
              Tiến hành đặt hàng
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CartScreen;