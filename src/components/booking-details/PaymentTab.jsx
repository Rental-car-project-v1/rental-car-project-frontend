import { useEffect, useState } from "react"
import { MULTIPLIED_AMOUNT } from "../../shared/constants"
import { currencyFormat } from "../../shared/utils"
import { Link } from "react-router-dom"
import { getMyWalletApi } from "../../shared/apis/userApi"

function PaymentTab() {

  const [wallet, setWallet] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getMyWalletApi().then(data => {
      const resWallet = data?.data?.wallet ?? 0
      setWallet(resWallet * MULTIPLIED_AMOUNT)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="p-4">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          id="rdbWallet"
          checked
          readOnly
        />
        <label className="form-check-label" htmlFor="rdbWallet">
          My Wallet
        </label>
        <p>Current balance: {loading ? 'Loading...' : currencyFormat(wallet, 'VND', false)} VND</p>
      </div>
      <p>Please make sure to have suffcient when you return a car</p>
      <p>
        Go to <Link to="/wallet">My Wallet</Link>
      </p>
    </div>
  )
}

export default PaymentTab
