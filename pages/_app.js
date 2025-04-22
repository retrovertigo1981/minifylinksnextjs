// pages/_app.js
import '../app/globals.css'     // <- tu CSS de Tailwind
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}
