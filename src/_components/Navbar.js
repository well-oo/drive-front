import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { userService } from '../_services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

export  function Navigationbar({isConnected, toggleConnected}){
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Drive - ECommerce DUCROCQ CHRISTOPHER</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav>
                    {(isConnected ?
                        <div className="divNavbar">
                            <Nav.Link href="/orders">Mes commandes</Nav.Link>
                            <Nav.Link href="/espaceMembre">Espace membre</Nav.Link>
                            <Nav.Link className="icon-cart" href="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Nav.Link>
                            <Nav.Link variant="light" size="sm" onClick={() => {
                                toggleConnected(null);
                                userService.logout();
                            }
                            }>Déconnexion</Nav.Link>
                        </div>
                        : <div></div>)}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

