import styles from "./DifficultyFilter.module.css";

const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function DifficultyFilter({ selected, setSelected }) {
  return (
    <div className={styles.container}>
      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          className={`${styles.chip} ${
            selected === difficulty ? styles.active : ""
          }`}
          onClick={() => setSelected(difficulty)}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
}