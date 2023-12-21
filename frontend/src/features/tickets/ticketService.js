import axios from "axios";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/api/tickets/`;

// Create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};

// Get all tickets of current user
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get ticket of current user
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId, config);
  return response.data;
};

// CLose ticket of current user
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + ticketId,
    { status: "closed" },
    config
  );
  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};

export default ticketService;
