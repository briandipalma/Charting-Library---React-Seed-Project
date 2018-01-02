//components
import ColorPicker from "./Drawing/ColorPicker"
import FillColor from "./Drawing/FillColor"
import LineColor from "./Drawing/LineColor"
// import Color from "./Drawing/Color"
import LineStyle from "./Drawing/LineStyle"
import FontStyle from "./Text/FontStyle"
import Font from './Text/Font'

//data sources
import { ChartStore, Actions } from '../stores/ChartStores'

class DrawingToolbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showColorPicker: false,
			colorPickerLeft: 0,
			colorPickerContext: ""
		};
	}
	componentDidMount(){
		this.bindCorrectContext();
	}
	bindCorrectContext(){
		this.changeFontStyle = this.changeFontStyle.bind(this)
		this.changeFontFamily = this.changeFontFamily.bind(this)
		this.changeFontSize = this.changeFontSize.bind(this)
		this.changeLineStyle = this.changeLineStyle.bind(this)

		
		this.toggleColorPicker = this.toggleColorPicker.bind(this);
		this.setColor = this.setColor.bind(this);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.showDrawingToolbar && !this.props.showDrawingToolbar) {
			this.props.draw()
		}
	}
	toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	setTool(tool){
		if (this.props.ciq === null) return
		else {
			let toolParams = CIQ.Drawing.getDrawingParameters(this.props.ciq, tool)
			this.props.changeTool(tool, toolParams)
			this.props.changeVectorParams(tool)
		}
	}
	changeFontStyle(type){
		this.props.setFontStyle(type)
		this.props.changeVectorStyle(type, { bold: this.props.fontStyle.bold, italic: this.props.fontStyle.italic })
	}
	changeFontFamily(family){
		this.props.setFontFamily(family)
		this.props.changeVectorStyle('family', { family: family })
	}
	changeFontSize(size){
		this.props.setFontSize(size)
		this.props.changeVectorStyle('size', { size: size })
	}
	changeLineStyle(weight, pattern){
		this.props.setLineParams(weight, pattern)
		this.props.changeVectorLineParams(weight, pattern)
	}
	toggleColorPicker(target){
		let togglePicker = !this.state.showDrawingToolbar,
		targetBounds, left=0, context=''

		if (togglePicker){
			targetBounds = target.getBoundingClientRect().left
			left = targetBounds-120
		}

		if(target.classList.contains('line')){
			context="line";
		}else if(target.classList.contains('fill')){
			context="fill";
		}

		this.setState({
			showColorPicker: togglePicker,
			colorPickerLeft: left,
			colorPickerContext: context
		});
	}
	setColor(colorEl){
		var color=colorEl.title

		if(this.state.colorPickerContext==="line"){
			this.props.setLineColor(color)
		}else if(this.state.colorPickerContext==="fill"){
			this.props.setFillColor(color)
		}

		this.setState({
			showColorPicker: false
		});
	}
	render() {
		let options = this.props.tools.map((tool, i) => {
			return (
				<menu-option key={"tool"+i} className="option" onClick={this.setTool.bind(this, tool)}>{this.toTitleCase(tool)}</menu-option>
			)
		})

		if(this.props.showDrawingToolbar){
			return (
				<div className="toolbar">
					<menu-select id="toolSelect">
						<span className="title">{this.props.selectedTool || "Select Tool"}</span>
						<menu-select-options className="menu-hover">
							{options}
						</menu-select-options>
					</menu-select>
					<span>
						<div className="drawingParameters">
							<ColorPicker open={this.state.showColorPicker} left={this.state.colorPickerLeft} onColorPick={this.setColor} />
							<FillColor color={this.props.fill} openColorPicker={this.toggleColorPicker} />
							<LineColor color={this.props.line} openColorPicker={this.toggleColorPicker} />
							<LineStyle {...this.props} onClick={this.changeLineStyle} />
							<FontStyle {...this.props} onClick={this.changeFontStyle} />
							<Font {...this.props} onFamilyClick={this.changeFontFamily} onSizeClick={this.changeFontSize} />
						</div>
					</span>
				</div>
			)
		}else{
			return (
				<span></span>
			)
		}
	}
}

module.exports = DrawingToolbar;
