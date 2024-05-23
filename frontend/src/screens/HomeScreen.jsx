// import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import axios from 'axios';
import { useGetProductsQuery } from '../slices/productsApiSlice';

function HomeScreen() {
    // const [products, setProducts] = useState([]);

    // useEffect(function() {
    //     const fetchProducts = async function() {
    //         const { data } = await axios.get('/api/products');
    //         setProducts(data);
    //     }
    //     fetchProducts();
    // }, []);
    // Replaced with below:

    const { data: products, isLoading, error } = useGetProductsQuery();

    return(
        <>
            { isLoading ? (
                <Loader></Loader>
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {
                            products.map((product) => {return(
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}></Product>
                                </Col>
                            )})
                        }
                    </Row>
                </>
            ) }
        </>
    )
}
export default HomeScreen;