define([
	/*---------- 实体 ----------*/
	{
		selector: 'core',
		css: {
			'selection-box-color': 'rgba(72, 133, 184, 0.2)'
		}
	},
	{
		selector: 'node',
		css: {
			'width': '63px',
			'height': '63px',
			'shape': 'ellipse',
			'border-width': 1,
			'border-color': '#0d93f0',
			'border-opacity': 0,
			'background-width': '63px',
			'background-height': '63px',
			'background-fit': 'contain',
			'background-color': '#5ca2af',
			'background-opacity': 1,
			'background-repeat': 'no-repeat',
			'background-clip': 'node',
			'content': 'data(name)',
			'color': '#707070',
			'font-family': 'Microsoft Yahei',
			'font-size': '12px',
			'text-halign': 'center',
			'text-valign': 'bottom',
			'text-wrap': 'wrap'
		}
	},
	{
		selector: 'node:selected',
		css: {
			'border-width': 3,
			'border-color': '#fbba0a',
			'border-opacity': 1
		}
	},
	{
		selector: 'node.showbigger',
		css: {
			'background-clip': 'node',
		}
	},
	{
		selector: '.nofilter',
		css: {
			'background-image-opacity': 0.2,
			'opacity': 0.2
		}
	},
	{
		selector: 'node.event',
		css: {
			'width': '45px',
			'height': '45px',
			'shape': 'rectangle',
			'background-width': '45px',
			'background-height': '45px'
		}
	},
	
	/*---------- 事件 ----------*/
	{
		selector: 'edge',
		css: {
			'width': '2px',
			'line-color': '#9bb7f0',
			'content': 'data(event)',
			'color': '#707070',
			'font-family': 'Microsoft Yahei',
			'font-size': '12px',
			'edge-text-rotation': 'autorotate',
			'text-background-color': '#fff',
			'text-background-shape': 'roundrectangle'
		}
	},
	{
		selector: 'edge:selected',
		css: {
			'line-color': '#fbba0a'
		}
	},
	{
		selector: 'edge.link',
		css: {
			'font-family': 'FontAwesome',
            'font-size': '2em',
            'content': '\uf0c1',
			'color': '#2d63b2',
			'text-background-opacity': '0'
		}
	},
	
	/*---------- zoom变化 ----------*/
	{
		selector: '.hidtxt',
		css: {
			'content': ''
		}
	},
	{
		selector: '.event.hidicon',
		css: {
			'display': 'none'
		}
	},
	{
		selector: '.showbigger',
		css: {
			'content': 'data(showbigger)'
		}
	}
	
]);
