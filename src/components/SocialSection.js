import React from 'react';

export default function SocialSection() {

    return (

        <section className="section">
            <div className="container">
                <h1 className="title is-5 has-text-primary-light is-family-monospace has-text-centered pb-3">Check out my profiles</h1>
            </div>
            <p className="buttons are-medium is-centered">
                <a className="button is-primary" href="https://www.facebook.com/Alexx-Eon-107623971924941" target="_blank" rel="noopener noreferrer">
                    <span className="icon">
                        <span className="fab fa-facebook fa-lg" style={{ color: "#FFF" }}></span>
                    </span>
                </a>
                <a className="button is-primary" href="https://twitter.com/EonAlexx" target="_blank" rel="noopener noreferrer">
                    <span className="icon">
                        <span className="fab fa-twitter fa-lg" style={{ color: "#FFF" }}></span>
                    </span>
                </a>
                <a className="button is-primary" href="https://www.instagram.com/alexx.eon" target="_blank" rel="noopener noreferrer">
                    <span className="icon">
                        <span className="fab fa-instagram fa-lg" style={{ color: "#FFF" }}></span>
                    </span>
                </a>
                <a className="button is-primary" href="https://www.youtube.com/channel/UCuV3i0Oz0Q-XnOuUyFlfVVA" target="_blank" rel="noopener noreferrer">
                    <span className="icon">
                        <span className="fab fa-youtube fa-lg" style={{ color: "#FFF" }}></span>
                    </span>
                </a>
                <a className="button is-primary" href="https://tiktok.com/@alexx.eon" target="_blank" rel="noopener noreferrer">
                    <span className="icon">
                        <span className="fab fa-tiktok fa-lg" style={{ color: "#FFF" }}></span>
                    </span>
                </a>
                <a className="button is-primary" href="https://soundcloud.com/user-87781037" target="_blank" rel="noopener noreferrer">
                    <span className="icon">
                        <span className="fab fa-soundcloud fa-lg" style={{ color: "#FFF" }}></span>
                    </span>
                </a>
            </p>
        </section>
    );
}