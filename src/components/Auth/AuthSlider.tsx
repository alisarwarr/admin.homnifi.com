import React from 'react';
import Slider from 'react-slick';

const sliderData = [
  {
    title: 'Single Sign-on is an authentication',
    text: 'Scheme that allows a user to log in with a single ID to any of several related, yet independent, software systems',
  },
  {
    title: 'Secure Your Digital Identity',
    text: 'With Homnifi, Take Full Control Of Your Personal Data In A Secure And Transparent Way.',
  },
  {
    title: 'Seamless Integration',
    text: 'Log In Once And Access A Universe Of Services Without Compromising On Security.',
  },
  {
    title: 'Be The Architect Of Your Online Identity',
    text: 'Customize, Manage, And Authenticate Your Digital Identity Like Never Before.',
  },
];

const AuthSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    dots: true,
    customPaging: (i: any) => (
      <button>
        <span></span>
      </button>
    ),
    appendDots: (dots: any) => <ul style={{ margin: '0px' }}> {dots} </ul>,
  };

  let sliderRef: any = React.useRef<any>(null);

  return (
    <div className="w-full flex h-full items-end justify-center text-white">
      <Slider
        {...settings}
        ref={(slider: any) => {
          sliderRef = slider;
        }}
        className="authSlider w-full"
      >
        {sliderData.map((slider, index) => (
          <div className="px-5" key={index}>
            <div className="flex flex-col gap-2 bg-white/10 backdrop-blur-md p-2 w-full text-center rounded-lg">
              <div className="font-baumans text-lg">{slider.title}</div>
              <span className="text-xs font-light">{slider.text}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AuthSlider;
