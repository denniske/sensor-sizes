import { maxBy, min } from 'lodash';
import {createStylesheet} from '../helper/styles';
import {ISensor} from './sensor.type';
import {useState} from 'react';
import useWindowDimensions from '../hooks/use-window-dimensions';
import useClientLoaded from '../hooks/use-client-loaded';
import {noop} from '@babel/types';

const useStyles = createStylesheet((theme) => ({
    outer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#111',
        // width: 500,
        width: '100vw',
        height: 700,
        overflow: 'hidden',
        marginVertical: 50,
    },
    surface: {
        position: 'relative',
        width: 0,
        height: 700,
    },
    wrapper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    box: {
        position: 'absolute',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#AAA',
        transitionDuration: '300ms',
        transitionProperty: 'width, height, left, top, display, opacity',
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    model: {
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
        width: 200,
    },
    cellName: {
        width: 250,
    },
    cellCheckbox: {
        width: 30,
    },
    pointer: {
        cursor: 'pointer',
    },
    text: {
        border: 'none',
        borderBottom: '1px solid #CCC',
        background: 'transparent',
        width: 40,
        color: 'white',
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

const offset = 50;

export function SensorComparison({sensors}: Props) {
    const windowDimensions = useWindowDimensions();
    const loaded = useClientLoaded();
    const classes = useStyles();
    const [selectedSensors, setSelectedSensors] = useState(sensors.filter((s) => s.default));
    const [realPhysicalSensorSize, setRealPhysicalSensorSize] = useState(true);
    const [screenSize, setScreenSize] = useState<number>(typeof window !== 'undefined' ? Math.sqrt(window.screen.width*window.screen.width+window.screen.height*window.screen.height)/96 : 100);
    const [screenSizeStr, setScreenSizeStr] = useState<string>(typeof window !== 'undefined' ? (Math.sqrt(window.screen.width*window.screen.width+window.screen.height*window.screen.height)/96).toFixed(1) : '100');

    const maxWidth = windowDimensions.width - offset*2;
    const maxHeight = 700;

    const maxSensorWidth = maxBy(selectedSensors, s => s.width);
    const maxSensorHeight = maxBy(selectedSensors, s => s.height);

    let factor = 1;
    if (maxSensorWidth != null) {
        const factorWidth = maxWidth / maxSensorWidth.width;
        const factorHeight = maxHeight / maxSensorHeight.height;

        factor = min([factorWidth, factorHeight]);
    }

    if (realPhysicalSensorSize && screenSize) {
        const screenDiagonalPx = typeof window !== 'undefined' ? Math.sqrt(window.screen.width*window.screen.width+window.screen.height*window.screen.height) : 100;
        const oneInchPx = screenDiagonalPx / screenSize;
        const oneMillimeterPx = screenDiagonalPx / screenSize / 2.54 / 10;
        factor = oneMillimeterPx;
    }

    const onToggleSensor = (sensor) => {
        if (selectedSensors.includes(sensor)) {
          setSelectedSensors(selectedSensors.filter(s => s !== sensor));
        } else {
          setSelectedSensors([...selectedSensors, sensor]);
        }
    };

    const onToggleRealPhysicalSensorSize = (val) => {
        setRealPhysicalSensorSize(!realPhysicalSensorSize);
    };

    const onScreenSizeChange = (event) => {
        setScreenSizeStr(event.target.value.replace(',', '.'));
        setScreenSize(parseFloat(event.target.value.replace(',', '.')));
    };

    const centerX = 0;

    const getAlignItems = (sensor: ISensor) => {
        return sensor.anchor.startsWith('top') ? 'flex-start' : 'flex-end';
    };

    const getJustifyContent = (sensor: ISensor) => {
        if (sensor.anchor.endsWith('left')) return 'flex-start';
        if (sensor.anchor.endsWith('center')) return 'center';
        return 'flex-end';
    };

    const getResolution = (sensor: ISensor) => {
        if (sensor.resolutionX && sensor.resolutionY) {
            return `${sensor.resolutionX} x ${sensor.resolutionY}`;
        }
        return '-';
    };

    const getArea = (sensor: ISensor) => {
        return `${sensor.width.toFixed(2)} x ${sensor.height.toFixed(2)}`;
    };

    return (
        <div className={classes.outer}>
            <div className={classes.container}>
                <div className={classes.surface}>
                    {
                        loaded && sensors.map(sensor => (
                            <div key={sensor.model} style={{
                                width: sensor.width*factor,
                                height: sensor.height*factor,
                                left: centerX-(sensor.width*factor)/2,
                                top: maxHeight/2-(sensor.height*factor)/2,
                                borderColor: sensor.color,
                                opacity: selectedSensors.includes(sensor) ? 1 : 0,
                                alignItems: getAlignItems(sensor),
                                justifyContent: getJustifyContent(sensor),
                            }} className={classes.box}>
                                <div className={classes.model} style={{
                                    color: sensor.textColor,
                                    backgroundColor: sensor.color,
                                }}>{sensor.model}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={classes.wrapper}>
                <div>
                    <h3>Options</h3>
                    <table>
                        <tbody>
                        <tr>
                            <td className={classes.cellCheckbox}><input className={classes.pointer} type="checkbox" checked={realPhysicalSensorSize} onChange={onToggleRealPhysicalSensorSize} /></td>
                            <td className={classes.cellName}>Real physical sensor size</td>
                            <td className={classes.cell}>Screen size (")</td>
                            <td className={classes.cell}><input type="text" className={classes.text} value={screenSizeStr} onChange={onScreenSizeChange} /></td>
                        </tr>
                        </tbody>
                    </table>
                    <h3>Selected</h3>
                    <table>
                        <thead>
                        <tr>
                            <th className={classes.cellCheckbox}/>
                            <th className={classes.cellName}>Model</th>
                            <th className={classes.cell}>Resolution (px)</th>
                            <th className={classes.cell}>Area (mm)</th>
                            <th className={classes.cell}>Image Circle (mm)</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                sortSensors(selectedSensors, sensors).map(sensor => (
                                    <tr key={sensor.model} style={{
                                    }} className={classes.row}>
                                        <td className={classes.cellCheckbox}/>
                                        <td className={classes.cellName}>{sensor.model}</td>
                                        <td className={classes.cell}>{getResolution(sensor)}</td>
                                        <td className={classes.cell}>{getArea(sensor)}</td>
                                        <td className={classes.cell}>{sensor.imageCircle}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <h3>All</h3>
                    <table>
                        <thead>
                            <tr>
                                <th className={classes.cellCheckbox}/>
                                <th className={classes.cellName}>Model</th>
                                <th className={classes.cell}>Resolution (px)</th>
                                <th className={classes.cell}>Area (mm)</th>
                                <th className={classes.cell}>Image Circle (mm)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sensors.map(sensor => (
                                    <tr key={sensor.model} className={classes.pointer} onClick={() => onToggleSensor(sensor)}>
                                        <td className={classes.cellCheckbox}><input className={classes.pointer} type="checkbox" checked={selectedSensors.includes(sensor)} onChange={() => noop} /></td>
                                        <td className={classes.cellName}>{sensor.model}</td>
                                        <td className={classes.cell}>{getResolution(sensor)}</td>
                                        <td className={classes.cell}>{getArea(sensor)}</td>
                                        <td className={classes.cell}>{sensor.imageCircle}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
