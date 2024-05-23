import { Nav, Navbar, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import logo from "../assets/logo.png";

function Header() {
    // Example of accessing global state using Selector.
    const {cartItems} = useSelector((state) => state.cart);

    return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="ProCart"></img>
                        Pro Cart
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link href="/cart"><FaShoppingCart /> Cart
                            {
                                cartItems.length > 0 ? (
                                    <Badge pill bg='success' style={{marginLeft: '5px'}}>
                                        { cartItems.reduce((acc, item) => acc + item.qty, 0) }
                                    </Badge>
                                ) : (<></>)
                            }
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link href="/login"><FaUser /> Sign in</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    )
}

export default Header;