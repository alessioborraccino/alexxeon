// src/components/AllPosts.js

import AlexxEonNavbar from "./AlexxEonNavbar.js";
import SocialSection from "./SocialSection.js";

export default function Bio() {

    return (
        <div>
            <AlexxEonNavbar></AlexxEonNavbar>
            <section className="section">
                <div className="container is-max-desktop">
                    <p className="has-text-centered has-text-primary-light pt-2 px-4" style={{ fontFamily: 'Anek Telugu', fontSize: 24, fontWeight: 400 }}>
                        <br />
                        For Alexx, Music has always been there. <br />
                        Born and raised in the heart of Italy, Alexx loved music since childhood. <br /> <br />
                        When he was 9 years old, he asked for lessons to learn how to play his favourite instrument: the piano. <br />
                    </p>
                </div>
            </section>
            <section className="section">
                <div className="tile is-ancestor mx-4">
                    <div className="tile is-parent is-6">
                        <div className="tile is-child box">
                            <figure className="image is-6by4">
                                <img src="/assets/profile-photos/looking-up-from-stairs.jpeg"></img>
                            </figure>
                        </div>
                    </div>
                    <div className="tile is-parent is-6">
                        <div className="tile is-child box">
                            <figure className="image is-6by4">
                                <img src="/assets/profile-photos/happy.jpg"></img>
                            </figure>
                        </div>
                    </div>
                </div>
            </section >
            <section className="section">
                <div className="container is-half">
                    <p className="has-text-centered has-text-primary-light px-4" style={{ fontFamily: 'Anek Telugu', fontSize: 24, fontWeight: 400 }}>
                        In the midst of learning how to play and starting to understand how to write songs as well, Alexx discovered the magic of Electronic music, which became the main influence on his music style. <br /> <br />
                        Carefully, Alexx listened to Dance, Trance, Techno, Hip Hop, RnB and Electronic music through the years. All these different styles made him wonder what certain songs would sound like with his own personal twist and thus, his interest for writting cover songs was born.
                    </p>
                </div>
            </section>
            <section className="section">
                <div className="tile is-ancestor mx-4">
                    <div className="tile is-parent">
                        <div className="tile is-child box">
                            <figure className="image is-6by4">
                                <img src="/assets/profile-photos/playing-with-microphone.jpeg"></img>
                            </figure>
                        </div>
                    </div>
                    <div className="tile is-parent is-6">
                        <div className="tile is-child box">
                            <figure className="image is-6by4">
                                <img src="/assets/profile-photos/thinker.jpg"></img>
                            </figure>
                        </div>
                    </div>
                </div>
            </section >
            <section className="section">
                <div className="container is-half">
                    <p className="has-text-centered has-text-primary-light px-4" style={{ fontFamily: 'Anek Telugu', fontSize: 24, fontWeight: 400 }}>
                        During the journey of writing cover songs, Alexx started singing as well, in order to convey a more personal feeling to his pieces. <br />
                    </p>
                </div>
            </section>
            <section className="section">
                <div className="tile is-ancestor mx-4">
                    <div className="tile is-parent">
                        <div className="tile is-child box">
                            <figure className="image is-6by4">
                                <img src="/assets/profile-photos/mystery-green-door.jpg"></img>
                            </figure>
                        </div>
                    </div>
                    <div className="tile is-parent is-6">
                        <div className="tile is-child box">
                            <figure className="image is-6by4">
                                <img src="/assets/profile-photos/thinker-right.jpg"></img>
                            </figure>
                        </div>
                    </div>
                </div>
            </section >
            <SocialSection></SocialSection>
        </div >
    );
}