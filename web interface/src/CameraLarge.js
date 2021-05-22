import {motion, useAnimation} from "framer-motion"
import {useEffect, useRef, useState} from "react"
import './Camera.css'
import './CameraLarge.css'
import GUI from "./GUI"
import move from './cursors/move.svg'
import zoomIn from './cursors/zoomIn.svg'

const CameraLarge = ({children, index, cam, setActiveCam, video}) => {
    const [zoom, setZoom] = useState(100)
    const [element, setElement] = useState()
    const animation = useAnimation()
    const mainArea = useRef()

    useEffect(() => {
        if (!element) return

        const transform = mainArea.current.style.transform

        // eslint-disable-next-line no-unused-vars
        let [translateX = 0, translateY = 0, translateZ, scale = 1] = (transform.match(/-?\d+(\.\d+)?/g) || []).slice(1, 5).map(e => +e)

        const newScale = scale * 1.5 ** (-1 * Math.sign(element.deltaY || -1))
        if (newScale < 1) return setElement(null)

        const ratio = 1 - newScale / scale
        let x = translateX + (element.clientX - window.innerWidth / 2 - translateX) * ratio
        let y = translateY + (element.clientY - window.innerHeight / 2 - translateY) * ratio
        if (newScale === 1) x = y = 0

        animation.start({
            x, y,
            scale: newScale,
            cursor: newScale > 1 ? `url(${move}) 10 5, grab` : `url(${zoomIn}) 5 5, zoom-in`
        })
            .then(() => {
                setZoom(100 * newScale)
                setElement(null)
            })
    }, [animation, element, setElement])

    return (
        <div className='Container' onWheel={e => !element && setElement(e)}>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0, transition: {ease: 'easeIn', duration: 0.4}}}
                transition={{ease: 'easeOut', duration: 0.4}}
            >
                <GUI title={cam.name} {...{animation, zoom, setZoom}}/>
                <motion.div
                    className='Container Background'
                    onClick={() => {
                        animation.start({x: 0, y: 0, scale: 1, transition: {duration: 0}})
                            .then(() => {
                                setActiveCam(null)
                                video.value = false
                            })
                    }}
                />
            </motion.div>
            <motion.div
                ref={mainArea}
                className='Camera CameraLarge'
                drag={zoom > 100}
                dragMomentum={false}
                animate={animation}
                transition={{type: 'spring', bounce: 0, duration: 0.5}}
                layoutId={index}
                onClick={e => zoom === 100 && !element && setElement(e)}
                style={{aspectRatio: video.value && 'unset'}}
            >
                {children}
            </motion.div>
            <img src={move} style={{display: 'none'}} alt=''/>
        </div>
    )
}

export default CameraLarge
