import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import sprite from '@/assets/icons.svg';
import './index.css';

interface Testimonial {
  _id: string;
  testimonial: string;
  owner: {
    name: string;
  };
}

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const fallbackData = [
        {
          _id: '1',
          testimonial:
            'Thank you for the wonderful recipe for feta pasta with tomatoes and basil. It turned out to be not only tasty, but also incredibly colorful. This has become a favorite family meal!',
          owner: { name: 'LARRY PAGEM' },
        },
        {
          _id: '2',
          testimonial:
            'I have never cooked so easily before! The instructions are perfectly clear and the result is always a masterpiece.',
          owner: { name: 'SARAH CONNOR' },
        },
        {
          _id: '3',
          testimonial:
            'Absolutely love the desserts section. My kids are asking for the apple pie every weekend now.',
          owner: { name: 'JOHN DOE' },
        },
      ];

      try {
        const { data } = await axios.get('/testimonials');
        if (Array.isArray(data)) {
          setTestimonials(data);
        } else {
          setTestimonials(fallbackData);
        }
      } catch (_error) {
        setTestimonials(fallbackData);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="testimonials-section">
      <div className="container">
        <p className="testimonials-subtitle">What our customer say</p>
        <h2 className="testimonials-title">TESTIMONIALS</h2>

        {testimonials.length > 0 && (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="testimonials-slider"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="testimonial-card">
                  <svg className="testimonial-quote-icon" aria-hidden="true">
                    <use href={`${sprite}#icon-quote`}></use>
                  </svg>
                  <p className="testimonial-text">{item.testimonial}</p>
                  <p className="testimonial-author">{item.owner.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};
