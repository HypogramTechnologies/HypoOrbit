/* {
    "statistics": {
        "EVI": {
            "avg": 5221.81,
            "max": 14470,
            "min": 931,
            "count": 16
        },
        "NBR": {
            "avg": 3278.33,
            "max": 6847,
            "min": -1181,
            "count": 12
        },
        "NDVI": {
            "avg": 3143.19,
            "max": 9317,
            "min": -345,
            "count": 16
        }
    }
} */

export interface IStatisticsWTSS {
  statistics: {
    [key: string]: {
      avg: number;
      max: number;
      min: number;
      count: number;
    };
  };
}