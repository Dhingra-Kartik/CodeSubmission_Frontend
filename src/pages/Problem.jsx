import styles from "./Problem.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../services/socket";
import { createSubmission } from "../services/submissionApi";
import SubmissionResult from "../components/SubmissionResult";
import Navbar from "../components/Navbar/Navbar";
import useAuth from "../hooks/useAuth";

import { getProblemById } from "../services/problemApi";

import ProblemDescription from "../components/ProblemDescription";
import CodeEditor from "../components/CodeEditor";

export default function Problem() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isJudging, setIsJudging] = useState(false);
  const [submissionInfo, setSubmissionInfo] = useState(null);

  const [language, setLanguage] = useState("CPP");
  const { token, user } = useAuth();

  const [codes, setCodes] = useState({
    CPP: "",
    JAVA: "",
    PYTHON: "",
  });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const data = await getProblemById(id);

        setProblem(data);

        const initialCodes = {};

        data.codeStubs.forEach((stub) => {
          initialCodes[stub.language] = `${stub.startSnippet}
${stub.userSnippet}
${stub.endSnippet}`;
        });

        setCodes(initialCodes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);
  useEffect(() => {
  if (!user) return;

  console.log("USER ID:", user.id);
  console.log("USER __ID:", user._id);

  socket.emit("setUserId", user.id);

  const handleSubmissionResult = (payload) => {
    console.log("Received Result:", payload);

    setSubmissionResult(payload);
    setIsJudging(false);
  };

  socket.on("submissionPayloadResponse", handleSubmissionResult);

  return () => {
    socket.off("submissionPayloadResponse", handleSubmissionResult);
  };
}, [user]);

  const handleRun = async () => {
  try {
    setSubmissionInfo(null);
    setSubmissionResult(null);
setIsJudging(true);
    const response = await createSubmission(
      {
      // userId: "1002",
      problemId: problem._id,
      language,
      code: codes[language],
      type: "RUN",
    }, 
  token
);
    setSubmissionInfo(response.data.submission);

    console.log("Run Submission:", response);
  } catch (err) {
    setIsJudging(false);
    console.error(err);
  }
};

const handleSubmit = async () => {
  try {
    setSubmissionInfo(null);
    setSubmissionResult(null);
setIsJudging(true);
    const response = await createSubmission(
      {
      // userId: "1002",
      problemId: problem._id,
      language,
      code: codes[language],
      type: "SUBMIT",
    },
  token
);
    setSubmissionInfo(response.data.submission);

    console.log("Submit Submission:", response);
  } catch (err) {
    setIsJudging(false);
    console.error(err);
  }
};

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleCodeChange = (newCode) => {
    setCodes((prev) => ({
      ...prev,
      [language]: newCode,
    }));
  };

  if (loading) return <h2>Loading...</h2>;

  if (!problem) return <h2>Problem not found.</h2>;

  return (
    <>
  <Navbar />
  <div className={styles.container}>

    <div className={styles.leftPanel}>
      <div className={styles.card}>
        <ProblemDescription problem={problem} />
      </div>
    </div>

    <div className={styles.rightPanel}>
      <div className={styles.card}>
        <CodeEditor
          language={language}
          code={codes[language]}
          onLanguageChange={handleLanguageChange}
          onCodeChange={handleCodeChange}
          onRun={handleRun}
          onSubmit={handleSubmit}
          isJudging={isJudging}
        />
      </div>

      <div className={styles.card}>
        <SubmissionResult
          submissionInfo={submissionInfo}
          result={submissionResult}
          isJudging={isJudging}
        />
      </div>
    </div>

  </div>

  </> //NAVBAR ENDING
);
}