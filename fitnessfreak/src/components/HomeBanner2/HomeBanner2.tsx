import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./HomeBanner2.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const HomeBanner2 = () => {
  const [workouts, setWorkouts] = React.useState<any[] | null>(null);

  const getworkouts = async () => {
    let data: any = [
      {
        type: "community engagment!",
        imageUrl:
          "https://img.freepik.com/free-vector/illustrated-people-with-social-network_53876-37263.jpg?w=826&t=st=1718769643~exp=1718770243~hmac=40680e507bd3c56bc11da55513635d1da83c61318d87f6936a8a572c88757e65",
        // durationInMin: ,
      },
      {
        type: "Nutrition Volt",
        imageUrl:
          "https://img.freepik.com/free-vector/fruit-salad-bowls_23-2148481259.jpg?t=st=1718769945~exp=1718773545~hmac=a8037719a18022ab6761b63b9ed43dad57d159c578936f1d260ec803894c4269&w=826",
        durationInMin: 90,
      },
      {
        type: "Workouts",
        imageUrl:
          "https://img.freepik.com/premium-photo/portrait-young-sporty-woman-starting-block-race-isolated-white-studio-background-sprinter-jogger-exercise-workout-fitness-training-jogging-concept-profile_489646-5896.jpg?w=1380",
        durationInMin: 70,
      },
      {
        type: "AI Assitant",
        imageUrl:
          "https://img.freepik.com/free-vector/hand-drawn-ai-alignment-illustration_52683-156464.jpg?t=st=1718770073~exp=1718773673~hmac=42af5feb0f73797a356da89ec400c6b5c49958b5fe632fb5cf292cac4fdf6055&w=826",
        durationInMin: 40,
      },
      {
        type: "Routines",
        imageUrl:
          "https://img.freepik.com/premium-photo/sports-things-sportsman-violet_118454-4728.jpg?w=1060",
        durationInMin: 50,
      },
      {
        type: "Nutrition Materials",
        imageUrl:
          "https://img.freepik.com/free-photo/front-view-copybooks-pens-colorful-pencils-mask-spray-blue-surface_140725-63652.jpg?t=st=1718770480~exp=1718774080~hmac=7ffe15a43cf8a3872ffe21af69a511f4cef9b3a07e17ce09fefde10a79a00229&w=1380",
        durationInMin: 60,
      },

      // {
      //   type: "Legs",
      //   imageUrl:
      //     "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVnJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      //   durationInMin: 80,
      // },

      // {
      //   type: "Cardio",
      //   imageUrl:
      //     "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FyZGlvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      //   durationInMin: 100,
      // },
      // {
      //   type: "Forearms",
      //   imageUrl:
      //     "https://images.unsplash.com/photo-1591940742878-13aba4b7a34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZWFybXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      //   durationInMin: 110,
      // },
    ];
    setWorkouts(data);
  };
  React.useEffect(() => {
    getworkouts();
  }, []);

  return (
    <div className="banner22">
      <h1 className="fira-sans-condensed-extrabold-italic">
        <span className="first-letter">F</span>itness & <span className="second-letter">N</span>
        utrition
      </h1>
      <div>
        <p className="features">Features we have included for you!!</p>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {workouts &&
          workouts.map((item, index) => {
            return (
              <SwiperSlide key={index} className="acc-swiper">
                <div
                  className="swiper-slide"
                  style={{
                    background: `url(${item.imageUrl}) no-repeat center center`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="swiper-slide-content">
                    <h2>{item.type}</h2>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div className="filler-text">
        <div>back</div>
        <div>to</div>
        <div>results!</div>
        <hr />
      </div>
    </div>
  );
};

export default HomeBanner2;
