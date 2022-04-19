// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import youtubeEmbedUrlFromAnyYoutubeUrl from "../helpers/YoutubeHelper.js";
import AlexxEonNavbar from "./AlexxEonNavbar.js";
import AlexxEonFooter from "./AlexxEonFooter.js";

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
                <div className="columns is-8 is-centered">
                    {allPostsData &&
                        allPostsData.map((post, index) => (
                            <div className="column is-narrow" key={index}>
                                <div className="box has-background-white-ter has-shadow">
                                    <iframe title={post.slug} width="100%" height="auto" src={youtubeEmbedUrlFromAnyYoutubeUrl(post.mainVideo.url)} allowFullScreen></iframe>
                                    <h3 className="title is-family-monospace">{post.title}</h3>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
            <AlexxEonFooter></AlexxEonFooter>
        </div>
    );
}