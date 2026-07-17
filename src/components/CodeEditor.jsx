import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";

export default function CodeEditor({
  language,
  code,
  onLanguageChange,
  onCodeChange,
  onRun,
  onSubmit,
  isJudging,
}) {
  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        <div className={styles.leftControls}>
          <select
            className={styles.languageSelect}
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            <option value="CPP">C++</option>
            <option value="JAVA">Java</option>
            <option value="PYTHON">Python</option>
          </select>
        </div>

        <div className={styles.rightControls}>
          <button
            className={`${styles.button} ${styles.runButton}`}
            onClick={onRun}
            disabled={isJudging}
          >
            ▶ Run
          </button>

          <button
            className={`${styles.button} ${styles.submitButton}`}
            onClick={onSubmit}
            disabled={isJudging}
          >
            ✓ Submit
          </button>
        </div>
      </div>

      <div className={styles.editorWrapper}>
        <Editor
          height="75vh"
          language={
            language === "CPP"
              ? "cpp"
              : language === "JAVA"
              ? "java"
              : "python"
          }
          value={code}
          onChange={(value) => onCodeChange(value || "")}
          theme="vs-dark"
        />
      </div>
    </div>
  );
}