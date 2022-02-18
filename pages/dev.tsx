import SensorLayout from '../src/components/sensor-layout';
import {getLensesFromSheet, getSensorsFromSheet, getSheet, getTextsFromSheet} from '../src/helper/get-rows';


export default function Home({lenses, sensors, texts, titles}) {
    return (
        <SensorLayout lenses={lenses} sensors={sensors} texts={texts} titles={titles} dev={true}/>
    )
}

export async function getServerSideProps() {
    console.log('getServerSideProps');

    const doc = await getSheet();

    const [lenses, sensors, [titles, texts]] = await Promise.all([
        getLensesFromSheet(doc),
        getSensorsFromSheet(doc),
        getTextsFromSheet(doc),
    ]);

    // const lenses = await getLensesFromSheet();
    // const sensors = await getSensorsFromSheet(doc);
    // const [titles, texts] = await getTextsFromSheet();

    return {
        props: {
            lenses,
            sensors,
            texts,
            titles,
        },
    };
}
