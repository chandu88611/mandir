"use client";
import React from "react";

import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";

import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      background:
        "https://images.unsplash.com/photo-1578934191836-ff5f608c2228?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
      title: "GUITAR CLASSES FOR KIDS",
      text: "Want to see your kid become more expressive?",
    },
    {
      id: 2,
      background:
        "https://images.unsplash.com/photo-1579003087287-997fd4d18771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      title: "GUITAR CLASSES FOR KIDS",
      text: "Want to see your kid become more expressive?",
    },
    {
      id: 3,
      background:
        "https://images.unsplash.com/photo-1579003087287-997fd4d18771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      title: "GUITAR CLASSES FOR KIDS",
      text: "Want to see your kid become more expressive?",
    },
  ];

  return (
    <section>
      <header className="hero-slider hero-style w-full">
        <Swiper
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          speed={1000}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="h-full w-full">
              <div
                className="slide-inner slide-bg-image"
                style={{ backgroundImage: `url(${slide.background})` }}
              >
                <div className="container">
                  <div data-swiper-parallax="300" className="slide-title">
                    <h2>{slide.title}</h2>
                  </div>
                  <div data-swiper-parallax="400" className="slide-text">
                    <p>{slide.text}</p>
                  </div>
                  <div className="clearfix"></div>
                  <div data-swiper-parallax="500" className="slide-btns">
                    <a href="#" className="theme-btn-s2">
                      Register now
                    </a>
                    <a href="#" className="theme-btn-s3">
                      <i className="fas fa-chevron-circle-right"></i> Get Info
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </header>
      <div className="h-14 py-10 px-40">
        <h1 className="text-3xl font-bold text-center">Campaigns</h1>
        <div className="min-h-96">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop
            speed={1000}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide className="flex items-center justify-center h-96">
              Slide 1 br
              <br />
              Slide 1<br />
              Slide 1<br />
              Slide 1<br />
              Slide 1<br />
              Slide 1<br />
              Slide 1<br />
              Slide 1<br />
              Slide 1<br />
              Slide 1<br />
              Slide 1<br />
              Slide 1<br />
              Slide 1<br />
              Slide 1<br />
            </SwiperSlide>

            <SwiperSlide className="flex items-center justify-center h-96">
              Slide 1
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center h-96">
              Slide 1
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center h-96">
              Slide 1
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center h-96">
              Slide 1
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center h-96">
              Slide 1
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center h-96">
              Slide 1
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center h-96">
              Slide 1
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
