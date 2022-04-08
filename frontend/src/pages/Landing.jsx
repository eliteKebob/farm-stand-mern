import styles from "../styles/Landing.module.css"
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
} from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/css/effect-fade"
import "swiper/css/autoplay"
import image1 from "../assets/img1.jpg"
import image2 from "../assets/img2.jpg"
import image3 from "../assets/img3.jpg"
import CategoryNavigate from "../components/CategoryNavigate"

const Landing = () => {
  return (
    <section className={styles.landing}>
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
          Autoplay,
        ]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        effect="fade"
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <img src={image1} alt="img1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} alt="img2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image3} alt="img3" />
        </SwiperSlide>
      </Swiper>
      <CategoryNavigate />
      <div className={styles.video}>
        <h1>Hasat Nasıl Yapılır</h1>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/xna_qMVHoJE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className={styles.ytVideo}
        ></iframe>
      </div>
    </section>
  )
}
export default Landing
