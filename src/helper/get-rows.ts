import {GoogleSpreadsheet} from 'google-spreadsheet';
import {merge} from '@hapi/hoek';

export const getSensorsFromSheet = async () => {
    const doc = new GoogleSpreadsheet('1xyqPZE26X79eLvy7M2yxTAfa3xlvgLGsG60voC0eCeI');

    await doc.useApiKey(process.env.GOOGLE_SHEETS_API_KEY);

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsById['0']; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    const rows = await sheet.getRows();
    // console.log(rows);

    const parseAspectRatio = (aspectRatio: string) => {
        if (!aspectRatio) return;
        const parts = aspectRatio.split(':');
        return `${parseFloat(parts[0]).toFixed(2)}:1`;
    }

    const allRows = rows.map(r => {
        return ({
            model: r.model,
            logo: r.logo,
            aspectRatio: parseAspectRatio(r.aspectRatio),
            diagonal: parseFloat(r.diagonal),
            area: parseFloat(r.area.replace(',', '')),
            width: parseFloat(r.width),
            height: parseFloat(r.height),
            resolutionX: parseInt(r.resolutionX),
            resolutionY: parseInt(r.resolutionY),
            color: r.color,
            textColor: r.textColor,
            anchor: r.anchor,
            photositeDensity: parseInt(r.photositeDensity.replace(',', '')),
            default: r.default === 'TRUE',
            enabled: r.enabled === 'TRUE',
            cropFactor: r['cropFactor (S35)'],
        });
    });

    return allRows.filter(r => r.enabled);
};

export const getTextsFromSheet = async () => {
    const doc = new GoogleSpreadsheet('1xyqPZE26X79eLvy7M2yxTAfa3xlvgLGsG60voC0eCeI');

    await doc.useApiKey(process.env.GOOGLE_SHEETS_API_KEY);

    await doc.loadInfo();
    console.log(doc.title);

    const sheet = doc.sheetsById['1209564769'];
    console.log(sheet.title);
    console.log(sheet.rowCount);

    const rows = await sheet.getRows();
    // console.log(rows);

    const titleRow = rows[0];
    const textRow = rows[1];

    return {
        realPhysicalSensorSize: textRow.realPhysicalSensorSize,
        dimensions: textRow.dimensions,
        aspectRatio: textRow.aspectRatio,
        diagonal: textRow.diagonal,
        resolution: textRow.resolution,
        cropFactor: textRow.cropFactor,
        density: textRow.density,
    };
};


export const getLensesFromSheet = async () => {
    const doc = new GoogleSpreadsheet('1xyqPZE26X79eLvy7M2yxTAfa3xlvgLGsG60voC0eCeI');

    await doc.useApiKey(process.env.GOOGLE_SHEETS_API_KEY);

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsById['2136751308']; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    const rows = await sheet.getRows();
    // console.log(rows);

    const allRows = rows.map(r => {
        return ({
            model: r.model,
            logo: r.logo,
            imageCircle: parseFloat(r.imageCircle),
            color: r.color,
            textColor: r.textColor,
        });
    });

    return allRows;//.filter(r => r.enabled);
};
