import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePayment } from '../actions/cartAction';



function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('/placeorder');
  }


  return (
    <div className="shipping-container">
      <div className="checkout-container">
        <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
      </div>

      <div >
        <form className="shipping-form" onSubmit={submitHandler}>
          <ul>
            <li className="payment-methods">
              <h3>Phương thức thanh toán</h3>
            </li>
            <li className="payment-methods">
              <input name="paymentMethod" type="radio" required
                value='Momo' id="momo"
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
              <label htmlFor="momo">Momo</label>
            </li>
            <li className="payment-methods">
              <input name="paymentMethod" type="radio" required
                value='Zalopay' id="zalopay"
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
              <label htmlFor="zalopay">Zalopay</label>
            </li>
            <li className="payment-methods">
              <input name="paymentMethod" type="radio" required
                value='Airpay' id="airpay"
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
              <label htmlFor="airpay">Airpay</label>
            </li>
            <li className="payment-methods">
              <button className="button-fullwidth" type="submit">Tiếp tục</button>
            </li>
          </ul>
        </form>
      </div>

    </div>
  )
}

export default PaymentScreen;