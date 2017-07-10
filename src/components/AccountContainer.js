import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'

class AccountContainer extends Component {

  state = {
      searchTerm: '',
      transactions: [],
      filteredTransactions: []
    }

  componentWillMount () {
    this.getTransactions()
  }

  getTransactions () {
    const baseUrl = 'https://boiling-brook-94902.herokuapp.com/'

    fetch(baseUrl + 'transactions')
      .then(resp => resp.json())
      .then(json => this.updateTransactions(json))
  }

  updateTransactions (data) {
    this.setState({
      transactions: data,
      filteredTransactions: data
    })
  }

  updateSearchTerm (searchTerm) {
    this.setState({
      searchTerm: searchTerm
    })
  }

  updateFilteredTransactions (filteredTransactions) {
    this.setState({
      filteredTransactions: filteredTransactions
    })
  }

  filterTransactions (searchTerm) {
    const transactions = this.state.transactions

    let filteredTransactions = transactions.filter(transaction => {
      return searchTerm === '' ? transactions : (transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.category.toLowerCase().includes(searchTerm.toLowerCase()))
    })

    this.updateFilteredTransactions(filteredTransactions)
  }

  handleChange = (event) => {
    const searchTerm = event.target.value

    this.updateSearchTerm(searchTerm)
    this.filterTransactions(searchTerm)
  }

  render () {
    return (
      <div>
        <Search searchTerm={this.state.searchTerm} handleChange={this.handleChange} />
        <TransactionsList transactions={this.state.filteredTransactions} searchTerm={this.state.searchTerm} />
      </div>
    )
  }
}

export default AccountContainer
