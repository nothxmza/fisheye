export class MediaFactory {
    static createMedia(mediaData, flag) {
        if (mediaData.image) {
            return new ImageMedia(mediaData);
        } else if (mediaData.video) {
            return new VideoMedia(mediaData, flag);
        }
    }
}

class ImageMedia {
    constructor(mediaData) {
        this.title = mediaData.title;
        this.image = mediaData.image;
        this.likes = mediaData.likes;
    }
    render() {
        const img = document.createElement('img');
        img.setAttribute('src', `assets/sample/${this.image}`);
        img.setAttribute('alt', this.title);
        return img;
    }
}

class VideoMedia {
    constructor(mediaData, flag) {
        this.title = mediaData.title;
        this.video = mediaData.video;
        this.likes = mediaData.likes;
        this.flag = flag;
    }
    render() {
        const video = document.createElement('video');
        const source = document.createElement('source');
        video.setAttribute('title', this.title);
        source.setAttribute('src', `assets/sample/${this.video}`);
        source.setAttribute('type', 'video/mp4');
        if (this.flag){
            video.setAttribute('autoplay', '');
            video.setAttribute('controls', '');
        }
        video.appendChild(source);
        return video;
    }
}