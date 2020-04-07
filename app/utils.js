export const apiEndpoint = 'https://ratioback.tk'
export const loginEndpoint = 'https://ratioback.tk/login'
export const defaultCenter = { lat: 39.899, lng: 32.774 }
export const defaultZoom = 15
export const regionTypes = [
    { key: 1, value: 'Cevher yükleme bölgesi' },
    { key: 2, value: 'Cevher stok alanı' },
    { key: 3, value: 'Dekapaj yükleme bölgesi' },
    { key: 4, value: 'Dekapaj dökme bölgesi' },
    { key: 5, value: 'Bunker' },
    { key: 6, value: 'Geofence' },
    { key: 7, value: 'Delgi bölgesi' },
]
export const getPersonnelTypePath = type => {
    switch (type) {
        case 1: // truck driver
        case 5: // driver
            return '/personnels/detail/driver'
        case 4: // greyder operator
        case 2: // excavator operator
            return '/personnels/detail/operator'
        case 3: // drill operator
            return '/personnels/detail/operatordrill'
        default:
            return '/personnels/detail/driver'
    }
}
export const getVehicleTypePath = type => {
    switch (type) {
        case 1:
            return '/vehicles/detail/truck'
        case 2:
            return '/vehicles/detail/excavator'
        case 3:
            return '/vehicles/detail/drill'
        default:
            return '/vehicles/detail/other'
    }
}

export const getAccessToken = () => (localStorage.getItem('token-ratio') ? localStorage.getItem('token-ratio').toString() : '')

export const fetchData = async url => {
    const response = await fetch(`${apiEndpoint}${url}`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    return await response.json()
}
