import type { NextPage } from 'next';
import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Layout from '../components/Layout';

const Home: NextPage = () => (
  <>
    <Layout title="Jobfinder: Find your dream job">
      <Hero />
      <Carousel />
      <Banner />
      <Footer />
    </Layout>
  </>
);
export default Home;
