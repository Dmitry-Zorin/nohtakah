import AddBoxIcon from '@material-ui/icons/AddBox'
import {motion} from "framer-motion"

const Box = ({large}) => {
    let size, diff

    if (large) {
        size = 60
        diff = 6
    } else {
        size = 15
        diff = 3
    }

    return (
        <motion.div style={{
            x: 50,
            y: 100,
            width: size,
            height: size,
            background: 'white'
        }}>
            <AddBoxIcon style={{
                transform: `translate(-${diff}px, -${diff}px)`,
                fontSize: size + 2 * diff
            }}/>
        </motion.div>
    )
}

export default Box
