import { maxBy, min } from 'lodash';
import {createStylesheet} from '../helper/styles';
import {ISensor} from './sensor.type';
import {useEffect, useState} from 'react';
import useWindowDimensions from '../hooks/use-window-dimensions';
import useClientLoaded from '../hooks/use-client-loaded';
import {noop} from '@babel/types';
import {faCoffee, faCross, faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = createStylesheet((theme) => ({
    links: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 25,
    },
    link: {
        marginHorizontal: 10,
    },
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
        marginHorizontal: 15,
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
        paddingHorizontal: 8,
        paddingVertical: 3,
        backgroundColor: '#AAA',
        zIndex: 10,
    },
    row: {},
    cellWithout: {
        paddingVertical: 2,
    },
    cell: {
        width: 150,
        paddingVertical: 2,
    },
    cellModel: {
        width: 250,
    },
    cellScreen: {
        width: 200,
    },
    cellAspectRatio: {
        width: 130,
    },
    cellArea: {
        width: 130,
    },
    cellCheckbox: {
        width: 30,
    },
    cellLogo: {
        width: 150,
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
        outline: 'none',
        paddingBottom: 5,
    },
    textSearch: {
        border: 'none',
        borderBottom: '1px solid #CCC',
        background: 'transparent',
        width: 200,
        color: 'white',
        outline: 'none',
        paddingBottom: 5,
    },
    title: {
        // marginLeft: 150,
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
    const [realPhysicalSensorSize, setRealPhysicalSensorSize] = useState(false);
    const [screenSize, setScreenSize] = useState<number>(typeof window !== 'undefined' ? Math.sqrt(window.screen.width*window.screen.width+window.screen.height*window.screen.height)/96 : 100);
    const [screenSizeStr, setScreenSizeStr] = useState<string>(typeof window !== 'undefined' ? (Math.sqrt(window.screen.width*window.screen.width+window.screen.height*window.screen.height)/96).toFixed(1) : '100');
    const [searchStr, setSearchStr] = useState<string>('');
    const [filteredSensors, setFilteredSensors] = useState<ISensor[]>(sensors);

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

    useEffect(() => {
        setFilteredSensors(sensors.filter(s => s.model.toLowerCase().indexOf(searchStr.toLowerCase().trim()) > -1));
    }, [searchStr]);

    const onToggleSensor = (sensor) => {
        console.log('onToggleSensor');
        if (selectedSensors.includes(sensor)) {
          setSelectedSensors(selectedSensors.filter(s => s !== sensor));
        } else {
          setSelectedSensors([...selectedSensors, sensor]);
        }
    };

    const onToggleAllSensorsForLogo = (logo) => {
        const allSensorsSelected = selectedSensors.filter(s => s.logo === logo).length === sensors.filter(s => s.logo === logo).length;
        console.log('onToggleAllSensorsForLogo', allSensorsSelected);
        const selectedWithout = selectedSensors.filter(s => s.logo !== logo);
        if (allSensorsSelected) {
            setSelectedSensors([...selectedWithout]);
        } else {
            setSelectedSensors([...selectedWithout, ...sensors.filter(s => s.logo === logo)]);
        }
    };

    const onToggleRealPhysicalSensorSize = (val) => {
        setRealPhysicalSensorSize(!realPhysicalSensorSize);
    };

    const onScreenSizeChange = (event) => {
        setScreenSizeStr(event.target.value.replace(',', '.'));
        setScreenSize(parseFloat(event.target.value.replace(',', '.')));
    };

    const onSearchChange = (event) => {
        setSearchStr(event.target.value);
    };

    const onSearchClear = () => {
        setSearchStr('');
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

    const getDensity = (sensor: ISensor) => {
        return sensor.photositeDensity && sensor.photositeDensity !== '0' ? sensor.photositeDensity : '-';
    };

    const getDimensions = (sensor: ISensor) => {
        return `${sensor.width.toFixed(2)} x ${sensor.height.toFixed(2)}`;
    };

    const getArea = (sensor: ISensor) => {
        return `${sensor.area}`;
    };

    function getAspectRatio(aspectRatio: string) {
        if (!aspectRatio) return;
        const parts = aspectRatio.split(':');
        return `${parseFloat(parts[0]).toFixed(2)}:1`;
    }

    const logoCount: Record<string, number> = {};

    const logoAsset = {
        'analog': 'analog.svg',
        'arri': 'arri.svg',
        'canon': 'canon.svg',
        'red': 'red.png',
        'blackmagic': 'blackmagic.svg',
        'panasonic': 'panasonic.svg',
        'panavision': 'panavision.svg',
        'sony': 'sony.svg',
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
                    <h3 className={classes.title}>Options</h3>
                    <table>
                        <tbody>
                        <tr>
                            <td className={classes.cellLogo}/>
                            <td className={classes.cellCheckbox}><input className={classes.pointer} type="checkbox" checked={realPhysicalSensorSize} onChange={onToggleRealPhysicalSensorSize} /></td>
                            <td className={`${classes.cellModel} ${classes.pointer}`} onClick={onToggleRealPhysicalSensorSize}>Real physical sensor size</td>
                            <td className={classes.cellScreen}>Your screen size (inch)</td>
                            <td className={classes.cell}><input type="text" className={classes.text} value={screenSizeStr} onChange={onScreenSizeChange} /></td>
                        </tr>
                        </tbody>
                    </table>
                    <h3 className={classes.title}>Selected</h3>
                    <table>
                        <thead>
                        <tr>
                            <th className={classes.cellLogo}/>
                            <th className={classes.cellCheckbox}/>
                            <th className={classes.cellModel}>Model</th>
                            <th className={classes.cell}>Dimensions (mm)</th>
                            <th className={classes.cellAspectRatio}>Aspect Ratio</th>
                            <th className={classes.cell}>Diagonal (mm)</th>
                            <th className={classes.cellArea}>Area (mm²)</th>
                            <th className={classes.cell}>Resolution (px)</th>
                            <th className={classes.cellWithout}>Crop Factor (S35){'\u00A0\u00A0\u00A0'}</th>
                            <th className={classes.cellWithout}>Density (px/mm²)</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                sortSensors(selectedSensors, sensors).map(sensor => (
                                    <tr key={sensor.model} className={`${classes.row} ${classes.pointer}`} onClick={() => onToggleSensor(sensor)}>
                                        <td className={classes.cellLogo}/>
                                        <td className={classes.cellCheckbox}><input className={classes.pointer} type="checkbox" checked={selectedSensors.includes(sensor)} onChange={() => noop} /></td>
                                        <td className={classes.cellModel}>{sensor.model}</td>
                                        <td className={classes.cell}>{getDimensions(sensor)}</td>
                                        <td className={classes.cellAspectRatio}>{getAspectRatio(sensor.aspectRatio)}</td>
                                        <td className={classes.cell}>{sensor.diagonal}</td>
                                        <td className={classes.cellArea}>{getArea(sensor)}</td>
                                        <td className={classes.cell}>{getResolution(sensor)}</td>
                                        <td className={classes.cellWithout}>{sensor.cropFactor}</td>
                                        <td className={classes.cellWithout}>{getDensity(sensor)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <h3 className={classes.title}>All</h3>
                    <table>
                        <thead>
                            <tr>
                                <th className={classes.cellLogo}/>
                                <th className={classes.cellCheckbox}/>
                                <th className={classes.cellModel}>Model</th>
                                <th className={classes.cell}>Dimensions (mm)</th>
                                <th className={classes.cellAspectRatio}>Aspect Ratio</th>
                                <th className={classes.cell}>Diagonal (mm)</th>
                                <th className={classes.cellArea}>Area (mm²)</th>
                                <th className={classes.cell}>Resolution (px)</th>
                                <th className={classes.cellWithout}>Crop Factor (S35){'\u00A0\u00A0\u00A0'}</th>
                                <th className={classes.cellWithout}>Density (px/mm²)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {'\u00A0'}
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.cellLogo}/>
                                <td className={classes.cellCheckbox}/>
                                <td className={classes.cellModel}>
                                    <input type="text" placeholder="search" className={classes.textSearch} value={searchStr} onChange={onSearchChange} />
                                    {'\u00A0'}{'\u00A0'}
                                    {
                                        searchStr.length > 0 &&
                                        <FontAwesomeIcon className={classes.pointer} icon={faTimes} onClick={() => onSearchClear()} />
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {'\u00A0'}
                                </td>
                            </tr>
                            {
                                filteredSensors.map((sensor, i) => {

                                    const hasPrintedLogo = logoCount[sensor.logo];
                                    if (!hasPrintedLogo) {
                                        logoCount[sensor.logo] = filteredSensors.filter(s => s.logo === sensor.logo).length;
                                    }

                                    return (
                                        <tr key={sensor.model} className={`${classes.row} ${classes.pointer}`}
                                            onClick={() => onToggleSensor(sensor)}>

                                            {
                                                !hasPrintedLogo &&
                                                <td rowSpan={logoCount[sensor.logo]} style={{verticalAlign: 'top', paddingTop: 6}}
                                                    onClick={(ev) => {
                                                        onToggleAllSensorsForLogo(sensor.logo);
                                                        ev.stopPropagation();
                                                    }}>
                                                    <img
                                                    style={{width: 100, filter: 'brightness(0) invert()'}}
                                                    src={`/logo/${logoAsset[sensor.logo.toLowerCase()]}`}/>
                                                </td>
                                            }

                                            <td className={classes.cellCheckbox}><input className={classes.pointer}
                                                                                        type="checkbox"
                                                                                        checked={selectedSensors.includes(sensor)}
                                                                                        onChange={() => noop}/></td>
                                            <td className={classes.cellModel}>{sensor.model}</td>
                                            <td className={classes.cell}>{getDimensions(sensor)}</td>
                                            <td className={classes.cellAspectRatio}>{getAspectRatio(sensor.aspectRatio)}</td>
                                            <td className={classes.cell}>{sensor.diagonal}</td>
                                            <td className={classes.cellArea}>{getArea(sensor)}</td>
                                            <td className={classes.cell}>{getResolution(sensor)}</td>
                                            <td className={classes.cellWithout}>{sensor.cropFactor}</td>
                                            <td className={classes.cellWithout}>{getDensity(sensor)}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}
