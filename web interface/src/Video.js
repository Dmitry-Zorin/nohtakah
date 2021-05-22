import {useState} from "react"

import noCamera from './cursors/no_camera.png'
const videoFeed = 'video_feed'

const Video = () => {
    const [src, setSrc] = useState(videoFeed)

    return (
        <img
            src={src}
            alt='No video feed'
            height='100%'
            style={{pointerEvents: 'none'}}
            onError={() => {
                if (src === videoFeed) {
                    setSrc(noCamera)
                }
            }}
        />
    )
}

export default Video
