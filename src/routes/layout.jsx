import { useEffect, useState } from 'react'
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Logo from './../assets/evervote-logo.jpg'
// import Logo from './../../public/upcard.svg'
import { useAuth, chainID } from './../contexts/AuthContext'
import MaterialIcon from './helper/MaterialIcon'
import { MenuIcon } from './components/icons'
import styles from './Layout.module.scss'

export default function Root() {
  const [network, setNetwork] = useState()
  const location = useLocation()
  const noHeader = ['/', '/splashscreen', '/tour']
  const auth = useAuth()
  const navigate = useNavigate()

  const handleNavLink = (route) => {
    if (route) navigate(route)
    handleOpenNav()
  }

  const handleOpenNav = () => {
    document.querySelector('#modal').classList.toggle('open')
    document.querySelector('#modal').classList.toggle('blur')
    document.querySelector('.cover').classList.toggle('showCover')
  }
  useEffect(() => {
    chainID().then((res) => {
      let networkType
      switch (res) {
        case 4201:
          networkType = `TESTNET`
          break
        case 42:
          networkType = `MAINNET`
          break
        default:
          break
      }
      setNetwork(networkType)
    })
  }, [])

  return (
    <>
      <Toaster />
      {!noHeader.includes(location.pathname) && (
        <>
          {network && (
            <div className={`d-flex align-items-center justify-content-center ${styles.network}`} data-type={network}>
              {network === 'MAINNET' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM11.3584 5.64645C11.1849 5.47288 10.9154 5.4536 10.7206 5.58859L10.6513 5.64645L7 9.298L5.35355 7.65131L5.28431 7.59346C5.08944 7.45846 4.82001 7.47775 4.64645 7.65131C4.47288 7.82488 4.4536 8.09431 4.58859 8.28917L4.64645 8.35842L6.64645 10.3584L6.71569 10.4163C6.8862 10.5344 7.1138 10.5344 7.28431 10.4163L7.35355 10.3584L11.3584 6.35355L11.4163 6.28431C11.5513 6.08944 11.532 5.82001 11.3584 5.64645Z"
                      fill="#0E700E"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.68149 0.785435C7.24892 -0.261875 8.75196 -0.261795 9.31928 0.785573L15.8198 12.7865C16.3612 13.786 15.6375 15.0009 14.5009 15.0009H1.4982C0.361474 15.0009 -0.362172 13.7858 0.179337 12.7864L6.68149 0.785435ZM8.5 5.5C8.5 5.22386 8.27614 5 8 5C7.72386 5 7.5 5.22386 7.5 5.5V9.5C7.5 9.77614 7.72386 10 8 10C8.27614 10 8.5 9.77614 8.5 9.5V5.5ZM8.75 11.75C8.75 11.3358 8.41421 11 8 11C7.58579 11 7.25 11.3358 7.25 11.75C7.25 12.1642 7.58579 12.5 8 12.5C8.41421 12.5 8.75 12.1642 8.75 11.75Z"
                      fill="#DA3B01"
                    />
                  </svg>
                </>
              )}
              {network}
            </div>
          )}

          <header className={`${styles.header} d-flex align-items-center justify-content-between`}>
            <ul className={`${styles.header__logo} d-flex align-items-center`}>
              <li>
                <Link to={`/`}>
                  <figure>
                    <img src={Logo} alt={`evervote`} width="60" height="60"/>
                  </figure>
                </Link>
              </li>
              <li className="d-flex flex-column">
                <b>EverVote</b>
              </li>
            </ul>

            <div className={`d-flex align-items-center`} style={{ columnGap: '1rem' }}>
              <ul className={`d-flex flex-column align-items-center`}>
                <li>{auth.profile && `🆙@${auth.profile.value.LSP3Profile.name}`}</li>
                <li>{auth.wallet && `${auth.wallet.slice(0, 4)}...${auth.wallet.slice(38)}`}</li>
              </ul>

              <button className={styles.navButton} onClick={() => handleNavLink()}>
                <MenuIcon />
              </button>
            </div>
          </header>
        </>
      )}
      <div className="cover" onClick={() => handleOpenNav()} />

      <nav className={`${styles.nav} animate`} id="modal">
        <figure>
          <img src={Logo} alt={`logo`} />
        </figure>
        <ul>
          <li className="">
            <button onClick={() => handleNavLink(`/`)}>
              <MaterialIcon name="home" />
              <span>Home</span>
            </button>
          </li>
          <li className="">
            <button onClick={() => handleNavLink(`/about`)}>
              <MaterialIcon name="create" />
              <span>Create</span>
            </button>
          </li>
          <li className="">
            <button onClick={() => handleNavLink(`/about`)}>
              <MaterialIcon name="man" />
              <span>Manage</span>
            </button>
          </li>
          <li className="">
            <button onClick={() => handleNavLink(`/about`)}>
              <MaterialIcon name="Check" />
              <span>Cast</span>
            </button>
          </li>
          <li className="">
            <button onClick={() => handleNavLink(`/about`)}>
              <MaterialIcon name="info" />
              <span>Log</span>
            </button>
          </li>
          <li className="">
            <button onClick={() => handleNavLink(`/feedback`)}>
              <MaterialIcon name="feedback" />
              <span>Feedback</span>
            </button>
          </li>
          <li>
            X:{' '}
            <a href="https://twitter.com/@ArattaLabs" style={{ color: 'var(--area1)' }}>
              @ArattaLabs
            </a>
          </li>
        </ul>

        <small>{`Version ${import.meta.env.VITE_VERSION}`}</small>
      </nav>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
          <a href="https://twitter.com/@ArattaLabs" target="_blank">
            <img alt="Twitter" src="data:image/svg+xml,%3csvg%20width='33'%20height='34'%20viewBox='0%200%2033%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_d_240_175)'%3e%3crect%20x='3.5'%20y='3'%20width='26'%20height='26'%20rx='13'%20fill='white'/%3e%3cpath%20d='M20.7722%209.5H23.0503L18.0732%2015.0067L23.9284%2022.5H19.3438L15.753%2017.9553L11.6442%2022.5H9.36467L14.6883%2016.61L9.07129%209.5H13.7723L17.0181%2013.654L20.7722%209.5ZM19.9726%2021.18H21.235L13.0864%2010.7507H11.7317L19.9726%2021.18Z'%20fill='black'/%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_240_175'%20x='0.219047'%20y='0.957143'%20width='32.5619'%20height='32.5619'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dy='1.2381'/%3e%3cfeGaussianBlur%20stdDeviation='1.64048'/%3e%3cfeComposite%20in2='hardAlpha'%20operator='out'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.25%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_240_175'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_240_175'%20result='shape'/%3e%3c/filter%3e%3c/defs%3e%3c/svg%3e"></img>
          </a>
          <a href="https://t.me/arattalabs" target="_blank">
            <img alt="Telegram" src="data:image/svg+xml,%3csvg%20width='33'%20height='34'%20viewBox='0%200%2033%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20filter='url(%23filter0_d_240_171)'%3e%3cg%20clip-path='url(%23clip0_240_171)'%3e%3cpath%20d='M16.5%2029C23.6797%2029%2029.5%2023.1797%2029.5%2016C29.5%208.8203%2023.6797%203%2016.5%203C9.3203%203%203.5%208.8203%203.5%2016C3.5%2023.1797%209.3203%2029%2016.5%2029Z'%20fill='url(%23paint0_linear_240_171)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.38472%2015.8628C13.1745%2014.2117%2015.7016%2013.1232%2016.966%2012.5972C20.5763%2011.0956%2021.3264%2010.8348%2021.8154%2010.8261C21.9229%2010.8242%2022.1634%2010.8509%2022.3192%2010.9773C22.4507%2011.084%2022.4869%2011.2282%2022.5042%2011.3293C22.5215%2011.4305%2022.543%2011.661%2022.5259%2011.8411C22.3303%2013.8967%2021.4837%2018.8851%2021.0531%2021.1874C20.8708%2022.1616%2020.512%2022.4883%2020.1646%2022.5203C19.4097%2022.5897%2018.8364%2022.0213%2018.1053%2021.542C16.9611%2020.792%2016.3147%2020.3251%2015.2041%2019.5932C13.9206%2018.7474%2014.7526%2018.2826%2015.4841%2017.5228C15.6755%2017.324%2019.0018%2014.2985%2019.0662%2014.0241C19.0742%2013.9897%2019.0817%2013.8618%2019.0057%2013.7942C18.9297%2013.7267%2018.8175%2013.7498%2018.7365%2013.7681C18.6218%2013.7942%2016.7939%2015.0023%2013.253%2017.3925C12.7342%2017.7488%2012.2643%2017.9224%2011.8432%2017.9133C11.3791%2017.9032%2010.4862%2017.6508%209.82244%2017.4351C9.00831%2017.1704%208.36126%2017.0305%208.4176%2016.5811C8.44695%2016.347%208.76932%2016.1075%209.38472%2015.8628Z'%20fill='white'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_d_240_171'%20x='0.219047'%20y='0.957143'%20width='32.5619'%20height='32.5619'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeColorMatrix%20in='SourceAlpha'%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200'%20result='hardAlpha'/%3e%3cfeOffset%20dy='1.2381'/%3e%3cfeGaussianBlur%20stdDeviation='1.64048'/%3e%3cfeComposite%20in2='hardAlpha'%20operator='out'/%3e%3cfeColorMatrix%20type='matrix'%20values='0%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.25%200'/%3e%3cfeBlend%20mode='normal'%20in2='BackgroundImageFix'%20result='effect1_dropShadow_240_171'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='effect1_dropShadow_240_171'%20result='shape'/%3e%3c/filter%3e%3clinearGradient%20id='paint0_linear_240_171'%20x1='1303.5'%20y1='3'%20x2='1303.5'%20y2='2583.72'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%232AABEE'/%3e%3cstop%20offset='1'%20stop-color='%23229ED9'/%3e%3c/linearGradient%3e%3cclipPath%20id='clip0_240_171'%3e%3crect%20x='3.5'%20y='3'%20width='26'%20height='26'%20rx='13'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"></img>
          </a>
          {/*  need to get proper svg code for github logo + fix footer styles */}
          <a href="https://github.com/Aratta-Labs" target="_blank">
                <img alt="Github" src="https://www.svgrepo.com/show/361182/github-inverted.svg" height="25" width="25"></img>
          </a>     
      </footer>
      
    </>
  )
}
