import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, LinearProgress } from '@material-ui/core'
import { format } from 'date-fns'
import QuickViewCardStyles from './styles/QuickViewCardStyles'
import { StyledButton, TableRowPlaceholder } from '../material-ui'
import { getPersonnelTypePath, getVehicleTypePath } from '../utils'
import { getPersonnelQuickInfo, getVehicleQuickInfo } from '../api/home'
import personPlaceholder from '../../static/personPlaceholder.png'

const QuickViewCard = ({ type, id }) => {
    const [detail, setDetail] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const history = useHistory()
    React.useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const data = type === 'personnel' ? await getPersonnelQuickInfo(id) : await getVehicleQuickInfo(id)
            setDetail(data)
            setLoading(false)
        }
        fetchData()
    }, [])

    const navToDetail = () => {
        switch (type) {
            case 'personnel':
                history.push({
                    pathname: getPersonnelTypePath(detail.stafftype),
                    state: { personnelId: detail.id },
                })
                break
            case 'vehicle':
                history.push({
                    pathname: getVehicleTypePath(detail.vehicletype),
                    state: { vehicle: detail },
                })
                break
            default:
                break
        }
    }

    return (
        <QuickViewCardStyles>
            <Typography variant="h6">Genel Bilgiler</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {type === 'personnel' && <TableCell />}
                        {type === 'personnel' && <TableCell>Ad / Soyad</TableCell>}
                        {type === 'personnel' && <TableCell>ID</TableCell>}
                        {type === 'vehicle' && <TableCell>Araç Tipi</TableCell>}
                        {type === 'vehicle' && <TableCell>Marka / Yıl</TableCell>}
                        {type === 'vehicle' && <TableCell>Plaka</TableCell>}
                        <TableCell>Son Güncelleme</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRowPlaceholder>
                            <TableCell>{type === 'personnel' ? <img src={personPlaceholder} alt="👤" /> : '-'}</TableCell>
                            <TableCell>
                                <LinearProgress />
                            </TableCell>
                            <TableCell>
                                <LinearProgress />
                            </TableCell>
                            <TableCell>
                                <LinearProgress />
                            </TableCell>
                        </TableRowPlaceholder>
                    ) : (
                        <TableRow key={detail.id}>
                            {type === 'personnel' && (
                                <TableCell>
                                    <img src={detail.icon} alt="👤" />
                                </TableCell>
                            )}
                            {type === 'personnel' && <TableCell>{`${detail.name} ${detail.surname}`}</TableCell>}
                            {type === 'personnel' && <TableCell>{detail.rfidtag}</TableCell>}
                            {type === 'vehicle' && <TableCell>{detail.vehicleType}</TableCell>}
                            {type === 'vehicle' && <TableCell>{`${detail.manufacturer} ${detail.kind}`}</TableCell>}
                            {type === 'vehicle' && <TableCell>{detail.plate}</TableCell>}
                            <TableCell>{detail.updatedAt ? format(new Date(detail.updatedAt), 'MMM d, yyyy hh:mm') : ''}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Typography variant="h6">{type === 'personnel' ? 'Çalışma Bilgisi' : 'Anlık Veriler'}</Typography>
            <Table size="small">
                <TableBody>
                    {loading && (
                        <>
                            {[0, 1, 2, 3, 4].map(index => (
                                <TableRowPlaceholder key={`${index}ph`} role="checkbox">
                                    <TableCell padding="checkbox">-</TableCell>
                                    <TableCell>
                                        <LinearProgress />
                                    </TableCell>
                                </TableRowPlaceholder>
                            ))}
                        </>
                    )}
                    {!loading && type === 'personnel' && (
                        <TableRow key="row1">
                            <TableCell>Görevi</TableCell>
                            <TableCell>{detail.task}</TableCell>
                        </TableRow>
                    )}
                    {!loading && type === 'personnel' && (
                        <TableRow key="row2">
                            <TableCell>Günlük toplam çalışma saati</TableCell>
                            <TableCell />
                        </TableRow>
                    )}
                    {!loading && type === 'personnel' && (
                        <TableRow key="row3">
                            <TableCell>Toplam katedilen yol</TableCell>
                            <TableCell />
                        </TableRow>
                    )}
                    {!loading && type === 'personnel' && (
                        <TableRow key="row4">
                            <TableCell>Kullandığı aracın plakası</TableCell>
                            <TableCell>{detail.plate}</TableCell>
                        </TableRow>
                    )}
                    {!loading && type === 'vehicle' && (
                        <TableRow key="row1">
                            <TableCell>Sürücü</TableCell>
                            <TableCell>{detail.driverName}</TableCell>
                        </TableRow>
                    )}
                    {!loading && type === 'vehicle' && (
                        <TableRow key="row2">
                            <TableCell>Hız</TableCell>
                            <TableCell>{detail.speed}</TableCell>
                        </TableRow>
                    )}
                    {!loading && type === 'vehicle' && (
                        <TableRow key="row3">
                            <TableCell>Taşınan yük</TableCell>
                            <TableCell>{detail.loadamount}</TableCell>
                        </TableRow>
                    )}
                    {!loading && type === 'vehicle' && (
                        <TableRow key="row4">
                            <TableCell>Operasyon</TableCell>
                            <TableCell>{detail.operation}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {type === 'vehicle' && (
                <>
                    <Typography variant="h6">Görev Bilgisi</Typography>
                    <Table size="small">
                        <TableBody>
                            {loading ? (
                                <TableRowPlaceholder role="checkbox">
                                    <TableCell padding="checkbox">-</TableCell>
                                    <TableCell>
                                        <LinearProgress />
                                    </TableCell>
                                </TableRowPlaceholder>
                            ) : (<>
                                <TableRow key={detail.id}>
                                    <TableCell>Görevi</TableCell>
                                    <TableCell>{detail.task}</TableCell>
                                </TableRow>
                                 <TableRow key={detail.id}>
                                 <TableCell>Görev Durumu</TableCell>
                                 <TableCell>{detail.missionStatus}</TableCell>

                             </TableRow>
                             </>
                            )}
                        </TableBody>
                    </Table>
                </>
            )}
            <StyledButton variant="contained" onClick={navToDetail} disabled={loading}>
                Detaylı İncele
            </StyledButton>
        </QuickViewCardStyles>
    )
}

QuickViewCard.propTypes = {
    type: PropTypes.oneOf(['personnel', 'vehicle']).isRequired,
    id: PropTypes.number.isRequired,
}

export default QuickViewCard
