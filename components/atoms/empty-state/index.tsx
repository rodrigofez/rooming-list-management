import styles from "./styles.module.css";

export const EmptyState = () => (
  <div className={styles.emptyState}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="lucide lucide-file-x2"
      viewBox="0 0 24 24"
    >
      <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4M8 12.5l-5 5M3 12.5l5 5" />
    </svg>
  </div>
);
