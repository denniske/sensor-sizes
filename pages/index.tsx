import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {SensorComparison} from '../src/components/sensor-comparison';
import {GoogleSpreadsheet} from 'google-spreadsheet';
import {createStylesheet} from '../src/helper/styles';

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
}));


export default function Home({sensors}) {
    const classes = useStyles();
    return (
        <div className={styles.container}>
            <Head>
                <title>Sensor Size Comparison</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>


                <div className={classes.links}>
                    <a className={classes.link} href="https://github.com/denniske/sensor-size-comparison" target="_blank">
                        <img src="https://img.shields.io/badge/github-sensor--size--comparison-green?label=Github&logo=github&color=009900"/>
                    </a>
                    <a className={classes.link} href="https://www.buymeacoffee.com/sensorsizes" target="_blank">
                        <img src="https://img.shields.io/static/v1?label=Buy%20me%20a%20coffee&logo=buy-me-a-coffee&message=0%20supporters&logoColor=000000&labelColor=EECC00&color=2c2f33"/>
                    </a>
                </div>

                <h1 className={styles.title}>
                    SENSOR SIZE COMPARISON
                </h1>
                <SensorComparison sensors={sensors}/>
            </main>
        </div>
    )
}

export async function getServerSideProps() {
    const sensors = await getRows();
    console.log(sensors);
    return {
        props: {
            sensors,
        },
    };
}

const getRows = async () => {
    const doc = new GoogleSpreadsheet('1xyqPZE26X79eLvy7M2yxTAfa3xlvgLGsG60voC0eCeI');

    await doc.useApiKey(process.env.GOOGLE_SHEETS_API_KEY);

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    const rows = await sheet.getRows();
    console.log(rows);

    return rows.map(r => {
        return ({
            model: r.model,
            aspectRatio: r.aspectRatio,
            diagonal: parseFloat(r.diagonal),
            area: r.area,
            width: parseFloat(r.width),
            height: parseFloat(r.height),
            resolutionX: parseInt(r.resolutionX),
            resolutionY: parseInt(r.resolutionY),
            color: r.color,
            textColor: r.textColor,
            anchor: r.anchor,
            photositeDensity: r.photositeDensity,
            default: r.default === 'TRUE',
            cropFactor: r['cropFactor (Super 35 mm)'],
        });
    });
};
