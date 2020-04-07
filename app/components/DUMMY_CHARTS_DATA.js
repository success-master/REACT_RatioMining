import React from 'react'

export const vehicleProblemCols = [
    {
        title: 'Kayıt Başlığı',
        dataIndex: 'description',
        cellProps: {
            width: '33%',
        },
    },
    {
        title: 'Arıza Başlangıcı',
        render: row => <span>{new Date(row.createdAt).toLocaleString()}</span>,
        cellProps: {
            width: '33%',
        },
    },
    {
        title: 'Arıza Bitişi',
        render: row => <span>{new Date(row.date).toLocaleString()}</span>,
        cellProps: {
            width: '33%',
        },
    },
]

export const operatorPersonnelCols = [
    {
        title: '',
        dataIndex: 'icon',
        render: row => (row.icon ? <img className="personnel-photo" src={row.icon} alt={`icon-${row.name}`} /> : null),
        cellProps: {
            width: '10%',
        },
    },
    {
        title: 'ID',
        dataIndex: 'id',
        cellProps: {
            width: '20%',
        },
    },
    {
        title: 'Ad-Soyad',
        render: row => <span>{`${row.name} ${row.surname}`}</span>,
        cellProps: {
            width: '40%',
        },
    },
    {
        title: 'Personel Tipi',
        render: row => <span>{row.staff_type.name}</span>,
        cellProps: {
            width: '30%',
        },
    },
]

export const settingsEmailCols = [
    {
        title: 'İsim',
        dataIndex: 'name',
        cellProps: {
            width: '20%',
        },
    },
    {
        title: 'Soyisim',
        dataIndex: 'surname',
        cellProps: {
            width: '20%',
        },
    },
    {
        title: 'Email',
        dataIndex: 'mail',
        cellProps: {
            width: '60%',
        },
    },
]

export const personnelMissonHistoryCol = [
    {
        title: 'Görev Başlığı',
        dataIndex: 'task',
        cellProps: {
            width: '40%',
        },
    },
    {
        title: 'Plaka',
        dataIndex: 'plate',
        cellProps: {
            width: '30%',
        },
    },
    {
        title: 'Görev Başlangıç zamanı',
        dataIndex: 'startdate',
        render: row => <span>{row.startDate ? new Date(row.startdate).toLocaleString() : '-'}</span>,
        cellProps: {
            width: '30%',
        },
    },
]

export const driverHistoryCol = [
    {
        title: 'Adı-Soyadı',
        render: row => <span>{row.staff && `${row.staff.name} ${row.staff.surname}`}</span>,
        cellProps: {
            width: '25%',
        },
    },
    {
        title: 'Kullanım Saatleri',
        dataIndex: 'time',
        cellProps: {
            width: '25%',
        },
    },
    {
        title: '% Efektif Kullanım',
        dataIndex: 'efficiency',
        cellProps: {
            width: '25%',
        },
    },
    {
        title: 'Delinen Delik Sayısı',
        dataIndex: 'trip',
        cellProps: {
            width: '25%',
        },
    },
]

//DUMMIES
export const personnelDataLine = [
    {
        name: 'Pazartesi',
        speed: 0,
    },
    {
        name: 'Salı',
        speed: 210,
    },
    {
        name: 'Çarşamba',
        speed: 60,
    },
    {
        name: 'Perşembe',
        speed: 90,
    },
    {
        name: 'Cuma',
        speed: 55,
    },
]
export const personnelDataPie = [{ name: 'Yemekhane', value: 20 }, { name: 'Saha', value: 70 }, { name: 'Mola', value: 10 }]
export const personnelDataDoughnut = [{ name: 'Başarılı', value: 12 }, { name: 'Başarısız', value: 5 }]
export const stackedBarData = [
    {
        name: '20/01',
        speedBreach: 5,
        areaBreach: 4,
        jobBreach: 1,
        other: 2,
        sum: 12,
    },
    {
        name: '21/01',
        speedBreach: 1,
        areaBreach: 4,
        jobBreach: 3,
        other: 2,
        sum: 10,
    },
    {
        name: '22/01',
        speedBreach: 0,
        areaBreach: 4,
        jobBreach: 8,
        other: 2,
        sum: 14,
    },
    {
        name: '23/01',
        speedBreach: 5,
        areaBreach: 4,
        jobBreach: 8,
        other: 2,
        sum: 19,
    },
    {
        name: '24/01',
        speedBreach: 5,
        areaBreach: 1,
        jobBreach: 1,
        other: 2,
        sum: 9,
    },
    {
        name: '25/01',
        speedBreach: 5,
        areaBreach: 4,
        jobBreach: 1,
        other: 2,
        sum: 12,
    },
    {
        name: '26/01',
        speedBreach: 1,
        areaBreach: 4,
        jobBreach: 3,
        other: 2,
        sum: 10,
    },
    {
        name: '27/01',
        speedBreach: 0,
        areaBreach: 4,
        jobBreach: 8,
        other: 2,
        sum: 14,
    },
    {
        name: '28/01',
        speedBreach: 5,
        areaBreach: 4,
        jobBreach: 8,
        other: 2,
        sum: 19,
    },
    {
        name: '29/01',
        speedBreach: 5,
        areaBreach: 1,
        jobBreach: 1,
        other: 2,
        sum: 9,
    },
]

