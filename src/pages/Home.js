import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import firedb from '../firebase'
import { productsData } from '../Products'
import "../styles/products.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Layout from '../components/Layout';

function Home() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cartReducer);
    const [searchItem,setSearchItem] = useState("");
    const [searchCategory,setSearchCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        getData();
    }, [])

    async function addData() {
        await addDoc(collection(firedb, "users"), {
            name: "MOON",
            age: 20
        })
    }

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

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])

    function addToCart(product) {
        const finalProduct = {
            userID: currentUser.uid,
            ...product 
        }
        dispatch({ type: "ADD_TO_CART", payload: finalProduct })
    }

    return (<>
        {loading && <Loader />}
        {!loading && (
            <Layout>
                <div className='container'>
                    <div className='d-flex w-50 my-2'>
                        <input type="text" className='form-control mx-2' placeholder='Search Item' value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} />
                        <select className='form-control' onChange={(e)=>setSearchCategory(e.target.value)}>
                            <option value="">All</option>
                            <option value="electronics">Electronics</option>
                            <option value="mobiles">Mobiles</option>
                            <option value="fashion">Fashion</option>
                        </select>
                    </div>
                    <div className='row'>
                        {products
                        .filter((product)=>product.name.toLowerCase().includes(searchItem))
                        .filter((product)=>product.category.toLowerCase().includes(searchCategory))
                        .map((product, index) => (
                            <div className='col-md-4' key={index}>
                                <div className='product m-2 p-1 position-relative'>
                                    <div className='product-content'>
                                        <p>{product.name}</p>
                                        <div className='text-center'>
                                            <img src={product.imageURL} alt="" className='productImg' />
                                        </div>
                                    </div>
                                    <div className='product-actions'>
                                        <h3>{product.price} tk.</h3>
                                        <div className='d-flex'>
                                            <button className='mx-2' onClick={() => addToCart(product)}>ADD TO CART</button>
                                            <button onClick={() => navigate("/productInfo/" + product.id)}>VIEW</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        )}
    </>);
}

export default Home;
