define({
	grid: {
		name: 'grid',
		fit: false, // whether to fit the viewport to the graph
		padding: 30, // padding used on fit
		boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
		avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
		rows: undefined, // force num of rows in the grid
		columns: undefined, // force num of cols in the grid
		position: function( node ){}, // returns { row, col } for element
		animate: true, // whether to transition the node positions
		animationDuration: 300, // duration of animation in ms if enabled
		ready: undefined, // callback on layoutready
		stop: undefined // callback on layoutstop
	},
	circle: {
		name: 'circle',
		fit: false, // whether to fit the viewport to the graph
		padding: 30, // the padding on fit
		boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
		avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
		radius: undefined, // the radius of the circle
		startAngle: 3/2 * Math.PI, // the position of the first node
		counterclockwise: false, // whether the layout should go counterclockwise (true) or clockwise (false)
		animate: true, // whether to transition the node positions
		animationDuration: 300, // duration of animation in ms if enabled
		ready: undefined, // callback on layoutready
		stop: undefined // callback on layoutstop
	},
	breadthfirst: {
		name: 'breadthfirst',
		fit: false, // whether to fit the viewport to the graph
		directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
		padding: 30, // padding on fit
		circle: false, // put depths in concentric circles if true, put depths top down if false
		boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
		avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
		roots: undefined, // the roots of the trees
		maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
		animate: true, // whether to transition the node positions
		animationDuration: 300, // duration of animation in ms if enabled
		ready: undefined, // callback on layoutready
		stop: undefined // callback on layoutstop
	},
	concentric: {
		name: 'concentric',
		fit: false, // whether to fit the viewport to the graph
		padding: 30, // the padding on fit
		startAngle: 3/2 * Math.PI, // the position of the first node
		counterclockwise: false, // whether the layout should go counterclockwise/anticlockwise (true) or clockwise (false)
		minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
		boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
		avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
		height: undefined, // height of layout area (overrides container height)
		width: undefined, // width of layout area (overrides container width)
		concentric: function(){ // returns numeric value for each node, placing higher nodes in levels towards the centre
			return this.degree();
		},
		levelWidth: function(nodes){ // the variation of concentric values in each level
			return nodes.maxDegree() / 4;
		},
		animate: true, // whether to transition the node positions
		animationDuration: 300, // duration of animation in ms if enabled
		ready: undefined, // callback on layoutready
		stop: undefined // callback on layoutstop
	}
});