import React from "react";
import "./gig.scss";
import { Slider } from "infinite-react-carousel";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Reviews from "../../components/reviews/Reviews";

export const Gig = () => {
  const { id } = useParams();
  console.log(id);

    const { isLoading, error, data } = useQuery({
      queryKey: ["gig"],
      queryFn: () =>
        newRequest.get(`/gigs/single/${id}`).then((res) => {
          return res.data;
        }),
    });
    
    const userId = data?.userId
    const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
      queryKey: ["user"],
      queryFn: () =>
        newRequest.get(`/users/${userId}`).then((res) => {
          return res.data;
        }),
        enabled: !!userId
    });
  
  // console.log(data)
  return (
    <div className="gig">
      {isLoading ? "Loading...": error ? "Something went wrong!" : <div className="container">
        <div className="left">
          <span className="breadCrumbs">FIVERR {">"} GRAPHICS & DESIGN {">"}</span>
          <h1>
            {data.title}
            </h1>
          {isLoadingUser ? "Loading" :errorUser ? "Something went wrong":  <div className="user">
            <img
              className="pp"
              src={dataUser.img || "/images/noavatar.jpg"}
              alt=""
            />
            <span>{dataUser.username}</span>
            {!isNaN(data.totalStars / data.starNumber) &&(
                <div className="stars">
                  {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i)=>( <img src="/images/star.png" alt="" key={i}/>))}
                  <span> {Math.round(data.totalStars / data.starNumber)}</span>
                </div>)}
          </div>}
          {/* <Slider slidesToShow={1} arrowsScroll={1} className="slider">
          {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
          </Slider> */}
          <h2>About This Gig</h2>
          <p>
            {data.desc}
          </p>
         { isLoadingUser ? "Loading..." : errorUser ? "Something went wrong!" : (<div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={dataUser.img  || "/images/noavatar.jpg"}
                alt=""
              />
              <div className="info">
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) &&(
                <div className="stars">
                  {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i)=>( <img src="/images/star.png" alt="" key={i}/>))}
                  <span> {Math.round(data.totalStars / data.starNumber)}</span>
                </div>)}
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Language</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
               {dataUser.desc}
              </p>
            </div>
          </div>)}
          <Reviews gigId= {id}/>
        </div>
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>$ {data.price}</h2>
          </div>
          <p>
            {data.shortDesc}
            {/* I will create a unique high quality AI generated image based on a
            description that you give me */}
          </p>
          <div className="details">
            <div className="item">
              <img src="/images/clock.png" alt="" />
              <span>{data.deliveryTime} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/images/recycle.png" alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
            {data.features.map((x)=> (<div className="item">
              <img src="/images/greencheck.png" alt=""  key={x}/>
              <span>{x}</span>
            </div>))}
          </div>
          <button>Continue</button>
        </div>
      </div>}
    </div>
  );
};
