import { useState } from "react";
import api from "../services/api";

function SubmissionForm({ userId, onSubmissionCreated }) {
  const [problemId, setProblemId] = useState("6a48c0ebb90332dd7ddd6c63");
  const [code, setCode] = useState(`int main(){
int x;
cin>>x;
cout<<x*x;
return 0;
}`);

  const [language, setLanguage] = useState("cpp");
  const [status, setStatus] = useState("");

  const submitProblem = async () => {
    if (!userId) {
      alert("Please set your User ID first.");
      return;
    }

    const payload = {
      Authorization: Bearer <JWT>
      problemId,
      code,
      language,
    };

    try {
      setStatus("Submitting...");

      const res = await api.post("/api/v1/submissions", payload);

      console.log(res.data);

      if (onSubmissionCreated) {
          onSubmissionCreated(res.data.data.submission);
        }

        setStatus("✅ Submission created successfully.");
      
    } catch (err) {
      console.error(err);

      setStatus("❌ Failed to create submission.");
    }
  };

  return (
    <div>
      <h2>Submit Problem</h2>

      <input
        type="text"
        value={problemId}
        onChange={(e) => setProblemId(e.target.value)}
      />

      <br /><br />

      <textarea
        rows="10"
        cols="60"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br /><br />

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
      </select>

      <br /><br />

      <button onClick={submitProblem}>
        Submit
      </button>

      {status && (
        <>
          <br />
          <br />
          <p>{status}</p>
        </>
      )}
    </div>
  );
}

export default SubmissionForm;