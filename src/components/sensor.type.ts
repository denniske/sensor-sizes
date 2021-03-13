
export interface ISensor {
    logo: string;
    model: string;
    aspectRatio: string;
    diagonal: number;
    area: number;
    width: number;
    height: number;
    resolutionX: number;
    resolutionY: number;
    color: string;
    textColor: string;
    anchor: string;
    default: boolean;
    enabled: boolean;
    cropFactor: string;
    photositeDensity: number;
}

export interface ITexts {
    realPhysicalSensorSize: string;
    dimensions: string;
    aspectRatio: string;
    diagonal: string;
    resolution: string;
    cropFactor: string;
    density: string;
}
