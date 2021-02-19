import {GoogleSpreadsheet} from 'google-spreadsheet';

export const getRows = async () => {
    const doc = new GoogleSpreadsheet('1xyqPZE26X79eLvy7M2yxTAfa3xlvgLGsG60voC0eCeI');

    await doc.useApiKey(process.env.GOOGLE_SHEETS_API_KEY);

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    const rows = await sheet.getRows();
    console.log(rows);

    const parseAspectRatio = (aspectRatio: string) => {
        if (!aspectRatio) return;
        const parts = aspectRatio.split(':');
        return `${parseFloat(parts[0]).toFixed(2)}:1`;
    }

    return rows.map(r => {
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
            cropFactor: r['cropFactor (S35)'],
        });
    });
};
