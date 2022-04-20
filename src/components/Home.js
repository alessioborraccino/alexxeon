// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import youtubeEmbedUrlFromAnyYoutubeUrl from "../helpers/YoutubeHelper.js";
import AlexxEonNavbar from "./AlexxEonNavbar.js";

export default function Home() {
    const [allPostsData, setAllPosts] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "post"]{
        title,
        slug,
        mainVideo{
            url
      }
    }`
            )
            .then((data) => setAllPosts(data))
            .catch(console.error);
    }, []);

    return (
        <div>
            <AlexxEonNavbar></AlexxEonNavbar>
            <section className="section">
                <div className="container">
                <h1 className="title is-5 has-text-primary-light is-family-monospace has-text-centered pb-3">Check out my profiles</h1>
                </div>
                        <p class="buttons are-medium is-centered">
                        <a class="button is-primary" href="https://www.facebook.com/Alexx-Eon-107623971924941" target="_blank" rel="noopener noreferrer">
                            <span class="icon">
                               <div class="fab fa-facebook fa-lg" style={{color: "#FFF"}}></div>
                            </span>
                        </a>
                        <a class="button is-primary" href="https://twitter.com/EonAlexx" target="_blank" rel="noopener noreferrer">
                        <span class="icon">
                            <div class="fab fa-twitter fa-lg" style={{color: "#FFF"}}></div>
                            </span>
                        </a>
                        <a class="button is-primary" href="https://www.instagram.com/alexx.eon" target="_blank" rel="noopener noreferrer">
                        <span class="icon">
                            <div class="fab fa-instagram fa-lg" style={{color: "#FFF"}}></div>
                            </span>
                        </a>
                        <a class="button is-primary" href="https://www.youtube.com/channel/UCuV3i0Oz0Q-XnOuUyFlfVVA" target="_blank" rel="noopener noreferrer">
                        <span class="icon">
                            <div class="fab fa-youtube fa-lg" style={{color: "#FFF"}}></div>
                            </span>
                        </a>
                        <a class="button is-primary" href="https://tiktok.com/@alexx.eon" target="_blank" rel="noopener noreferrer">
                        <span class="icon">
                            <div class="fab fa-tiktok fa-lg" style={{color: "#FFF"}}></div>
                            </span>
                        </a>
                        </p>  
            </section>
            <section className="section">
                <div className="columns is-8 is-centered is-multiline">
                    {allPostsData &&
                        allPostsData.map((post, index) => (
                            <div className="column is-half" key={index}>
                                <div className="box has-background-white-ter has-shadow">
                                    <h3 className="title is-family-monospace has-text-centered has-text-primary-dark">{post.title}</h3>
                                    <figure class="image is-16by9">
                                        <iframe class="has-ratio" title={post.slug} width="640" height="360" src={youtubeEmbedUrlFromAnyYoutubeUrl(post.mainVideo.url)} allowFullScreen></iframe>                                
                                    </figure>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
}