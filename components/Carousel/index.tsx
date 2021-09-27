/* eslint-disable react/jsx-boolean-value */
import { Carousel } from 'react-responsive-carousel';
import Card from './Card';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Quotes from './Quotes';

const Carousels = () => (
  <div className="flex flex-col h-full w-screen lg:h-auto justify-evenly items-center px-4 sm:px-0 lg:py-24 bg-layer">
    <div className="font-poppins">
      <h1 className="font-black text-3xl mt-12 lg:mt-0 px-4 lg:px-0">
        Endless career opportunities await.
      </h1>
      <p className="text-lg mb-12 px-4 lg:px-0">
        From corporations to startups — we offer work that you want.
      </p>
    </div>
    <Carousel
      showArrows={true}
      showThumbs={false}
      autoPlay={true}
      swipeable={true}
      interval={3000}
      infiniteLoop={true}
      className="w-80 sm:w-96 xl:w-3/4 lg:w-auto rounded-lg overflow-hidden max-w-screen-lg lg:mb-0"
    >
      <div className="flex flex-col lg:flex-row justify-evenly">
        <Card src="/images/carousel-1.jpg" content="Lorem Ipsum Lorem" />
        <Card src="/images/carousel-2.jpg" content="Lorem Ipsum Lorem" />
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly">
        <Card src="/images/carousel-3.jpg" content="Lorem Ipsum Lorem" />
        <Card src="/images/carousel-4.jpg" content="Lorem Ipsum Lorem" />
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly">
        <Card src="/images/carousel-5.jpg" content="Lorem Ipsum Lorem" />
        <Card src="/images/carousel-6.jpg" content="Lorem Ipsum Lorem" />
      </div>
    </Carousel>
    <Quotes
      src="/images/user-1.jpg"
      quotes=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quo
          inventore animi amet est. Sit quo inventore animi amet est. Sit quo
          inventore animi amet est inventore animi amet est. Sit quo inventore
          animi amet est."
      name="Jeffrey Manace"
      position="CEO at Amazon"
    />
  </div>
);

export default Carousels;
