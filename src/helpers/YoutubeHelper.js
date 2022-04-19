
export default function youtubeEmbedUrlFromAnyYoutubeUrl(url){
    var regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
    var match = url.match(regExp);
    var id = (match && match[1].length==11)? match[1] : false;
    var embeddedUrl = "https://www.youtube.com/embed/" + id
    return embeddedUrl
}
