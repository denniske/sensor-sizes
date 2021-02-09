import { maxBy, min } from 'lodash';
import {createStylesheet} from '../helper/styles';

const useStyles = createStylesheet((theme) => ({
    outer: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        position: 'relative',
        backgroundColor: '#111',
        width: 1000,
        height: 800,
    },
    box: {
        position: 'absolute',
        border: '2px solid #005395',
    },
    name: {
        fontSize: '0.85rem',
        color: 'white',
        display: 'inline-block',
        margin: -2,
        paddingHorizontal: 15,
        paddingVertical: 3,
        backgroundColor: '#005395',
    },
    row: {
    },
    cell: {
    },
}));

// const sensors = [
//     {
//         name: 'ARRI Alexa 65',
//         width: 54.12,
//         height: 25.58,
//         resolutionX: 6560,
//         resolutionY: 3100,
//         imageCircle: 59.86,
//     },
//     {
//         name: 'ARRI Alexa LF',
//         width: 36.70,
//         height: 25.54,
//         resolutionX: 4448,
//         resolutionY: 3096,
//         imageCircle: 44.71,
//     },
//     {
//         name: 'ARRI Alexa SXT & Mini',
//         width: 28.25,
//         height: 18.17,
//         resolutionX: 3424,
//         resolutionY: 2202,
//         imageCircle: 33.59,
//     },
// ]

interface ISensor {
    name: string;
    width: number;
    height: number;
    resolutionX: number;
    resolutionY: number;
    imageCircle: number;
}

interface Props {
    sensors: ISensor[];
}

export function SensorComparison({sensors}: Props) {
    const classes = useStyles();

    const maxWidth = 1000;
    const maxHeight = 800;

    console.log('sensors', sensors);

    const maxSensorWidth = maxBy(sensors, s => s.width);
    const maxSensorHeight = maxBy(sensors, s => s.height);

    const aspectRatio = maxWidth / maxHeight;

    const factorWidth = maxWidth / maxSensorWidth.width;
    const factorHeight = maxHeight / maxSensorHeight.height;

    let factor = min([factorWidth, factorHeight]);

    // console.log(factor);

    return (
        <div className={classes.outer}>
            <div className={classes.container}>
                {
                    sensors.map(sensor => (
                        <div key={sensor.name} style={{
                            width: sensor.width*factor,
                            height: sensor.height*factor,
                            left: maxWidth/2-(sensor.width*factor)/2,
                            top: maxHeight/2-(sensor.height*factor)/2,
                        }} className={classes.box}>
                            <div className={classes.name}>{sensor.name}</div>
                        </div>
                    ))
                }
            </div>
            <table>
                <tbody>
                    {
                        sensors.map(sensor => (
                            <tr key={sensor.name} style={{
                            }} className={classes.row}>
                                <td className={classes.cell}>{sensor.name}</td>
                                <td className={classes.cell}>{sensor.resolutionX}x{sensor.resolutionY}</td>
                                <td className={classes.cell}>{sensor.width}mmx{sensor.height}mm</td>
                                <td className={classes.cell}>{sensor.imageCircle}mm</td>
                                {/*<td className={classes.cell}>{sensor.resolutionX}</td>*/}
                                {/*<td className={classes.cell}>{sensor.resolutionY}</td>*/}
                                {/*<td className={classes.cell}>{sensor.width}</td>*/}
                                {/*<td className={classes.cell}>{sensor.height}</td>*/}
                                {/*<td className={classes.cell}>{sensor.imageCircle}</td>*/}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
