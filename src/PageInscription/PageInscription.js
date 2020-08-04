import React from 'react';

import { userService } from '../_services';

class PageInscription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            login:'',
            firstName: '',
            lastName: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            register: false
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
        const { login, email, firstName, lastName, password} = this.state;

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // stop here if form is invalid
        if (!(email && firstName && lastName && password) || !regex.test(String(email).toLocaleLowerCase())) {
            this.setState({error : "Vérifier les champs du formulaire "})
            return;
        }

        this.setState({ loading: true });
        userService.register(email, firstName, lastName, password,login)
            .then(
                () => {
                    this.setState({register : true});
                    const { from } = this.props.location.state || { from: { pathname: "/connexion" } };
                    setTimeout(() => { this.props.history.push(from)},5000);
                },
                error => this.setState({ error, loading: false })
            );
    }


    render() {
        const { email, firstName, lastName, password, submitted, loading, error, register, login } = this.state;

        const checkInput = (submitted, input) => {
            if(!submitted){
                return "";
            } else{
                return (submitted && input !== '' ? ' is-valid' : ' is-invalid');
            }
        };

        return (register) ?
            (<div className="col-md-12 col-md-offset-3">
                <h2>Inscription réussie</h2>
                <div>
                    <p> Une inscription vient d'être réussie avec comme identifiant l'adresse mail : {email}</p>
                </div>
                <div>
                    <p> Vous allez être redirigé vers la page de connexion sous peu</p>
                </div>
                <div>
                    <p> Si la redirection ne fonctionne pas, vous pouvez cliquer <a href="/connexion">ici</a></p>
                </div>
            </div>)
            :
            ( <div className="col-md-12 col-md-offset-3">
                <h2>Inscription</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="lastName">Login</label>
                        <input type="text" className={"form-control" + checkInput(submitted,login)} name="login" value={login} onChange={this.handleChange} />
                        {submitted && !login &&
                        <div className="help-block">Login requis</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="lastName">Nom</label>
                        <input type="text" className={"form-control" + checkInput(submitted,lastName)} name="lastName" value={lastName} onChange={this.handleChange} />
                        {submitted && !lastName &&
                        <div className="help-block">Nom requis</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="firstName">Prénom</label>
                        <input type="text" className={"form-control" + checkInput(submitted,firstName)} name="firstName" value={firstName} onChange={this.handleChange} />
                        {submitted && !firstName &&
                        <div className="help-block">Prénom requis</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Adresse email</label>
                        <input type="text" className={"form-control" + checkInput(submitted,email)} name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                        <div className="help-block">Adresse mail requis</div>
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
                        <button className="btn btn-primary" disabled={loading}>Inscription</button>
                        {loading &&
                            <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
            </div>
        );
    }
}

export { PageInscription };