import SensorLayout from '../src/components/sensor-layout';
import {getSensorsFromSheet} from '../src/helper/get-rows';


export default function Home({sensors}) {
    return (
        <SensorLayout sensors={sensors} dev={true}/>
    )
}

export async function getServerSideProps() {
    const sensors = await getSensorsFromSheet();
    console.log(sensors);
    return {
        props: {
            sensors,
        },
    };
}
