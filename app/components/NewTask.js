import React from 'react'
import PropTypes from 'prop-types'
import { Add, AddCircle, Drafts, PlayArrow, CheckCircle, Room, Lock } from '@material-ui/icons'
import newTaskReducer, { initialState } from '../hooks/newTaskReducer'
import NewTaskStyles from './styles/NewTaskStyles'
import { StyledButton, StyledFab } from '../material-ui'
import Popup from '../hoc/Popup'
import VehicleList from './VehicleSelectList'
import Vehicle from './Vehicle'
import NewTarget from './NewTarget'
import RegionSelection from './RegionSelection'
import TaskSummary from './TaskSummary'
import RemoveButton from './RemoveButton'
import truncate from '../api/string'

const NewTask = ({ type, onCreateNewTask }) => {
    const [state, dispatch] = React.useReducer(newTaskReducer, initialState)

    const onExcavatorSelectionConfirmed = selected => dispatch({ type: 'append_excavator', payload: { selected } })
    const onTruckSelectionConfirmed = selected => dispatch({ type: 'append_truck', payload: { selected } })
    const onStockExcSelectionConfirmed = selected => dispatch({ type: 'append_stock_exc', payload: { selected } })
    const onTargetConfirmed = target => dispatch({ type: 'set_target', payload: { target } })
    const onRegionConfirmed = regions => dispatch({ type: 'add_region', payload: { regions, type: state.regionType } })
    const onRemoveLoadRegion = () => dispatch({ type: 'remove_load_region' })
    const onRemoveDumpRegion = () => dispatch({ type: 'remove_dump_region' })
    const onRemoveStockRegion = () => dispatch({ type: 'remove_stock_region' })
    const handleRemoveExcavatorStock = () => dispatch({ type: 'remove_excavator_stock' })

    const handleRemoveExcavator = () => {
        dispatch({ type: 'remove_target_entries', payload: { ids: state.excavators.map(vehicle => vehicle.id) } })
        dispatch({ type: 'remove_excavator' })
    }

    const handleRemoveTruck = id => {
        dispatch({ type: 'remove_target_entries', payload: { ids: [id] } })
        dispatch({ type: 'remove_truck', payload: { id } })
    }

    const getSelectedRegions = () => {
        switch (state.regionType) {
            case 'load':
                return state.loadRegions.map(({ id }) => id)
            case 'dump':
                return state.dumpRegions.map(({ id }) => id)
            case 'stock':
                return state.stockRegions.map(({ id }) => id)
            default:
                return []
        }
    }

    return (
        <NewTaskStyles type={type}>
            <div className="constructor-container">
                <div className="action-container">
                    <div className="tile">
                        <StyledButton
                            variant={!state.excavators.length ? 'contained' : 'text'}
                            className="tile-btn"
                            onClick={() => dispatch({ type: 'toggle_excavator_list' })}
                        >
                            {!state.excavators.length && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                            {!state.excavators.length && <p>İş makinesi ekle</p>}
                            {state.excavators.length > 0 && <Vehicle type="excavator" />}
                            <ul style={{ listStyleType: 'none', marginTop: '10px' }}>
                                {state.excavators.map(vehicle => (
                                    <li key={vehicle.id}>
                                        <p>{truncate(`${vehicle.manufacturer} ${vehicle.model}`, 6)}</p>
                                    </li>
                                ))}
                            </ul>
                        </StyledButton>
                        {state.excavators.length > 0 && <RemoveButton offset={10} clicked={handleRemoveExcavator} />}
                    </div>
                    {type === 'gem' && (
                        <div className="tile">
                            <StyledButton
                                variant={!state.loadRegions.length ? 'contained' : 'text'}
                                className="tile-btn"
                                onClick={() => dispatch({ type: 'toggle_region_popup', payload: { type: 'load' } })}
                            >
                                {!state.loadRegions.length && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                {state.loadRegions.length > 0 && <Room color="secondary" classes={{ colorSecondary: 'secondary' }} />}
                                {!state.loadRegions.length ? <p>Yükleme bölgesi ekle</p> : <p>{truncate(state.loadRegions[0].name, 15)}</p>}
                            </StyledButton>
                            {state.loadRegions.length > 0 && <RemoveButton offset={10} clicked={onRemoveLoadRegion} />}
                        </div>
                    )}
                    {type === 'drill' && (
                        <div className="tile">
                            <StyledButton variant="contained" className="tile-btn" onClick={() => {}}>
                                <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />
                                Bölge ekle
                            </StyledButton>
                        </div>
                    )}
                    <div className="horizontal-line">
                        {type === 'gem' && (
                            <div className="truck-container">
                                {state.trucks.map(vehicle => (
                                    <div key={vehicle.id} className="removable-truck">
                                        <Vehicle type="truck" size="medium" />
                                        <RemoveButton offset={5} clicked={() => handleRemoveTruck(vehicle.id)} />
                                    </div>
                                ))}
                                <StyledFab
                                    variant="extended"
                                    size="small"
                                    aria-label="kamyon ekle"
                                    onClick={() => dispatch({ type: 'toggle_truck_list' })}
                                >
                                    Kamyon ekle
                                    <Add style={{ marginLeft: '5px' }} />
                                </StyledFab>
                            </div>
                        )}
                    </div>
                    {type === 'gem' && (
                        <div className="tile">
                            <StyledButton
                                variant={!state.dumpRegions.length ? 'contained' : 'text'}
                                className="tile-btn"
                                onClick={() => dispatch({ type: 'toggle_region_popup', payload: { type: 'dump' } })}
                            >
                                {!state.dumpRegions.length && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                {!state.dumpRegions.length && <p>Boşaltma bölgesi ekle</p>}
                                {state.dumpRegions.length > 0 && <p className="region-counter">{state.dumpRegions.length}</p>}
                                {state.dumpRegions.length > 0 && <p>Boşaltma bölgesi belirlendi</p>}
                            </StyledButton>
                            {state.dumpRegions.length > 0 && <RemoveButton offset={10} clicked={onRemoveDumpRegion} />}
                        </div>
                    )}
                    {type === 'gem' && (
                        <div className="tile">
                            <StyledButton
                                variant={!state.target ? 'contained' : 'text'}
                                disabled={!state.excavators.length && !state.trucks.length}
                                className="tile-btn"
                                onClick={() => dispatch({ type: 'toggle_target_popup', payload: { type: 'gem' } })}
                            >
                                {!state.target && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                {state.target && <CheckCircle color="secondary" classes={{ colorSecondary: 'secondary' }} />}
                                Hedef {!state.target ? 'ekle' : 'belirlendi'}
                            </StyledButton>
                            {state.target && (
                                <RemoveButton offset={10} clicked={() => dispatch({ type: 'reset_target', payload: { type: 'gem' } })} />
                            )}
                        </div>
                    )}
                    {type === 'drill' && (
                        <div className="tile">
                            <StyledButton variant="contained" className="tile-btn" onClick={() => {}}>
                                <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />
                                Hedef delik sayısı
                            </StyledButton>
                        </div>
                    )}
                </div>
                {!state.fromStock && (
                    <StyledButton variant="contained" onClick={() => dispatch({ type: 'toggle_from_stock' })}>
                        Stoktan çalış
                    </StyledButton>
                )}
                {state.fromStock && <hr style={{ border: '1px dashed gray', marginTop: '10px', marginBottom: '20px' }} />}
                {state.fromStock && (
                    <div className="action-container">
                        <div className="tile">
                            <StyledButton
                                variant={!state.stockRegions.length ? 'contained' : 'text'}
                                className="tile-btn"
                                onClick={() => dispatch({ type: 'toggle_region_popup', payload: { type: 'stock' } })}
                            >
                                {!state.stockRegions.length && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                {state.stockRegions.length > 0 && <Room color="secondary" classes={{ colorSecondary: 'secondary' }} />}
                                {!state.stockRegions.length ? <p>Stok alanı seç</p> : <p>{truncate(state.stockRegions[0].name, 15)}</p>}
                            </StyledButton>
                            {state.stockRegions.length > 0 && <RemoveButton offset={10} clicked={onRemoveStockRegion} />}
                        </div>
                        <div className="tile">
                            <StyledButton
                                variant={!state.excavatorsStock.length ? 'contained' : 'text'}
                                className="tile-btn"
                                onClick={() => dispatch({ type: 'toggle_stock_exc_list' })}
                            >
                                {!state.excavatorsStock.length && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                {!state.excavatorsStock.length && <p>İş makinesi ekle</p>}
                                {state.excavatorsStock.length > 0 && <Vehicle type="excavator" />}
                                <ul style={{ listStyleType: 'none', marginTop: '10px' }}>
                                    {state.excavatorsStock.map(vehicle => (
                                        <li key={vehicle.id}>
                                            <p>{truncate(`${vehicle.manufacturer} ${vehicle.model}`, 6)}</p>
                                        </li>
                                    ))}
                                </ul>
                            </StyledButton>
                            {state.excavatorsStock.length > 0 && <RemoveButton offset={10} clicked={handleRemoveExcavatorStock} />}
                        </div>
                        <div className="horizontal-line" />
                        <div className="tile">
                            <StyledButton variant="contained" disabled className="tile-btn" onClick={() => {}}>
                                <Lock />
                                Tesis
                            </StyledButton>
                        </div>
                        <div className="tile">
                            <StyledButton
                                variant={!state.targetStock ? 'contained' : 'text'}
                                disabled={!state.excavatorsStock.length}
                                className="tile-btn"
                                onClick={() => dispatch({ type: 'toggle_target_popup', payload: { type: 'stock' } })}
                            >
                                {!state.targetStock && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                {state.targetStock && <CheckCircle color="secondary" classes={{ colorSecondary: 'secondary' }} />}
                                Hedef {!state.targetStock ? 'ekle' : 'belirlendi'}
                            </StyledButton>
                            {state.targetStock && (
                                <RemoveButton offset={10} clicked={() => dispatch({ type: 'reset_target', payload: { type: 'stock' } })} />
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="button-container">
                <StyledButton
                    variant="contained"
                    endIcon={<Drafts />}
                    onClick={() => dispatch({ type: 'toggle_summary_popup', payload: { type: 'draft' } })}
                >
                    Taslağı kaydet
                </StyledButton>
                <StyledButton
                    variant="contained"
                    color="secondary"
                    endIcon={<PlayArrow />}
                    onClick={() => dispatch({ type: 'toggle_summary_popup', payload: { type: 'final' } })}
                >
                    Operasyonu başlat
                </StyledButton>
            </div>
            <Popup show={state.showExcavatorList} onClose={() => dispatch({ type: 'toggle_excavator_list' })} title="İş Makinesi Seçin">
                <VehicleList type="excavator" selected={state.excavators} maxSelection={2} confirmed={onExcavatorSelectionConfirmed} />
            </Popup>
            <Popup show={state.showStockExcList} onClose={() => dispatch({ type: 'toggle_stock_exc_list' })} title="İş Makinesi Seçin">
                <VehicleList type="excavator" selected={state.excavatorsStock} maxSelection={2} confirmed={onStockExcSelectionConfirmed} />
            </Popup>
            <Popup show={state.showTruckList} onClose={() => dispatch({ type: 'toggle_truck_list' })} title="Kamyon Seçin">
                <VehicleList type="truck" confirmed={onTruckSelectionConfirmed} />
            </Popup>
            <Popup show={state.showTargetPopup} onClose={() => dispatch({ type: 'toggle_target_popup' })} title="Hedef Ekle">
                <NewTarget
                    currentTarget={state.target}
                    excavators={state.targetType === 'gem' ? state.excavators : state.excavatorsStock}
                    trucks={state.trucks}
                    confirmed={onTargetConfirmed}
                />
            </Popup>
            <Popup show={state.showRegionPopup} onClose={() => dispatch({ type: 'toggle_region_popup' })} title="Bölge Seçin">
                <RegionSelection
                    type={state.regionType}
                    multiSelect={state.regionType === 'dump'}
                    selected={getSelectedRegions()}
                    confirmed={onRegionConfirmed}
                />
            </Popup>
            <Popup
                show={state.showSummaryPopup}
                onClose={() => dispatch({ type: 'toggle_summary_popup' })}
                title={state.summaryType === 'draft' ? 'Taslağı Kaydet' : 'Görevi Kaydet'}
            >
                <TaskSummary
                    type={state.summaryType}
                    confirmed={name => onCreateNewTask({ ...state, name })}
                    task={{
                        loadRegions: state.loadRegions,
                        dumpRegions: state.dumpRegions,
                        excavators: state.excavators,
                        trucks: state.trucks,
                        target: state.target,
                    }}
                />
            </Popup>
        </NewTaskStyles>
    )
}

NewTask.propTypes = {
    type: PropTypes.oneOf(['gem', 'drill']).isRequired,
    onCreateNewTask: PropTypes.func.isRequired,
}

export default NewTask
