/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteCustomers = /* GraphQL */ `
  mutation DeleteCustomers($id: Int!) {
    deleteCustomers(id: $id) {
      id
      name
      phone
      email
      address
    }
  }
`;
export const createCustomers = /* GraphQL */ `
  mutation CreateCustomers($createCustomersInput: CreateCustomersInput!) {
    createCustomers(createCustomersInput: $createCustomersInput) {
      id
      name
      phone
      email
      address
    }
  }
`;
export const updateCustomers = /* GraphQL */ `
  mutation UpdateCustomers($updateCustomersInput: UpdateCustomersInput!) {
    updateCustomers(updateCustomersInput: $updateCustomersInput) {
      id
      name
      phone
      email
      address
    }
  }
`;
