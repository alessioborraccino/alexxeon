// src/components/AllPosts.js

import AlexxEonNavbar from "./AlexxEonNavbar.js";
import SocialSection from "./SocialSection.js";

export default function Bio() {

    return (
        <div>
            <AlexxEonNavbar></AlexxEonNavbar>
            <section className="section">
                <div className="container is-half">
            <h3 className="title is-5 is-family-monospace has-text-centered has-text-primary-light">
                Music for Alexx was always there. <br/>
                Since the beginning.
            </h3>
            </div>
            </section>
            <SocialSection></SocialSection>
        </div>
    );
}