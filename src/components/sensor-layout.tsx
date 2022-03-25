import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import {createStylesheet} from '../helper/styles';
import {SensorComparison} from './sensor-comparison';
import {Link} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {CustomTooltip} from './light-tooltip';
import Script from 'next/script'
import ReactMarkdown from 'react-markdown';

const useStyles = createStylesheet((theme) => ({
    links: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        // marginTop: 25,
        marginBottom: 60,
        zIndex: 20,
    },
    link: {
        marginHorizontal: 10,
    },
    linkImage: {
        height: 18,
    },
    footerLinks: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 50,
    },
    footerLink: {
        color: '#EEE',
        marginHorizontal: 20,
    },
    titlePart: {
        marginHorizontal: 2,
    },
    explanationTitle: {
        marginTop: 50,
    },
    explanationText: {
        width: '100%',
        maxWidth: 700,
        textAlign: 'justify',
        marginVertical: 10,
        lineHeight: '1.3em',
    },
}));

interface Props {
    lenses: any;
    sensors: any;
    texts: any;
    titles: any;
    dev?: boolean;
}

export default function SensorLayout({lenses, sensors, texts, titles, dev}: Props) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    });

    const classes = useStyles();
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.png"/>

                <title>{texts.metaTitle}</title>
                <meta name="title" content="Compare Sensor Sizes – Camera Sensor Size Comparison Tool"/>
                <meta name="description" content={texts.metaDescription}/>
                <meta name="keywords" content={texts.metaTags}/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://sensorsizes.com/"/>
                <meta property="og:title" content={texts.metaTitle}/>
                <meta property="og:description" content={texts.metaDescription}/>
                <meta property="og:image" content="https://sensorsizes.com/social.png"/>

                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="https://sensorsizes.com/"/>
                <meta property="twitter:title" content={texts.metaTitle}/>
                <meta property="twitter:description" content={texts.metaDescription}/>
                <meta property="twitter:image" content="https://sensorsizes.com/social.png"/>

                {/*<script async src="https://www.googletagmanager.com/gtag/js?id=G-X1BYHEDKMJ"/>*/}
                {/*<script type="text/javascript" src="/google-analytics.js"/>*/}
            </Head>

            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-X1BYHEDKMJ"></Script>
            <Script type="text/javascript" src="/google-analytics.js"></Script>

            <main className={styles.main}>
                <div className={classes.links} data-nosnippet>
                    <a className={classes.link} href="https://github.com/denniske/sensor-sizes" target="_blank">
                        <img className={classes.linkImage}
                             src="https://img.shields.io/badge/github-sensor--sizes-green?label=Github&logo=github&labelColor=00AA00&color=444"/>
                    </a>
                    <a className={classes.link} href="https://www.buymeacoffee.com/sensorsizes" target="_blank">
                        <img className={classes.linkImage}
                             src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshields-io-buymeacoffee.vercel.app%2Fapi%3Fusername%3Dsensorsizes&color=444"/>
                    </a>
                    <a className={classes.link}
                       href="https://www.paypal.com/donate?business=hello%40sensorsizes.com&item_name=Compare+Sensor+Sizes&currency_code=EUR"
                       target="_blank">
                        <img className={classes.linkImage}
                             src="https://img.shields.io/static/v1?label=Paypal&message=donate&color=444&labelColor=CCC&logo=paypal&logoColor=violet"/>
                    </a>
                    <a className={classes.link}
                       href="https://www.amazon.de/?&_encoding=UTF8&tag=sensorsizes-21&linkCode=ur2&linkId=33f297f674a2a08ac2be0747aa8ed48e&camp=1638&creative=6742"
                       target="_blank">
                        <img className={classes.linkImage}
                             src="https://img.shields.io/static/v1?label=Amazon&message=affiliate&color=444&labelColor=CCC&logo=amazon&logoColor=black"/>
                    </a>
                    {
                        dev &&
                        <a className={classes.link} href="https://vercel.com/denniske/sensor-sizes/deployments"
                           target="_blank">
                            <img src="https://vercel-badge-azure.vercel.app/api/denniske/sensor-sizes"/>
                        </a>
                    }
                </div>

                <h1 className={styles.title}>
                    <a href="/"><span className={classes.titlePart}>COMPARE</span> <span
                        className={classes.titlePart}>SENSOR</span> <span className={classes.titlePart}>SIZES</span></a>
                </h1>

                <SensorComparison lenses={lenses} sensors={sensors} texts={texts}/>

                <ReactMarkdown className={`${classes.explanationText} explanation-text`}>{texts.descriptionText}</ReactMarkdown>

                <div className={classes.footerLinks} data-nosnippet>
                    <a className={classes.footerLink} href="mailto:hello@sensorsizes.com" target="_blank">
                        <CustomTooltip title={texts.contact}>Contact</CustomTooltip>
                    </a>

                    <Link href="/privacy" className={classes.footerLink}>Privacy Policy</Link>
                    <Link href="/legal-notice" className={classes.footerLink}>Legal Notice</Link>
                </div>
            </main>
        </div>
    )
}
