import React from "react"
import { Table } from 'semantic-ui-react'

const TransactionTableRow = props => {

  return (
      <Table.Row>
        <Table.Cell>{props.transaction.name}</Table.Cell>
        <Table.Cell>{props.transaction.amount}</Table.Cell>
        <Table.Cell>{props.transaction.date}</Table.Cell>
      </Table.Row>
  );
};

export default TransactionTableRow