import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BlockStyles from './styles/GemChartBlockStyles'
import excavator from '../../static/excavator.png'
import truck from '../../static/dump-truck.png'
import withLayout from '../hoc/withLayout'


const Excavator = (props) => {
    return (
        <>
            <div className="full-height">
                <div className="title">Yükleme Bölgesi</div>
                <div className="cell cell--horizontal">
                    <p>B228</p>
                </div>

            </div>
            <div className="full-height">
                <div className="title">Dökme Bölgesi</div>

                <div className="cell cell--horizontal 1_2">
                    <p>Stok 1</p>
                </div>
                <div className="cell cell--horizontal">
                    <p>Bunker</p>
                </div>
                <div className="cell cell--horizontal">
                    <p>Stok 2</p>
                </div>

            </div>
            <div className="full-height">
                <div className="title">Kamyon Tipi</div>

                <div className="cell cell--horizontal">
                    <img src={excavator} alt="excavator"/>
                    <p>40T Dumper</p>
                </div>
                <div className="cell cell--horizontal">
                    <img src={excavator} alt="excavator"/>
                    <p>60T Dumper</p>
                </div>
                <div className="cell cell--horizontal">
                    <img src={excavator} alt="excavator"/>
                    <p>40T Dumper</p>
                </div>
                <div className="cell cell--horizontal">
                    <img src={excavator} alt="excavator"/>
                    <p>40T Dumper</p>
                </div>
                <div className="cell cell--horizontal">
                    <img src={excavator} alt="excavator"/>
                    <p>60T Dumper</p>
                </div>

            </div>

            <div className="full-height">
                <div className="title">Kamyon Adedi</div>

                <div className="cell cell--vertical">
                    <p>
                        <strong>7</strong>
                    </p>
                </div>
                <div className="cell cell--vertical">
                    <p>
                        <strong>3</strong>
                    </p>
                </div>
                <div className="cell cell--vertical">
                    <p>
                        <strong>2</strong>
                    </p>
                </div>
                <div className="cell cell--vertical">
                    <p>
                        <strong>5</strong>
                    </p>
                </div>
                <div className="cell cell--vertical">
                    <p>
                        <strong>6</strong>
                    </p>
                </div>
            </div>

            <div className="full-height">
                <div className="title">Tahmini Sefer</div>

                <div className="cell cell--vertical">
                    <p>
                        <strong>6</strong>
                    </p>
                </div>
                <div className="cell cell--vertical">
                    <p>
                        <strong>1</strong>
                    </p>
                </div>
                <div className="cell cell--vertical">
                    <p>
                        <strong>5</strong>
                    </p>
                </div>
                <div className="cell cell--vertical">
                    <p>
                        <strong>7</strong>
                    </p>
                </div>
                <div className="cell cell--vertical">
                    <p>
                        <strong>2</strong>
                    </p>
                </div>
            </div>
            <div className="full-height">
                <div className="title">Araç Başı Yük</div>

                <div className="cell cell--horizontal">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        320 Ton
                    </div>
                </div>
                <div className="cell cell--horizontal">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        310 Ton
                    </div>
                </div>
                <div className="cell cell--horizontal">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        250 Ton
                    </div>
                </div>
                <div className="cell cell--horizontal">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        120 Ton
                    </div>
                </div>
                <div className="cell cell--horizontal">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        100 Ton
                    </div>
                </div>
            </div>
        </>
    )
}
const Loader = (props) => {
    return (
        <>
            <div className="full-height">
                <div className="title">Yükleme Bölgesi</div>
                <div className="cell cell--horizontal 1_2">
                    <p>Stok 1</p>
                </div>
                <div className="cell cell--horizontal">
                    <p>Bunker</p>
                </div>
                <div className="cell cell--horizontal">
                    <p>Stok 2</p>
                </div>
            </div>
            <div className="full-height">
                <div className="title">Tahmini Sefer Sayısı</div>

                <div className="cell cell--horizontal 1_2">
                    <p>25</p>
                </div>
                <div className="cell cell--horizontal">
                    <p>18</p>
                </div>
                <div className="cell cell--horizontal">
                    <p>16</p>
                </div>

            </div>
            <div className="full-height">
                <div className="title">Tahmini Taşınan Yük</div>

                <div className="cell cell--horizontal">
                    <p>2500 Ton</p>
                </div>
                <div className="cell cell--horizontal">
                    <p>100 Ton</p>
                </div>
                <div className="cell cell--horizontal">
                    <p>16 Ton</p>
                </div>

            </div>

            <div className="full-height">
                <div className="title">Dökme Bölgesi</div>

                <div className="cell cell--vertical">
                    <p>
                        <strong>Tesis</strong>
                    </p>
                </div>

            </div>
        </>
    )
}

const Block = ({ data, type }) => {


    const [children, setChildren] = useState(<></>)


    useEffect(() => {
        switch (type) {
            case 'excavator':
                setChildren(<Excavator/>)
                break
            case 'loader':
                setChildren(<Loader/>)
                break
            default:
                break
        }
    }, [])


    return <BlockStyles>
        {children}

    </BlockStyles>

}

const GemChartStyles = styled.div`
    > div.chart-container {
        background-color: #fff;
        padding: 10px;
        h2 {
            margin-bottom: 20px;
        }
        h4 {
            margin-bottom: 10px;
        }
    }
`

const GemChart = ({ id }) => {
    return (
        <GemChartStyles>
            <div className="chart-container">
                <h2>Çizelge 1 - Cevher</h2>
                <h4>Excavator: 336D</h4>
                <Block data={null} type={'excavator'}/>
                <h4>Loader: 336D</h4>
                <Block data={null} type={'loader'}/>

            </div>
        </GemChartStyles>
    )
}

GemChart.propTypes = {
    id: PropTypes.number.isRequired,
}

export default withLayout(GemChart)
