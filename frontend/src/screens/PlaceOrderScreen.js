import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import numberWithDot from '../functions/numberWithDot';

import { Link } from 'react-router-dom';



function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart);
  const { cartItems, shipping, payment } = cart;

  if (!shipping.receiver) {
    props.history.push('/shipping');
  } else if (!payment.paymentMethod) {
    props.history.push('/payment');
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const shippingPrice = itemsPrice > 5000 ? 0 : 30;
  const cartTotal = itemsPrice + shippingPrice;


  const dispatch = useDispatch()




  return (
    <div className="shipping-container">
      <div className="checkout-container">
        <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
      </div>

      <div className="place-order">
        <div className="place-order-wrap">
          <div>
            <h3>Thông tin đơn hàng</h3>
            <div className="place-order-info">
              <div>Người nhận: {shipping.receiver}</div>
              <div>
                Số điện thoại: {shipping.phoneNumber}
              </div>
              <div>
                Địa chỉ: {shipping.address}, {shipping.province}.
              </div>
              <div>
                Hình thức thanh toán: {payment.paymentMethod}
              </div>
            </div>

            <div className="place-order-content">
              <ul>
                <li className="place-order-title">
                  <div className="title-list"><b>Danh sách sản phẩm</b></div>
                  <div className="title-qty">Số lượng</div>
                  <div className="title-price">Thành tiền</div>
                </li>
                {
                  cartItems.length === 0 
                    ? <div>Giỏ hàng đang trống.</div>
                    : 
                    cartItems.map(item => (
                      <li className="place-order-cart">
                        <div className="order-image">
                          <img alt="product" src={item.chosenImage}  ></img>
                        </div>
                        <div className="order-info">
                          <div>
                            <Link to={"/product/" + item.product}>
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            Màu sắc: <span 
                            style={{ backgroundColor: item.color}}>&nbsp;  &nbsp; &nbsp; </span>
                          </div>
                          <div>
                            Kích cỡ: {item.size}
                          </div>
                        </div>
                        <div className="order-qty">
                        {item.qty}
                        </div>
                        <div className="order-price">
                          {numberWithDot(item.price)}.000 đ
                        </div>
                      </li>
                    ))
                }
              </ul>
            </div>

            <div className="place-order-total">
              <ul>
                <li>
                  <span>Giá trị sản phẩm: </span> 
                  <span>{numberWithDot(itemsPrice)}.000 đ</span> 
                </li>
                <li>
                  <span>Phí vận chuyển</span> 
                  <span>{shippingPrice === 0 
                          ? numberWithDot(shippingPrice) : shippingPrice + '.000 đ' }</span> 
                </li>
                <li>
                  <span>Tổng giá trị đơn hàng: </span> 
                  <span>{numberWithDot(cartTotal)}.000 đ</span> 
                </li>
                <li>
                  <button className="button-fullwidth"
                    onClick={() => alert('Chức năng này đang được phát triển.')}>
                    Đặt hàng
                  </button>
                </li>
              </ul>  
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default PlaceOrderScreen;