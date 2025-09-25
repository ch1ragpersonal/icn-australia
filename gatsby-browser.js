import React from 'react'
import Layout from './src/components/Layout'
import favicon from './src/images/favicon.ico';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './src/styles/global.css'

const link = document.createElement('link');
link.rel = 'icon';
link.href = favicon;
document.head.appendChild(link);
export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>
}