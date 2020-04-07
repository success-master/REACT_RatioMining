import React from 'react'
import { useHistory } from 'react-router-dom'
import { FaCircle } from 'react-icons/fa'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import TooltipMui from '@material-ui/core/Tooltip'
import { Grid } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'
import { StyledButton, StyledCard } from '../material-ui'
import MissionDetailStyles, { TooltipText, BackButton } from './styles/MissionDetailStyles'
import withLayout from '../hoc/withLayout'
import {
    horizontalBarData,
    horizontalBarColors,
    horizontalBarTooltip,
    horizontalBarNameVehicle,
    rpmWeightLine,
    personnelDataLine,
} from './DUMMY_CHARTS_DATA'

const MissionDetail = () => {
    const history = useHistory()

    return (
        <MissionDetailStyles>
            <BackButton onClick={() => history.goBack()}>
                <ArrowBackIos /> Personel Detay Sayfasına Dön
            </BackButton>
            <div className="mission-detail-container">
                <p className="page-title">Görev Raporları</p>
                <p className="title">Görev Metrikleri </p>

                <Grid className="mission-detail-table" container>
                    <Grid className="content-cell" item xs={6}>
                        <span className="content-title">Görev No:</span>
                        <span>123434</span>
                    </Grid>
                    <Grid className="content-cell" item xs={6}>
                        <span className="content-title">Tarih:</span>
                        <span>17/12/2019</span>
                    </Grid>
                    <Grid className="content-cell" item xs={12}>
                        <span className="content-title">Görev Durumu:</span>
                        <span className="success-text">Görev Başarıyla Tamamlandı</span>
                    </Grid>
                    <Grid className="content-cell" item xs={4}>
                        <span className="content-title">Başlama Tarihi:</span>
                        <span>17/12/2019 12:30</span>
                    </Grid>
                    <Grid className="content-cell" item xs={4}>
                        <span className="content-title">Tahmini Tarihi:</span>
                        <span>18/12/2019 16:30</span>
                    </Grid>
                    <Grid className="content-cell" item xs={4}>
                        <span className="content-title">Bitiş Tarihi:</span>
                        <span>19/12/2019 17:55</span>
                    </Grid>
                    <Grid className="content-cell" item xs={6}>
                        <span className="content-title">Ortalama RPM:</span>
                        <span>13</span>
                    </Grid>
                    <Grid className="content-cell" item xs={6}>
                        <span className="content-title">Ortalama Bekeleme Süresi:</span>
                        <span>10:14</span>
                    </Grid>
                    <Grid className="content-cell" item xs={6}>
                        <span className="content-title">Toplanan Yüklenen Yük:</span>
                        <span>12</span>
                    </Grid>
                    <Grid className="content-cell" item xs={6}>
                        <span className="content-title">Toplam Yüklenen Cevher:</span>
                        <span>10 Lt</span>
                    </Grid>
                    <Grid className="content-cell" item xs={6}>
                        <span className="content-title">Yüklenen Kamyon Sayısı </span>
                        <span>12</span>
                    </Grid>
                    <Grid className="content-cell" item xs={6}>
                        <span className="content-title">Toplam Yakıt Tüketimi:</span>
                        <span>130 Lt</span>
                    </Grid>
                </Grid>

                <p className="title">Grafikler</p>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <StyledCard className="chart-card">
                            <p className="chart-title">Yakıt Tüketimi</p>
                            <ResponsiveContainer height={350}>
                                <LineChart data={personnelDataLine}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ stroke: '#666666', strokeWidth: 1 }} />
                                    <YAxis yAxisId="left" unit=" Lt" width={70} />
                                    <Tooltip />
                                    <Line yAxisId="left" type="monotone" dataKey="speed" stroke="#707070" strokeWidth="2" />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="chart-footer-row">
                                <div className="footer-item">
                                    <span className="info-title">Ortalam Tüketilen Yakıt:</span>
                                    <span>40 Lt</span>
                                </div>
                            </div>
                        </StyledCard>
                    </Grid>

                    <Grid item xs={12}>
                        <StyledCard className="chart-card">
                            <p className="chart-title">RPM - Yüklenen Yük</p>
                            <ResponsiveContainer height={350}>
                                <LineChart data={rpmWeightLine}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ stroke: '#666666', strokeWidth: 1 }} />
                                    <YAxis yAxisId="left" unit=" Rpm" width={100} />
                                    <YAxis yAxisId="right" unit=" Ton" orientation="right" width={100} />
                                    <Tooltip />
                                    <Line yAxisId="left" type="monotone" dataKey="rpm" stroke="#707070" strokeWidth="2" />
                                    <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#EC724C" strokeWidth="2" />
                                </LineChart>
                            </ResponsiveContainer>
                        </StyledCard>
                    </Grid>

                    <Grid item xs={12}>
                        <StyledCard className="chart-card">
                            <p className="chart-title">Kayıp Süre Dağılımı</p>
                            <ResponsiveContainer height={350}>
                                <LineChart data={personnelDataLine}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ stroke: '#666666', strokeWidth: 1 }} />
                                    <YAxis yAxisId="left" unit=" saat" width={70} />
                                    <Tooltip />
                                    <Line yAxisId="left" type="monotone" dataKey="speed" stroke="#707070" strokeWidth="2" />
                                </LineChart>
                            </ResponsiveContainer>
                        </StyledCard>
                    </Grid>

                    <Grid item xs={12}>
                        <StyledCard className="chart-card" style={{ height: 200 }}>
                            <p className="chart-title">Görev Zaman Çizelgesi</p>

                            <div style={{ display: 'flex', margin: '20px' }}>
                                {horizontalBarTooltip.map((text, idx) => (
                                    <TooltipMui title={<TooltipText>{text}</TooltipText>} placement="top">
                                        <div
                                            style={{
                                                width: `${horizontalBarData[idx]}%`,
                                                height: '40px',
                                                background: `${horizontalBarColors[idx]}`,
                                            }}
                                        />
                                    </TooltipMui>
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {horizontalBarNameVehicle.map((text, idx) => (
                                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '50px' }}>
                                        <FaCircle color={horizontalBarColors[idx]} style={{ margin: '5px' }} />
                                        <span>{text}</span>
                                    </div>
                                ))}
                            </div>
                        </StyledCard>
                    </Grid>
                </Grid>

                <div className="button-container">
                    <StyledButton variant="contained" color="secondary">
                        Excel Tablosu Oluştur
                    </StyledButton>
                </div>
            </div>
        </MissionDetailStyles>
    )
}

export default withLayout(MissionDetail)
