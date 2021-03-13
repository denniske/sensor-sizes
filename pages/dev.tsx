import SensorLayout from '../src/components/sensor-layout';
import {getSensorsFromSheet, getTextsFromSheet} from '../src/helper/get-rows';


export default function Home({sensors, texts}) {
    return (
        <SensorLayout sensors={sensors} texts={texts} dev={true}/>
    )
}

export async function getServerSideProps() {
    const sensors = await getSensorsFromSheet();
    const texts = await getTextsFromSheet();
    console.log(sensors);
    console.log(texts);
    return {
        props: {
            sensors,
            texts,
        },
    };
}
