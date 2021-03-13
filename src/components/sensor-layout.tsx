import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {createStylesheet} from '../helper/styles';
import {SensorComparison} from './sensor-comparison';
import {Link} from '@material-ui/core';
import ReactTooltip from 'react-tooltip';
import {useEffect, useState} from 'react';

const useStyles = createStylesheet((theme) => ({
    links: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        // marginTop: 25,
        marginBottom: 60,
    },
    link: {
        marginHorizontal: 10,
    },
    linkImage: {
        height: 18,
    },
    footerLink: {
        color: '#CCC',
        marginHorizontal: 20,
    },
    titlePart: {
        marginHorizontal: 2,
    },
}));

interface Props {
    sensors: any;
    texts: any;
    dev?: boolean;
}

export default function SensorLayout({sensors, texts, dev}: Props) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    });

    const classes = useStyles();
    return (
        <div className={styles.container}>
            <Head>
                <title>Compare Sensor Sizes</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            {
                loaded &&
                <ReactTooltip place="top" type="light" effect="solid"/>
            }

            <main className={styles.main}>
                <div className={classes.links}>
                    <a className={classes.link} href="https://github.com/denniske/sensor-sizes" target="_blank">
                        <img className={classes.linkImage} src="https://img.shields.io/badge/github-sensor--sizes-green?label=Github&logo=github&labelColor=00AA00&color=444"/>
                    </a>
                    <a className={classes.link} href="https://www.buymeacoffee.com/sensorsizes" target="_blank">
                        <img className={classes.linkImage} src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshields-io-buymeacoffee.vercel.app%2Fapi%3Fusername%3Dsensorsizes&color=444"/>
                    </a>
                    <a className={classes.link} href="https://www.paypal.com/donate?business=hello%40sensorsizes.com&item_name=Compare+Sensor+Sizes&currency_code=EUR" target="_blank">
                        <img className={classes.linkImage} src="https://img.shields.io/static/v1?label=Paypal&message=donate&color=444&labelColor=CCC&logo=paypal&logoColor=violet"/>
                    </a>
                    {
                        dev &&
                        <a className={classes.link} href="https://vercel.com/denniske/sensor-sizes/deployments" target="_blank">
                            <img src="https://vercel-badge-azure.vercel.app/api/denniske/sensor-sizes"/>
                        </a>
                    }
                </div>

                <h1 className={styles.title}>
                    <a href="/"><span className={classes.titlePart}>COMPARE</span> <span className={classes.titlePart}>SENSOR</span> <span className={classes.titlePart}>SIZES</span></a>
                </h1>
                <SensorComparison sensors={sensors} texts={texts}/>
                <div>
                    <a className={classes.footerLink} href="mailto:hello@sensorsizes.com" target="_blank">Contact</a>

                    <Link href="/privacy" className={classes.footerLink}>Privacy Policy</Link>
                </div>
            </main>
        </div>
    )
}
