// src/components/AllPosts.js

import AlexxEonNavbar from "./AlexxEonNavbar.js";
import SocialSection from "./SocialSection.js";

export default function Bio() {

    return (
        <div>
            <AlexxEonNavbar></AlexxEonNavbar>
            <section className="section">
                <div className="container is-half">
                    <p className="has-text-centered has-text-primary-light" style={{ fontFamily: 'Anek Telugu', fontSize: 24, fontWeight: 400 }}>
                        Music for Alexx was always there. <br />
                        Since the beginning.
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