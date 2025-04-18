import React from 'react'
import Layout from './src/components/Layout'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>
}