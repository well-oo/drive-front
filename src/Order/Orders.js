import React from 'react';
import Order from './Order';
import {orderService} from "../_services/order.service";


class Orders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        orderService.findByUserId(this.props.isConnected.login).then(orders => this.setState({orders}));
    }

    render() {
        return(
            <div>
                <h2>Commandes</h2>
                {(this.state.orders.length === 0) ?
                    <div>
                       <h2>Vous ne possédez pas de commandes ! </h2>
                    </div>
                    :
                    <div>
                        {this.state.orders.map(order => <Order key={order.id} {...order} />)}
                    </div>
                }
            </div>)
    }
}

export { Orders };