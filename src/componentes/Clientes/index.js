import axios from 'axios';

const API_URL = 'http://localhost:8080/clientes';

export const getAllClientes = async () => {
    return await axios.get(API_URL);
};

export const addCliente = async (cliente) => {
    return await axios.post(`${API_URL}/addCliente`, cliente);
};

export const updateCliente = async (cliente) => {
    return await axios.put(`${API_URL}/updateCliente`, cliente);
};

export const deleteCliente = async (cnpj) => {
    return await axios.delete(`${API_URL}/deleteCliente/${cnpj}`);
};
