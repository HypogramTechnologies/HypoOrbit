import { IStacSearchClientParams, StacSearchParams } from "../types/IStacSearchParams"

export function kmToLatitudeLongitude(km: number = 1, latitude: number = 0) {
    const deltaLatitude = km / 111;
    const deltaLongitude = km / (111 * Math.cos(latitude * (Math.PI / 180)));

    return { latitude: deltaLatitude, longitude: deltaLongitude };
}

export function stacQuery(params: IStacSearchClientParams): StacSearchParams {
    
    const latitude = params.latitude ?? undefined;
    const longitude = params.longitude ?? undefined;
    const km = params.km ?? 1;

    let bbox: [number, number, number, number] | undefined = undefined;
    if (latitude !== undefined && longitude !== undefined) {
        const delta = kmToLatitudeLongitude(km, latitude);
        const minLat = latitude - delta.latitude;
        const maxLat = latitude + delta.latitude;
        const minLong = longitude - delta.longitude;
        const maxLong = longitude + delta.longitude;
        bbox = [minLong, minLat, maxLong, maxLat];
    }

    const query: StacSearchParams = {
        ...(bbox && { bbox }),
        ...(params.datetime && { datetime: params.datetime }),
        ...(params.intersects && { intersects: params.intersects }),
        ...(params.collections && { collections: params.collections }),
        ...(params.ids && { ids: params.ids }),
        ...(params.limit !== undefined && { limit: params.limit }),
        ...(params.query && { query: params.query })
    };

    return query;
}
