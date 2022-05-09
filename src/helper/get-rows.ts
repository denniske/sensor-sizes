import {GoogleSpreadsheet} from 'google-spreadsheet';

export const getSheet = async () => {
    const doc = new GoogleSpreadsheet('1xyqPZE26X79eLvy7M2yxTAfa3xlvgLGsG60voC0eCeI');
    await doc.useApiKey(process.env.GOOGLE_SHEETS_API_KEY);
    await doc.loadInfo();
    return doc;
}

export const getSensorsFromSheet = async (doc: GoogleSpreadsheet) => {
    const sheet = doc.sheetsById['0'];
    console.log(sheet.title);

    const rows = await sheet.getRows();

    const parseAspectRatio = (aspectRatio: string) => {
        if (!aspectRatio) return;
        const parts = aspectRatio.split(':');
        return `${parseFloat(parts[0]).toFixed(2)}:1`;
    }

    const allRows = rows.map(r => {
        return ({
            id: r.id,
            model: r.model,
            logo: r.logo,
            aspectRatio: parseAspectRatio(r.aspectRatio),
            diagonal: parseFloat(r.diagonal),
            area: parseFloat(r.area?.replace(',', '')),
            width: parseFloat(r.width),
            height: parseFloat(r.height),
            resolutionX: parseInt(r.resolutionX),
            resolutionY: parseInt(r.resolutionY),
            color: r.color,
            textColor: r.textColor,
            anchor: r.anchor,
            photositeDensity: parseInt(r.photositeDensity?.replace(',', '')),
            default: r.default === 'TRUE',
            enabled: r.enabled === 'TRUE',
            cropFactor: r['cropFactor (S35)'],
        });
    });

    return allRows.filter(r => r.enabled);
};

export const getTextsFromSheet = async (doc: GoogleSpreadsheet) => {
    const sheet = doc.sheetsById['1209564769'];
    console.log(sheet.title);

    const rows = await sheet.getRows();

    const titleRow = rows[0];
    const textRow = rows[1];

    return [{
        individualImageCircle: titleRow.individualImageCircle || '',
        realPhysicalSensorSize: titleRow.realPhysicalSensorSize || '',
        dimensions: titleRow.dimensions || '',
        aspectRatio: titleRow.aspectRatio || '',
        diagonal: titleRow.diagonal || '',
        resolution: titleRow.resolution || '',
        cropFactor: titleRow.cropFactor || '',
        density: titleRow.density || '',
        contact: titleRow.contact || '',
        metaTitle: titleRow.metaTitle || '',
        metaDescription: titleRow.metaDescription || '',
        metaTags: titleRow.metaTags || '',
        descriptionText: titleRow.descriptionText || '',
    }, {
        individualImageCircle: textRow.individualImageCircle,
        realPhysicalSensorSize: textRow.realPhysicalSensorSize,
        dimensions: textRow.dimensions,
        aspectRatio: textRow.aspectRatio,
        diagonal: textRow.diagonal,
        resolution: textRow.resolution,
        cropFactor: textRow.cropFactor,
        density: textRow.density,
        contact: textRow.contact,
        metaTitle: textRow.metaTitle,
        metaDescription: textRow.metaDescription,
        metaTags: textRow.metaTags,
        descriptionText: textRow.descriptionText,
    }];
};


export const getLensesFromSheet = async (doc: GoogleSpreadsheet) => {
    const sheet = doc.sheetsById['2136751308'];
    console.log(sheet.title);

    const rows = await sheet.getRows();

    const allRows = rows.map(r => {
        return ({
            id: r.id,
            model: r.model,
            logo: r.logo,
            imageCircle: parseFloat(r.imageCircle),
            color: r.color,
            textColor: r.textColor,
        });
    });

    return allRows;//.filter(r => r.enabled);
};
