import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {createStylesheet} from '../helper/styles';
import {SensorComparison} from './sensor-comparison';

const useStyles = createStylesheet((theme) => ({
    links: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        // marginTop: 25,
        marginBottom: 50,
    },
    link: {
        marginHorizontal: 10,
    },
    titlePart: {
        marginHorizontal: 2,
    },
}));


export default function SensorLayout({sensors}) {
    const classes = useStyles();
    return (
        <div className={styles.container}>
            <Head>
                <title>Camera Sensor Size Comparison</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <div className={classes.links}>
                    <a className={classes.link} href="https://github.com/denniske/sensor-size-comparison" target="_blank">
                        <img src="https://img.shields.io/badge/github-sensor--size--comparison-green?label=Github&logo=github&color=009900"/>
                    </a>
                    <a className={classes.link} href="https://www.buymeacoffee.com/sensorsizes" target="_blank">
                        <img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshields-io-buymeacoffee.vercel.app%2Fapi%3Fusername%3Dsensorsizes"/>
                    </a>
                </div>

                <h1 className={styles.title}>
                    <span className={classes.titlePart}>CAMERA</span> <span className={classes.titlePart}>SENSOR</span> <span className={classes.titlePart}>SIZE</span> <span className={classes.titlePart}>COMPARISON</span>
                </h1>
                <SensorComparison sensors={sensors}/>
            </main>
        </div>
    )
}
