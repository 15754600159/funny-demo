﻿(function() {
	var defaultGlobeParams = {
		MapSrcURL: [],
		Copyright: "&copy;2012 山海经纬",
		DynamicCopyright: [],
		Version: 0.3,
		CenterPoint: [0, 0],
		MapFullExtent: [-180, 0, 180, 90],
		MapInitLevel: 10,
		MapMaxLevel: 20,
		ZoomOffset: 0,
		MapUnitPixels: 256,
		MapCoordinateType: 1,
		MapConvertScale: 114699,
		MapConvertOffsetX: 0,
		MapConvertOffsetY: 0,
		IsOverlay: true,
		MapProx: false,
		ZoomLevelSequence: 0,
		TileAnchorPoint: [0, 0],
		EzMapServiceURL: "",
		HotspotStyle: {
			borderColor: "red",
			borderWeight: "1.2pt",
			fillColor: "blue",
			opacity: "19660f"
		},
		EzServerClientURL: ""
	};
	if(typeof(EzServerClient) == "undefined") {
		EzServerClient = {}
	}
	if(typeof(EzServerClient.GlobeParams) == "undefined") {
		EzServerClient.GlobeParams = {}
	}
	for(var key in defaultGlobeParams) {
		if(typeof(EzServerClient.GlobeParams[key]) == "undefined") {
			EzServerClient.GlobeParams[key] = defaultGlobeParams[key]
		}
	}
})();
(function() {
	var scriptName = "EzServerClient(6)?\\.(gz)?js(p)?";
	var jsfiles = new Array();
	var cssfiles = new Array("css/EzServer.css");
	var scriptObject = null;
	var scriptBaseURL = null;
	(function() {
		var isOL = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)");
		var scripts = document.getElementsByTagName("script");
		for(var i = 0, len = scripts.length; i < len; i++) {
			var src = scripts[i].getAttribute("src");
			if(src) {
				var match = src.match(isOL);
				if(match) {
					scriptBaseURL = match[1];
					scriptObject = scripts[i];
					break
				}
			}
		}
	})();
	var detectAgent = function detectAgent() {
		var Agent = {};
		var ua = navigator.userAgent.toLowerCase();
		if(window.ActiveXObject) {
			Agent.ie = ua.match(/msie ([\d.]+)/)[1]
		} else {
			if(document.getBoxObjectFor) {
				Agent.firefox = ua.match(/firefox\/([\d.]+)/)[1]
			} else {
				if(window.MessageEvent && !document.getBoxObjectFor) {
					Agent.chrome = ua.match(/chrome\/([\d.]+)/)[1]
				} else {
					if(window.opera) {
						Agent.opera = ua.match(/opera.([\d.]+)/)[1]
					} else {
						if(window.openDatabase) {
							Agent.safari = ua.match(/version\/([\d.]+)/)[1]
						}
					}
				}
			}
		}
		return Agent
	};
	var addScript = function(src, charset) {
		var agent = detectAgent();
		if(typeof(agent.ie) != "undefined") {
			document.writeln('<script type="text/javascript" charset="' + charset + '" src="' + src + '"><\/script>')
		} else {
			var s = document.createElement("script");
			s.type = "text/javascript";
			s.charset = charset;
			s.src = src;
			scriptObject.insertAdjacentElement("AfterEnd", s)
		}
	};
	var addStyle = function(src, charset) {
		var s = document.createElement("link");
		s.rel = "stylesheet";
		s.type = "text/css";
		s.charset = charset;
		s.href = src;
		var h = document.getElementsByTagName("head").length ? document.getElementsByTagName("head")[0] : document.body;
		h.appendChild(s)
	};
	if(scriptBaseURL != null) {
		var host = scriptBaseURL.substring(0, scriptBaseURL.lastIndexOf("/js"));
		try {
			EzServerClient.GlobeParams.EzServerClientURL = host
		} catch(e) {}
		for(var i = 0, len = jsfiles.length; i < len; i++) {
			addScript(host + "/" + jsfiles[i], "GB2312")
		}
		for(var i = 0, len = cssfiles.length; i < len; i++) {
			addStyle(host + "/" + cssfiles[i], "GB2312")
		}
	}

	function getBrowserType() {
		if(navigator.userAgent.indexOf("MSIE") > 0) {
			return "MSIE"
		}
		if(isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
			return "Firefox"
		}
		if(isSafari = navigator.userAgent.indexOf("Safari") > 0) {
			return "Safari"
		}
		if(isCamino = navigator.userAgent.indexOf("Camino") > 0) {
			return "Camino"
		}
		if(isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
			return "Gecko"
		}
		return null
	}
	_browserType = getBrowserType()
})();
EzServerClient.Util = {};
EzServerClient.Util.getElement = function() {
	var elements = [];
	for(var i = 0, len = arguments.length; i < len; i++) {
		var element = arguments[i];
		if(typeof element == "string") {
			element = document.getElementById(element)
		}
		if(arguments.length == 1) {
			return element
		}
		elements.push(element)
	}
	return elements
};
EzServerClient.Util.isElement = function(o) {
	return !!(o && o.nodeType === 1)
};
if(typeof window.$ === "undefined") {
	window.$ = EzServerClient.Util.getElement
}
EzServerClient.Util.extend = function(destination, source) {
	destination = destination || {};
	if(source) {
		for(var property in source) {
			var value = source[property];
			if(value !== undefined) {
				destination[property] = value
			}
		}
		var sourceIsEvt = typeof window.Event == "function" && source instanceof window.Event;
		if(!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty("toString")) {
			destination.toString = source.toString
		}
	}
	return destination
};
EzServerClient.Util.removeItem = function(array, item) {
	for(var i = array.length - 1; i >= 0; i--) {
		if(array[i] == item) {
			array.splice(i, 1)
		}
	}
	return array
};
EzServerClient.Util.clearArray = function(array) {
	EzServerClient.Console.warn(EzServerClient.i18n("methodDeprecated", {
		newMethod: "array = []"
	}));
	array.length = 0
};
EzServerClient.Util.indexOf = function(array, obj) {
	if(typeof array.indexOf == "function") {
		return array.indexOf(obj)
	} else {
		for(var i = 0, len = array.length; i < len; i++) {
			if(array[i] == obj) {
				return i
			}
		}
		return -1
	}
};
EzServerClient.Util.getParameters = function(url) {
	url = url || window.location.href;
	var paramsString = "";
	if(EzServerClient.String.contains(url, "?")) {
		var start = url.indexOf("?") + 1;
		var end = EzServerClient.String.contains(url, "#") ? url.indexOf("#") : url.length;
		paramsString = url.substring(start, end)
	}
	var parameters = {};
	var pairs = paramsString.split(/[&;]/);
	for(var i = 0, len = pairs.length; i < len; ++i) {
		var keyValue = pairs[i].split("=");
		if(keyValue[0]) {
			var key = decodeURIComponent(keyValue[0]);
			var value = keyValue[1] || "";
			value = decodeURIComponent(value.replace(/\+/g, " ")).split(",");
			if(value.length == 1) {
				value = value[0]
			}
			parameters[key] = value
		}
	}
	return parameters
};
EzServerClient.Util.Try = function() {
	var returnValue = null;
	for(var i = 0, len = arguments.length; i < len; i++) {
		var lambda = arguments[i];
		try {
			returnValue = lambda();
			break
		} catch(e) {}
	}
	return returnValue
};
EzServerClient.Util.getNodes = function(p, tagName) {
	var nodes = EzServerClient.Util.Try(function() {
		return EzServerClient.Util._getNodes(p.documentElement.childNodes, tagName)
	}, function() {
		return EzServerClient.Util._getNodes(p.childNodes, tagName)
	});
	return nodes
};
EzServerClient.Util._getNodes = function(nodes, tagName) {
	var retArray = [];
	for(var i = 0, len = nodes.length; i < len; i++) {
		if(nodes[i].nodeName == tagName) {
			retArray.push(nodes[i])
		}
	}
	return retArray
};
EzServerClient.Util.getTagText = function(parent, item, index) {
	var result = EzServerClient.Util.getNodes(parent, item);
	if(result && (result.length > 0)) {
		if(!index) {
			index = 0
		}
		if(result[index].childNodes.length > 1) {
			return result.childNodes[1].nodeValue
		} else {
			if(result[index].childNodes.length == 1) {
				return result[index].firstChild.nodeValue
			}
		}
	} else {
		return ""
	}
};
EzServerClient.Util.getXmlNodeValue = function(node) {
	var val = null;
	EzServerClient.Util.Try(function() {
		val = node.text;
		if(!val) {
			val = node.textContent
		}
		if(!val) {
			val = node.firstChild.nodeValue
		}
	}, function() {
		val = node.textContent
	});
	return val
};
EzServerClient.Util.detectBrowser = function() {
	var agent = navigator.userAgent.toLowerCase();
	if(agent.indexOf("msie") >= 0) {
		return "IE"
	} else {
		if(agent.indexOf("firefox") >= 0) {
			return "FF"
		} else {
			if(agent.indexOf("opera") >= 0) {
				return "OPERA"
			} else {
				if(agent.indexOf("chrome") >= 0) {
					return "CHROME"
				} else {
					if(agent.indexOf("safari") >= 0) {
						return "SAFARI"
					} else {
						return "FF"
					}
				}
			}
		}
	}
};
EzServerClient.Util.detectBrowser.isIE6 = function() {
	if(EzServerClient.Util.detectBrowser() === "IE") {
		var arVersion = navigator.appVersion.split("MSIE");
		var version = parseFloat(arVersion[1]);
		if((version >= 5.5 && version < 7) && (document.body.filters)) {
			return true
		}
	}
	return false
};
var fetchedImage = [];
EzServerClient.Util.fetchImage = function(url, callback) {
	var img = new Image;
	for(var i = 0, len = fetchedImage.length; i < len; ++i) {
		if(fetchedImage[i].url === url) {
			callback(fetchedImage[i].width, fetchedImage[i].height, url);
			return
		}
	}
	img.onload = function() {
		fetchedImage.push({
			url: url,
			width: img.width,
			height: img.height
		});
		callback(img.width, img.height, url)
	};
	img.onerror = function() {
		fetchedImage.push({
			url: url,
			width: img.width,
			height: img.height
		});
		callback(0, 0, url)
	};
	img.src = url + "?" + new Date().getTime();
	return
};
EzServerClient.Util.getCssSpriteImage = function(url, origin, img, allowSelectDrag) {
	if(!img) {
		img = document.createElement("img");
		img.style.cssText = "position:absolute";
		if(!allowSelectDrag) {
			img.style.cssText = "position:absolute;-moz-user-select:none;-khtml-user-select:none;";
			img.unselectable = "on";
			img.onselectstart = function() {
				return false
			};
			img.dragstart = function(event) {
				EzServerClient.Util.stopEvent(event);
				return false
			}
		}
		if(EzServerClient.Util.detectBrowser.isIE6() && url.toLowerCase().indexOf(".png") != -1) {
			img.className = "csssprite";
			img.src = EzServerClient.GlobeParams.EzServerClientURL + "/images/transparent.gif";
			EzServerClient.Util.fetchImage(url, function(width, height) {
				img.width = width;
				img.height = height;
				img.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src="' + url + '")'
			})
		} else {
			img.src = url
		}
	}
	img.style.left = -origin[0] + "px";
	img.style.top = -origin[1] + "px";
	return img
};
EzServerClient.Util.setCssSprite = function(dom, url, position, selectDrag) {
	if(EzServerClient.Util.detectBrowser.isIE6()) {
		dom.style.background = "";
		dom.style.overflow = "hidden";
		var imgs = dom.getElementsByTagName("img");
		var img = null;
		for(var i = 0, len = imgs.length; i < len; ++i) {
			if(imgs[i].className == "csssprite") {
				img = imgs[i];
				break
			}
		}
		img = EzServerClient.Util.getCssSpriteImage(url, position, img, selectDrag);
		if(!img.parentNode) {
			dom.insertBefore(img, dom.firstChild)
		}
	} else {
		url && (dom.style.backgroundImage = "url(" + url + ")");
		dom.style.backgroundPosition = -position[0] + "px " + (-position[1]) + "px"
	}
};
EzServerClient.Util.stopEvent = function(event) {
	event = event || window.event;
	event.returnValue = false;
	if(event.preventDefault) {
		event.preventDefault()
	}
	event.cancelBubble = true;
	if(event.stopPropagation) {
		event.stopPropagation()
	}
};
EzServerClient.Util.eval = function(expression) {
	(window.execScript || function(statement) {
		window["eval"].call(window, statement)
	})(expression)
};
EzServerClient.Class = function() {
	var Class = function() {
		if(arguments && arguments[0] != EzServerClient.Class.isPrototype) {
			this.initialize.apply(this, arguments)
		}
	};
	var extended = {};
	var parent, initialize;
	for(var i = 0, len = arguments.length; i < len; ++i) {
		if(typeof arguments[i] == "function") {
			if(i == 0 && len > 1) {
				initialize = arguments[i].prototype.initialize;
				arguments[i].prototype.initialize = function() {};
				extended = new arguments[i];
				if(initialize === undefined) {
					delete arguments[i].prototype.initialize
				} else {
					arguments[i].prototype.initialize = initialize
				}
			}
			parent = arguments[i].prototype
		} else {
			parent = arguments[i]
		}
		EzServerClient.Util.extend(extended, parent)
	}
	Class.prototype = extended;
	return Class
};
EzServerClient.Class.isPrototype = function() {};
EzServerClient.Class.create = function() {
	return function() {
		if(arguments && arguments[0] != EzServerClient.Class.isPrototype) {
			this.initialize.apply(this, arguments)
		}
	}
};
EzServerClient.Class.inherit = function() {
	var superClass = arguments[0];
	var proto = new superClass(EzServerClient.Class.isPrototype);
	for(var i = 1, len = arguments.length; i < len; i++) {
		if(typeof arguments[i] == "function") {
			var mixin = arguments[i];
			arguments[i] = new mixin(EzServerClient.Class.isPrototype)
		}
		EzServerClient.Util.extend(proto, arguments[i])
	}
	return proto
};
EzServerClient.SynAddScript = function(sId, url) {
	var oXmlHttp = XMLHttp.create();
	oXmlHttp.OnReadyStateChange = function() {
		if(oXmlHttp.readyState == 4) {
			if(oXmlHttp.status == 200 || oXmlHttp.status == 304) {
				EzServerClient.IncludeJS(sId, url, oXmlHttp.responseText)
			} else {
				alert("XML request error: " + oXmlHttp.statusText + " (" + oXmlHttp.status + ")")
			}
		}
	};
	oXmlHttp.open("GET", url, true);
	oXmlHttp.send(null)
};
EzServerClient.IncludeJS = function(sId, fileUrl, source) {
	if((source != null) && (!document.getElementById(sId))) {
		var oHead = document.getElementsByTagName("HEAD").item(0);
		var oScript = document.createElement("script");
		oScript.language = "javascript";
		oScript.type = "text/javascript";
		oScript.id = sId;
		oScript.defer = true;
		oScript.text = source;
		oHead.appendChild(oScript)
	}
};
EzServerClient.AsynAddScript = function(vId, vUrl, vCallback) {
	var scriptBlock = document.createElement("script");
	scriptBlock.src = vUrl;
	scriptBlock.type = "text/javascript";
	scriptBlock.language = "javascript";
	scriptBlock.id = vId;
	document.getElementsByTagName("head")[0].appendChild(scriptBlock);
	scriptBlock.onreadystatechange = vCallback
};
EzServerClient.AsynAddScriptByAjax = function(vUrl, f, vLyr, peer, flag) {
	var oXmlHttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	oXmlHttp.onreadystatechange = function() {
		if(oXmlHttp.readyState == 4) {
			if(oXmlHttp.status == 200 || oXmlHttp.status == 304 || oXmlHttp.status == 0) {
				_loadHotData(oXmlHttp.responseText, f, vUrl, vLyr, peer, flag)
			} else {
				_errorBack(f)
			}
		}
	};
	oXmlHttp.open("GET", vUrl, true);
	oXmlHttp.send(null)
};
EzServerClient.AsynAddIndoorByAjax = function(vUrl, vCallback) {
	var oXmlHttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	oXmlHttp.onreadystatechange = function() {
		if(oXmlHttp.readyState == 4) {
			if(oXmlHttp.status == 200 || oXmlHttp.status == 304) {
				vCallback(oXmlHttp.responseText)
			} else {
				_errorFunc()
			}
		}
	};
	oXmlHttp.open("GET", vUrl, true);
	oXmlHttp.send(null)
};
EzServerClient.AsynByAjax = function(vUrl, layer, num, layerContainer, vCallback, errorFunc) {
	var oXmlHttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	oXmlHttp.onreadystatechange = function() {
		if(oXmlHttp.readyState == 4) {
			if(oXmlHttp.status == 200 || oXmlHttp.status == 304) {
				vCallback(oXmlHttp.responseText, layer, num, layerContainer)
			} else {
				errorFunc()
			}
		}
	};
	oXmlHttp.open("GET", vUrl, true);
	oXmlHttp.send(null)
};
EzServerClient.AsynByAjaxForwmts = function(vUrl, vCallback, errorFunc) {
	var oXmlHttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	oXmlHttp.onreadystatechange = function() {
		if(oXmlHttp.readyState == 4) {
			if(oXmlHttp.status == 200 || oXmlHttp.status == 304) {
				vCallback(oXmlHttp.responseText)
			} else {
				errorFunc()
			}
		}
	};
	oXmlHttp.open("GET", vUrl, true);
	oXmlHttp.send(null)
};
(function(glob) {
	var version = "0.3.4",
		has = "hasOwnProperty",
		separator = /[\.\/]/,
		wildcard = "*",
		fun = function() {},
		numsort = function(a, b) {
			return a - b
		},
		current_event, stop, events = {
			n: {}
		},
		eve = function(name, scope) {
			var e = events,
				oldstop = stop,
				args = Array.prototype.slice.call(arguments, 2),
				listeners = eve.listeners(name),
				z = 0,
				f = false,
				l, indexed = [],
				queue = {},
				out = [],
				ce = current_event,
				errors = [];
			current_event = name;
			stop = 0;
			for(var i = 0, ii = listeners.length; i < ii; i++) {
				if("zIndex" in listeners[i]) {
					indexed.push(listeners[i].zIndex);
					if(listeners[i].zIndex < 0) {
						queue[listeners[i].zIndex] = listeners[i]
					}
				}
			}
			indexed.sort(numsort);
			while(indexed[z] < 0) {
				l = queue[indexed[z++]];
				out.push(l.apply(scope, args));
				if(stop) {
					stop = oldstop;
					return out
				}
			}
			for(i = 0; i < ii; i++) {
				l = listeners[i];
				if("zIndex" in l) {
					if(l.zIndex == indexed[z]) {
						out.push(l.apply(scope, args));
						if(stop) {
							break
						}
						do {
							z++;
							l = queue[indexed[z]];
							l && out.push(l.apply(scope, args));
							if(stop) {
								break
							}
						} while (l)
					} else {
						queue[l.zIndex] = l
					}
				} else {
					out.push(l.apply(scope, args));
					if(stop) {
						break
					}
				}
			}
			stop = oldstop;
			current_event = ce;
			return out.length ? out : null
		};
	eve.listeners = function(name) {
		var names = name.split(separator),
			e = events,
			item, items, k, i, ii, j, jj, nes, es = [e],
			out = [];
		for(i = 0, ii = names.length; i < ii; i++) {
			nes = [];
			for(j = 0, jj = es.length; j < jj; j++) {
				e = es[j].n;
				items = [e[names[i]], e[wildcard]];
				k = 2;
				while(k--) {
					item = items[k];
					if(item) {
						nes.push(item);
						out = out.concat(item.f || [])
					}
				}
			}
			es = nes
		}
		return out
	};
	eve.on = function(name, f) {
		var names = name.split(separator),
			e = events;
		for(var i = 0, ii = names.length; i < ii; i++) {
			e = e.n;
			!e[names[i]] && (e[names[i]] = {
				n: {}
			});
			e = e[names[i]]
		}
		e.f = e.f || [];
		for(i = 0, ii = e.f.length; i < ii; i++) {
			if(e.f[i] == f) {
				return fun
			}
		}
		e.f.push(f);
		return function(zIndex) {
			if(+zIndex == +zIndex) {
				f.zIndex = +zIndex
			}
		}
	};
	eve.stop = function() {
		stop = 1
	};
	eve.nt = function(subname) {
		if(subname) {
			return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(current_event)
		}
		return current_event
	};
	eve.off = eve.unbind = function(name, f) {
		var names = name.split(separator),
			e, key, splice, i, ii, j, jj, cur = [events];
		for(i = 0, ii = names.length; i < ii; i++) {
			for(j = 0; j < cur.length; j += splice.length - 2) {
				splice = [j, 1];
				e = cur[j].n;
				if(names[i] != wildcard) {
					if(e[names[i]]) {
						splice.push(e[names[i]])
					}
				} else {
					for(key in e) {
						if(e[has](key)) {
							splice.push(e[key])
						}
					}
				}
				cur.splice.apply(cur, splice)
			}
		}
		for(i = 0, ii = cur.length; i < ii; i++) {
			e = cur[i];
			while(e.n) {
				if(f) {
					if(e.f) {
						for(j = 0, jj = e.f.length; j < jj; j++) {
							if(e.f[j] == f) {
								e.f.splice(j, 1);
								break
							}
						}!e.f.length && delete e.f
					}
					for(key in e.n) {
						if(e.n[has](key) && e.n[key].f) {
							var funcs = e.n[key].f;
							for(j = 0, jj = funcs.length; j < jj; j++) {
								if(funcs[j] == f) {
									funcs.splice(j, 1);
									break
								}
							}!funcs.length && delete e.n[key].f
						}
					}
				} else {
					delete e.f;
					for(key in e.n) {
						if(e.n[has](key) && e.n[key].f) {
							delete e.n[key].f
						}
					}
				}
				e = e.n
			}
		}
	};
	eve.once = function(name, f) {
		var f2 = function() {
			var res = f.apply(this, arguments);
			eve.unbind(name, f2);
			return res
		};
		return eve.on(name, f2)
	};
	eve.version = version;
	eve.toString = function() {
		return "You are running Eve " + version
	};
	(typeof module != "undefined" && module.exports) ? (module.exports = eve) : (typeof define != "undefined" ? (define("eve", [], function() {
		return eve
	})) : (glob.eve = eve))
})(this);
(function() {
	function R(first) {
		if(R.is(first, "function")) {
			return loaded ? first() : eve.on("raphael.DOMload", first)
		} else {
			if(R.is(first, array)) {
				return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first)
			} else {
				var args = Array.prototype.slice.call(arguments, 0);
				if(R.is(args[args.length - 1], "function")) {
					var f = args.pop();
					return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function() {
						f.call(R._engine.create[apply](R, args))
					})
				} else {
					return R._engine.create[apply](R, arguments)
				}
			}
		}
	}
	R.version = "2.1.0";
	R.eve = eve;
	var loaded, separator = /[, ]+/,
		elements = {
			circle: 1,
			rect: 1,
			path: 1,
			ellipse: 1,
			text: 1,
			image: 1
		},
		formatrg = /\{(\d+)\}/g,
		proto = "prototype",
		has = "hasOwnProperty",
		g = {
			doc: document,
			win: window
		},
		oldRaphael = {
			was: Object.prototype[has].call(g.win, "Raphael"),
			is: g.win.Raphael
		},
		Paper = function() {
			this.ca = this.customAttributes = {}
		},
		paperproto, appendChild = "appendChild",
		apply = "apply",
		concat = "concat",
		supportsTouch = "createTouch" in g.doc,
		E = "",
		S = " ",
		Str = String,
		split = "split",
		events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [split](S),
		touchMap = {
			mousedown: "touchstart",
			mousemove: "touchmove",
			mouseup: "touchend"
		},
		lowerCase = Str.prototype.toLowerCase,
		math = Math,
		mmax = math.max,
		mmin = math.min,
		abs = math.abs,
		pow = math.pow,
		PI = math.PI,
		nu = "number",
		string = "string",
		array = "array",
		toString = "toString",
		fillString = "fill",
		objectToString = Object.prototype.toString,
		paper = {},
		push = "push",
		ISURL = R._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
		colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
		isnan = {
			"NaN": 1,
			"Infinity": 1,
			"-Infinity": 1
		},
		bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
		round = math.round,
		setAttribute = "setAttribute",
		toFloat = parseFloat,
		toInt = parseInt,
		upperCase = Str.prototype.toUpperCase,
		availableAttrs = R._availableAttrs = {
			"arrow-end": "none",
			"arrow-start": "none",
			blur: 0,
			"clip-rect": "0 0 1e9 1e9",
			cursor: "default",
			cx: 0,
			cy: 0,
			fill: "#fff",
			"fill-opacity": 1,
			font: '10px "Arial"',
			"font-family": '"Arial"',
			"font-size": "10",
			"font-style": "normal",
			"font-weight": 400,
			gradient: 0,
			height: 0,
			href: "http://raphaeljs.com/",
			"letter-spacing": 0,
			opacity: 1,
			path: "M0,0",
			r: 0,
			rx: 0,
			ry: 0,
			src: "",
			stroke: "#000",
			"stroke-dasharray": "",
			"stroke-linecap": "butt",
			"stroke-linejoin": "butt",
			"stroke-miterlimit": 0,
			"stroke-opacity": 1,
			"stroke-width": 1,
			target: "_blank",
			"text-anchor": "middle",
			title: "Raphael",
			transform: "",
			width: 0,
			x: 0,
			y: 0
		},
		availableAnimAttrs = R._availableAnimAttrs = {
			blur: nu,
			"clip-rect": "csv",
			cx: nu,
			cy: nu,
			fill: "colour",
			"fill-opacity": nu,
			"font-size": nu,
			height: nu,
			opacity: nu,
			path: "path",
			r: nu,
			rx: nu,
			ry: nu,
			stroke: "colour",
			"stroke-opacity": nu,
			"stroke-width": nu,
			transform: "transform",
			width: nu,
			x: nu,
			y: nu
		},
		whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
		commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
		hsrg = {
			hs: 1,
			rg: 1
		},
		p2s = /,?([achlmqrstvxz]),?/gi,
		pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
		tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
		pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
		radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
		eldata = {},
		sortByKey = function(a, b) {
			return a.key - b.key
		},
		sortByNumber = function(a, b) {
			return toFloat(a) - toFloat(b)
		},
		fun = function() {},
		pipe = function(x) {
			return x
		},
		rectPath = R._rectPath = function(x, y, w, h, r) {
			if(r) {
				return [
					["M", x + r, y],
					["l", w - r * 2, 0],
					["a", r, r, 0, 0, 1, r, r],
					["l", 0, h - r * 2],
					["a", r, r, 0, 0, 1, -r, r],
					["l", r * 2 - w, 0],
					["a", r, r, 0, 0, 1, -r, -r],
					["l", 0, r * 2 - h],
					["a", r, r, 0, 0, 1, r, -r],
					["z"]
				]
			}
			return [
				["M", x, y],
				["l", w, 0],
				["l", 0, h],
				["l", -w, 0],
				["z"]
			]
		},
		ellipsePath = function(x, y, rx, ry) {
			if(ry == null) {
				ry = rx
			}
			return [
				["M", x, y],
				["m", 0, -ry],
				["a", rx, ry, 0, 1, 1, 0, 2 * ry],
				["a", rx, ry, 0, 1, 1, 0, -2 * ry],
				["z"]
			]
		},
		getPath = R._getPath = {
			path: function(el) {
				return el.attr("path")
			},
			circle: function(el) {
				var a = el.attrs;
				return ellipsePath(a.cx, a.cy, a.r)
			},
			ellipse: function(el) {
				var a = el.attrs;
				return ellipsePath(a.cx, a.cy, a.rx, a.ry)
			},
			rect: function(el) {
				var a = el.attrs;
				return rectPath(a.x, a.y, a.width, a.height, a.r)
			},
			image: function(el) {
				var a = el.attrs;
				return rectPath(a.x, a.y, a.width, a.height)
			},
			text: function(el) {
				var bbox = el._getBBox();
				return rectPath(bbox.x, bbox.y, bbox.width, bbox.height)
			}
		},
		mapPath = R.mapPath = function(path, matrix) {
			if(!matrix) {
				return path
			}
			var x, y, i, j, ii, jj, pathi;
			path = path2curve(path);
			for(i = 0, ii = path.length; i < ii; i++) {
				pathi = path[i];
				for(j = 1, jj = pathi.length; j < jj; j += 2) {
					x = matrix.x(pathi[j], pathi[j + 1]);
					y = matrix.y(pathi[j], pathi[j + 1]);
					pathi[j] = x;
					pathi[j + 1] = y
				}
			}
			return path
		};
	R._g = g;
	R.type = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
	if(R.type == "VML") {
		var d = g.doc.createElement("div"),
			b;
		d.innerHTML = '<v:shape adj="1"/>';
		b = d.firstChild;
		b.style.behavior = "url(#default#VML)";
		if(!(b && typeof b.adj == "object")) {
			return(R.type = E)
		}
		d = null
	}
	R.svg = !(R.vml = R.type == "VML");
	R._Paper = Paper;
	R.fn = paperproto = Paper.prototype = R.prototype;
	R._id = 0;
	R._oid = 0;
	R.is = function(o, type) {
		type = lowerCase.call(type);
		if(type == "finite") {
			return !isnan[has](+o)
		}
		if(type == "array") {
			return o instanceof Array
		}
		return(type == "null" && o === null) || (type == typeof o && o !== null) || (type == "object" && o === Object(o)) || (type == "array" && Array.isArray && Array.isArray(o)) || objectToString.call(o).slice(8, -1).toLowerCase() == type
	};

	function clone(obj) {
		if(Object(obj) !== obj) {
			return obj
		}
		var res = new obj.constructor;
		for(var key in obj) {
			if(obj[has](key)) {
				res[key] = clone(obj[key])
			}
		}
		return res
	}
	R.angle = function(x1, y1, x2, y2, x3, y3) {
		if(x3 == null) {
			var x = x1 - x2,
				y = y1 - y2;
			if(!x && !y) {
				return 0
			}
			return(180 + math.atan2(-y, -x) * 180 / PI + 360) % 360
		} else {
			return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3)
		}
	};
	R.rad = function(deg) {
		return deg % 360 * PI / 180
	};
	R.deg = function(rad) {
		return rad * 180 / PI % 360
	};
	R.snapTo = function(values, value, tolerance) {
		tolerance = R.is(tolerance, "finite") ? tolerance : 10;
		if(R.is(values, array)) {
			var i = values.length;
			while(i--) {
				if(abs(values[i] - value) <= tolerance) {
					return values[i]
				}
			}
		} else {
			values = +values;
			var rem = value % values;
			if(rem < tolerance) {
				return value - rem
			}
			if(rem > values - tolerance) {
				return value - rem + values
			}
		}
		return value
	};
	var createUUID = R.createUUID = (function(uuidRegEx, uuidReplacer) {
		return function() {
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase()
		}
	})(/[xy]/g, function(c) {
		var r = math.random() * 16 | 0,
			v = c == "x" ? r : (r & 3 | 8);
		return v.toString(16)
	});
	R.setWindow = function(newwin) {
		eve("raphael.setWindow", R, g.win, newwin);
		g.win = newwin;
		g.doc = g.win.document;
		if(R._engine.initWin) {
			R._engine.initWin(g.win)
		}
	};
	var toHex = function(color) {
			if(R.vml) {
				var trim = /^\s+|\s+$/g;
				var bod;
				try {
					var docum = new ActiveXObject("htmlfile");
					docum.write("<body>");
					docum.close();
					bod = docum.body
				} catch(e) {
					bod = createPopup().document.body
				}
				var range = bod.createTextRange();
				toHex = cacher(function(color) {
					try {
						bod.style.color = Str(color).replace(trim, E);
						var value = range.queryCommandValue("ForeColor");
						value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
						return "#" + ("000000" + value.toString(16)).slice(-6)
					} catch(e) {
						return "none"
					}
				})
			} else {
				var i = g.doc.createElement("i");
				i.title = "Rapha\xebl Colour Picker";
				i.style.display = "none";
				g.doc.body.appendChild(i);
				toHex = cacher(function(color) {
					i.style.color = color;
					return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color")
				})
			}
			return toHex(color)
		},
		hsbtoString = function() {
			return "hsb(" + [this.h, this.s, this.b] + ")"
		},
		hsltoString = function() {
			return "hsl(" + [this.h, this.s, this.l] + ")"
		},
		rgbtoString = function() {
			return this.hex
		},
		prepareRGB = function(r, g, b) {
			if(g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
				b = r.b;
				g = r.g;
				r = r.r
			}
			if(g == null && R.is(r, string)) {
				var clr = R.getRGB(r);
				r = clr.r;
				g = clr.g;
				b = clr.b
			}
			if(r > 1 || g > 1 || b > 1) {
				r /= 255;
				g /= 255;
				b /= 255
			}
			return [r, g, b]
		},
		packageRGB = function(r, g, b, o) {
			r *= 255;
			g *= 255;
			b *= 255;
			var rgb = {
				r: r,
				g: g,
				b: b,
				hex: R.rgb(r, g, b),
				toString: rgbtoString
			};
			R.is(o, "finite") && (rgb.opacity = o);
			return rgb
		};
	R.color = function(clr) {
		var rgb;
		if(R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
			rgb = R.hsb2rgb(clr);
			clr.r = rgb.r;
			clr.g = rgb.g;
			clr.b = rgb.b;
			clr.hex = rgb.hex
		} else {
			if(R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
				rgb = R.hsl2rgb(clr);
				clr.r = rgb.r;
				clr.g = rgb.g;
				clr.b = rgb.b;
				clr.hex = rgb.hex
			} else {
				if(R.is(clr, "string")) {
					clr = R.getRGB(clr)
				}
				if(R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
					rgb = R.rgb2hsl(clr);
					clr.h = rgb.h;
					clr.s = rgb.s;
					clr.l = rgb.l;
					rgb = R.rgb2hsb(clr);
					clr.v = rgb.b
				} else {
					clr = {
						hex: "none"
					};
					clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1
				}
			}
		}
		clr.toString = rgbtoString;
		return clr
	};
	R.hsb2rgb = function(h, s, v, o) {
		if(this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
			v = h.b;
			s = h.s;
			h = h.h;
			o = h.o
		}
		h *= 360;
		var R, G, B, X, C;
		h = (h % 360) / 60;
		C = v * s;
		X = C * (1 - abs(h % 2 - 1));
		R = G = B = v - C;
		h = ~~h;
		R += [C, X, 0, 0, X, C][h];
		G += [X, C, C, X, 0, 0][h];
		B += [0, 0, X, C, C, X][h];
		return packageRGB(R, G, B, o)
	};
	R.hsl2rgb = function(h, s, l, o) {
		if(this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
			l = h.l;
			s = h.s;
			h = h.h
		}
		if(h > 1 || s > 1 || l > 1) {
			h /= 360;
			s /= 100;
			l /= 100
		}
		h *= 360;
		var R, G, B, X, C;
		h = (h % 360) / 60;
		C = 2 * s * (l < 0.5 ? l : 1 - l);
		X = C * (1 - abs(h % 2 - 1));
		R = G = B = l - C / 2;
		h = ~~h;
		R += [C, X, 0, 0, X, C][h];
		G += [X, C, C, X, 0, 0][h];
		B += [0, 0, X, C, C, X][h];
		return packageRGB(R, G, B, o)
	};
	R.rgb2hsb = function(r, g, b) {
		b = prepareRGB(r, g, b);
		r = b[0];
		g = b[1];
		b = b[2];
		var H, S, V, C;
		V = mmax(r, g, b);
		C = V - mmin(r, g, b);
		H = (C == 0 ? null : V == r ? (g - b) / C : V == g ? (b - r) / C + 2 : (r - g) / C + 4);
		H = ((H + 360) % 6) * 60 / 360;
		S = C == 0 ? 0 : C / V;
		return {
			h: H,
			s: S,
			b: V,
			toString: hsbtoString
		}
	};
	R.rgb2hsl = function(r, g, b) {
		b = prepareRGB(r, g, b);
		r = b[0];
		g = b[1];
		b = b[2];
		var H, S, L, M, m, C;
		M = mmax(r, g, b);
		m = mmin(r, g, b);
		C = M - m;
		H = (C == 0 ? null : M == r ? (g - b) / C : M == g ? (b - r) / C + 2 : (r - g) / C + 4);
		H = ((H + 360) % 6) * 60 / 360;
		L = (M + m) / 2;
		S = (C == 0 ? 0 : L < 0.5 ? C / (2 * L) : C / (2 - 2 * L));
		return {
			h: H,
			s: S,
			l: L,
			toString: hsltoString
		}
	};
	R._path2string = function() {
		return this.join(",").replace(p2s, "$1")
	};

	function repush(array, item) {
		for(var i = 0, ii = array.length; i < ii; i++) {
			if(array[i] === item) {
				return array.push(array.splice(i, 1)[0])
			}
		}
	}

	function cacher(f, scope, postprocessor) {
		function newf() {
			var arg = Array.prototype.slice.call(arguments, 0),
				args = arg.join("\u2400"),
				cache = newf.cache = newf.cache || {},
				count = newf.count = newf.count || [];
			if(cache[has](args)) {
				repush(count, args);
				return postprocessor ? postprocessor(cache[args]) : cache[args]
			}
			count.length >= 1000 && delete cache[count.shift()];
			count.push(args);
			cache[args] = f[apply](scope, arg);
			return postprocessor ? postprocessor(cache[args]) : cache[args]
		}
		return newf
	}
	var preload = R._preload = function(src, f) {
		var img = g.doc.createElement("img");
		img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
		img.onload = function() {
			f.call(this);
			this.onload = null;
			g.doc.body.removeChild(this)
		};
		img.onerror = function() {
			g.doc.body.removeChild(this)
		};
		g.doc.body.appendChild(img);
		img.src = src
	};

	function clrToString() {
		return this.hex
	}
	R.getRGB = cacher(function(colour) {
		if(!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
			return {
				r: -1,
				g: -1,
				b: -1,
				hex: "none",
				error: 1,
				toString: clrToString
			}
		}
		if(colour == "none") {
			return {
				r: -1,
				g: -1,
				b: -1,
				hex: "none",
				toString: clrToString
			}
		}!(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
		var res, red, green, blue, opacity, t, values, rgb = colour.match(colourRegExp);
		if(rgb) {
			if(rgb[2]) {
				blue = toInt(rgb[2].substring(5), 16);
				green = toInt(rgb[2].substring(3, 5), 16);
				red = toInt(rgb[2].substring(1, 3), 16)
			}
			if(rgb[3]) {
				blue = toInt((t = rgb[3].charAt(3)) + t, 16);
				green = toInt((t = rgb[3].charAt(2)) + t, 16);
				red = toInt((t = rgb[3].charAt(1)) + t, 16)
			}
			if(rgb[4]) {
				values = rgb[4][split](commaSpaces);
				red = toFloat(values[0]);
				values[0].slice(-1) == "%" && (red *= 2.55);
				green = toFloat(values[1]);
				values[1].slice(-1) == "%" && (green *= 2.55);
				blue = toFloat(values[2]);
				values[2].slice(-1) == "%" && (blue *= 2.55);
				rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
				values[3] && values[3].slice(-1) == "%" && (opacity /= 100)
			}
			if(rgb[5]) {
				values = rgb[5][split](commaSpaces);
				red = toFloat(values[0]);
				values[0].slice(-1) == "%" && (red *= 2.55);
				green = toFloat(values[1]);
				values[1].slice(-1) == "%" && (green *= 2.55);
				blue = toFloat(values[2]);
				values[2].slice(-1) == "%" && (blue *= 2.55);
				(values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
				rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
				values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
				return R.hsb2rgb(red, green, blue, opacity)
			}
			if(rgb[6]) {
				values = rgb[6][split](commaSpaces);
				red = toFloat(values[0]);
				values[0].slice(-1) == "%" && (red *= 2.55);
				green = toFloat(values[1]);
				values[1].slice(-1) == "%" && (green *= 2.55);
				blue = toFloat(values[2]);
				values[2].slice(-1) == "%" && (blue *= 2.55);
				(values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
				rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
				values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
				return R.hsl2rgb(red, green, blue, opacity)
			}
			rgb = {
				r: red,
				g: green,
				b: blue,
				toString: clrToString
			};
			rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
			R.is(opacity, "finite") && (rgb.opacity = opacity);
			return rgb
		}
		return {
			r: -1,
			g: -1,
			b: -1,
			hex: "none",
			error: 1,
			toString: clrToString
		}
	}, R);
	R.hsb = cacher(function(h, s, b) {
		return R.hsb2rgb(h, s, b).hex
	});
	R.hsl = cacher(function(h, s, l) {
		return R.hsl2rgb(h, s, l).hex
	});
	R.rgb = cacher(function(r, g, b) {
		return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)
	});
	R.getColor = function(value) {
		var start = this.getColor.start = this.getColor.start || {
				h: 0,
				s: 1,
				b: value || 0.75
			},
			rgb = this.hsb2rgb(start.h, start.s, start.b);
		start.h += 0.075;
		if(start.h > 1) {
			start.h = 0;
			start.s -= 0.2;
			start.s <= 0 && (this.getColor.start = {
				h: 0,
				s: 1,
				b: start.b
			})
		}
		return rgb.hex
	};
	R.getColor.reset = function() {
		delete this.start
	};

	function catmullRom2bezier(crp, z) {
		var d = [];
		for(var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
			var p = [{
				x: +crp[i - 2],
				y: +crp[i - 1]
			}, {
				x: +crp[i],
				y: +crp[i + 1]
			}, {
				x: +crp[i + 2],
				y: +crp[i + 3]
			}, {
				x: +crp[i + 4],
				y: +crp[i + 5]
			}];
			if(z) {
				if(!i) {
					p[0] = {
						x: +crp[iLen - 2],
						y: +crp[iLen - 1]
					}
				} else {
					if(iLen - 4 == i) {
						p[3] = {
							x: +crp[0],
							y: +crp[1]
						}
					} else {
						if(iLen - 2 == i) {
							p[2] = {
								x: +crp[0],
								y: +crp[1]
							};
							p[3] = {
								x: +crp[2],
								y: +crp[3]
							}
						}
					}
				}
			} else {
				if(iLen - 4 == i) {
					p[3] = p[2]
				} else {
					if(!i) {
						p[0] = {
							x: +crp[i],
							y: +crp[i + 1]
						}
					}
				}
			}
			d.push(["C", (-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y])
		}
		return d
	}
	R.parsePathString = function(pathString) {
		if(!pathString) {
			return null
		}
		var pth = paths(pathString);
		if(pth.arr) {
			return pathClone(pth.arr)
		}
		var paramCounts = {
				a: 7,
				c: 6,
				h: 1,
				l: 2,
				m: 2,
				r: 4,
				q: 4,
				s: 4,
				t: 2,
				v: 1,
				z: 0
			},
			data = [];
		if(R.is(pathString, array) && R.is(pathString[0], array)) {
			data = pathClone(pathString)
		}
		if(!data.length) {
			Str(pathString).replace(pathCommand, function(a, b, c) {
				var params = [],
					name = b.toLowerCase();
				c.replace(pathValues, function(a, b) {
					b && params.push(+b)
				});
				if(name == "m" && params.length > 2) {
					data.push([b][concat](params.splice(0, 2)));
					name = "l";
					b = b == "m" ? "l" : "L"
				}
				if(name == "r") {
					data.push([b][concat](params))
				} else {
					while(params.length >= paramCounts[name]) {
						data.push([b][concat](params.splice(0, paramCounts[name])));
						if(!paramCounts[name]) {
							break
						}
					}
				}
			})
		}
		data.toString = R._path2string;
		pth.arr = pathClone(data);
		return data
	};
	R.parseTransformString = cacher(function(TString) {
		if(!TString) {
			return null
		}
		var paramCounts = {
				r: 3,
				s: 4,
				t: 2,
				m: 6
			},
			data = [];
		if(R.is(TString, array) && R.is(TString[0], array)) {
			data = pathClone(TString)
		}
		if(!data.length) {
			Str(TString).replace(tCommand, function(a, b, c) {
				var params = [],
					name = lowerCase.call(b);
				c.replace(pathValues, function(a, b) {
					b && params.push(+b)
				});
				data.push([b][concat](params))
			})
		}
		data.toString = R._path2string;
		return data
	});
	var paths = function(ps) {
		var p = paths.ps = paths.ps || {};
		if(p[ps]) {
			p[ps].sleep = 100
		} else {
			p[ps] = {
				sleep: 100
			}
		}
		setTimeout(function() {
			for(var key in p) {
				if(p[has](key) && key != ps) {
					p[key].sleep--;
					!p[key].sleep && delete p[key]
				}
			}
		});
		return p[ps]
	};
	R.findDotsAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
		var t1 = 1 - t,
			t13 = pow(t1, 3),
			t12 = pow(t1, 2),
			t2 = t * t,
			t3 = t2 * t,
			x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
			y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
			mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
			my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
			nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
			ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
			ax = t1 * p1x + t * c1x,
			ay = t1 * p1y + t * c1y,
			cx = t1 * c2x + t * p2x,
			cy = t1 * c2y + t * p2y,
			alpha = (90 - math.atan2(mx - nx, my - ny) * 180 / PI);
		(mx > nx || my < ny) && (alpha += 180);
		return {
			x: x,
			y: y,
			m: {
				x: mx,
				y: my
			},
			n: {
				x: nx,
				y: ny
			},
			start: {
				x: ax,
				y: ay
			},
			end: {
				x: cx,
				y: cy
			},
			alpha: alpha
		}
	};
	R.bezierBBox = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
		if(!R.is(p1x, "array")) {
			p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y]
		}
		var bbox = curveDim.apply(null, p1x);
		return {
			x: bbox.min.x,
			y: bbox.min.y,
			x2: bbox.max.x,
			y2: bbox.max.y,
			width: bbox.max.x - bbox.min.x,
			height: bbox.max.y - bbox.min.y
		}
	};
	R.isPointInsideBBox = function(bbox, x, y) {
		return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2
	};
	R.isBBoxIntersect = function(bbox1, bbox2) {
		var i = R.isPointInsideBBox;
		return i(bbox2, bbox1.x, bbox1.y) || i(bbox2, bbox1.x2, bbox1.y) || i(bbox2, bbox1.x, bbox1.y2) || i(bbox2, bbox1.x2, bbox1.y2) || i(bbox1, bbox2.x, bbox2.y) || i(bbox1, bbox2.x2, bbox2.y) || i(bbox1, bbox2.x, bbox2.y2) || i(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y)
	};

	function base3(t, p1, p2, p3, p4) {
		var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
			t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
		return t * t2 - 3 * p1 + 3 * p2
	}

	function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
		if(z == null) {
			z = 1
		}
		z = z > 1 ? 1 : z < 0 ? 0 : z;
		var z2 = z / 2,
			n = 12,
			Tvalues = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816],
			Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
			sum = 0;
		for(var i = 0; i < n; i++) {
			var ct = z2 * Tvalues[i] + z2,
				xbase = base3(ct, x1, x2, x3, x4),
				ybase = base3(ct, y1, y2, y3, y4),
				comb = xbase * xbase + ybase * ybase;
			sum += Cvalues[i] * math.sqrt(comb)
		}
		return z2 * sum
	}

	function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
		if(ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
			return
		}
		var t = 1,
			step = t / 2,
			t2 = t - step,
			l, e = 0.01;
		l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
		while(abs(l - ll) > e) {
			step /= 2;
			t2 += (l < ll ? 1 : -1) * step;
			l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2)
		}
		return t2
	}

	function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
		if(mmax(x1, x2) < mmin(x3, x4) || mmin(x1, x2) > mmax(x3, x4) || mmax(y1, y2) < mmin(y3, y4) || mmin(y1, y2) > mmax(y3, y4)) {
			return
		}
		var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
			ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
			denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if(!denominator) {
			return
		}
		var px = nx / denominator,
			py = ny / denominator,
			px2 = +px.toFixed(2),
			py2 = +py.toFixed(2);
		if(px2 < +mmin(x1, x2).toFixed(2) || px2 > +mmax(x1, x2).toFixed(2) || px2 < +mmin(x3, x4).toFixed(2) || px2 > +mmax(x3, x4).toFixed(2) || py2 < +mmin(y1, y2).toFixed(2) || py2 > +mmax(y1, y2).toFixed(2) || py2 < +mmin(y3, y4).toFixed(2) || py2 > +mmax(y3, y4).toFixed(2)) {
			return
		}
		return {
			x: px,
			y: py
		}
	}

	function inter(bez1, bez2) {
		return interHelper(bez1, bez2)
	}

	function interCount(bez1, bez2) {
		return interHelper(bez1, bez2, 1)
	}

	function interHelper(bez1, bez2, justCount) {
		var bbox1 = R.bezierBBox(bez1),
			bbox2 = R.bezierBBox(bez2);
		if(!R.isBBoxIntersect(bbox1, bbox2)) {
			return justCount ? 0 : []
		}
		var l1 = bezlen.apply(0, bez1),
			l2 = bezlen.apply(0, bez2),
			n1 = ~~(l1 / 5),
			n2 = ~~(l2 / 5),
			dots1 = [],
			dots2 = [],
			xy = {},
			res = justCount ? 0 : [];
		for(var i = 0; i < n1 + 1; i++) {
			var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
			dots1.push({
				x: p.x,
				y: p.y,
				t: i / n1
			})
		}
		for(i = 0; i < n2 + 1; i++) {
			p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
			dots2.push({
				x: p.x,
				y: p.y,
				t: i / n2
			})
		}
		for(i = 0; i < n1; i++) {
			for(var j = 0; j < n2; j++) {
				var di = dots1[i],
					di1 = dots1[i + 1],
					dj = dots2[j],
					dj1 = dots2[j + 1],
					ci = abs(di1.x - di.x) < 0.001 ? "y" : "x",
					cj = abs(dj1.x - dj.x) < 0.001 ? "y" : "x",
					is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
				if(is) {
					if(xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
						continue
					}
					xy[is.x.toFixed(4)] = is.y.toFixed(4);
					var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
						t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
					if(t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
						if(justCount) {
							res++
						} else {
							res.push({
								x: is.x,
								y: is.y,
								t1: t1,
								t2: t2
							})
						}
					}
				}
			}
		}
		return res
	}
	R.pathIntersection = function(path1, path2) {
		return interPathHelper(path1, path2)
	};
	R.pathIntersectionNumber = function(path1, path2) {
		return interPathHelper(path1, path2, 1)
	};

	function interPathHelper(path1, path2, justCount) {
		path1 = R._path2curve(path1);
		path2 = R._path2curve(path2);
		var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2, res = justCount ? 0 : [];
		for(var i = 0, ii = path1.length; i < ii; i++) {
			var pi = path1[i];
			if(pi[0] == "M") {
				x1 = x1m = pi[1];
				y1 = y1m = pi[2]
			} else {
				if(pi[0] == "C") {
					bez1 = [x1, y1].concat(pi.slice(1));
					x1 = bez1[6];
					y1 = bez1[7]
				} else {
					bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
					x1 = x1m;
					y1 = y1m
				}
				for(var j = 0, jj = path2.length; j < jj; j++) {
					var pj = path2[j];
					if(pj[0] == "M") {
						x2 = x2m = pj[1];
						y2 = y2m = pj[2]
					} else {
						if(pj[0] == "C") {
							bez2 = [x2, y2].concat(pj.slice(1));
							x2 = bez2[6];
							y2 = bez2[7]
						} else {
							bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
							x2 = x2m;
							y2 = y2m
						}
						var intr = interHelper(bez1, bez2, justCount);
						if(justCount) {
							res += intr
						} else {
							for(var k = 0, kk = intr.length; k < kk; k++) {
								intr[k].segment1 = i;
								intr[k].segment2 = j;
								intr[k].bez1 = bez1;
								intr[k].bez2 = bez2
							}
							res = res.concat(intr)
						}
					}
				}
			}
		}
		return res
	}
	R.isPointInsidePath = function(path, x, y) {
		var bbox = R.pathBBox(path);
		return R.isPointInsideBBox(bbox, x, y) && interPathHelper(path, [
			["M", x, y],
			["H", bbox.x2 + 10]
		], 1) % 2 == 1
	};
	R._removedFactory = function(methodname) {
		return function() {
			eve("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object", methodname)
		}
	};
	var pathDimensions = R.pathBBox = function(path) {
			var pth = paths(path);
			if(pth.bbox) {
				return pth.bbox
			}
			if(!path) {
				return {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					x2: 0,
					y2: 0
				}
			}
			path = path2curve(path);
			var x = 0,
				y = 0,
				X = [],
				Y = [],
				p;
			for(var i = 0, ii = path.length; i < ii; i++) {
				p = path[i];
				if(p[0] == "M") {
					x = p[1];
					y = p[2];
					X.push(x);
					Y.push(y)
				} else {
					var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
					X = X[concat](dim.min.x, dim.max.x);
					Y = Y[concat](dim.min.y, dim.max.y);
					x = p[5];
					y = p[6]
				}
			}
			var xmin = mmin[apply](0, X),
				ymin = mmin[apply](0, Y),
				xmax = mmax[apply](0, X),
				ymax = mmax[apply](0, Y),
				bb = {
					x: xmin,
					y: ymin,
					x2: xmax,
					y2: ymax,
					width: xmax - xmin,
					height: ymax - ymin
				};
			pth.bbox = clone(bb);
			return bb
		},
		pathClone = function(pathArray) {
			var res = clone(pathArray);
			res.toString = R._path2string;
			return res
		},
		pathToRelative = R._pathToRelative = function(pathArray) {
			var pth = paths(pathArray);
			if(pth.rel) {
				return pathClone(pth.rel)
			}
			if(!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) {
				pathArray = R.parsePathString(pathArray)
			}
			var res = [],
				x = 0,
				y = 0,
				mx = 0,
				my = 0,
				start = 0;
			if(pathArray[0][0] == "M") {
				x = pathArray[0][1];
				y = pathArray[0][2];
				mx = x;
				my = y;
				start++;
				res.push(["M", x, y])
			}
			for(var i = start, ii = pathArray.length; i < ii; i++) {
				var r = res[i] = [],
					pa = pathArray[i];
				if(pa[0] != lowerCase.call(pa[0])) {
					r[0] = lowerCase.call(pa[0]);
					switch(r[0]) {
						case "a":
							r[1] = pa[1];
							r[2] = pa[2];
							r[3] = pa[3];
							r[4] = pa[4];
							r[5] = pa[5];
							r[6] = +(pa[6] - x).toFixed(3);
							r[7] = +(pa[7] - y).toFixed(3);
							break;
						case "v":
							r[1] = +(pa[1] - y).toFixed(3);
							break;
						case "m":
							mx = pa[1];
							my = pa[2];
						default:
							for(var j = 1, jj = pa.length; j < jj; j++) {
								r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3)
							}
					}
				} else {
					r = res[i] = [];
					if(pa[0] == "m") {
						mx = pa[1] + x;
						my = pa[2] + y
					}
					for(var k = 0, kk = pa.length; k < kk; k++) {
						res[i][k] = pa[k]
					}
				}
				var len = res[i].length;
				switch(res[i][0]) {
					case "z":
						x = mx;
						y = my;
						break;
					case "h":
						x += +res[i][len - 1];
						break;
					case "v":
						y += +res[i][len - 1];
						break;
					default:
						x += +res[i][len - 2];
						y += +res[i][len - 1]
				}
			}
			res.toString = R._path2string;
			pth.rel = pathClone(res);
			return res
		},
		pathToAbsolute = R._pathToAbsolute = function(pathArray) {
			var pth = paths(pathArray);
			if(pth.abs) {
				return pathClone(pth.abs)
			}
			if(!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) {
				pathArray = R.parsePathString(pathArray)
			}
			if(!pathArray || !pathArray.length) {
				return [
					["M", 0, 0]
				]
			}
			var res = [],
				x = 0,
				y = 0,
				mx = 0,
				my = 0,
				start = 0;
			if(pathArray[0][0] == "M") {
				x = +pathArray[0][1];
				y = +pathArray[0][2];
				mx = x;
				my = y;
				start++;
				res[0] = ["M", x, y]
			}
			var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
			for(var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
				res.push(r = []);
				pa = pathArray[i];
				if(pa[0] != upperCase.call(pa[0])) {
					r[0] = upperCase.call(pa[0]);
					switch(r[0]) {
						case "A":
							r[1] = pa[1];
							r[2] = pa[2];
							r[3] = pa[3];
							r[4] = pa[4];
							r[5] = pa[5];
							r[6] = +(pa[6] + x);
							r[7] = +(pa[7] + y);
							break;
						case "V":
							r[1] = +pa[1] + y;
							break;
						case "H":
							r[1] = +pa[1] + x;
							break;
						case "R":
							var dots = [x, y][concat](pa.slice(1));
							for(var j = 2, jj = dots.length; j < jj; j++) {
								dots[j] = +dots[j] + x;
								dots[++j] = +dots[j] + y
							}
							res.pop();
							res = res[concat](catmullRom2bezier(dots, crz));
							break;
						case "M":
							mx = +pa[1] + x;
							my = +pa[2] + y;
						default:
							for(j = 1, jj = pa.length; j < jj; j++) {
								r[j] = +pa[j] + ((j % 2) ? x : y)
							}
					}
				} else {
					if(pa[0] == "R") {
						dots = [x, y][concat](pa.slice(1));
						res.pop();
						res = res[concat](catmullRom2bezier(dots, crz));
						r = ["R"][concat](pa.slice(-2))
					} else {
						for(var k = 0, kk = pa.length; k < kk; k++) {
							r[k] = pa[k]
						}
					}
				}
				switch(r[0]) {
					case "Z":
						x = mx;
						y = my;
						break;
					case "H":
						x = r[1];
						break;
					case "V":
						y = r[1];
						break;
					case "M":
						mx = r[r.length - 2];
						my = r[r.length - 1];
					default:
						x = r[r.length - 2];
						y = r[r.length - 1]
				}
			}
			res.toString = R._path2string;
			pth.abs = pathClone(res);
			return res
		},
		l2c = function(x1, y1, x2, y2) {
			return [x1, y1, x2, y2, x2, y2]
		},
		q2c = function(x1, y1, ax, ay, x2, y2) {
			var _13 = 1 / 3,
				_23 = 2 / 3;
			return [_13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2]
		},
		a2c = function(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
			var _120 = PI * 120 / 180,
				rad = PI / 180 * (+angle || 0),
				res = [],
				xy, rotate = cacher(function(x, y, rad) {
					var X = x * math.cos(rad) - y * math.sin(rad),
						Y = x * math.sin(rad) + y * math.cos(rad);
					return {
						x: X,
						y: Y
					}
				});
			if(!recursive) {
				xy = rotate(x1, y1, -rad);
				x1 = xy.x;
				y1 = xy.y;
				xy = rotate(x2, y2, -rad);
				x2 = xy.x;
				y2 = xy.y;
				var cos = math.cos(PI / 180 * angle),
					sin = math.sin(PI / 180 * angle),
					x = (x1 - x2) / 2,
					y = (y1 - y2) / 2;
				var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
				if(h > 1) {
					h = math.sqrt(h);
					rx = h * rx;
					ry = h * ry
				}
				var rx2 = rx * rx,
					ry2 = ry * ry,
					k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
					cx = k * rx * y / ry + (x1 + x2) / 2,
					cy = k * -ry * x / rx + (y1 + y2) / 2,
					f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
					f2 = math.asin(((y2 - cy) / ry).toFixed(9));
				f1 = x1 < cx ? PI - f1 : f1;
				f2 = x2 < cx ? PI - f2 : f2;
				f1 < 0 && (f1 = PI * 2 + f1);
				f2 < 0 && (f2 = PI * 2 + f2);
				if(sweep_flag && f1 > f2) {
					f1 = f1 - PI * 2
				}
				if(!sweep_flag && f2 > f1) {
					f2 = f2 - PI * 2
				}
			} else {
				f1 = recursive[0];
				f2 = recursive[1];
				cx = recursive[2];
				cy = recursive[3]
			}
			var df = f2 - f1;
			if(abs(df) > _120) {
				var f2old = f2,
					x2old = x2,
					y2old = y2;
				f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
				x2 = cx + rx * math.cos(f2);
				y2 = cy + ry * math.sin(f2);
				res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy])
			}
			df = f2 - f1;
			var c1 = math.cos(f1),
				s1 = math.sin(f1),
				c2 = math.cos(f2),
				s2 = math.sin(f2),
				t = math.tan(df / 4),
				hx = 4 / 3 * rx * t,
				hy = 4 / 3 * ry * t,
				m1 = [x1, y1],
				m2 = [x1 + hx * s1, y1 - hy * c1],
				m3 = [x2 + hx * s2, y2 - hy * c2],
				m4 = [x2, y2];
			m2[0] = 2 * m1[0] - m2[0];
			m2[1] = 2 * m1[1] - m2[1];
			if(recursive) {
				return [m2, m3, m4][concat](res)
			} else {
				res = [m2, m3, m4][concat](res).join()[split](",");
				var newres = [];
				for(var i = 0, ii = res.length; i < ii; i++) {
					newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x
				}
				return newres
			}
		},
		findDotAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
			var t1 = 1 - t;
			return {
				x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
				y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
			}
		},
		curveDim = cacher(function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
			var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
				b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
				c = p1x - c1x,
				t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
				t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
				y = [p1y, p2y],
				x = [p1x, p2x],
				dot;
			abs(t1) > "1e12" && (t1 = 0.5);
			abs(t2) > "1e12" && (t2 = 0.5);
			if(t1 > 0 && t1 < 1) {
				dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
				x.push(dot.x);
				y.push(dot.y)
			}
			if(t2 > 0 && t2 < 1) {
				dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
				x.push(dot.x);
				y.push(dot.y)
			}
			a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
			b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
			c = p1y - c1y;
			t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
			t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
			abs(t1) > "1e12" && (t1 = 0.5);
			abs(t2) > "1e12" && (t2 = 0.5);
			if(t1 > 0 && t1 < 1) {
				dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
				x.push(dot.x);
				y.push(dot.y)
			}
			if(t2 > 0 && t2 < 1) {
				dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
				x.push(dot.x);
				y.push(dot.y)
			}
			return {
				min: {
					x: mmin[apply](0, x),
					y: mmin[apply](0, y)
				},
				max: {
					x: mmax[apply](0, x),
					y: mmax[apply](0, y)
				}
			}
		}),
		path2curve = R._path2curve = cacher(function(path, path2) {
			var pth = !path2 && paths(path);
			if(!path2 && pth.curve) {
				return pathClone(pth.curve)
			}
			var p = pathToAbsolute(path),
				p2 = path2 && pathToAbsolute(path2),
				attrs = {
					x: 0,
					y: 0,
					bx: 0,
					by: 0,
					X: 0,
					Y: 0,
					qx: null,
					qy: null
				},
				attrs2 = {
					x: 0,
					y: 0,
					bx: 0,
					by: 0,
					X: 0,
					Y: 0,
					qx: null,
					qy: null
				},
				processPath = function(path, d) {
					var nx, ny;
					if(!path) {
						return ["C", d.x, d.y, d.x, d.y, d.x, d.y]
					}!(path[0] in {
						T: 1,
						Q: 1
					}) && (d.qx = d.qy = null);
					switch(path[0]) {
						case "M":
							d.X = path[1];
							d.Y = path[2];
							break;
						case "A":
							path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
							break;
						case "S":
							nx = d.x + (d.x - (d.bx || d.x));
							ny = d.y + (d.y - (d.by || d.y));
							path = ["C", nx, ny][concat](path.slice(1));
							break;
						case "T":
							d.qx = d.x + (d.x - (d.qx || d.x));
							d.qy = d.y + (d.y - (d.qy || d.y));
							path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
							break;
						case "Q":
							d.qx = path[1];
							d.qy = path[2];
							path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
							break;
						case "L":
							path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
							break;
						case "H":
							path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
							break;
						case "V":
							path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
							break;
						case "Z":
							path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
							break
					}
					return path
				},
				fixArc = function(pp, i) {
					if(pp[i].length > 7) {
						pp[i].shift();
						var pi = pp[i];
						while(pi.length) {
							pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)))
						}
						pp.splice(i, 1);
						ii = mmax(p.length, p2 && p2.length || 0)
					}
				},
				fixM = function(path1, path2, a1, a2, i) {
					if(path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
						path2.splice(i, 0, ["M", a2.x, a2.y]);
						a1.bx = 0;
						a1.by = 0;
						a1.x = path1[i][1];
						a1.y = path1[i][2];
						ii = mmax(p.length, p2 && p2.length || 0)
					}
				};
			for(var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
				p[i] = processPath(p[i], attrs);
				fixArc(p, i);
				p2 && (p2[i] = processPath(p2[i], attrs2));
				p2 && fixArc(p2, i);
				fixM(p, p2, attrs, attrs2, i);
				fixM(p2, p, attrs2, attrs, i);
				var seg = p[i],
					seg2 = p2 && p2[i],
					seglen = seg.length,
					seg2len = p2 && seg2.length;
				attrs.x = seg[seglen - 2];
				attrs.y = seg[seglen - 1];
				attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
				attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
				attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
				attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
				attrs2.x = p2 && seg2[seg2len - 2];
				attrs2.y = p2 && seg2[seg2len - 1]
			}
			if(!p2) {
				pth.curve = pathClone(p)
			}
			return p2 ? [p, p2] : p
		}, null, pathClone),
		parseDots = R._parseDots = cacher(function(gradient) {
			var dots = [];
			for(var i = 0, ii = gradient.length; i < ii; i++) {
				var dot = {},
					par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
				dot.color = R.getRGB(par[1]);
				if(dot.color.error) {
					return null
				}
				dot.color = dot.color.hex;
				par[2] && (dot.offset = par[2] + "%");
				dots.push(dot)
			}
			for(i = 1, ii = dots.length - 1; i < ii; i++) {
				if(!dots[i].offset) {
					var start = toFloat(dots[i - 1].offset || 0),
						end = 0;
					for(var j = i + 1; j < ii; j++) {
						if(dots[j].offset) {
							end = dots[j].offset;
							break
						}
					}
					if(!end) {
						end = 100;
						j = ii
					}
					end = toFloat(end);
					var d = (end - start) / (j - i + 1);
					for(; i < j; i++) {
						start += d;
						dots[i].offset = start + "%"
					}
				}
			}
			return dots
		}),
		tear = R._tear = function(el, paper) {
			el == paper.top && (paper.top = el.prev);
			el == paper.bottom && (paper.bottom = el.next);
			el.next && (el.next.prev = el.prev);
			el.prev && (el.prev.next = el.next)
		},
		tofront = R._tofront = function(el, paper) {
			if(paper.top === el) {
				return
			}
			tear(el, paper);
			el.next = null;
			el.prev = paper.top;
			paper.top.next = el;
			paper.top = el
		},
		toback = R._toback = function(el, paper) {
			if(paper.bottom === el) {
				return
			}
			tear(el, paper);
			el.next = paper.bottom;
			el.prev = null;
			paper.bottom.prev = el;
			paper.bottom = el
		},
		insertafter = R._insertafter = function(el, el2, paper) {
			tear(el, paper);
			el2 == paper.top && (paper.top = el);
			el2.next && (el2.next.prev = el);
			el.next = el2.next;
			el.prev = el2;
			el2.next = el
		},
		insertbefore = R._insertbefore = function(el, el2, paper) {
			tear(el, paper);
			el2 == paper.bottom && (paper.bottom = el);
			el2.prev && (el2.prev.next = el);
			el.prev = el2.prev;
			el2.prev = el;
			el.next = el2
		},
		toMatrix = R.toMatrix = function(path, transform) {
			var bb = pathDimensions(path),
				el = {
					_: {
						transform: E
					},
					getBBox: function() {
						return bb
					}
				};
			extractTransform(el, transform);
			return el.matrix
		},
		transformPath = R.transformPath = function(path, transform) {
			return mapPath(path, toMatrix(path, transform))
		},
		extractTransform = R._extractTransform = function(el, tstr) {
			if(tstr == null) {
				return el._.transform
			}
			tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
			var tdata = R.parseTransformString(tstr),
				deg = 0,
				dx = 0,
				dy = 0,
				sx = 1,
				sy = 1,
				_ = el._,
				m = new Matrix;
			_.transform = tdata || [];
			if(tdata) {
				for(var i = 0, ii = tdata.length; i < ii; i++) {
					var t = tdata[i],
						tlen = t.length,
						command = Str(t[0]).toLowerCase(),
						absolute = t[0] != command,
						inver = absolute ? m.invert() : 0,
						x1, y1, x2, y2, bb;
					if(command == "t" && tlen == 3) {
						if(absolute) {
							x1 = inver.x(0, 0);
							y1 = inver.y(0, 0);
							x2 = inver.x(t[1], t[2]);
							y2 = inver.y(t[1], t[2]);
							m.translate(x2 - x1, y2 - y1)
						} else {
							m.translate(t[1], t[2])
						}
					} else {
						if(command == "r") {
							if(tlen == 2) {
								bb = bb || el.getBBox(1);
								m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
								deg += t[1]
							} else {
								if(tlen == 4) {
									if(absolute) {
										x2 = inver.x(t[2], t[3]);
										y2 = inver.y(t[2], t[3]);
										m.rotate(t[1], x2, y2)
									} else {
										m.rotate(t[1], t[2], t[3])
									}
									deg += t[1]
								}
							}
						} else {
							if(command == "s") {
								if(tlen == 2 || tlen == 3) {
									bb = bb || el.getBBox(1);
									m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
									sx *= t[1];
									sy *= t[tlen - 1]
								} else {
									if(tlen == 5) {
										if(absolute) {
											x2 = inver.x(t[3], t[4]);
											y2 = inver.y(t[3], t[4]);
											m.scale(t[1], t[2], x2, y2)
										} else {
											m.scale(t[1], t[2], t[3], t[4])
										}
										sx *= t[1];
										sy *= t[2]
									}
								}
							} else {
								if(command == "m" && tlen == 7) {
									m.add(t[1], t[2], t[3], t[4], t[5], t[6])
								}
							}
						}
					}
					_.dirtyT = 1;
					el.matrix = m
				}
			}
			el.matrix = m;
			_.sx = sx;
			_.sy = sy;
			_.deg = deg;
			_.dx = dx = m.e;
			_.dy = dy = m.f;
			if(sx == 1 && sy == 1 && !deg && _.bbox) {
				_.bbox.x += +dx;
				_.bbox.y += +dy
			} else {
				_.dirtyT = 1
			}
		},
		getEmpty = function(item) {
			var l = item[0];
			switch(l.toLowerCase()) {
				case "t":
					return [l, 0, 0];
				case "m":
					return [l, 1, 0, 0, 1, 0, 0];
				case "r":
					if(item.length == 4) {
						return [l, 0, item[2], item[3]]
					} else {
						return [l, 0]
					}
				case "s":
					if(item.length == 5) {
						return [l, 1, 1, item[3], item[4]]
					} else {
						if(item.length == 3) {
							return [l, 1, 1]
						} else {
							return [l, 1]
						}
					}
			}
		},
		equaliseTransform = R._equaliseTransform = function(t1, t2) {
			t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
			t1 = R.parseTransformString(t1) || [];
			t2 = R.parseTransformString(t2) || [];
			var maxlength = mmax(t1.length, t2.length),
				from = [],
				to = [],
				i = 0,
				j, jj, tt1, tt2;
			for(; i < maxlength; i++) {
				tt1 = t1[i] || getEmpty(t2[i]);
				tt2 = t2[i] || getEmpty(tt1);
				if((tt1[0] != tt2[0]) || (tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3])) || (tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4]))) {
					return
				}
				from[i] = [];
				to[i] = [];
				for(j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
					j in tt1 && (from[i][j] = tt1[j]);
					j in tt2 && (to[i][j] = tt2[j])
				}
			}
			return {
				from: from,
				to: to
			}
		};
	R._getContainer = function(x, y, w, h) {
		var container;
		container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
		if(container == null) {
			return
		}
		if(container.tagName) {
			if(y == null) {
				return {
					container: container,
					width: container.style.pixelWidth || container.offsetWidth,
					height: container.style.pixelHeight || container.offsetHeight
				}
			} else {
				return {
					container: container,
					width: y,
					height: w
				}
			}
		}
		return {
			container: 1,
			x: x,
			y: y,
			width: w,
			height: h
		}
	};
	R.pathToRelative = pathToRelative;
	R._engine = {};
	R.path2curve = path2curve;
	R.matrix = function(a, b, c, d, e, f) {
		return new Matrix(a, b, c, d, e, f)
	};

	function Matrix(a, b, c, d, e, f) {
		if(a != null) {
			this.a = +a;
			this.b = +b;
			this.c = +c;
			this.d = +d;
			this.e = +e;
			this.f = +f
		} else {
			this.a = 1;
			this.b = 0;
			this.c = 0;
			this.d = 1;
			this.e = 0;
			this.f = 0
		}
	}(function(matrixproto) {
		matrixproto.add = function(a, b, c, d, e, f) {
			var out = [
					[],
					[],
					[]
				],
				m = [
					[this.a, this.c, this.e],
					[this.b, this.d, this.f],
					[0, 0, 1]
				],
				matrix = [
					[a, c, e],
					[b, d, f],
					[0, 0, 1]
				],
				x, y, z, res;
			if(a && a instanceof Matrix) {
				matrix = [
					[a.a, a.c, a.e],
					[a.b, a.d, a.f],
					[0, 0, 1]
				]
			}
			for(x = 0; x < 3; x++) {
				for(y = 0; y < 3; y++) {
					res = 0;
					for(z = 0; z < 3; z++) {
						res += m[x][z] * matrix[z][y]
					}
					out[x][y] = res
				}
			}
			this.a = out[0][0];
			this.b = out[1][0];
			this.c = out[0][1];
			this.d = out[1][1];
			this.e = out[0][2];
			this.f = out[1][2]
		};
		matrixproto.invert = function() {
			var me = this,
				x = me.a * me.d - me.b * me.c;
			return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x)
		};
		matrixproto.clone = function() {
			return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f)
		};
		matrixproto.translate = function(x, y) {
			this.add(1, 0, 0, 1, x, y)
		};
		matrixproto.scale = function(x, y, cx, cy) {
			y == null && (y = x);
			(cx || cy) && this.add(1, 0, 0, 1, cx, cy);
			this.add(x, 0, 0, y, 0, 0);
			(cx || cy) && this.add(1, 0, 0, 1, -cx, -cy)
		};
		matrixproto.rotate = function(a, x, y) {
			a = R.rad(a);
			x = x || 0;
			y = y || 0;
			var cos = +math.cos(a).toFixed(9),
				sin = +math.sin(a).toFixed(9);
			this.add(cos, sin, -sin, cos, x, y);
			this.add(1, 0, 0, 1, -x, -y)
		};
		matrixproto.x = function(x, y) {
			return x * this.a + y * this.c + this.e
		};
		matrixproto.y = function(x, y) {
			return x * this.b + y * this.d + this.f
		};
		matrixproto.get = function(i) {
			return +this[Str.fromCharCode(97 + i)].toFixed(4)
		};
		matrixproto.toString = function() {
			return R.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
		};
		matrixproto.toFilter = function() {
			return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
		};
		matrixproto.offset = function() {
			return [this.e.toFixed(4), this.f.toFixed(4)]
		};

		function norm(a) {
			return a[0] * a[0] + a[1] * a[1]
		}

		function normalize(a) {
			var mag = math.sqrt(norm(a));
			a[0] && (a[0] /= mag);
			a[1] && (a[1] /= mag)
		}
		matrixproto.split = function() {
			var out = {};
			out.dx = this.e;
			out.dy = this.f;
			var row = [
				[this.a, this.c],
				[this.b, this.d]
			];
			out.scalex = math.sqrt(norm(row[0]));
			normalize(row[0]);
			out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
			row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];
			out.scaley = math.sqrt(norm(row[1]));
			normalize(row[1]);
			out.shear /= out.scaley;
			var sin = -row[0][1],
				cos = row[1][1];
			if(cos < 0) {
				out.rotate = R.deg(math.acos(cos));
				if(sin < 0) {
					out.rotate = 360 - out.rotate
				}
			} else {
				out.rotate = R.deg(math.asin(sin))
			}
			out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
			out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
			out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
			return out
		};
		matrixproto.toTransformString = function(shorter) {
			var s = shorter || this[split]();
			if(s.isSimple) {
				s.scalex = +s.scalex.toFixed(4);
				s.scaley = +s.scaley.toFixed(4);
				s.rotate = +s.rotate.toFixed(4);
				return(s.dx || s.dy ? "t" + [s.dx, s.dy] : E) + (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) + (s.rotate ? "r" + [s.rotate, 0, 0] : E)
			} else {
				return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
			}
		}
	})(Matrix.prototype);
	var version = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
	if((navigator.vendor == "Apple Computer, Inc.") && (version && version[1] < 4 || navigator.platform.slice(0, 2) == "iP") || (navigator.vendor == "Google Inc." && version && version[1] < 8)) {
		paperproto.safari = function() {
			var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
				stroke: "none"
			});
			setTimeout(function() {
				rect.remove()
			})
		}
	} else {
		paperproto.safari = fun
	}
	var preventDefault = function() {
			this.returnValue = false
		},
		preventTouch = function() {
			return this.originalEvent.preventDefault()
		},
		stopPropagation = function() {
			this.cancelBubble = true
		},
		stopTouch = function() {
			return this.originalEvent.stopPropagation()
		},
		addEvent = (function() {
			if(g.doc.addEventListener) {
				return function(obj, type, fn, element) {
					var realName = supportsTouch && touchMap[type] ? touchMap[type] : type,
						f = function(e) {
							var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
								scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
								x = e.clientX + scrollX,
								y = e.clientY + scrollY;
							if(supportsTouch && touchMap[has](type)) {
								for(var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
									if(e.targetTouches[i].target == obj) {
										var olde = e;
										e = e.targetTouches[i];
										e.originalEvent = olde;
										e.preventDefault = preventTouch;
										e.stopPropagation = stopTouch;
										break
									}
								}
							}
							return fn.call(element, e, x, y)
						};
					obj.addEventListener(realName, f, false);
					return function() {
						obj.removeEventListener(realName, f, false);
						return true
					}
				}
			} else {
				if(g.doc.attachEvent) {
					return function(obj, type, fn, element) {
						var f = function(e) {
							e = e || g.win.event;
							var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
								scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
								x = e.clientX + scrollX,
								y = e.clientY + scrollY;
							e.preventDefault = e.preventDefault || preventDefault;
							e.stopPropagation = e.stopPropagation || stopPropagation;
							return fn.call(element, e, x, y)
						};
						obj.attachEvent("on" + type, f);
						var detacher = function() {
							obj.detachEvent("on" + type, f);
							return true
						};
						return detacher
					}
				}
			}
		})(),
		drag = [],
		dragMove = function(e) {
			var x = e.clientX,
				y = e.clientY,
				scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
				scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
				dragi, j = drag.length;
			while(j--) {
				dragi = drag[j];
				if(supportsTouch) {
					var i = e.touches.length,
						touch;
					while(i--) {
						touch = e.touches[i];
						if(touch.identifier == dragi.el._drag.id) {
							x = touch.clientX;
							y = touch.clientY;
							(e.originalEvent ? e.originalEvent : e).preventDefault();
							break
						}
					}
				} else {
					e.preventDefault()
				}
				var node = dragi.el.node,
					o, next = node.nextSibling,
					parent = node.parentNode,
					display = node.style.display;
				g.win.opera && parent.removeChild(node);
				node.style.display = "none";
				o = dragi.el.paper.getElementByPoint(x, y);
				node.style.display = display;
				g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
				o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
				x += scrollX;
				y += scrollY;
				eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e)
			}
		},
		dragUp = function(e) {
			R.unmousemove(dragMove).unmouseup(dragUp);
			var i = drag.length,
				dragi;
			while(i--) {
				dragi = drag[i];
				dragi.el._drag = {};
				eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e)
			}
			drag = []
		},
		elproto = R.el = {};
	for(var i = events.length; i--;) {
		(function(eventName) {
			R[eventName] = elproto[eventName] = function(fn, scope) {
				if(R.is(fn, "function")) {
					this.events = this.events || [];
					this.events.push({
						name: eventName,
						f: fn,
						unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)
					})
				}
				return this
			};
			R["un" + eventName] = elproto["un" + eventName] = function(fn) {
				var events = this.events || [],
					l = events.length;
				while(l--) {
					if(events[l].name == eventName && events[l].f == fn) {
						events[l].unbind();
						events.splice(l, 1);
						!events.length && delete this.events;
						return this
					}
				}
				return this
			}
		})(events[i])
	}
	elproto.data = function(key, value) {
		var data = eldata[this.id] = eldata[this.id] || {};
		if(arguments.length == 1) {
			if(R.is(key, "object")) {
				for(var i in key) {
					if(key[has](i)) {
						this.data(i, key[i])
					}
				}
				return this
			}
			eve("raphael.data.get." + this.id, this, data[key], key);
			return data[key]
		}
		data[key] = value;
		eve("raphael.data.set." + this.id, this, value, key);
		return this
	};
	elproto.removeData = function(key) {
		if(key == null) {
			eldata[this.id] = {}
		} else {
			eldata[this.id] && delete eldata[this.id][key]
		}
		return this
	};
	elproto.hover = function(f_in, f_out, scope_in, scope_out) {
		return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in)
	};
	elproto.unhover = function(f_in, f_out) {
		return this.unmouseover(f_in).unmouseout(f_out)
	};
	var draggable = [];
	elproto.drag = function(onmove, onstart, onend, move_scope, start_scope, end_scope) {
		function start(e) {
			(e.originalEvent || e).preventDefault();
			var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
				scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
			this._drag.x = e.clientX + scrollX;
			this._drag.y = e.clientY + scrollY;
			this._drag.id = e.identifier;
			!drag.length && R.mousemove(dragMove).mouseup(dragUp);
			drag.push({
				el: this,
				move_scope: move_scope,
				start_scope: start_scope,
				end_scope: end_scope
			});
			onstart && eve.on("raphael.drag.start." + this.id, onstart);
			onmove && eve.on("raphael.drag.move." + this.id, onmove);
			onend && eve.on("raphael.drag.end." + this.id, onend);
			eve("raphael.drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e)
		}
		this._drag = {};
		draggable.push({
			el: this,
			start: start
		});
		this.mousedown(start);
		return this
	};
	elproto.onDragOver = function(f) {
		f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id)
	};
	elproto.undrag = function() {
		var i = draggable.length;
		while(i--) {
			if(draggable[i].el == this) {
				this.unmousedown(draggable[i].start);
				draggable.splice(i, 1);
				eve.unbind("raphael.drag.*." + this.id)
			}
		}!draggable.length && R.unmousemove(dragMove).unmouseup(dragUp)
	};
	paperproto.circle = function(x, y, r) {
		var out = R._engine.circle(this, x || 0, y || 0, r || 0);
		this.__set__ && this.__set__.push(out);
		return out
	};
	paperproto.rect = function(x, y, w, h, r) {
		var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
		this.__set__ && this.__set__.push(out);
		return out
	};
	paperproto.ellipse = function(x, y, rx, ry) {
		var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
		this.__set__ && this.__set__.push(out);
		return out
	};
	paperproto.path = function(pathString) {
		pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
		var out = R._engine.path(R.format[apply](R, arguments), this);
		this.__set__ && this.__set__.push(out);
		return out
	};
	paperproto.image = function(src, x, y, w, h) {
		var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
		this.__set__ && this.__set__.push(out);
		return out
	};
	paperproto.text = function(x, y, text) {
		var out = R._engine.text(this, x || 0, y || 0, Str(text));
		this.__set__ && this.__set__.push(out);
		return out
	};
	paperproto.set = function(itemsArray) {
		!R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
		var out = new Set(itemsArray);
		this.__set__ && this.__set__.push(out);
		return out
	};
	paperproto.setStart = function(set) {
		this.__set__ = set || this.set()
	};
	paperproto.setFinish = function(set) {
		var out = this.__set__;
		delete this.__set__;
		return out
	};
	paperproto.setSize = function(width, height) {
		return R._engine.setSize.call(this, width, height)
	};
	paperproto.setViewBox = function(x, y, w, h, fit) {
		return R._engine.setViewBox.call(this, x, y, w, h, fit)
	};
	paperproto.top = paperproto.bottom = null;
	paperproto.raphael = R;
	var getOffset = function(elem) {
		var box = elem.getBoundingClientRect(),
			doc = elem.ownerDocument,
			body = doc.body,
			docElem = doc.documentElement,
			clientTop = docElem.clientTop || body.clientTop || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			top = box.top + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop) - clientTop,
			left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
		return {
			y: top,
			x: left
		}
	};
	paperproto.getElementByPoint = function(x, y) {
		var paper = this,
			svg = paper.canvas,
			target = g.doc.elementFromPoint(x, y);
		if(g.win.opera && target.tagName == "svg") {
			var so = getOffset(svg),
				sr = svg.createSVGRect();
			sr.x = x - so.x;
			sr.y = y - so.y;
			sr.width = sr.height = 1;
			var hits = svg.getIntersectionList(sr, null);
			if(hits.length) {
				target = hits[hits.length - 1]
			}
		}
		if(!target) {
			return null
		}
		while(target.parentNode && target != svg.parentNode && !target.raphael) {
			target = target.parentNode
		}
		target == paper.canvas.parentNode && (target = svg);
		target = target && target.raphael ? paper.getById(target.raphaelid) : null;
		return target
	};
	paperproto.getById = function(id) {
		var bot = this.bottom;
		while(bot) {
			if(bot.id == id) {
				return bot
			}
			bot = bot.next
		}
		return null
	};
	paperproto.forEach = function(callback, thisArg) {
		var bot = this.bottom;
		while(bot) {
			if(callback.call(thisArg, bot) === false) {
				return this
			}
			bot = bot.next
		}
		return this
	};
	paperproto.getElementsByPoint = function(x, y) {
		var set = this.set();
		this.forEach(function(el) {
			if(el.isPointInside(x, y)) {
				set.push(el)
			}
		});
		return set
	};

	function x_y() {
		return this.x + S + this.y
	}

	function x_y_w_h() {
		return this.x + S + this.y + S + this.width + " \xd7 " + this.height
	}
	elproto.isPointInside = function(x, y) {
		var rp = this.realPath = this.realPath || getPath[this.type](this);
		return R.isPointInsidePath(rp, x, y)
	};
	elproto.getBBox = function(isWithoutTransform) {
		if(this.removed) {
			return {}
		}
		var _ = this._;
		if(isWithoutTransform) {
			if(_.dirty || !_.bboxwt) {
				this.realPath = getPath[this.type](this);
				_.bboxwt = pathDimensions(this.realPath);
				_.bboxwt.toString = x_y_w_h;
				_.dirty = 0
			}
			return _.bboxwt
		}
		if(_.dirty || _.dirtyT || !_.bbox) {
			if(_.dirty || !this.realPath) {
				_.bboxwt = 0;
				this.realPath = getPath[this.type](this)
			}
			_.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
			_.bbox.toString = x_y_w_h;
			_.dirty = _.dirtyT = 0
		}
		return _.bbox
	};
	elproto.clone = function() {
		if(this.removed) {
			return null
		}
		var out = this.paper[this.type]().attr(this.attr());
		this.__set__ && this.__set__.push(out);
		return out
	};
	elproto.glow = function(glow) {
		if(this.type == "text") {
			return null
		}
		glow = glow || {};
		var s = {
				width: (glow.width || 10) + (+this.attr("stroke-width") || 1),
				fill: glow.fill || false,
				opacity: glow.opacity || 0.5,
				offsetx: glow.offsetx || 0,
				offsety: glow.offsety || 0,
				color: glow.color || "#000"
			},
			c = s.width / 2,
			r = this.paper,
			out = r.set(),
			path = this.realPath || getPath[this.type](this);
		path = this.matrix ? mapPath(path, this.matrix) : path;
		for(var i = 1; i < c + 1; i++) {
			out.push(r.path(path).attr({
				stroke: s.color,
				fill: s.fill ? s.color : "none",
				"stroke-linejoin": "round",
				"stroke-linecap": "round",
				"stroke-width": +(s.width / c * i).toFixed(3),
				opacity: +(s.opacity / c).toFixed(3)
			}))
		}
		return out.insertBefore(this).translate(s.offsetx, s.offsety)
	};
	var curveslengths = {},
		getPointAtSegmentLength = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
			if(length == null) {
				return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y)
			} else {
				return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length))
			}
		},
		getLengthFactory = function(istotal, subpath) {
			return function(path, length, onlystart) {
				path = path2curve(path);
				var x, y, p, l, sp = "",
					subpaths = {},
					point, len = 0;
				for(var i = 0, ii = path.length; i < ii; i++) {
					p = path[i];
					if(p[0] == "M") {
						x = +p[1];
						y = +p[2]
					} else {
						l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
						if(len + l > length) {
							if(subpath && !subpaths.start) {
								point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
								sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
								if(onlystart) {
									return sp
								}
								subpaths.start = sp;
								sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
								len += l;
								x = +p[5];
								y = +p[6];
								continue
							}
							if(!istotal && !subpath) {
								point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
								return {
									x: point.x,
									y: point.y,
									alpha: point.alpha
								}
							}
						}
						len += l;
						x = +p[5];
						y = +p[6]
					}
					sp += p.shift() + p
				}
				subpaths.end = sp;
				point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
				point.alpha && (point = {
					x: point.x,
					y: point.y,
					alpha: point.alpha
				});
				return point
			}
		};
	var getTotalLength = getLengthFactory(1),
		getPointAtLength = getLengthFactory(),
		getSubpathsAtLength = getLengthFactory(0, 1);
	R.getTotalLength = getTotalLength;
	R.getPointAtLength = getPointAtLength;
	R.getSubpath = function(path, from, to) {
		if(this.getTotalLength(path) - to < 0.000001) {
			return getSubpathsAtLength(path, from).end
		}
		var a = getSubpathsAtLength(path, to, 1);
		return from ? getSubpathsAtLength(a, from).end : a
	};
	elproto.getTotalLength = function() {
		if(this.type != "path") {
			return
		}
		if(this.node.getTotalLength) {
			return this.node.getTotalLength()
		}
		return getTotalLength(this.attrs.path)
	};
	elproto.getPointAtLength = function(length) {
		if(this.type != "path") {
			return
		}
		return getPointAtLength(this.attrs.path, length)
	};
	elproto.getSubpath = function(from, to) {
		if(this.type != "path") {
			return
		}
		return R.getSubpath(this.attrs.path, from, to)
	};
	var ef = R.easing_formulas = {
		linear: function(n) {
			return n
		},
		"<": function(n) {
			return pow(n, 1.7)
		},
		">": function(n) {
			return pow(n, 0.48)
		},
		"<>": function(n) {
			var q = 0.48 - n / 1.04,
				Q = math.sqrt(0.1734 + q * q),
				x = Q - q,
				X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
				y = -Q - q,
				Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
				t = X + Y + 0.5;
			return(1 - t) * 3 * t * t + t * t * t
		},
		backIn: function(n) {
			var s = 1.70158;
			return n * n * ((s + 1) * n - s)
		},
		backOut: function(n) {
			n = n - 1;
			var s = 1.70158;
			return n * n * ((s + 1) * n + s) + 1
		},
		elastic: function(n) {
			if(n == !!n) {
				return n
			}
			return pow(2, -10 * n) * math.sin((n - 0.075) * (2 * PI) / 0.3) + 1
		},
		bounce: function(n) {
			var s = 7.5625,
				p = 2.75,
				l;
			if(n < (1 / p)) {
				l = s * n * n
			} else {
				if(n < (2 / p)) {
					n -= (1.5 / p);
					l = s * n * n + 0.75
				} else {
					if(n < (2.5 / p)) {
						n -= (2.25 / p);
						l = s * n * n + 0.9375
					} else {
						n -= (2.625 / p);
						l = s * n * n + 0.984375
					}
				}
			}
			return l
		}
	};
	ef.easeIn = ef["ease-in"] = ef["<"];
	ef.easeOut = ef["ease-out"] = ef[">"];
	ef.easeInOut = ef["ease-in-out"] = ef["<>"];
	ef["back-in"] = ef.backIn;
	ef["back-out"] = ef.backOut;
	var animationElements = [],
		requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
			setTimeout(callback, 16)
		},
		animation = function() {
			var Now = +new Date,
				l = 0;
			for(; l < animationElements.length; l++) {
				var e = animationElements[l];
				if(e.el.removed || e.paused) {
					continue
				}
				var time = Now - e.start,
					ms = e.ms,
					easing = e.easing,
					from = e.from,
					diff = e.diff,
					to = e.to,
					t = e.t,
					that = e.el,
					set = {},
					now, init = {},
					key;
				if(e.initstatus) {
					time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
					e.status = e.initstatus;
					delete e.initstatus;
					e.stop && animationElements.splice(l--, 1)
				} else {
					e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top
				}
				if(time < 0) {
					continue
				}
				if(time < ms) {
					var pos = easing(time / ms);
					for(var attr in from) {
						if(from[has](attr)) {
							switch(availableAnimAttrs[attr]) {
								case nu:
									now = +from[attr] + pos * ms * diff[attr];
									break;
								case "colour":
									now = "rgb(" + [upto255(round(from[attr].r + pos * ms * diff[attr].r)), upto255(round(from[attr].g + pos * ms * diff[attr].g)), upto255(round(from[attr].b + pos * ms * diff[attr].b))].join(",") + ")";
									break;
								case "path":
									now = [];
									for(var i = 0, ii = from[attr].length; i < ii; i++) {
										now[i] = [from[attr][i][0]];
										for(var j = 1, jj = from[attr][i].length; j < jj; j++) {
											now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j]
										}
										now[i] = now[i].join(S)
									}
									now = now.join(S);
									break;
								case "transform":
									if(diff[attr].real) {
										now = [];
										for(i = 0, ii = from[attr].length; i < ii; i++) {
											now[i] = [from[attr][i][0]];
											for(j = 1, jj = from[attr][i].length; j < jj; j++) {
												now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j]
											}
										}
									} else {
										var get = function(i) {
											return +from[attr][i] + pos * ms * diff[attr][i]
										};
										now = [
											["m", get(0), get(1), get(2), get(3), get(4), get(5)]
										]
									}
									break;
								case "csv":
									if(attr == "clip-rect") {
										now = [];
										i = 4;
										while(i--) {
											now[i] = +from[attr][i] + pos * ms * diff[attr][i]
										}
									}
									break;
								default:
									var from2 = [][concat](from[attr]);
									now = [];
									i = that.paper.customAttributes[attr].length;
									while(i--) {
										now[i] = +from2[i] + pos * ms * diff[attr][i]
									}
									break
							}
							set[attr] = now
						}
					}
					that.attr(set);
					(function(id, that, anim) {
						setTimeout(function() {
							eve("raphael.anim.frame." + id, that, anim)
						})
					})(that.id, that, e.anim)
				} else {
					(function(f, el, a) {
						setTimeout(function() {
							eve("raphael.anim.frame." + el.id, el, a);
							eve("raphael.anim.finish." + el.id, el, a);
							R.is(f, "function") && f.call(el)
						})
					})(e.callback, that, e.anim);
					that.attr(to);
					animationElements.splice(l--, 1);
					if(e.repeat > 1 && !e.next) {
						for(key in to) {
							if(to[has](key)) {
								init[key] = e.totalOrigin[key]
							}
						}
						e.el.attr(init);
						runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1)
					}
					if(e.next && !e.stop) {
						runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat)
					}
				}
			}
			R.svg && that && that.paper && that.paper.safari();
			animationElements.length && requestAnimFrame(animation)
		},
		upto255 = function(color) {
			return color > 255 ? 255 : color < 0 ? 0 : color
		};
	elproto.animateWith = function(el, anim, params, ms, easing, callback) {
		var element = this;
		if(element.removed) {
			callback && callback.call(element);
			return element
		}
		var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback),
			x, y;
		runAnimation(a, element, a.percents[0], null, element.attr());
		for(var i = 0, ii = animationElements.length; i < ii; i++) {
			if(animationElements[i].anim == anim && animationElements[i].el == el) {
				animationElements[ii - 1].start = animationElements[i].start;
				break
			}
		}
		return element
	};

	function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
		var cx = 3 * p1x,
			bx = 3 * (p2x - p1x) - cx,
			ax = 1 - cx - bx,
			cy = 3 * p1y,
			by = 3 * (p2y - p1y) - cy,
			ay = 1 - cy - by;

		function sampleCurveX(t) {
			return((ax * t + bx) * t + cx) * t
		}

		function solve(x, epsilon) {
			var t = solveCurveX(x, epsilon);
			return((ay * t + by) * t + cy) * t
		}

		function solveCurveX(x, epsilon) {
			var t0, t1, t2, x2, d2, i;
			for(t2 = x, i = 0; i < 8; i++) {
				x2 = sampleCurveX(t2) - x;
				if(abs(x2) < epsilon) {
					return t2
				}
				d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
				if(abs(d2) < 0.000001) {
					break
				}
				t2 = t2 - x2 / d2
			}
			t0 = 0;
			t1 = 1;
			t2 = x;
			if(t2 < t0) {
				return t0
			}
			if(t2 > t1) {
				return t1
			}
			while(t0 < t1) {
				x2 = sampleCurveX(t2);
				if(abs(x2 - x) < epsilon) {
					return t2
				}
				if(x > x2) {
					t0 = t2
				} else {
					t1 = t2
				}
				t2 = (t1 - t0) / 2 + t0
			}
			return t2
		}
		return solve(t, 1 / (200 * duration))
	}
	elproto.onAnimation = function(f) {
		f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
		return this
	};

	function Animation(anim, ms) {
		var percents = [],
			newAnim = {};
		this.ms = ms;
		this.times = 1;
		if(anim) {
			for(var attr in anim) {
				if(anim[has](attr)) {
					newAnim[toFloat(attr)] = anim[attr];
					percents.push(toFloat(attr))
				}
			}
			percents.sort(sortByNumber)
		}
		this.anim = newAnim;
		this.top = percents[percents.length - 1];
		this.percents = percents
	}
	Animation.prototype.delay = function(delay) {
		var a = new Animation(this.anim, this.ms);
		a.times = this.times;
		a.del = +delay || 0;
		return a
	};
	Animation.prototype.repeat = function(times) {
		var a = new Animation(this.anim, this.ms);
		a.del = this.del;
		a.times = math.floor(mmax(times, 0)) || 1;
		return a
	};

	function runAnimation(anim, element, percent, status, totalOrigin, times) {
		percent = toFloat(percent);
		var params, isInAnim, isInAnimSet, percents = [],
			next, prev, timestamp, ms = anim.ms,
			from = {},
			to = {},
			diff = {};
		if(status) {
			for(i = 0, ii = animationElements.length; i < ii; i++) {
				var e = animationElements[i];
				if(e.el.id == element.id && e.anim == anim) {
					if(e.percent != percent) {
						animationElements.splice(i, 1);
						isInAnimSet = 1
					} else {
						isInAnim = e
					}
					element.attr(e.totalOrigin);
					break
				}
			}
		} else {
			status = +to
		}
		for(var i = 0, ii = anim.percents.length; i < ii; i++) {
			if(anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
				percent = anim.percents[i];
				prev = anim.percents[i - 1] || 0;
				ms = ms / anim.top * (percent - prev);
				next = anim.percents[i + 1];
				params = anim.anim[percent];
				break
			} else {
				if(status) {
					element.attr(anim.anim[anim.percents[i]])
				}
			}
		}
		if(!params) {
			return
		}
		if(!isInAnim) {
			for(var attr in params) {
				if(params[has](attr)) {
					if(availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
						from[attr] = element.attr(attr);
						(from[attr] == null) && (from[attr] = availableAttrs[attr]);
						to[attr] = params[attr];
						switch(availableAnimAttrs[attr]) {
							case nu:
								diff[attr] = (to[attr] - from[attr]) / ms;
								break;
							case "colour":
								from[attr] = R.getRGB(from[attr]);
								var toColour = R.getRGB(to[attr]);
								diff[attr] = {
									r: (toColour.r - from[attr].r) / ms,
									g: (toColour.g - from[attr].g) / ms,
									b: (toColour.b - from[attr].b) / ms
								};
								break;
							case "path":
								var pathes = path2curve(from[attr], to[attr]),
									toPath = pathes[1];
								from[attr] = pathes[0];
								diff[attr] = [];
								for(i = 0, ii = from[attr].length; i < ii; i++) {
									diff[attr][i] = [0];
									for(var j = 1, jj = from[attr][i].length; j < jj; j++) {
										diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms
									}
								}
								break;
							case "transform":
								var _ = element._,
									eq = equaliseTransform(_[attr], to[attr]);
								if(eq) {
									from[attr] = eq.from;
									to[attr] = eq.to;
									diff[attr] = [];
									diff[attr].real = true;
									for(i = 0, ii = from[attr].length; i < ii; i++) {
										diff[attr][i] = [from[attr][i][0]];
										for(j = 1, jj = from[attr][i].length; j < jj; j++) {
											diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms
										}
									}
								} else {
									var m = (element.matrix || new Matrix),
										to2 = {
											_: {
												transform: _.transform
											},
											getBBox: function() {
												return element.getBBox(1)
											}
										};
									from[attr] = [m.a, m.b, m.c, m.d, m.e, m.f];
									extractTransform(to2, to[attr]);
									to[attr] = to2._.transform;
									diff[attr] = [(to2.matrix.a - m.a) / ms, (to2.matrix.b - m.b) / ms, (to2.matrix.c - m.c) / ms, (to2.matrix.d - m.d) / ms, (to2.matrix.e - m.e) / ms, (to2.matrix.f - m.f) / ms]
								}
								break;
							case "csv":
								var values = Str(params[attr])[split](separator),
									from2 = Str(from[attr])[split](separator);
								if(attr == "clip-rect") {
									from[attr] = from2;
									diff[attr] = [];
									i = from2.length;
									while(i--) {
										diff[attr][i] = (values[i] - from[attr][i]) / ms
									}
								}
								to[attr] = values;
								break;
							default:
								values = [][concat](params[attr]);
								from2 = [][concat](from[attr]);
								diff[attr] = [];
								i = element.paper.customAttributes[attr].length;
								while(i--) {
									diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms
								}
								break
						}
					}
				}
			}
			var easing = params.easing,
				easyeasy = R.easing_formulas[easing];
			if(!easyeasy) {
				easyeasy = Str(easing).match(bezierrg);
				if(easyeasy && easyeasy.length == 5) {
					var curve = easyeasy;
					easyeasy = function(t) {
						return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms)
					}
				} else {
					easyeasy = pipe
				}
			}
			timestamp = params.start || anim.start || +new Date;
			e = {
				anim: anim,
				percent: percent,
				timestamp: timestamp,
				start: timestamp + (anim.del || 0),
				status: 0,
				initstatus: status || 0,
				stop: false,
				ms: ms,
				easing: easyeasy,
				from: from,
				diff: diff,
				to: to,
				el: element,
				callback: params.callback,
				prev: prev,
				next: next,
				repeat: times || anim.times,
				origin: element.attr(),
				totalOrigin: totalOrigin
			};
			animationElements.push(e);
			if(status && !isInAnim && !isInAnimSet) {
				e.stop = true;
				e.start = new Date - ms * status;
				if(animationElements.length == 1) {
					return animation()
				}
			}
			if(isInAnimSet) {
				e.start = new Date - e.ms * status
			}
			animationElements.length == 1 && requestAnimFrame(animation)
		} else {
			isInAnim.initstatus = status;
			isInAnim.start = new Date - isInAnim.ms * status
		}
		eve("raphael.anim.start." + element.id, element, anim)
	}
	R.animation = function(params, ms, easing, callback) {
		if(params instanceof Animation) {
			return params
		}
		if(R.is(easing, "function") || !easing) {
			callback = callback || easing || null;
			easing = null
		}
		params = Object(params);
		ms = +ms || 0;
		var p = {},
			json, attr;
		for(attr in params) {
			if(params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
				json = true;
				p[attr] = params[attr]
			}
		}
		if(!json) {
			return new Animation(params, ms)
		} else {
			easing && (p.easing = easing);
			callback && (p.callback = callback);
			return new Animation({
				100: p
			}, ms)
		}
	};
	elproto.animate = function(params, ms, easing, callback) {
		var element = this;
		if(element.removed) {
			callback && callback.call(element);
			return element
		}
		var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
		runAnimation(anim, element, anim.percents[0], null, element.attr());
		return element
	};
	elproto.setTime = function(anim, value) {
		if(anim && value != null) {
			this.status(anim, mmin(value, anim.ms) / anim.ms)
		}
		return this
	};
	elproto.status = function(anim, value) {
		var out = [],
			i = 0,
			len, e;
		if(value != null) {
			runAnimation(anim, this, -1, mmin(value, 1));
			return this
		} else {
			len = animationElements.length;
			for(; i < len; i++) {
				e = animationElements[i];
				if(e.el.id == this.id && (!anim || e.anim == anim)) {
					if(anim) {
						return e.status
					}
					out.push({
						anim: e.anim,
						status: e.status
					})
				}
			}
			if(anim) {
				return 0
			}
			return out
		}
	};
	elproto.pause = function(anim) {
		for(var i = 0; i < animationElements.length; i++) {
			if(animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
				if(eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
					animationElements[i].paused = true
				}
			}
		}
		return this
	};
	elproto.resume = function(anim) {
		for(var i = 0; i < animationElements.length; i++) {
			if(animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
				var e = animationElements[i];
				if(eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
					delete e.paused;
					this.status(e.anim, e.status)
				}
			}
		}
		return this
	};
	elproto.stop = function(anim) {
		for(var i = 0; i < animationElements.length; i++) {
			if(animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
				if(eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
					animationElements.splice(i--, 1)
				}
			}
		}
		return this
	};

	function stopAnimation(paper) {
		for(var i = 0; i < animationElements.length; i++) {
			if(animationElements[i].el.paper == paper) {
				animationElements.splice(i--, 1)
			}
		}
	}
	eve.on("raphael.remove", stopAnimation);
	eve.on("raphael.clear", stopAnimation);
	elproto.toString = function() {
		return "Rapha\xebl\u2019s object"
	};
	var Set = function(items) {
			this.items = [];
			this.length = 0;
			this.type = "set";
			if(items) {
				for(var i = 0, ii = items.length; i < ii; i++) {
					if(items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
						this[this.items.length] = this.items[this.items.length] = items[i];
						this.length++
					}
				}
			}
		},
		setproto = Set.prototype;
	setproto.push = function() {
		var item, len;
		for(var i = 0, ii = arguments.length; i < ii; i++) {
			item = arguments[i];
			if(item && (item.constructor == elproto.constructor || item.constructor == Set)) {
				len = this.items.length;
				this[len] = this.items[len] = item;
				this.length++
			}
		}
		return this
	};
	setproto.pop = function() {
		this.length && delete this[this.length--];
		return this.items.pop()
	};
	setproto.forEach = function(callback, thisArg) {
		for(var i = 0, ii = this.items.length; i < ii; i++) {
			if(callback.call(thisArg, this.items[i], i) === false) {
				return this
			}
		}
		return this
	};
	for(var method in elproto) {
		if(elproto[has](method)) {
			setproto[method] = (function(methodname) {
				return function() {
					var arg = arguments;
					return this.forEach(function(el) {
						el[methodname][apply](el, arg)
					})
				}
			})(method)
		}
	}
	setproto.attr = function(name, value) {
		if(name && R.is(name, array) && R.is(name[0], "object")) {
			for(var j = 0, jj = name.length; j < jj; j++) {
				this.items[j].attr(name[j])
			}
		} else {
			for(var i = 0, ii = this.items.length; i < ii; i++) {
				this.items[i].attr(name, value)
			}
		}
		return this
	};
	setproto.clear = function() {
		while(this.length) {
			this.pop()
		}
	};
	setproto.splice = function(index, count, insertion) {
		index = index < 0 ? mmax(this.length + index, 0) : index;
		count = mmax(0, mmin(this.length - index, count));
		var tail = [],
			todel = [],
			args = [],
			i;
		for(i = 2; i < arguments.length; i++) {
			args.push(arguments[i])
		}
		for(i = 0; i < count; i++) {
			todel.push(this[index + i])
		}
		for(; i < this.length - index; i++) {
			tail.push(this[index + i])
		}
		var arglen = args.length;
		for(i = 0; i < arglen + tail.length; i++) {
			this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen]
		}
		i = this.items.length = this.length -= count - arglen;
		while(this[i]) {
			delete this[i++]
		}
		return new Set(todel)
	};
	setproto.exclude = function(el) {
		for(var i = 0, ii = this.length; i < ii; i++) {
			if(this[i] == el) {
				this.splice(i, 1);
				return true
			}
		}
	};
	setproto.animate = function(params, ms, easing, callback) {
		(R.is(easing, "function") || !easing) && (callback = easing || null);
		var len = this.items.length,
			i = len,
			item, set = this,
			collector;
		if(!len) {
			return this
		}
		callback && (collector = function() {
			!--len && callback.call(set)
		});
		easing = R.is(easing, string) ? easing : collector;
		var anim = R.animation(params, ms, easing, collector);
		item = this.items[--i].animate(anim);
		while(i--) {
			this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim)
		}
		return this
	};
	setproto.insertAfter = function(el) {
		var i = this.items.length;
		while(i--) {
			this.items[i].insertAfter(el)
		}
		return this
	};
	setproto.getBBox = function() {
		var x = [],
			y = [],
			x2 = [],
			y2 = [];
		for(var i = this.items.length; i--;) {
			if(!this.items[i].removed) {
				var box = this.items[i].getBBox();
				x.push(box.x);
				y.push(box.y);
				x2.push(box.x + box.width);
				y2.push(box.y + box.height)
			}
		}
		x = mmin[apply](0, x);
		y = mmin[apply](0, y);
		x2 = mmax[apply](0, x2);
		y2 = mmax[apply](0, y2);
		return {
			x: x,
			y: y,
			x2: x2,
			y2: y2,
			width: x2 - x,
			height: y2 - y
		}
	};
	setproto.clone = function(s) {
		s = new Set;
		for(var i = 0, ii = this.items.length; i < ii; i++) {
			s.push(this.items[i].clone())
		}
		return s
	};
	setproto.toString = function() {
		return "Rapha\xebl\u2018s set"
	};
	R.registerFont = function(font) {
		if(!font.face) {
			return font
		}
		this.fonts = this.fonts || {};
		var fontcopy = {
				w: font.w,
				face: {},
				glyphs: {}
			},
			family = font.face["font-family"];
		for(var prop in font.face) {
			if(font.face[has](prop)) {
				fontcopy.face[prop] = font.face[prop]
			}
		}
		if(this.fonts[family]) {
			this.fonts[family].push(fontcopy)
		} else {
			this.fonts[family] = [fontcopy]
		}
		if(!font.svg) {
			fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
			for(var glyph in font.glyphs) {
				if(font.glyphs[has](glyph)) {
					var path = font.glyphs[glyph];
					fontcopy.glyphs[glyph] = {
						w: path.w,
						k: {},
						d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function(command) {
							return {
								l: "L",
								c: "C",
								x: "z",
								t: "m",
								r: "l",
								v: "c"
							}[command] || "M"
						}) + "z"
					};
					if(path.k) {
						for(var k in path.k) {
							if(path[has](k)) {
								fontcopy.glyphs[glyph].k[k] = path.k[k]
							}
						}
					}
				}
			}
		}
		return font
	};
	paperproto.getFont = function(family, weight, style, stretch) {
		stretch = stretch || "normal";
		style = style || "normal";
		weight = +weight || {
			normal: 400,
			bold: 700,
			lighter: 300,
			bolder: 800
		}[weight] || 400;
		if(!R.fonts) {
			return
		}
		var font = R.fonts[family];
		if(!font) {
			var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
			for(var fontName in R.fonts) {
				if(R.fonts[has](fontName)) {
					if(name.test(fontName)) {
						font = R.fonts[fontName];
						break
					}
				}
			}
		}
		var thefont;
		if(font) {
			for(var i = 0, ii = font.length; i < ii; i++) {
				thefont = font[i];
				if(thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
					break
				}
			}
		}
		return thefont
	};
	paperproto.print = function(x, y, string, font, size, origin, letter_spacing) {
		origin = origin || "middle";
		letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
		var letters = Str(string)[split](E),
			shift = 0,
			notfirst = 0,
			path = E,
			scale;
		R.is(font, string) && (font = this.getFont(font));
		if(font) {
			scale = (size || 16) / font.face["units-per-em"];
			var bb = font.face.bbox[split](separator),
				top = +bb[0],
				lineHeight = bb[3] - bb[1],
				shifty = 0,
				height = +bb[1] + (origin == "baseline" ? lineHeight + (+font.face.descent) : lineHeight / 2);
			for(var i = 0, ii = letters.length; i < ii; i++) {
				if(letters[i] == "\n") {
					shift = 0;
					curr = 0;
					notfirst = 0;
					shifty += lineHeight
				} else {
					var prev = notfirst && font.glyphs[letters[i - 1]] || {},
						curr = font.glyphs[letters[i]];
					shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
					notfirst = 1
				}
				if(curr && curr.d) {
					path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale])
				}
			}
		}
		return this.path(path).attr({
			fill: "#000",
			stroke: "none"
		})
	};
	paperproto.add = function(json) {
		if(R.is(json, "array")) {
			var res = this.set(),
				i = 0,
				ii = json.length,
				j;
			for(; i < ii; i++) {
				j = json[i] || {};
				elements[has](j.type) && res.push(this[j.type]().attr(j))
			}
		}
		return res
	};
	R.format = function(token, params) {
		var args = R.is(params, array) ? [0][concat](params) : arguments;
		token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function(str, i) {
			return args[++i] == null ? E : args[i]
		}));
		return token || E
	};
	R.fullfill = (function() {
		var tokenRegex = /\{([^\}]+)\}/g,
			objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
			replacer = function(all, key, obj) {
				var res = obj;
				key.replace(objNotationRegex, function(all, name, quote, quotedName, isFunc) {
					name = name || quotedName;
					if(res) {
						if(name in res) {
							res = res[name]
						}
						typeof res == "function" && isFunc && (res = res())
					}
				});
				res = (res == null || res == obj ? all : res) + "";
				return res
			};
		return function(str, obj) {
			return String(str).replace(tokenRegex, function(all, key) {
				return replacer(all, key, obj)
			})
		}
	})();
	R.ninja = function() {
		oldRaphael.was ? (g.win.Raphael = oldRaphael.is) : delete Raphael;
		return R
	};
	R.st = setproto;
	(function(doc, loaded, f) {
		if(doc.readyState == null && doc.addEventListener) {
			doc.addEventListener(loaded, f = function() {
				doc.removeEventListener(loaded, f, false);
				doc.readyState = "complete"
			}, false);
			doc.readyState = "loading"
		}

		function isLoaded() {
			(/in/).test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload")
		}
		isLoaded()
	})(document, "DOMContentLoaded");
	oldRaphael.was ? (g.win.Raphael = R) : (Raphael = R);
	eve.on("raphael.DOMload", function() {
		loaded = true
	})
})();
window.Raphael.svg && function(R) {
	var has = "hasOwnProperty",
		Str = String,
		toFloat = parseFloat,
		toInt = parseInt,
		math = Math,
		mmax = math.max,
		abs = math.abs,
		pow = math.pow,
		separator = /[, ]+/,
		eve = R.eve,
		E = "",
		S = " ";
	var xlink = "http://www.w3.org/1999/xlink",
		markers = {
			block: "M5,0 0,2.5 5,5z",
			classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
			diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
			open: "M6,1 1,3.5 6,6",
			oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
		},
		markerCounter = {};
	R.toString = function() {
		return "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version
	};
	var $ = function(el, attr) {
			if(attr) {
				if(typeof el == "string") {
					el = $(el)
				}
				for(var key in attr) {
					if(attr[has](key)) {
						if(key.substring(0, 6) == "xlink:") {
							el.setAttributeNS(xlink, key.substring(6), Str(attr[key]))
						} else {
							el.setAttribute(key, Str(attr[key]))
						}
					}
				}
			} else {
				el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
				el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)")
			}
			return el
		},
		addGradientFill = function(element, gradient) {
			var type = "linear",
				id = "" + element.id + gradient,
				fx = 0.5,
				fy = 0.5,
				o = element.node,
				SVG = element.paper,
				s = o.style,
				el = R._g.doc.getElementById(id);
			if(!el) {
				gradient = Str(gradient).replace(R._radial_gradient, function(all, _fx, _fy) {
					type = "radial";
					if(_fx && _fy) {
						fx = toFloat(_fx);
						fy = toFloat(_fy);
						var dir = ((fy > 0.5) * 2 - 1);
						pow(fx - 0.5, 2) + pow(fy - 0.5, 2) > 0.25 && (fy = math.sqrt(0.25 - pow(fx - 0.5, 2)) * dir + 0.5) && fy != 0.5 && (fy = fy.toFixed(5) - 0.00001 * dir)
					}
					return E
				});
				gradient = gradient.split(/\s*\-\s*/);
				if(type == "linear") {
					var angle = gradient.shift();
					angle = -toFloat(angle);
					if(isNaN(angle)) {
						return null
					}
					var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
						max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
					vector[2] *= max;
					vector[3] *= max;
					if(vector[2] < 0) {
						vector[0] = -vector[2];
						vector[2] = 0
					}
					if(vector[3] < 0) {
						vector[1] = -vector[3];
						vector[3] = 0
					}
				}
				var dots = R._parseDots(gradient);
				if(!dots) {
					return null
				}
				id = id.replace(/[\(\)\s,\xb0#]/g, "_");
				if(element.gradient && id != element.gradient.id) {
					SVG.defs.removeChild(element.gradient);
					delete element.gradient
				}
				if(!element.gradient) {
					el = $(type + "Gradient", {
						id: id
					});
					element.gradient = el;
					$(el, type == "radial" ? {
						fx: fx,
						fy: fy
					} : {
						x1: vector[0],
						y1: vector[1],
						x2: vector[2],
						y2: vector[3],
						gradientTransform: element.matrix.invert()
					});
					SVG.defs.appendChild(el);
					for(var i = 0, ii = dots.length; i < ii; i++) {
						el.appendChild($("stop", {
							offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
							"stop-color": dots[i].color || "#fff"
						}))
					}
				}
			}
			$(o, {
				fill: "url(#" + id + ")",
				opacity: 1,
				"fill-opacity": 1
			});
			s.fill = E;
			s.opacity = 1;
			s.fillOpacity = 1;
			return 1
		},
		updatePosition = function(o) {
			var bbox = o.getBBox(1);
			$(o.pattern, {
				patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"
			})
		},
		addArrow = function(o, value, isEnd) {
			if(o.type == "path") {
				var values = Str(value).toLowerCase().split("-"),
					p = o.paper,
					se = isEnd ? "end" : "start",
					node = o.node,
					attrs = o.attrs,
					stroke = attrs["stroke-width"],
					i = values.length,
					type = "classic",
					from, to, dx, refX, attr, w = 3,
					h = 3,
					t = 5;
				while(i--) {
					switch(values[i]) {
						case "block":
						case "classic":
						case "oval":
						case "diamond":
						case "open":
						case "none":
							type = values[i];
							break;
						case "wide":
							h = 5;
							break;
						case "narrow":
							h = 2;
							break;
						case "long":
							w = 5;
							break;
						case "short":
							w = 2;
							break
					}
				}
				if(type == "open") {
					w += 2;
					h += 2;
					t += 2;
					dx = 1;
					refX = isEnd ? 4 : 1;
					attr = {
						fill: "none",
						stroke: attrs.stroke
					}
				} else {
					refX = dx = w / 2;
					attr = {
						fill: attrs.stroke,
						stroke: "none"
					}
				}
				if(o._.arrows) {
					if(isEnd) {
						o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
						o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--
					} else {
						o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
						o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--
					}
				} else {
					o._.arrows = {}
				}
				if(type != "none") {
					var pathId = "raphael-marker-" + type,
						markerId = "raphael-marker-" + se + type + w + h;
					if(!R._g.doc.getElementById(pathId)) {
						p.defs.appendChild($($("path"), {
							"stroke-linecap": "round",
							d: markers[type],
							id: pathId
						}));
						markerCounter[pathId] = 1
					} else {
						markerCounter[pathId]++
					}
					var marker = R._g.doc.getElementById(markerId),
						use;
					if(!marker) {
						marker = $($("marker"), {
							id: markerId,
							markerHeight: h,
							markerWidth: w,
							orient: "auto",
							refX: refX,
							refY: h / 2
						});
						use = $($("use"), {
							"xlink:href": "#" + pathId,
							transform: (isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")",
							"stroke-width": (1 / ((w / t + h / t) / 2)).toFixed(4)
						});
						marker.appendChild(use);
						p.defs.appendChild(marker);
						markerCounter[markerId] = 1
					} else {
						markerCounter[markerId]++;
						use = marker.getElementsByTagName("use")[0]
					}
					$(use, attr);
					var delta = dx * (type != "diamond" && type != "oval");
					if(isEnd) {
						from = o._.arrows.startdx * stroke || 0;
						to = R.getTotalLength(attrs.path) - delta * stroke
					} else {
						from = delta * stroke;
						to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0)
					}
					attr = {};
					attr["marker-" + se] = "url(#" + markerId + ")";
					if(to || from) {
						attr.d = Raphael.getSubpath(attrs.path, from, to)
					}
					$(node, attr);
					o._.arrows[se + "Path"] = pathId;
					o._.arrows[se + "Marker"] = markerId;
					o._.arrows[se + "dx"] = delta;
					o._.arrows[se + "Type"] = type;
					o._.arrows[se + "String"] = value
				} else {
					if(isEnd) {
						from = o._.arrows.startdx * stroke || 0;
						to = R.getTotalLength(attrs.path) - from
					} else {
						from = 0;
						to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0)
					}
					o._.arrows[se + "Path"] && $(node, {
						d: Raphael.getSubpath(attrs.path, from, to)
					});
					delete o._.arrows[se + "Path"];
					delete o._.arrows[se + "Marker"];
					delete o._.arrows[se + "dx"];
					delete o._.arrows[se + "Type"];
					delete o._.arrows[se + "String"]
				}
				for(attr in markerCounter) {
					if(markerCounter[has](attr) && !markerCounter[attr]) {
						var item = R._g.doc.getElementById(attr);
						item && item.parentNode.removeChild(item)
					}
				}
			}
		},
		dasharray = {
			"": [0],
			none: [0],
			"-": [3, 1],
			".": [1, 1],
			"-.": [3, 1, 1, 1],
			"-..": [3, 1, 1, 1, 1, 1],
			". ": [1, 3],
			"- ": [4, 3],
			"--": [8, 3],
			"- .": [4, 3, 1, 3],
			"--.": [8, 3, 1, 3],
			"--..": [8, 3, 1, 3, 1, 3]
		},
		addDashes = function(o, value, params) {
			value = dasharray[Str(value).toLowerCase()];
			if(value) {
				var width = o.attrs["stroke-width"] || "1",
					butt = {
						round: width,
						square: width,
						butt: 0
					}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
					dashes = [],
					i = value.length;
				while(i--) {
					dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt
				}
				$(o.node, {
					"stroke-dasharray": dashes.join(",")
				})
			}
		},
		setFillAndStroke = function(o, params) {
			var node = o.node,
				attrs = o.attrs,
				vis = node.style.visibility;
			node.style.visibility = "hidden";
			for(var att in params) {
				if(params[has](att)) {
					if(!R._availableAttrs[has](att)) {
						continue
					}
					var value = params[att];
					attrs[att] = value;
					switch(att) {
						case "blur":
							o.blur(value);
							break;
						case "href":
						case "title":
						case "target":
							var pn = node.parentNode;
							if(pn.tagName.toLowerCase() != "a") {
								var hl = $("a");
								pn.insertBefore(hl, node);
								hl.appendChild(node);
								pn = hl
							}
							if(att == "target") {
								pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value)
							} else {
								pn.setAttributeNS(xlink, att, value)
							}
							break;
						case "cursor":
							node.style.cursor = value;
							break;
						case "transform":
							o.transform(value);
							break;
						case "arrow-start":
							addArrow(o, value);
							break;
						case "arrow-end":
							addArrow(o, value, 1);
							break;
						case "clip-rect":
							var rect = Str(value).split(separator);
							if(rect.length == 4) {
								o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
								var el = $("clipPath"),
									rc = $("rect");
								el.id = R.createUUID();
								$(rc, {
									x: rect[0],
									y: rect[1],
									width: rect[2],
									height: rect[3]
								});
								el.appendChild(rc);
								o.paper.defs.appendChild(el);
								$(node, {
									"clip-path": "url(#" + el.id + ")"
								});
								o.clip = rc
							}
							if(!value) {
								var path = node.getAttribute("clip-path");
								if(path) {
									var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
									clip && clip.parentNode.removeChild(clip);
									$(node, {
										"clip-path": E
									});
									delete o.clip
								}
							}
							break;
						case "path":
							if(o.type == "path") {
								$(node, {
									d: value ? attrs.path = R._pathToAbsolute(value) : "M0,0"
								});
								o._.dirty = 1;
								if(o._.arrows) {
									"startString" in o._.arrows && addArrow(o, o._.arrows.startString);
									"endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1)
								}
							}
							break;
						case "width":
							node.setAttribute(att, value);
							o._.dirty = 1;
							if(attrs.fx) {
								att = "x";
								value = attrs.x
							} else {
								break
							}
						case "x":
							if(attrs.fx) {
								value = -attrs.x - (attrs.width || 0)
							}
						case "rx":
							if(att == "rx" && o.type == "rect") {
								break
							}
						case "cx":
							node.setAttribute(att, value);
							o.pattern && updatePosition(o);
							o._.dirty = 1;
							break;
						case "height":
							node.setAttribute(att, value);
							o._.dirty = 1;
							if(attrs.fy) {
								att = "y";
								value = attrs.y
							} else {
								break
							}
						case "y":
							if(attrs.fy) {
								value = -attrs.y - (attrs.height || 0)
							}
						case "ry":
							if(att == "ry" && o.type == "rect") {
								break
							}
						case "cy":
							node.setAttribute(att, value);
							o.pattern && updatePosition(o);
							o._.dirty = 1;
							break;
						case "r":
							if(o.type == "rect") {
								$(node, {
									rx: value,
									ry: value
								})
							} else {
								node.setAttribute(att, value)
							}
							o._.dirty = 1;
							break;
						case "src":
							if(o.type == "image") {
								node.setAttributeNS(xlink, "href", value)
							}
							break;
						case "stroke-width":
							if(o._.sx != 1 || o._.sy != 1) {
								value /= mmax(abs(o._.sx), abs(o._.sy)) || 1
							}
							if(o.paper._vbSize) {
								value *= o.paper._vbSize
							}
							node.setAttribute(att, value);
							if(attrs["stroke-dasharray"]) {
								addDashes(o, attrs["stroke-dasharray"], params)
							}
							if(o._.arrows) {
								"startString" in o._.arrows && addArrow(o, o._.arrows.startString);
								"endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1)
							}
							break;
						case "stroke-dasharray":
							addDashes(o, value, params);
							break;
						case "fill":
							var isURL = Str(value).match(R._ISURL);
							if(isURL) {
								el = $("pattern");
								var ig = $("image");
								el.id = R.createUUID();
								$(el, {
									x: 0,
									y: 0,
									patternUnits: "userSpaceOnUse",
									height: 1,
									width: 1
								});
								$(ig, {
									x: 0,
									y: 0,
									"xlink:href": isURL[1]
								});
								el.appendChild(ig);
								(function(el) {
									R._preload(isURL[1], function() {
										var w = this.offsetWidth,
											h = this.offsetHeight;
										$(el, {
											width: w,
											height: h
										});
										$(ig, {
											width: w,
											height: h
										});
										o.paper.safari()
									})
								})(el);
								o.paper.defs.appendChild(el);
								$(node, {
									fill: "url(#" + el.id + ")"
								});
								o.pattern = el;
								o.pattern && updatePosition(o);
								break
							}
							var clr = R.getRGB(value);
							if(!clr.error) {
								delete params.gradient;
								delete attrs.gradient;
								!R.is(attrs.opacity, "undefined") && R.is(params.opacity, "undefined") && $(node, {
									opacity: attrs.opacity
								});
								!R.is(attrs["fill-opacity"], "undefined") && R.is(params["fill-opacity"], "undefined") && $(node, {
									"fill-opacity": attrs["fill-opacity"]
								})
							} else {
								if((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
									if("opacity" in attrs || "fill-opacity" in attrs) {
										var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
										if(gradient) {
											var stops = gradient.getElementsByTagName("stop");
											$(stops[stops.length - 1], {
												"stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)
											})
										}
									}
									attrs.gradient = value;
									attrs.fill = "none";
									break
								}
							}
							clr[has]("opacity") && $(node, {
								"fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity
							});
						case "stroke":
							clr = R.getRGB(value);
							node.setAttribute(att, clr.hex);
							att == "stroke" && clr[has]("opacity") && $(node, {
								"stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity
							});
							if(att == "stroke" && o._.arrows) {
								"startString" in o._.arrows && addArrow(o, o._.arrows.startString);
								"endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1)
							}
							break;
						case "gradient":
							(o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
							break;
						case "opacity":
							if(attrs.gradient && !attrs[has]("stroke-opacity")) {
								$(node, {
									"stroke-opacity": value > 1 ? value / 100 : value
								})
							}
						case "fill-opacity":
							if(attrs.gradient) {
								gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
								if(gradient) {
									stops = gradient.getElementsByTagName("stop");
									$(stops[stops.length - 1], {
										"stop-opacity": value
									})
								}
								break
							}
						default:
							att == "font-size" && (value = toInt(value, 10) + "px");
							var cssrule = att.replace(/(\-.)/g, function(w) {
								return w.substring(1).toUpperCase()
							});
							node.style[cssrule] = value;
							o._.dirty = 1;
							node.setAttribute(att, value);
							break
					}
				}
			}
			tuneText(o, params);
			node.style.visibility = vis
		},
		leading = 1.2,
		tuneText = function(el, params) {
			if(el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
				return
			}
			var a = el.attrs,
				node = el.node,
				fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;
			if(params[has]("text")) {
				a.text = params.text;
				while(node.firstChild) {
					node.removeChild(node.firstChild)
				}
				var texts = Str(params.text).split("\n"),
					tspans = [],
					tspan;
				for(var i = 0, ii = texts.length; i < ii; i++) {
					tspan = $("tspan");
					i && $(tspan, {
						dy: fontSize * leading,
						x: a.x
					});
					tspan.appendChild(R._g.doc.createTextNode(texts[i]));
					node.appendChild(tspan);
					tspans[i] = tspan
				}
			} else {
				tspans = node.getElementsByTagName("tspan");
				for(i = 0, ii = tspans.length; i < ii; i++) {
					if(i) {
						$(tspans[i], {
							dy: fontSize * leading,
							x: a.x
						})
					} else {
						$(tspans[0], {
							dy: 0
						})
					}
				}
			}
			$(node, {
				x: a.x,
				y: a.y
			});
			el._.dirty = 1;
			var bb = el._getBBox(),
				dif = a.y - (bb.y + bb.height / 2);
			dif && R.is(dif, "finite") && $(tspans[0], {
				dy: dif
			})
		},
		Element = function(node, svg) {
			var X = 0,
				Y = 0;
			this[0] = this.node = node;
			node.raphael = true;
			this.id = R._oid++;
			node.raphaelid = this.id;
			this.matrix = R.matrix();
			this.realPath = null;
			this.paper = svg;
			this.attrs = this.attrs || {};
			this._ = {
				transform: [],
				sx: 1,
				sy: 1,
				deg: 0,
				dx: 0,
				dy: 0,
				dirty: 1
			};
			!svg.bottom && (svg.bottom = this);
			this.prev = svg.top;
			svg.top && (svg.top.next = this);
			svg.top = this;
			this.next = null
		},
		elproto = R.el;
	Element.prototype = elproto;
	elproto.constructor = Element;
	R._engine.path = function(pathString, SVG) {
		var el = $("path");
		SVG.canvas && SVG.canvas.appendChild(el);
		var p = new Element(el, SVG);
		p.type = "path";
		setFillAndStroke(p, {
			fill: "none",
			stroke: "#000",
			path: pathString
		});
		return p
	};
	elproto.rotate = function(deg, cx, cy) {
		if(this.removed) {
			return this
		}
		deg = Str(deg).split(separator);
		if(deg.length - 1) {
			cx = toFloat(deg[1]);
			cy = toFloat(deg[2])
		}
		deg = toFloat(deg[0]);
		(cy == null) && (cx = cy);
		if(cx == null || cy == null) {
			var bbox = this.getBBox(1);
			cx = bbox.x + bbox.width / 2;
			cy = bbox.y + bbox.height / 2
		}
		this.transform(this._.transform.concat([
			["r", deg, cx, cy]
		]));
		return this
	};
	elproto.scale = function(sx, sy, cx, cy) {
		if(this.removed) {
			return this
		}
		sx = Str(sx).split(separator);
		if(sx.length - 1) {
			sy = toFloat(sx[1]);
			cx = toFloat(sx[2]);
			cy = toFloat(sx[3])
		}
		sx = toFloat(sx[0]);
		(sy == null) && (sy = sx);
		(cy == null) && (cx = cy);
		if(cx == null || cy == null) {
			var bbox = this.getBBox(1)
		}
		cx = cx == null ? bbox.x + bbox.width / 2 : cx;
		cy = cy == null ? bbox.y + bbox.height / 2 : cy;
		this.transform(this._.transform.concat([
			["s", sx, sy, cx, cy]
		]));
		return this
	};
	elproto.translate = function(dx, dy) {
		if(this.removed) {
			return this
		}
		dx = Str(dx).split(separator);
		if(dx.length - 1) {
			dy = toFloat(dx[1])
		}
		dx = toFloat(dx[0]) || 0;
		dy = +dy || 0;
		this.transform(this._.transform.concat([
			["t", dx, dy]
		]));
		return this
	};
	elproto.transform = function(tstr) {
		var _ = this._;
		if(tstr == null) {
			return _.transform
		}
		R._extractTransform(this, tstr);
		this.clip && $(this.clip, {
			transform: this.matrix.invert()
		});
		this.pattern && updatePosition(this);
		this.node && $(this.node, {
			transform: this.matrix
		});
		if(_.sx != 1 || _.sy != 1) {
			var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
			this.attr({
				"stroke-width": sw
			})
		}
		return this
	};
	elproto.hide = function() {
		!this.removed && this.paper.safari(this.node.style.display = "none");
		return this
	};
	elproto.show = function() {
		!this.removed && this.paper.safari(this.node.style.display = "");
		return this
	};
	elproto.remove = function() {
		if(this.removed || !this.node.parentNode) {
			return
		}
		var paper = this.paper;
		paper.__set__ && paper.__set__.exclude(this);
		eve.unbind("raphael.*.*." + this.id);
		if(this.gradient) {
			paper.defs.removeChild(this.gradient)
		}
		R._tear(this, paper);
		if(this.node.parentNode.tagName.toLowerCase() == "a") {
			this.node.parentNode.parentNode.removeChild(this.node.parentNode)
		} else {
			this.node.parentNode.removeChild(this.node)
		}
		for(var i in this) {
			this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
		}
		this.removed = true
	};
	elproto._getBBox = function() {
		if(this.node.style.display == "none") {
			this.show();
			var hide = true
		}
		var bbox = {};
		try {
			bbox = this.node.getBBox()
		} catch(e) {} finally {
			bbox = bbox || {}
		}
		hide && this.hide();
		return bbox
	};
	elproto.attr = function(name, value) {
		if(this.removed) {
			return this
		}
		if(name == null) {
			var res = {};
			for(var a in this.attrs) {
				if(this.attrs[has](a)) {
					res[a] = this.attrs[a]
				}
			}
			res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
			res.transform = this._.transform;
			return res
		}
		if(value == null && R.is(name, "string")) {
			if(name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
				return this.attrs.gradient
			}
			if(name == "transform") {
				return this._.transform
			}
			var names = name.split(separator),
				out = {};
			for(var i = 0, ii = names.length; i < ii; i++) {
				name = names[i];
				if(name in this.attrs) {
					out[name] = this.attrs[name]
				} else {
					if(R.is(this.paper.customAttributes[name], "function")) {
						out[name] = this.paper.customAttributes[name].def
					} else {
						out[name] = R._availableAttrs[name]
					}
				}
			}
			return ii - 1 ? out : out[names[0]]
		}
		if(value == null && R.is(name, "array")) {
			out = {};
			for(i = 0, ii = name.length; i < ii; i++) {
				out[name[i]] = this.attr(name[i])
			}
			return out
		}
		if(value != null) {
			var params = {};
			params[name] = value
		} else {
			if(name != null && R.is(name, "object")) {
				params = name
			}
		}
		for(var key in params) {
			eve("raphael.attr." + key + "." + this.id, this, params[key])
		}
		for(key in this.paper.customAttributes) {
			if(this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
				var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
				this.attrs[key] = params[key];
				for(var subkey in par) {
					if(par[has](subkey)) {
						params[subkey] = par[subkey]
					}
				}
			}
		}
		setFillAndStroke(this, params);
		return this
	};
	elproto.toFront = function() {
		if(this.removed) {
			return this
		}
		if(this.node.parentNode.tagName.toLowerCase() == "a") {
			this.node.parentNode.parentNode.appendChild(this.node.parentNode)
		} else {
			this.node.parentNode.appendChild(this.node)
		}
		var svg = this.paper;
		svg.top != this && R._tofront(this, svg);
		return this
	};
	elproto.toBack = function() {
		if(this.removed) {
			return this
		}
		var parent = this.node.parentNode;
		if(parent.tagName.toLowerCase() == "a") {
			parent.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild)
		} else {
			if(parent.firstChild != this.node) {
				parent.insertBefore(this.node, this.node.parentNode.firstChild)
			}
		}
		R._toback(this, this.paper);
		var svg = this.paper;
		return this
	};
	elproto.insertAfter = function(element) {
		if(this.removed) {
			return this
		}
		var node = element.node || element[element.length - 1].node;
		if(node.nextSibling) {
			node.parentNode.insertBefore(this.node, node.nextSibling)
		} else {
			node.parentNode.appendChild(this.node)
		}
		R._insertafter(this, element, this.paper);
		return this
	};
	elproto.insertBefore = function(element) {
		if(this.removed) {
			return this
		}
		var node = element.node || element[0].node;
		node.parentNode.insertBefore(this.node, node);
		R._insertbefore(this, element, this.paper);
		return this
	};
	elproto.blur = function(size) {
		var t = this;
		if(+size !== 0) {
			var fltr = $("filter"),
				blur = $("feGaussianBlur");
			t.attrs.blur = size;
			fltr.id = R.createUUID();
			$(blur, {
				stdDeviation: +size || 1.5
			});
			fltr.appendChild(blur);
			t.paper.defs.appendChild(fltr);
			t._blur = fltr;
			$(t.node, {
				filter: "url(#" + fltr.id + ")"
			})
		} else {
			if(t._blur) {
				t._blur.parentNode.removeChild(t._blur);
				delete t._blur;
				delete t.attrs.blur
			}
			t.node.removeAttribute("filter")
		}
	};
	R._engine.circle = function(svg, x, y, r) {
		var el = $("circle");
		svg.canvas && svg.canvas.appendChild(el);
		var res = new Element(el, svg);
		res.attrs = {
			cx: x,
			cy: y,
			r: r,
			fill: "none",
			stroke: "#000"
		};
		res.type = "circle";
		$(el, res.attrs);
		return res
	};
	R._engine.rect = function(svg, x, y, w, h, r) {
		var el = $("rect");
		svg.canvas && svg.canvas.appendChild(el);
		var res = new Element(el, svg);
		res.attrs = {
			x: x,
			y: y,
			width: w,
			height: h,
			r: r || 0,
			rx: r || 0,
			ry: r || 0,
			fill: "none",
			stroke: "#000"
		};
		res.type = "rect";
		$(el, res.attrs);
		return res
	};
	R._engine.ellipse = function(svg, x, y, rx, ry) {
		var el = $("ellipse");
		svg.canvas && svg.canvas.appendChild(el);
		var res = new Element(el, svg);
		res.attrs = {
			cx: x,
			cy: y,
			rx: rx,
			ry: ry,
			fill: "none",
			stroke: "#000"
		};
		res.type = "ellipse";
		$(el, res.attrs);
		return res
	};
	R._engine.image = function(svg, src, x, y, w, h) {
		var el = $("image");
		$(el, {
			x: x,
			y: y,
			width: w,
			height: h,
			preserveAspectRatio: "none"
		});
		el.setAttributeNS(xlink, "href", src);
		svg.canvas && svg.canvas.appendChild(el);
		var res = new Element(el, svg);
		res.attrs = {
			x: x,
			y: y,
			width: w,
			height: h,
			src: src
		};
		res.type = "image";
		return res
	};
	R._engine.text = function(svg, x, y, text) {
		var el = $("text");
		svg.canvas && svg.canvas.appendChild(el);
		var res = new Element(el, svg);
		res.attrs = {
			x: x,
			y: y,
			"text-anchor": "middle",
			text: text,
			font: R._availableAttrs.font,
			stroke: "none",
			fill: "#000"
		};
		res.type = "text";
		setFillAndStroke(res, res.attrs);
		return res
	};
	R._engine.setSize = function(width, height) {
		this.width = width || this.width;
		this.height = height || this.height;
		this.canvas.setAttribute("width", this.width);
		this.canvas.setAttribute("height", this.height);
		if(this._viewBox) {
			this.setViewBox.apply(this, this._viewBox)
		}
		return this
	};
	R._engine.create = function() {
		var con = R._getContainer.apply(0, arguments),
			container = con && con.container,
			x = con.x,
			y = con.y,
			width = con.width || container.style.width,
			height = con.height || container.style.height;
		if(!container) {
			throw new Error("SVG container not found.")
		}
		var cnvs = $("svg"),
			css = "overflow:hidden;",
			isFloating;
		x = x || 0;
		y = y || 0;
		width = width || 512;
		height = height || 342;
		$(cnvs, {
			height: height,
			version: 1.1,
			width: width,
			xmlns: "http://www.w3.org/2000/svg"
		});
		if(container == 1) {
			cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
			R._g.doc.body.appendChild(cnvs);
			isFloating = 1
		} else {
			cnvs.style.cssText = css + "position:relative";
			if(container.firstChild) {
				container.insertBefore(cnvs, container.firstChild)
			} else {
				container.appendChild(cnvs)
			}
		}
		container = new R._Paper;
		container.width = width;
		container.height = height;
		container.canvas = cnvs;
		container.clear();
		container._left = container._top = 0;
		isFloating && (container.renderfix = function() {});
		container.renderfix();
		return container
	};
	R._engine.setViewBox = function(x, y, w, h, fit) {
		eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
		var size = mmax(w / this.width, h / this.height),
			top = this.top,
			aspectRatio = fit ? "meet" : "xMinYMin",
			vb, sw;
		if(x == null) {
			if(this._vbSize) {
				size = 1
			}
			delete this._vbSize;
			vb = "0 0 " + this.width + S + this.height
		} else {
			this._vbSize = size;
			vb = x + S + y + S + w + S + h
		}
		$(this.canvas, {
			viewBox: vb,
			preserveAspectRatio: aspectRatio
		});
		while(size && top) {
			sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
			top.attr({
				"stroke-width": sw
			});
			top._.dirty = 1;
			top._.dirtyT = 1;
			top = top.prev
		}
		this._viewBox = [x, y, w, h, !!fit];
		return this
	};
	R.prototype.renderfix = function() {
		var cnvs = this.canvas,
			s = cnvs.style,
			pos;
		try {
			pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix()
		} catch(e) {
			pos = cnvs.createSVGMatrix()
		}
		var left = -pos.e % 1,
			top = -pos.f % 1;
		if(left || top) {
			if(left) {
				this._left = (this._left + left) % 1;
				s.left = this._left + "px"
			}
			if(top) {
				this._top = (this._top + top) % 1;
				s.top = this._top + "px"
			}
		}
	};
	R.prototype.clear = function() {
		R.eve("raphael.clear", this);
		var c = this.canvas;
		while(c.firstChild) {
			c.removeChild(c.firstChild)
		}
		this.bottom = this.top = null;
		(this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\xebl " + R.version));
		c.appendChild(this.desc);
		c.appendChild(this.defs = $("defs"))
	};
	R.prototype.remove = function() {
		eve("raphael.remove", this);
		this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
		for(var i in this) {
			this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
		}
	};
	var setproto = R.st;
	for(var method in elproto) {
		if(elproto[has](method) && !setproto[has](method)) {
			setproto[method] = (function(methodname) {
				return function() {
					var arg = arguments;
					return this.forEach(function(el) {
						el[methodname].apply(el, arg)
					})
				}
			})(method)
		}
	}
}(window.Raphael);
window.Raphael.vml && function(R) {
	var has = "hasOwnProperty",
		Str = String,
		toFloat = parseFloat,
		math = Math,
		round = math.round,
		mmax = math.max,
		mmin = math.min,
		abs = math.abs,
		fillString = "fill",
		separator = /[, ]+/,
		eve = R.eve,
		ms = " progid:DXImageTransform.Microsoft",
		S = " ",
		E = "",
		map = {
			M: "m",
			L: "l",
			C: "c",
			Z: "x",
			m: "t",
			l: "r",
			c: "v",
			z: "x"
		},
		bites = /([clmz]),?([^clmz]*)/gi,
		blurregexp = / progid:\S+Blur\([^\)]+\)/g,
		val = /-?[^,\s-]+/g,
		cssDot = "position:absolute;left:0;top:0;width:1px;height:1px",
		zoom = 21600,
		pathTypes = {
			path: 1,
			rect: 1,
			image: 1
		},
		ovalTypes = {
			circle: 1,
			ellipse: 1
		},
		path2vml = function(path) {
			var total = /[ahqstv]/ig,
				command = R._pathToAbsolute;
			Str(path).match(total) && (command = R._path2curve);
			total = /[clmz]/g;
			if(command == R._pathToAbsolute && !Str(path).match(total)) {
				var res = Str(path).replace(bites, function(all, command, args) {
					var vals = [],
						isMove = command.toLowerCase() == "m",
						res = map[command];
					args.replace(val, function(value) {
						if(isMove && vals.length == 2) {
							res += vals + map[command == "m" ? "l" : "L"];
							vals = []
						}
						vals.push(round(value * zoom))
					});
					return res + vals
				});
				return res
			}
			var pa = command(path),
				p, r;
			res = [];
			for(var i = 0, ii = pa.length; i < ii; i++) {
				p = pa[i];
				r = pa[i][0].toLowerCase();
				r == "z" && (r = "x");
				for(var j = 1, jj = p.length; j < jj; j++) {
					r += round(p[j] * zoom) + (j != jj - 1 ? "," : E)
				}
				res.push(r)
			}
			return res.join(S)
		},
		compensation = function(deg, dx, dy) {
			var m = R.matrix();
			m.rotate(-deg, 0.5, 0.5);
			return {
				dx: m.x(dx, dy),
				dy: m.y(dx, dy)
			}
		},
		setCoords = function(p, sx, sy, dx, dy, deg) {
			var _ = p._,
				m = p.matrix,
				fillpos = _.fillpos,
				o = p.node,
				s = o.style,
				y = 1,
				flip = "",
				dxdy, kx = zoom / sx,
				ky = zoom / sy;
			s.visibility = "hidden";
			if(!sx || !sy) {
				return
			}
			o.coordsize = abs(kx) + S + abs(ky);
			s.rotation = deg * (sx * sy < 0 ? -1 : 1);
			if(deg) {
				var c = compensation(deg, dx, dy);
				dx = c.dx;
				dy = c.dy
			}
			sx < 0 && (flip += "x");
			sy < 0 && (flip += " y") && (y = -1);
			s.flip = flip;
			o.coordorigin = (dx * -kx) + S + (dy * -ky);
			if(fillpos || _.fillsize) {
				var fill = o.getElementsByTagName(fillString);
				fill = fill && fill[0];
				o.removeChild(fill);
				if(fillpos) {
					c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
					fill.position = c.dx * y + S + c.dy * y
				}
				if(_.fillsize) {
					fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy)
				}
				o.appendChild(fill)
			}
			s.visibility = "visible"
		};
	R.toString = function() {
		return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version
	};
	var addArrow = function(o, value, isEnd) {
			var values = Str(value).toLowerCase().split("-"),
				se = isEnd ? "end" : "start",
				i = values.length,
				type = "classic",
				w = "medium",
				h = "medium";
			while(i--) {
				switch(values[i]) {
					case "block":
					case "classic":
					case "oval":
					case "diamond":
					case "open":
					case "none":
						type = values[i];
						break;
					case "wide":
					case "narrow":
						h = values[i];
						break;
					case "long":
					case "short":
						w = values[i];
						break
				}
			}
			var stroke = o.node.getElementsByTagName("stroke")[0];
			stroke[se + "arrow"] = type;
			stroke[se + "arrowlength"] = w;
			stroke[se + "arrowwidth"] = h
		},
		setFillAndStroke = function(o, params) {
			o.attrs = o.attrs || {};
			var node = o.node,
				a = o.attrs,
				s = node.style,
				xy, newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
				isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
				res = o;
			for(var par in params) {
				if(params[has](par)) {
					a[par] = params[par]
				}
			}
			if(newpath) {
				a.path = R._getPath[o.type](o);
				o._.dirty = 1
			}
			params.href && (node.href = params.href);
			params.title && (node.title = params.title);
			params.target && (node.target = params.target);
			params.cursor && (s.cursor = params.cursor);
			"blur" in params && o.blur(params.blur);
			if(params.path && o.type == "path" || newpath) {
				node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
				if(o.type == "image") {
					o._.fillpos = [a.x, a.y];
					o._.fillsize = [a.width, a.height];
					setCoords(o, 1, 1, 0, 0, 0)
				}
			}
			"transform" in params && o.transform(params.transform);
			if(isOval) {
				var cx = +a.cx,
					cy = +a.cy,
					rx = +a.rx || +a.r || 0,
					ry = +a.ry || +a.r || 0;
				node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom))
			}
			if("clip-rect" in params) {
				var rect = Str(params["clip-rect"]).split(separator);
				if(rect.length == 4) {
					rect[2] = +rect[2] + (+rect[0]);
					rect[3] = +rect[3] + (+rect[1]);
					var div = node.clipRect || R._g.doc.createElement("div"),
						dstyle = div.style;
					dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
					if(!node.clipRect) {
						dstyle.position = "absolute";
						dstyle.top = 0;
						dstyle.left = 0;
						dstyle.width = o.paper.width + "px";
						dstyle.height = o.paper.height + "px";
						node.parentNode.insertBefore(div, node);
						div.appendChild(node);
						node.clipRect = div
					}
				}
				if(!params["clip-rect"]) {
					node.clipRect && (node.clipRect.style.clip = "auto")
				}
			}
			if(o.textpath) {
				var textpathStyle = o.textpath.style;
				params.font && (textpathStyle.font = params.font);
				params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
				params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
				params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
				params["font-style"] && (textpathStyle.fontStyle = params["font-style"])
			}
			if("arrow-start" in params) {
				addArrow(res, params["arrow-start"])
			}
			if("arrow-end" in params) {
				addArrow(res, params["arrow-end"], 1)
			}
			if(params.opacity != null || params["stroke-width"] != null || params.fill != null || params.src != null || params.stroke != null || params["stroke-width"] != null || params["stroke-opacity"] != null || params["fill-opacity"] != null || params["stroke-dasharray"] != null || params["stroke-miterlimit"] != null || params["stroke-linejoin"] != null || params["stroke-linecap"] != null) {
				var fill = node.getElementsByTagName(fillString),
					newfill = false;
				fill = fill && fill[0];
				!fill && (newfill = fill = createNode(fillString));
				if(o.type == "image" && params.src) {
					fill.src = params.src
				}
				params.fill && (fill.on = true);
				if(fill.on == null || params.fill == "none" || params.fill === null) {
					fill.on = false
				}
				if(fill.on && params.fill) {
					var isURL = Str(params.fill).match(R._ISURL);
					if(isURL) {
						fill.parentNode == node && node.removeChild(fill);
						fill.rotate = true;
						fill.src = isURL[1];
						fill.type = "tile";
						var bbox = o.getBBox(1);
						fill.position = bbox.x + S + bbox.y;
						o._.fillpos = [bbox.x, bbox.y];
						R._preload(isURL[1], function() {
							o._.fillsize = [this.offsetWidth, this.offsetHeight]
						})
					} else {
						fill.color = R.getRGB(params.fill).hex;
						fill.src = E;
						fill.type = "solid";
						if(R.getRGB(params.fill).error && (res.type in {
								circle: 1,
								ellipse: 1
							} || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
							a.fill = "none";
							a.gradient = params.fill;
							fill.rotate = false
						}
					}
				}
				if("fill-opacity" in params || "opacity" in params) {
					var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
					opacity = mmin(mmax(opacity, 0), 1);
					fill.opacity = opacity;
					if(fill.src) {
						fill.color = "none"
					}
				}
				node.appendChild(fill);
				var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
					newstroke = false;
				!stroke && (newstroke = stroke = createNode("stroke"));
				if((params.stroke && params.stroke != "none") || params["stroke-width"] || params["stroke-opacity"] != null || params["stroke-dasharray"] || params["stroke-miterlimit"] || params["stroke-linejoin"] || params["stroke-linecap"]) {
					stroke.on = true
				}(params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
				var strokeColor = R.getRGB(params.stroke);
				stroke.on && params.stroke && (stroke.color = strokeColor.hex);
				opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
				var width = (toFloat(params["stroke-width"]) || 1) * 0.75;
				opacity = mmin(mmax(opacity, 0), 1);
				params["stroke-width"] == null && (width = a["stroke-width"]);
				params["stroke-width"] && (stroke.weight = width);
				width && width < 1 && (opacity *= width) && (stroke.weight = 1);
				if(opacity < 0) {
					opacity = 0
				}
				if(opacity > 1) {
					opacity = 1
				}
				stroke.opacity = opacity;
				params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
				stroke.miterlimit = params["stroke-miterlimit"] || 8;
				params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
				if(params["stroke-dasharray"]) {
					var dasharray = {
						"-": "shortdash",
						".": "shortdot",
						"-.": "shortdashdot",
						"-..": "shortdashdotdot",
						". ": "dot",
						"- ": "dash",
						"--": "longdash",
						"- .": "dashdot",
						"--.": "longdashdot",
						"--..": "longdashdotdot"
					};
					stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E
				}
				newstroke && node.appendChild(stroke)
			}
			if(res.type == "text") {
				res.paper.canvas.style.display = E;
				var span = res.paper.span,
					m = 100,
					fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
				s = span.style;
				a.font && (s.font = a.font);
				a["font-family"] && (s.fontFamily = a["font-family"]);
				a["font-weight"] && (s.fontWeight = a["font-weight"]);
				a["font-style"] && (s.fontStyle = a["font-style"]);
				fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
				s.fontSize = fontSize * m + "px";
				res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
				var brect = span.getBoundingClientRect();
				res.W = a.w = (brect.right - brect.left) / m;
				res.H = a.h = (brect.bottom - brect.top) / m;
				res.X = a.x;
				res.Y = a.y + res.H / 2;
				("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
				var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
				for(var d = 0, dd = dirtyattrs.length; d < dd; d++) {
					if(dirtyattrs[d] in params) {
						res._.dirty = 1;
						break
					}
				}
				switch(a["text-anchor"]) {
					case "start":
						res.textpath.style["v-text-align"] = "left";
						res.bbx = res.W / 2;
						break;
					case "end":
						res.textpath.style["v-text-align"] = "right";
						res.bbx = -res.W / 2;
						break;
					default:
						res.textpath.style["v-text-align"] = "center";
						res.bbx = 0;
						break
				}
				res.textpath.style["v-text-kern"] = true
			}
		},
		addGradientFill = function(o, gradient, fill) {
			o.attrs = o.attrs || {};
			var attrs = o.attrs,
				pow = Math.pow,
				opacity, oindex, type = "linear",
				fxfy = ".5 .5";
			o.attrs.gradient = gradient;
			gradient = Str(gradient).replace(R._radial_gradient, function(all, fx, fy) {
				type = "radial";
				if(fx && fy) {
					fx = toFloat(fx);
					fy = toFloat(fy);
					pow(fx - 0.5, 2) + pow(fy - 0.5, 2) > 0.25 && (fy = math.sqrt(0.25 - pow(fx - 0.5, 2)) * ((fy > 0.5) * 2 - 1) + 0.5);
					fxfy = fx + S + fy
				}
				return E
			});
			gradient = gradient.split(/\s*\-\s*/);
			if(type == "linear") {
				var angle = gradient.shift();
				angle = -toFloat(angle);
				if(isNaN(angle)) {
					return null
				}
			}
			var dots = R._parseDots(gradient);
			if(!dots) {
				return null
			}
			o = o.shape || o.node;
			if(dots.length) {
				o.removeChild(fill);
				fill.on = true;
				fill.method = "none";
				fill.color = dots[0].color;
				fill.color2 = dots[dots.length - 1].color;
				var clrs = [];
				for(var i = 0, ii = dots.length; i < ii; i++) {
					dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color)
				}
				fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
				if(type == "radial") {
					fill.type = "gradientTitle";
					fill.focus = "100%";
					fill.focussize = "0 0";
					fill.focusposition = fxfy;
					fill.angle = 0
				} else {
					fill.type = "gradient";
					fill.angle = (270 - angle) % 360
				}
				o.appendChild(fill)
			}
			return 1
		},
		Element = function(node, vml) {
			this[0] = this.node = node;
			node.raphael = true;
			this.id = R._oid++;
			node.raphaelid = this.id;
			this.X = 0;
			this.Y = 0;
			this.attrs = {};
			this.paper = vml;
			this.matrix = R.matrix();
			this._ = {
				transform: [],
				sx: 1,
				sy: 1,
				dx: 0,
				dy: 0,
				deg: 0,
				dirty: 1,
				dirtyT: 1
			};
			!vml.bottom && (vml.bottom = this);
			this.prev = vml.top;
			vml.top && (vml.top.next = this);
			vml.top = this;
			this.next = null
		};
	var elproto = R.el;
	Element.prototype = elproto;
	elproto.constructor = Element;
	elproto.transform = function(tstr) {
		if(tstr == null) {
			return this._.transform
		}
		var vbs = this.paper._viewBoxShift,
			vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
			oldt;
		if(vbs) {
			oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E)
		}
		R._extractTransform(this, vbt + tstr);
		var matrix = this.matrix.clone(),
			skew = this.skew,
			o = this.node,
			split, isGrad = ~Str(this.attrs.fill).indexOf("-"),
			isPatt = !Str(this.attrs.fill).indexOf("url(");
		matrix.translate(-0.5, -0.5);
		if(isPatt || isGrad || this.type == "image") {
			skew.matrix = "1 0 0 1";
			skew.offset = "0 0";
			split = matrix.split();
			if((isGrad && split.noRotation) || !split.isSimple) {
				o.style.filter = matrix.toFilter();
				var bb = this.getBBox(),
					bbt = this.getBBox(1),
					dx = bb.x - bbt.x,
					dy = bb.y - bbt.y;
				o.coordorigin = (dx * -zoom) + S + (dy * -zoom);
				setCoords(this, 1, 1, dx, dy, 0)
			} else {
				o.style.filter = E;
				setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate)
			}
		} else {
			o.style.filter = E;
			skew.matrix = Str(matrix);
			skew.offset = matrix.offset()
		}
		oldt && (this._.transform = oldt);
		return this
	};
	elproto.rotate = function(deg, cx, cy) {
		if(this.removed) {
			return this
		}
		if(deg == null) {
			return
		}
		deg = Str(deg).split(separator);
		if(deg.length - 1) {
			cx = toFloat(deg[1]);
			cy = toFloat(deg[2])
		}
		deg = toFloat(deg[0]);
		(cy == null) && (cx = cy);
		if(cx == null || cy == null) {
			var bbox = this.getBBox(1);
			cx = bbox.x + bbox.width / 2;
			cy = bbox.y + bbox.height / 2
		}
		this._.dirtyT = 1;
		this.transform(this._.transform.concat([
			["r", deg, cx, cy]
		]));
		return this
	};
	elproto.translate = function(dx, dy) {
		if(this.removed) {
			return this
		}
		dx = Str(dx).split(separator);
		if(dx.length - 1) {
			dy = toFloat(dx[1])
		}
		dx = toFloat(dx[0]) || 0;
		dy = +dy || 0;
		if(this._.bbox) {
			this._.bbox.x += dx;
			this._.bbox.y += dy
		}
		this.transform(this._.transform.concat([
			["t", dx, dy]
		]));
		return this
	};
	elproto.scale = function(sx, sy, cx, cy) {
		if(this.removed) {
			return this
		}
		sx = Str(sx).split(separator);
		if(sx.length - 1) {
			sy = toFloat(sx[1]);
			cx = toFloat(sx[2]);
			cy = toFloat(sx[3]);
			isNaN(cx) && (cx = null);
			isNaN(cy) && (cy = null)
		}
		sx = toFloat(sx[0]);
		(sy == null) && (sy = sx);
		(cy == null) && (cx = cy);
		if(cx == null || cy == null) {
			var bbox = this.getBBox(1)
		}
		cx = cx == null ? bbox.x + bbox.width / 2 : cx;
		cy = cy == null ? bbox.y + bbox.height / 2 : cy;
		this.transform(this._.transform.concat([
			["s", sx, sy, cx, cy]
		]));
		this._.dirtyT = 1;
		return this
	};
	elproto.hide = function() {
		!this.removed && (this.node.style.display = "none");
		return this
	};
	elproto.show = function() {
		!this.removed && (this.node.style.display = E);
		return this
	};
	elproto._getBBox = function() {
		if(this.removed) {
			return {}
		}
		return {
			x: this.X + (this.bbx || 0) - this.W / 2,
			y: this.Y - this.H,
			width: this.W,
			height: this.H
		}
	};
	elproto.remove = function() {
		if(this.removed || !this.node.parentNode) {
			return
		}
		this.paper.__set__ && this.paper.__set__.exclude(this);
		R.eve.unbind("raphael.*.*." + this.id);
		R._tear(this, this.paper);
		this.node.parentNode.removeChild(this.node);
		this.shape && this.shape.parentNode.removeChild(this.shape);
		for(var i in this) {
			this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
		}
		this.removed = true
	};
	elproto.attr = function(name, value) {
		if(this.removed) {
			return this
		}
		if(name == null) {
			var res = {};
			for(var a in this.attrs) {
				if(this.attrs[has](a)) {
					res[a] = this.attrs[a]
				}
			}
			res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
			res.transform = this._.transform;
			return res
		}
		if(value == null && R.is(name, "string")) {
			if(name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
				return this.attrs.gradient
			}
			var names = name.split(separator),
				out = {};
			for(var i = 0, ii = names.length; i < ii; i++) {
				name = names[i];
				if(name in this.attrs) {
					out[name] = this.attrs[name]
				} else {
					if(R.is(this.paper.customAttributes[name], "function")) {
						out[name] = this.paper.customAttributes[name].def
					} else {
						out[name] = R._availableAttrs[name]
					}
				}
			}
			return ii - 1 ? out : out[names[0]]
		}
		if(this.attrs && value == null && R.is(name, "array")) {
			out = {};
			for(i = 0, ii = name.length; i < ii; i++) {
				out[name[i]] = this.attr(name[i])
			}
			return out
		}
		var params;
		if(value != null) {
			params = {};
			params[name] = value
		}
		value == null && R.is(name, "object") && (params = name);
		for(var key in params) {
			eve("raphael.attr." + key + "." + this.id, this, params[key])
		}
		if(params) {
			for(key in this.paper.customAttributes) {
				if(this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
					var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
					this.attrs[key] = params[key];
					for(var subkey in par) {
						if(par[has](subkey)) {
							params[subkey] = par[subkey]
						}
					}
				}
			}
			if(params.text && this.type == "text") {
				this.textpath.string = params.text
			}
			setFillAndStroke(this, params)
		}
		return this
	};
	elproto.toFront = function() {
		!this.removed && this.node.parentNode.appendChild(this.node);
		this.paper && this.paper.top != this && R._tofront(this, this.paper);
		return this
	};
	elproto.toBack = function() {
		if(this.removed) {
			return this
		}
		if(this.node.parentNode.firstChild != this.node) {
			this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
			R._toback(this, this.paper)
		}
		return this
	};
	elproto.insertAfter = function(element) {
		if(this.removed) {
			return this
		}
		if(element.constructor == R.st.constructor) {
			element = element[element.length - 1]
		}
		if(element.node.nextSibling) {
			element.node.parentNode.insertBefore(this.node, element.node.nextSibling)
		} else {
			element.node.parentNode.appendChild(this.node)
		}
		R._insertafter(this, element, this.paper);
		return this
	};
	elproto.insertBefore = function(element) {
		if(this.removed) {
			return this
		}
		if(element.constructor == R.st.constructor) {
			element = element[0]
		}
		element.node.parentNode.insertBefore(this.node, element.node);
		R._insertbefore(this, element, this.paper);
		return this
	};
	elproto.blur = function(size) {
		var s = this.node.runtimeStyle,
			f = s.filter;
		f = f.replace(blurregexp, E);
		if(+size !== 0) {
			this.attrs.blur = size;
			s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
			s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5))
		} else {
			s.filter = f;
			s.margin = 0;
			delete this.attrs.blur
		}
	};
	R._engine.path = function(pathString, vml) {
		var el = createNode("shape");
		el.style.cssText = cssDot;
		el.coordsize = zoom + S + zoom;
		el.coordorigin = vml.coordorigin;
		var p = new Element(el, vml),
			attr = {
				fill: "none",
				stroke: "#000"
			};
		pathString && (attr.path = pathString);
		p.type = "path";
		p.path = [];
		p.Path = E;
		setFillAndStroke(p, attr);
		vml.canvas.appendChild(el);
		var skew = createNode("skew");
		skew.on = true;
		el.appendChild(skew);
		p.skew = skew;
		p.transform(E);
		return p
	};
	R._engine.rect = function(vml, x, y, w, h, r) {
		var path = R._rectPath(x, y, w, h, r),
			res = vml.path(path),
			a = res.attrs;
		res.X = a.x = x;
		res.Y = a.y = y;
		res.W = a.width = w;
		res.H = a.height = h;
		a.r = r;
		a.path = path;
		res.type = "rect";
		return res
	};
	R._engine.ellipse = function(vml, x, y, rx, ry) {
		var res = vml.path(),
			a = res.attrs;
		res.X = x - rx;
		res.Y = y - ry;
		res.W = rx * 2;
		res.H = ry * 2;
		res.type = "ellipse";
		setFillAndStroke(res, {
			cx: x,
			cy: y,
			rx: rx,
			ry: ry
		});
		return res
	};
	R._engine.circle = function(vml, x, y, r) {
		var res = vml.path(),
			a = res.attrs;
		res.X = x - r;
		res.Y = y - r;
		res.W = res.H = (r) * 2;
		res.type = "circle";
		setFillAndStroke(res, {
			cx: x,
			cy: y,
			r: r
		});
		return res
	};
	R._engine.image = function(vml, src, x, y, w, h) {
		var path = R._rectPath(x, y, w, h),
			res = vml.path(path).attr({
				stroke: "none"
			}),
			a = res.attrs,
			node = res.node,
			fill = node.getElementsByTagName(fillString)[0];
		a.src = src;
		res.X = a.x = x;
		res.Y = a.y = y;
		res.W = a.width = w;
		res.H = a.height = h;
		a.path = path;
		res.type = "image";
		fill.parentNode == node && node.removeChild(fill);
		fill.rotate = true;
		fill.src = src;
		fill.type = "tile";
		res._.fillpos = [x, y];
		res._.fillsize = [w, h];
		node.appendChild(fill);
		setCoords(res, 1, 1, 0, 0, 0);
		return res
	};
	R._engine.text = function(vml, x, y, text) {
		var el = createNode("shape"),
			path = createNode("path"),
			o = createNode("textpath");
		x = x || 0;
		y = y || 0;
		text = text || "";
		path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
		path.textpathok = true;
		o.string = Str(text);
		o.on = true;
		el.style.cssText = cssDot;
		el.coordsize = zoom + S + zoom;
		el.coordorigin = "0 0";
		var p = new Element(el, vml),
			attr = {
				fill: "#000",
				stroke: "none",
				font: R._availableAttrs.font,
				text: text
			};
		p.shape = el;
		p.path = path;
		p.textpath = o;
		p.type = "text";
		p.attrs.text = Str(text);
		p.attrs.x = x;
		p.attrs.y = y;
		p.attrs.w = 1;
		p.attrs.h = 1;
		setFillAndStroke(p, attr);
		el.appendChild(o);
		el.appendChild(path);
		vml.canvas.appendChild(el);
		var skew = createNode("skew");
		skew.on = true;
		el.appendChild(skew);
		p.skew = skew;
		p.transform(E);
		return p
	};
	R._engine.setSize = function(width, height) {
		var cs = this.canvas.style;
		this.width = width;
		this.height = height;
		width == +width && (width += "px");
		height == +height && (height += "px");
		cs.width = width;
		cs.height = height;
		cs.clip = "rect(0 " + width + " " + height + " 0)";
		if(this._viewBox) {
			R._engine.setViewBox.apply(this, this._viewBox)
		}
		return this
	};
	R._engine.setViewBox = function(x, y, w, h, fit) {
		R.eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
		var width = this.width,
			height = this.height,
			size = 1 / mmax(w / width, h / height),
			H, W;
		if(fit) {
			H = height / h;
			W = width / w;
			if(w * H < width) {
				x -= (width - w * H) / 2 / H
			}
			if(h * W < height) {
				y -= (height - h * W) / 2 / W
			}
		}
		this._viewBox = [x, y, w, h, !!fit];
		this._viewBoxShift = {
			dx: -x,
			dy: -y,
			scale: size
		};
		this.forEach(function(el) {
			el.transform("...")
		});
		return this
	};
	var createNode;
	R._engine.initWin = function(win) {
		var doc = win.document;
		doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
		try {
			!doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
			createNode = function(tagName) {
				return doc.createElement("<rvml:" + tagName + ' class="rvml">')
			}
		} catch(e) {
			createNode = function(tagName) {
				return doc.createElement("<" + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
			}
		}
	};
	R._engine.initWin(R._g.win);
	R._engine.create = function() {
		var con = R._getContainer.apply(0, arguments),
			container = con.container,
			height = con.height,
			s, width = con.width,
			x = con.x,
			y = con.y;
		if(!container) {
			throw new Error("VML container not found.")
		}
		var res = new R._Paper,
			c = res.canvas = R._g.doc.createElement("div"),
			cs = c.style;
		x = x || 0;
		y = y || 0;
		width = width || 512;
		height = height || 342;
		res.width = width;
		res.height = height;
		width == +width && (width += "px");
		height == +height && (height += "px");
		res.coordsize = zoom * 1000 + S + zoom * 1000;
		res.coordorigin = "0 0";
		res.span = R._g.doc.createElement("span");
		res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
		c.appendChild(res.span);
		cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
		if(container == 1) {
			R._g.doc.body.appendChild(c);
			cs.left = x + "px";
			cs.top = y + "px";
			cs.position = "absolute"
		} else {
			if(container.firstChild) {
				container.insertBefore(c, container.firstChild)
			} else {
				container.appendChild(c)
			}
		}
		res.renderfix = function() {};
		return res
	};
	R.prototype.clear = function() {
		R.eve("raphael.clear", this);
		this.canvas.innerHTML = E;
		this.span = R._g.doc.createElement("span");
		this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
		this.canvas.appendChild(this.span);
		this.bottom = this.top = null
	};
	R.prototype.remove = function() {
		R.eve("raphael.remove", this);
		this.canvas.parentNode.removeChild(this.canvas);
		for(var i in this) {
			this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null
		}
		return true
	};
	var setproto = R.st;
	for(var method in elproto) {
		if(elproto[has](method) && !setproto[has](method)) {
			setproto[method] = (function(methodname) {
				return function() {
					var arg = arguments;
					return this.forEach(function(el) {
						el[methodname].apply(el, arg)
					})
				}
			})(method)
		}
	}
}(window.Raphael);

function ParseXml() {}
ParseXml.prototype.parseXml = function(xml) {
	var xmldom = null;
	if(typeof DOMParser != "undefined") {
		xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
		var errors = xmldom.getElementsByTagName("parsererror");
		if(errors.length) {
			throw new Error("xml parsing error:" + errors[0].textContent)
		}
	} else {
		if(document.implementation.hasFeature("LS", "3.0")) {
			var implementation = document.implementaton;
			var parser = implementation.createLSParser(implementation.MODE_SYNCHRONOUS, null);
			var input = implementation.createLSInput();
			input.stringData = xml;
			xmldom = parser.parse(input)
		} else {
			if(typeof ActiveXObject != "undefined") {
				xmldom = this.createDocument();
				xmldom.loadXML(xml);
				if(xmldom.parseError != 0) {
					throw new Error("XML parsing error:" + xmldom.parseError.reason())
				}
			} else {
				throw new Error("no XML parser available")
			}
		}
	}
	return xmldom
};
ParseXml.prototype.createDocument = function() {
	if(typeof arguments.callee.activeXString != "string") {
		var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"];
		for(var i = 0, len = versions.length; i < len; i++) {
			try {
				var xmldom = new ActiveXObject(versions[i]);
				arguments.callee.activeXString = versions[i];
				return xmldom
			} catch(ex) {}
		}
	}
	return new ActiveXObject(arguments.callee.activeXString)
};
ParseXml.prototype.findNode = function(tagNode, nodename) {
	var childNodes = tagNode.childNodes;
	var findNodes = [];
	for(var i = 0, len = childNodes.length; i < len; i++) {
		if(childNodes[i].tagName == nodename) {
			findNodes.push(childNodes[i])
		}
	}
	return findNodes
};
if(typeof EzServerClient.GlobeFunction == "undefined" || !EzServerClient.GlobeFunction) {
	EzServerClient.GlobeFunction = {}
}
var m_EzServer = EzServerClient.GlobeParams.EzServerClientURL;
var _MapService = EzServerClient.GlobeParams.EzServerClientURL;
var _ImageBaseUrl = EzServerClient.GlobeParams.EzServerClientURL + "/images/";
EzServerClient.GlobeParams.bIsMercatorMap = false;
if(typeof(EzServerClient.GlobeParams.Copyright) != "undefined") {
	_mCopyright = EzServerClient.GlobeParams.Copyright
} else {
	_mCopyright = [""]
}
if(typeof(EzServerClient.GlobeParams.Version) != "undefined") {
	_Ver = EzServerClient.GlobeParams.Version
} else {
	_Ver = 0.3
}
if(!EzServerClient.GlobeParams.DynamicCopyright) {
	EzServerClient.GlobeParams.DynamicCopyright = []
}
_LineWidth = 1;
_LineColor = "Yellow";
if(typeof(EzServerClient.GlobeParams.MapFullExtent) != "undefined") {
	_FullExtentMBR = EzServerClient.GlobeParams.MapFullExtent
} else {
	_FullExtentMBR = [116, 39, 117, 40]
}
if(typeof(EzServerClient.GlobeParams.CenterPoint) == "undefined") {
	_MapCenter = [(_FullExtentMBR[2] + _FullExtentMBR[0]) / 2, (_FullExtentMBR[3] + _FullExtentMBR[1]) / 2]
} else {
	_MapCenter = EzServerClient.GlobeParams.CenterPoint
}
if(typeof(EzServerClient.GlobeParams.MapInitLevel) != "undefined") {
	_InitLevel = EzServerClient.GlobeParams.MapInitLevel
} else {
	_InitLevel = 9;
	EzServerClient.GlobeParams.MapInitLevel = 9
}
if(typeof(EzServerClient.GlobeParams.MapMaxLevel) != "undefined") {
	_MaxLevel = EzServerClient.GlobeParams.MapMaxLevel
} else {
	_MaxLevel = 12;
	EzServerClient.GlobeParams.MapMaxLevel = 12
}
if(typeof(EzServerClient.GlobeParams.ZoomOffset) != "undefined") {
	_ZoomOffset = EzServerClient.GlobeParams.ZoomOffset
} else {
	_ZoomOffset = 0;
	EzServerClient.GlobeParams.ZoomOffset = 0
}
if(typeof(EzServerClient.GlobeParams.MapConvertScale) != "undefined") {
	_convert_scale = EzServerClient.GlobeParams.MapConvertScale
} else {
	_convert_scale = 114699;
	EzServerClient.GlobeParams.MapConvertScale = 114699
}
if(typeof(EzServerClient.GlobeParams.MapConvertOffsetX) != "undefined") {
	_convert_ofsx = EzServerClient.GlobeParams.MapConvertOffsetX
} else {
	_convert_ofsx = 0;
	EzServerClient.GlobeParams.MapConvertOffsetX = 0
}
if(typeof(EzServerClient.GlobeParams.MapConvertOffsetY) != "undefined") {
	_convert_ofsy = EzServerClient.GlobeParams.MapConvertOffsetY
} else {
	_convert_ofsy = 0;
	EzServerClient.GlobeParams.MapConvertOffsetY = 0
}
_bIsWriteFile = true;
if(typeof(EzServerClient.GlobeParams.MapUnitPixels) != "undefined") {
	_MapUnitPixels = EzServerClient.GlobeParams.MapUnitPixels
} else {
	_MapUnitPixels = 256;
	EzServerClient.GlobeParams.MapUnitPixels = 256
}
if(typeof(EzServerClient.GlobeParams.MapCoordinateType) != "undefined") {
	_MapSpanScale = EzServerClient.GlobeParams.MapCoordinateType
} else {
	_MapSpanScale = 1;
	EzServerClient.GlobeParams.MapCoordinateType = 1
}
if(typeof(EzServerClient.GlobeParams.IsOverlay) != "undefined") {
	_bIsOverlay = EzServerClient.GlobeParams.IsOverlay
} else {
	_bIsOverlay = true;
	EzServerClient.GlobeParams.IsOverlay = true
}
if(typeof(EzServerClient.GlobeParams.MapProx) != "undefined") {
	_bMapProx = EzServerClient.GlobeParams.MapProx
} else {
	_bMapProx = false;
	EzServerClient.GlobeParams.MapProx = false
}
if(typeof EzServerClient.GlobeParams.ZoomLevelSequence == "undefined") {
	EzServerClient.GlobeParams.ZoomLevelSequence = 2
}
if(!EzServerClient.GlobeParams.TileAnchorPoint) {
	EzServerClient.GlobeParams.TileAnchorPoint = [0, 0]
}
if(typeof(EzServerClient.GlobeParams.EzMapServiceURL) != "undefined") {
	m_MapServer = EzServerClient.GlobeParams.EzMapServiceURL
} else {
	m_MapServer = "/EzMapService"
}
EzErrorFactory = {
	createError: function(message, cause) {
		if(cause) {
			return new Error(message + "\r\n由于:" + cause.message)
		} else {
			return new Error(message)
		}
	}
};
EzServerClient.GlobeFunction.isTypeRight = function(param1, type) {
	switch(type) {
		case "string":
			if(typeof param1 == "string") {
				return true
			} else {
				return false
			}
		case "int":
			if(typeof param1 == "number") {
				if(param1.toString().indexOf(".") == -1) {
					return true
				} else {
					return false
				}
			} else {
				return false
			}
		case "float":
			if(typeof param1 == "number") {
				return true
			} else {
				return false
			}
		case "number":
			if(typeof param1 == "number") {
				return true
			} else {
				return false
			}
		case "boolean":
			if(typeof param1 == "boolean") {
				return true
			} else {
				return false
			}
		case "function":
			if(typeof param1 == "function") {
				return true
			} else {
				return false
			}
		case "object":
			if(typeof param1 == "object") {
				return true
			} else {
				return false
			}
		case "undefined":
			if(typeof param1 == "undefined") {
				return true
			} else {
				return false
			}
		default:
			if(param1 instanceof eval(type)) {
				return true
			} else {
				return false
			}
	}
};
EzServerClient.GlobeFunction.getContextPath = function() {
	var location = document.location.toString();
	var contextPath = "";
	if(location.indexOf("://") != -1) {
		contextPath += location.substring(0, location.indexOf("//") + 2);
		location = location.substring(location.indexOf("//") + 2, location.length)
	}
	var index = location.indexOf("/");
	contextPath += location.substring(0, index + 1);
	location = location.substring(index + 1);
	index = location.indexOf("/");
	contextPath += location.substring(0, index + 1);
	return contextPath
};
EzServerClient.GlobeFunction.EzEncoding = function(s) {
	var sb = new String();
	for(var k = 0; k < s.length; k++) {
		var c = s.charAt(k);
		sb += EzServerClient.GlobeFunction.EzEncodingChar(c)
	}
	return sb
};
EzServerClient.GlobeFunction.EzEncodingChar = function(c) {
	switch(c.charCodeAt(0)) {
		case 60:
			return "&lt;";
		case 38:
			return "&amp;";
		case 62:
			return "&gt;";
		case 34:
			return "&quot;";
		default:
			return "" + c
	}
};
EzServerClient.GlobeFunction.getPathMBR = function(vStrPath) {
	var uPathPartList = vStrPath.split("|");
	var uPathInitList = uPathPartList[0].split(";")[0];
	var uMbr = EzServerClient.GlobeFunction.getPathMBRComma(uPathInitList);
	for(var i = 0; i < uPathPartList.length; i++) {
		var uSegmentPathList = uPathPartList[i].split(";");
		for(var j = 0; j < uSegmentPathList.length; j++) {
			if(i == 0) {
				continue
			}
			uMbr = MBR.union(uMbr, EzServerClient.GlobeFunction.getPathMBRComma(uSegmentPathList[j]))
		}
	}
	return uMbr
};
EzServerClient.GlobeFunction.getPathMBRComma = function(vStrPath) {
	var uPathList = vStrPath.split(",");
	var uPathNum = uPathList.length;
	if(uPathNum == 2) {
		return new MBR(parseFloat(uPathList[0]), parseFloat(uPathList[1]), parseFloat(uPathList[0]), parseFloat(uPathList[1]))
	} else {
		if(uPathNum == 3) {
			return new MBR(parseFloat(uPathList[0]) - parseFloat(uPathList[2]), parseFloat(uPathList[1]) - parseFloat(uPathList[2]), parseFloat(uPathList[0]) + parseFloat(uPathList[2]), parseFloat(uPathList[1]) + parseFloat(uPathList[2]))
		} else {
			if(uPathNum == 4) {
				return new MBR(Math.min(uPathList[0], uPathList[2]), Math.min(uPathList[1], uPathList[3]), Math.max(uPathList[0], uPathList[2]), Math.max(uPathList[1], uPathList[3]))
			} else {
				var uMinX = Math.min(uPathList[0], uPathList[2]),
					uMinY = Math.min(uPathList[1], uPathList[3]),
					uMaxX = Math.max(uPathList[0], uPathList[2]),
					uMaxY = Math.max(uPathList[1], uPathList[3]);
				for(var i = 4; i < uPathNum; i = i + 2) {
					if(uMinX > uPathList[i]) {
						uMinX = uPathList[i]
					} else {
						if(uMaxX < uPathList[i]) {
							uMaxX = uPathList[i]
						}
					}
					if(uMinY > uPathList[i + 1]) {
						uMinY = uPathList[i + 1]
					} else {
						if(uMaxY < uPathList[i + 1]) {
							uMaxY = uPathList[i + 1]
						}
					}
				}
				return new MBR(uMinX, uMinY, uMaxX, uMaxY)
			}
		}
	}
};
EzServerClient.GlobeFunction.setDynamicCopyright = function(vEzMap, copyRightArray) {
	EzServerClient.GlobeFunction.getCurrentSourceInfo_634 = function(mapApp) {
		var strServiceURL = mapApp.map.baseLayer.url;
		var curZoom = mapApp.getZoomLevel() + EzServerClient.GlobeParams.ZoomOffset;
		var centerPoint = mapApp.getCenterLatLng();
		var curCopyRight = EzServerClient.GlobeParams.Copyright;
		return {
			source: strServiceURL,
			zoom: curZoom,
			cp: centerPoint,
			defaultCopyRight: curCopyRight
		}
	};
	EzServerClient.GlobeFunction.setCopyRight = function(mapApp, copyright) {
		mapApp.map.copyRightLabel.innerHTML = copyright
	};
	EzServerClient.GlobeFunction.copyRightChangeDelegate = function(mapApp, copyRightA) {
		var csinfo = EzServerClient.GlobeFunction.getCurrentSourceInfo_634(mapApp);
		var setted = false;
		for(var i = 0; i < copyRightA.length; i++) {
			if(copyRightA[i].source != csinfo.source) {
				continue
			}
			if(copyRightA[i].minzoom > csinfo.zoom) {
				continue
			}
			if(copyRightA[i].maxzoom < csinfo.zoom) {
				continue
			}
			var region = new MBR(copyRightA[i].region[0], copyRightA[i].region[1], copyRightA[i].region[2], copyRightA[i].region[3]);
			if(region.containsPoint(csinfo.cp)) {
				EzServerClient.GlobeFunction.setCopyRight(mapApp, copyRightA[i].label);
				setted = true;
				break
			}
		}
		if(!setted) {
			EzServerClient.GlobeFunction.setCopyRight(mapApp, csinfo.defaultCopyRight)
		}
	};
	vEzMap.addMapChangeListener(function() {
		EzServerClient.GlobeFunction.copyRightChangeDelegate(vEzMap, copyRightArray)
	})
};
if(typeof EzEventListener == "undefined" || !EzEventListener) {
	var EzEventListener = function(source, eventType, handler) {
		this.source = source;
		this.eventType = eventType;
		this.handler = handler
	};
	EzEventListener.prototype = {
		getTarget: function() {
			return this.source
		},
		getHandler: function() {
			return this.handler
		},
		getEventType: function() {
			return this.eventType
		}
	}
}
if(typeof EzEvent == "undefined" || !EzEvent) {
	var EzEvent = {
		MAP_READY: "mapready",
		MAP_ADDOVERLAY: "mapaddoverlay",
		MAP_REMOVEOVERLAY: "mapremoveoverlay",
		MAP_CLEAROVERLAYS: "mapclearoverlays",
		MAP_CLICK: "mapclick",
		MAP_DBLCLICK: "mapdblclick",
		MAP_ZOOMCHANGE: "mapzoomchange",
		MAP_ZOOMSTART: "mapzoomstart",
		MAP_ZOOMEND: "mapzoomend",
		MAP_PAN: "mappan",
		MAP_PANSTART: "mappanstart",
		MAP_PANEND: "mappanend",
		MAP_MOUSEDOWN: "mapmousedown",
		MAP_MOUSEMOVE: "mapmousemove",
		MAP_MOUSEOUT: "mapmouseout",
		MAP_MOUSEOVER: "mapmouseover",
		MAP_MOUSEUP: "mapmouseup",
		MAP_MOUSEWHEEL: "mapmousewheel",
		MAP_SWITCHMAPSERVER: "mapswitchmapserver",
		MAP_RESIZE: "mapresize",
		MAP_VIEWCHANGE: "mapviewchange",
		MAP_PANINFOWINDOW: "mappaninfowindow"
	}
}
EzEvent.ezEventListener = new EzEventListener();
EzEvent.map = null;
EzEvent.eventType = null;
EzEvent.overlay = null;
EzEvent.mapPoint = new Point(0, 0);
EzEvent.screenPoint = new Point(0, 0);
EzEvent.zoomLevelPrevious = null;
EzEvent.zoomLevel = null;
EzEvent.extentPrevious = new MBR(0, 0, 0, 0);
EzEvent.extent = new MBR(0, 0, 0, 0);
EzEvent.wheelDelta = null;
EzEvent.mapServerIndexPrevious = 0;
EzEvent.mapServerIndex = 0;
EzEvent.keypanleftOffset = 0;
EzEvent.keypantopOffset = 0;
EzEvent.panInfoleftOffset = 0;
EzEvent.panInfotopOffset = 0;
EzEvent.addEventListener = function(source, eventType, handler) {
	source.addEventListener(eventType, handler);
	var eventListener = new EzEventListener(source, eventType, handler);
	return eventListener
};
EzEvent.removeEventListener = function(eventListener) {
	var source = eventListener.getTarget();
	var handler = eventListener.getHandler();
	var eventType = eventListener.getEventType();
	source.removeEventListener(eventType, handler)
};
EzEvent.trigger = function(eventListener, args) {
	var source = eventListener.getTarget();
	var eventType = eventListener.getEventType();
	args.eventType = eventType;
	source.fireEvent(eventType, args)
};
EzEvent.clearInstanceEventListeners = function(source, eventType) {
	delete source["on" + eventType]
};
EzEvent.clearEventListeners = function(source) {
	delete source["on" + this.MAP_READY];
	delete source["on" + this.MAP_ADDOVERLAY];
	delete source["on" + this.MAP_REMOVEOVERLAY];
	delete source["on" + this.MAP_CLEAROVERLAYS];
	delete source["on" + this.MAP_CLICK];
	delete source["on" + this.MAP_DBLCLICK];
	delete source["on" + this.MAP_ZOOMSTART];
	delete source["on" + this.MAP_ZOOMEND];
	delete source["on" + this.MAP_ZOOMCHANGE];
	delete source["on" + this.MAP_PANSTART];
	delete source["on" + this.MAP_PANEND];
	delete source["on" + this.MAP_PAN];
	delete source["on" + this.MAP_MOUSEDOWN];
	delete source["on" + this.MAP_MOUSEMOVE];
	delete source["on" + this.MAP_MOUSEOUT];
	delete source["on" + this.MAP_MOUSEOVER];
	delete source["on" + this.MAP_MOUSEUP];
	delete source["on" + this.MAP_MOUSEWHEEL];
	delete source["on" + this.MAP_SWITCHMAPSERVER];
	delete source["on" + this.MAP_RESIZE];
	delete source["on" + this.MAP_VIEWCHANGE];
	delete source["on" + this.MAP_VIEW]
};
EzServerClient.GlobeFunction.IncludeScript = function(inc) {
	var script = '<script type="text/javascript" src="scripts/' + inc + '"><\/script>';
	document.writeln(script)
};
EzServerClient.GlobeFunction.IncludeStyle = function(inc) {
	var style = '<link type="text/css" rel="stylesheet" href="styles/' + inc + '" />';
	document.writeln(style)
};
EzServerClient.GlobeParams.BrowserDPI = (function() {
	if(window.screen.deviceXDPI != undefined) {
		return {
			x: window.screen.deviceXDPI,
			y: window.screen.deviceYDPI
		}
	} else {
		var result = {
			x: 96,
			y: 96
		};
		return result
	}
})();
EzServerClient.GlobeParams.Browser = (function() {
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]: (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	if(Sys.ie) {
		return "IE"
	}
	if(Sys.firefox) {
		return "Firefox"
	}
	if(Sys.chrome) {
		return "Chrome"
	}
	if(Sys.opera) {
		return "Opera"
	}
	if(Sys.safari) {
		return "Safari"
	}
})();
EzServerClient.GlobeParams.BrowserTypeAndVersion = (function() {
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]: (s = ua.match(/rv\:([\d.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	if(Sys.ie) {
		EzServerClient.GlobeParams.BrowserType = "IE";
		EzServerClient.GlobeParams.IEVersion = Sys.ie;
		return "IE" + Sys.ie
	}
	if(Sys.firefox) {
		return "Firefox" + Sys.firefox
	}
	if(Sys.chrome) {
		return "Chrome" + Sys.chrome
	}
	if(Sys.opera) {
		return "Opera" + Sys.opera
	}
	if(Sys.safari) {
		return "Safari" + Sys.safari
	}
})();
EzServerClient.GlobeParams.Resolution = [2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625, 0.0078125, 0.00390625, 0.001953125, 0.0009765625, 0.00048828125, 0.000244140625, 0.0001220703125, 0.00006103515625, 0.000030517578125, 0.0000152587890625, 0.00000762939453125, 0.000003814697265625, 0.0000019073486328125, 9.5367431640625e-7, 4.76837158203125e-7];
EzServerClient.GlobeParams.DisplayScale_dpi96 = [786432000, 393216000, 196608000, 98304000, 49152000, 24576000, 12288000, 6144000, 3072000, 1536000, 768000, 384000, 192000, 96000, 48000, 24000, 12000, 6000, 3000, 1500, 750, 375, 187];
EzServerClient.GlobeParams.DisplayScale = [
	["4000公里", "83px", 4000000],
	["4000公里", "53px", 4000000],
	["2000公里", "53px", 2000000],
	["1000公里", "46px", 1000000],
	["1000公里", "78px", 1000000],
	["500公里", "74px", 500000],
	["200公里", "64px", 200000],
	["100公里", "69px", 100000],
	["50公里", "72px", 50000],
	["20公里", "59px", 20000],
	["10公里", "60px", 10000],
	["5公里", "60px", 5000],
	["2公里", "49px", 2000],
	["1公里", "49px", 1000],
	["500米", "49px", 500],
	["500米", "97px", 500],
	["200米", "78px", 200],
	["100米", "78px", 100],
	["50米", "78px", 50],
	["20米", "63px", 20],
	["10米", "63px", 10],
	["5米", "63px", 5],
	["2米", "50px", 2]
];

function getOffsetLeft(a) {
	return a == document.body ? 0 : a.offsetLeft + getOffsetLeft(a.offsetParent)
}

function getOffsetTop(a) {
	return a == document.body ? 0 : a.offsetTop + getOffsetTop(a.offsetParent)
}
var colours = new Array("#FFFFFF", "#FFCCCC", "#FFCC99", "#FFFF99", "#FFFFCC", "#99FF99", "#99FFFF", "#CCFFFF", "#CCCCFF", "#FFCCFF", "#CCCCCC", "#FF6666", "#FF9966", "#FFFF66", "#FFFF33", "#66FF99", "#33FFFF", "#66FFFF", "#9999FF", "#FF99FF", "#C0C0C0", "#FF0000", "#FF9900", "#FFCC66", "#FFFF00", "#33FF33", "#66CCCC", "#33CCFF", "#6666CC", "#CC66CC", "#999999", "#CC0000", "#FF6600", "#FFCC33", "#FFCC00", "#33CC00", "#00CCCC", "#3366FF", "#6633FF", "#CC33CC", "#666666", "#990000", "#CC6600", "#CC9933", "#999900", "#009900", "#339999", "#3333FF", "#6600CC", "#993399", "#333333", "#660000", "#993300", "#996633", "#666600", "#006600", "#336666", "#000099", "#333399", "#663366", "#000000", "#330000", "#663300", "#663333", "#333300", "#003300", "#003333", "#000066", "#330099", "#330033");
var g_divPreview;
var g_ColorHex;
var g_color_palette = null;

function mouseOver(el, Colour) {
	if(g_divPreview) {
		g_divPreview.style.background = Colour
	}
	if(g_ColorHex) {
		g_ColorHex.value = Colour
	}
	el.style.borderColor = "#FFFFFF"
}

function mouseOut(el) {
	el.style.borderColor = "#666666"
}

function mouseDown(Colour) {
	if(g_ColorHex) {
		g_ColorHex.value = Colour
	}
	if(g_color_palette) {
		g_color_palette.style.display = "none"
	}
}

function EzColorPicker(divPreview, ColorHex) {
	if(typeof divPreview == "string") {
		g_divPreview = Obj(divPreview)
	} else {
		g_divPreview = divPreview
	}
	if(typeof ColorHex == "string") {
		g_ColorHex = Obj(ColorHex)
	} else {
		g_ColorHex = ColorHex
	}
	if(!g_color_palette) {
		g_color_palette = document.createElement("div");
		g_color_palette.style.width = "200px";
		g_color_palette.style.height = "150px";
		g_color_palette.style.position = "absolute";
		document.body.appendChild(g_color_palette);
		code = "<table class='tblPalette' cellpadding='0' cellspacing='1' border='2'>";
		for(i = 0; i < 70; i++) {
			if((i) % 10 == 0) {
				code += "<tr>"
			}
			code += "<td id='el_" + i + "' bgcolor=" + colours[i] + " onMouseOver=\"mouseOver(this, '" + colours[i] + "');\" onMouseOut='mouseOut(this)' onclick=\"mouseDown('" + colours[i] + "');return false;\">&nbsp;</td>\n";
			if((i + 1) % 10 == 0) {
				code += "</tr>\n"
			}
		}
		g_color_palette.innerHTML = code + "</table>"
	}
	g_color_palette.style.top = getOffsetTop(g_divPreview);
	g_color_palette.style.left = getOffsetLeft(g_divPreview) + 40;
	g_color_palette.style.display = ""
}

function Obj(name) {
	return document[name] || (document.all && document.all[name]) || (document.getElementById && document.getElementById(name))
}
EzColorPicker.close = function() {
	if(g_color_palette) {
		g_color_palette.style.display = "none"
	}
};

function IEBrowser(Zg, og, oi) {
	this.type = Zg;
	this.version = og;
	this.os = oi
}
Object.prototype.setTimeout = function(ie, Bi) {
	var ke = "tempVar" + _m_iSeq;
	_m_iSeq++;
	if(_m_iSeq == Number.MAX_VALUE - 1) {
		_m_iSeq = 0
	}
	eval(ke + " = this;");
	var Rh = ie.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
	return window.setTimeout(ke + '._setTimeoutDispatcher("' + Rh + '");', Bi)
};
Object.prototype.toStringSize = toStringSize;
Object.prototype._setTimeoutDispatcher = function(ie) {
	eval(ie)
};
Object.prototype.eventHandler = function(tg) {
	var g = this;
	return function(b) {
		if(!b) {
			b = window.event
		}
		if(b && !b.target) {
			b.target = b.srcElement
		}
		g[tg](b)
	}
};
Object.prototype.Clone = function() {
	try {
		var objClone = new this.constructor();
		for(var key in this) {
			if(objClone[key] != this[key]) {
				if(typeof(this[key]) == "object") {
					objClone[key] = this[key].Clone()
				} else {
					objClone[key] = this[key]
				}
			}
		}
		if(!objClone || ("" + objClone) == "") {
			return(new String(this) + objClone) ? this : objClone
		} else {
			objClone.toString = this.toString;
			return objClone
		}
	} catch(e) {
		alert("Clone出现错误:" + e.message)
	}
};
Function.prototype.method = function(name, func, bStatic) {
	if(typeof bStatic == "undefined" || bStatic == true) {
		this.prototype[name] = func
	} else {
		this[name] = func
	}
	return this
};
Array.prototype.clear = function() {
	while(this.length > 0) {
		this.pop()
	}
};
Array.prototype.insert = function(index, value) {
	if(!(index >= 0)) {
		return
	}
	var original = this.slice();
	var iSize = this.length - index;
	var temp = original.splice(index, iSize);
	original[original.length] = value;
	original = original.concat(temp);
	return original
};
Array.prototype.indexOf = function(object) {
	for(var i = 0, length = this.length; i < length; i++) {
		if(this[i] == object) {
			return i
		}
	}
	return -1
};
EzServerClient.GlobeParams.InnerMaxZoomLevel = 24;
EzServerClient.GlobeParams.PerZoomLevelPixel = 12;
var iMaxLevel = EzServerClient.GlobeParams.InnerMaxZoomLevel + 1;
var iSliderH = 301;
var _overLayIndex = 100;
var iSpan = 0.03125;
_m_scale_meter = [2.5, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000, 20000000, 50000000, 100000000, 200000000];
var _m_MapSpan = new Array();
var _m_dMapSpanScale = _MapUnitPixels / 128;
if(typeof _MapSpanScale == "undefined") {
	_MapSpanScale = 1
}
for(var i = EzServerClient.GlobeParams.InnerMaxZoomLevel; i >= 0; i--) {
	_m_MapSpan[i] = iSpan;
	iSpan = iSpan * 2
}
var _m_MapBottomSpan = _m_dMapSpanScale * 3.515625;
var _m_MapBottomScale = 3000;
var _m_MapApp = null;
var _m_result = null;
if(_ZoomOffset != 0 || _MapSpanScale != 1) {
	var dScale = Math.pow(2, _ZoomOffset) * _MapSpanScale;
	_m_MapBottomScale = _m_MapBottomScale * dScale;
	_m_MapBottomSpan = _m_MapBottomSpan * dScale;
	var ZoomLen = _m_MapSpan.length;
	for(var iIndex = 0; iIndex < ZoomLen; iIndex++) {
		_m_MapSpan[iIndex] = _m_MapSpan[iIndex] / dScale
	}
}
var _RefreshSpeed = 13000;
var _TrackSpeed = 1000;
var _Debug = false;
var _Embed = true;
var _VMLInMap = false;
var _bIsGPSMonitor = false;
var _bIsVideoMonitor = false;
var _bIsResultTable = false;
var _bIsShowMapControl = false;
var _FlashTimeValve = 600;
var _mapName = "地图";
_u = navigator.userAgent.toLowerCase();
_mSiteName = "EasyMap";
_mEmailSubject = "EzService";
_mSearching = "查找...";
_mZoomIn = "放大";
_mZoomOut = "缩小";
_mZoomSet = "点击设置显示级别";
_mZoomDrag = "拖动缩放";
_mPanWest = "左移";
_mPanEast = "右移";
_mPanNorth = "上移";
_mPanSouth = "下移";
_mLastResult = "对中";
_mDataCopy = "地图数据 &copy;2005 山海经纬";
_mNormalMap = "Map";
_mNew = "New!";
_NoImage = new Image();
_NoImage.src = _ImageBaseUrl + "transparent.gif";
_TackImgURL = _ImageBaseUrl + "tack.gif";
_MapCenterPoint = new Point(_MapCenter[0], _MapCenter[1]);
var _TransparentImageUrl = _ImageBaseUrl + "transparent.png";
var _WaterImageUrl = _ImageBaseUrl + "water.gif";
var _MapCenterUrl = _ImageBaseUrl + "Mapcenter.gif";
var _MapDebugCenterUrl = _ImageBaseUrl + "Mapcenter_debug.gif";
var _MapBeingCenterUrl = _ImageBaseUrl + "car_flash1.gif";
var s = _ImageBaseUrl + "mobile.gif";
var _MobileFlashImgURL = _ImageBaseUrl + "mobile_flash.gif";
var _CloseImg = _ImageBaseUrl + "close.gif";
var Vi = _ImageBaseUrl + "markerTransparent.png";
var Ph = _ImageBaseUrl + "dd-start.png";
var lh = _ImageBaseUrl + "dd-end.png";
var hi = _ImageBaseUrl + "zoom-plus.gif";
var Zh = _ImageBaseUrl + "zoom-minus.gif";
var ei = _ImageBaseUrl + "sliderbar.gif";
EzServerClient.GlobeParams.ei_ascend = _ImageBaseUrl + "sliderbar_ascend.gif";
EzServerClient.GlobeParams.ei_descend22 = _ImageBaseUrl + "sliderbar_descend22.gif";
EzServerClient.GlobeParams.ei_ascend22 = _ImageBaseUrl + "sliderbar_ascend22.gif";
EzServerClient.GlobeParams.ei_ascend24 = _ImageBaseUrl + "sliderbar_ascend24.gif";
var Gh = _ImageBaseUrl + "slider.gif";
var kh = _ImageBaseUrl + "center.png";
var pi = _ImageBaseUrl + "east.png";
var Yh = _ImageBaseUrl + "west.png";
var jg = _ImageBaseUrl + "north.png";
var ni = _ImageBaseUrl + "south.png";
var Gi = _ImageBaseUrl + "panshadow.png";
var ch = _ImageBaseUrl + "slidershadow.png";
var fh = _ImageBaseUrl + "east-mini.png";
var Jh = _ImageBaseUrl + "west-mini.png";
var mh = _ImageBaseUrl + "north-mini.png";
var Oh = _ImageBaseUrl + "south-mini.png";
var Ch = _ImageBaseUrl + "zoom-plus-mini.png";
var sg = _ImageBaseUrl + "zoom-minus-mini.png";
var Fg = _ImageBaseUrl + "iws_nw.png";
var Oi = _ImageBaseUrl + "iws_n.png";
var ii = _ImageBaseUrl + "iws_ne.png";
var Og = _ImageBaseUrl + "iws_e.png";
var Gg = _ImageBaseUrl + "iws_c.png";
var Th = _ImageBaseUrl + "iws_w.png";
var Qg = _ImageBaseUrl + "iws_sw.png";
var qf = _ImageBaseUrl + "iws_s.png";
var Lg = _ImageBaseUrl + "iws_se.png";
var Eg = _ImageBaseUrl + "iws_tap.png";
var ti = _ImageBaseUrl + "iw_nw.png";
var Wh = _ImageBaseUrl + "iw_n.png";
var ji = _ImageBaseUrl + "iw_ne.png";
var Rg = _ImageBaseUrl + "iw_e.png";
var Wg = _ImageBaseUrl + "iw_c.png";
var bi = _ImageBaseUrl + "iw_w.png";
var vi = _ImageBaseUrl + "iw_sw.png";
var nf = _ImageBaseUrl + "iw_s.png";
var ng = _ImageBaseUrl + "iw_se.png";
var Hh = _ImageBaseUrl + "iw_tap.png";
var Di = _ImageBaseUrl + "close.gif";
var Gc = _ImageBaseUrl + "iw_tabstub.png";
var Fc = _ImageBaseUrl + "iw_tab.png";
var Ec = _ImageBaseUrl + "iw_tabback.png";
var _MonitorSelectID = "MonitorInfoPanel";
var _OverViewImg = "OverViewImg";
var _StartImgID = "RouteStart";
var _EndImgID = "RouteEnd";
var _pointImgURL = _MapDebugCenterUrl;
var _ZoomInURL = _ImageBaseUrl + "/zoomin.cur";
var _ZoomOutURL = _ImageBaseUrl + "/zoomout.cur";

function _UserAgent(t) {
	return _u.indexOf(t) != -1
}

function _uan(t) {
	if(!window.RegExp) {
		return 0
	}
	var r = new RegExp(t + "([0-9]*)");
	var s = r.exec(_u);
	var ret = 0;
	if(s.length >= 2) {
		ret = s[1]
	}
	return ret
}

function _compatIE() {
	return((_UserAgent("opera") && (_UserAgent("opera 7.5") || _UserAgent("opera/7.5") || _UserAgent("opera/8"))) || (_UserAgent("safari") && _uan("safari/") >= 125) || (_UserAgent("msie") && !_UserAgent("msie 4") && !_UserAgent("msie 5.0") && !_UserAgent("msie 5.1") && !_UserAgent("msie 3") && !_UserAgent("powerpc")) || (document.getElementById && window.XSLTProcessor && window.XMLHttpRequest && !_UserAgent("netscape6") && !_UserAgent("netscape/7.0") && false))
}

function _noActiveX() {
	if(!_UserAgent("msie") || !document.all || _UserAgent("opera")) {
		return false
	}
	var s = false;
	eval('try { new ActiveXObject("Microsoft.XMLDOM"); }catch (e) { s = true; }');
	return s
}

function getEleByID(i) {
	return document.getElementById(i)
}
var _nxsl = !_UserAgent("safari");

function _loadnxsl() {
	_nxsl = true;
	_checkLoad()
}

function _load(xml, doc) {
	if(!_c) {
		return
	}
	if(!getMapApp() || !_nxsl) {
		window._pending = xml
	} else {
		getMapApp().loadXML(xml, doc)
	}
}
var _wStr = "the map area below";

function _print() {
	if(!_c || !getMapApp()) {
		return
	}
	getMapApp().print()
}

function _checkLoad() {
	if(window._pending) {
		var xml = window._pending;
		window._pending = null;
		_load(xml)
	}
}
_sf = "hl=en";
_tv = ".3";
_fc = false;
_c = _fc;
_c = _fc || _compatIE();

function _script(src) {
	var ret = '<script src="' + src + '" type="text/javascript"><\/script>';
	document.write(ret)
}

function _havexslt() {
	if(typeof GetObject != "undefined" || (typeof XMLHttpRequest != "undefined" && typeof DOMParser != "undefined" && typeof XSLTProcessor != "undefined")) {
		return true
	} else {
		return false
	}
}
if(_c) {
	if(_havexslt()) {} else {
		if(_UserAgent("safari")) {
			_script("mapfiles/maps.6.safari.js")
		} else {
			_script("mapfiles/maps.6.xslt.js")
		}
	}
}
var _IEBrowser = new IEBrowser(0, 0, null);
var Gb = navigator.userAgent.toLowerCase();
if(Gb.indexOf("opera") != -1) {
	_IEBrowser.type = 4
} else {
	if(Gb.indexOf("msie") != -1 && document.all) {
		_IEBrowser.type = 1;
		if(Gb.indexOf("msie 5")) {
			_IEBrowser.version = 5
		}
	} else {
		if(Gb.indexOf("safari") != -1) {
			_IEBrowser.type = 3;
			if(Gb.indexOf("safari/125") != -1) {
				_IEBrowser.version = 1
			}
		} else {
			if(Gb.indexOf("mozilla") != -1) {
				_IEBrowser.type = 2
			}
		}
	}
}
if(Gb.indexOf("x11;") != -1) {
	_IEBrowser.os = 1
}
var _MaxNumber = Number.MAX_VALUE;
var _m_iSeq = 0;

function StrLength(str) {
	var lowStr = str.toLowerCase();
	var lastLen = 0;
	var len = lowStr.split("<br>");
	for(var i = 0; i < len.length; i++) {
		var strLen = 0;
		for(var j = 0; j < len[i].length; j++) {
			if(len[i].substr(j, 1).charCodeAt(0) > 255) {
				strLen = strLen + 2
			} else {
				strLen++
			}
		}
		if(strLen > lastLen) {
			lastLen = strLen
		}
	}
	return lastLen
}

function toStringSize(intTmp, size) {
	var str = intTmp + "";
	while(str.length < size) {
		str = "0" + str
	}
	return str
}

function Fb(xe) {
	return xe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function Ec(xe) {
	return Fb(xe).replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
}
document.getElementsByClassName = function(J) {
	var vc = document.all;
	if(!vc) {
		vc = document.getElementsByTagName("*")
	}
	var pe = new Array();
	for(var a = 0; a < vc.length; a++) {
		if(vc[a].className == J) {
			pe[pe.length] = vc[a]
		}
	}
	return pe
};

function setCursor(d, We) {
	try {
		d.style.cursor = We
	} catch(b) {
		if(We == "pointer") {
			setCursor(d, "hand")
		}
	}
}

function RemoveImg(pImg) {
	if(pImg && pImg.parentNode) {
		pImg.parentNode.removeChild(pImg)
	}
}

function getTargetElement(evt) {
	var elem;
	if(evt.target) {
		elem = (evt.target.nodeType == 3) ? evt.target.parentNode : evt.target
	} else {
		elem = evt.srcElement
	}
	return elem
}

function S(b) {
	if(_IEBrowser.type == 1) {
		window.event.cancelBubble = true
	} else {
		b.cancelBubble = true;
		b.preventDefault();
		b.stopPropagation()
	}
}

function Bh(yd, Qi) {
	var Oa = window.document.createElement("a");
	Oa.href = "PolylineDrawer";
	Oa.onclick = Qi;
	Oa.appendChild(window.document.createTextNode(yd));
	return Oa
}
if(!Array.prototype.push) {
	Array.prototype.push = function(ff) {
		this[this.length] = ff
	}
}

function convert2Px(x) {
	return x + "px"
}

function setClass(d, Fa) {
	if(d.className) {
		d.className += " " + Fa
	} else {
		d.className = Fa
	}
}

function ObjectOffset(s) {
	var A = {
		x: 0,
		y: 0
	};
	while(s) {
		A.x += s.offsetLeft;
		A.y += s.offsetTop;
		s = s.offsetParent
	}
	return A
}

function Tg(s, Cg) {
	var A = {
		x: 0,
		y: 0
	};
	while(s && s != Cg) {
		A.x += s.offsetLeft;
		A.y += s.offsetTop;
		s = s.offsetParent
	}
	return A
}

function _NoAction() {
	return false
}
var md = new Array("q", "ll", "spn", "z", "t", "sll", "sspn", "vp", "f", "output", "file", "deb");

function ud(C) {
	if(C.toFixed) {
		return C.toFixed(6).toString()
	} else {
		return C.toString()
	}
}
var sb = new Object();
var ae = "mapsxmlhttpiframe";

function RemoveChildren(d) {
	if(typeof d == "undefined" || d == null) {
		return
	}
	while(d.hasChildNodes()) {
		d.removeChild(d.lastChild)
	}
}

function bindingDoc(str) {
	try {
		if(typeof ActiveXObject != "undefined" && typeof GetObject != "undefined") {
			var Af = new ActiveXObject("Microsoft.XMLDOM");
			Af.loadXML(str);
			return Af
		} else {
			if(typeof DOMParser != "undefined") {
				return(new DOMParser()).parseFromString(str, "text/xml")
			} else {
				return voidFunc(str)
			}
		}
	} catch(b) {
		EzLog.incompatible("xmlparse")
	}
	try {
		return voidFunc(str)
	} catch(b) {
		EzLog.incompatible("xmlparse");
		return document.createElement("div")
	}
}

function uf(s) {
	var A = "";
	if(s.nodeName == "#text") {
		A += Fb(s.nodeValue)
	} else {
		A += "<" + s.nodeName;
		if(s.hasAttributes()) {
			for(var a = 0; a < s.attributes.length; ++a) {
				A += " " + s.attributes[a].nodeName + '="' + Ec(s.attributes[a].nodeValue) + '"'
			}
		}
		if(s.childNodes.length == 0) {
			A += "/>"
		} else {
			A += ">";
			for(var a = 0; a < s.childNodes.length; ++a) {
				A += uf(s.childNodes[a])
			}
			A += "</" + s.nodeName + ">"
		}
	}
	return A
}

function ug(s) {
	var A = "";
	if(s.nodeName == "#text") {
		A += Fb(s.nodeValue)
	} else {
		for(var a = 0; a < s.childNodes.length; ++a) {
			A += uf(s.childNodes[a])
		}
	}
	return A
}

function gg(J) {
	var C = window.document.createElement("iframe");
	C.style.width = convert2Px(100);
	C.style.height = convert2Px(50);
	C.style.position = "absolute";
	C.style.top = convert2Px(-110);
	C.style.left = convert2Px(-110);
	C.id = J;
	C.name = J;
	window.document.body.appendChild(C);
	return C
}

function local2LonLat(pPoint) {
	if(!(pPoint instanceof Point)) {
		throw new Error(100, "参数类型应为:Point")
	}
	var lat = (pPoint.y - _convert_ofsy) / _convert_scale;
	var lon = (pPoint.x - _convert_ofsx) / _convert_scale;
	return new Point(lon, lat)
}

function LonLat2Local(pPoint) {
	if(!(pPoint instanceof Point)) {
		throw new Error(100, "参数类型应为:Point")
	}
	var x = pPoint.x * _convert_scale + _convert_ofsx;
	var y = pPoint.y * _convert_scale + _convert_ofsy;
	return new Point(x, y)
}

function CalculateArea(pInPoints) {
	var pPoints = pInPoints.Clone();
	var pts = pPoints.length;
	var area = 0;
	var pt0 = pPoints[0];
	pt0 = CalculateCoordinate(pt0);
	for(var i = 1; i < pts; i++) {
		pt1 = pPoints[i];
		pt1 = CalculateCoordinate(pt1);
		area += (pt1.x - pt0.x) * (pt1.y + pt0.y) / 2;
		pt0 = pt1
	}
	return Math.abs(area)
}

function CalculateLength(pInPoints) {
	var pPoints = pInPoints.Clone();
	var pts = pPoints.length;
	var dLen = new Number(0);
	var pt0 = pPoints[0];
	for(var i = 1; i < pts; i++) {
		pt1 = pPoints[i];
		dLen += GetDistanceInLL(pt0, pt1);
		pt0 = pt1
	}
	return Math.abs(Math.ceil(dLen))
}
_C_P = 0.017453292519943295;

function CalculateCoordinate(pt) {
	if(_MapSpanScale != 1) {
		return pt
	}
	var qq;
	var Latitude = pt.y * _C_P;
	var sin_lat = Math.sin(Latitude);
	var dlam = pt.x * _C_P;
	var x = 0.081819190842622 * sin_lat;
	var qq = (1 - 0.00669437999014138) * (sin_lat / (1 - x * x) - (1 / (2 * 0.081819190842622)) * Math.log((1 - x) / (1 + x)));
	pt.x = 6378137 * qq / 2;
	pt.y = 6378137 * dlam;
	return pt
}

function GetDistanceInLL(p1, p2) {
	var d = new Number(0);
	if(_MapSpanScale == 1) {
		var dlon = (p2.x - p1.x) * _C_P;
		var dlat = (p2.y - p1.y) * _C_P;
		var a = Math.sin(0.5 * dlat) * Math.sin(0.5 * dlat) + Math.cos(p1.y * _C_P) * Math.cos(p2.y * _C_P) * (Math.sin(0.5 * dlon) * Math.sin(0.5 * dlon));
		a = Math.abs(a);
		if(a > 1) {
			alert("不合法数据:a:" + a + ",P1:" + p1.toString() + ",P2:" + p2.toString())
		}
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		d = c * 6371008.77141506;
		if(Math.abs(p2.x - p1.x) > 180 || Math.abs(p2.y - p1.y) > 180) {
			d = 2 * Math.PI * 6371008.77141506 - d
		}
	} else {
		var p2Len = (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
		d = Math.sqrt(p2Len)
	}
	d = Math.ceil(d);
	return d
}

function bRetComp(Pg, fi) {
	return Math.round(Pg * 1000000) == Math.round(fi * 1000000)
}

function vh(ja, ma) {
	if(!ma) {
		ma = new Array()
	}
	while(ja >= 32) {
		ma.push(String.fromCharCode((32 | ja & 31) + 63));
		ja >>= 5
	}
	ma.push(String.fromCharCode(ja + 63));
	return ma
}

function bc(ja, ma) {
	return vh(ja < 0 ? ~(ja << 1) : ja << 1, ma)
}

function loadImgNoImage(pSrc) {
	pSrc.src = "images/NoImage.png"
}

function getInfo(div) {
	return div.style.left + ":" + div.style.top + ";" + div.offsetLeft + ":" + div.offsetTop + ";" + div.offsetWidth + ":" + div.offsetHeight
}

function getPathMBR(strPath) {
	strLonLatPath = strPath.split(",");
	var dMinX, dMinY, dMaxX, dMaxY;
	if(strLonLatPath.length == 3) {
		var dRadius = parseFloat(strLonLatPath[2]);
		dMinX = parseFloat(strLonLatPath[0]) - dRadius;
		dMaxX = parseFloat(strLonLatPath[0]) + dRadius;
		dMinY = parseFloat(strLonLatPath[1]) - dRadius;
		dMaxY = parseFloat(strLonLatPath[1]) + dRadius
	} else {
		if(strLonLatPath.length == 4) {
			dMinX = strLonLatPath[0];
			dMaxX = strLonLatPath[2];
			dMinY = strLonLatPath[1];
			dMaxY = strLonLatPath[3]
		} else {
			if(strLonLatPath.length >= 6) {
				dMaxX = dMinX = strLonLatPath[0];
				dMaxY = dMinY = strLonLatPath[1];
				for(var iIndex = 0; iIndex < strLonLatPath.length / 2; iIndex++) {
					if(strLonLatPath[2 * iIndex] > dMaxX) {
						dMaxX = strLonLatPath[2 * iIndex]
					}
					if(strLonLatPath[2 * iIndex] < dMinX) {
						dMinX = strLonLatPath[2 * iIndex]
					}
					if(strLonLatPath[2 * iIndex + 1] > dMaxY) {
						dMaxY = strLonLatPath[2 * iIndex + 1]
					}
					if(strLonLatPath[2 * iIndex + 1] < dMinY) {
						dMinY = strLonLatPath[2 * iIndex + 1]
					}
				}
			}
		}
	}
	var pMBR = new MBR(dMinX, dMinY, dMaxX, dMaxY);
	return pMBR
}

function createRadio(name, id, nodeName, parent) {
	var pRadio = document.createElement("<input>");
	pRadio.id = id;
	pRadio.name = name;
	pRadio.type = "radio";
	return pRadio
}

function createTxt(strScale, bIsTransparent) {
	var h = null;
	h = document.createElement("div");
	h.style.position = "absolute";
	setCursor(h, "default");
	h.unselectable = "on";
	h.onselectstart = _NoAction;
	if(strScale) {
		h.innerHTML = strScale
	}
	h.style.fontSize = convert2Px(10);
	h.style.color = "red";
	h.style.fontFamily = "Arial, sans serif";
	h.style.MozUserSelect = "none";
	return h
}
var se = "centerlat";
var te = "centerlng";

function Xd(U, Ce, fa) {
	this.id = U;
	this.description = Ce;
	this.pointIndex = fa
}

function getDocNodeValue(s) {
	if(!s) {
		return ""
	}
	if(typeof s.text != "undefined") {
		return s.text
	}
	if(s.nodeType == 3 || s.nodeType == 4) {
		return s.nodeValue
	}
	var ja = "";
	if(s.nodeType == 1) {
		for(var Vc = s.firstChild; Vc != null; Vc = Vc.nextSibling) {
			ja += getDocNodeValue(Vc)
		}
	}
	return ja
}

function WriteMsg(strMsg) {
	if(typeof _bIsWriteFile == "undefined" || !_bIsWriteFile) {
		return
	}
	var fso, f, r;
	var ForWriting = 2,
		ForAppending = 8;
	try {
		fso = new ActiveXObject("Scripting.FileSystemObject");
		f = fso.OpenTextFile("c:\\scriptlog.txt", ForAppending, true);
		f.WriteLine(strMsg);
		f.Close();
		if(fso != null) {
			delete fso
		}
	} catch(e) {}
}

function createDivText(divID, text) {
	var pDiv = document.createElement("div");
	if(divID) {
		pDiv.id = divID
	}
	pDiv.style.fontSize = "smaller";
	pDiv.appendChild(document.createTextNode(text));
	return pDiv
}

function createDivImg(divID, strSrc, width, height) {
	var pDiv = document.createElement("div");
	if(divID) {
		pDiv.id = divID
	}
	var pImg = createImg(strSrc, "图像");
	if(width) {
		pImg.style.width = width + "px"
	}
	if(height) {
		pImg.style.height = height + "px"
	}
	pDiv.appendChild(pImg);
	return pDiv
}

function createDiv(divID) {
	var pDiv = document.createElement("div");
	pDiv.style.position = "absolute";
	if(divID) {
		pDiv.id = divID
	}
	return pDiv
}

function createImg(strImg, strAlt, iLeft, iTop, strTitle, iSize) {
	var pImg = document.createElement("Img");
	pImg.galleryimg = "no";
	pImg.src = strImg;
	if(!iSize) {
		iSize = 16
	}
	pImg.style.height = convert2Px(iSize);
	pImg.style.width = convert2Px(iSize);
	pImg.alt = strAlt;
	pImg.style.position = "absolute";
	if(iLeft) {
		pImg.style.left = convert2Px(iLeft)
	}
	if(iTop) {
		pImg.style.top = convert2Px(iTop)
	}
	if(strTitle) {
		pImg.title = strTitle
	}
	BindingEvent(pImg, "mouseover", function(e) {
		setCursor(pImg, "hand")
	});
	return pImg
}

function createAlignImg(strAlign, strID, strImg) {
	var pP = document.createElement("P");
	pP.align = strAlign;
	var pImg = document.createElement("Img");
	pImg.id = strID;
	pImg.src = strImg;
	pImg.style.height = "";
	pImg.style.width = "";
	pP.appendChild(pImg);
	return pP
}
window.showInfoFrame = function(evt) {
	var pMe = getMap();
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	if(evt) {
		var elem = getTargetElement(evt);
		if(elem) {
			pMe.showInfoFrame(elem)
		}
	}
};
window.hideInfoFrame = function() {
	getMap().hideInfoFrame()
};

function LTrim(str) {
	if(str == null) {
		return ""
	}
	return str.replace(/^[ \t\n\r]+/g, "")
}

function RTrim(str) {
	if(str == null) {
		return ""
	}
	return str.replace(/[ \t\n\r]+$/g, "")
}

function Trim(str) {
	if(str == null) {
		return ""
	}
	return RTrim(LTrim(str))
}

function BindingEvent(ra, J, Hb) {
	EventManager.add(ra, J, Hb)
}

function unbindingEvent(ra, J, Hb) {
	EventManager.remove(ra, J, Hb)
}

function cloneFunc(a, b) {
	window[a] = b;
	return window[a]
}

function cloneMethod(a, b, c) {
	a.prototype[b] = c
}

function EzSMethod(a, b, c) {
	a[b] = c
}

function EzNameSpace() {
	var pMap = cloneFunc("Map", testEzMap);
	pMap.method("showMap1", testEzMap.prototype.showMap);
	pMap.method("showName1", testEzMap.showName, true)
}

function testEzMap() {
	this.name = new Array("hello")
}

function testEzMap_showMap() {
	alert(this.name[0])
}
testEzMap.prototype.showMap = testEzMap_showMap;

function testEzMap_showName() {
	alert("showName")
}
testEzMap.prototype.showName = testEzMap_showName;
EzNameSpace();
g_current_editor = null;

function degToRad(x) {
	return(x / (360 / (2 * Math.PI)))
}

function radToDeg(x) {
	return(x * (360 / (2 * Math.PI)))
}

function trans2Points(a) {
	var p = a.split(",");
	var len = p.length / 2;
	var points = new Array();
	for(var iIndex = 0; iIndex < len; iIndex++) {
		var pPoint = new Point(p[2 * iIndex], p[2 * iIndex + 1]);
		points.push(pPoint)
	}
	return points
}
g_update_point = null;
g_snap_hovering = false;
g_snap_index = 0;

function GetQuadtreeAddress(lon, lat, izoom) {
	var PI = 3.1415926535897;
	var digits = 18;
	var x = (180 + parseFloat(lon)) / 360;
	var y = -parseFloat(lat) * PI / 180;
	y = 0.5 * Math.log((1 + Math.sin(y)) / (1 - Math.sin(y)));
	y *= 1 / (2 * PI);
	y += 0.5;
	var quad = "t";
	var lookup = "qrts";
	alert(x + ":" + y);
	while(digits-- > izoom) {
		x -= Math.floor(x);
		y -= Math.floor(y);
		quad = quad + lookup.substr((x >= 0.5 ? 1 : 0) + (y >= 0.5 ? 2 : 0), 1);
		x *= 2;
		y *= 2
	}
	return quad
}

function check_ip(UserIp, NetIP) {
	var bIsOK = true;
	var pUserIPUnits = UserIp.split(".");
	var pNetIPUnits = NetIP.split(".");
	for(var iIndex = 0; iIndex < 4; iIndex++) {
		var NetIP = pNetIPUnits[iIndex];
		if(pUserIPUnits[iIndex] == NetIP) {
			continue
		} else {
			if(NetIP.indexOf("*") != -1) {
				continue
			} else {
				var pIPRang = NetIP.split("/");
				if(pIPRang.length > 1) {
					var iIP1 = parseInt(pIPRang[0]);
					var iIP2 = parseInt(pIPRang[1]);
					var iIP = parseInt(pUserIPUnits[iIndex]);
					if(iIP > Math.max(iIP1, iIP2) || iIP < Math.min(iIP1, iIP2)) {
						bIsOK = false;
						break
					}
				} else {
					bIsOK = false;
					break
				}
			}
		}
	}
	return bIsOK
}

function Qh(Cf) {
	if(!Cf) {
		return
	}
	if(window.clipboardData) {
		Cf.onpaste = Ki;
		Cf.ondrop = ah
	}
	return true
}

function Ki(b) {
	var Dc = document.selection;
	if(Dc) {
		var Ub = Dc.createRange();
		if(Ub) {
			var yd = window.clipboardData.getData("Text");
			if(yd) {
				Ub.text = Ve(yd, null);
				return false
			}
		}
	}
	return true
}
var Sc = null;

function ah(b) {
	if(!b) {
		b = window.event
	}
	if(b.dataTransfer) {
		Sc = Ve(b.dataTransfer.getData("Text"), null);
		setTimeout("_finishDrop()", 1)
	}
	return true
}

function _finishDrop() {
	if(!Sc) {
		return
	}
	var Dc = document.selection;
	if(Dc) {
		var Ub = Dc.createRange();
		if(Ub) {
			Ub.text = Sc;
			Ub.select()
		}
	}
	Sc = null
}
var _makePasteBox = Qh;

function Ve(str, Td) {
	if(!Td) {
		Td = ", "
	}
	var jc = str.replace(/^[ \r\n\t\v]+/g, "");
	jc = jc.replace(/[ \r\n\t\v]+$/g, "");
	jc = jc.replace(/[ \t\v]*\r?\n[\r\n]*[ \t\v]*/g, Td);
	return jc
}

function getOffsetLeft(a) {
	return a == document.body ? 0 : a.offsetLeft + getOffsetLeft(a.offsetParent)
}

function getOffsetTop(a) {
	return a == document.body ? 0 : a.offsetTop + getOffsetTop(a.offsetParent)
}
var colours = new Array("#FFFFFF", "#FFCCCC", "#FFCC99", "#FFFF99", "#FFFFCC", "#99FF99", "#99FFFF", "#CCFFFF", "#CCCCFF", "#FFCCFF", "#CCCCCC", "#FF6666", "#FF9966", "#FFFF66", "#FFFF33", "#66FF99", "#33FFFF", "#66FFFF", "#9999FF", "#FF99FF", "#C0C0C0", "#FF0000", "#FF9900", "#FFCC66", "#FFFF00", "#33FF33", "#66CCCC", "#33CCFF", "#6666CC", "#CC66CC", "#999999", "#CC0000", "#FF6600", "#FFCC33", "#FFCC00", "#33CC00", "#00CCCC", "#3366FF", "#6633FF", "#CC33CC", "#666666", "#990000", "#CC6600", "#CC9933", "#999900", "#009900", "#339999", "#3333FF", "#6600CC", "#993399", "#333333", "#660000", "#993300", "#996633", "#666600", "#006600", "#336666", "#000099", "#333399", "#663366", "#000000", "#330000", "#663300", "#663333", "#333300", "#003300", "#003333", "#000066", "#330099", "#330033");
var g_divPreview;
var g_ColorHex;
var g_color_palette = null;

function mouseOver(el, Colour) {
	if(g_divPreview) {
		g_divPreview.style.background = Colour
	}
	if(g_ColorHex) {
		g_ColorHex.value = Colour
	}
	el.style.borderColor = "#FFFFFF"
}

function mouseOut(el) {
	el.style.borderColor = "#666666"
}

function mouseDown(Colour) {
	if(g_ColorHex) {
		g_ColorHex.value = Colour
	}
	if(g_color_palette) {
		g_color_palette.style.display = "none"
	}
}

function EzColorPicker(divPreview, ColorHex) {
	if(typeof divPreview == "string") {
		g_divPreview = Obj(divPreview)
	} else {
		g_divPreview = divPreview
	}
	if(typeof ColorHex == "string") {
		g_ColorHex = Obj(ColorHex)
	} else {
		g_ColorHex = ColorHex
	}
	if(!g_color_palette) {
		g_color_palette = document.createElement("div");
		g_color_palette.style.width = "200px";
		g_color_palette.style.height = "150px";
		g_color_palette.style.position = "absolute";
		document.body.appendChild(g_color_palette);
		code = "<table class='tblPalette' cellpadding='0' cellspacing='1' border='2'>";
		for(i = 0; i < 70; i++) {
			if((i) % 10 == 0) {
				code += "<tr>"
			}
			code += "<td id='el_" + i + "' bgcolor=" + colours[i] + " onMouseOver=\"mouseOver(this, '" + colours[i] + "');\" onMouseOut='mouseOut(this)' onclick=\"mouseDown('" + colours[i] + "');return false;\">&nbsp;</td>\n";
			if((i + 1) % 10 == 0) {
				code += "</tr>\n"
			}
		}
		g_color_palette.innerHTML = code + "</table>"
	}
	g_color_palette.style.top = getOffsetTop(g_divPreview);
	g_color_palette.style.left = getOffsetLeft(g_divPreview) + 40;
	g_color_palette.style.display = ""
}

function Obj(name) {
	return document[name] || (document.all && document.all[name]) || (document.getElementById && document.getElementById(name))
}
var JSON;
if(!JSON) {
	JSON = {}
}(function() {
	function f(n) {
		return n < 10 ? "0" + n : n
	}
	if(typeof Date.prototype.toJSON !== "function") {
		Date.prototype.toJSON = function(key) {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
			return this.valueOf()
		}
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		gap, indent, meta = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		},
		rep;

	function quote(string) {
		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
			var c = meta[a];
			return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + string + '"'
	}

	function str(key, holder) {
		var i, k, v, length, mind = gap,
			partial, value = holder[key];
		if(value && typeof value === "object" && typeof value.toJSON === "function") {
			value = value.toJSON(key)
		}
		if(typeof rep === "function") {
			value = rep.call(holder, key, value)
		}
		switch(typeof value) {
			case "string":
				return quote(value);
			case "number":
				return isFinite(value) ? String(value) : "null";
			case "boolean":
			case "null":
				return String(value);
			case "object":
				if(!value) {
					return "null"
				}
				gap += indent;
				partial = [];
				if(Object.prototype.toString.apply(value) === "[object Array]") {
					length = value.length;
					for(i = 0; i < length; i += 1) {
						partial[i] = str(i, value) || "null"
					}
					v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
					gap = mind;
					return v
				}
				if(rep && typeof rep === "object") {
					length = rep.length;
					for(i = 0; i < length; i += 1) {
						if(typeof rep[i] === "string") {
							k = rep[i];
							v = str(k, value);
							if(v) {
								partial.push(quote(k) + (gap ? ": " : ":") + v)
							}
						}
					}
				} else {
					for(k in value) {
						if(Object.prototype.hasOwnProperty.call(value, k)) {
							v = str(k, value);
							if(v) {
								partial.push(quote(k) + (gap ? ": " : ":") + v)
							}
						}
					}
				}
				v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
				gap = mind;
				return v
		}
	}
	if(typeof JSON.stringify !== "function") {
		JSON.stringify = function(value, replacer, space) {
			var i;
			gap = "";
			indent = "";
			if(typeof space === "number") {
				for(i = 0; i < space; i += 1) {
					indent += " "
				}
			} else {
				if(typeof space === "string") {
					indent = space
				}
			}
			rep = replacer;
			if(replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
				throw new Error("JSON.stringify")
			}
			return str("", {
				"": value
			})
		}
	}
	if(typeof JSON.parse !== "function") {
		JSON.parse = function(text, reviver) {
			var j;

			function walk(holder, key) {
				var k, v, value = holder[key];
				if(value && typeof value === "object") {
					for(k in value) {
						if(Object.prototype.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if(v !== undefined) {
								value[k] = v
							} else {
								delete value[k]
							}
						}
					}
				}
				return reviver.call(holder, key, value)
			}
			text = String(text);
			cx.lastIndex = 0;
			if(cx.test(text)) {
				text = text.replace(cx, function(a) {
					return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
				})
			}
			if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
				j = eval("(" + text + ")");
				return typeof reviver === "function" ? walk({
					"": j
				}, "") : j
			}
			throw new SyntaxError("JSON.parse")
		}
	}
}());

function Point(x, y) {
	if(arguments.length == 1 && typeof arguments[0] == "string") {
		var strPoint = arguments[0];
		var pPoint = strPoint.split(",");
		this.x = parseFloat(pPoint[0]);
		this.y = parseFloat(pPoint[1])
	} else {
		if(typeof x == "string") {
			this.x = parseFloat(x)
		} else {
			this.x = x
		}
		if(typeof y == "string") {
			this.y = parseFloat(y)
		} else {
			this.y = y
		}
	}
	this.screenX;
	this.screenY;
	this.longitude;
	this.latitude;
	this.mileage = -1;
	this.coordSequence = this.x + "," + this.y
}
Point.prototype.countMileage = function(pPoint) {
	var dMileage = this.distanceFrom(pPoint) + pPoint.mileage;
	this.mileage = dMileage
};
Point.prototype.toString = function() {
	return this.x + "," + this.y
};
Point.prototype.equals = function(aa) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(aa, "Point"))) {
			throw EzErrorFactory.createError("Point::equals方法中arguments[0]类型不正确")
		}
		if(!aa) {
			return false
		}
		return this.x == aa.x && this.y == aa.y
	} catch(e) {
		throw EzErrorFactory.createError("Point::equals方法中不正确", e)
	}
};
Point.prototype.distanceFrom = function(aa) {
	var Da = this.x - aa.x;
	var Ha = this.y - aa.y;
	return Math.sqrt(Da * Da + Ha * Ha)
};
Point.prototype.approxEquals = function(aa) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(aa, "Point"))) {
			throw EzErrorFactory.createError("Point::approxEquals方法中arguments[0]类型不正确")
		}
		if(!aa) {
			return false
		}
		return bRetComp(this.x, aa.x) && bRetComp(this.y, aa.y)
	} catch(e) {
		throw EzErrorFactory.createError("Point::approxEquals方法中不正确", e)
	}
};
Point.prototype.getCenter = function(aa) {
	if(!aa) {
		return this
	}
	return new Point((this.x + aa.x) / 2, (this.y + aa.y) / 2)
};
Point.prototype.getCoordSequence = function() {
	this.coordSequence = this.x + "," + this.y;
	return this.coordSequence
};
Point.prototype.getGeometryType = function() {
	return "point"
};
Point.prototype.setX = function(x) {
	this.x = parseFloat(x)
};
Point.prototype.getX = function() {
	return this.x
};
Point.prototype.setY = function(y) {
	this.y = parseFloat(y)
};
Point.prototype.getY = function() {
	return this.y
};
Point.prototype.setLongitude = function(longitude) {
	this.longitude = parseFloat(longitude)
};
Point.prototype.setLatitude = function(latitude) {
	this.latitude = parseFloat(latitude)
};
Point.prototype.getLongitude = function() {
	return this.longitude
};
Point.prototype.getLatitude = function() {
	return this.latitude
};

function MBR(Ei, rh, xd, ed) {
	if(typeof Ei == "string") {
		Ei = parseFloat(Ei)
	}
	if(typeof rh == "string") {
		rh = parseFloat(rh)
	}
	if(typeof xd == "string") {
		xd = parseFloat(xd)
	}
	if(typeof ed == "string") {
		ed = parseFloat(ed)
	}
	this.minX = Ei;
	this.minY = rh;
	this.maxX = xd;
	this.maxY = ed
}
MBR.prototype.toString = function() {
	return this.minX + "," + this.minY + "," + this.maxX + "," + this.maxY
};
MBR.prototype.containsSegment = function(Ed, kd) {
	if(this.minX > Ed.x && this.minX > kd.x) {
		return false
	}
	if(this.maxX < Ed.x && this.maxX < kd.x) {
		return false
	}
	if(this.minY > Ed.y && this.minY > kd.y) {
		return false
	}
	if(this.maxY < Ed.y && this.maxY < kd.y) {
		return false
	}
	return true
};
MBR.prototype.containsBounds = function(Gd) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(Gd, "MBR")) {
			throw EzErrorFactory.createError("MBR::containsBounds方法中arguments[0]参数类型不正确")
		}
		var bIs = this.minX <= Gd.minX && (this.maxX >= Gd.maxX && (this.minY <= Gd.minY && this.maxY >= Gd.maxY));
		return bIs
	} catch(e) {
		throw EzErrorFactory.createError("MBR::containsBounds方法执行不正确", e)
	}
};
MBR.prototype.containsPoint = function(pPoint) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(pPoint, "Point")) {
			throw EzErrorFactory.createError("MBR::containsPoint方法中arguments[0]参数类型不正确")
		}
		var bIs = this.containsSegment(pPoint, pPoint);
		return bIs
	} catch(e) {
		throw EzErrorFactory.createError("MBR::containsPoint方法执行不正确", e)
	}
};
MBR.prototype.extend = function(j) {
	try {
		if(j instanceof Point) {
			this.minX = Math.min(this.minX, j.x);
			this.maxX = Math.max(this.maxX, j.x);
			this.minY = Math.min(this.minY, j.y);
			this.maxY = Math.max(this.maxY, j.y)
		} else {
			if(j instanceof MBR) {
				this.minX = Math.min(this.minX, j.minX);
				this.maxX = Math.max(this.maxX, j.maxX);
				this.minY = Math.min(this.minY, j.minY);
				this.maxY = Math.max(this.maxY, j.maxY)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("MBR::extend方法执行不正确", e)
	}
};
MBR.prototype.scale = function(e) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(e, "float")) {
			throw EzErrorFactory.createError("MBR::scale方法中arguments[0]参数类型不正确")
		}
		var pScale = e - 1;
		var spanX = this.getSpanX() / 2;
		var spanY = this.getSpanY() / 2;
		this.minX = this.minX - pScale * spanX;
		this.maxX = this.maxX + pScale * spanX;
		this.minY = this.minY - pScale * spanY;
		this.maxY = this.maxY + pScale * spanY
	} catch(e) {
		throw EzErrorFactory.createError("MBR::scale方法执行不正确", e)
	}
};
MBR.prototype.centerPoint = function() {
	var dCenterLon = (parseFloat(this.minX) + parseFloat(this.maxX)) / 2;
	var dCenterLat = (parseFloat(this.minY) + parseFloat(this.maxY)) / 2;
	var pPoint = new Point(dCenterLon, dCenterLat);
	return pPoint
};
MBR.prototype.getCenterPoint = function() {
	return this.centerPoint()
};
MBR.prototype.getSpanX = function() {
	var y = this.maxY.toString();
	if(y.indexOf(".") <= 2 || y.length <= 2) {
		return this.maxX - this.minX
	} else {
		var max = this.meters2latlon(new Point(this.maxX, this.maxY));
		var min = this.meters2latlon(new Point(this.minX, this.minY));
		return max.x - min.x
	}
};
MBR.prototype.getSpanY = function() {
	var y = this.maxY.toString();
	if(y.indexOf(".") <= 2 || y.length <= 2) {
		return this.maxY - this.minY
	} else {
		var max = this.meters2latlon(new Point(this.maxX, this.maxY));
		var min = this.meters2latlon(new Point(this.minX, this.minY));
		return max.y - min.y
	}
};
MBR.prototype.approxEquals = function(pMBR) {
	if(!pMBR) {
		return false
	}
	return bRetComp(this.minX, pMBR.minX) && bRetComp(this.minY, pMBR.minY) && bRetComp(this.maxX, pMBR.maxX) && bRetComp(this.maxY, pMBR.maxY)
};
MBR.prototype.equals = function(pMBR) {
	if(!pMBR) {
		return false
	}
	return(this.minX == pMBR.minX) && (this.minY == pMBR.minY) && (this.maxX == pMBR.maxX) && (this.maxY == pMBR.maxY)
};
MBR.prototype.latlon2Meters = function(point) {
	var google = new Google();
	point = google.getEncryPoint(point.x, point.y);
	var mPoint = google.latlonToMeter(point.x, point.y);
	return mPoint
};
MBR.prototype.meters2latlon = function(point) {
	var google = new Google();
	var pPoint = google.meterTolatlon(point.x, point.y);
	pPoint = google.getDecryptPoint(pPoint.x, pPoint.y);
	return pPoint
};
EzServerClient.Layer = EzServerClient.Class({
	id: "",
	div: null,
	opacity: 1,
	visible: true,
	spatialReference: "EPSG:4326",
	hide: function() {
		this.visible = false
	},
	show: function() {
		this.visible = true
	},
	setOpacity: function(opacity) {
		this.opacity = opacity
	},
	CLASS_NAME: "EzServerClient.Layer"
});
EzServerClient.GroupLayer = EzServerClient.Class({
	_name: "",
	_layers: [],
	initialize: function(name, layers) {
		this._name = name;
		this._layers = layers
	},
	getName: function() {
		return this._name
	},
	setName: function(name) {
		this._name = name
	},
	getLayers: function() {
		return this._layers
	},
	setLayers: function(layers) {
		this._layers = layers
	},
	hasOverLayers: function() {
		if(this._layers.length > 1) {
			return true
		} else {
			return false
		}
	},
	getHotspotLayer: function() {
		for(var i = 0, j = this._layers.length; i < j; i++) {
			if(this._layers[i] instanceof EzServerClient.Layer.HotSpotTileLayer) {
				return this._layers[i]
			}
		}
		return null
	},
	shift: function() {
		if(this._layers.length < 1) {
			return null
		}
		return this._layers.shift()
	},
	unshift: function(layer) {
		this._layers.unshift(layer);
		return this._layers
	},
	CLASS_NAME: "EzServerClient.GroupLayer"
});
EzServerClient.Tile = {};
EzServerClient.Tile.LevelDetail = EzServerClient.Class({
	initialize: function(level, resolution, scale) {
		this.level = level;
		this.resolution = resolution;
		this.scale = scale
	},
	CLASS_NAME: "EzServerClient.Tile.LevelDetail"
});
EzServerClient.Tile.TileInfo = EzServerClient.Class({
	initialize: function(dpi, width, height, origin, spatialReference, levelDetails, flatMatrix) {
		this.dpi = dpi || 96;
		this.width = width || 256;
		this.height = height || 256;
		this.origin = origin || [0, 0];
		this.spatialReference = spatialReference || "EPSG:4326";
		this.levelDetails = levelDetails || [];
		this.flatMatrix = flatMatrix || [1, 0, 0, 0, 1, 0]
	},
	CLASS_NAME: "EzServerClient.Tile.TileInfo"
});
EzServerClient.MapPositionZ = EzServerClient.Class({
	initialize: function(x, y, level) {
		this.x = x;
		this.y = y;
		this.level = level
	},
	CLASS_NAME: "EzServerClient.MapPositionZ"
});
EzServerClient.TilePositionZ = EzServerClient.Class({
	initialize: function(col, row, level) {
		this.col = col;
		this.row = row;
		this.level = level
	},
	CLASS_NAME: "EzServerClient.TilePositionZ"
});
EzServerClient.MapRegionZ = EzServerClient.Class({
	initialize: function(minx, miny, maxx, maxy, level) {
		this.minx = minx;
		this.miny = miny;
		this.maxx = maxx;
		this.maxy = maxy;
		this.level = level
	},
	toString: function() {
		return this.minx + "," + this.miny + "," + this.maxx + "," + this.maxy
	},
	CLASS_NAME: "EzServerClient.MapRegionZ"
});
EzServerClient.Layer.TileLayer = EzServerClient.Class(EzServerClient.Layer, {
	div: null,
	opacity: null,
	name: "",
	tileInfo: null,
	url: "",
	zoomOffset: 0,
	emptyTileUrl: _ImageBaseUrl + "transparent.png",
	proxyUrl: "",
	lastTileImages: [
		[]
	],
	tileCrs: null,
	isLoad: false,
	oParms: null,
	resolution_0: null,
	xmlDoc: null,
	initialize: function(name, url, tileInfo) {
		this.name = name;
		this.url = url;
		this.tileInfo = tileInfo;
		this.div = this.createLayerContainer()
	},
	createLayerContainer: function() {
		var tileDiv = document.createElement("div");
		tileDiv.name = this.name;
		tileDiv.style.position = "absolute";
		return tileDiv
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {},
	toTileCoords: function(mpz) {
		var c = this.convertMap2Bitmap(mpz.x, mpz.y, mpz.level);
		var col = Math.floor(c.x / this.tileInfo.width);
		var row = Math.floor(c.y / this.tileInfo.height);
		return new EzServerClient.TilePositionZ(col, row, mpz.level)
	},
	toMapCoords: function(tpz) {
		var x = tpz.col;
		var y = tpz.row;
		if(this.tileCrs != null) {
			if(this.tileCrs == "center") {
				return new EzServerClient.MapRegionZ(x * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.width, y * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.height, (x + 1) * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.width, (y + 1) * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.height, tpz.level)
			}
			if(this.tileCrs == "leftop") {
				return new EzServerClient.MapRegionZ(x * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.width + this.tileInfo.origin[0], (y + 1) * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.height + this.tileInfo.origin[1], (x + 1) * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.width + this.tileInfo.origin[0], (y) * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.height + this.tileInfo.origin[1], tpz.level)
			}
		} else {
			return new EzServerClient.MapRegionZ(x * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.width + this.tileInfo.origin[0], y * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.height + this.tileInfo.origin[1], (x + 1) * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.width + this.tileInfo.origin[0], (y + 1) * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.height + this.tileInfo.origin[1], tpz.level)
		}
	},
	toMapCoords2: function(tpz) {
		var x = tpz.col * this.tileInfo.width;
		var y = tpz.row * this.tileInfo.height;
		if(this.tileCrs == "center") {
			return new EzServerClient.MapRegionZ(x * this.tileInfo.levelDetails[tpz.level].resolution, y * this.tileInfo.levelDetails[tpz.level].resolution, (x + 1) * this.tileInfo.levelDetails[tpz.level].resolution, (y + 1) * this.tileInfo.levelDetails[tpz.level].resolution, tpz.level)
		}
		if(this.tileCrs == "leftop") {
			return new EzServerClient.MapRegionZ(x * this.tileInfo.levelDetails[tpz.level].resolution + this.tileInfo.origin[0], (y + 1) * this.tileInfo.levelDetails[tpz.level].resolution + this.tileInfo.origin[1], (x + 1) * this.tileInfo.levelDetails[tpz.level].resolution + this.tileInfo.origin[0], (y) * this.tileInfo.levelDetails[tpz.level].resolution + this.tileInfo.origin[1], tpz.level)
		}
	},
	toMapCoordsY: function(tpz) {
		var x = tpz.col;
		var y = tpz.row;
		return new EzServerClient.MapRegionZ(x * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.width + this.tileInfo.origin[0], this.tileInfo.origin[1] - (y + 1) * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.height, (x + 1) * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.width + this.tileInfo.origin[0], this.tileInfo.origin[1] - (y) * this.tileInfo.levelDetails[tpz.level].resolution * this.tileInfo.height, tpz.level)
	},
	setTileProxy: function(proxyUrl) {
		this.proxyUrl = proxyUrl
	},
	convertPosByFlatMatrix: function(x, y, e) {
		if(!e) {
			var e = new Point(0, 0)
		}
		e.x = this.tileInfo.flatMatrix[0] * x + this.tileInfo.flatMatrix[1] * y + this.tileInfo.flatMatrix[2];
		e.y = this.tileInfo.flatMatrix[3] * x + this.tileInfo.flatMatrix[4] * y + this.tileInfo.flatMatrix[5];
		return e
	},
	convertPosByFlatMatrixInverse: function(xp, yp, e) {
		if(!e) {
			var e = new Point(0, 0)
		}
		e.x = (this.tileInfo.flatMatrix[2] * this.tileInfo.flatMatrix[4] - this.tileInfo.flatMatrix[1] * this.tileInfo.flatMatrix[5] - this.tileInfo.flatMatrix[4] * xp + this.tileInfo.flatMatrix[1] * yp) / (this.tileInfo.flatMatrix[1] * this.tileInfo.flatMatrix[3] - this.tileInfo.flatMatrix[0] * this.tileInfo.flatMatrix[4]);
		e.y = (this.tileInfo.flatMatrix[2] * this.tileInfo.flatMatrix[3] - this.tileInfo.flatMatrix[0] * this.tileInfo.flatMatrix[5] - this.tileInfo.flatMatrix[3] * xp + this.tileInfo.flatMatrix[0] * yp) / (this.tileInfo.flatMatrix[0] * this.tileInfo.flatMatrix[4] - this.tileInfo.flatMatrix[1] * this.tileInfo.flatMatrix[3]);
		return e
	},
	convertMap2Bitmap: function(lon, lat, level, e) {
		if(!e) {
			var e = new Point(0, 0)
		}
		var p = this.convertPosByFlatMatrix(lon, lat, e);
		lon = p.x;
		lat = p.y;
		var x = lon - this.tileInfo.origin[0];
		var y = lat - this.tileInfo.origin[1];
		e.x = x;
		e.y = y;
		try {
			e.x = Math.round(e.x / this.tileInfo.levelDetails[level].resolution);
			e.y = Math.round(e.y / this.tileInfo.levelDetails[level].resolution)
		} catch(error) {}
		return e
	},
	convertMap2BitmapY: function(lon, lat, level, e) {
		if(!e) {
			var e = new Point(0, 0)
		}
		var p = this.convertPosByFlatMatrix(lon, lat, e);
		lon = p.x;
		lat = p.y;
		var x = lon - this.tileInfo.origin[0];
		var y = this.tileInfo.origin[1] - lat;
		e.x = x;
		e.y = y;
		try {
			e.x = Math.round(e.x / this.tileInfo.levelDetails[level].resolution);
			e.y = Math.round(e.y / this.tileInfo.levelDetails[level].resolution)
		} catch(error) {}
		return e
	},
	convertBitmap2Map: function(x, y, level, e) {
		try {
			if(!e) {
				var e = new Point(0, 0)
			}
			x *= this.tileInfo.levelDetails[level].resolution;
			y *= this.tileInfo.levelDetails[level].resolution;
			x += this.tileInfo.origin[0];
			y += this.tileInfo.origin[1];
			e = this.convertPosByFlatMatrixInverse(x, y, e);
			return e
		} catch(error) {}
	},
	show: function() {
		this.div.style.display = ""
	},
	hide: function() {
		this.div.style.display = "none"
	},
	getZIndex: function() {
		return this.div.style.zIndex
	},
	setZIndex: function(nIndex) {
		this.div.style.zIndex = nIndex
	},
	getParmars: function(url) {
		var pointer = this;
		var targeturl = url + "/EzMap?Service=getMetadata";
		if(this.proxyUrl) {
			targeturl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(targeturl)
		}
		var oXmlHttp = XMLHttp.createXMLHttp();
		oXmlHttp.onreadystatechange = function() {
			var doc = null;
			if(oXmlHttp.readyState == 4) {
				if(oXmlHttp.status == 200 || oXmlHttp.status == 304) {
					doc = new ActiveXObject("Microsoft.XMLDOM");
					doc.async = false;
					if(oXmlHttp.responseText != null) {
						doc.loadXML(oXmlHttp.responseText);
						pointer.xmlDoc = doc
					}
				} else {}
			}
		};
		oXmlHttp.open("GET", targeturl, false);
		oXmlHttp.send(null)
	},
	getxmlDoc: function() {
		var dom = getElementById("getPar");
		if(dom.readyState == "loaded") {
			doc = new ActiveXObject("Microsoft.XMLDOM");
			doc.async = false;
			doc.loadXML(_xmlDoc);
			pointer.xmlDoc = doc
		}
	},
	parseXML: function(doc) {
		var Pointer = this;
		if(doc.parseError == 0) {
			var Pyramid = doc.getElementsByTagName("Pyramid")[0];
			var oParms = Pyramid.text.split(" ");
			Pointer.oParms = oParms;
			var Levels = doc.getElementsByTagName("Levels")[0];
			var firstChild = Levels.firstChild;
			var level = firstChild.getAttribute("value");
			var resolution = firstChild.getAttribute("resolution");
			var levelSpan = level - 0;
			var resolution_0 = resolution * Math.pow(2, levelSpan);
			Pointer.resolution_0 = resolution_0;
			return {
				origin: [parseInt(oParms[3]), parseInt(oParms[4])],
				resolution_0: resolution_0
			}
		} else {
			alert("An Error ocurred:\nError Code:" + doc.parseError.errorCode + "\nLine:" + doc.parseError.linepos + "\nReason:" + doc.parseError.reason)
		}
	},
	CLASS_NAME: "EzServerClient.Layer.TileLayer"
});
EzServerClient.Layer.LonlatTileLayer = EzServerClient.Class(EzServerClient.Layer.TileLayer, {
	tileCrs: "center",
	CLASS_NAME: "EzServerClient.Layer.LonlatTileLayer"
});
EzServerClient.Layer.MercatorTileLayer = EzServerClient.Class(EzServerClient.Layer.TileLayer, {
	maxZoomLevel: 20,
	version: "1.0.0",
	tileCrs: "leftop",
	origin: [-20037508.342789248, 20037508.342789248],
	width: 256,
	height: 256,
	initResolution: 156543.033928041,
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.width = this.width;
		tileInfo.height = this.height;
		tileInfo.origin = this.origin;
		if(options.flatMatrix) {
			tileInfo.flatMatrix = options.flatMatrix
		} else {
			tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
		}
		this.source = options.source || "google";
		var res = this.initResolution;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
			res /= 2
		}
		EzServerClient.GlobeParams.ZoomLevelSequence = 2;
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	CLASS_NAME: "EzServerClient.Layer.MercatorTileLayer"
});
EzServerClient.Layer.EzMapTDTTileLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	tileCrs: "leftop",
	maxZoomLevel: 24,
	version: "1.0.0",
	origin: [-180, 90],
	width: 256,
	height: 256,
	initResolution: 1.40625,
	levelLimit: [],
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		this.source = options.source || "EzServer";
		this.origin = options.originAnchor || [-180, 90];
		this.height = options.height || 256;
		this.width = options.width || 256;
		this.initResolution = options.initResolution || 1.40625;
		this.levelLimit = options.levelLimit || [];
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.width = this.width;
		tileInfo.height = this.height;
		_MapUnitPixels = tileInfo.width;
		EzServerClient.GlobeParams.MapUnitPixels = tileInfo.width;
		this.setCompatibleParm(options);
		tileInfo.origin = this.origin;
		if(this.mapCoordinateType != 1) {
			this.initResolution = this.initResolution * this.mapConvertScale
		}
		var res = this.initResolution;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
			res /= 2
		}
		if(options.flatMatrix) {
			tileInfo.flatMatrix = options.flatMatrix
		} else {
			tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
		}
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	format: function(str, len) {
		var i = str.length;
		if(i >= 8) {
			str = str.substring(i - len, i)
		} else {
			var str0 = "";
			for(var n = 0; n < len; n++) {
				str0 += "0"
			}
			str = str0.substring(0, str0.length - i) + str
		}
		return str
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		if(topLeftTile == null) {
			var col = col;
			var row = row
		} else {
			var col = topLeftTile.x + col;
			var row = row - topLeftTile.y
		}
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		if(this.source == "EzServer") {
			var srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&V=" + this.version
		}
		if(this.source == "cachePath") {
			var srcUrl = serverUrl + "/L" + this.format(level.toString(), 2) + "/R" + this.format(row.toString(16), 8) + "/C" + this.format(col.toString(16), 8) + ".png"
		}
		if(this.source == "ArcGis") {
			var srcUrl = serverUrl + "/tile/" + level + "/" + row + "/" + col
		}
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	setCompatibleParm: function(options) {
		if(options.mapConvertScale) {
			this.mapConvertScale = options.mapConvertScale;
			_convert_scale = this.mapConvertScale;
			EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
		} else {
			this.mapConvertScale = 114699;
			_convert_scale = 114699;
			EzServerClient.GlobeParams.MapConvertScale = 114699
		}
		if(options.mapConvertOffsetX) {
			this.mapConvertOffsetX = options.mapConvertOffsetX;
			_convert_ofsx = this.mapConvertOffsetX;
			EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
		}
		if(options.mapConvertOffsetY) {
			this.mapConvertOffsetY = options.mapConvertOffsetY;
			_convert_ofsy = this.mapConvertOffsetY;
			EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
		}
		if(options.mapCoordinateType) {
			this.mapCoordinateType = options.mapCoordinateType;
			_MapSpanScale = this.mapCoordinateType;
			EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
		} else {
			this.mapCoordinateType = 1;
			_MapSpanScale = 1;
			EzServerClient.GlobeParams.MapCoordinateType = 1
		}
		if(options.originAnchor) {
			if(this.mapCoordinateType != 1) {
				var x = options.originAnchor[0] * EzServerClient.GlobeParams.MapConvertScale;
				var y = options.originAnchor[1] * EzServerClient.GlobeParams.MapConvertScale;
				this.origin = [x, y]
			} else {
				var x = options.originAnchor[0];
				var y = options.originAnchor[1];
				this.origin = [x, y]
			}
		}
		if(options.zoomLevelSequence) {
			this.zoomLevelSequence = options.zoomLevelSequence;
			EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
		} else {
			EzServerClient.GlobeParams.ZoomLevelSequence = 2
		}
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	CLASS_NAME: "EzServerClient.Layer.EzMapTDTTileLayer"
});
EzServerClient.Layer.EzMapTileLayer2005 = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	maxZoomLevel: 18,
	version: 0.3,
	initResolution: 2,
	levelLimit: [],
	time: false,
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.origin = options.originAnchor || [0, 0];
		tileInfo.width = options.tileWidth || 256;
		tileInfo.height = options.tileHeight || 256;
		this.levelLimit = options.levelLimit || [];
		this.initResolution = options.initResolution || 2;
		this.time = options.time || false;
		_MapUnitPixels = tileInfo.width;
		EzServerClient.GlobeParams.MapUnitPixels = tileInfo.width;
		this.setCompatibleParm(options);
		if(this.mapCoordinateType != 1) {
			this.initResolution = this.initResolution * this.mapConvertScale;
			tileInfo.origin = [tileInfo.origin[0] * 114699, tileInfo.origin[1] * 114699]
		}
		var UPP = this.initResolution;
		var scale = 786432000;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.unshift(new EzServerClient.Tile.LevelDetail(i, UPP, scale));
			UPP /= 2;
			scale /= 2
		}
		tileInfo.levelDetails[-1] = new EzServerClient.Tile.LevelDetail(-1, UPP, scale);
		UPP /= 2;
		scale /= 2;
		tileInfo.levelDetails[-2] = new EzServerClient.Tile.LevelDetail(-2, UPP, scale);
		UPP /= 2;
		scale /= 2;
		tileInfo.levelDetails[-3] = new EzServerClient.Tile.LevelDetail(-3, UPP, scale);
		UPP /= 2;
		scale /= 2;
		tileInfo.levelDetails[-4] = new EzServerClient.Tile.LevelDetail(-4, UPP, scale);
		if(options.flatMatrix) {
			tileInfo.flatMatrix = options.flatMatrix
		} else {
			tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
		}
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	setCompatibleParm: function(options) {
		if(options.mapConvertScale) {
			this.mapConvertScale = options.mapConvertScale;
			_convert_scale = this.mapConvertScale;
			EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
		} else {
			this.mapConvertScale = 114699;
			_convert_scale = 114699;
			EzServerClient.GlobeParams.MapConvertScale = 114699
		}
		if(options.mapConvertOffsetX) {
			this.mapConvertOffsetX = options.mapConvertOffsetX;
			_convert_ofsx = this.mapConvertOffsetX;
			EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
		}
		if(options.mapConvertOffsetY) {
			this.mapConvertOffsetY = options.mapConvertOffsetY;
			_convert_ofsy = this.mapConvertOffsetY;
			EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
		}
		if(options.mapCoordinateType) {
			this.mapCoordinateType = options.mapCoordinateType;
			_MapSpanScale = this.mapCoordinateType;
			EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
		} else {
			this.mapCoordinateType = 1;
			_MapSpanScale = 1;
			EzServerClient.GlobeParams.MapCoordinateType = 1
		}
		if(options.zoomLevelSequence) {
			this.zoomLevelSequence = options.zoomLevelSequence;
			EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
		} else {
			EzServerClient.GlobeParams.ZoomLevelSequence = 0
		}
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution *= scale;
			this.tileInfo.levelDetails[i].scale *= scale
		}
		this.tileInfo.levelDetails[-1].resolution *= scale;
		this.tileInfo.levelDetails[-1].scale *= scale;
		this.tileInfo.levelDetails[-2].resolution *= scale;
		this.tileInfo.levelDetails[-2].scale *= scale;
		this.tileInfo.levelDetails[-3].resolution *= scale;
		this.tileInfo.levelDetails[-3].scale *= scale;
		this.tileInfo.levelDetails[-4].resolution *= scale;
		this.tileInfo.levelDetails[-4].scale *= scale
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		if(topLeftTile == null) {
			var col = col;
			var row = row
		} else {
			var col = topLeftTile.x + col;
			var row = topLeftTile.y - row - 1
		}
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&V=" + this.version;
		if(this.time) {
			srcUrl += "&timestamp=" + new Date().getTime().valueOf()
		}
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	CLASS_NAME: "EzServerClient.Layer.TileLayer.EzMapTileLayer2005"
});
EzServerClient.Layer.EzMapTileLayer2010 = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	tileCrs: "center",
	maxZoomLevel: 24,
	version: 0.3,
	initResolution: 2,
	levelLimit: [],
	time: false,
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		this.proxyUrl = options.proxyUrl || "";
		var obj = null;
		try {} catch(error) {
			error.message
		} finally {
			this.layer = options.layer || null;
			this.style = options.style || null;
			this.format = options.format || "image/png";
			this.TileMatrixSet = options.tileMatrixSet || null;
			this.source = options.source || "EzMap";
			var tileInfo = new EzServerClient.Tile.TileInfo();
			tileInfo.width = options.tileWidth || 256;
			tileInfo.height = options.tileHeight || 256;
			this.levelLimit = options.levelLimit || [];
			this.time = options.time || null;
			this.tileStart = options.tileStart || "leftRight";
			if(typeof(obj) == "undefined") {
				obj = false
			}
			tileInfo.origin = obj ? obj.origin : (options.originAnchor ? options.originAnchor : [0, 0]);
			this.initResolution = obj ? obj.resolution_0 : (options.initResolution ? options.initResolution : 2);
			_MapUnitPixels = tileInfo.width;
			EzServerClient.GlobeParams.MapUnitPixels = tileInfo.width;
			this.setCompatibleParm(options);
			if(this.mapCoordinateType != 1) {
				this.initResolution = this.initResolution * this.mapConvertScale;
				tileInfo.origin = [tileInfo.origin[0] * 114699, tileInfo.origin[1] * 114699]
			}
			var UPP = this.initResolution;
			var scale = 786432000;
			for(var i = 0; i <= this.maxZoomLevel; i++) {
				tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, UPP, scale));
				UPP /= 2;
				scale /= 2
			}
			if(options.flatMatrix) {
				tileInfo.flatMatrix = options.flatMatrix
			} else {
				tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
			}
			EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
		}
	},
	setCompatibleParm: function(options) {
		if(options.mapConvertScale) {
			this.mapConvertScale = options.mapConvertScale;
			_convert_scale = this.mapConvertScale;
			EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
		} else {
			this.mapConvertScale = 114699;
			_convert_scale = 114699;
			EzServerClient.GlobeParams.MapConvertScale = 114699
		}
		if(options.mapConvertOffsetX) {
			this.mapConvertOffsetX = options.mapConvertOffsetX;
			_convert_ofsx = this.mapConvertOffsetX;
			EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
		}
		if(options.mapConvertOffsetY) {
			this.mapConvertOffsetY = options.mapConvertOffsetY;
			_convert_ofsy = this.mapConvertOffsetY;
			EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
		}
		if(options.mapCoordinateType) {
			this.mapCoordinateType = options.mapCoordinateType;
			_MapSpanScale = this.mapCoordinateType;
			EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
		} else {
			this.mapCoordinateType = 1;
			_MapSpanScale = 1;
			EzServerClient.GlobeParams.MapCoordinateType = 1
		}
		if(options.zoomLevelSequence) {
			this.zoomLevelSequence = options.zoomLevelSequence;
			EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
		} else {
			EzServerClient.GlobeParams.ZoomLevelSequence = 2
		}
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		if(topLeftTile != null) {
			col = topLeftTile.x + col;
			row = topLeftTile.y - row - 1
		}
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var srcUrl = null;
		if(this.source == "wmts") {
			srcUrl = serverUrl + "?SERVICE=WMTS&REQUEST=GetTile&version=1.0.0&layer=" + this.layer + "&style=" + this.style + "&format=" + this.format + "&TileMatrixSet=" + this.TileMatrixSet + "&TileMatrix=" + level + "&TileRow=" + row + "&TileCol=" + col
		} else {
			if(this.time) {
				srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&V=" + this.version + "&timestamp=" + new Date().getTime().valueOf()
			} else {
				srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&V=" + this.version
			}
		}
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	CLASS_NAME: "EzServerClient.Layer.TileLayer.EzMapTileLayer2010"
});
EzServerClient.Layer.WMSTileLayer2010 = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	maxZoomLevel: 22,
	version: "1.1.0",
	initResolution: 2,
	layers: 0,
	transparent: true,
	srs: "srs=EPSG:4326",
	levelLimit: [],
	tileType: "pgis",
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		if(options.layers != null) {
			this.layers = options.layers
		}
		if(options.transparent != null) {
			this.transparent = options.transparent
		}
		if(options.version != null) {
			this.version = options.version
		}
		if(options.crs != null) {
			if(this.version == "1.3.0") {
				this.srs = "crs=" + options.crs
			} else {
				this.srs = "srs=" + options.crs
			}
		}
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.origin = options.originAnchor || [0, 0];
		tileInfo.width = options.tileWidth || 256;
		tileInfo.height = options.tileHeight || 256;
		this.levelLimit = options.levelLimit || [];
		this.opacity = options.opacity || null;
		this.initResolution = options.initResolution || 2;
		this.tileType = options.tileType || "pgis";
		this.tileStart = options.tileStart || "leftRight";
		_MapUnitPixels = tileInfo.width;
		EzServerClient.GlobeParams.MapUnitPixels = tileInfo.width;
		this.setCompatibleParm(options);
		if(this.mapCoordinateType != 1) {
			this.initResolution = this.initResolution * this.mapConvertScale
		}
		var UPP = this.initResolution;
		var scale = 786432000;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, UPP, scale));
			UPP /= 2;
			scale /= 2
		}
		if(options.flatMatrix) {
			tileInfo.flatMatrix = options.flatMatrix
		} else {
			tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
		}
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	setCompatibleParm: function(options) {
		if(options.mapConvertScale) {
			this.mapConvertScale = options.mapConvertScale;
			_convert_scale = this.mapConvertScale;
			EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
		} else {
			this.mapConvertScale = 114699;
			_convert_scale = 114699;
			EzServerClient.GlobeParams.MapConvertScale = 114699
		}
		if(options.mapConvertOffsetX) {
			this.mapConvertOffsetX = options.mapConvertOffsetX;
			_convert_ofsx = this.mapConvertOffsetX;
			EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
		}
		if(options.mapConvertOffsetY) {
			this.mapConvertOffsetY = options.mapConvertOffsetY;
			_convert_ofsy = this.mapConvertOffsetY;
			EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
		}
		if(options.mapCoordinateType) {
			this.mapCoordinateType = options.mapCoordinateType;
			_MapSpanScale = this.mapCoordinateType;
			EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
		} else {
			this.mapCoordinateType = 1;
			_MapSpanScale = 1;
			EzServerClient.GlobeParams.MapCoordinateType = 1
		}
		if(options.zoomLevelSequence) {
			this.zoomLevelSequence = options.zoomLevelSequence;
			EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
		} else {
			EzServerClient.GlobeParams.ZoomLevelSequence = 2
		}
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		if(topLeftTile != null) {
			if(this.tileType == "pgis") {
				col = topLeftTile.x + col;
				row = topLeftTile.y - row - 1
			} else {
				col = topLeftTile.x + col;
				row = row - topLeftTile.y
			}
		}
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var tpz, mrz, bbox;
		if(this.tileType == "pgis") {
			tpz = new EzServerClient.TilePositionZ(col, row, level);
			mrz = this.toMapCoords(tpz);
			if(this.version == "1.3.0") {
				bbox = mrz.miny + "," + mrz.minx + "," + mrz.maxy + "," + mrz.maxx
			} else {
				bbox = mrz.toString()
			}
		} else {
			tpz = new EzServerClient.TilePositionZ(col, row, level);
			mrz = this.toMapCoordsY(tpz);
			if(this.version == "1.3.0") {
				bbox = mrz.miny + "," + mrz.minx + "," + mrz.maxy + "," + mrz.maxx
			} else {
				bbox = mrz.toString()
			}
		}
		var srcUrl = serverUrl + "?version=" + this.version + "&request=GetMap&layers=" + this.layers + "&styles=&bbox=" + bbox + "&" + this.srs + "&width=256&height=256&format=image/png&TRANSPARENT=true";
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	CLASS_NAME: "EzServerClient.Layer.TileLayer.WMSTileLayer2010"
});
EzServerClient.Layer.WMSTileLayer2005 = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	maxZoomLevel: 18,
	version: "1.1.0",
	initResolution: 2,
	layers: 0,
	transparent: true,
	srs: "srs=EPSG:4326",
	levelLimit: [],
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		if(options.layers != null) {
			this.layers = options.layers
		}
		if(options.transparent != null) {
			this.transparent = options.transparent
		}
		if(options.version != null) {
			this.version = options.version
		}
		if(options.crs != null) {
			if(this.version == "1.3.0") {
				this.srs = "crs=" + options.crs
			} else {
				this.srs = "srs=" + options.crs
			}
		}
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.origin = options.originAnchor || [0, 0];
		tileInfo.width = options.tileWidth || 256;
		tileInfo.height = options.tileHeight || 256;
		this.levelLimit = options.levelLimit || [];
		this.opacity = options.opacity || null;
		_MapUnitPixels = tileInfo.width;
		EzServerClient.GlobeParams.MapUnitPixels = tileInfo.width;
		this.setCompatibleParm(options);
		if(this.mapCoordinateType != 1) {
			this.initResolution = this.initResolution * this.mapConvertScale
		}
		var UPP = this.initResolution;
		var scale = 786432000;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.unshift(new EzServerClient.Tile.LevelDetail(i, UPP, scale));
			UPP /= 2;
			scale /= 2
		}
		tileInfo.levelDetails[-1] = new EzServerClient.Tile.LevelDetail(-1, UPP, scale);
		UPP /= 2;
		scale /= 2;
		tileInfo.levelDetails[-2] = new EzServerClient.Tile.LevelDetail(-2, UPP, scale);
		UPP /= 2;
		scale /= 2;
		tileInfo.levelDetails[-3] = new EzServerClient.Tile.LevelDetail(-3, UPP, scale);
		UPP /= 2;
		scale /= 2;
		tileInfo.levelDetails[-4] = new EzServerClient.Tile.LevelDetail(-4, UPP, scale);
		if(options.flatMatrix) {
			tileInfo.flatMatrix = options.flatMatrix
		} else {
			tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
		}
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	setCompatibleParm: function(options) {
		if(options.mapConvertScale) {
			this.mapConvertScale = options.mapConvertScale;
			_convert_scale = this.mapConvertScale;
			EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
		} else {
			this.mapConvertScale = 114699;
			_convert_scale = 114699;
			EzServerClient.GlobeParams.MapConvertScale = 114699
		}
		if(options.mapConvertOffsetX) {
			this.mapConvertOffsetX = options.mapConvertOffsetX;
			_convert_ofsx = this.mapConvertOffsetX;
			EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
		}
		if(options.mapConvertOffsetY) {
			this.mapConvertOffsetY = options.mapConvertOffsetY;
			_convert_ofsy = this.mapConvertOffsetY;
			EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
		}
		if(options.mapCoordinateType) {
			this.mapCoordinateType = options.mapCoordinateType;
			_MapSpanScale = this.mapCoordinateType;
			EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
		} else {
			this.mapCoordinateType = 1;
			_MapSpanScale = 1;
			EzServerClient.GlobeParams.MapCoordinateType = 1
		}
		if(options.zoomLevelSequence) {
			this.zoomLevelSequence = options.zoomLevelSequence;
			EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
		} else {
			EzServerClient.GlobeParams.ZoomLevelSequence = 0
		}
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution *= scale;
			this.tileInfo.levelDetails[i].scale *= scale
		}
		this.tileInfo.levelDetails[-1].resolution *= scale;
		this.tileInfo.levelDetails[-1].scale *= scale;
		this.tileInfo.levelDetails[-2].resolution *= scale;
		this.tileInfo.levelDetails[-2].scale *= scale;
		this.tileInfo.levelDetails[-3].resolution *= scale;
		this.tileInfo.levelDetails[-3].scale *= scale;
		this.tileInfo.levelDetails[-4].resolution *= scale;
		this.tileInfo.levelDetails[-4].scale *= scale
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		var col = topLeftTile.x + col;
		var row = topLeftTile.y - row - 1;
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var tpz = new EzServerClient.TilePositionZ(col, row, level);
		var mrz = this.toMapCoords(tpz);
		var bbox = null;
		if(this.version == "1.3.0") {
			bbox = mrz.miny + "," + mrz.minx + "," + mrz.maxy + "," + mrz.maxx
		} else {
			bbox = mrz.toString()
		}
		var srcUrl = serverUrl + "?version=" + this.version + "&request=GetMap&layers=" + this.layers + "&styles=&bbox=" + bbox + "&" + this.srs + "&width=256&height=256&format=image/png&TRANSPARENT=true";
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	CLASS_NAME: "EzServerClient.Layer.TileLayer.WMSTileLayer2005"
});
EzServerClient.Layer.JiAoTileLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	maxZoomLevel: 18,
	version: "1.0.0",
	originAnchor: [-180, 90],
	width: 256,
	height: 256,
	initResolution: 1.4062500262315805,
	levelLimit: [],
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		this.levelLimit = options.levelLimit || [];
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.width = this.width;
		tileInfo.height = this.height;
		tileInfo.origin = this.originAnchor;
		var res = this.initResolution;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
			res /= 2
		}
		EzServerClient.GlobeParams.ZoomLevelSequence = 2;
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		var col = topLeftTile.x + col;
		var row = row - topLeftTile.y;
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var srcUrl = serverUrl + "/" + (level + zoomOffset) + "/" + row + "/" + col + ".jpg";
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	CLASS_NAME: "EzServerClient.Layer.JiAoTileLayer"
});
EzServerClient.Layer.WMTSTileLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	tileCrs: "leftop",
	maxZoomLevel: 22,
	version: "1.0.0",
	originAnchor: [-180, 90],
	width: 256,
	height: 256,
	initResolution: 1.40625,
	layer: null,
	style: null,
	TileMatrixSet: null,
	TileMatrix: null,
	levelLimit: [],
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		this.initResolution = options.initResolution || 1.40625;
		this.layer = options.layer || null;
		this.style = options.style || null;
		this.opacity = options.opacity || 100;
		this.format = options.format || "image/png";
		this.TileMatrixSet = options.tileMatrixSet || null;
		this.TileMatrix = options.tileMatrix || null;
		this.source = options.source || "EzServer";
		this.tileCrs = options.tileCrs || "leftop";
		this.levelLimit = options.levelLimit || [];
		this.layerNum = options.layerNum || 0;
		this.autoConfig = options.autoConfig || "on";
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.width = this.width;
		tileInfo.height = this.height;
		tileInfo.origin = options.originAnchor || [-180, 90];
		this.setCompatibleParm(options);
		if(this.mapCoordinateType != 1) {
			this.initResolution *= 114699;
			tileInfo.origin = [tileInfo.origin[0] * 114699, tileInfo.origin[1] * 114699]
		}
		var res = this.initResolution;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
			res /= 2
		}
		EzServerClient.GlobeParams.ZoomLevelSequence = 2;
		if(options.flatMatrix) {
			tileInfo.flatMatrix = options.flatMatrix
		} else {
			tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
		}
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	formatString: function(str, level) {
		var newStr = null;
		if(str != null) {
			newStr = str.replace("%d", level)
		}
		return newStr
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		if(this.tileCrs == "center") {
			col = topLeftTile.x + col;
			row = topLeftTile.y - row - 1
		} else {
			if(topLeftTile != null) {
				col = topLeftTile.x + col;
				row = row - topLeftTile.y
			}
		}
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var srcUrl = null;
		if(this.source == "wmts") {
			var level = zoomOffset + level;
			var TileMatrix = this.formatString(this.TileMatrix, level);
			srcUrl = serverUrl + "?SERVICE=WMTS&REQUEST=GetTile&version=1.0.0&layer=" + this.layer + "&style=" + this.style + "&format=" + this.format + "&TileMatrixSet=" + this.TileMatrixSet + "&TileMatrix=" + TileMatrix + "&TileRow=" + row + "&TileCol=" + col
		}
		if(this.source == "EzServer") {
			srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&V=" + this.version
		}
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	setCompatibleParm: function(options) {
		if(options.mapConvertScale) {
			this.mapConvertScale = options.mapConvertScale;
			_convert_scale = this.mapConvertScale;
			EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
		} else {
			this.mapConvertScale = 114699;
			_convert_scale = 114699;
			EzServerClient.GlobeParams.MapConvertScale = 114699
		}
		if(options.mapConvertOffsetX) {
			this.mapConvertOffsetX = options.mapConvertOffsetX;
			_convert_ofsx = this.mapConvertOffsetX;
			EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
		}
		if(options.mapConvertOffsetY) {
			this.mapConvertOffsetY = options.mapConvertOffsetY;
			_convert_ofsy = this.mapConvertOffsetY;
			EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
		}
		if(options.mapCoordinateType) {
			this.mapCoordinateType = options.mapCoordinateType;
			_MapSpanScale = this.mapCoordinateType;
			EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
		} else {
			this.mapCoordinateType = 1;
			_MapSpanScale = 1;
			EzServerClient.GlobeParams.MapCoordinateType = 1
		}
		if(options.zoomLevelSequence) {
			this.zoomLevelSequence = options.zoomLevelSequence;
			EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
		} else {
			EzServerClient.GlobeParams.ZoomLevelSequence = 2
		}
	},
	CLASS_NAME: "EzServerClient.Layer.WMTSTileLayer"
});
EzServerClient.Layer.TiledMapServiceLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	maxZoomLevel: 18,
	version: "1.0.0",
	tiledMapService: null,
	layers: "",
	styles: "",
	transparent: 0,
	mime: "",
	time: "",
	metaProxyUrl: null,
	parseXml: function(source) {
		source += "?VERSION=" + this.version + "&SERVICE=TMS&REQUEST=GetMetadata";
		var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		if(this.metaProxyUrl) {
			xmlhttp.open("GET", this.metaProxyUrl + "?request=gotourl&url=" + encodeURIComponent(source), false)
		} else {
			xmlhttp.open("GET", source, false)
		}
		xmlhttp.setRequestHeader("Content-Type", "text/xml");
		xmlhttp.send();
		return EzServerClient.TMSXmlParse.EzFactory.FromXml(xmlhttp.responseText)
	},
	setMetaDateProxy: function(metaProxyUrl) {
		this.metaProxyUrl = metaProxyUrl
	},
	initialize: function(name, url, layers, styles, time, options) {
		if(!options) {
			options = {}
		}
		this.layers = layers;
		this.styles = styles;
		this.metaProxyUrl = options.metaProxyUrl;
		this.time = time;
		this.transparent = options.transparent ? options.transparent : 0;
		this.mime = options.mime ? options.mime : "image/png";
		this.tiledMapService = this.parseXml(url.split(",")[0]);
		this.version = this.tiledMapService.getVersion() || this.version;
		var tileInfo = new EzServerClient.Tile.TileInfo();
		var uTiledLyrs = this.tiledMapService.getTiledLayers();
		var uTiledLyr = uTiledLyrs.get(0);
		var uTiledFormats = uTiledLyr.getTiledFormats();
		var uTiledFormat = uTiledFormats.get(0);
		tileInfo.width = parseInt(uTiledFormat.getWidth());
		tileInfo.height = parseInt(uTiledFormat.getHeight());
		var uTiledOrigin = uTiledLyr.getTiledOrigin();
		tileInfo.origin = [parseInt(uTiledOrigin.getX()), parseInt(uTiledOrigin.getY())];
		var uTiledSets = uTiledLyr.getTiledSets();
		this.maxZoomLevel = uTiledSets.size();
		for(var j = 0; j < uTiledSets.size(); j++) {
			var uTileSet = uTiledSets.get(j);
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(parseInt(uTileSet.getLevel()), parseFloat(uTileSet.getUnitsPerPixel() * 2)))
		}
		EzServerClient.GlobeParams.ZoomLevelSequence = 2;
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i < this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		var col = topLeftTile.x + col;
		var row = topLeftTile.y - row - 1;
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var zoom = level + zoomOffset;
		var srcUrl = serverUrl + "?SERVICE=TMS&VERSION=" + this.version + "&REQUEST=GetImage&LAYERS=" + this.layers + "&STYLES=" + this.styles + "&TRANSPARENT=" + this.transparent + "&MIME=" + this.mime + "&LEVEL=" + zoom + "&ROW=" + row + "&COL=" + col + "&TIME=" + this.time;
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	CLASS_NAME: "EzServerClient.Layer.TiledMapServiceLayer"
});
EzServerClient.Layer.TianDiTuTileLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	maxZoomLevel: 18,
	version: "1.0.0",
	origin: [-180, 90],
	width: 256,
	height: 256,
	initResolution: 1.40625,
	levelLimit: [],
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		this.initResolution = options.initResolution || 1.40625;
		this.origin = options.originAnchor || [-180, 90];
		this.levelLimit = options.levelLimit || [];
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.width = this.width;
		tileInfo.height = this.height;
		tileInfo.origin = this.origin;
		var res = this.initResolution;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
			res /= 2
		}
		EzServerClient.GlobeParams.ZoomLevelSequence = 2;
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		var col = topLeftTile.x + col;
		var row = row - topLeftTile.y;
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var srcUrl = serverUrl + "&X=" + col + "&Y=" + row + "&L=" + (level + zoomOffset);
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	CLASS_NAME: "EzServerClient.Layer.TianDiTuTileLayer"
});
EzServerClient.Layer.ArcGISTileLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	maxZoomLevel: 20,
	version: "1.0.0",
	origin: [-20037508.342789248, 20037508.342789248],
	width: 256,
	height: 256,
	initResolution: 156543.033928041,
	initialize: function(name, url) {
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.width = this.width;
		tileInfo.height = this.height;
		tileInfo.origin = this.origin;
		var res = this.initResolution;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
			res /= 2
		}
		EzServerClient.GlobeParams.ZoomLevelSequence = 2;
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		var col = topLeftTile.x + col;
		var row = row - topLeftTile.y;
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var srcUrl = serverUrl + "/tile/" + (level + zoomOffset) + "/" + row + "/" + col;
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	CLASS_NAME: "EzServerClient.Layer.ArcGISTileLayer"
});
EzServerClient.Layer.HotSpotTileLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	sourceType: "webcontainer",
	crsType: "Geog(256)",
	filter: null,
	label: null,
	HotspotStyle: null,
	setHotStyle: function(fillColor, bouderColor, bouderWeight, opacity) {
		this.HotspotStyle.fillColor = fillColor;
		this.HotspotStyle.borderColor = bouderColor;
		this.HotspotStyle.borderWeight = bouderWeight;
		this.HotspotStyle.opacity = opacity
	},
	initialize: function(name, url, tileInfo) {
		this.crsType = (this.mapCoordinateType == 1) ? ("Geog(" + tileInfo.width + ")") : ("Proj(" + tileInfo.width + ")");
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, ["hotspotLyr", url, tileInfo])
	},
	makeJsonStr: function(obj, coords) {
		if(obj == null) {
			return ""
		}
		var str = '{"spatialfilters":';
		str += '[{"relation":"' + (obj.relation || "overlap") + '"';
		str += ',"buffersize":"' + (obj.buffersize || "0") + '"';
		str += ',"bufferunit":"' + (obj.bufferunit || "degree") + '"';
		str += ',"shape":[{';
		str += '"geotype":"' + (obj.geotype || "polygon") + '"';
		str += ',"coords":"' + (obj.coords || coords) + '"';
		str += "}]}]}";
		return "&spatialfilters=" + str
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		var col, row;
		if(topLeftTile == null) {
			col = col;
			row = row
		} else {
			col = topLeftTile.x + col;
			row = topLeftTile.y - row - 1
		}
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var zoom = level + zoomOffset;
		var zoom1 = zoom;
		if(this.zoomLevelSequence == 2) {
			zoom1 = 18 - zoom
		}
		var tpz = new EzServerClient.TilePositionZ(col, row, level);
		var mrz = this.toMapCoords(tpz);
		var coords = [mrz.minx, mrz.miny, mrz.maxx, mrz.miny, mrz.maxx, mrz.maxy, mrz.minx, mrz.maxy].join(",");
		var srcUrl = serverUrl + (this.sourceType.toLocaleLowerCase() == "ezserver" ? "/EzMap?Service=getHotspot&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level : this.sourceType.toLocaleLowerCase() == "ezmapservice" ? "&col=" + col + "&row=" + row + "&zoom=" + zoom1 + "&crs=" + this.crsType + this.makeJsonStr(this.filter, coords) + "&timestamp=" + new Date().getTime().valueOf() : "/z" + zoom + "/x" + col + "/z" + zoom + "_x" + col + "_y" + row);
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	createLayerContainer: function() {
		var tileDiv = document.createElement("map");
		tileDiv.style.position = "absolute";
		tileDiv.id = this.name;
		return tileDiv
	},
	setAreaPorp: function(vLyr, vEvent, vFunc, vHotSpot, vMap, vArea) {
		if(typeof(EzServerClient.GlobeParams.openIndoorMap) == "undefined") {
			EzServerClient.GlobeParams.openIndoorMap = false
		}
		if(!EzServerClient.GlobeParams.openIndoorMap) {} else {
			if(vMap.bIsOpenIndoorMap) {
				eval("vArea." + vEvent + "=function(){vFunc(vHotSpot)}")
			} else {
				vArea.onclick = function() {
					try {
						eval("vArea." + vEvent + "=function(){vFunc(vHotSpot)}");
						vMap.loadIndoorMap(vHotSpot);
						if(vMap.bIsAddIndoorTitle) {
							vMap.bIsAddIndoorTitle = false;
							vMap.removeOverlay(vMap.title)
						}
					} catch(e) {
						throw EzErrorFactory.createError("EzMap::loadIndoorMap方法不正确", e)
					}
					window.event.cancelBubble = true
				}
			}
		}
		if(typeof(vArea) != "undefined") {
			eval("vArea." + vEvent + "=function(){vFunc(vHotSpot)}");
			if(typeof(EzServerClient.GlobeParams.openIndoorMap) == "undefined") {
				EzServerClient.GlobeParams.openIndoorMap = false
			}
			if(EzServerClient.GlobeParams.openIndoorMap) {
				vArea.information = vHotSpot
			}
			vArea.ondblclick = function() {
				window.event.cancelBubble = true
			};
			vArea.onmouseover = function(e) {
				vMap.hotspotImg.style.cursor = "pointer";
				if(vLyr.isDisplayProfile && !vMap.bIsPaning) {
					__show(vArea, vMap, vLyr)
				}
			};
			vArea.onmouseout = function() {
				vMap.hotspotImg.style.cursor = "";
				if(vLyr.isDisplayProfile && !vMap.bIsPaning) {
					__hide()
				}
			}
		}
		return vArea
	},
	loadHotTile: function(oLi, oMap, oLayer, oHotspot) {
		var hotspotlen;
		if(oHotspot != null) {
			hotspotlen = oHotspot.length
		} else {
			return
		}
		var childlen = oLi.childNodes.length;
		if(childlen > hotspotlen) {
			for(var i = hotspotlen; i < oLi.childNodes.length; i++) {
				oLi.removeChild(oLi.childNodes[i])
			}
		} else {
			for(var i = childlen; i < hotspotlen; i++) {
				var temp = document.createElement("area");
				temp.shape = "poly";
				temp.coords = "x,y";
				temp.id = oHotspot[i].ID;
				oLi.appendChild(temp)
			}
		}
		for(var i = 0, mm = 0; i < hotspotlen; i++, mm++) {
			if(typeof(oLi.childNodes[mm]) != "undefined" && oMap.filterId == oLi.childNodes[mm].id) {
				oLi.removeChild(oLi.childNodes[mm]);
				mm--;
				continue
			}
			var area = oLayer.hotspot2d ? oLi.childNodes[mm] : oLayer.setAreaPorp(oLayer, oLayer.eventName, oLayer.callback, oHotspot[i], oMap, oLi.childNodes[mm]);
			if(typeof(area) == "undefined") {
				continue
			}
			area._p = oHotspot[i].GEOMETRY;
			area.coords = "x,y";
			if(!area._p) {
				continue
			}
			var labelStr = oLayer.label;
			if(labelStr) {
				labelStr = labelStr.toUpperCase();
				var labels = [labelStr];
				var altStr = "";
				if(labelStr.indexOf(",") > 0) {
					labels = labelStr.split(",")
				}
				for(var k = 0, j = labels.length; k < j; k++) {
					altStr += oHotspot[i][labels[k]]
				}
				if(altStr != "") {
					area.alt = altStr
				}
			}
			area._center = oHotspot[i].X + "," + oHotspot[i].Y;
			if(oLayer.hotspot2d) {
				area._bound = oHotspot[i].BOUND ? oHotspot[i].BOUND : "";
				area._iconUrl = oLayer.hotspotIconUrl ? oLayer.hotspotIconUrl : EzServerClient.GlobeParams.EzServerClientURL + "/images/hotspot/hotspot.png";
				area._hotspot = oHotspot[i]
			}
			__EzRefreshAreaHandler(area, oMap, oMap.groupTileImages[0][0][0].offsetLeft, oMap.groupTileImages[0][0][0].offsetTop)
		}
		delete oHotspot;
		oHotspot = null
	},
	CLASS_NAME: "EzServerClient.Layer.HotSpotTileLayer"
});
EzServerClient.Layer.HotSpotTileLayer2005 = EzServerClient.Class(EzServerClient.Layer.HotSpotTileLayer, {
	maxZoomLevel: 18,
	version: 0.3,
	initResolution: 2,
	eventName: "",
	callback: null,
	isDisplayProfile: false,
	hotspot2d: false,
	levelLimit: [],
	hotspotIconUrl: "",
	initialize: function(name, isDisplayProfile, eventName, callback, url, options) {
		if(!options) {
			options = {}
		}
		this.eventName = eventName;
		this.callback = callback;
		this.isDisplayProfile = isDisplayProfile;
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.origin = options.originAnchor || [0, 0];
		tileInfo.width = options.tileWidth || 256;
		tileInfo.height = options.tileHeight || 256;
		if(options.flatMatrix) {
			tileInfo.flatMatrix = options.flatMatrix
		} else {
			tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
		}
		this.hotspot2d = options.hotspot2d || false;
		this.levelLimit = options.levelLimit || [];
		this.hotspotIconUrl = options.hotspotIconUrl || "";
		this.sourceType = options.sourceType || "webcontainer";
		this.filter = options.filter || null;
		this.label = options.label || "";
		this.HotspotStyle = options.HotspotStyle || null;
		_MapUnitPixels = tileInfo.width;
		EzServerClient.GlobeParams.MapUnitPixels = tileInfo.width;
		this.setCompatibleParm(options);
		if(this.mapCoordinateType != 1) {
			this.initResolution = this.initResolution * this.mapConvertScale
		}
		var UPP = this.initResolution;
		var scale = 786432000;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.unshift(new EzServerClient.Tile.LevelDetail(i, UPP, scale));
			UPP /= 2;
			scale /= 2
		}
		tileInfo.levelDetails[-1] = new EzServerClient.Tile.LevelDetail(-1, UPP, scale);
		UPP /= 2;
		scale /= 2;
		tileInfo.levelDetails[-2] = new EzServerClient.Tile.LevelDetail(-2, UPP, scale);
		UPP /= 2;
		scale /= 2;
		tileInfo.levelDetails[-3] = new EzServerClient.Tile.LevelDetail(-3, UPP, scale);
		UPP /= 2;
		scale /= 2;
		tileInfo.levelDetails[-4] = new EzServerClient.Tile.LevelDetail(-4, UPP, scale);
		EzServerClient.Layer.HotSpotTileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	setCompatibleParm: function(options) {
		if(options.mapConvertScale) {
			this.mapConvertScale = options.mapConvertScale;
			_convert_scale = this.mapConvertScale;
			EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
		} else {
			this.mapConvertScale = 114699;
			_convert_scale = 114699;
			EzServerClient.GlobeParams.MapConvertScale = 114699
		}
		if(options.mapConvertOffsetX) {
			this.mapConvertOffsetX = options.mapConvertOffsetX;
			_convert_ofsx = this.mapConvertOffsetX;
			EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
		}
		if(options.mapConvertOffsetY) {
			this.mapConvertOffsetY = options.mapConvertOffsetY;
			_convert_ofsy = this.mapConvertOffsetY;
			EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
		}
		if(options.mapCoordinateType) {
			this.mapCoordinateType = options.mapCoordinateType;
			_MapSpanScale = this.mapCoordinateType;
			EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
		} else {
			this.mapCoordinateType = 1;
			_MapSpanScale = 1;
			EzServerClient.GlobeParams.MapCoordinateType = 1
		}
		if(options.zoomLevelSequence) {
			this.zoomLevelSequence = options.zoomLevelSequence;
			EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
		} else {
			EzServerClient.GlobeParams.ZoomLevelSequence = 0
		}
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution *= scale;
			this.tileInfo.levelDetails[i].scale *= scale
		}
		this.tileInfo.levelDetails[-1].resolution *= scale;
		this.tileInfo.levelDetails[-1].scale *= scale;
		this.tileInfo.levelDetails[-2].resolution *= scale;
		this.tileInfo.levelDetails[-2].scale *= scale;
		this.tileInfo.levelDetails[-3].resolution *= scale;
		this.tileInfo.levelDetails[-3].scale *= scale;
		this.tileInfo.levelDetails[-4].resolution *= scale;
		this.tileInfo.levelDetails[-4].scale *= scale
	},
	CLASS_NAME: "EzServerClient.Layer.HotSpotTileLayer2005"
});
EzServerClient.Layer.HotSpotTileLayer2010 = EzServerClient.Class(EzServerClient.Layer.HotSpotTileLayer, {
	maxZoomLevel: 24,
	version: 0.3,
	initResolution: 2,
	eventName: "",
	callback: null,
	isDisplayProfile: false,
	hotspot2d: false,
	levelLimit: [],
	hotspotIconUrl: "",
	initialize: function(name, isDisplayProfile, eventName, callback, url, options) {
		if(!options) {
			options = {}
		}
		this.eventName = eventName;
		this.callback = callback;
		this.isDisplayProfile = isDisplayProfile;
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.origin = options.originAnchor || [0, 0];
		tileInfo.width = options.tileWidth || 256;
		tileInfo.height = options.tileHeight || 256;
		if(options.flatMatrix) {
			tileInfo.flatMatrix = options.flatMatrix
		} else {
			tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
		}
		this.hotspot2d = options.hotspot2d || false;
		this.levelLimit = options.levelLimit || [];
		this.hotspotIconUrl = options.hotspotIconUrl || "";
		this.sourceType = options.sourceType || "webcontainer";
		this.filter = options.filter || null;
		this.label = options.label || "";
		this.HotspotStyle = options.HotspotStyle || null;
		_MapUnitPixels = tileInfo.width;
		EzServerClient.GlobeParams.MapUnitPixels = tileInfo.width;
		this.setCompatibleParm(options);
		if(this.mapCoordinateType != 1) {
			this.initResolution = this.initResolution * this.mapConvertScale
		}
		var UPP = this.initResolution;
		var scale = 786432000;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, UPP, scale));
			UPP /= 2;
			scale /= 2
		}
		EzServerClient.Layer.HotSpotTileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	setCompatibleParm: function(options) {
		if(options.mapConvertScale) {
			this.mapConvertScale = options.mapConvertScale;
			_convert_scale = this.mapConvertScale;
			EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
		} else {
			this.mapConvertScale = 114699;
			_convert_scale = 114699;
			EzServerClient.GlobeParams.MapConvertScale = 114699
		}
		if(options.mapConvertOffsetX) {
			this.mapConvertOffsetX = options.mapConvertOffsetX;
			_convert_ofsx = this.mapConvertOffsetX;
			EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
		}
		if(options.mapConvertOffsetY) {
			this.mapConvertOffsetY = options.mapConvertOffsetY;
			_convert_ofsy = this.mapConvertOffsetY;
			EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
		}
		if(options.mapCoordinateType) {
			this.mapCoordinateType = options.mapCoordinateType;
			_MapSpanScale = this.mapCoordinateType;
			EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
		} else {
			this.mapCoordinateType = 1;
			_MapSpanScale = 1;
			EzServerClient.GlobeParams.MapCoordinateType = 1
		}
		if(options.zoomLevelSequence) {
			this.zoomLevelSequence = options.zoomLevelSequence;
			EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
		} else {
			EzServerClient.GlobeParams.ZoomLevelSequence = 2
		}
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	CLASS_NAME: "EzServerClient.Layer.HotSpotTileLayer2010"
});
EzServerClient.Layer.GoogleTileLayer = EzServerClient.Class(EzServerClient.Layer.MercatorTileLayer, {
	tileCrs: "leftop",
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		if(topLeftTile == null) {
			topLeftTile = {
				x: 0,
				y: 0
			}
		}
		col = topLeftTile.x + col;
		var srcUrl;
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		if(this.source == "google") {
			row = (row - topLeftTile.y);
			srcUrl = serverUrl + "&x=" + col + "&y=" + row + "&z=" + (level + zoomOffset)
		} else {
			row = -(row - topLeftTile.y);
			srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&V=" + this.version
		}
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	CLASS_NAME: "EzServerClient.Layer.GoogleTileLayer"
});
EzServerClient.Layer.AmapTileLayer = EzServerClient.Class(EzServerClient.Layer.MercatorTileLayer, {
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		if(topLeftTile == null) {
			topLeftTile = {
				x: 0,
				y: 0
			}
		}
		col = topLeftTile.x + col;
		row = (row - topLeftTile.y);
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var srcUrl = serverUrl + "?x=" + col + "&y=" + row + "&z=" + (level + zoomOffset);
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	CLASS_NAME: "EzServerClient.Layer.AmapTileLayer"
});
EzServerClient.Layer.EzThematicTileLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	tileCrs: "leftop",
	maxZoomLevel: 22,
	version: "1.0.0",
	originAnchor: [-180, 90],
	width: 256,
	height: 256,
	initResolution: 1.40625,
	layer: null,
	style: null,
	TileMatrixSet: null,
	TileMatrix: null,
	levelLimit: [],
	ChartType: "PieChart",
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		this.initResolution = options.initResolution || 1.40625;
		this.opacity = options.opacity || 100;
		this.tileCrs = options.tileCrs || "leftop";
		this.levelLimit = options.levelLimit || [];
		this.ChartType = options.CharType || "PieChart";
		this.TableName = options.TableName || null;
		this.LayerName = options.LayerName || null;
		this.RelatedField = options.RelatedField || null;
		this.BBOX = options.BBOX || "-180,-90,180,90";
		this.Width = options.Width || 256;
		this.Height = options.Height || 256;
		this.Transparency = options.Transparency || 255;
		this.Fields = options.Fields || null;
		this.FillStyle = options.FillStyle || 0;
		this.Colors = options.Colors || null;
		this.SQL = options.SQL || "1=1";
		this.setThematicParms(options);
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.width = this.width;
		tileInfo.height = this.height;
		tileInfo.origin = options.originAnchor || [-180, 90];
		this.setCompatibleParm(options);
		if(this.mapCoordinateType != 1) {
			this.initResolution *= 114699;
			tileInfo.origin = [tileInfo.origin[0] * 114699, tileInfo.origin[1] * 114699]
		}
		var res = this.initResolution;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
			res /= 2
		}
		EzServerClient.GlobeParams.ZoomLevelSequence = 2;
		if(options.flatMatrix) {
			tileInfo.flatMatrix = options.flatMatrix
		} else {
			tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
		}
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	formatString: function(str, level) {
		var newStr = null;
		if(str != null) {
			newStr = str.replace("%d", level)
		}
		return newStr
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		if(this.tileCrs == "center") {
			col = topLeftTile.x + col;
			row = topLeftTile.y - row - 1
		} else {
			if(topLeftTile != null) {
				col = topLeftTile.x + col;
				row = row - topLeftTile.y
			}
		}
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var tpz, mrz, bbox;
		if(this.tileCrs == "center") {
			tpz = new EzServerClient.TilePositionZ(col, row, level);
			mrz = this.toMapCoords(tpz);
			bbox = mrz.toString()
		} else {
			tpz = new EzServerClient.TilePositionZ(col, row, level);
			mrz = this.toMapCoordsY(tpz);
			bbox = mrz.toString()
		}
		var srcUrl = null;
		if(this.ChartType == "PieChart") {
			srcUrl = serverUrl + "?Request=GetThematicMap&ChartType=" + this.ChartType + "&TableName=" + this.TableName + "&LayerName=" + this.LayerName + "&RelatedField=" + this.RelatedField + "&BBOX=" + bbox + "&Width=" + this.Width + "&Height=" + this.Height + "&Transparency=" + this.Transparency + "&Fields=" + this.Fields + "&FillStyle=" + this.FillStyle + "&RingCount=" + this.RingCount + "&OutDia=" + this.OutDia + "&InsideDia=" + this.InsideDia + "&PieHeight=" + this.PieHeight + "&Colors=" + this.Colors + "&Ratio=" + this.Ratio + "&ThickPercent=" + this.ThickPercent + "&LengthPercent=" + this.LengthPercent + "&HighLightOffSet=" + this.HighLightOffSet + "&LineWidth=" + this.LineWidth + "&PieGradualClr=" + this.PieGradualClr + "&BorderColor=" + this.BorderColor + "&PieCountInRing=" + this.PieCountInRing + "&RotateAngleH=" + this.RotateAngleH + "&RotateAngleV=" + this.RotateAngleV + "&SQL=" + this.SQL
		}
		if(this.ChartType == "BarChart") {
			srcUrl = serverUrl + "?Request=GetThematicMap &ChartType=" + this.ChartType + "&TableName=" + this.TableName + "&LayerName=" + this.LayerName + "&RelatedField=" + this.RelatedField + "&BBOX=" + bbox + "&Width=" + this.Width + " &Height=" + this.Height + "&Transparency=" + this.Transparency + "&Fields=" + this.Fields + "&FillStyle=" + this.FillStyle + "&BarShape=" + this.BarShape + "&BarLayoutShape=" + this.BarLayoutShape + "&BarDirection=" + this.BarDirection + "&BarWidth=" + this.BarWidth + "&Colors=" + this.Colors + "&BarThick=" + this.BarThick + "&BarOffSet=" + this.BarOffSet + "&BarUnitValue=" + this.BarUnitValue + "&BarUnitHeight=" + this.BarUnitHeight + "&BarViewAngle=" + this.BarViewAngle + "&HighLightOffSet=" + this.HighLightOffSet + "&BorderColor=" + this.BorderColor + "&LineWidth=" + this.LineWidth + "&BarGradualMethod=" + this.BarGradualMethod + "&Colors2=" + this.Colors2 + "&SQL=" + this.SQL + "&MaxHeight=" + this.MaxHeight
		}
		if(this.ChartType == "GridChart") {
			srcUrl = serverUrl + "?Request=GetThematicMap &ChartType=" + this.ChartType + "&TableName=" + this.TableName + "&LayerName=" + this.LayerName + "&RelatedField=" + this.RelatedField + "&BBOX=" + bbox + "&Width=" + this.Width + " &Height=" + this.Height + "&Transparency=" + this.Transparency + "&Fields=" + this.Fields + "&FillStyle=" + this.FillStyle + "&XGridCount=" + this.XGridCount + "&YGridCount=" + this.YGridCount + "&ValuePerGrid=" + this.ValuePerGrid + "&GridSize=" + this.GridSize + "&RowGap=" + this.RowGap + "&ColGap=" + this.ColGap + "&PageGapH=" + this.PageGapH + "&PageGapV=" + this.PageGapV + "&GridTick=" + this.GridTick + "&Colors2=" + this.Colors2 + "&GridGradualMethod=" + this.GridGradualMethod + "&SQL=" + this.SQL
		}
		if(this.ChartType == "RangeChart") {
			srcUrl = serverUrl + "?Request=GetThematicMap &ChartType=" + this.ChartType + "&TableName=" + this.TableName + "&LayerName=" + this.LayerName + "&RelatedField=" + this.RelatedField + "&BBOX=" + bbox + "&Width=" + this.Width + " &Height=" + this.Height + "&Transparency=" + this.Transparency + "&Fields=" + this.Fields + "&FillStyle=" + this.FillStyle + "&NameField=" + this.NameField + "&Levels=" + this.Levels + "&SQL=" + this.SQL
		}
		if(this.ChartType == "UniqueChart") {
			srcUrl = serverUrl + "?Request=GetThematicMap &ChartType=" + this.ChartType + "&TableName=" + this.TableName + "&LayerName=" + this.LayerName + "&RelatedField=" + this.RelatedField + "&BBOX=" + bbox + "&Width=" + this.Width + " &Height=" + this.Height + "&Transparency=" + this.Transparency + "&Fields=" + this.Fields + "&FillStyle=" + this.FillStyle + "&NameField=" + this.NameField + "&SQL=" + this.SQL
		}
		if(this.ChartType == "GradualSymbol") {
			srcUrl = serverUrl + "?Request=GetThematicMap &ChartType=" + this.ChartType + "&TableName=" + this.TableName + "&LayerName=" + this.LayerName + "&RelatedField=" + this.RelatedField + "&BBOX=" + bbox + "&Width=" + this.Width + " &Height=" + this.Height + "&Transparency=" + this.Transparency + "&Fields=" + this.Fields + "&FillStyle=" + this.FillStyle + "&InsideDia=" + this.InsideDia + "&PieHeight=" + this.PieHeight + "&Colors=" + this.Colors + "&Ratio=" + this.Ratio + "&ThickPercent=" + this.ThickPercent + "&LengthPercent=" + this.LengthPercent + "&HighLightOffSet=" + this.HighLightOffSet + "&LineWidth=" + this.LineWidth + "&PieGradualClr=" + this.PieGradualClr + "&BorderColor=" + this.BorderColor + "&MaxDir=" + this.MaxDir + "&RotateAngleH=" + this.RotateAngleH + "&RotateAngleV=" + this.RotateAngleV + "&SQL=" + this.SQL + "&UnitDir=" + this.UnitDir + "&UnitDirValue=" + this.UnitDirValue
		}
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	setThematicParms: function(options) {
		if(this.ChartType == "PieChart") {
			if(options.RingCount) {
				this.RingCount = options.RingCount
			} else {
				this.RingCount = 1
			}
			if(options.OutDia) {
				this.OutDia = options.OutDia
			} else {
				this.OutDia = "40,0"
			}
			if(options.InsideDia) {
				this.InsideDia = options.InsideDia
			} else {
				this.InsideDia = "0,0"
			}
			if(options.PieHeight) {
				this.PieHeight = options.PieHeight
			} else {
				this.PieHeight = 40
			}
			if(options.Ratio) {
				this.Ratio = options.Ratio
			} else {
				this.Ratio = 0.6
			}
			if(options.ThickPercent) {
				this.ThickPercent = options.ThickPercent
			} else {
				this.ThickPercent = 0.2
			}
			if(options.LengthPercent) {
				this.LengthPercent = options.LengthPercent
			} else {
				this.LengthPercent = 1
			}
			if(options.HighLightOffSet) {
				this.HighLightOffSet = options.HighLightOffSet
			} else {
				this.HighLightOffSet = 0
			}
			if(options.PieGradualClr) {
				this.PieGradualClr = options.PieGradualClr
			} else {
				this.PieGradualClr = "RGB(0,255,0),RGB(255,0,0)"
			}
			if(options.BorderColor) {
				this.BorderColor = options.BorderColor
			} else {
				this.BorderColor = "RGB(255,0,0)"
			}
			if(options.PieCountInRing) {
				this.HighLightOffSet = options.PieCountInRing
			} else {
				this.PieCountInRing = 1
			}
			if(options.RotateAngleH) {
				this.RotateAngleH = options.RotateAngleH
			} else {
				this.RotateAngleH = 0
			}
			if(options.RotateAngleV) {
				this.RotateAngleV = options.RotateAngleV
			} else {
				this.RotateAngleV = 0
			}
			if(options.LineWidth) {
				this.LineWidth = options.LineWidth
			} else {
				this.LineWidth = 0
			}
		} else {
			if(this.ChartType == "BarChart") {
				if(options.BarShape) {
					this.BarShape = options.BarShape
				} else {
					this.BarShape = 0
				}
				if(options.BarLayoutShape) {
					this.BarLayoutShape = options.BarLayoutShape
				} else {
					this.BarLayoutShape = 1
				}
				if(options.BarDirection) {
					this.BarDirection = options.BarDirection
				} else {
					this.BarDirection = 1
				}
				if(options.BarWidth) {
					this.BarWidth = options.BarWidth
				} else {
					this.BarWidth = 20
				}
				if(options.BarThick) {
					this.BarThick = options.BarThick
				} else {
					this.BarThick = 20
				}
				if(options.BarOffSet) {
					this.BarOffSet = options.BarOffSet
				} else {
					this.BarOffSet = 5, 5
				}
				if(options.BarUnitValue) {
					this.BarUnitValue = options.BarUnitValue
				} else {
					this.BarUnitValue = 200
				}
				if(options.BarUnitHeight) {
					this.BarUnitHeight = options.BarUnitHeight
				} else {
					this.BarUnitHeight = 15
				}
				if(options.BarViewAngle) {
					this.BarViewAngle = options.BarViewAngle
				} else {
					this.BarViewAngle = 0
				}
				if(options.LineWidth) {
					this.LineWidth = options.LineWidth
				} else {
					this.LineWidth = 0
				}
				if(options.BorderColor) {
					this.BorderColor = options.BorderColor
				} else {
					this.BorderColor = "RGB(255,255,0)"
				}
				if(options.HighLightOffSet) {
					this.HighLightOffSet = options.HighLightOffSet
				} else {
					this.HighLightOffSet = 0
				}
				if(options.Colors2) {
					this.Colors2 = options.Colors2
				} else {
					this.Colors2 = "RGB(255,0,0),RGB(0,255,255)"
				}
				if(options.BarGradualMethod) {
					this.BarGradualMethod = options.BarGradualMethod
				} else {
					this.BarGradualMethod = 1
				}
				if(options.MaxHeight) {
					this.MaxHeight = options.MaxHeight
				} else {
					this.MaxHeight = 1000
				}
			} else {
				if(this.ChartType == "GridChart") {
					if(options.XGridCount) {
						this.XGridCount = options.XGridCount
					} else {
						this.XGridCount = 10
					}
					if(options.YGridCount) {
						this.YGridCount = options.YGridCount
					} else {
						this.YGridCount = 10
					}
					if(options.ValuePerGrid) {
						this.ValuePerGrid = options.ValuePerGrid
					} else {
						this.ValuePerGrid = 50
					}
					if(options.GridSize) {
						this.GridSize = options.GridSize
					} else {
						this.GridSize = 10, 10
					}
					if(options.RowGap) {
						this.RowGap = options.RowGap
					} else {
						this.RowGap = 10
					}
					if(options.ColGap) {
						this.ColGap = options.ColGap
					} else {
						this.ColGap = 10
					}
					if(options.PageGapH) {
						this.PageGapH = options.PageGapH
					} else {
						this.PageGapH = 10
					}
					if(options.PageGapV) {
						this.PageGapV = options.PageGapV
					} else {
						this.PageGapV = 10
					}
					if(options.GridThick) {
						this.GridThick = options.GridThick
					} else {
						this.GridThick = 10
					}
					if(options.Colors2) {
						this.Colors2 = options.Colors2
					} else {
						this.Colors2 = "RGB(255,0,0),RGB(0,255,255)"
					}
					if(options.GridGradualMethod) {
						this.GridGradualMethod = options.GridGradualMethod
					} else {
						this.GridGradualMethod = 1
					}
				} else {
					if(this.ChartType == "RangeChart") {
						if(options.NameField) {
							this.NameField = options.NameField
						} else {
							this.NameField = null
						}
						if(options.Levels) {
							this.Levels = options.Levels
						} else {
							this.Levels = null
						}
					} else {
						if(this.ChartType == "UniqueChart") {
							if(options.NameField) {
								this.NameField = options.NameField
							} else {
								this.NameField = null
							}
						} else {
							if(this.ChartType == "GradualSymbol") {
								if(options.PieHeight) {
									this.PieHeight = options.PieHeight
								} else {
									this.PieHeight = 40
								}
								if(options.Ratio) {
									this.Ratio = options.Ratio
								} else {
									this.Ratio = 0.6
								}
								if(options.ThickPercent) {
									this.ThickPercent = options.ThickPercent
								} else {
									this.ThickPercent = 0.2
								}
								if(options.LengthPercent) {
									this.LengthPercent = options.LengthPercent
								} else {
									this.LengthPercent = 1
								}
								if(options.HighLightOffSet) {
									this.HighLightOffSet = options.HighLightOffSet
								} else {
									this.HighLightOffSet = 0
								}
								if(options.PieGradualClr) {
									this.PieGradualClr = options.PieGradualClr
								} else {
									this.PieGradualClr = "RGB(0,255,0),RGB(255,0,0)"
								}
								if(options.BorderColor) {
									this.BorderColor = options.BorderColor
								} else {
									this.BorderColor = "RGB(255,0,0)"
								}
								if(options.RotateAngleH) {
									this.RotateAngleH = options.RotateAngleH
								} else {
									this.RotateAngleH = 0
								}
								if(options.RotateAngleV) {
									this.RotateAngleV = options.RotateAngleV
								} else {
									this.RotateAngleV = 0
								}
								if(options.LineWidth) {
									this.LineWidth = options.LineWidth
								} else {
									this.LineWidth = 0
								}
								if(options.MaxDir) {
									this.MaxDir = options.MaxDir
								} else {
									this.MaxDir = 80
								}
								if(options.UnitDir) {
									this.UnitDir = options.UnitDir
								} else {
									this.UnitDir = 10
								}
								if(options.UnitDirValue) {
									this.UnitDirValue = options.UnitDirValue
								} else {
									this.UnitDirValue = 100
								}
							}
						}
					}
				}
			}
		}
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	setCompatibleParm: function(options) {
		if(options.mapConvertScale) {
			this.mapConvertScale = options.mapConvertScale;
			_convert_scale = this.mapConvertScale;
			EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
		} else {
			this.mapConvertScale = 114699;
			_convert_scale = 114699;
			EzServerClient.GlobeParams.MapConvertScale = 114699
		}
		if(options.mapConvertOffsetX) {
			this.mapConvertOffsetX = options.mapConvertOffsetX;
			_convert_ofsx = this.mapConvertOffsetX;
			EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
		}
		if(options.mapConvertOffsetY) {
			this.mapConvertOffsetY = options.mapConvertOffsetY;
			_convert_ofsy = this.mapConvertOffsetY;
			EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
		}
		if(options.mapCoordinateType) {
			this.mapCoordinateType = options.mapCoordinateType;
			_MapSpanScale = this.mapCoordinateType;
			EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
		} else {
			this.mapCoordinateType = 1;
			_MapSpanScale = 1;
			EzServerClient.GlobeParams.MapCoordinateType = 1
		}
		if(options.zoomLevelSequence) {
			this.zoomLevelSequence = options.zoomLevelSequence;
			EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
		} else {
			EzServerClient.GlobeParams.ZoomLevelSequence = 2
		}
	},
	CLASS_NAME: "EzServerClient.Layer.EzThematicTileLayer"
});
EzServerClient.Layer.EzThematicHotSpotTilelayer = EzServerClient.Class(EzServerClient.Layer.HotSpotTileLayer, {
	maxZoomLevel: 24,
	version: 0.3,
	initResolution: 2,
	eventName: "",
	callback: null,
	isDisplayProfile: false,
	hotspot2d: false,
	levelLimit: [],
	hotspotIconUrl: "",
	initialize: function(name, isDisplayProfile, eventName, callback, url, options) {
		if(!options) {
			options = {}
		}
		this.eventName = eventName;
		this.callback = callback;
		this.isDisplayProfile = isDisplayProfile;
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.origin = options.originAnchor || [-180, 90];
		tileInfo.width = options.tileWidth || 256;
		tileInfo.height = options.tileHeight || 256;
		if(options.flatMatrix) {
			tileInfo.flatMatrix = options.flatMatrix
		} else {
			tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
		}
		this.hotspot2d = options.hotspot2d || false;
		this.levelLimit = options.levelLimit || [];
		this.hotspotIconUrl = options.hotspotIconUrl || "";
		this.filter = options.filter || null;
		this.label = options.label || "";
		this.HotspotStyle = options.HotspotStyle || null;
		this.tileCrs = options.tileCrs || "leftop";
		this.initResolution = options.initResolution || 1.40625;
		this.ChartType = options.CharType || "PieChart";
		this.TableName = options.TableName || null;
		this.LayerName = options.LayerName || null;
		this.RelatedField = options.RelatedField || null;
		this.BBOX = options.BBOX || "-180,-90,180,90";
		this.Width = options.Width || 256;
		this.Height = options.Height || 256;
		this.Fields = options.Fields || null;
		this.NameField = options.NameField || null;
		this.SQL = options.SQL || "1=1";
		this.setThematicParms(options);
		_MapUnitPixels = tileInfo.width;
		EzServerClient.GlobeParams.MapUnitPixels = tileInfo.width;
		this.setCompatibleParm(options);
		if(this.mapCoordinateType != 1) {
			this.initResolution = this.initResolution * this.mapConvertScale
		}
		var UPP = this.initResolution;
		var scale = 786432000;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, UPP, scale));
			UPP /= 2;
			scale /= 2
		}
		EzServerClient.Layer.HotSpotTileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		if(this.tileCrs == "center") {
			col = topLeftTile.x + col;
			row = topLeftTile.y - row - 1
		} else {
			if(topLeftTile != null) {
				col = topLeftTile.x + col;
				row = row - topLeftTile.y
			}
		}
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var zoom = level + zoomOffset;
		var tpz, mrz, bbox;
		if(this.tileCrs == "center") {
			tpz = new EzServerClient.TilePositionZ(col, row, level);
			mrz = this.toMapCoords(tpz);
			bbox = mrz.toString()
		} else {
			tpz = new EzServerClient.TilePositionZ(col, row, level);
			mrz = this.toMapCoordsY(tpz);
			bbox = mrz.toString()
		}
		var srcUrl = null;
		if(this.ChartType == "PieChart") {
			srcUrl = serverUrl + "?Request=GetHotSpot&ChartType=PieChart&TableName=" + this.TableName + "&LayerName=" + this.LayerName + "&RelatedField=" + this.RelatedField + "&BBOX=" + bbox + "&Width=" + this.Width + "&Height=" + this.Height + "&Fields=" + this.Fields + "&RingCount=" + this.RingCount + "&OutDia=" + this.OutDia + "&InsideDia=" + this.InsideDia + "&PieHeight=" + this.PieHeight + "&Ratio=" + this.Ratio + "&ThickPercent=" + this.ThickPercent + "&LengthPercent=" + this.LengthPercent + "&NameField=" + this.NameField + "&PieCountInRing=" + this.PieCountInRing + "&RotateAngleH=" + this.RotateAngleH + "&RotateAngleV=" + this.RotateAngleV + "&SQL=" + this.SQL
		}
		if(this.ChartType == "BarChart") {
			srcUrl = serverUrl + "?Request=GetHotSpot&ChartType=BarChart&TableName=" + this.TableName + "&LayerName=" + this.LayerName + "&RelatedField=" + this.RelatedField + "&BBOX=" + bbox + "&Width=" + this.Width + " &Height=" + this.Height + "&Transparency=" + this.Transparency + "&Fields=" + this.Fields + "&NameField=" + this.NameField + "&BarShape=" + this.BarShape + "&BarLayoutShape=" + this.BarLayoutShape + "&BarDirection=" + this.BarDirection + "&BarWidth=" + this.BarWidth + "&BarThick=" + this.BarThick + "&BarOffSet=" + this.BarOffSet + "&BarUnitValue=" + this.BarUnitValue + "&BarUnitHeight=" + this.BarUnitHeight + "&BarViewAngle=" + this.BarViewAngle + "&SQL=" + this.SQL + "&MaxHeight=" + this.MaxHeight
		}
		if(this.ChartType == "GridChart") {
			srcUrl = serverUrl + "?Request=GetHotSpot &ChartType=GridChart&TableName=" + this.TableName + "&LayerName=" + this.LayerName + "&RelatedField=" + this.RelatedField + "&BBOX=" + bbox + "&Width=" + this.Width + " &Height=" + this.Height + "&Transparency=" + this.Transparency + "&Fields=" + this.Fields + "&NameField=" + this.NameField + "&XGridCount=" + this.XGridCount + "&YGridCount=" + this.YGridCount + "&ValuePerGrid=" + this.ValuePerGrid + "&GridSize=" + this.GridSize + "&RowGap=" + this.RowGap + "&ColGap=" + this.ColGap + "&PageGapH=" + this.PageGapH + "&PageGapV=" + this.PageGapV + "&GridTick=" + this.GridTick + "&SQL=" + this.SQL
		}
		if(this.ChartType == "RangeChart") {
			srcUrl = serverUrl + "?Request=GetHotSpot &ChartType=" + this.ChartType + "&TableName=" + this.TableName + "&LayerName=" + this.LayerName + "&RelatedField=" + this.RelatedField + "&BBOX=" + bbox + "&Width=" + this.Width + " &Height=" + this.Height + "&Transparency=" + this.Transparency + "&Fields=" + this.Fields + "&NameField=" + this.NameField + "&SQL=" + this.SQL
		}
		if(this.ChartType == "UniqueChart") {
			srcUrl = serverUrl + "?Request=GetHotSpot &ChartType=" + this.ChartType + "&TableName=" + this.TableName + "&LayerName=" + this.LayerName + "&RelatedField=" + this.RelatedField + "&BBOX=" + bbox + "&Width=" + this.Width + " &Height=" + this.Height + "&Transparency=" + this.Transparency + "&Fields=" + this.Fields + "&NameField=" + this.NameField + "&SQL=" + this.SQL
		}
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	setThematicParms: function(options) {
		if(this.ChartType == "PieChart") {
			if(options.RingCount) {
				this.RingCount = options.RingCount
			} else {
				this.RingCount = 1
			}
			if(options.OutDia) {
				this.OutDia = options.OutDia
			} else {
				this.OutDia = "40,0"
			}
			if(options.InsideDia) {
				this.InsideDia = options.InsideDia
			} else {
				this.InsideDia = "0,0"
			}
			if(options.PieHeight) {
				this.PieHeight = options.PieHeight
			} else {
				this.PieHeight = 40
			}
			if(options.Ratio) {
				this.Ratio = options.Ratio
			} else {
				this.Ratio = 0.6
			}
			if(options.ThickPercent) {
				this.ThickPercent = options.ThickPercent
			} else {
				this.ThickPercent = 0.2
			}
			if(options.LengthPercent) {
				this.LengthPercent = options.LengthPercent
			} else {
				this.LengthPercent = 1
			}
			if(options.PieCountInRing) {
				this.HighLightOffSet = options.PieCountInRing
			} else {
				this.PieCountInRing = 1
			}
			if(options.RotateAngleH) {
				this.RotateAngleH = options.RotateAngleH
			} else {
				this.RotateAngleH = 0
			}
			if(options.RotateAngleV) {
				this.RotateAngleV = options.RotateAngleV
			} else {
				this.RotateAngleV = 0
			}
		} else {
			if(this.ChartType == "BarChart") {
				if(options.BarShape) {
					this.BarShape = options.BarShape
				} else {
					this.BarShape = 0
				}
				if(options.BarLayoutShape) {
					this.BarLayoutShape = options.BarLayoutShape
				} else {
					this.BarLayoutShape = 1
				}
				if(options.BarDirection) {
					this.BarDirection = options.BarDirection
				} else {
					this.BarDirection = 1
				}
				if(options.BarWidth) {
					this.BarWidth = options.BarWidth
				} else {
					this.BarWidth = 20
				}
				if(options.BarThick) {
					this.BarThick = options.BarThick
				} else {
					this.BarThick = 20
				}
				if(options.BarOffSet) {
					this.BarOffSet = options.BarOffSet
				} else {
					this.BarOffSet = 5, 5
				}
				if(options.BarUnitValue) {
					this.BarUnitValue = options.BarUnitValue
				} else {
					this.BarUnitValue = 200
				}
				if(options.BarUnitHeight) {
					this.BarUnitHeight = options.BarUnitHeight
				} else {
					this.BarUnitHeight = 15
				}
				if(options.BarViewAngle) {
					this.BarViewAngle = options.BarViewAngle
				} else {
					this.BarViewAngle = 0
				}
				if(options.MaxHeight) {
					this.MaxHeight = options.MaxHeight
				} else {
					this.MaxHeight = 1000
				}
			} else {
				if(this.ChartType == "GridChart") {
					if(options.XGridCount) {
						this.XGridCount = options.XGridCount
					} else {
						this.XGridCount = 10
					}
					if(options.YGridCount) {
						this.YGridCount = options.YGridCount
					} else {
						this.YGridCount = 10
					}
					if(options.ValuePerGrid) {
						this.ValuePerGrid = options.ValuePerGrid
					} else {
						this.ValuePerGrid = 50
					}
					if(options.GridSize) {
						this.GridSize = options.GridSize
					} else {
						this.GridSize = 10, 10
					}
					if(options.RowGap) {
						this.RowGap = options.RowGap
					} else {
						this.RowGap = 10
					}
					if(options.ColGap) {
						this.ColGap = options.ColGap
					} else {
						this.ColGap = 10
					}
					if(options.PageGapH) {
						this.PageGapH = options.PageGapH
					} else {
						this.PageGapH = 10
					}
					if(options.PageGapV) {
						this.PageGapV = options.PageGapV
					} else {
						this.PageGapV = 10
					}
					if(options.GridThick) {
						this.GridThick = options.GridThick
					} else {
						this.GridThick = 10
					}
				} else {
					if(this.ChartType == "RangeChart") {} else {
						if(this.ChartType == "UniqueChart") {}
					}
				}
			}
		}
	},
	setCompatibleParm: function(options) {
		if(options.mapConvertScale) {
			this.mapConvertScale = options.mapConvertScale;
			_convert_scale = this.mapConvertScale;
			EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
		} else {
			this.mapConvertScale = 114699;
			_convert_scale = 114699;
			EzServerClient.GlobeParams.MapConvertScale = 114699
		}
		if(options.mapConvertOffsetX) {
			this.mapConvertOffsetX = options.mapConvertOffsetX;
			_convert_ofsx = this.mapConvertOffsetX;
			EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
		}
		if(options.mapConvertOffsetY) {
			this.mapConvertOffsetY = options.mapConvertOffsetY;
			_convert_ofsy = this.mapConvertOffsetY;
			EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
		}
		if(options.mapCoordinateType) {
			this.mapCoordinateType = options.mapCoordinateType;
			_MapSpanScale = this.mapCoordinateType;
			EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
		} else {
			this.mapCoordinateType = 1;
			_MapSpanScale = 1;
			EzServerClient.GlobeParams.MapCoordinateType = 1
		}
		if(options.zoomLevelSequence) {
			this.zoomLevelSequence = options.zoomLevelSequence;
			EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
		} else {
			EzServerClient.GlobeParams.ZoomLevelSequence = 2
		}
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	CLASS_NAME: "EzServerClient.Layer.EzThematicHotSpotTilelayer"
});
EzServerClient.Layer.IndoorMapTileLayer = EzServerClient.Class(EzServerClient.Layer.TileLayer, {
	maxZoomLevel: 24,
	version: 0.3,
	initResolution: 2,
	levelLimit: [],
	buildFloorLevel: 1,
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		this.source = options.source || "EzMap";
		this.initResolution = options.initResolution || 2;
		this.buildFloorLevel = options.buildFloorLevel || 1;
		this.opacity = options.opacity || 100;
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.origin = options.originAnchor || [0, 0];
		tileInfo.width = options.tileWidth || 256;
		tileInfo.height = options.tileHeight || 256;
		this.levelLimit = options.levelLimit || [];
		_MapUnitPixels = tileInfo.width;
		EzServerClient.GlobeParams.MapUnitPixels = tileInfo.width;
		this.setCompatibleParm(options);
		if(this.mapCoordinateType != 1) {
			this.initResolution = this.initResolution * this.mapConvertScale
		}
		var UPP = this.initResolution;
		var scale = 786432000;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, UPP, scale));
			UPP /= 2;
			scale /= 2
		}
		if(options.flatMatrix) {
			tileInfo.flatMatrix = options.flatMatrix
		} else {
			tileInfo.flatMatrix = [1, 0, 0, 0, 1, 0]
		}
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	setCompatibleParm: function(options) {
		if(options.mapConvertScale) {
			this.mapConvertScale = options.mapConvertScale;
			_convert_scale = this.mapConvertScale;
			EzServerClient.GlobeParams.MapConvertScale = this.mapConvertScale
		} else {
			this.mapConvertScale = 114699;
			_convert_scale = 114699;
			EzServerClient.GlobeParams.MapConvertScale = 114699
		}
		if(options.mapConvertOffsetX) {
			this.mapConvertOffsetX = options.mapConvertOffsetX;
			_convert_ofsx = this.mapConvertOffsetX;
			EzServerClient.GlobeParams.MapConvertOffsetX = this.mapConvertOffsetX
		}
		if(options.mapConvertOffsetY) {
			this.mapConvertOffsetY = options.mapConvertOffsetY;
			_convert_ofsy = this.mapConvertOffsetY;
			EzServerClient.GlobeParams.MapConvertOffsetY = this.mapConvertOffsetY
		}
		if(options.mapCoordinateType) {
			this.mapCoordinateType = options.mapCoordinateType;
			_MapSpanScale = this.mapCoordinateType;
			EzServerClient.GlobeParams.MapCoordinateType = this.mapCoordinateType
		} else {
			this.mapCoordinateType = 1;
			_MapSpanScale = 1;
			EzServerClient.GlobeParams.MapCoordinateType = 1
		}
		if(options.zoomLevelSequence) {
			this.zoomLevelSequence = options.zoomLevelSequence;
			EzServerClient.GlobeParams.ZoomLevelSequence = this.zoomLevelSequence
		} else {
			EzServerClient.GlobeParams.ZoomLevelSequence = 2
		}
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset, buildFloorLevel) {
		if(topLeftTile == null) {
			var col = col;
			var row = row
		} else {
			var col = topLeftTile.x + col;
			var row = topLeftTile.y - row - 1
		}
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&BuildFloorLevel=" + buildFloorLevel + "&V=" + this.version;
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	CLASS_NAME: "EzServerClient.Layer.TileLayer.IndoorMapTileLayer"
});
EzServerClient.Layer.IndoorMapHotSpotTileLayer = EzServerClient.Class(EzServerClient.Layer.HotSpotTileLayer2010, {
	buildFloorLevel: 1,
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset, buildFloorLevel) {
		var col = topLeftTile.x + col;
		var row = topLeftTile.y - row - 1;
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		var zoom = level + zoomOffset;
		var zoom1 = zoom;
		if(this.zoomLevelSequence == 2) {
			zoom1 = 18 - zoom
		}
		var tpz = new EzServerClient.TilePositionZ(col, row, zoom);
		var mrz = this.toMapCoords(tpz);
		var coords = [mrz.minx, mrz.miny, mrz.maxx, mrz.miny, mrz.maxx, mrz.maxy, mrz.minx, mrz.maxy].join(",");
		var srcUrl = serverUrl + "/EzMap?Service=getInDoorHotSpot&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&Level=" + buildFloorLevel;
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl + "&timestamp=" + new Date().getTime().valueOf()
	},
	loadHotTile: function(oLi, oMap, oLayer, oHotspot) {
		var hotspotlen = 0;
		var indoorHotdata = [];
		if(oHotspot != null) {
			for(var num = 0; num < oHotspot.length; num++) {
				if(typeof(oHotspot[num].BUILDID) != "undefined") {
					if(oMap.filterId == oHotspot[num].BUILDID) {
						indoorHotdata.push(oHotspot[num])
					}
				}
			}
			oHotspot = indoorHotdata;
			hotspotlen = oHotspot.length
		} else {
			return
		}
		var childlen = oLi.childNodes.length;
		if(childlen > hotspotlen) {
			for(var i = hotspotlen; i < oLi.childNodes.length; i++) {
				oLi.removeChild(oLi.childNodes[i])
			}
		} else {
			for(var i = childlen; i < hotspotlen; i++) {
				var temp = document.createElement("area");
				temp.shape = "poly";
				temp.coords = "";
				temp.id = oHotspot[i].ID;
				oLi.appendChild(temp)
			}
		}
		for(var i = 0, mm = 0; i < hotspotlen; i++, mm++) {
			var area = oLayer.hotspot2d ? oLi.childNodes[mm] : oLayer.setAreaPorp(oLayer, oLayer.eventName, oLayer.callback, oHotspot[i], oMap, oLi.childNodes[mm]);
			if(typeof(area) == "undefined") {
				continue
			}
			area._p = oHotspot[i].GEOMETRY;
			area.coords = "";
			if(!area._p) {
				continue
			}
			var labelStr = oLayer.label;
			if(labelStr) {
				labelStr = labelStr.toUpperCase();
				var labels = [labelStr];
				var altStr = "";
				if(labelStr.indexOf(",") > 0) {
					labels = labelStr.split(",")
				}
				for(var k = 0, j = labels.length; k < j; k++) {
					altStr += oHotspot[i][labels[k]]
				}
				if(altStr != "") {
					area.alt = altStr
				}
			}
			area._center = oHotspot[i].X + "," + oHotspot[i].Y;
			if(oLayer.hotspot2d) {
				area._bound = oHotspot[i].BOUND ? oHotspot[i].BOUND : "";
				area._iconUrl = oLayer.hotspotIconUrl ? oLayer.hotspotIconUrl : EzServerClient.GlobeParams.EzServerClientURL + "/images/hotspot/hotspot.png";
				area._hotspot = oHotspot[i]
			}
			__EzRefreshAreaHandler(area, oMap, oMap.groupTileImages[0][0][0].offsetLeft, oMap.groupTileImages[0][0][0].offsetTop)
		}
		delete oHotspot;
		oHotspot = null
	},
	CLASS_NAME: "EzServerClient.Layer.IndoorMapHotSpotTileLayer"
});
EzServerClient.Layer.CustomTileLayer = EzServerClient.Class(EzServerClient.Layer.LonlatTileLayer, {
	maxZoomLevel: 22,
	version: "1.0.0",
	origin: [-180, 90],
	width: 256,
	height: 256,
	initResolution: 1.40625,
	levelLimit: [],
	yaxis: "pgis",
	initialize: function(name, url, options) {
		if(!options) {
			options = {}
		}
		this.initResolution = options.initResolution || 1.40625;
		this.origin = options.originAnchor || [-180, 90];
		this.levelLimit = options.levelLimit || [];
		this.yaxis = options.yaxis || "pgis";
		this.maxZoomLevel = options.maxZoomLevel || 22;
		this.opacity = options.opacity || 100;
		this.layer = options.layer || null;
		this.style = options.style || null;
		this.format = options.format || "image/png";
		this.TileMatrixSet = options.tileMatrixSet || null;
		this.TileMatrix = options.tileMatrix || null;
		this.source = options.source || "wmts";
		this.otherUrl = options.url || "null";
		var tileInfo = new EzServerClient.Tile.TileInfo();
		tileInfo.width = this.width;
		tileInfo.height = this.height;
		tileInfo.origin = this.origin;
		var res = this.initResolution;
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			tileInfo.levelDetails.push(new EzServerClient.Tile.LevelDetail(i, res));
			res /= 2
		}
		EzServerClient.GlobeParams.ZoomLevelSequence = 2;
		EzServerClient.Layer.TileLayer.prototype.initialize.apply(this, [name, url, tileInfo])
	},
	formatString: function(tag, str, level) {
		var newStr = null;
		if(str != null) {
			var ResultStr = "";
			var Temp = str.split(" ");
			for(i = 0; i < Temp.length; i++) {
				ResultStr += Temp[i]
			}
			newStr = ResultStr.replace(tag, level)
		}
		return newStr
	},
	formatTo: function(str, len) {
		var i = str.length;
		if(i >= 8) {
			str = str.substring(i - len, i)
		} else {
			var str0 = "";
			for(var n = 0; n < len; n++) {
				str0 += "0"
			}
			str = str0.substring(0, str0.length - i) + str
		}
		return str
	},
	getTileUrl: function(topLeftTile, col, row, level, zoomOffset) {
		var col, row, zoom, srcUrl;
		zoom = level + zoomOffset;
		if(this.yaxis == "pgis") {
			col = topLeftTile.x + col;
			row = topLeftTile.y - row - 1
		} else {
			col = topLeftTile.x + col;
			row = row - topLeftTile.y
		}
		var urlArr = this.url.split(",");
		var index = (col + row) % urlArr.length;
		var serverUrl = urlArr[index];
		if(this.source == "EzServer") {
			srcUrl = serverUrl + "/EzMap?Service=getImage&Type=RGB&ZoomOffset=" + zoomOffset + "&Col=" + col + "&Row=" + row + "&Zoom=" + level + "&V=" + this.version
		} else {
			if(this.source == "WMTS") {
				var TileMatrix = this.formatString("%d", this.TileMatrix, zoom);
				srcUrl = serverUrl + "?SERVICE=WMTS&REQUEST=GetTile&version=1.0.0&layer=" + this.layer + "&style=" + this.style + "&format=" + this.format + "&TileMatrixSet=" + this.TileMatrixSet + "&TileMatrix=" + TileMatrix + "&TileRow=" + row + "&TileCol=" + col
			} else {
				if(this.source == "ArcgisServer") {
					srcUrl = serverUrl + "/tile/" + zoom + "/" + row + "/" + col
				} else {
					if(this.source == "ArcgisCache") {
						srcUrl = serverUrl + "/L" + this.formatTo(level.toString(), 2) + "/R" + this.formatTo(row.toString(16), 8) + "/C" + this.formatTo(col.toString(16), 8) + ".png"
					} else {
						if(this.otherUrl != null) {
							srcUrl = this.otherUrl;
							srcUrl = this.formatString("[serverUrl]", srcUrl, serverUrl);
							srcUrl = this.formatString("[col]", srcUrl, col);
							srcUrl = this.formatString("[row]", srcUrl, row);
							srcUrl = this.formatString("[zoom]", srcUrl, zoom)
						}
					}
				}
			}
		}
		if(this.proxyUrl) {
			srcUrl = this.proxyUrl + "?request=gotourl&url=" + encodeURIComponent(srcUrl)
		}
		return srcUrl
	},
	setOffset: function(value) {
		var scale = Math.pow(2, value);
		for(var i = 0; i <= this.maxZoomLevel; i++) {
			this.tileInfo.levelDetails[i].resolution /= scale;
			this.tileInfo.levelDetails[i].scale /= scale
		}
	},
	CLASS_NAME: "EzServerClient.Layer.CustomTileLayer"
});
if(typeof EzServerClient.TMSXmlParse == "undefined" || EzServerClient.TMSXmlParse) {
	EzServerClient.TMSXmlParse = {}
}
EzServerClient.TMSXmlParse.E_Element = function() {};
if(typeof EzServerClient.TMSXmlParse.EzXmlDomUtil == "undefined" || EzServerClient.TMSXmlParse.EzXmlDomUtil) {
	EzServerClient.TMSXmlParse.EzXmlDomUtil = {}
}
EzServerClient.TMSXmlParse.EzXmlDomUtil.addChildElement = function(vElem, vChild) {
	if(vChild == null) {
		return
	} else {
		vElem.appendChild(vChild.toElement(vElem.ownerDocument))
	}
};
EzServerClient.TMSXmlParse.EzXmlDomUtil.createElement = function(vDoc, vElemName) {
	return vDoc.createElement(vElemName)
};
EzServerClient.TMSXmlParse.EzXmlDomUtil.createElementNS = function(vDoc, vElemName) {
	var vdoc1 = vDoc.createElement(vElemName);
	return vdoc1
};
EzServerClient.TMSXmlParse.EzXmlDomUtil.equal = function(vStr1, vStr2, vConsiderCase) {
	if(vStr1 == null && vStr2 == null) {
		return true
	}
	if(vStr1 != null && vStr2 != null) {
		if(vConsiderCase) {
			if(vStr1.compareTo(vStr2) == 0) {
				return true
			}
		} else {
			if(vStr1.compareToIgnoreCase(vStr2) == 0) {
				return true
			}
		}
	}
	return false
};
EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute = function(vElem, vAttrName) {
	if(vElem.nodeName == "#comment") {
		return null
	}
	var tmpValue = vElem.getAttribute(vAttrName);
	return tmpValue
};
EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElement = function(vElem, vTagName) {
	if(vElem.nodeName == "#comment") {
		return null
	}
	var tmpList = vElem.getElementsByTagName(vTagName);
	if(tmpList.length == 0) {
		return null
	} else {
		for(var i = 0; i < tmpList.length; i++) {
			var tmpElem = tmpList.item(i);
			if(tmpElem.parentNode.nodeName == vElem.nodeName) {
				return tmpElem
			}
		}
		return null
	}
};
EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElements = function(vElem, vTag) {
	this.tmpList = vElem.getElementsByTagName(vTag);
	if(tmpList.length == 0) {
		return new Array()
	} else {
		var tmpElemList = new Array[tmpList.length];
		for(var i = 0; i < tmpElemList.length; i++) {
			tmpElemList[i] = tmpList.item(i)
		}
		return tmpElemList
	}
};
EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElements = function(vElem) {
	var tmpList = vElem.childNodes;
	if(tmpList.length == 0) {
		return new Array()
	} else {
		var tmpElemList = new Array();
		for(var i = 0; i < tmpList.length; i++) {
			var nd = tmpList.item(i);
			if(typeof(nd) == "object") {
				tmpElemList.push(nd)
			}
		}
		return tmpElemList.slice(0)
	}
};
EzServerClient.TMSXmlParse.EzXmlDomUtil.getContext = function(vElem) {
	var tmpBuffer = new Array();
	var tmpNodeList = vElem.childNodes;
	for(var i = 0; i < tmpNodeList.length; i++) {
		var tmpNode = tmpNodeList.item(i);
		if(typeof(tmpNode) == "object") {
			tmpBuffer.push(tmpNode.nodeValue)
		}
	}
	return tmpBuffer.toString()
};
EzServerClient.TMSXmlParse.EzXmlDomUtil.getEzXMLNamespace = function() {
	return "http://tiledmapservice.easymap.com"
};
EzServerClient.TMSXmlParse.EzXmlDomUtil.setAttribute = function(vElem, vAttrName, vAttrValue) {
	if(vAttrValue == null) {} else {
		vElem.setAttribute(vAttrName, vAttrValue)
	}
};
EzServerClient.TMSXmlParse.EzXmlDomUtil.setContext = function(vElem, vContext) {
	if(vContext != null) {
		var tmpText = vElem.ownerDocument.createTextNode(vContext);
		var tmpNodeList = vElem.childNodes;
		for(var i = tmpNodeList.length - 1; i >= 0; i--) {
			var tmpNode = tmpNodeList.item(i);
			if(tmpNode instanceof String) {
				vElem.removeChild(tmpNode)
			}
		}
		vElem.insertBefore(tmpText, vElem.firstChild)
	}
};
if(typeof EzServerClient.TMSXmlParse.EzXmlTypeUtil == "undefined" || EzServerClient.TMSXmlParse.EzXmlTypeUtil) {
	EzServerClient.TMSXmlParse.EzXmlTypeUtil = {}
}
EzServerClient.TMSXmlParse.EzXmlTypeUtil.toBooleanValue = function(vValue, vDefaultValue) {
	var tmpValue = EzServerClient.TMSXmlParse.string_trim(this.toStringValue(vValue, ""));
	if(arguments.length == 1) {
		if(tmpValue.length == 0) {
			return false
		} else {
			try {
				if(tmpValue && tmpValue == "true") {
					return true
				} else {
					return false
				}
			} catch(e) {
				return false
			}
		}
	} else {
		if(arguments.length == 2) {
			if(tmpValue.length == 0) {
				return vDefaultValue
			} else {
				try {
					if(tmpValue && tmpValue == "true") {
						return true
					} else {
						return false
					}
				} catch(e) {
					return vDefaultValue
				}
			}
		}
	}
};
EzServerClient.TMSXmlParse.EzXmlTypeUtil.toDoubleValue = function(vValue, vDefaultValue) {
	var tmpValue = EzServerClient.TMSXmlParse.string_trim(this.toStringValue(vValue, ""));
	if(arguments.length == 1) {
		if(tmpValue.length == 0) {
			return Number.NaN
		} else {
			try {
				return parseFloat(tmpValue)
			} catch(e) {
				return Number.NaN
			}
		}
	} else {
		if(arguments.length == 2) {
			if(tmpValue.length == 0) {
				return vDefaultValue
			} else {
				try {
					return parseFloat(tmpValue)
				} catch(e) {
					return vDefaultValue
				}
			}
		}
	}
};
EzServerClient.TMSXmlParse.EzXmlTypeUtil.toIntegerValue = function(vValue, vDefaultValue) {
	var tmpValue = EzServerClient.TMSXmlParse.string_trim(this.toStringValue(vValue, ""));
	if(arguments.length == 1) {
		if(tmpValue.length == 0) {
			return 0
		} else {
			try {
				return parseInt(tmpValue)
			} catch(e) {
				return 0
			}
		}
	} else {
		if(arguments.length == 2) {
			if(tmpValue.length == 0) {
				return vDefaultValue
			} else {
				try {
					return parseInt(tmpValue)
				} catch(e) {
					return vDefaultValue
				}
			}
		}
	}
};
EzServerClient.TMSXmlParse.EzXmlTypeUtil.toLongValue = function(vValue, vDefaultValue) {
	var tmpValue = EzServerClient.TMSXmlParse.string_trim(this.toStringValue(vValue, ""));
	if(arguments.length == 1) {
		if(tmpValue.length == 0) {
			return 0
		} else {
			try {
				return parseInt(tmpValue)
			} catch(e) {
				return 0
			}
		}
	} else {
		if(arguments.length == 2) {
			if(tmpValue.length == 0) {
				return vDefaultValue
			} else {
				try {
					return parseInt(tmpValue)
				} catch(e) {
					return vDefaultValue
				}
			}
		}
	}
};
EzServerClient.TMSXmlParse.EzXmlTypeUtil.toStringValue = function(vObj, vNullString) {
	if(arguments.length == 1) {
		if(vObj == null) {
			return ""
		} else {
			return vObj.toString()
		}
	} else {
		if(arguments.length == 2) {
			if(vObj == null) {
				return vNullString
			} else {
				return vObj.toString()
			}
		}
	}
};
EzServerClient.TMSXmlParse.string_trim = function(string) {
	var a = string;
	if(a == null) {
		return null
	} else {
		a = a.replace(/^(\s)*/, "");
		a = a.replace(/(\s)*$/, "");
		return a
	}
};
EzServerClient.TMSXmlParse.E_Collection = function() {};
EzServerClient.TMSXmlParse.E_Collection.prototype.add = function() {};
EzServerClient.TMSXmlParse.E_Collection.prototype.clear = function() {};
EzServerClient.TMSXmlParse.E_Collection.prototype.get = function(index) {};
EzServerClient.TMSXmlParse.E_Collection.prototype.isEmpty = function() {};
EzServerClient.TMSXmlParse.E_Collection.prototype.remove = function() {};
EzServerClient.TMSXmlParse.E_Collection.prototype.size = function() {};
EzServerClient.TMSXmlParse.E_TiledBoundingBox = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.minx = null;
	this.miny = null;
	this.maxx = null;
	this.maxy = null
};
EzServerClient.TMSXmlParse.E_TiledBoundingBox.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledBoundingBox.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	this.setMinx(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "minx"));
	this.setMiny(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "miny"));
	this.setMaxx(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "maxx"));
	this.setMaxy(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "maxy"));
	return this
};
EzServerClient.TMSXmlParse.E_TiledBoundingBox.prototype.getElementName = function() {
	return "TiledBoundingBox"
};
EzServerClient.TMSXmlParse.E_TiledBoundingBox.prototype.getMinx = function() {
	return this.minx
};
EzServerClient.TMSXmlParse.E_TiledBoundingBox.prototype.setMinx = function(minx) {
	this.minx = minx
};
EzServerClient.TMSXmlParse.E_TiledBoundingBox.prototype.getMiny = function() {
	return this.miny
};
EzServerClient.TMSXmlParse.E_TiledBoundingBox.prototype.setMiny = function(miny) {
	this.miny = miny
};
EzServerClient.TMSXmlParse.E_TiledBoundingBox.prototype.getMaxx = function() {
	return this.maxx
};
EzServerClient.TMSXmlParse.E_TiledBoundingBox.prototype.setMaxx = function(maxx) {
	this.maxx = maxx
};
EzServerClient.TMSXmlParse.E_TiledBoundingBox.prototype.getMaxy = function() {
	return this.maxy
};
EzServerClient.TMSXmlParse.E_TiledBoundingBox.prototype.setMaxy = function(maxy) {
	this.maxy = maxy
};
EzServerClient.TMSXmlParse.E_TiledFormat = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.width = null;
	this.height = null;
	this.mimeType = null;
	this.extension = null
};
EzServerClient.TMSXmlParse.E_TiledFormat.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledFormat.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	this.setWidth(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "width"));
	this.setHeight(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "height"));
	this.setMimeType(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "mime-type"));
	this.setExtension(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "extension"));
	return this
};
EzServerClient.TMSXmlParse.E_TiledFormat.prototype.getElementName = function() {
	return "TiledFormat"
};
EzServerClient.TMSXmlParse.E_TiledFormat.prototype.getWidth = function() {
	return this.width
};
EzServerClient.TMSXmlParse.E_TiledFormat.prototype.setWidth = function(width) {
	this.width = width
};
EzServerClient.TMSXmlParse.E_TiledFormat.prototype.getHeight = function() {
	return this.height
};
EzServerClient.TMSXmlParse.E_TiledFormat.prototype.setHeight = function(height) {
	this.height = height
};
EzServerClient.TMSXmlParse.E_TiledFormat.prototype.getMimeType = function() {
	return this.mimeType
};
EzServerClient.TMSXmlParse.E_TiledFormat.prototype.setMimeType = function(mimeType) {
	this.mimeType = mimeType
};
EzServerClient.TMSXmlParse.E_TiledFormat.prototype.getExtension = function() {
	return this.extension
};
EzServerClient.TMSXmlParse.E_TiledFormat.prototype.setExtension = function(extension) {
	this.extension = extension
};
EzServerClient.TMSXmlParse.E_TiledFormats = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.tiledFormatContainer = []
};
EzServerClient.TMSXmlParse.E_TiledFormats.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledFormats.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpFdT = new EzServerClient.TMSXmlParse.E_TiledFormat();
	var tmpFdList = EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElements(vSrcElem, tmpFdT.getElementName());
	var tmpFdContainer = new Array();
	for(var i = 0; i < tmpFdList.length; i++) {
		var tmpFd = new EzServerClient.TMSXmlParse.E_TiledFormat();
		tmpFd = tmpFd.fromElement(tmpFdList[i]);
		tmpFdContainer.push(tmpFd)
	}
	this.tiledFormatContainer = tmpFdContainer;
	return this
};
EzServerClient.TMSXmlParse.E_TiledFormats.prototype.get = function(index) {
	return this.tiledFormatContainer[index]
};
EzServerClient.TMSXmlParse.E_TiledFormats.prototype.getElementName = function() {
	return "TiledFormats"
};
EzServerClient.TMSXmlParse.E_TiledFormats.prototype.isEmpty = function() {
	if(this.tiledFormatContainer.length == 0) {
		return true
	}
};
EzServerClient.TMSXmlParse.E_TiledFormats.prototype.remove = function(index) {
	return this.tiledFormatContainer.splice(index, index)
};
EzServerClient.TMSXmlParse.E_TiledFormats.prototype.size = function() {
	return this.tiledFormatContainer.length
};
EzServerClient.TMSXmlParse.E_TiledLayer = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.name = null;
	this.tiledSRS = null;
	this.tiledBoundingBox = null;
	this.tiledOrigin = null;
	this.tiledFormats = null;
	this.tiledRoateAngle = null;
	this.tiledRefreshTime = null;
	this.tiledStyle = null;
	this.tiledTimeDimension = null;
	this.tiledSets = null
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpTSRS = new EzServerClient.TMSXmlParse.E_TiledSRS();
	tmpTSRS = tmpTSRS.fromElement(EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElement(vSrcElem, tmpTSRS.getElementName()));
	this.setTiledSRS(tmpTSRS);
	var tmpTBB = new EzServerClient.TMSXmlParse.E_TiledBoundingBox();
	tmpTBB = tmpTBB.fromElement(EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElement(vSrcElem, tmpTBB.getElementName()));
	this.setTiledBoundingBox(tmpTBB);
	var tmpTO = new EzServerClient.TMSXmlParse.E_TiledOrigin();
	tmpTO = tmpTO.fromElement(EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElement(vSrcElem, tmpTO.getElementName()));
	this.setTiledOrigin(tmpTO);
	var tmpTFS = new EzServerClient.TMSXmlParse.E_TiledFormats();
	tmpTFS = tmpTFS.fromElement(EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElement(vSrcElem, tmpTFS.getElementName()));
	this.setTiledFormats(tmpTFS);
	var tmpTRA = new EzServerClient.TMSXmlParse.E_TiledRoateAngle();
	tmpTRA = tmpTRA.fromElement(EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElement(vSrcElem, tmpTRA.getElementName()));
	this.setTiledRoateAngle(tmpTRA);
	var tmpTRT = new EzServerClient.TMSXmlParse.E_TiledRefreshTime();
	tmpTRT = tmpTRT.fromElement(EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElement(vSrcElem, tmpTRT.getElementName()));
	this.setTiledRefreshTime(tmpTRT);
	var tmpTS = new EzServerClient.TMSXmlParse.E_TiledStyle();
	tmpTS = tmpTS.fromElement(EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElement(vSrcElem, tmpTS.getElementName()));
	this.setTiledStyle(tmpTS);
	var tmpTD = new EzServerClient.TMSXmlParse.E_TiledTimeDimension();
	tmpTD = tmpTD.fromElement(EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElement(vSrcElem, tmpTD.getElementName()));
	this.setTiledTimeDimension(tmpTD);
	var tmpTSS = new EzServerClient.TMSXmlParse.E_TiledSets();
	tmpTSS = tmpTSS.fromElement(EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElement(vSrcElem, tmpTSS.getElementName()));
	this.setTiledSets(tmpTSS);
	this.setName(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "name"));
	return this
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.getElementName = function() {
	return "TiledLayer"
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.getName = function() {
	return this.name
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.setName = function(name) {
	this.name = name
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.getTiledSRS = function() {
	return this.tiledSRS
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.setTiledSRS = function(tiledSRS) {
	this.tiledSRS = tiledSRS
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.getTiledBoundingBox = function() {
	return this.tiledBoundingBox
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.setTiledBoundingBox = function(tiledBoundingBox) {
	this.tiledBoundingBox = tiledBoundingBox
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.getTiledOrigin = function() {
	return this.tiledOrigin
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.setTiledOrigin = function(tiledOrigin) {
	this.tiledOrigin = tiledOrigin
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.getTiledFormats = function() {
	return this.tiledFormats
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.setTiledFormats = function(tiledFormats) {
	this.tiledFormats = tiledFormats
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.getTiledRoateAngle = function() {
	return this.tiledRoateAngle
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.setTiledRoateAngle = function(tiledRoateAngle) {
	this.tiledRoateAngle = tiledRoateAngle
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.getTiledRefreshTime = function() {
	return this.tiledRefreshTime
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.setTiledRefreshTime = function(tiledRefreshTime) {
	this.tiledRefreshTime = tiledRefreshTime
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.getTiledStyle = function() {
	return this.tiledStyle
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.setTiledStyle = function(tiledStyle) {
	this.tiledStyle = tiledStyle
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.getTiledTimeDimension = function() {
	return this.tiledTimeDimension
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.setTiledTimeDimension = function(tiledTimeDimension) {
	this.tiledTimeDimension = tiledTimeDimension
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.getTiledSets = function() {
	return this.tiledSets
};
EzServerClient.TMSXmlParse.E_TiledLayer.prototype.setTiledSets = function(tiledSets) {
	this.tiledSets = tiledSets
};
EzServerClient.TMSXmlParse.E_TiledLayers = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.tiledLayerContainer = []
};
EzServerClient.TMSXmlParse.E_TiledLayers.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledLayers.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpFdT = new EzServerClient.TMSXmlParse.E_TiledLayer();
	var tmpFdList = EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElements(vSrcElem, tmpFdT.getElementName());
	var tmpFdContainer = new Array();
	for(var i = 0; i < tmpFdList.length; i++) {
		var tmpFd = new EzServerClient.TMSXmlParse.E_TiledLayer();
		tmpFd = tmpFd.fromElement(tmpFdList[i]);
		tmpFdContainer.push(tmpFd)
	}
	this.tiledLayerContainer = tmpFdContainer;
	return this
};
EzServerClient.TMSXmlParse.E_TiledLayers.prototype.get = function(index) {
	return this.tiledLayerContainer[index]
};
EzServerClient.TMSXmlParse.E_TiledLayers.prototype.getElementName = function() {
	return "TiledLayers"
};
EzServerClient.TMSXmlParse.E_TiledLayers.prototype.isEmpty = function() {
	if(this.tiledLayerContainer.length == 0) {
		return true
	}
};
EzServerClient.TMSXmlParse.E_TiledLayers.prototype.remove = function(index) {
	return this.tiledLayerContainer.splice(index, index)
};
EzServerClient.TMSXmlParse.E_TiledLayers.prototype.size = function() {
	return this.tiledLayerContainer.length
};
EzServerClient.TMSXmlParse.E_TiledOrigin = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.x = null;
	this.y = null
};
EzServerClient.TMSXmlParse.E_TiledOrigin.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledOrigin.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	this.setX(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "x"));
	this.setY(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "y"));
	return this
};
EzServerClient.TMSXmlParse.E_TiledOrigin.prototype.getElementName = function() {
	return "TiledOrigin"
};
EzServerClient.TMSXmlParse.E_TiledOrigin.prototype.getX = function() {
	return this.x
};
EzServerClient.TMSXmlParse.E_TiledOrigin.prototype.setX = function(x) {
	this.x = x
};
EzServerClient.TMSXmlParse.E_TiledOrigin.prototype.getY = function() {
	return this.y
};
EzServerClient.TMSXmlParse.E_TiledOrigin.prototype.setY = function(y) {
	this.y = y
};
EzServerClient.TMSXmlParse.E_TiledRefreshTime = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.content = null
};
EzServerClient.TMSXmlParse.E_TiledRefreshTime.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledRefreshTime.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpContent = EzServerClient.TMSXmlParse.EzXmlDomUtil.getContext(vSrcElem);
	this.setContent(tmpContent);
	return this
};
EzServerClient.TMSXmlParse.E_TiledRefreshTime.prototype.getElementName = function() {
	return "TiledRefreshTime"
};
EzServerClient.TMSXmlParse.E_TiledRefreshTime.prototype.getContent = function() {
	return this.content
};
EzServerClient.TMSXmlParse.E_TiledRefreshTime.prototype.setContent = function(content) {
	this.content = content
};
EzServerClient.TMSXmlParse.E_TiledRoateAngle = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.content = null
};
EzServerClient.TMSXmlParse.E_TiledRoateAngle.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledRoateAngle.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpContent = EzServerClient.TMSXmlParse.EzXmlDomUtil.getContext(vSrcElem);
	this.setContent(tmpContent);
	return this
};
EzServerClient.TMSXmlParse.E_TiledRoateAngle.prototype.getElementName = function() {
	return "TiledRoateAngle"
};
EzServerClient.TMSXmlParse.E_TiledRoateAngle.prototype.getContent = function() {
	return this.content
};
EzServerClient.TMSXmlParse.E_TiledRoateAngle.prototype.setContent = function(content) {
	this.content = content
};
EzServerClient.TMSXmlParse.E_TiledSet = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.level = null;
	this.unitsPerPixel = null
};
EzServerClient.TMSXmlParse.E_TiledSet.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledSet.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	this.setLevel(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "level"));
	this.setUnitsPerPixel(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "units-per-pixel"));
	return this
};
EzServerClient.TMSXmlParse.E_TiledSet.prototype.getElementName = function() {
	return "TiledSet"
};
EzServerClient.TMSXmlParse.E_TiledSet.prototype.getLevel = function() {
	return this.level
};
EzServerClient.TMSXmlParse.E_TiledSet.prototype.setLevel = function(level) {
	this.level = level
};
EzServerClient.TMSXmlParse.E_TiledSet.prototype.getUnitsPerPixel = function() {
	return this.unitsPerPixel
};
EzServerClient.TMSXmlParse.E_TiledSet.prototype.setUnitsPerPixel = function(unitsPerPixel) {
	this.unitsPerPixel = unitsPerPixel
};
EzServerClient.TMSXmlParse.E_TiledSets = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.tiledSetContainer = []
};
EzServerClient.TMSXmlParse.E_TiledSets.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledSets.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpFdT = new EzServerClient.TMSXmlParse.E_TiledSet();
	var tmpFdList = EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElements(vSrcElem, tmpFdT.getElementName());
	var tmpFdContainer = new Array();
	for(var i = 0; i < tmpFdList.length; i++) {
		var tmpFd = new EzServerClient.TMSXmlParse.E_TiledSet();
		tmpFd = tmpFd.fromElement(tmpFdList[i]);
		tmpFdContainer.push(tmpFd)
	}
	this.tiledSetContainer = tmpFdContainer;
	return this
};
EzServerClient.TMSXmlParse.E_TiledSets.prototype.get = function(index) {
	return this.tiledSetContainer[index]
};
EzServerClient.TMSXmlParse.E_TiledSets.prototype.getElementName = function() {
	return "TiledSets"
};
EzServerClient.TMSXmlParse.E_TiledSets.prototype.isEmpty = function() {
	if(this.tiledSetContainer.length == 0) {
		return true
	}
};
EzServerClient.TMSXmlParse.E_TiledSets.prototype.remove = function(index) {
	return this.tiledSetContainer.splice(index, index)
};
EzServerClient.TMSXmlParse.E_TiledSets.prototype.size = function() {
	return this.tiledSetContainer.length
};
EzServerClient.TMSXmlParse.E_TiledSRS = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.content = null
};
EzServerClient.TMSXmlParse.E_TiledSRS.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledSRS.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpContent = EzServerClient.TMSXmlParse.EzXmlDomUtil.getContext(vSrcElem);
	this.setContent(tmpContent);
	return this
};
EzServerClient.TMSXmlParse.E_TiledSRS.prototype.getElementName = function() {
	return "TiledSRS"
};
EzServerClient.TMSXmlParse.E_TiledSRS.prototype.getContent = function() {
	return this.content
};
EzServerClient.TMSXmlParse.E_TiledSRS.prototype.setContent = function(content) {
	this.content = content
};
EzServerClient.TMSXmlParse.E_TiledStyle = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.content = null
};
EzServerClient.TMSXmlParse.E_TiledStyle.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledStyle.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpContent = EzServerClient.TMSXmlParse.EzXmlDomUtil.getContext(vSrcElem);
	this.setContent(tmpContent);
	return this
};
EzServerClient.TMSXmlParse.E_TiledStyle.prototype.getElementName = function() {
	return "TiledStyle"
};
EzServerClient.TMSXmlParse.E_TiledStyle.prototype.getContent = function() {
	return this.content
};
EzServerClient.TMSXmlParse.E_TiledStyle.prototype.setContent = function(content) {
	this.content = content
};
EzServerClient.TMSXmlParse.E_TiledTimeDimension = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.content = null
};
EzServerClient.TMSXmlParse.E_TiledTimeDimension.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledTimeDimension.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpContent = EzServerClient.TMSXmlParse.EzXmlDomUtil.getContext(vSrcElem);
	this.setContent(tmpContent);
	return this
};
EzServerClient.TMSXmlParse.E_TiledTimeDimension.prototype.getElementName = function() {
	return "TiledTimeDimension"
};
EzServerClient.TMSXmlParse.E_TiledTimeDimension.prototype.getContent = function() {
	return this.content
};
EzServerClient.TMSXmlParse.E_TiledTimeDimension.prototype.setContent = function(content) {
	this.content = content
};
EzServerClient.TMSXmlParse.E_TiledMapService = function() {
	EzServerClient.TMSXmlParse.E_Element.call(this);
	this.version = "1.0.0";
	this.name = null;
	this.tiledLayers = null
};
EzServerClient.TMSXmlParse.E_TiledMapService.prototype = new EzServerClient.TMSXmlParse.E_Element;
EzServerClient.TMSXmlParse.E_TiledMapService.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpResp = new EzServerClient.TMSXmlParse.E_TiledLayers();
	tmpResp = tmpResp.fromElement(EzServerClient.TMSXmlParse.EzXmlDomUtil.getChildElement(vSrcElem, tmpResp.getElementName()));
	this.setTiledLayers(tmpResp);
	this.setVersion(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "version"));
	return this;
	this.setName(EzServerClient.TMSXmlParse.EzXmlDomUtil.getAttribute(vSrcElem, "name"));
	return this
};
EzServerClient.TMSXmlParse.E_TiledMapService.prototype.getElementName = function() {
	return "TiledMapService"
};
EzServerClient.TMSXmlParse.E_TiledMapService.prototype.getName = function() {
	return this.name
};
EzServerClient.TMSXmlParse.E_TiledMapService.prototype.setName = function(name) {
	this.name = name
};
EzServerClient.TMSXmlParse.E_TiledMapService.prototype.getVersion = function() {
	return this.version
};
EzServerClient.TMSXmlParse.E_TiledMapService.prototype.setVersion = function(version) {
	EzServerClient.TMSXmlParse.E_TiledMapService.version = EzServerClient.TMSXmlParse.EzXmlTypeUtil.toStringValue(version, "1.0.0");
	if(EzServerClient.TMSXmlParse.E_TiledMapService.version != "1.0.0") {
		throw new Error("设置的版本号不是TiledMapService 1.0.0")
	}
	this.version = EzServerClient.TMSXmlParse.E_TiledMapService.version
};
EzServerClient.TMSXmlParse.E_TiledMapService.prototype.makeMutexEmpty = function() {
	this.tiledLayers = null
};
EzServerClient.TMSXmlParse.E_TiledMapService.prototype.getTiledLayers = function() {
	return this.tiledLayers
};
EzServerClient.TMSXmlParse.E_TiledMapService.prototype.setTiledLayers = function(tiledLayers) {
	if(tiledLayers != null) {
		this.makeMutexEmpty()
	}
	this.tiledLayers = tiledLayers
};
EzServerClient.TMSXmlParse.EzFactory = function() {};
EzServerClient.TMSXmlParse.EzFactory.FromXml = function(Xml) {
	var doc1 = null;
	try {
		var doc1 = new ActiveXObject("Microsoft.XMLDOM");
		doc1.async = false;
		if(Xml != null) {
			doc1.loadXML(Xml)
		} else {
			return
		}
	} catch(e) {
		try {
			parser = new DOMParser();
			if(Xml != null) {
				doc1 = parser.parseFromString(Xml, "text/xml")
			} else {
				return
			}
		} catch(e) {
			throw(e)
		}
	}
	var xRoot1 = doc1.documentElement;
	var ezRoot1 = new EzServerClient.TMSXmlParse.E_TiledMapService().fromElement(xRoot1);
	return ezRoot1
};
EzServerClient.TMSXmlParse.EzFactory.FromXmlByFile = function(dname) {
	try {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM")
	} catch(e) {
		try {
			xmlDoc = document.implementation.createDocument("", "", null)
		} catch(e) {
			throw e
		}
	}
	try {
		xmlDoc.async = false;
		xmlDoc.load(dname);
		var ezRoot1 = new EzServerClient.TMSXmlParse.E_TiledMapService().fromElement(xmlDoc.documentElement);
		return ezRoot1
	} catch(e) {
		return(null)
	}
};
EzServerClient.TMSXmlParse.QueryItem = function(url, xmlDoc) {
	this.timeOut = null;
	this.tryTime = null;
	this.state = State.SUCCESS;
	this.url = url;
	this.failureOnError = false;
	this.xmlDoc = xmlDoc;
	this.responseXml = null
};
EzServerClient.TMSXmlParse.QueryItem.prototype.currentTryTime = 0;
EzServerClient.TMSXmlParse.QueryItem.prototype.reSendId = 0;
EzServerClient.TMSXmlParse.QueryItem.prototype.getTimeOut = function() {
	return this.timeOut
};
EzServerClient.TMSXmlParse.QueryItem.prototype.setTimeOut = function(timeOut) {
	this.timeOut = timeOut
};
EzServerClient.TMSXmlParse.QueryItem.prototype.getTryTime = function() {
	return this.tryTime
};
EzServerClient.TMSXmlParse.QueryItem.prototype.setTryTime = function(tryTime) {
	this.tryTime = tryTime
};
EzServerClient.TMSXmlParse.QueryItem.prototype.getQueryXml = function() {
	return this.xmlDoc
};
EzServerClient.TMSXmlParse.QueryItem.prototype.setQueryXml = function(xmlDoc) {
	this.xmlDoc = xmlDoc
};
EzServerClient.TMSXmlParse.QueryItem.prototype.getResponseXml = function() {
	return this.responseXml
};
EzServerClient.TMSXmlParse.QueryItem.prototype.setResponseXml = function(responseXml) {
	this.responseXml = responseXml
};
EzServerClient.TMSXmlParse.QueryItem.prototype.getResultState = function() {
	return this.state
};
EzServerClient.TMSXmlParse.QueryItem.prototype.setResultState = function(state) {
	this.state = state
};
EzServerClient.TMSXmlParse.QueryItem.prototype.getFailureOnError = function() {
	return this.failureOnError
};
EzServerClient.TMSXmlParse.QueryItem.prototype.setFailureOnError = function(failureOnError) {
	this.failureOnError = failureOnError
};
EzServerClient.TMSXmlParse.QueryItem.prototype.doQuery = function() {
	var url = this.url;
	var xmlDoc = this.xmlDoc;
	var count = this.tryTime;
	var pMe = this;
	var text2Send = this.xmlDoc;
	this.itemId = null;
	var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	xmlhttp.open("POST", this.url, true);
	xmlhttp.setRequestHeader("Content-Type", "text/xml");
	xmlhttp.onreadystatechange = HandleStateChange;
	if(pMe.currentTryTime == 0) {
		RequestMapObject.add(xmlhttp, new RequestMapItemBinding(EzServerClient.TMSXmlParse.EzMapserviceQuery.NextOrder, text2Send))
	} else {
		RequestMapObject.add(xmlhttp, new RequestMapItemBinding(pMe.reSendId, text2Send))
	}
	xmlhttp.send(text2Send);
	if(pMe.currentTryTime == 0) {
		EzServerClient.TMSXmlParse.EzMapserviceQuery.NextOrder++
	}

	function HandleStateChange() {
		if(xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) {
				var doc1 = null;
				try {
					doc1 = new ActiveXObject("Microsoft.XMLDOM");
					doc1.async = false;
					if(xmlhttp.responseText != null) {
						doc1.loadXML(xmlhttp.responseText)
					} else {
						return
					}
				} catch(e) {
					try {
						parser = new DOMParser();
						if(xmlhttp.responseText != null) {
							doc1 = parser.parseFromString(xmlhttp.responseText, "text/xml")
						} else {
							return
						}
					} catch(e) {
						alert(e.message)
					}
				}
				if((doc1.getElementsByTagName("ERROR").length == 0)) {
					var o = RequestMapObject.getValue(xmlhttp);
					RequestMapObject.remove(xmlhttp);
					pMe.setResponseXml(xmlhttp.responseText);
					pMe.setQueryXml(RequestMapObject.getValue(xmlhttp).text);
					pMe.itemId = RequestMapObject.getValue(xmlhttp).num;
					if(--pMe.mapServiceQuery.itemCurrentCount == 0) {
						EzServerClient.TMSXmlParse.EzMapserviceQuery.QueryState = false;
						pMe.mapServiceQuery.onFinished()
					}
				} else {
					if(++pMe.currentTryTime > pMe.getTryTime()) {
						pMe.setResultState(State.ERROR);
						pMe.mapServiceQuery.queryFlag++;
						--pMe.mapServiceQuery.itemCurrentCount;
						if(pMe.mapServiceQuery.failureOnError && pMe.mapServiceQuery.queryFlag == 1) {
							EzServerClient.TMSXmlParse.EzMapserviceQuery.QueryState = false;
							throw new Error("由于第" + RequestMapObject.getValue(xmlhttp).num + "个子查询出错，该查询事务终止")
						}
						pMe.setResponseXml(xmlhttp.responseText);
						if(pMe.mapServiceQuery.itemCurrentCount == 0) {
							EzServerClient.TMSXmlParse.EzMapserviceQuery.QueryState = false;
							pMe.mapServiceQuery.onFinished()
						}
						return
					}
					pMe.doQuery()
				}
			} else {
				if(++pMe.currentTryTime > pMe.getTryTime()) {
					pMe.setResultState(State.ERROR);
					pMe.mapServiceQuery.queryFlag++;
					--pMe.mapServiceQuery.itemCurrentCount;
					if(pMe.mapServiceQuery.failureOnError && pMe.mapServiceQuery.queryFlag == 1) {
						EzServerClient.TMSXmlParse.EzMapserviceQuery.QueryState = false;
						throw new Error("由于第" + RequestMapObject.getValue(xmlhttp).num + "个子查询出错，该查询事务终止")
					}
					if(pMe.mapServiceQuery.itemCurrentCount == 0) {
						EzServerClient.TMSXmlParse.EzMapserviceQuery.QueryState = false;
						pMe.mapServiceQuery.onFinished()
					}
					return
				}
				pMe.doQuery()
			}
		}
	}
};
_CurentOverLay = null;

function iOverLay() {
	this.id;
	this.paths = null;
	this.points = new Array();
	this.point = null;
	this.iLen = null;
	this.iPause = null;
	this.timeInterval = 1000;
	this.bIsRepeat = false;
	this.bIsPlay = false;
	this.iZIndex = _overLayIndex;
	this.dispStatus = 1;
	this.startSeq = 0;
	this.endSeq = 0;
	this.dScale = 1;
	this.startScaleSeq = 0;
	this.endScaleSeq = 0;
	this.statusSet = new Array();
	this.dragObject = null;
	this.bIsSyRedraw = true;
	this.map = null;
	this.angle = 0;
	this.color = "red";
	this.opacity = 1;
	this.editable = false;
	this.bIsCenter = false
}
iOverLay.prototype.showPropertyEdit = function() {
	g_current_editor = this;
	if(this.editable == false) {
		return
	}
	getMapApp().showMenu();
	return false
};
iOverLay.prototype.getZIndex = function() {
	return this.div.style.zIndex
};
iOverLay.prototype.setZIndex = function(iIndex) {
	if(this.div != null) {
		this.div.style.zIndex = iIndex
	}
};
iOverLay.prototype.synCreateDiv = function(pContainer) {
	this.map = pContainer;
	if(this.bIsSyRedraw == true) {
		this.setTimeout("this.createDiv()", 10)
	} else {
		this.createDiv()
	}
};
iOverLay.prototype.createDiv = function() {};
iOverLay.prototype.synRedraw = function() {
	if(this.bIsSyRedraw == true) {
		this.setTimeout("this.synRedraw()", 10)
	} else {
		this.redraw()
	}
};
iOverLay.prototype.redraw = function() {};
iOverLay.prototype.removeFromDiv = function() {
	var self = this;
	if(this.pause) {
		this.pause()
	}
	if(this.map) {
		this.map.divPaint.removeChild(this.div);
		EventManager.removeNode(this.div);
		if(this.titleDiv != null) {
			this.map.divPaint.removeChild(this.titleDiv);
			EventManager.removeNode(this.titleDiv)
		}
	}
};
iOverLay.prototype.hide = function() {
	if(this.div != null) {
		this.div.style.display = "none"
	}
	if(this.titleDiv != null) {
		this.titleDiv.style.display = "none"
	}
};
iOverLay.prototype.show = function() {
	if(this.div != null) {
		this.div.style.display = ""
	}
	if(this.titleDiv != null) {
		this.titleDiv.style.display = ""
	}
};
iOverLay.prototype.isVisible = function() {
	return this.div.style.display != "none"
};
iOverLay.prototype.onclick = function() {
	this.div.fireEvent("onclick")
};
iOverLay.prototype.addListener = function(action, fuct) {
	if(this.div != null) {
		BindingEvent(this.div, action, fuct);
		this.div.style.cursor = "hand"
	}
	if(this.titleDiv) {
		BindingEvent(this.titleDiv, action, fuct);
		this.titleDiv.style.cursor = "hand"
	}
};
iOverLay.prototype.removeListener = function(action, fuct) {
	unbindingEvent(this.div, action, fuct);
	if(this.titleDiv) {
		unbindingEvent(this.titleDiv, action, fuct);
		this.titleDiv.style.cursor = ""
	}
};
iOverLay.prototype.removeAllListener = function() {
	EventManager.removeNode(this.div);
	if(this.titleDiv) {
		EventManager.removeNode(this.titleDiv);
		this.titleDiv.style.cursor = ""
	}
};
iOverLay.prototype.openInfoWindowHtml = function(html) {
	this.map.blowupOverlay(this);
	var pPoint = new Point(getMap().mouseLng, getMap().mouseLat);
	this.map.openInfoWindow(pPoint.x, pPoint.y, html, true)
};
iOverLay.prototype.initPath = function(strPath) {
	if(typeof strPath != "undefined" && strPath != null) {
		this.points = trans2Points(strPath)
	}
	var pPoints = this.points;
	for(var iIndex = 0; iIndex < pPoints.length; iIndex++) {
		var pPoint = pPoints[iIndex];
		if(iIndex == 0) {
			pPoint.mileage = 0
		} else {
			pPoint.countMileage(pPoints[iIndex - 1])
		}
	}
};
iOverLay.prototype.play = function(bIsCenter) {
	if(bIsCenter) {
		this.bIsCenter = bIsCenter
	}
	this.drawInterval()
};
iOverLay.prototype.replay = function() {
	this.iPause = 0;
	this.drawInterval()
};
iOverLay.prototype.stop = function() {
	this.pause();
	this.dScale = 1;
	this.iPause = 0;
	this.redraw()
};
iOverLay.prototype.pause = function() {
	if(this.timeOut) {
		clearTimeout(this.timeOut);
		this.timeOut = null
	}
};
iOverLay.prototype.setInterval = function(iTime) {
	this.timeInterval = iTime
};
iOverLay.prototype.setRepeat = function(bTrue) {
	this.bIsRepeat = bTrue
};
iOverLay.prototype.drawInterval = function() {
	this.bIsPlay = true;
	if(this.iPause < this.endSeq) {
		this.iPause++
	} else {
		this.iPause = this.startSeq;
		if(!this.bIsRepeat) {
			return
		}
	}
	this.showStatus(this.iPause);
	if(typeof this.bIsCenter != "undefined" && this.bIsCenter) {
		if(this instanceof Marker || this instanceof Title) {
			this.map.recenterOrPanToLatLng(this.point)
		}
	}
	this.timeOut = this.setTimeout("this.drawInterval()", this.timeInterval)
};
iOverLay.prototype.getSPoints = function(iS) {
	var pPoints = this.points;
	var pResultPoints = new Array();
	var iLen = pPoints.length;
	var dDist = pPoints[iLen - 1].mileage;
	var dMidDist = (iS - this.startPath) / (this.endPath - this.startPath) * dDist;
	for(var iIndex = 0; iIndex < iLen - 1; iIndex++) {
		if(pPoints[iIndex].mileage <= dMidDist) {
			pResultPoints.push(pPoints[iIndex])
		}
		if(pPoints[iIndex + 1].mileage >= dMidDist) {
			var dTmpDist = dMidDist - pPoints[iIndex].mileage;
			var pTmpPoint = Point.getDistPoint(pPoints[iIndex], pPoints[iIndex + 1], dTmpDist);
			pResultPoints.push(pTmpPoint);
			break
		}
	}
	return pResultPoints
};
iOverLay.prototype.flash = function(bIsFilled) {
	this.flashTimes = 0;
	this.bIsFilled = bIsFilled;
	this.flashInterval(bIsFilled)
};
iOverLay.prototype.flash2 = function(times, bIsFilled) {
	try {
		this.flashTimes = 0;
		if(EzServerClient.GlobeFunction.isTypeRight(times, "int")) {
			this.flashEndtimes = times;
			this.flashInterval2(bIsFilled)
		} else {
			if(EzServerClient.GlobeFunction.isTypeRight(times, "undefined")) {
				this.flashEndtimes = 3;
				this.flashInterval2(bIsFilled)
			} else {
				throw EzErrorFactory.createError("iOverLay::flash方法中arguments[0]类型不正确")
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("iOverLay::flash方法中不正确", e)
	}
};
iOverLay.prototype.flashInterval2 = function(bIsFilled) {
	var pvml = this.div;
	if(pvml == null) {
		return
	}
	if(this.flashTimes < this.flashEndtimes * 2) {
		this.flashTimes++;
		if(this.div.style.display == "") {
			this.div.style.display = "none"
		} else {
			this.div.style.display = ""
		}
	} else {
		this.div.style.display = "";
		if(typeof(bIsFilled) != "undefined") {
			this.div.filled = bIsFilled
		}
		return
	}
	this.setTimeout("this.flashInterval2(" + bIsFilled + ")", 400)
};
iOverLay.prototype.refreshStatus = function() {
	if(this.dispStatus == 1) {
		if(this.div != null) {
			this.div.style.display = ""
		}
		if(this.titleDiv != null) {
			this.titleDiv.style.display = ""
		}
	} else {
		if(this.dispStatus == 2) {
			if(this.div != null) {
				this.div.style.display = "none"
			}
			if(this.titleDiv != null) {
				this.titleDiv.style.display = "none"
			}
		} else {
			if(this.dispStatus == 3) {
				this.flash()
			}
		}
	}
};
iOverLay.prototype.flashInterval = function(bIsFilled) {
	var pvml = this.div;
	if(pvml == null) {
		return
	}
	if(this.flashTimes < 6) {
		this.flashTimes++;
		if(this.div.style.display == "") {
			this.div.style.display = "none"
		} else {
			this.div.style.display = ""
		}
	} else {
		this.div.style.display = "";
		if(typeof(this.bIsFilled) != "undefined") {
			this.div.filled = this.bIsFilled
		}
		return
	}
	this.flashTimeOut = this.setTimeout("this.flashInterval()", 400)
};
iOverLay.prototype.scale = function(dScale) {
	if(typeof dScale == "string") {
		dScale = parseFloat(dScale)
	}
	this.dScale = dScale;
	this.redraw()
};
iOverLay.prototype.rotate = function rotate(angle, el) {
	var rad = degToRad(angle);
	costheta = Math.cos(rad);
	sintheta = Math.sin(rad);
	if(!el) {
		el = this.div
	}
	if(el) {
		el.style.filter = "progid:DXImageTransform.Microsoft.Matrix()";
		el.filters.item("DXImageTransform.Microsoft.Matrix").SizingMethod = "auto expand";
		el.filters.item("DXImageTransform.Microsoft.Matrix").FilterType = "bilinear";
		el.filters.item("DXImageTransform.Microsoft.Matrix").M11 = costheta;
		el.filters.item("DXImageTransform.Microsoft.Matrix").M12 = -sintheta;
		el.filters.item("DXImageTransform.Microsoft.Matrix").M21 = sintheta;
		el.filters.item("DXImageTransform.Microsoft.Matrix").M22 = costheta
	}
};
iOverLay.prototype.doRotate = function() {
	if(this.angle > 360) {
		this.angle -= 360
	}
	this.angle += 15;
	this.rotate(this.angle);
	this.setTimeout("this.doRotate()", 200)
};
iOverLay.prototype.showStatus = function(iSeq) {
	if(isNaN(iSeq)) {
		alert("传入的参数有误，不是数值");
		return
	}
	if(typeof iSeq == "string") {
		iSeq = parseInt(iSeq)
	}
	if(iSeq < this.startSeq) {
		iSeq = this.startSeq
	}
	if(iSeq > this.endSeq) {
		iSeq = this.endSeq
	}
	if(this.startScale && (this instanceof Marker || this instanceof Circle || this instanceof Rectangle || this instanceof Polyline)) {
		if(iSeq <= this.startScaleSeq) {
			this.dScale = this.startScale
		} else {
			if(iSeq >= this.endScaleSeq) {
				this.dScale = this.endScale
			} else {
				this.dScale = this.startScale + (iSeq - this.startScaleSeq) / (this.endScaleSeq - this.startScaleSeq) * (this.endScale - this.startScale)
			}
		}
	}
	if(this instanceof Marker || this instanceof Polyline || this instanceof Title) {
		if(this.points.length > 0) {
			var iPathSeq = iSeq;
			if(iPathSeq < this.startPath) {
				iPathSeq = this.startPath
			}
			if(iPathSeq > this.endPath) {
				iPathSeq = this.endPath
			}
			this.pPoints = this.getSPoints(iPathSeq);
			if(this.pPoints.length > 0) {
				this.point = this.pPoints[this.pPoints.length - 1]
			} else {}
			if(this.point == null) {
				throw Error(103, "点为空:" + this.pPoints.toString() + ":" + this.pPoints.length)
			}
		}
	}
	this.dispStatus = 1;
	for(var iIndex = 0; iIndex < this.statusSet.length; iIndex++) {
		var pStatusSet = this.statusSet[iIndex];
		if(iSeq >= pStatusSet.startSeq && iSeq <= pStatusSet.endSeq) {
			this.dispStatus = pStatusSet.iStatus;
			break
		}
	}
	this.redraw();
	this.refreshStatus()
};
iOverLay.prototype.addDispStatus = function(iStartS, iEndS, iStatus) {
	for(var i = 0; i < arguments.length; i++) {
		if(isNaN(arguments[i])) {
			alert("传入的参数有误，不是数值");
			return
		}
		if(typeof arguments[i] == "string") {
			arguments[i] = parseInt(arguments[i])
		}
	}
	if(iStatus < 1 || iStatus > 3) {
		alert("状态设置错误，应为(1:显示;2:隐藏;3:闪烁)");
		return
	}
	var pOverlayStatus = new OverlayStatus(iStartS, iEndS, iStatus);
	for(var i = 0; i < this.statusSet.length; i++) {
		var tmpStatus = this.statusSet[i];
		var pOK = tmpStatus.bIsConflict(pOverlayStatus);
		if(pOK) {
			pOverlayStatus = null;
			return
		}
	}
	this.startSeq = Math.min(this.startSeq, iStartS);
	this.endSeq = Math.max(this.endSeq, iEndS);
	this.statusSet.push(pOverlayStatus)
};
iOverLay.prototype.setExtendStatus = function(iStartS, iEndS, dSScale, dEScale) {
	for(var i = 0; i < arguments.length; i++) {
		if(isNaN(arguments[i])) {
			alert("传入的参数有误，不是数值");
			return
		}
	}
	if(typeof iStartS == "string") {
		iStartS = parseInt(iStartS)
	}
	if(typeof iEndS == "string") {
		iEndS = parseInt(iEndS)
	}
	if(typeof dSScale == "string") {
		dSScale = parseFloat(dSScale)
	}
	if(typeof dEScale == "string") {
		dEScale = parseFloat(dEScale)
	}
	this.startSeq = Math.min(this.startSeq, iStartS);
	this.endSeq = Math.max(this.endSeq, iEndS);
	this.startScale = dSScale;
	this.endScale = dEScale;
	this.startScaleSeq = iStartS;
	this.endScaleSeq = iEndS
};
iOverLay.prototype.setPath = function(iStartS, iEndS, strPoints) {
	for(var i = 0; i < 2; i++) {
		if(isNaN(arguments[i])) {
			alert("传入的参数有误，不是数值");
			return
		}
	}
	if(typeof iStartS == "string") {
		iStartS = parseInt(iStartS)
	}
	if(typeof iEndS == "string") {
		iEndS = parseInt(iEndS)
	}
	this.startSeq = Math.min(this.startSeq, iStartS);
	this.endSeq = Math.max(this.endSeq, iEndS);
	this.startPath = iStartS;
	this.endPath = iEndS;
	this.initPath(strPoints)
};
iOverLay.prototype.toString = function() {
	var strPoints = "";
	if(this instanceof Circle) {
		strPoints = this.point.toString() + "," + this.radius
	} else {
		if(this instanceof Rectangle || this instanceof Polygon || this instanceof Polyline) {
			strPoints = this.points.join(",")
		} else {
			if(this instanceof Title || this instanceof Marker) {
				strPoints = this.point.toString()
			}
		}
	}
	return strPoints
};
iOverLay.prototype.setNode = function(bTrue) {
	if(bTrue) {
		this.bIsNode = bTrue;
		if(this.div.style.border != "") {
			this.div.style.border = "1px solid #000000";
			this.div.style.backgroundColor = "#b3b3b3";
			this.div.style.filter = "alpha(opacity=70)"
		}
	} else {
		this.bIsNode = bTrue;
		if(this.div.style.border != "") {
			this.div.style.border = "1px solid #000000";
			this.div.style.backgroundColor = "#b3b3b3";
			this.div.style.filter = "alpha(opacity=50)"
		}
	}
};
iOverLay.prototype.getLocalUnit = function() {
	var strUnit = "degree";
	if(_MapSpanScale != 1) {
		strUnit = "meter"
	}
	return strUnit
};
iOverLay.prototype.toLocalUnit = function(str) {
	var strSpan = str;
	if(typeof str == "string") {
		if(_MapSpanScale == 1 && (str.indexOf("meter") != -1)) {
			strSpan = parseFloat(str) * (0.03 / 3600)
		}
	}
	return strSpan
};
iOverLay.prototype.updatePoint = function() {
	this.point = new Point(this.map.mouseLng, this.map.mouseLat);
	if(this._point) {
		var xOffset = this.point.x - this._point.x;
		var yOffset = this.point.y - this._point.y;
		if(this instanceof Circle) {
			this.points[0] = this.points[0];
			this.points[1] = this.points[1]
		}
		if(this instanceof Rectangle) {
			if(this.flag == false) {} else {
				this.points[0].x += xOffset;
				this.points[1].x += xOffset;
				this.points[0].y += yOffset;
				this.points[1].y += yOffset
			}
		} else {
			if(this.flag != false) {
				for(var i = 0; i < this.points.length; i++) {
					this.points[i].x += xOffset;
					this.Points[i].y += yOffset
				}
			}
		}
		if(this.center != null) {
			this.center.x = this.point.x;
			this.center.y = this.point.y
		}
		this._point = this.point;
		this.flag = true
	}
	this.setNode(true);
	this.redraw();
	_CurentOverLay = this
};
iOverLay.prototype.ondragstart = function() {
	this._point = this.point
};
iOverLay.prototype.enableContextMenu = function() {
	BindingEvent(this.div, "contextmenu", this.eventHandler("showPropertyEdit"));
	if(this.titleDiv) {
		BindingEvent(this.titleDiv, "contextmenu", this.eventHandler("showPropertyEdit"))
	}
};
iOverLay.prototype.disableContextMenu = function() {
	unbindingEvent(this.div, "contextmenu", this.eventHandler("showPropertyEdit"));
	if(this.titleDiv) {
		unbindingEvent(this.titleDiv, "contextmenu", this.eventHandler("showPropertyEdit"))
	}
};
iOverLay.prototype.startMove = function(func) {
	var iLeft = parseInt(this.div.style.left);
	var iTop = parseInt(this.div.style.top);
	this.bIsSyRedraw = false;
	if(!this.dragObject) {
		this.dragObject = new DragEvent(this.div, iLeft, iTop, this.map.container)
	} else {
		this.dragObject.enable()
	}
	this._point = this.point;
	this.flag = false;
	this.dragObject.ondrag = this.eventHandler("updatePoint");
	if(typeof func != "undefined") {
		this.dragObject.ondragend = this.eventHandler("ondragend");
		var temp = this.dragObject.ondragend;
		var that = this;
		this.dragObject.ondragend = function() {
			temp();
			func()
		}
	} else {
		this.dragObject.ondragend = this.eventHandler("ondragend")
	}
};
iOverLay.prototype.ondragend = function() {
	this.flag = false
};
iOverLay.prototype.stopMove = function(strPath) {
	this.dragObject.disable();
	this.dragObject.ondragend = null
};
iOverLay.prototype.showInfo = function(x, y, strMsg, strTitle) {
	if(!strTitle) {
		strTitle = ""
	}
	var pInfoDiv = document.getElementById("InfoDiv");
	if(pInfoDiv == null) {
		pInfoDiv = document.createElement("div");
		pInfoDiv.id = "InfoDiv";
		pInfoDiv.style.zIndex = "12000";
		pInfoDiv.style.position = "absolute";
		this.map.divPaint.appendChild(pInfoDiv);
		BindingEvent(pInfoDiv, "mouseover", function() {
			iOverLay.bOutOfInfo = false
		});
		BindingEvent(pInfoDiv, "mouseout", function() {
			iOverLay.bOutOfInfo = true;
			iOverLay.closeInfo()
		})
	}
	var strHTML = "";
	strHTML = '<TABLE id="InfoTable_2"  >';
	strHTML = strHTML + "<TBODY>";
	strHTML = strHTML + "<TR>";
	strHTML = strHTML + '<TD class="InfoTitle">';
	strHTML = strHTML + '<TABLE class="InfoWord" cellSpacing=0 cellPadding=0 width="100%" align=center border=0>';
	strHTML = strHTML + "<TBODY>";
	strHTML = strHTML + "<TR>";
	strHTML = strHTML + '<TD id=head_txt><IMG src="/EzServer/css/infolittle.gif"><span id="info_title">' + strTitle + "</span></TD>";
	strHTML = strHTML + "<TD width=30>　</TD>";
	strHTML = strHTML + '<TD vAlign=center align=middle width=20><A class="InfoClose"  onclick="iOverLay.closeInfoWait(true);" href="javascript:void(0)">×</A>';
	strHTML = strHTML + "</TD>";
	strHTML = strHTML + "</TR>";
	strHTML = strHTML + "</TBODY>";
	strHTML = strHTML + "</TABLE>";
	strHTML = strHTML + "</TD>";
	strHTML = strHTML + "</TR>";
	strHTML = strHTML + "<TR>";
	strHTML = strHTML + '<TD vAlign=top bgColor=#ffffff id="info_desc">';
	strHTML = strHTML + strMsg;
	strHTML = strHTML + "</TD>";
	strHTML = strHTML + "</TR>";
	strHTML = strHTML + "</TBODY>";
	strHTML = strHTML + "</TABLE>";
	pInfoDiv.innerHTML = strHTML;
	var pTmpDiv = document.createElement("div");
	pTmpDiv.innerHTML = strHTML;
	this.map.divPaint.appendChild(pTmpDiv);
	var iTableWidth = pTmpDiv.offsetWidth;
	var iTableHeight = pTmpDiv.offsetHeight;
	this.map.divPaint.removeChild(pTmpDiv);
	var pTableEle = document.getElementById("InfoTable_2");
	var iOffsetLeft = parseInt(this.div.offsetWidth);
	var iOffsetTop = parseInt(this.div.offsetHeight);
	var pPoint = this.map.convert2WPoint(x, y);
	var pCenter = this.map.getCenterLatLng();
	if(this.point.x > pCenter.x) {
		pInfoDiv.style.left = convert2Px(pPoint.x - iTableWidth + iOffsetLeft)
	} else {
		pInfoDiv.style.left = convert2Px(pPoint.x)
	}
	if(this.point.y > pCenter.y) {
		pInfoDiv.style.top = convert2Px(pPoint.y + iOffsetTop - 1)
	} else {
		pInfoDiv.style.top = convert2Px(pPoint.y - iTableHeight)
	}
	pInfoDiv.style.display = ""
};
iOverLay.prototype.setPoint = function(pPoint) {
	this.point = pPoint;
	this.meterPoint = this.latlon2Meters(pPoint);
	if(this.div != null && this.map != null) {
		this.redraw()
	}
};
iOverLay.prototype.getPoint = function() {
	if(this.point) {
		return this.point
	} else {
		return null
	}
};
iOverLay.prototype.toHTML = function() {
	var pTable = document.createElement("table");
	pTable.border = 0;
	pTable.id = "InfoTable";
	pTable.align = "center";
	pTable.cellspacing = 0;
	pTable.cellpadding = 0;
	pTable.onclick = "";
	var iRowIndex = 0;
	if(g_current_editor.getLineStyle) {
		var pTW = pTable.insertRow(iRowIndex);
		pTW.height = 10;
		var pTd1 = pTW.insertCell(0);
		pTd1.innerHTML = "线的样式";
		pTd1.className = "leftBorder";
		var pTd2 = pTW.insertCell(1);
		pTd2.className = "rightBorder";
		pTd2.appendChild(this.createSelect(g_current_editor.getLineStyle()));
		iRowIndex++
	}
	if(g_current_editor.getColor) {
		var pTW = pTable.insertRow(iRowIndex);
		pTW.height = 10;
		var pTd1 = pTW.insertCell(0);
		pTd1.innerHTML = this.colorName;
		pTd1.className = "leftBorder";
		var pTd2 = pTW.insertCell(1);
		pTd2.className = "rightBorder";
		pTd2.innerHTML = "<input size=10  style='BACKGROUND:" + g_current_editor.getColor() + "' value='" + g_current_editor.getColor() + "' onpropertychange='g_current_editor.setColor(this.value)' onclick='EzColorPicker(this,this);' ></input>";
		iRowIndex++
	}
	if(g_current_editor.getWidth) {
		var pTW = pTable.insertRow(iRowIndex);
		pTW.height = 10;
		var pTd1 = pTW.insertCell(0);
		pTd1.innerHTML = "线的宽度";
		pTd1.className = "leftBorder";
		var pTd2 = pTW.insertCell(1);
		pTd2.className = "rightBorder";
		pTd2.innerHTML = "<input size=10 value='" + g_current_editor.getWidth() + "' onpropertychange='g_current_editor.setWidth(this.value)' ></input>";
		iRowIndex++
	}
	if(g_current_editor.getOpacity) {
		var pTW = pTable.insertRow(iRowIndex);
		pTW.height = 10;
		var pTd1 = pTW.insertCell(0);
		pTd1.innerHTML = this.opacityName;
		pTd1.className = "leftBorder";
		var pTd2 = pTW.insertCell(1);
		pTd2.className = "rightBorder";
		pTd2.innerHTML = "<input size=10 value='" + g_current_editor.getOpacity() + "' onpropertychange='g_current_editor.setOpacity(this.value)' ></input><font color=red>0~1</font>";
		iRowIndex++
	}
	if(g_current_editor.getFillColor) {
		var pTW = pTable.insertRow(iRowIndex);
		pTW.height = 10;
		var pTd1 = pTW.insertCell(0);
		pTd1.innerHTML = "填充颜色";
		pTd1.className = "leftBorder";
		var pTd2 = pTW.insertCell(1);
		pTd2.className = "rightBorder";
		pTd2.innerHTML = "<input size=10 style='BACKGROUND:" + g_current_editor.getFillColor() + "' value='" + g_current_editor.getFillColor() + "' onpropertychange='g_current_editor.setFillColor(this.value)' onclick='EzColorPicker(this,this);'  ></input>";
		iRowIndex++
	}
	if(g_current_editor.getFillOpacity) {
		var pTW = pTable.insertRow(iRowIndex);
		pTW.height = 10;
		var pTd1 = pTW.insertCell(0);
		pTd1.innerHTML = "填充透明度";
		pTd1.className = "leftBorder";
		var pTd2 = pTW.insertCell(1);
		pTd2.className = "rightBorder";
		pTd2.innerHTML = "<input size=10 value='" + g_current_editor.getFillOpacity() + "'  onpropertychange='g_current_editor.setFillOpacity(this.value)'></input><font color=red>0~1</font>"
	}
	return pTable.outerHTML
};
iOverLay.prototype.createSelect = function(strStyle) {
	var pSelectEle = document.createElement("select");
	pSelectEle.onchange = "g_current_editor.setLineStyle(this.options[this.selectedIndex].value)";
	for(var i = 0; i < this.lineStyles.length; i++) {
		var pOption = document.createElement("option");
		pOption.innerHTML = this.lineStyleNames[i];
		pOption.value = this.lineStyles[i];
		if(strStyle == this.lineStyles[i]) {
			pOption.selected = true
		}
		pSelectEle.appendChild(pOption)
	}
	return pSelectEle
};
iOverLay.prototype.showEdit = function() {
	this.openInfoWindowHtml(this.toHTML())
};
iOverLay.prototype.getOpacity = function() {
	return this.opacity
};
iOverLay.prototype.enableEdit = function(callback) {
	this.editable = true;
	this.startMove(this.eventHandler("redraw"));
	this.addListener("contextmenu", this.eventHandler("showPropertyEdit"));
	this.edit_callback = callback
};
iOverLay.prototype.disableEdit = function(callback) {
	this.editable = false;
	this.stopMove();
	this.removeListener("contextmenu", this.eventHandler("showPropertyEdit"));
	if(callback) {
		callback()
	}
};
iOverLay.prototype.latlon2Meters = function(point) {
	var google = new Google();
	point = google.getEncryPoint(point.x, point.y);
	var mPoint = google.latlonToMeter(point.x, point.y);
	return mPoint
};
iOverLay.prototype.meters2latlon = function(point) {
	var google = new Google();
	var pPoint = google.meterTolatlon(point.x, point.y);
	pPoint = google.getDecryptPoint(pPoint.x, pPoint.y);
	return pPoint
};
iOverLay.prototype.pointsTometerPoints = function(points) {
	var meterPoints = [];
	var point = null;
	if(this instanceof Circle) {
		point = this.latlon2Meters(new Point(points[0], points[1]));
		var disPoint = this.latlon2Meters(new Point(points[0] + points[2], points[1]));
		var radius = Math.abs(disPoint.x - point.x);
		meterPoints = [point.x, point.y, radius]
	} else {
		for(var i = 0; i < points.length; i++) {
			point = this.latlon2Meters(points[i]);
			meterPoints.push(point)
		}
	}
	return meterPoints
};

function Rect(k, m) {
	this.width = k;
	this.height = m
}
Rect.prototype.toString = function() {
	return "(" + this.width + ", " + this.height + ")"
};
Rect.prototype.equals = function(aa) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(aa, "Rect")) {
			throw EzErrorFactory.createError("Rect::equals方法中arguments[0]参数类型不正确")
		}
		if(!aa) {
			return false
		}
		return this.width == aa.width && this.height == aa.height
	} catch(e) {
		throw EzErrorFactory.createError("Rect::equals方法执行不正确", e)
	}
};
Rect.prototype.approxEquals = function(aa) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(aa, "Rect")) {
			throw EzErrorFactory.createError("Rect::approxEquals方法中arguments[0]参数类型不正确")
		}
		if(!aa) {
			return false
		}
		return bRetComp(this.width, aa.width) && bRetComp(this.height, aa.height)
	} catch(e) {
		throw EzErrorFactory.createError("Rect::approxEquals方法执行不正确", e)
	}
};

function Polyline(points, color, weight, opacity, arrow, fillcolor) {
	try {
		if(typeof(points) == "undefined") {
			this.points = null;
			return
		}
		this.base = iOverLay;
		this.base();
		this.listener = false;
		this.multiPosi = [];
		this.elementObj = null;
		this.events = [];
		this.unit = "px";
		if(typeof color == "undefined" || color == null) {
			this.color = "#0000ff"
		} else {
			this.color = color
		}
		if(typeof fillcolor == "undefined" || fillcolor == null) {
			this.fillColor = "red"
		} else {
			this.fillColor = fillcolor
		}
		if(typeof weight == "undefined" || weight == null) {
			this.weight = 3
		} else {
			this.weight = weight
		}
		if(typeof opacity == "undefined" || opacity == null) {
			this.opacity = 0.45
		} else {
			this.opacity = opacity
		}
		this.div = null;
		this.filled = true;
		if(typeof arrow == "undefined") {
			this.arrow = 0
		} else {
			this.arrow = arrow
		}
		this.center = null;
		this.points = points;
		this.meterPoints = [];
		if(this.arrow == 0 || this.arrow == null) {
			this.points = points;
			this.arrowend = "none"
		}
		if(this.arrow == 1) {
			this.points = points;
			this.arrowend = "classic-wide-long"
		}
		if(this.arrow == -1) {
			this.arrowend = "classic-wide-long";
			if(typeof(points) == "string") {
				var temPoints = [];
				var temPoint = points.split(",");
				for(var i = temPoint.length; i > 0; i -= 2) {
					temPoints.push(temPoint[i - 2]);
					temPoints.push(temPoint[i - 1])
				}
				this.points = temPoints.toString();
				temPoints = [];
				temPoint = []
			}
			if(points instanceof Array) {
				var temPoints = [];
				for(var i = points.length; i > 0; i--) {
					tempPoints.push(points[i - 1])
				}
				this.points = temPoints
			}
		}
		this.name = "";
		this.opacityName = "线的透明色";
		this.colorName = "线的颜色";
		this.lineStyles = ["none", "dash", "dashdot", "dot", "longdash", "longdashdot", "shortdash", "shortdashdot", "shortdashdotdot", "longdashdotdot", "shortdot"];
		this.lineStyleNames = ["", "-", "-.", ". ", "--", "--.", "- ", "- .", "-..", "--..", "."];
		this.lineStyle = "none";
		this.printTag = {};
		this.setZIndex = function(iIndex) {
			try {
				if(!(EzServerClient.GlobeFunction.isTypeRight(iIndex, "int"))) {
					throw EzErrorFactory.createError("Polyline::setZIndex方法中arguments[0]类型不正确")
				}
				if(this.div != null) {
					this.div.style.zIndex = iIndex
				}
			} catch(e) {
				throw EzErrorFactory.createError("Polyline::setZIndex方法中不正确", e)
			}
		};
		this.getZIndex = function() {
			return this.div.style.zIndex
		};
		this.init()
	} catch(e) {
		throw EzErrorFactory.createError("Polyline构造方法执行不正确", e)
	}
}
Polyline.prototype = new iOverLay;
Polyline.prototype.trans2Points = function(vCoordSequence) {
	var uParts = [];
	if(vCoordSequence.indexOf(";") != -1) {
		uParts = vCoordSequence.split(";")
	} else {
		if(vCoordSequence.indexOf("|") != -1) {
			uParts = vCoordSequence.split("|")
		} else {
			uParts[0] = vCoordSequence
		}
	}
	var uPointList = [];
	var uCoordList = [];
	var uPoint = null;
	for(var i = 0; i < uParts.length; i++) {
		uCoordList = uParts[i].split(",");
		this.multiPosi.push(uCoordList.length / 2);
		for(var j = 0; j < uCoordList.length; j = j + 2) {
			uPoint = new Point(uCoordList[j], uCoordList[j + 1]);
			uPointList.push(uPoint)
		}
	}
	uCoordList = null;
	uPoint = null;
	uParts = null;
	return uPointList
};
Polyline.prototype.init = function() {
	this.coordSequence = "";
	if(this.points instanceof Array) {
		for(var i = 0; i < this.points.length; i++) {
			if(i == this.points.length - 1) {
				this.coordSequence += this.points[i].x + "," + this.points[i].y
			} else {
				this.coordSequence += this.points[i].x + "," + this.points[i].y + ","
			}
		}
	} else {
		if(typeof this.points == "string") {
			this.coordSequence = this.points;
			this.points = this.trans2Points(this.points)
		}
	}
	this.meterPoints = this.pointsTometerPoints(this.points);
	if(typeof this.points == "undefined") {
		this.points = null
	}
	if(typeof this.div == "undefined" || this.div == null) {
		this.div = document.createElement("div")
	}
};
Polyline.prototype.setPoints = function(strPoints) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(strPoints, "string")) && !(EzServerClient.GlobeFunction.isTypeRight(strPoints, "Array"))) {
			throw EzErrorFactory.createError("Polyline::setPoints方法中arguments[0]类型不正确")
		}
		if(this.multiPosi.length != 0) {
			this.multiPosi = []
		}
		if(typeof strPoints == "string") {
			this.points = this.trans2Points(strPoints)
		} else {
			if(strPoints instanceof Array) {
				this.points = strPoints
			} else {
				alert("传入参数有误,必须是点的线串或Point的数字类型");
				return
			}
		}
		this.meterPoints = this.pointsTometerPoints(this.points)
	} catch(e) {
		throw EzErrorFactory.createError("Polyline::setPoints方法不正确", e)
	}
};
Polyline.prototype.convert2WPoint = function(vCoordsPoints) {
	var pDivPoints = [];
	for(var e = 0; e < vCoordsPoints.length; e++) {
		var pPoint = vCoordsPoints[e];
		var pDivPoint = this.map.convert2WPoint(pPoint.x, pPoint.y);
		pDivPoints.push(pDivPoint)
	}
	return pDivPoints
};
Polyline.prototype.setPathStr = function(dDivPoints) {
	var pPoints = dDivPoints;
	var pathStr = "M" + pPoints[0].x + "," + pPoints[0].y;
	for(var i = 1; i < pPoints.length; i++) {
		pathStr += "L" + pPoints[i].x + "," + pPoints[i].y
	}
	return pathStr
};
Polyline.prototype.createDiv = function(pContainer) {
	if(typeof this.div == "undefined" || this.div == null) {
		this.div = document.createElement("div")
	}
	if(typeof pContainer != "undefined" && pContainer != null) {
		this.map = pContainer
	}
	this.div.strokeweight = this.weight;
	this.map.divPaint.appendChild(this.div);
	this.div.style.position = "absolute";
	this.div.style.id = "draw";
	this.div.style.zIndex = this.iZIndex - 50;
	if(this.coordSequence.length == 0) {
		return
	}
	this.redraw();
	var iLeft = parseInt(this.div.style.left);
	var iTop = parseInt(this.div.style.top);
	this.point = this.map.convert2LonLat(iLeft, iTop)
};
Polyline.prototype.redraw = function() {
	if(this.div == null) {
		return
	}
	if(this.coordSequence.length == 0) {
		return
	}
	if(this.points == null || this.points == "") {
		return
	}
	if(this.points.length == 0) {
		throw EzErrorFactory.createError("Polyline::redraw方法中this.Points不能为空")
	}
	var pDivPoints = null;
	if(this.map.bIsMercatorMap) {
		pDivPoints = this.convert2WPoint(this.meterPoints)
	} else {
		pDivPoints = this.convert2WPoint(this.points)
	}
	var par = this.getCStyle(pDivPoints);
	if(this.weight < 0) {
		this.weight = 1
	}
	this.div.style.width = convert2Px(par.cWidth + this.weight);
	this.div.style.height = convert2Px(par.cHeight + this.weight);
	this.div.style.left = convert2Px(Math.ceil(par.topLeft.x - this.weight / 2));
	this.div.style.top = convert2Px(Math.ceil(par.topLeft.y - this.weight / 2));
	this.div.id = new Date().getTime().valueOf();
	var tranPoints = pDivPoints;
	for(var i = 0; i < tranPoints.length; i++) {
		tranPoints[i].x = Math.ceil(tranPoints[i].x - par.topLeft.x + this.weight / 2);
		tranPoints[i].y = Math.ceil(tranPoints[i].y - par.topLeft.y + this.weight / 2)
	}
	var pathStr = this.setPathStr(tranPoints);
	if(this.paper == null) {
		this.paper = Raphael(this.div)
	} else {
		this.paper.remove();
		this.paper = Raphael(this.div)
	}
	if(this.opacity < 0) {
		this.opacity = 0
	}
	if(this.opacity > 1) {
		this.opacity = 1
	}
	this.printTag = {
		id: this.div.id,
		path: pathStr
	};
	this.elementObj = this.paper.path(pathStr).attr({
		stroke: this.color,
		"stroke-linecap": "round",
		"stroke-width": this.weight,
		opacity: this.opacity,
		"arrow-end": this.arrowend,
		"stroke-dasharray": this.dashStyle
	});
	var self = this;
	setTimeout(function() {
		self.addEventsToRaphael()
	}, 100);
	this.redrawSnap();
	setTimeout(function() {
		if(self.div.strokeweight != self.weight) {
			if(self.div.strokeweight < 0) {
				self.div.strokeweight = 1
			}
			self.weight = self.div.strokeweight;
			self.redraw();
			return
		}
	}, 100)
};
Polyline.prototype.addEventsToRaphael = function() {
	var that = this;
	for(var i = 0; i < this.events.length; i++) {
		var type = null;
		var callback;
		(function() {
			var func = that.events[i].handler;
			type = that.events[i].eventType;
			var par = that.events[i].pars;
			callback = function(e) {
				if(typeof(par) == "undefined") {
					func(e)
				} else {
					func(par)
				}
			}
		})();
		eval("this.elementObj." + type + "(callback)")
	}
};
Polyline.prototype.compare = function(value1, value2) {
	if(value1 < value2) {
		return -1
	} else {
		if(value1 > value2) {
			return 1
		} else {
			return 0
		}
	}
};
Polyline.prototype.getCStyle = function(Points) {
	var xPoints = [];
	var yPoints = [];
	for(var i = 0; i < Points.length; i++) {
		xPoints.push(Points[i].x);
		yPoints.push(Points[i].y)
	}
	xPoints = xPoints.sort(this.compare);
	yPoints = yPoints.sort(this.compare);
	var minPoint = new Point(xPoints[0], yPoints[0]);
	var maxxPoint = new Point(xPoints[xPoints.length - 1], yPoints[yPoints.length - 1]);
	var width = maxxPoint.x - minPoint.x;
	var height = maxxPoint.y - minPoint.y;
	return {
		topLeft: minPoint,
		cWidth: width,
		cHeight: height,
		minPoint: minPoint,
		maxPoint: maxxPoint
	}
};
Polyline.prototype.addListener = function(action, func, pars) {
	this.div.style.cursor = "Pointer";
	if(action == "contextmenu") {
		BindingEvent(this.div, action, func)
	} else {
		if(action == "click") {
			this.onclickHandler = func
		}
		var eventHandlers = {};
		eventHandlers.eventType = action;
		eventHandlers.handler = func;
		eventHandlers.pars = pars;
		this.eventHandlers = eventHandlers;
		this.events.push(eventHandlers)
	}
	var that = this;
	this.setTimeout("this.addEventsToRaphael()", 100)
};
Polyline.prototype.onclick = function() {
	if(typeof(this.onclickHandler) != "undefined") {
		var that = this;
		var tempFunc = that.onclickHandler;
		tempFunc()
	}
	this.flash()
};
Polyline.prototype.openInfoWindowHtml = function(html, bIsInScreen) {
	try {
		this.map.blowupOverlay(this);
		if(this.center == null) {
			var iIndex = Math.floor(this.points.length / 2);
			this.map.openInfoWindow(this.points[iIndex].x, this.points[iIndex].y, html, bIsInScreen)
		} else {
			this.map.openInfoWindow(this.center.x, this.center.y, html, bIsInScreen)
		}
	} catch(e) {
		throw EzErrorFactory.createError("Polyline::openInfoWindowHtml方法中不正确", e)
	}
};
Polyline.prototype.closeInfoWindowHtml = function() {
	this.map.closeInfoWindow()
};
Polyline.prototype.display = function(a) {
	if(a) {
		this.drawElement.style.display = ""
	} else {
		this.drawElement.style.display = "none"
	}
};
Polyline.prototype.removeFromDiv = function() {
	this.pause();
	this.map.divPaint.removeChild(this.div);
	EventManager.removeNode(this.div);
	this.deleteSnap()
};
Polyline.prototype.getPx = function(dSrc) {
	var iLineWidth = dSrc;
	if((_MapSpanScale == 1 && this.unit == "degree") || (_MapSpanScale == 1 && this.unit == "meter") || (_MapSpanScale != 1 && this.unit == "meter")) {
		var dUnit = iLineWidth;
		if(_MapSpanScale == 1 && this.unit == "degree") {
			dUnit = dUnit * 3600 / 0.03
		}
		iLineWidth = this.map.getPxOfDist(dUnit)
	}
	return iLineWidth
};
Polyline.prototype.getScalePath = function(pPaths, dScale) {
	var pResultPaths = new Array();
	var pMBR = this.getMBR();
	var pCenterPoint = pMBR.centerPoint();
	for(var iIndex = 0; iIndex < pPaths.length; iIndex++) {
		var pTmpPoint = pPaths[iIndex];
		var dX = pCenterPoint.x + (pTmpPoint.x - pCenterPoint.x) * dScale;
		var dY = pCenterPoint.y + (pTmpPoint.y - pCenterPoint.y) * dScale;
		var pPoint = new Point(dX, dY);
		pResultPaths.push(pPoint)
	}
	return pResultPaths
};
Polyline.prototype.getVectorPath = function(pPaths) {
	var b = new Array();
	if(typeof pPaths == "undefined") {
		pPaths = this.points
	}
	for(var e = 0; e < pPaths.length; e++) {
		var pPoint = pPaths[e];
		var pPointDiv = this.map.convert2WPoint(pPoint.x, pPoint.y);
		if(typeof pPoint.partStartFlag != "undefined" && e != pPaths.length - 1 || e == 0) {
			b.push("x");
			b.push("m");
			b.push(pPointDiv.x);
			b.push(pPointDiv.y);
			b.push("l")
		}
		b.push(pPointDiv.x);
		b.push(pPointDiv.y)
	}
	b.push("e");
	var strPath = b.join(" ");
	return strPath
};
Polyline.prototype.getPoints = function() {
	return this.points
};
Polyline.prototype.getLength = function() {
	var dLen = CalculateLength(this.getPoints());
	dLen = Math.floor(dLen);
	return dLen
};
Polyline.prototype.getArea = function() {
	var dArea = CalculateArea(this.getPoints());
	dArea = Math.floor(dArea);
	return dArea
};
Polyline.prototype.getMBR = function() {
	var pPoint = this.points[0];
	var pMBR = new MBR(pPoint.x, pPoint.y, pPoint.x, pPoint.y);
	for(var iIndex = 0; iIndex < this.points.length; iIndex++) {
		var pTmpPoint = this.points[iIndex];
		pMBR.extend(pTmpPoint)
	}
	return pMBR
};
Polyline.prototype.setColor = function(arg) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(arg, "string"))) {
			throw EzErrorFactory.createError("Polyline::setColor方法中arguments[0]类型不正确")
		}
		this.color = arg
	} catch(e) {
		throw EzErrorFactory.createError("Polyline::setColor方法中不正确", e)
	}
};
Polyline.prototype.getColor = function() {
	return this.color
};
Polyline.prototype.setWidth = function(arg) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(arg, "int"))) {
			throw EzErrorFactory.createError("Polyline::setWidth方法中arguments[0]类型不正确")
		}
		if(typeof arg == "string") {
			this.weight = parseFloat(arg);
			if(arg.indexOf("degree") != -1) {
				this.unit = "degree"
			} else {
				if(arg.indexOf("meter") != -1) {
					this.unit = "meter"
				} else {
					this.unit = "px"
				}
			}
			this.redraw()
		} else {
			this.weight = arg;
			this.redraw()
		}
	} catch(e) {
		throw EzErrorFactory.createError("Polyline::setWidth方法中不正确", e)
	}
};
Polyline.prototype.getWidth = function() {
	return this.weight
};
Polyline.prototype.setOpacity = function(arg) {
	try {
		this.opacity = arg
	} catch(e) {}
};
Polyline.prototype.getOpacity = function() {
	return this.opacity
};
Polyline.prototype.setLineStyle = function(arg) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(arg, "string"))) {
			throw EzErrorFactory.createError("Polyline::setLineStyle方法中arguments[0]类型不正确")
		}
		this.setDashStyle(arg)
	} catch(e) {
		throw EzErrorFactory.createError("Polyline::setLineStyle方法中不正确", e)
	}
};
Polyline.prototype.getLineStyle = function() {
	return this.lineStyle
};
Polyline.prototype.setDashStyle = function(arg) {
	var num = null;
	for(var i = 0; i < this.lineStyles.length; i++) {
		if(arg == this.lineStyles[i]) {
			num = i;
			this.lineStyle = arg;
			this.dashStyle = this.lineStyleNames[i];
			return
		}
	}
	this.dashStyle = "";
	var strStyle = this.lineStyles.join(",");
	alert("参数必须是:[" + strStyle + "]中的值！")
};
Polyline.prototype.refreshNodeSnap = function() {
	g_current_editor = this;
	var iPos = this.markers.indexOf(_CurentOverLay);
	var iMo = iPos % 2;
	if(iMo == 0) {
		if(iPos > 0) {
			var pMarker = this.markers[iPos - 1];
			var pPoint = this.markers[iPos - 2].point.getCenter(this.markers[iPos].point);
			pMarker.setPoint(pPoint)
		}
		if(iPos < this.markers.length - 2) {
			var pMarker = this.markers[iPos + 1];
			var pPoint = this.markers[iPos + 2].point.getCenter(this.markers[iPos].point);
			pMarker.setPoint(pPoint)
		}
	} else {
		for(i = iPos; i < this.markers.length; i++) {
			var pMarker = this.markers[i];
			var iMo = i % 2;
			if(iMo == 1 && (pMarker.bIsNode == true)) {
				var pFirstMarker = this.markers[i - 1];
				var pPoint = new Point((pMarker.point.x + pFirstMarker.point.x) / 2, (pMarker.point.y + pFirstMarker.point.y) / 2);
				var pMidMarker = this.createSnap(pPoint, false);
				pMidMarker.show();
				this.markers = this.markers.insert(i, pMidMarker)
			}
		}
	}
};
Polyline.prototype.createNodeSnap = function() {
	for(i = 0; i < this.points.length; i++) {
		this.markers.push(this.createSnap(this.points[i], true));
		if(i < this.points.length - 1) {
			var pMiddlePoint = new Point((this.points[i].x + this.points[i + 1].x) / 2, (this.points[i].y + this.points[i + 1].y) / 2);
			var pMarker = this.createSnap(pMiddlePoint, false);
			this.markers.push(pMarker)
		}
	}
};
Polyline.prototype.enableEdit = function(callback) {
	if(this.editable) {
		return
	}
	this.editable = true;
	this.markers = new Array();
	this.createNodeSnap();
	this.showSnapTimeout = null;
	this.snap_hovering = false;
	this.addListener("mouseover", this.eventHandler("showSnap"));
	this.addListener("mouseout", this.eventHandler("hideSnap"));
	this.addListener("contextmenu", this.eventHandler("showPropertyEdit"));
	this.edit_callback = callback
};
Polyline.prototype.disableEdit = function(callback) {
	if(!this.editable) {
		return
	}
	this.editable = false;
	this.deleteSnap();
	this.removeListener("mouseover", this.eventHandler("showSnap"));
	this.removeListener("mouseout", this.eventHandler("hideSnap"));
	this.removeListener("contextmenu", this.eventHandler("showPropertyEdit"));
	this.edit_callback = null;
	if(callback) {
		callback()
	}
};
g_Node_iIndex = 0;
Polyline.prototype.createSnap = function(pPoint, bIsNode) {
	var pIcon = new Icon();
	if(bIsNode) {
		pIcon.image = null
	} else {
		pIcon.image = null
	}
	pIcon.height = 12;
	pIcon.width = 12;
	pIcon.topOffset = 0;
	pIcon.leftOffset = 0;
	var marker = new Marker(pPoint, pIcon);
	marker.nodeIndex = g_Node_iIndex++;
	marker.createDiv(this.map);
	marker.hide();
	marker.setNode(bIsNode);
	marker.startMove(this.eventHandler("updateSnap"));
	marker.addListener("mouseover", this.eventHandler("snap_hovering_true"));
	marker.addListener("mouseout", this.eventHandler("snap_hovering_false"));
	return marker
};
Polyline.prototype.snap_hovering_true = function() {
	this.snap_hovering = true
};
Polyline.prototype.snap_hovering_false = function() {
	this.snap_hovering = false
};
Polyline.prototype.updateSnap = function() {
	this.points.clear();
	for(i = 0; i < this.markers.length; i++) {
		if(this.markers[i].div != null && this.markers[i].bIsNode) {
			this.points.push(this.markers[i].point)
		}
	}
	this.redraw();
	this.setTimeout("this.refreshNodeSnap()", 10)
};
g_snap_show = false;
Polyline.prototype.delayShowSnap = function() {
	if(g_snap_show) {
		return
	}
	for(i = 0; i < this.markers.length; i++) {
		this.markers[i].show()
	}
	g_snap_show = true
};
Polyline.prototype.delayHideSnap = function() {
	if(this.snap_hovering || !g_snap_show) {
		return
	}
	for(i = 0; i < this.markers.length; i++) {
		this.markers[i].hide()
	}
	g_snap_show = false
};
Polyline.prototype.showSnap = function() {
	if(this.showSnapTimeout != null) {
		window.clearTimeout(this.showSnapTimeout);
		this.showSnapTimeout = null
	}
	this.showSnapTimeout = this.setTimeout("this.delayShowSnap()", 300)
};
Polyline.prototype.hideSnap = function() {
	if(this.showSnapTimeout != null) {
		window.clearTimeout(this.showSnapTimeout);
		this.showSnapTimeout = null
	}
	this.panTimeout = this.setTimeout("this.delayHideSnap()", 300)
};
Polyline.prototype.deleteSnap = function() {
	if(!this.markers) {
		return
	}
	for(i = 0; i < this.markers.length; i++) {
		var marker = this.markers[i];
		marker.removeFromDiv()
	}
	this.markers.clear()
};
Polyline.prototype.redrawSnap = function() {
	if(!this.markers) {
		return
	}
	for(i = 0; i < this.markers.length; i++) {
		var marker = this.markers[i];
		marker.redraw()
	}
};
Polyline.prototype.getCoordSequence = function() {
	return this.coordSequence
};
Polyline.prototype.getGeometryType = function() {
	return "polyline"
};

function Polygon(points, color, weight, opacity, fillcolor, title) {
	this.base = Polyline;
	this.base(points, color, weight, opacity, null, fillcolor);
	this.scale = 1;
	if(parseFloat(this.opacity) > 1) {
		this.fillOpacity = 1
	} else {
		if(parseFloat(this.opacity) < 0) {
			this.fillOpacity = 0
		} else {
			this.fillOpacity = parseFloat(this.opacity)
		}
	}
	if(typeof(title) == "undefined") {
		this.title = null
	} else {
		this.title = title
	}
	this.borderOpacity = this.fillOpacity
}
Polygon.prototype = new Polyline;
Polygon.prototype.redraw = function() {
	if(this.div == null) {
		return
	}
	if(this.coordSequence.length == 0) {
		return
	}
	if(this.points == null || this.points == "") {
		return
	}
	if(this.points.length == 0) {
		throw EzErrorFactory.createError("Polygon::redraw方法中this.Points不能为空")
	}
	if(this.map.bIsMercatorMap) {
		pDivPoints = this.convert2WPoint(this.meterPoints)
	} else {
		pDivPoints = this.convert2WPoint(this.points)
	}
	var par = this.getCStyle(pDivPoints);
	if(this.weight < 0) {
		this.weight = 1
	}
	this.div.style.width = convert2Px(parseInt(par.cWidth) + parseInt(2 * this.weight));
	this.div.style.height = convert2Px(parseInt(par.cHeight) + parseInt(2 * this.weight));
	this.div.style.left = convert2Px(par.topLeft.x - parseInt(this.weight / 2));
	this.div.style.top = convert2Px(par.topLeft.y - parseInt(this.weight / 2));
	this.div.id = new Date().getTime().valueOf();
	var tranPoints = pDivPoints;
	for(var i = 0; i < tranPoints.length; i++) {
		tranPoints[i].x = tranPoints[i].x - par.topLeft.x + parseInt(this.weight / 2);
		tranPoints[i].y = tranPoints[i].y - par.topLeft.y + parseInt(this.weight / 2)
	}
	if(this.scale == 1 && this.elementObj == null) {} else {}
	var pathStr = this.setPathStr(tranPoints);
	this.printTag = {
		id: this.div.id,
		path: pathStr
	};
	if(this.paper == null) {
		this.paper = Raphael(this.div)
	} else {
		this.paper.remove();
		this.paper = Raphael(this.div)
	}
	if(typeof(this.div.filled) != "undefined") {
		if(this.div.filled == false) {
			this.fillOpacity = 0
		}
	}
	this.elementObj = this.paper.path(pathStr).attr({
		fill: this.fillColor,
		stroke: this.color,
		"stroke-width": this.weight,
		"stroke-opacity": this.borderOpacity,
		"fill-opacity": this.fillOpacity,
		"stroke-dasharray": this.dashStyle
	});
	if(this.title != null) {
		try {
			if(this.scale >= 3) {
				this.scale = 3
			}
			if(this.scale <= 1) {
				this.scale = 1
			}
		} catch(e) {}
	}
	var self = this;
	this.setTimeout("this.addEventsToRaphael()", 100);
	this.redrawSnap();
	setTimeout(function() {
		if(self.div.strokeweight != self.weight) {
			if(self.div.strokeweight < 0) {
				self.div.strokeweight = 1
			}
			self.weight = self.div.strokeweight;
			self.redraw();
			return
		}
	}, 100)
};
Polygon.prototype.setPathStr = function(dDivPoints) {
	if(dDivPoints.length == 1 || dDivPoints.length == 0) {
		return
	}
	var cpoints = dDivPoints;
	if(dDivPoints.length == 2) {
		dDivPoints.push(dDivPoints[0])
	}
	var pathStr = "";
	var posi = 0;
	if(this.multiPosi.length == 0 || this.multiPosi.length == 1) {
		pathStr = "M" + cpoints[0].x + " " + cpoints[0].y;
		for(var i = 1; i < cpoints.length; i++) {
			pathStr += "L" + cpoints[i].x + " " + cpoints[i].y
		}
		pathStr += "Z"
	} else {
		for(var i = 0; i < this.multiPosi.length; i++) {
			pathStr += "M" + cpoints[posi].x + " " + cpoints[posi].y;
			for(var j = 1; j < this.multiPosi[i]; j++) {
				pathStr += "L" + cpoints[posi + j].x + " " + cpoints[posi + j].y
			}
			pathStr += "Z";
			posi += this.multiPosi[i]
		}
	}
	return pathStr
};
Polygon.prototype.setFillOpacity = function(arg) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(arg, "float"))) {
			throw EzErrorFactory.createError("Polygon::setFillOpacity方法中arguments[0]类型不正确")
		}
		try {
			this.fillOpacity = arg
		} catch(e) {}
	} catch(e) {
		throw EzErrorFactory.createError("Polygon::setFillOpacity方法中不正确", e)
	}
};
Polygon.prototype.getFillOpacity = function() {
	return parseFloat(1 - this.fillOpacity).toFixed(2)
};
Polygon.prototype.setFillColor = function(arg) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(arg, "string"))) {
			throw EzErrorFactory.createError("Polygon::setFillColor方法中arguments[0]类型不正确")
		}
		this.fillColor = arg
	} catch(e) {
		throw EzErrorFactory.createError("Polygon::setFillColor方法中不正确", e)
	}
};
Polygon.prototype.getFillColor = function() {
	return this.fillColor
};
Polygon.prototype.updateSnap = function() {
	this.points.clear();
	for(i = 0; i < this.markers.length; i++) {
		if(this.markers[i].div != null && this.markers[i].bIsNode) {
			this.points.push(this.markers[i].point)
		}
	}
	this.points.push(this.markers[0].point);
	this.redraw();
	this.setTimeout("this.refreshNodeSnap()", 10)
};
Polygon.prototype.getGeometryType = function() {
	return "polygon"
};
Polygon.prototype.closeInfoWindowHtml = function() {
	this.map.closeInfoWindow()
};

function Circle(points, color, weight, opcacity, fillcolor) {
	this.base = Polygon;
	this.base(points, color, weight, opcacity, fillcolor);
	this.radiusUnit = "";
	this.meterRadius = null
}
Circle.prototype = new Polygon;
Circle.prototype.trans2Points = function(a) {
	var pArray = a.split(",");
	for(var iIndex = 0; iIndex < pArray.length; iIndex++) {
		pArray[iIndex] = parseFloat(pArray[iIndex])
	}
	this.center = new Point(pArray[0], pArray[1]);
	this.radius = pArray[2];
	return pArray
};
Circle.prototype.setRadius = function(strInRadius) {
	var strRadius = this.toLocalUnit(strInRadius);
	this.radius = parseFloat(strRadius);
	this.redraw();
	if(this.markers != null && this.markers.length > 0) {
		var pMarker = this.markers[1];
		var pPoint = new Point(this.center.x, this.center.y + this.radius);
		pMarker.setPoint(pPoint)
	}
};
Circle.prototype.getMeter = function(str) {
	var strSpan = str;
	var strUnit = this.getLocalUnit();
	if(strUnit.indexOf("degree") != -1) {
		strSpan = parseFloat(str) * 3600 / 0.03
	}
	return strSpan
};
Circle.prototype.getRadiusPx = function(dSrc) {
	var iLineWidth = dSrc;
	if(this.radiusUnit != "px") {
		if(_MapSpanScale == 1 || this.editable == true) {
			dUnit = this.toLocalUnit(dSrc);
			var pDiv1Point = this.map.convert2WPoint(this.center.x, this.center.y);
			var pDiv2Point = this.map.convert2WPoint(this.center.x + dUnit, this.center.y);
			iLineWidth = (pDiv2Point.x - pDiv1Point.x)
		} else {
			iLineWidth = this.getMeter(dSrc);
			iLineWidth = this.map.getPxOfDist(iLineWidth)
		}
	}
	return iLineWidth
};
Circle.prototype.redraw = function() {
	var dRadius, pDivCenterPoint;
	if(this.map.bIsMercatorMap) {
		this.center = new Point(this.meterPoints[0], this.meterPoints[1]);
		this.meterRadius = this.meterPoints[2];
		dRadius = this.meterRadius * this.dScale;
		pDivCenterPoint = this.map.convert2WPoint(this.center.x, this.center.y)
	} else {
		this.center = new Point(this.points[0], this.points[1]);
		this.radius = this.points[2];
		dRadius = this.radius * this.dScale;
		pDivCenterPoint = this.map.convert2WPoint(this.center.x, this.center.y)
	}
	dRadius = this.getRadiusPx(dRadius);
	var lineWidth = parseInt(this.weight);
	var cWidth = (parseInt(dRadius) + parseInt(this.weight)) * 2;
	this.div.style.width = cWidth + "px";
	this.div.style.height = cWidth + "px";
	var left = pDivCenterPoint.x - dRadius;
	var top = pDivCenterPoint.y - dRadius;
	this.div.style.left = (left - lineWidth / 2) + "px";
	this.div.style.top = (top - lineWidth / 2) + "px";
	if(this.paper == null) {
		this.paper = Raphael(this.div)
	} else {
		this.paper.remove();
		this.paper = Raphael(this.div)
	}
	var self = this;
	this.elementObj = this.paper.circle(dRadius + lineWidth / 2, dRadius + lineWidth / 2, dRadius).attr({
		fill: self.fillColor,
		stroke: self.color,
		"stroke-opacity": self.opacity,
		"stroke-width": self.weight,
		opacity: self.opacity,
		"stroke-dasharray": self.dashStyle
	});
	setTimeout(function() {
		self.addEventsToRaphael()
	}, 100);
	this.redrawSnap()
};
Circle.prototype.toString = function() {
	var strPoint = this.center.toString() + "," + this.radius;
	return strPoint
};
Circle.prototype.getCenter = function() {
	if(this.map.bIsMercatorMap) {
		var center = this.meters2latlon(this.center);
		return center
	} else {
		return this.center
	}
};
Circle.prototype.getRadius = function() {
	if(this.map.bIsMercatorMap) {
		return this.meterRadius
	} else {
		return this.radius
	}
};
Circle.prototype.getPoints = function() {
	var pPoints = new Array();
	for(var iIndex = 0; iIndex <= 36; iIndex++) {
		var dArc = _C_P * 10 * iIndex;
		var xOffset = this.radius * Math.cos(dArc);
		var yOffset = this.radius * Math.sin(dArc);
		var pPoint = new Point(this.center.x + xOffset, this.center.y + yOffset);
		pPoints.push(pPoint)
	}
	return pPoints
};
Circle.prototype.getRadiusLength = function() {
	var xOffset = this.radius;
	var pPoint = new Point(this.center.x + xOffset, this.center.y);
	var dRadius = GetDistanceInLL(this.center, pPoint);
	dRadius = Math.floor(dRadius);
	return dRadius
};
Circle.prototype.refreshNodeSnap = function() {
	this.center.x = this.markers[0].point.x;
	this.center.y = this.markers[0].point.y;
	var pX2 = (this.markers[0].point.x - this.markers[1].point.x);
	var pY2 = (this.markers[0].point.y - this.markers[1].point.y);
	this.radius = Math.sqrt(pX2 * pX2 + pY2 * pY2);
	this.radiusUnit = this.getLocalUnit();
	this.redraw()
};
Circle.prototype.updateSnap = function() {
	this.refreshNodeSnap()
};
Circle.prototype.createNodeSnap = function() {
	this.markers.push(this.createSnap(this.center, true));
	var pPoint = new Point(this.center.x + this.radius, this.center.y);
	this.markers.push(this.createSnap(pPoint, true));
	this.redraw()
};
Circle.prototype.getGeometryType = function() {
	return "circle"
};
Circle.prototype.getMBR = function() {
	try {
		return new MBR(this.center.x - this.radius, this.center.y - this.radius, this.center.x + this.radius, this.center.y + this.radius)
	} catch(e) {
		throw EzErrorFactory.createError("Circle::getMBR方法中不正确", e)
	}
};

function Marker(pPoint, pIcon, pTitle) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(pPoint, "Point")) {
			throw EzErrorFactory.createError("Marker构造方法中arguments[0]参数类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(pIcon, "Icon")) {
			throw EzErrorFactory.createError("Marker构造方法中arguments[1]参数类型不正确")
		}
		this.base = iOverLay;
		this.base();
		this.point = pPoint;
		this.meterPoint = this.latlon2Meters(pPoint);
		this.icon = pIcon;
		this.div = null;
		this.title = pTitle;
		this.init();
		this.name = "";
		this.opacityName = "图标透明色"
	} catch(e) {
		throw EzErrorFactory.createError("Marker构造方法执行不正确", e)
	}
}
Marker.prototype = new iOverLay;
Marker.prototype.init = function() {
	if(this.icon.image != null) {
		this.div = document.createElement("img");
		this.div.galleryimg = "no";
		this.div.src = this.icon.image
	} else {
		this.div = document.createElement("div");
		this.div.style.border = "2px solid red";
		this.div.style.fontSize = "1px"
	}
	this.div.style.position = "absolute";
	this.div.style.zIndex = this.iZIndex + 10;
	this.div.style.display = "";
	if(!isNaN(this.icon.height) && !isNaN(this.icon.width)) {
		this.div.style.height = convert2Px(this.icon.height);
		this.div.style.width = convert2Px(this.icon.width)
	}
	this.titleDiv = this.createTitleDiv()
};
Marker.prototype.createTitleDiv = function() {
	if(typeof this.title == "undefined" || this.title == null) {
		return null
	}
	var pTitleDiv = this.title.createTitleDiv();
	return pTitleDiv
};
Marker.prototype.setZIndex = function(iIndex) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(iIndex, "int"))) {
			throw EzErrorFactory.createError("Marker::setZIndex方法中arguments[0]类型不正确")
		}
		if(this.div != null) {
			this.div.style.zIndex = iIndex
		}
		if(this.titleDiv != null) {
			this.titleDiv.style.zIndex = iIndex
		}
	} catch(e) {
		throw EzErrorFactory.createError("Polyline::setZIndex方法中不正确", e)
	}
};
Marker.prototype.showTitle = function() {
	if(this.titleDiv && this.div.style.display == "") {
		this.titleDiv.style.display = ""
	}
};
Marker.prototype.hideTitle = function() {
	if(this.titleDiv) {
		this.titleDiv.style.display = "none"
	}
};
Marker.prototype.createDiv = function(pContainer) {
	if(typeof pContainer != "undefined" && pContainer != null) {
		this.map = pContainer
	}
	pContainer.divPaint.appendChild(this.div);
	if(this.titleDiv != null) {
		pContainer.divPaint.appendChild(this.titleDiv)
	}
	this.redraw()
};
Marker.prototype.redraw = function(bIsTrue) {
	if(this.map.bIsMercatorMap) {
		var pDivPoint = this.map.convert2WPoint(this.meterPoint.x, this.meterPoint.y)
	} else {
		var pDivPoint = this.map.convert2WPoint(this.point.x, this.point.y)
	}
	var iLeftOffset = 0;
	var iTopOffset = 0;
	var iWidth = 0;
	try {
		iWidth = this.dScale * this.icon.width;
		var iHeight = this.dScale * this.icon.height;
		iLeftOffset = this.dScale * this.icon.leftOffset;
		iTopOffset = this.dScale * this.icon.topOffset;
		this.div.style.left = convert2Px(pDivPoint.x + iLeftOffset - iWidth / 2);
		this.div.style.top = convert2Px(pDivPoint.y + iTopOffset - iHeight / 2);
		this.div.style.width = convert2Px(iWidth);
		this.div.style.height = convert2Px(iHeight)
	} catch(e) {
		alert("redraw:" + e.message);
		alert("坐标信息如:" + this.point.toString() + ":" + pDivPoint.toString())
	}
	if(this.titleDiv != null) {
		var iLeft;
		var iTop;
		var iWidth = this.title.fontSize * StrLength(this.title.name) / 2;
		iWidth = iWidth * this.dScale;
		var iFontSize = this.title.fontSize * this.dScale;
		this.titleDiv.style.fontSize = convert2Px(iFontSize);
		if(this.title.pos == 0) {
			iLeft = pDivPoint.x;
			iTop = pDivPoint.y - iFontSize - parseInt(this.div.style.height) / 2 + 4
		} else {
			if(this.title.pos == 1) {
				iLeft = pDivPoint.x + parseInt(this.div.style.width) / 2;
				iTop = pDivPoint.y - iFontSize - parseInt(this.div.style.height) / 2
			} else {
				if(this.title.pos == 2) {
					iLeft = pDivPoint.x + parseInt(this.div.style.width) / 2;
					iTop = pDivPoint.y - iFontSize / 2
				} else {
					if(this.title.pos == 3) {
						iLeft = pDivPoint.x + parseInt(this.div.style.width) / 2;
						iTop = pDivPoint.y + 4 + parseInt(this.div.style.height) / 2
					} else {
						if(this.title.pos == 4) {
							iLeft = pDivPoint.x;
							iTop = pDivPoint.y + 4 + parseInt(this.div.style.height) / 2
						} else {
							if(this.title.pos == 5) {
								iLeft = pDivPoint.x - iWidth / 2;
								iTop = pDivPoint.y + 4 + parseInt(this.div.style.height) / 2
							} else {
								if(this.title.pos == 6) {
									iLeft = pDivPoint.x - iWidth;
									iTop = pDivPoint.y - iFontSize / 2
								} else {
									iLeft = pDivPoint.x - iWidth / 2;
									iTop = pDivPoint.y - 4 - iFontSize - parseInt(this.div.style.height) / 2
								}
							}
						}
					}
				}
			}
		}
		iLeft = iLeft + iLeftOffset;
		iTop = iTop + iTopOffset;
		this.titleDiv.style.top = convert2Px(iTop);
		this.titleDiv.style.left = convert2Px(iLeft);
		if(this.bIsTransparent) {
			this.titleDiv.style.width = convert2Px(iWidth + this.title.fontSize)
		}
	}
};
Marker.prototype.removeFromDiv = function() {
	if(!this.div) {
		return
	}
	this.pause();
	if(this.map) {
		this.map.divPaint.removeChild(this.div);
		EventManager.removeNode(this.div);
		if(this.titleDiv != null) {
			this.map.divPaint.removeChild(this.titleDiv);
			EventManager.removeNode(this.titleDiv)
		}
	}
};
Marker.prototype.openInfoWindowHtml = function(html, bIsInScreen) {
	try {
		this.map.blowupOverlay(this);
		if(this.map.bIsMercatorMap) {
			this.map.openInfoWindow(this.meterPoint.x, this.meterPoint.y, html, bIsInScreen)
		} else {
			this.map.openInfoWindow(this.point.x, this.point.y, html, bIsInScreen)
		}
	} catch(e) {
		throw EzErrorFactory.createError("Marker::openInfoWindowHtml方法中不正确", e)
	}
};
Marker.prototype.closeInfoWindowHtml = function() {
	this.map.closeInfoWindow()
};
Marker.prototype.setOpacity = function(arg) {
	this.opacity = arg;
	if(this.div) {
		this.div.style.filter = "ALPHA(opacity=" + this.opacity * 100 + ")"
	}
	if(this.titleDiv) {
		this.titleDiv.style.filter = "ALPHA(opacity=" + this.opacity * 100 + ")"
	}
};
HTMLElementOverLay = function(id, LeftTopMapPoint, strHTML) {
	iOverLay.call(this);
	this.point = LeftTopMapPoint;
	this.id = id;
	this.div = window.document.createElement("div");
	this.div.innerHTML = strHTML;
	this.div.id = this.id;
	this.div.style.zIndex = 10001
};
HTMLElementOverLay.prototype = new iOverLay;
HTMLElementOverLay.prototype.setZIndex = function(vZIndex) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(vZIndex, "int"))) {
			throw EzErrorFactory.createError("HTMLElementOverLay::setZIndex方法中arguments[0]类型不正确")
		}
		this.div.style.zIndex = vZIndex
	} catch(e) {
		throw EzErrorFactory.createError("HTMLElementOverLay::setZIndex方法中不正确", e)
	}
};
HTMLElementOverLay.prototype.getZIndex = function() {
	return this.div.style.zIndex
};
HTMLElementOverLay.prototype.createDiv = function(pContainer) {
	if(typeof pContainer != "undefined" && pContainer != null) {
		this.map = pContainer
	}
	pContainer.divPaint.appendChild(this.div);
	this.redraw()
};
HTMLElementOverLay.prototype.redraw = function() {
	var pDivPoint = this.map.convert2WPoint(this.point.x, this.point.y);
	this.div.style.position = "absolute";
	this.div.style.left = pDivPoint.x + "px";
	this.div.style.top = pDivPoint.y + "px"
};
HTMLElementOverLay.prototype.removeFromDiv = function() {
	if(!this.div) {
		return
	}
	this.pause();
	if(this.map) {
		this.map.divPaint.removeChild(this.div);
		EventManager.removeNode(this.div)
	}
};

function MultiFeat(strPath, color, weight, opacity, fillcolor) {
	this.base = iOverLay;
	this.base();
	this.filled = true;
	this.fillColor = fillcolor || "blue";
	this.lineColor = color || "red";
	this.lineWidth = weight || 2;
	this.opacity = opacity || 1;
	this.feats = new Array();
	this.paths = Trim(strPath)
}
MultiFeat.prototype = new iOverLay;
MultiFeat.prototype.createDiv = function(pContainer) {
	if(typeof pContainer != "undefined" && pContainer != null) {
		this.map = pContainer
	}
	var pBorderArray = this.paths.split(";");
	for(var iIndex = 0; iIndex < pBorderArray.length; iIndex++) {
		var strLonLatPath = pBorderArray[iIndex];
		var pObject = null;
		if(this.filled) {
			if(strLonLatPath.length == 3) {
				pObject = Circle
			} else {
				if(strLonLatPath.length == 4) {
					pObject = Rectangle
				} else {
					if(strLonLatPath.length >= 6) {
						pObject = Polygon
					}
				}
			}
		} else {
			pObject = Polyline
		}
		var pFeat = new pObject(strLonLatPath, this.lineColor, this.lineWidth, this.opcacity, this.fillColor);
		pFeat.createDiv(this.map);
		this.feats.push(pFeat)
	}
	this.redraw()
};
MultiFeat.prototype.getMBR = function() {
	var pMBR = null;
	for(var iIndex = 0; iIndex < this.feats.length; iIndex++) {
		var pFeat = this.feats[iIndex];
		if(pMBR == null) {
			pMBR = pFeat.getMBR()
		} else {
			pMBR = MBR.union(pMBR, pFeat.getMBR())
		}
	}
	return pMBR
};
MultiFeat.prototype.redraw = function() {
	for(var iIndex = 0; iIndex < this.feats.length; iIndex++) {
		var pFeat = this.feats[iIndex];
		pFeat.redraw()
	}
};
MultiFeat.prototype.removeFromDiv = function() {
	for(var iIndex = 0; iIndex < this.feats.length; iIndex++) {
		var pFeat = this.feats[iIndex];
		pFeat.removeFromDiv()
	}
};
MultiFeat.prototype.addListener = function(action, fuct) {
	var pMe = this;
	for(var iIndex = 0; iIndex < this.feats.length; iIndex++) {
		var pFeat = this.feats[iIndex];
		pFeat.addListener(action, fuct)
	}
};
MultiFeat.prototype.removeListener = function(action, fuct) {
	for(var iIndex = 0; iIndex < this.feats.length; iIndex++) {
		var pFeat = this.feats[iIndex];
		pFeat.removeListener(action, fuct)
	}
};
MultiFeat.prototype.enableEdit = function() {
	for(var iIndex = 0; iIndex < this.feats.length; iIndex++) {
		var pFeat = this.feats[iIndex];
		pFeat.enableEdit()
	}
};
MultiFeat.prototype.disableEdit = function() {
	for(var iIndex = 0; iIndex < this.feats.length; iIndex++) {
		var pFeat = this.feats[iIndex];
		pFeat.disableEdit()
	}
};

function Rectangle(points, color, weight, opcacity, fillcolor) {
	this.base = Polygon;
	var uCoordList = points.split(",");
	var uTemp;
	if(uCoordList[0] > uCoordList[2]) {
		uTemp = uCoordList[0];
		uCoordList[0] = uCoordList[2];
		uCoordList[2] = uTemp
	}
	if(uCoordList[1] > uCoordList[3]) {
		uTemp = uCoordList[1];
		uCoordList[1] = uCoordList[3];
		uCoordList[3] = uTemp
	}
	points = uCoordList.join(",");
	uTemp = null;
	this.base(points, color, weight, opcacity, fillcolor);
	this.center = new Point((parseFloat(uCoordList[0]) + parseFloat(uCoordList[2])) / 2, (parseFloat(uCoordList[1]) + parseFloat(uCoordList[3])) / 2);
	uCoordList = null
}
Rectangle.prototype = new Polygon;
Rectangle.prototype.redraw = function() {
	var pMBR = this.getMBR();
	if(this.dScale && this.dScale != 1) {
		pMBR.scale(this.dScale)
	}
	var pDiv1Point = this.map.convert2WPoint(pMBR.minX, pMBR.minY);
	var pDiv2Point = this.map.convert2WPoint(pMBR.maxX, pMBR.maxY);
	var iLeft = Math.min(pDiv1Point.x, pDiv2Point.x);
	var iTop = Math.min(pDiv1Point.y, pDiv2Point.y);
	var iWidth = Math.abs(pDiv1Point.x - pDiv2Point.x);
	var iHeight = Math.abs(pDiv1Point.y - pDiv2Point.y);
	this.div.style.left = iLeft + "px";
	this.div.style.top = iTop + "px";
	this.div.style.width = iWidth + "px";
	this.div.style.height = iHeight + "px";
	if(this.paper == null) {
		this.paper = Raphael(this.div)
	} else {
		this.paper.remove();
		this.paper = Raphael(this.div)
	}
	this.elementObj = this.paper.rect(0, 0, iWidth, iHeight).attr({
		fill: this.fillColor,
		stroke: this.color,
		"stroke-width": this.weight,
		opacity: this.opacity,
		"stroke-dasharray": this.dashStyle
	});
	var self = this;
	setTimeout(function() {
		self.addEventsToRaphael()
	}, 100);
	this.redrawSnap()
};
Rectangle.prototype.getMBR = function() {
	var dMinX, dMaxX, dMinY, dMaxY;
	if(typeof(this.map) != "undefined") {
		if(this.map.bIsMercatorMap) {
			var y = this.points[1].y.toString();
			if(y.indexOf(".") <= 2 || y.length <= 2) {
				dMinX = Math.min(this.meterPoints[0].x, this.meterPoints[1].x);
				dMaxX = Math.max(this.meterPoints[0].x, this.meterPoints[1].x);
				dMinY = Math.min(this.meterPoints[0].y, this.meterPoints[1].y);
				dMaxY = Math.max(this.meterPoints[0].y, this.meterPoints[1].y);
				this.center = new Point((dMinX + dMaxX) / 2, (dMinY + dMaxY) / 2)
			} else {
				dMinX = Math.min(this.points[0].x, this.points[1].x);
				dMaxX = Math.max(this.points[0].x, this.points[1].x);
				dMinY = Math.min(this.points[0].y, this.points[1].y);
				dMaxY = Math.max(this.points[0].y, this.points[1].y);
				this.center = new Point((dMinX + dMaxX) / 2, (dMinY + dMaxY) / 2)
			}
		} else {
			dMinX = Math.min(this.points[0].x, this.points[1].x);
			dMaxX = Math.max(this.points[0].x, this.points[1].x);
			dMinY = Math.min(this.points[0].y, this.points[1].y);
			dMaxY = Math.max(this.points[0].y, this.points[1].y)
		}
	}
	if(typeof this.MBR == "undefined" || this.MBR == null) {
		this.MBR = new MBR()
	}
	this.MBR.minX = dMinX;
	this.MBR.minY = dMinY;
	this.MBR.maxX = dMaxX;
	this.MBR.maxY = dMaxY;
	return this.MBR
};
Rectangle.prototype.getPoints = function() {
	var pPoints = new Array();
	var dMinX = Math.min(this.points[0].x, this.points[1].x);
	var dMaxX = Math.max(this.points[0].x, this.points[1].x);
	var dMinY = Math.min(this.points[0].y, this.points[1].y);
	var dMaxY = Math.max(this.points[0].y, this.points[1].y);
	pPoints.push(new Point(dMinX, dMinY));
	pPoints.push(new Point(dMinX, dMaxY));
	pPoints.push(new Point(dMaxX, dMaxY));
	pPoints.push(new Point(dMaxX, dMinY));
	pPoints.push(new Point(dMinX, dMinY));
	return pPoints
};
Rectangle.prototype.refreshNodeSnap = function() {};
Rectangle.prototype.createNodeSnap = function() {
	for(i = 0; i < this.points.length; i++) {
		this.markers.push(this.createSnap(this.points[i], true))
	}
};
Rectangle.prototype.getGeometryType = function() {
	return "rectangle"
};

function Title(name, fontSize, pos, font, color, bgColor, bColor, bWidth, bIsTransparent) {
	this.base = iOverLay;
	this.base();
	this.name = name;
	this.title = this.name.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
	this.fontSize = 12;
	this.pos = 7;
	this.color = "WHITE";
	this.font = "宋体";
	this.bgColor = "#015190";
	this.borderColor = "red";
	this.borderWidth = "1";
	this.div = null;
	this.bIsTransparent = false;
	this.iShowLen = -1;
	this.opacityName = "图标透明色";
	if(typeof fontSize != "undefined" && fontSize != null) {
		this.fontSize = fontSize
	}
	if(typeof pos != "undefined" && pos != null) {
		this.pos = pos
	}
	if(typeof font != "undefined" && font != null) {
		this.font = font
	}
	if(typeof color != "undefined" && color != null) {
		this.color = color
	}
	if(typeof bgColor != "undefined" && bgColor != null) {
		this.bgColor = bgColor
	}
	if(typeof bColor != "undefined" && bColor != null) {
		this.borderColor = bColor
	}
	if(typeof bWidth != "undefined" && bWidth != null) {
		this.borderWidth = bWidth
	}
	if(typeof bIsTransparent != "undefined" && bIsTransparent != null) {
		this.bIsTransparent = bIsTransparent
	}
	this.div = this.createTitleDiv()
}
Title.prototype = new iOverLay;
Title.prototype.createTitleDiv = function() {
	var pTitleDiv = createTxt(this.title, this.bIsTransparent);
	pTitleDiv.style.zIndex = this.iZIndex + 11;
	pTitleDiv.style.fontSize = convert2Px(this.fontSize);
	pTitleDiv.style.fontFamily = this.font;
	pTitleDiv.style.color = this.color;
	var iWidth = this.fontSize * StrLength(this.title) / 2;
	pTitleDiv.style.width = convert2Px(iWidth);
	pTitleDiv.noWrap = true;
	if(this.bIsTransparent) {
		pTitleDiv.style.border = this.borderWidth + "px solid transparent"
	} else {
		pTitleDiv.style.border = this.borderWidth + "px solid " + this.borderColor
	}
	if(!this.bIsTransparent) {
		pTitleDiv.style.backgroundColor = this.bgColor;
		pTitleDiv.style.height = "auto"
	}
	pTitleDiv.title = this.name;
	return pTitleDiv
};
Title.prototype.setName = function(strName, bIs) {
	this.name = strName;
	this.title = this.name.replace(/\n/g, "<br>");
	if(this.iShowLen != -1) {
		this.title = this.name.substr(0, this.iShowLen) + "..."
	}
	if(this.div != null) {
		this.redraw()
	}
};
Title.prototype.setShowMaxLen = function(iLen) {
	this.iShowLen = iLen
};
Title.prototype.createDiv = function(pContainer) {
	if(typeof pContainer != "undefined" && pContainer != null) {
		this.map = pContainer
	}
	pContainer.divPaint.appendChild(this.div);
	this.redraw()
};
g_title_index = 0;
Title.prototype.redraw = function() {
	window.status = "==>" + g_title_index++;
	if(this.map.bIsMercatorMap) {
		var pDivPoint = this.map.convert2WPoint(this.meterPoint.x, this.meterPoint.y)
	} else {
		var pDivPoint = this.map.convert2WPoint(this.point.x, this.point.y)
	}
	if(this.div != null) {
		var iLeft = pDivPoint.x;
		var iTop = pDivPoint.y;
		var iWidth = this.fontSize * StrLength(this.title) / 2;
		var iFontSize = this.fontSize;
		if(this.pos == 0) {
			iLeft = pDivPoint.x;
			iTop = pDivPoint.y - iFontSize / 2
		} else {
			if(this.pos == 1) {
				iLeft = pDivPoint.x + iWidth / 2;
				iTop = pDivPoint.y - iFontSize / 2
			} else {
				if(this.pos == 2) {
					iLeft = pDivPoint.x + iWidth / 2;
					iTop = pDivPoint.y
				} else {
					if(this.pos == 3) {
						iLeft = pDivPoint.x + iWidth / 2;
						iTop = pDivPoint.y + iFontSize / 2
					} else {
						if(this.pos == 4) {
							iLeft = pDivPoint.x;
							iTop = pDivPoint.y + iFontSize / 2
						} else {
							if(this.pos == 5) {
								iLeft = pDivPoint.x - iWidth / 2;
								iTop = pDivPoint.y + iFontSize / 2
							} else {
								if(this.pos == 6) {
									iLeft = pDivPoint.x - iWidth / 2;
									iTop = pDivPoint.y - iFontSize / 2
								} else {
									iLeft = pDivPoint.x - iWidth / 2;
									iTop = pDivPoint.y - iFontSize / 2
								}
							}
						}
					}
				}
			}
		}
		this.div.style.top = convert2Px(iTop);
		this.div.style.left = convert2Px(iLeft);
		this.div.style.width = convert2Px(iWidth);
		if(this.bIsTransparent) {
			this.div.style.width = convert2Px(iWidth + this.fontSize)
		}
		if(this.div.innerHTML != this.title) {
			this.div.title = this.name;
			this.div.innerHTML = this.title
		}
		if(this.dragObject) {}
	}
};
Title.prototype.removeFromDiv = function() {
	if(!this.div) {
		return
	}
	this.pause();
	if(this.map) {
		this.map.divPaint.removeChild(this.div);
		EventManager.removeNode(this.div)
	}
};
Title.prototype.setOpacity = function(arg) {
	this.opacity = arg + "";
	var el = this.div;
	if(el) {
		el.style.filter = "ALPHA(opacity=" + this.opacity * 100 + ")"
	}
};
Title.prototype.openInfoWindowHtml = function(html, bIsInScreen) {
	try {
		this.map.blowupOverlay(this);
		this.map.openInfoWindow(this.point.x, this.point.y, html, bIsInScreen)
	} catch(e) {
		throw EzErrorFactory.createError("Title::openInfoWindowHtml方法中不正确", e)
	}
};
Title.prototype.closeInfoWindowHtml = function() {
	this.map.closeInfoWindow()
};

function MultiPoint(vCoordSequence) {
	if(typeof vCoordSequence == "string") {
		this.coordSequence = vCoordSequence || "";
		var strTempCoords = this.coordSequence.split(",");
		this.points = [];
		for(var i = 0; i < strTempCoords.length; i = i + 2) {
			this.points.push(new Point(parseFloat(strTempCoords[i]), parseFloat(strTempCoords[i + 1])))
		}
		strTempCoords = null
	} else {
		if(vCoordSequence instanceof Array) {
			if(vCoordSequence.length > 0) {
				this.points = vCoordSequence;
				this.coordSequence = "";
				for(var i = 0; i < this.points.length; i++) {
					if(i != this.points.length - 1) {
						this.coordSequence += this.points[i].x + "," + this.points[i].y + ","
					} else {
						this.coordSequence += this.points[i].x + "," + this.points[i].y
					}
				}
			} else {
				throw new Error("MultiPoint 构造参数有误")
			}
		} else {
			throw new Error("MultiPoint 构造参数有误")
		}
	}
	this.getCenter = function() {
		var uMBR = this.getMBR();
		return new Point((uMBR.minX + uMBR.maxX) / 2, (uMBR.minY + uMBR.maxY) / 2)
	};
	this.getMBR = function() {
		var uMinX, uMinY, uMaxX, uMaxY;
		uMinX = uMaxX = this.getSegment(0).x;
		uMinY = uMaxY = this.getSegment(0).y;
		for(var i = 1; i < this.getSegmentCount(); i++) {
			if(uMinX > this.getSegment(i).x) {
				uMinX = this.getSegment(i).x
			} else {
				if(uMaxX < this.getSegment(i).x) {
					uMaxX = this.getSegment(i).x
				}
			}
			if(uMinY > this.getSegment(i).y) {
				uMinY = this.getSegment(i).y
			} else {
				if(uMaxY < this.getSegment(i).y) {
					uMaxY = this.getSegment(i).y
				}
			}
		}
		return new MBR(uMinX, uMinY, uMaxX, uMaxY)
	};
	this.getSegmentCount = function() {
		return this.points.length
	};
	this.getSegment = function(index) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(index, "int"))) {
				throw EzErrorFactory.createError("MultiPoint::getSegment方法中arguments[0]类型不正确")
			}
			return this.points[index]
		} catch(e) {
			throw EzErrorFactory.createError("MultiPoint::getSegment方法中不正确", e)
		}
	};
	this.getCoordSequence = function() {
		return this.coordSequence
	};
	this.getSegments = function() {
		return this.points
	};
	this.setCoordSequence = function(vCoordSequence) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(vCoordSequence, "string")) && !(EzServerClient.GlobeFunction.isTypeRight(vCoordSequence, "Array"))) {
				throw EzErrorFactory.createError("MultiPoint::setCoordSequence方法中arguments[0]类型不正确")
			}
			if(typeof vCoordSequence == "string") {
				this.coordSequence = vCoordSequence || "";
				var strTempCoords = this.coordSequence.split(",");
				this.points = [];
				for(var i = 0; i < strTempCoords.length; i = i + 2) {
					this.points.push(new Point(parseFloat(strTempCoords[i]), parseFloat(strTempCoords[i + 1])))
				}
				strTempCoords = null
			} else {
				if(vCoordSequence instanceof Array) {
					if(vCoordSequence.length > 0) {
						this.points = vCoordSequence;
						this.coordSequence = "";
						for(var i = 0; i < this.points.length; i++) {
							if(i != this.points.length - 1) {
								this.coordSequence += this.points[i].x + "," + this.points[i].y + ","
							} else {
								this.coordSequence += this.points[i].x + "," + this.points[i].y
							}
						}
					} else {
						throw new Error("MultiPoint::setCoordSequence方法传入的参数无效")
					}
				} else {
					throw new Error("MultiPoint::setCoordSequence方法传入的参数无效")
				}
			}
		} catch(e) {
			throw EzErrorFactory.createError("MultiPoint::setCoordSequence方法中不正确", e)
		}
	};
	this.addSegment = function(vPoint) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(vPoint, "string")) && !(EzServerClient.GlobeFunction.isTypeRight(vPoint, "Array"))) {
				throw EzErrorFactory.createError("MultiPoint::addSegment方法中arguments[0]类型不正确")
			}
			if(typeof vPoint == "string") {
				this.coordSequence += "," + vPoint;
				var uCoords = vPoint.split(",");
				this.points.push(new Point(uCoords[0], uCoords[1]));
				uCoords = null
			} else {
				if(vPoint instanceof Point) {
					this.points.push(vPoint);
					this.coordSequence += "," + vPoint.x + "," + vPoint.y
				} else {
					throw new Error("MultiPoint::addSegment传入参数不正确")
				}
			}
		} catch(e) {
			throw EzErrorFactory.createError("MultiPoint::addSegment方法中不正确", e)
		}
	};
	this.addSegments = function(vCoordSequence) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(vCoordSequence, "string")) && !(EzServerClient.GlobeFunction.isTypeRight(vCoordSequence, "Array"))) {
				throw EzErrorFactory.createError("MultiPoint::addSegments方法中arguments[0]类型不正确")
			}
			if(typeof vCoordSequence == "string") {
				this.coordSequence += "," + vCoordSequence;
				var uCoords = vCoordSequence.split(",");
				for(var i = 0; i < uCoords.length; i = i + 2) {
					this.points.push(new Point(uCoords[i], uCoords[i + 1]))
				}
				uCoords = null
			} else {
				if(vCoordSequence instanceof Array) {
					this.points = this.points.concat(vCoordSequence);
					for(var i = 0; i < vCoordSequence.length; i++) {
						this.coordSequence += "," + vCoordSequence[i].x + "," + vCoordSequence[i].y
					}
				} else {
					throw new Error("MultiPoint::addSegments传入参数不正确")
				}
			}
		} catch(e) {
			throw EzErrorFactory.createError("MultiPoint::addSegments方法中不正确", e)
		}
	};
	this.getGeometryType = function() {
		return "multipoint"
	}
}

function MultiPolyline(vCoordSequence, color, weight, opacity, arrow) {
	this.color = color;
	this.weight = weight;
	this.opacity = opacity;
	this.arrow = arrow;
	if(typeof vCoordSequence == "string") {
		this.coordSequence = vCoordSequence || "";
		this.polylines = [];
		var uPolylineList = this.coordSequence.split(";");
		for(var i = 0; i < uPolylineList.length; i++) {
			this.polylines.push(new Polyline(uPolylineList[i], this.color, this.weight, this.opacity, this.arrow))
		}
		uPolylineList = null
	} else {
		throw new Error("MultiPolyline 构造参数有误")
	}
	this.getCenter = function() {
		var uMBR = this.getMBR();
		var uPoint = new Point((uMBR.minX + uMBR.maxX) / 2, (uMBR.minY + uMBR.maxY) / 2);
		uMBR = null;
		return uPoint
	};
	this.getMBR = function() {
		var uMinX, uMaxX, uMinY, uMaxY;
		var uMBR = this.getSegment(0).getMBR();
		uMinX = uMBR.minX;
		uMaxX = uMBR.maxX;
		uMinY = uMBR.minY;
		uMaxY = uMBR.maxY;
		var uTempMBR = null;
		for(var i = 1; i < this.getSegmentCount(); i++) {
			uTempMBR = this.getSegment(i).getMBR();
			if(uMinX > uTempMBR.minX) {
				uMinX = uTempMBR.minX
			}
			if(uMaxX < uTempMBR.maxX) {
				uMaxX = uTempMBR.maxX
			}
			if(uMinY > uTempMBR.minY) {
				uMinY = uTempMBR.minY
			}
			if(uMaxY < uTempMBR.maxY) {
				uMaxY = uTempMBR.maxY
			}
		}
		uTempMBR = null;
		return new MBR(uMinX, uMinY, uMaxX, uMaxY)
	};
	this.getSegmentCount = function() {
		return this.polylines.length
	};
	this.getSegment = function(index) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(index, "int"))) {
				throw EzErrorFactory.createError("MultiPolyline::getSegment方法中arguments[0]类型不正确")
			}
			return this.polylines[index]
		} catch(e) {
			throw EzErrorFactory.createError("MultiPolyline::getSegment方法中不正确", e)
		}
	};
	this.getCoordSequence = function() {
		return this.coordSequence
	};
	this.getSegments = function() {
		return this.polylines
	};
	this.setCoordSequence = function(vCoordSequence) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(vCoordSequence, "string"))) {
				throw EzErrorFactory.createError("MultiPolyline::setCoordSequence方法中arguments[0]类型不正确")
			}
			if(typeof vCoordSequence == "string") {
				this.coordSequence = vCoordSequence || "";
				this.polylines = [];
				var uPolylineList = this.coordSequence.split(";");
				for(var i = 0; i < uPolylineList.length; i++) {
					this.polylines.push(new Polyline(uPolylineList[i], this.color, this.weight, this.opacity, this.arrow))
				}
				uPolylineList = null
			} else {
				throw new Error("MultiPolyline::setCoordSequence 传入参数类型无效")
			}
		} catch(e) {
			throw EzErrorFactory.createError("MultiPolyline::setCoordSequence方法中不正确", e)
		}
	};
	this.addSegment = function(vCoordSequence) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(vCoordSequence, "string"))) {
				throw EzErrorFactory.createError("MultiPolyline::addSegment方法中arguments[0]类型不正确")
			}
			if(typeof vCoordSequence == "string") {
				this.coordSequence += ";" + vCoordSequence;
				this.polylines.push(new Polyline(vCoordSequence, this.color, this.weight, this.opacity, this.arrow))
			} else {
				throw new Error("MultiPolyline::addSegment 传入参数类型无效")
			}
		} catch(e) {
			throw EzErrorFactory.createError("MultiPolyline::addSegment 方法中不正确", e)
		}
	};
	this.addSegments = function(vCoordSequence) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(vCoordSequence, "string"))) {
				throw EzErrorFactory.createError("MultiPolyline::addSegment方法中arguments[0]类型不正确")
			}
			if(typeof vCoordSequence == "string") {
				this.coordSequence += ";" + vCoordSequence;
				var uPolylineList = vCoordSequence.split(";");
				for(var i = 0; i < uPolylineList.length; i++) {
					this.polylines.push(new Polyline(uPolylineList[i], this.color, this.weight, this.opacity, this.arrow))
				}
				uPolylineList = null
			} else {
				throw new Error("MultiPolyline::addSegments 传入参数类型无效")
			}
		} catch(e) {
			throw EzErrorFactory.createError("MultiPolyline::addSegment方法中不正确", e)
		}
	};
	this.getGeometryType = function() {
		return "multipolyline"
	}
}

function MultiPolygon(vCoordSequence, color, weight, opacity, fillcolor) {
	this.color = color;
	this.weight = weight;
	this.opacity = opacity;
	this.fillcolor = fillcolor;
	if(typeof vCoordSequence == "string") {
		this.coordSequence = vCoordSequence || "";
		this.polygons = [];
		var uPolygonList = this.coordSequence.split("|");
		for(var i = 0; i < uPolygonList.length; i++) {
			this.polygons.push(new Polygon(uPolygonList[i], this.color, this.weight, this.opacity, this.fillcolor))
		}
		uPolygonList = null
	} else {
		throw new Error("MultiPolygon 构造参数有误")
	}
	this.getCenter = function() {
		var uMBR = this.getMBR();
		var uPoint = new Point((uMBR.minX + uMBR.maxX) / 2, (uMBR.minY + uMBR.maxY) / 2);
		uMBR = null;
		return uPoint
	};
	this.getMBR = function() {
		var uMinX, uMaxX, uMinY, uMaxY;
		var uMBR = this.getSegment(0).getMBR();
		uMinX = uMBR.minX;
		uMaxX = uMBR.maxX;
		uMinY = uMBR.minY;
		uMaxY = uMBR.maxY;
		var uTempMBR = null;
		for(var i = 1; i < this.getSegmentCount(); i++) {
			uTempMBR = this.getSegment(i).getMBR();
			if(uMinX > uTempMBR.minX) {
				uMinX = uTempMBR.minX
			}
			if(uMaxX < uTempMBR.maxX) {
				uMaxX = uTempMBR.maxX
			}
			if(uMinY > uTempMBR.minY) {
				uMinY = uTempMBR.minY
			}
			if(uMaxY < uTempMBR.maxY) {
				uMaxY = uTempMBR.maxY
			}
		}
		uTempMBR = null;
		return new MBR(uMinX, uMinY, uMaxX, uMaxY)
	};
	this.getSegmentCount = function() {
		return this.polygons.length
	};
	this.getSegment = function(index) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(index, "int"))) {
				throw EzErrorFactory.createError("MultiPolygon::getSegment方法中arguments[0]类型不正确")
			}
			return this.polygons[index]
		} catch(e) {
			throw EzErrorFactory.createError("MultiPolygon::getSegment方法中不正确", e)
		}
	};
	this.getCoordSequence = function() {
		return this.coordSequence
	};
	this.getSegments = function() {
		return this.polygons
	};
	this.setCoordSequence = function(vCoordSequence) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(vCoordSequence, "string"))) {
				throw EzErrorFactory.createError("MultiPolygon::setCoordSequence方法中arguments[0]类型不正确")
			}
			if(typeof vCoordSequence == "string") {
				this.coordSequence = vCoordSequence || "";
				this.polygons = [];
				var uPolygonList = this.coordSequence.split("|");
				for(var i = 0; i < uPolygonList.length; i++) {
					this.polygons.push(new Polygon(uPolygonList[i], this.color, this.weight, this.opacity, this.fillcolor))
				}
				uPolygonList = null
			} else {
				throw new Error("MultiPolygon::setCoordSequence 传入参数类型无效")
			}
		} catch(e) {
			throw EzErrorFactory.createError("MultiPolygon::setCoordSequence方法中不正确", e)
		}
	};
	this.addSegment = function(vCoordSequence) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(vCoordSequence, "string"))) {
				throw EzErrorFactory.createError("MultiPolygon::addSegment方法中arguments[0]类型不正确")
			}
			if(typeof vCoordSequence == "string") {
				this.coordSequence += "|" + vCoordSequence;
				this.polygons.push(new Polygon(vCoordSequence, this.color, this.weight, this.opacity, this.fillcolor))
			} else {
				throw new Error("MultiPolygon::addSegment传入参数类型无效")
			}
		} catch(e) {
			throw EzErrorFactory.createError("MultiPolygon::addSegment方法中不正确", e)
		}
	};
	this.addSegments = function(vCoordSequence) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(vCoordSequence, "string"))) {
				throw EzErrorFactory.createError("MultiPolygon::addSegments方法中arguments[0]类型不正确")
			}
			if(typeof vCoordSequence == "string") {
				this.coordSequence += "|" + vCoordSequence;
				var uPolygonList = vCoordSequence.split("|");
				for(var i = 0; i < uPolygonList.length; i++) {
					this.polygons.push(new Polygon(uPolygonList[i], this.color, this.weight, this.opacity, this.fillcolor))
				}
				uPolygonList = null
			} else {
				throw new Error("MultiPolygon::addSegments 传入参数类型无效")
			}
		} catch(e) {
			throw EzErrorFactory.createError("MultiPolygon::addSegments方法中不正确", e)
		}
	};
	this.getGeometryType = function() {
		return "multipolygon"
	}
}

function EzShape(vGeometryType, vCoordinateSequence) {
	this.geometryType = vGeometryType;
	this.coordinateSequence = vCoordinateSequence;
	this.getGeometryType = function() {
		return this.geometryType
	};
	this.getCoordinateSequence = function() {
		return this.coordinateSequence
	};
	this.setGeometryType = function(vGeometryType) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(vGeometryType, "string"))) {
				throw EzErrorFactory.createError("EzShape::setGeometryType方法中arguments[0]类型不正确")
			} else {
				this.geometryType = vGeometryType
			}
		} catch(e) {
			throw EzErrorFactory.createError("EzShape::setGeometryType方法中不正确", e)
		}
	};
	this.setCoordinateSequence = function(vCoordinateSequence) {
		try {
			if(!(EzServerClient.GlobeFunction.isTypeRight(vGeometryType, "string"))) {
				throw EzErrorFactory.createError("EzShape::setCoordinateSequence方法中arguments[0]类型不正确")
			} else {
				this.coordinateSequence = vCoordinateSequence
			}
		} catch(e) {
			throw EzErrorFactory.createError("EzShape::setCoordinateSequence方法中不正确", e)
		}
	}
}

function InforWindow(map, html, opt) {
	this.map = map;
	this.div = document.createElement("div");
	this.div.style.position = "absolute";
	this.map.div.appendChild(this.div);
	this.point = null;
	this.divPoint = null;
	this.html = html;
	if(typeof(opt) == "undefined") {
		opt = {}
	}
	this.userWidth = opt.width || null;
	this.userHeight = opt.height || null;
	this.borderColor = opt.borderColor || "#ffffff";
	this.backgroundColor = opt.backgroundColor || "#ffffff";
	this.opacity = opt.opacity || 1;
	this.bIsInScreen = opt.bIsInScreen || false;
	this.borderWidth = opt.borderWidth || 1;
	this.corner = opt.corner || false;
	this.width = 200;
	this.height = 80;
	this.init();
	this.pad = 30;
	if(this.corner == true) {
		this.r = 25
	} else {
		this.r = 2
	}
}
InforWindow.prototype.init = function() {
	var num = this.getRealNum();
	this.width = num.width;
	this.height = num.height;
	this.createCloseButton();
	this.hide();
	this.div.onmousedown = this.onMouseDown;
	this.div.ondblclick = this.onMouseDown
};
InforWindow.prototype.getRealNum = function() {
	if(this.userWidth != null) {
		this.userWidth = Math.max(this.userWidth, this.width)
	}
	if(this.userHeight != null) {
		this.userHeight = Math.max(this.userHeight, this.height)
	}
	var tempcontainDiv = document.createElement("div");
	tempcontainDiv.style.position = "absolute";
	tempcontainDiv.style.left = "0px";
	tempcontainDiv.style.top = "0px";
	var tempContentDiv = document.createElement("div");
	tempContentDiv.style.cssText = "word-break:break-all";
	tempContentDiv.innerHTML = this.html;
	if(this.userWidth != null) {
		tempContentDiv.style.width = parseInt(this.userWidth) + "px"
	} else {
		tempContentDiv.style.width = "auto"
	}
	if(this.userHeight != null) {
		tempContentDiv.style.height = parseInt(this.userHeight) + "px"
	} else {
		tempContentDiv.style.height = "auto"
	}
	tempcontainDiv.appendChild(tempContentDiv);
	window.document.body.appendChild(tempcontainDiv);
	var tempWidth = tempContentDiv.offsetWidth;
	var tempHeight = tempContentDiv.offsetHeight;
	window.document.body.removeChild(tempcontainDiv);
	var realWidth, realHeight;
	if(this.userWidth != null) {
		realWidth = Math.max(this.userWidth, tempWidth)
	} else {
		realWidth = Math.max(this.width, tempWidth)
	}
	if(this.userHeight != null) {
		realHeight = Math.max(this.userHeight, tempHeight)
	} else {
		realHeight = Math.max(this.height, tempHeight)
	}
	return {
		width: realWidth + 42,
		height: realHeight + 42
	}
};
InforWindow.prototype.setContentArea = function() {
	var contentDiv = document.createElement("div");
	contentDiv.id = "contentDiv";
	contentDiv.style.position = "absolute";
	contentDiv.style.top = "0px";
	contentDiv.style.left = "0px";
	contentDiv.style.width = parseInt(this.width) + "px";
	contentDiv.style.height = parseInt(this.height) + "px";
	contentDiv.innerHTML = this.html;
	contentDiv.style.cssText = "word-break:break-all";
	var contentContainer = document.createElement("div");
	contentContainer.style.position = "absolute";
	contentContainer.style.left = "0px";
	contentContainer.style.top = "0px";
	contentContainer.style.padding = "20px 20px 20px 20px";
	contentContainer.appendChild(contentDiv);
	this.contentDiv = contentDiv;
	this.div.appendChild(contentContainer)
};
InforWindow.prototype.showInfoWindow = function(point) {
	this.setPoint(point);
	this.positionAt(this.point);
	this.setContentArea();
	this.createShadow();
	var pathStr = this.setPathStr();
	this.draw(pathStr);
	this.show()
};
InforWindow.prototype.draw = function(pathStr) {
	this.paper = Raphael(this.div);
	this.paper.path(pathStr).attr({
		fill: this.backgroundColor,
		"fill-opacity": this.opacity,
		stroke: this.borderColor,
		"stroke-width": 2,
		"stroke-opacity": this.opacity
	})
};
InforWindow.prototype.setPathStr = function() {
	var width = parseInt(this.width);
	var height = parseInt(this.height);
	var r = parseInt(this.r);
	var divPoint = this.divPoint;
	var left = parseInt(divPoint.x) - parseInt(this.width) / 2;
	var top = parseInt(divPoint.y) - parseInt(this.height + this.pad);
	var pointerX = divPoint.x - left;
	var pointerY = divPoint.y - top;
	var pointer0 = new Point(pointerX, pointerY);
	var pointer1 = new Point(pointer0.x + 50, pointer0.y - this.pad);
	var pointer2 = new Point(pointer0.x + 25, pointer0.y - this.pad);
	var pathStr = "M" + pointer1.x + "," + pointer1.y + "L" + pointerX + "," + pointerY + "L" + pointer2.x + "," + pointer2.y + "H" + r + this.drawCorner(r, 1, (height - r)) + "V" + r + this.drawCorner(r, r, 1) + "H" + (width - r - 1) + this.drawCorner(r, width - 1, r) + "V" + (height - r) + this.drawCorner(r, width - r, height) + "Z";
	return pathStr
};
InforWindow.prototype.drawCorner = function(r, endx, endy) {
	return "A" + r + "," + r + ",0,0,1," + endx + "," + endy
};
InforWindow.prototype.show = function() {
	this.div.style.display = ""
};
InforWindow.prototype.hide = function() {
	this.div.style.display = "none"
};
InforWindow.prototype.setPoint = function(point) {
	if(point instanceof Point) {
		this.point = point
	} else {
		alert("point不是Point对象")
	}
};
InforWindow.prototype.isVisible = function() {
	return this.div.style.display != "none"
};
InforWindow.prototype.positionAt = function(point) {
	this.point = point;
	var temPoint = point;
	this.divPoint = this.map.convert2WPoint(temPoint.x, temPoint.y);
	var divPoint = this.divPoint;
	this.div.id = "popdiv";
	this.div.style.zIndex = 2000;
	this.div.style.width = this.width + "px";
	this.div.style.height = this.height + this.pad + "px";
	var left = parseInt(divPoint.x) - parseInt(this.width) / 2;
	var top = parseInt(divPoint.y) - parseInt(this.height + this.pad);
	this.div.style.left = left + "px";
	this.div.style.top = top + "px";
	if(typeof(this.shadowDiv) != "undefined") {
		var left = this.divPoint.x - this.width / 2 + 30;
		var top = this.divPoint.y - (this.height / 2 + this.pad / 2);
		this.shadowDiv.style.left = left + "px";
		this.shadowDiv.style.top = top + "px"
	}
};
InforWindow.prototype.onMouseDown = function(b) {
	if(_IEBrowser.type == 1) {
		window.event.cancelBubble = true
	} else {
		b.cancelDrag = true
	}
};
InforWindow.prototype.createCloseButton = function() {
	this.closeButton = document.createElement("div");
	this.closeButton.style.position = "absolute";
	this.closeButton.style.top = "10px";
	this.closeButton.style.right = "10px";
	this.closeButton.style.zIndex = "1000";
	this.closeButton.style.width = "13px";
	this.closeButton.style.height = "13px";
	var paper = Raphael(this.closeButton);
	paper.rect(1, 1, 12, 11).attr({
		fill: this.backgroundColor,
		"fill-opacity": this.opacity
	});
	paper.path("M4,4L9,9");
	paper.path("M4,9L9,4");
	setCursor(this.closeButton, "pointer");
	var that = this;
	this.closeButton.onclick = function() {
		that.map.div.removeChild(that.div);
		that.map.div.removeChild(that.shadowDiv);
		that.map.bIsOpenInfo = false
	};
	this.div.appendChild(this.closeButton)
};
InforWindow.prototype.getTotalWidth = function() {
	return parseInt(this.width)
};
InforWindow.prototype.getTotalHeight = function() {
	return parseInt(this.height + this.pad)
};
InforWindow.prototype.createShadow = function() {
	var shadowDiv = document.createElement("div");
	this.shadowDiv = shadowDiv;
	shadowDiv.style.position = "absolute";
	shadowDiv.id = "shadowDiv";
	shadowDiv.style.zIndex = "1000";
	var left = this.divPoint.x - this.width / 2 + 30;
	var top = this.divPoint.y - (this.height / 2 + this.pad / 2);
	shadowDiv.style.left = left + "px";
	shadowDiv.style.top = top + "px";
	var width = this.width + 100;
	var height = this.height / 2 + this.pad / 2;
	shadowDiv.style.width = width + "px";
	shadowDiv.style.height = height + 4 + "px";
	var pointerX = this.divPoint.x - left;
	var pointerY = this.divPoint.y - top;
	this.map.div.appendChild(shadowDiv);
	var shadowPaper = Raphael(shadowDiv);
	var r, R;
	if(this.corner == false) {
		r = 5;
		R = 5
	} else {
		r = 15;
		R = 20
	}
	var pad = 20;
	var leftBottomX = 0.7 * r;
	var leftBottomY = height - pad - 1.7 * r;
	var leftTopX = leftBottomX + leftBottomY - 0.3 * R;
	var leftTopY = 0.3 * R;
	var rightTopX = width - r - 5;
	var rightTopY = 4;
	var rightBttomY = height - 0.3 * R - pad;
	var rightBttomX = width - rightBttomY + 25;
	var str = "M" + (pointerX + 80) + "," + (pointerY - pad) + "L" + pointerX + "," + pointerY + "L" + (pointerX + 50) + "," + (pointerY - pad) + "H" + r + this.drawCorner(r, 0.7 * r, height - pad - 1.7 * r) + "L" + (leftTopX) + "," + leftTopY + this.drawCorner(R, leftTopX + 0.7 * R, 4) + "H" + (width - r - 5) + this.drawCorner(r, rightTopX + 0.7 * r, rightTopY + 1.7 * r) + "L" + rightBttomX + "," + rightBttomY + this.drawCorner(R, rightBttomX - 0.7 * R, height - pad) + "Z";
	shadowPaper.path(str).attr({
		fill: "#000000",
		stroke: "#000000",
		"stroke-width": 0,
		"fill-opacity": 0.2,
		"stroke-opacity": 0
	})
};

function Google() {
	this.casm_rr = 0;
	this.casm_t1 = 0;
	this.casm_t2 = 0;
	this.casm_x1 = 0;
	this.casm_y1 = 0;
	this.casm_x2 = 0;
	this.casm_y2 = 0;
	this.casm_f = 0;
	this.self = {
		tileSize: 256,
		initialResolution: 2 * Math.PI * 6378137 / 256,
		originShift: 2 * Math.PI * 6378137 / 2
	}
}
Google.prototype.yj_sin2 = function(x) {
	x = parseFloat(x);
	var tt;
	var ss;
	var ff;
	var s2;
	var cc;
	ff = 0;
	if(x < 0) {
		x = -x;
		ff = 1
	}
	cc = parseInt(x / 6.28318530717959);
	tt = x - cc * 6.28318530717959;
	if(tt > 3.141592653589793) {
		tt = tt - 3.141592653589793;
		if(ff == 1) {
			ff = 0
		} else {
			if(ff == 0) {
				ff = 1
			}
		}
	}
	x = tt;
	ss = x;
	s2 = x;
	tt = tt * tt;
	s2 = s2 * tt;
	ss = ss - s2 * 0.166666666666667;
	s2 = s2 * tt;
	ss = ss + s2 * 0.00833333333333333;
	s2 = s2 * tt;
	ss = ss - s2 * 0.000198412698412698;
	s2 = s2 * tt;
	ss = ss + s2 * 0.00000275573192239859;
	s2 = s2 * tt;
	ss = ss - s2 * 2.50521083854417e-8;
	if(ff == 1) {
		ss = -ss
	}
	return ss
};
Google.prototype.Transform_yj5 = function(x, y) {
	var me = this;
	x = parseFloat(x);
	y = parseFloat(y);
	var tt;
	tt = 300 + 1 * x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.sqrt(x * x));
	tt = tt + (20 * me.yj_sin2(18.849555921538762 * x) + 20 * me.yj_sin2(6.283185307179588 * x)) * 0.6667;
	tt = tt + (20 * me.yj_sin2(3.141592653589794 * x) + 40 * me.yj_sin2(1.047197551196598 * x)) * 0.6667;
	tt = tt + (150 * me.yj_sin2(0.2617993877991495 * x) + 300 * me.yj_sin2(0.1047197551196598 * x)) * 0.6667;
	return tt
};
Google.prototype.Transform_yjy5 = function(x, y) {
	var me = this;
	x = parseFloat(x);
	y = parseFloat(y);
	var tt;
	tt = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.sqrt(x * x));
	tt = tt + (20 * me.yj_sin2(18.849555921538762 * x) + 20 * me.yj_sin2(6.283185307179588 * x)) * 0.6667;
	tt = tt + (20 * me.yj_sin2(3.141592653589794 * y) + 40 * me.yj_sin2(1.047197551196598 * y)) * 0.6667;
	tt = tt + (160 * me.yj_sin2(0.2617993877991495 * y) + 320 * me.yj_sin2(0.1047197551196598 * y)) * 0.6667;
	return tt
};
Google.prototype.Transform_jy5 = function(x, xx) {
	var me = this;
	x = parseFloat(x);
	xx = parseFloat(xx);
	var n;
	var a;
	var e;
	a = 6378245;
	e = 0.00669342;
	n = Math.sqrt(1 - e * me.yj_sin2(x * 0.0174532925199433) * me.yj_sin2(x * 0.0174532925199433));
	n = (xx * 180) / (a / n * Math.cos(x * 0.0174532925199433) * 3.1415926);
	return n
};
Google.prototype.Transform_jyj5 = function(x, yy) {
	var me = this;
	x = parseFloat(x);
	yy = parseFloat(yy);
	var m;
	var a;
	var e;
	var mm;
	a = 6378245;
	e = 0.00669342;
	mm = 1 - e * me.yj_sin2(x * 0.0174532925199433) * me.yj_sin2(x * 0.0174532925199433);
	m = (a * (1 - e)) / (mm * Math.sqrt(mm));
	return(yy * 180) / (m * 3.1415926)
};
Google.prototype.r_yj = function() {
	var casm_a = 314159269;
	var casm_c = 453806245;
	return 0
};
Google.prototype.random_yj = function() {
	var me = this;
	var t;
	var casm_a = 314159269;
	var casm_c = 453806245;
	me.casm_rr = casm_a * me.casm_rr + casm_c;
	t = parseInt(me.casm_rr / 2);
	me.casm_rr = me.casm_rr - t * 2;
	me.casm_rr = me.casm_rr / 2;
	return(me.casm_rr)
};
Google.prototype.IniCasm = function(w_time, w_lng, w_lat) {
	var me = this;
	w_time = parseFloat(w_time);
	w_lng = parseFloat(w_lng);
	w_lat = parseFloat(w_lat);
	var tt;
	me.casm_t1 = w_time;
	me.casm_t2 = w_time;
	tt = parseInt(w_time / 0.357);
	me.casm_rr = w_time - tt * 0.357;
	if(w_time == 0) {
		me.casm_rr = 0.3
	}
	me.casm_x1 = w_lng;
	me.casm_y1 = w_lat;
	me.casm_x2 = w_lng;
	me.casm_y2 = w_lat;
	me.casm_f = 3
};
Google.prototype.wgtochina_lb = function(wg_flag, wg_lng, wg_lat, wg_heit, wg_week, wg_time) {
	var me = this;
	wg_flag = parseInt(wg_flag);
	wg_lng = parseInt(wg_lng);
	wg_lat = parseInt(wg_lat);
	wg_heit = parseInt(wg_heit);
	wg_week = parseInt(wg_week);
	wg_time = parseInt(wg_time);
	var x_add;
	var y_add;
	var h_add;
	var x_l;
	var y_l;
	var casm_v;
	var t1_t2;
	var x1_x2;
	var y1_y2;
	var point = new Point();
	if(wg_heit > 5000) {
		return point
	}
	x_l = wg_lng;
	x_l = x_l / 3686400;
	y_l = wg_lat;
	y_l = y_l / 3686400;
	if(wg_flag == 0) {
		me.IniCasm(wg_time, wg_lng, wg_lat);
		point = new Point();
		point.setLatitude(wg_lng);
		point.setLongitude(wg_lat);
		return point
	}
	me.casm_t2 = wg_time;
	t1_t2 = (me.casm_t2 - me.casm_t1) / 1000;
	if(t1_t2 <= 0) {
		me.casm_t1 = me.casm_t2;
		me.casm_f = me.casm_f + 1;
		me.casm_x1 = me.casm_x2;
		me.casm_f = me.casm_f + 1;
		me.casm_y1 = me.casm_y2;
		me.casm_f = me.casm_f + 1
	} else {
		if(t1_t2 > 120) {
			if(me.casm_f == 3) {
				me.casm_f = 0;
				me.casm_x2 = wg_lng;
				me.casm_y2 = wg_lat;
				x1_x2 = me.casm_x2 - me.casm_x1;
				y1_y2 = me.casm_y2 - me.casm_y1;
				casm_v = Math.sqrt(x1_x2 * x1_x2 + y1_y2 * y1_y2) / t1_t2;
				if(casm_v > 3185) {
					return(point)
				}
			}
			me.casm_t1 = me.casm_t2;
			me.casm_f = me.casm_f + 1;
			me.casm_x1 = me.casm_x2;
			me.casm_f = me.casm_f + 1;
			me.casm_y1 = me.casm_y2;
			me.casm_f = me.casm_f + 1
		}
	}
	x_add = me.Transform_yj5(x_l - 105, y_l - 35);
	y_add = me.Transform_yjy5(x_l - 105, y_l - 35);
	h_add = wg_heit;
	x_add = x_add + h_add * 0.001 + me.yj_sin2(wg_time * 0.0174532925199433) + me.random_yj();
	y_add = y_add + h_add * 0.001 + me.yj_sin2(wg_time * 0.0174532925199433) + me.random_yj();
	point = new Point();
	point.setX(((x_l + me.Transform_jy5(y_l, x_add)) * 3686400));
	point.setY(((y_l + me.Transform_jyj5(y_l, y_add)) * 3686400));
	return point
};
Google.prototype.wgtochina_lb2 = function(wg_flag, wg_lng, wg_lat, wg_heit, wg_week, wg_time) {
	var me = this;
	wg_flag = parseInt(wg_flag);
	wg_lng = parseInt(wg_lng);
	wg_lat = parseInt(wg_lat);
	wg_heit = parseInt(wg_heit);
	wg_week = parseInt(wg_week);
	wg_time = parseInt(wg_time);
	var x_add;
	var y_add;
	var h_add;
	var x_l;
	var y_l;
	var casm_v;
	var t1_t2;
	var x1_x2;
	var y1_y2;
	point = new Point();
	if(wg_heit > 5000) {
		return point
	}
	x_l = wg_lng;
	x_l = x_l / 3686400;
	y_l = wg_lat;
	y_l = y_l / 3686400;
	if(wg_flag == 0) {
		me.IniCasm(wg_time, wg_lng, wg_lat);
		point = new Point();
		point.setLatitude(wg_lng);
		point.setLongitude(wg_lat);
		return point
	}
	me.casm_t2 = wg_time;
	t1_t2 = (me.casm_t2 - me.casm_t1) / 1000;
	if(t1_t2 <= 0) {
		me.casm_t1 = me.casm_t2;
		me.casm_f = me.casm_f + 1;
		me.casm_x1 = me.casm_x2;
		me.casm_f = me.casm_f + 1;
		me.casm_y1 = me.casm_y2;
		me.casm_f = me.casm_f + 1
	} else {
		if(t1_t2 > 120) {
			if(me.casm_f == 3) {
				me.casm_f = 0;
				me.casm_x2 = wg_lng;
				me.casm_y2 = wg_lat;
				x1_x2 = me.casm_x2 - me.casm_x1;
				y1_y2 = me.casm_y2 - me.casm_y1;
				casm_v = Math.sqrt(x1_x2 * x1_x2 + y1_y2 * y1_y2) / t1_t2;
				if(casm_v > 3185) {
					return(point)
				}
			}
			me.casm_t1 = me.casm_t2;
			me.casm_f = me.casm_f + 1;
			me.casm_x1 = me.casm_x2;
			me.casm_f = me.casm_f + 1;
			me.casm_y1 = me.casm_y2;
			me.casm_f = me.casm_f + 1
		}
	}
	x_add = me.Transform_yj5(x_l - 105, y_l - 35);
	y_add = me.Transform_yjy5(x_l - 105, y_l - 35);
	h_add = wg_heit;
	x_add = x_add + h_add * 0.001 + me.yj_sin2(wg_time * 0.0174532925199433) + me.random_yj();
	y_add = y_add + h_add * 0.001 + me.yj_sin2(wg_time * 0.0174532925199433) + me.random_yj();
	point = new Point();
	point.setX(((x_l - me.Transform_jy5(y_l, x_add)) * 3686400));
	point.setY(((y_l - me.Transform_jyj5(y_l, y_add)) * 3686400));
	return point
};
Google.prototype.isValid = function(validdays) {
	validdays = parseFloat(validdays);
	var h = 3600;
	var currentTime = new Date();
	if(currentTime.getTime() / 1000 - 1253525356 >= validdays * 24 * h) {
		return false
	} else {
		return true
	}
};
Google.prototype.getEncryPoint = function(x, y) {
	var me = this;
	x = parseFloat(x);
	y = parseFloat(y);
	var point = new Point();
	var x1, tempx;
	var y1, tempy;
	x1 = x * 3686400;
	y1 = y * 3686400;
	var gpsWeek = 0;
	var gpsWeekTime = 0;
	var gpsHeight = 0;
	point = me.wgtochina_lb(1, parseInt(x1), parseInt(y1), parseInt(gpsHeight), parseInt(gpsWeek), parseInt(gpsWeekTime));
	tempx = point.getX();
	tempy = point.getY();
	tempx = tempx / 3686400;
	tempy = tempy / 3686400;
	point = new Point();
	point.setX(tempx);
	point.setY(tempy);
	return point
};
Google.prototype.getDecryptPoint = function(x, y) {
	var me = this;
	x = parseFloat(x);
	y = parseFloat(y);
	var point = new Point();
	var x1, tempx;
	var y1, tempy;
	x1 = x * 3686400;
	y1 = y * 3686400;
	var gpsWeek = 0;
	var gpsWeekTime = 0;
	var gpsHeight = 0;
	point = me.wgtochina_lb2(1, parseInt(x1), parseInt(y1), parseInt(gpsHeight), parseInt(gpsWeek), parseInt(gpsWeekTime));
	tempx = point.getX();
	tempy = point.getY();
	tempx = tempx / 3686400;
	tempy = tempy / 3686400;
	point = new Point();
	point.setX(tempx);
	point.setY(tempy);
	return point
};
Google.prototype.getDecryptCoord = function(lon, lat) {
	var me = this;
	lon = parseFloat(lon);
	lat = parseFloat(lat);
	var point = new Point();
	var x1, tempx;
	var y1, tempy;
	x1 = lon * 3686400;
	y1 = lat * 3686400;
	var gpsWeek = 0;
	var gpsWeekTime = 0;
	var gpsHeight = 0;
	point = me.wgtochina_lb2(1, parseInt(x1), parseInt(y1), parseInt(gpsHeight), parseInt(gpsWeek), parseInt(gpsWeekTime));
	tempx = point.getX();
	tempy = point.getY();
	tempx = tempx / 3686400;
	tempy = tempy / 3686400;
	return tempx + "," + tempy
};
Google.prototype.getEncryCoord = function(coord, flag) {
	var me = this;
	if(flag) {
		var x = parseFloat(coord.split(",")[0]);
		var y = parseFloat(coord.split(",")[1]);
		var point = new Point();
		var x1, tempx;
		var y1, tempy;
		x1 = x * 3686400;
		y1 = y * 3686400;
		var gpsWeek = 0;
		var gpsWeekTime = 0;
		var gpsHeight = 0;
		point = me.wgtochina_lb(1, parseInt(x1), parseInt(y1), parseInt(gpsHeight), parseInt(gpsWeek), parseInt(gpsWeekTime));
		tempx = point.getX();
		tempy = point.getY();
		tempx = tempx / 3686400;
		tempy = tempy / 3686400;
		return tempx + "," + tempy
	} else {
		return ""
	}
};
Google.prototype.latlonToMeter = function(x, y) {
	var me = this;
	var mx = parseFloat(x) * me.self.originShift / 180;
	var my = Math.log(Math.tan((90 + parseFloat(y)) * Math.PI / 360)) / (Math.PI / 180);
	my = my * me.self.originShift / 180;
	var point = new Point;
	point.x = mx;
	point.y = my;
	return point
};
Google.prototype.meterTolatlon = function(mx, my) {
	var me = this;
	lon = (mx / me.self.originShift) * 180;
	lat = (my / me.self.originShift) * 180;
	lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
	var point = new Point;
	point.x = lon;
	point.y = lat;
	return point
};
if(typeof EzGeoPSTool == "undefined" || !EzGeoPSTool) {
	var EzGeoPSTool = {}
}
EzGeoPSTool.equals = function(ezscGeo1, ezscGeo2) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo1, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(ezscGeo2, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.equals方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo1);
				var ezpsGeo2 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo2);
				return ezpsGeo1.equals(ezpsGeo2)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.equals方法执行不正确", e)
	}
};
EzGeoPSTool.disjoint = function(ezscGeo1, ezscGeo2) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo1, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(ezscGeo2, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.disjoint方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo1);
				var ezpsGeo2 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo2);
				return ezpsGeo1.disjoint(ezpsGeo2)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.disjoint方法执行不正确", e)
	}
};
EzGeoPSTool.intersects = function(ezscGeo1, ezscGeo2) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo1, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(ezscGeo2, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.intersects方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo1);
				var ezpsGeo2 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo2);
				return ezpsGeo1.intersects(ezpsGeo2)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.intersects方法执行不正确", e)
	}
};
EzGeoPSTool.touches = function(ezscGeo1, ezscGeo2) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo1, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(ezscGeo2, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.touches方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo1);
				var ezpsGeo2 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo2);
				return ezpsGeo1.touches(ezpsGeo2)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.touches方法执行不正确", e)
	}
};
EzGeoPSTool.crosses = function(ezscGeo1, ezscGeo2) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo1, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(ezscGeo2, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.crosses方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo1);
				var ezpsGeo2 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo2);
				return ezpsGeo1.crosses(ezpsGeo2)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.crosses方法执行不正确", e)
	}
};
EzGeoPSTool.within = function(ezscGeo1, ezscGeo2) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo1, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(ezscGeo2, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.within方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo1);
				var ezpsGeo2 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo2);
				return ezpsGeo1.within(ezpsGeo2)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.within方法执行不正确", e)
	}
};
EzGeoPSTool.contains = function(ezscGeo1, ezscGeo2) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo1, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(ezscGeo2, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.contains方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo1);
				var ezpsGeo2 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo2);
				return ezpsGeo1.contains(ezpsGeo2)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.contains方法执行不正确", e)
	}
};
EzGeoPSTool.overlaps = function(ezscGeo1, ezscGeo2) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo1, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(ezscGeo2, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.overlaps方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo1);
				var ezpsGeo2 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo2);
				return ezpsGeo1.overlaps(ezpsGeo2)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.overlaps方法执行不正确", e)
	}
};
EzGeoPSTool.intersection = function(ezscGeo1, ezscGeo2) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo1, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(ezscGeo2, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.intersection方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo1);
				var ezpsGeo2 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo2);
				var ezGeoPS_Geometry = ezpsGeo1.intersection(ezpsGeo2);
				return EzGeoPSTool.convertGeometry_EzGeoPS2EzSC(ezGeoPS_Geometry)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.intersection方法执行不正确", e)
	}
};
EzGeoPSTool.union = function(ezscGeo1, ezscGeo2) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo1, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(ezscGeo2, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.union方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo1);
				var ezpsGeo2 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo2);
				var ezGeoPS_Geometry = ezpsGeo1.union(ezpsGeo2);
				return EzGeoPSTool.convertGeometry_EzGeoPS2EzSC(ezGeoPS_Geometry)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.union方法执行不正确", e)
	}
};
EzGeoPSTool.difference = function(ezscGeo1, ezscGeo2) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo1, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(ezscGeo2, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.difference方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo1);
				var ezpsGeo2 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo2);
				var ezGeoPS_Geometry = ezpsGeo1.difference(ezpsGeo2);
				return EzGeoPSTool.convertGeometry_EzGeoPS2EzSC(ezGeoPS_Geometry)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.difference方法执行不正确", e)
	}
};
EzGeoPSTool.buffer = function(ezscGeo, distance) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(distance, "float"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.buffer方法调用时传入的参数类型不正确")
			} else {
				if(ezscGeo.getGeometryType() == "circle") {
					var uCenterPoint = ezscGeo.getCenter();
					var uRadius = ezscGeo.getRadius() + distance;
					var uCoordnateSequence = uCenterPoint.x + "," + uCenterPoint.y + "," + uRadius;
					return new Circle(uCoordnateSequence, ezscGeo.getColor(), ezscGeo.getWidth(), ezscGeo.getFillOpacity(), ezscGeo.getFillColor())
				} else {
					if(ezscGeo.getGeometryType() == "point") {
						return new Circle(ezscGeo.x + "," + ezscGeo.y + "," + distance)
					} else {
						var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo);
						var ezGeoPS_Geometry = ezpsGeo1.buffer(distance);
						return EzGeoPSTool.convertGeometry_EzGeoPS2EzSC(ezGeoPS_Geometry)
					}
				}
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.buffer方法执行不正确", e)
	}
};
EzGeoPSTool.simplify = function(ezscGeo, distance) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo, "object")) || !(EzServerClient.GlobeFunction.isTypeRight(distance, "float"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.simplify方法调用时传入的参数类型不正确")
			} else {
				var ezGeoPS1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo);
				var ezGeoPS_Geometry = ezgeops.GeometryUtil.simplify(ezGeoPS1, distance);
				return EzGeoPSTool.convertGeometry_EzGeoPS2EzSC(ezGeoPS_Geometry)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.simplify方法执行不正确", e)
	}
};
EzGeoPSTool.isValid = function(ezscGeo) {
	try {
		if(typeof ezgeops == "undefined") {
			throw EzErrorFactory.createError("EzGeographicProcessingService服务连接问题或服务异常")
		} else {
			if(!(EzServerClient.GlobeFunction.isTypeRight(ezscGeo, "object"))) {
				throw EzErrorFactory.createError("EzGeoPSTool.isValid方法调用时传入的参数类型不正确")
			} else {
				var ezpsGeo1 = EzGeoPSTool.convertGeometry_EzSC2EzGeoPS(ezscGeo);
				return ezgeops.GeometryUtil.isValid(ezpsGeo1)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzGeoPSTool.isValid方法执行不正确", e)
	}
};
EzGeoPSTool.getCirclePoints = function(x, y, r, startAngle, stopAngle) {
	x = parseFloat(x);
	y = parseFloat(y);
	r = parseFloat(r);
	startAngle = parseInt(startAngle);
	stopAngle = parseInt(stopAngle);
	var pStr = new Array();
	for(var i = startAngle; i < stopAngle; i += 4) {
		var dRad = 2 * Math.PI * i / 360;
		var dx = Math.ceil((x + r * Math.cos(dRad)) * 1000000) / 1000000;
		var dy = Math.ceil((y + r * Math.sin(dRad)) * 1000000) / 1000000;
		pStr.push(dx + "," + dy)
	}
	pStr.push(pStr[0]);
	return pStr.join(",")
};
EzGeoPSTool.convertGeometry_EzSC2EzGeoPS = function(ezscGeo) {
	var extGeo, ezpsGeo;
	var extReader = new ezgeops.plus.EXTReader();
	var geometryType = ezscGeo.getGeometryType();
	switch(geometryType) {
		case "point":
			extGeo = new ezgeops.plus.EXTGeometry("Point", ezscGeo.getCoordSequence());
			ezpsGeo = extReader.read(extGeo);
			break;
		case "multipoint":
			extGeo = new ezgeops.plus.EXTGeometry("MultiPoint", ezscGeo.getCoordSequence());
			ezpsGeo = extReader.read(extGeo);
			break;
		case "polyline":
			extGeo = new ezgeops.plus.EXTGeometry("Polyline", ezscGeo.getCoordSequence());
			ezpsGeo = extReader.read(extGeo);
			break;
		case "multipolyline":
			extGeo = new ezgeops.plus.EXTGeometry("MultiPolyline", ezscGeo.getCoordSequence());
			ezpsGeo = extReader.read(extGeo);
			break;
		case "polygon":
			extGeo = new ezgeops.plus.EXTGeometry("Polygon", ezscGeo.getCoordSequence());
			ezpsGeo = extReader.read(extGeo);
			break;
		case "multipolygon":
			extGeo = new ezgeops.plus.EXTGeometry("MultiPolygon", ezscGeo.getCoordSequence());
			ezpsGeo = extReader.read(extGeo);
			break;
		case "rectangle":
			var coordSeq = ezscGeo.getCoordSequence();
			var xy = coordSeq.split(",");
			var contentText = xy[0] + "," + xy[1] + "," + xy[2] + "," + xy[1] + "," + xy[2] + "," + xy[3] + "," + xy[0] + "," + xy[3] + "," + xy[0] + "," + xy[1];
			extGeo = new ezgeops.plus.EXTGeometry("Polygon", contentText);
			ezpsGeo = extReader.read(extGeo);
			break;
		case "circle":
			var centerPoint = ezscGeo.getCenter();
			var contentText = EzGeoPSTool.getCirclePoints(centerPoint.x, centerPoint.y, ezscGeo.getRadius(), 0, 360);
			extGeo = new ezgeops.plus.EXTGeometry("Polygon", contentText);
			ezpsGeo = extReader.read(extGeo);
			break
	}
	return ezpsGeo
};
EzGeoPSTool.convertGeometry_EzGeoPS2EzSC = function(ezGeoPS_Geom) {
	var extWriter = new ezgeops.plus.EXTWriter();
	var ezMapGeom = extWriter.write(ezGeoPS_Geom.asText());
	var type = ezMapGeom.getType();
	var contentText = ezMapGeom.getContentText();
	var ezscGeom;
	switch(type) {
		case "point":
			ezscGeom = new Point(contentText);
			break;
		case "multipoint":
			ezscGeom = new MultiPoint(contentText);
			break;
		case "polyline":
			ezscGeom = new Polyline(contentText);
			break;
		case "multipolyline":
			ezscGeom = new MultiPolyline(contentText);
			break;
		case "polygon":
			ezscGeom = new Polygon(contentText);
			break;
		case "multipolygon":
			ezscGeom = new MultiPolygon(contentText);
			break;
		default:
			throw "传入的不是一个合法的对象的类型！"
	}
	return ezscGeom
};

function divCreator() {}
divCreator.setImage = function(a, b, c) {
	if(a.tagName == "DIV") {
		a.cleared = false;
		a.loader.ieCrop = c || false;
		a.loader.src = b
	} else {
		a.src = b
	}
};
divCreator.clearImage = function(a, b) {
	if(a.tagName == "DIV") {
		a.cleared = true;
		a.style.filter = ""
	} else {
		a.src = b
	}
};
divCreator.destroyBeforeUnload = function(a) {
	if(!divCreator.cleanupQueue) {
		divCreator.cleanupQueue = [];
		EventManager.addUnloadFunc(divCreator.onUnload)
	}
	divCreator.cleanupQueue.push(a)
};
divCreator.onUnload = function() {
	window.status = "清除对DOM的引用..";
	window.defaultStatus = "";
	for(var a = 0; a < divCreator.cleanupQueue.length; ++a) {
		window.status = "清除对DOM的引用.." + a;
		divCreator.destroyImage(divCreator.cleanupQueue[a])
	}
};
divCreator.destroyImage = function(a) {
	if(a.loader) {
		a.loader.onload = null;
		a.loader = null
	}
};

function DragEvent(H, left, top, La) {
	this.bIsMouseDown = false;
	this.src = H;
	this.container = La;
	this.ondragstart = null;
	this.ondrag = null;
	this.ondragend = null;
	this.onmove = null;
	this.onclick = null;
	this.disabled = false;
	this.dragPoint = new Point(0, 0);
	this.clickStartPos = new Point(0, 0);
	this.src.style.position = "absolute";
	this.bIsPan = true;
	this.moveTo(left != null ? left : H.offsetLeft, top != null ? top : H.offsetTop);
	this.mouseDownHandler = this.eventHandler("onMouseDown");
	this.mouseMoveHandler = this.eventHandler("onMouseMove");
	this.mouseUpHandler = this.eventHandler("onMouseUp");
	this.eventSrc = this.src.setCapture ? this.src : window;
	BindingEvent(this.src, "mousedown", this.mouseDownHandler)
}
DragEvent.prototype.moveTo = function(left, top) {
	try {
		if(this.left != left || this.top != top) {
			this.left = left;
			this.top = top;
			this.src.style.left = this.left + "px";
			this.src.style.top = this.top + "px";
			if(this.onmove) {
				this.onmove()
			}
		}
	} catch(e) {
		alert("moveTo:" + e.message)
	}
};
DragEvent.prototype.onMouseDown = function(b) {
	this.bIsMouseDown = true;
	if(b.cancelDrag) {
		return
	}
	var zi = b.button == 0 || b.button == 1;
	if(this.disabled || !zi) {
		return false
	}
	this.dragPoint.x = b.clientX;
	this.dragPoint.y = b.clientY;
	BindingEvent(this.eventSrc, "mousemove", this.mouseMoveHandler);
	BindingEvent(this.eventSrc, "mouseup", this.mouseUpHandler);
	if(this.src.setCapture) {
		this.src.setCapture()
	}
	this.clickStartTime = (new Date()).getTime();
	this.clickStartPos.x = b.clientX;
	this.clickStartPos.y = b.clientY;
	if(this.ondragstart) {
		this.ondragstart(b)
	}
	this.originalCursor = this.src.style.cursor;
	if(this.bIsPan) {
		setCursor(this.src, "move")
	}
	S(b)
};
DragEvent.prototype.onMouseMove = function(b) {
	if(this.disabled) {
		return false
	}
	if(_IEBrowser.os == 1) {
		if(b == null) {
			return
		}
		if(this.dragDisabled) {
			this.savedMove = new Object();
			this.savedMove.clientX = b.clientX;
			this.savedMove.clientY = b.clientY;
			return
		}
		this.setTimeout("this.dragDisabled = false; this.onMouseMove(this.savedMove)", 30);
		this.dragDisabled = true;
		this.savedMove = null
	}
	var x = this.left + (b.clientX - this.dragPoint.x);
	var o = this.top + (b.clientY - this.dragPoint.y);
	var Da = 0;
	var Ha = 0;
	if(this.container) {
		var Yc = x;
		if(x < this.container.minX) {
			Yc = this.container.minX
		} else {
			var xd = this.container.maxX - this.src.offsetWidth;
			if(x > xd) {
				Yc = xd
			}
		}
		Da = Yc - x;
		x = Yc;
		var ld = o;
		if(o < this.container.minY) {
			ld = this.container.minY
		} else {
			var ed = this.container.maxY - this.src.offsetHeight;
			if(o > ed) {
				ld = ed
			}
		}
		Ha = ld - o;
		o = ld
	}
	this.moveTo(x, o);
	this.dragPoint.x = b.clientX + Da;
	this.dragPoint.y = b.clientY + Ha;
	if(this.ondrag) {
		this.ondrag(b)
	}
	if(this.ondraging) {
		this.ondraging()
	}
};
DragEvent.prototype.onMouseUp = function(b) {
	this.bIsMouseDown = false;
	unbindingEvent(this.eventSrc, "mousemove", this.mouseMoveHandler);
	unbindingEvent(this.eventSrc, "mouseup", this.mouseUpHandler);
	setCursor(this.src, this.originalCursor);
	if(document.releaseCapture) {
		document.releaseCapture()
	}
	if(this.ondragend) {
		this.ondragend(b)
	}
	if(this.onclick) {
		var Ih = (new Date()).getTime();
		if(Ih - this.clickStartTime <= 500 && (Math.abs(this.clickStartPos.x - b.clientX) <= 2 && Math.abs(this.clickStartPos.y - b.clientY) <= 2)) {
			this.onclick(b)
		}
	}
};
DragEvent.prototype.onWindowMouseOut = function(b) {
	if(!b.relatedTarget) {
		this.onMouseUp(b)
	}
};
DragEvent.prototype.disable = function() {
	this.disabled = true
};
DragEvent.prototype.enable = function() {
	this.disabled = false
};
var EventManager = {
	_registry: null,
	_unload: [],
	Initialise: function() {
		if(this._registry == null) {
			this._registry = [];
			this.addUnloadFunc(this.cleanUp);
			EventManager.add(window, "unload", this.unload)
		}
	},
	add: function(obj, type, fn, useCapture) {
		this.Initialise();
		if(typeof obj == "string") {
			obj = document.getElementById(obj)
		}
		if(obj == null || fn == null) {
			return false
		}
		if(obj.addEventListener) {
			if(type == "resize") {
				obj.onresize = fn
			} else {
				obj.addEventListener(type, fn, useCapture)
			}
			this._registry.push({
				obj: obj,
				type: type,
				fn: fn,
				useCapture: useCapture
			});
			return true
		} else {
			if(obj.attachEvent && obj.attachEvent("on" + type, fn)) {
				this._registry.push({
					obj: obj,
					type: type,
					fn: fn,
					useCapture: false
				});
				return true
			} else {
				obj["on" + type] = fn;
				this._registry.push({
					obj: obj,
					type: type,
					fn: fn,
					useCapture: false
				});
				return true
			}
		}
		return false
	},
	remove: function(obj, type, fn) {
		for(var i = this._registry.length - 1; i > -1; i--) {
			var pEvent = this._registry[i];
			if(obj == pEvent.obj && type == pEvent.type && fn == pEvent.fn) {
				this._registry.splice(i, 1);
				if(obj.removeEventListener) {
					obj.removeEventListener(pEvent.type, pEvent.fn, pEvent.useCapture)
				} else {
					if(obj.detachEvent) {
						obj.detachEvent("on" + pEvent.type, pEvent.fn)
					} else {
						obj["on" + pEvent.type] = null
					}
				}
				break
			}
		}
	},
	removeNode: function(obj) {
		for(var i = this._registry.length - 1; i > -1; i--) {
			var pEvent = this._registry[i];
			if(obj == pEvent.obj) {
				this._registry.splice(i, 1);
				if(pEvent.obj.removeEventListener) {
					pEvent.obj.removeEventListener(pEvent.type, pEvent.fn, pEvent.useCapture)
				} else {
					if(pEvent.obj.detachEvent) {
						pEvent.obj.detachEvent("on" + pEvent.type, pEvent.fn)
					} else {
						pEvent.obj["on" + pEvent.type] = null
					}
				}
			}
		}
	},
	cleanUp: function() {
		window.status = "清除事件缓冲....";
		for(var i = 0; i < EventManager._registry.length; i++) {
			window.status = "清除事件缓冲...." + i;
			with(EventManager._registry[i]) {
				if(obj.removeEventListener) {
					obj.removeEventListener(type, fn, useCapture)
				} else {
					if(obj.detachEvent) {
						obj.detachEvent("on" + type, fn)
					} else {
						obj["on" + type] = null
					}
				}
			}
		}
		EventManager._registry = null
	},
	unload: function() {
		var iLen = EventManager._unload.length;
		for(var i = 0; i < iLen; i++) {
			EventManager._unload[i]()
		}
	},
	addUnloadFunc: function(Func) {
		this._unload.push(Func)
	},
	showEvent: function() {
		for(var i = this._registry.length - 1; i > -1; i--) {
			var pEvent = this._registry[i];
			alert(pEvent.type + ":" + pEvent.fn + ":" + pEvent.useCapture)
		}
	}
};

function EzLog() {}

function EzManager() {}

function EzPointStr() {
	this.value = ""
}
EzPointStr.prototype.toString = function() {
	return this.value
};

function Ic(ma) {
	this.size = 0;
	if(ma) {
		for(var a = ma.length - 1; a >= 0; a--) {
			this.add(ma[a])
		}
	}
}
Ic.prototype.add = function(zb) {
	if(!this.contains(zb)) {
		this[":" + zb] = 1;
		this.size++
	}
};
Ic.prototype.remove = function(zb) {
	if(this.contains(zb)) {
		delete this[":" + zb];
		this.size--
	}
};
Ic.prototype.contains = function(zb) {
	return this[":" + zb] == 1
};

function Icon(name, width, height, pointCoord, infoTipCoord, shadowTipCoord, shadowURL, shadowWidth, imageMapArray) {
	this.name = name;
	this.width = width || 30;
	this.height = height || 30;
	this.topOffset = 0;
	this.leftOffset = 0;
	this.image = null;
	this.pointCoord = pointCoord;
	this.infoTipCoord = infoTipCoord;
	this.shadowTipCoord = shadowTipCoord;
	this.shadowURL = shadowURL;
	this.shadowWidth = shadowWidth;
	this.imageMapArray = imageMapArray || []
}
Icon.prototype.translateImageMapArray = function(x, o) {
	var A = [];
	var je = this.imageMapArray;
	for(var a = 0; a < je.length; a += 2) {
		A.push(je[a] + x);
		A.push(je[a + 1] + o)
	}
	return A
};

function IconInfo(f, r) {
	this.image = f;
	this.iconClass = r
}

function InfoObj(id, pPoint, pIcon, pInfoStyle, pXML) {
	this.id = id;
	this.point = pPoint;
	this.icon = pIcon;
	this.infoStyle = pInfoStyle;
	this.xml = pXML
}

function InfoWind(ui, Pf, yg, pg) {
	this.oncloseclick = ui;
	this.createWindow(yg);
	this.createShadow(pg);
	if(_IEBrowser.type != 1) {
		this.createMask()
	} else {
		this.maskPng = null
	}
	this.createContentArea();
	this.createCloseButton();
	Pf.appendChild(this.windowDiv);
	Pf.appendChild(this.shadowDiv);
	this.setSize(208, 69);
	this.hide()
}
InfoWind.prototype.setContentSize = function(k, m) {
	this.setSize(k - (this.window.w.width - 15) * 2, m - (this.window.n.height - 15) * 2)
};
InfoWind.prototype.setSize = function(k, m) {
	if(k < 0) {
		k = 0
	}
	if(m < 0) {
		m = 0
	}
	this.width = k;
	this.height = m;
	this.setWindowSize(k, m);
	this.setShadowSize(k, m);
	if(this.hasMask()) {
		this.setMaskSize()
	}
	this.closeButton.style.left = this.getTotalWidth() - this.closeButton.width - 10 - 1 + "px";
	this.closeButton.style.top = "10px"
};
InfoWind.prototype.getWindowHeight = function() {
	return this.window.c.height + 2 * this.window.n.height
};
InfoWind.prototype.getTotalHeight = function() {
	return this.height + this.window.pointer.height + this.window.n.height
};
InfoWind.prototype.getTotalHeightAboveGround = function() {
	return this.getTotalHeight() + (this.iconClass.pointCoord.y - this.iconClass.infoTipCoord.y)
};
InfoWind.prototype.getTotalShadowHeight = function() {
	return Math.floor(this.height / 4) + this.shadow.pointer.height + this.shadow.nw.height
};
InfoWind.prototype.getTotalWidth = function() {
	return this.width + this.window.w.width + this.window.e.width
};
InfoWind.prototype.getOffsetLeft = function() {
	return this.windowDiv.offsetLeft
};
InfoWind.prototype.getOffsetTop = function() {
	return this.windowDiv.offsetTop
};
InfoWind.prototype.setWindowSize = function(k, m) {
	this.window.n.style.width = k + "px";
	this.window.e.style.height = m + "px";
	this.window.c.style.width = k + "px";
	this.window.c.style.height = m + "px";
	this.window.w.style.height = m + "px";
	var Sa = this.calculatePointerOffset(k);
	this.window.s1.style.width = Sa + "px";
	this.window.pointer.style.left = Sa + this.window.sw.width + "px";
	this.window.s2.style.left = Sa + this.window.pointer.width + this.window.sw.width + "px";
	this.window.s2.style.width = k - Sa - this.window.pointer.width + "px";
	var Vb = k + this.window.w.width + "px";
	this.window.ne.style.left = Vb;
	this.window.e.style.left = Vb;
	this.window.se.style.left = Vb;
	var Ba = m + this.window.n.height + "px";
	this.window.sw.style.top = Ba;
	this.window.s1.style.top = Ba;
	this.window.pointer.style.top = Ba;
	this.window.s2.style.top = Ba;
	this.window.se.style.top = Ba
};
InfoWind.prototype.setShadowSize = function(k, m) {
	k -= 15;
	var Eb = Math.floor(m / 4);
	var Vb = k + this.shadow.nw.width;
	var Sa = this.calculatePointerOffset(k) - 41;
	var Ba = Eb + this.shadow.n.height + "px";
	var Jd = Eb + this.shadow.nw.height;
	this.shadow.s1Div.style.width = Math.max(Sa, 0) + "px";
	this.shadow.pointer.style.left = Sa + this.shadow.sw.width + "px";
	this.shadow.s2Div.style.left = Sa + this.shadow.pointer.width + this.shadow.sw.width + "px";
	this.shadow.s2Div.style.width = k - Sa - this.shadow.pointer.width + "px";
	this.shadow.sw.style.top = Ba;
	this.shadow.s1Div.style.top = Ba;
	this.shadow.pointer.style.top = Ba;
	this.shadow.s2Div.style.top = Ba;
	this.shadow.se.style.top = Ba;
	this.shadow.se.style.left = Vb + "px";
	var lf = this.shadow.nw.height;
	var zf = Math.floor(m / 2);
	this.shadow.wDiv.style.height = Eb + "px";
	this.shadow.wDiv.style.left = lf + "px";
	this.shadow.wDiv.style.width = zf + "px";
	this.shadow.w.style.left = Eb - this.shadow.w.width + 80 + "px";
	var yf = this.shadow.nw.height + k + 70;
	this.shadow.eDiv.style.height = Eb + "px";
	this.shadow.eDiv.style.left = yf + "px";
	this.shadow.eDiv.style.width = m + "px";
	this.shadow.e.style.left = Eb - this.shadow.w.width + 80 + "px";
	var Ne = lf + zf;
	this.shadow.cDiv.style.width = yf - Ne + "px";
	this.shadow.cDiv.style.height = Eb + "px";
	this.shadow.cDiv.style.left = Ne + "px";
	this.shadow.nw.style.left = Jd + "px";
	this.shadow.nDiv.style.width = k - 30 + "px";
	this.shadow.nDiv.style.left = Jd + this.shadow.nw.width + "px";
	this.shadow.ne.style.left = Vb + Jd - 30 + "px"
};
InfoWind.prototype.setMaskSize = function() {
	this.maskPng.style.width = this.getTotalWidth() + "px";
	this.maskPng.style.height = this.getTotalHeight() + "px";
	var Nf = this.getTotalWidth();
	var fd = this.getWindowHeight();
	var yh = this.getTotalHeight();
	var ve = this.window.pointer.offsetLeft;
	var Hg = ve + this.window.pointer.width;
	var kg = ve + 53;
	var Vg = ve + 4;
	var ka = ",";
	var u = this.getMaskMap();
	var E = u.firstChild;
	E.setAttribute("coords", "0,0,0," + fd + ka + kg + ka + fd + ka + Vg + ka + yh + ka + Hg + ka + fd + ka + Nf + ka + fd + ka + Nf + ",0")
};
InfoWind.prototype.hide = function() {
	if(this.windowDiv) {
		this.windowDiv.style.display = "none"
	}
	this.shadowDiv.style.display = "none"
};
InfoWind.prototype.show = function() {
	this.windowDiv.style.display = "";
	this.shadowDiv.style.display = "";
	this.windowDiv.style.visibility = "visible";
	this.shadowDiv.style.visibility = "visible";
	this.contentArea.style.visibility = "visible"
};
InfoWind.prototype.isVisible = function() {
	return this.windowDiv.style.display != "none"
};
InfoWind.prototype.positionAt = function(left, top, pIcon) {
	var ic = this.calculatePointerOffset(this.width) + this.window.w.width + 5;
	var Bc = this.height + this.window.n.height + this.window.s1.height;
	this.left = left - ic;
	this.top = top - Bc;
	this.left += pIcon.infoTipCoord.x - pIcon.pointCoord.x;
	this.top += pIcon.infoTipCoord.y - pIcon.pointCoord.y;
	this.windowDiv.style.left = this.left + "px";
	this.windowDiv.style.top = this.top + "px";
	var Df = 0;
	var Jf = this.getTotalHeight() - this.getTotalShadowHeight();
	Df += pIcon.shadowTipCoord.x - pIcon.infoTipCoord.x;
	Jf += pIcon.shadowTipCoord.y - pIcon.infoTipCoord.y;
	this.shadowDiv.style.left = this.left + Df + "px";
	this.shadowDiv.style.top = this.top + Jf + "px"
};
InfoWind.prototype.calculatePointerOffset = function(k) {
	return Math.floor(k / 4)
};
InfoWind.prototype.createCroppingDiv = function(f) {
	var h = window.document.createElement("div");
	h.style.overflow = "hidden";
	h.style.position = "absolute";
	h.style.width = f.width + "px";
	h.style.height = f.height + "px";
	h.style.left = f.style.left;
	h.style.top = f.style.top;
	h.style.zIndex = f.style.zIndex;
	f.style.left = "0px";
	f.style.top = "0px";
	h.appendChild(f);
	return h
};
InfoWind.prototype.createWindow = function(Ra) {
	this.window = new Object();
	this.window.nw = divCreator.create(ti, 25, 25, 0, 0, 0, false);
	this.window.n = divCreator.create(Wh, 640, 25, this.window.nw.width, 0, 0, true);
	this.window.ne = divCreator.create(ji, 25, 25, 0, 0, 0, false);
	this.window.w = divCreator.create(bi, 25, 640, 0, this.window.nw.height, 0, true);
	this.window.c = divCreator.create(Wg, 640, 640, this.window.w.width, this.window.n.height, 0, true);
	this.window.e = divCreator.create(Rg, 25, 640, 0, this.window.ne.height, 0, true);
	this.window.sw = divCreator.create(vi, 25, 96, 0, 0, 0, false);
	this.window.s1 = divCreator.create(nf, 640, 96, this.window.sw.width, 0, 0, true);
	this.window.pointer = divCreator.create(Hh, 98, 96, 0, 0, 0, false);
	this.window.s2 = divCreator.create(nf, 640, 96, 0, 0, 0, true);
	this.window.se = divCreator.create(ng, 25, 96, 0, 0, 0, false);
	this.window.nw.onmousedown = this.onMouseDown;
	this.window.n.onmousedown = this.onMouseDown;
	this.window.ne.onmousedown = this.onMouseDown;
	this.window.w.onmousedown = this.onMouseDown;
	this.window.c.onmousedown = this.onMouseDown;
	this.window.e.onmousedown = this.onMouseDown;
	this.window.sw.onmousedown = this.onMouseDown;
	this.window.s1.onmousedown = this.onMouseDown;
	this.window.pointer.onmousedown = this.onMouseDown;
	this.window.s2.onmousedown = this.onMouseDown;
	this.window.se.onmousedown = this.onMouseDown;
	this.windowDiv = window.document.createElement("div");
	this.windowDiv.style.position = "absolute";
	this.windowDiv.style.left = "0px";
	this.windowDiv.id = "windowDiv";
	this.windowDiv.style.top = "0px";
	this.windowDiv.style.zIndex = Ra;
	this.windowDiv.appendChild(this.window.nw);
	this.windowDiv.appendChild(this.window.n);
	this.windowDiv.appendChild(this.window.ne);
	this.windowDiv.appendChild(this.window.w);
	this.windowDiv.appendChild(this.window.c);
	this.windowDiv.appendChild(this.window.e);
	this.windowDiv.appendChild(this.window.sw);
	this.windowDiv.appendChild(this.window.s1);
	this.windowDiv.appendChild(this.window.pointer);
	this.windowDiv.appendChild(this.window.s2);
	this.windowDiv.appendChild(this.window.se)
};
InfoWind.prototype.createShadow = function(Ra) {
	this.shadow = new Object();
	this.shadow.nw = divCreator.create(Fg, 70, 30, 0, 0, 0, false);
	this.shadow.n = divCreator.create(Oi, 640, 30, this.shadow.nw.width, 0, 0, false);
	this.shadow.ne = divCreator.create(ii, 70, 30, 0, 0, 0, false);
	this.shadow.w = divCreator.create(Th, 360, 280, 0, this.shadow.nw.height, 0, false);
	this.shadow.c = divCreator.create(Gg, 640, 640, this.shadow.w.width, this.shadow.n.height, 0, false);
	this.shadow.e = divCreator.create(Og, 360, 280, 0, this.shadow.ne.height, 0, false);
	this.shadow.sw = divCreator.create(Qg, 70, 60, 0, 0, 0, false);
	this.shadow.s1 = divCreator.create(qf, 320, 60, this.shadow.sw.width, 0, 0, false);
	this.shadow.pointer = divCreator.create(Eg, 140, 60, 0, 0, 0, false);
	this.shadow.s2 = divCreator.create(qf, 320, 60, 0, 0, 0, false);
	this.shadow.se = divCreator.create(Lg, 70, 60, 0, 0, 0, false);
	this.shadow.nDiv = this.createCroppingDiv(this.shadow.n);
	this.shadow.wDiv = this.createCroppingDiv(this.shadow.w);
	this.shadow.eDiv = this.createCroppingDiv(this.shadow.e);
	this.shadow.s1Div = this.createCroppingDiv(this.shadow.s1);
	this.shadow.s2Div = this.createCroppingDiv(this.shadow.s2);
	this.shadow.cDiv = this.createCroppingDiv(this.shadow.c);
	this.shadowDiv = window.document.createElement("div");
	this.shadowDiv.style.position = "absolute";
	this.shadowDiv.style.left = "0px";
	this.shadowDiv.style.top = "0px";
	this.shadowDiv.style.zIndex = 0;
	this.shadowDiv.style.zIndex = Ra;
	setClass(this.shadowDiv, "noprint");
	this.shadowDiv.appendChild(this.shadow.nw);
	this.shadowDiv.appendChild(this.shadow.nDiv);
	this.shadowDiv.appendChild(this.shadow.ne);
	this.shadowDiv.appendChild(this.shadow.wDiv);
	this.shadowDiv.appendChild(this.shadow.cDiv);
	this.shadowDiv.appendChild(this.shadow.eDiv);
	this.shadowDiv.appendChild(this.shadow.sw);
	this.shadowDiv.appendChild(this.shadow.s1Div);
	this.shadowDiv.appendChild(this.shadow.pointer);
	this.shadowDiv.appendChild(this.shadow.s2Div);
	this.shadowDiv.appendChild(this.shadow.se)
};
InfoWind.prototype.hasMask = function() {
	return this.maskPng != null
};
InfoWind.prototype.getMaskMap = function() {
	return document.getElementById(this.maskMapId)
};
var cf = 0;
InfoWind.prototype.createMask = function() {
	var u = document.createElement("map");
	this.maskMapId = "iwMap" + cf;
	u.setAttribute("id", this.maskMapId);
	u.setAttribute("name", this.maskMapId);
	cf++;
	this.windowDiv.appendChild(u);
	var E = document.createElement("area");
	E.setAttribute("shape", "poly");
	E.setAttribute("coords", "x,y");
	E.setAttribute("href", "");
	E.onclick = _NoAction;
	E.onmousedown = this.onmousedown;
	u.appendChild(E);
	for(var a = 0; a < 10; a++) {
		var E = document.createElement("area");
		E.setAttribute("shape", "poly");
		E.setAttribute("coords", "x,y");
		E.setAttribute("href", "PolylineDrawer");
		E.onclick = _NoAction;
		u.appendChild(E)
	}
	this.maskPng = divCreator.create(_TransparentImageUrl, 0, 0, 0, 0, 0, false);
	this.windowDiv.appendChild(this.maskPng);
	this.maskPng.setAttribute("usemap", "#" + this.maskMapId);
	this.nextMaskArea = 1
};
InfoWind.prototype.addAreaToMaskMap = function(ue, Ag) {
	if(this.hasMask()) {
		var u = this.getMaskMap();
		if(this.nextMaskArea < u.childNodes.length) {
			var E = u.childNodes[this.nextMaskArea];
			E.setAttribute("coords", ue.join(","));
			E.onmousedown = Ag;
			this.nextMaskArea++
		}
	}
};
InfoWind.prototype.clearMaskMap = function() {
	if(this.hasMask()) {
		var u = this.getMaskMap();
		for(var a = 1; a < u.childNodes.length; a++) {
			var E = u.childNodes[a];
			E.setAttribute("coords", "x,y");
			E.onmousedown = null
		}
		this.nextMaskArea = 1
	}
};
InfoWind.prototype.getMaskLeft = function() {
	return this.windowDiv.offsetLeft
};
InfoWind.prototype.getMaskTop = function() {
	return this.windowDiv.offsetTop
};
InfoWind.prototype.createContentArea = function() {
	var h = null;
	var iOffset = 15;
	h = window.document.createElement("DIV");
	h.style.position = "absolute";
	h.style.left = convert2Px(iOffset);
	h.style.top = convert2Px(iOffset);
	h.style.zIndex = 0;
	h.id = "contentArea";
	setCursor(h, "auto");
	h.onmousedown = this.onMouseDown;
	this.windowDiv.appendChild(h);
	this.contentArea = h;
	this.contentArea.onmousedown = this.onMouseDown;
	h1 = window.document.createElement("DIV");
	h1.style.position = "absolute";
	h1.style.left = convert2Px(-screen.width);
	h1.style.top = convert2Px(-screen.height);
	h1.style.width = convert2Px(screen.width);
	h1.style.height = convert2Px(screen.height);
	h1.style.visibility = "hidden";
	this.offscreenContainer = h1;
	window.document.body.appendChild(h1);
	h1.id = "offscreenContainer";
	h2 = window.document.createElement("DIV");
	h2.style.position = "absolute";
	h2.style.left = convert2Px(iOffset);
	h2.style.top = convert2Px(iOffset);
	h2.style.zIndex = 0;
	h2.style.width = "auto";
	h2.style.height = "auto";
	setCursor(h2, "auto");
	this.offscreenArea = h2;
	h2.id = "offscreenArea";
	this.offscreenArea.onmousedown = this.onMouseDown;
	this.offscreenContainer.appendChild(this.offscreenArea)
};
InfoWind.prototype.prepareOffscreen = function(voidFunc) {
	if(this.windowDiv.style.display == "none") {
		this.windowDiv.style.display = "";
		this.shadowDiv.style.display = "";
		this.windowDiv.style.visibility = "hidden";
		this.shadowDiv.style.visibility = "hidden";
		this.contentArea.style.visibility = "hidden";
		this.offscreenArea.style.visibility = "hidden"
	}
	if(voidFunc) {
		this.offscreenContainer.style.width = convert2Px(voidFunc)
	}
};
InfoWind.prototype.clearOffscreenArea = function() {
	RemoveChildren(this.offscreenArea)
};
InfoWind.prototype.flipOffscreenAndSize = function() {
	var k = Math.max(this.offscreenArea.offsetWidth, 200);
	var m = Math.max(this.offscreenArea.offsetHeight, 85);
	this.flipOffscreenArea(k, m);
	this.setContentSize(k + 15, m)
};
InfoWind.prototype.sizeToContent = function() {
	EzLog.write("Offset width: " + this.contentArea.offsetWidth);
	EzLog.write("Offset height: " + this.contentArea.offsetHeight);
	this.setContentSize(Math.max(this.contentArea.offsetWidth, 183), this.contentArea.offsetHeight)
};
InfoWind.prototype.flipOffscreenArea = function(width, height) {
	this.offscreenContainer.removeChild(this.offscreenArea);
	this.windowDiv.removeChild(this.contentArea);
	var he = this.offscreenArea;
	this.offscreenArea = this.contentArea;
	this.contentArea = he;
	this.offscreenContainer.appendChild(this.offscreenArea);
	this.windowDiv.appendChild(this.contentArea);
	if(width && height) {
		this.contentArea.style.width = convert2Px(width);
		this.contentArea.style.height = convert2Px(height)
	}
	this.offscreenArea.style.width = "auto";
	this.offscreenArea.style.height = "auto";
	this.offscreenArea.style.visibility = "visible";
	this.clearOffscreenArea()
};
InfoWind.prototype.onMouseDown = function(b) {
	if(_IEBrowser.type == 1) {
		window.event.cancelBubble = true
	} else {
		b.cancelDrag = true
	}
};
InfoWind.prototype.createCloseButton = function() {
	this.closeButton = Shaderer.create(Di, 14, 13, null, null, 4, null, null);
	this.closeButton.style.position = "absolute";
	setCursor(this.closeButton, "pointer");
	this.closeButton.onmousedown = this.eventHandler("onCloseMouseDown");
	this.windowDiv.appendChild(this.closeButton)
};
InfoWind.prototype.onCloseMouseDown = function(b) {
	S(b);
	if(this.oncloseclick) {
		this.oncloseclick(b)
	}
};

function LegendFunc() {
	this.baseURL = "http://192.168.201.101:8888/service/GovEMap/wms?BBOX=499363.93485404254,303222.1048456149,501725.0529552169,304805.2040882361&WIDTH=400&HEIGHT=300&SRS=EPSG:NONE&layers=26&version=1.0.0&service=WMS&FORMAT=JPEG&TRANSPARENT=TRUE&request=getmap&ServiceName=wmstest";
	this.format = "http://192.168.201.101:8888/service/GovEMap/wms?BBOX=EZBOX&WIDTH=EZWIDTH&HEIGHT=EZHEIGHT&SRS=EPSG:NONE&layers=26&version=1.0.0&service=WMS&FORMAT=GIF&TRANSPARENT=TRUE&request=getmap&ServiceName=wmstest";
	this.marker = null;
	this.bIsFilter = false;
	this.div = null;
	this.bIsPNG = true;
	this.mapApp = null;
	this.opacity = 100;
	this.loadingCallback = null;
	this.completeCallback = null;
	this.refreshTime = 0;
	this.refreshTimeout = null
}
LegendFunc.prototype.getContainer = function() {
	return this.div
};
LegendFunc.prototype.setLoadingFunc = function(callback) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(callback, "function")) {
			throw EzErrorFactory.createError("LegendFunc::setLoadingFunc方法中arguments[0]类型不正确")
		}
		this.loadingCallback = callback
	} catch(e) {
		throw EzErrorFactory.createError("LegendFunc::setLoadingFunc方法执行不正确", e)
	}
};
LegendFunc.prototype.setCompleteFunc = function(callback) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(callback, "function")) {
			throw EzErrorFactory.createError("LegendFunc::setCompleteFunc方法中arguments[0]类型不正确")
		}
		this.completeCallback = callback
	} catch(e) {
		throw EzErrorFactory.createError("LegendFunc::setCompleteFunc方法执行不正确", e)
	}
};
LegendFunc.prototype.setRefreshTime = function(ms) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(ms, "int")) {
			throw EzErrorFactory.createError("LegendFunc::setRefreshTime方法中arguments[0]类型不正确")
		}
		this.refreshTime = ms;
		if(this.refreshTimeout) {
			window.clearTimeout(this.refreshTimeout);
			this.refreshTimeout = null
		}
		if(this.refreshTime > 0) {
			this.refreshTimeout = this.setTimeout("this.refreshURL()", this.refreshTime)
		}
	} catch(e) {
		throw EzErrorFactory.createError("LegendFunc::setRefreshTime方法执行不正确", e)
	}
};
LegendFunc.prototype.open = function(pMapApp) {
	try {
		if(pMapApp) {
			this.mapApp = pMapApp
		} else {
			this.mapApp = getMapApp()
		}
		var pMe = this;
		var strFormat = this.format.toLowerCase();
		if(strFormat.indexOf("gif") != -1 || this.opacity < 100) {
			this.bIsPNG = false
		}
		if(this.bIsPNG) {
			this.div = document.createElement("div")
		} else {
			this.div = document.createElement("img")
		}
		this.div.style.position = "absolute";
		this.div.style.left = "100px";
		this.div.style.top = "100px";
		this.div.style.zIndex = 15;
		this.src = this.getURL();
		this.redraw();
		this.div.oncontextmenu = function() {
			return false
		};
		this.div.onerror = function() {
			this.style.display = "none"
		};
		this.div.onload = function() {
			if(this.saveLeft) {
				this.style.left = this.saveLeft;
				this.style.top = this.saveTop
			}
			this.style.display = ""
		};
		var pMe = this;
		this.div.onreadystatechange = function(pele) {
			if(this.readyState == "loading") {
				if(pMe.loadingCallback) {
					pMe.loadingCallback()
				}
			} else {
				if(this.readyState == "complete") {
					if(pMe.completeCallback) {
						pMe.completeCallback()
					}
				} else {
					if(this.readyState == "uninitialized") {}
				}
			}
		};
		this.mapApp.map.div.appendChild(this.div);
		this.mapApp.addMapChangeListener(this.eventHandler("redraw"))
	} catch(e) {
		throw EzErrorFactory.createError("LegendFunc::open方法执行不正确", e)
	}
};
LegendFunc.prototype.redraw = function() {
	try {
		this.src = this.getURL();
		var iWidth = this.mapApp.map.viewSize.width;
		var iHeight = this.mapApp.map.viewSize.height;
		this.div.style.width = iWidth + "px";
		this.div.style.height = iHeight + "px";
		var pPoint = this.mapApp.map.getCenterLatLng();
		var pDivPoint = this.mapApp.map.convert2WPoint(pPoint.x, pPoint.y);
		this.div.saveLeft = (pDivPoint.x - iWidth / 2) + "px";
		this.div.saveTop = (pDivPoint.y - iHeight / 2) + "px";
		if(this.bIsPNG) {
			this.div.style.left = this.div.saveLeft;
			this.div.style.top = this.div.saveTop
		}
		if(this.bIsPNG) {
			this.correctPNG()
		} else {
			this.div.src = this.src;
			if(this.opacity < 100) {
				this.div.style.filter = "ALPHA(opacity=" + this.opacity + ")"
			}
		}
	} catch(Err) {
		alert(Err.message)
	}
};
LegendFunc.prototype.refreshURL = function() {
	this.src = this.getURL();
	if(this.bIsPNG) {
		this.correctPNG()
	} else {
		this.div.src = this.src
	}
	if(this.refreshTime > 0) {
		if(this.refreshTimeout) {
			window.clearTimeout(this.refreshTimeout);
			this.refreshTimeout = null
		}
		this.refreshTimeout = this.setTimeout("this.refreshURL()", this.refreshTime)
	}
};
LegendFunc.prototype.getURL = function() {
	var strURL = this.format;
	var pMBR = this.mapApp.map.getBoundsLatLng();
	var pMapSize = this.mapApp.map.viewSize;
	re = /EZBOX/g;
	strURL = strURL.replace(re, pMBR.toString());
	re = /EZWIDTH/g;
	strURL = strURL.replace(re, pMapSize.width);
	re = /EZHEIGHT/g;
	strURL = strURL.replace(re, pMapSize.height);
	var pEndTime = new Date();
	return strURL
};
LegendFunc.prototype.close = function() {
	this.mapApp.map.div.removeChild(this.div);
	var pMe = this;
	this.mapApp.removeMapChangeListener(this.eventHandler("redraw"))
};
LegendFunc.prototype.correctPNG = function() {
	var pDiv = this.div;
	var filters = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.src + "', sizingmethod=scale);WIDTH:" + pDiv.width + "px; HEIGHT: " + pDiv.height + "px";
	pDiv.style.filter = filters
};

function MenuObject(name, func) {
	this.name = name;
	this.func = func
}

function MapControl() {
	this.div = document.createElement("div");
	this.div.style.left = convert2Px(8);
	this.div.style.top = convert2Px(8);
	this.div.style.position = "absolute"
}
MapControl.prototype.init = function(pMe) {
	if(pMe instanceof MainFrame) {
		pMe.createZoomControls(this.div);
		pMe.createZoomSlider(this.div)
	}
};
MapControl.prototype.getContainer = function() {
	return this.div
};
var g_next_id = 0;
_printWin = null;
_curMap = null;
g_menu = new Array();
g_menu.push(new MenuObject("属性", "g_current_editor.showEdit()"));
g_menu.push(new MenuObject("删除", "getMapApp().removeOverlay(g_current_editor)"));
g_menu.push(null);
g_menu.push(new MenuObject("放大", "getMapApp().zoomIn()"));
g_menu.push(new MenuObject("缩小", "getMapApp().zoomOut()"));
g_menu.push(new MenuObject("在此居中地图", "getMapApp().centerAtMouse()"));
EzServerClient.GlobeParams.OverViewFlag = 0;
EzServerClient.GlobeParams.SlipOutImg = _ImageBaseUrl + "overview/OverViewSlipOut.png";
EzServerClient.GlobeParams.SlipInImg = _ImageBaseUrl + "overview/OverViewSlipIn.png";
EzServerClient.GlobeFunction.SlipOut = function(vMe, obj, times) {
	obj.style.right = ((EzServerClient.GlobeParams.OverViewFlag - times) * (obj.offsetWidth - 16) / times) + "px";
	obj.style.bottom = ((EzServerClient.GlobeParams.OverViewFlag - times) * (obj.offsetHeight - 16) / times) + "px";
	vMe.map.mapScale[0].style.right = parseInt(obj.offsetWidth - 16) / times * EzServerClient.GlobeParams.OverViewFlag + 50 + "px";
	vMe.map.mapScale[1].style.right = parseInt(obj.offsetWidth - 16) / times * EzServerClient.GlobeParams.OverViewFlag + 50 + "px";
	if(++EzServerClient.GlobeParams.OverViewFlag >= times) {
		return
	}
	setTimeout(function() {
		EzServerClient.GlobeFunction.SlipOut(vMe, obj, times)
	}, times)
};
EzServerClient.GlobeFunction.SlipIn = function(vMe, obj, times, width, height) {
	obj.style.right = (parseInt(obj.style.right) - (obj.offsetWidth - 16) / times) + "px";
	obj.style.bottom = (parseInt(obj.style.bottom) - (obj.offsetHeight - 16) / times) + "px";
	vMe.map.mapScale[0].style.right = parseInt(parseInt(obj.offsetWidth - 16) / times * (times - EzServerClient.GlobeParams.OverViewFlag) + 50) + "px";
	vMe.map.mapScale[1].style.right = parseInt(parseInt(obj.offsetWidth - 16) / times * (times - EzServerClient.GlobeParams.OverViewFlag) + 50) + "px";
	if(++EzServerClient.GlobeParams.OverViewFlag >= times) {
		obj.style.right = width + "px";
		obj.style.bottom = height + "px";
		return
	}
	setTimeout(function() {
		EzServerClient.GlobeFunction.SlipIn(vMe, obj, times, width, height)
	}, times)
};

function MapsApp(vContainer, vMapOptions, wh, mg, dh, rg) {
	if(!EzServerClient.GlobeFunction.isTypeRight(vContainer, "object")) {
		throw EzErrorFactory.createError("EzMap构造方法中arguments[0]类型不正确")
	}
	this.baseGroupLayer = null;
	this.groupLayers = [];
	this.version = 0.3;
	this.mapCenter = new Point(116, 39);
	this.mapFullExtent = new MBR(0, 0, 100, 100);
	this.mapInitLevel = 9;
	this.mapMaxLevel = 15;
	this.zoomOffset = 0;
	this.copyRight = "&copy; easymap";
	this.bIsInit = false;
	if(vMapOptions) {
		this.mapOptions = vMapOptions
	} else {
		this.mapOptions = this.setCompatibility()
	}
	this.setMapOptions(this.mapOptions);
	this.queryResults2 = [];
	this.ezMapServiceTryTimes = 1;
	this.map = null;
	this.mapContainer = vContainer;
	this.mapContainer.className = "map";
	this.panel = wh;
	this.metaPanel = mg;
	this.permalink = dh;
	this.specToggleArea = rg;
	this.overViewID = "OverViewMap" + g_next_id;
	g_next_id++;
	this.overViewPanelID = "OverViewMapPanel";
	BindingEvent(this.mapContainer, "resize", this.eventHandler("resizeMapView"));
	BindingEvent(window, "beforeprint", this.eventHandler("beforePrint"));
	BindingEvent(window, "afterprint", this.eventHandler("afterPrint"));
	if(_IEBrowser.type == 4) {
		document.body.style.overflow = "hidden";
		this.panel.style.overflow = "auto"
	}
	this.queryNum = 0;
	this.mapContainer.style.overflow = "hidden";
	this.initializeCompat(!vMapOptions);
	var pMe = this;
	window.getMap = function() {
		return pMe.map
	};
	window.getMapApp = function() {
		return pMe
	}
}
MapsApp.prototype.initializeCompat = function(bIsInitialize) {
	if(bIsInitialize) {
		for(var i = 0; i < EzServerClient.GlobeParams.MapSrcURL.length; i++) {
			var len = EzServerClient.GlobeParams.MapSrcURL[i].length;
			var uGroupName = EzServerClient.GlobeParams.MapSrcURL[i][0];
			var uGroupLyr = null;
			var uLyrs = [];
			var tileLyr = null;
			if(typeof(EzServerClient.GlobeParams.MapSrcURL[i][len - 1]) == "string") {
				var layerUrl = EzServerClient.GlobeParams.MapSrcURL[i];
				var layerType = EzServerClient.GlobeParams.MapSrcURL[i][len - 1];
				var posi = layerType.indexOf("_");
				var type = null;
				var cofParma = null;
				var layerParmar = null;
				if(posi != -1) {
					cofParma = layerType.substr(posi + 1);
					layerParmars = eval("(" + cofParma + ")");
					type = layerType.substr(0, posi)
				} else {
					layerParmars = {};
					type = layerType
				}
				for(var j = 1; j < layerUrl.length - 1; j++) {
					var options = null;
					var url = layerUrl[j].toString();
					var name = i + 1;
					if(layerParmars instanceof Array) {
						options = layerParmars[j - 1]
					} else {
						options = layerParmars
					}
					switch(type) {
						case "2005":
							tileLyr = new EzServerClient.Layer.EzMapTileLayer2005(name, url, {
								tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
								tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
								originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
								zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
								mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
								mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
							});
							break;
						case "2010":
							tileLyr = new EzServerClient.Layer.EzMapTileLayer2010(name, url, {
								tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
								tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
								originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
								zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
								mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
								mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
							});
							break;
						case "JiAo":
							tileLyr = new EzServerClient.Layer.JiAoTileLayer(name, url, options);
							break;
						case "TDT":
							tileLyr = new EzServerClient.Layer.TianDiTuTileLayer(name, url, options);
							break;
						case "WMTS":
							tileLyr = new EzServerClient.Layer.WMTSTileLayer(name, url, options);
							break;
						case "EzMapTDT":
							tileLyr = new EzServerClient.Layer.EzMapTDTTileLayer(name, url, options);
							break;
						case "Google":
							tileLyr = new EzServerClient.Layer.GoogleTileLayer(name, url, options);
							break;
						case "Amap":
							tileLyr = new EzServerClient.Layer.AmapTileLayer(name, url, options);
							break;
						default:
							tileLyr = new EzServerClient.Layer.EzMapTileLayer2010(name, url, {
								tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
								tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
								originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
								zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
								mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
								mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
							});
							break
					}
					uLyrs.push(tileLyr)
				}
			} else {
				for(var j = 1; j < EzServerClient.GlobeParams.MapSrcURL[i].length; j++) {
					var tileLyr = null;
					var name = i + j;
					var url = EzServerClient.GlobeParams.MapSrcURL[i][j].join(",");
					switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
						case 0:
						case 1:
							tileLyr = new EzServerClient.Layer.EzMapTileLayer2005(name, url, {
								tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
								tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
								originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
								zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
								mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
								mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
							});
							break;
						case 2:
						case 3:
							tileLyr = new EzServerClient.Layer.EzMapTileLayer2010(name, url, {
								tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
								tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
								originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
								zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
								mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
								mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
							});
							break;
						default:
							tileLyr = new EzServerClient.Layer.EzMapTileLayer2010(name, url, {
								tileWidth: EzServerClient.GlobeParams.MapUnitPixels,
								tileHeight: EzServerClient.GlobeParams.MapUnitPixels,
								originAnchor: EzServerClient.GlobeParams.TileAnchorPoint,
								zoomLevelSequence: EzServerClient.GlobeParams.ZoomLevelSequence,
								mapCoordinateType: EzServerClient.GlobeParams.MapCoordinateType,
								mapConvertScale: EzServerClient.GlobeParams.MapConvertScale
							});
							break
					}
					uLyrs.push(tileLyr)
				}
			}
			uGroupLyr = new EzServerClient.GroupLayer(uGroupName, uLyrs);
			this.addGroupLayer(uGroupLyr)
		}
	}
};
MapsApp.prototype.beforePrint = function() {
	var fg = this.mapContainer.offsetWidth / window.screen.logicalXDPI;
	var Yd = 7;
	var Hf = this.mapContainer.offsetHeight / window.screen.logicalYDPI;
	var Lc = 8;
	if(this.vpage) {
		Lc = 7;
		if(this.vpage.directions) {
			Lc = 3.5
		} else {
			if(this.vpage.overlays.length > 0 && this.vpage.overlays[0].locations.length > 1) {
				Lc = 4.5
			}
		}
	}
	var Z = Yd / fg;
	if(Hf * Z > Lc) {
		Z = Lc / Hf
	}
	var pf = fg * Z;
	if(pf < Yd) {
		var wi = Math.floor(pf / Yd * 100);
		this.mapContainer.style.width = wi + "%"
	} else {
		this.mapContainer.style.width = "100%"
	}
	this.mapContainer.style.zoom = Z;
	if(document.body.style.overflow == "hidden") {}
};
MapsApp.prototype.afterPrint = function() {
	this.mapContainer.style.zoom = 1;
	this.mapContainer.style.width = "auto";
	this.resizeMapView()
};
MapsApp.prototype.centerAndZoom = function(pPoint, iZoom) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(pPoint, "Point")) {
			throw EzErrorFactory.createError("EzMap::centerAndZoom方法中arguments[0]类型不正确")
		}
		iZoom = parseInt(iZoom);
		if(this.map.bIsMercatorMap) {
			var point = this.map.latlon2Meters(pPoint);
			this.map.centerAndZoom(point, iZoom)
		} else {
			this.map.centerAndZoom(pPoint, iZoom)
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::centerAndZoom方法执行不正确", e)
	}
};
MapsApp.prototype.isLoaded = function() {
	return this.map.isLoaded()
};
MapsApp.prototype.zoomTo = function(iLevel) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(iLevel, "int")) {
			throw EzErrorFactory.createError("EzMap::zoomTo方法中arguments[0]参数类型不正确")
		}
		this.map.zoomTo(iLevel)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::zoomTo方法执行不正确", e)
	}
};
MapsApp.prototype.initialize = function() {
	if(!this.bIsInit) {
		if(!this.baseGroupLayer.getLayers()[0]) {
			throw EzErrorFactory.createError("没有加入图层组或者图层组中没有图层，需要调用addGroupLayer方法加入图层组")
		}
		this.map = new MainFrame(this.mapContainer, null, null, null, false, false, null, null, this, {
			baseGroupLayer: this.baseGroupLayer,
			groupLayers: this.groupLayers,
			mapCenter: this.mapCenter,
			mapInitLevel: this.mapInitLevel,
			zoomOffset: this.zoomOffset,
			mapMaxLevel: this.mapMaxLevel
		});
		this.map.showCopyright();
		this.map.showMapScale();
		this.map.showMapServerControl();
		this.map.enableDblClick();
		this.map.enableMouseScroll();
		if(EzServerClient.GlobeParams.DynamicCopyright.length > 0) {
			EzServerClient.GlobeFunction.setDynamicCopyright(this, EzServerClient.GlobeParams.DynamicCopyright)
		}
		this.map.container.focus();
		var pMe = this;
		BindingEvent(this.map.container, "mousemove", this.map.eventHandler("displayCoord"));
		this.map.registerKeyHandlers(this.map.container);
		if(!this.map.initDisplay) {
			this.map.container.style.display = "none"
		}
	}
};
MapsApp.prototype.loadMap = MapsApp.prototype.initialize;
MapsApp.prototype.onMapStateChanged = function() {
	try {
		if(this.vpageDoc) {
			var G = this.map.getCenterLatLng();
			this.vpageDoc.getElementById(se).value = G.y;
			this.vpageDoc.getElementById(te).value = G.x;
			this.vpageDoc.getElementById("zoom").value = this.map.realZoomLevel
		}
		var ca = this.getPageURL();
		this.permalink.href = ca
	} catch(b) {
		EzLog.dump(b)
	}
};
MapsApp.prototype.resizeMapView = function() {
	var ki = this.getWindowSize();
	var wf = ObjectOffset(this.mapContainer);
	var Gf = ki.height - wf.y - 10;
	var mi = ObjectOffset(this.panel);
	var Kh = Gf - (mi.y - wf.y);
	if(typeof _ResizeMap != "undefined" && _ResizeMap == true) {
		this.mapContainer.style.height = convert2Px(Gf);
		alert("height...")
	}
	if(document.body.style.overflow == "hidden") {}
	if(this.map) {
		var extentPrevious = this.getBoundsLatLng();
		this.map.onResize();
		this.map.containOffset = wf;
		EzEvent.ezEventListener.source = this.map;
		EzEvent.ezEventListener.eventType = EzEvent.MAP_RESIZE;
		EzEvent.extentPrevious = extentPrevious;
		EzEvent.extent = this.getBoundsLatLng();
		EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
	}
};
MapsApp.prototype.fullExtent = function() {
	this.map.fullExtent()
};
MapsApp.prototype.centerAtMBR = function(dInMinX, dInMinY, dInMaxX, dInMaxY) {
	try {
		if(arguments.length == 1) {
			if(!EzServerClient.GlobeFunction.isTypeRight(dInMinX, "MBR")) {
				throw EzErrorFactory.createError("EzMap::centerAtMBR方法中arguments[0]类型不正确")
			}
		} else {
			dInMinX = parseFloat(dInMinX);
			dInMinY = parseFloat(dInMinY);
			dInMaxX = parseFloat(dInMaxX);
			dInMaxY = parseFloat(dInMaxY)
		}
		if(arguments.length == 1 && dInMinX instanceof MBR) {
			var pMBR = dInMinX;
			if(this.map.bIsMercatorMap) {
				var min = this.map.latlon2Meters(new Point(pMBR.minX, pMBR.minY));
				var max = this.map.latlon2Meters(new Point(pMBR.maxX, pMBR.maxY));
				this.map.centerAtMBR(min.x, min.y, max.x, max.y)
			} else {
				this.map.centerAtMBR(pMBR.minX, pMBR.minY, pMBR.maxX, pMBR.maxY)
			}
		} else {
			if(arguments.length == 4) {
				if(this.map.bIsMercatorMap) {
					var min = this.map.latlon2Meters(new Point(dInMinX, dInMinY));
					var max = this.map.latlon2Meters(new Point(dInMaxX, dInMaxY));
					this.map.centerAtMBR(min.x, min.y, max.x, max.y)
				} else {
					this.map.centerAtMBR(dInMinX, dInMinY, dInMaxX, dInMaxY)
				}
			} else {
				alert("参数无效")
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::centerAtMBR方法执行不正确", e)
	}
};
MapsApp.prototype.getDragMode = function() {
	if(typeof this.map.drawMode == "undefined" || this.map.drawMode == null) {
		this.map.drawMode = "pan"
	}
	return this.map.drawMode
};
MapsApp.prototype.changeDragMode = function(mode, inputPanel, inputPanel2, callback, bDisplay) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(mode, "string")) {
			throw EzErrorFactory.createError("EzMap::changeDragMode方法中arguments[0]类型不正确")
		}
		if(inputPanel && !EzServerClient.GlobeFunction.isTypeRight(inputPanel, "object")) {
			throw EzErrorFactory.createError("EzMap::changeDragMode方法中arguments[1]类型不正确")
		}
		if(inputPanel2 && !EzServerClient.GlobeFunction.isTypeRight(inputPanel2, "object")) {
			throw EzErrorFactory.createError("EzMap::changeDragMode方法中arguments[2]类型不正确")
		}
		if(callback && !EzServerClient.GlobeFunction.isTypeRight(callback, "function")) {
			throw EzErrorFactory.createError("EzMap::changeDragMode方法中arguments[3]类型不正确")
		}
		if(bDisplay && !EzServerClient.GlobeFunction.isTypeRight(bDisplay, "boolean")) {
			throw EzErrorFactory.createError("EzMap::changeDragMode方法中arguments[4]类型不正确")
		}
		this.map.changeDragMode(mode, inputPanel, inputPanel2, callback, bDisplay)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::changeDragMode方法执行不正确", e)
	}
};
MapsApp.prototype.zoomIn = function() {
	switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
		case 0:
		case 3:
			this.zoomTo(this.getZoomLevel() - 1);
			break;
		case 1:
		case 2:
			this.zoomTo(this.getZoomLevel() + 1);
			break
	}
};
MapsApp.prototype.zoomOut = function() {
	switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
		case 0:
		case 3:
			this.zoomTo(this.getZoomLevel() + 1);
			break;
		case 1:
		case 2:
			this.zoomTo(this.getZoomLevel() - 1);
			break
	}
};
MapsApp.prototype.zoomInExt = function() {
	this.map.container.style.cursor = _ZoomInURL;
	this.changeDragMode("zoomInExt", null, null, this.eventHandler("zoomInMBR"))
};
MapsApp.prototype.zoomOutExt = function() {
	this.map.container.style.cursor = _ZoomOutURL;
	this.changeDragMode("zoomOutExt", null, null, this.eventHandler("zoomOutMBR"))
};
MapsApp.prototype.zoomInMBR = function() {
	if(!this.map.vmlDraw) {
		return
	}
	var pMBR = this.map.vmlDraw.getMBR();
	if(EzServerClient.GlobeParams.bIsMercatorMap) {
		var min = this.map.meters2latlon(new Point(pMBR.minX, pMBR.minY));
		var max = this.map.meters2latlon(new Point(pMBR.maxX, pMBR.maxY));
		pMBR.minX = min.x;
		pMBR.minY = min.y;
		pMBR.maxX = max.x;
		pMBR.maxY = max.y
	}
	pMBR = MBR.intersection(pMBR, this.getBoundsLatLng());
	var dSpan = this.map.getPixelSpan();
	if(pMBR.getSpanX() < 2 * dSpan || pMBR.getSpanY() < 2 * dSpan) {
		var pPoint = pMBR.getCenterPoint();
		switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
			case 1:
			case 2:
				var iZoom = Math.max(0, this.getZoomLevel() + 1);
				break;
			case 0:
			case 3:
				var iZoom = Math.max(0, this.getZoomLevel() - 1);
				break
		}
		this.centerAndZoom(pPoint, iZoom);
		this.removeOverlay(this.map.vmlDraw);
		this.map.vmlDraw = null;
		return
	}
	this.centerAtMBR(pMBR);
	this.removeOverlay(this.map.vmlDraw);
	this.map.vmlDraw = null
};
MapsApp.prototype.zoomOutMBR = function() {
	if(!this.map.vmlDraw) {
		return
	}
	var pMBR = this.map.vmlDraw.getMBR();
	if(EzServerClient.GlobeParams.bIsMercatorMap) {
		var min = this.map.meters2latlon(new Point(pMBR.minX, pMBR.minY));
		var max = this.map.meters2latlon(new Point(pMBR.maxX, pMBR.maxY));
		pMBR.minX = min.x;
		pMBR.minY = min.y;
		pMBR.maxX = max.x;
		pMBR.maxY = max.y
	}
	var pMapMBR = this.getBoundsLatLng();
	var dSpan = this.map.getPixelSpan();
	if(pMBR.getSpanX() < 2 * dSpan || pMBR.getSpanY() < 2 * dSpan) {
		var pPoint = pMBR.getCenterPoint();
		switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
			case 1:
			case 2:
				var iZoom = Math.max(0, this.getZoomLevel() - 1);
				break;
			case 0:
			case 3:
				var iZoom = Math.max(0, this.getZoomLevel() + 1);
				break
		}
		this.centerAndZoom(pPoint, iZoom);
		this.removeOverlay(this.map.vmlDraw);
		this.map.vmlDraw = null;
		return
	}
	pMBR = MBR.intersection(pMBR, pMapMBR);
	var dXScale = pMapMBR.getSpanX() / pMBR.getSpanX();
	var dYScale = pMapMBR.getSpanY() / pMBR.getSpanY();
	var dScale = Math.max(dYScale, dXScale);
	pMBR.scale(dScale * dScale);
	this.centerAtMBR(pMBR);
	this.removeOverlay(this.map.vmlDraw);
	this.map.vmlDraw = null
};
MapsApp.prototype.pan = function(x, y) {
	try {
		if(x && !EzServerClient.GlobeFunction.isTypeRight(x, "float")) {
			throw EzErrorFactory.createError("EzMap::pan方法中arguments[0]类型不正确")
		}
		if(y && !EzServerClient.GlobeFunction.isTypeRight(y, "float")) {
			throw EzErrorFactory.createError("EzMap::pan方法中arguments[1]类型不正确")
		}
		if(arguments.length == 0) {
			this.changeDragMode("pan")
		} else {
			if(arguments.length == 2) {
				this.map.pan(x, y)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::pan方法执行不正确", e)
	}
};
MapsApp.prototype.getSpanLatLng = function() {
	if(this.map.bIsMercatorMap) {
		var e = this.map.getSpanLatLng();
		var mpoint = this.map.getCenterLatLng();
		var mpointx = new Point(mpoint.x + e.width, mpoint.y);
		var mpointy = new Point(mpoint.x, mpoint.y + e.height);
		var lPoint = this.getCenterLatLng();
		var lPointx = this.map.meters2latlon(mpointx);
		var lPointy = this.map.meters2latlon(mpointy);
		var width = Math.abs(lPoint.x - lPointx.x);
		var height = Math.abs(lPoint.y - lPointy.y);
		var e1 = new Rect(width, height);
		return e1
	} else {
		return this.map.getSpanLatLng()
	}
};
MapsApp.prototype.showMapControl = function(strPos) {
	this.map.showMapControl(strPos)
};
MapsApp.prototype.hideMapControl = function() {
	this.map.hideMapControl()
};
MapsApp.prototype.measureLength = function(callback) {
	try {
		if(callback && !EzServerClient.GlobeFunction.isTypeRight(callback, "function")) {
			throw EzErrorFactory.createError("EzMap::measureLength方法中arguments[0]类型不是Function类型")
		}
		this.map.measureLength(callback)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::measureLength方法执行不正确", e)
	}
};
MapsApp.prototype.measureArea = function(callback) {
	try {
		if(callback && !EzServerClient.GlobeFunction.isTypeRight(callback, "function")) {
			throw EzErrorFactory.createError("EzMap::measureArea方法中arguments[0]类型不是Function类型")
		}
		this.map.measureArea(callback)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::measureArea方法执行不正确", e)
	}
};
MapsApp.prototype.centerAtPoint = function(pPoint) {
	if(this.map.bIsMercatorMap) {
		var point = this.map.latlon2Meters(pPoint);
		this.map.centerAtLatLng(point)
	} else {
		this.map.centerAtLatLng(pPoint)
	}
};
MapsApp.prototype.centerAtLatLng = function(x, y) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(x, "float") && !EzServerClient.GlobeFunction.isTypeRight(x, "Point")) {
			throw EzErrorFactory.createError("EzMap::centerAtLatLng方法中arguments[0]类型不正确")
		}
		if(y && !EzServerClient.GlobeFunction.isTypeRight(y, "float")) {
			throw EzErrorFactory.createError("EzMap::centerAtLatLng方法中arguments[1]类型不正确")
		}
		var pPoint = null;
		if(x instanceof Point) {
			pPoint = x
		} else {
			pPoint = new Point(x, y)
		}
		if(this.map.bIsMercatorMap) {
			pPoint = this.map.latlon2Meters(pPoint);
			this.map.centerAtLatLng(pPoint)
		} else {
			this.map.centerAtLatLng(pPoint)
		}
		pPoint = null
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::centerAtLatLng方法执行不正确", e)
	}
};
MapsApp.prototype.getLevelOfMBR = function(dInMinX, dInMinY, dInMaxX, dInMaxY) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(dInMinX, "float")) {
			throw EzErrorFactory.createError("EzMap::getLevelOfMBR方法中arguments[0]类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(dInMinY, "float")) {
			throw EzErrorFactory.createError("EzMap::getLevelOfMBR方法中arguments[1]类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(dInMaxX, "float")) {
			throw EzErrorFactory.createError("EzMap::getLevelOfMBR方法中arguments[2]类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(dInMaxY, "float")) {
			throw EzErrorFactory.createError("EzMap::getLevelOfMBR方法中arguments[3]类型不正确")
		}
		if(this.map.bIsMercatorMap) {
			var min = this.map.latlon2Meters(new Point(dInMinX, dInMinY));
			var max = this.map.latlon2Meters(new Point(dInMaxX, dInMaxY));
			dInMinX = min.x;
			dInMinY = min.y;
			dInMaxX = max.x;
			dInMaxY = max.y
		}
		return this.map.getLevelOfMBR(dInMinX, dInMinY, dInMaxX, dInMaxY)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::getLevelOfMBR方法执行不正确", e)
	}
};
MapsApp.prototype.clearVMLContainer = function() {
	var pMapContainer = this.map;
	pMapContainer.clearVMLContainer()
};
MapsApp.prototype.debug = function() {
	var pContainer = this.map.vmlContainer;
	var pDebugContainer = getEleByID("resultDiv");
	if(pContainer && pDebugContainer) {
		pDebugContainer.innerText = this.map.vmlContainer.groupObj.outerHTML
	}
};
MapsApp.prototype.getWindowSize = function(e) {
	if(!e) {
		e = new Rect(0, 0)
	}
	if(window.self && self.innerWidth) {
		e.width = self.innerWidth;
		e.height = self.innerHeight;
		return e
	}
	if(document.documentElement && document.documentElement.clientHeight) {
		e.width = document.documentElement.clientWidth;
		e.height = document.documentElement.clientHeight;
		return e
	}
	e.width = document.body.clientWidth;
	e.height = document.body.clientHeight;
	return e
};
MapsApp.prototype.addOverlay = function(ta, bDisRemove) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(ta, "iOverLay")) {
			throw EzErrorFactory.createError("EzMap::addOverlay方法中arguments[0]类型不正确")
		}
		if(bDisRemove && !EzServerClient.GlobeFunction.isTypeRight(bDisRemove, "boolean")) {
			throw EzErrorFactory.createError("EzMap::addOverlay方法中arguments[1]类型不正确")
		}
		this.map.addOverlay(ta, bDisRemove);
		EzEvent.ezEventListener.source = this.map;
		EzEvent.ezEventListener.eventType = EzEvent.MAP_ADDOVERLAY;
		EzEvent.overlay = ta;
		EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::addOverlay方法执行不正确", e)
	}
};
MapsApp.prototype.removeOverlay = function(ta, bEnableRemove) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(ta, "iOverLay")) {
			throw EzErrorFactory.createError("EzMap::removeOverlay方法中arguments[0]类型不正确")
		}
		this.map.removeOverlay(ta, bEnableRemove);
		EzEvent.ezEventListener.source = this.map;
		EzEvent.ezEventListener.eventType = EzEvent.MAP_REMOVEOVERLAY;
		EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::removeOverlay方法执行不正确", e)
	}
};
MapsApp.prototype.clearOverlays = function(bForcedRemove) {
	this.map.clearOverlays(bForcedRemove);
	EzEvent.ezEventListener.source = this.map;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_CLEAROVERLAYS;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
};
MapsApp.prototype.clear = function(bForcedRemove) {
	this.clearOverlays(bForcedRemove);
	this.clearVMLContainer()
};
MapsApp.prototype.getOverlays = function() {
	return this.map.overlays
};
MapsApp.prototype.openInfoWindow = function(pPoint, html, bIsInScreen, width, height) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(pPoint, "Point")) {
			throw EzErrorFactory.createError("EzMap::openInfoWindow方法中arguments[0]类型不正确")
		}
		if(bIsInScreen && !EzServerClient.GlobeFunction.isTypeRight(bIsInScreen, "boolean")) {
			throw EzErrorFactory.createError("EzMap::openInfoWindow方法中arguments[2]类型不正确")
		}
		if(this.map.bIsMercatorMap) {
			pPoint = this.map.latlon2Meters(pPoint)
		}
		this.map.openInfoWindow(pPoint.x, pPoint.y, html, bIsInScreen, width, height)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::openInfoWindow方法执行不正确", e)
	}
};
MapsApp.prototype.showPop = function(pPoint, html, opt) {
	if(this.map.bIsMercatorMap) {
		pPoint = this.map.latlon2Meters(pPoint)
	}
	this.map.showPop(pPoint, html, opt)
};
MapsApp.prototype.getCenterLatLng = function() {
	var pPoint = this.map.getCenterLatLng();
	if(this.map.bIsMercatorMap) {
		pPoint = this.map.meters2latlon(pPoint)
	}
	return pPoint
};
MapsApp.prototype.getZoomLevel = function() {
	return this.map.getZoomLevel()
};
MapsApp.prototype.getMaxLevel = function() {
	return _MaxLevel
};
MapsApp.prototype.centerAndZoomToBorder = function(strPath) {
	this.map.centerAndZoomToBorder(strPath)
};
MapsApp.prototype.printMap = function(urlCSS, strTitle, strBottom) {
	var mbr = this.getBoundsLatLng();
	this.printMapBaseExtent(mbr, strTitle, strBottom)
};
MapsApp.prototype.printMapBaseExtent = function(mbr, strTitle, strBottom, strLegendURL, strCompassURL) {
	var lbx = mbr.minX;
	var lby = mbr.minY;
	var rtx = mbr.maxX;
	var rty = mbr.maxY;
	if(this.map.bIsMercatorMap) {
		var minP = this.map.latlon2Meters(new Point(mbr.minX, mbr.minY));
		var maxP = this.map.latlon2Meters(new Point(mbr.maxX, mbr.maxY));
		lbx = minP.x;
		lby = minP.y;
		rtx = maxP.x;
		rty = maxP.y
	}
	var zoomLevel = this.map.realZoomLevel + this.map.zoomOffset;
	var realZoomLevel = this.map.realZoomLevel;
	var overs = this.getDrawOver();
	var lbtpz = this.map.baseLayer.toTileCoords(new EzServerClient.MapPositionZ(lbx, lby, realZoomLevel));
	var rttpz = this.map.baseLayer.toTileCoords(new EzServerClient.MapPositionZ(rtx, rty, realZoomLevel));
	var lbBitP = this.map.baseLayer.convertMap2Bitmap(lbx, lby, realZoomLevel);
	var rtBitP = this.map.baseLayer.convertMap2Bitmap(rtx, rty, realZoomLevel);
	var printWidth = Math.round(rtBitP.x - lbBitP.x);
	var printHeight = Math.round(rtBitP.y - lbBitP.y);
	var ltMpz = this.map.baseLayer.toMapCoords2(new EzServerClient.TilePositionZ(lbtpz.col, rttpz.row, realZoomLevel));
	var ltBitMinP = this.map.baseLayer.convertMap2Bitmap(ltMpz.minx, ltMpz.maxy, realZoomLevel);
	var printLeft = Math.round(ltBitMinP.x - lbBitP.x);
	var printTop = Math.round(rtBitP.y - ltBitMinP.y - this.map.baseLayer.tileInfo.height);
	var printCurLeft = this.map.baseLayer.tileInfo.width * (this.map.topLeftTile.x - lbtpz.col) + printLeft - this.map.groupTileImages[0][0][0].offsetLeft;
	var printCurTop = this.map.baseLayer.tileInfo.height * (rttpz.row - this.map.topLeftTile.y + 1) + printTop - this.map.groupTileImages[0][0][0].offsetTop;
	var iPWW = printWidth;
	var iPWH = printHeight + 60;
	var strPro = "width=" + (iPWW + 18) + "px,height=" + (iPWH + 32) + "px,menubar=yes,scrollbars=yes,resizable=no,location=no, status=no";
	var printWin = window.open("", "default", strPro);
	var mmWidth = printWidth / window.screen.deviceXDPI * 25.4;
	var mmHeight = printHeight / window.screen.deviceYDPI * 25.4;
	if(mmWidth > 841 || mmHeight > 1189) {
		return MapsApp.getMinPaperDescription(printWidth, printHeight)
	}
	if(!strTitle) {
		strTitle = ""
	}
	if(!strBottom) {
		strBottom = ""
	}
	if(printWin != null) {
		printWin.document.writeln("<html><head>");
		printWin.document.writeln('<meta http-equiv="content-type" content="text/html; charset=GBK"/>');
		printWin.document.writeln("<title></title>");
		printWin.document.writeln("<script>window.onbeforeunload=function(){opener.printWin=null;	}<\/script>");
		printWin.document.writeln('<style type="text/css">');
		printWin.document.writeln("body {margin: 0px}.noprint{	display:none;}v\\:* {BEHAVIOR: url(#default#VML)}");
		printWin.document.writeln("</style>");
		printWin.document.writeln('<link rel=stylesheet type=text/css href="' + EzServerClient.GlobeParams.EzServerClientURL + '/css/print.css"/>');
		printWin.document.writeln("<script type=text/javascript>");
		printWin.document.writeln("var isIE = (document.all) ? true : false;");
		printWin.document.writeln("");
		printWin.document.writeln("var $ = function (id) {");
		printWin.document.writeln('	return "string" == typeof id ? document.getElementById(id) : id;');
		printWin.document.writeln("};");
		printWin.document.writeln("");
		printWin.document.writeln("var Class = {");
		printWin.document.writeln("	create: function() {");
		printWin.document.writeln("		return function() { this.initialize.apply(this, arguments); }");
		printWin.document.writeln("	}");
		printWin.document.writeln("}");
		printWin.document.writeln("");
		printWin.document.writeln("var Extend = function(destination, source) {");
		printWin.document.writeln("	for (var property in source) {");
		printWin.document.writeln("		destination[property] = source[property];");
		printWin.document.writeln("	}");
		printWin.document.writeln("}");
		printWin.document.writeln("");
		printWin.document.writeln("var Bind = function(object, fun) {");
		printWin.document.writeln("	return function() {");
		printWin.document.writeln("		return fun.apply(object, arguments);");
		printWin.document.writeln("	}");
		printWin.document.writeln("}");
		printWin.document.writeln("");
		printWin.document.writeln("var BindAsEventListener = function(object, fun) {");
		printWin.document.writeln("	return function(event) {");
		printWin.document.writeln("		return fun.call(object, (event || window.event));");
		printWin.document.writeln("	}");
		printWin.document.writeln("}");
		printWin.document.writeln("");
		printWin.document.writeln("function addEventHandler(oTarget, sEventType, fnHandler) {");
		printWin.document.writeln("	if (oTarget.addEventListener) {");
		printWin.document.writeln("		oTarget.addEventListener(sEventType, fnHandler, false);");
		printWin.document.writeln("	} else if (oTarget.attachEvent) {");
		printWin.document.writeln('		oTarget.attachEvent("on" + sEventType, fnHandler);');
		printWin.document.writeln("	} else {");
		printWin.document.writeln('		oTarget["on" + sEventType] = fnHandler;');
		printWin.document.writeln("	}");
		printWin.document.writeln("};");
		printWin.document.writeln("");
		printWin.document.writeln("function removeEventHandler(oTarget, sEventType, fnHandler) {");
		printWin.document.writeln("    if (oTarget.removeEventListener) {");
		printWin.document.writeln("        oTarget.removeEventListener(sEventType, fnHandler, false);");
		printWin.document.writeln("    } else if (oTarget.detachEvent) {");
		printWin.document.writeln('        oTarget.detachEvent("on" + sEventType, fnHandler);');
		printWin.document.writeln("    } else { ");
		printWin.document.writeln('        oTarget["on" + sEventType] = null;');
		printWin.document.writeln("    }");
		printWin.document.writeln("};");
		printWin.document.writeln("");
		printWin.document.writeln("//拖放程序");
		printWin.document.writeln("var SimpleDrag = Class.create();");
		printWin.document.writeln("SimpleDrag.prototype = {");
		printWin.document.writeln("  //拖放对象,触发对象");
		printWin.document.writeln("  initialize: function(drag) {");
		printWin.document.writeln("	this.Drag = $(drag);");
		printWin.document.writeln("	this._x = this._y = 0;");
		printWin.document.writeln("	this._fM = BindAsEventListener(this, this.Move);");
		printWin.document.writeln("	this._fS = Bind(this, this.Stop);");
		printWin.document.writeln("	this._fStart = BindAsEventListener(this, this.Start);");
		printWin.document.writeln('	this.Drag.style.position = "absolute";');
		printWin.document.writeln('	addEventHandler(this.Drag, "mousedown", this._fStart);');
		printWin.document.writeln("  },");
		printWin.document.writeln("  //准备拖动");
		printWin.document.writeln("  Start: function(oEvent) {");
		printWin.document.writeln("	this._x = oEvent.clientX - this.Drag.offsetLeft;");
		printWin.document.writeln("	this._y = oEvent.clientY - this.Drag.offsetTop;");
		printWin.document.writeln('	addEventHandler(document, "mousemove", this._fM);');
		printWin.document.writeln('	addEventHandler(document, "mouseup", this._fS);');
		printWin.document.writeln("  },");
		printWin.document.writeln("  //拖动");
		printWin.document.writeln("  Move: function(oEvent) {");
		printWin.document.writeln('	this.Drag.style.left = oEvent.clientX - this._x + "px";');
		printWin.document.writeln('	this.Drag.style.top = oEvent.clientY - this._y + "px";');
		printWin.document.writeln("  },");
		printWin.document.writeln("  //停止拖动");
		printWin.document.writeln("  Stop: function() {");
		printWin.document.writeln('	removeEventHandler(document, "mousemove", this._fM);');
		printWin.document.writeln('	removeEventHandler(document, "mouseup", this._fS);');
		printWin.document.writeln("  }");
		printWin.document.writeln("};");
		printWin.document.writeln('function load(){new SimpleDrag("title");new SimpleDrag("printmap");new SimpleDrag("bottom");if(document.getElementById("legend")){new SimpleDrag("legend");};if(document.getElementById("compass")){new SimpleDrag("compass");}}<\/script>');
		printWin.document.writeln("<\/script>");
		printWin.document.writeln("</head>");
		printWin.document.writeln('<body onload="load()">');
		printWin.document.writeln('<div id="title" style="width:100%;z-index:1"><input class=printtitle name="printtitle" id="printtitle" type="text" value="' + strTitle + '"/></div>');
		printWin.document.writeln('<div id="prmap" style="z-index:0;width:' + iPWW + "px;height:" + iPWH + 'px;">');
		printWin.document.writeln('<div id="printmap" class="printmap" style="position:absolute;top:50px;overflow:hidden;width:' + printWidth + "px;height:" + printHeight + 'px;">');
		printWin.document.writeln('<div style="position:absolute;left:' + printLeft + ";top:" + printTop + 'px;">');
		printWin.document.writeln(this.getImgsContent(this.map.baseGroupLayer, this.map.realZoomLevel, this.map.zoomOffset, lbtpz.col, lbtpz.row, rttpz.col, rttpz.row));
		printWin.document.writeln("</div>");
		printWin.document.writeln('<div style="position:absolute;left:' + printCurLeft + ";top:" + printCurTop + 'px;">');
		printWin.document.writeln(this.map.divPaint.innerHTML);
		printWin.document.writeln("</div>");
		printWin.document.writeln("</div>");
		printWin.document.writeln("</div>");
		if(strLegendURL) {
			printWin.document.writeln('<div id="legend" style="position:absolute;left:10px;z-index:1;bottom:80px;"><img class="printlegend" src="' + strLegendURL + '"/></div>')
		}
		if(strCompassURL) {
			printWin.document.writeln('<div id="compass" style="position:absolute;left:10px;z-index:1;bottom:200px;"><img class="printcompass" src="' + strCompassURL + '"/></div>')
		}
		printWin.document.writeln('<div id="bottom" style="position:absolute;width:30%;z-index:1;right:10px"><input class=printbottom name="printbottom" id="printbottom" type="text" value="' + strBottom + '"></div>');
		printWin.document.writeln("<script type=text/javascript src=" + m_EzServer + "/js/EzServerClient.gzjs>");
		printWin.document.writeln("function addvml(){");
		printWin.document.writeln("if(document.all==1){");
		printWin.document.writeln("if(navigator.appVersion.match(/7./i)=='7.'||navigator.appVersion.match(/6./i)=='6.'||navigator.appVersion.match(/8./i)=='8.'){");
		printWin.document.writeln("var length = overs.length-1");
		printWin.document.writeln("var objs =" + overs);
		printWin.document.writeln("for(var i=0;i<length;i++){");
		printWin.document.writeln("var path= objs[i].path");
		printWin.document.writeln("var div=objs[i].doc");
		printWin.document.writeln("var paper = new Raphael(div)");
		printWin.document.writeln("paper.path(path)");
		printWin.document.writeln("}");
		printWin.document.writeln("}");
		printWin.document.writeln("}");
		printWin.document.writeln("}");
		printWin.document.writeln("addvml()");
		printWin.document.writeln("<\/script>");
		printWin.document.writeln("</body>");
		printWin.document.writeln("</html>");
		var pW = printWin.document.getElementById("printmap").offsetWidth;
		var pH = printWin.document.getElementById("printmap").offsetHeight;
		printWin.document.execCommand("Refresh");
		printWin.focus();
		return MapsApp.getMinPaperDescription(pW, pH)
	}
	return {
		error: "未知纸张或者纸张类型出错"
	}
};
MapsApp.prototype.getDrawOver = function() {
	var allOvers = this.map.overlays;
	var overs = [];
	for(var i = 0; i < allOvers.length; i++) {
		var tempOver = allOvers[i];
		if(tempOver.printTag) {
			var obj = tempOver.printTag;
			var div = document.getElementById(obj.id);
			var path = obj.path;
			var str = {
				doc: div,
				path: path
			};
			overs.push(str)
		}
	}
	return overs
};
MapsApp.prototype.getImgsContent = function(groupLyr, zoomLevel, zoomOffset, lbx, lby, rtx, rty) {
	var temp = "";
	var topLeftTile = null;
	var lyrs = groupLyr.getLayers();
	for(var m = 0; m < lyrs.length; m++) {
		if(!(lyrs[m] instanceof EzServerClient.Layer.HotSpotTileLayer)) {
			var top = 0;
			var left = 0;
			var lyr = lyrs[m];
			if(lyrs[m].tileCrs != "leftop") {
				for(var i = lbx; i <= rtx; i++) {
					for(var j = rty; j >= lby; j--) {
						temp += "<img style='position:absolute;left:" + left + "px;top:" + top + "px' src='" + lyr.getTileUrl(topLeftTile, i, j, zoomLevel, zoomOffset) + "'/>";
						top += 256
					}
					left += 256;
					top = 0;
					temp += "</br>"
				}
			} else {
				for(var i = lbx; i <= rtx; i++) {
					for(var j = rty; j >= lby; j--) {
						temp += "<img style='position:absolute;left:" + left + "px;top:" + top + "px' src='" + lyr.getTileUrl(topLeftTile, i, -j - 1, zoomLevel, zoomOffset) + "'/>";
						top += 256
					}
					left += 256;
					top = 0;
					temp += "</br>"
				}
			}
		}
	}
	return temp
};
MapsApp.getMinPaperDescription = function(width, height) {
	var result = {
		crosswise: {},
		lengthways: {}
	};
	width = width / window.screen.deviceXDPI * 25.4;
	height = height / window.screen.deviceYDPI * 25.4;
	for(var i = 0; i < MapsApp.paperSize.length; i++) {
		var item = MapsApp.paperSize[i];
		if(item.width > width && item.height > height) {
			result.lengthways = item;
			break
		}
	}
	for(var i = 0; i < MapsApp.paperSize.length; i++) {
		var item = MapsApp.paperSize[i];
		if(item.width > height && item.height > width) {
			result.crosswise = item;
			break
		}
	}
	if(typeof result.lengthways.paperStandardName == "undefined") {
		var length = MapsApp.paperSize.length;
		var item = MapsApp.paperSize[length - 1];
		if(width > item.width || height > item.height) {
			item.width = width;
			item.height = height;
			item.paperStandardName = "Larger";
			result.lengthways = item
		}
	}
	if(typeof result.crosswise.paperStandardName == "undefined") {
		var length = MapsApp.paperSize.length;
		var item = MapsApp.paperSize[length - 1];
		if(width > item.height || height > item.width) {
			item.width = height;
			item.height = width;
			item.paperStandardName = "Larger";
			result.crosswise = item
		}
	}
	return result
};
MapsApp.paperSize = [{
	height: 144,
	width: 105,
	paperStandardName: "A6"
}, {
	height: 210,
	width: 148,
	paperStandardName: "A5"
}, {
	height: 297,
	width: 210,
	paperStandardName: "A4"
}, {
	height: 420,
	width: 297,
	paperStandardName: "A3"
}, {
	height: 594,
	width: 420,
	paperStandardName: "A2"
}, {
	height: 841,
	width: 594,
	paperStandardName: "A1"
}, {
	height: 1189,
	width: 841,
	paperStandardName: "A0"
}];
MapsApp.prototype.print = MapsApp.prototype.printMap;
MapsApp.prototype.printMapExt = function() {
	if(_printWin != null) {
		try {
			_printWin.close()
		} catch(e) {}
	}
	var strPro = "width=" + this.map.viewSize.width + ",height=" + this.map.viewSize.height;
	strPro = strPro + ",menubar=yes,scrollbars=no,resizable=no,location=no, status=no";
	_printWin = window.open("printMap.htm", "placeholder", strPro);
	_printWin.focus()
};
MapsApp.prototype.saveMap = function() {
	if(_printWin != null) {
		try {
			_printWin.close()
		} catch(e) {}
	}
	var strPro = "width=" + this.map.viewSize.width + ",height=" + this.map.viewSize.height;
	strPro = strPro + ",menubar=yes,scrollbars=no,resizable=no,location=no, status=no";
	_printWin = window.open("", "placeholder", strPro);
	var pMBR = this.map.getBoundsLatLng();
	var iLevel = this.getZoomLevel() + _ZoomOffset;
	var imgSrc = _VectorMapService[1][0] + "/EzMap?Service=getRectImg&minx=" + pMBR.minX + "&miny=" + pMBR.minY + "&maxx=" + pMBR.maxX + "&maxy=" + pMBR.maxY + "&zoom=" + iLevel;
	var strHTML = "<html><head><title>保存地图</title></head><body><img src='" + imgSrc + "' style='width:100%;height:100%'></body></html>";
	_printWin.document.write(strHTML);
	_printWin.focus()
};
MapsApp.prototype.downloadMap = function(minx, miny, maxx, maxy, iLevel, format) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(minx, "float")) {
			throw EzErrorFactory.createError("EzMap::downloadMap方法中arguments[0]类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(miny, "float")) {
			throw EzErrorFactory.createError("EzMap::downloadMap方法中arguments[1]类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(maxx, "float")) {
			throw EzErrorFactory.createError("EzMap::downloadMap方法中arguments[2]类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(maxy, "float")) {
			throw EzErrorFactory.createError("EzMap::downloadMap方法中arguments[3]类型不正确")
		}
		if(_printWin != null) {
			_printWin.close()
		}
		var pMBR = this.getBoundsLatLng();
		if(!minx) {
			minx = pMBR.minX
		}
		if(!miny) {
			miny = pMBR.minY
		}
		if(!maxx) {
			maxx = pMBR.maxX
		}
		if(!maxy) {
			maxy = pMBR.maxY
		}
		format = format || "image";
		var strServiceURL = this.map.baseLayer.url;
		if(typeof iLevel == "undefined") {
			var iLevel = this.getZoomLevel()
		}
		switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
			case 0:
			case 2:
				iLevel = iLevel + _ZoomOffset;
				break;
			case 1:
			case 3:
				iLevel = EzServerClient.GlobeParams.MapMaxLevel - iLevel + _ZoomOffset;
				break
		}
		var strPro = "width=" + this.map.viewSize.width + ",height=" + this.map.viewSize.height;
		strPro = strPro + ",menubar=yes,scrollbars=no,resizable=no,location=no, status=no";
		var imgSrc = strServiceURL + "/EzMap?Service=getRectImg&result=" + format + "&minx=" + minx + "&miny=" + miny + "&maxx=" + maxx + "&maxy=" + maxy + "&zoom=" + iLevel;
		window.open(imgSrc)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::downloadMap方法执行不正确", e)
	}
};
MapsApp.prototype.gotoCenter = function() {
	this.map.gotoCenter()
};
MapsApp.prototype.recenterOrPanToLatLng = function(j) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(j, "Point")) {
			throw EzErrorFactory.createError("EzMap::recenterOrPanToLatLng方法中argumnets[0]参数类型不是Point")
		}
		if(this.map.bIsMercatorMap) {
			j = this.map.latlon2Meters(j)
		}
		this.map.recenterOrPanToLatLng(j)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::recenterOrPanToLatLng方法执行不正确", e)
	}
};
MapsApp.prototype.getBoundsLatLng = function(e) {
	if(this.map.bIsMercatorMap) {
		var e = this.map.getBoundsLatLng();
		var minPoint = this.map.meters2latlon(new Point(e.minX, e.minY));
		var maxPoint = this.map.meters2latlon(new Point(e.maxX, e.maxY));
		e.minX = minPoint.x;
		e.maxX = maxPoint.x;
		e.minY = minPoint.y;
		e.maxY = maxPoint.y;
		return e
	} else {
		return this.map.getBoundsLatLng()
	}
};
MapsApp.prototype.addMapChangeListener = function(func) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(func, "function")) {
			throw EzErrorFactory.createError("EzMap::addMapChangeListener方法中arguments[0]类型不正确")
		}
		this.map.addStateListener(func)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::addMapChangeListener方法执行不正确", e)
	}
};
MapsApp.prototype.removeMapChangeListener = function(func) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(func, "function")) {
			throw EzErrorFactory.createError("EzMap::removeMapChangeListener方法中arguments[0]类型不正确")
		}
		var pListeners = this.map.stateListeners;
		if(pListeners) {
			var b = [];
			for(var c = 0; c < pListeners.length; c++) {
				if(pListeners[c] != func) {
					b.push(pListeners[c])
				}
			}
			if(pListeners.length != b.length) {
				this.map.stateListeners = b
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::removeMapChangeListener方法执行不正确", e)
	}
};
MapsApp.prototype.addOverViewPanel = function(pOverview) {
	var pOverviewPanel = document.createElement("div");
	pOverviewPanel.id = this.overViewPanelID;
	pOverviewPanel.className = "noprint";
	pOverviewPanel.style.backgroundColor = "white";
	pOverviewPanel.style.borderTop = "  #979797 1px solid";
	pOverviewPanel.style.borderLeft = "  #979797 1px solid";
	var iWidth = 250;
	var iHeight = 200;
	if(pOverview) {
		iWidth = pOverview.width;
		iHeight = pOverview.height
	}
	pOverviewPanel.style.height = convert2Px(iHeight);
	pOverviewPanel.style.width = convert2Px(iWidth);
	pOverviewPanel.style.right = convert2Px(16 - iWidth);
	pOverviewPanel.style.bottom = convert2Px(16 - iHeight);
	pOverviewPanel.style.zIndex = 10000;
	pOverviewPanel.style.position = "absolute";
	this.overviewPanel = pOverviewPanel;
	var pOverView = document.createElement("div");
	pOverView.id = this.overViewID;
	pOverView.style.display = "";
	pOverView.style.borderTop = "  #979797 1px solid";
	pOverView.style.borderLeft = "  #979797 1px solid";
	pOverView.style.position = "absolute";
	pOverView.style.right = convert2Px(-1);
	pOverView.style.bottom = convert2Px(-1);
	pOverView.style.height = convert2Px(iHeight - 5);
	pOverView.style.width = convert2Px(iWidth - 5);
	pOverView.style.cursor = "default";
	pOverviewPanel.appendChild(pOverView);
	var slipImg = document.createElement("img");
	slipImg.src = EzServerClient.GlobeParams.SlipInImg;
	slipImg.style.position = "absolute";
	var vMe = this;
	slipImg.onclick = function() {
		if(!pOverviewPanel.overViewIsOpen) {
			slipImg.src = EzServerClient.GlobeParams.SlipOutImg;
			EzServerClient.GlobeParams.OverViewFlag = 0;
			EzServerClient.GlobeFunction.SlipOut(vMe, pOverviewPanel, 15);
			pOverviewPanel.overViewIsOpen = true
		} else {
			slipImg.src = EzServerClient.GlobeParams.SlipInImg;
			EzServerClient.GlobeParams.OverViewFlag = 1;
			EzServerClient.GlobeFunction.SlipIn(vMe, pOverviewPanel, 15, 16 - iWidth, 16 - iHeight);
			pOverviewPanel.overViewIsOpen = false
		}
	};
	pOverviewPanel.appendChild(slipImg);
	this.overviewPanel.slipImg = slipImg;
	this.map.container.appendChild(pOverviewPanel);
	return pOverView
};
MapsApp.prototype.addOverView = function(pOverViewObj) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(pOverViewObj, "OverView")) {
			throw EzErrorFactory.createError("EzMap::addOverView方法中参数arguments[0]的类型不是OverView类")
		}
		this.overViewConf = pOverViewObj;
		var pOverView = document.getElementById(this.overViewID);
		if(pOverView) {
			return
		} else {
			pOverView = this.addOverViewPanel(this.overViewConf)
		}
		this.overViewMap = new MainFrame(pOverView, null, null, null, false, false, null, null, this, {
			baseGroupLayer: this.baseGroupLayer,
			groupLayers: this.groupLayers,
			mapCenter: this.mapCenter,
			mapInitLevel: this.mapInitLevel,
			zoomOffset: this.zoomOffset,
			mapMaxLevel: this.mapMaxLevel,
			isOverView: true
		});
		this.map.name = _mapName;
		this.overViewMap.name = "鹰眼";
		var pMe = this;
		var handle1 = EzEvent.addEventListener(this.map, EzEvent.MAP_SWITCHMAPSERVER, function(e) {
			pMe.overViewMap.baseGroupLayer = pMe.groupLayers[pMe.groupLayers.length - e.mapServerIndex - 1];
			pMe.overViewMap.setMapSource(pMe.overViewMap.baseGroupLayer)
		});
		window.updateOverview = function() {
			var iZoom = pMe.getZoomLevel();
			switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
				case 0:
				case 3:
					iZoom = Math.min(iZoom + 4, _MaxLevel, pMe.overViewConf.maxLevel);
					iZoom = Math.max(pMe.overViewConf.minLevel, iZoom);
					break;
				case 1:
				case 2:
					iZoom = Math.max(iZoom - 4, pMe.overViewConf.minLevel);
					iZoom = Math.min(pMe.overViewConf.maxLevel, iZoom);
					break
			}
			pMe.overViewMap.zoomTo(iZoom);
			var pPoint = pMe.map.getCenterLatLng();
			pMe.overViewMap.recenterOrPanToLatLng(pPoint);
			pMe.overViewMap.clearOverlays();
			var pMBR = pMe.map.getBoundsLatLng();
			var pOverViewMBR = pMe.overViewMap.getBoundsLatLng();
			if(!pMBR.containsBounds(pOverViewMBR)) {
				var pPoints = pMBR.toString();
				if(pMe.overViewMap.pRectangle) {
					delete pMe.overViewMap.pRectangle;
					delete pMe.OverviewDragObject
				}
				var pRectangle = new Rectangle(pPoints, "#ff0000", 2, 0.3, "#0000ff");
				pMe.overViewMap.addOverlay(pRectangle);
				var iLeft = parseInt(pRectangle.div.style.left);
				var iTop = parseInt(pRectangle.div.style.top);
				pMe.OverviewRect = pRectangle;
				pMe.OverviewDragObject = new DragEvent(pRectangle.div, iLeft, iTop, pMe.overViewMap.container);
				pMe.OverviewDragObject.ondragend = function() {
					var iLeft = parseInt(pMe.OverviewRect.div.style.left);
					var iTop = parseInt(pMe.OverviewRect.div.style.top);
					var iWidth = parseInt(pMe.OverviewRect.div.style.width);
					var iHeight = parseInt(pMe.OverviewRect.div.style.height);
					var iX = iLeft + iWidth / 2;
					var iY = iTop + iHeight / 2;
					var pCenterPoint = pMe.overViewMap.convert2LonLat(iX, iY);
					pMe.map.recenterOrPanToLatLng(pCenterPoint)
				};
				pMe.overViewMap.pRectangle = pRectangle
			}
		};
		this.overViewMap.onDragEnd = function() {
			var pPoint = pMe.overViewMap.getCenterLatLng();
			pMe.map.recenterOrPanToLatLng(pPoint)
		};
		this.map.addStateListener(updateOverview);
		updateOverview()
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::addOverView方法执行不正确", e)
	}
};
MapsApp.prototype.hideCopyright = function() {
	this.map.hideCopyright()
};
MapsApp.prototype.showCopyright = function() {
	this.map.showCopyright()
};
MapsApp.prototype.hideMapServer = function() {
	this.map.hideMapServer()
};
MapsApp.prototype.showMapServer = function() {
	this.map.showMapServer()
};
MapsApp.prototype.hideMapScale = function() {
	this.map.hideMapScale()
};
MapsApp.prototype.showMapScale = function() {
	this.map.showMapScale()
};
MapsApp.prototype.showOverView = function() {
	if(!this.overviewPanel.overViewIsOpen) {
		this.overviewPanel.slipImg.click()
	}
};
MapsApp.prototype.hideOverView = function() {
	if(this.overviewPanel.overViewIsOpen) {
		this.overviewPanel.slipImg.click()
	}
};
MapsApp.prototype.reverseOverView = function() {
	this.overviewPanel.slipImg.click()
};
MapsApp.prototype.about = function() {
	this.map.about()
};
MapsApp.prototype.getMeter = function(point, degree) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(point, "Point")) {
			throw EzErrorFactory.createError("EzMap::getMeter方法中arguments[0]类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(degree, "float")) {
			throw EzErrorFactory.createError("EzMap::getMeter方法中arguments[1]类型不正确")
		}
		return MapsApp.getMeter(point, degree)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::getMeter方法执行不正确", e)
	}
};
MapsApp.prototype.getDegree = function(point, meter) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(point, "Point")) {
			throw EzErrorFactory.createError("EzMap::getDegree方法中arguments[0]类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(meter, "float") && !EzServerClient.GlobeFunction.isTypeRight(meter, "string")) {
			throw EzErrorFactory.createError("EzMap::getDegree方法中arguments[1]类型不正确")
		}
		return MapsApp.getDegree(point, meter)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::getDegree方法执行不正确", e)
	}
};
MapsApp.prototype.switchMapServer = function(index) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(index, "int")) {
			throw EzErrorFactory.createError("EzMap::switchMapServer方法中arguments[0]类型不正确")
		}
		if(index < this.map.mapServer.length) {
			this.map.mapServer[this.map.mapServer.length - index - 1].click()
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::switchMapServer方法执行不正确", e)
	}
};
MapsApp.prototype.getMapServers = function() {
	try {
		return this.map.mapServer
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::getMapServers方法执行不正确", e)
	}
};
MapsApp.prototype.showStandMapControl = function() {
	this.map.showStandMapControl()
};
MapsApp.prototype.showSmallMapControl = function() {
	this.map.showSmallMapControl()
};
MapsApp.prototype.addControl = function(pControl) {
	this.map.addControl(pControl)
};
MapsApp.prototype.getVersionInfo = function() {
	return EzServerClient.GlobeParams.VersionInfo.join(",")
};
MapsApp.prototype.showVersion = function(strVersion) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(strVersion, "string")) {
			throw EzErrorFactory.createError("EzMap::showVersion方法中arguments[0]类型不正确")
		}
		this.map.showVersion(strVersion)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::showVersion方法执行不正确", e)
	}
};
MapsApp.prototype.editOverlay = function() {
	this.initMenu()
};
MapsApp.prototype.initMenu = function() {
	if(!this.menuContainer) {
		this.menuContainer = createDiv("");
		this.menuContainer.className = "contextmenu";
		this.map.container.appendChild(this.menuContainer);
		BindingEvent(this.map.container, "click", this.eventHandler("hideMenu"))
	}
};
MapsApp.prototype.centerAtMouse = function() {
	if(typeof this.mousePoint != "undefined") {
		this.map.centerAtLatLng(this.mousePoint)
	}
};
MapsApp.prototype.showMenu = function() {
	this.mousePoint = new Point(this.map.mouseLng, this.map.mouseLat);
	this.initMenu();
	this.menuContainer.innerHTML = "";
	var mHeight = 20,
		mWidth = 100;
	var nlens = 0;
	for(var i = 0; i < g_menu.length; i++) {
		var pDiv = document.createElement("div");
		this.menuContainer.appendChild(pDiv);
		var pObj = g_menu[i];
		if(pObj == null) {
			pDiv.className = "divider";
			continue
		}
		pDiv.style.width = mWidth + "px";
		pDiv.innerHTML = pObj.name;
		pDiv.className = "menuitem";
		pDiv.func = pObj.func;
		pDiv.onmouseover = function() {
			this.className = "menuitem selectedmenuitem"
		};
		pDiv.onmouseout = function() {
			this.className = "menuitem"
		};
		pDiv.onclick = function() {
			eval(this.func)
		}
	}
	this.menuContainer.style.display = "";
	var uPoint = this.mapCoord2container(new Point(this.getMouseMapX(), this.getMouseMapY()));
	this.menuContainer.style.pixelTop = uPoint.y;
	this.menuContainer.style.pixelLeft = uPoint.x;
	return false
};
MapsApp.prototype.getCurrentEditor = function() {
	return g_current_editor
};
MapsApp.prototype.hideMenu = function() {
	this.menuContainer.style.display = "none";
	var pOffset = ObjectOffset(this.map.container);
	this.menuContainer.style.pixelTop = event.clientY - pOffset.y;
	this.menuContainer.style.pixelLeft = event.clientX - pOffset.x;
	return false
};
MapsApp.prototype.getMouseMapX = function() {
	return this.map.getMouseMapX()
};
MapsApp.prototype.getMouseMapY = function() {
	return this.map.getMouseMapY()
};
MapsApp.prototype.containerCoord2Map = function(point) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(point, "Point")) {
			throw EzErrorFactory.createError("EzMap::containerCoord2Map方法中arguments[0]类型不正确")
		}
		return this.map.containerCoord2Map(point)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::containerCoord2Map方法执行不正确", e)
	}
};
MapsApp.prototype.mapCoord2Container = function(point) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(point, "Point")) {
			throw EzErrorFactory.createError("EzMap::mapCoord2container方法中arguments[0]类型不正确")
		}
		if(this.map.bIsMercatorMap) {
			point = this.map.latlon2Meters(point)
		}
		return this.map.mapCoord2container(point)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::mapCoord2container方法执行不正确", e)
	}
};
MapsApp.prototype.mapCoord2container = MapsApp.prototype.mapCoord2Container;
MapsApp.prototype.getMapContainer = function() {
	return this.mapContainer
};
MapsApp.prototype.getCurrentMapScale = function() {
	return this.map.getCurrentMapScale()
};
MapsApp.prototype.closeInfoWindow = function() {
	this.map.closeInfoWindow()
};
MapsApp.prototype.clearMapChangeListener = function() {
	this.map.clearStateChanged()
};
MapsApp.prototype.printGPS = function(strHTML) {
	this.beforePrintMap(strHTML)
};
MapsApp.prototype.removeDrawGeometry = function() {
	if(this.map.vmlDraw != null) {
		this.map.removeOverlay(this.map.vmlDraw);
		return this.map.vmlDraw
	}
};
MapsApp.prototype.addMapEventListener = function(eventType, handler) {
	return EzEvent.addEventListener(this.map, eventType, handler)
};
MapsApp.prototype.removeMapEventListener = function(eventListener) {
	EzEvent.removeEventListener(eventListener)
};
MapsApp.prototype.clearMapInstanceEventListeners = function(eventType) {
	EzEvent.clearInstanceEventListeners(this.map, eventType)
};
MapsApp.prototype.clearMapEventListeners = function() {
	EzEvent.clearEventListeners(this.map)
};
MapsApp.prototype.getQueryResults2 = function() {
	return this.queryResults2
};
MapsApp.prototype.enableDblClick = function() {
	this.enableDblClick()
};
MapsApp.prototype.disableDblClick = function() {
	this.disableDblClick()
};
MapsApp.prototype.setCompatibility = function() {
	if(EzServerClient.GlobeParams.MapSrcURL) {
		return {
			mapCenter: _MapCenter,
			mapFullExtent: EzServerClient.GlobeParams.MapFullExtent,
			mapInitLevel: EzServerClient.GlobeParams.MapInitLevel,
			mapMaxLevel: EzServerClient.GlobeParams.MapMaxLevel,
			zoomOffset: EzServerClient.GlobeParams.ZoomOffset,
			copyRight: EzServerClient.GlobeParams.Copyright,
			dynamicCopyright: EzServerClient.GlobeParams.DynamicCopyright
		}
	}
};
MapsApp.prototype.addGroupLayer = function(grpLyr) {
	var lyrs = grpLyr.getLayers();
	for(var i = 0; i < lyrs.length; i++) {
		if(this.zoomOffset) {
			lyrs[i].setOffset(this.zoomOffset)
		}
	}
	this.groupLayers.push(grpLyr);
	if(!this.baseGroupLayer) {
		this.baseGroupLayer = grpLyr
	}
	if(!this.bIsInit) {
		this.initialize();
		this.bIsInit = true
	}
	if(this.map) {
		this.map.showMapServerControl()
	}
};
MapsApp.prototype.removeGroupLayer = function(index) {
	this.groupLayers.splice(index, 1)
};
MapsApp.prototype.getGroupLayer = function() {
	return this.groupLayers
};
MapsApp.prototype.addGroupLayers = function(groupLayers) {
	for(var i = 0; i < groupLayers.length; i++) {
		this.addGroupLayer(groupLayers[i])
	}
};
MapsApp.prototype.addOverLayer = function(vLayer) {};
MapsApp.prototype.setMapOptions = function(mapOptions) {
	if(mapOptions.copyRight) {
		this.copyRight = mapOptions.copyRight;
		EzServerClient.GlobeParams.Copyright = this.copyRight;
		_mCopyright = this.copyRight
	}
	if(mapOptions.dynamicCopyright) {
		this.dynamicCopyright = mapOptions.dynamicCopyright;
		EzServerClient.GlobeParams.DynamicCopyright = this.dynamicCopyright
	}
	if(mapOptions.mapCenter) {
		this.mapCenter.x = mapOptions.mapCenter[0];
		this.mapCenter.y = mapOptions.mapCenter[1];
		_MapCenterPoint = this.mapCenter;
		_MapCenter = mapOptions.mapCenter
	}
	if(mapOptions.mapFullExtent) {
		this.mapFullExtent.minX = mapOptions.mapFullExtent[0];
		this.mapFullExtent.minY = mapOptions.mapFullExtent[1];
		this.mapFullExtent.maxX = mapOptions.mapFullExtent[2];
		this.mapFullExtent.maxY = mapOptions.mapFullExtent[3];
		EzServerClient.GlobeParams.MapFullExtent = mapOptions.mapFullExtent;
		_FullExtentMBR = mapOptions.mapFullExtent
	}
	if(mapOptions.mapInitLevel == 0 || mapOptions.mapInitLevel) {
		this.mapInitLevel = mapOptions.mapInitLevel;
		EzServerClient.GlobeParams.MapInitLevel = this.mapInitLevel;
		_InitLevel = this.mapInitLevel
	}
	if(mapOptions.mapMaxLevel) {
		this.mapMaxLevel = mapOptions.mapMaxLevel;
		_MaxLevel = this.mapMaxLevel;
		EzServerClient.GlobeParams.MapMaxLevel = this.mapMaxLevel
	}
	if(mapOptions.zoomOffset) {
		this.zoomOffset = mapOptions.zoomOffset;
		_ZoomOffset = this.zoomOffset;
		EzServerClient.GlobeParams.ZoomOffset = this.zoomOffset
	}
	if(mapOptions.ezMapServiceURL) {
		this.ezMapServiceURL = mapOptions.ezMapServiceURL;
		EzServerClient.GlobeParams.EzMapServiceURL = this.ezMapServiceURL;
		m_MapServer = this.ezMapServiceURL
	}
	if(mapOptions.ezGeoPSURL) {
		this.ezGeoPSURL = mapOptions.ezGeoPSURL;
		if(!EzServerClient.GlobeParams.EzGeoPSURL) {
			EzServerClient.GlobeParams.EzGeoPSURL = this.ezGeoPSURL;
			document.writeln("<script type='text/javascript' charset='GB2312' src='" + EzServerClient.GlobeParams.EzGeoPSURL + "/ezgeops_js/EzGeoPS.js'><\/script>")
		}
	}
};
MapsApp.prototype.setMapCenter = function(point) {
	this.mapCenter = point
};
MapsApp.prototype.setFullExtent = function(mbr) {
	if(typeof(mbr) == "undefined") {
		mbr = this.getBoundsLatLng()
	}
	this.mapFullExtent = mbr;
	_FullExtentMBR = [mbr.minX, mbr.minY, mbr.maxX, mbr.maxY]
};
MapsApp.prototype.setInitZoomLevel = function(zoomLevel) {
	this.mapInitLevel = zoomLevel
};
MapsApp.prototype.setMaxLevel = function(zoomLevel) {
	this.mapMaxLevel = zoomLevel
};
MapsApp.prototype.setZoomOffset = function(zoomOffset) {
	this.zoomOffset = zoomOffset
};
MapsApp.prototype.setEzMapServiceURL = function(url) {
	if(url) {
		this.ezMapServiceURL = mapOptions.ezMapServiceURL;
		EzServerClient.GlobeParams.EzMapServiceURL = this.ezMapServiceURL;
		m_MapServer = this.ezMapServiceURL
	}
};
MapsApp.prototype.setProxyOfEzMapService = function(proxyUrl) {
	if(proxyUrl) {
		g_prox_calss = proxyUrl;
		MapsApp.proxyURL2EzMapService = proxyUrl
	}
};
MapsApp.prototype.setEzGeoPSURL = function(url) {
	if(url) {
		this.ezMapServiceURL = mapOptions.ezMapServiceURL;
		EzServerClient.GlobeParams.EzMapServiceURL = this.ezMapServiceURL;
		m_MapServer = this.ezMapServiceURL
	}
};
MapsApp.prototype.addHotspotContainer = function(tilelyrIndex, dataDirectoryurl, levelLimit, profileEvent, callback) {
	this.map.addHotspotContainer(tilelyrIndex, dataDirectoryurl, levelLimit, profileEvent, callback)
};
MapsApp.prototype.enableSlipPan = function(coefficient) {
	this.map._slip = true;
	if(coefficient) {
		this.map._coefficient = coefficient
	}
};
MapsApp.prototype.disableSlipPan = function() {
	this.map._slip = false
};
MapsApp.prototype.slipPan = function(x, y) {
	try {
		if(x && !EzServerClient.GlobeFunction.isTypeRight(x, "float")) {
			throw EzErrorFactory.createError("EzMap::slipPan方法中arguments[0]类型不正确")
		}
		if(y && !EzServerClient.GlobeFunction.isTypeRight(y, "float")) {
			throw EzErrorFactory.createError("EzMap::slipPan方法中arguments[1]类型不正确")
		}
		if(arguments.length == 0) {
			this.changeDragMode("pan")
		} else {
			if(arguments.length == 2) {
				this.map.slipPan(x, y)
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::slipPan方法执行不正确", e)
	}
};
MapsApp.prototype.enableMouseZoom = function() {
	this.map._mouseZoom = true
};
MapsApp.prototype.disableMouseZoom = function() {
	this.map._mouseZoom = false
};
MapsApp.prototype.zoomAtPoint = function(oPoint, nZoomLevel) {
	if(this.map.bIsMercatorMap) {
		oPoint = this.map.latlon2Meters(oPoint)
	}
	this.map.zoomAtPoint(oPoint, nZoomLevel)
};
MapsApp.prototype.refresh = function() {
	this.map.initializeMap()
};
MapsApp.prototype.MapServerList = function(num) {
	var pointer = this;
	var tempArr = pointer.map.mapServer;
	var uSelect = document.createElement("select");
	for(var i = 0; i < tempArr.length; i++) {
		var varItem = new Option(tempArr[i].innerText, i);
		uSelect.options.add(varItem)
	}
	uSelect.onchange = function() {
		var that = this;
		var index = that.selectedIndex;
		var option = that.options[index];
		for(var i = 0, j = that.options.length; i <= j; i++) {
			if(option.value == i) {
				tempArr[i].click()
			}
		}
	};
	if(num >= tempArr.length) {
		num = tempArr.length - 1
	}
	if(num < 0) {
		num = 0
	}
	uSelect.options[num].selected = true;
	tempArr[num].click();
	return uSelect
};
MapsApp.prototype.showMapCtrl = function() {
	try {
		this.map.showMapCtrl()
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::createMapCtrl方法执行不正确", e)
	}
};
MapsApp.prototype.showMapNum = function(str) {
	this.map.showMapNum(str)
};
MapsApp.prototype.hideMapNum = function() {
	this.map.hideMapNum()
};
MapsApp.prototype.changeFloor = function(level) {
	this.map.changeFloor(level)
};
MapsApp.prototype.loadIndoorMap = function(id, indoorLayers) {
	var aera = this.map.getAreaObjById(id);
	if(arguments.length == 1) {
		this.map.loadIndoorMap(aera.information)
	}
	if(arguments.length == 2) {
		this.map.addIndoorLayer(aera.information, indoorLayers)
	}
};
MapsApp.prototype.setOpenInfo = function(callback) {
	this.map.setOpenInfo(callBack)
};
MapsApp.prototype.setIndoorServer = function(serverUrl) {
	EzServerClient.GlobeParams.serverURL = serverUrl
};
MapsApp.prototype.setIndoorProxy = function(proxyUrl) {
	EzServerClient.GlobeParams.proyURL = proxyUrl
};
MapsApp.prototype.setIndoorSourceType = function(serverType) {
	EzServerClient.GlobeParams.source = serverType
};
MapsApp.prototype.setInitBuildFloorLevel = function(buildLevel) {
	EzServerClient.GlobeParams.initBuildFloorLevel = buildLevel
};
MapsApp.prototype.setLayerName = function(layerName) {
	EzServerClient.GlobeParams.layerName = layerName
};
MapsApp.prototype.getCurrentFloorLevel = function() {
	return this.map.getCurrentFloorLevel()
};
MapsApp.prototype.selectOnchange = function(callback) {
	this.map.selectOnchange(callback)
};
MapsApp.prototype.getFloorControl = function() {
	return this.map.indoorSelect
};
MapsApp.prototype.hideFloorControl = function() {
	var div = this.map.floorControl;
	div.style.display = "none"
};
MapsApp.prototype.showFloorControl = function() {
	var div = this.map.floorControl;
	div.style.display = "block"
};
MapsApp.prototype.setFloorControlPos = function(top, left) {
	var div = this.map.floorControl;
	div.style.top = top + "px";
	div.style.left = left + "px"
};

function MapServer(pVectMap, pSateMap, pVectSate) {
	this.setMapDispName = function(index, name) {
		try {
			if(!EzServerClient.GlobeFunction.isTypeRight(index, "int")) {
				throw EzErrorFactory.createError("MapServer::setMapDispName方法中arguments[0]类型不正确")
			}
			if(!EzServerClient.GlobeFunction.isTypeRight(name, "string")) {
				throw EzErrorFactory.createError("MapServer::setMapDispName方法中arguments[1]类型不正确")
			}
			this.mMapServerURLArr[index].mapServerName = name
		} catch(e) {
			throw EzErrorFactory.createError("MapServer::setMapDispName方法执行不正确", e)
		}
	};
	this.getMapDispName = function(index) {
		try {
			if(!EzServerClient.GlobeFunction.isTypeRight(index, "int")) {
				throw EzErrorFactory.createError("MapServer::getMapDispName方法中arguments[0]类型不正确")
			}
			return this.mMapServerURLArr[index].mapServerName
		} catch(e) {
			throw EzErrorFactory.createError("MapServer::getMapDispName方法执行不正确", e)
		}
	};
	this.getDefaultMapDispName = function(index) {
		try {
			if(!EzServerClient.GlobeFunction.isTypeRight(index, "int")) {
				throw EzErrorFactory.createError("MapServer::getDefaultMapDispName方法中arguments[0]类型不正确")
			}
			var uLen = EzServerClient.GlobeParams.MapSrcURL.length;
			if(index >= uLen) {
				return "地图" + (index - uLen)
			} else {
				return EzServerClient.GlobeParams.MapSrcURL[index][0]
			}
		} catch(e) {
			throw EzErrorFactory.createError("MapServer::getDefaultMapDispName方法执行不正确", e)
		}
	};
	this.getMapServerURL = function(index) {
		try {
			if(!EzServerClient.GlobeFunction.isTypeRight(index, "int")) {
				throw EzErrorFactory.createError("MapServer::getMapServerURL方法中arguments[0]类型不正确")
			}
			return this.mMapServerURLArr[index]
		} catch(e) {
			throw EzErrorFactory.createError("MapServer::getMapServerURL方法执行不正确", e)
		}
	};
	this.setMapServerURL = function(index, vStrURL) {
		try {
			if(!EzServerClient.GlobeFunction.isTypeRight(index, "int")) {
				throw EzErrorFactory.createError("MapServer::setMapServerURL方法中arguments[0]类型不正确")
			}
			if(!EzServerClient.GlobeFunction.isTypeRight(vStrURL, "string") && !EzServerClient.GlobeFunction.isTypeRight(vStrURL, "Array")) {
				throw EzErrorFactory.createError("MapServer::setMapServerURL方法中arguments[1]类型不正确")
			}
			this.mMapServerURLArr[index] = vStrURL
		} catch(e) {
			throw EzErrorFactory.createError("MapServer::setMapServerURL方法执行不正确", e)
		}
	};
	this.getMapServerURLCount = function() {
		try {
			return this.mMapServerURLArr.length
		} catch(e) {
			throw EzErrorFactory.createError("MapServer::getMapServerURLCount方法执行不正确", e)
		}
	};
	this.mMapServerURLArr = [];
	for(var i = 0; i < arguments.length; i++) {
		if(typeof arguments[i] == "string") {
			this.mMapServerURLArr.push([arguments[i]])
		} else {
			if(arguments[i] instanceof Array) {
				this.mMapServerURLArr.push(arguments[i])
			} else {
				throw new Error("MapServer对象构造方法参数有误")
			}
		}
		this.mMapServerURLArr[i].mapServerName = this.getDefaultMapDispName(i)
	}
}

function MapServerControl(Id) {
	var h = document.createElement("div");
	h.onselectstart = _NoAction;
	h.style.cssText = "BORDER-RIGHT: #015190 1px solid;	BORDER-TOP: #015190 1px solid;	BORDER-LEFT: #015190 1px solid;	BORDER-BOTTOM: #015190 1px solid;	RIGHT: 12em;	HEIGHT: 12px;	CURSOR: pointer;	POSITION: absolute;	BACKGROUND-COLOR: #FFFFCC";
	var pTextDiv = document.createElement("div");
	pTextDiv.style.cssText = "TEXT-ALIGN: center;	VERTICAL-ALIGN:middle;	FONT-SIZE: 12px;	FONT-FAMILY:宋体;	color:#015190";
	pTextDiv.innerHTML = Id;
	pTextDiv.noWrap = true;
	h.contentDiv = pTextDiv;
	h.appendChild(pTextDiv);
	return h
}
MapServerControl.prototype = new MapControl();
MapServerControl.prototype.init = function(pMe) {
	if(pMe instanceof MainFrame) {
		pMe.createSmallPanningControls(this.div);
		pMe.createSmallZoomControls(this.div)
	}
};

function MapSmallControl() {
	this.base = MapControl;
	this.base()
}
MapSmallControl.prototype = new MapControl();
MapSmallControl.prototype.init = function(pMe) {
	if(pMe instanceof MainFrame) {
		pMe.createSmallPanningControls(this.div);
		pMe.createSmallZoomControls(this.div)
	}
};

function MapStandControl() {
	this.base = MapControl;
	this.base()
}
MapStandControl.prototype = new MapControl();
MapStandControl.prototype.init = function(pMe) {
	if(pMe instanceof MainFrame) {
		pMe.createPanningControls(this.div);
		pMe.createZoomControls(this.div);
		pMe.createZoomSlider(this.div)
	}
};

function MapStatusControl(u) {
	this.anchorLevel = null;
	this.anchor = new Point(0, 0);
	this.spec = null;
	this.span = new Rect(_MaxNumber, _MaxNumber);
	this.points = null;
	this.map = u;
	this.map.addStateListener(this.eventHandler("onMapStateChanged"));
	this.map.onresize = this.eventHandler("onMapResize")
}
MapStatusControl.prototype.onMapStateChanged = function() {
	if(this.anchorLevel != this.map.realZoomLevel || this.spec != this.map.spec) {
		this.reset();
		this.addPoint(0, 0, true);
		return
	}
	var G = this.map.getCenterLatLng();
	var pd = Math.round((G.x - this.anchor.x) / this.span.width);
	var Fd = Math.round((G.y - this.anchor.y) / this.span.height);
	this.addPoint(pd, Fd, true)
};
MapStatusControl.prototype.onMapResize = function() {
	this.reset();
	this.addPoint(0, 0, false)
};
MapStatusControl.prototype.reset = function() {
	this.map.getCenterLatLng(this.anchor);
	this.map.getSpanLatLng(this.span);
	this.spec = this.map.spec;
	this.anchorLevel = this.map.realZoomLevel;
	this.points = new Object()
};
MapStatusControl.prototype.addPoint = function(pd, Fd, bIsOK) {
	var str = pd + "," + Fd;
	if(this.points[str]) {
		return
	}
	this.points[str] = 1;
	if(bIsOK) {}
};

function MultiMaps() {
	this.maps = new Array()
}
MultiMaps.prototype.openMap = function(id, ver) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(id, "string") && !EzServerClient.GlobeFunction.isTypeRight(id, "object")) {
			throw EzErrorFactory.createError("MultiMaps::openMap方法中arguments[0]参数类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(ver, "string")) {
			throw EzErrorFactory.createError("MultiMaps::openMap方法中arguments[1]参数类型不正确")
		}
		var m_MapApp = null;
		if(typeof id == "string") {
			m_MapApp = new EzMap(document.getElementById(id))
		} else {
			m_MapApp = new EzMap(id)
		}
		m_MapApp.showMapServer();
		m_MapApp.showSmallMapControl();
		if(ver) {
			m_MapApp.showVersion(ver)
		}
		m_MapApp.addMapChangeListener(this.eventHandler("refreshAllMap"));
		this.maps.push(m_MapApp);
		return m_MapApp
	} catch(e) {
		throw EzErrorFactory.createError("MultiMaps::openMap方法执行不正确", e)
	}
};
MultiMaps.prototype.refreshAllMap = function() {
	if(_bIsLocked) {
		return
	}
	_bIsLocked = true;
	for(var i = 0; i < this.maps.length; i++) {
		var pMap = this.maps[i];
		if(pMap.getZoomLevel() != _curentLevel) {
			pMap.centerAndZoom(_curentPoint, _curentLevel)
		} else {
			if(!pMap.getCenterLatLng().approxEquals(_curentPoint)) {
				pMap.recenterOrPanToLatLng(_curentPoint)
			}
		}
	}
	window.setTimeout("_bIsLocked=false;", 300)
};
MultiMaps.prototype.refreshAllMap_ = function() {
	_bIsLocked = true;
	for(var i = 0; i < this.maps.length; i++) {
		var pMap = this.maps[i];
		pMap.map.clearStateChanged()
	}
	for(var i = 0; i < this.maps.length; i++) {
		var pMap = this.maps[i];
		if(pMap.getZoomLevel() != _curentLevel) {
			pMap.centerAndZoom(_curentPoint, _curentLevel)
		} else {
			pMap.recenterOrPanToLatLng(_curentPoint)
		}
	}
	this.setTimeout("this.addMapList()", 200)
};
MultiMaps.prototype.addMapList = function() {
	for(var i = 0; i < this.maps.length; i++) {
		var pMap = this.maps[i];
		pMap.addMapChangeListener(this.eventHandler("refreshAllMap"))
	}
	_bIsLocked = false
};
MultiMaps.prototype.zoomInExt = function() {
	for(var i = 0; i < this.maps.length; i++) {
		var pMap = this.maps[i];
		pMap.zoomInExt()
	}
};
MultiMaps.prototype.zoomOutExt = function() {
	for(var i = 0; i < this.maps.length; i++) {
		var pMap = this.maps[i];
		pMap.zoomOutExt()
	}
};
MultiMaps.prototype.pan = function() {
	for(var i = 0; i < this.maps.length; i++) {
		var pMap = this.maps[i];
		pMap.pan()
	}
};

function nc(vg) {
	this.ticks = vg;
	this.tick = 0
}
nc.prototype.reset = function() {
	this.tick = 0
};
nc.prototype.next = function() {
	this.tick++;
	var lb = Math.PI * (this.tick / this.ticks - 0.5);
	return(Math.sin(lb) + 1) / 2
};
nc.prototype.more = function() {
	return this.tick < this.ticks
};

function nc1(vg) {
	this.ticks = vg;
	this.tick = 0
}
nc1.prototype.reset = function() {
	this.tick = 0
};
nc1.changeArr = [0.3, 0.55, 0.7, 0.79, 0.85, 0.89, 0.94, 0.97, 0.99, 1];
nc1.prototype.next = function() {
	this.tick++;
	if(this.tick >= 10) {
		return 1
	} else {
		return nc1.changeArr[this.tick - 1]
	}
};
nc1.prototype.more = function() {
	return this.tick < this.ticks
};

function OverlayStatus(iStartSeq, iEndSeq, iStatus) {
	this.startSeq = iStartSeq;
	this.endSeq = iEndSeq;
	this.iStatus = iStatus
}
OverlayStatus.prototype.toString = function() {
	return "开始周期" + this.startSeq + ",结束周期:" + this.endSeq + "显示状态:" + this.iStatus
};
OverlayStatus.prototype.bIsConflict = function(pStatus) {
	var bIs = false;
	bIs = (this.startSeq >= pStatus.startSeq && this.endSeq <= pStatus.endSeq) || (this.endSeq >= pStatus.startSeq && this.endSeq <= pStatus.endSeq);
	if(bIs) {
		alert("设置时间有冲突，已经存在该范围的时间设置:(" + this.startSeq + "," + this.endSeq + ")")
	}
	return bIs
};

function OverView(strURL, dMinx, dMiny, dMaxx, dMaxY) {
	this.url = strURL;
	this.MBR = new MBR(dMinx, dMiny, dMaxx, dMaxY);
	this.imgWidth = 200;
	this.imgHeight = 240;
	this.width = 200;
	this.height = 150;
	this.closeImgURL = _CloseImg;
	this.minLevel = 0;
	this.maxLevel = _MaxLevel
}

function Shaderer() {}

function Timer() {}

function TrackMonitor(pArray) {
	this.routeArray = pArray;
	this.length = pArray.length;
	this.index = 0;
	this.interval = 1
}
TrackMonitor.prototype.reset = function() {
	this.index = 0
};
TrackMonitor.prototype.next = function() {
	if(this.interval != 1) {
		if((this.index + this.interval) < this.length) {
			this.index += this.interval
		} else {
			this.index = this.length
		}
	} else {
		this.index++
	}
	return this.routeArray[this.index - 1]
};
TrackMonitor.prototype.prev = function() {
	this.index--;
	return this.routeArray[this.index - 1]
};

function V(ee) {
	this.stylesheet = ee
}
V.prototype.transformToHTML = function(pMon, Va) {
	var strInfo = "";
	Va.className = "InfoClass";
	if(typeof Monitor != "undefined" && pMon instanceof Monitor) {
		strInfo = pMon.toHTML();
		Va.innerHTML = strInfo
	} else {
		if(typeof pMon == "string") {
			strInfo = pMon;
			Va.innerHTML = strInfo
		} else {
			if(typeof pMon == "object") {
				RemoveChildren(Va);
				Va.appendChild(pMon)
			} else {
				alert("不知类型")
			}
		}
	}
};

function voidFunc(aj) {
	return null
}

function xa(U, Ja) {
	this.id = U;
	this.ticketClass = Ja
}
xa.prototype.isValid = function() {
	return sb[this.ticketClass] == this.id
};

function XMLHttp() {}
XMLHttp.createXMLHttp = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest()
	} else {
		if(window.ActiveXObject) {
			var aVersions = ["MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"];
			for(var i = 0; i < aVersions.length; i++) {
				try {
					var oXmlHttp = new ActiveXObject(aVersions[i]);
					return oXmlHttp
				} catch(oError) {}
			}
		}
	}
};

function IndoorMap(buildHotspot, map) {
	this.build = buildHotspot;
	if(typeof(buildHotspot.BUILDFUP) != "undedined") {
		this.buildLevelUp = buildHotspot.BUILDFUP
	} else {
		this.buildLevelUp = 1
	}
	if(typeof(buildHotspot.BUILDFDOWN) != "undedined") {
		this.buildLevelDown = buildHotspot.BUILDFDOWN
	} else {
		this.buildLevelDown = 0
	}
	this.map = map;
	this.currentMapLevel = this.map.realZoomLevel + this.map.zoomOffset;
	this.viseSize = new Rect(0, 0);
	this.serverUrl = null;
	this.proxUrl = null;
	this.dataSource = null
}
IndoorMap.prototype.setDataSource = function(strSource) {
	this.dataSource = strSource
};
IndoorMap.prototype.setServerUrl = function(serverUrl) {
	this.serverUrl = serverUrl
};
IndoorMap.prototype.setProxUrl = function(proxUrl) {
	this.proxUrl = proxUrl
};
IndoorMap.prototype.init = function() {
	var _this = this;
	if(typeof(_this.build.ID) != "undedined") {
		_this.ID = _this.build.ID
	}
	if(typeof(_this.build.GEOMETRY) != "undedined") {
		_this.GEOMETRY = _this.build.GEOMETRY
	}
	if(typeof(_this.build.X) != "undedined" && typeof(_this.build.Y) != "undedined") {
		_this.centerPoint = new Point(_this.build.X, _this.build.Y)
	}
};
IndoorMap.prototype.showBorder = function() {
	try {
		var _this = this;
		if(_this.map.indoorBordorData.length != 0) {
			for(var i = 0, j = _this.map.indoorBordorData.length; i < j; i++) {
				_this.map.removeOverlay(_this.map.indoorBordorData[i])
			}
			_this.map.indoorBordorData = []
		}
		var boxPoints = _this.build.GEOMETRY;
		var boxPolygon = new Polygon(boxPoints, "#FFFFCD", 2, 0, "#AAAAAA");
		_this.map.addOverlay(boxPolygon);
		_this.map.indoorBordorData.push(boxPolygon)
	} catch(e) {
		throw EzErrorFactory.createError("IndoorMap::showBorder方法发生错误")
	}
};
IndoorMap.prototype.getBuildViewSize = function() {
	var _this = this;
	var polygon = new Polygon(_this.build.GEOMETRY);
	var mbr = polygon.getMBR();
	var leftDownPoint = new Point(mbr.minX, mbr.minY);
	var rightTopPoint = new Point(mbr.maxX, mbr.maxY);
	var currentMapLevel = _this.map.realZoomLevel + _this.map.zoomOffset;
	var realLevel = _this.map.realZoomLevel;
	var minColRow = _this.calculateCoLRow(leftDownPoint, realLevel);
	var maxColRow = _this.calculateCoLRow(rightTopPoint, realLevel);
	return {
		minColRow: minColRow,
		maxColRow: maxColRow
	}
};
IndoorMap.prototype.calculateCoLRow = function(lonLatPoint, iLevel) {
	var x = lonLatPoint.x;
	var y = lonLatPoint.y;
	var xyz = new EzServerClient.MapPositionZ(x, y, iLevel);
	var colrow = this.map.baseLayer.toTileCoords(xyz);
	return {
		col: colrow.col,
		row: colrow.row
	}
};
IndoorMap.prototype.showIndoorMap = function() {
	var _this = this;
	var up = _this.buildLevelUp;
	var down = _this.buildLevelDown;
	if(typeof(up) == "undefined") {
		up = 1
	}
	if(typeof(down) == "undefined") {
		down = 0
	}
	_this.map.oBuildLevelDown = down;
	var floorControl = _this.map.showFloorControl(up, down);
	_this.showBorder();
	var initBuildLevel = 1;
	if(typeof(EzServerClient.GlobeParams.initBuildFloorLevel) != "undefined") {
		initBuildLevel = EzServerClient.GlobeParams.initBuildFloorLevel
	}
	_this.loadIndoorHotImg(initBuildLevel);
	var oSelect = floorControl.oSelect;
	if(initBuildLevel > 0) {
		initBuildLevel = initBuildLevel + down - 1
	} else {
		if(initBuildLevel < 0) {
			initBuildLevel = initBuildLevel + down
		} else {
			initBuildLevel = 1
		}
	}
	if(initBuildLevel > up) {
		initBuildLevel = up
	}
	oSelect.options[initBuildLevel].selected = true;
	oSelect.onchange = function(event) {
		var index = oSelect.selectedIndex;
		var option = oSelect.options[index];
		for(var i = 0, j = this.options.length; i <= j; i++) {
			if(option.value == i) {
				if(option.text == "close") {
					_this.map.deleteIndoorMap()
				} else {
					oSelect.options[i].selected = true;
					var realFloorNum = 0;
					if((i - down) >= 0) {
						realFloorNum = i - down + 1
					} else {
						realFloorNum = i - down
					}
					_this.loadIndoorHotImg(realFloorNum)
				}
			}
		}
	}
};
IndoorMap.prototype.loadIndoorHotImg = function(floorLevel) {
	var _this = this;
	_this.map.clearIndoorData();
	var fillColor = null;
	var numType = 0;
	var configFillcolor = [];
	if(typeof(EzServerClient.GlobeParams.fillColor) != "undefined") {
		configFillcolor = EzServerClient.GlobeParams.fillColor
	} else {
		configFillcolor = ["#FFDEAD", "#FF7F50", "#F4A460", "#802A2A", "#A39480"]
	}
	var colrowExtent = this.getBuildViewSize();
	var maxRow = colrowExtent.maxColRow.row;
	var minRow = colrowExtent.minColRow.row;
	var maxCol = colrowExtent.maxColRow.col;
	var minCol = colrowExtent.minColRow.col;
	var level = _this.map.realZoomLevel + _this.map.zoomOffset;
	for(var i = minRow; i <= maxRow; i++) {
		for(var j = minCol; j <= maxCol; j++) {
			var sendUrl = this.getTileByUrl(i, j, level, floorLevel);
			EzServerClient.AsynAddIndoorByAjax(sendUrl, function(hotData) {
				hotData = hotData.replace(/((\r\n)+)$/, "").replace(/\r\n/g, ",").replace(/(.\d+)$/, "");
				eval("var hotspots=[" + hotData + "]");
				if(hotspots[0] == null || typeof(hotspots[0].ERRORID) != "undefined") {
					return
				}
				for(var i = 0; i < hotspots.length; i++) {
					numType = parseInt(hotspots[i].ROOMTYPE);
					if(numType <= configFillcolor.length) {
						fillColor = configFillcolor[numType - 1]
					} else {
						fillColor = "#FFDEAD"
					}
					var oPolygon = new Polygon(hotspots[i].GEOMETRY, "#FFFFCD", 2, 0, fillColor, hotspots[i].TITLE);
					oPolygon.addListener("mouseover", function(e) {
						e.elementObj.attr({
							stroke: "#EB8E55"
						})
					}, oPolygon);
					oPolygon.addListener("mouseout", function(e) {
						e.elementObj.attr({
							stroke: "#FFFFCD"
						})
					}, oPolygon);
					oPolygon.addListener("click", function(e) {
						_this.map.openInfoWindow(e.X, e.Y, e.TITLE)
					}, hotspots[i]);
					if(hotspots[i].ID == _this.build.ID) {
						_this.map.addOverlay(oPolygon);
						_this.map.levelData.push(oPolygon)
					} else {}
				}
			})
		}
	}
};
IndoorMap.prototype.makeJsonStr = function(obj, coords) {
	if(obj == null) {
		return ""
	}
	var str = '{"spatialfilters":';
	str += '[{"relation":"' + (obj.relation || "overlap") + '"';
	str += ',"buffersize":"' + (obj.buffersize || "0") + '"';
	str += ',"bufferunit":"' + (obj.bufferunit || "degree") + '"';
	str += ',"shape":[{';
	str += '"geotype":"' + (obj.geotype || "polygon") + '"';
	str += ',"coords":"' + (obj.coords || coords) + '"';
	str += "}]}]}";
	return "&spatialfilters=" + str
};
IndoorMap.prototype.getTileByUrl = function(row, col, level, floorLevel) {
	var _this = this;
	var sendUrl = null;
	var url = null;
	var zoom = level;
	var zoom1 = zoom;
	if(_this.map.baseLayer.zoomLevelSequence == 2) {
		zoom1 = 18 - zoom
	}
	var tpz = new EzServerClient.TilePositionZ(col, row, _this.map.realZoomLevel);
	var mrz = _this.map.baseLayer.toMapCoords(tpz);
	var coords = [mrz.minx, mrz.miny, mrz.maxx, mrz.miny, mrz.maxx, mrz.maxy, mrz.minx, mrz.maxy].join(",");
	var str = "(LEVEL_=" + floorLevel + ")and(ID=" + _this.build.ID + ")";
	var whereClause = encodeURIComponent(str);
	var layerName = EzServerClient.GlobeParams.layerName;
	if(_this.dataSource == "EzServer") {
		url = _this.serverUrl + "/EzMap?Service=getHotspot&ZoomOffset=0&Col=" + col + "&Row=" + row + "&Zoom=" + level
	} else {
		if(_this.dataSource == "EzMapService") {
			url = _this.serverUrl + "/HotspotPort?layer=" + layerName + "&fields=ROOMID%2CSHAPE%2cTITLE%2cID%2cLEVEL_%2cROOMTYPE&whereClause=" + whereClause + "&col=" + col + "&row=" + row + "&zoom=" + zoom1 + "&crs=Geog(256)" + this.makeJsonStr(this.filter, coords)
		} else {
			url = _this.serverUrl + "/z" + level + "/x" + col + "/z" + level + "_x" + col + "_y" + row
		}
	}
	if(_this.proxUrl != null) {
		sendUrl = _this.proxUrl + "?request=gotourl&url=" + encodeURIComponent(url) + "&time=" + new Date().getTime().valueOf()
	} else {
		sendUrl = url
	}
	return sendUrl
};
var qg = new Rect(0, 0);
var Ri = new Rect(0, 0);
var _TmrModeFlatZoom = null;
var gi = new Point(0, 0);
var we = new Point(0, 0);
var Jg = false;
var Pe = 0;
var __EzP = new Point(0, 0);
var _EzMap_mapCtrl_slider = 10;
var _EzMap_mapCtrl_slider_iHeight = 232;

function MainFrame(contain, ea, k, m, Dg, He, gh, Xi, mapAppPeer, options) {
	this.tempMap = contain;
	this.tempMap.style.overflow = "hidden";
	if(this.tempMap.style.position != "absolute") {
		this.tempMap.style.position = "relative"
	}
	var container = document.createElement("div");
	container.id = "relative";
	container.style.position = "absolute";
	container.style.left = "0px";
	container.style.top = "0px";
	container.style.width = "100%";
	container.style.height = "100%";
	this.tempMap.appendChild(container);
	this.mapPeer = mapAppPeer;
	this.groupLayers = options.groupLayers;
	this.groupTileImages = [];
	this.baseGroupLayer = options.baseGroupLayer;
	this.layersContainer = [];
	this.baseLayer = this.baseGroupLayer.getLayers()[0];
	this.mapServer = [];
	this.mapCenter = options.mapCenter;
	this.saveStartPoint = new Point(0, 0);
	if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
		options.mapMaxLevel = (options.mapMaxLevel > this.baseLayer.maxZoomLevel) ? this.baseLayer.maxZoomLevel : options.mapMaxLevel;
		this.mapInitLevel = options.mapMaxLevel - options.mapInitLevel
	} else {
		this.mapInitLevel = options.mapInitLevel
	}
	this.mapMaxLevel = options.mapMaxLevel;
	this.zoomOffset = options.zoomOffset;
	this.realZoomLevel = this.mapInitLevel;
	this.zoomLevel = this.mapInitLevel;
	this.mouseZoomLevel = this.realZoomLevel;
	this.ascendZoomLevel = ((EzServerClient.GlobeParams.MapMaxLevel > this.baseLayer.maxZoomLevel) ? this.baseLayer.maxZoomLevel : EzServerClient.GlobeParams.MapMaxLevel) - this.realZoomLevel;
	if(options.isOverView) {
		this.isOverView = true
	} else {
		this.isOverView = false
	}
	this.addtionalTileNum = 0;
	this.bInfoHasOpen = false;
	this.bInfoHasCloseClick = false;
	this.bIsOpenInfo = false;
	this.currentMapScale = "";
	this.bThematicOverlay = false;
	this.bThematicOverlayCP03 = false;
	this.curThematicURL = "";
	this.curThematicURLCP03 = "";
	this.strThematicXML = "";
	this.strThematicProxyURL = "";
	this.bIsMercatorMap = false;
	this.bInitMap = true;
	this.bSwitchMap = false;
	this.mapNumDiv = null;
	this.preLayer = null;
	this.currentLayer = null;
	this.bIsStreamOrText = false;
	this.currentMapServerIndex = 0;
	this._slip = false;
	this._coefficient = 3;
	this._x = this._y = 0;
	this._start_x = this._start_y = 0;
	this._speed_x = this._speed_y = 0;
	this._start_t = 0;
	this._mouseZoom = false;
	this.bIsOpenIndoorMap = false;
	this.tag = false;
	this.oIndoorData = null;
	this.fIndoorFunc = null;
	this.tempBordorData = [];
	this.tempFloorData = [];
	this.bIsDeleteIndoorMap = false;
	var uIcon = new Icon();
	uIcon.image = _ImageBaseUrl + "indoorMap/indoor.png";
	uIcon.height = 27;
	uIcon.width = 71;
	uIcon.topOffset = 13.5;
	uIcon.leftOffset = 30.5;
	this.title = new Marker(new Point(0, 0), uIcon);
	this.bIsAddIndoorTitle = false;
	this.filterId = -1;
	this.bIsAddIndoorTLayer = false;
	this.bIsAddIndoorHTLayer = false;
	this.currentBuildFloorlevel = 1;
	if(!container) {
		return
	}
	this.ownerDocument = container.ownerDocument || document;
	this.container = container;
	this.containOffset = ObjectOffset(this.tempMap);
	this.container.style.backgroundColor = "white";
	this.container.unselectable = "on";
	this.container.style.overflow = "hidden";
	if(this.container.style.position != "absolute") {
		this.container.style.position = "relative"
	}
	if(!k || !m) {
		k = this.container.offsetWidth;
		m = this.container.offsetHeight
	}
	this.viewSize = new Rect(k, m);
	this.div = this.createMapDiv();
	this.divPaint = document.createElement("div");
	this.divPaint.style.zIndex = "100";
	this.divPaint.id = "divPaint";
	this.div.appendChild(this.divPaint);
	this.container.appendChild(this.div);
	if(this.container.style.display == "" || this.container.style.display == "block") {
		this.initDisplay = true
	} else {
		this.container.style.display = "";
		this.initDisplay = false
	}
	this.bIsPaning = false;
	this.bIsMoving = false;
	this.bIsZooming = false;
	this.bIsDraging = false;
	this.bIsPlayRoute = false;
	this.bIsLog = false;
	this.disablePopups = Dg;
	this.disableDragging = He;
	this.mouseLng = 0;
	this.mouseLat = 0;
	this.iBorderWidth = 0;
	this.iBorderHeight = 0;
	this.currentPanOffset = new Rect(0, 0);
	this.tilePaddingOffset = new Rect(0, 0);
	this.tableSize = new Rect(0, 0);
	this.overlays = [];
	this.locations = [];
	this.curOverlay = null;
	this.monitorArray = [];
	this.mainMonitor = null;
	this.panDistance = new Rect(0, 0);
	this.panKeys = new Ic();
	this.stateMonitor = null;
	BindingEvent(window, "blur", this.eventHandler("onWindowBlur"));
	BindingEvent(this.container, "contextmenu", _NoAction);
	BindingEvent(document.body, "select", _NoAction);
	BindingEvent(this.div, "mousedown", this.eventHandler("onMapMouseDown"));
	BindingEvent(this.div, "mousemove", this.eventHandler("onMapMouseMove"));
	BindingEvent(this.div, "mouseover", this.eventHandler("onMapMouseOver"));
	BindingEvent(this.div, "mouseout", this.eventHandler("onMapMouseOut"));
	BindingEvent(this.div, "mouseup", this.eventHandler("onMapMouseUp"));
	var that = this;
	EzEvent.addEventListener(this, EzEvent.MAP_SWITCHMAPSERVER, function(e) {
		that.preLayer = e.preLayer;
		that.currentLayer = e.currentLayer
	});
	if(!this.disablePopups) {
		this.infoWindow = new InfoWind(this.eventHandler("onInfoCloseClick"), this.div, 5000, 2000)
	}
	this.directionsDiv = document.createElement("div");
	this.directionsDiv.directionsBounds = new MBR(-_MaxNumber, -_MaxNumber, _MaxNumber, _MaxNumber);
	this.div.appendChild(this.directionsDiv);
	this.dragObject = new DragEvent(this.div, 0, 0);
	this.dragObject.ondrag = this.eventHandler("onDrag");
	this.dragObject.ondragstart = this.eventHandler("onDragStart");
	this.dragObject.ondragend = this.eventHandler("onDragEnd");
	this.dragObject.onclick = this.eventHandler("onClick");
	if(He) {
		this.dragObject.disable()
	}
	this.init(this.mapCenter.x, this.mapCenter.y, this.mapInitLevel);
	this.initializeMap();
	this.onzoom = null;
	this.onpan = null;
	this.onmousedown = null;
	this.onspecificationchange = null;
	this.oninfowindowclose = null;
	this.onresize = null;
	this.stateListeners = null;
	this.useRawVml = false;
	this.buttonTip = null;
	this.createMapCenter(this.container);
	this.createDrawPoint(this.container);
	if(!this.isOverView) {
		EzServerClient.GlobeParams.MapLoadCheckHandle = window.setInterval(EzServerClient.GlobeFunction.mapImgLoadEventFunc(this), 10);
		this.addEventDiv();
		this.displayCoord(window.event);
		EzEvent.mapPoint.x = this.mouseLng;
		EzEvent.mapPoint.y = this.mouseLat;
		var mapPoint = EzEvent.mapPoint;
		if(this.bIsMercatorMap) {
			mapPoint = this.latlon2Meters(mapPoint)
		}
		EzEvent.screenPoint = this.mapCoord2container(mapPoint)
	}
}
MainFrame.prototype.enableDblClick = function() {
	BindingEvent(this.div, "dblclick", this.eventHandler("onDoubleClick"))
};
MainFrame.prototype.disableDblClick = function() {
	unbindingEvent(this.div, "dblclick", this.eventHandler("onDoubleClick"))
};
MainFrame.prototype.enableMouseScroll = function() {
	var pMe = this;
	BindingEvent(this.div, "mousewheel", function(e) {
		pMe.onMouseScroll(e);
		return false
	});
	BindingEvent(this.div, "DOMMouseScroll", function(e) {
		pMe.onMouseScroll(e);
		return false
	})
};
MainFrame.prototype.gotoCenter = function() {
	var pPoint = _MapCenterPoint;
	if(this.bIsMercatorMap) {
		pPoint = this.latlon2Meters(pPoint)
	}
	this.centerAtLatLng(pPoint)
};
MainFrame.prototype.fullExtent = function() {
	if(this.bIsMercatorMap) {
		var min = this.latlon2Meters(new Point(_FullExtentMBR[0], _FullExtentMBR[1]));
		var max = this.latlon2Meters(new Point(_FullExtentMBR[2], _FullExtentMBR[3]));
		this.centerAtMBR(min.x, min.y, max.x, max.y)
	} else {
		this.centerAtMBR(_FullExtentMBR[0], _FullExtentMBR[1], _FullExtentMBR[2], _FullExtentMBR[3])
	}
};
MainFrame.prototype.init = function(lon, lat, iLevel) {
	this.bInitMap = true;
	if(this.baseLayer instanceof EzServerClient.Layer.MercatorTileLayer) {
		this.bIsMercatorMap = true;
		EzServerClient.GlobeParams.bIsMercatorMap = true
	}
	this.calculateTileMeasurements();
	this.centerLatLng = new Point(lon, lat);
	var e = new Point(0, 0);
	var p = this.baseLayer.convertPosByFlatMatrix(lon, lat);
	lon = p.x;
	lat = p.y;
	var x = lon - this.baseLayer.tileInfo.origin[0];
	var y = lat - this.baseLayer.tileInfo.origin[1];
	e.x = Math.floor(x / this.baseLayer.tileInfo.levelDetails[iLevel].resolution);
	e.y = Math.floor(y / this.baseLayer.tileInfo.levelDetails[iLevel].resolution);
	this.centerBitmap = new Point(e.x, e.y);
	var left = e.x - Math.floor(this.container.offsetWidth / 2) - this.tilePaddingOffset.width;
	var top = e.y + Math.floor(this.container.offsetHeight / 2) + this.tilePaddingOffset.height;
	var hc = Math.floor(left / this.baseLayer.tileInfo.width);
	var yc = Math.floor(top / this.baseLayer.tileInfo.height);
	var iOffsetx = hc * this.baseLayer.tileInfo.width - left;
	var iOffsety = yc * this.baseLayer.tileInfo.height - top;
	if(iOffsetx < -this.baseLayer.tileInfo.width) {
		hc++;
		iOffsetx += this.baseLayer.tileInfo.width
	} else {
		if(iOffsetx > 0) {
			hc--;
			iOffsetx -= this.baseLayer.tileInfo.width
		}
	}
	iOffsety = -iOffsety;
	if(iOffsety < -this.baseLayer.tileInfo.height) {
		yc--;
		iOffsety += this.baseLayer.tileInfo.height
	} else {
		if(iOffsety > 0) {
			yc++;
			iOffsety -= this.baseLayer.tileInfo.height
		}
	}
	this.topLeftTile = new Point(hc, yc);
	this.dragObject.moveTo(iOffsetx, iOffsety)
};
MainFrame.prototype.createMapCenter = function(pParent) {
	if(typeof _bIsMapCenter == "undefined" || _bIsMapCenter == false) {
		return
	}
	this.mapCenterDiv = document.createElement("img");
	pParent.appendChild(this.mapCenterDiv);
	this.mapCenterDiv.style.position = "absolute";
	this.mapCenterDiv.src = _MapCenterUrl;
	this.mapCenterDiv.style.left = convert2Px(this.viewSize.width / 2 - 8);
	this.mapCenterDiv.style.top = convert2Px(this.viewSize.height / 2 - 8);
	this.mapCenterDiv.style.zIndex = 850
};
MainFrame.prototype.displayCoord = function(e) {
	if(!e) {
		return
	}
	try {
		if(document.layers) {
			xCoord = e.x;
			yCoord = e.y
		} else {
			if(document.all) {
				xCoord = event.clientX;
				yCoord = event.clientY
			} else {
				if(document.getElementById) {
					xCoord = e.clientX;
					yCoord = e.clientY
				}
			}
		}
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
		xCoord = xCoord + scrollLeft - 1;
		yCoord = yCoord + scrollTop - 3;
		xCoord -= this.iBorderWidth;
		yCoord -= this.iBorderHeight;
		if(this.buttonTip != null) {
			this.buttonTip.style.top = yCoord + 10 + "px";
			this.buttonTip.style.left = xCoord + 10 + "px"
		}
		if(this.containOffset) {
			var con = this.tempMap;
			var A = {
				x: 0,
				y: 0
			};
			while(con) {
				A.x += con.offsetLeft;
				A.y += con.offsetTop;
				con = con.offsetParent
			}
			xCoord = xCoord - A.x;
			yCoord = yCoord - A.y
		}
		var pCenterLatLng = this.getCenterLatLng();
		if(isNaN(this.realZoomLevel)) {
			return
		}
		var pp1 = this.baseLayer.convertPosByFlatMatrix(pCenterLatLng.x, pCenterLatLng.y);
		pCenterLatLng.x = pp1.x;
		pCenterLatLng.y = pp1.y;
		this.mouseLng = pCenterLatLng.x + (xCoord - this.viewSize.width / 2) * this.baseLayer.tileInfo.levelDetails[this.realZoomLevel].resolution;
		this.mouseLat = pCenterLatLng.y - (yCoord - this.viewSize.height / 2) * this.baseLayer.tileInfo.levelDetails[this.realZoomLevel].resolution;
		var pp = this.baseLayer.convertPosByFlatMatrixInverse(this.mouseLng, this.mouseLat);
		this.mouseLng = pp.x;
		this.mouseLat = pp.y;
		this.mouseLng = Math.floor(this.mouseLng * 100000) / 100000;
		this.mouseLat = Math.floor(this.mouseLat * 100000) / 100000;
		if(_VMLInMap) {
			this.mouseX = Math.floor(this.mouseLng * 100000);
			this.mouseY = Math.floor(this.mouseLat * 100000)
		} else {
			this.mouseX = xCoord;
			this.mouseY = yCoord
		}
		if(this.bIsMercatorMap) {
			var latlng = this.meters2latlon(new Point(this.mouseLng, this.mouseLat));
			this.mouseLng = Math.floor(latlng.x * 100000) / 100000;
			this.mouseLat = Math.floor(latlng.y * 100000) / 100000;
			var point = this.meters2latlon(new Point(this.mouseX, this.mouseY))
		} else {}
		window.status = "坐标:" + this.mouseLng + "," + this.mouseLat
	} catch(e) {
		alert("错误信息:" + e.message)
	}
};
MainFrame.prototype.centerAtMouse = function() {
	this.centerAtLatLng(new Point(this.mouseLng, this.mouseLat))
};
MainFrame.prototype.initDebug = function() {
	if(!_Debug) {
		return
	}
	this.centerNaiv = document.createElement("img");
	this.container.appendChild(this.centerNaiv);
	this.centerNaiv.style.position = "absolute";
	this.centerNaiv.alt = "Center";
	this.mapBejingCenter = document.createElement("img");
	this.container.appendChild(this.mapBejingCenter);
	this.mapBejingCenter.style.position = "absolute";
	this.mapBejingCenter.src = _MapBeingCenterUrl;
	this.mapBejingCenter.style.width = 16;
	this.mapBejingCenter.style.height = 16
};
MainFrame.prototype.createMapDiv = function() {
	var h = document.createElement("div");
	h.style.position = "absolute";
	h.style.top = convert2Px(0);
	h.style.left = convert2Px(0);
	h.style.zIndex = 0;
	h.style.backgroundColor = "#f2efe9";
	h.style.zoom = 1;
	h.id = "div";
	return h
};
MainFrame.prototype.loadTileImages = function() {
	var lyrs = this.baseGroupLayer.getLayers();
	this.groupTileImages.clear();
	this.layersContainer.clear();
	var hotLyr = document.getElementById("hotspotLyr");
	if(hotLyr != null) {
		this.hotLyr = hotLyr
	}
	if(this.hotLyr && !this.isOverView) {
		for(var i = 0; i < this.hotLyr.childNodes.length; i++) {
			var n = this.hotLyr.childNodes[i];
			n.innerHTML = ""
		}
	}
	var hotLyrContainer = null;
	for(var i = 0; i < lyrs.length; i++) {
		if(lyrs[i] instanceof EzServerClient.Layer.IndoorMapTileLayer) {
			this.currentBuildFloorlevel = lyrs[i].buildFloorLevel;
			this.bIsAddIndoorTLayer = true
		}
		if(lyrs[i] instanceof EzServerClient.Layer.HotSpotTileLayer) {
			if(this.isOverView) {
				continue
			}
			if(!lyrs[i].isLoad) {
				this.groupTileImages.push([
					[]
				])
			} else {
				this.groupTileImages[i] = lyrs[i].lastTileImages
			}
			if(!(lyrs[i] instanceof EzServerClient.Layer.IndoorMapHotSpotTileLayer)) {
				hotLyrContainer = this.addLayerContainer(lyrs[i], i);
				this.hotContainer = hotLyrContainer;
				this.addHotspotContainer(lyrs[i], i)
			} else {
				if(this.bIsAddIndoorTLayer) {
					lyrs[i].buildFloorLevel = this.currentBuildFloorlevel
				} else {
					this.currentBuildFloorlevel = lyrs[i].buildFloorLevel
				}
				if(hotLyrContainer == null) {
					hotLyrContainer = this.addLayerContainer(lyrs[i], i);
					this.addHotspotContainer(lyrs[i], i)
				} else {
					hotLyrContainer = this.hotContainer
				}
			}
			this.loadTileHotImagesLayer(this.groupTileImages[i], lyrs[i], i, hotLyrContainer)
		} else {
			var lyrContainer = this.addLayerContainer(lyrs[i], i);
			if(!this.isOverView) {
				if(!lyrs[i].isLoad) {
					this.groupTileImages.push([
						[]
					])
				} else {
					this.groupTileImages[i] = lyrs[i].lastTileImages
				}
			} else {
				this.groupTileImages.push([
					[]
				])
			}
			this.loadTileImagesLayer(this.groupTileImages[i], lyrs[i], i, lyrContainer)
		}
	}
};
MainFrame.prototype.checkLevel = function(level, levelLimit) {
	if(levelLimit) {
		if((typeof levelLimit == "object") && (levelLimit.constructor == Array) && (levelLimit.length > 1)) {
			if(level < Math.min(levelLimit[0], levelLimit[1]) || level > Math.max(levelLimit[0], levelLimit[1])) {
				return false
			}
		}
	}
	return true
};
MainFrame.prototype.getTileNum = function(vTileLyr) {
	return {
		width: Math.ceil(this.viewSize.width / vTileLyr.tileInfo.width) + 1 + this.addtionalTileNum,
		height: Math.ceil(this.viewSize.height / vTileLyr.tileInfo.height) + 1 + this.addtionalTileNum
	}
};
MainFrame.prototype.loadTileImagesLayer = function(vTileImages, vLyr, vIndex, vLyrContainer) {
	var tileNum = this.getTileNum(vLyr);
	while(vTileImages.length > tileNum.width) {
		var hf = vTileImages.pop();
		for(var a = 0; a < hf.length; a++) {
			this.removeTileImage(hf[a])
		}
	}
	for(var a = vTileImages.length; a < tileNum.width; a++) {
		vTileImages.push([])
	}
	for(var m = 0; m < vTileImages.length; m++) {
		while(vTileImages[m].length > tileNum.height) {
			var f = vTileImages[m].pop();
			this.removeTileImage(f)
		}
		for(var n = vTileImages[m].length; n < tileNum.height; n++) {
			var img = this.createTileMatrixCell(vLyr, vIndex > 0);
			vTileImages[m].push(img);
			vLyrContainer.appendChild(img);
			this.configureImage2(img, m, n, vLyr)
		}
	}
	if(!this.isOverView) {
		vLyr.lastTileImages = vTileImages;
		vLyr.isLoad = true
	}
};
MainFrame.prototype.loadTileHotImagesLayer = function(vTileImages, vLyr, vIndex, vLyrContainer) {
	var tileNum = this.getTileNum(vLyr);
	if(!this._tilePOIs) {
		this._tilePOIs = []
	}
	while(vTileImages.length > tileNum.width) {
		var hf = vTileImages.pop();
		for(var a = 0; a < hf.length; a++) {
			this.removeTileImage(hf[a])
		}
	}
	for(var a = vTileImages.length; a < tileNum.width; a++) {
		vTileImages.push([])
	}
	for(var m = 0; m < vTileImages.length; m++) {
		while(vTileImages[m].length > tileNum.height) {
			var f = vTileImages[m].pop();
			this.removeTileImage(f)
		}
		for(var n = vTileImages[m].length; n < tileNum.height; n++) {
			var img = this.createTileMatrixCell2(vLyr);
			vTileImages[m].push(img);
			if(vLyr.hotspot2d) {} else {
				vLyrContainer.appendChild(img)
			}
			this.configureImage3(img, m, n, vLyr)
		}
	}
	vLyr.lastTileImages = vTileImages;
	vLyr.isLoad = true
};
MainFrame.prototype.addLayerContainer = function(vLyr, vIndex) {
	if(this.isOverView) {
		var tileDiv = document.createElement("div");
		tileDiv.style.position = "absolute";
		tileDiv.id = vLyr.name;
		tileDiv.name = "overviewTilelayer";
		tileDiv.style.zIndex = vIndex;
		this.div.appendChild(tileDiv);
		this.layersContainer.push(tileDiv);
		return tileDiv
	} else {
		var browserType = EzServerClient.GlobeParams.BrowserTypeAndVersion;
		if(browserType >= "IE10.0") {
			vLyr.div.style.zIndex = 11 + vIndex
		} else {
			vLyr.div.style.zIndex = vIndex
		}
		this.div.appendChild(vLyr.div);
		this.layersContainer.push(vLyr.div);
		return vLyr.div
	}
};
MainFrame.prototype.configureImage2 = function(f, x, y, vLyr) {
	if(vLyr.levelLimit && !this.checkLevel(this.realZoomLevel, vLyr.levelLimit)) {
		f.src = _TransparentImageUrl;
		return
	}
	var peer = this;
	var Yg = (this.currentPanOffset.width + x) * vLyr.tileInfo.width;
	var Li = (this.currentPanOffset.height + y) * vLyr.tileInfo.height;
	var left = -this.tilePaddingOffset.width + Yg;
	var top = -this.tilePaddingOffset.height + Li;
	if(f.tileLeft != left || f.tileTop != top) {
		f.style.left = convert2Px(left);
		f.style.top = convert2Px(top);
		f.tileLeft = left;
		f.tileTop = top
	}
	if(!this.isLoaded()) {
		f.src = this.baseLayer.emptyTileUrl
	} else {
		var strURL = null;
		if(vLyr instanceof EzServerClient.Layer.IndoorMapTileLayer) {
			var buildFloorLevel = vLyr.buildFloorLevel;
			strURL = vLyr.getTileUrl(this.topLeftTile, x, y, this.realZoomLevel, this.zoomOffset, buildFloorLevel)
		} else {
			strURL = vLyr.getTileUrl(this.topLeftTile, x, y, this.realZoomLevel, this.zoomOffset)
		}
		if(f.src != strURL) {
			divCreator.setImage(f, strURL);
			if(vLyr.opacity != null && vLyr.opacity != 100) {
				f.style.filter = "Alpha(Opacity=" + vLyr.opacity + ")"
			}
		}
	}
	if(typeof(f.galleryimg) == "undefined" || f.galleryimg != "no") {
		f.galleryimg = "no"
	}
};
MainFrame.prototype.configureImage3 = function(f, x, y, vLyr) {
	if(!this.checkLevel(this.realZoomLevel, vLyr.levelLimit)) {
		return
	}
	var peer = this;
	var flag = 0;
	var strURL = null;
	if(vLyr instanceof EzServerClient.Layer.IndoorMapHotSpotTileLayer) {
		var buildFloorLevel = vLyr.buildFloorLevel;
		strURL = vLyr.getTileUrl(this.topLeftTile, x, y, this.realZoomLevel, this.zoomOffset, buildFloorLevel)
	} else {
		strURL = vLyr.getTileUrl(this.topLeftTile, x, y, this.realZoomLevel, this.zoomOffset)
	}
	EzServerClient.AsynAddScriptByAjax(strURL, f, vLyr, peer, flag)
};
MainFrame.prototype.createTileMatrixCell = function(vLyr, bOverLay) {
	var f = null;
	if(vLyr instanceof EzServerClient.Layer.HotSpotTileLayer) {
		f = divCreator.create(null, vLyr.tileInfo.width, vLyr.tileInfo.height, 0, 0, 0, false);
		return f
	}
	if(bOverLay) {
		if(EzServerClient.GlobeParams.BrowserTypeAndVersion == "IE6.0" || EzServerClient.GlobeParams.BrowserTypeAndVersion == "IE5.5") {
			f = divCreator.create(null, vLyr.tileInfo.width, vLyr.tileInfo.height, null, null, 1, null, this.ownerDocument);
			f.id = "ezmap_overlay_div"
		} else {
			f = Shaderer.create(null, vLyr.tileInfo.width, vLyr.tileInfo.height, null, null, 1, null, this.ownerDocument)
		}
	} else {
		f = Shaderer.create(null, vLyr.tileInfo.width, vLyr.tileInfo.height, null, null, 0, null, this.ownerDocument)
	}
	f.onerror = function() {
		this.src = _NoImage.src
	};
	f.style.position = "absolute";
	f.style.zIndex = vLyr.div.style.zIndex;
	return f
};
MainFrame.prototype.createTileMatrixCell2 = function(vLyr) {
	var li = document.createElement("li");
	li.style.listStyleType = "none";
	return li
};
MainFrame.prototype.deleteTiles = function() {
	this.removeTilesFromDiv(this.groupTileImages);
	this.groupTileImages = null;
	if(this.overlayImages) {
		this.removeTilesFromDiv(this.overlayImages);
		this.overlayImages = null
	}
};
MainFrame.prototype.deleteGroupTiles = function() {
	var lyrs = this.baseGroupLayer.getLayers();
	if(!this.isOverView) {
		for(var i = 0; i < lyrs.length; i++) {
			lyrs[i].isLoad = false;
			lyrs[i].lastTileImages = [
				[]
			]
		}
	}
	for(var i = 0; i < this.layersContainer.length; i++) {
		this.removeTilesFromDiv(this.groupTileImages[i]);
		this.div.removeChild(this.layersContainer[i])
	}
	if(this.hotspotDiv) {
		this.div.removeChild(this.hotspotDiv);
		this.hotspotDiv = null;
		if(__EzHandle1) {
			EzEvent.removeEventListener(__EzHandle1)
		}
		if(__EzHandle2) {
			EzEvent.removeEventListener(__EzHandle2)
		}
		if(__EzHandle3) {
			EzEvent.removeEventListener(__EzHandle3)
		}
	}
	this.groupTileImages.clear();
	this.layersContainer.clear()
};
MainFrame.prototype.removeTilesFromDiv = function(a) {
	if(a) {
		for(var b = 0; b < a.length; b++) {
			if(a[b]) {
				for(var c = 0; c < a[b].length; c++) {
					this.removeTileImage(a[b][c])
				}
			}
		}
	}
};
MainFrame.prototype.removeTileImage = function(a) {
	divCreator.remove(a, this.ownerDocument);
	if(a.errorTile) {
		p.remove(a.errorTile, this.ownerDocument);
		a.errorTile = null
	}
	a.onerror = null
};
MainFrame.prototype.initializeMap = function() {
	if(this.baseLayer instanceof EzServerClient.Layer.MercatorTileLayer) {
		this.bIsMercatorMap = true;
		EzServerClient.GlobeParams.bIsMercatorMap = true
	} else {
		this.bIsMercatorMap = false;
		EzServerClient.GlobeParams.bIsMercatorMap = false
	}
	if(this.baseLayer instanceof EzServerClient.Layer.AmapTileLayer) {
		this.container.className = "mapBackGroundImg"
	} else {
		this.container.className = ""
	}
	this.deleteGroupTiles();
	if(!this.centerLatLng) {
		this.centerLatLng = this.getCenterLatLng()
	}
	if(this.bInitMap) {
		if(this.bIsMercatorMap) {
			this.centerLatLng = this.latlon2Meters(this.centerLatLng)
		}
	}
	if(this.bSwitchMap) {
		if(this.preLayer == "lonlat" && this.currentLayer == "mercator") {
			this.centerLatLng = this.latlon2Meters(this.centerLatLng)
		}
		if(this.preLayer == "mercator" && this.currentLayer == "lonlat") {
			this.centerLatLng = this.meters2latlon(this.centerLatLng)
		}
	}
	this.centerAtLatLng(this.centerLatLng);
	this.loadTileImages()
};
MainFrame.prototype.getSpanLatLng = function(e) {
	if(!e) {
		e = new Rect(0, 0)
	}
	var Ea = this.baseLayer.convertBitmap2Map(this.centerBitmap.x - this.viewSize.width / 2, this.centerBitmap.y - this.viewSize.height / 2, this.realZoomLevel);
	var Aa = this.baseLayer.convertBitmap2Map(this.centerBitmap.x + this.viewSize.width / 2, this.centerBitmap.y + this.viewSize.height / 2, this.realZoomLevel);
	e.width = Math.abs(Aa.x - Ea.x);
	e.height = Math.abs(Aa.y - Ea.y);
	return e
};
MainFrame.prototype.getBoundsBitmap = function(e) {
	if(!e) {
		e = new MBR(0, 0, 0, 0)
	}
	e.minX = this.centerBitmap.x - this.viewSize.width / 2;
	e.minY = this.centerBitmap.y - this.viewSize.height / 2;
	e.maxX = this.centerBitmap.x + this.viewSize.width / 2;
	e.maxY = this.centerBitmap.y + this.viewSize.height / 2;
	return e
};
MainFrame.prototype.getBoundsLatLng = function(e) {
	e = this.getBoundsBitmap(e);
	var Ea = this.baseLayer.convertBitmap2Map(e.minX, e.minY, this.realZoomLevel);
	var Aa = this.baseLayer.convertBitmap2Map(e.maxX, e.maxY, this.realZoomLevel);
	e.minX = Ea.x;
	e.maxX = Aa.x;
	e.minY = Math.min(Aa.y, Ea.y);
	e.maxY = Math.max(Aa.y, Ea.y);
	return e
};
MainFrame.prototype.getPixelSpan = function() {
	var pMBR = this.getBoundsLatLng();
	var dSpan = pMBR.getSpanX() / this.viewSize.width;
	return dSpan
};
MainFrame.prototype.calculateTileMeasurements = function() {
	var iTableWidth = Math.ceil(this.viewSize.width / this.baseLayer.tileInfo.width) + 1 + this.addtionalTileNum;
	var iTableHeight = Math.ceil(this.viewSize.height / this.baseLayer.tileInfo.height) + 1 + this.addtionalTileNum;
	this.tableSize.width = iTableWidth;
	this.tableSize.height = iTableHeight
};
MainFrame.prototype.isLoaded = function() {
	return this.topLeftTile != null
};
MainFrame.prototype.onDrag = function() {
	this.bIsDraging = true;
	if(!this.topLeftTile) {
		return
	}
	this.onMove();
	this.rotateTiles();
	this.bIsDraging = false;
	EzEvent.ezEventListener.source = this;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_PAN;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent);
	if(this._slip) {
		var dx = this._start_x - EzEvent.screenPoint.x;
		var dy = this._start_y - EzEvent.screenPoint.y;
		this._start_x = EzEvent.screenPoint.x;
		this._start_y = EzEvent.screenPoint.y;
		var nowT = new Date().getTime();
		var t = nowT - this._start_t;
		if(t > 0) {
			this._speed_x = (this._speed_x + (dx * 1000) / t) / 2;
			this._speed_y = (this._speed_y + (dy * 1000) / t) / 2
		}
		this._start_t = nowT
	}
};
MainFrame.prototype.bIsMapMoving = function() {
	return this.bIsPaning || this.bIsMoving || this.bIsDraging || this.dragObject.bIsMouseDown
};
MainFrame.prototype.rotateTiles = function() {
	var a = this.getCurrentOffset(Ri);
	if(Math.abs(this.dragObject.left) > 10000000 || Math.abs(this.dragObject.top) > 10000000) {
		this.cancelPan();
		this.centerAtBitmap(this.centerBitmap);
		return
	}
	while(a.width < -this.baseLayer.tileInfo.width) {
		this.currentPanOffset.width++;
		this.topLeftTile.x++;
		for(var i = 0; i < this.groupTileImages.length; i++) {
			this.rotateRight2(this.groupTileImages[i], this.baseGroupLayer.getLayers()[i])
		}
		this.getCurrentOffset(a)
	}
	while(a.width > 0) {
		this.currentPanOffset.width--;
		this.topLeftTile.x--;
		for(var i = 0; i < this.groupTileImages.length; i++) {
			this.rotateLeft2(this.groupTileImages[i], this.baseGroupLayer.getLayers()[i])
		}
		this.getCurrentOffset(a)
	}
	while(a.height < -this.baseLayer.tileInfo.height) {
		this.currentPanOffset.height++;
		this.topLeftTile.y--;
		for(var i = 0; i < this.groupTileImages.length; i++) {
			this.rotateDown2(this.groupTileImages[i], this.baseGroupLayer.getLayers()[i])
		}
		this.getCurrentOffset(a)
	}
	while(a.height > 0) {
		this.currentPanOffset.height--;
		this.topLeftTile.y++;
		for(var i = 0; i < this.groupTileImages.length; i++) {
			this.rotateUp2(this.groupTileImages[i], this.baseGroupLayer.getLayers()[i])
		}
		this.getCurrentOffset(a)
	}
};
MainFrame.prototype.rotateLeft2 = function(vLyrTiles, vLyr) {
	var c = vLyrTiles.pop();
	vLyrTiles.unshift(c);
	if(vLyr instanceof EzServerClient.Layer.HotSpotTileLayer) {
		for(var d = 0; d < c.length; d++) {
			this.configureImage3(c[d], 0, d, vLyr)
		}
	} else {
		for(var d = 0; d < c.length; d++) {
			this.configureImage2(c[d], 0, d, vLyr)
		}
	}
};
MainFrame.prototype.rotateRight2 = function(vLyrTiles, vLyr) {
	var c = vLyrTiles.shift();
	vLyrTiles.push(c);
	var d = vLyrTiles.length - 1;
	if(vLyr instanceof EzServerClient.Layer.HotSpotTileLayer) {
		for(var e = 0; e < c.length; e++) {
			this.configureImage3(c[e], d, e, vLyr)
		}
	} else {
		for(var e = 0; e < c.length; e++) {
			this.configureImage2(c[e], d, e, vLyr)
		}
	}
};
MainFrame.prototype.rotateUp2 = function(vLyrTiles, vLyr) {
	if(vLyr instanceof EzServerClient.Layer.HotSpotTileLayer) {
		for(var c = 0; c < vLyrTiles.length; c++) {
			var d = vLyrTiles[c].pop();
			vLyrTiles[c].unshift(d);
			this.configureImage3(d, c, 0, vLyr)
		}
	} else {
		for(var c = 0; c < vLyrTiles.length; c++) {
			var d = vLyrTiles[c].pop();
			vLyrTiles[c].unshift(d);
			this.configureImage2(d, c, 0, vLyr)
		}
	}
};
MainFrame.prototype.rotateDown2 = function(vLyrTiles, vLyr) {
	var c = vLyrTiles[0].length - 1;
	if(vLyr instanceof EzServerClient.Layer.HotSpotTileLayer) {
		for(var d = 0; d < vLyrTiles.length; d++) {
			var e = vLyrTiles[d].shift();
			vLyrTiles[d].push(e);
			this.configureImage3(e, d, c, vLyr)
		}
	} else {
		for(var d = 0; d < vLyrTiles.length; d++) {
			var e = vLyrTiles[d].shift();
			vLyrTiles[d].push(e);
			this.configureImage2(e, d, c, vLyr)
		}
	}
};
MainFrame.prototype.onDragStart = function(b) {
	this.saveStartPoint = this.getCenterLatLng();
	if(this.onmousedown) {
		this.onmousedown(b)
	}
	EzEvent.ezEventListener.source = this;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_PANSTART;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent);
	if(this._slip) {
		this._start_x = EzEvent.screenPoint.x;
		this._start_y = EzEvent.screenPoint.y;
		this._speed_x = 0;
		this._speed_y = 0;
		this._start_t = new Date().getTime()
	}
};
MainFrame.prototype.draw = function(b) {
	alert("start..")
};
MainFrame.prototype.drawMouseDown = function(event) {
	var pMosusePoint = new Point(this.mouseLng, this.mouseLat);
	if(event.button == 1 || event.button == 0) {
		if(this.drawMode == "drawPoint") {
			if(this.outputPanel2) {
				if(this.outputPanel && typeof this.outputPanel.value != "undefined") {
					this.outputPanel.value = this.mouseLng
				}
				if(typeof this.outputPanel2.value != "undefined") {
					this.outputPanel2.value = this.mouseLat
				}
			} else {
				if(this.outputPanel && typeof this.outputPanel.value != "undefined") {
					this.outputPanel.value = this.mouseLng + "," + this.mouseLat
				}
			}
			var pPoint = this.getDivCoord(this.mouseLng, this.mouseLat);
			this.pointImg.lon = this.mouseLng;
			this.pointImg.lat = this.mouseLat;
			this.pointImg.style.left = convert2Px(pPoint.x - 8);
			this.pointImg.style.top = convert2Px(pPoint.y - 8);
			this.changeDragMode("pan");
			if(_callback != null) {
				_callback(this.mouseLng + "," + this.mouseLat)
			}
			return
		}
		if(this.vmlDraw == null) {
			this.pathPoint = new Array();
			this.drawStart();
			this.bEndDraw = false
		}
		if(this.vmlDraw && (this.drawMode == "measure" || this.drawMode == "drawPolyline")) {
			this.pathPoint.push(pMosusePoint);
			this.vmlDraw.points.push(pMosusePoint);
			if(this.bDisplay) {
				if(typeof this.titles == "undefined") {
					this.titles = new Array()
				}
				if(this.pathPoint.length == 1) {
					var firstPoint = this.pathPoint[0];
					var lengthTitle = new Title("起点");
					lengthTitle.setPoint(firstPoint);
					this.addOverlay(lengthTitle);
					this.titles.push(lengthTitle)
				} else {
					if(this.pathPoint.length != 0 && this.pathPoint.length > 1) {
						var point = this.pathPoint[this.pathPoint.length - 1];
						var length = this.vmlDraw.getLength();
						var strLen = length.toString() + "米";
						var title = new Title(strLen);
						title.setPoint(point);
						this.addOverlay(title);
						this.titles.push(title)
					}
				}
			}
			this.vmlDraw.setPoints(this.vmlDraw.points);
			this.vmlDraw.redraw();
			if(this.outputPanel && typeof this.outputPanel.value != "undefined") {
				if(this.pathPoint.length < 2) {
					this.outputPanel.value = this.pathPoint.toString() + "," + this.pathPoint.toString()
				} else {
					this.outputPanel.value = this.pathPoint.toString()
				}
			}
		} else {
			if(this.vmlDraw && this.drawMode == "drawPolygon") {
				if(this.bDisplay) {
					if(this.pathPoint.length == 1) {
						this.titles[0].div.style.display = "none"
					} else {
						if(this.pathPoint.length != 0 && this.pathPoint.length > 1) {
							this.titles[0].div.style.display = "none";
							this.titles[1].div.style.display = "none"
						}
					}
				}
				var pPoint = this.vmlDraw.points.pop();
				this.vmlDraw.points.push(pMosusePoint);
				this.pathPoint.push(pMosusePoint);
				this.vmlDraw.points.push(pPoint);
				this.vmlDraw.setPoints(this.vmlDraw.points);
				this.vmlDraw.redraw();
				if(this.outputPanel && typeof this.outputPanel.value != "undefined") {
					if(this.pathPoint.length == 1) {
						this.outputPanel.value = this.pathPoint.toString() + "," + this.pathPoint.toString() + "," + this.pathPoint.toString()
					} else {
						this.outputPanel.value = this.pathPoint.toString() + "," + this.pathPoint[0].toString()
					}
				}
			}
		}
	} else {
		if(event.button == 2) {
			this.bEndDraw = true;
			if(this.drawMode == "drawPolyline" || this.drawMode == "drawPolygon") {
				if(this.bDisplay) {
					if(this.drawMode == "drawPolyline") {
						this.removeOverlay(this.title)
					} else {
						if(this.drawMode == "drawPolygon") {
							this.removeOverlay(this.titles[0]);
							this.removeOverlay(this.titles[1])
						}
					}
				}
				var strPath = "";
				if(this.outputPanel && typeof this.outputPanel.value != "undefined") {
					strPath = this.outputPanel.value
				}
				this.changeDragMode("pan");
				if(_callback != null && _callback != "") {
					_callback(strPath)
				}
				if(this.vmlDashline != null) {
					this.removeOverlay(this.vmlDashline);
					this.vmlDashline = null
				}
			}
		}
	}
};
MainFrame.prototype.drawMouseUp = function(b) {
	alert("up")
};
g_LineColor = "#157CC4";
g_FillColor = "#94DBFF";
MainFrame.prototype.drawStart = function(b) {
	this.startPointLng = this.mouseLng;
	this.startPointLat = this.mouseLat;
	this.bDrawEnd = false;
	this.startPointX = this.mouseX;
	this.startPointY = this.mouseY;
	var iLineWidth = 1;
	var dOpacity = 0.5;
	if(this.vmlDraw && this.vmlDraw != null) {
		this.removeOverlay(this.vmlDraw);
		this.vmlDraw = null
	}
	var pObject = null;
	var strPoint = "";
	strPoint = this.startPointLng + "," + this.startPointLat;
	if(this.drawMode == "drawRect") {
		pObject = Rectangle;
		strPoint += "," + strPoint
	} else {
		if(this.drawMode == "drawCircle") {
			pObject = Circle;
			strPoint = strPoint + ",0"
		} else {
			if(this.drawMode == "drawPolyline" || this.drawMode == "measure") {
				if(this.bDisplay) {
					var pPoint = new Point(this.startPointLng, this.startPointLat);
					this.title = new Title("");
					this.title.setPoint(pPoint);
					this.addOverlay(this.title)
				}
				iLineWidth = 4;
				if(this.buttonTip != null && this.buttonTip.style.display != "") {
					this.buttonTip.style.display = ""
				}
				pObject = Polyline;
				strPoint += "," + strPoint
			} else {
				if(this.drawMode == "drawPolygon") {
					if(this.bDisplay) {
						if(typeof this.titles == "undefined") {
							this.titles = new Array()
						}
						var pPoint = new Point(this.startPointLng, this.startPointLat);
						this.titles[0] = new Title("0");
						this.titles[0].setPoint(pPoint);
						this.titles[0].div.style.display = "none";
						this.addOverlay(this.titles[0]);
						this.titles[1] = new Title("1");
						this.titles[1].setPoint(pPoint);
						this.titles[1].div.style.display = "none";
						this.addOverlay(this.titles[1])
					}
					iLineWidth = 4;
					if(this.buttonTip != null && this.buttonTip.style.display != "") {
						this.buttonTip.style.display = ""
					}
					pObject = Polygon;
					strPoint += "," + strPoint + "," + strPoint
				} else {
					if(this.drawMode == "drawPoint") {}
				}
			}
		}
	}
	if(pObject === Polyline) {
		this.vmlDraw = new pObject(strPoint, g_LineColor, iLineWidth, dOpacity)
	} else {
		this.vmlDraw = new pObject(strPoint, g_LineColor, iLineWidth, dOpacity, g_FillColor)
	}
	this.addOverlay(this.vmlDraw)
};
MainFrame.prototype.drawMove = function(b) {
	if(this.bDrawEnd) {
		return
	}
	if(!this.vmlDraw) {
		return
	}
	if(this.drawMode == "drawRect") {
		this.vmlDraw.points[1].x = this.mouseLng;
		this.vmlDraw.points[1].y = this.mouseLat
	} else {
		if(this.drawMode == "drawCircle") {
			this.mouseLng + "," + this.mouseLat;
			var dLen = (this.mouseLng - this.startPointLng) * (this.mouseLng - this.startPointLng) + (this.mouseLat - this.startPointLat) * (this.mouseLat - this.startPointLat);
			this.vmlDraw.points[2] = Math.sqrt(dLen)
		} else {
			if(this.drawMode == "drawPolyline") {
				if(this.bDisplay) {
					var pPoint = new Point(this.mouseLng, this.mouseLat);
					this.vmlDraw.points.push(pPoint);
					var len = this.vmlDraw.getLength().toString() + "米";
					var str = "总长：";
					this.title.setName(str + len);
					this.title.setPoint(pPoint);
					this.vmlDraw.points.pop()
				}
				var strPoint = this.vmlDraw.points[this.vmlDraw.points.length - 1].toString() + "," + this.mouseLng + "," + this.mouseLat;
				if(typeof this.vmlDashline == "undefined" || this.vmlDashline == null) {
					var pLine = new Polyline(strPoint, "#ff0000", 5, 0.7, 0);
					pLine.setColor(g_LineColor);
					pLine.setDashStyle("shortdot");
					this.addOverlay(pLine);
					this.vmlDashline = pLine
				} else {
					this.vmlDashline.points.clear();
					var tempPoints = [this.vmlDraw.points[this.vmlDraw.points.length - 1], new Point(this.mouseLng, this.mouseLat)];
					this.vmlDashline.setPoints(tempPoints);
					this.vmlDashline.redraw()
				}
			} else {
				if(this.drawMode == "drawPolygon") {
					if(this.bDisplay) {
						var pPoint = new Point(this.mouseLng, this.mouseLat);
						if(this.pathPoint.length == 1) {
							var len = GetDistanceInLL(this.pathPoint[0], pPoint).toString() + "米";
							this.titles[0].setName(len);
							var midx = (this.mouseLng + this.pathPoint[0].x) / 2;
							var midy = (this.mouseLat + this.pathPoint[0].y) / 2;
							var midPoint = new Point(midx, midy);
							this.titles[0].setPoint(midPoint);
							this.titles[0].div.style.display = "block"
						} else {
							if(this.pathPoint.length != 0 && this.pathPoint.length > 1) {
								var pathLength = this.pathPoint.length;
								var len1 = GetDistanceInLL(this.pathPoint[pathLength - 1], pPoint).toString() + "米";
								this.titles[1].setName(len1);
								var midx = (this.mouseLng + this.pathPoint[pathLength - 1].x) / 2;
								var midy = (this.mouseLat + this.pathPoint[pathLength - 1].y) / 2;
								var midPoint = new Point(midx, midy);
								this.titles[1].setPoint(midPoint);
								this.titles[1].div.style.display = "block"
							}
						}
					}
					var strPoint = this.vmlDraw.points[0].toString() + "," + this.mouseLng + "," + this.mouseLat + "," + this.vmlDraw.points[this.vmlDraw.points.length - 2].toString() + "," + this.vmlDraw.points[0].toString();
					if(typeof this.vmlDashline == "undefined" || this.vmlDashline == null) {
						var pLine = new Polygon(strPoint, "#ff0000", 5, 0.7, 0);
						pLine.setColor("blue");
						pLine.setOpacity(0.5);
						pLine.setColor(g_LineColor);
						pLine.setFillColor(g_FillColor);
						pLine.setDashStyle("shortdot");
						this.addOverlay(pLine);
						this.vmlDashline = pLine
					} else {
						this.vmlDashline.points.clear();
						this.vmlDashline.points.push(this.vmlDraw.points[0]);
						this.vmlDashline.points.push(new Point(this.mouseLng, this.mouseLat));
						this.vmlDashline.points.push(this.vmlDraw.points[this.vmlDraw.points.length - 2]);
						this.vmlDashline.points.push(this.vmlDraw.points[0]);
						this.vmlDashline.setPoints(this.vmlDashline.points);
						this.vmlDashline.redraw()
					}
				}
			}
		}
	}
	this.vmlDraw.setPoints(this.vmlDraw.points);
	this.vmlDraw.redraw()
};
MainFrame.prototype.drawEnd = function(b) {
	if(this.outputPanel) {
		if(this.drawMode == "drawRect") {
			var dMinX = Math.min(this.startPointLng, this.mouseLng);
			var dMaxX = Math.max(this.startPointLng, this.mouseLng);
			var dMinY = Math.min(this.startPointLat, this.mouseLat);
			var dMaxY = Math.max(this.startPointLat, this.mouseLat);
			var strPoints = dMinX + "," + dMinY + "," + dMaxX + "," + dMaxY;
			if(typeof this.outputPanel.value != "undefined") {
				this.outputPanel.value = strPoints
			}
		} else {
			if(this.drawMode == "drawCircle") {
				var dRadius = Math.sqrt((this.startPointLng - this.mouseLng) * (this.startPointLng - this.mouseLng) + (this.startPointLat - this.mouseLat) * (this.startPointLat - this.mouseLat));
				var strPoints = this.startPointLng + "," + this.startPointLat + "," + dRadius;
				if(typeof this.outputPanel.value != "undefined") {
					this.outputPanel.value = strPoints
				}
			}
		}
	}
	this.bDrawEnd = true;
	if((this.drawMode == "drawRect" || this.drawMode == "drawCircle")) {
		if(_callback) {
			_callback(this.outputPanel.value)
		}
		if(this.bIsPan) {
			this.changeDragMode("pan")
		}
	}
};
MainFrame.prototype.onDragEnd = function(b) {
	if(this.bIsOutOfBorder() == true) {
		this.centerAtLatLng(this.saveStartPoint)
	}
	if(this.saveStartPoint.equals(this.getCenterLatLng())) {
		return
	}
	this.onStateChanged("onDragEnd");
	if(this._slip) {
		var dx = (EzEvent.screenPoint.x - this._start_x) * this._coefficient;
		var dy = (this._start_y - EzEvent.screenPoint.y) * this._coefficient;
		this.slipPan(dx, dy)
	}
	EzEvent.ezEventListener.source = this;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_PANEND;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
};
MainFrame.prototype.onDoubleClick = function(b) {
	EzEvent.ezEventListener.source = this;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_DBLCLICK;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent);
	if(this.disableDragging) {
		return
	}
	var j = this.getRelativeClickPoint(b, this.container);
	var Oc = Math.floor(this.viewSize.width / 2) - j.x;
	var sc = -(Math.floor(this.viewSize.height / 2) - j.y);
	this.pan(Oc, sc);
	this.onDrag()
};
MainFrame.prototype.onClick = function(b) {
	if(_browserType != "Firefox") {
		document.focus()
	}
	EzEvent.ezEventListener.source = this;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_CLICK;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
};
MainFrame.prototype.getRelativeClickPoint = function(b, Se, e) {
	if(!e) {
		e = new Point()
	}
	if(typeof b.offsetX != "undefined") {
		var ra = b.target || b.srcElement;
		var Sf = Tg(ra, Se);
		e.x = b.offsetX + Sf.x;
		e.y = b.offsetY + Sf.y
	} else {
		if(typeof b.pageX != "undefined") {
			var Ad = ObjectOffset(Se);
			e.x = b.pageX - Ad.x;
			e.y = b.pageY - Ad.y
		} else {
			EzLog.incompatible("dblclick")
		}
	}
	return e
};
MainFrame.prototype.sortImagesFromCenter = function(a) {
	var b = [];
	for(var c = 0; c < a.length; c++) {
		for(var d = 0; d < a[c].length; d++) {
			var e = a[c][d];
			e.coordX = c;
			e.coordY = d;
			var f = Math.min(c, a.length - c - 1);
			var g = Math.min(d, a[c].length - d - 1);
			if(f == 0 || g == 0) {
				e.priority = 0
			} else {
				e.priority = f + g
			}
			b.push(e)
		}
	}
	b.sort(MainFrame.sortByPriority);
	return b
};
MainFrame.prototype.reconfigureImage = function(a, vLyr) {
	this.configureImage2(a, a.coordX, a.coordY, vLyr)
};
MainFrame.prototype.reconfigureImage3 = function(a, vLyr) {
	this.configureImage3(a, a.coordX, a.coordY, vLyr)
};
MainFrame.prototype.reconfigureAllImages = function() {
	var uLyrs = this.baseGroupLayer.getLayers();
	for(var i = 0; i < this.groupTileImages.length; i++) {
		if(this.groupTileImages[i].length == 0) {
			return
		}
		var a = this.sortImagesFromCenter(this.groupTileImages[i]);
		if(uLyrs[i] instanceof EzServerClient.Layer.HotSpotTileLayer) {
			for(var d = 0; d < a.length; d++) {
				if(d < a.length) {
					this.reconfigureImage3(a[d], uLyrs[i])
				}
			}
		} else {
			for(var d = 0; d < a.length; d++) {
				if(d < a.length) {
					this.reconfigureImage(a[d], uLyrs[i])
				}
			}
		}
	}
};
MainFrame.prototype.pan = function(Da, Ha) {
	this.bIsPaning = true;
	if(!this.topLeftTile) {
		return
	}
	var ci = Math.sqrt(Da * Da + Ha * Ha);
	var di = Math.max(10, Math.floor(ci / 20));
	this.panSiner = new nc(di);
	this.panSiner.reset();
	this.panDistance.width = Da;
	this.panDistance.height = Ha;
	this.panStart = new Point(this.dragObject.left, this.dragObject.top);
	this.doPan();
	this.bIsPaning = false
};
MainFrame.prototype.doPan = function() {
	var lb = this.panSiner.next();
	if(this.bIsOutOfBorder()) {
		this.centerAtLatLng(this.saveStartPoint);
		return
	}
	this.dragObject.moveTo(this.panStart.x + this.panDistance.width * lb, this.panStart.y - this.panDistance.height * lb);
	this.onMove();
	if(this.panSiner.more()) {
		this.panTimeout = this.setTimeout("this.doPan()", 10);
		this.rotateTiles()
	} else {
		this.panTimeout = null;
		this.onStateChanged("doPan");
		if(this.hotspotDiv) {
			if(this.hotspotDiv.style.left != this.groupTileImages[0][0][0].style.left || this.hotspotDiv.style.top != this.groupTileImages[0][0][0].style.top) {
				this.hotspotDiv.style.left = this.groupTileImages[0][0][0].style.left;
				this.hotspotDiv.style.top = this.groupTileImages[0][0][0].style.top;
				var l = document.getElementById("hotspotLyr");
				for(var i = 0; i < l.childNodes.length; i++) {
					var n = l.childNodes[i];
					for(var j = 0; j < n.childNodes.length; j++) {
						__EzRefreshAreaHandler(n.childNodes[j], this, this.groupTileImages[0][0][0].offsetLeft, this.groupTileImages[0][0][0].offsetTop)
					}
				}
				if(__EzPoly) {
					__hide()
				}
			}
		}
	}
};
MainFrame.prototype.slipPan = function(Da, Ha) {
	this.bIsPaning = true;
	if(!this.topLeftTile) {
		return
	}
	var ci = Math.sqrt(Da * Da + Ha * Ha);
	var di = Math.max(10, Math.floor(ci / 20));
	this.panSiner1 = new nc1(di);
	this.panSiner1.reset();
	this.panDistance.width = Da;
	this.panDistance.height = Ha;
	this.panStart = new Point(this.dragObject.left, this.dragObject.top);
	this.doPan1()
};
MainFrame.prototype.doPan1 = function() {
	var lb = this.panSiner1.next();
	if(this.bIsOutOfBorder()) {
		this.centerAtLatLng(this.saveStartPoint);
		return
	}
	this.dragObject.moveTo(this.panStart.x + this.panDistance.width * lb, this.panStart.y - this.panDistance.height * lb);
	this.onMove();
	if(this.panSiner1.more()) {
		this.panTimeout = this.setTimeout("this.doPan1()", 10);
		this.rotateTiles()
	} else {
		this.panTimeout = null;
		this.onStateChanged("doPan1");
		this.bIsPaning = false;
		if(this.hotspotDiv) {
			if(this.hotspotDiv.style.left != this.groupTileImages[0][0][0].style.left || this.hotspotDiv.style.top != this.groupTileImages[0][0][0].style.top) {
				this.hotspotDiv.style.left = this.groupTileImages[0][0][0].style.left;
				this.hotspotDiv.style.top = this.groupTileImages[0][0][0].style.top;
				var l = document.getElementById("hotspotLyr");
				for(var i = 0; i < l.childNodes.length; i++) {
					var n = l.childNodes[i];
					for(var j = 0; j < n.childNodes.length; j++) {
						__EzRefreshAreaHandler(n.childNodes[j], this, this.groupTileImages[0][0][0].offsetLeft, this.groupTileImages[0][0][0].offsetTop)
					}
				}
				if(__EzPoly) {
					__hide()
				}
			}
		}
	}
};
MainFrame.prototype.bIsOutOfBorder = function(inewLevel) {
	var bIsOut = false;
	if(typeof _BorderArray == "undefined" || typeof MapBorder == "undefined") {
		return bIsOut
	}
	if(typeof this.centerLatLng == "undefined" || this.centerLatLng == null) {
		return bIsOut
	}
	var x = this.centerLatLng.x;
	var y = this.centerLatLng.y;
	var iLevel = null;
	if(typeof inewLevel != "undefined") {
		iLevel = inewLevel
	} else {
		iLevel = this.realZoomLevel
	}
	var pBorder = _BorderArray[iLevel];
	if(!pBorder) {
		return bIsOut
	}
	if(x < pBorder.minx || x > pBorder.maxx || y < pBorder.miny || y > pBorder.maxy) {
		alert("对不起,超出视野范围!");
		bIsOut = true
	} else {
		this.saveStartPoint = this.getCenterLatLng()
	}
	return bIsOut
};
MainFrame.prototype.getMinLevelBorder = function(pPoint) {
	return this.realZoomLevel
};
MainFrame.prototype.cancelPan = function() {
	if(this.panTimeout) {
		clearTimeout(this.panTimeout)
	}
};
MainFrame.prototype.recenterOrPanToLatLng = function(j) {
	if(!this.topLeftTile) {
		return
	}
	if(this.centerLatLng) {
		this.centerLatLng.x = j.x;
		this.centerLatLng.y = j.y
	} else {
		this.centerLatLng = new Point(j.x, j.y)
	}
	this.lastLatLng = this.centerLatLng;
	var j = this.baseLayer.convertMap2Bitmap(this.centerLatLng.x, this.centerLatLng.y, this.realZoomLevel);
	this.recenterOrPanToBitmap(j)
};
MainFrame.prototype.recenterOrPanToBitmap = function(j) {
	if(!this.topLeftTile) {
		return
	}
	var Oc = this.centerBitmap.x - j.x;
	var sc = this.centerBitmap.y - j.y;
	if(Oc == 0 && sc == 0) {
		return
	}
	if(Math.abs(Oc) < this.viewSize.width && Math.abs(sc) < this.viewSize.height) {
		this.pan(Oc, sc);
		return
	}
	this.centerAtBitmap(j)
};
MainFrame.prototype.addStateListener = function(Fh) {
	if(!this.stateListeners) {
		this.stateListeners = new Array()
	}
	this.stateListeners.push(Fh)
};
MainFrame.prototype.getZoomLevel = function() {
	if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
		return this.ascendZoomLevel
	} else {
		return this.realZoomLevel
	}
};
MainFrame.prototype.centerAndZoom = function(pPoint, iLevel) {
	if(iLevel > EzServerClient.GlobeParams.MapMaxLevel) {
		return
	}
	var diaplayLevel = iLevel;
	if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
		iLevel = ((EzServerClient.GlobeParams.MapMaxLevel > this.baseLayer.maxZoomLevel) ? this.baseLayer.maxZoomLevel : EzServerClient.GlobeParams.MapMaxLevel) - diaplayLevel
	}
	var zoomLevelPrevious = this.getZoomLevel();
	var zoomLevel = zoomLevelPrevious;
	var curExtent = this.getBoundsLatLng();
	EzEvent.zoomLevel = zoomLevelPrevious;
	EzEvent.extent = curExtent;
	EzEvent.ezEventListener.source = this;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_ZOOMSTART;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent);
	var Qe = false;
	if(iLevel != this.realZoomLevel) {
		var ge = this.realZoomLevel;
		this.realZoomLevel = iLevel;
		this.mouseZoomLevel = this.realZoomLevel;
		this.ascendZoomLevel = diaplayLevel;
		this.zoomLevel = diaplayLevel;
		Qe = true
	}
	this.centerAtLatLng(pPoint);
	if(Qe && this.onzoom) {
		this.onzoom(ge, this.realZoomLevel);
		curExtent = this.getBoundsLatLng();
		zoomLevel = this.getZoomLevel();
		EzEvent.zoomLevelPrevious = zoomLevelPrevious;
		EzEvent.zoomLevel = zoomLevel;
		EzEvent.extent = curExtent;
		EzEvent.ezEventListener.source = this;
		EzEvent.ezEventListener.eventType = EzEvent.MAP_ZOOMCHANGE;
		EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
	}
	EzEvent.zoomLevel = zoomLevel;
	EzEvent.extent = curExtent;
	EzEvent.ezEventListener.source = this;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_ZOOMEND;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
};
MainFrame.prototype.centerAtMBR = function(dInMinX, dInMinY, dInMaxX, dInMaxY) {
	for(var iIndex = 0; iIndex < arguments.length; iIndex++) {
		if(typeof arguments[iIndex] == "string") {
			arguments[iIndex] = parseFloat(arguments[iIndex])
		}
	}
	if(!dInMinX || !dInMaxX || !dInMinY || !dInMaxY) {
		return
	}
	var dMinX = Math.min(dInMinX, dInMaxX);
	var dMaxX = Math.max(dInMinX, dInMaxX);
	var dMinY = Math.min(dInMinY, dInMaxY);
	var dMaxY = Math.max(dInMinY, dInMaxY);
	var iNewZoomLevel;
	var pPoint = new Point();
	if(dMinX == dMaxX && dMinY == dMaxY) {
		pPoint.x = dMaxX;
		pPoint.y = dMaxY;
		this.recenterOrPanToLatLng(pPoint);
		return
	}
	pPoint.x = (dMaxX + dMinX) / 2;
	pPoint.y = (dMaxY + dMinY) / 2;
	iNewZoomLevel = this.getLevelOfMBR(dInMinX, dInMinY, dInMaxX, dInMaxY);
	if(iNewZoomLevel != this.getZoomLevel()) {
		this.centerAndZoom(pPoint, iNewZoomLevel)
	} else {
		EzEvent.zoomLevel = iNewZoomLevel;
		EzEvent.extent = this.getBoundsLatLng();
		EzEvent.ezEventListener.source = this;
		EzEvent.ezEventListener.eventType = EzEvent.MAP_ZOOMSTART;
		EzEvent.trigger(EzEvent.ezEventListener, EzEvent);
		this.recenterOrPanToLatLng(pPoint);
		EzEvent.zoomLevel = iNewZoomLevel;
		EzEvent.extent = this.getBoundsLatLng();
		EzEvent.ezEventListener.source = this;
		EzEvent.ezEventListener.eventType = EzEvent.MAP_ZOOMEND;
		EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
	}
	delete pPoint
};
MainFrame.prototype.getLevelOfMBR = function(dInMinX, dInMinY, dInMaxX, dInMaxY) {
	for(var iIndex = 0; iIndex < arguments.length; iIndex++) {
		if(typeof arguments[iIndex] == "string") {
			arguments[iIndex] = parseFloat(arguments[iIndex])
		}
	}
	if(!dInMinX || !dInMaxX || !dInMinY || !dInMaxY) {
		return
	}
	var dMinX = Math.min(dInMinX, dInMaxX);
	var dMaxX = Math.max(dInMinX, dInMaxX);
	var dMinY = Math.min(dInMinY, dInMaxY);
	var dMaxY = Math.max(dInMinY, dInMaxY);
	if(this.bIsMercatorMap) {
		var min = this.meters2latlon(new Point(dMinX, dMinY));
		var max = this.meters2latlon(new Point(dMaxX, dMaxY));
		dMinX = min.x;
		dMinY = min.y;
		dMaxX = max.x;
		dMaxY = max.y
	}
	var xSpan = (dMaxX - dMinX) / ((_m_MapBottomSpan / 3600) * (this.tableSize.width - 2));
	var ySpan = (dMaxY - dMinY) / ((_m_MapBottomSpan / 3600) * (this.tableSize.height - 2));
	var pSpan = Math.max(xSpan, ySpan);
	var iNewZoomLevel = Math.floor(Math.log(pSpan) / Math.log(2));
	switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
		case 0:
			break;
		case 1:
			iNewZoomLevel = EzServerClient.GlobeParams.MapMaxLevel - iNewZoomLevel;
			break;
		case 2:
			iNewZoomLevel = 18 - iNewZoomLevel - 2 * EzServerClient.GlobeParams.ZoomOffset;
			break;
		case 3:
			iNewZoomLevel = EzServerClient.GlobeParams.MapMaxLevel - 18 + iNewZoomLevel + 2 * EzServerClient.GlobeParams.ZoomOffset;
			break
	}
	if(dMinX == dMaxX || dMaxX == dMaxY) {
		iNewZoomLevel = this.realZoomLevel
	} else {
		if(iNewZoomLevel < 0) {
			iNewZoomLevel = 0
		}
	}
	if(iNewZoomLevel > this.baseLayer.maxZoomLevel) {
		iNewZoomLevel = this.baseLayer.maxZoomLevel
	}
	return iNewZoomLevel
};
MainFrame.prototype.latlon2Meters = function(point) {
	var google = new Google();
	point = google.getEncryPoint(point.x, point.y);
	var mPoint = google.latlonToMeter(point.x, point.y);
	return mPoint
};
MainFrame.prototype.meters2latlon = function(point) {
	var google = new Google();
	var pPoint = google.meterTolatlon(point.x, point.y);
	pPoint = google.getDecryptPoint(pPoint.x, pPoint.y);
	return pPoint
};
MainFrame.prototype.centerAtLatLng = function(j) {
	this.centerLatLng = new Point(j.x, j.y);
	this.lastLatLng = this.centerLatLng;
	var j = this.baseLayer.convertMap2Bitmap(this.centerLatLng.x, this.centerLatLng.y, this.realZoomLevel);
	if(this.midPointDiv) {
		RemoveChildren(this.midPointDiv);
		this.midPointDiv = null
	}
	this.centerAtBitmap(j)
};
MainFrame.prototype.centerAtBitmap = function(j) {
	this.centerBitmap.x = j.x;
	this.centerBitmap.y = j.y;
	var left = j.x - Math.floor(this.viewSize.width / 2) - this.tilePaddingOffset.width;
	var top = j.y + Math.floor(this.viewSize.height / 2) + this.tilePaddingOffset.height;
	var hc = Math.ceil(left / this.baseLayer.tileInfo.width);
	var yc = Math.ceil(top / this.baseLayer.tileInfo.height);
	var iOffsetx = hc * this.baseLayer.tileInfo.width - left;
	var iOffsety = yc * this.baseLayer.tileInfo.height - top;
	if(iOffsetx < -this.baseLayer.tileInfo.width) {
		hc++;
		iOffsetx += this.baseLayer.tileInfo.width
	} else {
		if(iOffsetx > 0) {
			hc--;
			iOffsetx -= this.baseLayer.tileInfo.width
		}
	}
	iOffsety = -iOffsety;
	if(iOffsety < -this.baseLayer.tileInfo.height) {
		yc--;
		iOffsety += this.baseLayer.tileInfo.height
	} else {
		if(iOffsety > 0) {
			yc++;
			iOffsety -= this.baseLayer.tileInfo.height
		}
	}
	if(!this.topLeftTile) {
		this.topLeftTile = new Point(hc, yc);
		if(!this.stateMonitor) {
			this.stateMonitor = new MapStatusControl(this)
		}
	} else {
		this.topLeftTile.x = hc;
		this.topLeftTile.y = yc
	}
	if(!this.stateMonitor) {
		this.stateMonitor = new MapStatusControl(this)
	}
	this.currentPanOffset.width = 0;
	this.currentPanOffset.height = 0;
	this.reconfigureAllImages();
	this.repositionOverlays();
	this.dragObject.moveTo(iOffsetx, iOffsety);
	this.onStateChanged("centerAtBitmap");
	this.onLevelChanged()
};
MainFrame.prototype.setCenter = function(pLonLat) {
	if(!pLonLat) {
		pLonLat = this.getCenterLatLng()
	}
	var pMBR = this.getBoundsLatLng();
	var iLeft = (pLonLat.x - pMBR.minX) / pMBR.getSpanX() * this.viewSize.width;
	var iTop = (pLonLat.y - pMBR.minY) / pMBR.getSpanY() * this.viewSize.height;
	this.dragObject.moveTo(iLeft, iTop);
	this.rotateTiles()
};
MainFrame.prototype.getDivCoord = function(x, y) {
	var pBitMap = this.baseLayer.convertMap2Bitmap(x, y, this.realZoomLevel, we);
	var pDivPoint = this.getDivCoordinate(pBitMap.x, pBitMap.y, we);
	delete pBitMap;
	return pDivPoint
};
MainFrame.prototype.getDivCoord2 = function(x, y, e) {
	if(!e) {
		var e = new Point(0, 0)
	}
	var pBitMap = this.baseLayer.convertMap2Bitmap(x, y, this.realZoomLevel, e);
	var iLeftDivBit = (this.topLeftTile.x - this.currentPanOffset.width) * this.baseLayer.tileInfo.width + this.tilePaddingOffset.width;
	e.x = pBitMap.x - iLeftDivBit;
	var iTopDivBit = (this.topLeftTile.y + this.currentPanOffset.height) * this.baseLayer.tileInfo.height - this.tilePaddingOffset.height;
	e.y = iTopDivBit - pBitMap.y;
	return e
};
MainFrame.prototype.getDivCoordinate = function(x, y, e) {
	if(!e) {
		e = new Point(0, 0)
	}
	var pDivOffset = this.getCurrentOffset(qg);
	var iLeftDivBit = this.topLeftTile.x * this.baseLayer.tileInfo.width + this.tilePaddingOffset.width - pDivOffset.width;
	var iX = x - iLeftDivBit;
	var iTopDivBit = this.topLeftTile.y * this.baseLayer.tileInfo.height - this.tilePaddingOffset.height + pDivOffset.height;
	var iY = iTopDivBit - y;
	e.x = iX;
	e.y = iY;
	delete pDivOffset;
	return e
};
MainFrame.prototype.getCenterLatLng = function(e) {
	if(!e) {
		e = new Point(0, 0)
	}
	if(this.centerLatLng) {
		e.x = this.centerLatLng.x;
		e.y = this.centerLatLng.y;
		return e
	}
	if(this.lastLatLng) {
		var ga = this.baseLayer.convertMap2Bitmap(this.lastLatLng.x, this.lastLatLng.y, this.realZoomLevel);
		if(ga.equals(this.centerBitmap)) {
			e.x = this.lastLatLng.x;
			e.y = this.lastLatLng.y;
			return e
		}
	}
	var x = this.mapCenter.x - this.baseLayer.tileInfo.origin[0];
	var y = this.mapCenter.y - this.baseLayer.tileInfo.origin[1];
	var p = this.baseLayer.convertPosByFlatMatrix(x, y);
	e.x = Math.floor(p.x / this.baseLayer.tileInfo.levelDetails[this.realZoomLevel].resolution);
	e.y = Math.floor(p.y / this.baseLayer.tileInfo.levelDetails[this.realZoomLevel].resolution);
	this.centerBitmap = new Point(e.x, e.y);
	var j = this.baseLayer.convertBitmap2Map(this.centerBitmap.x, this.centerBitmap.y, this.realZoomLevel);
	e.x = j.x;
	e.y = j.y;
	return e
};
MainFrame.prototype.onMove = function() {
	this.bIsMoving = true;
	this.centerLatLng = null;
	var pDivOffset = this.getCurrentOffset(qg);
	var x = this.topLeftTile.x * this.baseLayer.tileInfo.width + Math.floor(this.viewSize.width / 2) + this.tilePaddingOffset.width - pDivOffset.width;
	var y = (this.topLeftTile.y) * this.baseLayer.tileInfo.height - Math.floor(this.viewSize.height / 2) - this.tilePaddingOffset.height + pDivOffset.height;
	this.centerBitmap.x = x;
	this.centerBitmap.y = y;
	this.centerLatLng = this.baseLayer.convertBitmap2Map(this.centerBitmap.x, this.centerBitmap.y, this.realZoomLevel);
	if(this.onpan) {
		this.onpan(x, y)
	}
	this.bIsMoving = false
};
MainFrame.prototype.debug = function(e) {
	if(true || !_Debug) {
		return
	}
	getEleByID("LonLatSpan").value = "LonLatSpan:" + this.span;
	getEleByID("EzServerClient.GlobeParams.TileAnchorPoint").value = "EzServerClient.GlobeParams.TileAnchorPoint:" + EzServerClient.GlobeParams.TileAnchorPoint[0] + "," + EzServerClient.GlobeParams.TileAnchorPoint[1];
	getEleByID("TileLonLat").value = "topLeftTile(x,y):" + this.topLeftTile.x + "," + this.topLeftTile.y;
	getEleByID("tilePaddingOffset").value = "tilePaddingOffset(width,height):" + this.tilePaddingOffset.width + "," + this.tilePaddingOffset.height;
	getEleByID("CurPanOffset").value = "currentPanOffset(width,height):" + this.currentPanOffset.width + "," + this.currentPanOffset.height;
	var pDivOffset = this.getCurrentOffset(qg);
	getEleByID("divOffset").value = "divOffset(width,height):" + pDivOffset.width + "," + pDivOffset.height;
	var pSpan = this.getSpanLatLng();
	getEleByID("LonLatSpan").value = "LonLatSpan(width,height):" + pSpan.width + "," + pSpan.height;
	var pUnitSpan = _PixelsPerDegree[this.realZoomLevel];
	getEleByID("UnitSpan").value = "UnitSpan(width,height):" + pUnitSpan.x + "," + pUnitSpan.y;
	var pBitPoint = this.centerBitmap;
	if(pBitPoint) {
		getEleByID("centerBitmap").value = "centerBitmap:(" + pBitPoint.x + "," + pBitPoint.y + ")"
	}
	var j = this.centerLatLng;
	if(j) {
		getEleByID("LonLatCenter").value = "Center at(Lon,Lat):" + j.x + "," + j.y;
		var fileName = "Col:" + Math.ceil(j.x / (3.515625 / 3600 * Math.pow(2, this.realZoomLevel))) + ",Row:" + Math.ceil(j.y / (3.515625 / 3600 * Math.pow(2, this.realZoomLevel)));
		getEleByID("centerUnit").value = "centerUnit:" + fileName;
		var pBitMap = this.centerBitmap;
		var pDivPoint = this.getDivCoordinate(pBitMap.x, pBitMap.y, we);
		window.status = pDivPoint.x + "," + pDivPoint.y + ":" + this.div.style.left + "," + this.div.style.top;
		this.centerNaiv.style.left = convert2Px(pDivPoint.x - 8);
		this.centerNaiv.style.top = convert2Px(pDivPoint.y - 8);
		this.centerNaiv.title = "left,top:" + pDivPoint.x + "," + pDivPoint.y + "(" + (pDivPoint.y - this.viewSize.height / 2) + "),Bit:" + pBitMap.x + "," + pBitMap.y;
		pBitMap = this.baseLayer.convertMap2Bitmap(116.4612375, 40.249454099999994, this.realZoomLevel);
		pDivPoint = this.getDivCoordinate(pBitMap.x, pBitMap.y, we);
		this.mapBejingCenter.style.left = convert2Px(pDivPoint.x - 8);
		this.mapBejingCenter.style.top = convert2Px(pDivPoint.y - 8)
	}
};
MainFrame.prototype.clearStateChanged = function(caller) {
	this.stateListeners.clear()
};
_curentPoint = null;
_curentLevel = null;
_bIsLocked = false;
MainFrame.prototype.onStateChanged = function(caller) {
	if(!this.topLeftTile) {
		return
	}
	if(!_bIsLocked) {
		_curentPoint = this.getCenterLatLng();
		_curentLevel = this.realZoomLevel
	}
	if(this.stateListeners) {
		for(var a = 0; a < this.stateListeners.length; a++) {
			try {
				this.stateListeners[a](this)
			} catch(b) {}
		}
	}
	this.debug("onStateChanged");
	var pBorder = this.getBoundsLatLng();
	var strBorder = "BOX:[" + pBorder.toString() + "]";
	if(typeof g_user == "undefined") {
		g_user = "unkown user"
	}
	if(typeof g_IP == "undefined") {
		g_IP = document.location.hostname
	}
	if(this.bIsLog) {
		EzLog.write(strBorder, g_user, g_IP)
	}
};
MainFrame.prototype.refreshInfoWindow = function() {
	if(this.infoWindow.isVisible()) {
		this.bIsInScreen = false;
		this.showInfoWindow(this.pWinInfo, true)
	}
	if(typeof(this.infoWindow1) != "undefined" && this.infoWindow1.isVisible()) {
		this.infoWindow1.bIsInScreen = false;
		var point = this.infoWindow1.point;
		if(this.bSwitchMap) {
			if(this.preLayer == "lonlat" && this.currentLayer == "mercator") {
				point = this.latlon2Meters(point)
			}
			if(this.preLayer == "mercator" && this.currentLayer == "lonlat") {
				point = this.meters2latlon(point)
			}
		}
		this.infoWindow1.positionAt(point)
	}
};
MainFrame.prototype.hideInfoWind = function() {
	if(this.infoWindow.isVisible()) {
		this.infoWindow.hide()
	}
};
MainFrame.prototype.showInfoWind = function() {
	if(!this.infoWindow.isVisible()) {
		this.infoWindow.show()
	}
};
MainFrame.prototype.resizePointImg = function() {
	if(typeof this.pointImg == "undefined" || this.pointImg == null || true) {
		return
	}
	var pPoint = this.getDivCoord(this.pointImg.lon, this.pointImg.lat);
	this.pointImg.style.left = convert2Px(pPoint.x - 8);
	this.pointImg.style.top = convert2Px(pPoint.y - 8)
};
MainFrame.prototype.createDrawPoint = function(pParent) {
	if(!pParent) {
		return
	}
	this.pointImg = document.createElement("img");
	this.pointImg.src = _pointImgURL;
	this.pointImg.style.height = convert2Px(16);
	this.pointImg.style.width = convert2Px(16);
	this.pointImg.style.display = "none";
	this.pointImg.style.position = "absolute";
	this.pointImg.style.zIndex = 1001;
	pParent.appendChild(this.pointImg)
};
MainFrame.prototype.showPointImg = function(bIsShow) {
	if(typeof bIsShow == "undefined" || bIsShow == true) {
		this.pointImg.style.display = ""
	} else {
		this.pointImg.style.display = "none"
	}
};
MainFrame.prototype.getPxOfDist = function(len) {
	var pBorder = this.getBoundsLatLng();
	var pPoint1 = new Point(pBorder.minX, pBorder.minY);
	var pPoint2 = new Point(pBorder.maxX, pBorder.minY);
	var dHLen = GetDistanceInLL(pPoint1, pPoint2);
	var iPx = len / dHLen * this.viewSize.width;
	return iPx
};
MainFrame.prototype.refreshMapScale = function() {
	if(!this.scaleTxt) {
		return
	}
	var pBorder = this.getBoundsLatLng();
	var pPoint1 = new Point(pBorder.minX, pBorder.minY);
	var pPoint2 = new Point(pBorder.maxX, pBorder.maxY);
	var pPoint = new Point((pPoint1.x + pPoint2.x) / 2, (pPoint1.y + pPoint2.y) / 2);
	var dHLen = GetDistanceInLL(pPoint1, pPoint2);
	var iLevel = this.realZoomLevel + 2;
	var iWidth = Math.ceil((this.viewSize.width * _m_scale_meter[iLevel]) / dHLen);
	var iTime = 0;
	if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 1) {
		while(iWidth < 40 || iWidth > 100) {
			if(iWidth < 40) {
				iLevel++
			} else {
				iLevel--
			}
			iWidth = Math.ceil((this.viewSize.width * _m_scale_meter[iLevel]) / dHLen);
			if(iTime > 3) {
				break
			}
			iTime++
		}
		this.scaleTxt.style.width = iWidth ? iWidth : 40 + "px";
		this.currentMapScale = "1:" + 96 / EzServerClient.GlobeParams.BrowserDPI.x * EzServerClient.GlobeParams.DisplayScale_dpi96[18 - this.realZoomLevel - EzServerClient.GlobeParams.ZoomOffset];
		var strUnit = _m_scale_meter[iLevel];
		if(strUnit >= 1000) {
			strUnit = Math.floor(strUnit / 100);
			strUnit = strUnit / 10;
			strUnit = strUnit + "公里"
		} else {
			strUnit = strUnit + "米"
		}
		this.scaleRightTxt.innerHTML = strUnit
	} else {
		var index = this.realZoomLevel + EzServerClient.GlobeParams.ZoomOffset;
		if(index >= EzServerClient.GlobeParams.DisplayScale_dpi96.length) {
			var t = index - EzServerClient.GlobeParams.DisplayScale_dpi96.length;
			this.currentMapScale = "1:" + 96 / EzServerClient.GlobeParams.BrowserDPI.x * (EzServerClient.GlobeParams.DisplayScale_dpi96[EzServerClient.GlobeParams.DisplayScale_dpi96.length - 1] / Math.pow(2, t + 1));
			this.scaleTxt.style.width = (parseInt(EzServerClient.GlobeParams.DisplayScale[EzServerClient.GlobeParams.DisplayScale.length - 1][1]) - 4) + "px";
			this.scaleRightTxt.innerHTML = parseFloat(EzServerClient.GlobeParams.DisplayScale[EzServerClient.GlobeParams.DisplayScale.length - 1][0]) / Math.pow(2, t + 1) + "米"
		} else {
			if(index < 0) {
				var t = -index;
				this.currentMapScale = "1:" + 96 / EzServerClient.GlobeParams.BrowserDPI.x * (EzServerClient.GlobeParams.DisplayScale_dpi96[0] * Math.pow(2, t));
				this.scaleTxt.style.width = (parseInt(EzServerClient.GlobeParams.DisplayScale[0][1]) - 4) + "px";
				this.scaleRightTxt.innerHTML = parseFloat(EzServerClient.GlobeParams.DisplayScale[0][0]) * Math.pow(2, t) + "公里"
			} else {
				this.currentMapScale = "1:" + 96 / EzServerClient.GlobeParams.BrowserDPI.x * (EzServerClient.GlobeParams.DisplayScale_dpi96[index]);
				var ss = parseInt(EzServerClient.GlobeParams.DisplayScale[this.realZoomLevel + EzServerClient.GlobeParams.ZoomOffset][1]);
				var cLevel = this.realZoomLevel;
				var cMerter = EzServerClient.GlobeParams.DisplayScale[cLevel + EzServerClient.GlobeParams.ZoomOffset][2];
				var res = this.baseLayer.tileInfo.levelDetails[cLevel].resolution;
				if(this.bIsMercatorMap) {
					cWidth = Math.ceil(cMerter / res) * 1.5
				} else {
					var span = MapsApp.getDegree(pPoint, cMerter);
					cWidth = Math.ceil(span / res)
				}
				this.scaleTxt.style.width = cWidth + "px";
				this.scaleRightTxt.innerHTML = EzServerClient.GlobeParams.DisplayScale[this.realZoomLevel + EzServerClient.GlobeParams.ZoomOffset][0]
			}
		}
	}
};
MainFrame.prototype.getCurrentMapScale = function() {
	var scale = null;
	var cLevel = this.realZoomLevel + EzServerClient.GlobeParams.ZoomOffset;
	var res0 = this.baseLayer.tileInfo.levelDetails[0].resolution;
	var res = this.baseLayer.tileInfo.levelDetails[cLevel].resolution;
	var dpi = 96;
	var R = 6378137;
	if(res0 == 2) {
		dpi = 90;
		scale = (1 - 0.003352810664) * dpi * 2 * Math.PI * R * res / 360 / 0.0254
	} else {
		if(this.baseLayer instanceof EzServerClient.Layer.MercatorTileLayer) {
			scale = dpi * res / 0.0254
		} else {
			scale = dpi * 2 * Math.PI * R * res / 360 / 0.0254
		}
	}
	return 1 + ":" + scale
};
MainFrame.prototype.onLevelChanged = function() {
	this.refreshMapScale();
	this.resizePointImg();
	this.refreshInfoWindow()
};
MainFrame.prototype.onLevelChanged_old = function() {
	this.clearVMLContainer();
	var dScale = _m_MapBottomScale * Math.pow(2, this.realZoomLevel);
	this.scaleTxt.innerHTML = "1:" + dScale;
	var strUnit = 2 * dScale / 100;
	if(strUnit > 10000) {
		strUnit = Math.floor(strUnit / 100);
		strUnit = strUnit / 10;
		strUnit = strUnit + "km"
	} else {
		strUnit = strUnit + "m"
	}
	this.scaleRightTxt.innerHTML = strUnit;
	this.resizePointImg();
	this.refreshInfoWindow()
};
MainFrame.prototype.onResize = function(b) {
	if(this.viewSize.width != this.container.offsetWidth || this.viewSize.height != this.container.offsetHeight) {
		this.viewSize.width = this.container.offsetWidth;
		this.viewSize.height = this.container.offsetHeight;
		this.calculateTileMeasurements();
		if(this.hotspotDiv) {
			this.div.removeChild(this.hotspotDiv);
			this.hotspotDiv = null
		}
		this.loadTileImages();
		this.centerAtBitmap(this.centerBitmap);
		if(this.onresize) {
			this.onresize()
		}
		if(this.mapCenterDiv) {
			this.mapCenterDiv.style.left = convert2Px(this.viewSize.width / 2 - 8);
			this.mapCenterDiv.style.top = convert2Px(this.viewSize.height / 2 - 8)
		}
		var iLeft = this.viewSize.width - 23;
		var iHeight = this.viewSize.height;
		var iTmpBorder1 = parseInt(this.container.style.borderLeftWidth);
		var iTmpBorder2 = parseInt(this.container.style.borderTopWidth);
		if(!isNaN(iTmpBorder1)) {
			this.iBorderWidth = iTmpBorder1
		}
		if(!isNaN(iTmpBorder2)) {
			this.iBorderHeight = iTmpBorder2
		}
	}
	this.debug("onResize")
};
MainFrame.prototype.getCurrentOffset = function(e) {
	e.width = this.dragObject.left + this.currentPanOffset.width * this.baseLayer.tileInfo.width;
	e.height = this.dragObject.top + this.currentPanOffset.height * this.baseLayer.tileInfo.height;
	return e
};
MainFrame.prototype.switchSpecification = function(Na) {
	if(this.spec == Na) {
		return
	}
	var Nd = this.spec;
	var G = this.getCenterLatLng();
	this.setSpecification(Na);
	this.div.style.backgroundColor = this.spec.backgroundColor;
	if(Nd.tileSize != Na.tileSize) {
		this.topLeftTile = null;
		this.initializeMap()
	}
	this.centerAtLatLng(G);
	if(this.onspecificationchange) {
		this.onspecificationchange(Nd, Na)
	}
};
MainFrame.prototype.setSpecification = function(Na) {
	this.spec = Na;
	if(!Na.emptyTilePreload) {
		var Rb = document.createElement("IMG");
		Rb.style.position = "absolute";
		Rb.style.visibility = "hidden";
		Rb.style.top = convert2Px(-200);
		Rb.style.left = convert2Px(-200);
		document.body.appendChild(Rb);
		Na.emptyTilePreload = Rb
	}
	this.spec.emptyTilePreload.src = this.spec.emptyTileURL;
	if(_VectorMapService.length > 2) {
		this.spec.bIsOverlay = true
	}
};
MainFrame.prototype.zoomTo = function(iLevel) {
	if(typeof(EzServerClient.GlobeParams.displayLevel) != "undefined") {
		var indoorMaxLevel = EzServerClient.GlobeParams.displayLevel[1];
		var indoorMinLevel = EzServerClient.GlobeParams.displayLevel[0];
		if(this.bIsOpenIndoorMap) {
			if(iLevel < indoorMinLevel && !this.bIsDeleteIndoorMap) {
				this.tempBordorData = this.indoorBordorData;
				this.tempFloorData = this.levelData;
				this.clearIndoorData();
				this.bIsDeleteIndoorMap = true;
				this.floorControl.style.display = "none"
			}
			if(iLevel >= indoorMinLevel && this.bIsDeleteIndoorMap) {
				for(var i = 0; i < this.tempBordorData.length; i++) {
					this.addOverlay(this.tempBordorData[i])
				}
				for(var i = 0; i < this.tempFloorData.length; i++) {
					this.addOverlay(this.tempFloorData[i])
				}
				this.levelData = this.tempFloorData;
				this.indoorBordorData = this.tempBordorData;
				this.bIsDeleteIndoorMap = false;
				this.floorControl.style.display = "block"
			}
		}
	}
	this.div.style.zoom = 1;
	if(typeof iLevel == "string") {
		iLevel = parseInt(iLevel)
	}
	if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
		var ge = this.ascendZoomLevel
	} else {
		if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
			var ge = this.realZoomLevel
		}
	}
	if(ge == iLevel) {
		return
	}
	if(this.bIsOutOfBorder(iLevel)) {
		this.onzoom();
		return
	}
	if(!this.topLeftTile) {
		return
	}
	if(iLevel >= this.baseLayer.maxZoomLevel + 1) {
		iLevel = this.baseLayer.maxZoomLevel
	} else {
		if(iLevel < 0) {
			iLevel = 0
		}
	}
	if(EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
		if(iLevel <= 0) {
			iLevel = 1
		}
	}
	var pPoint = this.getCenterLatLng();
	this.bIsZooming = true;
	this.centerAndZoom(pPoint, iLevel);
	this.bIsZooming = false;
	this.debug("zoomTo")
};
MainFrame.prototype.zoomAtPoint = function(oPoint, iLevel) {
	this.div.style.zoom = 1;
	if(typeof iLevel == "string") {
		iLevel = parseInt(iLevel)
	}
	var ge;
	if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
		ge = this.ascendZoomLevel
	} else {
		if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
			ge = this.realZoomLevel
		}
	}
	if(ge == iLevel) {
		return
	}
	if(this.bIsOutOfBorder(iLevel)) {
		this.onzoom();
		return
	}
	if(!this.topLeftTile) {
		return
	}
	if(iLevel >= this.baseLayer.maxZoomLevel + 1) {
		iLevel = this.baseLayer.maxZoomLevel
	} else {
		if(iLevel < 0) {
			iLevel = 0
		}
	}
	var pPoint = this.getCenterLatLng();
	var x, y;
	switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
		case 0:
		case 3:
			if(ge > iLevel) {
				x = (oPoint.x + pPoint.x) / 2;
				y = (oPoint.y + pPoint.y) / 2
			} else {
				x = 2 * pPoint.x - oPoint.x;
				y = 2 * pPoint.y - oPoint.y
			}
			break;
		case 1:
		case 2:
			if(ge < iLevel) {
				x = (oPoint.x + pPoint.x) / 2;
				y = (oPoint.y + pPoint.y) / 2
			} else {
				x = 2 * pPoint.x - oPoint.x;
				y = 2 * pPoint.y - oPoint.y
			}
			break
	}
	this.centerLatLng = new Point(x, y);
	this.bIsZooming = true;
	this.centerAndZoom(this.centerLatLng, iLevel);
	this.bIsZooming = false;
	this.refreshVMLGraphics()
};
MainFrame.prototype.toggleTileBorders = function() {
	if(this.groupTileImages) {
		for(var a = 0; a < this.groupTileImages.length; a++) {
			if(this.groupTileImages[a]) {
				for(var P = 0; P < this.groupTileImages[a].length; P++) {
					var f = this.groupTileImages[a][P];
					if(f.hasBorder) {
						f.style.border = "0";
						f.hasBorder = false
					} else {
						f.style.border = "1px solid black";
						f.hasBorder = true
					}
				}
			}
		}
	}
};
MainFrame.prototype.createLocalMarker = function(v) {
	var ia = this.createLocationMarker(v.icon.image, v.icon.iconClass);
	var g = this;
	var pc = v;
	ia.mouseTarget.onmousedown = function(b) {
		return g.onIconMouseDown(pc, b)
	};
	return ia
};
MainFrame.prototype.createLocationMarker = function(gf, r) {
	var ha = divCreator.create(gf, r.width, r.height, 0, 0, 10, false, "noprint");
	var Xb = divCreator.create(Vi, r.width, r.height, 0, 0, 3000, false, "noprint");
	var mb = divCreator.create(r.shadowURL, r.shadowWidth, r.height, 0, 0, 3, false, "noprint");
	var xg = _IEBrowser.type == 2 ? "ff" : "ie";
	var ig = Shaderer.create(gf.replace(/\.png$/, xg + ".gif"), r.width, r.height, 0, 0, 10, false, "noscreen");
	var Kg = r.shadowURL.replace(/[^\/]*$/, "dithshadow.gif");
	var jh = Shaderer.create(Kg, r.shadowWidth, r.height, 0, 0, 3, false, "noscreen");
	var u = null;
	var kc = Xb;
	if(_IEBrowser.type == 2) {
		var xf = "map" + Pe;
		Pe++;
		u = document.createElement("map");
		u.setAttribute("name", xf);
		var E = document.createElement("area");
		E.setAttribute("shape", "poly");
		E.setAttribute("alt", "");
		E.setAttribute("coords", r.imageMapArray.join(","));
		E.setAttribute("href", "PolylineDrawer");
		kc = E;
		u.appendChild(E);
		Xb.setAttribute("usemap", "#" + xf)
	} else {
		setCursor(kc, "pointer")
	}
	var Wc = new Marker(ha, Xb, mb, u, kc);
	Wc.addLayer(ig);
	if(_IEBrowser.type != 2) {
		Wc.addLayer(jh)
	}
	Wc.appendTo(this.div);
	return Wc
};
MainFrame.prototype.clearOverlays = function(bForcedRemove) {
	if(typeof bForcedRemove == "undefined") {
		bForcedRemove = false
	}
	var pOverlays = new Array();
	this.lastPageCenter = this.getCenterLatLng();
	this.lastPageZoom = this.realZoomLevel;
	for(var a = 0; a < this.overlays.length; a++) {
		var pOver = this.overlays[a];
		if(!bForcedRemove && pOver.bDisRemovable) {
			pOverlays.push(pOver)
		} else {
			pOver.removeFromDiv();
			delete pOver
		}
	}
	this.closeInfoWindow();
	this.overlays.clear();
	this.overlays = pOverlays
};
MainFrame.prototype.removeOverlaysOutOfMBR = function(pMBR) {
	var b = [];
	for(var c = 0; c < this.overlays.length; c++) {
		if(!pMBR.containsPoint(this.overlays.point)) {
			a.removeFromDiv()
		} else {
			b.push(this.overlays[c])
		}
	}
	if(this.overlays.length != b.length) {
		this.overlays = b
	}
	if(this.infoWindow.isVisible()) {
		this.closeInfoWindow()
	}
};
MainFrame.prototype.removeOverlaysOfMBR = function(pMBR) {
	var b = [];
	for(var c = 0; c < this.overlays.length; c++) {
		if(pMBR.containsPoint(this.overlays.point)) {
			a.removeFromDiv()
		} else {
			b.push(this.overlays[c])
		}
	}
	if(this.overlays.length != b.length) {
		this.overlays = b
	}
	if(this.infoWindow.isVisible()) {
		this.closeInfoWindow()
	}
};
MainFrame.prototype.removeOverlay = function(a, bForcedRemove) {
	if(!a) {
		return
	}
	if(typeof bForcedRemove == "undefined") {
		bForcedRemove = false
	}
	if(!bForcedRemove && a.bDisRemovable) {
		return
	}
	var b = [];
	for(var c = 0; c < this.overlays.length; c++) {
		if(this.overlays[c] == a) {
			a.removeFromDiv()
		} else {
			b.push(this.overlays[c])
		}
	}
	if(this.overlays.length != b.length) {
		this.overlays = b
	}
};
MainFrame.prototype.addOverlay = function(ta, bDisRemovable) {
	if(!ta) {
		return
	}
	var that = this;
	if(bDisRemovable) {
		ta.bDisRemovable = bDisRemovable
	} else {
		ta.bDisRemovable = false
	}
	this.overlays.push(ta);
	if(ta instanceof iOverLay) {
		ta.createDiv(this)
	} else {
		if(typeof Monitor != "undefined" && ta instanceof Monitor) {
			ta.createDiv(this)
		}
	}
};
MainFrame.prototype.getOverlays = function() {
	return this.overlays
};
MainFrame.prototype.addOverlayOutOfMBR = function(pOverLay, pMBR) {
	if(!pMBR.containsPoint(pOverLay.point)) {
		this.addOverlay(pOverLay)
	}
};
MainFrame.prototype.repositionOverlays = function() {
	for(var a = 0; a < this.overlays.length; a++) {
		var pc = this.overlays[a];
		if(pc instanceof iOverLay) {
			pc.redraw()
		} else {
			if(typeof Monitor != "undefined" && pc instanceof Monitor) {
				pc.redraw()
			}
		}
	}
};
MainFrame.prototype.blowupOverlay = function(pOveryLay) {
	for(var a = 0; a < this.overlays.length; a++) {
		var pc = this.overlays[a];
		if(pc instanceof Title || pc instanceof Marker || pc instanceof Polyline || pc instanceof Polygon || (typeof Monitor != "undefined" && pc instanceof Monitor)) {
			pc.setZIndex(pc.iZIndex)
		}
	}
	pOveryLay.setZIndex(pOveryLay.iZIndex + 1)
};
MainFrame.prototype.asyncLoadVPageFromURL = function(ca, Cd) {
	var dc = xa.create("vpage");
	try {
		var ya = XMLHttp.create();
		ya.open("GET", ca, true);
		var g = this;
		ya.onreadystatechange = function() {
			if(ya.readyState == 4) {
				if(dc.isValid()) {
					try {
						alert("XML1:" + ya.responseText);
						g.loadVPageStr(ya.responseText)
					} catch(b) {
						if(Cd) {
							Cd(b)
						}
					}
				}
			}
		};
		ya.send(null)
	} catch(b) {
		if(Cd) {
			Cd(b)
		}
	}
};
MainFrame.prototype.registerKeyHandlers = function(H) {
	BindingEvent(H, "keydown", this.eventHandler("onKeyPress"));
	BindingEvent(H, "keyup", this.eventHandler("onKeyUp"))
};
MainFrame.prototype.unregisterKeyHandlers = function(H) {
	unbindingEvent(this.container, "keydown", this.eventHandler("onKeyPress"));
	unbindingEvent(this.container, "keyup", this.eventHandler("onKeyUp"))
};
MainFrame.prototype.onMouseScroll = function(e) {
	if(!e) {
		e = window.event
	}
	if(!this.bIsZooming) {
		var z = this.getZoomLevel();
		if(e.wheelDelta > 0 || e.detail < 0) {
			if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
				z++
			} else {
				if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
					z--
				}
			}
		} else {
			if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
				z--
			} else {
				if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
					z++
				}
			}
		}
		this.flatZoom(z);
		if(_IEBrowser.type == 1) {
			var deltaTemp = e.wheelDelta
		} else {
			var deltaTemp = e.detail
		}
		EzEvent.wheelDelta = deltaTemp;
		EzEvent.ezEventListener.source = this;
		EzEvent.ezEventListener.eventType = EzEvent.MAP_MOUSEWHEEL;
		EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
	}
};
MainFrame.prototype.styleZoom = function(z, flg, oPoint) {
	if(flg) {
		this.div.style.zoom = 1;
		this.div.style.left = convert2Px(this.iOldLeft);
		this.div.style.top = convert2Px(this.iOldTop)
	} else {
		switch(EzServerClient.GlobeParams.Browser) {
			case "IE":
				this.div.style.zoom = z;
				var scale = z - 1;
				if(oPoint && this._mouseZoom) {
					var iLeft = this.iOldLeft + (this.iOldLeft - (oPoint.x - this.container.offsetLeft)) * scale;
					var iTop = this.iOldTop + (this.iOldTop - (oPoint.y - this.container.offsetTop)) * scale
				} else {
					var iLeft = this.iOldLeft + (this.iOldLeft - this.viewSize.width / 2) * scale;
					var iTop = this.iOldTop + (this.iOldTop - this.viewSize.height / 2) * scale
				}
				iTop = Math.ceil(iTop);
				iTop = Math.ceil(iTop);
				this.div.style.left = convert2Px(iLeft);
				this.div.style.top = convert2Px(iTop);
				break;
			case "Firefox":
				break;
			case "Chrome":
				break;
			case "Safari":
				break;
			case "Opera":
				break;
			default:
				break
		}
	}
};
MainFrame.prototype.flatZoom = function(z) {
	if(z < 0 || z > _MaxLevel) {
		return false
	}
	if(this.bIsZooming) {
		return false
	}
	this.bIsZooming = true;
	var step = 5;
	var stepnum = 0;
	if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
		var per = _m_MapSpan[z] / _m_MapSpan[this.getZoomLevel()];
		var perd = (per - 1) / step
	} else {
		var per = _m_MapSpan[z] / _m_MapSpan[this.getZoomLevel()];
		if(per > 1) {
			var perd = (1 - per) / step / 2
		} else {
			var perd = (1 - per) / step * 2
		}
	}
	this.iOldLeft = parseInt(this.div.style.left);
	this.iOldTop = parseInt(this.div.style.top);
	if(typeof ezmap_overlay_div != "undefined") {
		for(var i = 0; i < ezmap_overlay_div.length; i++) {
			ezmap_overlay_div[i].style.filter = ""
		}
	}
	if(this.infoWindow.isVisible()) {
		this.hideInfoWind();
		this.bInfoHasOpen = true
	} else {
		this.bInfoHasOpen = false
	}
	var pMe = this;
	var screenPoint = EzEvent.screenPoint;
	var mapPoint = EzEvent.mapPoint;
	_TmrModeFlatZoom = setInterval(function() {
		stepnum++;
		if(stepnum < (step + 1)) {
			if(pMe._mouseZoom) {
				pMe.styleZoom(1 + perd * stepnum, false, screenPoint)
			} else {
				pMe.styleZoom(1 + perd * stepnum, false)
			}
		} else {
			window.clearInterval(_TmrModeFlatZoom);
			_TmrModeFlatZoom = null;
			pMe.styleZoom(z, true);
			if(pMe._mouseZoom) {
				if(pMe.bIsMercatorMap) {
					mapPoint = pMe.latlon2Meters(mapPoint)
				}
				pMe.zoomAtPoint(mapPoint, z)
			} else {
				pMe.zoomTo(z)
			}
			if(pMe.bInfoHasOpen && !pMe.bInfoHasCloseClick) {
				pMe.showInfoWindow(pMe.pWinInfo, true)
			}
		}
	}, 10);
	return true
};
MainFrame.prototype.onKeyPress = function(b) {
	if(this.ignoreKeyEvent(b)) {
		return true
	}
	switch(b.keyCode) {
		case 38:
		case 40:
		case 37:
		case 39:
			this.panKeys.add(b.keyCode);
			this.startContinuousPan();
			return false;
		case 34:
			this.pan(0, -Math.floor(this.viewSize.height * 0.75));
			return false;
		case 33:
			this.pan(0, Math.floor(this.viewSize.height * 0.75));
			return false;
		case 36:
			this.pan(Math.floor(this.viewSize.width * 0.75), 0);
			return false;
		case 35:
			this.pan(-Math.floor(this.viewSize.width * 0.75), 0);
			return false;
		case 187:
		case 107:
			this.zoomTo(this.realZoomLevel - 1);
			return false;
		case 189:
		case 109:
			this.zoomTo(this.realZoomLevel + 1);
			return false
	}
	switch(b.which) {
		case 61:
		case 43:
			this.zoomTo(this.realZoomLevel - 1);
			return false;
		case 45:
		case 95:
			this.zoomTo(this.realZoomLevel + 1);
			return false
	}
	return true
};
MainFrame.prototype.onKeyUp = function(b) {
	switch(b.keyCode) {
		case 38:
		case 40:
		case 37:
		case 39:
			this.panKeys.remove(b.keyCode);
			return false
	}
};
MainFrame.prototype.ignoreKeyEvent = function(b) {
	if(b.ctrlKey || (b.altKey || b.metaKey)) {
		return true
	}
	if(b.target && (b.target.nodeName == "INPUT" && b.target.getAttribute("type").toLowerCase() == "text" || b.target.nodeName == "TEXTAREA")) {
		return true
	}
	return false
};
MainFrame.prototype.startContinuousPan = function() {
	if(!this.topLeftTile) {
		return
	}
	this.cancelPan();
	if(!this.continuousPanTimeout) {
		this.panSiner = new nc(100);
		this.continuousPanTimeout = this.setTimeout("this.doContinuousPan()", 5)
	}
	this.keypan = {};
	this.keypan.startLeft = this.divEvent.style.left;
	this.keypan.startTop = this.divEvent.style.top
};
MainFrame.prototype.doContinuousPan = function() {
	if(this.panKeys.size > 0) {
		var ce = (this.panKeys.contains(37) ? 1 : 0) + (this.panKeys.contains(39) ? -1 : 0);
		var Be = (this.panKeys.contains(38) ? 1 : 0) + (this.panKeys.contains(40) ? -1 : 0);
		var lb = 1;
		if(this.panSiner.more()) {
			lb = this.panSiner.next()
		}
		var C = ce > 0 ? Math.floor : Math.ceil;
		var Da = C(7 * lb * ce + 5 * ce);
		C = Be > 0 ? Math.floor : Math.ceil;
		var Ha = C(7 * lb * Be + 5 * Be);
		this.dragObject.moveTo(this.dragObject.left + Da, this.dragObject.top + Ha);
		this.onMove();
		this.rotateTiles();
		this.continuousPanTimeout = this.setTimeout("this.doContinuousPan()", 10)
	} else {
		this.continuousPanTimeout = null;
		this.onStateChanged("doContinuousPan");
		EzEvent.ezEventListener.source = this;
		EzEvent.ezEventListener.eventType = EzEvent.MAP_VIEWCHANGE;
		EzEvent.keypanleftOffset = parseInt(this.divEvent.style.left) - parseInt(this.keypan.startLeft);
		EzEvent.keypantopOffset = parseInt(this.divEvent.style.top) - parseInt(this.keypan.startTop);
		EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
	}
};
MainFrame.prototype.onWindowBlur = function(b) {
	if(this.panKeys.size > 0) {
		this.panKeys = new Ic()
	}
};
MainFrame.prototype.onIconMouseDown = function(v, b) {
	S(b);
	if(this.onmousedown) {
		this.onmousedown()
	}
	this.clearInfoWindowArgs(v.xml);
	this.showInfoWindow(v)
};
MainFrame.prototype.clearInfoWindowArgs = function(R) {
	R.setAttribute("arg0", "");
	R.setAttribute("arg1", "");
	R.setAttribute("arg2", "")
};
MainFrame.prototype.infoWindowNavigate = function(oh, af, ag, jf) {
	if(!this.openLocation || this.disablePopups) {
		return
	}
	if(af) {
		this.openLocation.xml.setAttribute("arg0", af)
	}
	if(ag) {
		this.openLocation.xml.setAttribute("arg1", ag)
	}
	if(jf) {
		this.openLocation.xml.setAttribute("arg2", jf)
	}
	this.onInfoWindowLoad = oh;
	this.showInfoWindow(this.openLocation)
};
MainFrame.prototype.showPop = function(point, html, opt) {
	var pMe = this;
	if(pMe.bIsOpenInfo == true) {
		this.infoWindow1.closeButton.onclick()
	}
	var infoWindow = null;
	if(typeof(opt) != "undefined") {
		infoWindow = new InforWindow(this, html, opt)
	} else {
		infoWindow = new InforWindow(this, point)
	}
	this.infoWindow1 = infoWindow;
	infoWindow.showInfoWindow(point);
	pMe.bIsOpenInfo = true;
	if(typeof infoWindow.bIsInScreen == "undefined" || infoWindow.bIsInScreen) {
		pMe.panToInfoWindow1()
	}
};
MainFrame.prototype.showInfoWindow = function(v, vIsRefreshPos) {
	if(this.disablePopups || v == null) {
		return
	}
	if(!v.infoStyle) {
		return
	}
	this.openLocation = v;
	if(this.preLayer == "lonlat" && this.currentLayer == "mercator") {
		var point = this.latlon2Meters(v.point);
		v.point = point
	}
	if(this.preLayer == "mercator" && this.currentLayer == "lonlat") {
		var point = this.meters2latlon(v.point);
		v.point = point
	}
	var Ga = this.convert2WPoint(v.point.x, v.point.y);
	this.infoWindow.point = v.point;
	this.infoWindow.iconClass = v.icon.iconClass;
	if(vIsRefreshPos) {
		this.infoWindow.positionAt(Ga.x, Ga.y, v.icon.iconClass);
		this.infoWindow.show();
		return
	} else {
		var g = this;
		var zg = function() {
			g.showSizedInfoWindow(Ga.x, Ga.y, v.icon.iconClass)
		};
		V.asynchronousTransform(v.xml, this.infoWindow.offscreenArea, v.infoStyle, zg, null)
	}
};
MainFrame.prototype.addMarkersToInfoWindowMask = function() {
	if(this.disablePopups || (!this.infoWindow.isVisible() || !this.infoWindow.point)) {
		return
	}
	this.infoWindow.clearMaskMap();
	var Pa = new Point(this.infoWindow.getOffsetLeft(), this.infoWindow.getOffsetTop());
	var wb = new Point(Pa.x + this.infoWindow.getTotalWidth(), Pa.y + this.infoWindow.getTotalHeight());
	for(var a = 0; a < this.locations.length; a++) {
		var ia = this.locations[a].marker;
		if(ia.icon.offsetTop > wb.y) {
			break
		}
		this.addMarkerToInfoWindowMask(Pa, wb, ia)
	}
};
MainFrame.prototype.addMarkerToInfoWindowMask = function(Pa, wb, ia) {
	var ha = ia.icon;
	if(ha.offsetLeft + ha.width >= Pa.x && (ha.offsetLeft <= wb.x && (ha.offsetTop + ha.height >= Pa.y && ha.offsetTop <= wb.y))) {
		var ue = M.get("local").translateImageMapArray(ha.offsetLeft - Pa.x, ha.offsetTop - Pa.y);
		this.infoWindow.addAreaToMaskMap(ue, ia.mouseTarget.onmousedown)
	}
};
MainFrame.prototype.showSizedInfoWindow = function(left, top, pIcon) {
	var dc = xa.create("infoWindowOffscreen");
	this.infoWindow.prepareOffscreen();
	var pMe = this;
	var li = function() {
		if(dc.isValid()) {
			pMe.infoWindow.flipOffscreenAndSize();
			try {
				if(typeof(pMe.infoWidth) != "undefined" && typeof(pMe.infoHeight) != "undefined") {
					if(pMe.infoWidth < 150) {
						pMe.infoWidth = 150
					}
					if(pMe.infoHeight < 85) {
						pMe.infoHeight = 85
					}
					pMe.infoWindow.setSize(pMe.infoWidth, pMe.infoHeight)
				}
			} catch(e) {}
			pMe.infoWindow.positionAt(left, top, pIcon);
			pMe.infoWindow.show();
			if(typeof pMe.bIsInScreen == "undefined" || pMe.bIsInScreen) {
				pMe.panToInfoWindow()
			}
			if(pMe.onInfoWindowLoad) {
				pMe.onInfoWindowLoad();
				pMe.onInfoWindowLoad = null
			}
		}
	};
	window.setTimeout(li, 0)
};
MainFrame.prototype.createSpecChangeLink = function(ea) {
	var g = this;
	var sh = function() {
		g.switchSpecification(ea)
	};
	return Bh(ea.getLinkText(), sh)
};
MainFrame.prototype.onInfoCloseClick = function(b) {
	this.closeInfoWindow();
	this.bInfoHasCloseClick = true
};
MainFrame.prototype.closeInfoWindow = function() {
	if(!this.disablePopups) {
		this.infoWindow.hide();
		if(this.oninfowindowclose) {
			this.oninfowindowclose()
		}
	}
	if(typeof clearImgTimeout != "undefined" && clearImgTimeout != null) {
		clearImgTimeout()
	}
	if(EzColorPicker.close) {
		EzColorPicker.close()
	}
};
MainFrame.prototype.panToInfoWindow1 = function() {
	var iNewLevel = this.getMinLevelBorder(this.infoWindow1.point);
	if(iNewLevel != this.realZoomLevel) {
		this.zoomTo(iNewLevel)
	}
	var ga = this.baseLayer.convertMap2Bitmap(this.infoWindow1.point.x, this.infoWindow1.point.y, this.realZoomLevel);
	var Ga = this.getDivCoordinate(ga.x, ga.y, we);
	var va = new Point(this.centerBitmap.x, this.centerBitmap.y);
	var dMinX = ga.x - (this.viewSize.width / 2 - this.infoWindow1.getTotalWidth());
	var dMaxX = ga.x + (this.viewSize.width / 2 - this.infoWindow1.getTotalWidth());
	var dMinY = ga.y - (this.viewSize.height / 2 - this.infoWindow1.getTotalHeight()) + 10;
	var dMaxY = ga.y + this.viewSize.height / 2 - 50;
	if(va.x > dMaxX || va.x < dMinX) {
		va.x = Math.min(va.x, dMaxX);
		va.x = Math.max(va.x, dMinX)
	}
	if(va.y > dMaxY || va.y < dMinY) {
		va.y = Math.min(va.y, dMaxY);
		va.y = Math.max(va.y, dMinY)
	}
	var pCenterBitmap = this.centerBitmap;
	if(pCenterBitmap.x != va.x || pCenterBitmap.y != va.y) {
		EzEvent.ezEventListener.source = this;
		EzEvent.ezEventListener.eventType = EzEvent.MAP_PANINFOWINDOW;
		EzEvent.panInfoleftOffset = Math.round(va.x - pCenterBitmap.x);
		EzEvent.panInfotopOffset = Math.round(pCenterBitmap.y - va.y);
		EzEvent.trigger(EzEvent.ezEventListener, EzEvent);
		this.recenterOrPanToBitmap(va)
	}
	this.bIsInScreen = false
};
MainFrame.prototype.panToInfoWindow = function() {
	if(this.pWinInfo.bIsVisable == false) {
		return
	}
	if(this.disablePopups) {
		return
	}
	var iNewLevel = this.getMinLevelBorder(this.infoWindow.point);
	if(iNewLevel != this.realZoomLevel) {
		this.zoomTo(iNewLevel)
	}
	var ga = this.baseLayer.convertMap2Bitmap(this.infoWindow.point.x, this.infoWindow.point.y, this.realZoomLevel);
	var Ga = this.getDivCoordinate(ga.x, ga.y, we);
	var va = new Point(this.centerBitmap.x, this.centerBitmap.y);
	var dMinX = ga.x - (this.viewSize.width / 2 - this.infoWindow.getTotalWidth());
	var dMaxX = ga.x + (this.viewSize.width / 2 - this.infoWindow.getTotalWidth());
	var dMinY = ga.y - (this.viewSize.height / 2 - this.infoWindow.getTotalHeight()) + 10;
	var dMaxY = ga.y + this.viewSize.height / 2 - 50;
	if(va.x > dMaxX || va.x < dMinX) {
		va.x = Math.min(va.x, dMaxX);
		va.x = Math.max(va.x, dMinX)
	}
	if(va.y > dMaxY || va.y < dMinY) {
		va.y = Math.min(va.y, dMaxY);
		va.y = Math.max(va.y, dMinY)
	}
	var pCenterBitmap = this.centerBitmap;
	if(pCenterBitmap.x != va.x || pCenterBitmap.y != va.y) {
		EzEvent.ezEventListener.source = this;
		EzEvent.ezEventListener.eventType = EzEvent.MAP_PANINFOWINDOW;
		EzEvent.panInfoleftOffset = Math.round(va.x - pCenterBitmap.x);
		EzEvent.panInfotopOffset = Math.round(pCenterBitmap.y - va.y);
		EzEvent.trigger(EzEvent.ezEventListener, EzEvent);
		this.recenterOrPanToBitmap(va)
	}
	this.bIsInScreen = false
};
MainFrame.prototype.repositionInfoWindow = function() {
	if(this.disablePopups || (!this.infoWindow.isVisible() || !this.infoWindow.point)) {
		return
	}
	var j = this.infoWindow.point;
	var ga = this.baseLayer.convertMap2Bitmap(j.x, j.y, this.realZoomLevel);
	var Ga = this.getDivCoordinate(ga.x, ga.y, we);
	this.infoWindow.positionAt(Ga.x, Ga.y, this.infoWindow.iconClass)
};
MainFrame.prototype.getVMLPathString = function(D) {
	Timer.start("Map", "getVMLPathString");
	var w = new Array();
	w.push("m");
	w.push(D.polyline.points[0]);
	w.push(D.polyline.points[1]);
	w.push("l");
	w = w.concat(D.polyline.points);
	for(var a = 0; a < D.segments.length; a++) {
		var fa = D.segments[a].pointIndex << 1;
		var Bd = fa + 4;
		var Ye = w[Bd];
		var Wf = w[Bd + 1];
		w[Bd] = Ye + " " + Wf + " e m";
		w[Bd + 1] = Ye + " " + Wf + " l"
	}
	w.push("e");
	var str = w.join(" ");
	Timer.end("Map", "getVMLPathString");
	return str
};
MainFrame.prototype.createTrackVML = function(strPath, pParent, pShape) {
	Timer.start("Map", "createTrackVML");
	var polyVML = "polylineVML";
	var pPolylineEle = getEleByID(polyVML);
	if(!pPolylineEle) {
		pPolylineEle = document.createElement("v:polyline");
		pPolylineEle.id = "polylineVML";
		pPolylineEle.points = strPath;
		pPolylineEle.style.position = "absolute";
		pPolylineEle.style.zIndex = 1088;
		pPolylineEle.filled = false;
		pPolylineEle.strokeColor = _LineColor;
		pPolylineEle.strokeWeight = _LineWidth + "pt";
		var pPolylineStroke = document.createElement("v:stroke");
		pPolylineStroke.opacity = 1;
		pPolylineStroke.startarrowwidth = "wide";
		pPolylineStroke.endarrowwidth = "wide";
		pPolylineStroke.startarrowlength = "long";
		pPolylineStroke.endarrowlength = "long";
		pPolylineStroke.startarrow = "oval";
		pPolylineStroke.endarrow = "classic";
		pPolylineEle.appendChild(pPolylineStroke)
	} else {
		var pTmpEle = pPolylineEle;
		pParent.removeChild(pTmpEle);
		pPolylineEle = pTmpEle;
		pPolylineEle.strokeColor = _LineColor;
		pPolylineEle.strokeWeight = _LineWidth + "pt"
	}
	pPolylineEle.points = strPath;
	pParent.appendChild(pPolylineEle);
	Timer.end("Map", "createTrackVML");
	return pShape
};
MainFrame.prototype.getPathCenter = function(strPath) {
	var pMBR = this.getPathMBR(strPath);
	return pMBR.centerPoint()
};
MainFrame.prototype.getPathMBR = EzServerClient.GlobeFunction.getPathMBR;
MainFrame.prototype.centerAndZoomToBorder = function(strPaths) {
	if(typeof strPaths == "undefined" || strPaths == null || strPaths == "") {
		return
	}
	strPaths = Trim(strPaths);
	var pBorderArray = strPaths.split(";");
	var pMBR = null;
	if(this.borderVML && this.borderVML != null) {
		for(var i = 0; i < this.borderVML.length; i++) {
			var pVML = this.borderVML[i];
			this.removeOverlay(pVML)
		}
		this.borderVML.clear()
	} else {
		this.borderVML = new Array()
	}
	for(var iIndex = 0; iIndex < pBorderArray.length; iIndex++) {
		var strPath = pBorderArray[iIndex];
		if(strPath == "") {
			continue
		}
		if(iIndex == 0) {
			pMBR = this.getPathMBR(strPath)
		} else {
			var pTmpMBR = this.getPathMBR(strPath);
			pMBR.extend(pTmpMBR)
		}
		var pVML = this.createBorder(strPath, false);
		if(pVML != null) {
			this.borderVML.push(pVML)
		}
	}
	this.centerAtMBR(pMBR.minX, pMBR.minY, pMBR.maxX, pMBR.maxY);
	for(var i = 0; i < this.borderVML.length; i++) {
		var pVML = this.borderVML[i];
		pVML.flash(false)
	}
};
MainFrame.prototype.createBorder = function(strPath, bIsFlash) {
	var strLonLatPath = strPath.split(",");
	var pVMLObj;
	var pObject = null;
	if(strLonLatPath.length == 3) {
		pObject = Circle
	} else {
		if(strLonLatPath.length == 4) {
			pObject = Rectangle
		} else {
			if(strLonLatPath.length >= 6) {
				pObject = Polygon
			}
		}
	}
	pVMLObj = new pObject(strPath, "red", 4, 0.5, "blue");
	this.addOverlay(pVMLObj);
	if(bIsFlash) {
		pVMLObj.flash(false)
	}
	return pVMLObj
};
MainFrame.prototype.convert2Div = function(strPath) {
	var pMapContainer = this;
	var iLen = strPath.length;
	var pPath = new Array();
	for(var iIndex = 0; iIndex < iLen / 2; iIndex++) {
		var pPoint = pMapContainer.getDivCoord(strPath[2 * iIndex], strPath[2 * iIndex + 1]);
		pPath.push(pPoint.x);
		pPath.push(pPoint.y);
		delete pPoint
	}
	return pPath
};
MainFrame.prototype.drawOval = function(strLonLatPath) {
	var pMapContainer = this;
	var pVMLContainer = pMapContainer.getVMLContainer();
	var pPoint = pMapContainer.getDivCoord(strLonLatPath[0], strLonLatPath[1]);
	var dLon = parseFloat(strLonLatPath[0]) + parseFloat(strLonLatPath[2]);
	var pTemp = pMapContainer.getDivCoord(dLon, strLonLatPath[1]);
	var iRadius = Math.abs(pTemp.x - pPoint.x);
	var iLeft = pPoint.x - iRadius;
	var iTop = pPoint.y - iRadius;
	var iWidth = 2 * iRadius;
	var iHeight = 2 * iRadius;
	var pOval = pVMLContainer.drawOval(iLeft, iTop, iWidth, iHeight);
	return pOval
};
MainFrame.prototype.drawPolygon = function(strLonLatPath) {
	var pMapContainer = this;
	var pVMLContainer = pMapContainer.getVMLContainer();
	var pPolygon = pVMLContainer.drawPolygon();
	var strPoints = this.convert2Div(strLonLatPath);
	pPolygon.points.value = strPoints;
	delete strPoints;
	return pPolygon
};
MainFrame.prototype.drawPolyline = function(strLonLatPath) {
	var pMapContainer = this;
	var pVMLContainer = pMapContainer.getVMLContainer();
	var pPolyline = pVMLContainer.drawPolyline();
	pPolyline.points.value = this.convert2Div(strLonLatPath);
	return pPolyline
};
MainFrame.prototype.drawRect = function(strLonLatPath) {
	var pMapContainer = this;
	var pVMLContainer = pMapContainer.getVMLContainer();
	var pPoint1 = pMapContainer.getDivCoord(strLonLatPath[0], strLonLatPath[1]);
	var pPoint2 = pMapContainer.getDivCoord(strLonLatPath[2], strLonLatPath[3]);
	var iLeft = Math.min(pPoint1.x, pPoint2.x);
	var iTop = Math.min(pPoint1.y, pPoint2.y);
	var iWidth = Math.abs(pPoint1.x - pPoint2.x);
	var iHeight = Math.abs(pPoint1.y - pPoint2.y);
	var pRect = pVMLContainer.drawRect(iLeft, iTop, iWidth, iHeight);
	return pRect
};
MainFrame.prototype.getVMLContainer = function() {
	if(!this.vmlContainer) {
		this.vmlContainer = this.createVMLContainer(this.div)
	}
	this.refreshVMLGraphics();
	return this.vmlContainer
};
MainFrame.prototype.getTrackVMLContainer = function() {
	if(!this.trackVmlContainer) {
		this.trackVmlContainer = this.createVMLContainer(this.div)
	}
	this.trackVmlContainer.groupObj.style.filter = "";
	return this.trackVmlContainer
};
MainFrame.prototype.createVMLContainer = function(pParent) {
	var iWidth = this.viewSize.width;
	var iHeight = this.viewSize.height;
	var pVMLContainer;
	try {
		if(_VMLInMap) {
			pVMLContainer = new vmlGraphics(0, 0, iWidth, iHeight, pParent);
			pVMLContainer.setScale(1);
			pVMLContainer.groupObj.style.filter = "alpha(opacity=50,style=0)"
		} else {
			pVMLContainer = new vmlGraphics(0, 0, iWidth, iHeight, pParent);
			pVMLContainer.groupObj.style.filter = "alpha(opacity=50,style=0)"
		}
	} catch(e) {
		alert("创建VML出现错误!")
	} finally {
		pVMLContainer.groupObj.style.zIndex = _overLayIndex - 10;
		pVMLContainer.groupObj.unselectable = "on";
		pVMLContainer.setFillColor("blue");
		pVMLContainer.setStroke("red", 2)
	}
	return pVMLContainer
};
MainFrame.prototype.clearVMLContainer = function() {
	if(this.vmlContainer && this.vmlContainer.groupObj) {
		RemoveChildren(this.vmlContainer.groupObj)
	}
};
MainFrame.prototype.refreshVMLGraphics = function() {
	Timer.start("Map", "refreshVMLGraphics");
	var Kb = this.centerBitmap;
	var Kc = this.getDivCoordinate(Kb.x, Kb.y, we);
	var k = 100;
	var m = 100;
	var pPoint = this.getCenterLatLng();
	var Ze = this.baseLayer.tileInfo.levelDetails[this.realZoomLevel].resolution;
	var pVMLContainer = this.vmlContainer;
	if(!pVMLContainer) {
		return
	}
	if(_VMLInMap) {
		var iLeft = parseInt(this.div.style.left);
		var iTop = parseInt(this.div.style.top);
		var iWidth = this.viewSize.width;
		var iHeight = this.viewSize.height;
		pVMLContainer.groupObj.style.left = convert2Px(-iLeft + iWidth / 2);
		pVMLContainer.groupObj.style.top = convert2Px(iTop + iHeight / 2);
		pVMLContainer.groupObj.style.width = convert2Px(iWidth);
		pVMLContainer.groupObj.style.height = convert2Px(iHeight);
		pVMLContainer.setOrigin(pPoint.x * 100000, pPoint.y * 100000);
		pVMLContainer.setOriginSize(100000 * iWidth * Ze.x, 100000 * iHeight * Ze.y)
	} else {
		var iLeft = parseInt(this.div.style.left);
		var iTop = parseInt(this.div.style.top);
		pVMLContainer.groupObj.style.left = convert2Px(-iLeft);
		pVMLContainer.groupObj.style.top = convert2Px(-iTop);
		var iWidth = this.viewSize.width;
		var iHeight = this.viewSize.height;
		pVMLContainer.groupObj.style.width = convert2Px(iWidth);
		pVMLContainer.groupObj.style.height = convert2Px(iHeight);
		pVMLContainer.setOrigin(0, 0);
		pVMLContainer.setOriginSize(iWidth, iHeight)
	}
	Timer.end("Map", "refreshVMLGraphics")
};
MainFrame.prototype.showMapControl = function(strPos) {
	if(!this.mapControl) {
		var p = this.createMapControl();
		p.style.position = "absolute";
		setClass(p, "noprint");
		this.container.appendChild(p);
		this.mapControl = p
	} else {
		this.container.removeChild(this.mapControl);
		var p = this.createMapControl();
		p.style.position = "absolute";
		setClass(p, "noprint");
		this.container.appendChild(p);
		this.mapControl = p
	}
	if(strPos == "right") {
		this.mapControl.style.right = convert2Px(58);
		this.mapControl.style.top = convert2Px(8)
	} else {
		this.mapControl.style.left = convert2Px(8);
		this.mapControl.style.top = convert2Px(8)
	}
};
MainFrame.prototype.hideMapControl = function() {
	if(this.mapControl) {
		this.mapControl.style.display = "none"
	}
};
MainFrame.prototype.hideMapScale = function() {
	var pMapScale = this.mapScale;
	if(pMapScale) {
		for(var iIndex = 0; iIndex < pMapScale.length; iIndex++) {
			pMapScale[iIndex].style.display = "none"
		}
	}
};
MainFrame.prototype.showMapScale = function() {
	var pMapScale = this.mapScale;
	if(pMapScale) {
		for(var iIndex = 0; iIndex < pMapScale.length; iIndex++) {
			pMapScale[iIndex].style.display = ""
		}
	} else {
		this.createMapScale()
	}
};
MainFrame.prototype.createMapControl = function() {
	var p = document.createElement("div");
	if(typeof _bIsShowMapControl != "undefined" && _bIsShowMapControl == true) {
		this.createPanningControls(p)
	}
	this.createZoomControls(p);
	this.createZoomSlider(p);
	return p
};
MainFrame.prototype.showSmallMapControl = function(strPos) {
	if(!this.mapControl) {
		var p = this.createSmallMapControl();
		p.style.position = "absolute";
		setClass(p, "noprint");
		this.container.appendChild(p);
		this.mapControl = p
	} else {
		this.container.removeChild(this.mapControl);
		var p = this.createSmallMapControl();
		p.style.position = "absolute";
		setClass(p, "noprint");
		this.container.appendChild(p);
		this.mapControl = p
	}
	if(strPos == "right") {
		this.mapControl.style.right = convert2Px(58);
		this.mapControl.style.top = convert2Px(8)
	} else {
		this.mapControl.style.left = convert2Px(8);
		this.mapControl.style.top = convert2Px(8)
	}
};
MainFrame.prototype.showMapCtrl = function() {
	if(!this.mapControl) {
		var p = this.createMapCtrl();
		p.style.position = "absolute";
		p.style.left = "15px";
		p.style.top = "20px";
		p.id = "mapControl";
		this.container.appendChild(p);
		this.mapControl = p
	} else {
		this.container.removeChild(this.mapControl);
		var p = this.createMapCtrl();
		p.style.position = "absolute";
		p.style.left = "15px";
		p.style.top = "20px";
		p.id = "mapControl";
		this.container.appendChild(p);
		this.mapControl = p
	}
};
MainFrame.prototype.createMapCtrl = function() {
	var p = document.createElement("div");
	this.createPan(p);
	this.createSlider(p);
	return p
};
MainFrame.prototype.createSlider = function(p) {
	var g = this;
	var perHeight = _EzMap_mapCtrl_slider;
	var tempObj = g.sliderInit();
	var sHeight = parseInt(tempObj.sHeight);
	var slider = document.createElement("div");
	slider.className = "slider mapCtrl";
	slider.style.height = sHeight + "px";
	p.appendChild(slider);
	var tag = this.addTag(sHeight, slider);
	BindingEvent(slider, "mouseover", function(event) {
		levelNum.style.display = "block";
		g.showTag(tag)
	});
	BindingEvent(slider, "mouseout", function(event) {
		levelNum.style.display = "none";
		g.hideTag(tag)
	});
	var levelNumBoun = document.createElement("div");
	levelNumBoun.className = "mapCtrl levelNumBoun";
	levelNumBoun.style.height = (sHeight - 18 * 2) + "px";
	slider.appendChild(levelNumBoun);
	var levelNum = document.createElement("div");
	if(tempObj.sDirection == "d") {
		levelNum.className = "mapCtrl levelNumZ"
	} else {
		levelNum.className = "mapCtrl levelNumD"
	}
	levelNumBoun.appendChild(levelNum);
	levelNum.style.display = "none";
	if(EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
		levelNum.style.bottom = "10px";
		levelNum.style.height = "222px"
	}
	var zoomIn = document.createElement("div");
	zoomIn.className = "mapCtrl zoomIn";
	slider.appendChild(zoomIn);
	BindingEvent(zoomIn, "click", function(event) {
		if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
			g.zoomTo(g.getZoomLevel() - 1)
		} else {
			if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
				g.zoomTo(g.getZoomLevel() + 1)
			}
		}
		S(event)
	});
	var zoomOut = document.createElement("div");
	zoomOut.className = "mapCtrl zoomOut";
	slider.appendChild(zoomOut);
	BindingEvent(zoomOut, "click", function(event) {
		if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
			g.zoomTo(g.getZoomLevel() + 1)
		} else {
			if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
				g.zoomTo(g.getZoomLevel() - 1)
			}
		}
		S(event)
	});
	if(EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
		zoomOut.style.bottom = "11px"
	}
	var zoomSliderBoun = document.createElement("div");
	zoomSliderBoun.className = "mapCtrl zoomSliderBoun";
	zoomSliderBoun.id = "zoomSliderBoun";
	var iSdeBht = parseInt(sHeight - 18 * 2);
	zoomSliderBoun.style.height = iSdeBht + "px";
	slider.appendChild(zoomSliderBoun);
	var zoomSliderClick = document.createElement("div");
	zoomSliderClick.className = "mapCtrl zooSliderClick";
	zoomSliderClick.style.height = iSdeBht + "px";
	zoomSliderBoun.appendChild(zoomSliderClick);
	BindingEvent(zoomSliderClick, "click", function(b) {
		S(b);
		var o;
		if(window.event) {
			o = window.event.offsetY
		} else {
			if(b.layerY) {
				o = b.layerY
			} else {
				var Ad = ObjectOffset(Wa);
				o = b.pageY - Ad.y - 2
			}
		}
		var level = EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel(o, perHeight, EzServerClient.GlobeParams.MapMaxLevel, EzServerClient.GlobeParams.ZoomLevelSequence);
		g.zoomTo(level);
		zoomSliderBtoBoun.style.height = (sHeight - 18 * 2 - o - 2) + "px"
	});
	var sldBarPos = parseInt(tempObj.iBarPos) - 18;
	var zoomSliderBgTop = document.createElement("div");
	zoomSliderBgTop.className = "mapCtrl zoomSliderBgTop";
	zoomSliderBoun.appendChild(zoomSliderBgTop);
	zoomSliderBgTop.style.height = iSdeBht + "px";
	var zoomSliderBgBto = document.createElement("div");
	zoomSliderBgBto.className = "mapCtrl zoomSliderBgBto";
	var zoomSliderBtoBoun = document.createElement("div");
	zoomSliderBtoBoun.className = "mapCtrl zoomSliderBtoBoun";
	zoomSliderBtoBoun.appendChild(zoomSliderBgBto);
	zoomSliderBoun.appendChild(zoomSliderBtoBoun);
	zoomSliderBtoBoun.style.height = iSdeBht - sldBarPos - 10 + "px";
	var zoomSliderBar = document.createElement("div");
	zoomSliderBar.className = "mapCtrl zoomSliderBar";
	zoomSliderBoun.appendChild(zoomSliderBar);
	var maxLevel = EzServerClient.GlobeParams.MapMaxLevel;
	var F = new MBR(0, 0, 20, perHeight * maxLevel);
	var Ud = new DragEvent(zoomSliderBar, 0, EzServerClient.GlobeFunction.zoomLevel2sliderPixelPosition(this.getZoomLevel(), perHeight, maxLevel, EzServerClient.GlobeParams.ZoomLevelSequence) + 2, F);
	this.onzoom = function() {
		var posi = EzServerClient.GlobeFunction.zoomLevel2sliderPixelPosition(this.getZoomLevel(), perHeight, maxLevel, EzServerClient.GlobeParams.ZoomLevelSequence);
		Ud.moveTo(0, posi + 1);
		zoomSliderBtoBoun.style.height = (sHeight - 18 * 2 - posi - 5) + "px"
	};
	Ud.ondragend = function() {
		var Ai = Ud.top;
		var iLevel = EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel(Ai, perHeight, maxLevel, EzServerClient.GlobeParams.ZoomLevelSequence);
		g.zoomTo(iLevel)
	};
	Ud.ondraging = function() {
		var Ai = Ud.top;
		Ud.src.style.left = "0px";
		zoomSliderBtoBoun.style.height = (sHeight - 18 * 2 - Ai - 5) + "px"
	}
};
MainFrame.prototype.addTag = function(height, mapCtrlDiv) {
	var g = this;
	var perHeight = _EzMap_mapCtrl_slider;
	var tag = document.createElement("div");
	tag.className = "mapCtrl mapCtrltagBoun";
	tag.style.height = height + "px";
	mapCtrlDiv.appendChild(tag);
	tag.style.display = "none";
	var country = document.createElement("div");
	country.className = "mapCtrl maptag_country";
	BindingEvent(country, "click", function(b) {
		var top = null;
		if(_IEBrowser.type == 2) {
			top = parseInt(country.style.top) - 18 + 10
		} else {
			top = country.style.pixelTop - 18 + 10
		}
		var level = EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel(top, perHeight, EzServerClient.GlobeParams.MapMaxLevel, EzServerClient.GlobeParams.ZoomLevelSequence);
		g.zoomTo(level);
		S(b)
	});
	var province = document.createElement("div");
	province.className = "mapCtrl maptag_province";
	BindingEvent(province, "click", function(b) {
		var top = null;
		if(_IEBrowser.type == 2) {
			top = parseInt(province.style.top) - 18 + 10
		} else {
			top = province.style.pixelTop - 18 + 10
		}
		var level = EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel(top, perHeight, EzServerClient.GlobeParams.MapMaxLevel, EzServerClient.GlobeParams.ZoomLevelSequence);
		g.zoomTo(level);
		S(b)
	});
	var city = document.createElement("div");
	city.className = "mapCtrl maptag_city";
	BindingEvent(city, "click", function(b) {
		var top = null;
		if(_IEBrowser.type == 2) {
			top = parseInt(city.style.top) - 18 + 10
		} else {
			top = city.style.pixelTop - 18 + 10
		}
		var level = EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel(top, perHeight, EzServerClient.GlobeParams.MapMaxLevel, EzServerClient.GlobeParams.ZoomLevelSequence);
		g.zoomTo(level);
		S(b)
	});
	var street = document.createElement("div");
	street.className = "mapCtrl maptag_street";
	BindingEvent(street, "click", function(b) {
		var top = null;
		if(_IEBrowser.type == 2) {
			top = parseInt(street.style.top) - 18 + 10
		} else {
			top = street.style.pixelTop - 18 + 10
		}
		var level = EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel(top, perHeight, EzServerClient.GlobeParams.MapMaxLevel, EzServerClient.GlobeParams.ZoomLevelSequence);
		g.zoomTo(level);
		S(b)
	});
	var mapMaxLevel = EzServerClient.GlobeParams.MapMaxLevel;
	var zoomOffset = this.zoomOffset;
	var realMaxLevel = parseInt(mapMaxLevel) + parseInt(zoomOffset);
	switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
		case 0:
		case 1:
			if(realMaxLevel >= 14) {
				tag.appendChild(country);
				country.style.top = (14 - zoomOffset) * perHeight + 5 + 18 - 10 + "px";
				tag.appendChild(province);
				province.style.top = (10 - zoomOffset) * perHeight + 5 + 18 - 10 + "px";
				tag.appendChild(city);
				city.style.top = (6 - zoomOffset) * perHeight + 5 + 18 - 10 + "px";
				tag.appendChild(street);
				street.style.top = (0 - zoomOffset) * perHeight + 5 + 18 - 10 + "px"
			} else {
				if(realMaxLevel >= 10) {
					tag.appendChild(province);
					province.style.top = (10 - zoomOffset) * perHeight + 5 + 18 - 10 + "px";
					tag.appendChild(city);
					city.style.top = (6 - zoomOffset) * perHeight + 5 + 18 - 10 + "px";
					tag.appendChild(street);
					street.style.top = (0 - zoomOffset) * perHeight + 5 + 18 - 10 + "px"
				} else {
					if(realMaxLevel >= 6) {
						tag.appendChild(city);
						city.style.top = (6 - zoomOffset) * perHeight + 5 + 18 - 10 + "px";
						tag.appendChild(street);
						street.style.top = (0 - zoomOffset) * perHeight + 5 + 18 - 10 + "px"
					} else {
						if(realMaxLevel >= 0) {
							tag.appendChild(street);
							street.style.top = (0 - zoomOffset) * perHeight + 5 + 18 - 10 + "px"
						}
					}
				}
			}
			break;
		case 2:
		case 3:
			if(realMaxLevel >= 18) {
				tag.appendChild(country);
				country.style.top = (realMaxLevel - 4) * perHeight + 5 + 18 - 10 + "px";
				tag.appendChild(province);
				province.style.top = (realMaxLevel - 8) * perHeight + 5 + 18 - 10 + "px";
				tag.appendChild(city);
				city.style.top = (realMaxLevel - 12) * perHeight + 5 + 18 - 10 + "px";
				tag.appendChild(street);
				street.style.top = (realMaxLevel - 18) * perHeight + 5 + 18 - 10 + "px"
			} else {
				if(realMaxLevel >= 12) {
					tag.appendChild(country);
					country.style.top = (realMaxLevel - 4) * perHeight + 5 + 18 - 10 + "px";
					tag.appendChild(province);
					province.style.top = (realMaxLevel - 8) * perHeight + 5 + 18 - 10 + "px";
					tag.appendChild(city);
					city.style.top = (realMaxLevel - 12) * perHeight + 5 + 18 - 10 + "px"
				} else {
					if(realMaxLevel >= 8) {
						tag.appendChild(country);
						country.style.top = (realMaxLevel - 4) * perHeight + 5 + 18 - 10 + "px";
						tag.appendChild(province);
						province.style.top = (realMaxLevel - 8) * perHeight + 5 + 18 - 10 + "px"
					} else {
						if(realMaxLevel >= 4) {
							tag.appendChild(country);
							country.style.top = (realMaxLevel - 4) * perHeight + 5 + 18 - 10 + "px"
						}
					}
				}
			}
			break
	}
	return tag
};
MainFrame.prototype.hideTag = function(tag) {
	tag.style.display = "none"
};
MainFrame.prototype.showTag = function(tag) {
	tag.style.display = "block"
};
MainFrame.prototype.sliderInit = function() {
	var g = this;
	var innerMax = 22;
	var maxLevel = parseInt(EzServerClient.GlobeParams.MapMaxLevel);
	var initMapLevel = parseInt(EzServerClient.GlobeParams.MapInitLevel);
	var iHeight = _EzMap_mapCtrl_slider_iHeight;
	var perHeight = _EzMap_mapCtrl_slider;
	var sliderHeight = (iHeight / 23) * (maxLevel + 1) + 18 * 2;
	var initPosi;
	var direction;
	switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
		case 0:
		case 3:
			initPosi = initMapLevel * perHeight + 18;
			direction = "z";
			break;
		case 1:
		case 2:
			initPosi = (maxLevel - initMapLevel) * perHeight + 18;
			direction = "d";
			break
	}
	return {
		sHeight: sliderHeight,
		iBarPos: initPosi,
		sDirection: direction
	}
};
MainFrame.prototype.createPan = function(p) {
	var g = this;
	var panControl = document.createElement("div");
	panControl.className = "mapCtrl panNormal";
	p.appendChild(panControl);
	var nDiv = document.createElement("div");
	nDiv.className = "mapCtrl panDirect panN";
	panControl.appendChild(nDiv);
	BindingEvent(nDiv, "mousemove", function() {
		panControl.className = "mapCtrl panCtrlN"
	});
	BindingEvent(nDiv, "mouseout", function() {
		panControl.className = "mapCtrl panNormal"
	});
	BindingEvent(nDiv, "click", function(e) {
		g.pan(0, -Math.floor(g.viewSize.height * 0.5));
		S(e)
	});
	var wDiv = document.createElement("div");
	wDiv.className = "mapCtrl panDirect panW";
	panControl.appendChild(wDiv);
	BindingEvent(wDiv, "mousemove", function() {
		panControl.className = "mapCtrl panCtrlW"
	});
	BindingEvent(wDiv, "mouseout", function() {
		panControl.className = "mapCtrl panNormal"
	});
	BindingEvent(wDiv, "click", function(e) {
		g.pan(Math.floor(g.viewSize.width * 0.5), 0);
		S(e)
	});
	var sDiv = document.createElement("div");
	sDiv.className = "mapCtrl panDirect panS";
	panControl.appendChild(sDiv);
	BindingEvent(sDiv, "mousemove", function() {
		panControl.className = "mapCtrl panCtrlS"
	});
	BindingEvent(sDiv, "mouseout", function() {
		panControl.className = "mapCtrl panNormal"
	});
	BindingEvent(sDiv, "click", function(e) {
		g.pan(0, Math.floor(g.viewSize.height * 0.5));
		S(e)
	});
	var eDiv = document.createElement("div");
	eDiv.className = "mapCtrl panDirect panE";
	panControl.appendChild(eDiv);
	BindingEvent(eDiv, "mousemove", function() {
		panControl.className = "mapCtrl panCtrlE"
	});
	BindingEvent(eDiv, "mouseout", function() {
		panControl.className = "mapCtrl panNormal"
	});
	BindingEvent(eDiv, "click", function(e) {
		g.pan(-Math.floor(g.viewSize.width * 0.5), 0);
		S(e)
	})
};
MainFrame.prototype.showStandMapControl = function(strPos) {
	if(!this.mapControl) {
		var p = this.createStandMapControl();
		p.style.position = "absolute";
		setClass(p, "noprint");
		this.container.appendChild(p);
		this.mapControl = p
	} else {
		this.container.removeChild(this.mapControl);
		var p = this.createStandMapControl();
		p.style.position = "absolute";
		setClass(p, "noprint");
		this.container.appendChild(p);
		this.mapControl = p
	}
	if(strPos == "right") {
		this.mapControl.style.right = convert2Px(58);
		this.mapControl.style.top = convert2Px(8)
	} else {
		this.mapControl.style.left = convert2Px(8);
		this.mapControl.style.top = convert2Px(8)
	}
};
MainFrame.prototype.createSmallMapControl = function() {
	var p = document.createElement("div");
	this.createSmallPanningControls(p);
	this.createSmallZoomControls(p);
	return p
};
MainFrame.prototype.createStandMapControl = function() {
	var p = document.createElement("div");
	this.createPanningControls(p);
	this.createZoomControls(p);
	this.createZoomSlider(p);
	return p
};
MainFrame.prototype.createZoomControls = function(p) {
	var g = this;
	var ab = divCreator.create(hi, 15, 15, 20, 70, 1, false);
	setCursor(ab, "pointer");
	BindingEvent(ab, "click", function(b) {
		if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
			g.zoomTo(g.getZoomLevel() - 1)
		} else {
			if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
				g.zoomTo(g.getZoomLevel() + 1)
			}
		}
		S(b)
	});
	ab.title = _mZoomIn;
	p.appendChild(ab);
	var iTop = 100 + (iSliderH) * ((_MaxLevel + 1) / iMaxLevel);
	var bb = null;
	if(EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
		bb = divCreator.create(Zh, 15, 15, 20, iTop - 13, 1, false)
	} else {
		bb = divCreator.create(Zh, 15, 15, 20, iTop, 1, false)
	}
	setCursor(bb, "pointer");
	BindingEvent(bb, "click", function(b) {
		if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
			g.zoomTo(g.getZoomLevel() + 1)
		} else {
			if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
				g.zoomTo(g.getZoomLevel() - 1)
			}
		}
		S(b)
	});
	bb.title = _mZoomOut;
	p.appendChild(bb)
};
MainFrame.prototype.createPanningControls = function(p) {
	var g = this;
	var mb = divCreator.create(Gi, 59, 64, 0, 0, 0, false);
	var Ta = divCreator.create(jg, 17, 17, 20, 0, 1, false);
	setCursor(Ta, "pointer");
	BindingEvent(Ta, "click", function(b) {
		g.pan(0, -Math.floor(g.viewSize.height * 0.5));
		S(b)
	});
	Ta.title = _mPanNorth;
	p.appendChild(Ta);
	var Ua = divCreator.create(pi, 17, 17, 40, 20, 1, false);
	setCursor(Ua, "pointer");
	BindingEvent(Ua, "click", function(b) {
		g.pan(-Math.floor(g.viewSize.width * 0.5), 0);
		S(b)
	});
	Ua.title = _mPanEast;
	p.appendChild(Ua);
	var gb = divCreator.create(ni, 17, 17, 20, 40, 1, false);
	setCursor(gb, "pointer");
	BindingEvent(gb, "click", function(b) {
		g.pan(0, Math.floor(g.viewSize.height * 0.5));
		S(b)
	});
	gb.title = _mPanSouth;
	p.appendChild(gb);
	var Za = divCreator.create(Yh, 17, 17, 0, 20, 1, false);
	setCursor(Za, "pointer");
	BindingEvent(Za, "click", function(b) {
		g.pan(Math.floor(g.viewSize.width * 0.5), 0);
		S(b)
	});
	Za.title = _mPanWest;
	p.appendChild(Za);
	var G = divCreator.create(kh, 17, 17, 20, 20, 1, false);
	setCursor(G, "pointer");
	BindingEvent(G, "click", function(b) {
		var pPoint = _MapCenterPoint;
		g.centerAndZoom(pPoint, g.getZoomLevel());
		S(b)
	});
	G.title = _mLastResult;
	p.appendChild(G)
};
MainFrame.prototype.createZoomSlider = function(p) {
	var sliderInitHeightLevel = EzServerClient.GlobeParams.MapMaxLevel - EzServerClient.GlobeParams.MapInitLevel;
	var sliderBarHeightLevel = EzServerClient.GlobeParams.InnerMaxZoomLevel - EzServerClient.GlobeParams.MapMaxLevel;
	var Wa = document.createElement("div");
	Wa.style.position = "absolute";
	Wa.style.flowposition = "absolute";
	Wa.style.left = convert2Px(9);
	Wa.style.top = convert2Px(90);
	Wa.style.width = convert2Px(37);
	iHeight = iSliderH * ((_MaxLevel + 1) / iMaxLevel) + 1;
	Wa.style.height = convert2Px(iHeight);
	Wa.style.overflow = "hidden";
	var Hc = 0;
	var g = this;
	var F = new MBR(Hc, 0, Hc + 37, iSliderH * ((_MaxLevel + 1) / iMaxLevel) + 3);
	var oe = divCreator.create(Gh, 37, 14, Hc, 10, 2, false);
	oe.title = _mZoomDrag;
	switch(EzServerClient.GlobeParams.ZoomLevelSequence) {
		case 0:
		case 3:
			var Hd = divCreator.create(EzServerClient.GlobeParams.ei_descend22, 15, iSliderH, 11, 1, 1, false);
			break;
		case 1:
			var Hd = divCreator.create(EzServerClient.GlobeParams.ei_ascend24, 15, iSliderH, 11, 0, 1, false);
			Hd.style.top = (parseInt(Hd.style.top) - sliderBarHeightLevel * 12) + "px";
			Hd.style.clip = "rect(" + (12 * sliderBarHeightLevel) + "px 50px " + iSliderH + "px 0px)";
			break;
		case 2:
			var Hd = divCreator.create(EzServerClient.GlobeParams.ei_ascend24, 15, iSliderH, 11, 0, 1, false);
			Hd.style.top = (parseInt(Hd.style.top) - sliderBarHeightLevel * 12) + "px";
			Hd.style.clip = "rect(" + (12 * sliderBarHeightLevel) + "px 50px " + (iSliderH - 11) + "px 0px)";
			break
	}
	setCursor(Hd, "pointer");
	Hd.title = _mZoomSet;
	Wa.appendChild(Hd);
	Wa.appendChild(oe);
	p.appendChild(Wa);
	var Ud = new DragEvent(oe, Hc, EzServerClient.GlobeFunction.zoomLevel2sliderPixelPosition(this.getZoomLevel(), EzServerClient.GlobeParams.PerZoomLevelPixel, EzServerClient.GlobeParams.MapMaxLevel, EzServerClient.GlobeParams.ZoomLevelSequence), F);
	this.onzoom = function() {
		Ud.moveTo(Hc, EzServerClient.GlobeFunction.zoomLevel2sliderPixelPosition(this.getZoomLevel(), EzServerClient.GlobeParams.PerZoomLevelPixel, EzServerClient.GlobeParams.MapMaxLevel, EzServerClient.GlobeParams.ZoomLevelSequence))
	};
	Ud.ondragend = function() {
		var Ai = Ud.top + 5;
		var iLevel = EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel(Ai, EzServerClient.GlobeParams.PerZoomLevelPixel, EzServerClient.GlobeParams.MapMaxLevel, EzServerClient.GlobeParams.ZoomLevelSequence);
		g.zoomTo(iLevel)
	};
	BindingEvent(Hd, "click", function(b) {
		var o;
		if(window.event) {
			o = window.event.offsetY
		} else {
			if(b.layerY) {
				o = b.layerY
			} else {
				var Ad = ObjectOffset(Wa);
				o = b.pageY - Ad.y - 2
			}
		}
		S(b);
		var level = EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel(o, EzServerClient.GlobeParams.PerZoomLevelPixel, EzServerClient.GlobeParams.InnerMaxZoomLevel, EzServerClient.GlobeParams.ZoomLevelSequence);
		g.zoomTo(level)
	})
};
MainFrame.prototype.getRelativeZoomSliderPos = function(a) {
	var iPos;
	if(typeof a != "undefined") {
		iPos = a * 12
	} else {
		iPos = this.realZoomLevel * 12
	}
	return iPos
};
MainFrame.prototype.getZoomFromRelativeCoord = function(o) {
	var Z = Math.floor((o - 1) / 12);
	return Math.max(0, Math.min(this.baseLayer.maxZoomLevel + 1, Z))
};
MainFrame.prototype.getRoutePath = function() {
	if(!this.routeArray) {
		return null
	}
	var iLength = this.routeArray.length;
	var strPath, x, y;
	var iLeft = this.div.style.left;
	var iTop = this.div.style.top;
	var pStartTime = new Date();
	for(var iIndex = 0; iIndex < iLength; iIndex++) {
		pMonitorInfo = this.routeArray[iIndex];
		pPoint = this.getDivCoord(pMonitorInfo.lon, pMonitorInfo.lat);
		x = pPoint.x - parseInt(iLeft);
		y = pPoint.y - parseInt(iTop);
		if(!strPath) {
			strPath = x + "," + y
		} else {
			strPath = strPath + "," + x + "," + y
		}
	}
	var pEndTime = new Date();
	return strPath
};
MainFrame.prototype.showMapNum = function(str) {
	if(this.mapNumDiv == null) {
		var div = new MapServerControl(str);
		div.style.top = convert2Px(0);
		div.style.left = convert2Px(5);
		div.style.height = convert2Px(15);
		setClass(div, "noprint");
		div.contentDiv.style.cssText = "";
		div.contentDiv.className = "mapNum_div";
		this.container.appendChild(div);
		this.mapNumDiv = div
	}
};
MainFrame.prototype.hideMapNum = function() {
	if(this.mapNumDiv != null) {
		this.container.removeChild(this.mapNumDiv);
		this.mapNumDiv = null
	}
};
MainFrame.prototype.showMapServerControl = function() {
	var uMapServerArr = [];
	var uMe = this;
	var uRight = 10;
	var uWidth = 80;
	var uSpan = 20;
	var uMSC = null;
	if(!this.mapServer.length) {
		for(var i = this.groupLayers.length - 1; i >= 0; i--) {
			uMSC = new MapServerControl(this.groupLayers[i].getName());
			uMSC.style.top = convert2Px(3);
			uMSC.style.right = convert2Px(uRight);
			setClass(uMSC, "noprint");
			EzServerClient.GlobeFunction.addMapServer(uMe, uMSC, this.groupLayers[i]);
			uMapServerArr.push(uMSC);
			this.container.appendChild(uMSC);
			if(uMSC.offsetWidth < uWidth - 20) {
				uMSC.style.width = convert2Px(uWidth)
			} else {
				uMSC.style.width = convert2Px(uMSC.offsetWidth + 20)
			}
		}
		uMSC.children[0].style.fontWeight = "bolder";
		this.mapServer = uMapServerArr
	} else {
		for(var i = this.groupLayers.length; i > this.mapServer.length; i--) {
			uMSC = new MapServerControl(this.groupLayers[i - 1].getName());
			uMSC.style.top = convert2Px(3);
			uMSC.style.right = convert2Px(uRight);
			setClass(uMSC, "noprint");
			EzServerClient.GlobeFunction.addMapServer(uMe, uMSC, this.groupLayers[i - 1]);
			uMapServerArr.push(uMSC);
			this.mapServer.push(uMSC);
			this.container.appendChild(uMSC);
			var browserType = EzServerClient.GlobeParams.BrowserTypeAndVersion;
			if(uMSC.offsetWidth < uWidth - 20) {
				uMSC.style.width = convert2Px(uWidth)
			} else {
				uMSC.style.width = convert2Px(uMSC.offsetWidth + 20)
			}
		}
		for(var i = this.mapServer.length - 1; i >= 0; i--) {
			this.mapServer[i].style.right = convert2Px(uRight);
			uWidth = this.mapServer[i].offsetWidth;
			uRight = uRight + uWidth + uSpan
		}
	}
};
MainFrame.prototype.setMapSource = function(vGroupLayer) {
	this.baseGroupLayer = vGroupLayer;
	this.baseLayer = vGroupLayer.getLayers()[0];
	this.bSwitchMap = true;
	this.bInitMap = false;
	this.initializeMap();
	this.bSwitchMap = false
};
MainFrame.prototype.createServerControl = function(Id) {
	var h = document.createElement("div");
	h.onselectstart = _NoAction;
	h.className = "mapServerControl";
	var pTextDiv = document.createElement("div");
	pTextDiv.className = "mapServerControlShadow";
	pTextDiv.innerHTML = Id;
	pTextDiv.noWrap = true;
	h.appendChild(pTextDiv);
	return h
};
MainFrame.prototype.showButtonTip = function() {
	var tip = this.createDiv("点击右键结束");
	tip.style.backgroundColor = "#004C78";
	tip.style.border = "1px solid red";
	tip.noWrap = true;
	tip.style.zIndex = 10000;
	tip.style.display = "none";
	this.container.appendChild(tip);
	this.buttonTip = tip
};
MainFrame.prototype.showCopyright = function() {
	if(!this.copyRightLabel) {
		var ne = this.createDiv(_mCopyright);
		ne.style.left = convert2Px(3);
		ne.style.bottom = convert2Px(3);
		this.container.appendChild(ne);
		this.copyRightLabel = ne;
		setClass(this.copyRightLabel, "noprint")
	}
	this.copyRightLabel.style.display = ""
};
MainFrame.prototype.createMapScale = function() {
	if(this.mapScale != null) {
		return
	}
	var mapScale = new Array();
	var strScale = "1:" + _m_MapBottomScale * Math.pow(2, this.realZoomLevel);
	this.scaleTxt = document.createElement("div");
	this.scaleTxt.style.border = "1px solid #000";
	this.scaleTxt.style.fontSize = "2px";
	this.scaleTxt.style.position = "absolute";
	this.scaleTxt.style.backgroundColor = "black";
	this.scaleTxt.style.right = convert2Px(50);
	this.scaleTxt.style.bottom = convert2Px(13);
	this.scaleTxt.style.width = "100px";
	this.scaleTxt.style.height = "2px";
	setClass(this.scaleTxt, "noprint");
	this.container.appendChild(this.scaleTxt);
	mapScale.push(this.scaleTxt);
	this.scaleRightTxt = createTxt("");
	this.scaleRightTxt.style.right = convert2Px(50);
	this.scaleRightTxt.style.bottom = convert2Px(23);
	this.container.appendChild(this.scaleRightTxt);
	setClass(this.scaleRightTxt, "noprint");
	mapScale.push(this.scaleRightTxt);
	this.mapScale = mapScale;
	this.refreshMapScale();
	if(typeof bIsFloatFuncLoaded != "undefined" && bIsFloatFuncLoaded && typeof _bIsResultTable != "undefined" && _bIsResultTable) {
		this.floatResultDiv = initFloatDiv(240, 300, document.body)
	}
};
MainFrame.prototype.showInfoFrame = function(pEle, bIsInScreen) {
	var pMon = pEle.monitor;
	if(this.pWinInfo) {
		delete this.pWinInfo;
		this.pWinInfo = null
	}
	this.openInfoWindow(pMon.lon, pMon.lat, pMon, bIsInScreen)
};
MainFrame.prototype.openInfoWindow = function(lon, lat, html, bIsInScreen, width, height) {
	var pIcon = new Icon("eleInfo", 150, 150, new Point(10, 10), new Point(10, 10), new Point(10, 10), "ffff", 30, null);
	var pIconInfo = new IconInfo("", pIcon);
	this.pWinInfo = new InfoObj("wowo", new Point(lon, lat), pIconInfo, "size=44", html);
	this.pWinInfo.bIsVisable = true;
	this.bInfoHasCloseClick = false;
	this.bIsInScreen = bIsInScreen;
	this.infoWidth = width;
	this.infoHeight = height;
	this.showInfoWindow(this.pWinInfo)
};
MainFrame.prototype.hideInfoFrame = function() {
	this.infoResultDiv.style.display = "none"
};
MainFrame.prototype.createDiv = function(Id) {
	var h = document.createElement("div");
	h.style.position = "absolute";
	setCursor(h, "default");
	h.unselectable = "on";
	h.onselectstart = _NoAction;
	h.innerHTML = Id;
	h.style.fontSize = convert2Px(11);
	h.style.fontFamily = "Arial, sans serif";
	h.style.MozUserSelect = "none";
	h.style.color = "black";
	return h
};
MainFrame.prototype.hideCopyright = function() {
	if(this.copyRightLabel) {
		this.copyRightLabel.style.display = "none"
	}
};
MainFrame.prototype.hideMapServer = function() {
	var pMapServer = this.mapServer;
	if(pMapServer) {
		for(var iIndex = 0; iIndex < pMapServer.length; iIndex++) {
			pMapServer[iIndex].style.display = "none"
		}
	}
};
MainFrame.prototype.showMapServer = function() {
	var pMapServer = this.mapServer;
	if(pMapServer) {
		for(var iIndex = 0; iIndex < pMapServer.length; iIndex++) {
			pMapServer[iIndex].style.display = ""
		}
	}
};
MainFrame.prototype.createScaleImg = function(strImgURL) {
	var h = document.createElement("div");
	h.style.position = "absolute";
	setCursor(h, "default");
	h.unselectable = "on";
	h.onselectstart = _NoAction;
	var pScaleImg = document.createElement("img");
	pScaleImg.src = strImgURL;
	h.appendChild(pScaleImg);
	return h
};
MainFrame.prototype.createSmallPanningControls = function(p) {
	return this.createPanningControls(p)
};
MainFrame.prototype.createSmallZoomControls = function(p) {
	var g = this;
	var ab = divCreator.create(hi, 15, 15, 20, 70, 1, false);
	setCursor(ab, "pointer");
	BindingEvent(ab, "click", function(b) {
		if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
			g.zoomTo(g.getZoomLevel() - 1)
		} else {
			if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
				g.zoomTo(g.getZoomLevel() + 1)
			}
		}
		S(b)
	});
	ab.title = _mZoomIn;
	p.appendChild(ab);
	var iTop = 100;
	var bb = divCreator.create(Zh, 15, 15, 20, iTop, 1, false);
	setCursor(bb, "pointer");
	BindingEvent(bb, "click", function(b) {
		if(EzServerClient.GlobeParams.ZoomLevelSequence == 0 || EzServerClient.GlobeParams.ZoomLevelSequence == 3) {
			g.zoomTo(g.getZoomLevel() + 1)
		} else {
			if(EzServerClient.GlobeParams.ZoomLevelSequence == 1 || EzServerClient.GlobeParams.ZoomLevelSequence == 2) {
				g.zoomTo(g.getZoomLevel() - 1)
			}
		}
		S(b)
	});
	bb.title = _mZoomOut;
	p.appendChild(bb)
};
MainFrame.prototype.changeDragMode = function(mode, inputPanel, inputPanel2, callback, bDisplay) {
	var pMap = this;
	pMap.bIsPan = true;
	if(typeof bDisplay == "undefined") {
		this.bDisplay = false
	} else {
		this.bDisplay = bDisplay
	}
	if(this.bDisplay) {
		if(this.titles) {
			for(var i = 0; i < this.titles.length; i++) {
				this.removeOverlay(this.titles[i])
			}
		}
	}
	if(inputPanel) {
		pMap.outputPanel = inputPanel
	} else {
		pMap.outputPanel = new EzPointStr()
	}
	if(pMap.buttonTip != null) {
		pMap.buttonTip.style.display = "none"
	}
	var pMouseDownhander = null;
	if(inputPanel2) {
		pMap.outputPanel2 = inputPanel2
	} else {
		pMap.outputPanel2 = null
	}
	if(pMap.vmlDraw != null && mode != "pan") {
		this.removeOverlay(pMap.vmlDraw);
		pMap.vmlDraw = null
	}
	if(mode == "measure") {
		this.measureLength(callback);
		return
	} else {
		if(mode == "pan") {
			pMap.container.style.cursor = "move";
			pMap.dragObject.ondrag = pMap.eventHandler("onDrag");
			pMap.dragObject.ondragstart = pMap.eventHandler("onDragStart");
			pMap.dragObject.ondragend = pMap.eventHandler("onDragEnd");
			pMouseDownhander = pMap.dragObject.eventHandler("onMouseDown");
			if(pMap.dragObject.mouseMoveHandler) {
				unbindingEvent(pMap.dragObject.src, "mousemove", pMap.dragObject.mouseMoveHandler)
			}
			pMap.dragObject.mouseMoveHandler = pMap.dragObject.eventHandler("onMouseMove")
		} else {
			if(mode == "drawRect" || mode == "drawCircle" || mode == "zoomInExt" || mode == "zoomOutExt") {
				if(mode == "drawRect" || mode == "drawCircle") {
					pMap.container.style.cursor = "default"
				} else {
					mode = "drawRect";
					pMap.bIsPan = true
				}
				pMap.dragObject.ondragstart = pMap.eventHandler("drawStart");
				pMap.dragObject.ondragend = pMap.eventHandler("drawEnd");
				if(pMap.dragObject.mouseMoveHandler) {
					unbindingEvent(pMap.dragObject.src, "mousemove", pMap.dragObject.mouseMoveHandler)
				}
				pMap.dragObject.mouseMoveHandler = pMap.eventHandler("drawMove");
				BindingEvent(pMap.dragObject.src, "mousemove", pMap.dragObject.mouseMoveHandler);
				pMouseDownhander = pMap.dragObject.eventHandler("onMouseDown")
			} else {
				if(mode == "drawPolyline" || mode == "drawPolygon") {
					pMap.container.style.cursor = "crosshair";
					pMap.dragObject.ondragstart = null;
					pMap.dragObject.ondragend = null;
					pMap.dragObject.mouseMoveHandler = null;
					pMouseDownhander = pMap.eventHandler("drawMouseDown");
					if(pMap.dragObject.mouseMoveHandler) {
						unbindingEvent(pMap.dragObject.src, "mousemove", pMap.dragObject.mouseMoveHandler)
					}
					pMap.dragObject.mouseMoveHandler = pMap.eventHandler("drawMove");
					BindingEvent(pMap.dragObject.src, "mousemove", pMap.dragObject.mouseMoveHandler)
				} else {
					if(mode == "drawPoint") {
						pMap.container.style.cursor = "crosshair";
						pMap.dragObject.ondragstart = null;
						pMap.dragObject.ondragend = null;
						pMap.dragObject.mouseMoveHandler = null;
						pMouseDownhander = pMap.eventHandler("drawMouseDown")
					}
				}
			}
		}
	}
	if(pMap.dragObject.mouseDownHandler) {
		unbindingEvent(pMap.dragObject.src, "mousedown", pMap.dragObject.mouseDownHandler)
	}
	pMap.dragObject.mouseDownHandler = pMouseDownhander;
	BindingEvent(pMap.dragObject.src, "mousedown", pMap.dragObject.mouseDownHandler);
	pMap.drawMode = mode;
	if(mode != "pan") {
		_callback = callback;
		pMap.dragObject.bIsPan = false
	} else {
		pMap.dragObject.bIsPan = true
	}
	this.setTimeout("this.container.focus()", 100)
};
MainFrame.prototype.measureLength = function(callback) {
	this.container.style.cursor = "crosshair";
	var pMe = this;

	function measureLength_getLength() {
		if(!pMe.vmlDraw) {
			return
		}
		iLength = pMe.vmlDraw.getLength();
		iLength = Math.ceil(iLength);
		var strLength = "";
		if(iLength > 1000) {
			iLength = iLength / 1000;
			strLength = iLength + "公里"
		} else {
			strLength = iLength + "米"
		}
		if(typeof callback == "function") {
			callback(strLength)
		} else {
			alert("距离总长:" + strLength)
		}
	}
	this.changeDragMode("drawPolyline", null, null, measureLength_getLength)
};
MainFrame.prototype.measureArea = function(callback) {
	this.container.style.cursor = "crosshair";
	var pMe = this;

	function measureArea_getArea() {
		if(!pMe.vmlDraw) {
			return
		}
		var dArea = pMe.vmlDraw.getArea();
		dArea = Math.ceil(dArea);
		var strArea = "";
		if(dArea > 1000000) {
			dArea = dArea / 1000000;
			strArea = dArea + "平方公里"
		} else {
			strArea = dArea + "平方米"
		}
		if(typeof callback == "function") {
			callback(strArea)
		} else {
			alert("总面积为:" + strArea)
		}
	}
	this.changeDragMode("drawPolygon", null, null, measureArea_getArea)
};
MainFrame.prototype.cancelTrackMonitorStepByStep = function() {
	if(this.trackTimeOut) {
		clearTimeout(this.trackTimeOut)
	}
};
MainFrame.prototype.convert2WPoint = function(x, y) {
	var pDivCoord = this.getDivCoord(x, y);
	var x = pDivCoord.x - parseInt(this.div.style.left);
	var y = pDivCoord.y - parseInt(this.div.style.top);
	x = Math.round(x);
	y = Math.round(y);
	delete pDivCoord;
	return new Point(x, y)
};
MainFrame.prototype.convert2LonLat = function(left, top) {
	var iLeft = parseInt(this.div.style.left);
	var iTop = parseInt(this.div.style.top);
	var pMBR = this.getBoundsLatLng();
	var pp1 = this.baseLayer.convertPosByFlatMatrix(pMBR.minX, pMBR.minY);
	pMBR.minX = pp1.x;
	pMBR.minY = pp1.y;
	var pp2 = this.baseLayer.convertPosByFlatMatrix(pMBR.maxX, pMBR.maxY);
	pMBR.maxX = pp2.x;
	pMBR.maxY = pp2.y;
	var dx = pMBR.minX + (left + iLeft) / this.viewSize.width * pMBR.getSpanX();
	var dy = pMBR.maxY - (top + iTop) / this.viewSize.height * pMBR.getSpanY();
	var pp = this.baseLayer.convertPosByFlatMatrixInverse(dx, dy);
	dx = pp.x;
	dy = pp.y;
	return new Point(dx, dy)
};
MainFrame.prototype.about = function() {
	var m_Version = "版权所有(2002-2010) 北京山海经纬信息技术有限公司 www.easymap.com.cn.";
	alert(m_Version)
};
MainFrame.prototype.addControl = function(pControl) {
	this.container.appendChild(pControl.div);
	if(pControl.init) {
		pControl.init(this)
	} else {
		pControl.init(this)
	}
};
MainFrame.prototype.showVersion = function(strVersion) {
	var pMapServer = EzServerClient.GlobeParams.VersionArr[strVersion];
	if(pMapServer != null) {
		if(pMapServer instanceof MapServer) {
			var uMapSrcURLLen = EzServerClient.GlobeParams.MapSrcURL.length;
			var uMapServerURLLen = pMapServer.getMapServerURLCount();
			if(uMapSrcURLLen > uMapServerURLLen) {
				EzServerClient.GlobeParams.MapSrcURL.splice(uMapServerURLLen, uMapSrcURLLen - uMapServerURLLen)
			} else {
				if(uMapSrcURLLen < uMapServerURLLen) {
					for(var i = 0; i < uMapServerURLLen - uMapSrcURLLen; i++) {
						EzServerClient.GlobeParams.MapSrcURL.push([])
					}
				}
			}
			for(var i = 0; i < uMapServerURLLen; i++) {
				EzServerClient.GlobeParams.MapSrcURL[i][0] = pMapServer.getMapDispName(i);
				EzServerClient.GlobeParams.MapSrcURL[i][1] = pMapServer.getMapServerURL(i)
			}
			_VectorMapService = EzServerClient.GlobeParams.MapSrcURL[0];
			this.hideMapServer();
			this.showMapServerControl();
			this.setMapSource(EzServerClient.GlobeParams.MapSrcURL[0])
		} else {
			if(pMapServer instanceof EzServerClient.GroupLayer) {
				var uMapSrcURLLen = EzServerClient.GlobeParams.MapSrcURL.length;
				var uMapServerURLLen = pMapServer.getLayers().length;
				if(uMapSrcURLLen > uMapServerURLLen) {
					EzServerClient.GlobeParams.MapSrcURL.splice(uMapServerURLLen, uMapSrcURLLen - uMapServerURLLen)
				} else {
					if(uMapSrcURLLen < uMapServerURLLen) {
						for(var i = 0; i < uMapServerURLLen - uMapSrcURLLen; i++) {
							EzServerClient.GlobeParams.MapSrcURL.push([])
						}
					}
				}
				this.hideMapServer();
				this.showMapServerControl();
				this.setMapSource(pMapServer)
			} else {
				alert("没有[" + strVersion + "]版本的数据！")
			}
		}
	} else {
		alert("没有版本数据！")
	}
};
MainFrame.prototype.containerCoord2Map = function(vContainerCoord) {
	try {
		var pCoordx = vContainerCoord.x;
		var pCoordy = vContainerCoord.y;
		var pCenterLatLng = this.getCenterLatLng();
		var pp1 = this.baseLayer.convertPosByFlatMatrix(pCenterLatLng.x, pCenterLatLng.y);
		pCenterLatLng.x = pp1.x;
		pCenterLatLng.y = pp1.y;
		var Lng = pCenterLatLng.x + (pCoordx - this.viewSize.width / 2) * this.baseLayer.tileInfo.levelDetails[this.realZoomLevel].resolution;
		var Lat = pCenterLatLng.y - (pCoordy - this.viewSize.height / 2) * this.baseLayer.tileInfo.levelDetails[this.realZoomLevel].resolution;
		var pp = this.baseLayer.convertPosByFlatMatrixInverse(Lng, Lat);
		Lng = pp.x;
		Lat = pp.y;
		var pointLngLat = new Point(Lng, Lat);
		return pointLngLat
	} catch(e) {
		throw e
	}
};
MainFrame.prototype.mapCoord2container = function(vMapCoord) {
	var uBC = this.baseLayer.convertMap2Bitmap(vMapCoord.x, vMapCoord.y, this.realZoomLevel);
	var uBB = this.getBoundsBitmap();
	var px = uBC.x - uBB.minX;
	var py = uBB.maxY - uBC.y;
	return new Point(Math.round(px / (uBB.maxX - uBB.minX) * this.viewSize.width), Math.round(py / (uBB.maxY - uBB.minY) * this.viewSize.height))
};
MainFrame.prototype.getMouseMapX = function() {
	return this.mouseLng
};
MainFrame.prototype.getMouseMapY = function() {
	return this.mouseLat
};
EzServerClient.GlobeParams.MapLoadCheckHandle = null;
EzServerClient.GlobeFunction.mapImgLoadEventFunc = function(vMainFrameInstance) {
	return function() {
		var uTilePicList = document.getElementsByName("ezmap_tilepicture_img");
		for(var i = 0; i < uTilePicList.length; i++) {
			if(uTilePicList[i].readyState == "loading") {
				return
			}
			if(uTilePicList[i].readyState == "complete") {
				continue
			}
		}
		window.clearInterval(EzServerClient.GlobeParams.MapLoadCheckHandle);
		EzEvent.map = vMainFrameInstance.mapPeer;
		EzEvent.ezEventListener.source = vMainFrameInstance;
		EzEvent.ezEventListener.eventType = EzEvent.MAP_READY;
		EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
	}
};
EzServerClient.GlobeFunction.addMapServer = function(vMe, vMSC, vGroupLayer) {
	BindingEvent(vMSC, "click", function(b) {
		var preLayer = null;
		var currentLayer = null;
		if(vMe.baseLayer instanceof EzServerClient.Layer.LonlatTileLayer) {
			vMe.preLayer = "lonlat"
		}
		if(vMe.baseLayer instanceof EzServerClient.Layer.MercatorTileLayer) {
			vMe.preLayer = "mercator"
		}
		var baseLayer = vGroupLayer.getLayers()[0];
		if(baseLayer instanceof EzServerClient.Layer.LonlatTileLayer) {
			vMe.currentLayer = "lonlat"
		}
		if(baseLayer instanceof EzServerClient.Layer.MercatorTileLayer) {
			vMe.currentLayer = "mercator"
		}
		vMe.setMapSource(vGroupLayer);
		var uMapServer = null;
		for(var i = 0; i < vMe.mapServer.length; i++) {
			uMapServer = vMe.mapServer[i];
			if(uMapServer == vMSC) {
				uMapServer.children[0].style.fontWeight = "bolder";
				EzEvent.preLayer = preLayer;
				EzEvent.currentLayer = currentLayer;
				var previousIndex = vMe.currentMapServerIndex;
				vMe.currentMapServerIndex = vMe.mapServer.length - i - 1;
				EzEvent.mapServerIndexPrevious = previousIndex;
				EzEvent.mapServerIndex = vMe.currentMapServerIndex;
				EzEvent.ezEventListener.source = vMe;
				EzEvent.ezEventListener.eventType = EzEvent.MAP_SWITCHMAPSERVER;
				EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
			} else {
				uMapServer.children[0].style.fontWeight = ""
			}
		}
	})
};
EzServerClient.GlobeFunction.sliderPixelPosition2ZoomLevel = function(position, perLevelHeight, maxZoomLevelCount, sequence) {
	switch(sequence) {
		case 0:
		case 3:
			return Math.floor(position / perLevelHeight);
		case 1:
		case 2:
			return maxZoomLevelCount - Math.floor(position / perLevelHeight)
	}
};
EzServerClient.GlobeFunction.zoomLevel2sliderPixelPosition = function(zoomLevel, perLevelHeight, maxZoomLevelCount, sequence) {
	switch(sequence) {
		case 0:
		case 3:
			return perLevelHeight * zoomLevel;
		case 1:
		case 2:
			return(maxZoomLevelCount - zoomLevel) * perLevelHeight
	}
};
MainFrame.prototype.onMapMouseDown = function(e) {
	EzEvent.ezEventListener.source = this;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_MOUSEDOWN;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
};
MainFrame.prototype.onMapMouseMove = function(e) {
	var mapPoint = new Point(this.getMouseMapX(), this.getMouseMapY());
	EzEvent.ezEventListener.source = this;
	EzEvent.mapPoint = mapPoint;
	if(this.bIsMercatorMap) {
		mapPoint = this.latlon2Meters(mapPoint)
	}
	EzEvent.screenPoint = this.mapCoord2container(mapPoint);
	EzEvent.ezEventListener.eventType = EzEvent.MAP_MOUSEMOVE;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
};
MainFrame.prototype.onMapMouseOver = function(e) {
	EzEvent.ezEventListener.source = this;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_MOUSEOVER;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
};
MainFrame.prototype.onMapMouseOut = function(e) {
	EzEvent.ezEventListener.source = this;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_MOUSEOUT;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
};
MainFrame.prototype.onMapMouseUp = function(e) {
	EzEvent.ezEventListener.source = this;
	EzEvent.ezEventListener.eventType = EzEvent.MAP_MOUSEUP;
	EzEvent.trigger(EzEvent.ezEventListener, EzEvent)
};
MainFrame.prototype.addEventDiv = function() {
	var mainPeer = this;
	this.divEvent = document.createElement("div");
	this.divEvent.style.position = "absolute";
	this.divEvent.style.zIndex = 10;
	if(EzServerClient.GlobeParams.BrowserTypeAndVersion.indexOf("IE") != -1) {
		this.divEvent.style.filter = "alpha(opacity=0)";
		this.divEvent.style.backgroundColor = "white"
	}
	this.divEvent.tlOffset = 400;
	this.divEvent.style.width = this.viewSize.width + this.divEvent.tlOffset + "px";
	this.divEvent.style.height = this.viewSize.height + this.divEvent.tlOffset + "px";
	var pPoint = mainPeer.getCenterLatLng();
	var pDivPoint = mainPeer.convert2WPoint(pPoint.x, pPoint.y);
	this.divEvent.style.left = (pDivPoint.x - this.viewSize.width / 2) - this.divEvent.tlOffset + "px";
	this.divEvent.style.top = (pDivPoint.y - this.viewSize.height / 2) - this.divEvent.tlOffset + "px";
	this.div.appendChild(this.divEvent);
	this.addStateListener(function() {
		var pPoint = mainPeer.getCenterLatLng();
		var pDivPoint = mainPeer.convert2WPoint(pPoint.x, pPoint.y);
		mainPeer.divEvent.style.left = (pDivPoint.x - mainPeer.viewSize.width / 2) - mainPeer.divEvent.tlOffset + "px";
		mainPeer.divEvent.style.top = (pDivPoint.y - mainPeer.viewSize.height / 2) - mainPeer.divEvent.tlOffset + "px"
	})
};
MainFrame.prototype.getAreaObjById = function(id) {
	var area = document.getElementById(id);
	return area
};
MainFrame.prototype.areaOnclick = function(area) {
	area.onclick()
};
MainFrame.prototype.dataFromEzMapService = function(vHotSpot, serverUrl, proxUrl) {
	var pMe = this;
	var indoorMap = new IndoorMap(vHotSpot, pMe);
	indoorMap.setDataSource("EzMapService");
	indoorMap.setServerUrl(serverUrl);
	indoorMap.setProxUrl(proxUrl);
	indoorMap.showIndoorMap()
};
MainFrame.prototype.dataFromEzServer = function(currentLevel, colrowlevel, serverUrl, findId, proxUrl, vHotSpot) {
	var vMap = this;
	var getdata = null;
	var level = vMap.realZoomLevel + vMap.zoomOffset;
	var url = serverUrl + "/z" + currentLevel + "/x" + colrowlevel.col + "/z" + currentLevel + "_x" + colrowlevel.col + "_y" + colrowlevel.row;
	var sendurl = null;
	if(proxUrl) {
		sendurl = proxUrl + "?request=gotourl&url=" + encodeURIComponent(url) + "&time=" + new Date().getTime().valueOf()
	} else {
		sendurl = url + "&time=" + new Date().getTime().valueOf()
	}

	function findID(id, array) {
		for(var i = 0; i < array.length; i++) {
			if(array[i].ID == id) {
				return array[i]
			}
		}
		return -1
	}
	EzServerClient.AsynAddIndoorByAjax(sendurl, function(hot) {
		hot = hot.replace(/((\r\n)+)$/, "").replace(/\r\n/g, ",").replace(/(.\d+)$/, "");
		eval("var hotspots=" + hot);
		var content = hotspots;
		getdata = content;
		vMap.oIndoorData = getdata;
		var oAllobj = vMap.showIndoorMap(getdata, vHotSpot);
		if(oAllobj == "-1" || oAllobj == "-2") {
			vMap.bIsOpenIndoorMap = false;
			vMap.bIsDeleteIndoorMap = false;
			vMap.tempBordorData = [];
			vMap.tempFloorData = [];
			vMap.initializeMap();
			return
		}
	})
};
MainFrame.prototype.loadIndoorMap = function(vHotSpot) {
	var vMap = this;
	if(EzServerClient.GlobeParams.displayLevel) {
		var displayLevel = EzServerClient.GlobeParams.displayLevel;
		vMap.zoomTo(displayLevel[0])
	} else {
		vMap.zoomTo(vMap.mapMaxLevel - 2)
	}
	vMap.bIsOpenIndoorMap = true;
	var findId = vHotSpot.ID;
	var serverUrl = EzServerClient.GlobeParams.serverURL;
	var proxUrl = EzServerClient.GlobeParams.proyURL;
	var center = new Point(vHotSpot.X, vHotSpot.Y);
	var currentLevel = vMap.realZoomLevel + vMap.zoomOffset;
	var xyz = new EzServerClient.MapPositionZ(center.x, center.y, vMap.realZoomLevel);
	var colrowlevel = vMap.baseLayer.toTileCoords(xyz);
	if(EzServerClient.GlobeParams.source == "EzServer") {
		vMap.dataFromEzServer(currentLevel, colrowlevel, serverUrl, findId, proxUrl, vHotSpot)
	} else {
		if(EzServerClient.GlobeParams.source == "EzMapService") {
			vMap.dataFromEzMapService(vHotSpot, serverUrl, proxUrl)
		}
	}
};
MainFrame.prototype.showIndoorMap = function(getdata, vHotSpot) {
	var vMap = this;
	if(getdata == "-1") {
		return -1
	}
	if(typeof(getdata.CONTENT) == "undefined") {
		return -2
	}

	function compare(a, b) {
		if(a.level > b.level) {
			return 1
		}
		if(a.level == b.level) {
			return 0
		}
		if(a.level < b.level) {
			return -1
		}
	}
	var floors = getdata.CONTENT.floors.sort(compare);
	var data = getdata.CONTENT.indoorData.sort(compare);
	var oBuildLevelUp = 1;
	var oBuildLevelDown = 0;
	var oSelect = null;
	if(typeof(vHotSpot.BUILDFUP) == "undefined" && typeof(vHotSpot.BUILDFDOWN) == "undefined") {
		oBuildLevelUp = data.length;
		oBuildLevelDown = 0
	}
	if(typeof(vHotSpot.BUILDFUP) != "undefined") {
		oBuildLevelUp = vHotSpot.BUILDFUP
	} else {
		oBuildLevelUp = 1
	}
	if(typeof(vHotSpot.BUILDFDOWN) != "undefined") {
		oBuildLevelDown = vHotSpot.BUILDFDOWN
	} else {
		oBuildLevelDown = 0
	}
	vMap.oBuildLevelDown = oBuildLevelDown;
	oSelect = this.showFloorControl(oBuildLevelUp, oBuildLevelDown);
	this.showIndoorBox(vHotSpot.GEOMETRY);
	var initBuildLevel = 1;
	if(typeof(EzServerClient.GlobeParams.initBuildFloorLevel) != "undefined") {
		initBuildLevel = EzServerClient.GlobeParams.initBuildFloorLevel
	}
	var iSelentNum = 0;
	if(initBuildLevel > 0) {
		iSelentNum = initBuildLevel + oBuildLevelDown - 1
	} else {
		if(initBuildLevel < 0) {
			iSelentNum = initBuildLevel + oBuildLevelDown
		} else {
			iSelentNum = 1
		}
	}
	oSelect.oSelect.options[iSelentNum].selected = true;
	this.showFloor(data, initBuildLevel, oSelect.oSelect);
	oSelect.oSelect.onchange = function(event) {
		var pMe = this;
		var index = oSelect.oSelect.selectedIndex;
		var option = oSelect.oSelect.options[index];
		for(var i = 0, j = pMe.options.length; i <= j; i++) {
			if(option.value == i) {
				if(option.text == "close") {
					vMap.deleteIndoorMap()
				} else {
					oSelect.oSelect.options[i].selected = true;
					var realFloorLevel = 0;
					if(i - oBuildLevelDown < 0) {
						realFloorLevel = i - oBuildLevelDown
					} else {
						realFloorLevel = i - oBuildLevelDown + 1
					}
					vMap.showFloor(data, realFloorLevel, oSelect.oSelect)
				}
			}
		}
	};
	return {
		oFloorControl: oSelect,
		data: data
	}
};
MainFrame.prototype.openIndoorMap = function() {
	EzServerClient.GlobeParams.openIndoorMap = true;
	this.initializeMap()
};
MainFrame.prototype.closeIndoorMap = function() {
	EzServerClient.GlobeParams.openIndoorMap = false;
	this.initializeMap()
};
MainFrame.prototype.setOpenInfo = function(callBack) {
	this.fIndoorFunc = callBack
};
MainFrame.prototype.showFloorControl = function(up, down) {
	if(typeof(up) == "undefined") {
		var up = 1
	}
	if(typeof(down) == "undefined") {
		var down = 0
	}
	var num = parseInt(up) + parseInt(down);
	var pMe = this;
	pMe.levelData = [];
	pMe.indoorBordorData = [];
	var floorControl = document.createElement("div");
	floorControl.style.position = "absolute";
	floorControl.style.left = "100px";
	floorControl.style.top = "30px";
	floorControl.id = "control";
	pMe.floorControl = floorControl;
	var oSelect = document.createElement("select");
	floorControl.appendChild(oSelect);
	for(var i = -down, j = 0; i < 0; i++, j++) {
		var oOption = new Option("level" + i, j);
		oSelect.add(oOption)
	}
	for(var i = 1, j = down; i <= up; i++, j++) {
		var oOption = new Option("level" + i, j);
		oSelect.add(oOption)
	}
	var closeOption = new Option("close", num + 1);
	oSelect.add(closeOption);
	this.container.appendChild(floorControl);
	pMe.indoorSelect = oSelect;
	return {
		oSelect: oSelect,
		ofloorControl: floorControl
	}
};
MainFrame.prototype.closeFloorControl = function() {
	var vMap = this;
	vMap.container.removeChild(vMap.floorControl)
};
MainFrame.prototype.deleteIndoorMap = function() {
	var vMap = this;
	vMap.bIsOpenIndoorMap = false;
	vMap.bIsDeleteIndoorMap = false;
	vMap.tempBordorData = [];
	vMap.tempFloorData = [];
	vMap.clearIndoorData();
	vMap.container.removeChild(vMap.floorControl);
	vMap.initializeMap()
};
MainFrame.prototype.changeFloor = function(level) {
	if(typeof(this.indoorSelect) == "undefined" || level == 0) {
		return
	}
	try {
		var oSelect = this.indoorSelect;
		for(var i = 0; i < oSelect.options.length - 1; i++) {
			var key = oSelect.options[i].text.replace("level", "");
			if(key == level) {
				this.indoorSelect.selectedIndex = i;
				this.indoorSelect.onchange();
				return
			}
		}
	} catch(e) {}
};
MainFrame.prototype.showFloor = function(oLevelData, level, oSelect) {
	var pMe = this;
	if(this.levelData.length != 0) {
		for(var i = 0; i < this.levelData.length; i++) {
			this.removeOverlay(this.levelData[i])
		}
		pMe.levelData = []
	}
	if(typeof(oLevelData) == "undefined") {
		return
	}
	var iDataNum = -1;
	for(var i = 0; i < oLevelData.length; i++) {
		if(level == oLevelData[i].level) {
			iDataNum = i;
			break
		}
	}
	if(iDataNum == -1) {
		return
	}
	oLevelData = oLevelData[iDataNum];
	var func = null;
	if(pMe.fIndoorFunc == null) {
		func = function(e) {
			pMe.openInfoWindow(e.center.x, e.center.y, "请设置click事件函数")
		}
	} else {
		func = pMe.fIndoorFunc
	}
	var oPolygon = [];
	var currentLevel = oLevelData.level;
	pMe.currentBuildFloorlevel = currentLevel;
	var houseData = oLevelData.rooms;
	var fillColor = null;
	var numType = 0;
	var configFillcolor = [];
	if(typeof(EzServerClient.GlobeParams.fillColor) != "undefined") {
		configFillcolor = EzServerClient.GlobeParams.fillColor
	} else {
		configFillcolor = ["#FFDEAD", "#FF7F50", "#F4A460", "#802A2A", "#A39480"]
	}
	for(var i = 0, j = houseData.length; i < j; i++) {
		numType = parseInt(houseData[i].roomType);
		if(numType <= configFillcolor.length) {
			fillColor = configFillcolor[numType - 1]
		} else {
			fillColor = "#FFDEAD"
		}
		oPolygon[i] = new Polygon(houseData[i].geometry, "#FFFFCD", 2, 0, fillColor, houseData[i].title);
		oPolygon[i].addListener("mouseover", function(e) {
			e.elementObj.attr({
				stroke: "#EB8E55"
			})
		}, oPolygon[i]);
		oPolygon[i].addListener("mouseout", function(e) {
			e.elementObj.attr({
				stroke: "#FFFFCD"
			})
		}, oPolygon[i]);
		oPolygon[i].addListener("click", func, houseData[i]);
		pMe.addOverlay(oPolygon[i]);
		pMe.levelData.push(oPolygon[i])
	}
};
MainFrame.prototype.showIndoorBox = function(borderGemotery) {
	var pMe = this;
	if(this.indoorBordorData.length != 0) {
		for(var i = 0, j = this.indoorBordorData.length; i < j; i++) {
			this.removeOverlay(this.indoorBordorData[i])
		}
		this.indoorBordorData = []
	}
	var boxPoints = borderGemotery;
	var boxPolygon = new Polygon(boxPoints, "#FFFFCD", 2, 0.5, "#AAAAAA");
	this.addOverlay(boxPolygon);
	this.indoorBordorData.push(boxPolygon)
};
MainFrame.prototype.clearIndoorData = function() {
	if(this.indoorBordorData.length != 0) {
		for(var i = 0, j = this.indoorBordorData.length; i < j; i++) {
			this.removeOverlay(this.indoorBordorData[i])
		}
		this.indoorBordorData = []
	}
	if(this.levelData.length != 0) {
		for(var i = 0; i < this.levelData.length; i++) {
			this.removeOverlay(this.levelData[i])
		}
		this.levelData = []
	}
};
MainFrame.prototype.switchFloor = function(floorLevel) {
	var uLyrs = this.baseGroupLayer.getLayers();
	var len = uLyrs.length;
	for(var i = 0; i < len; i++) {
		if(uLyrs[i] instanceof EzServerClient.Layer.IndoorMapTileLayer || uLyrs[i] instanceof EzServerClient.Layer.IndoorMapHotSpotTileLayer) {
			uLyrs[i].buildFloorLevel = floorLevel;
			this.currentBuildFloorlevel = floorLevel
		}
	}
	for(var i = len - 1; i >= 0; i--) {
		if(this.groupTileImages[i].length == 0) {
			return
		}
		var a = this.sortImagesFromCenter(this.groupTileImages[i]);
		if(uLyrs[i] instanceof EzServerClient.Layer.IndoorMapHotSpotTileLayer) {
			for(var d = 0; d < a.length; d++) {
				if(d < a.length) {
					this.reconfigureImage3(a[d], uLyrs[i])
				}
			}
		} else {
			if(uLyrs[i] instanceof EzServerClient.Layer.IndoorMapTileLayer) {
				for(var d = 0; d < a.length; d++) {
					if(d < a.length) {
						this.reconfigureImage(a[d], uLyrs[i])
					}
				}
			}
		}
	}
};
MainFrame.prototype.addIndoorLayer = function(buildData, indoorLayer) {
	var indoorLayer = indoorLayer;
	var hotspot = buildData;
	var indoorTl = null;
	var indoorHTl = null;
	if(indoorLayer instanceof Array) {
		for(var i = 0; i < indoorLayer.length; i++) {
			if(indoorLayer[i] instanceof EzServerClient.Layer.IndoorMapTileLayer) {
				indoorTl = indoorLayer[i]
			} else {
				if(indoorLayer[i] instanceof EzServerClient.Layer.IndoorMapHotSpotTileLayer) {
					indoorHTl = indoorLayer[i]
				} else {
					return
				}
			}
		}
	} else {
		if(indoorLayer instanceof EzServerClient.Layer.TileLayer) {
			if(indoorLayer instanceof EzServerClient.Layer.IndoorMapTileLayer) {
				indoorTl = indoorLayer
			} else {
				if(indoorLayer instanceof EzServerClient.Layer.IndoorMapHotSpotTileLayer) {
					indoorHTl = indoorLayer
				} else {
					return
				}
			}
		} else {
			return
		}
	}
	if(indoorTl == null && indoorHTl == null) {
		return
	}
	var id = hotspot.ID;
	var hotLyr = document.getElementById("hotspotLyr");
	if(hotLyr != null) {
		this.hotLyr = hotLyr
	}
	this.filterId = id;
	var layerArr = this.baseGroupLayer.getLayers();
	for(var i = 0; i < layerArr.length; i++) {
		if(layerArr[i] instanceof EzServerClient.Layer.HotSpotTileLayer && !(layerArr[i] instanceof EzServerClient.Layer.IndoorMapHotSpotTileLayer)) {
			if(indoorTl != null) {
				if(!this.bIsAddIndoorTLayer) {
					this.bIsAddIndoorTLayer = true;
					layerArr.splice(i, 0, indoorTl)
				}
			}
		}
	}
	if(indoorTl != null) {
		if(!this.bIsAddIndoorTLayer) {
			this.bIsAddIndoorTLayer = true;
			layerArr.push(indoorTl)
		}
	}
	if(indoorHTl != null) {
		if(!this.bIsAddIndoorHTLayer) {
			this.bIsAddIndoorHTLayer = true;
			layerArr.push(indoorHTl)
		}
	}
	this.initializeMap();
	this.switchFloorControl(hotspot)
};
MainFrame.prototype.getCurrentFloorLevel = function() {
	return this.currentBuildFloorlevel
};
MainFrame.prototype.switchFloorControl = function(hotspot) {
	var pMe = this;
	if(this.floorControl) {
		this.container.removeChild(this.floorControl)
	}
	var oFloorControl = this.showFloorControl(hotspot.BUILDFUP, hotspot.BUILDFDOWN);
	var oSelect = oFloorControl.oSelect;
	for(var i = 0; i < oSelect.options.length - 1; i++) {
		var key = oSelect.options[i].text.replace("level", "");
		if(key == this.currentBuildFloorlevel) {
			oSelect.options[i].selected = true
		}
	}
	oSelect.onchange = function(event) {
		var that = this;
		var index = oSelect.selectedIndex;
		var option = oSelect.options[index];
		for(var i = 0, j = that.options.length; i <= j; i++) {
			if(option.value == i) {
				if(option.text == "close") {
					pMe.container.removeChild(pMe.floorControl);
					pMe.floorControl = null
				} else {
					oSelect.options[i].selected = true;
					var text = option.text;
					var realFloorNum = text.replace("level", "");
					pMe.switchFloor(realFloorNum)
				}
			}
		}
	}
};
MainFrame.prototype.selectOnchange = function(callback) {
	var pMe = this;
	if(this.indoorSelect) {
		this.indoorSelect.$onchange = this.indoorSelect.onchange;
		this.indoorSelect.onchange = function() {
			pMe.indoorSelect.$onchange();
			callback()
		}
	}
};
var _Point = Point;
var _Map = MainFrame;
var _IconClass = Icon;
var _XMLHttp = XMLHttp;
var _MapsApplication = MapsApp;
var EzMap = MapsApp;
var _Timer = Timer;
var _Log = EzLog;
MutiMaps = MultiMaps;
Point.getDistPoint = function(pSPoint, pEPoint, dDist) {
	var pPoint = new Point();
	var dLen = pSPoint.distanceFrom(pEPoint);
	if(dDist > dLen || dLen == 0) {
		return pEPoint
	}
	var dx = pSPoint.x + dDist * (pEPoint.x - pSPoint.x) / dLen;
	var dy = pSPoint.y + dDist * (pEPoint.y - pSPoint.y) / dLen;
	if(isNaN(dx) || isNaN(dy)) {
		alert("坐标计算有问题,x:" + dx + ",:" + dy);
		throw new Error(101, "startPoint:" + pSPoint.toString() + ",endPoint:" + pEPoint.toString() + ",len:" + dLen)
	}
	pPoint.x = dx;
	pPoint.y = dy;
	return pPoint
};
MBR.intersection = function(Qc, td) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(Qc, "MBR")) {
			throw EzErrorFactory.createError("MBR.intersection方法中arguments[0]参数类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(td, "MBR")) {
			throw EzErrorFactory.createError("MBR.intersection方法中arguments[1]参数类型不正确")
		}
		if(Qc.maxX < td.minX || Qc.maxY < td.minY || td.maxX < Qc.minX || td.maxY < Qc.minY) {
			throw EzErrorFactory.createError("arguments[0]和arguments[1]两个MBR之间没有交集")
		} else {
			return new MBR(Math.max(Qc.minX, td.minX), Math.max(Qc.minY, td.minY), Math.min(Qc.maxX, td.maxX), Math.min(Qc.maxY, td.maxY))
		}
	} catch(e) {
		throw EzErrorFactory.createError("MBR.intersection方法执行不正确", e)
	}
};
MBR.union = function(Qc, td) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(Qc, "MBR")) {
			throw EzErrorFactory.createError("MBR.union方法中arguments[0]参数类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(td, "MBR")) {
			throw EzErrorFactory.createError("MBR.union方法中arguments[1]参数类型不正确")
		}
		return new MBR(Math.min(Qc.minX, td.minX), Math.min(Qc.minY, td.minY), Math.max(Qc.maxX, td.maxX), Math.max(Qc.maxY, td.maxY))
	} catch(e) {
		throw EzErrorFactory.createError("MBR.union方法执行不正确", e)
	}
};
MainFrame.sortByPriority = function(a, b) {
	var c = b.priority - a.priority;
	return c
};
MainFrame.orderLocations = function(mf, Ke) {
	if(mf.point.y > Ke.point.y) {
		return -1
	}
	if(mf.point.y < Ke.point.y) {
		return 1
	}
	return 0
};
Icon.classes = {};
Icon.classNames = [];
Icon.getPadding = function() {
	var A = {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	};
	for(var a = 0; a < this.classNames.length; ++a) {
		var ka = this.classes[this.classNames[a]];
		A.top = Math.max(A.top, ka.pointCoord.y);
		A.bottom = Math.max(A.bottom, ka.height - ka.pointCoord.y);
		A.left = Math.max(A.left, ka.pointCoord.x);
		A.right = Math.max(A.right, ka.width - ka.pointCoord.x)
	}
	return A
};
Icon.load = function(r) {
	Icon.classes[r.name] = r;
	Icon.classNames.push(r.name)
};
Icon.get = function(J) {
	return Icon.classes[J]
};
var xh = [9, 0, 6, 1, 4, 2, 2, 4, 0, 8, 0, 12, 1, 14, 2, 16, 5, 19, 7, 23, 8, 26, 9, 30, 9, 34, 11, 34, 11, 30, 12, 26, 13, 24, 14, 21, 16, 18, 18, 16, 20, 12, 20, 8, 18, 4, 16, 2, 15, 1, 13, 0];
Icon.load(new Icon("local", 20, 34, new Point(9, 34), new Point(9, 2), new Point(17, 23), _ImageBaseUrl + "shadow50.png", 37, xh));
Icon.load(new Icon("noicon", 0, 0, new Point(0, 0), new Point(0, 0), new Point(0, 0), null, 0, null));
EzLog.bLog = true;
EzLog.write = function() {};
EzLog.writeRaw = function(Id) {};
EzLog.writeXML = function(Id) {};
EzLog.dump = function(bj) {};
EzLog.incompatible = function() {};
EzLog.clear = function() {};
_debugWin = null;
EzLog.print = function(strInfo) {
	if(_debugWin == null) {
		var strPro = "width=200,height=400";
		strPro = strPro + ",menubar=yes,scrollbars=yes,resizable=no,location=no, status=no";
		_debugWin = window.open("", "default", strPro);
		_debugWin.document.writeln("<html><head><title>地图打印</title><script>function unload(){opener._debugWin=null;}<\/script></head><body onbeforeunload='unload()'></body></html>")
	}
	_debugWin.document.body.innerHTML += "<br>" + strInfo
};
Timer.start = function() {};
Timer.end = function() {};
Timer.addTime = function(Yi) {};
Function.method("inherits", function(parent) {
	var d = 0,
		p = (this.prototype = new parent());
	this.method("uber", function uber(name) {
		var f, r, t = d,
			v = parent.prototype;
		if(t) {
			while(t) {
				v = v.constructor.prototype;
				t -= 1
			}
			f = v[name]
		} else {
			f = p[name];
			if(f == this[name]) {
				f = v[name]
			}
		}
		d += 1;
		r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
		d -= 1;
		return r
	});
	return this
});
Function.method("swiss", function(parent) {
	for(var i = 1; i < arguments.length; i += 1) {
		var name = arguments[i];
		this.prototype[name] = parent.prototype[name]
	}
	return this
});
EzManager.valid = function(user, password, ip) {
	window.status = "进行验证....";
	var pDate = new Date();
	var strurl = m_strBasePath + "/js/EzMap_allow.jsp?UserName=" + user + "&Password=" + password + "&IP=" + ip + "&time=" + pDate.getTime();
	getDataFromServer("log", strurl, function() {
		window.status = "验证....完成"
	})
};
iOverLay.closeInfo = function() {
	if(this.timeout) {
		clearTimeout(this.timeout)
	}
	this.timeout = this.setTimeout("this.closeInfoWait(false)", 0)
};
iOverLay.closeInfoWait = function(bIsNoWait) {
	if(!bIsNoWait && this.bOutOfInfo == false) {
		return
	}
	var pInfoDiv = document.getElementById("InfoDiv");
	if(pInfoDiv) {
		pInfoDiv.style.display = "none"
	}
};
MapsApp.getMeter = function(pPoint, dDegree) {
	var pPoint1 = new Point(pPoint.x + dDegree, pPoint.y);
	var dMeter = GetDistanceInLL(pPoint, pPoint1);
	return dMeter
};
MapsApp.getDegree = function(pPoint, dMeter) {
	var dDegree = 1;
	var pPoint1 = new Point(pPoint.x + dDegree, pPoint.y);
	var dMeter1 = GetDistanceInLL(pPoint, pPoint1);
	var dResult = dDegree * dMeter / dMeter1;
	return dResult
};
MultiMaps.curMap = null;
EzServerClient.GlobeParams.VersionArr = [];
EzServerClient.GlobeParams.VersionInfo = [];
EzServerClient.GlobeParams.VersionInfo.push("defaultMapVersion");
MainFrame.addVersion = function(strVersion, pMapServer) {
	if(pMapServer && pMapServer instanceof MapServer) {
		EzServerClient.GlobeParams.VersionArr[strVersion] = pMapServer;
		EzServerClient.GlobeParams.VersionInfo.push(strVersion)
	} else {
		if(pMapServer && pMapServer instanceof EzServerClient.GroupLayer) {
			EzServerClient.GlobeParams.VersionArr[strVersion] = pMapServer;
			EzServerClient.GlobeParams.VersionInfo.push(strVersion)
		} else {
			alert("pMapServer为空或不是MapServer类型！")
		}
	}
};
MainFrame.getVersionInfo = function() {
	return EzServerClient.GlobeParams.VersionInfo.join(",")
};
MapsApp.getVersionInfo = function() {
	return EzServerClient.GlobeParams.VersionInfo.join(",")
};
MapsApp.addVersion = function(strVersion, pMapServer) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(strVersion, "string")) {
			throw EzErrorFactory.createError("EzMap.addVersion方法中arguments[0]类型不正确")
		}
		if((!EzServerClient.GlobeFunction.isTypeRight(pMapServer, "MapServer")) && (!EzServerClient.GlobeFunction.isTypeRight(pMapServer, "EzServerClient.GroupLayer"))) {
			throw EzErrorFactory.createError("EzMap.addVersion方法中arguments[1]类型不正确")
		}
		MainFrame.addVersion(strVersion, pMapServer)
	} catch(e) {
		throw EzErrorFactory.createError("EzMap.addVersion方法执行不正确", e)
	}
};
EzColorPicker.close = function() {
	if(g_color_palette) {
		g_color_palette.style.display = "none"
	}
};
divCreator.count = 0;
divCreator.createElement = function(strURL, bIsCrop, pDoc) {
	if(typeof arguments.callee.hasFilters == "undefined") {
		var Vh = document.createElement("DIV");
		arguments.callee.hasFilters = typeof Vh.style.filter != "undefined"
	}
	var f;
	var browserType = EzServerClient.GlobeParams.BrowserTypeAndVersion;
	if(!(browserType >= "IE10.0") && arguments.callee.hasFilters && browserType.indexOf("Firefox") == -1) {
		if(!pDoc) {
			pDoc = document
		}
		var pCache = pDoc.PNG_cache;
		if(pCache && pCache.childNodes.length > 0) {
			f = pCache.removeChild(pCache.lastChild)
		} else {
			f = pDoc.createElement("DIV");
			divCreator.destroyBeforeUnload(f)
		}
		if(!f.loader) {
			f.loader = pDoc.createElement("img");
			f.loader.style.visibility = "hidden";
			f.loader.onload = function() {
				if(!f.cleared) {
					f.style.filter = divCreator.alphaImageLoader(this.src, true)
				}
			}
		}
	} else {
		f = document.createElement("img")
	}
	divCreator.setImage(f, strURL, bIsCrop);
	return f
};
divCreator.create = function(strURL, iWidth, iHeight, left, top, iIndex, pDoc, Fa) {
	return Shaderer.create(strURL, iWidth, iHeight, left, top, iIndex, pDoc, Fa, divCreator.createElement)
};
divCreator.alphaImageLoader = function(a, b) {
	var c = "DXImageTransform.Microsoft.AlphaImageLoader";
	var d = ",sizingMethod=" + (b ? "crop" : "scale");
	return "progid:" + c + '(src="' + a + '"' + d + ")"
};
divCreator.remove = function(a, b) {
	if(a.nodeName == "DIV") {
		if(!b.PNG_cache) {
			b.PNG_cache = b.createElement("div");
			b.PNG_cache.style.display = "none";
			b.body.appendChild(b.PNG_cache)
		}
		b.PNG_cache.appendChild(a);
		divCreator.clearImage(a)
	} else {
		RemoveImg(a)
	}
};
Shaderer.create = function(strURL, iWidth, iHeight, left, top, iIndex, bIsCrop, pDoc, func) {
	var f;
	if(!func) {
		f = document.createElement("IMG");
		if(strURL) {
			f.src = strURL
		}
	} else {
		f = func(strURL, bIsCrop, pDoc)
	}
	if(iWidth && iHeight) {
		f.style.width = convert2Px(iWidth);
		f.style.height = convert2Px(iHeight);
		f.width = iWidth;
		f.height = iHeight
	}
	if(top || (left || (top == 0 || left == 0))) {
		f.style.position = "absolute";
		f.style.left = convert2Px(left);
		f.style.top = convert2Px(top)
	}
	if(_IEBrowser.type == 1) {
		f.unselectable = "on";
		f.onselectstart = _NoAction
	} else {
		f.style.MozUserSelect = "none"
	}
	f.style.border = "0";
	f.oncontextmenu = _NoAction;
	return f
};
xa.create = function(Ja) {
	if(!Ja) {
		Ja = "_dtc"
	}
	if(!sb[Ja]) {
		sb[Ja] = 1
	} else {
		sb[Ja]++
	}
	return new xa(sb[Ja], Ja)
};
xa.invalidateAll = function() {
	for(var a in sb) {
		try {
			sb[a]++
		} catch(b) {}
	}
};
xa.invalidate = function(Fa) {
	sb[Fa]++
};
XMLHttp.create = function() {
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP")
	} else {
		if(typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest()
		} else {
			return null
		}
	}
};
V.cache_ = new Object();
V.create = function(ee) {
	return new V(ee)
};
V.getCached = function(Ab) {
	return V.cache_[Ab]
};
V.cache = function(Ab, lg) {
	V.cache_[Ab] = lg
};
V.asynchronousTransform = function(ub, Va, ob, kb, Ja) {
	var nb = V.create();
	nb.transformToHTML(ub, Va);
	if(kb) {
		kb()
	} else {
		alert("no function")
	}
	return
};
delete Object.prototype.setTimeout;
delete Object.prototype.toStringSize;
delete Object.prototype._setTimeoutDispatcher;
delete Object.prototype.eventHandler;
delete Object.prototype.Clone;
if(typeof EzObject == "undefined" || !EzObject) {
	var EzObject = function() {
		this.setTimeout = function(ie, Bi) {
			var ke = "tempVar" + _m_iSeq;
			_m_iSeq++;
			if(_m_iSeq == Number.MAX_VALUE - 1) {
				_m_iSeq = 0
			}
			eval(ke + " = this;");
			if(typeof(ie.replace) != "function") {
				return window.setTimeout(";", Bi)
			} else {
				var Rh = ie.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
				return window.setTimeout(ke + '._setTimeoutDispatcher("' + Rh + '");', Bi)
			}
		};
		this.toStringSize = function(intTmp, size) {
			var str = intTmp + "";
			while(str.length < size) {
				str = "0" + str
			}
			return str
		};
		this._setTimeoutDispatcher = function(ie) {
			eval(ie)
		};
		this.eventHandler = function(tg) {
			var g = this;
			return function(b) {
				if(!b) {
					b = window.event
				}
				if(b && !b.target) {
					b.target = b.srcElement
				}
				g[tg](b)
			}
		};
		this.Clone = function() {
			if(!this.constructor) {
				return this
			}
			var objClone = new this.constructor();
			for(var key in this) {
				if(typeof(this[key]) == "object") {
					if(this[key] != null && typeof(this[key]["Clone"]) == "function") {
						objClone[key] = this[key].Clone()
					} else {
						objClone[key] = this[key]
					}
				} else {
					objClone[key] = this[key]
				}
			}
			if(!objClone || ("" + objClone) == "") {
				return(new String(this) + objClone) ? this : objClone
			} else {
				objClone.toString = this.toString;
				return objClone
			}
		};
		this.dispatchEvent = function(eventType, eventArgs) {
			eventArgs = eventArgs || {};
			var events = this["on" + eventType];
			var called = 0;
			if(events && typeof(events) == "function") {
				events = [events]
			}
			if(!eventArgs.type) {
				eventArgs.type = eventType
			}
			eventArgs.preventDefault = function() {
				eventArgs.defaultOp = null
			};
			eventArgs.stopPropagation = function() {
				eventArgs.cancelBubble = true
			};
			var $pointer = this;
			if(events) {
				for(var i = 0; i < events.length; i++) {
					(function(i) {
						var evt = events[i];
						var len = events.length;
						var capturer = events.capturer;
						var capturerName = events.capturerName;
						return function() {
							called++;
							var ret = evt.call($pointer, eventArgs);
							if(!eventArgs.cancelBubble && called == len && capturer && capturerName && capturer[capturerName]) {
								capturer[capturerName](eventArgs)
							}
							if(called == len && eventArgs.defaultOp) {
								eventArgs.defaultOp.call($pointer, eventArgs)
							}
							return ret
						}
					})(i)()
				}
			} else {
				if(eventArgs.defaultOp) {
					eventArgs.defaultOp.call($pointer, eventArgs)
				}
			}
		};
		this.fireEvent = this.dispatchEvent;
		this.captureEvents = function(target, eventType, capturerName, closure) {
			if(capturerName instanceof Function) {
				closure = capturerName;
				capturerName = null
			}
			capturerName = capturerName || "on" + eventType;
			target["on" + eventType] = target["on" + eventType] || [function() {}];
			var events = target["on" + eventType];
			if(typeof(events) == "function") {
				target["on" + eventType] = [events]
			}
			target["on" + eventType].capturer = this;
			target["on" + eventType].capturerName = capturerName;
			if(closure) {
				this[capturerName] = closure
			}
		};
		this.addEventListener = function(eventType, closure) {
			if(this["on" + eventType] == null) {
				this["on" + eventType] = []
			}
			var events = this["on" + eventType];
			if(events && typeof(events) == "function") {
				this["on" + eventType] = [events];
				events = this["on" + eventType]
			}
			events.push(closure);
			return closure
		};
		this.removeEventListener = function(eventType, closure) {
			var events = this["on" + eventType];
			if(events && typeof(events) == "function") {
				events = [events]
			}
			for(var i = 0; i < events.length; i++) {
				if(events[i] == closure) {
					events.splice(i, 1)
				}
			}
			return closure
		}
	}
}
EzServerClient.GlobeParams.RootObj = new EzObject();
EzServerClient.GlobeFunction.copyProtoFunction = function(pClass, pSrcObj) {
	for(pFunc in pSrcObj) {
		pClass.prototype[pFunc] = pSrcObj[pFunc]
	}
};
try {
	EzServerClient.GlobeFunction.copyProtoFunction(IEBrowser, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(divCreator, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Shaderer, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Ic, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(xa, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(XMLHttp, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Point, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Rect, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MBR, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(OverView, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(nc, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(TrackMonitor, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MainFrame, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(OverlayStatus, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MapServerControl, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MapStatusControl, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(DragEvent, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(InfoObj, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(IconInfo, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Xd, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Icon, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(InfoWind, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(EzLog, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MapsApp, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(EzPointStr, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(EzManager, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(iOverLay, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Polyline, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Polygon, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Rectangle, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Circle, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Marker, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Title, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(LegendFunc, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MultiFeat, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MapControl, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MapStandControl, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MapSmallControl, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MultiMaps, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MapServer, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(MenuObject, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(EzColorPicker, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(EzLayer, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(QueryObject, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(EditObject, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(FeatureObject, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(DWREngine, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
try {
	EzServerClient.GlobeFunction.copyProtoFunction(Array, EzServerClient.GlobeParams.RootObj)
} catch(e) {}
var __EzPoly = null;
var __shape = null;
var __EzHandle1 = null;
var __EzHandle2 = null;
var __EzHandle3 = null;
MainFrame.prototype.addHotspotContainer = function(vLyr, tilelyrIndex, levelLimit) {
	var mainPeer = this;
	this.hotspotDiv = document.createElement("div");
	var browserType = EzServerClient.GlobeParams.BrowserTypeAndVersion;
	if(browserType >= "IE10.0") {
		this.hotspotDiv.style.zIndex = 21
	} else {
		this.hotspotDiv.style.zIndex = 11
	}
	this.hotspotDiv.style.position = "absolute";
	var Yg = this.currentPanOffset.width * vLyr.tileInfo.width;
	var Li = this.currentPanOffset.height * vLyr.tileInfo.height;
	var left = Yg - this.tilePaddingOffset.width;
	var top = Li - this.tilePaddingOffset.height;
	this.hotspotDiv.style.left = left;
	this.hotspotDiv.style.top = top;
	this.hotspotDiv.style.width = (this.tableSize.width * this.baseLayer.tileInfo.width) + "px";
	this.hotspotDiv.style.height = (this.tableSize.height * this.baseLayer.tileInfo.height) + "px";
	this.hotspotDiv.id = "hotspotMaplayer";
	if(vLyr.isDisplayProfile) {
		__createHotSpotPolyline(this.hotspotDiv, vLyr)
	}
	this.hotspotImg = document.createElement("img");
	this.hotspotImg.src = EzServerClient.GlobeParams.EzServerClientURL + "/images/transparent.gif";
	this.hotspotImg.style.position = "absolute";
	this.hotspotImg.style.width = (this.tableSize.width * this.baseLayer.tileInfo.width) + "px";
	this.hotspotImg.style.height = (this.tableSize.height * this.baseLayer.tileInfo.height) + "px";
	this.hotspotImg.style.top = "0px";
	this.hotspotImg.style.left = "0px";
	this.hotspotImg.style.id = "img";
	this.hotspotImg.useMap = "#hotspotLyr";
	this.hotspotDiv.appendChild(this.hotspotImg);
	this.div.appendChild(this.hotspotDiv);
	var uTileNum = this.getTileNum(vLyr);
	var tm = null;
	if(!this._hotIcon) {
		this._hotIcon = document.createElement("div");
		this._hotIcon.style.cssText = "position:absolute;z-index:90;display:none;font-size:0;line-height:0;";
		this._hotIcon.id = "hoticon"
	}
	this.div.appendChild(this._hotIcon);
	__EzHandle1 = EzEvent.addEventListener(this, EzEvent.MAP_PANEND, function(e) {
		if(mainPeer.hotspotDiv) {
			if(mainPeer.hotspotDiv.style.left != mainPeer.groupTileImages[0][0][0].style.left || mainPeer.hotspotDiv.style.top != mainPeer.groupTileImages[0][0][0].style.top) {
				mainPeer.hotspotDiv.style.left = mainPeer.groupTileImages[0][0][0].style.left;
				mainPeer.hotspotDiv.style.top = mainPeer.groupTileImages[0][0][0].style.top;
				for(var i = 0; i < uTileNum.width; i++) {
					for(var j = 0; j < uTileNum.height; j++) {
						var l = (mainPeer.groupTileImages[tilelyrIndex] && mainPeer.groupTileImages[tilelyrIndex][i] && mainPeer.groupTileImages[tilelyrIndex][i][j]) ? mainPeer.groupTileImages[tilelyrIndex][i][j] : null;
						var ches = (l && l.childNodes) ? l.childNodes : [];
						for(var m = 0; m < ches.length; m++) {
							__EzRefreshAreaHandler(ches[m], mainPeer, mainPeer.groupTileImages[0][0][0].offsetLeft, mainPeer.groupTileImages[0][0][0].offsetTop)
						}
					}
				}
				if(!vLyr.hotspot2d) {
					var hotLyr = document.getElementById("hotspotLyr");
					for(var i = 0; i < hotLyr.childNodes.length; i++) {
						var n = hotLyr.childNodes[i];
						for(var j = 0; j < n.childNodes.length; j++) {
							__EzRefreshAreaHandler(n.childNodes[j], this, this.groupTileImages[0][0][0].offsetLeft, this.groupTileImages[0][0][0].offsetTop)
						}
					}
				}
				if(vLyr.isDisplayProfile) {
					__hide()
				}
			}
		}
	});
	__EzHandle2 = EzEvent.addEventListener(this, EzEvent.MAP_ZOOMSTART, function(e) {
		for(var i = 0; i < uTileNum.width; i++) {
			for(var j = 0; j < uTileNum.height; j++) {
				var l = (mainPeer.groupTileImages[tilelyrIndex] && mainPeer.groupTileImages[tilelyrIndex][i] && mainPeer.groupTileImages[tilelyrIndex][i][j]) ? mainPeer.groupTileImages[tilelyrIndex][i][j] : null;
				if(l) {
					l.innerHTML = ""
				}
			}
		}
		if(!vLyr.hotspot2d) {
			var hotLyr = document.getElementById("hotspotLyr");
			if(hotLyr) {
				for(var i = 0; i < hotLyr.childNodes.length; i++) {
					var n = hotLyr.childNodes[i];
					n.innerHTML = ""
				}
			}
		}
		if(mainPeer.hotspotDiv) {
			mainPeer.hotspotDiv.style.left = "0px";
			mainPeer.hotspotDiv.style.top = "0px"
		}
		if(vLyr.isDisplayProfile) {
			__hide()
		}
	});
	__EzHandle3 = EzEvent.addEventListener(this, EzEvent.MAP_MOUSEMOVE, function(e) {
		if(e.eventType == EzEvent.MAP_MOUSEDOWN || e.eventType == EzEvent.MAP_MOUSEWHEEL || e.eventType == EzEvent.MAP_ZOOMEND || e.eventType == EzEvent.MAP_SWITCHMAPSERVER) {
			mainPeer._hotIcon.style.display = "none";
			return
		}
		var mainPeer = this;
		var alloDivNum = 5;
		var mapPoint = e.mapPoint;
		var mainPeerDivPoint = mainPeer.getDivCoord2(mapPoint.x, mapPoint.y);
		var evt = e;
		if(!tm) {
			tm = setTimeout(function() {
				tm = null;
				for(var i = 0; i < uTileNum.width; i++) {
					for(var j = 0; j < uTileNum.height; j++) {
						var l = (mainPeer.groupTileImages[tilelyrIndex] && mainPeer.groupTileImages[tilelyrIndex][i] && mainPeer.groupTileImages[tilelyrIndex][i][j]) ? mainPeer.groupTileImages[tilelyrIndex][i][j] : null;
						var ches = (l && l.childNodes) ? l.childNodes : [];
						for(var m = 0; m < ches.length; m++) {
							if(mapPoint.x != evt.mapPoint.x || mapPoint.y != evt.mapPoint.y) {
								return
							}
							if(ches[m]._bound == "") {
								var _center = ches[m]._center.split(",");
								var divPoint = mainPeer.getDivCoord2(_center[0], _center[1]);
								var mbr = new MBR(divPoint.x - alloDivNum, divPoint.y - 2 * alloDivNum, divPoint.x + alloDivNum, divPoint.y);
								if(mbr.containsPoint(mainPeerDivPoint)) {
									var url = ches[m]._iconUrl;
									var center = mainPeer.getDivCoord2(_center[0], _center[1]);
									if(center && center.x && center.y) {
										EzServerClient.Util.fetchImage(url, function(width, height, url) {
											if(width != 0 && height != 0) {
												mainPeer._hotIcon.title = ches[m].alt ? ches[m].alt : "点击查看详细信息";
												mainPeer._hotIcon.style.display = "";
												mainPeer._hotIcon.style.left = (center.x - (width) / 2 - 1) + "px";
												mainPeer._hotIcon.style.top = (center.y - (height)) + "px";
												mainPeer._hotIcon.style.width = parseInt(width) + "px";
												mainPeer._hotIcon.style.height = parseInt(height) + "px";
												EzServerClient.Util.setCssSprite(mainPeer._hotIcon, url, [0, 0]);
												__setDivEvent(mainPeer._hotIcon, vLyr.eventName, vLyr.callback, ches[m], mainPeer)
											}
										})
									}
									return
								}
								_center = null;
								mbr = null
							} else {
								if(ches[m]._bound) {}
							}
						}
						l = null;
						ches = null
					}
					mainPeer._hotIcon.style.display = "none"
				}
				mainPeer._hotIcon.style.display = "none"
			}, 0)
		}
	})
};

function __setDivEvent(div, vEvent, vFunc, vArea, vMap) {
	eval("div." + vEvent + "=function(){vFunc(vArea._hotspot)}");
	div.ondblclick = function() {
		window.event.cancelBubble = true
	};
	div.onmouseover = function() {
		vMap._hotIcon.style.cursor = "pointer"
	};
	div.onmouseout = function() {
		vMap._hotIcon.style.cursor = ""
	}
}

function setAreaPorp(vLyr, vEvent, vFunc, vMap, vArea) {
	eval("vArea." + vEvent + "=function(){vFunc(vArea._hotspot)}");
	vArea.ondblclick = function() {
		window.event.cancelBubble = true
	};
	vArea.onmouseover = function(e) {
		vMap.hotspotImg.style.cursor = "pointer";
		if(vLyr.isDisplayProfile && !vMap.bIsPaning) {
			__show(vArea, vMap)
		}
	};
	vArea.onmouseout = function() {
		vMap.hotspotImg.style.cursor = "";
		if(vLyr.isDisplayProfile && !vMap.bIsPaning) {
			__hide()
		}
	}
}

function __PointInBounds(point, bounds) {}

function __EzRefreshAreaHandler(vArea, vMap, leftOffset, topOffset) {
	if(!vArea._p || !vMap.baseGroupLayer.getHotspotLayer()) {
		return
	}
	var coords = vArea._p.split("|");
	var str = "";
	var longest = null;
	var length = 0;
	var pointsStr = null;
	for(var i = 0; i < coords.length; i++) {
		var b = [];
		var pPointDiv = null;
		var uPoints = coords[i].split(",");
		for(var e = 0; e < uPoints.length; e = e + 2) {
			pPointDiv = vMap.getDivCoord2(uPoints[e], uPoints[e + 1], __EzP);
			b.push(pPointDiv.x - leftOffset);
			b.push(pPointDiv.y - topOffset)
		}
		pointsStr = b.join(",");
		if(uPoints.length > length) {
			length = uPoints.length;
			longest = pointsStr
		}
		str += pointsStr;
		if(i != coords.length - 1) {
			str += "|"
		}
	}
	vArea.coords = longest;
	vArea.str = str
}

function __createHotSpotPolyline(vDiv, vLyr) {
	__EzPoly = Raphael(vDiv);
	__shape = __EzPoly.path()
}

function __show(srcArea, oMap, vLyr) {
	var fillcolor = "white";
	var strokecolor = "yellow";
	var strokeweight = "1.2pt";
	var opacity = "19660f";
	if(vLyr.HotspotStyle != null) {
		fillcolor = (vLyr.HotspotStyle.fillColor) ? vLyr.HotspotStyle.fillColor : "white";
		strokecolor = (vLyr.HotspotStyle.borderColor) ? vLyr.HotspotStyle.borderColor : "yellow";
		strokeweight = (vLyr.HotspotStyle.borderWeight) ? vLyr.HotspotStyle.borderWeight : "1.2pt";
		opacity = (vLyr.HotspotStyle && vLyr.HotspotStyle.opacity) ? vLyr.HotspotStyle.opacity : "19660f"
	} else {
		fillcolor = (EzServerClient.GlobeParams.HotspotStyle && EzServerClient.GlobeParams.HotspotStyle.fillColor) ? EzServerClient.GlobeParams.HotspotStyle.fillColor : "white";
		strokecolor = (EzServerClient.GlobeParams.HotspotStyle && EzServerClient.GlobeParams.HotspotStyle.borderColor) ? EzServerClient.GlobeParams.HotspotStyle.borderColor : "yellow";
		strokeweight = (EzServerClient.GlobeParams.HotspotStyle && EzServerClient.GlobeParams.HotspotStyle.borderWeight) ? EzServerClient.GlobeParams.HotspotStyle.borderWeight : "1.2pt";
		opacity = (EzServerClient.GlobeParams.HotspotStyle && EzServerClient.GlobeParams.HotspotStyle.opacity) ? EzServerClient.GlobeParams.HotspotStyle.opacity : "19660f"
	}
	var coords = srcArea.str.split("|");
	var strPoints = "";
	var str = "";
	for(var i = 0; i < coords.length; i++) {
		var points = coords[i].split(",");
		strPoints = "M" + points[0] + "," + points[1];
		for(var j = 2; j < points.length; j += 2) {
			var temp = "L" + points[j] + "," + points[j + 1];
			strPoints += temp
		}
		strPoints = strPoints + "Z";
		str += strPoints
	}
	__shape.attr({
		path: str,
		stroke: strokecolor,
		fill: fillcolor,
		"fill-opacity": opacity,
		"stroke-width": strokeweight
	});
	__shape.show()
}

function __hide() {
	__shape.hide()
}

function _errorBack(f) {}

function _errorFunc() {}

function _loadHotData(responseText, f, strURL, vLyr, peer, flag) {
	var hotspotData = new HotSpotDeocode(responseText);
	var hotspots = null;
	if(!hotspotData.valid && hotspotData.errorNumber == 1) {
		if(flag < 3) {
			strURL = strURL + 1;
			setTimeout(function() {
				EzServerClient.AsynAddScriptByAjax(strURL, f, vLyr, peer, flag++)
			}, 1000);
			return
		}
	}
	if(!hotspotData.valid && hotspotData.errorNumber == 2) {
		return
	}
	if(hotspotData.valid) {
		hotspots = hotspotData.getHotspotObjects()
	}
	vLyr.loadHotTile(f, peer, vLyr, hotspots)
}

function __setAreaOffset(vOffsetLeft, vOffsetTop, vCoords) {
	var vPoints = vCoords.split(",");
	for(var i = 0; i < vPoints.length; i = i + 2) {
		vPoints[i] -= vOffsetLeft;
		vPoints[i + 1] -= vOffsetTop
	}
	vPoints.push(vPoints[0]);
	vPoints.push(vPoints[1]);
	return vPoints.join(",")
}
var HotSpotDeocode = function(hotspotText) {
	this.valid = false;
	this.errorNumber = null;
	this.errorMessage = null;
	this.hotspotObjects = null;
	this.getErrorMessage = function() {
		return this.errorMessage
	};
	this.getErrorNumber = function() {
		return this.errorNumber
	};
	this.getHotspotObjects = function() {
		return this.hotspotObjects
	};
	this.decode(hotspotText)
};
HotSpotDeocode.prototype.decode = function(hotspotText) {
	var v = hotspotText.replace(/((\r\n)+)$/, "").replace(/\r\n/g, ",").replace(/(.\d+)$/, "");
	if(v == null || v == "") {
		this.valid = false;
		this.errorNumber = 2;
		return
	}
	eval("var hotspots=[" + v + "]");
	if(hotspots[0].ERRORID == 769 || hotspots[0].ERRORID == 770) {
		this.valid = false;
		this.errorNumber = 1
	} else {
		this.valid = true;
		this.errorNumber = 0;
		this.hotspotObjects = hotspots
	}
};

function ImageObj() {
	this.URL;
	this.width;
	this.alt
}

function MonitorTitleInfo() {
	this.title = "警力信息";
	this.name = "警力名称";
	this.callNo = "呼    号";
	this.uim = "UIM 卡号";
	this.time = "时    间";
	this.speed = "速   度";
	this.carNo = "车 牌 号";
	this.carType = "车    型";
	this.addr = "地   址";
	this.belongorg = "所属单位";
	this.patrolArea = "巡逻区域";
	this.patrolType = "巡逻类型";
	this.policeName = "警员名称";
	this.policeID = "警员编号";
	this.ruleComm = "辖区名称";
	this.pdaNo = "PDA 号码";
	this.memo = "备    注"
}

function MonitorFindInfo() {
	this.title = "警力信息";
	this.name = "警力名称";
	this.callNo = "呼    号";
	this.uim = "UIM 卡号";
	this.status = "状    态";
	this.carNo = "车 牌 号";
	this.carType = "车    型";
	this.addr = "地   址";
	this.belongorg = "所属单位";
	this.patrolArea = "巡逻区域";
	this.patrolType = "巡逻类型";
	this.policeName = "警员名称";
	this.policeID = "警员编号";
	this.ruleComm = "辖区名称";
	this.pdaNo = "PDA 号码";
	this.memo = "备    注"
}

function VideoTableInfo() {
	this.title = "摄像头信息";
	this.id = "编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:";
	this.name = "名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:";
	this.status = "状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:";
	this.lon = "经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:";
	this.lat = "纬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:";
	this.addr = "位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置:";
	this.belongorg = "所属单位:";
	this.coveredAvenue = "监控范围:";
	this.url = "链&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接:";
	this.memo = "备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:"
}

function VideoTitleInfo() {
	this.title = "摄像头信息";
	this.id = "编    号";
	this.name = "名    称";
	this.status = "状    态";
	this.addr = "位    置";
	this.belongorg = "所属单位";
	this.coveredAvenue = "监控范围";
	this.memo = "备    注"
}

function Monitor(id, name, lon, lat, time) {
	this.base = iOverLay;
	this.base();
	this.id = id;
	this.name = name;
	this.lon = lon;
	this.lat = lat;
	this.time = time;
	this.addr;
	this.belongorg;
	this.callNo;
	this.memo;
	this.carNo;
	this.carType;
	this.url;
	this.speed;
	this.dir;
	this.polType;
	this.powerType;
	this.picType;
	this.patrolArea;
	this.policeName;
	this.policeID;
	this.pdaNo;
	this.ruleComm;
	this.patrolType;
	this.uim;
	this.coveredAvenue;
	this.fromtime;
	this.totime;
	this.status;
	this.videoStatus;
	this.userID;
	this.border;
	this.strPath;
	this.bIsShowBorder = false;
	this.bIsAlarm = false;
	this.bIsMonitor = false;
	this.bIsMainMonitor = false;
	this.bIsVideo = true;
	this.bIsDisplay = false;
	this.div = null;
	this.titleDiv;
	this.titleText;
	this.imgContainer;
	this.trackPointArray;
	this.trackimgArray;
	this.trackVMLArray;
	this.imgSize;
	this.topOffset = 0;
	this.container;
	this.map;
	this.imgScale = 1;
	this.imgSrc = null
}
Monitor.prototype = new iOverLay();
Monitor.prototype.toDate = function() {
	var pDate = this.time;
	var pTmpDate = null;
	if(pDate) {
		pTmpDate = new Date();
		var iYear = parseInt(pDate.substring(0, 4), 10);
		pTmpDate.setYear(iYear);
		var iMon = parseInt(pDate.substring(5, 7), 10) - 1;
		pTmpDate.setMonth(iMon);
		var iDate = parseInt(pDate.substring(8, 10), 10);
		pTmpDate.setDate(iDate);
		var iHours = parseInt(pDate.substring(11, 13), 10);
		pTmpDate.setHours(iHours);
		var iMin = parseInt(pDate.substring(14, 16), 10);
		pTmpDate.setMinutes(iMin);
		var iSecond = parseInt(pDate.substring(17, 19), 10);
		pTmpDate.setSeconds(iSecond);
		delete pTmpDate
	}
	return pTmpDate
};
Monitor.prototype.toLocalTime = function() {
	var pLocalTime = null;
	var pDate = this.time;
	if(pDate) {
		pLocalTime = this.time
	}
	return pLocalTime
};
Monitor.prototype.getNodeInfo = function() {
	var strNodeInfo = "";
	strNodeInfo = "经度:" + this.lon;
	strNodeInfo = strNodeInfo + "<br>纬度:" + this.lat;
	strNodeInfo = strNodeInfo + "<br>时间:" + this.time;
	return strNodeInfo
};
Monitor.prototype.getEclipseTime = function(pNowDate) {
	var pOldDate = this.toDate();
	var lSecond = 9999999;
	if(!pOldDate) {
		return lSecond
	}
	if(!pNowDate) {
		pNowDate = new Date()
	}
	lSecond = (pNowDate.getTime() - pOldDate.getTime()) / 1000;
	delete pNowDate;
	return lSecond
};
Monitor.prototype.convertBorder2Path = function(strBorder) {
	if(!strBorder) {
		strBorder = this.border
	}
	var pPathArray = strBorder.split(",");
	this.strPath = pPathArray;
	return pPathArray
};
Monitor.prototype.bIsOutOfBorder = function() {
	var pCheck = new TopoCheck();
	var pPoint = new Point(this.lon, this.lat);
	var pResult = pCheck.bIsInBorder(pPoint, this.border);
	pResult = !pResult;
	delete pPoint;
	delete pCheck;
	return pResult
};
Monitor.prototype.getStatus = function() {
	var lTime = this.getEclipseTime();
	var strStatus = "";
	if(lTime > 86400) {
		strStatus = "3";
		this.status = "备用"
	} else {
		if(lTime < this.statusValve) {
			strStatus = "1";
			this.status = "正常状态"
		} else {
			strStatus = "2";
			this.status = "设备未开"
		}
	}
	return strStatus
};
Monitor.prototype.showTitle = function() {
	if(this.titleDiv && this.div.style.display == "") {
		this.titleDiv.style.display = ""
	}
};
Monitor.prototype.hideTitle = function() {
	if(this.titleDiv) {
		this.titleDiv.style.display = "none"
	}
};
Monitor.prototype.hide = function() {
	this.div.style.display = "none";
	this.clearTrack();
	this.titleDiv.style.display = "none"
};
Monitor.prototype.toString = function() {
	var pStr = "";
	for(var pop in this) {
		if(this[pop] != null && this[pop] != "" && this[pop] != "null") {
			var strtmp = this[pop];
			if(typeof strtmp != "function") {
				pStr = pStr + this[pop] + "\n"
			}
		}
	}
	return pStr
};
Monitor.prototype.toHTML = function() {
	var strInfo = this.getTitle().replace(/\n/g, "<br>");
	var re = /\s/g;
	strInfo = strInfo.replace(re, "&nbsp;");
	return strInfo
};
Monitor.prototype.getTextOfDir = function() {
	var strDir;
	if(this.dir > 22.5 && this.dir <= 67.5) {
		strDir = "?"
	} else {
		if(this.dir > 67.5 && this.dir <= 112.5) {
			strDir = "→"
		} else {
			if(this.dir > 112.5 && this.dir <= 157.5) {
				strDir = "?"
			} else {
				if(this.dir > 157.5 && this.dir <= 202.5) {
					strDir = "↓"
				} else {
					if(this.dir > 202.5 && this.dir <= 247.5) {
						strDir = "?"
					} else {
						if(this.dir > 247.5 && this.dir <= 292.5) {
							strDir = "←"
						} else {
							if(this.dir > 292.5 && this.dir < 337.5) {
								strDir = "?"
							} else {
								strDir = "↑"
							}
						}
					}
				}
			}
		}
	}
	return strDir
};
Monitor.prototype.getTitle = function() {
	var pStr = "";
	var pTile;
	if(this instanceof Video) {
		pTile = new VideoTitleInfo()
	} else {
		pTile = new MonitorTitleInfo()
	}
	for(var pop in pTile) {
		if(this[pop] != null && this[pop] != "" && this[pop] != "null") {
			var strtmp = pTile[pop];
			var strInfo;
			if(pop == "dir") {
				if(this.polType == 1 || this.polType == 2) {
					strInfo = this.getTextOfDir() + "(" + this[pop] + "度)"
				}
			} else {
				if(pop == "speed") {
					if(this.polType == 1 || this.polType == 2) {
						strInfo = this[pop] + "公里/小时"
					}
				} else {
					strInfo = this[pop]
				}
			}
			if(typeof strtmp != "function") {
				if(pStr == "") {
					pStr = pTile[pop] + ":" + strInfo
				} else {
					pStr = pStr + "\n" + pTile[pop] + ":" + strInfo
				}
			}
		}
	}
	delete pTile;
	return pStr
};
Monitor.prototype.toTable = function() {
	var pStr = "";
	var pTile;
	if(this instanceof Video) {
		pTile = new VideoTitleInfo()
	} else {
		pTile = new MonitorTitleInfo()
	}
	for(var pop in pTile) {
		if(this[pop] != null && this[pop] != "" && this[pop] != "null") {
			var strtmp = pTile[pop];
			if(typeof strtmp != "function") {
				pStr = pStr + pTile[pop] + this[pop] + "\n"
			}
		}
	}
	delete pTile;
	return pStr
};
Monitor.prototype.createMonitorTitleDiv = function() {
	var strTitle;
	if(typeof this.callNo != "undefined" && this.callNo != null) {
		strTitle = this.callNo
	} else {
		strTitle = this.name
	}
	this.titleText = strTitle;
	if(typeof this.titleText != "string") {
		this.titleText = this.titleText + ""
	}
	var pTitleDiv = createTxt(strTitle);
	this.titleDiv = pTitleDiv;
	pTitleDiv.style.zIndex = 1200;
	pTitleDiv.style.fontSize = convert2Px(12);
	pTitleDiv.style.fontFamily = "宋体";
	pTitleDiv.style.color = "WHITE";
	pTitleDiv.style.backgroundColor = "#004C78";
	pTitleDiv.style.width = "auto";
	pTitleDiv.style.height = "auto";
	pTitleDiv.noWrap = true;
	return this.titleDiv
};
Monitor.prototype.setZIndex = function(iIndex) {
	if(this.div != null) {
		this.div.style.zIndex = iIndex
	}
	if(this.titleDiv != null) {
		this.titleDiv.style.zIndex = iIndex
	}
};
Monitor.prototype.createDiv = function(pDivContainer) {
	this.map = pDivContainer;
	this.container = pDivContainer.div;
	this.initMonitorImage();
	var pMapImage = document.createElement("img");
	this.div = pMapImage;
	pMapImage.id = this.id;
	pMapImage.style.position = "absolute";
	pMapImage.style.zIndex = 800;
	pMapImage.unselectable = "on";
	pMapImage.lon = this.lon;
	pMapImage.lat = this.lat;
	pMapImage.src = this.getMonitorImage();
	this.container.appendChild(pMapImage);
	var pTitleDiv = this.createMonitorTitleDiv();
	this.container.appendChild(pTitleDiv);
	pMapImage.title = this.getTitle();
	setCursor(pMapImage, "hand");
	pMapImage.monitor = this;
	this.redraw();
	return pMapImage
};
Monitor.prototype.createMonitorTrackImg = function() {
	var pMapImage = document.createElement("img");
	pMapImage.style.position = "absolute";
	pMapImage.style.zIndex = 600;
	pMapImage.unselectable = "on";
	this.imgContainer.appendChild(pMapImage);
	return pMapImage
};
Monitor.prototype.clearTrack = function() {
	this.clearPointArray();
	this.clearTrackImg();
	this.clearTrackVML()
};
Monitor.prototype.removeFromDiv = function() {
	this.container.removeChild(this.div);
	this.container.removeChild(this.titleDiv);
	this.clearTrack()
};
Monitor.prototype.clearPointArray = function() {
	if(this.trackPointArray == null) {
		return
	}
	while(this.trackPointArray.length > 0) {
		var pPoint = this.trackPointArray.pop();
		delete pPoint
	}
};
Monitor.prototype.clearTrackImg = function() {
	if(this.trackimgArray == null) {
		return
	}
	while(this.trackimgArray.length > 0) {
		var pImg = this.trackimgArray.pop();
		this.imgContainer.removeChild(pImg)
	}
};
Monitor.prototype.clearTrackVML = function() {
	if(this.trackVMLArray == null) {
		return
	}
	var pVMLContainer = getTrackVMLContainer();
	while(this.trackVMLArray.length > 0) {
		var pVML = this.trackVMLArray.pop();
		pVMLContainer.groupObj.removeChild(pVML)
	}
};
Monitor.prototype.setImgPos = function(left, top, width, height) {
	var pMapImage = this.div;
	if(pMapImage != null) {
		pMapImage.style.top = convert2Px(top);
		pMapImage.style.left = convert2Px(left);
		pMapImage.style.width = convert2Px(width);
		pMapImage.style.height = convert2Px(height)
	}
	return pMapImage
};
Monitor.prototype.refreshGPSTracks = function() {
	if(this.trackPointArray == null || this.trackPointArray.length == 0) {
		return
	}
	var iScale = thid.imgScale;
	var iZoomLevel = getZoomLevel();
	var iLen = this.trackPointArray.length;
	for(var iIndex = 0; iIndex < iLen; iIndex++) {
		var ptmpPoint = this.trackPointArray[iIndex];
		var pPoint = this.map.convert2WPoint(ptmpPoint.x, ptmpPoint.y);
		this.trackPointArray[iIndex].screenX = pPoint.x;
		this.trackPointArray[iIndex].screenY = pPoint.y;
		delete pPoint
	}
	this.refreshTrackPoints();
	this.refreshTrackLines()
};
Monitor.prototype.refreshTrackLines = function() {
	var bIsDrawLine = getSetupInfo().bIsShowGPSLine;
	if(!bIsDrawLine) {
		return
	}
	if(this.trackVMLArray == null) {
		this.trackVMLArray = new Array()
	}
	var pVMLContainer = getTrackVMLContainer();
	pVMLContainer.groupObj.style.left = 0;
	pVMLContainer.groupObj.style.top = 0;
	while(this.trackVMLArray.length < this.trackPointArray.length - 1) {
		var pLineVML = pVMLContainer.drawLine(0, 0, 0, 0);
		pLineVML.firstChild.endArrow = "classic";
		pLineVML.firstChild.endArrowWidth = "medium";
		pLineVML.firstChild.color = "red";
		pLineVML.firstChild.startArrow = "oval";
		pLineVML.firstChild.startArrowWidth = "medium";
		this.trackVMLArray.push(pLineVML)
	}
	var iIndex = 0;
	var iLen = this.trackVMLArray.length;
	var pPoint = new Point();
	for(iIndex = 0; iIndex < iLen; iIndex++) {
		var pLineVML = this.trackVMLArray[iIndex];
		var strFrom = "" + this.trackPointArray[iIndex].screenX + "," + this.trackPointArray[iIndex].screenY + "";
		var strTo = "" + this.trackPointArray[iIndex + 1].screenX + "," + this.trackPointArray[iIndex + 1].screenY + "";
		pLineVML.from.value = strFrom;
		pLineVML.to.value = strTo
	}
	delete pPoint
};
Monitor.prototype.refreshTrackPoints = function() {
	var bIsDrawPoint = getSetupInfo().bIsShowGPSPoint;
	if(!bIsDrawPoint) {
		return
	}
	if(this.trackPointArray == null) {
		this.trackPointArray = new Array()
	}
	while(this.trackimgArray.length < this.trackPointArray.length) {
		var pPointImg = this.createMonitorTrackImg();
		this.trackimgArray.push(pPointImg)
	}
	var iIndex = 0;
	var iLen = this.trackimgArray.length;
	var pPoint = new Point();
	for(iIndex = 0; iIndex < iLen; iIndex++) {
		pPoint.x = this.trackPointArray[iIndex].screenX;
		pPoint.y = this.trackPointArray[iIndex].screenY;
		var pimg = this.setTrackPoint(this.trackimgArray[iIndex], pPoint);
		pimg.src = "images/point_" + (iLen - iIndex) + ".gif"
	}
	delete pPoint
};
Monitor.prototype.setTrackPoint = function(pMapImage, pPoint) {
	if(pMapImage == null) {
		return
	}
	var iScale = this.imgScale;
	var iSize = this.div.size / 4;
	var iWidth = iSize * iScale;
	if(iWidth <= 2) {
		iWidth = 2
	}
	pMapImage.style.left = convert2Px(pPoint.x - iWidth / 2);
	pMapImage.style.top = convert2Px(pPoint.y - iWidth / 2);
	pMapImage.style.width = convert2Px(iWidth);
	pMapImage.style.height = convert2Px(iWidth);
	return pMapImage
};
Monitor.prototype.onChange = function() {
	if(this.titleDiv != null) {
		var iSize = 12;
		var iWidth = 0;
		iSize = iSize * this.imgScale;
		if(iSize != 0) {
			iWidth = iSize * StrLength(this.titleText) / 2
		}
		this.titleDiv.style.left = convert2Px(this.div.x - iWidth / 2);
		var iTop = parseInt(this.div.style.top) - iSize;
		this.titleDiv.style.top = convert2Px(iTop);
		this.titleDiv.style.fontSize = convert2Px(iSize)
	}
	this.refreshGPSTracks()
};

function Monitors(Container, InfoDiv) {
	this.container = Container;
	this.xml = null;
	this.monitorArray = null;
	this.monitorDiv = null;
	this.bMonitor = true;
	this.speed = _RefreshSpeed;
	this.infoDiv = InfoDiv;
	this.bIsLoaded = false;
	if(this.container) {
		this.monitorDiv = document.createElement("div");
		this.monitorDiv.style.position = "absolute";
		this.monitorDiv.style.zIndex = 1000;
		this.monitorDiv.unselectable = "on";
		this.monitorDiv.onselectstart = _NoAction;
		this.container.appendChild(this.monitorDiv)
	}
	var pMe = this;
	window.getMonContainer = function() {
		return pMe.monitorDiv
	};
	window.hideMonitorByID = function(id) {
		pMon = pMe.getMonObjectByID(id);
		pMon.hide();
		refreshStatusTimeout()
	};
	window.refreshStatusTimeout = function() {
		if(typeof pMe.statusTimeout != "undefined" && pMe.statusTimeout != null) {
			clearTimeout(pMe.statusTimeout)
		}
		pMe.statusTimeout = pMe.setTimeout("refreshStatus()", 4000)
	};
	window.refreshStatus = function() {
		if(parent.LocFrame.CheckResult) {
			parent.LocFrame.CheckResult()
		}
	}
}
Monitors.prototype.getMonObjectByID = function(id) {
	var pObj = null;
	for(var iIndex = 0; iIndex < this.monitorArray.length; iIndex++) {
		var pObj = this.monitorArray[iIndex];
		if(pObj.id == id) {
			return pObj
		}
	}
	return null
};
Monitors.prototype.clearMonitorStatus = function() {
	var pObj = null;
	for(var iIndex = 0; iIndex < this.monitorArray.length; iIndex++) {
		var pObj = this.monitorArray[iIndex];
		pObj.bIsMonitor = false;
		pObj.bIsMainMonitor = false
	}
};
Monitors.prototype.clearMonitorTimeout = function() {
	var pObj = null;
	for(var iIndex = 0; iIndex < this.monitorArray.length; iIndex++) {
		var pObj = this.monitorArray[iIndex];
		if(typeof this.refreshTimeout != "undefined" && this.refreshTimeout != null) {
			clearTimeout(this.refreshTimeout);
			this.refreshTimeout = null
		}
	}
};
Monitors.prototype.sortById = function() {
	if(this.monitorArray != null) {
		this.monitorArray = this.monitorArray.sort(function(a, b) {
			if(a.id < b.id) {
				return -1
			}
			if(a.id > b.id) {
				return 1
			}
			return 0
		})
	}
};
Monitors.prototype.sortByTag = function(tag) {
	var pMonitorArray = null;
	if(this.monitorArray != null) {
		pMonitorArray = this.monitorArray.sort(function(a, b) {
			if(a[tag] < b[tag]) {
				return -1
			}
			if(a[tag] > b[tag]) {
				return 1
			}
			return 0
		})
	}
	return pMonitorArray
};
Monitors.prototype.show = function(XML) {
	this.bMonitor = true;
	this.monitorDiv.style.display = ""
};
Monitors.prototype.hide = function() {
	this.bMonitor = false;
	this.monitorDiv.style.display = "none"
};
Monitors.prototype.clearDiv = function() {
	if(!this.monitorDiv) {
		return
	}
	var pDiv = this.monitorDiv;
	while(pDiv.hasChildNodes()) {
		pDiv.removeChild(pDiv.lastChild)
	}
};
Monitor.prototype.getImageObj = function(bIsActive) {
	var pImg = new ImageObj();
	var strStatus = this.getStatus();
	pImg.URL = this.getMonitorImage(bIsActive);
	pImg.alt = this.status;
	pImg.width = this.imgSize;
	return pImg
};
Monitor.prototype.refreshMonImg = function(bIsFlash) {
	if(typeof bIsFlash == "undefined") {
		bIsFlash = false
	}
	var strImg = this.getMonitorImage(bIsFlash);
	if(this.div.src != strImg) {
		this.div.src = strImg
	}
};
Monitor.prototype.scaleImg = function(imgScale) {
	this.imgScale = imgScale;
	var pMapImage = this.div;
	try {
		var iWidth = this.imgSize * imgScale;
		if(iWidth <= 0) {
			iWidth = 2
		}
		var x = pMapImage.x;
		var y = pMapImage.y;
		this.setImgPos(x - iWidth / 2, y - iWidth / 2, iWidth, iWidth);
		this.onChange()
	} catch(e) {
		alert(e.message)
	}
	return pMapImage
};
Monitor.prototype.getMonitorImage = function(bIsActive) {
	var strStatus = this.getStatus();
	var strImgURL = "";
	if(strStatus == "1") {
		strImgURL = this.imgSrc.replace(".gif", "_on.gif")
	} else {
		strImgURL = this.imgSrc.replace(".gif", "_off.gif")
	}
	if(bIsActive) {
		strImgURL = this.imgSrc.replace(".gif", "_active.gif")
	}
	return strImgURL
};
Monitor.prototype.initMonitorImage = function() {
	var strImgURL = "";
	var strBasePath = "images/gpsstatus/";
	if(this.picType != null && this.picType.indexOf("依维柯") != -1) {
		strImgURL = "vehicle_ywk.gif";
		this.imgSize = 42;
		this.polType = 1;
		this.topOffset = -2
	} else {
		if(this.picType != null && this.picType.indexOf("切诺基") != -1) {
			strImgURL = "vehicle_qnj.gif";
			this.imgSize = 48;
			this.polType = 1;
			this.topOffset = 5
		} else {
			if(this.picType != null && (this.picType.indexOf("索那塔") != -1 || this.picType.indexOf("桑塔那") != -1)) {
				strImgURL = "vehicle_snt.gif";
				this.imgSize = 48;
				this.polType = 1;
				this.topOffset = 10
			} else {
				if(this.picType != null && this.picType.indexOf("摩托车") != -1) {
					strImgURL = "vehicle_motor.gif";
					this.imgSize = 40;
					this.polType = 2;
					this.topOffset = 10
				} else {
					if(this.picType != null && this.picType.indexOf("自行车") != -1) {
						strImgURL = "bike.gif";
						this.imgSize = 32;
						this.polType = 3;
						this.topOffset = 0
					} else {
						if(this.picType != null && this.picType.indexOf("步巡") != -1) {
							strImgURL = "pol.gif";
							this.imgSize = 28;
							this.polType = 3;
							this.topOffset = 0
						} else {
							if(this.picType != null && this.picType.indexOf("社区民警") != -1) {
								strImgURL = "com_pol.gif";
								this.imgSize = 24;
								this.polType = 4;
								this.topOffset = 0
							} else {
								strImgURL = "vehicle_ywk.gif";
								this.imgSize = 42;
								this.polType = 1;
								this.topOffset = 0
							}
						}
					}
				}
			}
		}
	}
	if(this.polType == 1 || this.polType == 2) {
		this.statusValve = 180
	} else {
		if(this.polType == 3) {
			this.statusValve = 600
		} else {
			if(this.polType == 4) {
				this.statusValve = 300
			}
		}
	}
	this.imgSrc = strBasePath + strImgURL
};
Monitor.prototype.getPolType = function(bIsActive) {
	return this.polType
};
Monitor.prototype.redraw = function(bIsAnyWay) {
	var pMapImage = null;
	var pPoint = this.map.convert2WPoint(this.lon, this.lat);
	var x = pPoint.x;
	var y = pPoint.y;
	var strImgURL = "";
	var pImgObj = null;
	if(this.div) {
		pMapImage = this.div
	} else {
		pMapImage = getEleByID(this.id)
	}
	if(pMapImage) {
		pMapImage.x = x;
		pMapImage.y = y;
		pMapImage.lon = this.lon;
		pMapImage.lat = this.lat;
		var iWidth = this.imgSize * this.imgScale;
		this.setImgPos(x - iWidth / 2, y - iWidth / 2, iWidth, iWidth);
		if(!(this instanceof Video)) {
			pImgObj = this.getImageObj();
			strImgURL = pImgObj.URL;
			strAlt = pImgObj.alt;
			if(pMapImage.src != strImgURL) {
				pMapImage.src = strImgURL
			}
			if(pMapImage.alt != strAlt) {
				pMapImage.alt = strAlt
			}
		}
	}
	this.onChange();
	delete pPoint;
	delete pImgObj;
	return pMapImage
};
Monitor.prototype.bIsVisable = function() {
	var bIsTrue = true;
	return bIsTrue;
	if(this.div == null) {
		this.createDiv()
	}
	var strStatus = this.getStatus();
	if(strStatus == "1") {
		if(this.div.style.display == "none") {
			this.div.style.display = "";
			refreshStatusTimeout()
		}
		if(this.titleDiv) {
			this.titleDiv.style.display = ""
		}
	} else {
		if(this.div.style.display == "") {
			this.div.style.display = "none";
			refreshStatusTimeout()
		}
		this.clearTrack();
		if(this.titleDiv) {
			this.titleDiv.style.display = "none"
		}
		bIsTrue = false
	}
	if(typeof this.refreshTimeout != "undefined" && this.refreshTimeout != null) {
		clearTimeout(this.refreshTimeout);
		this.refreshTimeout = null
	}
	var strFunc = "hideMonitorByID('" + this.id + "')";
	this.refreshTimeout = this.setTimeout(strFunc, this.statusValve * 1000);
	return bIsTrue
};
Monitor.prototype.addListener = function(action, fuct) {
	BindingEvent(this.div, action, fuct)
};
Monitor.prototype.openInfoWindowHtml = function(html) {
	this.map.blowupOverlay(this);
	if(typeof html == "undefined" || html == null) {
		this.map.openInfoWindow(this.lon, this.lat, this)
	} else {
		this.map.openInfoWindow(this.lon, this.lat, html)
	}
};

function Video(id, name, lon, lat, time) {
	this.base = Monitor;
	this.base(id, name, lon, lat, time);
	this.imgSrc = "video1.gif"
}
Video.prototype = new Monitor;
Video.prototype.getMonitorImage = function(bIsActive) {
	var strImgURL = "";
	var strpath = "images/videostatus/";
	var strPostImg = "";
	if(this.videoStatus == 1) {
		strPostImg = "_1.gif"
	} else {
		if(this.videoStatus == 2) {
			strPostImg = "_2.gif"
		} else {
			if(this.videoStatus == 3) {
				strPostImg = "_3.gif"
			} else {
				strPostImg = "_4.gif"
			}
		}
	}
	strImgURL = this.imgSrc.replace(".gif", strPostImg);
	strImgURL = strpath + strImgURL;
	return strImgURL
};
Video.prototype.initMonitorImage = function() {
	this.imgSize = 24;
	this.topOffset = 0
};
Video.prototype.getImageObj = function(bIsActive) {
	var pImg = new ImageObj();
	pImg.URL = this.getMonitorImage();
	pImg.width = 16;
	pImg.alt = "";
	return pImg
};
MainFrame.prototype.flashMonitorByID = function(id, bIsFlash) {
	var pMonitor, strImgFlashURL, strImgURL;
	var pPoint = null;
	pMonitor = this.video;
	if(!pMonitor) {
		return pPoint
	}
	var pMonObj = pMonitor.getMonObjectByID(id);
	if(!pMonObj) {
		return pPoint
	}
	var pPoint = new Point(pMonObj.lon, pMonObj.lat);
	if(pMonObj.div) {
		pMonObj.div.src = pMonObj.getMonitorImage(true)
	}
	return pPoint
};
Video.prototype.bIsVisable = function() {
	var bIsTrue = false;
	if(this.div == null) {
		this.createDiv()
	}
	if(this.bIsDisplay) {
		if(this.div.style.display == "none") {
			this.div.style.display = ""
		}
		bIsTrue = false
	} else {
		if(this.div.style.display == "") {
			this.div.style.display = "none"
		}
	}
	return bIsTrue
};
Video.prototype.setImg = function(strSrc) {
	this.imgSrc = strSrc;
	this.refreshMonImg()
};
if(typeof ezserverclient == "undefined" || ezserverclient) {
	var ezserverclient = {};
	ezserverclient.easyxmlparse = {}
}
ezserverclient.easyxmlparse.E_Element = function() {};
ezserverclient.easyxmlparse.E_Collection = function() {};
ezserverclient.easyxmlparse.E_Collection.prototype.add = function() {};
ezserverclient.easyxmlparse.E_Collection.prototype.clear = function() {};
ezserverclient.easyxmlparse.E_Collection.prototype.get = function(index) {};
ezserverclient.easyxmlparse.E_Collection.prototype.isEmpty = function() {};
ezserverclient.easyxmlparse.E_Collection.prototype.remove = function() {};
ezserverclient.easyxmlparse.E_Collection.prototype.size = function() {};
ezserverclient.easyxmlparse.E_ColumnsClause = function(vColumns) {
	ezserverclient.easyxmlparse.E_Element.call(this);
	if(vColumns) {
		this.setContent(vColumns)
	} else {
		this.content = "*"
	}
};
ezserverclient.easyxmlparse.E_ColumnsClause.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_ColumnsClause.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpContent = ezserverclient.easyxmlparse.EzXmlDomUtil.getContext(vSrcElem);
	this.setContent(tmpContent);
	return this
};
ezserverclient.easyxmlparse.E_ColumnsClause.prototype.getContent = function() {
	return this.content
};
ezserverclient.easyxmlparse.E_ColumnsClause.prototype.getElementName = function() {
	return "COLUMNSCLAUSE"
};
ezserverclient.easyxmlparse.E_ColumnsClause.prototype.setContent = function(content) {
	var tmpContent = ezserverclient.easyxmlparse.string_trim(ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(content, "*"));
	if(tmpContent.length == 0) {
		this.content = "*"
	} else {
		this.content = tmpContent
	}
};
ezserverclient.easyxmlparse.E_ColumnsClause.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setContext(tmpThis, this.getContent());
	return tmpThis
};
ezserverclient.easyxmlparse.E_DML = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.getDMLType = function() {}
};
ezserverclient.easyxmlparse.E_DML.prototype = new ezserverclient.easyxmlparse.E_Element;

function E_DMLType(name) {
	this.name = name;
	this.getName = function() {
		return this.name
	}
}
E_DMLType.INSERT = new E_DMLType("INSERT");
E_DMLType.UPDATE = new E_DMLType("UPDATE");
E_DMLType.DELETE = new E_DMLType("DELETE");
E_DMLType.SELECT = new E_DMLType("SELECT");
ezserverclient.easyxmlparse.I_SizeSensate = function() {
	this.getContentSize = function() {}
};
ezserverclient.easyxmlparse.E_Delete = function() {
	ezserverclient.easyxmlparse.E_DML.call(this);
	this.whereClause = new ezserverclient.easyxmlparse.E_WhereClause();
	this.objectName = null
};
ezserverclient.easyxmlparse.E_Delete.prototype = new ezserverclient.easyxmlparse.E_DML;
ezserverclient.easyxmlparse.E_Delete.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpWhere = new ezserverclient.easyxmlparse.E_WhereClause();
	tmpWhere = tmpWhere.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpWhere.getElementName()));
	this.setWhereClause(tmpWhere);
	this.setObjectName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectname"));
	return this
};
ezserverclient.easyxmlparse.E_Delete.prototype.getElementName = function() {
	return "DELETE"
};
ezserverclient.easyxmlparse.E_Delete.prototype.getObjectName = function() {
	return this.objectName
};
ezserverclient.easyxmlparse.E_Delete.prototype.getWhereClause = function() {
	return this.whereClause
};
ezserverclient.easyxmlparse.E_Delete.prototype.setObjectName = function(vTableName) {
	this.objectName = ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(vTableName, "")
};
ezserverclient.easyxmlparse.E_Delete.prototype.setWhereClause = function(vWhere) {
	if(vWhere == null) {
		this.whereClause = new ezserverclient.easyxmlparse.E_WhereClause()
	} else {
		this.whereClause = vWhere
	}
};
ezserverclient.easyxmlparse.E_Delete.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getWhereClause());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectname", this.getObjectName());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Delete.prototype.getDMLType = function() {
	return E_DMLType.DELETE.name
};
ezserverclient.easyxmlparse.E_EasyXml = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.version = "1.1";
	this.request = null;
	this.response = null
};
ezserverclient.easyxmlparse.E_EasyXml.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_EasyXml.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpReq = new ezserverclient.easyxmlparse.E_Request();
	tmpReq = tmpReq.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpReq.getElementName()));
	this.setRequest(tmpReq);
	var tmpResp = new ezserverclient.easyxmlparse.E_Response();
	tmpResp = tmpResp.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpResp.getElementName()));
	this.setResponse(tmpResp);
	this.setVersion(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "version"));
	return this
};
ezserverclient.easyxmlparse.E_EasyXml.prototype.getElementName = function() {
	return "EASYXML"
};
ezserverclient.easyxmlparse.E_EasyXml.prototype.getRequest = function() {
	return this.request
};
ezserverclient.easyxmlparse.E_EasyXml.prototype.getResponse = function() {
	return this.response
};
ezserverclient.easyxmlparse.E_EasyXml.prototype.getVersion = function() {
	return this.version
};
ezserverclient.easyxmlparse.E_EasyXml.prototype.makeMutexEmpty = function() {
	this.request = null;
	this.response = null
};
ezserverclient.easyxmlparse.E_EasyXml.prototype.setRequest = function(vRequest) {
	if(vRequest != null) {
		this.makeMutexEmpty()
	}
	this.request = vRequest
};
ezserverclient.easyxmlparse.E_EasyXml.prototype.setResponse = function(vResponse) {
	if(vResponse != null) {
		this.makeMutexEmpty()
	}
	this.response = vResponse
};
ezserverclient.easyxmlparse.E_EasyXml.prototype.setVersion = function(version) {
	ezserverclient.easyxmlparse.E_EasyXml.version = ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(version, "1.1");
	if(ezserverclient.easyxmlparse.E_EasyXml.version != "1.1") {
		throw new Error("设置的版本号不是EasyXML1.1")
	}
};
ezserverclient.easyxmlparse.E_EasyXml.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getRequest());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getResponse());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "xmlns", ezserverclient.easyxmlparse.EzXmlDomUtil.getEzXMLNamespace());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "version", this.getVersion());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Error = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.message = ""
};
ezserverclient.easyxmlparse.E_Error.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_Error.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	this.setMessage(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "message"));
	return this
};
ezserverclient.easyxmlparse.E_Error.prototype.getElementName = function() {
	return "ERROR"
};
ezserverclient.easyxmlparse.E_Error.prototype.getMessage = function() {
	return this.message
};
ezserverclient.easyxmlparse.E_Error.prototype.setMessage = function(message) {
	if(message == null) {
		this.message = "服务器将这个错误消息内容，错误地清空了"
	} else {
		this.message = message
	}
};
ezserverclient.easyxmlparse.E_Error.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "message", this.getMessage());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Execute = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.dmlQuery = new Array()
};
ezserverclient.easyxmlparse.E_Execute.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_Execute.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var insInsert = new ezserverclient.easyxmlparse.E_Insert();
	var insUpdate = new ezserverclient.easyxmlparse.E_Update();
	var insSelect = new ezserverclient.easyxmlparse.E_Select();
	var insDelete = new ezserverclient.easyxmlparse.E_Delete();
	var elems = ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElements(vSrcElem);
	for(var i = 0; i < elems.length; i++) {
		var tag = elems[i].nodeName;
		if(tag == insInsert.getElementName()) {
			var tmpInsert = new ezserverclient.easyxmlparse.E_Insert();
			this.addQuery(tmpInsert.fromElement(elems[i]))
		} else {
			if(tag == insUpdate.getElementName()) {
				var tmpUpdate = new ezserverclient.easyxmlparse.E_Update();
				this.addQuery(tmpUpdate.fromElement(elems[i]))
			} else {
				if(tag == insSelect.getElementName()) {
					var tmpSelect = new ezserverclient.easyxmlparse.E_Select();
					this.addQuery(tmpSelect.fromElement(elems[i]))
				} else {
					if(tag == insDelete.getElementName()) {
						var tmpDelete = new ezserverclient.easyxmlparse.E_Delete();
						this.addQuery(tmpDelete.fromElement(elems[i]))
					}
				}
			}
		}
	}
	return this
};
ezserverclient.easyxmlparse.E_Execute.prototype.getDeleteQuery = function() {
	if(this.dmlQuery.length == 0) {
		return null
	}
	if(this.dmlQuery[0] instanceof ezserverclient.easyxmlparse.E_Delete) {
		return this.dmlQuery[0]
	}
	return null
};
ezserverclient.easyxmlparse.E_Execute.prototype.getElementName = function() {
	return "EXECUTE"
};
ezserverclient.easyxmlparse.E_Execute.prototype.getInsertQuery = function() {
	if(this.dmlQuery.length == 0) {
		return null
	}
	if(this.dmlQuery[0] instanceof ezserverclient.easyxmlparse.E_Insert) {
		return this.dmlQuery[0]
	}
	return null
};
ezserverclient.easyxmlparse.E_Execute.prototype.getSelectQuery = function() {
	if(this.dmlQuery.length == 0) {
		return null
	}
	if(this.dmlQuery[0] instanceof ezserverclient.easyxmlparse.E_Select) {
		return this.dmlQuery[0]
	}
	return null
};
ezserverclient.easyxmlparse.E_Execute.prototype.getUpdateQuery = function() {
	if(this.dmlQuery.length == 0) {
		return null
	}
	if(this.dmlQuery[0] instanceof ezserverclient.easyxmlparse.E_Update) {
		return this.dmlQuery[0]
	}
	return null
};
ezserverclient.easyxmlparse.E_Execute.prototype.setDeleteQuery = function(deleteQuery) {
	this.dmlQuery.splice(0, this.dmlQuery.length - 1);
	this.dmlQuery.push(deleteQuery)
};
ezserverclient.easyxmlparse.E_Execute.prototype.setInsertQuery = function(insertQuery) {
	this.dmlQuery.splice(0, this.dmlQuery.length - 1);
	this.dmlQuery.push(insertQuery)
};
ezserverclient.easyxmlparse.E_Execute.prototype.setSelectQuery = function(selectQuery) {
	if(EzServerClient.GlobeFunction.isTypeRight(selectQuery, "Array")) {
		this.dmlQuery.splice(0, this.dmlQuery.length - 1);
		for(var i = 0; i < selectQuery.length; i++) {
			this.dmlQuery.push(selectQuery[i])
		}
	} else {
		this.dmlQuery.splice(0, this.dmlQuery.length - 1);
		this.dmlQuery.push(selectQuery)
	}
};
ezserverclient.easyxmlparse.E_Execute.prototype.setUpdateQuery = function(updateQuery) {
	this.dmlQuery.splice(0, this.dmlQuery.length - 1);
	this.dmlQuery.push(updateQuery)
};
ezserverclient.easyxmlparse.E_Execute.prototype.addQuery = function(query) {
	this.dmlQuery.push(query)
};
ezserverclient.easyxmlparse.E_Execute.prototype.getQueryCount = function() {
	return this.dmlQuery.length
};
ezserverclient.easyxmlparse.E_Execute.prototype.getQuery = function(index) {
	return this.dmlQuery[index - 1]
};
ezserverclient.easyxmlparse.E_Execute.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	for(var i = 0; i < this.dmlQuery.length; i++) {
		ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.dmlQuery[i])
	}
	return tmpThis
};
ezserverclient.easyxmlparse.E_FeatureExtension = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.objectID = -1;
	this.displayName = null;
	this.centerX = NaN;
	this.centerY = NaN
};
ezserverclient.easyxmlparse.E_FeatureExtension.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_FeatureExtension.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	this.setCenterX(ezserverclient.easyxmlparse.EzXmlTypeUtil.toDoubleValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "centerx"), NaN));
	this.setCenterY(ezserverclient.easyxmlparse.EzXmlTypeUtil.toDoubleValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "centery"), NaN));
	this.setDisplayName(ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "displayname"), null));
	this.setObjectID(ezserverclient.easyxmlparse.EzXmlTypeUtil.toLongValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectid")));
	return this
};
ezserverclient.easyxmlparse.E_FeatureExtension.prototype.getCenterX = function() {
	return this.centerX
};
ezserverclient.easyxmlparse.E_FeatureExtension.prototype.getCenterY = function() {
	return this.centerY
};
ezserverclient.easyxmlparse.E_FeatureExtension.prototype.getDisplayName = function() {
	return this.displayName
};
ezserverclient.easyxmlparse.E_FeatureExtension.prototype.getElementName = function() {
	return "FEATUREEXTENSION"
};
ezserverclient.easyxmlparse.E_FeatureExtension.prototype.getObjectID = function() {
	return this.objectID
};
ezserverclient.easyxmlparse.E_FeatureExtension.prototype.setCenterX = function(centerX) {
	this.centerX = centerX
};
ezserverclient.easyxmlparse.E_FeatureExtension.prototype.setCenterY = function(centerY) {
	this.centerY = centerY
};
ezserverclient.easyxmlparse.E_FeatureExtension.prototype.setDisplayName = function(displayName) {
	this.displayName = displayName
};
ezserverclient.easyxmlparse.E_FeatureExtension.prototype.setObjectID = function(objectID) {
	this.objectID = objectID
};
ezserverclient.easyxmlparse.E_FeatureExtension.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "centerx", this.getCenterX());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "centery", this.getCenterY());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "displayname", this.getDisplayName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectid", this.getObjectID());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Field = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	ezserverclient.easyxmlparse.I_SizeSensate.call(this);
	this.disyplayName = null;
	this.name = null;
	this.valuw = null;
	this.type = null
};
ezserverclient.easyxmlparse.E_Field.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_Field.prototype = new ezserverclient.easyxmlparse.I_SizeSensate;
ezserverclient.easyxmlparse.E_Field.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	this.setName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "name"));
	this.setDisplayName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "displayname"));
	this.setValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "value"));
	this.setType(ezserverclient.easyxmlparse.P_FieldType.getFieldType(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "type")));
	return this
};
ezserverclient.easyxmlparse.E_Field.prototype.getDisplayName = function() {
	return this.displayName
};
ezserverclient.easyxmlparse.E_Field.prototype.getElementName = function() {
	return "FIELD"
};
ezserverclient.easyxmlparse.E_Field.prototype.getName = function() {
	return this.name
};
ezserverclient.easyxmlparse.E_Field.prototype.getValue = function() {
	return this.value
};
ezserverclient.easyxmlparse.E_Field.prototype.getType = function() {
	return this.type
};
ezserverclient.easyxmlparse.E_Field.prototype.setDisplayName = function(dispname) {
	this.displayName = dispname
};
ezserverclient.easyxmlparse.E_Field.prototype.setName = function(name) {
	this.name = name
};
ezserverclient.easyxmlparse.E_Field.prototype.setValue = function(value) {
	this.value = value
};
ezserverclient.easyxmlparse.E_Field.prototype.setType = function(type) {
	this.type = type
};
ezserverclient.easyxmlparse.E_Field.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "name", this.getName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "displayname", this.getDisplayName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "value", this.getValue());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "type", this.getType());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Field.prototype.getContentSize = function() {
	var s = 0;
	if(this.name != null) {
		s += (this.name.length << 2)
	}
	if(this.displayName != null) {
		s += (this.displayName.length << 2)
	}
	if(this.value != null) {
		s += (this.value.length << 2)
	}
	return s
};
ezserverclient.easyxmlparse.E_Fields = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	ezserverclient.easyxmlparse.E_Collection.call(this);
	ezserverclient.easyxmlparse.I_SizeSensate.call(this);
	this.fieldContainer = new Array()
};
ezserverclient.easyxmlparse.E_Fields.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_Fields.prototype = new ezserverclient.easyxmlparse.E_Collection;
ezserverclient.easyxmlparse.E_Fields.prototype = new ezserverclient.easyxmlparse.I_SizeSensate;
ezserverclient.easyxmlparse.E_Fields.prototype.add = function(vField) {
	return this.fieldContainer.push(vField)
};
ezserverclient.easyxmlparse.E_Fields.prototype.add2 = function(vObject) {
	return this.fieldContainer.push(vObject)
};
ezserverclient.easyxmlparse.E_Fields.prototype.clear = function() {
	this.fieldContainer.splice(0, this.fieldContainer.length - 1)
};
ezserverclient.easyxmlparse.E_Fields.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpFdT = new ezserverclient.easyxmlparse.E_Field();
	tmpFdList = ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElements(vSrcElem, tmpFdT.getElementName());
	var tmpFdContainer = new Array();
	for(var i = 0; i < tmpFdList.length; i++) {
		var tmpFd = new ezserverclient.easyxmlparse.E_Field();
		tmpFd = tmpFd.fromElement(tmpFdList[i]);
		tmpFdContainer.push(tmpFd)
	}
	this.fieldContainer = tmpFdContainer;
	return this
};
ezserverclient.easyxmlparse.E_Fields.prototype.get = function(index) {
	return this.fieldContainer[index]
};
ezserverclient.easyxmlparse.E_Fields.prototype.get2 = function(index) {
	return this.fieldContainer[index]
};
ezserverclient.easyxmlparse.E_Fields.prototype.getElementName = function() {
	return "FIELDS"
};
ezserverclient.easyxmlparse.E_Fields.prototype.isEmpty = function() {
	if(this.fieldContainer.length == 0) {
		return true
	}
};
ezserverclient.easyxmlparse.E_Fields.prototype.remove = function(index) {
	return this.fieldContainer.splice(index, index)
};
ezserverclient.easyxmlparse.E_Fields.prototype.remove2 = function(vObject) {
	return this.fieldContainer.splice(vObject, vObject)
};
ezserverclient.easyxmlparse.E_Fields.prototype.size = function() {
	return this.fieldContainer.length
};
ezserverclient.easyxmlparse.E_Fields.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	for(var i = 0; i < this.fieldContainer.length; i++) {
		ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.fieldContainer[i])
	}
	return tmpThis
};
ezserverclient.easyxmlparse.E_Fields.prototype.getContentSize = function() {
	var s = 0;
	for(var i = 0; i < this.fieldContainer.length; i++) {
		s += this.fieldContainer[i].getContentSize()
	}
	return s
};
ezserverclient.easyxmlparse.E_FieldMeta = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.name = null;
	this.displayName = null;
	this.type = null
};
ezserverclient.easyxmlparse.E_FieldMeta.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_FieldMeta.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	this.setName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "name"));
	this.setDisplayName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "displayname"));
	this.setType(ezserverclient.easyxmlparse.P_FieldType.getFieldType(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "type")));
	return this
};
ezserverclient.easyxmlparse.E_FieldMeta.prototype.getDisplayName = function() {
	return this.displayName
};
ezserverclient.easyxmlparse.E_FieldMeta.prototype.getElementName = function() {
	return "FIELDMETA"
};
ezserverclient.easyxmlparse.E_FieldMeta.prototype.getName = function() {
	return this.name
};
ezserverclient.easyxmlparse.E_FieldMeta.prototype.getType = function() {
	return this.type
};
ezserverclient.easyxmlparse.E_FieldMeta.prototype.setDisplayName = function(displayName) {
	this.displayName = displayName
};
ezserverclient.easyxmlparse.E_FieldMeta.prototype.setName = function(name) {
	this.name = name
};
ezserverclient.easyxmlparse.E_FieldMeta.prototype.setType = function(type) {
	this.type = type
};
ezserverclient.easyxmlparse.E_FieldMeta.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "displayname", this.getDisplayName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "name", this.getName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "type", this.getType());
	return tmpThis
};
ezserverclient.easyxmlparse.E_GetMetadata = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.objectName = null
};
ezserverclient.easyxmlparse.E_GetMetadata.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_GetMetadata.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	this.setObjectName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectname"));
	return this
};
ezserverclient.easyxmlparse.E_GetMetadata.prototype.getObjectName = function() {
	return this.objectName
};
ezserverclient.easyxmlparse.E_GetMetadata.prototype.setObjectName = function(vTableName) {
	this.objectName = ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(vTableName, null)
};
ezserverclient.easyxmlparse.E_GetMetadata.prototype.getElementName = function() {
	return "GETMETADATA"
};
ezserverclient.easyxmlparse.E_GetMetadata.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectname", this.getObjectName());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Insert = function() {
	ezserverclient.easyxmlparse.E_DML.call(this);
	this.fields = new ezserverclient.easyxmlparse.E_Fields();
	this.objectName = null
};
ezserverclient.easyxmlparse.E_Insert.prototype = new ezserverclient.easyxmlparse.E_DML;
ezserverclient.easyxmlparse.E_Insert.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpFs = new ezserverclient.easyxmlparse.E_Fields();
	tmpFs = tmpFs.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpFs.getElementName()));
	this.setFields(tmpFs);
	this.setObjectName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectname"));
	return this
};
ezserverclient.easyxmlparse.E_Insert.prototype.getElementName = function() {
	return "INSERT"
};
ezserverclient.easyxmlparse.E_Insert.prototype.getFields = function() {
	return this.fields
};
ezserverclient.easyxmlparse.E_Insert.prototype.getObjectName = function() {
	return this.objectName
};
ezserverclient.easyxmlparse.E_Insert.prototype.setFields = function(fields) {
	if(fields == null) {
		this.fields = new ezserverclient.easyxmlparse.E_Fields()
	} else {
		this.fields = fields
	}
};
ezserverclient.easyxmlparse.E_Insert.prototype.setObjectName = function(vTableName) {
	this.objectName = ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(vTableName, "")
};
ezserverclient.easyxmlparse.E_Insert.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getFields());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectname", this.getObjectName());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Insert.getDMLType = function() {
	return E_DMLType.INSERT.name
};
ezserverclient.easyxmlparse.E_LayerExtension = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.fullExtent = null;
	this.spatialColumn = null;
	this.crs = null;
	this.geoType = new ezserverclient.easyxmlparse.P_GeometryType()
};
ezserverclient.easyxmlparse.E_LayerExtension.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_LayerExtension.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	this.setFullExtent(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "fullextent"));
	this.setSpatialColumn(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "spatialcolumn"));
	this.setCrs(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "crs"));
	this.setGeoType(ezserverclient.easyxmlparse.P_GeometryType.getGeometryType(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "geotype")));
	return this
};
ezserverclient.easyxmlparse.E_LayerExtension.prototype.getElementName = function() {
	return "LAYEREXTENSION"
};
ezserverclient.easyxmlparse.E_LayerExtension.prototype.getCrs = function() {
	return this.crs
};
ezserverclient.easyxmlparse.E_LayerExtension.prototype.setCrs = function(crs) {
	this.crs = crs
};
ezserverclient.easyxmlparse.E_LayerExtension.prototype.getFullExtent = function() {
	return this.fullExtent
};
ezserverclient.easyxmlparse.E_LayerExtension.prototype.getGeoType = function() {
	return this.geoType
};
ezserverclient.easyxmlparse.E_LayerExtension.prototype.getSpatialColumn = function() {
	return this.spatialColumn
};
ezserverclient.easyxmlparse.E_LayerExtension.prototype.setFullExtent = function(fullExtent) {
	this.fullExtent = fullExtent
};
ezserverclient.easyxmlparse.E_LayerExtension.prototype.setGeoType = function(vGeoType) {
	this.geoType = vGeoType
};
ezserverclient.easyxmlparse.E_LayerExtension.prototype.setSpatialColumn = function(vSpatialColumn) {
	this.spatialColumn = vSpatialColumn
};
ezserverclient.easyxmlparse.E_LayerExtension.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "crs", this.getCrs());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "fullextent", this.getFullExtent());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "geotype", this.getGeoType());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "spatialcolumn", this.getSpatialColumn());
	return tmpThis
};
ezserverclient.easyxmlparse.E_LinkTable = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.objectName = null;
	this.where = null
};
ezserverclient.easyxmlparse.E_LinkTable.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_LinkTable.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpWC = new ezserverclient.easyxmlparse.E_WhereClause();
	tmpWC = tmpWC.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpWC.getElementName()));
	this.setWhere(tmpWC);
	this.setObjectName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectname"));
	return this
};
ezserverclient.easyxmlparse.E_LinkTable.prototype.getObjectName = function() {
	return this.objectName
};
ezserverclient.easyxmlparse.E_LinkTable.prototype.setObjectName = function(vTableName) {
	this.objectName = ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(vTableName, "")
};
ezserverclient.easyxmlparse.E_LinkTable.prototype.setWhere = function(vCondition) {
	if(vCondition == null) {
		this.where = null
	} else {
		this.where = vCondition
	}
};
ezserverclient.easyxmlparse.E_LinkTable.prototype.getWhere = function() {
	return this.where
};
ezserverclient.easyxmlparse.E_LinkTable.prototype.getElementName = function() {
	return "LINKTABLE"
};
ezserverclient.easyxmlparse.E_LinkTable.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getWhere());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectname", this.getObjectName());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Metadata = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.tablesMeta = new ezserverclient.easyxmlparse.E_TablesMeta()
};
ezserverclient.easyxmlparse.E_Metadata.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_Metadata.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpLM = new ezserverclient.easyxmlparse.E_TablesMeta();
	tmpLM = tmpLM.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpLM.getElementName()));
	this.setTablesMeta(tmpLM);
	return this
};
ezserverclient.easyxmlparse.E_Metadata.prototype.getElementName = function() {
	return "METADATA"
};
ezserverclient.easyxmlparse.E_Metadata.prototype.getTablesMeta = function() {
	return this.tablesMeta
};
ezserverclient.easyxmlparse.E_Metadata.prototype.setTablesMeta = function(layersMeta) {
	if(layersMeta == null) {
		this.tablesMeta = new ezserverclient.easyxmlparse.E_TablesMeta()
	} else {
		this.tablesMeta = layersMeta
	}
};
ezserverclient.easyxmlparse.E_Metadata.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getTablesMeta());
	return tmpThis
};
ezserverclient.easyxmlparse.E_OrderByClause = function(vColumns) {
	ezserverclient.easyxmlparse.E_Element.call(this);
	if(vColumns) {
		this.setContent(vColumns)
	} else {
		this.content = ""
	}
};
ezserverclient.easyxmlparse.E_OrderByClause.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_OrderByClause.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpContent = ezserverclient.easyxmlparse.EzXmlDomUtil.getContext(vSrcElem);
	this.setContent(tmpContent);
	return this
};
ezserverclient.easyxmlparse.E_OrderByClause.prototype.getContent = function() {
	return this.content
};
ezserverclient.easyxmlparse.E_OrderByClause.prototype.getElementName = function() {
	return "ORDERBYCLAUSE"
};
ezserverclient.easyxmlparse.E_OrderByClause.prototype.setContent = function(content) {
	var tmpContent = ezserverclient.easyxmlparse.string_trim(ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(content, ""));
	if(tmpContent.length == 0) {
		this.content = ""
	} else {
		this.content = tmpContent
	}
};
ezserverclient.easyxmlparse.E_OrderByClause.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setContext(tmpThis, this.getContent());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Record = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	ezserverclient.easyxmlparse.I_SizeSensate.call(this);
	this.featureExtension = new ezserverclient.easyxmlparse.E_FeatureExtension();
	this.fields = new ezserverclient.easyxmlparse.E_Fields();
	this.objectID = -1;
	this.from = null
};
ezserverclient.easyxmlparse.E_Record.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_Record.prototype = new ezserverclient.easyxmlparse.I_SizeSensate;
ezserverclient.easyxmlparse.E_Record.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpFeaExt = new ezserverclient.easyxmlparse.E_FeatureExtension();
	tmpFeaExt = tmpFeaExt.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpFeaExt.getElementName()));
	this.setFeatureExtension(tmpFeaExt);
	var tmpFlds = new ezserverclient.easyxmlparse.E_Fields();
	tmpFlds = tmpFlds.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpFlds.getElementName()));
	this.setFields(tmpFlds);
	this.setObjectID(ezserverclient.easyxmlparse.EzXmlTypeUtil.toLongValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectid")));
	this.setFrom(ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "from")));
	return this
};
ezserverclient.easyxmlparse.E_Record.prototype.getElementName = function() {
	return "RECORD"
};
ezserverclient.easyxmlparse.E_Record.prototype.getFrom = function() {
	return this.from
};
ezserverclient.easyxmlparse.E_Record.prototype.getFeatureExtension = function() {
	return this.featureExtension
};
ezserverclient.easyxmlparse.E_Record.prototype.getFields = function() {
	return this.fields
};
ezserverclient.easyxmlparse.E_Record.prototype.getObjectID = function() {
	return this.objectID
};
ezserverclient.easyxmlparse.E_Record.prototype.setFrom = function(from) {
	this.from = from
};
ezserverclient.easyxmlparse.E_Record.prototype.setFeatureExtension = function(featureExtension) {
	this.featureExtension = featureExtension
};
ezserverclient.easyxmlparse.E_Record.prototype.setFields = function(fields) {
	if(fields == null) {
		this.fields = new ezserverclient.easyxmlparse.E_Fields()
	} else {
		this.fields = fields
	}
};
ezserverclient.easyxmlparse.E_Record.prototype.setObjectID = function(objectID) {
	this.objectID = objectID
};
ezserverclient.easyxmlparse.E_Record.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getFeatureExtension());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getFields());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectid", this.getObjectID());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Record.prototype.getContentSize = function() {
	if(this.getFields() == null) {
		return 0
	} else {
		return this.getFields().getContentSize()
	}
};
ezserverclient.easyxmlparse.E_Records = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	ezserverclient.easyxmlparse.E_Collection.call(this);
	ezserverclient.easyxmlparse.I_SizeSensate.call(this);
	this.recordContainer = new Array();
	this.recordCount = -1;
	this.childSources = -1
};
ezserverclient.easyxmlparse.E_Records.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_Records.prototype = new ezserverclient.easyxmlparse.E_Collection;
ezserverclient.easyxmlparse.E_Records.prototype = new ezserverclient.easyxmlparse.I_SizeSensate;
ezserverclient.easyxmlparse.E_Records.prototype.add = function(e) {
	return this.recordContainer.push(e)
};
ezserverclient.easyxmlparse.E_Records.prototype.add2 = function(vObject) {
	return this.recordContainer.push(vObject)
};
ezserverclient.easyxmlparse.E_Records.prototype.clear = function() {
	this.recordContainer.splice(0, this.recordContainer.length - 1)
};
ezserverclient.easyxmlparse.E_Records.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpRecT = new ezserverclient.easyxmlparse.E_Record();
	var tmpRecList = ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElements(vSrcElem, tmpRecT.getElementName());
	var tmpRecContainer = new Array();
	for(var i = 0; i < tmpRecList.length; i++) {
		var tmpRec = new ezserverclient.easyxmlparse.E_Record();
		tmpRec = tmpRec.fromElement(tmpRecList[i]);
		tmpRecContainer.push(tmpRec)
	}
	this.recordContainer = tmpRecContainer;
	this.setRecordCount(ezserverclient.easyxmlparse.EzXmlTypeUtil.toLongValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "recordcount"), -1));
	this.setChildSources(ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "childSources"), -1));
	return this
};
ezserverclient.easyxmlparse.E_Records.prototype.get = function(index) {
	return this.recordContainer[index]
};
ezserverclient.easyxmlparse.E_Records.prototype.setChildSources = function(childSources) {
	this.childSources = childSources
};
ezserverclient.easyxmlparse.E_Records.prototype.getChildSources = function(childSources) {
	return this.childSources
};
ezserverclient.easyxmlparse.E_Records.prototype.get2 = function(index) {
	return this.recordContainer[index]
};
ezserverclient.easyxmlparse.E_Records.prototype.getElementName = function() {
	return "RECORDS"
};
ezserverclient.easyxmlparse.E_Records.prototype.getFeatureCount = function() {
	return this.recordContainer.length
};
ezserverclient.easyxmlparse.E_Records.prototype.getRecordCount = function() {
	if(this.recordCount != -1) {
		return this.recordCount
	} else {
		return this.getFeatureCount()
	}
};
ezserverclient.easyxmlparse.E_Records.prototype.isEmpty = function() {
	if(this.recordContainer.length == 0) {
		return true
	}
};
ezserverclient.easyxmlparse.E_Records.prototype.remove = function(index) {
	return this.splice(index, index)
};
ezserverclient.easyxmlparse.E_Records.prototype.remove2 = function(vObject) {
	return this.recordContainer.splice(vObject, vObject)
};
ezserverclient.easyxmlparse.E_Records.prototype.setRecordCount = function(recordCount) {
	this.recordCount = recordCount
};
ezserverclient.easyxmlparse.E_Records.prototype.size = function() {
	return this.recordContainer.length
};
ezserverclient.easyxmlparse.E_Records.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	for(var i = 0; i < this.recordContainer.length; i++) {
		ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.recordContainer[i])
	}
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "recordcount", ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(this.getRecordCount()));
	return tmpThis
};
ezserverclient.easyxmlparse.E_Records.prototype.getContentSize = function() {
	var s = 0;
	for(var i = 0; i < this.recordContainer.length; i++) {
		s += this.recordContainer[i].getContentSize()
	}
	return s
};
ezserverclient.easyxmlparse.E_Request = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.execute = new ezserverclient.easyxmlparse.E_Execute();
	this.funcMetaData = new ezserverclient.easyxmlparse.E_GetMetadata();
	this.freeText = null
};
ezserverclient.easyxmlparse.E_Request.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_Request.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpExe = new ezserverclient.easyxmlparse.E_Execute();
	var tmpExe = tmpExe.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpExe.getElementName()));
	this.setExecute(tmpExe);
	var tmpGM = new ezserverclient.easyxmlparse.E_GetMetadata();
	var tmpGM = tmpGM.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpGM.getElementName()));
	this.setFuncMetadata(tmpGM);
	this.setFreeText(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "freetext"));
	return this
};
ezserverclient.easyxmlparse.E_Request.prototype.getElementName = function() {
	return "REQUEST"
};
ezserverclient.easyxmlparse.E_Request.prototype.getExecute = function() {
	return this.execute
};
ezserverclient.easyxmlparse.E_Request.prototype.getFreeText = function() {
	return this.freeText
};
ezserverclient.easyxmlparse.E_Request.prototype.getFuncMetadata = function() {
	return this.funcMetadata
};
ezserverclient.easyxmlparse.E_Request.prototype.makeMutexEmpty = function() {
	this.execute = null;
	this.funcMetadata = null
};
ezserverclient.easyxmlparse.E_Request.prototype.setExecute = function(execute) {
	if(execute != null) {
		this.makeMutexEmpty()
	}
	this.execute = execute
};
ezserverclient.easyxmlparse.E_Request.prototype.setFreeText = function(freeText) {
	this.freeText = freeText
};
ezserverclient.easyxmlparse.E_Request.prototype.setFuncMetadata = function(funcMetadata) {
	if(funcMetadata != null) {
		this.makeMutexEmpty()
	}
	this.funcMetadata = funcMetadata
};
ezserverclient.easyxmlparse.E_Request.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getExecute());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getFuncMetadata());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "freetext", this.getFreeText());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Response = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.error = new ezserverclient.easyxmlparse.E_Error();
	this.success = new ezserverclient.easyxmlparse.E_Success();
	this.metadata = new ezserverclient.easyxmlparse.E_Metadata();
	this.resultSet = new ezserverclient.easyxmlparse.E_ResultSet()
};
ezserverclient.easyxmlparse.E_Response.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_Response.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpErr = new ezserverclient.easyxmlparse.E_Error();
	tmpErr = tmpErr.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpErr.getElementName()));
	this.setError(tmpErr);
	var tmpSucc = new ezserverclient.easyxmlparse.E_Success();
	tmpSucc = tmpSucc.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpSucc.getElementName()));
	this.setSuccess(tmpSucc);
	var tmpMeta = new ezserverclient.easyxmlparse.E_Metadata();
	tmpMeta = tmpMeta.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpMeta.getElementName()));
	this.setMetadata(tmpMeta);
	var tmpRs = new ezserverclient.easyxmlparse.E_ResultSet();
	tmpRs = tmpRs.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpRs.getElementName()));
	this.setResultSet(tmpRs);
	this.setFreeText(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "freetext"));
	return this
};
ezserverclient.easyxmlparse.E_Response.prototype.getElementName = function() {
	return "RESPONSE"
};
ezserverclient.easyxmlparse.E_Response.prototype.getError = function() {
	return this.error
};
ezserverclient.easyxmlparse.E_Response.prototype.getFreeText = function() {
	return this.freeText
};
ezserverclient.easyxmlparse.E_Response.prototype.getMetadata = function() {
	return this.metadata
};
ezserverclient.easyxmlparse.E_Response.prototype.getResultSet = function() {
	return this.resultSet
};
ezserverclient.easyxmlparse.E_Response.prototype.getSuccess = function() {
	return this.success
};
ezserverclient.easyxmlparse.E_Response.prototype.makeMutexEmpty = function() {
	this.error = null;
	this.success = null;
	this.metadata = null;
	this.resultSet = null
};
ezserverclient.easyxmlparse.E_Response.prototype.setError = function(error) {
	if(error != null) {
		this.makeMutexEmpty()
	}
	this.error = error
};
ezserverclient.easyxmlparse.E_Response.prototype.setFreeText = function(freeText) {
	this.freeText = freeText
};
ezserverclient.easyxmlparse.E_Response.prototype.setMetadata = function(metadata) {
	if(metadata != null) {
		this.makeMutexEmpty()
	}
	this.metadata = metadata
};
ezserverclient.easyxmlparse.E_Response.prototype.setResultSet = function(vResultSet) {
	if(vResultSet != null) {
		this.makeMutexEmpty()
	}
	this.resultSet = vResultSet
};
ezserverclient.easyxmlparse.E_Response.prototype.setSuccess = function(success) {
	if(success != null) {
		this.makeMutexEmpty()
	}
	this.success = success
};
ezserverclient.easyxmlparse.E_Response.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getError());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getSuccess());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getMetadata());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getResultSet());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "freetext", this.getFreeText());
	return tmpThis
};
ezserverclient.easyxmlparse.E_ResultSet = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	ezserverclient.easyxmlparse.I_SizeSensate.call(this);
	this.layerExtension = new ezserverclient.easyxmlparse.E_LayerExtension();
	this.objectIdColumn = null;
	this.objectName = null;
	this.records = new ezserverclient.easyxmlparse.E_Records();
	this.recordsContainer = null;
	this.spatialFilterObjects = new ezserverclient.easyxmlparse.E_SpatialFilterObjects()
};
ezserverclient.easyxmlparse.E_ResultSet.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_ResultSet.prototype = new ezserverclient.easyxmlparse.I_SizeSensate;
ezserverclient.easyxmlparse.E_ResultSet.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpLE = new ezserverclient.easyxmlparse.E_LayerExtension();
	tmpLE = tmpLE.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpLE.getElementName()));
	this.setLayerExtension(tmpLE);
	var tmpSFOs = new ezserverclient.easyxmlparse.E_SpatialFilterObjects();
	tmpSFOs = tmpSFOs.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpSFOs.getElementName()));
	this.setSpatialFilterObjects(tmpSFOs);
	var tmpRecs = new ezserverclient.easyxmlparse.E_Records();
	var records = ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpRecs.getElementName());
	if(records instanceof Array) {
		var contents = [];
		for(var i = 0; i < records.length; i++) {
			var tmpRecs = new ezserverclient.easyxmlparse.E_Records();
			tmpRecs = tmpRecs.fromElement(records[i]);
			contents.push(tmpRecs)
		}
		this.recordsContainer = contents
	} else {
		tmpRecs = tmpRecs.fromElement(records);
		this.setRecords(tmpRecs)
	}
	this.setObjectName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectname"));
	this.setObjectIdColumn(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectidcolumn"));
	return this
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.getElementName = function() {
	return "RESULTSET"
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.getLayerExtension = function() {
	return this.layerExtension
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.getObjectIdColumn = function() {
	return this.objectIdColumn
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.getObjectName = function() {
	return this.objectName
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.getRecords = function() {
	return this.records
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.getSpatialFilterObjects = function() {
	return this.spatialFilterObjects
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.setLayerExtension = function(layerExtension) {
	this.layerExtension = layerExtension
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.setObjectIdColumn = function(objectIdColumn) {
	this.objectIdColumn = objectIdColumn
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.setObjectName = function(vTableName) {
	this.objectName = ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(vTableName, "")
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.setRecords = function(features) {
	if(features == null) {
		this.records = new ezserverclient.easyxmlparse.E_Records()
	} else {
		this.records = features
	}
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.setSpatialFilterObjects = function(vSpatialFilterObjects) {
	this.spatialFilterObjects = vSpatialFilterObjects
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getLayerExtension());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getSpatialFilterObjects());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getRecords());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectname", this.getObjectName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectidcolumn", this.getObjectIdColumn());
	return tmpThis
};
ezserverclient.easyxmlparse.E_ResultSet.prototype.getContentSize = function() {
	if(this.records == null) {
		return 0
	} else {
		return this.records.getContentSize()
	}
};
ezserverclient.easyxmlparse.E_Select = function() {
	ezserverclient.easyxmlparse.E_DML.call(this);
	this.beginRecord = 0;
	this.objectName = null;
	this.featureLimit = 1000000;
	this.columns = new ezserverclient.easyxmlparse.E_ColumnsClause();
	this.spatialFilters = new ezserverclient.easyxmlparse.E_SpatialFilters();
	this.where = new ezserverclient.easyxmlparse.E_WhereClause();
	this.linkTable = null;
	this.orderBy = null;
	this.alwaysReturnShape = 0;
	this.precision = null;
	this.distanceTolerance = null;
	this.solverecordcount = true
};
ezserverclient.easyxmlparse.E_Select.prototype = new ezserverclient.easyxmlparse.E_DML;
ezserverclient.easyxmlparse.E_Select.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpCC = new ezserverclient.easyxmlparse.E_ColumnsClause();
	tmpCC = tmpCC.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpCC.getElementName()));
	this.setColumns(tmpCC);
	var tmpTC = new ezserverclient.easyxmlparse.E_LinkTable();
	tmpTC = tmpTC.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpTC.getElementName()));
	this.setLinkTable(tmpTC);
	var tmpWC = new ezserverclient.easyxmlparse.E_WhereClauseSelect();
	tmpWC = tmpWC.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpWC.getElementName()));
	this.setWhere(tmpWC);
	var tmpSFs = new ezserverclient.easyxmlparse.E_SpatialFilters();
	tmpSFs = tmpSFs.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpSFs.getElementName()));
	this.setSpatialFilters(tmpSFs);
	var tmpOB = new ezserverclient.easyxmlparse.E_OrderByClause();
	tmpOB = tmpOB.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpOB.getElementName()));
	this.setOrderBy(tmpOB);
	this.setBeginRecord(ezserverclient.easyxmlparse.EzXmlTypeUtil.toLongValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "beginrecord"), 0));
	this.setSolveRecordcount(ezserverclient.easyxmlparse.EzXmlTypeUtil.toBooleanValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "solverecordcount"), true));
	this.setFeatureLimit(ezserverclient.easyxmlparse.EzXmlTypeUtil.toLongValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "featurelimit"), 1000000));
	this.setObjectName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectname"));
	this.setAlwaysReturnShape(ezserverclient.easyxmlparse.EzXmlTypeUtil.toBooleanValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "alwaysreturnshape"), false));
	this.setPrecision(ezserverclient.easyxmlparse.EzXmlTypeUtil.toIntegerValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "precision"), 12));
	this.setDistanceTolerance(ezserverclient.easyxmlparse.EzXmlTypeUtil.toDoubleValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "distancetolerance"), 0));
	return this
};
ezserverclient.easyxmlparse.E_Select.prototype.getOrderBy = function() {
	return this.orderBy
};
ezserverclient.easyxmlparse.E_Select.prototype.setOrderBy = function(orderBy) {
	this.orderBy = orderBy
};
ezserverclient.easyxmlparse.E_Select.prototype.getSolveRecordcount = function() {
	return this.solverecordcount
};
ezserverclient.easyxmlparse.E_Select.prototype.setSolveRecordcount = function(solverecordcount) {
	this.solverecordcount = solverecordcount
};
ezserverclient.easyxmlparse.E_Select.prototype.getBeginRecord = function() {
	return this.beginRecord
};
ezserverclient.easyxmlparse.E_Select.prototype.getColumns = function() {
	return this.columns
};
ezserverclient.easyxmlparse.E_Select.prototype.getDistanceTolerance = function() {
	return this.distanceTolerance
};
ezserverclient.easyxmlparse.E_Select.prototype.getElementName = function() {
	return "SELECT"
};
ezserverclient.easyxmlparse.E_Select.prototype.getFeatureLimit = function() {
	return this.featureLimit
};
ezserverclient.easyxmlparse.E_Select.prototype.getLinkTable = function() {
	return this.linkTable
};
ezserverclient.easyxmlparse.E_Select.prototype.getObjectName = function() {
	return this.objectName
};
ezserverclient.easyxmlparse.E_Select.prototype.getPrecision = function() {
	return this.precision
};
ezserverclient.easyxmlparse.E_Select.prototype.getSpatialFilters = function() {
	return this.spatialFilters
};
ezserverclient.easyxmlparse.E_Select.prototype.getWhere = function() {
	return this.where
};
ezserverclient.easyxmlparse.E_Select.prototype.isAlwaysReturnShape = function() {
	return this.alwaysReturnShape
};
ezserverclient.easyxmlparse.E_Select.prototype.setAlwaysReturnShape = function(alwaysReturnShape) {
	this.alwaysReturnShape = alwaysReturnShape
};
ezserverclient.easyxmlparse.E_Select.prototype.setBeginRecord = function(beginrecord) {
	if(beginrecord < 0) {
		this.beginRecord = 0
	} else {
		this.beginRecord = beginrecord
	}
};
ezserverclient.easyxmlparse.E_Select.prototype.setColumns = function(subfields) {
	if(this.columns == null) {
		this.columns = new ezserverclient.easyxmlparse.E_ColumnsClause()
	} else {
		this.columns = subfields
	}
};
ezserverclient.easyxmlparse.E_Select.prototype.setDistanceTolerance = function(distanceTolerance) {
	this.distanceTolerance = distanceTolerance
};
ezserverclient.easyxmlparse.E_Select.prototype.setFeatureLimit = function(featurelimit) {
	if(featurelimit < 0) {
		this.featureLimit = 0
	} else {
		this.featureLimit = featurelimit
	}
};
ezserverclient.easyxmlparse.E_Select.prototype.setLinkTable = function(tables) {
	this.linkTable = tables
};
ezserverclient.easyxmlparse.E_Select.prototype.setObjectName = function(vTableName) {
	this.objectName = ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(vTableName, "")
};
ezserverclient.easyxmlparse.E_Select.prototype.setPrecision = function(precision) {
	this.precision = precision
};
ezserverclient.easyxmlparse.E_Select.prototype.setSpatialFilters = function(vSpatialFilters) {
	this.spatialFilters = vSpatialFilters
};
ezserverclient.easyxmlparse.E_Select.prototype.setWhere = function(vCondition) {
	this.where = vCondition
};
ezserverclient.easyxmlparse.E_Select.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getColumns());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getLinkTable());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getWhere());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getSpatialFilters());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getOrderBy());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "beginrecord", ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(this.getBeginRecord()));
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "solverecordcount", ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(this.getSolveRecordcount()));
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "featurelimit", ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(this.getFeatureLimit()));
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectname", this.getObjectName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "alwaysreturnshape", ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(this.isAlwaysReturnShape()));
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "precision", ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(this.getPrecision()));
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "distancetolerance", ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(this.getDistanceTolerance()));
	return tmpThis
};
ezserverclient.easyxmlparse.E_Select.prototype.getDMLType = function() {
	return E_DMLType.SELECT.name
};
ezserverclient.easyxmlparse.E_Shape = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.content = "";
	this.geoType = null
};
ezserverclient.easyxmlparse.E_Shape.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_Shape.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpContent = ezserverclient.easyxmlparse.EzXmlDomUtil.getContext(vSrcElem);
	this.setContent(tmpContent);
	this.setGeoType(ezserverclient.easyxmlparse.P_GeometryType.getGeometryType(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "geotype")));
	return this
};
ezserverclient.easyxmlparse.E_Shape.prototype.getContent = function() {
	return this.content
};
ezserverclient.easyxmlparse.E_Shape.prototype.getElementName = function() {
	return "SHAPE"
};
ezserverclient.easyxmlparse.E_Shape.prototype.getGeoType = function() {
	return this.geoType
};
ezserverclient.easyxmlparse.E_Shape.prototype.setContent = function(content) {
	this.content = ezserverclient.easyxmlparse.string_trim(ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(content, ""))
};
ezserverclient.easyxmlparse.E_Shape.prototype.setGeoType = function(gtype) {
	if(gtype == null) {
		this.geoType = ezserverclient.easyxmlparse.P_GeometryType.NilType
	} else {
		this.geoType = gtype
	}
};
ezserverclient.easyxmlparse.E_Shape.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setContext(tmpThis, this.getContent());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "geotype", this.getGeoType());
	return tmpThis
};
ezserverclient.easyxmlparse.E_SpatialFilter = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.bufferUnit = null;
	this.bufferSize = null;
	this.relation = ezserverclient.easyxmlparse.P_SpatialRelation.NilType;
	this.shape = new ezserverclient.easyxmlparse.E_Shape()
};
ezserverclient.easyxmlparse.E_SpatialFilter.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_SpatialFilter.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpShp = new ezserverclient.easyxmlparse.E_Shape();
	tmpShp = tmpShp.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpShp.getElementName()));
	this.setShape(tmpShp);
	this.setRelation(ezserverclient.easyxmlparse.P_SpatialRelation.getRelationType(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "relation")));
	this.setBufferSize(ezserverclient.easyxmlparse.EzXmlTypeUtil.toDoubleValue(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "buffersize"), 0));
	this.setBufferUnit(ezserverclient.easyxmlparse.P_BufferUnit.getUnitType(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "bufferunit")));
	return this
};
ezserverclient.easyxmlparse.E_SpatialFilter.prototype.getBufferSize = function() {
	return this.bufferSize
};
ezserverclient.easyxmlparse.E_SpatialFilter.prototype.getBufferUnit = function() {
	return this.bufferUnit
};
ezserverclient.easyxmlparse.E_SpatialFilter.prototype.getElementName = function() {
	return "SPATIALFILTER"
};
ezserverclient.easyxmlparse.E_SpatialFilter.prototype.getRelation = function() {
	return this.relation
};
ezserverclient.easyxmlparse.E_SpatialFilter.prototype.getShape = function() {
	return this.shape
};
ezserverclient.easyxmlparse.E_SpatialFilter.prototype.setBufferSize = function(buffersize) {
	if(buffersize < 0) {
		this.bufferSize = 0
	} else {
		this.bufferSize = buffersize
	}
};
ezserverclient.easyxmlparse.E_SpatialFilter.prototype.setBufferUnit = function(bufferUnit) {
	if(bufferUnit == null) {
		this.bufferUnit = null
	} else {
		this.bufferUnit = bufferUnit
	}
};
ezserverclient.easyxmlparse.E_SpatialFilter.prototype.setRelation = function(relation) {
	if(relation == null) {
		this.relation = ezserverclient.easyxmlparse.P_SpatialRelation.NilType
	} else {
		this.relation = relation
	}
};
ezserverclient.easyxmlparse.E_SpatialFilter.prototype.setShape = function(shape) {
	if(shape == null) {
		this.shape = new ezserverclient.easyxmlparse.E_Shape()
	} else {
		this.shape = shape
	}
};
ezserverclient.easyxmlparse.E_SpatialFilter.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getShape());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "relation", this.getRelation());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "buffersize", ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(this.getBufferSize()));
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "bufferunit", this.getBufferUnit());
	return tmpThis
};
ezserverclient.easyxmlparse.E_SpatialFilterLayer = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.objectName = "";
	this.where = new ezserverclient.easyxmlparse.E_WhereClause();
	this.relation = ezserverclient.easyxmlparse.P_SpatialRelation.NilType
};
ezserverclient.easyxmlparse.E_SpatialFilterLayer.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_SpatialFilterLayer.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpWC = new ezserverclient.easyxmlparse.E_WhereClause();
	tmpWC = tmpWC.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpWC.getElementName()));
	this.setWhere(tmpWC);
	this.setObjectName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectname"));
	this.setRelation(ezserverclient.easyxmlparse.P_SpatialRelation.getRelationType(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "relation")));
	return this
};
ezserverclient.easyxmlparse.E_SpatialFilterLayer.prototype.getElementName = function() {
	return "SPATIALFILTERLAYER"
};
ezserverclient.easyxmlparse.E_SpatialFilterLayer.prototype.getObjectName = function() {
	return this.objectName
};
ezserverclient.easyxmlparse.E_SpatialFilterLayer.prototype.getRelation = function() {
	return this.relation
};
ezserverclient.easyxmlparse.E_SpatialFilterLayer.prototype.getWhere = function() {
	return this.where
};
ezserverclient.easyxmlparse.E_SpatialFilterLayer.prototype.setObjectName = function(vTableName) {
	this.objectName = ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(vTableName, "")
};
ezserverclient.easyxmlparse.E_SpatialFilterLayer.prototype.setRelation = function(relation) {
	if(relation == null) {
		this.relation = ezserverclient.easyxmlparse.P_SpatialRelation.NilType
	} else {
		this.relation = relation
	}
};
ezserverclient.easyxmlparse.E_SpatialFilterLayer.prototype.setWhere = function(vCondition) {
	if(vCondition == null) {
		this.where = new ezserverclient.easyxmlparse.E_WhereClause()
	} else {
		this.where = vCondition
	}
};
ezserverclient.easyxmlparse.E_SpatialFilterLayer.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getWhere());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectname", this.getObjectName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "relation", this.getRelation());
	return tmpThis
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	ezserverclient.easyxmlparse.E_Collection.call(this);
	this.shapeContainer = new Array()
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype = new ezserverclient.easyxmlparse.E_Collection;
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.add = function(e) {
	return this.shapeContainer.push(e)
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.add2 = function(vObject) {
	return push(vObject)
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.clear = function() {
	this.shapeContainer.splice(0, shapeContainer.length - 1)
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpShpT = new ezserverclient.easyxmlparse.E_Shape();
	var tmpShpList = ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElements(vSrcElem, tmpShpT.getElementName());
	var tmpShpC = new Array();
	for(var i = 0; i < tmpShpList.length; i++) {
		var tmpShp = new ezserverclient.easyxmlparse.E_Shape();
		tmpShp = tmpShp.fromElement(tmpShpList[i]);
		tmpShpC.push(tmpShp)
	}
	this.shapeContainer = tmpShpC;
	return this
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.get = function(index) {
	return this.shapeContainer[index]
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.get2 = function(index) {
	return this.get(index)
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.getElementName = function() {
	return "SPATIALFILTEROBJECTS"
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.isEmpty = function() {
	if(this.shapeContainer.length == 0) {
		return true
	}
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.remove = function(index) {
	return this.shapeContainer.splice(index, index)
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.remove2 = function(vObject) {
	return this.shapeContainer.splice(vObject, vObject)
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.size = function() {
	return this.shapeContainer.length
};
ezserverclient.easyxmlparse.E_SpatialFilterObjects.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	for(var i = 0; i < this.shapeContainer.length; i++) {
		ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.shapeContainer[i])
	}
	return tmpThis
};
ezserverclient.easyxmlparse.E_SpatialFilters = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	ezserverclient.easyxmlparse.E_Collection.call(this);
	this.filterContainer = new Array();
	this.filterLayer = null
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_SpatialFilters.prototype = new ezserverclient.easyxmlparse.E_Collection;
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.add = function(e) {
	if(this.filterContainer.length < 5) {
		this.filterLayer = null;
		return this.filterContainer.push(e)
	} else {
		return false
	}
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.add2 = function(vObject) {
	return this.add(vObject)
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.clear = function() {
	this.filterContainer.splice(0, this.filterContainer.length - 1)
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpFilterT = new ezserverclient.easyxmlparse.E_SpatialFilter();
	var tmpFilterList = ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElements(vSrcElem, tmpFilterT.getElementName());
	var tmpFilterC = new Array();
	for(var i = 0; i < tmpFilterList.length; i++) {
		var tmpFilter = new ezserverclient.easyxmlparse.E_SpatialFilter();
		tmpFilter.fromElement(tmpFilterList[i]);
		tmpFilterC.push(tmpFilter)
	}
	this.filterContainer = tmpFilterC;
	var tmpSFL = new ezserverclient.easyxmlparse.E_SpatialFilterLayer();
	tmpSFL = tmpSFL.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpSFL.getElementName()));
	this.setFilterLayer(tmpSFL);
	return this
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.get = function(index) {
	return this.filterContainer[index]
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.get2 = function(index) {
	return this.filterContainer[index]
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.getElementName = function() {
	return "SPATIALFILTERS"
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.getFilterLayer = function() {
	return this.filterLayer
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.isEmpty = function() {
	if(this.filterContainer.length == 0) {
		return true
	}
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.remove = function(index) {
	return this.filterContainer.splice(index, index)
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.remove2 = function(vObject) {
	return this.filterContainer.splice(vObject, vObject)
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.setFilterLayer = function(filterLayer) {
	if(filterLayer != null) {
		this.filterLayer = filterLayer;
		this.filterContainer.splice(0)
	} else {
		this.filterLayer = null
	}
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.size = function() {
	return this.filterContainer.length
};
ezserverclient.easyxmlparse.E_SpatialFilters.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	for(var i = 0; i < this.filterContainer.length; i++) {
		ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.filterContainer[i])
	}
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getFilterLayer());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Success = function() {
	ezserverclient.easyxmlparse.E_Element.call(this)
};
ezserverclient.easyxmlparse.E_Success.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_Success.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	return this
};
ezserverclient.easyxmlparse.E_Success.prototype.getElementName = function() {
	return "SUCCESS"
};
ezserverclient.easyxmlparse.E_Success.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	return tmpThis
};
ezserverclient.easyxmlparse.E_TableMeta = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.name = null;
	this.displayName = null;
	this.fieldsMeta = new ezserverclient.easyxmlparse.E_FieldsMeta();
	this.objectIdColumn = null;
	this.layerExtension = new ezserverclient.easyxmlparse.E_LayerExtension()
};
ezserverclient.easyxmlparse.E_TableMeta.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_TableMeta.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpLE = new ezserverclient.easyxmlparse.E_LayerExtension();
	tmpLE = tmpLE.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpLE.getElementName()));
	this.setLayerExtension(tmpLE);
	var tmpFsM = new ezserverclient.easyxmlparse.E_FieldsMeta();
	tmpFsM = tmpFsM.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpFsM.getElementName()));
	this.setFieldsMeta(tmpFsM);
	this.setDisplayName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "displayname"));
	this.setName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "name"));
	this.setObjectIdColumn(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectidcolumn"));
	return this
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.getDisplayName = function() {
	return this.displayName
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.getElementName = function() {
	return "TABLEMETA"
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.getFieldsMeta = function() {
	return this.fieldsMeta
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.getLayerExtension = function() {
	return this.layerExtension
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.getName = function() {
	return this.name
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.getObjectIdColumn = function() {
	return this.objectIdColumn
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.setDisplayName = function(displayName) {
	this.displayName = displayName
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.setFieldsMeta = function(fieldsMeta) {
	if(fieldsMeta == null) {
		this.fieldsMeta = new ezserverclient.easyxmlparse.E_FieldsMeta()
	} else {
		this.fieldsMeta = fieldsMeta
	}
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.setLayerExtension = function(layerExtension) {
	this.layerExtension = layerExtension
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.setName = function(name) {
	this.name = name
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.setObjectIdColumn = function(objectIdColumn) {
	this.objectIdColumn = objectIdColumn
};
ezserverclient.easyxmlparse.E_TableMeta.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getLayerExtension());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getFieldsMeta());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "displayname", this.getDisplayName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "name", this.getName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectidcolumn", this.getObjectIdColumn());
	return tmpThis
};
ezserverclient.easyxmlparse.E_FieldsMeta = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	ezserverclient.easyxmlparse.E_Collection.call(this);
	this.fieldMetaContainer = new Array()
};
ezserverclient.easyxmlparse.E_FieldsMeta.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_FieldsMeta.prototype = new ezserverclient.easyxmlparse.E_Collection;
ezserverclient.easyxmlparse.E_FieldsMeta.prototype.add = function(e) {
	return this.fieldMetaContainer.push(e)
};
ezserverclient.easyxmlparse.E_FieldsMeta.prototype.add2 = function(vObject) {
	return this.fieldMetaContainer.push(vObject)
};
ezserverclient.easyxmlparse.E_FieldsMeta.prototype.clear = function() {
	this.fieldMetaContainer.splice(0, this.fieldMetaContainer.length - 1)
};
ezserverclient.easyxmlparse.E_FieldsMeta.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpFdT = new ezserverclient.easyxmlparse.E_FieldMeta();
	var tmpFdList = ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElements(vSrcElem, tmpFdT.getElementName());
	var tmpFdContainer = new Array();
	for(var i = 0; i < tmpFdList.length; i++) {
		var tmpFd = new ezserverclient.easyxmlparse.E_FieldMeta();
		tmpFd = tmpFd.fromElement(tmpFdList[i]);
		tmpFdContainer.push(tmpFd)
	}
	this.fieldMetaContainer = tmpFdContainer;
	return this
};
ezserverclient.easyxmlparse.E_FieldsMeta.prototype.get2 = function(index) {
	return this.fieldMetaContainer[index]
};
ezserverclient.easyxmlparse.E_FieldsMeta.prototype.getElementName = function() {
	return "FIELDSMETA"
};
ezserverclient.easyxmlparse.E_FieldsMeta.prototype.isEmpty = function() {
	if(this.fieldMetaContainer.length == 0) {
		return true
	}
};
ezserverclient.easyxmlparse.E_FieldsMeta.prototype.remove = function(index) {
	return this.fieldMetaContainer.splice(index, index)
};
ezserverclient.easyxmlparse.E_FieldsMeta.prototype.remove2 = function(vObject) {
	return this.fieldMetaContainer.splice(vObject, vObject)
};
ezserverclient.easyxmlparse.E_FieldsMeta.prototype.size = function() {
	return this.fieldMetaContainer.length
};
ezserverclient.easyxmlparse.E_FieldsMeta.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	for(var i = 0; i < this.fieldMetaContainer.length; i++) {
		ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.fieldMetaContainer[i])
	}
	return tmpThis
};
ezserverclient.easyxmlparse.E_TablesMeta = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	ezserverclient.easyxmlparse.E_Collection.call(this);
	this.tableMetaContainer = new Array()
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_TablesMeta.prototype = new ezserverclient.easyxmlparse.E_Collection;
ezserverclient.easyxmlparse.E_TablesMeta.add = function(e) {
	return this.tableMetaContainer.push(e)
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype.add2 = function(vObject) {
	return this.tableMetaContainer.push(vObject)
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype.clear = function() {
	this.tableMetaContainer.splice(0, this.tableMetaContainer.length - 1)
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpTableF = new ezserverclient.easyxmlparse.E_TableMeta();
	tmpTableList = ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElements(vSrcElem, tmpTableF.getElementName());
	var tmpTableContainer = new Array();
	for(var i = 0; i < tmpTableList.length; i++) {
		var tmpTableT = new ezserverclient.easyxmlparse.E_TableMeta();
		var tmpTable = tmpTableT.fromElement(tmpTableList[i]);
		tmpTableContainer.push(tmpTable)
	}
	this.tableMetaContainer = tmpTableContainer;
	return this
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype.get = function(index) {
	return this.tableMetaContainer[index]
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype.get2 = function(index) {
	return this.tableMetaContainer[index]
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype.getElementName = function() {
	return "TABLESMETA"
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype.isEmpty = function() {
	if(this.tableMetaContainer.length == 0) {
		return true
	}
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype.remove = function(index) {
	return this.tableMetaContainer.splice(index, index)
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype.remove2 = function(vObject) {
	return this.tableMetaContainer.splice(vObject, vObject)
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype.size = function() {
	return this.tableMetaContainer.length
};
ezserverclient.easyxmlparse.E_TablesMeta.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	for(var i = 0; i < this.tableMetaContainer.length; i++) {
		ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.tableMetaContainer[i])
	}
	return tmpThis
};
ezserverclient.easyxmlparse.E_Update = function() {
	ezserverclient.easyxmlparse.E_DML.call(this);
	this.fields = new ezserverclient.easyxmlparse.E_Fields();
	this.objectName = null;
	this.whereClause = new ezserverclient.easyxmlparse.E_WhereClause()
};
ezserverclient.easyxmlparse.E_Update.prototype = new ezserverclient.easyxmlparse.E_DML;
ezserverclient.easyxmlparse.E_Update.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpFs = new ezserverclient.easyxmlparse.E_Fields();
	tmpFs = tmpFs.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpFs.getElementName()));
	this.setFields(tmpFs);
	var tmpWhere = new ezserverclient.easyxmlparse.E_WhereClause();
	tmpWhere = tmpWhere.fromElement(ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement(vSrcElem, tmpWhere.getElementName()));
	this.setWhereClause(tmpWhere);
	this.setObjectName(ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute(vSrcElem, "objectname"));
	return this
};
ezserverclient.easyxmlparse.E_Update.prototype.getElementName = function() {
	return "UPDATE"
};
ezserverclient.easyxmlparse.E_Update.prototype.getFields = function() {
	return this.fields
};
ezserverclient.easyxmlparse.E_Update.prototype.getObjectName = function() {
	return this.objectName
};
ezserverclient.easyxmlparse.E_Update.prototype.getWhereClause = function() {
	return this.whereClause
};
ezserverclient.easyxmlparse.E_Update.prototype.setFields = function(fields) {
	if(fields == null) {
		this.fields = new ezserverclient.easyxmlparse.E_Fields()
	} else {
		this.fields = fields
	}
};
ezserverclient.easyxmlparse.E_Update.prototype.setObjectName = function(vTableName) {
	this.objectName = ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(vTableName, "")
};
ezserverclient.easyxmlparse.E_Update.prototype.setWhereClause = function(vCondition) {
	if(vCondition == null) {
		this.whereClause = new ezserverclient.easyxmlparse.E_WhereClause()
	} else {
		this.whereClause = vCondition
	}
};
ezserverclient.easyxmlparse.E_Update.prototype.toElement = function(doc) {
	tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getFields());
	ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement(tmpThis, this.getWhereClause());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute(tmpThis, "objectname", this.getObjectName());
	return tmpThis
};
ezserverclient.easyxmlparse.E_Update.prototype.getDMLType = function() {
	return _DMLType.UPDATE.name
};
ezserverclient.easyxmlparse.E_WhereClause = function() {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.content = "(1=2)"
};
ezserverclient.easyxmlparse.E_WhereClause.prototpye = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.E_WhereClause.prototype.fromElement = function(vSrcElem) {
	if(vSrcElem == null) {
		return null
	}
	var tmpContent = ezserverclient.easyxmlparse.EzXmlDomUtil.getContext(vSrcElem);
	this.setContent(tmpContent);
	return this
};
ezserverclient.easyxmlparse.E_WhereClause.prototype.getContent = function() {
	return this.content
};
ezserverclient.easyxmlparse.E_WhereClause.prototype.getElementName = function() {
	return "WHERECLAUSE"
};
ezserverclient.easyxmlparse.E_WhereClause.prototype.setContent = function(where) {
	var tmpWhere = ezserverclient.easyxmlparse.string_trim(ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(where, "(1=2)"));
	if(tmpWhere.length == 0) {
		this.content = "(1=2)"
	} else {
		this.content = tmpWhere
	}
};
ezserverclient.easyxmlparse.E_WhereClause.prototype.toElement = function(doc) {
	var tmpThis = ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS(doc, this.getElementName());
	ezserverclient.easyxmlparse.EzXmlDomUtil.setContext(tmpThis, this.getContent());
	return tmpThis
};
ezserverclient.easyxmlparse.E_WhereClauseSelect = function() {
	ezserverclient.easyxmlparse.E_WhereClause.call(this);
	this.content = "(1=1)";
	this.setContent = function(where) {
		var tmpWhere = ezserverclient.easyxmlparse.string_trim(ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue(where, "(1=1)"));
		if(tmpWhere.length == 0) {
			this.content = "(1=1)"
		} else {
			this.content = tmpWhere
		}
	}
};
ezserverclient.easyxmlparse.E_WhereClauseSelect.prototype = new ezserverclient.easyxmlparse.E_WhereClause;
ezserverclient.easyxmlparse.EzXmlDomUtil = function() {};
ezserverclient.easyxmlparse.EzXmlDomUtil.addChildElement = function(vElem, vChild) {
	if(vChild == null) {
		return
	} else {
		vElem.appendChild(vChild.toElement(vElem.ownerDocument))
	}
};
ezserverclient.easyxmlparse.EzXmlDomUtil.createElement = function(vDoc, vElemName) {
	return vDoc.createElement(vElemName)
};
ezserverclient.easyxmlparse.EzXmlDomUtil.createElementNS = function(vDoc, vElemName) {
	var vdoc1 = vDoc.createElement(vElemName);
	return vdoc1
};
ezserverclient.easyxmlparse.EzXmlDomUtil.equal = function(vStr1, vStr2, vConsiderCase) {
	if(vStr1 == null && vStr2 == null) {
		return true
	}
	if(vStr1 != null && vStr2 != null) {
		if(vConsiderCase) {
			if(vStr1.compareTo(vStr2) == 0) {
				return true
			}
		} else {
			if(vStr1.compareToIgnoreCase(vStr2) == 0) {
				return true
			}
		}
	}
	return false
};
ezserverclient.easyxmlparse.EzXmlDomUtil.getAttribute = function(vElem, vAttrName) {
	if(vElem.nodeName == "#comment") {
		return null
	}
	try {
		var tmpValue = vElem.getAttribute(vAttrName);
		return tmpValue
	} catch(e) {}
};
ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElement = function(vElem, vTagName) {
	if(vElem.nodeName == "#comment") {
		return null
	}
	try {
		var tmpList = vElem.getElementsByTagName(vTagName);
		if(tmpList.length == 0) {
			return null
		} else {
			var recordsArr = [];
			for(var i = 0; i < tmpList.length; i++) {
				var tmpElem = tmpList.item(i);
				if(tmpElem.parentNode.nodeName == vElem.nodeName) {
					if(vTagName == "RECORDS") {
						recordsArr.push(tmpElem)
					} else {
						return tmpElem
					}
				}
			}
			if(recordsArr.length == 1) {
				return recordsArr[0]
			}
			if(recordsArr.length > 1) {
				return recordsArr
			}
			if(recordsArr.length == 0) {
				return null
			}
		}
	} catch(e) {}
};
ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElements = function(vElem, vTag) {
	this.tmpList = vElem.getElementsByTagName(vTag);
	if(tmpList.length == 0) {
		return new Array()
	} else {
		var tmpElemList = new Array[tmpList.length];
		for(var i = 0; i < tmpElemList.length; i++) {
			tmpElemList[i] = tmpList.item(i)
		}
		return tmpElemList
	}
};
ezserverclient.easyxmlparse.EzXmlDomUtil.getChildElements = function(vElem) {
	var tmpList;
	tmpList = vElem.childNodes;
	if(tmpList.length == 0) {
		return new Array()
	} else {
		var tmpElemList = new Array();
		for(var i = 0; i < tmpList.length; i++) {
			var nd = tmpList.item(i);
			if(typeof(nd) == "object") {
				if(nd.nodeType == 1) {
					tmpElemList.push(nd)
				}
			}
		}
		return tmpElemList.slice(0)
	}
};
ezserverclient.easyxmlparse.EzXmlDomUtil.getContext = function(vElem) {
	var tmpBuffer = new Array();
	var tmpNodeList = vElem.childNodes;
	for(var i = 0; i < tmpNodeList.length; i++) {
		var tmpNode = tmpNodeList.item(i);
		if(typeof(tmpNode) == "object") {
			tmpBuffer.push(tmpNode.nodeValue)
		}
	}
	return tmpBuffer.toString()
};
ezserverclient.easyxmlparse.EzXmlDomUtil.getEzXMLNamespace = function() {
	return "http://mapservice.easymap.com"
};
ezserverclient.easyxmlparse.EzXmlDomUtil.setAttribute = function(vElem, vAttrName, vAttrValue) {
	if(vAttrValue == null) {} else {
		vElem.setAttribute(vAttrName, vAttrValue)
	}
};
ezserverclient.easyxmlparse.EzXmlDomUtil.setContext = function(vElem, vContext) {
	if(vContext != null) {
		var tmpText = vElem.ownerDocument.createTextNode(vContext);
		var tmpNodeList = vElem.childNodes;
		for(var i = tmpNodeList.length - 1; i >= 0; i--) {
			var tmpNode = tmpNodeList.item(i);
			if(tmpNode instanceof String) {
				vElem.removeChild(tmpNode)
			}
		}
		vElem.insertBefore(tmpText, vElem.firstChild)
	}
};
ezserverclient.easyxmlparse.EzXmlException = function() {
	this.ezserverclient.easyxmlparse.EzXmlException = function(vMessage) {}
};
ezserverclient.easyxmlparse.EzXmlException.serialVersionUID = 5134137959227322000;
ezserverclient.easyxmlparse.EzXmlTypeUtil = {};
ezserverclient.easyxmlparse.EzXmlTypeUtil.toBooleanValue = function(vValue, vDefaultValue) {
	var tmpValue = ezserverclient.easyxmlparse.string_trim(this.toStringValue(vValue, ""));
	if(arguments.length == 1) {
		if(tmpValue.length == 0) {
			return false
		} else {
			try {
				if(tmpValue && tmpValue == "true") {
					return true
				} else {
					return false
				}
			} catch(e) {
				return false
			}
		}
	} else {
		if(arguments.length == 2) {
			if(tmpValue.length == 0) {
				return vDefaultValue
			} else {
				try {
					if(tmpValue && tmpValue == "true") {
						return true
					} else {
						return false
					}
				} catch(e) {
					return vDefaultValue
				}
			}
		}
	}
};
ezserverclient.easyxmlparse.EzXmlTypeUtil.toDoubleValue = function(vValue, vDefaultValue) {
	var tmpValue = ezserverclient.easyxmlparse.string_trim(this.toStringValue(vValue, ""));
	if(arguments.length == 1) {
		if(tmpValue.length == 0) {
			return Number.NaN
		} else {
			try {
				return parseFloat(tmpValue)
			} catch(e) {
				return Number.NaN
			}
		}
	} else {
		if(arguments.length == 2) {
			if(tmpValue.length == 0) {
				return vDefaultValue
			} else {
				try {
					return parseFloat(tmpValue)
				} catch(e) {
					return vDefaultValue
				}
			}
		}
	}
};
ezserverclient.easyxmlparse.EzXmlTypeUtil.toIntegerValue = function(vValue, vDefaultValue) {
	var tmpValue = ezserverclient.easyxmlparse.string_trim(this.toStringValue(vValue, ""));
	if(arguments.length == 1) {
		if(tmpValue.length == 0) {
			return 0
		} else {
			try {
				return parseInt(tmpValue)
			} catch(e) {
				return 0
			}
		}
	} else {
		if(arguments.length == 2) {
			if(tmpValue.length == 0) {
				return vDefaultValue
			} else {
				try {
					return parseInt(tmpValue)
				} catch(e) {
					return vDefaultValue
				}
			}
		}
	}
};
ezserverclient.easyxmlparse.EzXmlTypeUtil.toLongValue = function(vValue, vDefaultValue) {
	var tmpValue = ezserverclient.easyxmlparse.string_trim(this.toStringValue(vValue, ""));
	if(arguments.length == 1) {
		if(tmpValue.length == 0) {
			return 0
		} else {
			try {
				return parseInt(tmpValue)
			} catch(e) {
				return 0
			}
		}
	} else {
		if(arguments.length == 2) {
			if(tmpValue.length == 0) {
				return vDefaultValue
			} else {
				try {
					return parseInt(tmpValue)
				} catch(e) {
					return vDefaultValue
				}
			}
		}
	}
};
ezserverclient.easyxmlparse.EzXmlTypeUtil.toStringValue = function(vObj, vNullString) {
	if(arguments.length == 1) {
		if(vObj == null) {
			return ""
		} else {
			return vObj.toString()
		}
	} else {
		if(arguments.length == 2) {
			if(vObj == null) {
				return vNullString
			} else {
				return vObj.toString()
			}
		}
	}
};
ezserverclient.easyxmlparse.P_BufferUnit = function(vUnitTypeName) {
	this.unitTypeName = vUnitTypeName
};
ezserverclient.easyxmlparse.P_BufferUnit.DegreeType = new ezserverclient.easyxmlparse.P_BufferUnit("degree");
ezserverclient.easyxmlparse.P_BufferUnit.MeterType = new ezserverclient.easyxmlparse.P_BufferUnit("meter");
ezserverclient.easyxmlparse.P_BufferUnit.NilType = new ezserverclient.easyxmlparse.P_BufferUnit("nil");
ezserverclient.easyxmlparse.P_BufferUnit.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.P_BufferUnit.getUnitType = function(vUnitTypeName) {
	if(vUnitTypeName == null || vUnitTypeName.length == 0) {
		return ezserverclient.easyxmlparse.P_BufferUnit.NilType.unitTypeName
	}
	if(ezserverclient.easyxmlparse.P_BufferUnit.DegreeType.unitTypeName == vUnitTypeName) {
		return ezserverclient.easyxmlparse.P_BufferUnit.DegreeType.unitTypeName
	}
	if(ezserverclient.easyxmlparse.P_BufferUnit.MeterType.unitTypeName == vUnitTypeName) {
		return ezserverclient.easyxmlparse.P_BufferUnit.MeterType.unitTypeName
	}
	return ezserverclient.easyxmlparse.P_BufferUnit.NilType.unitTypeName
};
ezserverclient.easyxmlparse.P_BufferUnit.prototype.fromElement = function(e) {
	throw new Error("功能没有实现")
};
ezserverclient.easyxmlparse.P_BufferUnit.prototype.getElementName = function() {
	return "bufferunit"
};
ezserverclient.easyxmlparse.P_BufferUnit.prototype.toElement = function(doc) {
	throw new Error("功能没有实现")
};
ezserverclient.easyxmlparse.P_BufferUnit.prototype.toString = function() {
	return this.unitTypeName
};
ezserverclient.easyxmlparse.P_FieldType = function(vFieldTypeName) {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.fieldTypeName = vFieldTypeName
};
ezserverclient.easyxmlparse.P_FieldType.DateType = new ezserverclient.easyxmlparse.P_FieldType("Date");
ezserverclient.easyxmlparse.P_FieldType.Int16Type = new ezserverclient.easyxmlparse.P_FieldType("Int16");
ezserverclient.easyxmlparse.P_FieldType.Int32Type = new ezserverclient.easyxmlparse.P_FieldType("Int32");
ezserverclient.easyxmlparse.P_FieldType.Int64Type = new ezserverclient.easyxmlparse.P_FieldType("Int64");
ezserverclient.easyxmlparse.P_FieldType.FloatType = new ezserverclient.easyxmlparse.P_FieldType("Float");
ezserverclient.easyxmlparse.P_FieldType.DoubleType = new ezserverclient.easyxmlparse.P_FieldType("Double");
ezserverclient.easyxmlparse.P_FieldType.StringType = new ezserverclient.easyxmlparse.P_FieldType("String");
ezserverclient.easyxmlparse.P_FieldType.BinaryType = new ezserverclient.easyxmlparse.P_FieldType("Binary");
ezserverclient.easyxmlparse.P_FieldType.GeometryType = new ezserverclient.easyxmlparse.P_FieldType("Geometry");
ezserverclient.easyxmlparse.P_FieldType.OtherType = new ezserverclient.easyxmlparse.P_FieldType("Other");
ezserverclient.easyxmlparse.P_FieldType.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.P_FieldType.getFieldType = function(vFieldTypeName) {
	if(vFieldTypeName == null || vFieldTypeName.length == 0) {
		return ezserverclient.easyxmlparse.P_FieldType.OtherType.fieldTypeName
	}
	if(ezserverclient.easyxmlparse.P_FieldType.DateType.fieldTypeName == vFieldTypeName) {
		return ezserverclient.easyxmlparse.P_FieldType.DateType.fieldTypeName
	}
	if(ezserverclient.easyxmlparse.P_FieldType.Int16Type.fieldTypeName == vFieldTypeName) {
		return ezserverclient.easyxmlparse.P_FieldType.Int16Type.fieldTypeName
	}
	if(ezserverclient.easyxmlparse.P_FieldType.Int32Type.fieldTypeName == vFieldTypeName) {
		return ezserverclient.easyxmlparse.P_FieldType.Int32Type.fieldTypeName
	}
	if(ezserverclient.easyxmlparse.P_FieldType.Int64Type.fieldTypeName == vFieldTypeName) {
		return ezserverclient.easyxmlparse.P_FieldType.Int64Type.fieldTypeName
	}
	if(ezserverclient.easyxmlparse.P_FieldType.FloatType.fieldTypeName == vFieldTypeName) {
		return ezserverclient.easyxmlparse.P_FieldType.FloatType.fieldTypeName
	}
	if(ezserverclient.easyxmlparse.P_FieldType.DoubleType.fieldTypeName == vFieldTypeName) {
		return ezserverclient.easyxmlparse.P_FieldType.DoubleType.fieldTypeName
	}
	if(ezserverclient.easyxmlparse.P_FieldType.StringType.fieldTypeName == vFieldTypeName) {
		return ezserverclient.easyxmlparse.P_FieldType.StringType.fieldTypeName
	}
	if(ezserverclient.easyxmlparse.P_FieldType.BinaryType.fieldTypeName == vFieldTypeName) {
		return ezserverclient.easyxmlparse.P_FieldType.BinaryType.fieldTypeName
	}
	if(ezserverclient.easyxmlparse.P_FieldType.GeometryType.fieldTypeName == vFieldTypeName) {
		return ezserverclient.easyxmlparse.P_FieldType.GeometryType.fieldTypeName
	}
	return ezserverclient.easyxmlparse.P_FieldType.OtherType.fieldTypeName
};
ezserverclient.easyxmlparse.P_FieldType.prototype.fromElement = function(e) {
	throw new Error("功能没有实现")
};
ezserverclient.easyxmlparse.P_FieldType.prototype.getElementName = function() {
	return "type"
};
ezserverclient.easyxmlparse.P_FieldType.prototype.toElement = function(doc) {
	throw new Error("功能没有实现")
};
ezserverclient.easyxmlparse.P_FieldType.prototype.toString = function() {
	return this.fieldTypeName
};
ezserverclient.easyxmlparse.P_GeometryType = function(typeName) {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.geoTypeName = typeName;
	return this.geoTypeName
};
ezserverclient.easyxmlparse.P_GeometryType.CircleType = new ezserverclient.easyxmlparse.P_GeometryType("circle");
ezserverclient.easyxmlparse.P_GeometryType.NilType = new ezserverclient.easyxmlparse.P_GeometryType("nil");
ezserverclient.easyxmlparse.P_GeometryType.PointType = new ezserverclient.easyxmlparse.P_GeometryType("point");
ezserverclient.easyxmlparse.P_GeometryType.PolygonType = new ezserverclient.easyxmlparse.P_GeometryType("polygon");
ezserverclient.easyxmlparse.P_GeometryType.PolylineType = new ezserverclient.easyxmlparse.P_GeometryType("polyline");
ezserverclient.easyxmlparse.P_GeometryType.MultiPointType = new ezserverclient.easyxmlparse.P_GeometryType("multipoint");
ezserverclient.easyxmlparse.P_GeometryType.MultiPolygonType = new ezserverclient.easyxmlparse.P_GeometryType("multipolygon");
ezserverclient.easyxmlparse.P_GeometryType.MultiPolylineType = new ezserverclient.easyxmlparse.P_GeometryType("multipolyline");
ezserverclient.easyxmlparse.P_GeometryType.RectangleType = new ezserverclient.easyxmlparse.P_GeometryType("rectangle");
ezserverclient.easyxmlparse.P_GeometryType.geoTypeName = null;
ezserverclient.easyxmlparse.P_GeometryType.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.P_GeometryType.getGeometryType = function(vGeometryTypeName) {
	if(ezserverclient.easyxmlparse.P_GeometryType.CircleType.geoTypeName == vGeometryTypeName) {
		return ezserverclient.easyxmlparse.P_GeometryType.CircleType.geoTypeName
	}
	if(ezserverclient.easyxmlparse.P_GeometryType.RectangleType.geoTypeName == vGeometryTypeName) {
		return ezserverclient.easyxmlparse.P_GeometryType.RectangleType.geoTypeName
	}
	if(ezserverclient.easyxmlparse.P_GeometryType.PointType.geoTypeName == vGeometryTypeName) {
		return ezserverclient.easyxmlparse.P_GeometryType.PointType.geoTypeName
	}
	if(ezserverclient.easyxmlparse.P_GeometryType.PolygonType.geoTypeName == vGeometryTypeName) {
		return ezserverclient.easyxmlparse.P_GeometryType.PolygonType.geoTypeName
	}
	if(ezserverclient.easyxmlparse.P_GeometryType.PolylineType.geoTypeName == vGeometryTypeName) {
		return ezserverclient.easyxmlparse.P_GeometryType.PolylineType.geoTypeName
	}
	if(ezserverclient.easyxmlparse.P_GeometryType.MultiPointType.geoTypeName == vGeometryTypeName) {
		return ezserverclient.easyxmlparse.P_GeometryType.MultiPointType.geoTypeName
	}
	if(ezserverclient.easyxmlparse.P_GeometryType.MultiPolygonType.geoTypeName == vGeometryTypeName) {
		return ezserverclient.easyxmlparse.P_GeometryType.MultiPolygonType.geoTypeName
	}
	if(ezserverclient.easyxmlparse.P_GeometryType.MultiPolylineType.geoTypeName == vGeometryTypeName) {
		return ezserverclient.easyxmlparse.P_GeometryType.MultiPolylineType.geoTypeName
	}
	return ezserverclient.easyxmlparse.P_GeometryType.NilType.geoTypeName
};
ezserverclient.easyxmlparse.P_GeometryType.prototype.fromElement = function(e) {
	throw new Error("功能没有实现")
};
ezserverclient.easyxmlparse.P_GeometryType.prototype.getElementName = function() {
	return "geoType"
};
ezserverclient.easyxmlparse.P_GeometryType.prototype.toElement = function(doc) {
	throw new Error("功能没有实现")
};
ezserverclient.easyxmlparse.P_GeometryType.prototype.toString = function() {
	return this.geoTypeName
};
ezserverclient.easyxmlparse.P_SpatialRelation = function(vRelationTypeName) {
	ezserverclient.easyxmlparse.E_Element.call(this);
	this.relationTypeName = vRelationTypeName;
	return this.relationTypeName
};
ezserverclient.easyxmlparse.P_SpatialRelation.ContainType = new ezserverclient.easyxmlparse.P_SpatialRelation("contain");
ezserverclient.easyxmlparse.P_SpatialRelation.DisjointType = new ezserverclient.easyxmlparse.P_SpatialRelation("disjoint");
ezserverclient.easyxmlparse.P_SpatialRelation.NilType = new ezserverclient.easyxmlparse.P_SpatialRelation("nil");
ezserverclient.easyxmlparse.P_SpatialRelation.OverlapType = new ezserverclient.easyxmlparse.P_SpatialRelation("overlap");
ezserverclient.easyxmlparse.P_SpatialRelation.prototype = new ezserverclient.easyxmlparse.E_Element;
ezserverclient.easyxmlparse.P_SpatialRelation.getRelationType = function(vRelationTypeName) {
	if(vRelationTypeName == null || vRelationTypeName.length == 0) {
		return ezserverclient.easyxmlparse.P_SpatialRelation.OverlapType.relationTypeName
	}
	if(ezserverclient.easyxmlparse.P_SpatialRelation.ContainType.relationTypeName == vRelationTypeName) {
		return ezserverclient.easyxmlparse.P_SpatialRelation.ContainType.relationTypeName
	}
	if(ezserverclient.easyxmlparse.P_SpatialRelation.DisjointType.relationTypeName == vRelationTypeName) {
		return ezserverclient.easyxmlparse.P_SpatialRelation.DisjointType.relationTypeName
	}
	if(ezserverclient.easyxmlparse.P_SpatialRelation.OverlapType.relationTypeName == vRelationTypeName) {
		return ezserverclient.easyxmlparse.P_SpatialRelation.OverlapType.relationTypeName
	}
	return ezserverclient.easyxmlparse.P_SpatialRelation.NilType.relationTypeName
};
ezserverclient.easyxmlparse.P_SpatialRelation.prototype.fromElement = function(e) {
	throw new Error("功能没有实现")
};
ezserverclient.easyxmlparse.P_SpatialRelation.prototype.getElementName = function() {
	return "relation"
};
ezserverclient.easyxmlparse.P_SpatialRelation.prototype.toElement = function(doc) {
	throw new Error("功能没有实现")
};
ezserverclient.easyxmlparse.P_SpatialRelation.prototype.toString = function() {
	return this.relationTypeName
};
ezserverclient.easyxmlparse.string_trim = function(string) {
	var a = string;
	if(a == null) {
		return null
	} else {
		a = a.replace(/^(\s)*/, "");
		a = a.replace(/(\s)*$/, "");
		return a
	}
};
ezserverclient.easyxmlparse.EzFactory = function() {};
ezserverclient.easyxmlparse.EzFactory.FromXml = function(Xml) {
	var doc1 = null;
	try {
		var doc1 = new ActiveXObject("Microsoft.XMLDOM");
		doc1.async = false;
		if(Xml != null) {
			doc1.loadXML(Xml)
		} else {
			return
		}
	} catch(e) {
		try {
			parser = new DOMParser();
			if(Xml != null) {
				doc1 = parser.parseFromString(Xml, "text/xml")
			} else {
				return
			}
		} catch(e) {
			alert(e.message)
		}
	}
	var xRoot1 = doc1.documentElement;
	var ezRoot1 = new ezserverclient.easyxmlparse.E_EasyXml().fromElement(xRoot1);
	return ezRoot1
};
ezserverclient.easyxmlparse.EzFactory.ToXml = function(EasyXml) {
	if(window.ActiveXObject) {
		try {
			var xmlDoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
			xmlDoc.async = false;
			xmlDoc.appendChild(EasyXml.toElement(xmlDoc));
			return xmlDoc.xml
		} catch(oError) {}
		throw new Error("MSXML is not installed on your system.")
	} else {
		if(document.implementation && document.implementation.createDocument) {
			var oXmlDom = document.implementation.createDocument("", "", null);
			oXmlDom.async = false;
			var xml = EasyXml.toElement(oXmlDom);
			oXmlDom.appendChild(xml);
			var serializer = new XMLSerializer();
			var xmlStr = serializer.serializeToString(oXmlDom);
			var posNum = xmlStr.indexOf('version="1.1"');
			var headStr = xmlStr.substring(0, posNum);
			var tempStr = xmlStr.substr(posNum);
			headStr = headStr + 'xmlns="http://mapservice.easymap.com" ';
			xmlStr = headStr + tempStr;
			return xmlStr
		} else {
			throw new Error("Your browser doesn't support an XML DOM object.")
		}
	}
};
ezserverclient.easyxmlparse.EzMapserviceQuery = function() {
	this.queryItem = new Array();
	this.timeOut = null;
	this.tryTime = "";
	this.failureOnError = false;
	this.itemCount = null;
	this.itemCurrentCount = null;
	this.queryFlag = 0
};
ezserverclient.easyxmlparse.EzMapserviceQuery.queryState = false;
ezserverclient.easyxmlparse.EzMapserviceQuery.NextOrder = 0;
ezserverclient.easyxmlparse.EzMapserviceQuery.prototype.addQueryItem = function(queryItem) {
	queryItem.mapServiceQuery = this;
	this.queryItem.push(queryItem);
	this.itemCount++
};
ezserverclient.easyxmlparse.EzMapserviceQuery.prototype.getTimeout = function() {
	return this.timeOut
};
ezserverclient.easyxmlparse.EzMapserviceQuery.prototype.setTimeout = function(timeOut) {
	this.timeOut = timeOut
};
ezserverclient.easyxmlparse.EzMapserviceQuery.prototype.getTryTime = function() {
	return this.tryTime
};
ezserverclient.easyxmlparse.EzMapserviceQuery.prototype.setTryTime = function(tryTime) {
	this.tryTime = tryTime
};
ezserverclient.easyxmlparse.EzMapserviceQuery.prototype.getFailureOnError = function() {
	return this.failureOnError
};
ezserverclient.easyxmlparse.EzMapserviceQuery.prototype.setFailureOnError = function(failureOnError) {
	this.failureOnError = failureOnError
};
ezserverclient.easyxmlparse.EzMapserviceQuery.prototype.onFinished = function() {};
ezserverclient.easyxmlparse.EzMapserviceQuery.prototype.doQuery = function() {
	if(ezserverclient.easyxmlparse.EzMapserviceQuery.queryState == false) {
		ezserverclient.easyxmlparse.EzMapserviceQuery.QueryState = true
	} else {
		throw new Error("ezserverclient.easyxmlparse.EzMapserviceQuery::doQuery查询还没有查询结束，不能进行下次查询")
	}
	this.itemCurrentCount = this.itemCount;
	for(var i = 0; i < this.queryItem.length; i++) {
		var item = this.queryItem[i];
		item.setTimeOut(this.timeOut);
		item.setTryTime(this.tryTime);
		item.setFailureOnError(this.failureOnError);
		item.doQuery()
	}
};
ezserverclient.easyxmlparse.EzMapserviceQuery.prototype.getQueryItemCount = function() {
	return this.itemCount
};
ezserverclient.easyxmlparse.EzMapserviceQuery.prototype.getQueryItem = function(i) {
	return this.queryItem[i]
};
ezserverclient.easyxmlparse.QueryItem = function(url, xmlDoc) {
	this.timeOut = null;
	this.tryTime = null;
	this.state = State.SUCCESS;
	this.url = url;
	this.failureOnError = false;
	this.xmlDoc = xmlDoc;
	this.responseXml = null
};
ezserverclient.easyxmlparse.QueryItem.prototype.currentTryTime = 0;
ezserverclient.easyxmlparse.QueryItem.prototype.reSendId = 0;
ezserverclient.easyxmlparse.QueryItem.prototype.getTimeOut = function() {
	return this.timeOut
};
ezserverclient.easyxmlparse.QueryItem.prototype.setTimeOut = function(timeOut) {
	this.timeOut = timeOut
};
ezserverclient.easyxmlparse.QueryItem.prototype.getTryTime = function() {
	return this.tryTime
};
ezserverclient.easyxmlparse.QueryItem.prototype.setTryTime = function(tryTime) {
	this.tryTime = tryTime
};
ezserverclient.easyxmlparse.QueryItem.prototype.getQueryXml = function() {
	return this.xmlDoc
};
ezserverclient.easyxmlparse.QueryItem.prototype.setQueryXml = function(xmlDoc) {
	this.xmlDoc = xmlDoc
};
ezserverclient.easyxmlparse.QueryItem.prototype.getResponseXml = function() {
	return this.responseXml
};
ezserverclient.easyxmlparse.QueryItem.prototype.setResponseXml = function(responseXml) {
	this.responseXml = responseXml
};
ezserverclient.easyxmlparse.QueryItem.prototype.getResultState = function() {
	return this.state
};
ezserverclient.easyxmlparse.QueryItem.prototype.setResultState = function(state) {
	this.state = state
};
ezserverclient.easyxmlparse.QueryItem.prototype.getFailureOnError = function() {
	return this.failureOnError
};
ezserverclient.easyxmlparse.QueryItem.prototype.setFailureOnError = function(failureOnError) {
	this.failureOnError = failureOnError
};
ezserverclient.easyxmlparse.QueryItem.prototype.doQuery = function() {
	var url = this.url;
	var xmlDoc = this.xmlDoc;
	var count = this.tryTime;
	var pMe = this;
	var text2Send = this.xmlDoc;
	this.itemId = null;
	var xmlhttp = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	xmlhttp.open("POST", this.url, true);
	xmlhttp.setRequestHeader("Content-Type", "text/xml");
	xmlhttp.onreadystatechange = HandleStateChange;
	if(pMe.currentTryTime == 0) {
		RequestMapObject.add(xmlhttp, new RequestMapItemBinding(ezserverclient.easyxmlparse.EzMapserviceQuery.NextOrder, text2Send))
	} else {
		RequestMapObject.add(xmlhttp, new RequestMapItemBinding(pMe.reSendId, text2Send))
	}
	xmlhttp.send(text2Send);
	if(pMe.currentTryTime == 0) {
		ezserverclient.easyxmlparse.EzMapserviceQuery.NextOrder++
	}

	function HandleStateChange() {
		if(xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) {
				var doc1 = null;
				try {
					doc1 = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLDOM") : new XMLHttpRequest();
					doc1.async = false;
					if(xmlhttp.responseText != null) {
						doc1.loadXML(xmlhttp.responseText)
					} else {
						return
					}
				} catch(e) {
					try {
						parser = new DOMParser();
						if(xmlhttp.responseText != null) {
							doc1 = parser.parseFromString(xmlhttp.responseText, "text/xml")
						} else {
							return
						}
					} catch(e) {
						alert(e.message)
					}
				}
				if((doc1.getElementsByTagName("ERROR").length == 0)) {
					var o = RequestMapObject.getValue(xmlhttp);
					RequestMapObject.remove(xmlhttp);
					pMe.setResponseXml(xmlhttp.responseText);
					pMe.setQueryXml(RequestMapObject.getValue(xmlhttp).text);
					pMe.itemId = RequestMapObject.getValue(xmlhttp).num;
					if(--pMe.mapServiceQuery.itemCurrentCount == 0) {
						ezserverclient.easyxmlparse.EzMapserviceQuery.QueryState = false;
						pMe.mapServiceQuery.onFinished()
					}
				} else {
					if(++pMe.currentTryTime > pMe.getTryTime()) {
						pMe.setResultState(State.ERROR);
						pMe.mapServiceQuery.queryFlag++;
						--pMe.mapServiceQuery.itemCurrentCount;
						if(pMe.mapServiceQuery.failureOnError && pMe.mapServiceQuery.queryFlag == 1) {
							ezserverclient.easyxmlparse.EzMapserviceQuery.QueryState = false;
							throw new Error("由于第" + RequestMapObject.getValue(xmlhttp).num + "个子查询出错，该查询事务终止")
						}
						pMe.setResponseXml(xmlhttp.responseText);
						if(pMe.mapServiceQuery.itemCurrentCount == 0) {
							ezserverclient.easyxmlparse.EzMapserviceQuery.QueryState = false;
							pMe.mapServiceQuery.onFinished()
						}
						return
					}
					pMe.doQuery()
				}
			} else {
				if(++pMe.currentTryTime > pMe.getTryTime()) {
					pMe.setResultState(State.ERROR);
					pMe.mapServiceQuery.queryFlag++;
					--pMe.mapServiceQuery.itemCurrentCount;
					if(pMe.mapServiceQuery.failureOnError && pMe.mapServiceQuery.queryFlag == 1) {
						ezserverclient.easyxmlparse.EzMapserviceQuery.QueryState = false;
						throw new Error("由于第" + RequestMapObject.getValue(xmlhttp).num + "个子查询出错，该查询事务终止")
					}
					if(pMe.mapServiceQuery.itemCurrentCount == 0) {
						ezserverclient.easyxmlparse.EzMapserviceQuery.QueryState = false;
						pMe.mapServiceQuery.onFinished()
					}
					return
				}
				pMe.doQuery()
			}
		}
	}
};

function RequestMapItemBinding(num, text) {
	this.num = num;
	this.text = text;
	this.toString = function() {
		return "[" + this.num + "] == [" + this.text + "]"
	}
}

function RequestMap() {
	this.map = new Array();
	this.getValue = function(vRequest) {
		for(var i = 0; i < this.map.length; i++) {
			if(this.map[i].request == vRequest) {
				return this.map[i].binding
			}
		}
		return null
	};
	this.add = function(vRequest, vBinding) {
		this.map[this.map.length] = new RequestMapItem(vRequest, vBinding)
	};
	this.remove = function(vRequest) {
		for(var i = 0; i < this.map.length; i++) {
			if(this.map[i].request == vRequest) {
				this.map[i] == null;
				return
			}
		}
	}
}
RequestMapObject = new RequestMap();

function RequestMapItem(vRequest, vBinding) {
	this.request = vRequest;
	this.binding = vBinding
}

function State(state) {
	this.state = state
}
State.ERROR = false;
State.SUCCESS = true;

function QueryObject() {
	this.queryType = 6;
	this.tableName;
	this.layerName = "";
	this.layerId = "";
	this.subFields = "*";
	this.dispField = "";
	this.coordsType = "multipoint";
	this.coords = "";
	this.radius = 0.01;
	this.unit = "meter";
	this.where = "";
	this.html = "";
	this.featurelimit = 10;
	this.beginrecord = 0;
	this.imgURL = "image/tack.gif";
	this.imgWidth = 39;
	this.imgHeight = 38;
	this.leftOffset = 19;
	this.topOffset = -19;
	this.fields = new Array();
	this.fieldsDisp = new Array();
	this.bIsLabel = true;
	this.filtertblName = "";
	this.filterShape = "";
	this.filterWhere = "";
	this.srcUnit = "meter";
	this.solverecordcount = true;
	if(typeof _MapSpanScale == "undefined" || _MapSpanScale == 1) {
		this.srcUnit = "degree";
		this.unit = "degree"
	}
	this.serviceSource = "";
	this.precision = 6;
	this.baseDistanceTolerance = 0.00001;
	this.orderByClause = "";
	this.queryFields = [];
	this.isFieldsContainDispField = true
}
QueryObject.prototype.next = function() {
	this.beginrecord = this.beginrecord + this.featurelimit
};
QueryObject.prototype.prev = function() {
	this.beginrecord = this.beginrecord - this.featurelimit
};
QueryObject.prototype.addField = function(strFieldName, strDispName) {
	this.fields.push(strFieldName);
	this.fieldsDisp.push(strDispName)
};
QueryObject.prototype.addSubFields = function(strSubfield) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(strSubfield, "string"))) {
			throw EzErrorFactory.createError("QueryObject::addSubFields方法中arguments[0]类型不正确")
		}
		this.subFields = strSubfield;
		var pFields = strSubfield.split(";");
		for(var iField = 0; iField < pFields.length; iField++) {
			var pField = pFields[iField].split(":");
			if(pField.length > 1) {
				this.fields.push(pField[0]);
				this.fieldsDisp.push(pField[1])
			} else {
				this.fields.push(pField[0]);
				this.fieldsDisp.push(pField[0])
			}
		}
		this.queryFields = this.fields.Clone()
	} catch(e) {
		throw EzErrorFactory.createError("QueryObject::addSubFields方法中不正确", e)
	}
};
QueryObject.prototype.getPostURL = function() {
	if(this.serviceSource == null || this.serviceSource == "") {
		return EzServerClient.GlobeFunction.formatStrURL(EzServerClient.GlobeParams.EzMapServiceURL)
	} else {
		return EzServerClient.GlobeFunction.formatStrURL(this.serviceSource)
	}
};
QueryObject.prototype.toxml = function() {
	if(!this.fieldsIsContadipField(this.fields, this.dispField)) {
		this.isFieldsContainDispField = false;
		this.queryFields.push(this.dispField)
	}
	switch(parseInt(this.queryType)) {
		case 1:
			return this.getPointQueryXML();
		case 2:
			return this.getRectangleQueryXML();
		case 3:
			return this.getCircleQueryXML();
		case 4:
			return this.getPolygonQueryXML();
		case 5:
			return this.getAroundQueryXML();
		case 6:
			return this.getFuzyQueryXML();
		case 7:
			return this.getBelongQueryXML();
		default:
			return ""
	}
};
QueryObject.prototype.getPointQueryXML = function() {
	return this.getSpatialQueryXML("multipoint", this.radius)
};
QueryObject.prototype.getRectangleQueryXML = function() {
	return this.getSpatialQueryXML("rectangle", 0)
};
QueryObject.prototype.getCircleQueryXML = function() {
	return this.getSpatialQueryXML("circle", 0)
};
QueryObject.prototype.getPolygonQueryXML = function() {
	return this.getSpatialQueryXML("multipolygon", 0)
};
QueryObject.prototype.getAroundQueryXML = function() {
	return this.getSpatialQueryXML(this.coordsType, this.radius)
};
QueryObject.prototype.getFuzyQueryXML = function() {
	var uWhereClauseSelect = new ezserverclient.easyxmlparse.E_WhereClauseSelect();
	uWhereClauseSelect.setContent(this.where);
	var uColumnsClause = new ezserverclient.easyxmlparse.E_ColumnsClause();
	uColumnsClause.setContent(this.queryFields);
	var uSelect = new ezserverclient.easyxmlparse.E_Select();
	uSelect.setFeatureLimit(this.featurelimit);
	uSelect.setBeginRecord(this.beginrecord);
	uSelect.setSolveRecordcount(this.solverecordcount);
	uSelect.setObjectName(this.tableName);
	uSelect.setAlwaysReturnShape(true);
	uSelect.setDistanceTolerance(this.baseDistanceTolerance);
	uSelect.setPrecision(this.precision);
	uSelect.setColumns(uColumnsClause);
	uSelect.setWhere(uWhereClauseSelect);
	if(this.orderByClause) {
		var uOrderByClause = new ezserverclient.easyxmlparse.E_OrderByClause();
		uOrderByClause.setContent(this.orderByClause);
		uSelect.setOrderBy(uOrderByClause)
	}
	var uExecute = new ezserverclient.easyxmlparse.E_Execute();
	uExecute.setSelectQuery(uSelect);
	var uRequest = new ezserverclient.easyxmlparse.E_Request();
	uRequest.setFreeText(this.dispField);
	uRequest.setExecute(uExecute);
	var uEasyXml = new ezserverclient.easyxmlparse.E_EasyXml();
	uEasyXml.setRequest(uRequest);
	return ezserverclient.easyxmlparse.EzFactory.ToXml(uEasyXml)
};
QueryObject.prototype.getBelongQueryXML = function() {
	var uWhereClause = new ezserverclient.easyxmlparse.E_WhereClause();
	uWhereClause.setContent(this.filterWhere);
	var uSpatialFilterLayer = new ezserverclient.easyxmlparse.E_SpatialFilterLayer();
	uSpatialFilterLayer.setRelation("overlap");
	uSpatialFilterLayer.setObjectName(this.filtertblName);
	uSpatialFilterLayer.setWhere(uWhereClause);
	var uSpatialFilters = new ezserverclient.easyxmlparse.E_SpatialFilters();
	uSpatialFilters.add(uSpatialFilterLayer);
	var uWhereClauseSelect = new ezserverclient.easyxmlparse.E_WhereClauseSelect();
	uWhereClauseSelect.setContent(this.where);
	var uColumnsClause = new ezserverclient.easyxmlparse.E_ColumnsClause();
	uColumnsClause.setContent(this.queryFields);
	var uSelect = new ezserverclient.easyxmlparse.E_Select();
	uSelect.setFeatureLimit(this.featurelimit);
	uSelect.setBeginRecord(this.beginrecord);
	uSelect.setSolveRecordcount(this.solverecordcount);
	uSelect.setObjectName(this.tableName);
	uSelect.setAlwaysReturnShape(true);
	uSelect.setDistanceTolerance(this.baseDistanceTolerance);
	uSelect.setPrecision(this.precision);
	uSelect.setColumns(uColumnsClause);
	uSelect.setWhere(uWhereClauseSelect);
	uSelect.setSpatialFilters(uSpatialFilters);
	if(this.orderByClause) {
		var uOrderByClause = new ezserverclient.easyxmlparse.E_OrderByClause();
		uOrderByClause.setContent(this.orderByClause);
		uSelect.setOrderBy(uOrderByClause)
	}
	var uExecute = new ezserverclient.easyxmlparse.E_Execute();
	uExecute.setSelectQuery(uSelect);
	var uRequest = new ezserverclient.easyxmlparse.E_Request();
	uRequest.setFreeText(this.dispField);
	uRequest.setExecute(uExecute);
	var uEasyXml = new ezserverclient.easyxmlparse.E_EasyXml();
	uEasyXml.setRequest(uRequest);
	return ezserverclient.easyxmlparse.EzFactory.ToXml(uEasyXml)
};
QueryObject.prototype.getSpatialQueryXML = function(vShapType, vBufferSize) {
	var uShape = new ezserverclient.easyxmlparse.E_Shape();
	uShape.setGeoType(vShapType);
	uShape.setContent(this.coords);
	var uSpatialFilter = new ezserverclient.easyxmlparse.E_SpatialFilter();
	uSpatialFilter.setRelation("overlap");
	uSpatialFilter.setBufferSize(vBufferSize);
	uSpatialFilter.setBufferUnit(this.unit);
	uSpatialFilter.setShape(uShape);
	var uSpatialFilters = new ezserverclient.easyxmlparse.E_SpatialFilters();
	uSpatialFilters.add(uSpatialFilter);
	var uWhereClauseSelect = new ezserverclient.easyxmlparse.E_WhereClauseSelect();
	uWhereClauseSelect.setContent(this.where);
	var uColumnsClause = new ezserverclient.easyxmlparse.E_ColumnsClause();
	uColumnsClause.setContent(this.queryFields);
	var uSelect = new ezserverclient.easyxmlparse.E_Select();
	uSelect.setFeatureLimit(this.featurelimit);
	uSelect.setBeginRecord(this.beginrecord);
	uSelect.setSolveRecordcount(this.solverecordcount);
	uSelect.setObjectName(this.tableName);
	uSelect.setAlwaysReturnShape(true);
	uSelect.setDistanceTolerance(this.baseDistanceTolerance);
	uSelect.setPrecision(this.precision);
	uSelect.setColumns(uColumnsClause);
	uSelect.setWhere(uWhereClauseSelect);
	uSelect.setSpatialFilters(uSpatialFilters);
	if(this.orderByClause) {
		var uOrderByClause = new ezserverclient.easyxmlparse.E_OrderByClause();
		uOrderByClause.setContent(this.orderByClause);
		uSelect.setOrderBy(uOrderByClause)
	}
	var uExecute = new ezserverclient.easyxmlparse.E_Execute();
	uExecute.setSelectQuery(uSelect);
	var uRequest = new ezserverclient.easyxmlparse.E_Request();
	uRequest.setFreeText(this.dispField);
	uRequest.setExecute(uExecute);
	var uEasyXml = new ezserverclient.easyxmlparse.E_EasyXml();
	uEasyXml.setRequest(uRequest);
	return ezserverclient.easyxmlparse.EzFactory.ToXml(uEasyXml)
};
QueryObject.prototype.fieldsIsContadipField = function(fields, dispField) {
	if(dispField == null || dispField == "") {
		return true
	}
	for(var i = 0; i < fields.length; i++) {
		if(dispField.toUpperCase() == fields[i].toUpperCase()) {
			return true
		}
	}
	return false
};
var _LayerArr = [];
if(typeof mapSpatial != "function") {
	function mapSpatial() {}
}
var g_prox_calss = null;
var g_engine = null;
var bIsWriteFile = true;
DWREngine = {};
DWREngine.Clone = function() {
	return new MapService_v6_Stub_DWREngine()
};

function MapService_v6_Stub_DWREngine() {
	this.beginBatch = function() {};
	this.endBatch = function() {}
}
_bIsQuerying = false;
_bIsLoading = false;
MapsApp.prototype.bIsQuery = function() {
	return _bIsQuerying
};

function loading() {
	var pProg = document.getElementById("process");
	if(pProg != null) {
		pProg.style.display = ""
	}
	_bIsQuerying = true;
	_bIsLoading = true
}

function loaded() {
	var pProg = document.getElementById("process");
	if(pProg != null) {
		pProg.style.display = "none"
	}
	_bIsQuerying = false;
	_bIsLoading = false
}

function clearResult() {
	_LayerArr = new Array()
}
MapsApp.prototype.getResultTable_ = function(pEzLayers) {
	var pTable = document.createElement("table");
	pTable.border = 0;
	pTable.id = "EzLayerTable";
	pTable.align = "center";
	pTable.cellspacing = 0;
	pTable.cellpadding = 0;
	if(typeof pEzLayers == "undefined" || pEzLayers == null) {
		pEzLayers = _LayerArr
	}
	var iRowLen = pEzLayers.length;
	var iRowIndex = 0;
	var pTW = pTable.insertRow(iRowIndex);
	var pTh = pTW.appendChild(document.createElement("th"));
	pTh.innerHTML = "图层名";
	var pTh = pTW.appendChild(document.createElement("th"));
	pTh.innerHTML = "总数";
	iRowIndex = 1;
	for(var iRow = 0; iRow < pEzLayers.length; iRow++) {
		var pEzLayer = pEzLayers[iRow];
		var pTW = pTable.insertRow(iRowIndex);
		var pTd1 = pTW.insertCell(0);
		pTd1.innerHTML = pEzLayer.layerName;
		pTd1 = pTW.insertCell(1);
		pTd1.innerHTML = pEzLayer.maxRecord;
		iRowIndex++
	}
	return pTable
};
MapsApp.prototype.getResultTable = function(pEzLayers) {
	var pTable = document.createElement("table");
	pTable.border = 0;
	pTable.id = "EzLayerTable";
	pTable.align = "center";
	pTable.cellspacing = 0;
	pTable.cellpadding = 0;
	if(typeof pEzLayers == "undefined" || pEzLayers == null) {
		pEzLayers = _LayerArr
	}
	var iRowLen = pEzLayers.length;
	var iRowIndex = 0;
	var pTW = pTable.insertRow(iRowIndex);
	var pTh = pTW.appendChild(document.createElement("th"));
	pTh.innerHTML = "图层";
	for(var iRow = 0; iRow < pEzLayers.length; iRow++) {
		var pEzLayer = pEzLayers[iRow];
		var pTh = pTW.appendChild(document.createElement("th"));
		pTh.innerHTML = pEzLayer.layerName
	}
	iRowIndex = 1;
	var pTW = pTable.insertRow(iRowIndex);
	var pTD = pTW.appendChild(document.createElement("td"));
	pTD.innerHTML = "总数";
	for(var iCol = 0; iCol < pEzLayers.length; iCol++) {
		var pEzLayer = pEzLayers[iCol];
		pTd1 = pTW.appendChild(document.createElement("td"));
		pTd1.innerHTML = pEzLayer.maxRecord
	}
	return pTable
};
MapsApp.prototype.setEzLayer = function(pEzLayer) {
	_LayerArr = pEzLayer
};

function addOverLay(pObj, strHtml) {
	getMapApp().addOverlay(pObj);
	pObj.addListener("click", function() {
		pObj.openInfoWindowHtml(strHtml)
	})
}
MapsApp.prototype.query = function(vQuery, vCallback) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vQuery, "QueryObject") && !EzServerClient.GlobeFunction.isTypeRight(vQuery, "Array")) {
			throw EzErrorFactory.createError("EzMap::query方法中arguments[0]类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(vCallback, "function")) {
			throw EzErrorFactory.createError("EzMap::query方法中arguments[1]类型不正确")
		}
		var uEzMapServiceQuery = new ezserverclient.easyxmlparse.EzMapserviceQuery();
		if(EzServerClient.GlobeFunction.isTypeRight(vQuery, "QueryObject")) {
			if(!(vQuery.beginrecord == 0)) {
				vQuery.beginrecord = vQuery.beginrecord - 1
			}
			var uPostObj = EzServerClient.GlobeFunction.getRequestObject(vQuery);
			var uPostURL = uPostObj.url;
			var uPostXML = uPostObj.xml;
			var uQueryItem = new ezserverclient.easyxmlparse.QueryItem(uPostURL, uPostXML);
			uEzMapServiceQuery.addQueryItem(uQueryItem)
		} else {
			for(var i = 0; i < vQuery.length; i++) {
				if(!(vQuery[i].beginrecord == 0)) {
					vQuery[i].beginrecord = vQuery[i].beginrecord - 1
				}
				var uPostObj = EzServerClient.GlobeFunction.getRequestObject(vQuery[i]);
				var uPostURL = uPostObj.url;
				var uPostXML = uPostObj.xml;
				var uQueryItem = new ezserverclient.easyxmlparse.QueryItem(uPostURL, uPostXML);
				uEzMapServiceQuery.addQueryItem(uQueryItem)
			}
		}
		uEzMapServiceQuery.setTryTime(this.ezMapServiceTryTimes);
		uEzMapServiceQuery.setFailureOnError(false);
		uEzMapServiceQuery.doQuery();
		var uHasError = true;
		var uMe = this;
		var uTempResults = uMe.getQueryResults2();
		uEzMapServiceQuery.onFinished = function() {
			for(var i = 0; i < uEzMapServiceQuery.getQueryItemCount(); i++) {
				var uRespXml = uEzMapServiceQuery.getQueryItem(i).getResponseXml();
				var uQuery = null;
				if(EzServerClient.GlobeFunction.isTypeRight(vQuery, "QueryObject")) {
					uQuery = vQuery
				} else {
					if(EzServerClient.GlobeFunction.isTypeRight(vQuery, "Array")) {
						uQuery = vQuery[i]
					}
				}
				if(!uEzMapServiceQuery.getQueryItem(i).getResultState()) {
					uHasError = false
				}
				var uEzLayer = new EzLayer();
				uEzLayer.layerId = uQuery.layerId;
				uEzLayer.tableName = uQuery.tableName;
				uEzLayer.layerName = uQuery.layerName;
				uEzLayer.queryObj = uQuery;
				uEzLayer.imgURL = uQuery.imgURL;
				uEzLayer.imgHeight = uQuery.imgHeight;
				uEzLayer.imgWidth = uQuery.imgWidth;
				uEzLayer.leftOffset = uQuery.leftOffset;
				uEzLayer.topOffset = uQuery.topOffset;
				uEzLayer.fieldsDisp = uQuery.fieldsDisp;
				uEzLayer.fields = uQuery.fields;
				if(!EzServerClient.GlobeFunction.isContainLayer(uTempResults, uEzLayer)) {
					uTempResults.push(uEzLayer)
				}
				if(uRespXml) {
					var uXmldoc = ezserverclient.easyxmlparse.EzFactory.FromXml(uRespXml);
					var uResponse = uXmldoc.getResponse();
					var uError = uResponse.getError();
					if(uError) {
						uEzLayer.error = new Error(uError.getMessage())
					} else {
						var uResultSet = uResponse.getResultSet();
						var uFreeText = uResponse.getFreeText();
						if(uFreeText) {
							uEzLayer.freeText = uFreeText
						}
						uLayerExtension = uResultSet.getLayerExtension();
						if(uLayerExtension) {
							var uMbrCoords = uLayerExtension.getFullExtent().split(",");
							uEzLayer.MBR = new MBR(uMbrCoords[0], uMbrCoords[1], uMbrCoords[2], uMbrCoords[3]);
							uEzLayer.geometryType = uLayerExtension.getGeoType();
							uEzLayer.spatialColumn = uLayerExtension.getSpatialColumn()
						}
						var uSpatialFilterObjects = uResultSet.getSpatialFilterObjects();
						if(uSpatialFilterObjects) {
							for(var j = 0; j < uSpatialFilterObjects.size(); j++) {
								var uShape = uSpatialFilterObjects.get(j);
								var uEzShape = new EzShape();
								uEzShape.geometryType = uShape.getGeoType();
								uEzShape.coordinateSequence = uShape.getContent();
								uEzLayer.spatialFilterShapes.push(uEzShape)
							}
						}
						if(uResultSet.recordsContainer == null) {
							var uRecords = uResultSet.getRecords();
							uEzLayer.maxRecord2 = uRecords.getRecordCount() || 0;
							var uCount = uRecords.size();
							uEzLayer.recordCount = uCount;
							uEzLayer.maxRecord = uEzLayer.maxRecord2;
							for(var j = 0; j < uEzLayer.recordCount; j++) {
								var uRecord = uRecords.get(j);
								var uFeatureObject = new FeatureObject(uEzLayer);
								uFeatureObject.objectid = uRecord.getObjectID();
								var uFeatureExtension = uRecord.getFeatureExtension();
								if(uFeatureExtension) {
									uFeatureObject.setCenterPoint(new Point(uFeatureExtension.getCenterX(), uFeatureExtension.getCenterY()))
								}
								var uFields = uRecord.getFields();
								for(var m = 0; m < uFields.size(); m++) {
									var uField = uFields.get(m);
									var uEzField = new EzField(uField.getDisplayName(), uField.getName(), uField.getType(), uField.getValue());
									if(uEzField.name == uQuery.dispField.toUpperCase()) {
										uFeatureObject.dispFieldValue = uEzField.value;
										uFeatureObject.dispname = uFeatureObject.dispFieldValue;
										if(!uQuery.isFieldsContainDispField) {
											continue
										}
									}
									if(uEzField.type == "Geometry") {
										if(uEzLayer.geometryType == "polygon") {
											if(uEzField.value.indexOf("|") != -1) {
												uFeatureObject.type = "multipolygon"
											} else {
												uFeatureObject.type = uEzLayer.geometryType
											}
										} else {
											uFeatureObject.type = uEzLayer.geometryType
										}
										uFeatureObject.linestr = uEzField.value;
										continue
									}
									uFeatureObject.fieldValues.push(uEzField.value);
									uFeatureObject.ezFields.push(uEzField)
								}
								uEzLayer.features.push(uFeatureObject)
							}
						}
					}
				} else {
					uEzLayer.error = new Error("EzMapService连接错误")
				}
			}
			vCallback(uHasError, uMe)
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::query方法执行不正确", e)
	}
};
MapsApp.prototype.getQueryResult = function() {
	var uQueryResults = this.getQueryResults2().Clone();
	_LayerArr = uQueryResults;
	return uQueryResults
};
MapsApp.prototype.clearLayers = function() {
	this.queryResults2 = [];
	_LayerArr = []
};
MapsApp.prototype.setEzMapServiceTryTimes = function(vTimes) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vTimes, "int")) {
			throw EzErrorFactory.createError("EzMap::setEzMapServiceTryTimes方法中arguments[0]类型不正确")
		} else {
			if(vTimes <= 0) {
				throw EzErrorFactory.createError("EzMap::setEzMapServiceTryTimes方法中arguments[0]应当为一个大于0的整数")
			}
			this.ezMapServiceTryTimes = vTimes
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::setEzMapServiceTryTimes方法执行不正确", e)
	}
};
MapsApp.prototype.getEzMapServiceTryTimes = function() {
	return this.ezMapServiceTryTimes
};
MapsApp.prototype.registerProx = function(strClass) {
	MapsApp.registerProx(strClass)
};
MapsApp.proxyURL2EzMapService = "";
MapsApp.registerProx = function(strClass) {
	g_prox_calss = strClass;
	MapsApp.proxyURL2EzMapService = strClass
};
EzServerClient.GlobeFunction.isContainLayer = function(vEzLayerList, vEzLayer) {
	for(var n = 0; n < vEzLayerList.length; n++) {
		if(vEzLayer.tableName.toString().toLowerCase() == vEzLayerList[n].tableName.toString().toLowerCase() && vEzLayer.layerId.toString().toLowerCase() == vEzLayerList[n].layerId.toString().toLowerCase()) {
			vEzLayerList.splice(n, 1, vEzLayer);
			return true
		}
	}
	return false
};
EzServerClient.GlobeFunction.getRequestObject = function(vQuery) {
	var uPostURL = vQuery.getPostURL();
	var uPostXML = vQuery.toxml();
	if(MapsApp.proxyURL2EzMapService) {
		var uProxyPostURL = uPostURL;
		uPostURL = MapsApp.proxyURL2EzMapService;
		var uDate = new Date();
		uPostXML = "url=" + encodeURIComponent(uProxyPostURL + "/XMLPort") + "&xml=" + encodeURIComponent(uPostXML) + "&time=" + uDate.getTime()
	} else {
		uPostURL += "/DirectPort"
	}
	return {
		url: uPostURL,
		xml: uPostXML
	}
};
EzServerClient.GlobeFunction.formatStrURL = function(vStrSrcURL) {
	vStrSrcURL = vStrSrcURL.replace(/(^\s*)|(\s*$)/g, "");
	if(vStrSrcURL.lastIndexOf("/") == vStrSrcURL.length - 1) {
		return vStrSrcURL.substring(0, vStrSrcURL.length - 1)
	} else {
		return vStrSrcURL
	}
};
EzLayer = function() {
	this.layerId = "";
	this.fields = [];
	this.fieldsDisp = [];
	this.tableName = "";
	this.layerName = "";
	this.MBR = null;
	this.queryObj = null;
	this.editObj = null;
	this.features = [];
	this.imgURL = "";
	this.maxRecord = 0;
	this.maxRecord2 = 0;
	this.bShow = true;
	this.geometryType = "";
	this.error = null;
	this.recordCount = 0;
	this.freetext = "";
	this.spatialFilterShapes = [];
	this.spatialColumn = "shape";
	this.maultiFeatures = [];
	this.imgURL = "";
	this.imgHeight = 32;
	this.imgWidth = 32;
	this.leftOffset = 0;
	this.topOffset = 0
};
EzLayer.sortByName = function(a, b) {
	a = a.dispname;
	b = b.dispname;
	var pa = parseFloat(a);
	var pb = parseFloat(b);
	var pResult = 1;
	if(isNaN(pa) || isNaN(pb)) {
		pResult = a.localeCompare(b)
	} else {
		pResult = pa - pb
	}
	return pResult
};
EzLayer.sortByNumber = function(a, b) {
	var c = b.dispname - a.dispname;
	return c
};
EzLayer.prototype.sort = function() {
	this.features.sort(EzLayer.sortByName)
};
EzLayer.prototype.toTable = function(pObj) {
	var pTable = document.createElement("table");
	pTable.border = 0;
	pTable.id = "EzLayerTable";
	pTable.align = "center";
	pTable.cellspacing = 0;
	pTable.cellpadding = 0;
	var iRowIndex = 0;
	var pFeatures = this.features;
	var pTW = pTable.insertRow(iRowIndex);
	var pDisNames = this.fieldsDisp;
	for(var iField = 0; iField < pDisNames.length; iField++) {
		var pFieldValue = pDisNames[iField];
		var pTh = pTW.appendChild(document.createElement("th"));
		pTh.innerHTML = pFieldValue
	}
	iRowIndex = 1;
	for(var iRow = 0; iRow < pFeatures.length; iRow++) {
		var pFeature = pFeatures[iRow];
		var pTW = pTable.insertRow(iRowIndex);
		for(var iCol = 0; iCol < pFeature.fieldValues.length; iCol++) {
			var strValue = pFeature.fieldValues[iCol];
			var pTd1 = pTW.insertCell(iCol);
			if(strValue == null || strValue == "") {
				strValue = "&nbsp;"
			}
			pTd1.innerHTML = strValue
		}
		iRowIndex++
	}
	return pTable
};
EzLayer.prototype.setLayerInfo = function(pObj) {
	if(pObj instanceof QueryObject) {
		this.queryObj = pObj;
		this.tableName = pObj.tableName.toUpperCase();
		this.layerName = pObj.layerName;
		this.layerId = pObj.layerId + "";
		this.fields = pObj.fields;
		this.fieldsDisp = pObj.fieldsDisp;
		this.imgURL = pObj.imgURL;
		this.bIsLabel = pObj.bIsLabel;
		this.imgHeight = pObj.imgHeight;
		this.imgWidth = pObj.imgWidth;
		this.leftOffset = pObj.leftOffset;
		this.topOffset = pObj.topOffset;
		this.tableInfo = pObj.tableInfo;
		this.beginrecord = pObj.beginrecord
	} else {
		if(pObj instanceof EditObject) {
			this.editObj = pObj;
			this.tableName = pObj.tableName.toUpperCase()
		}
	}
};
EzLayer.prototype.getFieldInd = function(strField) {
	var iFieldIndex = -1;
	for(var iIndex = 0; iIndex < this.fields.length; iIndex++) {
		if(this.fields[iIndex].toUpperCase() == strField.toUpperCase()) {
			iFieldIndex = iIndex;
			break
		}
	}
	return iFieldIndex
};
EzLayer.prototype.getFieldsSize = function() {
	if(this.fields == null) {
		return 0
	} else {
		return this.fields.length
	}
};
EzLayer.prototype.getFieldsCount = EzLayer.prototype.getFieldsSize;
EzLayer.prototype.setSpatialFilterShapes = function(vEzShapeArr) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vEzShapeArr, "Array")) {
			throw EzErrorFactory.createError("EzLayer::setSpatialFilterShapes方法中arguments[0]参数类型不正确")
		}
		this.spatialFilterShapes = vEzShapeArr
	} catch(e) {
		throw EzErrorFactory.createError("EzLayer::setSpatialFilterShapes方法执行不正确", e)
	}
};
EzLayer.prototype.getSpatialFilterShapes = function() {
	return this.spatialFilterShapes
};
EzLayer.prototype.getSpatialColumn = function() {
	return this.spatialColumn
};
EzLayer.prototype.setSpatialColumn = function(vSpatialColumn) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vSpatialColumn, "string")) {
			throw EzErrorFactory.createError("EzLayer::setSpatialColumn方法中arguments[0]参数类型不正确")
		}
		this.spatialColumn = vSpatialColumn
	} catch(e) {
		throw EzErrorFactory.createError("EzLayer::setSpatialColumn方法执行不正确", e)
	}
};
EzLayer.prototype.getGeometryType = function() {
	return this.geometryType
};
EzLayer.prototype.setGeometryType = function(vGeometryType) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(vGeometryType, "string"))) {
			throw EzErrorFactory.createError("EzLayer::setGeometryType方法中arguments[0]类型不正确")
		} else {
			this.geometryType = vGeometryType
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzLayer::setGeometryType方法中不正确", e)
	}
};
EzLayer.prototype.getFeatures = function() {
	return this.features
};
EzLayer.prototype.setFeatures = function(vFeatures) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(vFeatures, "Array"))) {
			throw EzErrorFactory.createError("EzLayer::setFeatures方法中arguments[0]类型不正确")
		} else {
			this.features = vFeatures
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzLayer::setFeatures方法中不正确", e)
	}
};
_VideoName = null;

function playVideo() {
	window.open("media.htm", "视频播放", "height=300, width=460, top=0, left=0, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no")
}

function getCenterOfPaths(strPath) {
	var pPoints = trans2Points(strPath);
	var iLen = Math.floor(pPoints.length / 2);
	return pPoints[iLen]
}

function FeatureObject(uLayer) {
	this.dispname = "";
	this.type;
	this.point;
	this.linestr;
	this.html;
	this.fieldValues = new Array();
	if(uLayer == null) {
		throw new Error("请在构造函数中传入图层对象!")
	}
	this.layInfo = uLayer;
	this.ezFields = [];
	this.centerPoint = null;
	this.objectId = "";
	this.dispFieldValue = ""
}
FeatureObject.prototype.addFieldValue = function(strField, strValue) {
	this.fieldValues.push(strValue)
};
FeatureObject.prototype.getMBR = function() {
	var pMBR = EzServerClient.GlobeFunction.getPathMBR(this.linestr);
	return pMBR
};
FeatureObject.prototype.getCenterPoint = function() {
	this.centerPoint = this.getMBR().getCenterPoint();
	this.point = this.centerPoint;
	return this.point
};
FeatureObject.prototype.setCenterPoint = function(vPoint) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(vPoint, Point))) {
			throw EzErrorFactory.createError("FeatureObject::setCenterPoint方法中arguments[0]类型不正确")
		} else {
			this.centerPoint = vPoint;
			this.point = this.centerPoint
		}
	} catch(e) {
		throw EzErrorFactory.createError("FeatureObject::setCenterPoint方法中不正确", e)
	}
};
FeatureObject.prototype.getLength = function() {
	var dLen = 0;
	try {
		var pPoints = trans2Points(this.linestr);
		dLen = CalculateLength(pPoints);
		dLen = Math.floor(dLen)
	} catch(e) {}
	return dLen
};
FeatureObject.prototype.toHTML = function(strAddedHTML) {
	var pTable = document.createElement("table");
	pTable.border = 0;
	pTable.id = "InfoTable";
	pTable.align = "center";
	pTable.cellspacing = 0;
	pTable.cellpadding = 0;
	var iRowLen = this.fieldValues.length;
	var iRowIndex = 0;
	for(var iRow = 0; iRow < iRowLen; iRow++) {
		var strDisName = "";
		var strValue = "";
		strValue = this.fieldValues[iRow];
		strDisName = this.layInfo.fieldsDisp[iRow];
		if(strValue == null || strValue == "" || strValue == "undefined" || strDisName == "no") {
			continue
		}
		var pTW = pTable.insertRow(iRowIndex);
		pTW.height = 10;
		var pTd1 = pTW.insertCell(0);
		if(strValue.toLowerCase().indexOf("http") != -1) {
			pTd1.colspan = 2;
			var pEle = document.createElement("a");
			var strURL = strValue;
			if(strValue.toLowerCase().indexOf(".avi") != -1 || strValue.toLowerCase().indexOf(".mpg") != -1) {
				strURL = "javascript:void(0);";
				pEle.onclick = "_VideoName='" + strValue + "';playVideo();"
			} else {
				pEle.target = "_blank"
			}
			pEle.href = strURL;
			pEle.innerHTML = strDisName;
			pTd1.innerHTML = pEle.outerHTML;
			pTd1.align = "center"
		} else {
			pTd1.innerHTML = strDisName;
			pTd1.className = "leftBorder";
			var pTd2 = pTW.insertCell(1);
			pTd2.className = "rightBorder";
			if(strValue != null) {
				strValue = strValue.replace(/ /g, "");
				if(strValue == "") {
					strValue = "&nbsp;"
				}
			} else {
				strValue = "&nbsp;"
			}
			pTd2.innerHTML = strValue
		}
		iRowIndex++
	}
	if(strAddedHTML) {
		var pTW = pTable.insertRow(iRowIndex);
		var pTd1 = pTW.insertCell(0);
		pTd1.colspan = 2;
		pTd1.align = "center";
		if(typeof strAddedHTML == "string") {
			pTd1.innerHTML = strAddedHTML
		} else {
			pTd1.appendChild(strAddedHTML)
		}
	}
	return pTable.outerHTML
};
FeatureObject.prototype.getField = function(iIndex) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(iIndex, "int"))) {
			throw EzErrorFactory.createError("FeatureObject::getField方法中arguments[0]类型不正确")
		}
		return this.layInfo.fields[iIndex]
	} catch(e) {
		throw EzErrorFactory.createError("FeatureObject::getField方法中不正确", e)
	}
};
FeatureObject.prototype.getFieldValue = function(strName) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(strName, "string")) && !(EzServerClient.GlobeFunction.isTypeRight(strName, "int"))) {
			throw EzErrorFactory.createError("FeatureObject::getFieldValue方法中arguments[0]类型不正确")
		}
		var strValue = null;
		var iFieldIndex = null;
		if(typeof strName == "string") {
			for(var i = 0; i < this.ezFields.length; i++) {
				if(this.ezFields[i].getName() == strName.toUpperCase()) {
					iFieldIndex = i;
					break
				}
			}
		} else {
			if(typeof strName == "number") {
				iFieldIndex = strName
			}
		}
		strValue = this.fieldValues[iFieldIndex];
		return strValue
	} catch(e) {
		throw EzErrorFactory.createError("FeatureObject::getFieldValue方法中不正确", e)
	}
};
FeatureObject.prototype.setFieldValue = function(strName, value) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(strName, "string")) && !(EzServerClient.GlobeFunction.isTypeRight(strName, "int"))) {
			throw EzErrorFactory.createError("FeatureObject::setFieldValue方法中arguments[0]类型不正确")
		}
		var iFieldIndex = null;
		if(typeof strName == "string") {
			iFieldIndex = this.layInfo.getFieldInd(strName)
		} else {
			if(typeof strName == "number") {
				iFieldIndex = strName
			}
		}
		this.fieldValues[iFieldIndex] = value
	} catch(e) {
		throw EzErrorFactory.createError("FeatureObject::setFieldValue方法中不正确", e)
	}
};
FeatureObject.prototype.getDispField = function(index) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(index, "int"))) {
			throw EzErrorFactory.createError("FeatureObject::getDispField方法中arguments[0]类型不正确")
		}
		return this.layInfo.fieldsDisp[index]
	} catch(e) {
		throw EzErrorFactory.createError("FeatureObject::getDispField方法中不正确", e)
	}
};
FeatureObject.prototype.getEzFields = function() {
	return this.ezFields
};
FeatureObject.prototype.setEzFields = function(vEzFields) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(vEzFields, Array))) {
			throw EzErrorFactory.createError("FeatureObject::setEzFields方法中arguments[0]类型不正确")
		} else {
			this.ezFields = vEzFields
		}
	} catch(e) {
		throw EzErrorFactory.createError("FeatureObject::setEzFields方法中不正确", e)
	}
};
FeatureObject.prototype.getCoordinateSequence = function() {
	return this.linestr
};
FeatureObject.prototype.setCoordinateSequence = function(vCoordinateSequence) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(vCoordinateSequence, "string"))) {
			throw EzErrorFactory.createError("FeatureObject::setCoordinateSequence方法中arguments[0]类型不正确")
		} else {
			this.linestr = vCoordinateSequence
		}
	} catch(e) {
		throw EzErrorFactory.createError("FeatureObject::setCoordinateSequence方法中不正确", e)
	}
};
FeatureObject.prototype.getQueryDispFieldValue = function() {
	return this.dispFieldValue
};
FeatureObject.prototype.setQueryDispFieldValue = function(vDispFieldValue) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(vDispFieldValue, "string"))) {
			throw EzErrorFactory.createError("FeatureObject::setQueryDispFieldValue方法中arguments[0]类型不正确")
		} else {
			this.dispFieldValue = vDispFieldValue
		}
	} catch(e) {
		throw EzErrorFactory.createError("FeatureObject::setQueryDispFieldValue方法中不正确", e)
	}
};
EditObject = function(strOp, strgtype, table) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(strOp, "string")) {
			throw EzErrorFactory.createError("EditObject构造方法中arguments[0]参数类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(strgtype, "string")) {
			throw EzErrorFactory.createError("EditObject构造方法中arguments[1]参数类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(table, "string")) {
			throw EzErrorFactory.createError("EditObject构造方法中arguments[2]参数类型不正确")
		}
		this.otype = strOp;
		this.gtype = strgtype;
		this.tableName = table;
		this.where = "";
		this.serviceSource = null;
		this.uInserts = [];
		this.uUpdates = [];
		this.fields = [];
		this.fieldsValue = []
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::edit方法执行不正确", e)
	}
};
EditObject.prototype.addField = function(strField, strValue) {
	try {
		if(!(EzServerClient.GlobeFunction.isTypeRight(strField, "string"))) {
			throw EzErrorFactory.createError("EditObject::addField方法中arguments[0]类型不正确")
		}
		if(!(EzServerClient.GlobeFunction.isTypeRight(strValue, "string"))) {
			throw EzErrorFactory.createError("EditObject::addField方法中arguments[1]类型不正确")
		}
		this.fields.push(strField.toUpperCase());
		this.fieldsValue.push(strValue)
	} catch(e) {
		throw EzErrorFactory.createError("EditObject::addField方法中不正确", e)
	}
};
EditObject.prototype.addInsert = function(pairs, geotype, tableName) {
	var uFields = new ezserverclient.easyxmlparse.E_Fields();
	for(var i = 0; i < pairs.length; i++) {
		var uField = new ezserverclient.easyxmlparse.E_Field();
		uField.setName(pairs[i].field.toUpperCase());
		uField.setValue(pairs[i].value);
		uFields.add(uField)
	}
	var uInsert = new ezserverclient.easyxmlparse.E_Insert();
	uInsert.setObjectName(tableName);
	uInsert.setFields(uFields);
	this.uInserts.push(uInsert)
};
EditObject.prototype.addUpdate = function(pairs, geotype, tableName, where) {
	var uWhereClause = new ezserverclient.easyxmlparse.E_WhereClause();
	uWhereClause.setContent(where);
	var uFields = new ezserverclient.easyxmlparse.E_Fields();
	for(var i = 0; i < pairs.length; i++) {
		var uField = new ezserverclient.easyxmlparse.E_Field();
		uField.setName(pairs[i].field.toUpperCase());
		uField.setValue(pairs[i].value);
		uFields.add(uField)
	}
	var uUpdate = new ezserverclient.easyxmlparse.E_Update();
	uUpdate.setObjectName(tableName);
	uUpdate.setFields(uFields);
	uUpdate.setWhereClause(uWhereClause);
	this.uUpdates.push(uUpdate)
};
EditObject.prototype.toAddXML = function() {
	var uFields = new ezserverclient.easyxmlparse.E_Fields();
	for(var i = 0; i < this.fields.length; i++) {
		var uField = new ezserverclient.easyxmlparse.E_Field();
		uField.setName(this.fields[i]);
		uField.setValue(this.fieldsValue[i]);
		uFields.add(uField)
	}
	var uInsert = new ezserverclient.easyxmlparse.E_Insert();
	uInsert.setObjectName(this.tableName);
	uInsert.setFields(uFields);
	this.uInserts.push(uInsert);
	var uExecute = new ezserverclient.easyxmlparse.E_Execute();
	uExecute.setSelectQuery(this.uInserts);
	var uRequest = new ezserverclient.easyxmlparse.E_Request();
	uRequest.setFreeText(this.dispField);
	uRequest.setExecute(uExecute);
	var uEasyXml = new ezserverclient.easyxmlparse.E_EasyXml();
	uEasyXml.setRequest(uRequest);
	return ezserverclient.easyxmlparse.EzFactory.ToXml(uEasyXml)
};
EditObject.prototype.toDelXML = function() {
	var uWhereClause = new ezserverclient.easyxmlparse.E_WhereClause();
	uWhereClause.setContent(this.where);
	var uDelete = new ezserverclient.easyxmlparse.E_Delete();
	uDelete.setObjectName(this.tableName);
	uDelete.setWhereClause(uWhereClause);
	var uExecute = new ezserverclient.easyxmlparse.E_Execute();
	uExecute.setSelectQuery(uDelete);
	var uRequest = new ezserverclient.easyxmlparse.E_Request();
	uRequest.setFreeText(this.dispField);
	uRequest.setExecute(uExecute);
	var uEasyXml = new ezserverclient.easyxmlparse.E_EasyXml();
	uEasyXml.setRequest(uRequest);
	return ezserverclient.easyxmlparse.EzFactory.ToXml(uEasyXml)
};
EditObject.prototype.toUpdateXML = function() {
	var uWhereClause = new ezserverclient.easyxmlparse.E_WhereClause();
	uWhereClause.setContent(this.where);
	var uFields = new ezserverclient.easyxmlparse.E_Fields();
	for(var i = 0; i < this.fields.length; i++) {
		var uField = new ezserverclient.easyxmlparse.E_Field();
		uField.setName(this.fields[i]);
		uField.setValue(this.fieldsValue[i]);
		uFields.add(uField)
	}
	var uUpdate = new ezserverclient.easyxmlparse.E_Update();
	uUpdate.setObjectName(this.tableName);
	uUpdate.setFields(uFields);
	uUpdate.setWhereClause(uWhereClause);
	this.uUpdates.push(uUpdate);
	var uExecute = new ezserverclient.easyxmlparse.E_Execute();
	uExecute.setSelectQuery(this.uUpdates);
	var uRequest = new ezserverclient.easyxmlparse.E_Request();
	uRequest.setFreeText(this.dispField);
	uRequest.setExecute(uExecute);
	var uEasyXml = new ezserverclient.easyxmlparse.E_EasyXml();
	uEasyXml.setRequest(uRequest);
	return ezserverclient.easyxmlparse.EzFactory.ToXml(uEasyXml)
};
EditObject.prototype.toxml = function() {
	var uEditType = this.otype.toLowerCase();
	switch(uEditType) {
		case "add":
			return this.toAddXML();
		case "del":
			return this.toDelXML();
		case "update":
			return this.toUpdateXML();
		default:
			return ""
	}
};
EditObject.prototype.getPostURL = function() {
	if(this.serviceSource == null || this.serviceSource == "") {
		return EzServerClient.GlobeFunction.formatStrURL(EzServerClient.GlobeParams.EzMapServiceURL)
	} else {
		return EzServerClient.GlobeFunction.formatStrURL(this.serviceSource)
	}
};
MapsApp.prototype.edit = function(vEditObj, vCallback) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vEditObj, "EditObject") && !EzServerClient.GlobeFunction.isTypeRight(vEditObj, "Array")) {
			throw EzErrorFactory.createError("EzMap::pEdit方法中arguments[0]参数类型不正确")
		}
		if(!EzServerClient.GlobeFunction.isTypeRight(vCallback, "function")) {
			throw EzErrorFactory.createError("EzMap::pEdit方法中arguments[1]参数类型不正确")
		}
		var uEzMapServiceQuery = new ezserverclient.easyxmlparse.EzMapserviceQuery();
		if(EzServerClient.GlobeFunction.isTypeRight(vEditObj, "EditObject")) {
			var uPostObj = EzServerClient.GlobeFunction.getRequestObject(vEditObj);
			var uPostURL = uPostObj.url;
			var uPostXML = uPostObj.xml;
			var uQueryItem = new ezserverclient.easyxmlparse.QueryItem(uPostURL, uPostXML);
			uEzMapServiceQuery.addQueryItem(uQueryItem)
		} else {
			for(var i = 0; i < vEditObj.length; i++) {
				var uPostObj = EzServerClient.GlobeFunction.getRequestObject(vEditObj[i]);
				var uPostURL = uPostObj.url;
				var uPostXML = uPostObj.xml;
				var uQueryItem = new ezserverclient.easyxmlparse.QueryItem(uPostURL, uPostXML);
				uEzMapServiceQuery.addQueryItem(uQueryItem)
			}
		}
		uEzMapServiceQuery.setTryTime(this.ezMapServiceTryTimes);
		uEzMapServiceQuery.setFailureOnError(false);
		uEzMapServiceQuery.doQuery();
		var uHasError = true;
		var xmlDom = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLDOM") : new XMLHttpRequest();
		var uMe = this;
		var uArray = [];
		var uTempResults = uMe.getQueryResults2();
		uEzMapServiceQuery.onFinished = function() {
			for(var i = 0; i < uEzMapServiceQuery.getQueryItemCount(); i++) {
				var uRespXml = uEzMapServiceQuery.getQueryItem(i).getResponseXml();
				var uQuery = null;
				if(EzServerClient.GlobeFunction.isTypeRight(vEditObj, "EditObject")) {
					uQuery = vEditObj
				} else {
					if(EzServerClient.GlobeFunction.isTypeRight(vEditObj, "Array")) {
						uQuery = vEditObj[i]
					}
				}
				if(!uEzMapServiceQuery.getQueryItem(i).getResultState()) {
					uHasError = false
				}
				if(uHasError) {
					try {
						xmlDom.loadXML(uRespXml)
					} catch(e) {
						parser = new DOMParser();
						xmlDom = parser.parseFromString(uRespXml, "text/xml")
					}
					var results = xmlDom.getElementsByTagName("RESULTSET");
					var records = xmlDom.getElementsByTagName("RECORD");
					for(var i = 0; i < results.length; i++) {
						var uTableId = {};
						uTableId.table = results[i].getAttribute("objectname");
						uTableId.id = records[i].getAttribute("objectid");
						uArray.push(uTableId)
					}
				}
			}
			vCallback(uHasError, uArray)
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzMap::edit方法执行不正确", e)
	}
};

function EzField(vFieldDisplayName, vFieldName, vFieldType, vFieldValue) {
	this.displayName = vFieldDisplayName;
	this.name = vFieldName;
	this.type = vFieldType;
	this.value = vFieldValue;
	this.getDisplayName = function() {
		return this.displayName
	};
	this.setDisplayName = function(vFieldDisplayName) {
		this.displayName = vFieldDisplayName
	};
	this.getName = function() {
		return this.name
	};
	this.setName = function(vFieldName) {
		this.name = vFieldName
	};
	this.getType = function() {
		return this.type
	};
	this.setType = function(vFieldType) {
		this.type = vFieldType
	};
	this.getValue = function() {
		return this.value
	};
	this.setValue = function(vFieldValue) {
		this.value = vFieldValue
	}
}

function drawFeatureObject(vBIsOK, vEzMap) {
	try {
		var vLayers = vEzMap.getQueryResult();
		if(vLayers[0]) {
			drawQueryArea(vLayers[0].getSpatialFilterShapes()[0], vEzMap)
		}
		for(var i = 0; i < vLayers.length; i++) {
			var uLayer = vLayers[i];
			if(!uLayer.bShow) {
				continue
			}
			var uGeometryType = uLayer.getGeometryType();
			var uFeats = uLayer.getFeatures();
			for(var j = 0; j < uFeats.length; j++) {
				var uFeat = uFeats[j];
				var uStrTitle = uFeat.getQueryDispFieldValue();
				var uStrCoordinateSequence = uFeat.getCoordinateSequence();
				var uOverLay = null;
				switch(uGeometryType) {
					case "nil":
						break;
					case "point":
					case "multipoint":
						var uIcon = new Icon();
						uIcon.image = uLayer.imgURL;
						uIcon.height = uLayer.imgHeight;
						uIcon.width = uLayer.imgWidth;
						uIcon.leftOffset = uLayer.leftOffset;
						uIcon.topOffset = uLayer.topOffset;
						var uTitle = new Title(uStrTitle, 12, 7);
						var pMultiPoint = new MultiPoint(uFeat.linestr);
						for(var i = 0; i < pMultiPoint.getSegmentCount(); i++) {
							uOverLay = new Marker(pMultiPoint.getSegment(i), uIcon, uTitle);
							testAddFeat(vEzMap, uOverLay, uFeat.toHTML())
						}
						break;
					case "polyline":
					case "multipolyline":
						var pMultiPolyline = new MultiPolyline(uStrCoordinateSequence, "#ff0000", 3, 0.5, 0);
						for(var i = 0; i < pMultiPolyline.getSegmentCount(); i++) {
							uOverLay = pMultiPolyline.getSegment(i);
							testAddFeat(vEzMap, uOverLay, uFeat.toHTML())
						}
						break;
					case "polygon":
					case "multipolygon":
						var pMultiPlygon = new MultiPolygon(uStrCoordinateSequence, "#ff00FF", 3, 0.5, "blue");
						for(var i = 0; i < pMultiPlygon.getSegmentCount(); i++) {
							uOverLay = pMultiPlygon.getSegment(i);
							testAddFeat(vEzMap, uOverLay, uFeat.toHTML())
						}
						break;
					default:
						break
				}
			}
		}
	} catch(e) {
		alert("查询过程中出错：" + e.msssage)
	}
}

function drawQueryArea(vEzShape, vEzMap) {
	if(vEzShape) {
		var uAreaCoordinateSequence = vEzShape.getCoordinateSequence();
		var uOverlyr = null;
		switch(vEzShape.getGeometryType()) {
			case "polygon":
				uOverlyr = new Polygon(uAreaCoordinateSequence, "#ff00FF", 3, 0.3, "green");
				vEzMap.addOverlay(uOverlyr);
				break;
			case "circle":
				uOverlyr = new Circle(uAreaCoordinateSequence, "#ff00FF", 3, 0.3, "green");
				vEzMap.addOverlay(uOverlyr);
				break;
			case "rectangle":
				uOverlyr = new Rectangle(uAreaCoordinateSequence, "#ff00FF", 3, 0.3, "green");
				vEzMap.addOverlay(uOverlyr);
				break;
			case "multipolygon":
				var uOverlyr = new MultiPolygon(uAreaCoordinateSequence, "#ff00FF", 3, 0.3, "green");
				for(var i = 0; i < uOverlyr.getSegmentCount(); i++) {
					var uOverLaySeg = uOverlyr.getSegment(i);
					vEzMap.addOverlay(uOverLaySeg)
				}
				break;
			default:
				return
		}
		vEzMap.centerAtLatLng(uOverlyr.getMBR().centerPoint())
	}
}

function testAddFeat(vEzMap, viOverLayObj, vStrHtml) {
	vEzMap.addOverlay(viOverLayObj);
	viOverLayObj.addListener("click", function() {
		viOverLayObj.openInfoWindowHtml(vStrHtml)
	})
}

function editCallback(vBIsOK) {
	alert("更新状态:" + vBIsOK)
}

function EzTileThematic(vFormatURL, vBIsStreamOrText, vThematicProxyURL) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vFormatURL, "string")) {
			throw EzErrorFactory.createError("EzTileThematic构造方法中arguments[0]类型不正确")
		} else {
			this.format = vFormatURL;
			this.bIsStreamOrText = vBIsStreamOrText;
			this.thematicProxyURL = vThematicProxyURL
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzTileThematic构造方法执行不正确", e)
	}
}
EzTileThematic.prototype.getFormat = function() {
	return this.format
};
EzTileThematic.prototype.setFormat = function(vFormatURL) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vFormatURL, "string")) {
			throw EzErrorFactory.createError("EzTileThematic::setFormat方法中arguments[0]类型不正确")
		} else {
			this.format = vFormatURL
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzTileThematic::setFormat方法执行不正确", e)
	}
};
EzTileThematic.prototype.open = function(vEzMap) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vEzMap, "EzMap")) {
			throw EzErrorFactory.createError("EzTileThematic::open方法中arguments[0]类型不正确")
		} else {
			vEzMap.map.bThematicOverlay = true;
			vEzMap.map.curThematicURL = this.format;
			if(this.bIsStreamOrText) {
				vEzMap.map.bIsStreamOrText = true
			} else {
				if(this.thematicProxyURL) {
					vEzMap.map.strThematicProxyURL = this.thematicProxyURL
				}
			}
			vEzMap.map.loadTileImages()
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzTileThematic::open方法执行不正确", e)
	}
};
EzTileThematic.prototype.close = function(vEzMap) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vEzMap, "EzMap")) {
			throw EzErrorFactory.createError("EzTileThematic::close方法中arguments[0]类型不正确")
		} else {
			vEzMap.map.bThematicOverlay = false;
			vEzMap.map.removeTilesFromDiv(vEzMap.map.overlayImages);
			vEzMap.map.overlayImages = []
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzTileThematic::close方法执行不正确", e)
	}
};

function EzTileThematicCP03(vThematicBaseURL, vThematicXML, vBIsStreamOrText, vThematicProxyURL) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vThematicBaseURL, "string")) {
			throw EzErrorFactory.createError("EzTileThematicCP03构造方法中arguments[0]类型不正确")
		} else {
			if(!EzServerClient.GlobeFunction.isTypeRight(vThematicXML, "string")) {
				throw EzErrorFactory.createError("EzTileThematicCP03构造方法中arguments[1]类型不正确")
			} else {
				this.thematicBaseURL = vThematicBaseURL;
				this.thematicXML = vThematicXML;
				this.thematicProxyURL = vThematicProxyURL;
				this.bIsStreamOrText = vBIsStreamOrText
			}
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzTileThematicCP03构造方法执行不正确", e)
	}
}
EzTileThematicCP03.prototype.getThematicBaseURL = function() {
	return this.thematicBaseURL
};
EzTileThematicCP03.prototype.getThematicXML = function() {
	return this.thematicXML
};
EzTileThematicCP03.prototype.setThematicBaseURL = function(vThematicBaseURL) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vThematicBaseURL, "string")) {
			throw EzErrorFactory.createError("EzTileThematicCP03::setThematicBaseURL方法中arguments[0]类型不正确")
		} else {
			this.thematicBaseURL = vThematicBaseURL
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzTileThematicCP03::setThematicBaseURL方法执行不正确", e)
	}
};
EzTileThematicCP03.prototype.open = function(vEzMap) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vEzMap, "EzMap")) {
			throw EzErrorFactory.createError("EzTileThematicCP03::open方法中arguments[0]类型不正确")
		} else {
			vEzMap.map.bThematicOverlay = true;
			vEzMap.map.bThematicOverlayCP03 = true;
			vEzMap.map.curThematicURLCP03 = this.thematicBaseURL;
			vEzMap.map.strThematicXML = this.thematicXML;
			if(this.bIsStreamOrText) {
				vEzMap.map.bIsStreamOrText = true
			} else {
				if(this.thematicProxyURL) {
					vEzMap.map.strThematicProxyURL = this.thematicProxyURL
				}
			}
			vEzMap.map.loadTileImages()
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzTileThematicCP03::open方法执行不正确", e)
	}
};
EzTileThematicCP03.prototype.close = function(vEzMap) {
	try {
		if(!EzServerClient.GlobeFunction.isTypeRight(vEzMap, "EzMap")) {
			throw EzErrorFactory.createError("EzTileThematicCP03::close方法中arguments[0]类型不正确")
		} else {
			vEzMap.map.bThematicOverlay = false;
			vEzMap.map.bThematicOverlayCP03 = false;
			vEzMap.map.removeTilesFromDiv(vEzMap.map.overlayImages);
			vEzMap.map.overlayImages = []
		}
	} catch(e) {
		throw EzErrorFactory.createError("EzTileThematicCP03::close方法执行不正确", e)
	}
};