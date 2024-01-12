"use client" 

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

import Main from '@/components/Main';
import Left from '@/components/Left';
import Right from '@/components/Right';
import Middle from '@/components/Middle';
import Navbar from '@/components/Navbar';



export default function Home() {

  return (
    <Provider store={store}>
    <Navbar/>
    <Main>
      <Left/>
      <Middle/>
      <Right/>
    </Main>
    </Provider>
  )
}


// <Modal visible={true} setVisible={() => {}}>
// <FileUpload/>
// </Modal>