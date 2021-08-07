import { maxBy, min, orderBy } from 'lodash';
import {createStylesheet} from '../helper/styles';
import {ILense, ISensor, ITexts} from './sensor.type';
import React, {useEffect, useState} from 'react';
import useWindowDimensions from '../hooks/use-window-dimensions';
import useClientLoaded from '../hooks/use-client-loaded';
import {noop} from '@babel/types';
import {faArrowDown, faArrowUp, faCoffee, faCross, faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormControl, Select, Input, MenuItem, ListItemText } from '@material-ui/core';
import CustomCheckbox from './custom-checkbox';
import {CustomTooltip} from './light-tooltip';
import useDimensions from '../hooks/use-dimensions';


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
        width: '100%',
        height: 700,
        marginVertical: 60,
    },
    surface: {
        position: 'relative',
        width: 0,
        height: 700,
    },
    options: {
        flexDirection: 'row',
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    optionsLabel: {
        marginLeft: 10,
        width: 190,
    },
    optionsText: {
        marginLeft: 20,
        marginRight: 20,
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
    box2: {
        position: 'absolute',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#AAA',
        transitionDuration: '300ms',
        transitionProperty: 'width, height, left, top, display, opacity',
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'center',
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
        whiteSpace: 'nowrap',
    },
    row: {
        height: 30
    },
    divider: {
        height: 7,
    },
    cellWithout: {
        paddingVertical: 2,
        textAlign: 'right',
    },
    cellX: {
        width: 20,
        paddingVertical: 2,
        textAlign: 'center',
    },
    cellW: {
        width: 90,
        paddingVertical: 2,
        textAlign: 'right',
    },
    cellH: {
        width: 40,
        paddingVertical: 2,
        textAlign: 'right',
    },
    cell: {
        width: 150,
        paddingVertical: 2,
        textAlign: 'right',
    },
    cellModel: {
        // flexDirection: 'row',
        width: 270,
    },
    cellScreen: {
        width: 200,
    },
    cellAspectRatio: {
        width: 130,
        textAlign: 'right',
    },
    cellArea: {
        width: 130,
        textAlign: 'right',
    },
    cellCheckbox: {
        width: 30,
    },
    cellLogo: {
        width: 150,
        background: 'none !important',
    },
    cellWithLogo: {
        textAlign: 'right',
        paddingRight: 15,
        background: 'none !important',
    },
    button: {
        marginRight: 20,
        cursor: 'pointer',
    },
    pointer: {
        cursor: 'pointer',
    },
    sortIcon: {
        marginLeft: 5,
        cursor: 'pointer',
    },
    text: {
        border: 'none',
        borderBottom: '1px solid #CCC',
        background: 'transparent',
        width: 40,
        color: 'white',
        outline: 'none',
        paddingTop: 4,
        paddingBottom: 3,
        fontSize: 14,
    },
    textSearch: {
        border: 'none',
        borderBottom: '1px solid #AAA',
        background: 'transparent',
        width: 140,
        color: 'white',
        outline: 'none',
        paddingBottom: 3,
        marginLeft: 15,
    },
    searchBox: {
        flexDirection: 'row',
    },
    title: {
    },
    tableAll: {
        minHeight: 1950,
    },
    tableSelected: {
        marginBottom: 6,
    },
    heading: {
        marginLeft: 180,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 40,
    },
    selectedLenses: {
        flexDirection: 'row',
        fontSize: 14,
        alignItems: 'flex-end',
        marginLeft: 180,
    },
    formControl: {
        width: 400,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            // maxHeight: ITEM_HEIGHT * 10.5 + ITEM_PADDING_TOP,
            // width: 250,
        },
    },
    variant: "menu",
    getContentAnchorEl: null,
};

interface Props {
    lenses: ILense[];
    sensors: ISensor[];
    texts: ITexts;
}

function sortSensors(selectedSensors: ISensor[], sensors: ISensor[]) {
    const result = [...selectedSensors];
    result.sort(function(a, b){
        return sensors.indexOf(a) - sensors.indexOf(b);
    });
    return result;
}

const offset = 50;

const individualImageCircleLense = {
    logo: '',
    model: `Individual Image Circle`,
    imageCircle: 0,
    color: '#cccccc',
    textColor: 'black',
};

const mobileCheck = function() {
    if (typeof window === "undefined") return false;
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||(window as any).opera);
    return check;
};

