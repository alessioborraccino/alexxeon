import React from 'react';

export default function SocialSection() {

    return (

        <section className="section">
            <div className="container">
                <h1 className="title is-5 has-text-primary-light is-family-monospace has-text-centered pb-3">Check out my profiles</h1>
            </div>
            <p class="buttons are-medium is-centered">
                <a class="button is-primary" href="https://www.facebook.com/Alexx-Eon-107623971924941" target="_blank" rel="noopener noreferrer">
                    <span class="icon">
                        <div class="fab fa-facebook fa-lg" style={{ color: "#FFF" }}></div>
                    </span>
                </a>
                <a class="button is-primary" href="https://twitter.com/EonAlexx" target="_blank" rel="noopener noreferrer">
                    <span class="icon">
                        <div class="fab fa-twitter fa-lg" style={{ color: "#FFF" }}></div>
                    </span>
                </a>
                <a class="button is-primary" href="https://www.instagram.com/alexx.eon" target="_blank" rel="noopener noreferrer">
                    <span class="icon">
                        <div class="fab fa-instagram fa-lg" style={{ color: "#FFF" }}></div>
                    </span>
                </a>
                <a class="button is-primary" href="https://www.youtube.com/channel/UCuV3i0Oz0Q-XnOuUyFlfVVA" target="_blank" rel="noopener noreferrer">
                    <span class="icon">
                        <div class="fab fa-youtube fa-lg" style={{ color: "#FFF" }}></div>
                    </span>
                </a>
                <a class="button is-primary" href="https://tiktok.com/@alexx.eon" target="_blank" rel="noopener noreferrer">
                    <span class="icon">
                        <div class="fab fa-tiktok fa-lg" style={{ color: "#FFF" }}></div>
                    </span>
                </a>
            </p>
        </section>
    );
}