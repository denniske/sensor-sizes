import { maxBy, min } from 'lodash';
import {createStylesheet} from '../helper/styles';
import {ISensor} from './sensor.type';
import {useState} from 'react';

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
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#AAA'
    },
    name: {
        fontSize: '0.85rem',
        color: 'white',
        display: 'inline-block',
        margin: -2,
        paddingHorizontal: 15,
        paddingVertical: 3,
        backgroundColor: '#AAA',
    },
    row: {
    },
    cell: {
    },
    cellCheckbox: {
        width: 30,
    },
}));

interface Props {
    sensors: ISensor[];
}

function sortSensors(selectedSensors: ISensor[], sensors: ISensor[]) {
    const result = [...selectedSensors];
    result.sort(function(a, b){
        return sensors.indexOf(a) - sensors.indexOf(b);
    });
    return result;
}

export function SensorComparison({sensors}: Props) {
    const classes = useStyles();
    const [selectedSensors, setSelectedSensors] = useState(sensors.filter((s, i) => {
        return ['ARRI Alexa 65', 'ARRI Alexa LF', 'KODAK Super 16mm'].includes(s.name);
    }));

    const maxWidth = 1000;
    const maxHeight = 800;

    const maxSensorWidth = maxBy(selectedSensors, s => s.width);
    const maxSensorHeight = maxBy(selectedSensors, s => s.height);

    let factor = 1;
    if (maxSensorWidth != null) {
        const factorWidth = maxWidth / maxSensorWidth.width;
        const factorHeight = maxHeight / maxSensorHeight.height;

        factor = min([factorWidth, factorHeight]);
    }

    const onToggleSensor = (sensor) => {
      if (selectedSensors.includes(sensor)) {
          setSelectedSensors(selectedSensors.filter(s => s !== sensor));
      } else {
          setSelectedSensors([...selectedSensors, sensor]);
      }
    };

    return (
        <div className={classes.outer}>
            <div className={classes.container}>
                {
                    sortSensors(selectedSensors, sensors).map(sensor => (
                        <div key={sensor.name} style={{
                            width: sensor.width*factor,
                            height: sensor.height*factor,
                            left: maxWidth/2-(sensor.width*factor)/2,
                            top: maxHeight/2-(sensor.height*factor)/2,
                            borderColor: sensor.color,
                        }} className={classes.box}>
                            <div className={classes.name}style={{
                                backgroundColor: sensor.color,
                            }}>{sensor.name}</div>
                        </div>
                    ))
                }
            </div>
            <table>
                <tbody>
                    {
                        sortSensors(selectedSensors, sensors).map(sensor => (
                            <tr key={sensor.name} style={{
                            }} className={classes.row}>
                                <td className={classes.cellCheckbox}/>
                                <td className={classes.cell}>{sensor.name}</td>
                                <td className={classes.cell}>{sensor.resolutionX}x{sensor.resolutionY}</td>
                                <td className={classes.cell}>{sensor.width}mmx{sensor.height}mm</td>
                                <td className={classes.cell}>{sensor.imageCircle}mm</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <h3>All</h3>
            <table>
                <tbody>
                    {
                        sensors.map(sensor => (
                            <tr key={sensor.name} style={{
                            }} className={classes.row}>
                                <td className={classes.cellCheckbox}><input type="checkbox" checked={selectedSensors.includes(sensor)} onChange={() => onToggleSensor(sensor)}/></td>
                                <td className={classes.cell}>{sensor.name}</td>
                                <td className={classes.cell}>{sensor.resolutionX}x{sensor.resolutionY}</td>
                                <td className={classes.cell}>{sensor.width}mmx{sensor.height}mm</td>
                                <td className={classes.cell}>{sensor.imageCircle}mm</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

// {/*<td className={classes.cell}>{sensor.resolutionX}</td>*/}
// {/*<td className={classes.cell}>{sensor.resolutionY}</td>*/}
// {/*<td className={classes.cell}>{sensor.width}</td>*/}
// {/*<td className={classes.cell}>{sensor.height}</td>*/}
// {/*<td className={classes.cell}>{sensor.imageCircle}</td>*/}

