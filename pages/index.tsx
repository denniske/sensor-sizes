import {getSensorsFromSheet, getTextsFromSheet} from '../src/helper/get-rows';
import SensorLayout from '../src/components/sensor-layout';


export default function Home({sensors, texts}) {
    return (
        <SensorLayout sensors={sensors} texts={texts}/>
    );
}

export async function getStaticProps() {
    const sensors = await getSensorsFromSheet();
    const texts = await getTextsFromSheet();
    // console.log(sensors);
    // console.log(texts);
    return {
        props: {
            sensors,
            texts,
        },
    };
}
