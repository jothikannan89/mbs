import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createCustomers } from './graphql/mutations'
import { listCustomerss } from './graphql/queries'
import awsExports from "./aws-exports";

Amplify.configure(awsExports);
const initialState = { id: '', name: '', phone: '', email: '' ,address: ''}

function App() {
  const [formState, setFormState] = useState(initialState)
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    fetchCustomers()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchCustomers() {
    try {
      const customerData = await API.graphql(graphqlOperation(listCustomerss))
      const customers = customerData.data.listCustomerss
      setCustomers(customers)
    } catch (err) { console.log('error fetching customers') }
  }

  async function addCustomer() {
    try {
      if (!formState.id || !formState.name || !formState.email || !formState.phone ||!formState.address) return
      const customer = { ...formState }
      setCustomers([...customers, customer])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createCustomers, {createCustomersInput: customer}))
    } catch (err) {
      console.log('error creating customer:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Amplify Customer</h2>
      <input
        onChange={event => setInput('id', event.target.value)}
        style={styles.input}
        value={formState.id}
        placeholder="Id"
      />
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('email', event.target.value)}
        style={styles.input}
        value={formState.email}
        placeholder="Email"
      />
      <input
        onChange={event => setInput('phone', event.target.value)}
        style={styles.input}
        value={formState.phone}
        placeholder="Phone"
      />
      <input
        onChange={event => setInput('address', event.target.value)}
        style={styles.input}
        value={formState.address}
        placeholder="Address"
      />
      <button style={styles.button} onClick={addCustomer}>Create Customer</button>
      {
          <table style={styles.table}>
          <tr>
          <th style={styles.th}>Id</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Address</th>
          </tr>
          {customers.map((customer, index) => {
            return (
              <tr key={customer.id ? customer.id :index} style={styles.th}>
                <td style={styles.td}>{customer.id}</td>
                <td style={styles.td}>name is :{customer.name}</td>
                <td style={styles.td}>{customer.phone}</td>
                <td style={styles.td}>{customer.email}</td>
                <td style={styles.td}>{customer.address}</td>
              </tr>
            )
          })}
        </table>
      
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  customerdata: { fontSize: 20, margin: 10, padding: 28},
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
  table: { width: 800, borderCollapse: 'collapse', border: '1px solid black',padding: '35px', marginTop: '30px' },
  td: {  textAlign: 'center' },
  th: {   border: '1px solid black' }
}

export default App;
