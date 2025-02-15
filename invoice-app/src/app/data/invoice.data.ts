import { Invoice } from "../models/invoice";

export const invoiceData: Invoice = {
    id: 1,
    name: 'Componentes de Laptop',
    client: {
        name: 'Matichelo',
        lastname: 'Ibarra',
        address: {
            country: 'Perú',
            city: 'Lima',
            street: 'Av. Los Alamos',
            number: 123,
        }
    },
    company: {
        name: 'Tech Solutions',
        fiscalCode: 123456789,
    },
    items: [
        {
            id: 1,
            product: 'Teclado',
            price: 50,
            quantity: 1
        },
        {
            id: 2,
            product: 'Mouse',
            price: 20,
            quantity: 1
        }
    ],
    total: 0
}