export function SensorComparison({lenses, sensors, texts}: Props) {
    const windowDimensions = useWindowDimensions();
    const isMobile = mobileCheck();
    const classes = useStyles();
    const [selectedSensors, setSelectedSensors] = useState(sensors.filter((s) => s.default));
    const [realPhysicalSensorSize, setRealPhysicalSensorSize] = useState(false);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortColumn2, setSortColumn2] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [selectedSortColumn, setSelectedSortColumn] = useState(null);
    const [selectedSortColumn2, setSelectedSortColumn2] = useState(null);
    const [selectedSortDirection, setSelectedSortDirection] = useState(null);
    const [screenSize, setScreenSize] = useState<number>(typeof window !== 'undefined' ? Math.sqrt(window.screen.width*window.screen.width+window.screen.height*window.screen.height)/96 : 100);
    const [screenSizeStr, setScreenSizeStr] = useState<string>('');
    const [imageCircle, setImageCircle] = useState<number>(0);
    const [imageCircleStr, setImageCircleStr] = useState<string>('');
    const [imageCircleVisible, setImageCircleVisible] = useState(false);
    const [searchStr, setSearchStr] = useState<string>('');
    const [filteredSensors, setFilteredSensors] = useState<ISensor[]>(sensors);
    const [showLogo, setShowLogo] = useState(true);
    const [hoveredSensor, setHoveredSensor] = useState(null);
    const [hoveredLense, setHoveredLense] = useState(null);
    const [hoveredSensorAll, setHoveredSensorAll] = useState(null);
    const [filteredSelectedSensors, setFilteredSelectedSensors] = useState<ISensor[]>(selectedSensors);
    const [ref, { x, y, width, height }] = useDimensions();
    const loaded = useClientLoaded() && width;

    const [selectedLensesStr, setSelectedLensesStr] = React.useState([]);
    const [selectedLenses, setSelectedLenses] = React.useState([]); // ...lenses.filter((l, i) => i < 2)

    const visibleLenses = [...selectedLenses];
    if (imageCircle > 0) {
        individualImageCircleLense.model = `Individual Image Circle (${imageCircle.toFixed(2)} mm)`;
        individualImageCircleLense.imageCircle = imageCircle;
        visibleLenses.push(individualImageCircleLense);
    }

    const handleChange = (event) => {
        setSelectedLensesStr(event.target.value);
        setSelectedLenses(lenses.filter(l => event.target.value.includes(l.model)));
    };

    // const maxWidth = (isMobile ? windowDimensions.width : windowDimensions.width) - offset*2;
    // const maxWidth = Math.min(700, width) - offset*2;
    // const maxWidth = (width || windowDimensions?.width) - offset*2;
    const maxWidth = width - offset*2;
    const maxHeight = 700;

    // console.log('width', width);
    // console.log('windowDimensions?.width', windowDimensions?.width);

    const selectedLensesAdded = selectedLenses.map(l => ({width: l.imageCircle, height: l.imageCircle}));

    const maxSensorWidth = maxBy([...selectedSensors, ...selectedLensesAdded, { width: imageCircle, height: imageCircle }], s => s.width);
    const maxSensorHeight = maxBy([...selectedSensors, ...selectedLensesAdded, { width: imageCircle, height: imageCircle }], s => s.height);

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
        let list = sensors.filter(s => s.model.toLowerCase().indexOf(searchStr.toLowerCase().trim()) > -1 || s.logo.toLowerCase().indexOf(searchStr.toLowerCase().trim()) > -1);
        if (sortColumn?.length > 0) {
            list = orderBy(list, s => s[sortColumn], sortDirection);
        }
        if (sortColumn?.length > 0 && sortColumn2?.length > 0) {
            list = orderBy(list, [s => s[sortColumn], s => s[sortColumn2]], [sortDirection, sortDirection]);
        }
        setFilteredSensors(list);
        setShowLogo(!(sortColumn?.length > 0));
    }, [searchStr, sortColumn, sortDirection]);

    useEffect(() => {
        let list = sortSensors(selectedSensors, sensors);
        if (selectedSortColumn?.length > 0) {
            list = orderBy(list, s => s[selectedSortColumn], selectedSortDirection);
        }
        if (selectedSortColumn?.length > 0 && selectedSortColumn2?.length > 0) {
            list = orderBy(list, [s => s[selectedSortColumn], s => s[selectedSortColumn2]], [selectedSortDirection, selectedSortDirection]);
        }
        // Fill up
        const fillUpCount = Math.max(5, Math.ceil(list.length / 5) * 5);
        for (let i = list.length; i < fillUpCount; i++) {
            list.push({ model: 'temp' } as ISensor);
        }
        setFilteredSelectedSensors(list);
    }, [selectedSensors, selectedSortColumn, selectedSortDirection]);

    const changeSort = (column: string, column2: string = null) => {
        if (sortColumn !== column) {
            setSortColumn(column);
            setSortColumn2(column2);
            setSortDirection('asc');
            return;
        }
        if (sortColumn === column && sortDirection === 'asc') {
            setSortColumn(column);
            setSortColumn2(column2);
            setSortDirection('desc');
            return;
        }
        if (sortColumn === column && sortDirection === 'desc') {
            setSortColumn(null);
            setSortColumn2(null);
            setSortDirection(null);
            return;
        }
    };

    const changeSelectedSort = (column: string, column2: string = null) => {
        if (selectedSortColumn !== column) {
            setSelectedSortColumn(column);
            setSelectedSortColumn2(column2);
            setSelectedSortDirection('asc');
            return;
        }
        if (selectedSortColumn === column && selectedSortDirection === 'asc') {
            setSelectedSortColumn(column);
            setSelectedSortColumn2(column2);
            setSelectedSortDirection('desc');
            return;
        }
        if (selectedSortColumn === column && selectedSortDirection === 'desc') {
            setSelectedSortColumn(null);
            setSelectedSortColumn2(null);
            setSelectedSortDirection(null);
            return;
        }
    };

    const onToggleSensor = (sensor) => {
        if (selectedSensors.includes(sensor)) {
          setSelectedSensors(selectedSensors.filter(s => s !== sensor));
        } else {
          setSelectedSensors([...selectedSensors, sensor]);
        }
    };

    const onToggleAllSensorsForLogo = (logo) => {
        const shownSensors = filteredSensors.filter(s => s.logo === logo);
        const allSensorsSelected = shownSensors.every(s => selectedSensors.includes(s));
        console.log('onToggleAllSensorsForLogo', allSensorsSelected);
        const selectedWithout = selectedSensors.filter(s => !shownSensors.includes(s));
        if (allSensorsSelected) {
            setSelectedSensors([...selectedWithout]);
        } else {
            setSelectedSensors([...selectedWithout, ...shownSensors]);
        }
    };

    const onToggleRealPhysicalSensorSize = (val) => {
        setRealPhysicalSensorSize(!realPhysicalSensorSize);
    };

    const onScreenSizeChange = (event) => {
        setScreenSizeStr(event.target.value.replace(',', '.'));
        setScreenSize(parseFloat(event.target.value.replace(',', '.')));
    };

    const onToggleImageCircle = (val) => {
        setImageCircleVisible(!imageCircleVisible);
    };

    const onImageCircleChange = (event) => {
        setImageCircleStr(event.target.value.replace(',', '.'));
        setImageCircle(parseFloat(event.target.value.replace(',', '.')));
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
        return sensor.photositeDensity ? sensor.photositeDensity.toLocaleString('en') : '-';
    };

    const getArea = (sensor: ISensor) => {
        return `${sensor.area.toFixed(2)}`;
    };

    const getDiagonal = (sensor: ISensor) => {
        return `${sensor.diagonal.toFixed(2)}`;
    };

    const getAspectRatio = (aspectRatio: string) => {
        return `${aspectRatio}`;
    }

    function copyTextToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    const copySelectionToClipboard = () => {
        const data = [
            [
                'Model',
                'Dimensions (mm)',
                'Aspect Ratio',
                'Diagonal (mm)',
                'Area (mm²)',
                'Resolution (px)',
                'Crop Factor (S35)',
                'Density (px/mm²)',
            ].join('\t'),
            ...filteredSelectedSensors.map(sensor => [
                `${sensor.model}`,
                `${sensor.width.toFixed(2)} x ${sensor.height.toFixed(2)}`,
                `${getAspectRatio(sensor.aspectRatio)}`,
                `${getDiagonal(sensor)}`,
                `${getArea(sensor)}`,
                `${getResolution(sensor)}`,
                `${sensor.cropFactor}`,
                `${getDensity(sensor)}`,
            ].join('\t'))
        ];
        copyTextToClipboard(data.join('\n'));
    };

    const logoCount: Record<string, number> = {};

    const logoAsset = {
        'film': 'film.png',
        'apple': 'apple.svg',
        'aja': 'aja.svg',
        'arri': 'arri.svg',
        'astro': 'astro.gif',
        'phantom': 'phantom.svg',
        'canon': 'canon.svg',
        'red': 'red.png',
        'blackmagic': 'blackmagic-website.svg',
        'kinefinity': 'kinefinity.png',
        'panasonic': 'panasonic.svg',
        'panavision': 'panavision.png',
        'sony': 'sony.svg',
        'cinemeridian': 'cinemeridian.png',
        'z cam': 'zcam.png',
    };

    const logoFilter = {
        'film': 'brightness(0) invert()',
        'apple': 'brightness(0) invert()',
        'aja': 'brightness(0) invert()',
        'arri': 'brightness(0) invert()',
        'astro': undefined,
        'phantom': 'brightness(0) invert()',
        'canon': 'brightness(0) invert()',
        'red': 'brightness(0) invert()',
        'blackmagic': 'grayscale()',
        'kinefinity': 'brightness(0) invert()',
        'panasonic': 'brightness(0) invert()',
        'panavision': 'brightness(0) invert()',
        'sony': 'brightness(0) invert()',
        'cinemeridian': 'brightness(0) invert()',
        'z cam': 'brightness(0) invert()',
    };

    const onMouseEnterLeaveLenseProps = (lense: ILense) => ({
        onMouseEnter: () => {
            setHoveredLense(lense);
        },
        onMouseLeave: () => {
            setHoveredLense(null);
        },
    });

    const onMouseEnterLeaveSensorProps = (sensor: ISensor) => ({
        onMouseEnter: () => {
            setHoveredSensor(sensor);
        },
        onMouseLeave: () => {
            setHoveredSensor(null);
        },
    });

    const onMouseEnterLeaveSensorPropsAll = (sensor: ISensor) => ({
        onMouseEnter: () => {
            setHoveredSensorAll(sensor);
        },
        onMouseLeave: () => {
            setHoveredSensorAll(null);
        },
    });

    return (
        <div className={classes.outer}>
            <div className={classes.container} ref={ref}>
                <div className={classes.surface}>
                    {
                        loaded && sensors.map(sensor => (
                            // BORDER
                            <div key={sensor.model} style={{
                                width: sensor.width * factor,
                                height: sensor.height * factor,
                                left: centerX - (sensor.width * factor) / 2,
                                top: maxHeight / 2 - (sensor.height * factor) / 2,
                                borderColor: hoveredSensor == sensor ? 'white' : sensor.color,
                                opacity: selectedSensors.includes(sensor) ? 1 : 0,
                                display: selectedSensors.includes(sensor) || !isMobile ? 'flex' : 'none',
                                alignItems: getAlignItems(sensor),
                                justifyContent: getJustifyContent(sensor),
                                zIndex: hoveredSensor == sensor ? 100 : 'inherit',
                                // background: 'rgb(255,255,255)',
                                background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(105,105,105,1) 71%, rgba(0,0,0,1) 80%)',
                            }} className={classes.box}/>
                        ))
                    }
                    {
                        loaded && sensors.map(sensor => (
                            // LABEL BACKGROUND & TEXT
                            <>
                                <div key={sensor.model} style={{
                                    width: sensor.width*factor,
                                    height: sensor.height*factor,
                                    left: centerX-(sensor.width*factor)/2,
                                    top: maxHeight/2-(sensor.height*factor)/2,
                                    borderColor: 'transparent',
                                    opacity: selectedSensors.includes(sensor) ? 1 : 0,
                                    display: selectedSensors.includes(sensor) || !isMobile ? 'flex' : 'none',
                                    alignItems: getAlignItems(sensor),
                                    justifyContent: getJustifyContent(sensor),
                                    zIndex: hoveredSensor == sensor ? 100 : 'inherit',
                                    overflow: hoveredSensor == sensor ? 'visible' : 'hidden',
                                    borderWidth: 0,
                                }} className={classes.box}>
                                    {
                                        !realPhysicalSensorSize &&
                                        <div className={classes.model} {...onMouseEnterLeaveSensorProps(sensor)} style={{
                                            cursor: 'default',
                                            color: 'transparent',
                                            margin: 0,
                                            backgroundColor: hoveredSensor == sensor ? 'white' : sensor.color,
                                        }}>{sensor.logo} {sensor.model}</div>
                                    }
                                </div>
                                <div key={sensor.model} style={{
                                    width: sensor.width*factor,
                                    height: sensor.height*factor,
                                    left: centerX-(sensor.width*factor)/2,
                                    top: maxHeight/2-(sensor.height*factor)/2,
                                    borderColor: 'transparent',
                                    opacity: selectedSensors.includes(sensor) ? 1 : 0,
                                    display: selectedSensors.includes(sensor) || !isMobile ? 'flex' : 'none',
                                    alignItems: getAlignItems(sensor),
                                    justifyContent: getJustifyContent(sensor),
                                    zIndex: hoveredSensor == sensor ? 100 : 'inherit',
                                    overflow: hoveredSensor == sensor ? 'visible' : 'hidden',
                                }} className={classes.box}>
                                    {
                                        !realPhysicalSensorSize &&
                                        <div className={classes.model} {...onMouseEnterLeaveSensorProps(sensor)} style={{
                                            cursor: 'default',
                                            color: hoveredSensor == sensor ? 'black' : sensor.textColor,
                                            backgroundColor: 'transparent',
                                        }}>{sensor.logo} {sensor.model}</div>
                                    }
                                </div>
                            </>
                        ))
                    }
                    {
                        loaded && orderBy(visibleLenses, l => l.imageCircle).map((lense, i) =>
                            // LENSE
                            <div key={lense.model} style={{
                                width: lense.imageCircle*factor,
                                height: lense.imageCircle*factor,
                                left: centerX-(lense.imageCircle*factor)/2,
                                top: maxHeight/2-(lense.imageCircle*factor)/2,
                                borderColor: hoveredLense == lense ? 'white' : lense.color,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                opacity: 1,
                                zIndex: hoveredLense == lense ? 100 : 'inherit',
                                borderRadius: '50%',
                            }} className={classes.box2}>
                                {
                                    !realPhysicalSensorSize &&
                                    <div className={classes.model} {...onMouseEnterLeaveLenseProps(lense)} style={{
                                        zIndex: 30,
                                        cursor: 'default',
                                        // transform: `translate(-0.5%) rotate(${i * -5}deg)`,
                                        transform: `translate(100%) rotate(${i * -5}deg)`,
                                        marginLeft: -1,
                                        transformOrigin: -lense.imageCircle * factor / 2,
                                        color: hoveredLense == lense ? 'black' : lense.textColor,
                                        backgroundColor: hoveredLense == lense ? 'white' : lense.color,
                                    }}>{lense.logo} {lense.model}</div>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={classes.wrapper}>
                <div>
                    <div className={classes.options}>
                        <input className={classes.pointer} type="checkbox" checked={realPhysicalSensorSize} onChange={onToggleRealPhysicalSensorSize} />
                        <div className={`${classes.pointer} ${classes.optionsLabel}`} onClick={onToggleRealPhysicalSensorSize}>
                            <CustomTooltip title={texts.realPhysicalSensorSize}>
                                Real physical sensor size
                            </CustomTooltip>
                        </div>
                        <div className={`${classes.optionsText}`}>Your screen size (inch)</div>
                        <div><input type="text" className={classes.text} placeholder="size" value={screenSizeStr} onChange={onScreenSizeChange} /></div>
                    </div>

                    <div className={classes.heading}>Selected Lenses</div>
                    <div className={classes.selectedLenses}>
                        <FormControl className={classes.formControl}>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={selectedLensesStr}
                                onChange={handleChange}
                                input={<Input />}
                                displayEmpty={true}
                                renderValue={(selected: string[] | null) => selected?.length + ' selected'}
                                MenuProps={MenuProps as any}
                            >
                                {lenses.map(lense => (
                                    <MenuItem key={lense.model} value={lense.model}>
                                        <CustomCheckbox checked={selectedLenses.includes(lense)} />
                                        <ListItemText primary={`${lense.logo} ${lense.model} (⌀ ${lense.imageCircle.toFixed(2)} mm)`} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className={`${classes.optionsText}`}>
                            <CustomTooltip title={texts.individualImageCircle}>
                                Individual image circle (mm)
                            </CustomTooltip>
                        </div>
                        <div><input type="text" className={classes.text} placeholder="size" value={imageCircleStr} onChange={onImageCircleChange} /></div>
                    </div>

                    <br/>
                    <table className="table-no-select">
                        <thead>
                        <tr>
                            <th className={classes.cellLogo}/>
                            <th className={classes.cellCheckbox}/>
                            <td>
                                <button disabled={selectedLenses.length === 0} className={classes.button} onClick={() => {
                                    setSelectedLensesStr([]);
                                    setSelectedLenses([]);
                                }}>Clear selection</button>
                            </td>
                        </tr>
                        </thead>
                    </table>

                    <h3 className={classes.title}>{'\u00A0'}</h3>
                    <div className={classes.tableSelected}>
                        <table className="table-no-select table-selected">
                            <thead>
                            <tr>
                                <th className={classes.cellLogo}/>
                                <th className={classes.cellCheckbox}/>
                                <th className={classes.cellModel}>Selected Models</th>
                                <th colSpan={3} className={`${classes.cell} ${classes.pointer}`} onClick={() => changeSelectedSort('width', 'height')}>
                                    <CustomTooltip title={texts.dimensions}>
                                        Dimensions (mm)
                                        {
                                            selectedSortColumn === 'width' &&
                                            <FontAwesomeIcon className={classes.sortIcon} icon={selectedSortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                        }
                                    </CustomTooltip>
                                </th>
                                <th className={`${classes.cellAspectRatio} ${classes.pointer}`} onClick={() => changeSelectedSort('aspectRatio')}>
                                    <CustomTooltip title={texts.aspectRatio}>
                                        Aspect Ratio
                                        {
                                            selectedSortColumn === 'aspectRatio' &&
                                            <FontAwesomeIcon className={classes.sortIcon} icon={selectedSortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                        }
                                    </CustomTooltip>
                                </th>
                                <th className={`${classes.cell} ${classes.pointer}`} onClick={() => changeSelectedSort('diagonal')}>
                                    <CustomTooltip title={texts.diagonal}>
                                        Diagonal (mm)
                                        {
                                            selectedSortColumn === 'diagonal' &&
                                            <FontAwesomeIcon className={classes.sortIcon} icon={selectedSortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                        }
                                    </CustomTooltip>
                                </th>
                                <th className={`${classes.cell} ${classes.pointer}`} onClick={() => changeSelectedSort('resolutionX', 'resolutionY')}>
                                    <CustomTooltip title={texts.resolution}>
                                        Resolution (px)
                                        {
                                            selectedSortColumn === 'resolutionX' &&
                                            <FontAwesomeIcon className={classes.sortIcon} icon={selectedSortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                        }
                                    </CustomTooltip>
                                </th>
                                {
                                    !isMobile &&
                                    <>
                                        <th className={`${classes.cellWithout} ${classes.pointer}`}
                                            onClick={() => changeSelectedSort('cropFactor')}>
                                            <CustomTooltip title={texts.cropFactor}>
                                                {'\u00A0\u00A0\u00A0\u00A0'}
                                                Crop Factor (S35)
                                                {
                                                    selectedSortColumn === 'cropFactor' &&
                                                    <FontAwesomeIcon className={classes.sortIcon}
                                                                     icon={selectedSortDirection === 'desc' ? faArrowDown : faArrowUp}/>
                                                }
                                            </CustomTooltip>
                                        </th>
                                        <th className={`${classes.cellWithout} ${classes.pointer}`}
                                            onClick={() => changeSelectedSort('photositeDensity')}>
                                            <CustomTooltip title={texts.density}>
                                                {'\u00A0\u00A0\u00A0\u00A0'}
                                                Density (px/mm²)
                                                {
                                                    selectedSortColumn === 'photositeDensity' &&
                                                    <FontAwesomeIcon className={classes.sortIcon}
                                                                     icon={selectedSortDirection === 'desc' ? faArrowDown : faArrowUp}/>
                                                }
                                            </CustomTooltip>
                                        </th>
                                    </>
                                }
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredSelectedSensors.map((sensor, i) => (
                                        <tr key={i} className={`${classes.row} ${classes.pointer} ${hoveredSensor === sensor ? 'hovered' : ''}`} onClick={() => onToggleSensor(sensor)}>
                                            <td className={classes.cellLogo} style={{textAlign: 'right', paddingRight: 10}}>{sensor.logo}</td>
                                            {
                                                sensor.model !== 'temp' &&
                                                    <>
                                                        <td {...onMouseEnterLeaveSensorProps(sensor)} className={classes.cellCheckbox}>
                                                            <input className={classes.pointer} type="checkbox" checked={selectedSensors.includes(sensor)} onChange={() => noop}/>
                                                        </td>
                                                        <td {...onMouseEnterLeaveSensorProps(sensor)} className={classes.cellModel}>{sensor.model}</td>
                                                        <td {...onMouseEnterLeaveSensorProps(sensor)} className={classes.cellW}>{sensor.width.toFixed(2)}</td>
                                                        <td {...onMouseEnterLeaveSensorProps(sensor)} className={classes.cellX}>x</td>
                                                        <td {...onMouseEnterLeaveSensorProps(sensor)} className={classes.cellH}>{sensor.height.toFixed(2)}</td>
                                                        <td {...onMouseEnterLeaveSensorProps(sensor)} className={classes.cellAspectRatio}>{getAspectRatio(sensor.aspectRatio)}</td>
                                                        <td {...onMouseEnterLeaveSensorProps(sensor)} className={classes.cell}>{getDiagonal(sensor)}</td>
                                                        {/*<td {...onMouseEnterLeaveProps(sensor)} className={classes.cellArea}>{getArea(sensor)}</td>*/}
                                                        <td {...onMouseEnterLeaveSensorProps(sensor)} className={classes.cell}>{getResolution(sensor)}</td>

                                                        {
                                                            !isMobile &&
                                                            <>
                                                                <td {...onMouseEnterLeaveSensorProps(sensor)} className={classes.cellWithout}>{sensor.cropFactor}</td>
                                                                <td {...onMouseEnterLeaveSensorProps(sensor)} className={classes.cellWithout}>{getDensity(sensor)}</td>
                                                            </>
                                                        }
                                                    </>
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <table className="table-no-select">
                        <thead>
                        <tr>
                            <th className={classes.cellLogo}/>
                            <th className={classes.cellCheckbox}/>
                            <td>
                                <button disabled={selectedSensors.length === 0} className={classes.button} onClick={() => setSelectedSensors([])}>Clear selection</button>
                                <button disabled={selectedSensors.length === 0} className={classes.button} onClick={copySelectionToClipboard}>Copy selection to clipboard</button>
                            </td>
                        </tr>
                        </thead>
                    </table>

                    <h3 className={classes.title}>{'\u00A0'}</h3>
                    <div className={classes.tableAll}>
                        <table className="table-no-select table-all">
                            <thead>
                                <tr>
                                    <th className={classes.cellLogo}/>
                                    <th className={classes.cellCheckbox}/>
                                    <th className={classes.cellModel}>
                                        <div className={classes.searchBox}>
                                            Model
                                            <input type="text" placeholder="Search" className={classes.textSearch} value={searchStr} onChange={onSearchChange} />
                                            {'\u00A0'}{'\u00A0'}
                                            {
                                                searchStr.length > 0 &&
                                                <FontAwesomeIcon className={classes.pointer} icon={faTimes} onClick={() => onSearchClear()} />
                                            }
                                        </div>
                                    </th>
                                    <th colSpan={3} className={`${classes.cell} ${classes.pointer}`} onClick={() => changeSort('width', 'height')}>
                                        <CustomTooltip title={texts.dimensions}>
                                            Dimensions (mm)
                                            {
                                                sortColumn === 'width' &&
                                                <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                            }
                                        </CustomTooltip>
                                    </th>
                                    <th className={`${classes.cellAspectRatio} ${classes.pointer}`} onClick={() => changeSort('aspectRatio')}>
                                        <CustomTooltip title={texts.aspectRatio}>
                                            Aspect Ratio
                                            {
                                                sortColumn === 'aspectRatio' &&
                                                <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                            }
                                        </CustomTooltip>
                                    </th>
                                    <th className={`${classes.cell} ${classes.pointer}`} onClick={() => changeSort('diagonal')}>
                                        <CustomTooltip title={texts.diagonal}>
                                            Diagonal (mm)
                                            {
                                                sortColumn === 'diagonal' &&
                                                <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                            }
                                        </CustomTooltip>
                                    </th>
                                    <th className={`${classes.cell} ${classes.pointer}`} onClick={() => changeSort('resolutionX', 'resolutionY')}>
                                        <CustomTooltip title={texts.resolution}>
                                            Resolution (px)
                                            {
                                                sortColumn === 'resolutionX' &&
                                                <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                            }
                                        </CustomTooltip>
                                    </th>

                                    {
                                        !isMobile &&
                                        <>
                                            <th className={`${classes.cellWithout} ${classes.pointer}`} onClick={() => changeSort('cropFactor')}>
                                                <CustomTooltip title={texts.cropFactor}>
                                                    {'\u00A0\u00A0\u00A0\u00A0'}
                                                    Crop Factor (S35)
                                                    {
                                                        sortColumn === 'cropFactor' &&
                                                        <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                                    }
                                                </CustomTooltip>
                                            </th>
                                            <th className={`${classes.cellWithout} ${classes.pointer}`} onClick={() => changeSort('photositeDensity')}>
                                                <CustomTooltip title={texts.density}>
                                                    {'\u00A0\u00A0\u00A0\u00A0'}
                                                    Density (px/mm²)
                                                    {
                                                        sortColumn === 'photositeDensity' &&
                                                        <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                                    }
                                                </CustomTooltip>
                                            </th>
                                        </>
                                    }

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredSensors.map((sensor, i) => {

                                        const hasPrintedLogo = logoCount[sensor.logo];
                                        if (!hasPrintedLogo) {
                                            logoCount[sensor.logo] = filteredSensors.filter(s => s.logo === sensor.logo).length;
                                        }

                                        return (
                                            <React.Fragment key={sensor.model}>
                                                {
                                                    !hasPrintedLogo && showLogo && i != 0 &&
                                                        <tr><td className={classes.divider}/></tr>
                                                }
                                                <tr className={`${classes.row} ${classes.pointer} ${hoveredSensorAll === sensor ? 'hovered' : ''}`}
                                                    onClick={() => onToggleSensor(sensor)}>

                                                    {
                                                        !hasPrintedLogo && showLogo &&
                                                        <td rowSpan={logoCount[sensor.logo]}
                                                            className={classes.cellWithLogo}
                                                            style={{cursor: 'default', userSelect: 'none', verticalAlign: 'top', paddingTop: sensor.logo === 'CINEMERIDIAN' ? 0 : 6}}
                                                            onClick={(ev) => {
                                                                ev.stopPropagation();
                                                            }}
                                                        >
                                                            <img
                                                                onClick={(ev) => {
                                                                    onToggleAllSensorsForLogo(sensor.logo);
                                                                    ev.stopPropagation();
                                                                }}
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    maxWidth: 100,
                                                                    maxHeight: 40,
                                                                    filter: logoFilter[sensor.logo.toLowerCase()],
                                                                }}
                                                                src={`/logo/${logoAsset[sensor.logo.toLowerCase()]}`}
                                                            />
                                                        </td>
                                                    }
                                                    {
                                                        !showLogo &&
                                                        <td className={classes.cellLogo} style={{textAlign: 'right', paddingRight: 10}}>{sensor.logo}</td>
                                                    }

                                                    <td {...onMouseEnterLeaveSensorPropsAll(sensor)} className={classes.cellCheckbox}>
                                                        <input className={classes.pointer} type="checkbox" checked={selectedSensors.includes(sensor)} onChange={() => noop}/>
                                                    </td>
                                                    <td {...onMouseEnterLeaveSensorPropsAll(sensor)} className={classes.cellModel}>{sensor.model}</td>
                                                    <td {...onMouseEnterLeaveSensorPropsAll(sensor)} className={classes.cellW}>{sensor.width.toFixed(2)}</td>
                                                    <td {...onMouseEnterLeaveSensorPropsAll(sensor)} className={classes.cellX}>x</td>
                                                    <td {...onMouseEnterLeaveSensorPropsAll(sensor)} className={classes.cellH}>{sensor.height.toFixed(2)}</td>
                                                    <td {...onMouseEnterLeaveSensorPropsAll(sensor)} className={classes.cellAspectRatio}>{getAspectRatio(sensor.aspectRatio)}</td>
                                                    <td {...onMouseEnterLeaveSensorPropsAll(sensor)} className={classes.cell}>{getDiagonal(sensor)}</td>
                                                    {/*<td {...onMouseEnterLeavePropsAll(sensor)} className={classes.cellArea}>{getArea(sensor)}</td>*/}
                                                    <td {...onMouseEnterLeaveSensorPropsAll(sensor)} className={classes.cell}>{getResolution(sensor)}</td>
                                                    {
                                                        !isMobile &&
                                                        <>
                                                            <td {...onMouseEnterLeaveSensorPropsAll(sensor)} className={classes.cellWithout}>{sensor.cropFactor}</td>
                                                            <td {...onMouseEnterLeaveSensorPropsAll(sensor)} className={classes.cellWithout}>{getDensity(sensor)}</td>
                                                        </>
                                                    }
                                                </tr>
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
