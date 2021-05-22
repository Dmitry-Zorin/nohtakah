import {IconButton, Typography} from "@material-ui/core"
import YoutubeSearchedForIcon from "@material-ui/icons/YoutubeSearchedFor"

const GUI = ({title = 'Camera', animation, zoom, setZoom}) => (
    <div
        style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            top: 20,
            left: 40,
            right: 40,
            color: 'white',
            zIndex: 1000,
            pointerEvents: 'none'
        }}
        onClick={e => e.stopPropagation()}
    >
        <Typography variant='h4'>
            {title}
        </Typography>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <IconButton
                style={{color: 'white', pointerEvents: 'all'}}
                component='div'
                onClick={() => {
                    animation.start({
                        x: 0,
                        y: 0,
                        scale: 1,
                        cursor: 'zoom-in'
                    })
                    setZoom(100)
                }}>
                <YoutubeSearchedForIcon fontSize='large'/>
            </IconButton>
            <Typography variant='h4'>
                Zoom: {Math.floor(zoom / 5) * 5}%
            </Typography>
        </div>
    </div>
)

export default GUI
