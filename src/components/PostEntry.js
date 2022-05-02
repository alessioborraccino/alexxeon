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
        <h3 className="has-text-primary-dark pt-4" style={{ fontFamily: 'Anek Telugu', fontSize: 30, fontWeight: 400 }}>
            {this.props.post.text}
        </h3>
    </div>);
    }
}

// export default function PostEntry(post, index) {

//     return (
//             <div className="box has-background-white-ter has-shadow">
//                 <h3 className="title is-family-monospace has-text-centered has-text-primary-dark">{post.title}</h3>
//                 <figure class="image is-16by9">
//                     <iframe class="has-ratio" title={post.slug} width="640" height="360" src={youtubeEmbedUrlFromAnyYoutubeUrl(post.mainVideo.url)} allowFullScreen></iframe>
//                 </figure>
//                 <h3 className="has-text-primary-dark pt-4" style={{ fontFamily: 'Anek Telugu', fontSize: 30, fontWeight: 300 }}>
//                     {post.text}
//                 </h3>
//             </div>
//     );
// }