import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export const fetchQuestions = () => API.get('/questions');
export const postQuestion = (data: { title: string; content: string }) => API.post('/questions', data);
