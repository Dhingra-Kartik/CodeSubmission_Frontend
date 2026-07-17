import api from "./api";
const VITE_PROBLEM_SERVICE = import.meta.env.VITE_PROBLEM_SERVICE;

export const getProblems = async () => {
  const response = await api.get(`${VITE_PROBLEM_SERVICE}`);
  return response.data.data;
};

export const getProblemById = async (id) => {
  const response = await api.get(`${VITE_PROBLEM_SERVICE}/${id}`);
  return response.data.data;
};