export const personnelPieColors = ['#EA6C4C', '#59CBEB', '#5F75DD']
export const personnelDoughnutColors = ['#56A55D', '#EC3323']

export const horizontalBarTooltip = ['2 saat 45 dk', '1 saat 15 dk', '30 dk', '1 saat 30 dk']
export const horizontalBarData = [40, 20, 5, 35]
export const horizontalBarColors = ['#6074DD', '#DE2F21', '#59CBEB', '#E44B5D']
export const horizontalBarName = ['Yükleme 1', 'Yükleme 2', 'Saha', 'Yemekhane']

export const doubleLineData = [
    {
        name: 'Pazartesi',
        speed: 40,
        weight: 250,
    },
    {
        name: 'Salı',
        speed: 45,
        weight: 120,
    },
    {
        name: 'Çarşamba',
        speed: 70,
        weight: 100,
    },
    {
        name: 'Perşembe',
        speed: 20,
        weight: 330,
    },
    {
        name: 'Cuma',
        speed: 50,
        weight: 400,
    },
    {
        name: 'Cumartesi',
        speed: 60,
        weight: 500,
    },
    {
        name: 'Pazar',
        speed: 90,
        weight: 270,
    },
]

export const rpmWeightLine = [
    {
        name: 'Pazartesi',
        rpm: 5000,
        weight: 40,
    },
    {
        name: 'Salı',
        rpm: 5500,
        weight: 70,
    },
    {
        name: 'Çarşamba',
        rpm: 6000,
        weight: 80,
    },
    {
        name: 'Perşembe',
        rpm: 2500,
        weight: 15,
    },
    {
        name: 'Cuma',
        rpm: 1000,
        weight: 5,
    },
    {
        name: 'Cumartesi',
        rpm: 5000,
        weight: 20,
    },
    {
        name: 'Pazar',
        rpm: 3500,
        weight: 35,
    },
]
export const vehicleSpeedData = [
    {
        name: 'Pazartesi',
        value: 300,
    },
    {
        name: 'Salı',
        value: 120,
    },
    {
        name: 'Çarşamba',
        value: 20,
    },
    {
        name: 'Perşembe',
        value: 250,
    },
    {
        name: 'Cuma',
        value: 100,
    },
    {
        name: 'Cumartesi',
        value: 350,
    },
    {
        name: 'Pazar',
        value: 5,
    },
]
export const driverHistory = [
    {
        name: 'Mert Taylan',
        surname: 'Durmaz',
        time: '12:00 - 18:00',
        efficiency: '%50',
        trip: 18,
    },
    {
        name: 'Mert Taylan',
        surname: 'Durmaz',
        time: '12:00 - 18:00',
        efficiency: '%50',
        trip: 18,
    },
    {
        name: 'Mert Taylan',
        surname: 'Durmaz',
        time: '12:00 - 18:00',
        efficiency: '%50',
        trip: 18,
    },
    {
        name: 'Mert Taylan',
        surname: 'Durmaz',
        time: '12:00 - 18:00',
        efficiency: '%50',
        trip: 18,
    },
    {
        name: 'Mert Taylan',
        surname: 'Durmaz',
        time: '12:00 - 18:00',
        efficiency: '%50',
        trip: 18,
    },
    {
        name: 'Mert Taylan',
        surname: 'Durmaz',
        time: '12:00 - 18:00',
        efficiency: '%50',
        trip: 18,
    },
]

export const vehicleIssueHistoryData = [
    {
        title: 'Motor Arızası',
        start: '17/07/19',
        end: '25/08/19',
    },
    {
        title: 'Motor Arızası',
        start: '17/07/19',
        end: '25/08/19',
    },
    {
        title: 'Motor Arızası',
        start: '17/07/19',
        end: '25/08/19',
    },
    {
        title: 'Motor Arızası',
        start: '17/07/19',
        end: '25/08/19',
    },
]
export const horizontalBarNameVehicle = ['Yükleme', 'Boşaltma', 'Duraklama/İzinli', 'Duraklama/İzinsiz']

export const personnelMissonHistory = [
    {
        title: 'Transfer',
        plate: '34 AA 0000',
        start: '25/08/19 13:00:00',
    },
    {
        title: 'Transfer',
        plate: '34 AA 0000',
        start: '25/08/19 13:00:00',
    },
    {
        title: 'Transfer',
        plate: '34 AA 0000',
        start: '25/08/19 13:00:00',
    },
    {
        title: 'Transfer',
        plate: '34 AA 0000',
        start: '25/08/19 13:00:00',
    },
    {
        title: 'Transfer',
        plate: '34 AA 0000',
        start: '25/08/19 13:00:00',
    },
]
