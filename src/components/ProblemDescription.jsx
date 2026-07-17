import styles from "./ProblemDescription.module.css";

export default function ProblemDescription({ problem }) {
  const difficultyClass =
    problem.difficulty === "Easy"
      ? styles.easy
      : problem.difficulty === "Medium"
      ? styles.medium
      : styles.hard;

  return (
    <div className={styles.problem}>
      <h1 className={styles.title}>{problem.title}</h1>

      <span className={`${styles.difficulty} ${difficultyClass}`}>
        {problem.difficulty}
      </span>

      <section className={styles.section}>
        <h2>Description</h2>

        <p className={styles.description}>
          {problem.description}
        </p>
      </section>

      <section className={styles.section}>
        <h2>Examples</h2>

        <div className={styles.examples}>
          {problem.testCases.map((test, index) => (
            <div
              key={index}
              className={styles.exampleCard}
            >
              <div className={styles.exampleTitle}>
                Example {index + 1}
              </div>

              <div className={styles.label}>Input</div>

              <pre className={styles.codeBlock}>
{test.input}
              </pre>

              <div className={styles.label}>Output</div>

              <pre className={styles.codeBlock}>
{test.output}
              </pre>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}