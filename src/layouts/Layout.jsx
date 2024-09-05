import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import AuthModal from '../components/modals/AuthModal/AuthModal'
import ScrollTop from '../components/ScrollTop'
import { useDispatch, useSelector } from 'react-redux'
import { setShowAuthModal } from '../shared/toolkits/authModalSlice'

export default function Layout() {
  
  const { show: showAuthModal } = useSelector(state => state.authModal)
  const dispatch = useDispatch()

  const handleOpenAuthModal = () => {
    dispatch(setShowAuthModal(true))
  }

  const handleCloseAuthModal = () => {
    dispatch(setShowAuthModal(false))
  }

  return (
    <>
      <ScrollTop />
      <Header onOpenAuthModal={handleOpenAuthModal} />
      <main
        id="main"
        className="main"
        style={{
          marginTop: 'var(--margin-top-header)',
          minHeight: 'calc(100vh - var(--margin-top-header))'
        }}
      >
        <Outlet />
      </main>
      <Footer />
      <AuthModal show={showAuthModal} onClose={handleCloseAuthModal} />
    </>
  )
}
