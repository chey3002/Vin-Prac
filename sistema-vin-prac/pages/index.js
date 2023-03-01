// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from '@/components/homePage';
import MenuWrapper from '@/components/sidebar';
import { Container } from 'react-bootstrap';

export default function Home() {
  
  return (
    <>
      <MenuWrapper>
        <HomePage />
      </MenuWrapper>
    </>
  )
}
