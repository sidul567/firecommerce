import React, { useEffect, useState } from 'react';
import { collection, getDocs, setDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import firedb from '../firebase'
import Layout from '../components/Layout';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Modal, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';
import OrdersList from '../components/OrdersList';

function Admin() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [add, setAdd] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        address: "",
        price: 0,
        imageURL: ""
    });

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        try {
            setLoading(true);
            const productsData = await getDocs(collection(firedb, "products"));
            const productsArray = [];
            productsData.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                const obj = {
                    id: doc.id,
                    ...doc.data()
                }
                productsArray.push(obj);
            })
            setLoading(false);
            setProducts(productsArray);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function editItem(item) {
        setAdd(false);
        setProduct(item);
        handleShow()
    }

    function addItem() {
        setProduct({})
        setAdd(true);
        handleShow();
    }

    async function updateProduct() {
        try {
            setLoading(true);
            await setDoc(doc(firedb, "products", product.id), product);
            handleClose();
            getData();
            setLoading(false);
            setProduct({})
            toast.success("Product updated successfully!");
        } catch (e) {
            toast.error(e.message);
            setLoading(false);
        }
    }

    async function addNewProduct() {
        try {
            setLoading(true);
            await addDoc(collection(firedb, "products"), product);
            handleClose();
            getData();
            setLoading(false);
            setProduct({})
            toast.success("Product added successfully!");
        } catch (e) {
            toast.error(e.message);
            setLoading(false);
        }
    }

    async function deleteItem(item) {
        try {
            setLoading(true);
            await deleteDoc(doc(firedb, "products", item.id));
            getData();
            setLoading(false);
            toast.success("Product deleted successfully!");
        } catch (e) {
            toast.error(e.message);
            setLoading(false);
        }
    }

    return (<Layout loading={loading}>
        <Tabs defaultActiveKey="products" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="products" title="Products">
                <div className='d-flex justify-content-between'>
                    <h2>Products List</h2>
                    <button onClick={addItem}>ADD NEW PRODUCT</button>
                </div>
                <table className='table mt-3'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={index}>
                                <td><img src={item.imageURL} alt='' width='80' height='80' /></td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>
                                    <FaTrash style={{ padding: '0px', cursor: 'pointer', color: 'red' }} onClick={() => deleteItem(item)} />
                                    <FaEdit style={{ padding: '0px', cursor: 'pointer', color: 'blue' }} onClick={() => editItem(item)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{add ? "Add New Product" : "Update Product"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type='text' required placeholder='Name' className='form-control' value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                        <input type='text' required placeholder='Image URL' className='form-control' value={product.imageURL} onChange={(e) => setProduct({ ...product, imageURL: e.target.value })} />
                        <input type='text' required placeholder='Price' className='form-control' value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                        <input type='text' required placeholder='Category' className='form-control' value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='button' onClick={handleClose}>
                            Close
                        </Button>
                        <Button className='button' onClick={add ? addNewProduct : updateProduct}>
                            {add ? "ADD" : "UPDATE"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Tab>
            <Tab eventKey="orders" title="Orders">
                <OrdersList adminOrder={true} />
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
            </Tab>
        </Tabs>
    </Layout>
    );
}

export default Admin;