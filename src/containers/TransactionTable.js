import React from "react"
import { Table } from 'semantic-ui-react'
import TransactionTableRow from '../components/TransactionTableRow'

class TransactionTable extends React.Component {

    generateTable = () => {
        let allTransactions = this.props.budget.transactions
            return allTransactions.map(transaction => {
                return (
                    <TransactionTableRow transaction={transaction} deleteTransaction={this.props.deleteTransaction}/>
                )
            })
        }

    render() {

  

  return (
        <Table celled inverted selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Transaction</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {this.generateTable()}
            </Table.Body>
        </Table>
        );
    };
}

export default TransactionTable