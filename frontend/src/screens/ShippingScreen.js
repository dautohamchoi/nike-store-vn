import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShipping } from '../actions/cartAction';



function ShippingScreen(props) {
  const [receiver, setReceiver] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ receiver, phoneNumber, province, address }));
    props.history.push('/payment');
  }


  return (
    <div className="shipping-container">
      <div className="checkout-container">
        <CheckoutSteps step1 step2 ></CheckoutSteps>
      </div>

      <div >
        <form className="shipping-form" onSubmit={submitHandler}>
          <ul>
            <li className="shipping-list">
              <h3>Thông tin giao hàng</h3>
            </li>
            <li className="shipping-list">
              <label htmlFor="receiver">Tên người nhận</label>
              <input name="receiver" type="text" required 
                onChange={(e) => setReceiver(e.target.value)}
                ></input>
            </li>
            <li className="shipping-list">
              <label htmlFor="phoneNumber">Số điện thoại di động</label>
              <input name="phoneNumber" type="number"  required
                onChange={(e) => setPhoneNumber(e.target.value)}
                ></input>
            </li>
            <li className="shipping-list">
              <label htmlFor="province">Tỉnh/ Thành Phố</label>
              <input name="province" type="text"  required
                onChange={(e) => setProvince(e.target.value)}
                ></input>
            </li>
            <li className="shipping-list">
              <label htmlFor="address">Địa chỉ</label>
              <input name="address" type="text"  required
                onChange={(e) => setAddress(e.target.value)}
                ></input>
            </li>
            <li className="shipping-list">
              <button type="submit" className="button-fullwidth">Tiếp tục</button>
            </li>
          </ul>
        </form>
      </div>

    </div>
  )
}

export default ShippingScreen;