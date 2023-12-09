import styles from './404-page.module.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className={`${styles.notfound} page`}>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <h1 className={styles.title}>404 Not Found</h1>
      <h2>
        <Link to={'/'}>Return to main page</Link>
      </h2>
    </div >
  );
}
