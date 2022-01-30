import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { collection, addDoc, getDocs } from "firebase/firestore";
import firedb from '../firebase'
import Loader from '../components/Loader';

function OrdersList({adminOrder=false}) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem("currentUser")).uid

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        try {
            setLoading(true);
            const ordersData = await getDocs(collection(firedb, "orders"));
            const ordersArray = [];
            ordersData.forEach((doc) => {
                ordersArray.push(doc.data());
            })
            setLoading(false);
            setOrders(ordersArray);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    return <>
        {loading && <Loader />}
        {!loading && orders.filter(order=>(order.userID==currentUser)||adminOrder).map((order,index) => (
            <table className='table mt-3 order' key={index}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.cartItems.map((item, index) => (
                        <tr key={index}>
                            <td><img src={item.imageURL} alt='' width='80' height='80' /></td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ))}
    </>;
}

export default OrdersList;
