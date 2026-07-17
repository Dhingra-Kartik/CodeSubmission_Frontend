
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProblems } from "../services/problemApi";

import ProblemCard from "../components/Problems/ProblemCards";
import styles from "./Home.module.css";
import SearchBar from "../components/Problems/SearchBar";
import DifficultyFilter from "../components/Problems/DifficultyFilter";
import Navbar from "../components/Navbar/Navbar";

export default function Home() {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getProblems();
        setProblems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProblems();
  }, []);

  const filteredProblems = problems.filter((problem) => {
  const matchesSearch = problem.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesDifficulty =
    selectedDifficulty === "All" ||
    problem.difficulty === selectedDifficulty;

  return matchesSearch && matchesDifficulty;
});


  return (
    <>
  <Navbar />
    <div className={styles.container}>
      <h1>Explore Problems</h1>
      <p>Sharpen your coding skills by solving algorithmic challenges.</p>

<SearchBar
  search={search}
  setSearch={setSearch}
/>
<DifficultyFilter
  selected={selectedDifficulty}
  setSelected={setSelectedDifficulty}
/>

      {filteredProblems.length === 0 ? (
  <p>No matching problems found.</p>
) : (
  filteredProblems.map((problem) => (
    <ProblemCard
      key={problem._id}
      problem={problem}
      onClick={() => navigate(`/problems/${problem._id}`)}
    />
  ))
)}

    </div>


  </> //THE NAVBAR END
  );
}