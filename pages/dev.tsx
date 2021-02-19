import SensorLayout from '../src/components/sensor-layout';
import {getRows} from '../src/helper/get-rows';


export default function Home({sensors}) {
    return (
        <SensorLayout sensors={sensors}/>
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
