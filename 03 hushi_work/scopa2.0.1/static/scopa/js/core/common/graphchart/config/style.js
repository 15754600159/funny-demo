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
			'width': '70px',
			'height': '70px',
			'shape': 'ellipse',
			'background-width': '68px',
			'background-height': '68px',
			'background-fit': 'contain',
			'background-color': '#4887bd',
			'background-opacity': 1,
			'background-repeat': 'no-repeat',
			'background-image': 'data(image)',
			'background-clip': 'none',
			'background-fit': 'none',
			//'background-position-x': '-5px',
			//'background-position-y': '-5px',
			'content': 'data(name)',
			'color': '#707070',
			'font-family': 'Microsoft Yahei',
			'font-size': '12px',
			'text-halign': 'center',
			'text-valign': 'bottom',
			'text-wrap': 'wrap',
			'padding-bottom':'4px',
			'padding-left':'4px'
		}
	},
	{
		selector: 'node:selected',
		css: {
			'background-color': '#fbba0a',
			'background-opacity': 1
		}
	},
	{
		selector: 'node.selected',
		css: {
			'background-color': '#fbba0a',
			'background-opacity': 1
		}
	},
    {
        selector: 'node.locked',
		css: {
			'background-clip': 'none'
		}
    },
    {
        selector: 'node:locked:selected',
		css: {
			'background-clip': 'none',
			'background-opacity': 1
		}
    },
    {
        selector: 'node.new',
        css: {
        	'background-color': '#44da55',
        	'background-opacity': 1
        }
    },
    {
        selector: 'node.new:selected',
        css: {
        	'background-color': '#fbba0a',
        	'background-opacity': 1
        }
    },
    {
        selector: 'node.orange',
        css: {
        	'background-color': '#fada77',
        	'background-opacity': 1
        }
    },
	{
		selector: 'node.red',
		css: {
        	'background-color': '#ea6262',
        	'background-opacity': 1
		}
	},
	{
		selector: 'node.shownormal',
		css: {
			//'background-clip': 'node'
		}
	},
	{
		selector: 'node.showbigger',
		css: {
			'background-image': 'data(image)',
			'background-clip': 'node'
		}
	},
	{
		selector: 'node.showbigger.nophoto',
		css: {
			'background-clip': 'none'
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
			'background-color': '#5b759d',
			'background-width': '50px',
			'background-height': '50px'
		}
	},
	{
		selector: 'node.undefined',
		css: {
			'background-color': '#4887BD',
			'background-image-opacity': '0',
        	'background-opacity': 1
		}
	},
    {
        selector: 'node.women',
		css: {
			'background-color': '#d47fa9'
		}
    },
    {
        selector: 'node.women:selected',
		css: {
			'background-color': '#fbba0a'
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
			'min-zoomed-font-size': '12px',
			'edge-text-rotation': 'autorotate',
			'curve-style': 'bezier',
			'text-background-color': '#f6f7f9',
			'text-background-opacity': '1',
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
		selector: 'edge.selected',
		css: {
			'line-color': '#fbba0a'
		}
	},
	{
		selector: 'edge.new',
		css: {
			'line-color': '#44da55'
		}
	},
	{
		selector: 'edge.new:selected',
		css: {
			'line-color': '#fbba0a'
		}
	},
	{
		selector: 'edge.new.selected',
		css: {
			'line-color': '#fbba0a'
		}
	},
	{
		selector: 'edge.hop1',
		css: {
			'width': '4px',
			'line-color': '#08c2f8'
		}
	},
	
	/*---------- zoom变化 ----------*/
	{
		selector: '.hidtxt',
		css: {
			'content': ''
		}
	},
	/*{
		selector: '.event.hidicon',
		css: {
			'display': 'none'
		}
	},*/
	{
		selector: '.showbigger',
		css: {
			'content': 'data(showbigger)'
		}
	},
	{
		selector: '.hide',
		css: {
			'opacity': '0'
		}
	},
	{
		selector: '.merge',
		css: {
			'shadow-blur': 20,
			'shadow-color': '#ee515c',
			'shadow-opacity': 1,
			'border-width': '2',
			'border-color': '#ee515c',
			'border-opacity': 0.5
		}
	},
	{
		selector: 'edge.link',
		css: {
			'font-family': 'Glyphicons Halflings',
            'font-size': '1em',
            'content': '\ue144',
			'color': '#9bb7f0',
			'text-background-opacity': '0'
		}
	},
	{
		selector: 'edge.link:selected',
		css: {
			'font-family': 'Glyphicons Halflings',
            'font-size': '1em',
            'content': '\ue144',
			'color': '#fbba0a',
			'text-background-opacity': '0'
		}
	},
	{
		selector: 'edge.link.showbigger',
		css: {
			'content': '\ue144',
		}
	},
	{
		selector: 'edge.link.showbigger:selected',
		css: {
			'content': '\ue144',
		}
	}
	
]);
