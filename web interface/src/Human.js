import FaceIcon from "@material-ui/icons/Face"
import {motion} from "framer-motion"
import {useContext, useEffect} from "react"
import CoordsContext from "./CoordsContext"

const Human = ({num, index, height = 0.9 * window.innerHeight, large, setIsCloseToDoors}) => {
    let {x, y} = useContext(CoordsContext)[index - 1][num]
    let size, diff, trainHeight

    if (large) {
        size = 60
        diff = 6
        trainHeight = 115
    } else {
        size = 15
        diff = 2
        trainHeight = 30
    }

    x = x * 16 / 9 * height - size / 2 + diff
    y = y * height - size / 2 + diff

    useEffect(() => {
        setIsCloseToDoors(e => {
            const newE = [...e]
            newE[num] = y > 0 && y < trainHeight
            return newE[num] === e[num] ? e : newE
        })
    }, [num, setIsCloseToDoors, trainHeight, y])

    return (
        <motion.div
            style={{
                x, y,
                width: size,
                height: size,
                borderRadius: '100%',
                background: 'white',
                transition: 'transform 1s linear',
                position: 'absolute'
            }}
        >
            <FaceIcon
                style={{
                    transform: `translate(-${diff}px, -${diff}px)`,
                    fontSize: size + 2 * diff,
                }}
            />
        </motion.div>
    )
}

export default Human
