import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Pessoas',
    subtitle: 'Cadastro de Pessoas: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    pessoa: { name: '', email: '', telefone: '', whatsapp: '' },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ pessoa: initialState.pessoa })
    }

    save() {
        const pessoa = this.state.pessoa
        const method = pessoa.id ? 'put' : 'post'
        const url = pessoa.id ? `${baseUrl}/${pessoa.id}` : baseUrl
        axios[method](url, pessoa)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ pessoa: initialState.pessoa, list })
            })
    }

    getUpdatedList(pessoa, add = true) {
        const list = this.state.list.filter(u => u.id !== pessoa.id)
        if(add) list.unshift(pessoa)
        return list
    }

    updateField(event) {
        const pessoa = { ...this.state.pessoa }
        pessoa[event.target.name] = event.target.value
        this.setState({ pessoa })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.pessoa.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.pessoa.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone</label>
                            <input type="text" className="form-control"
                                name="telefone"
                                value={this.state.pessoa.telefone}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o telefone..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>WhatsApp</label>
                            <input type="text" className="form-control"
                                name="whatsapp"
                                value={this.state.pessoa.whatsapp}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o whatsapp..." />
                        </div>
                    </div>
                </div>


                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>

        )
    }

    load(pessoa) {
        this.setState({ pessoa })
    }

    remove(pessoa) {
        axios.delete(`${baseUrl}/${pessoa.id}`).then(resp => {
            const list = this.getUpdatedList(pessoa, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Whatsapp</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(pessoa => {
            return (
                <tr key={pessoa.id}>
                    <td>{pessoa.id}</td>
                    <td>{pessoa.name}</td>
                    <td>{pessoa.email}</td>
                    <td>{pessoa.telefone}</td>
                    <td>{pessoa.whatsapp}</td>
                    <td>
                        <button className="btn btn-primary"
                            onClick={() => this.load(pessoa)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(pessoa)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}