import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {useRouter } from 'next/router'
import '../styles/globals.css'
import {Button, Container, Grid, Header, Image, Menu, Segment, Sidebar, Visibility} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const Navbar = () => {
  const [fixed, setFixed] = useState(false);
  const Router = useRouter();
  return(
    <Visibility 
      once={false} 
      onBottomPassed = {()=>setFixed(true)} 
      onBottomPassedReverse = {()=>setFixed(false)}>
        <Segment inverted textAlign = "center" style = {{minHeight:50, padding:'1em 2em'}}>
          <Menu fixed = {fixed ? "top":null} inverted = {!fixed} pointing = {!fixed} secondary = {!fixed} size = {'large'}>
            <Container>
              <Link href = "/"><Menu.Item>Home</Menu.Item></Link>
              <Link href = "/about"><Menu.Item>About</Menu.Item></Link>
              <Menu.Item position = "right">
                <Button onClick = {() => {
                  const storage = window.localStorage
                  const cart = JSON.parse(storage.getItem('Cart'));
                  Router.replace(cart.webUrl)
                }}>Checkout</Button>
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
    </Visibility>
  );
};
function MyApp({ Component, pageProps }) {
  return(
    <>
    <Navbar />
    <br />
    <Component {...pageProps} />
    </>
  );
}

export default MyApp
