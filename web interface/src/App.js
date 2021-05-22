import {Grid, makeStyles} from "@material-ui/core"
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"
import {AnimatePresence, AnimateSharedLayout} from "framer-motion"
import {useState} from "react"
import './App.css'
import Camera from "./Camera"
import CameraLarge from "./CameraLarge"
import Navigator from "./Navigator"
import {numberOfCameras} from "./constants"
import Video from "./Video"
import CameraObjects from "./CameraObjects"
import noCamera from "./cursors/no_camera.png"

const theme = createMuiTheme({
    typography: {fontFamily: 'Nunito, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'},
})

const useStyles = makeStyles((theme) => ({
    container: {
        paddingRight: theme.spacing(4)
    }
}))

const cams = [...Array(numberOfCameras).keys()].map((_, i) => ({name: 'Camera ' + (i + 1)}))
const video = {value: false}

const App = () => {
    const classes = useStyles()
    const [activeCam, setActiveCam] = useState()

    return (
        <ThemeProvider theme={theme}>
            <div className={`${classes.container} App`}>
                <Navigator>
                    <AnimateSharedLayout type='crossfade'>
                        <Grid container spacing={4} style={{maxWidth: 1600, margin: 'auto'}}>
                            {cams.map((c, i) => (
                                <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                                    <Camera index={i + 1} {...{setActiveCam, video}}/>
                                </Grid>
                            ))}
                        </Grid>
                        <AnimatePresence>
                            {activeCam && (
                                <CameraLarge
                                    index={activeCam}
                                    cam={cams[activeCam - 1]}
                                    {...{setActiveCam, video}}
                                >
                                    {video.value ? (
                                        <Video index={activeCam}/>
                                    ) : (
                                        <CameraObjects index={activeCam} large/>
                                    )}
                                </CameraLarge>
                            )}
                        </AnimatePresence>
                    </AnimateSharedLayout>
                </Navigator>
            </div>
            <img src={noCamera} style={{display: 'none'}} alt=''/>
            <img src='/video_feed' style={{display: 'none'}} alt=''/>
        </ThemeProvider>
    )
}

export default App
