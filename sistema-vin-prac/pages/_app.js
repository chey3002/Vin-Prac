import '@/styles/globals.css'
import { ProSidebarProvider } from 'react-pro-sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App({ Component, pageProps }) {
  return <ProSidebarProvider><Component {...pageProps} /></ProSidebarProvider>
}
