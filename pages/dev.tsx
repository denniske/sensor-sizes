import SensorLayout from '../src/components/sensor-layout';
import {getLensesFromSheet, getSensorsFromSheet, getTextsFromSheet} from '../src/helper/get-rows';


export default function Home({lenses, sensors, texts, titles}) {
    return (
        <SensorLayout lenses={lenses} sensors={sensors} texts={texts} titles={titles} dev={true}/>
    )
}

export async function getServerSideProps() {
    const lenses = await getLensesFromSheet();
    const sensors = await getSensorsFromSheet();
    const [titles, texts] = await getTextsFromSheet();
    console.log(sensors);
    console.log(texts);
    return {
        props: {
            lenses,
            sensors,
            texts,
            titles,
        },
    };
}
