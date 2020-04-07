import React from 'react'
import PropTypes from 'prop-types'
import { Add, AddCircle, Drafts, PlayArrow, CheckCircle, Room, Lock } from '@material-ui/icons'
import NewTaskStyles from './styles/NewTaskCopyStyles'
import VehicleList from './VehicleSelectList'
import RegionSelection from './RegionSelection'
import Vehicle from './Vehicle'
import NewTarget from './NewTarget'
import RemoveButton from './RemoveButton'
import TaskSummary from './TaskSummary'
import DraftList from './DraftList'
import newTaskReducer, { initialState } from '../hooks/newTaskCopyReducer'
import { StyledButton, StyledFab } from '../material-ui'
import Popup from '../hoc/Popup'
import getTaskDetail from '../api/task'
import truncate from '../api/string'

const NewTask = ({ type, onCreateNewTask }) => {
    const [state, dispatch] = React.useReducer(newTaskReducer, initialState)

    const getSelectedRegions = () => {
        switch (state.activeRegionType) {
            case 'load':
                return state.missions.filter(({ loadRegion }) => loadRegion !== null).map(({ loadRegion }) => loadRegion.id)
            case 'dump':
                return state.missions.filter(({ dumpRegion }) => dumpRegion !== null).map(({ dumpRegion }) => dumpRegion.id)
            default:
                return []
        }
    }

    const getExcavators = () => {
        switch (state.activeTargetType) {
            case 'gem':
                return state.activeIndex === 0 && state.missions[0].excavator ? [state.missions[0].excavator] : []
            case 'stock':
                return [state.stockMission.excavator]
            default:
                break
        }
    }

    const getSelectedExcavators = () => {
        let excavators = []

        if (state.isStockActive) {
            excavators = state.stockMission.excavator ? [state.stockMission.excavator] : []
        } else {
            excavators =
                state.missions[state.activeIndex] && state.missions[state.activeIndex].excavator
                    ? [state.missions[state.activeIndex].excavator]
                    : []
        }

        return excavators
    }

    const handleDraftSelected = async id => {
        const data = await getTaskDetail(id)

        dispatch({ type: 'set_from_draft', payload: { data } })
        dispatch({ type: 'toggle_draft_popup' })
    }

    return (
        <>
            <StyledButton variant="contained" onClick={() => dispatch({ type: 'toggle_draft_popup' })}>
                Taslaktan Getir
            </StyledButton>
            <NewTaskStyles type={type}>
                {state.missions.map(({ excavator, loadRegion, trucks, dumpRegion, target }, index) => (
                    <div key={dumpRegion ? dumpRegion.id : '0'} className="mission" style={{ marginTop: index === 1 ? '10px' : '0' }}>
                        <div className="tile">
                            <StyledButton
                                variant={!excavator ? 'contained' : 'text'}
                                className="tile-btn"
                                disabled={index === 1}
                                onClick={() => dispatch({ type: 'toggle_excavator_list', payload: { index } })}
                            >
                                {!excavator && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                {!excavator && <p>İş makinesi ekle</p>}
                                {excavator && <Vehicle type="excavator" />}
                                {excavator && <p>{`${excavator.manufacturer} ${excavator.kind}`}</p>}
                            </StyledButton>
                            {excavator && index === 0 && (
                                <RemoveButton
                                    offset={10}
                                    clicked={() => dispatch({ type: 'set_mission_excavator', payload: { selected: [null] } })}
                                />
                            )}
                        </div>
                        {type === 'gem' && (
                            <div className="tile">
                                <StyledButton
                                    variant={!loadRegion ? 'contained' : 'text'}
                                    className="tile-btn"
                                    disabled={index === 1}
                                    onClick={() => dispatch({ type: 'toggle_region_list', payload: { type: 'load', index } })}
                                >
                                    {!loadRegion && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                    {loadRegion && <Room color="secondary" classes={{ colorSecondary: 'secondary' }} />}
                                    {!loadRegion ? <p>Yükleme bölgesi ekle</p> : <p>{truncate(loadRegion.name, 20)}</p>}
                                </StyledButton>
                                {loadRegion && index === 0 && (
                                    <RemoveButton
                                        offset={10}
                                        clicked={() => {
                                            dispatch({ type: 'set_active_region_type', payload: { type: 'load' } })
                                            dispatch({ type: 'set_region', payload: { selected: [null] } })
                                        }}
                                    />
                                )}
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
                        <div className="line">
                            {type === 'gem' && (
                                <div className="truck-container">
                                    {trucks.map(({ id }) => (
                                        <div key={id} className="removable-truck">
                                            <Vehicle type="truck" size="medium" />
                                            <RemoveButton
                                                offset={5}
                                                clicked={() => dispatch({ type: 'remove_truck', payload: { id, index } })}
                                            />
                                        </div>
                                    ))}
                                    <StyledFab
                                        variant="extended"
                                        size="small"
                                        aria-label="kamyon ekle"
                                        onClick={() => dispatch({ type: 'toggle_truck_list', payload: { index } })}
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
                                    variant={!dumpRegion ? 'contained' : 'text'}
                                    className="tile-btn"
                                    disabled={index === 1}
                                    onClick={() => dispatch({ type: 'toggle_region_list', payload: { type: 'dump', index } })}
                                >
                                    {!dumpRegion && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                    {dumpRegion && <Room color="secondary" classes={{ colorSecondary: 'secondary' }} />}
                                    {!dumpRegion ? <p>Boşaltma bölgesi ekle</p> : <p>{truncate(dumpRegion.name, 20)}</p>}
                                </StyledButton>
                                {dumpRegion && index === 0 && (
                                    <RemoveButton
                                        offset={10}
                                        clicked={() => {
                                            dispatch({ type: 'set_active_region_type', payload: { type: 'dump' } })
                                            dispatch({ type: 'set_region', payload: { selected: [] } })
                                        }}
                                    />
                                )}
                            </div>
                        )}
                        {type === 'gem' && (
                            <div className="tile">
                                <StyledButton
                                    variant={!target ? 'contained' : 'text'}
                                    disabled={!excavator && !trucks.length}
                                    className="tile-btn"
                                    onClick={() => dispatch({ type: 'toggle_target_popup', payload: { index, type: 'gem' } })}
                                >
                                    {!target && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                    {target && <CheckCircle color="secondary" classes={{ colorSecondary: 'secondary' }} />}
                                    Hedef {!target ? 'ekle' : 'belirlendi'}
                                </StyledButton>
                                {target && (
                                    <RemoveButton
                                        offset={10}
                                        clicked={() => dispatch({ type: 'reset_target', payload: { index, type: 'gem' } })}
                                    />
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
                ))}
                {!state.fromStock && (
                    <StyledButton variant="contained" onClick={() => dispatch({ type: 'toggle_from_stock' })}>
                        Stoktan çalış
                    </StyledButton>
                )}
                {state.fromStock && <hr style={{ border: '1px dashed gray', marginTop: '10px', marginBottom: '20px' }} />}
                {state.fromStock && (
                    <div className="mission">
                        <div className="tile">
                            <StyledButton
                                variant={!state.stockMission.loadRegion ? 'contained' : 'text'}
                                className="tile-btn"
                                onClick={() => dispatch({ type: 'toggle_region_list', payload: { type: 'stock' } })}
                            >
                                {!state.stockMission.loadRegion && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                {state.stockMission.loadRegion && <Room color="secondary" classes={{ colorSecondary: 'secondary' }} />}
                                {!state.stockMission.loadRegion ? <p>Stok alanı seç</p> : <p>{state.stockMission.loadRegion.name}</p>}
                            </StyledButton>
                            {state.stockMission.loadRegion && (
                                <RemoveButton
                                    offset={10}
                                    clicked={() => {
                                        dispatch({ type: 'set_active_region_type', payload: { type: 'stock' } })
                                        dispatch({ type: 'set_stock_active', payload: { active: true } })
                                        dispatch({ type: 'set_region', payload: { selected: [null] } })
                                    }}
                                />
                            )}
                        </div>
                        <div className="tile">
                            <StyledButton
                                variant={!state.stockMission.excavator ? 'contained' : 'text'}
                                className="tile-btn"
                                onClick={() => {
                                    dispatch({ type: 'set_stock_active', payload: { active: true } })
                                    dispatch({ type: 'toggle_stock_exc_list' })
                                }}
                            >
                                {!state.stockMission.excavator && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                {!state.stockMission.excavator && <p>İş makinesi ekle</p>}
                                {state.stockMission.excavator && <Vehicle type="excavator" />}
                                {state.stockMission.excavator && (
                                    <p>{`${state.stockMission.excavator.manufacturer} ${state.stockMission.excavator.kind}`}</p>
                                )}
                            </StyledButton>
                            {state.stockMission.excavator && (
                                <RemoveButton offset={10} clicked={() => dispatch({ type: 'remove_excavator_stock' })} />
                            )}
                        </div>
                        <div className="line" />
                        <div className="tile">
                            <StyledButton variant="contained" disabled className="tile-btn" onClick={() => {}}>
                                <Lock />
                                Tesis
                            </StyledButton>
                        </div>
                        <div className="tile">
                            <StyledButton
                                variant={!state.stockMission.target ? 'contained' : 'text'}
                                disabled={!state.stockMission.excavator}
                                className="tile-btn"
                                onClick={() => dispatch({ type: 'toggle_target_popup', payload: { type: 'stock' } })}
                            >
                                {!state.stockMission.target && <AddCircle color="primary" classes={{ colorPrimary: 'primary-add' }} />}
                                {state.stockMission.target && <CheckCircle color="secondary" classes={{ colorSecondary: 'secondary' }} />}
                                Hedef {!state.stockMission.target ? 'ekle' : 'belirlendi'}
                            </StyledButton>
                            {state.stockMission.target && (
                                <RemoveButton offset={10} clicked={() => dispatch({ type: 'reset_target', payload: { type: 'stock' } })} />
                            )}
                        </div>
                    </div>
                )}
            </NewTaskStyles>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
            <Popup
                show={state.showExcavatorList}
                onClose={() => {
                    dispatch({ type: 'set_stock_active', payload: { active: false } })
                    dispatch({ type: 'toggle_excavator_list' })
                }}
                title="İş Makinesi Seçin"
            >
                <VehicleList
                    type="excavator"
                    selected={getSelectedExcavators()}
                    maxSelection={2}
                    confirmed={selected => dispatch({ type: 'set_mission_excavator', payload: { selected } })}
                />
            </Popup>
            <Popup show={state.showStockExcList} onClose={() => dispatch({ type: 'toggle_stock_exc_list' })} title="İş Makinesi Seçin">
                <VehicleList
                    type="excavator"
                    selected={state.stockMission.excavator ? [state.stockMission.excavator] : []}
                    maxSelection={1}
                    confirmed={selected => dispatch({ type: 'set_stock_excavator', payload: { selected } })}
                />
            </Popup>
            <Popup show={state.showRegionList} onClose={() => dispatch({ type: 'toggle_region_list' })} title="Bölge Seçin">
                <RegionSelection
                    type={[state.activeRegionType]}
                    multiSelect={state.activeRegionType === 'dump'}
                    selected={getSelectedRegions()}
                    confirmed={selected => dispatch({ type: 'set_region', payload: { selected } })}
                />
            </Popup>
            <Popup show={state.showTruckList} onClose={() => dispatch({ type: 'toggle_truck_list' })} title="Kamyon Seçin">
                <VehicleList type="truck" confirmed={selected => dispatch({ type: 'append_truck', payload: { selected } })} />
            </Popup>
            <Popup show={state.showDraftPopup} onClose={() => dispatch({ type: 'toggle_draft_popup' })} title="Taslak Seçin">
                <DraftList onSelect={handleDraftSelected} />
            </Popup>
            <Popup show={state.showTargetPopup} onClose={() => dispatch({ type: 'toggle_target_popup' })} title="Hedef Ekle">
                <NewTarget
                    currentTarget={
                        state.activeTargetType === 'gem'
                            ? state.missions[state.activeIndex] && state.missions[state.activeIndex].target
                            : state.stockMission.target
                    }
                    excavators={getExcavators()}
                    trucks={
                        state.activeTargetType === 'gem'
                            ? state.missions[state.activeIndex] && state.missions[state.activeIndex].trucks
                            : state.stockMission.trucks
                    }
                    confirmed={target => dispatch({ type: 'set_target', payload: { target } })}
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
                    task={{ missions: [...state.missions] }}
                />
            </Popup>
        </>
    )
}

NewTask.propTypes = {
    type: PropTypes.oneOf(['gem', 'drill']).isRequired,
    onCreateNewTask: PropTypes.func.isRequired,
}

export default NewTask
