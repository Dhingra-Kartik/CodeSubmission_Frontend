import api from "./api";
const VITE_SUBMISSION_SERVICE = import.meta.env.VITE_SUBMISSION_SERVICE;


export const createSubmission = async ({
    // userId,
  problemId,
  language,
  code,
  type = "RUN",
},
token 
) => {
  const response = await api.post(`${VITE_SUBMISSION_SERVICE}`, {
    // userId,
    problemId,
    language,
    code,
    type,
  },
  {
  headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};