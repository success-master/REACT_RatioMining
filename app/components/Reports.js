import React, { useEffect } from 'react'
import { DirectionsCar, Block, InsertChart, Assignment, Autorenew as AutorenewIcon } from '@material-ui/icons'
import { Grid, MenuItem } from '@material-ui/core'
import { toast } from 'react-toastify'
import ReportsSyles from './styles/ReportsStyles'
import { StyledButton, StyledInput } from '../material-ui'

import Table from './Table'
import withLayout from '../hoc/withLayout'
import { apiEndpoint, getAccessToken } from '../utils'
import Popup from '../hoc/Popup'

const Reports = () => {
    const [reportList, setReportList] = React.useState([])
    const [sortOrder, setSortOrder] = React.useState(false)
    const [reportListLoading, setReportListLoading] = React.useState(true)
    const [mailConfig, setMailfConfig] = React.useState({ reportId: null, mail: '', report: null })
    const [mailLoading, setMailLoading] = React.useState(false)

    const fetchReportList = async fSortOrder => {
        setReportListLoading(true)

        const order = fSortOrder ? '' : '-'
        const orderBy = 'createdAt'
        const response = await fetch(`${apiEndpoint}/report?sort=${order}${orderBy}`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        })
        const data = await response.json()
        setReportList(data)

        setReportListLoading(false)
    }

    useEffect(() => {
        fetchReportList(sortOrder)
    }, [])

    const deleteReport = async id => {
        setReportListLoading(true)
        await fetch(`${apiEndpoint}/report/${id}`, {
            method: 'DELETE',
            headers: {
                'ratio-auth': getAccessToken(),
            },
        })
        fetchReportList(sortOrder)
    }

    const onClickSendMail = async report => {
        setMailfConfig(prevState => ({ ...prevState, reportId: report.id, report }))
    }

    const closeModal = () => {
        setMailfConfig(prevState => ({ ...prevState, reportId: null, mail: '' }))
    }

    const updateMail = e => {
        e.persist()
        setMailfConfig(prevState => ({ ...prevState, mail: e.target.value }))
    }

    const sendMail = async () => {
        setMailLoading(true)

        const response = await fetch(`${apiEndpoint}/mail`, {
            method: 'POST',
            body: JSON.stringify({ tomail: mailConfig.mail, subject: `Mail Raporu - ${mailConfig.report.file}`, text: 'Test' }),
            headers: {
                'Content-Type': 'application/json',
                'ratio-auth': getAccessToken(),
            },
        })
        const responseParsed = await response.json()

        if (responseParsed.errors) toast.error('Mail Gönderilemedi!')
        else toast.success('Mail gönderildi')

        setMailLoading(false)
    }

    const handleOrderChange = async val => {
        setSortOrder(val)
        fetchReportList(val)
    }

    const convertToCSV = report => {
        let str = ''

        for (const key in report.content) {
            str += `${key}: ${report.content[key]}\r\n`
        }

        return str
    }

    function exportCSVFile(report) {
        const exportedFilenmae = report.file || 'Report.csv'
        const csv = convertToCSV(report)

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, exportedFilenmae)
        } else {
            const link = document.createElement('a')
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob)
                link.setAttribute('href', url)
                link.setAttribute('download', exportedFilenmae)
                link.style.visibility = 'hidden'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        }
    }

    const tableColumns = [
        {
            title: 'Rapor İsmi',
            dataIndex: 'file',
            cellProps: {
                width: '20%',
            },
        },
        {
            title: 'Rapor Tipi',
            dataIndex: 'filetype',
            cellProps: {
                width: '20%',
            },
        },
        {
            title: 'Oluşturulma Tarihi',
            dataIndex: 'createdAt',
            render: row => <span>{new Date(row.createdAt).toLocaleString()}</span>,
            cellProps: {
                width: '20%',
            },
        },
        {
            title: '',
            render: row => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <StyledButton variant="contained" color="secondary" onClick={() => onClickSendMail(row)}>
                        Mail Gönder
                    </StyledButton>
                    <StyledButton variant="outlined" color="secondary" onClick={() => deleteReport(row.id)}>
                        Sil
                    </StyledButton>
                    <StyledButton variant="contained" color="primary" onClick={() => exportCSVFile(row)}>
                        İndir
                    </StyledButton>
                </div>
            ),
            cellProps: {
                width: '30%',
            },
        },
    ]

    return (
        <ReportsSyles>
            <p className="page-title">Raporlar</p>
            <Grid container spacing={3} className="filter-buttons-container">
                <Grid item xs={6} md={3}>
                    <StyledButton className="filter-button">
                        <div className="filter-button-content">
                            <DirectionsCar className="filter-button-icon" />
                            <p className="filter-button-text">Filo Raporları</p>
                        </div>
                    </StyledButton>
                </Grid>
                <Grid item xs={6} md={3}>
                    <StyledButton className="filter-button">
                        <div className="filter-button-content">
                            <InsertChart className="filter-button-icon" />
                            <p className="filter-button-text">Üretim ve Verimlilik Raporu</p>
                        </div>
                    </StyledButton>
                </Grid>
                <Grid item xs={6} md={3}>
                    <StyledButton className="filter-button">
                        <div className="filter-button-content">
                            <Block className="filter-button-icon" />
                            <p className="filter-button-text">İhlaller Raporları</p>
                        </div>
                    </StyledButton>
                </Grid>
                <Grid item xs={6} md={3}>
                    <StyledButton className="filter-button">
                        <div className="filter-button-content">
                            <Assignment className="filter-button-icon" />
                            <p className="filter-button-text">Görevler Raporları</p>
                        </div>
                    </StyledButton>
                </Grid>
            </Grid>
            <Grid container direction="row-reverse">
                <Grid item xs={6} md={3}>
                    <StyledInput
                        select
                        name="sortOrder"
                        defaultValue={false}
                        onChange={e => handleOrderChange(e.target.value)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    >
                        <MenuItem value={false}>Tarihe Göre Azalan</MenuItem>
                        <MenuItem value>Tarihe Göre Artan</MenuItem>
                    </StyledInput>
                </Grid>
            </Grid>
            <Table data={reportList} columns={tableColumns} loading={reportListLoading} className="report-table" />

            <Popup title="Mail Gönder" show={!!mailConfig.reportId} onClose={closeModal}>
                <div className="input-email">
                    <StyledInput
                        label="E-mail"
                        name="email"
                        onChange={e => updateMail(e)}
                        value={mailConfig.mail}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="modal-button-container">
                    <StyledButton variant="outlined" onClick={closeModal}>
                        İptal
                    </StyledButton>
                    <StyledButton variant="contained" color="secondary" onClick={sendMail} disabled={mailLoading}>
                        {mailLoading && <AutorenewIcon className="spin" />}
                        Gönder
                    </StyledButton>
                </div>
            </Popup>
        </ReportsSyles>
    )
}

export default withLayout(Reports)
