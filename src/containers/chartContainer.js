//modules
import { connect } from 'react-redux'

//actions
import { setChartContainer,
        addComparison,
        removeComparison,
        toggleCrosshairs,
        setSpan,
        changeContainerSize,
        changeVectorParams,
        changeVectorLineParams,
        changeVectorStyle,
        setPeriodicity,
        setChartType,
        toggleLoader,
        setRefreshInterval,
        setSymbol,
        changingChartData,
        setPeriodicityWithLoader,
        toggleTimezoneModal,
        setTimeZone
       } from '../actions/chartActions'

import { toggleDrawing } from '../actions/drawActions'

//components
import Chart from '../components/Chart'

const mapStateToProps = (state, props) => {
    return {
        ciq: state.chart.ciq,
        chartType: state.chart.chartType,
        periodicity: state.chart.periodicity,
        isLoadingPeriodicity: state.chart.isLoadingPeriodicity,
        comparisons: state.chart.comparisons,
        service: state.chart.service,
        symbol: state.chart.symbol,
        refreshInterval: state.chart.refreshInterval,
        showCrosshairs: state.chart.showCrosshairs,
        showTimezoneModal: state.chart.showTimezoneModal,
        setTimeZone: state.chart.setTimeZone,
        chartSeries: state.chart.chartSeries
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setChartContainer: (container) => {
            dispatch(setChartContainer(container))
        },
        changeVectorParams: (tool) => {
            dispatch(changeVectorParams(tool))
        },
        changeVectorLineParams: (weight, pattern) => {
            dispatch(changeVectorLineParams(weight, pattern))
        },
        changeVectorStyle: (styleType, style) => {
            dispatch(changeVectorStyle(styleType, style))
        },
        addComparison: (comparison, color) => {
            dispatch(addComparison(comparison, color))
        },
        removeComparison: (comparison) => {
            dispatch(removeComparison(comparison))
        },
        toggleCrosshairs: () => {
            dispatch(toggleCrosshairs())
        },
        toggleTimezoneModal: () => {
            dispatch(toggleTimezoneModal())
        },
        setTimeZone: (zone) => {
          dispatch(setTimeZone(zone))
        },
        setSymbol: (symbol) => {
            dispatch(setSymbol(symbol))
        },
        toggleDrawingToolbar: () => {
            dispatch(toggleDrawing())
        },
        setPeriodicity: (period, interval) => {
            dispatch(setPeriodicity(period, interval))
        },
        setPeriodicityWithLoader: (periodicity) => {
            dispatch(setPeriodicityWithLoader(periodicity))
        },
        setChartType: (type) => {
            dispatch(setChartType(type))
        },
        setSpan: (span, multiplier) => {
            dispatch(setSpan(span, multiplier))
        }
    }
}

const ChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chart)

export default ChartContainer
