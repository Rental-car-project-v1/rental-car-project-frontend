import clsx from 'clsx'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutModal from '../../../components/modals/LogoutModal'
import placeholderImg from '../../../assets/img-profile.png'
import { useState } from 'react'

export default function Header({ onOpenAuthModal }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [show, setShow] = useState(false)

  return (
    <>
      <header id="header" className={clsx('fixed-top', styles.header)}>
        <div className="container d-flex align-items-center">
          <h1 className={clsx('me-auto', styles.logo)}>
            <Link to="/">
              <svg
                version="1.2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 264 164"
                width="50"
                height="50"
              >
                <path
                  fillRule="evenodd"
                  fill="#ffffff"
                  d="m261.4 104.1c3 12.5-1.2 29.6-8.1 32.7-0.1 0.1-0.3 0.2-0.5 0.2-6.1 1.3-11 0.5-15.5-2.5-2.9-2-4.4-5.6-5.2-9.1l-51.1 8.9c-1.2 13.6-6.9 25-14.4 27.4-4.7 1.5-13.8 3.2-23.2-2.2-5.9-3.4-8.7-11.1-9.8-17.1-9.2 1-22.1 0.6-28.5 0.6-6.7 0-30.3 0-54.8-2.1-2.7 6.1-6.4 10.4-10.7 11.8-4.7 1.5-13.8 3.2-23.2-2.2-6-3.4-8.7-11.2-9.9-17.3-4.3-3.1-4.1-5.5-4.6-10.9 1.4 1.5 5.7 5.1 21.9 6.6 12.2 1.2 53.8 4.8 74.7 3.9 21-0.9 22.7-4.3 24.9-9 2.1-4.8-1.6-4.4-5.7-4.4-5.3 0.1-46.2-1.2-88.9-3.9-25-1.6-24.9-3.3-27.7-5.1-0.4-7-0.6-13.9-0.1-16 0.8-3 3.1-4.8 4.5-5.6-0.3 2 55 8.1 121.4 5 14.4-0.6 16-2.1 19.4-12.1 2.4-7-0.3-11.4-7.4-9.8-3.7 0.8-22.5 5.2-33.9 8.3-9 2.4-26.5 2.1-26.5 2.1 0 0-54.7-0.7-60.6-2.3-8.6-2.5-6.5-8.2-6.5-8.3 0.9-4.7 8-10.7 33.4-19.1 25.4 2.7 94.8 0.7 104.9 1.4 6.7 0.4 9.6-2.6 9.6-2.6 0 0 11.1-20.5 14.4-27.1 3.3-6.7 1.8-6.5-1.3-6.7-35.9-2.2-63.4-1.4-97.8 1.4 3.6-2.9 6.8-5.4 9.2-7 11.2-7.3 18.9-9.9 34.1-10.6 0 0 104.9-6.2 126.3 10.1 8.4 6 12.6 22.7 16.9 49.5 3.9 24.2 1.4 38.5 0.3 43.1zm-94.7 6.1c-5.3-0.2-9.8 8.8-10.1 19.9-0.4 11.2 3.6 20.3 8.9 20.5 5.2 0.1 9.7-8.8 10.1-19.9 0.3-11.2-3.7-20.4-8.9-20.5zm12.8-2.4c0.4-16-13.3-24.7-23.1-10.6 12.6-1.3 19.1 2 22.9 16.2q0.1-2.8 0.2-5.6zm28.3-91.1c0 0-3.7-0.8-10.5 0-6.9 0.8-10 8.2-10 8.2 0 0-1.7 2.9-3.9 6.9 0.8 4.6 1.8 11.2 2.5 17.9 1.2 0 3.2 0 3.6-0.6 0.6-0.9 0.5-9.1 1.1-10.4 0.5-1.3 0.5-2.8 5.3-2.7 4.8 0.1 9.7-1.3 10.8 6.8 1 8.1 2 12.7-3.1 13.6-3.6 0.6-12.4 1.6-17 2q0.1 1.5 0.1 2.9c7.8-0.6 18.7-1.3 28-1.6 1.1-14.9-6.9-43-6.9-43zm43 40.4c0-5.6-3.3-30.7-9.7-36.2-8.1-6.8-21.7-4.1-22.9-4.6 0 0 9.5 32.2 9.3 42.2 15.9-1.1 19.6-0.5 23.3-1.4zm2.9 45.4c-3.3-0.2-6.5 5.5-7 12.9-0.6 7.4 1.6 13.6 4.9 13.9 3.3 0.2 6.4-5.5 7-12.9 0.6-7.4-1.6-13.6-4.9-13.9zm7-1c-2-15.8-11.4-17.1-15.1-7.7 8.1-1 10.6 1.3 10.6 1.3 1.8 1 3.4 3.3 4.5 6.4z"
                />
              </svg>
              <span className="fw-bold ms-2">Rent a car today!</span>
            </Link>
          </h1>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link to="/" className="nav-link">
                  ABOUT US
                </Link>
              </li>
              {isAuthenticated ? (
                <li className="nav-item dropdown pe-3">
                  <Link
                    className="nav-link nav-profile d-flex align-items-center pe-0"
                    to="#"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={user?.avatar?.imageUrl || placeholderImg}
                      alt="Profile"
                      className="rounded-circle img-profile"
                    />
                    <span className="d-none d-md-block dropdown-toggle ps-2 fs-6">
                      Welcom, {user?.username}
                    </span>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center"
                        to="/my-profile"
                      >
                        <span>My Profile</span>
                      </Link>
                    </li>
                    {user?.userType === 'CUSTOMER' && (
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center"
                          to="/my-booking"
                        >
                          <span>My Booking</span>
                        </Link>
                      </li>
                    )}
                    {user?.userType === 'OWNER' && (
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center"
                          to="/my-cars"
                        >
                          <span>My Cars</span>
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center"
                        to="/wallet"
                      >
                        <span>My Wallet</span>
                      </Link>
                    </li>
                    {user?.userType === 'OWNER' && (
                      <li>
                        <Link
                          className="dropdown-item d-flex align-items-center"
                          to="/my-reports"
                        >
                          <span>My Reports</span>
                        </Link>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center"
                        onClick={() => setShow(true)}
                      >
                        <span>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li>
                    <Link className="nav-link" onClick={onOpenAuthModal}>
                      SIGN UP
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" onClick={onOpenAuthModal}>
                      LOG IN
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <LogoutModal show={show} onClose={() => setShow(false)} />
    </>
  )
}
