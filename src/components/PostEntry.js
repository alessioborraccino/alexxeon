import React from "react";
import youtubeEmbedUrlFromAnyYoutubeUrl from "../helpers/YoutubeHelper.js";

export class PostEntry extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <div className="box has-background-white-ter has-shadow">
                <h3 className="title is-family-monospace has-text-centered has-text-primary-dark">{this.props.post.title}</h3>
                <figure class="image is-16by9">
                    <iframe class="has-ratio" title={this.props.post.slug} width="640" height="360" src={youtubeEmbedUrlFromAnyYoutubeUrl(this.props.post.mainVideo.url)} allowFullScreen></iframe>
                </figure>
                <p className="title is-2 has-text-primary-dark mt-4" style={{ fontFamily: 'Anek Telugu', fontSize: 24, fontWeight: 400 }}>
                    {this.props.post.text}
                </p>
            </div>);
    }
}