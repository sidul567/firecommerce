import React, { useEffect, useState } from 'react';
import { collection, getDoc, doc } from "firebase/firestore";
import firedb from '../firebase'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Layout from '../components/Layout';
import { useDispatch } from 'react-redux';

function ProductInfo() {

  const [product, setProduct] = useState();
  const { productID } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    getData();
  }, [])

  async function getData() {
    try {
      setLoading(true);
      const productData = await getDoc(doc(firedb, "products", productID));
      setProduct(productData.data());
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }

  }

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
          <div className='row justify-content-center'>
            <div className='col-md-8'>
              {product && (<>
                <p><b>{product.name}</b></p>
                <img src={product.imageURL} alt="" className='product-info-img' />
                <hr />
                <p>{product.description}</p>
                <div className='d-flex justify-content-end'>
                  <button className='my-3' onClick={()=>{addToCart(product)}}>ADD TO CART</button>
                </div>
              </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    )}
  </>);
}

export default ProductInfo;
