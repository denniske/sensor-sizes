import {getLensesFromSheet, getSensorsFromSheet, getTextsFromSheet} from '../src/helper/get-rows';
import SensorLayout from '../src/components/sensor-layout';


export default function Home({lenses, sensors, texts}) {
    return (
        <SensorLayout lenses={lenses} sensors={sensors} texts={texts}/>
    );
}

export async function getStaticProps() {
    const lenses = await getLensesFromSheet();
    const sensors = await getSensorsFromSheet();
    const texts = await getTextsFromSheet();
    // console.log(sensors);
    // console.log(texts);
    return {
        props: {
            lenses,
            sensors,
            texts,
        },
    };
}
