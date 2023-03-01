// Importing the Bootstrap CSS
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
