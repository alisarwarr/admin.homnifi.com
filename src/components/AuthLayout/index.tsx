import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthHeader from '../Auth/AuthHeader'
import AuthSlider from '../Auth/AuthSlider'
import { LayoutImage1, LayoutImage2, LayoutImage3 } from '../../images/Auth'
import Slider from "react-slick";

const backgroundImages = [
    LayoutImage1,
    LayoutImage2,
    LayoutImage3
]

export default function AuthLayout(): JSX.Element {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        dots: false,
        slideToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        fade: true,
        swipe: false,
        draggable: false,
        pauseOnHover: false,
        pauseOnFocus: false
    };

    let sliderRef: any = React.useRef<any>(null);

    return (
        <div className='flex flex-col gap-4 max-w-[1200px] items-center m-auto'>
            <AuthHeader />
            <div className="flex w-full gap-10 p-8">
                <Outlet />
                <div className="flex items-center justify-center w-full">
                    <div className="relative">
                        <div className="absolute -top-8 -left-8 w-52 h-80 p-1 bg-gradient-to-r from-primary to-primaryLight rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden" style={{ zIndex: 0 }}>
                            <div className="bg-white w-full h-full rounded-tl-[3.8rem] rounded-br-[3.8rem]" />
                        </div>

                        <div className="relative w-96 h-[40rem] overflow-hidden rounded-tl-[4rem] rounded-br-[4rem]" style={{ zIndex: 99 }}>

                            <div style={{ zIndex: 1 }} className='relative'>
                                <Slider {...settings}
                                    ref={(slider: any) => {
                                        sliderRef = slider;
                                    }}
                                    className='absolute w-full top-0 left-0 imageSlider'
                                >
                                    {backgroundImages.map((image, index) => (

                                        <div
                                            key={index}
                                        >
                                            <div
                                                className={`bg-cover bg-no-repeat bg-center w-full h-[40rem]`}
                                                style={{
                                                    backgroundImage: `url(${image})`
                                                }} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="w-full h-full bg-gradient-to-b from-transparent via-transparent to-primaryDark/60 relative" style={{ zIndex: 10 }}>

                                <AuthSlider />
                            </div>
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-52 h-80 p-1 bg-gradient-to-l from-primary to-primaryLight rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden" style={{ zIndex: 0 }}>
                            <div className="bg-white w-full h-full rounded-tl-[3.8rem] rounded-br-[3.8rem]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}