// src/components/AllPosts.js

import AlexxEonNavbar from "./AlexxEonNavbar.js";
import SocialSection from "./SocialSection.js";

export default function Bio() {

    return (
        <div>
            <AlexxEonNavbar></AlexxEonNavbar>
            <section className="section">
                <div className="container is-half">
                    <p className="has-text-centered has-text-primary-light pt-2" style={{ fontFamily: 'Anek Telugu', fontSize: 24, fontWeight: 400 }}>
                        Music for Alexx was always there. <br />
                        Since the beginning. <br /> <br/>
                        Born and raised in the heart of Italy, Alexx developed his love for music early on, when at 9 years old he starts taking piano lessons. <br/>
                        While learning how to play and starting to understand how to write songs, he discovers the magic of electronic music, which ends up influencing his style. 
                        He listened carefully to dance, trance, techno, hip hop, rnb and electronic music through the years, and gains interest in writing cover songs.<br/>
                        <br/>
                        He becomes later interested in singing in order to convey to his pieces a more personal feeling to it. Which takes us to the latest years, when Alexx decides to create a platform to get his covers out.  
                    </p>
                </div>
            </section>
            <section className="section">
                <div className="tile is-ancestor mx-4">
                    <div className="tile is-parent">
                        <div className="tile is-child box">
                            <figure className="image is-square">
                                <img src="/assets/profile-photos/shadow-happy.jpg"></img>
                            </figure>
                        </div>
                    </div>
                    <div className="tile is-parent">
                        <div className="tile is-child box">
                            <figure className="image is-square">
                                <img src="/assets/profile-photos/white-funny.jpg"></img>
                            </figure>
                        </div>
                    </div>      
                    <div className="tile is-parent">                  
                    <div className="tile is-child box">
                        <figure className="image is-square">
                            <img src="/assets/profile-photos/shadow-cute.jpg"></img>
                        </figure>
                    </div>
                    </div>
                </div>
            </section >
        <SocialSection></SocialSection>
        </div >
    );
}