import { useState, useEffect, useRef } from 'react'
import { defer, useNavigate, useLoaderData } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Logo from './../assets/evervote-logo.jpg'
import styles from './SplashScreen.module.scss'

export const loader = async () => {
  return defer({
    isTourSeen: await localStorage.getItem('tour'),
  })
}

const SplashScreen = ({ title }) => {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const navigate = useNavigate()
  const frameRef = useRef()

  useEffect(() => {
    //Close the page
    window.setTimeout(() => {
      frameRef.current.classList.add('animate__fadeOutUp')
    }, 1000)

    // // Navigate to
    window.setTimeout(() => {
      if (JSON.parse(loaderData.isTourSeen)) navigate('/home')
      else navigate('/tour')
    }, 1500)
  }, [])

  return (
    <section className={`${styles.section} animate__animated animate__fadeIn`} ref={frameRef}>
      <figure>
        <img alt={import.meta.env.VITE_NAME} src={Logo} />
      </figure>
    </section>
  )
}

export default SplashScreen
