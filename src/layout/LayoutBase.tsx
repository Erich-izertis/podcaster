import {Outlet} from "react-router-dom";
import Layout from 'antd/es/layout';
// components
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

export default function LayoutBase(): JSX.Element {
  return (
    <Layout className='h-screen	max-h-screen min-h-screen bg-slate-100'>
      <Layout.Header className='bg-slate-100 border-b'>
        <Header/>
      </Layout.Header>
      <Layout.Content className='py-4 px-12 overflow-auto'>
        <Outlet />
      </Layout.Content>
      <Layout.Footer className='bg-slate-100'>
        <Footer/>
      </Layout.Footer>
    </Layout>
  );
};
