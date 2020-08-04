import React from 'react';

class PageEspaceMembre extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nom: props.isConnected.lastName,
            prenom: props.isConnected.firstName,
            email: props.isConnected.email,
        }

    }


    render() {
        const {nom, prenom, email} = this.state;
        return (
            <div>
                <h1>Mon espace membre</h1>
                <div className="card">
                    <div className="card-header">
                        <h4 className="mb-0">Informations utilisateur</h4>
                    </div>
                    <div className="card-body">
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Nom</label>
                            <div className="col-lg-9">
                                <label className="col-lg-3 col-form-label form-control-label">{nom}</label>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Prénom</label>
                            <div className="col-lg-9">
                                <label className="col-lg-3 col-form-label form-control-label">{prenom}</label>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 col-form-label form-control-label">Email</label>
                            <div className="col-lg-9">
                                <label className="col-lg-3 col-form-label form-control-label">{email}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { PageEspaceMembre };