import {getLensesFromSheet, getSensorsFromSheet, getSheet, getTextsFromSheet} from '../src/helper/get-rows';
import SensorLayout from '../src/components/sensor-layout';


export default function Home({lenses, sensors, texts, titles}) {
    return (
        <SensorLayout lenses={lenses} sensors={sensors} texts={texts} titles={titles}/>
    );
}

export async function getStaticProps() {
    const doc = await getSheet();

    const [lenses, sensors, [titles, texts]] = await Promise.all([
        getLensesFromSheet(doc),
        getSensorsFromSheet(doc),
        getTextsFromSheet(doc),
    ]);

    return {
        props: {
            lenses,
            sensors,
            texts,
            titles,
        },
    };
}
