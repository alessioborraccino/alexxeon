// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import AlexxEonNavbar from "./AlexxEonNavbar.js";
import {PostEntry}  from "./PostEntry.js";
import SocialSection from "./SocialSection.js";

export default function Home() {
    const [allPostsData, setAllPosts] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "post"]{
                    title,
                    slug,
                    "" : body[@._type == "block"][0] {
                      "" : children[@._type == "span"][0] {
                        "text" : text
                      }
                    },
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
            <SocialSection></SocialSection>
            <section className="section">
                <div className="columns is-8 is-centered is-multiline">
                    {allPostsData &&
                        allPostsData.map((post, index) => (
                            <div className="column is-half" key={index}>
                                <PostEntry post={post} index={index}></PostEntry>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
}