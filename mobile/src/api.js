import axios from 'axios';
import { Platform } from 'react-native';

// For web browser: uses localhost:5000
// For physical mobile devices via Expo Go: set to your machine's LAN IP address (e.g. '192.168.1.X')
const DEV_MACHINE_IP = 'localhost';

const BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:5000' 
  : `http://${DEV_MACHINE_IP}:5000`;

const API_URL = `${BASE_URL}/api/todos`;

export const getTasks = () => axios.get(API_URL);
export const addTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, updates) => axios.patch(`${API_URL}/${id}`, updates);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);

