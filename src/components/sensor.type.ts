
export interface ISensor {
    id: string;
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
    cropFactorS35: string;
    cropFactorFF: string;
    photositeDensity: number;
}

export interface ILense {
    id: string;
    model: string;
    logo: string;
    imageCircle: number;
    color: string;
    textColor: string;
    index?: number;
    expansion?: number;
}

export interface ITexts {
    individualImageCircle: string;
    realPhysicalSensorSize: string;
    dimensions: string;
    aspectRatio: string;
    diagonal: string;
    resolution: string;
    cropFactor: string;
    density: string;
}
