import {GoogleSpreadsheet} from 'google-spreadsheet';

export const getSheet = async () => {
    const doc = new GoogleSpreadsheet(
        '1xyqPZE26X79eLvy7M2yxTAfa3xlvgLGsG60voC0eCeI',
        {
            apiKey: process.env.GOOGLE_SHEETS_API_KEY,
        },
    );
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
            id: r.get('id'),
            model: r.get('model'),
            logo: r.get('logo'),
            aspectRatio: parseAspectRatio(r.get('aspectRatio')),
            diagonal: parseFloat(r.get('diagonal')),
            area: parseFloat(r.get('area')?.replace(',', '')),
            width: parseFloat(r.get('width')),
            height: parseFloat(r.get('height')),
            resolutionX: parseInt(r.get('resolutionX')),
            resolutionY: parseInt(r.get('resolutionY')),
            color: r.get('color'),
            textColor: r.get('textColor'),
            anchor: r.get('anchor'),
            photositeDensity: parseInt(r.get('photositeDensity')?.replace(',', '')),
            default: r.get('default') === 'TRUE',
            enabled: r.get('enabled') === 'TRUE',
            cropFactorS35: r.get('cropFactor (S35)'),
            cropFactorFF: r.get('cropFactor (FF)'),
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
        individualImageCircle: titleRow.get('individualImageCircle') || '',
        realPhysicalSensorSize: titleRow.get('realPhysicalSensorSize') || '',
        dimensions: titleRow.get('dimensions') || '',
        aspectRatio: titleRow.get('aspectRatio') || '',
        diagonal: titleRow.get('diagonal') || '',
        resolution: titleRow.get('resolution') || '',
        cropFactor: titleRow.get('cropFactor') || '',
        density: titleRow.get('density') || '',
        contact: titleRow.get('contact') || '',
        metaTitle: titleRow.get('metaTitle') || '',
        metaDescription: titleRow.get('metaDescription') || '',
        metaTags: titleRow.get('metaTags') || '',
        descriptionText: titleRow.get('descriptionText') || '',
    }, {
        individualImageCircle: textRow.get('individualImageCircle'),
        realPhysicalSensorSize: textRow.get('realPhysicalSensorSize'),
        dimensions: textRow.get('dimensions'),
        aspectRatio: textRow.get('aspectRatio'),
        diagonal: textRow.get('diagonal'),
        resolution: textRow.get('resolution'),
        cropFactor: textRow.get('cropFactor'),
        density: textRow.get('density'),
        contact: textRow.get('contact'),
        metaTitle: textRow.get('metaTitle'),
        metaDescription: textRow.get('metaDescription'),
        metaTags: textRow.get('metaTags'),
        descriptionText: textRow.get('descriptionText'),
    }];
};


export const getLensesFromSheet = async (doc: GoogleSpreadsheet) => {
    const sheet = doc.sheetsById['2136751308'];
    console.log(sheet.title);

    const rows = await sheet.getRows();

    const allRows = rows.map(r => {
        return ({
            id: r.get('id'),
            model: r.get('model'),
            logo: r.get('logo'),
            imageCircle: parseFloat(r.get('imageCircle')),
            color: r.get('color'),
            textColor: r.get('textColor'),
            expansion: 1.0,
        });
    });

    return allRows;//.filter(r => r.enabled);
};
