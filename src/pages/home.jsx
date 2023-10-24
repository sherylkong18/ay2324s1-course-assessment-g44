import React from 'react';
import Header from '../components/header'
import Navbar from '../components/navbar'
import HomepageGrid from '../components/page_elements/homePageGrid'
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectUser } from '../backend/user_backend/features/auth';
import { useNavigate } from 'react-router-dom';
import verifyAccessToken from '../backend/user_backend/utils/Utils';
import { useEffect } from 'react';

function Home() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    verifyAccessToken(user).then(isVerified => {
      if (!isVerified && user) {
        navigate("/login", { state: {isTimeOut: true} });
      } else if (!isVerified && !user) {
        navigate("/login");
      }
    });

  });


    return (
      <AppShell
      header={{ height: 100 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>  
        
          <AppShell.Navbar p="lg">
            <Navbar/>
          </AppShell.Navbar>
    
          <AppShell.Main>
            <HomepageGrid />
          </AppShell.Main>
        </AppShell>
      );
    }
  
  export default Home;