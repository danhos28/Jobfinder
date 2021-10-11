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
      className="w-80 sm:w-[450px] xl:w-3/4 lg:w-auto rounded-lg overflow-hidden max-w-screen-lg lg:mb-0 m-auto"
    >
      <div className="flex flex-col lg:flex-row justify-evenly gap-4">
        <Card
          src="/images/carousel-1.jpg"
          content="Working with professionals"
        />
        <Card
          src="/images/carousel-2.jpg"
          content="Good working environments"
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly gap-4">
        <Card src="/images/carousel-3.jpg" content="Make connections" />
        <Card src="/images/carousel-4.jpg" content="Flexible working hours" />
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly gap-4">
        <Card src="/images/carousel-5.jpg" content="Gain experiences" />
        <Card src="/images/carousel-6.jpg" content="Build your dream career" />
      </div>
    </Carousel>
    <Quotes
      src="/images/user-1.jpg"
      quotes="I feel very proud to be one of the oldest employee of Amazon. My career has skied with the growth of the company. The extraordinary Knowledge Transfer across the different streams of the project has benefitted lot of employee. I am really grateful to work in a place which makes us grow to greater heights."
      name="Jeffrey Manace"
      position="CEO at Amazon"
    />
  </div>
);

export default Carousels;
