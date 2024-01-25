import { maxBy, min, orderBy } from 'lodash';
import {createStylesheet} from '../helper/styles';
import {ILense, ISensor, ITexts} from './sensor.type';
import React, {Fragment, useEffect, useState} from 'react';
import useWindowDimensions from '../hooks/use-window-dimensions';
import useClientLoaded from '../hooks/use-client-loaded';
import {faArrowDown, faArrowUp, faCoffee, faCross, faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormControl, Select, Input, MenuItem, ListItemText } from '@material-ui/core';
import CustomCheckbox from './custom-checkbox';
import {CustomTooltip} from './light-tooltip';
import useDimensions from '../hooks/use-dimensions';
import {useRouter} from "next/router";


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
    shareCopiedLink: {
        position: 'absolute',
        top: -30,
        // background: "yellow",
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
        zIndex: 1000,
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
    ghost: {
        height: 30,
    },
    cellWithout: {
        paddingVertical: 2,
        textAlign: 'right',
    },
    cellX: {
        // width: 20,
        paddingVertical: 2,
        textAlign: 'center',
    },
    cellW: {
        // width: 90,
        paddingVertical: 2,
        textAlign: 'right',
    },
    cellH: {
        // width: 50,
        paddingVertical: 2,
        textAlign: 'right',
    },
    cell: {
        width: 150,
        paddingVertical: 2,
        textAlign: 'right',
    },
    cellModel: {
        textAlign: 'left !important' as any,
        width: 285,
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
        // width: 30,
    },
    cellLogo: {
        width: 150,
        background: 'none !important',
        minHeight: 30,
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
    },
    cellWithLogo: {
        textAlign: 'right',
        paddingRight: '15px !important' as any,
        background: 'none !important',
        alignSelf: 'start',
    },
    button: {
        marginRight: 20,
        cursor: 'pointer',
    },
    buttonRow: {
        marginLeft: 178,
    },
    pointer: {
        cursor: 'pointer',
    },
    cellHovered: {
        background: '#333',
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
    grid: {
        display: 'grid',
        gridTemplateColumns: 'auto 30px auto 90px 20px 50px auto auto auto auto auto',
        alignItems: 'center',
    },
    gridMobile: {
        display: 'grid',
        gridTemplateColumns: 'auto 30px auto 90px 20px 50px auto auto auto',
        alignItems: 'center',
    },
    cellHead: {
        padding: '2px 3px',
        paddingBottom: '10px',
        lineHeight: 1.6,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    cellBody: {
        padding: '2px 3px',
        lineHeight: 1.6,
    },
    cellSpan3: {
        width: 160,
        gridColumn: 'span 3',
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

const individualImageCircleLenses: ILense[] = [{},{},{}] as any;

const mobileCheck = function() {
    if (typeof window === "undefined") return false;
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||(window as any).opera);
    return check;
};

export function SensorComparison({lenses, sensors, texts}: Props) {
    const _isMobile = mobileCheck();
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
    const [imageCircles, setImageCircles] = useState<number[]>([0, 0, 0]);
    const [imageCirclesStr, setImageCirclesStr] = useState<string[]>(['', '', '']);
    const [searchStr, setSearchStr] = useState<string>('');
    const [filteredSensors, setFilteredSensors] = useState<ISensor[]>(sensors);
    const [showLogo, setShowLogo] = useState(true);
    const [hoveredSensor, setHoveredSensor] = useState(null);
    const [hoveredLense, setHoveredLense] = useState(null);
    const [hoveredSensorAll, setHoveredSensorAll] = useState(null);
    const [filteredSelectedSensors, setFilteredSelectedSensors] = useState<ISensor[]>(selectedSensors);
    const [ref, { x, y, width, height }] = useDimensions();
    const loaded = useClientLoaded() && width;
    const [shared, setShared] = useState<any>(null);

    const [selectedLensesStr, setSelectedLensesStr] = React.useState([]);
    const [selectedLenses, setSelectedLenses] = React.useState<ILense[]>([]);

    // Hack: Need when first loading mobile it would be wrong otherwise
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
        setIsMobile(_isMobile);
    }, [_isMobile]);

    const visibleLenses = [...selectedLenses];
    let i = 0;
    for (const imageCircle of imageCircles) {
        if (imageCircle > 0) {
            Object.assign(individualImageCircleLenses[i], {
                logo: '',
                model: `Individual Image Circle ${String.fromCharCode(i + 65)} (${imageCircle.toFixed(2)} mm)`,
                imageCircle,
                color: '#cccccc',
                textColor: 'black',
                index: i,
                expansion: individualImageCircleLenses[i]?.expansion || 1,
            });
            visibleLenses.push(individualImageCircleLenses[i]);
        }
        i++;
    }

    const handleChange = (value) => {
        setSelectedLensesStr(value);
        setSelectedLenses(lenses.filter(l => value.includes(l.model)));
    };

    const onToggleLense = (lense: ILense) => {
        if (selectedLensesStr.includes(lense.model)) {
            handleChange(selectedLensesStr.filter(s => s !== lense.model));
        } else {
            handleChange([...selectedLensesStr, lense.model]);
        }
    };

    const maxWidth = width - offset*2;
    const maxHeight = 700;

    const selectedLensesAdded = selectedLenses.map(l => ({
        width: l.imageCircle*l.expansion,
        height: l.imageCircle*l.expansion,
    }));
    const imageCirclesAdded = imageCircles
        .filter(imageCircle => imageCircle != null)
        .map((imageCircle, i) => ({
            width: individualImageCircleLenses[i].imageCircle*individualImageCircleLenses[i].expansion,
            height: individualImageCircleLenses[i].imageCircle*individualImageCircleLenses[i].expansion,
        }));

    const maxSensorWidth = maxBy([...selectedSensors, ...selectedLensesAdded, ...imageCirclesAdded], s => s.width);
    const maxSensorHeight = maxBy([...selectedSensors, ...selectedLensesAdded, ...imageCirclesAdded], s => s.height);

    let factor = 1;
    if (maxSensorWidth != null && (selectedSensors.length > 0 || selectedLensesAdded.length > 0 || imageCircles)) {
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

    const router = useRouter();

    useEffect(() => {
        if (router.query.sensors || router.query.lenses || router.query.imageCircles) {
            setSelectedSensors(sensors.filter(s => JSON.parse((router.query.sensors || '[]') as string).includes(s.id)));

            const newLenses = lenses.filter(s => JSON.parse((router.query.lenses || '[]') as string).includes(s.id));

            if (router.query.lenseExpansions) {
                const lenseExpansions = JSON.parse((router.query.lenseExpansions || '[]') as string);
                for (let i = 0; i < lenseExpansions.length; i++) {
                    newLenses[i].expansion = lenseExpansions[i];
                }
            }

            setSelectedLenses(newLenses);
            setSelectedLensesStr(newLenses.map(l => l.model));

            const imageCircles = JSON.parse((router.query.imageCircles || '[]') as string);

            if (router.query.imageCircleExpansions) {
                const imageCircleExpansions = JSON.parse((router.query.imageCircleExpansions || '[]') as string);
                for (let i = 0; i < imageCircleExpansions.length; i++) {
                    individualImageCircleLenses[i].expansion = imageCircleExpansions[i];
                }
            }

            setImageCircles(imageCircles);
            setImageCirclesStr(imageCircles.map(imageCircle => imageCircle?.toString().replace('.', ',')));

            console.log('applied query params', router.query, imageCircles.map(imageCircle => imageCircle?.toString().replace('.', ',')));
            router.push('/', undefined, { shallow: true });
        }
    }, [router.query]);

    const share = () => {
        const data = {
            sensors: JSON.stringify(selectedSensors.map(s => s.id)),
            lenses: JSON.stringify(selectedLenses.map(l => l.id)),
            lenseExpansions: JSON.stringify(selectedLenses.map(l => l.expansion)),
            imageCircles: JSON.stringify(imageCircles.map(imageCircle => imageCircle > 0 ? imageCircle : null)),
            imageCircleExpansions: JSON.stringify(individualImageCircleLenses.map(imageCircle => imageCircle.expansion ?? 1)),
        };

        const link = `${location.origin}?sensors=${data.sensors}&lenses=${data.lenses}&lenseExpansions=${data.lenseExpansions}&imageCircles=${data.imageCircles}&imageCircleExpansions=${data.imageCircleExpansions}`;

        console.log(link);

        copyTextToClipboard(link);

        if (shared) {
            clearTimeout(shared);
        }

        setShared(
            setTimeout(() => {
                setShared(null);
            }, 4000)
        );
    };

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

    const onLenseExpansionChange = (lense, expansion) => {
        console.log(lense, expansion);
        lense.expansion = expansion;
    };

    const onImageCircleChange = (value, i) => {
        const imageCirclesStr2 = [...imageCirclesStr];
        imageCirclesStr2[i] = value.replace(',', '.');
        setImageCirclesStr(imageCirclesStr2);
        const imageCircles2 = [...imageCircles];
        imageCircles2[i] = parseFloat(value.replace(',', '.'));
        setImageCircles(imageCircles2);
        individualImageCircleLenses[i].expansion = 1;
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

    const getDimensions = (sensor: ISensor) => {
        if (!sensor.width || !sensor.height) return '-';
        return `${sensor.width?.toFixed(2)} x ${sensor.height?.toFixed(2)}`;
    };

    const getArea = (sensor: ISensor) => {
        return `${sensor.area.toFixed(2)}`;
    };

    const getDiagonal = (sensor: ISensor) => {
        if (!sensor.diagonal) return '-';
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
                'Crop Factor (FF)',
                'Density (px/mm²)',
            ].join('\t'),
            ...filteredSelectedSensors.filter(s => s.model !== 'temp').map(sensor => [
                `${sensor.model}`,
                `${getDimensions(sensor)}`,
                `${getAspectRatio(sensor.aspectRatio)}`,
                `${getDiagonal(sensor)}`,
                `${getArea(sensor)}`,
                `${getResolution(sensor)}`,
                `${sensor.cropFactorS35}`,
                `${sensor.cropFactorFF}`,
                `${getDensity(sensor)}`,
            ].join('\t'))
        ];
        copyTextToClipboard(data.join('\n'));
    };

    const logoCount: Record<string, number> = {};

    const logoAsset = {
        'film': 'film.png',
        'achtel': 'achtel.png',
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
        'achtel': 'brightness(0) invert()',
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
        onClick: () => {
            if (lense.model.includes('Individual')) {
                onImageCircleChange('', lense.index);
            } else {
                onToggleLense(lense);
            }
        },
        onMouseEnter: () => {
            console.log('setHoveredLense', lense);
            setHoveredLense(lense);
        },
        onMouseLeave: () => {
            setHoveredLense(null);
        },
    });

    const onMouseEnterLeaveSensorProps = (sensor: ISensor) => ({
        onClick: () => {
            onToggleSensor(sensor);
        },
        onMouseEnter: () => {
            setHoveredSensor(sensor);
        },
        onMouseLeave: () => {
            setHoveredSensor(null);
        },
    });

    const onMouseEnterLeaveSensorPropsAll = (sensor: ISensor) => ({
        onClick: () => {
            onToggleSensor(sensor);
        },
        onMouseEnter: () => {
            setHoveredSensorAll(sensor);
        },
        onMouseLeave: () => {
            setHoveredSensorAll(null);
        },
    });

    return (
        <div className={classes.outer} data-nosnippet>
            <div className={classes.container} ref={ref}>
                <div className={classes.surface}>
                    {
                        loaded && sensors.map(sensor => (
                            <div key={sensor.model + '-1'} style={{
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
                            }} className={classes.box}/>
                        ))
                    }
                    {
                        loaded && sensors.map(sensor => (
                            <Fragment key={sensor.model + '-2'}>
                                <div style={{
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
                                <div style={{
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
                            </Fragment>
                        ))
                    }
                    {
                        loaded && orderBy(visibleLenses, l => l.imageCircle).map((lense, i) =>
                            <div key={lense.model} style={{
                                width: lense.imageCircle*lense.expansion*factor,
                                height: lense.imageCircle*lense.expansion*factor,
                                left: centerX-(lense.imageCircle*lense.expansion*factor)/2,
                                top: maxHeight/2-(lense.imageCircle*lense.expansion*factor)/2,
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
                                        transform: `translate(99%) rotate(${i * -11}deg)`,
                                        marginLeft: -1, // does not work
                                        transformOrigin: -lense.imageCircle*lense.expansion * factor / 2,
                                        color: hoveredLense == lense ? 'black' : lense.textColor,
                                        backgroundColor: hoveredLense == lense ? 'white' : lense.color,
                                    }}>
                                        {/*<input type="button" value="X"/>*/}
                                        <span>{lense.logo + ' ' + lense.model}</span>
                                        <br/>
                                        <span>Expander/Reducer{' '}</span>
                                        <select value={lense.expansion.toFixed(2)} onChange={(event) => onLenseExpansionChange(lense, parseFloat(event.target.value))} onClick={(e) => { e.stopPropagation() }}>
                                            <option value="0.50">0.50</option>
                                            <option value="0.58">0.58</option>
                                            <option value="0.64">0.64</option>
                                            <option value="0.70">0.70</option>
                                            <option value="0.71">0.71</option>
                                            <option value="0.80">0.80</option>
                                            <option value="1.00">–</option>
                                            <option value="1.20">1.2</option>
                                            <option value="1.25">1.25</option>
                                            <option value="1.40">1.4</option>
                                            <option value="1.60">1.6</option>
                                            <option value="1.66">1.66</option>
                                            <option value="1.70">1.7</option>
                                            <option value="2.00">2.0</option>
                                        </select>
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={classes.wrapper}>
                <div>
                    <div className={classes.options} style={{position: "relative"}}>
                        <div className={classes.shareCopiedLink}>{ shared ? 'Copied link to clipboard!' : '\u00A0' }</div>
                        <button disabled={selectedSensors.length === 0 && selectedLenses.length === 0} className={classes.button} onClick={share}>Share</button>
                    </div>
                    {/*<br/>*/}
                    {/*<div className={classes.options}>*/}
                    {/*    <input className={classes.pointer} type="checkbox" checked={realPhysicalSensorSize} onChange={onToggleRealPhysicalSensorSize} />*/}
                    {/*    <div className={`${classes.pointer} ${classes.optionsLabel}`} onClick={onToggleRealPhysicalSensorSize}>*/}
                    {/*        <CustomTooltip title={texts.realPhysicalSensorSize}>*/}
                    {/*            Real physical sensor size*/}
                    {/*        </CustomTooltip>*/}
                    {/*    </div>*/}
                    {/*    <div className={`${classes.optionsText}`}>Your screen size (inch)</div>*/}
                    {/*    <div><input type="text" className={classes.text} placeholder="size" value={screenSizeStr} onChange={onScreenSizeChange} /></div>*/}
                    {/*</div>*/}

                    <div className={classes.heading}>Selected Lenses</div>
                    <div className={classes.selectedLenses}>
                        <FormControl className={classes.formControl}>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={selectedLensesStr}
                                onChange={(event) => handleChange(event.target.value)}
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
                                Individual image circles (mm)
                            </CustomTooltip>
                        </div>
                        {
                            imageCirclesStr.map((imageCircleStr, i) => (
                                <div key={i}>
                                    <input type="text" className={classes.text} placeholder="size" value={imageCircleStr} onChange={(event) => onImageCircleChange(event.target.value, i)} />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            ))
                        }
                    </div>

                    <br/>

                    <div className={classes.buttonRow}>
                        <button disabled={selectedLenses.length === 0} className={classes.button} onClick={() => {
                            setSelectedLensesStr([]);
                            setSelectedLenses([]);
                        }}>Clear selection</button>
                    </div>

                    <h3 className={classes.title}>{'\u00A0'}</h3>
                    <div className={classes.tableSelected}>
                        <div className={`${isMobile ? classes.gridMobile : classes.grid} table-no-select table-selected`}>
                                <div className={`${classes.cellHead} ${classes.cellLogo}`}/>
                                <div className={`${classes.cellHead} ${classes.cellCheckbox}`}/>
                                <div className={`${classes.cellHead} ${classes.cellModel}`}>Selected Models</div>
                                <div className={`${classes.cellHead} ${classes.cellSpan3} ${classes.cell} ${classes.pointer}`} onClick={() => changeSelectedSort('width', 'height')}>
                                    <CustomTooltip title={texts.dimensions}>
                                        Dimensions (mm)
                                        {
                                            selectedSortColumn === 'width' &&
                                            <FontAwesomeIcon className={classes.sortIcon} icon={selectedSortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                        }
                                    </CustomTooltip>
                                </div>
                                <div className={`${classes.cellHead} ${classes.cellAspectRatio} ${classes.pointer}`} onClick={() => changeSelectedSort('aspectRatio')}>
                                    <CustomTooltip title={texts.aspectRatio}>
                                        Aspect Ratio
                                        {
                                            selectedSortColumn === 'aspectRatio' &&
                                            <FontAwesomeIcon className={classes.sortIcon} icon={selectedSortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                        }
                                    </CustomTooltip>
                                </div>
                                <div className={`${classes.cellHead} ${classes.cell} ${classes.pointer}`} onClick={() => changeSelectedSort('diagonal')}>
                                    <CustomTooltip title={texts.diagonal}>
                                        Diagonal (mm)
                                        {
                                            selectedSortColumn === 'diagonal' &&
                                            <FontAwesomeIcon className={classes.sortIcon} icon={selectedSortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                        }
                                    </CustomTooltip>
                                </div>
                                <div className={`${classes.cellHead} ${classes.cell} ${classes.pointer}`} onClick={() => changeSelectedSort('resolutionX', 'resolutionY')}>
                                    <CustomTooltip title={texts.resolution}>
                                        Resolution (px)
                                        {
                                            selectedSortColumn === 'resolutionX' &&
                                            <FontAwesomeIcon className={classes.sortIcon} icon={selectedSortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                        }
                                    </CustomTooltip>
                                </div>
                                {
                                    !isMobile &&
                                    <>
                                        <div className={`${classes.cellHead} ${classes.cellWithout} ${classes.pointer}`}
                                            onClick={() => changeSelectedSort('cropFactorS35')}>
                                            <CustomTooltip title={texts.cropFactor}>
                                                {'\u00A0\u00A0\u00A0\u00A0'}
                                                Crop Factor (S35 / FF)
                                                {
                                                    selectedSortColumn === 'cropFactor' &&
                                                    <FontAwesomeIcon className={classes.sortIcon}
                                                                     icon={selectedSortDirection === 'desc' ? faArrowDown : faArrowUp}/>
                                                }
                                            </CustomTooltip>
                                        </div>
                                        <div className={`${classes.cellHead} ${classes.cellWithout} ${classes.pointer}`}
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
                                        </div>
                                    </>
                                }
                                {
                                    filteredSelectedSensors.map((sensor, i) => {
                                        const cClass = `${classes.cellBody} ${classes.pointer} ${hoveredSensor === sensor ? classes.cellHovered : ''}`;
                                        return (
                                        <Fragment key={i}>
                                            <div className={`${classes.cellLogo} ${classes.pointer} ${hoveredSensor === sensor ? classes.cellHovered : ''}`} style={{textAlign: 'right', paddingRight: 10}}>
                                                <div>{sensor.logo}</div>
                                            </div>
                                            {
                                                sensor.model !== 'temp' &&
                                                    <>
                                                        <div {...onMouseEnterLeaveSensorProps(sensor)} className={`${cClass} ${classes.cellCheckbox}`}>
                                                            <input className={`${classes.pointer}`} type="checkbox" checked={selectedSensors.includes(sensor)} onChange={() => {}}/>
                                                        </div>
                                                        <div {...onMouseEnterLeaveSensorProps(sensor)} className={`${cClass} ${classes.cellModel}`}>{sensor.model}</div>
                                                        <div {...onMouseEnterLeaveSensorProps(sensor)} className={`${cClass} ${classes.cellW}`}>{sensor.width.toFixed(2)}</div>
                                                        <div {...onMouseEnterLeaveSensorProps(sensor)} className={`${cClass} ${classes.cellX}`}>x</div>
                                                        <div {...onMouseEnterLeaveSensorProps(sensor)} className={`${cClass} ${classes.cellH}`}>{sensor.height.toFixed(2)}</div>
                                                        <div {...onMouseEnterLeaveSensorProps(sensor)} className={`${cClass} ${classes.cellAspectRatio}`}>{getAspectRatio(sensor.aspectRatio)}</div>
                                                        <div {...onMouseEnterLeaveSensorProps(sensor)} className={`${cClass} ${classes.cell}`}>{getDiagonal(sensor)}</div>
                                                        <div {...onMouseEnterLeaveSensorProps(sensor)} className={`${cClass} ${classes.cell}`}>{getResolution(sensor)}</div>

                                                        {
                                                            !isMobile &&
                                                            <>
                                                                <div {...onMouseEnterLeaveSensorProps(sensor)} className={`${cClass} ${classes.cellWithout}`}>{sensor.cropFactorS35} / {sensor.cropFactorFF}</div>
                                                                <div {...onMouseEnterLeaveSensorProps(sensor)} className={`${cClass} ${classes.cellWithout}`}>{getDensity(sensor)}</div>
                                                            </>
                                                        }
                                                    </>
                                            }
                                            {
                                                sensor.model === 'temp' &&
                                                    <>
                                                        <div/>
                                                        <div/>
                                                        <div/>
                                                        <div/>
                                                        <div/>
                                                        <div/>
                                                        <div/>
                                                        <div/>

                                                        {
                                                            !isMobile &&
                                                            <>
                                                                <div/>
                                                                <div/>
                                                            </>
                                                        }
                                                    </>
                                            }
                                        </Fragment>
                                    ); })
                                }
                        </div>
                    </div>

                    <div className={classes.buttonRow}>
                        <button disabled={selectedSensors.length === 0} className={classes.button} onClick={() => setSelectedSensors([])}>Clear selection</button>
                        <button disabled={selectedSensors.length === 0} className={classes.button} onClick={copySelectionToClipboard}>Copy selection to clipboard</button>
                    </div>

                    <h3 className={classes.title}>{'\u00A0'}</h3>
                    <div className={classes.tableAll}>
                        <div className={`${isMobile ? classes.gridMobile : classes.grid} table-no-select table-selected`}>
                                    <div className={`${classes.cellHead} ${classes.cellLogo}`}/>
                                    <div className={`${classes.cellHead} ${classes.cellCheckbox}`}/>
                                    <div className={`${classes.cellHead} ${classes.cellModel}`}>
                                        <div className={classes.searchBox}>
                                            Model
                                            <input type="text" placeholder="Search" className={classes.textSearch} value={searchStr} onChange={onSearchChange} />
                                            {'\u00A0'}{'\u00A0'}
                                            {
                                                searchStr.length > 0 &&
                                                <FontAwesomeIcon className={classes.pointer} icon={faTimes} onClick={() => onSearchClear()} />
                                            }
                                        </div>
                                    </div>
                                    <div className={`${classes.cellHead} ${classes.cellSpan3} ${classes.cell} ${classes.pointer}`} onClick={() => changeSort('width', 'height')}>
                                        <CustomTooltip title={texts.dimensions}>
                                            Dimensions (mm)
                                            {
                                                sortColumn === 'width' &&
                                                <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                            }
                                        </CustomTooltip>
                                    </div>
                                    <div className={`${classes.cellHead} ${classes.cellAspectRatio} ${classes.pointer}`} onClick={() => changeSort('aspectRatio')}>
                                        <CustomTooltip title={texts.aspectRatio}>
                                            Aspect Ratio
                                            {
                                                sortColumn === 'aspectRatio' &&
                                                <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                            }
                                        </CustomTooltip>
                                    </div>
                                    <div className={`${classes.cellHead} ${classes.cell} ${classes.pointer}`} onClick={() => changeSort('diagonal')}>
                                        <CustomTooltip title={texts.diagonal}>
                                            Diagonal (mm)
                                            {
                                                sortColumn === 'diagonal' &&
                                                <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                            }
                                        </CustomTooltip>
                                    </div>
                                    <div className={`${classes.cellHead} ${classes.cell} ${classes.pointer}`} onClick={() => changeSort('resolutionX', 'resolutionY')}>
                                        <CustomTooltip title={texts.resolution}>
                                            Resolution (px)
                                            {
                                                sortColumn === 'resolutionX' &&
                                                <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                            }
                                        </CustomTooltip>
                                    </div>


                                    {
                                        !isMobile &&
                                        <>
                                            <div className={`${classes.cellHead} ${classes.cellWithout} ${classes.pointer}`} onClick={() => changeSort('cropFactorS35')}>
                                                <CustomTooltip title={texts.cropFactor}>
                                                    {'\u00A0\u00A0\u00A0\u00A0'}
                                                    Crop Factor (S35 / FF)
                                                    {
                                                        sortColumn === 'cropFactor' &&
                                                        <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                                    }
                                                </CustomTooltip>
                                            </div>
                                            <div className={`${classes.cellHead} ${classes.cellWithout} ${classes.pointer}`} onClick={() => changeSort('photositeDensity')}>
                                                <CustomTooltip title={texts.density}>
                                                    {'\u00A0\u00A0\u00A0\u00A0'}
                                                    Density (px/mm²)
                                                    {
                                                        sortColumn === 'photositeDensity' &&
                                                        <FontAwesomeIcon className={classes.sortIcon} icon={sortDirection === 'desc' ? faArrowDown : faArrowUp} />
                                                    }
                                                </CustomTooltip>
                                            </div>
                                        </>
                                    }

                                {
                                    filteredSensors.map((sensor, i) => {

                                        const hasPrintedLogo = logoCount[sensor.logo];
                                        if (!hasPrintedLogo) {
                                            logoCount[sensor.logo] = filteredSensors.filter(s => s.logo === sensor.logo).length;
                                        }

                                        const cClass = `${classes.cellBody} ${classes.pointer} ${hoveredSensorAll === sensor ? classes.cellHovered : ''}`;

                                        return (
                                            <Fragment key={sensor.model}>

                                                {
                                                    !hasPrintedLogo && showLogo && i != 0 &&
                                                        <>
                                                            <div className={classes.divider}/>
                                                            <div/>
                                                            <div/>
                                                            <div/>
                                                            <div/>
                                                            <div/>
                                                            <div/>
                                                            <div/>
                                                            <div/>
                                                            {
                                                                !isMobile &&
                                                                <>
                                                                    <div/>
                                                                    <div/>
                                                                </>
                                                            }
                                                        </>
                                                }

                                                    {
                                                        !hasPrintedLogo && showLogo &&
                                                        <div className={`${cClass} ${classes.cellWithLogo}`}
                                                            style={{gridRow: `span ${logoCount[sensor.logo]}`, cursor: 'default', userSelect: 'none', verticalAlign: 'top', paddingTop: sensor.logo === 'CINEMERIDIAN' ? 0 : 6}}
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
                                                        </div>
                                                    }
                                                    {
                                                        !showLogo &&
                                                        <div className={`${cClass} ${classes.cellLogo}`} style={{textAlign: 'right', paddingRight: 10}}>{sensor.logo}</div>
                                                    }

                                                    <div {...onMouseEnterLeaveSensorPropsAll(sensor)} className={`${cClass} ${classes.cellCheckbox}`}>
                                                        <input className={`${classes.pointer}`} type="checkbox" checked={selectedSensors.includes(sensor)} onChange={() => {}}/>
                                                    </div>
                                                    <div {...onMouseEnterLeaveSensorPropsAll(sensor)} className={`${cClass} ${classes.cellModel}`}>{sensor.model}</div>
                                                    <div {...onMouseEnterLeaveSensorPropsAll(sensor)} className={`${cClass} ${classes.cellW}`}>{sensor.width.toFixed(2)}</div>
                                                    <div {...onMouseEnterLeaveSensorPropsAll(sensor)} className={`${cClass} ${classes.cellX}`}>x</div>
                                                    <div {...onMouseEnterLeaveSensorPropsAll(sensor)} className={`${cClass} ${classes.cellH}`}>{sensor.height.toFixed(2)}</div>
                                                    <div {...onMouseEnterLeaveSensorPropsAll(sensor)} className={`${cClass} ${classes.cellAspectRatio}`}>{getAspectRatio(sensor.aspectRatio)}</div>
                                                    <div {...onMouseEnterLeaveSensorPropsAll(sensor)} className={`${cClass} ${classes.cell}`}>{getDiagonal(sensor)}</div>
                                                    <div {...onMouseEnterLeaveSensorPropsAll(sensor)} className={`${cClass} ${classes.cell}`}>{getResolution(sensor)}</div>
                                                    {
                                                        !isMobile &&
                                                        <>
                                                            <div {...onMouseEnterLeaveSensorPropsAll(sensor)} className={`${cClass} ${classes.cellWithout}`}>{sensor.cropFactorS35} / {sensor.cropFactorFF}</div>
                                                            <div {...onMouseEnterLeaveSensorPropsAll(sensor)} className={`${cClass} ${classes.cellWithout}`}>{getDensity(sensor)}</div>
                                                        </>
                                                    }
                                            </Fragment>
                                        );
                                    })
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
