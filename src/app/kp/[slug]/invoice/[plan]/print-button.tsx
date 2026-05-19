'use client';

import { DownloadIcon } from '../../../icons';
import styles from './invoice.module.css';

export function InvoicePrintButton() {
  return (
    <div className={`${styles.toolbar} ${styles.noPrint}`}>
      <button
        type="button"
        onClick={() => window.print()}
        className={styles.printBtn}
        aria-label="Скачать счёт PDF"
      >
        <DownloadIcon size={14} /> Скачать счёт PDF
      </button>
    </div>
  );
}
