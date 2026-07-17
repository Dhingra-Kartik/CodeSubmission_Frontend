import styles from "./SubmissionResult.module.css";

function SubmissionResult({
  submissionInfo,
  result,
  isJudging,
}) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Submission</h2>

      {!submissionInfo ? (
        <div className={styles.emptyState}>
          No submission yet.
        </div>
      ) : (
        <div className={styles.infoCard}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Submission ID</span>
            <span>{submissionInfo._id}</span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.label}>Status</span>

            <span
              className={`${styles.badge} ${
                submissionInfo.status === "PENDING"
                  ? styles.pending
                  : styles.success
              }`}
            >
              {submissionInfo.status}
            </span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.label}>Language</span>
            <span>{submissionInfo.language}</span>
          </div>
        </div>
      )}

      <div className={styles.divider}></div>

      <h2 className={styles.heading}>Evaluation Result</h2>

      {isJudging ? (
        <div className={styles.judging}>
          ⏳ Evaluating your solution...
        </div>
      ) : !result ? (
        <div className={styles.emptyState}>
          No evaluation yet.
        </div>
      ) : (
        <>
          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <span className={styles.label}>User ID</span>
              <span>{result.userId}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.label}>Submission ID</span>
              <span>{result.submissionId}</span>
            </div>
          </div>

          <div className={styles.results}>
            {result.response.map((item, index) => (
              <div
                key={index}
                className={styles.resultCard}
              >
                <div className={styles.cardHeader}>
                  <h4>Test Case {index + 1}</h4>

                  <span
                    className={`${styles.badge} ${
                      item.status === "SUCCESS"
                        ? styles.success
                        : item.status === "ERROR"
                        ? styles.error
                        : styles.pending
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className={styles.outputLabel}>
                  Output
                </div>

                <pre className={styles.output}>
                  {item.output}
                </pre>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SubmissionResult;