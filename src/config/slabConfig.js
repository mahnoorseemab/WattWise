//Source: https://www.iesco.com.pk/tariff-guide
// NEPRA SRO 279(I)/2026 (12 Feb 2026), checked on 4 Oct 2026
// Verified for IESCO only

const slabs = {
    unProtected: [
        { lowerLimit: 1, upperLimit: 100, rate: 22.44 },
        { lowerLimit: 101, upperLimit: 200, rate: 28.91 },
        { lowerLimit: 201, upperLimit: 300, rate: 33.10 },
        { lowerLimit: 301, upperLimit: 400, rate: 36.46 },
        { lowerLimit: 401, upperLimit: 500, rate: 38.95 },
        { lowerLimit: 501, upperLimit: 600, rate: 40.22 },
        { lowerLimit: 601, upperLimit: 700, rate: 41.85 },
        { lowerLimit: 701, upperLimit: Infinity, rate: 47.20 }
    ],
    protected: [
        { lowerLimit: 1, upperLimit: 100, rate: 10.54 },
        { lowerLimit: 101, upperLimit: 200, rate: 13.01}
    ],
    lifeLine: [
        { lowerLimit: 1, upperLimit: 50, rate: 3.95 },
        { lowerLimit: 51, upperLimit: 100, rate: 7.74 }
    ]
}

export default slabs;