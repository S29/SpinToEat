import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ART, TouchableWithoutFeedback} from 'react-native';
import * as shape from 'd3-shape'
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import PropTypes from 'prop-types';

const window = Dimensions.get('window');
const circleSize = window.width * 0.9;

const d3 = {
	shape,
};

const {
	Surface,
	Group,
	Shape,
} = ART;

export default class Wheel extends Component{
	handleViewRef = ref => this.view = ref;

	constructor(props){
		super(props)
		
		let data = []
		for (i = 0; i < this.props.list.length; i++) {
			item = {
				"number": 1,
				"name": this.props.list[i],
				"color": this.colorGenerator(),
			}
			data.push(item)
		}

		this.state = {
			data: data,
			isSpinning: false,
			startAngle: 0,
		}

		console.log(this.props.list)
	}

	colorGenerator() {
		return 'rgb(' + 
			Math.floor(Math.random()*256 ) + ','
			+ Math.floor(Math.random()*256 ) + ','
			+ Math.floor(Math.random()*256 ) +
			')'
	}

	add() {
		let data = this.state.data;
		data.push( {
			"number": 1,
			"name": data.length + 1,
			"color": this.colorGenerator()
		})
		this.setState({data: data})
	}

	remove() {
		let data = this.state.data;
		data.pop()
		this.setState({data: data})
	}

	handleViewRef = ref => this.view = ref;

	onSpinSwipe(type) {
		if(!this.state.isSpinning){
			let realSpinBegin = 360 * 10
			let endSpinDeg = Math.floor((Math.random() * 360 * 10)) + realSpinBegin

			if (type === 1){	// counter clock wise
				realSpinBegin = -360 * 10
				endSpinDeg = -Math.floor((Math.random() * 360 * 10)) + realSpinBegin
			}
			console.log("End at: ", endSpinDeg % 360)
			this.view.animate({
				0: {
					rotate: `${this.state.startAngle}deg`
				},
				0.2: { 
					rotate: `${realSpinBegin}deg` 
				},
				1: {
					rotate: `${endSpinDeg}deg`
				}
			},
			20000).then( (endState) => {
				this.setState({
					isSpinning: false
				})
			})
			this.setState({
				startAngle: endSpinDeg % 360,
				isSpinning: true
			})
		}
	}

  	render() {
		let pieData = d3.shape.pie().value((item) => item.number)(this.state.data);

		let arcs = []
		this.state.data.map((item, index) => {
			let arcData = pieData[index];
			let arcGenerator = d3.shape.arc()
				.outerRadius(circleSize/2)
				.innerRadius(10)
				.startAngle(arcData.startAngle)
				.endAngle(arcData.endAngle)
			let labelX = arcGenerator.centroid()[0]
			let labelY = arcGenerator.centroid()[1]
			arcs.push({
				id: index,
				label: item.name,
				arcGenerator: arcGenerator,
				labelX: labelX,
				labelY: labelY,
				fill: item.color,
				labelAngle: ((arcData.startAngle + arcData.endAngle) / 2) - 1.5708
			})
		})
		let marginLeft = 20
		let marginTop = 20
    	return <View style={{flex: 1}}>

			<Animatable.View
			ref={this.handleViewRef}
			>

				<Surface width={circleSize} height={circleSize}>
					<Group x={ (circleSize/2 + 20) - marginLeft } y={ (circleSize/2 + 20) - marginTop }>
						{
							arcs.map((arc) => {
								return (
									<Shape
										key={arc.id}
										d={arc.arcGenerator()}
										strokeWidth={0}
										fill={arc.fill}
									/>
								)
							})
						}
					</Group>
				</Surface>
				{
					arcs.map((arc) => {
						return(
							<Text key={'label_' + arc.id}
							style={{
								textAlign: 'center',
								position: 'absolute',
								left: (circleSize/2 + 20 ) + arc.labelX - 20 - marginLeft - arc.label.length*5.5 + this.state.data.length*0.55,
								top: (circleSize/2 + 20 ) + arc.labelY -20 - marginTop - arc.label.length + this.state.data.length*0.55,
								backgroundColor: 'transparent',
								fontSize: 30 - this.state.data.length*0.3,
								color: 'black',
								transform: [{ rotate: `${arc.labelAngle}rad` }]
							}}>
								{ arc.label }
							</Text>
						)
					})
				}
			</Animatable.View>

			{/* Top left */}
			<GestureRecognizer
				onSwipeRight={(state)=>this.onSpinSwipe(0)}
				onSwipeDown={(state)=>this.onSpinSwipe(1)}
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					width: circleSize/2,
					height: circleSize/2,
					backgroundColor: 'transparent'
				}}
			>
			</GestureRecognizer>

			{/* Top right */}
			<GestureRecognizer
				onSwipeDown={(state)=>this.onSpinSwipe(0)}
				onSwipeLeft={(state)=>this.onSpinSwipe(1)}				
				style={{
					position: 'absolute',
					left: circleSize/2,
					top: 0,
					width: circleSize/2,
					height: circleSize/2,
					backgroundColor: 'transparent'
				}}
			>
			</GestureRecognizer>

			{/* Bottom left */}
			<GestureRecognizer
				onSwipeUp={(state)=>this.onSpinSwipe(0)}
				onSwipeRight={(state)=>this.onSpinSwipe(1)}				
				style={{
					position: 'absolute',
					left: 0,
					top: circleSize/2,
					width: circleSize/2,
					height: circleSize/2,
					backgroundColor: 'transparent'
				}}
			>
			</GestureRecognizer>

			{/* Bottom right */}
			<GestureRecognizer
				onSwipeLeft={(state)=>this.onSpinSwipe(0)}
				onSwipeUp={(state)=>this.onSpinSwipe(1)}				
				style={{
					position: 'absolute',
					left: circleSize/2,
					top: circleSize/2,
					width: circleSize/2,
					height: circleSize/2,
					backgroundColor: 'transparent'
				}}
			>
			</GestureRecognizer>

			<View style={{position: 'absolute', right: 50, bottom: 100}}>
				<Button
					title="Add"
					onPress={() => this.add()}
				/>
				<Button
					title="Remove"
					onPress={() => this.remove()}
				/>
			</View>
    	</View>
  	}
}


const styles = StyleSheet.create({
	container: {
    	flex: 1,

  	},
  	circle: {
  		width: circleSize,
  		height: circleSize,
  		borderRadius: circleSize/2,
  		backgroundColor: 'red',
  		borderWidth: 5,
  		alignItems: 'center',
  		justifyContent: 'center',
  	},
  	dot: {
  		width: 10,
  		height: 10,
  		borderRadius: 5/2,
  		backgroundColor: 'black',
  	}
});


Wheel.propTypes = {
    list: PropTypes.array.isRequired
}