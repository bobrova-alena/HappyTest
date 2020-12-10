import Head from 'next/head'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadHTML from '../components/LoadHTML'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Happy Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadHTML></LoadHTML>
    </div>
  )
}
