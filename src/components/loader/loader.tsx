import styles from './loader.module.css';
import { useEffect } from 'react';

export function Loader(): JSX.Element | null {
  const message = 'Loading...';

  function handleDocumentClick(event: MouseEvent) {
    event.preventDefault();
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return(() => document.removeEventListener('click', handleDocumentClick));
  }, []);

  return (
    <p className={`${styles.message}`}>{message}</p>
  );
}
