import banner1 from "../theme/images/jewell/banner1.png"
import apiDataService from "../services/api.service"
import React, { useState } from 'react';
import { useEffect } from "react";
import noImage from "../theme/images/jewell/no-image.jpg"


const About = () => {

    const [about, setAbout] = useState([]);
    const [banner, setBanner] = useState([{ url: banner1 }]);

    useEffect(() => {
        getAbout();
    }, []);

    function getAbout() {
        apiDataService.getAbout()
            .then(async (response) => {
                console.log(response);
                let responseData = response.data.data;
                let ResponseAbout = responseData.about
                let aboutData = [];
                if (ResponseAbout) {
                    if (ResponseAbout.about_image.length > 0) {
                        aboutData = ResponseAbout.about_image;
                    }
                    console.log(aboutData);
                    setAbout(aboutData);
                } else {
                    setAbout([]);
                }

                let ResponseBanners = responseData.banners
                let bannerData = [];
                if (ResponseBanners) {
                    if (ResponseBanners.banner_image1.length > 0) {
                        bannerData = ResponseBanners.banner_image1[0];
                    }
                    console.log(bannerData);
                    setBanner(bannerData);
                } else {
                    setBanner([{ url: banner1 }]);
                }
            })
            .catch(e => {
                setAbout([{ url: banner1 }]);
                console.log(e);
            });
    }

    return (
        <>

            <section className="bg-img1 txt-center p-lr-15 p-tb-92" style={{ backgroundImage: `url(${banner.url})` }}>
                <h2 className="ltext-105 cl0 txt-center">
                    About
                </h2>
            </section>


            <section className="bg0 p-t-75 p-b-10">
                <div className="container">
                    <div className="row p-b-148">
                        <div className="col-md-7 col-lg-8">
                            <div className="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                                <h3 className="mtext-111 cl2 p-b-16">
                                    Our Story
                                </h3>

                                {(about.length > 0 && about[0].url && about[0].url != "" && about[0].url != null && about[0].detail) ?
                                    <div className="tiny-p" dangerouslySetInnerHTML={{ __html: about[0].detail.replace(/\n/g, '<br />') }} ></div>
                                    : ""}
                            </div>
                        </div>

                        <div className="col-11 col-md-5 col-lg-4 m-lr-auto">
                            <div className="how-bor1 ">
                                <div className="hov-img0">
                                    {
                                        (about.length > 0 && about[0].url && about[0].url != "" && about[0].url != null) ?
                                            <img src={about[0].url} alt="IMG" /> :
                                            <img src={noImage} alt="IMG" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

        </>
    )
}
export default About