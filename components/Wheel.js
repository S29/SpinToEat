import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, ART, TouchableWithoutFeedback} from 'react-native';
import * as shape from 'd3-shape'
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';


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

export default class Home extends Component{
	handleViewRef = ref => this.view = ref;

	constructor(props){
		super(props)

		let data = [
			{
				"number": 1, "name": 'one', "color": this.colorGenerator()
			},
			{
				"number": 1, "name": 'two', "color": this.colorGenerator()
			},
			{
				"number": 1, "name": 'three', "color": this.colorGenerator()
			},
		];

		this.state = {
			data: data
		}
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
			"name": "Four",
			"color": this.colorGenerator()
		})
		this.setState({data: data})
	}

	remove() {
		let data = this.state.data;
		data.pop()
		this.setState({data: data})
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
			})
		})
    	return <View style={{flex: 1}}>
    		<TouchableWithoutFeedback
    		onPress={() => alert("Nice")}
    		>
    			<View
    			style={{width: circleSize, height: circleSize, borderRadius: circleSize/2, backgroundColor: '#00BCD4'}}
    			>
		    		<Surface width={circleSize} height={circleSize}>
		    			<Group x={ (circleSize/2 + 20) - 20 } y={ (circleSize/2 + 20) -20 }>
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
	    		</View>
    		</TouchableWithoutFeedback>
    		<Animatable.View ref="view" style={{flex: 1}}>
    			<Text> SWAG </Text>
    		</Animatable.View>
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