import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from "../components/Message";
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async function(product, qty) {
        dispatch(addToCart({...product, qty}));
    }

    // the action payload for this is just id
    const removeFromCartHandler = async function(id) {
        dispatch(removeFromCart(id));
    }

    const checkOutHandler = function() {
        navigate('/login?redirect=shippng');
    }

    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
                { cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty. <Link to='/'>Go back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        { cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={ item.image } alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={ `/product/${item._id}` }>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>{item.price}</Col>
                                    <Col md={2}>
                                    <Form.Control 
                                        as='select'
                                        value={item.qty} 
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map((count) => {return(
                                                <option key={count+1} value={count+1}>
                                                    {count+1}
                                                </option>
                                            )})}
                                    </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item._id)}><FaTrash></FaTrash></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({ cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
                            ${ cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2) }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button 
                            type='button' 
                            className='btn-block' 
                            disabled={ cartItems.length === 0}
                            onClick={ checkOutHandler }
                            >
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;