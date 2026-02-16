import './App.css'
import Router from './router'
import { useShop } from './User/Context/ShopContext'

export default function App() {
	const { toast, closeToast } = useShop()

  return (
    <>
      {toast ? (
        <div className={`toast-banner ${toast.type}`} role="status">
          <span>{toast.message}</span>
          <button type="button" onClick={closeToast} aria-label="Close">
            x
          </button>
        </div>
      ) : null}
      <Router />
    </>
  )
}