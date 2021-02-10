import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {SensorComparison} from '../src/components/sensor-comparison';
import {GoogleSpreadsheet} from 'google-spreadsheet';


export default function Home({sensors}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>FILM SENSOR CHART</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          FILM SENSOR CHART
        </h1>
        <SensorComparison sensors={sensors}/>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
    return {
        props: {
            sensors: await getRows(),
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
    // console.log(rows);

    return rows.map(r => {
        return ({
            name: r.name,
            width: parseFloat(r.width),
            height: parseFloat(r.height),
            resolutionX: parseInt(r.resolutionX),
            resolutionY: parseInt(r.resolutionY),
            imageCircle: parseFloat(r.imageCircle),
        });
    });
};
