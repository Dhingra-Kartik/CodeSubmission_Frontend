import styles from "./ProblemCard.module.css";

export default function ProblemCard({ problem, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div>
        <h3 className={styles.title}>{problem.title}</h3>

        <div className={styles.meta}>
          <span
            className={`${styles.badge} ${
              styles[problem.difficulty.toLowerCase()]
            }`}
          >
            {problem.difficulty}
          </span>
        </div>
      </div>

      <button className={styles.solveBtn}>Solve →</button>
    </div>
  );
}