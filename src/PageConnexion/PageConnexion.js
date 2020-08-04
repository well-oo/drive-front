import React from 'react';

import { userService } from '../_services';
import { cartService } from '../_services';

class PageConnexion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    if(user.activeCart === null){
                        cartService.create().then(cart => {
                            user.activeCart = cart;
                            userService.update(user.login,user);
                        });
                    }
                    this.props.toggleConnected(user);
                    const { from } = { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;

        const checkInput = (submitted, input) => {
            if(!submitted){
                return "";
            } else{
                return (submitted && input !== '' ? ' is-valid' : ' is-invalid');
            }
        };

        return(
            <div className="col-md-12 col-md-offset-3">
                <h2>Connexion</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="username">Login</label>
                        <input type="text" className={"form-control" + checkInput(submitted,username)} name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Login requis</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" className={"form-control" + checkInput(submitted,password)} name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Mot de passe requis</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>Connexion</button>
                        {loading &&
                            <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                    <a className="link" href="/inscription">Inscription</a>
                </form>
            </div>
        );
    }
}

export { PageConnexion };