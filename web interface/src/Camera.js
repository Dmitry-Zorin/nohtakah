import {IconButton, makeStyles} from "@material-ui/core"
import {motion, useAnimation} from "framer-motion"
import {useEffect, useRef, useState} from "react"
import './Camera.css'
import CameraObjects from "./CameraObjects"
import VideocamIcon from "@material-ui/icons/Videocam"

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: theme.shadows[2],
        '&:hover': {
            boxShadow: theme.shadows[4],
            '& .overlay': {
                background: 'rgba(0, 0, 0, 0.05)',
                opacity: 0.9,
            }
        }
    },
    overlay: {
        position: 'absolute',
        bottom: 9,
        right: 16,
        opacity: 0.8,
        transition: 'all 0.2s ease',
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.1) !important',
            opacity: '1 !important',
        }
    }
}))

const Camera = ({index, setActiveCam, video}) => {
    const classes = useStyles()
    const cam = useRef()
    const [height, setHeight] = useState()
    const animation = useAnimation()

    useEffect(() => setHeight(cam.current.offsetHeight), [])

    return (
        <motion.div
            ref={cam}
            className={`${classes.card} Camera`}
            onMouseOver={() => animation.start({scale: 1.05})}
            onMouseOut={() => animation.start({scale: 1})}
            onClick={() => setActiveCam(index)}
            animate={animation}
            layoutId={index}
        >
            {height && (
                <CameraObjects {...{index, height}}/>
            )}
            <IconButton
                className={`${classes.overlay} overlay`}
                onClick={() => {
                    setActiveCam(index)
                    video.value = true
                }}
            >
                <VideocamIcon/>
            </IconButton>
        </motion.div>
    )
}

export default Camera
