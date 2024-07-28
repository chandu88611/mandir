"use client";
import FormModal from "@/components/AddCampaignForm";
import FAQ from "@/components/FAQAccordian";
import Testimonials from "@/components/Testimonial";
import Donations from "@/components/WhytoDonate";
import FundraisingBanner from "@/components/YourCampaign";
import { useGetAllCampaignQuery } from "@/redux/services/campaignApi";
import Link from "next/link";
// import Footer from "@/components/Footer";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
// import 'swiper/components/navigation/navigation.min.css';
// import 'swiper/components/pagination/pagination.min.css';

import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

const HeroSlider = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const slides = [
    {
      id: 1,
      background:
        "/images/back1.webp",
      title: "GUITAR CLASSES FOR KIDS",
      text: "Want to see your kid become more expressive?",
    },
    {
      id: 2,
      background:
      "/images/back4.webp",
      title: "GUITAR CLASSES FOR KIDS",
      text: "Want to see your kid become more expressive?",
    },
    {
      id: 3,
      background:
        "/images/back3.webp",
      title: "GUITAR CLASSES FOR KIDS",
      text: "Want to see your kid become more expressive?",
    },
  ];
  const paginationRef = useRef(null);
const {data:campaigns}=useGetAllCampaignQuery()
console.log(campaigns)
  useEffect(() => {
    if (paginationRef.current) {
      paginationRef.current.classList.add('custom-swiper-pagination');
    }
  }, [paginationRef]);

  const faqs = [
    { question: 'What is Devaseva?', answer: 'Devaseva is a platform that...' },
    { question: 'What are various services offered by Devaseva?', answer: 'We offer...' },
    { question: 'How can I trust Devaseva?', answer: 'You can trust us because...' },
    { question: 'Will I receive the same benefits if I am not physically present?', answer: 'Yes, you will receive...' },
    { question: 'Who conducts the pujas?', answer: 'The pujas are conducted by...' },
    { question: 'Where do you conduct the rituals?', answer: 'The rituals are conducted...' },
    // Add more FAQs as needed
  ];
  return (
    <section>
      <div className=" w-full ">
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
              <img
                className="h-80 md:h-[605px] bg-center bg-no-repeat bg-cover w-full"
                src={slide.background}
              />
              
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

<Donations/>
    <FundraisingBanner/>

      <div className="py-10 px-3  bg-center bg-cover" 
      style={{backgroundImage:"url(/images/back.png)"}}
      >
        <h1 className="text-3xl font-bold text-center text-red-500">Campaigns</h1>
        <p className="w-full md:w-[60%] mx-auto">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae reiciendis distinctio aliquam quas minus accusantium optio accusamus rem. Aut atque numquam fuga eum est provident praesentium at cumque mollitia debitis!</p>
        <img src="/images/back2.png" className="mx-auto" alt="" srcset="" />
        <div className="min-h-96 px-2 w-full md:w-[80%] mx-auto">
          <Swiper
            slidesPerView={1}
            // spaceBetween={10}
            navigation={true}
            
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            breakpoints={{
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
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
            className="w-full my-3 "
          >
            {campaigns?.campaigns?.map((data,i)=>(

            <SwiperSlide className="flex items-center w-full justify-center h-96 mb-6 " key={i+"1"}>
            <div
  class="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark ">
  <a href="#!">
    <img
      className="rounded-t-lg w-full h-[200px]"
      src={data?.featured_image_base_url}
      alt="" />
  </a>
  <div class="p-6 text-surface dark:text-white">
    <h5 class="mb-2 text-xl leading-tight font-bold">{data?.temple_name}</h5>
    <div class="mb-4 text-base h-28 overflow-auto vertical-scroller">
    {data?.description}
    </div>

    <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-orange-500 font-bold">{Math.round((Math.round(data?.donated_amount) / Math.round(data?.target_amount)) * 100)}% raised</span>
                <span className="text-gray-700">{data?.end_date}</span>
              </div>
              <input
                type="range"
                value={Math.round((Math.round(data?.donated_amount) / Math.round(data?.target_amount)) * 100)}
                className="w-full mt-2"
                readOnly
              />
            </div>
    <Link href={`/campaign/${data?.id}`}>
    <button className=" w-full bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 hover:via-brown-500 text-white font-bold py-2 px-4 rounded">
      Donate Now
    </button>
    </Link>
  </div>
</div>
              
            
            </SwiperSlide>
            ))}

             
            

            <div ref={paginationRef} className="swiper-pagination"></div>
          </Swiper>
        </div>
      </div>
<div className="px-3 md:px-10 my-4 w-full md:w-[70%] mx-auto">
<h2 className="text-2xl font-bold text-center ">FAQs</h2>
<p className="text-center">Clear you all your doubts here regarding how things work</p>
      <FAQ />
</div>
<Testimonials/>
<FormModal open={open} onClose={handleClose} />
    </section>
  );
};

export default HeroSlider;
