import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import firedb from '../firebase';

function Cart() {

  const { cartItems } = useSelector(state => state.cartReducer);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  function deleteCartItem(product) {
    dispatch({ type: "DELETE_TO_CART", payload: product })
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    let price = 0;
    cartItems
    .filter((cartItem)=>cartItem.userID==currentUser.uid)
    .forEach((item) => {
      price += Number(item.price);
    })
    setAmount(price);
  }, [cartItems])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  async function placeorder() {
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber
    }
    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).email,
      userID: JSON.parse(localStorage.getItem("currentUser")).uid
    }
    try {
      setLoading(true);
      await addDoc(collection(firedb, "orders"), orderInfo);
      handleClose();
      setLoading(false);
      toast.success("Order placed successfully!")
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (<>
    {loading && <Loader />}
    <Layout>
      <table className='table mt-3'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems
          .filter((cartItem)=>cartItem.userID==currentUser.uid)
          .map((item, index) => (
            <tr key={index}>
              <td><img src={item.imageURL} alt='' width='80' height='80' /></td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td><FaTrash style={{ padding: '0px', cursor: 'pointer' }} onClick={() => deleteCartItem(item)} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='d-flex justify-content-end'>
        <h1 className='total-amount'>Total Amount = {amount} tk/=</h1>
      </div>
      <div className='d-flex justify-content-end mt-2'>
        <button onClick={handleShow}>PLACE ORDER</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text' required placeholder='Name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
          <textarea rows={3} type='password' required placeholder='Adress' className='form-control' value={address} onChange={(e) => setAddress(e.target.value)} />
          <input type='text' required placeholder='Pin Code' className='form-control' value={pincode} onChange={(e) => setPincode(e.target.value)} />
          <input type='number' required placeholder='Phone Number' className='form-control' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button className='button' onClick={handleClose}>
            Close
          </Button>
          <Button className='button' onClick={placeorder}>
            ORDER
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  </>);
}

export default Cart;
