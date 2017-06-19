var mui = function(t, e) {
		var i = /complete|loaded|interactive/,
			n = /^#([\w-]+)$/,
			s = /^\.([\w-]+)$/,
			o = /^[\w-]+$/,
			a = /translate(?:3d)?\((.+?)\)/,
			r = /matrix(3d)?\((.+?)\)/,
			l = function(e, i) {
				if (i = i || t, !e) return c();
				if ("object" == typeof e) return l.isArrayLike(e) ? c(l.slice.call(e), null) : c([e], null);
				if ("function" == typeof e) return l.ready(e);
				if ("string" == typeof e) try {
					if (e = e.trim(), n.test(e)) {
						var s = t.getElementById(RegExp.$1);
						return c(s ? [s] : [])
					}
					return c(l.qsa(e, i), e)
				} catch (t) {}
				return c()
			},
			c = function(t, e) {
				return t = t || [], Object.setPrototypeOf(t, l.fn), t.selector = e || "", t
			};
		l.uuid = 0, l.data = {}, l.extend = function() {
			var t, i, n, s, o, a, r = arguments[0] || {},
				c = 1,
				u = arguments.length,
				h = !1;
			for ("boolean" == typeof r && (h = r, r = arguments[c] || {}, c++), "object" == typeof r || l.isFunction(r) || (r = {}), c === u && (r = this, c--); u > c; c++) if (null != (t = arguments[c])) for (i in t) n = r[i], s = t[i], r !== s && (h && s && (l.isPlainObject(s) || (o = l.isArray(s))) ? (o ? (o = !1, a = n && l.isArray(n) ? n : []) : a = n && l.isPlainObject(n) ? n : {}, r[i] = l.extend(h, a, s)) : s !== e && (r[i] = s));
			return r
		}, l.noop = function() {}, l.slice = [].slice, l.filter = [].filter, l.type = function(t) {
			return null == t ? String(t) : u[{}.toString.call(t)] || "object"
		}, l.isArray = Array.isArray ||
		function(t) {
			return t instanceof Array
		}, l.isArrayLike = function(t) {
			var e = !! t && "length" in t && t.length,
				i = l.type(t);
			return "function" !== i && !l.isWindow(t) && ("array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
		}, l.isWindow = function(t) {
			return null != t && t === t.window
		}, l.isObject = function(t) {
			return "object" === l.type(t)
		}, l.isPlainObject = function(t) {
			return l.isObject(t) && !l.isWindow(t) && Object.getPrototypeOf(t) === Object.prototype
		}, l.isEmptyObject = function(t) {
			for (var i in t) if (i !== e) return !1;
			return !0
		}, l.isFunction = function(t) {
			return "function" === l.type(t)
		}, l.qsa = function(e, i) {
			return i = i || t, l.slice.call(s.test(e) ? i.getElementsByClassName(RegExp.$1) : o.test(e) ? i.getElementsByTagName(e) : i.querySelectorAll(e))
		}, l.ready = function(e) {
			return i.test(t.readyState) ? e(l) : t.addEventListener("DOMContentLoaded", function() {
				e(l)
			}, !1), this
		}, l.buffer = function(t, e, i) {
			function n() {
				s && (s.cancel(), s = 0), o = l.now(), t.apply(i || this, arguments), a = l.now()
			}
			var s, o = 0,
				a = 0,
				e = e || 150;
			return l.extend(function() {
				!o || a >= o && l.now() - a > e || o > a && l.now() - o > 8 * e ? n() : (s && s.cancel(), s = l.later(n, e, null, arguments))
			}, {
				stop: function() {
					s && (s.cancel(), s = 0)
				}
			})
		}, l.each = function(t, e, i) {
			if (!t) return this;
			if ("number" == typeof t.length)[].every.call(t, function(t, i) {
				return e.call(t, i, t) !== !1
			});
			else for (var n in t) if (i) {
				if (t.hasOwnProperty(n) && e.call(t[n], n, t[n]) === !1) return t
			} else if (e.call(t[n], n, t[n]) === !1) return t;
			return this
		}, l.focus = function(t) {
			l.os.ios ? setTimeout(function() {
				t.focus()
			}, 10) : t.focus()
		}, l.trigger = function(t, e, i) {
			return t.dispatchEvent(new CustomEvent(e, {
				detail: i,
				bubbles: !0,
				cancelable: !0
			})), this
		}, l.getStyles = function(t, e) {
			var i = t.ownerDocument.defaultView.getComputedStyle(t, null);
			return e ? i.getPropertyValue(e) || i[e] : i
		}, l.parseTranslate = function(t, e) {
			var i = t.match(a || "");
			return i && i[1] || (i = ["", "0,0,0"]), i = i[1].split(","), i = {
				x: parseFloat(i[0]),
				y: parseFloat(i[1]),
				z: parseFloat(i[2])
			}, e && i.hasOwnProperty(e) ? i[e] : i
		}, l.parseTranslateMatrix = function(t, e) {
			var i = t.match(r),
				n = i && i[1];
			i ? (i = i[2].split(","), "3d" === n ? i = i.slice(12, 15) : (i.push(0), i = i.slice(4, 7))) : i = [0, 0, 0];
			var s = {
				x: parseFloat(i[0]),
				y: parseFloat(i[1]),
				z: parseFloat(i[2])
			};
			return e && s.hasOwnProperty(e) ? s[e] : s
		}, l.hooks = {}, l.addAction = function(t, e) {
			var i = l.hooks[t];
			return i || (i = []), e.index = e.index || 1e3, i.push(e), i.sort(function(t, e) {
				return t.index - e.index
			}), l.hooks[t] = i, l.hooks[t]
		}, l.doAction = function(t, e) {
			l.isFunction(e) ? l.each(l.hooks[t], e) : l.each(l.hooks[t], function(t, e) {
				return !e.handle()
			})
		}, l.later = function(t, e, i, n) {
			e = e || 0;
			var s, o, a = t,
				r = n;
			return "string" == typeof t && (a = i[t]), s = function() {
				a.apply(i, l.isArray(r) ? r : [r])
			}, o = setTimeout(s, e), {
				id: o,
				cancel: function() {
					clearTimeout(o)
				}
			}
		}, l.now = Date.now ||
		function() {
			return +new Date
		};
		var u = {};
		return l.each(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error"], function(t, e) {
			u["[object " + e + "]"] = e.toLowerCase()
		}), window.JSON && (l.parseJSON = JSON.parse), l.fn = {
			each: function(t) {
				return [].every.call(this, function(e, i) {
					return t.call(e, i, e) !== !1
				}), this
			}
		}, "function" == typeof define && define.amd && define("mui", [], function() {
			return l
		}), l
	}(document);
!
function(t, e) {
	function i(i) {
		this.os = {};
		var n = [function() {
			var t = i.match(/(MicroMessenger)\/([\d\.]+)/i);
			return t && (this.os.wechat = {
				version: t[2].replace(/_/g, ".")
			}), !1
		}, function() {
			var t = i.match(/(Android);?[\s\/]+([\d.]+)?/);
			return t && (this.os.android = !0, this.os.version = t[2], this.os.isBadAndroid = !/Chrome\/\d/.test(e.navigator.appVersion)), this.os.android === !0
		}, function() {
			var t = i.match(/(iPhone\sOS)\s([\d_]+)/);
			if (t) this.os.ios = this.os.iphone = !0, this.os.version = t[2].replace(/_/g, ".");
			else {
				var e = i.match(/(iPad).*OS\s([\d_]+)/);
				e && (this.os.ios = this.os.ipad = !0, this.os.version = e[2].replace(/_/g, "."))
			}
			return this.os.ios === !0
		}];
		[].every.call(n, function(e) {
			return !e.call(t)
		})
	}
	i.call(t, navigator.userAgent)
}(mui, window), function(t, e) {
	function i(i) {
		this.os = this.os || {};
		var n = i.match(/Html5Plus/i);
		n && (this.os.plus = !0, t(function() {
			e.body.classList.add("mui-plus")
		}), i.match(/StreamApp/i) && (this.os.stream = !0, t(function() {
			e.body.classList.add("mui-plus-stream")
		})))
	}
	i.call(t, navigator.userAgent)
}(mui, document), function(t) {
	"ontouchstart" in window ? (t.isTouchable = !0, t.EVENT_START = "touchstart", t.EVENT_MOVE = "touchmove", t.EVENT_END = "touchend") : (t.isTouchable = !1, t.EVENT_START = "mousedown", t.EVENT_MOVE = "mousemove", t.EVENT_END = "mouseup"), t.EVENT_CANCEL = "touchcancel", t.EVENT_CLICK = "click";
	var e = 1,
		i = {},
		n = {
			preventDefault: "isDefaultPrevented",
			stopImmediatePropagation: "isImmediatePropagationStopped",
			stopPropagation: "isPropagationStopped"
		},
		s = function() {
			return !0
		},
		o = function() {
			return !1
		},
		a = function(e, i) {
			return e.detail ? e.detail.currentTarget = i : e.detail = {
				currentTarget: i
			}, t.each(n, function(t, i) {
				var n = e[t];
				e[t] = function() {
					return this[i] = s, n && n.apply(e, arguments)
				}, e[i] = o
			}, !0), e
		},
		r = function(t) {
			return t && (t._mid || (t._mid = e++))
		},
		l = {},
		c = function(e, n, s, o) {
			return function(s) {
				for (var o = i[e._mid][n], r = [], l = s.target, c = {}; l && l !== document && l !== e && (!~ ["click", "tap", "doubletap", "longtap", "hold"].indexOf(n) || !l.disabled && !l.classList.contains("mui-disabled")); l = l.parentNode) {
					var u = {};
					t.each(o, function(i, n) {
						c[i] || (c[i] = t.qsa(i, e)), c[i] && ~c[i].indexOf(l) && (u[i] || (u[i] = n))
					}, !0), t.isEmptyObject(u) || r.push({
						element: l,
						handlers: u
					})
				}
				c = null, s = a(s), t.each(r, function(e, i) {
					l = i.element;
					var o = l.tagName;
					return "tap" === n && "INPUT" !== o && "TEXTAREA" !== o && "SELECT" !== o && (s.preventDefault(), s.detail && s.detail.gesture && s.detail.gesture.preventDefault()), t.each(i.handlers, function(e, i) {
						t.each(i, function(t, e) {
							e.call(l, s) === !1 && (s.preventDefault(), s.stopPropagation())
						}, !0)
					}, !0), !s.isPropagationStopped() && void 0
				}, !0)
			}
		},
		u = function(t, e) {
			var i = l[r(t)],
				n = [];
			if (i) {
				if (n = [], e) {
					var s = function(t) {
							return t.type === e
						};
					return i.filter(s)
				}
				n = i
			}
			return n
		},
		h = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
	t.fn.on = function(e, n, s) {
		return this.each(function() {
			var o = this;
			r(o), r(s);
			var a = !1,
				u = i[o._mid] || (i[o._mid] = {}),
				d = u[e] || (u[e] = {});
			t.isEmptyObject(d) && (a = !0);
			var p = d[n] || (d[n] = []);
			if (p.push(s), a) {
				var f = l[r(o)];
				f || (f = []);
				var m = c(o, e, n, s);
				f.push(m), m.i = f.length - 1, m.type = e, l[r(o)] = f, o.addEventListener(e, m), "tap" === e && o.addEventListener("click", function(t) {
					if (t.target) {
						var e = t.target.tagName;
						if (!h.test(e)) if ("A" === e) {
							var i = t.target.href;
							i && ~i.indexOf("tel:") || t.preventDefault()
						} else t.preventDefault()
					}
				})
			}
		})
	}, t.fn.off = function(e, n, s) {
		return this.each(function() {
			var o = r(this);
			if (e) if (n) if (s) {
				var a = i[o] && i[o][e] && i[o][e][n];
				t.each(a, function(t, e) {
					return r(e) === r(s) ? (a.splice(t, 1), !1) : void 0
				}, !0)
			} else i[o] && i[o][e] && delete i[o][e][n];
			else i[o] && delete i[o][e];
			else i[o] && delete i[o];
			i[o] ? (!i[o][e] || t.isEmptyObject(i[o][e])) && u(this, e).forEach(function(t) {
				this.removeEventListener(t.type, t), delete l[o][t.i]
			}.bind(this)) : u(this).forEach(function(t) {
				this.removeEventListener(t.type, t), delete l[o][t.i]
			}.bind(this))
		})
	}
}(mui), function(t, e, i) {
	t.targets = {}, t.targetHandles = [], t.registerTarget = function(e) {
		return e.index = e.index || 1e3, t.targetHandles.push(e), t.targetHandles.sort(function(t, e) {
			return t.index - e.index
		}), t.targetHandles
	}, e.addEventListener(t.EVENT_START, function(e) {
		for (var n = e.target, s = {}; n && n !== i; n = n.parentNode) {
			var o = !1;
			if (t.each(t.targetHandles, function(i, a) {
				var r = a.name;
				o || s[r] || !a.hasOwnProperty("handle") ? s[r] || a.isReset !== !1 && (t.targets[r] = !1) : (t.targets[r] = a.handle(e, n), t.targets[r] && (s[r] = !0, a.isContinue !== !0 && (o = !0)))
			}), o) break
		}
	}), e.addEventListener("click", function(e) {
		for (var n = e.target, s = !1; n && n !== i && ("A" !== n.tagName || (t.each(t.targetHandles, function(t, i) {
			return i.name, i.hasOwnProperty("handle") && i.handle(e, n) ? (s = !0, e.preventDefault(), !1) : void 0
		}), !s)); n = n.parentNode);
	})
}(mui, window, document), function(t) {
	String.prototype.trim === t && (String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "")
	}), Object.setPrototypeOf = Object.setPrototypeOf ||
	function(t, e) {
		return t.__proto__ = e, t
	}
}(), function() {
	function t(t, e) {
		e = e || {
			bubbles: !1,
			cancelable: !1,
			detail: void 0
		};
		var i = document.createEvent("Events"),
			n = !0;
		for (var s in e)"bubbles" === s ? n = !! e[s] : i[s] = e[s];
		return i.initEvent(t, n, !0), i
	}
	"undefined" == typeof window.CustomEvent && (t.prototype = window.Event.prototype, window.CustomEvent = t)
}(), Function.prototype.bind = Function.prototype.bind ||
function(t) {
	var e = Array.prototype.splice.call(arguments, 1),
		i = this,
		n = function() {
			var s = e.concat(Array.prototype.splice.call(arguments, 0));
			return this instanceof n ? void i.apply(this, s) : i.apply(t, s)
		};
	return n.prototype = i.prototype, n
}, function(t) {
	"classList" in t.documentElement || !Object.defineProperty || "undefined" == typeof HTMLElement || Object.defineProperty(HTMLElement.prototype, "classList", {
		get: function() {
			function t(t) {
				return function(i) {
					var n = e.className.split(/\s+/),
						s = n.indexOf(i);
					t(n, s, i), e.className = n.join(" ")
				}
			}
			var e = this,
				i = {
					add: t(function(t, e, i) {~e || t.push(i)
					}),
					remove: t(function(t, e) {~e && t.splice(e, 1)
					}),
					toggle: t(function(t, e, i) {~e ? t.splice(e, 1) : t.push(i)
					}),
					contains: function(t) {
						return !!~e.className.split(/\s+/).indexOf(t)
					},
					item: function(t) {
						return e.className.split(/\s+/)[t] || null
					}
				};
			return Object.defineProperty(i, "length", {
				get: function() {
					return e.className.split(/\s+/).length
				}
			}), i
		}
	})
}(document), function(t) {
	if (!t.requestAnimationFrame) {
		var e = 0;
		t.requestAnimationFrame = t.webkitRequestAnimationFrame ||
		function(i, n) {
			var s = (new Date).getTime(),
				o = Math.max(0, 16.7 - (s - e)),
				a = t.setTimeout(function() {
					i(s + o)
				}, o);
			return e = s + o, a
		}, t.cancelAnimationFrame = t.webkitCancelAnimationFrame || t.webkitCancelRequestAnimationFrame ||
		function(t) {
			clearTimeout(t)
		}
	}
}(window), function(t, e, i) {
	if ((t.os.android || t.os.ios) && !e.FastClick) {
		var n = function(t, e) {
				return "LABEL" === e.tagName && e.parentNode && (e = e.parentNode.querySelector("input")), !(!e || "radio" !== e.type && "checkbox" !== e.type || e.disabled) && e
			};
		t.registerTarget({
			name: i,
			index: 40,
			handle: n,
			target: !1
		});
		var s = function(i) {
				var n = t.targets.click;
				if (n) {
					var s, o;
					document.activeElement && document.activeElement !== n && document.activeElement.blur(), o = i.detail.gesture.changedTouches[0], s = document.createEvent("MouseEvents"), s.initMouseEvent("click", !0, !0, e, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), s.forwardedTouchEvent = !0, n.dispatchEvent(s), i.detail && i.detail.gesture.preventDefault()
				}
			};
		e.addEventListener("tap", s), e.addEventListener("doubletap", s), e.addEventListener("click", function(e) {
			return t.targets.click && !e.forwardedTouchEvent ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : void 0
		}, !0)
	}
}(mui, window, "click"), function(t, e) {
	t(function() {
		if (t.os.ios) {
			var i = "mui-focusin",
				n = "mui-bar-tab",
				s = "mui-bar-footer",
				o = "mui-bar-footer-secondary",
				a = "mui-bar-footer-secondary-tab";
			e.addEventListener("focusin", function(r) {
				if (!(t.os.plus && window.plus && plus.webview.currentWebview().children().length > 0)) {
					var l = r.target;
					if (l.tagName && ("TEXTAREA" === l.tagName || "INPUT" === l.tagName && ("text" === l.type || "search" === l.type || "number" === l.type))) {
						if (l.disabled || l.readOnly) return;
						e.body.classList.add(i);
						for (var c = !1; l && l !== e; l = l.parentNode) {
							var u = l.classList;
							if (u && u.contains(n) || u.contains(s) || u.contains(o) || u.contains(a)) {
								c = !0;
								break
							}
						}
						if (c) {
							var h = e.body.scrollHeight,
								d = e.body.scrollLeft;
							setTimeout(function() {
								window.scrollTo(d, h)
							}, 20)
						}
					}
				}
			}), e.addEventListener("focusout", function(t) {
				var n = e.body.classList;
				n.contains(i) && (n.remove(i), setTimeout(function() {
					window.scrollTo(e.body.scrollLeft, e.body.scrollTop)
				}, 20))
			})
		}
	})
}(mui, document), function(t) {
	t.namespace = "mui", t.classNamePrefix = t.namespace + "-", t.classSelectorPrefix = "." + t.classNamePrefix, t.className = function(e) {
		return t.classNamePrefix + e
	}, t.classSelector = function(e) {
		return e.replace(/\./g, t.classSelectorPrefix)
	}, t.eventName = function(e, i) {
		return e + (t.namespace ? "." + t.namespace : "") + (i ? "." + i : "")
	}
}(mui), function(t, e) {
	t.gestures = {
		session: {}
	}, t.preventDefault = function(t) {
		t.preventDefault()
	}, t.stopPropagation = function(t) {
		t.stopPropagation()
	}, t.addGesture = function(e) {
		return t.addAction("gestures", e)
	};
	var i = Math.round,
		n = Math.abs,
		s = Math.sqrt,
		o = (Math.atan, Math.atan2),
		a = function(t, e, i) {
			i || (i = ["x", "y"]);
			var n = e[i[0]] - t[i[0]],
				o = e[i[1]] - t[i[1]];
			return s(n * n + o * o)
		},
		r = function(t, e) {
			if (t.length >= 2 && e.length >= 2) {
				var i = ["pageX", "pageY"];
				return a(e[1], e[0], i) / a(t[1], t[0], i)
			}
			return 1
		},
		l = function(t, e, i) {
			i || (i = ["x", "y"]);
			var n = e[i[0]] - t[i[0]],
				s = e[i[1]] - t[i[1]];
			return 180 * o(s, n) / Math.PI
		},
		c = function(t, e) {
			return t === e ? "" : n(t) >= n(e) ? t > 0 ? "left" : "right" : e > 0 ? "up" : "down"
		},
		u = function(t, e) {
			var i = ["pageX", "pageY"];
			return l(e[1], e[0], i) - l(t[1], t[0], i)
		},
		h = function(t, e, i) {
			return {
				x: e / t || 0,
				y: i / t || 0
			}
		},
		d = function(e, i) {
			t.gestures.stoped || t.doAction("gestures", function(n, s) {
				t.gestures.stoped || t.options.gestureConfig[s.name] !== !1 && s.handle(e, i)
			})
		},
		p = function(t, e) {
			for (; t;) {
				if (t == e) return !0;
				t = t.parentNode
			}
			return !1
		},
		f = function(t, e, i) {
			for (var n = [], s = [], o = 0; o < t.length;) {
				var a = e ? t[o][e] : t[o];
				s.indexOf(a) < 0 && n.push(t[o]), s[o] = a, o++
			}
			return i && (n = e ? n.sort(function(t, i) {
				return t[e] > i[e]
			}) : n.sort()), n
		},
		m = function(t) {
			var e = t.length;
			if (1 === e) return {
				x: i(t[0].pageX),
				y: i(t[0].pageY)
			};
			for (var n = 0, s = 0, o = 0; e > o;) n += t[o].pageX, s += t[o].pageY, o++;
			return {
				x: i(n / e),
				y: i(s / e)
			}
		},
		g = function() {
			return t.options.gestureConfig.pinch
		},
		v = function(e) {
			for (var n = [], s = 0; s < e.touches.length;) n[s] = {
				pageX: i(e.touches[s].pageX),
				pageY: i(e.touches[s].pageY)
			}, s++;
			return {
				timestamp: t.now(),
				gesture: e.gesture,
				touches: n,
				center: m(e.touches),
				deltaX: e.deltaX,
				deltaY: e.deltaY
			}
		},
		y = function(e) {
			var i = t.gestures.session,
				n = e.center,
				s = i.offsetDelta || {},
				o = i.prevDelta || {},
				a = i.prevTouch || {};
			(e.gesture.type === t.EVENT_START || e.gesture.type === t.EVENT_END) && (o = i.prevDelta = {
				x: a.deltaX || 0,
				y: a.deltaY || 0
			}, s = i.offsetDelta = {
				x: n.x,
				y: n.y
			}), e.deltaX = o.x + (n.x - s.x), e.deltaY = o.y + (n.y - s.y)
		},
		w = function(e) {
			var i = t.gestures.session,
				n = e.touches,
				s = n.length;
			i.firstTouch || (i.firstTouch = v(e)), g() && s > 1 && !i.firstMultiTouch ? i.firstMultiTouch = v(e) : 1 === s && (i.firstMultiTouch = !1);
			var o = i.firstTouch,
				h = i.firstMultiTouch,
				d = h ? h.center : o.center,
				p = e.center = m(n);
			e.timestamp = t.now(), e.deltaTime = e.timestamp - o.timestamp, e.angle = l(d, p), e.distance = a(d, p), y(e), e.offsetDirection = c(e.deltaX, e.deltaY), e.scale = h ? r(h.touches, n) : 1, e.rotation = h ? u(h.touches, n) : 0, T(e)
		},
		b = 25,
		T = function(e) {
			var i, s, o, a, r = t.gestures.session,
				l = r.lastInterval || e,
				u = e.timestamp - l.timestamp;
			if (e.gesture.type != t.EVENT_CANCEL && (u > b || void 0 === l.velocity)) {
				var d = l.deltaX - e.deltaX,
					p = l.deltaY - e.deltaY,
					f = h(u, d, p);
				s = f.x, o = f.y, i = n(f.x) > n(f.y) ? f.x : f.y, a = c(d, p) || l.direction, r.lastInterval = e
			} else i = l.velocity, s = l.velocityX, o = l.velocityY, a = l.direction;
			e.velocity = i, e.velocityX = s, e.velocityY = o, e.direction = a
		},
		L = {},
		E = function(t) {
			for (var e = 0; e < t.length; e++)!t.identifier && (t.identifier = 0);
			return t
		},
		x = function(e, i) {
			var n = E(t.slice.call(e.touches || [e])),
				s = e.type,
				o = [],
				a = [];
			if (s !== t.EVENT_START && s !== t.EVENT_MOVE || 1 !== n.length) {
				var r = 0,
					o = [],
					a = [],
					l = E(t.slice.call(e.changedTouches || [e]));
				i.target = e.target;
				var c = t.gestures.session.target || e.target;
				if (o = n.filter(function(t) {
					return p(t.target, c)
				}), s === t.EVENT_START) for (r = 0; r < o.length;) L[o[r].identifier] = !0, r++;
				for (r = 0; r < l.length;) L[l[r].identifier] && a.push(l[r]), (s === t.EVENT_END || s === t.EVENT_CANCEL) && delete L[l[r].identifier], r++;
				if (!a.length) return !1
			} else L[n[0].identifier] = !0, o = n, a = n, i.target = e.target;
			o = f(o.concat(a), "identifier", !0);
			var u = o.length,
				h = a.length;
			return s === t.EVENT_START && u - h === 0 && (i.isFirst = !0, t.gestures.touch = t.gestures.session = {
				target: e.target
			}), i.isFinal = (s === t.EVENT_END || s === t.EVENT_CANCEL) && u - h === 0, i.touches = o, i.changedTouches = a, !0
		},
		S = function(e) {
			var i = {
				gesture: e
			},
				n = x(e, i);
			n && (w(i), d(e, i), t.gestures.session.prevTouch = i, e.type !== t.EVENT_END || t.isTouchable || (t.gestures.touch = t.gestures.session = {}))
		};
	e.addEventListener(t.EVENT_START, S), e.addEventListener(t.EVENT_MOVE, S), e.addEventListener(t.EVENT_END, S), e.addEventListener(t.EVENT_CANCEL, S), e.addEventListener(t.EVENT_CLICK, function(e) {
		(t.os.android || t.os.ios) && (t.targets.popover && e.target === t.targets.popover || t.targets.tab || t.targets.offcanvas || t.targets.modal) && e.preventDefault()
	}, !0), t.isScrolling = !1;
	var _ = null;
	e.addEventListener("scroll", function() {
		t.isScrolling = !0, _ && clearTimeout(_), _ = setTimeout(function() {
			t.isScrolling = !1
		}, 250)
	})
}(mui, window), function(t, e) {
	var i = 0,
		n = function(n, s) {
			var o = t.gestures.session,
				a = this.options,
				r = t.now();
			switch (n.type) {
			case t.EVENT_MOVE:
				r - i > 300 && (i = r, o.flickStart = s.center);
				break;
			case t.EVENT_END:
			case t.EVENT_CANCEL:
				s.flick = !1, o.flickStart && a.flickMaxTime > r - i && s.distance > a.flickMinDistince && (s.flick = !0, s.flickTime = r - i, s.flickDistanceX = s.center.x - o.flickStart.x, s.flickDistanceY = s.center.y - o.flickStart.y, t.trigger(o.target, e, s), t.trigger(o.target, e + s.direction, s))
			}
		};
	t.addGesture({
		name: e,
		index: 5,
		handle: n,
		options: {
			flickMaxTime: 200,
			flickMinDistince: 10
		}
	})
}(mui, "flick"), function(t, e) {
	var i = function(i, n) {
			var s = t.gestures.session;
			if (i.type === t.EVENT_END || i.type === t.EVENT_CANCEL) {
				var o = this.options;
				n.swipe = !1, n.direction && o.swipeMaxTime > n.deltaTime && n.distance > o.swipeMinDistince && (n.swipe = !0, t.trigger(s.target, e, n), t.trigger(s.target, e + n.direction, n))
			}
		};
	t.addGesture({
		name: e,
		index: 10,
		handle: i,
		options: {
			swipeMaxTime: 300,
			swipeMinDistince: 18
		}
	})
}(mui, "swipe"), function(t, e) {
	var i = function(i, n) {
			var s = t.gestures.session;
			switch (i.type) {
			case t.EVENT_START:
				break;
			case t.EVENT_MOVE:
				if (!n.direction || !s.target) return;
				s.lockDirection && s.startDirection && s.startDirection && s.startDirection !== n.direction && ("up" === s.startDirection || "down" === s.startDirection ? n.direction = n.deltaY < 0 ? "up" : "down" : n.direction = n.deltaX < 0 ? "left" : "right"), s.drag || (s.drag = !0, t.trigger(s.target, e + "start", n)), t.trigger(s.target, e, n), t.trigger(s.target, e + n.direction, n);
				break;
			case t.EVENT_END:
			case t.EVENT_CANCEL:
				s.drag && n.isFinal && t.trigger(s.target, e + "end", n)
			}
		};
	t.addGesture({
		name: e,
		index: 20,
		handle: i,
		options: {
			fingers: 1
		}
	})
}(mui, "drag"), function(t, e) {
	var i, n, s = function(s, o) {
			var a = t.gestures.session,
				r = this.options;
			switch (s.type) {
			case t.EVENT_END:
				if (!o.isFinal) return;
				var l = a.target;
				if (!l || l.disabled || l.classList && l.classList.contains("mui-disabled")) return;
				if (o.distance < r.tapMaxDistance && o.deltaTime < r.tapMaxTime) {
					if (t.options.gestureConfig.doubletap && i && i === l && n && o.timestamp - n < r.tapMaxInterval) return t.trigger(l, "doubletap", o), n = t.now(), void(i = l);
					t.trigger(l, e, o), n = t.now(), i = l
				}
			}
		};
	t.addGesture({
		name: e,
		index: 30,
		handle: s,
		options: {
			fingers: 1,
			tapMaxInterval: 300,
			tapMaxDistance: 5,
			tapMaxTime: 250
		}
	})
}(mui, "tap"), function(t, e) {
	var i, n = function(n, s) {
			var o = t.gestures.session,
				a = this.options;
			switch (n.type) {
			case t.EVENT_START:
				clearTimeout(i), i = setTimeout(function() {
					t.trigger(o.target, e, s)
				}, a.holdTimeout);
				break;
			case t.EVENT_MOVE:
				s.distance > a.holdThreshold && clearTimeout(i);
				break;
			case t.EVENT_END:
			case t.EVENT_CANCEL:
				clearTimeout(i)
			}
		};
	t.addGesture({
		name: e,
		index: 10,
		handle: n,
		options: {
			fingers: 1,
			holdTimeout: 500,
			holdThreshold: 2
		}
	})
}(mui, "longtap"), function(t, e) {
	var i, n = function(n, s) {
			var o = t.gestures.session,
				a = this.options;
			switch (n.type) {
			case t.EVENT_START:
				t.options.gestureConfig.hold && (i && clearTimeout(i), i = setTimeout(function() {
					s.hold = !0, t.trigger(o.target, e, s)
				}, a.holdTimeout));
				break;
			case t.EVENT_MOVE:
				break;
			case t.EVENT_END:
			case t.EVENT_CANCEL:
				i && (clearTimeout(i) && (i = null), t.trigger(o.target, "release", s))
			}
		};
	t.addGesture({
		name: e,
		index: 10,
		handle: n,
		options: {
			fingers: 1,
			holdTimeout: 0
		}
	})
}(mui, "hold"), function(t, e) {
	var i = function(i, n) {
			var s = this.options,
				o = t.gestures.session;
			switch (i.type) {
			case t.EVENT_START:
				break;
			case t.EVENT_MOVE:
				if (t.options.gestureConfig.pinch) {
					if (n.touches.length < 2) return;
					o.pinch || (o.pinch = !0, t.trigger(o.target, e + "start", n)), t.trigger(o.target, e, n);
					var a = n.scale,
						r = n.rotation,
						l = "undefined" == typeof n.lastScale ? 1 : n.lastScale,
						c = 1e-12;
					a > l ? (l = a - c, t.trigger(o.target, e + "out", n)) : l > a && (l = a + c, t.trigger(o.target, e + "in", n)), Math.abs(r) > s.minRotationAngle && t.trigger(o.target, "rotate", n)
				}
				break;
			case t.EVENT_END:
			case t.EVENT_CANCEL:
				t.options.gestureConfig.pinch && o.pinch && 2 === n.touches.length && (o.pinch = !1, t.trigger(o.target, e + "end", n))
			}
		};
	t.addGesture({
		name: e,
		index: 10,
		handle: i,
		options: {
			minRotationAngle: 0
		}
	})
}(mui, "pinch"), function(t) {
	function e(t, e) {
		var i = "MUI_SCROLL_POSITION_" + document.location.href + "_" + e.src,
			n = parseFloat(localStorage.getItem(i)) || 0;
		n && !
		function(t) {
			e.onload = function() {
				window.scrollTo(0, t)
			}
		}(n), setInterval(function() {
			var t = window.scrollY;
			n !== t && (localStorage.setItem(i, t + ""), n = t)
		}, 100)
	}
	t.global = t.options = {
		gestureConfig: {
			tap: !0,
			doubletap: !1,
			longtap: !1,
			hold: !1,
			flick: !0,
			swipe: !0,
			drag: !0,
			pinch: !1
		}
	}, t.initGlobal = function(e) {
		return t.options = t.extend(!0, t.global, e), this
	};
	var i = {},
		n = !1;
	t.init = function(e) {
		return n = !0, t.options = t.extend(!0, t.global, e || {}), t.ready(function() {
			t.doAction("inits", function(e, n) {
				var s = !(i[n.name] && !n.repeat);
				s && (n.handle.call(t), i[n.name] = !0)
			})
		}), this
	}, t.addInit = function(e) {
		return t.addAction("inits", e)
	}, t.addInit({
		name: "iframe",
		index: 100,
		handle: function() {
			var e = t.options,
				i = e.subpages || [];
			!t.os.plus && i.length && s(i[0])
		}
	});
	var s = function(i) {
			var n = document.createElement("div");
			n.className = "mui-iframe-wrapper";
			var s = i.styles || {};
			"string" != typeof s.top && (s.top = "0px"), "string" != typeof s.bottom && (s.bottom = "0px"), n.style.top = s.top, n.style.bottom = s.bottom;
			var o = document.createElement("iframe");
			o.src = i.url, o.id = i.id || i.url, o.name = o.id, n.appendChild(o), document.body.appendChild(n), t.os.wechat && e(n, o)
		};
	t(function() {
		var e = document.body.classList,
			i = [];
		t.os.ios ? (i.push({
			os: "ios",
			version: t.os.version
		}), e.add("mui-ios")) : t.os.android && (i.push({
			os: "android",
			version: t.os.version
		}), e.add("mui-android")), t.os.wechat && (i.push({
			os: "wechat",
			version: t.os.wechat.version
		}), e.add("mui-wechat")), i.length && t.each(i, function(i, n) {
			var s = "";
			n.version && t.each(n.version.split("."), function(i, o) {
				s = s + (s ? "-" : "") + o, e.add(t.className(n.os + "-" + s))
			})
		})
	})
}(mui), function(t) {
	var e = {
		swipeBack: !1,
		preloadPages: [],
		preloadLimit: 10,
		keyEventBind: {
			backbutton: !0,
			menubutton: !0
		}
	},
		i = {
			autoShow: !0,
			duration: t.os.ios ? 200 : 100,
			aniShow: "slide-in-right"
		};
	t.options.show && (i = t.extend(!0, i, t.options.show)), t.currentWebview = null, t.isHomePage = !1, t.extend(!0, t.global, e), t.extend(!0, t.options, e), t.waitingOptions = function(e) {
		return t.extend(!0, {}, {
			autoShow: !0,
			title: "",
			modal: !1
		}, e)
	}, t.showOptions = function(e) {
		return t.extend(!0, {}, i, e)
	}, t.windowOptions = function(e) {
		return t.extend({
			scalable: !1,
			bounce: ""
		}, e)
	}, t.plusReady = function(t) {
		return window.plus ? setTimeout(function() {
			t()
		}, 0) : document.addEventListener("plusready", function() {
			t()
		}, !1), this
	}, t.fire = function(e, i, n) {
		e && ("" !== n && (n = n || {}, t.isPlainObject(n) && (n = JSON.stringify(n || {}).replace(/\'/g, "\'").replace(/\\/g, "\\"))), e.evalJS("typeof mui!=='undefined'&&mui.receive('" + i + "','" + n + "')"))
	}, t.receive = function(e, i) {
		if (e) {
			try {
				i && (i = JSON.parse(i))
			} catch (t) {}
			t.trigger(document, e, i)
		}
	};
	var n = function(e) {
			if (!e.preloaded) {
				t.fire(e, "preload");
				for (var i = e.children(), n = 0; n < i.length; n++) t.fire(i[n], "preload");
				e.preloaded = !0
			}
		},
		s = function(e, i, n) {
			if (n) {
				if (!e[i + "ed"]) {
					t.fire(e, i);
					for (var s = e.children(), o = 0; o < s.length; o++) t.fire(s[o], i);
					e[i + "ed"] = !0
				}
			} else {
				t.fire(e, i);
				for (var s = e.children(), o = 0; o < s.length; o++) t.fire(s[o], i)
			}
		};
	t.openWindow = function(e, i, o) {
		if ("object" == typeof e ? (o = e, e = o.url, i = o.id || e) : "object" == typeof i ? (o = i, i = e) : i = i || e, !t.os.plus) return void(t.os.ios || t.os.android ? window.top.location.href = e : window.parent.location.href = e);
		if (window.plus) {
			o = o || {};
			var a, r, l = o.params || {},
				c = null,
				u = null;
			if (t.webviews[i] && (u = t.webviews[i], plus.webview.getWebviewById(i) && (c = u.webview)), u && c) return a = u.show, a = o.show ? t.extend(a, o.show) : a, c.show(a.aniShow, a.duration, function() {
				n(c), s(c, "pagebeforeshow", !1)
			}), u.afterShowMethodName && c.evalJS(u.afterShowMethodName + "('" + JSON.stringify(l) + "')"), c;
			if (o.createNew !== !0) {
				if (c = plus.webview.getWebviewById(i)) return a = t.showOptions(o.show), a.autoShow && c.show(a.aniShow, a.duration, function() {
					n(c), s(c, "pagebeforeshow", !1)
				}), c;
				if (!e) throw new Error("webview[" + i + "] does not exist")
			}
			var h = t.waitingOptions(o.waiting);
			if (h.autoShow && (r = plus.nativeUI.showWaiting(h.title, h.options)), o = t.extend(o, {
				id: i,
				url: e
			}), c = t.createWindow(o), a = t.showOptions(o.show), a.autoShow) {
				var d = function() {
						r && r.close(), c.show(a.aniShow, a.duration, function() {}), c.showed = !0, o.afterShowMethodName && c.evalJS(o.afterShowMethodName + "('" + JSON.stringify(l) + "')")
					};
				e ? (c.addEventListener("titleUpdate", d, !1), c.addEventListener("loaded", function() {
					n(c), s(c, "pagebeforeshow", !1)
				}, !1)) : d()
			}
			return c
		}
	}, t.createWindow = function(e, i) {
		if (window.plus) {
			var n, s = e.id || e.url;
			if (e.preload) {
				t.webviews[s] && t.webviews[s].webview.getURL() ? n = t.webviews[s].webview : (e.createNew !== !0 && (n = plus.webview.getWebviewById(s)), n || (n = plus.webview.create(e.url, s, t.windowOptions(e.styles), t.extend({
					preload: !0
				}, e.extras)), e.subpages && t.each(e.subpages, function(e, i) {
					var s = i.id || i.url;
					if (s) {
						var o = plus.webview.getWebviewById(s);
						o || (o = plus.webview.create(i.url, s, t.windowOptions(i.styles), t.extend({
							preload: !0
						}, i.extras))), n.append(o)
					}
				}))), t.webviews[s] = {
					webview: n,
					preload: !0,
					show: t.showOptions(e.show),
					afterShowMethodName: e.afterShowMethodName
				};
				var o = t.data.preloads,
					a = o.indexOf(s);
				if (~a && o.splice(a, 1), o.push(s), o.length > t.options.preloadLimit) {
					var r = t.data.preloads.shift(),
						l = t.webviews[r];
					l && l.webview && t.closeAll(l.webview), delete t.webviews[r]
				}
			} else i !== !1 && (n = plus.webview.create(e.url, s, t.windowOptions(e.styles), e.extras), e.subpages && t.each(e.subpages, function(e, i) {
				var s = i.id || i.url,
					o = plus.webview.getWebviewById(s);
				o || (o = plus.webview.create(i.url, s, t.windowOptions(i.styles), i.extras)), n.append(o)
			}));
			return n
		}
	}, t.preload = function(e) {
		return e.preload || (e.preload = !0), t.createWindow(e)
	}, t.closeOpened = function(e) {
		var i = e.opened();
		if (i) for (var n = 0, s = i.length; s > n; n++) {
			var o = i[n],
				a = o.opened();
			a && a.length > 0 ? (t.closeOpened(o), o.close("none")) : o.parent() !== e && o.close("none")
		}
	}, t.closeAll = function(e, i) {
		t.closeOpened(e), i ? e.close(i) : e.close()
	}, t.createWindows = function(e) {
		t.each(e, function(e, i) {
			t.createWindow(i, !1)
		})
	}, t.appendWebview = function(e) {
		if (window.plus) {
			var i, n = e.id || e.url;
			return t.webviews[n] || (plus.webview.getWebviewById(n) || (i = plus.webview.create(e.url, n, e.styles, e.extras)), plus.webview.currentWebview().append(i), t.webviews[n] = e), i
		}
	}, t.webviews = {}, t.data.preloads = [], t.plusReady(function() {
		t.currentWebview = plus.webview.currentWebview()
	}), t.addInit({
		name: "5+",
		index: 100,
		handle: function() {
			var e = t.options,
				i = e.subpages || [];
			t.os.plus && t.plusReady(function() {
				t.each(i, function(e, i) {
					t.appendWebview(i)
				}), plus.webview.currentWebview() === plus.webview.getWebviewById(plus.runtime.appid) && (t.isHomePage = !0, setTimeout(function() {
					n(plus.webview.currentWebview())
				}, 300)), t.os.ios && t.options.statusBarBackground && plus.navigator.setStatusBarBackground(t.options.statusBarBackground), t.os.android && parseFloat(t.os.version) < 4.4 && null == plus.webview.currentWebview().parent() && document.addEventListener("resume", function() {
					var t = document.body;
					t.style.display = "none", setTimeout(function() {
						t.style.display = ""
					}, 10)
				})
			})
		}
	}), window.addEventListener("preload", function() {
		var e = t.options.preloadPages || [];
		t.plusReady(function() {
			t.each(e, function(e, i) {
				t.createWindow(t.extend(i, {
					preload: !0
				}))
			})
		})
	}), t.supportStatusbarOffset = function() {
		return t.os.plus && t.os.ios && parseFloat(t.os.version) >= 7
	}, t.ready(function() {
		t.supportStatusbarOffset() && document.body.classList.add("mui-statusbar")
	})
}(mui), function(t, e) {
	t.addBack = function(e) {
		return t.addAction("backs", e)
	}, t.addBack({
		name: "browser",
		index: 100,
		handle: function() {
			return e.history.length > 1 && (e.history.back(), !0)
		}
	}), t.back = function() {
		("function" != typeof t.options.beforeback || t.options.beforeback() !== !1) && t.doAction("backs")
	}, e.addEventListener("tap", function(e) {
		var i = t.targets.action;
		i && i.classList.contains("mui-action-back") && (t.back(), t.targets.action = !1)
	}), e.addEventListener("swiperight", function(e) {
		var i = e.detail;
		t.options.swipeBack === !0 && Math.abs(i.angle) < 3 && t.back()
	})
}(mui, window), function(t, e) {
	t.os.plus && t.os.android && t.addBack({
		name: "mui",
		index: 5,
		handle: function() {
			if (t.targets._popover && t.targets._popover.classList.contains("mui-active")) return t(t.targets._popover).popover("hide"), !0;
			var e = document.querySelector(".mui-off-canvas-wrap.mui-active");
			if (e) return t(e).offCanvas("close"), !0;
			var i = t.isFunction(t.getPreviewImage) && t.getPreviewImage();
			return i && i.isShown() ? (i.close(), !0) : t.closePopup()
		}
	}), t.__back__first = null, t.addBack({
		name: "5+",
		index: 10,
		handle: function() {
			if (!e.plus) return !1;
			var i = plus.webview.currentWebview(),
				n = i.parent();
			return n ? n.evalJS("mui&&mui.back();") : i.canBack(function(n) {
				n.canBack ? e.history.back() : i.id === plus.runtime.appid ? t.__back__first ? (new Date).getTime() - t.__back__first < 2e3 && plus.runtime.quit() : (t.__back__first = (new Date).getTime(), mui.toast("再按一次退出应用"), setTimeout(function() {
					t.__back__first = null
				}, 2e3)) : i.preload ? i.hide("auto") : t.closeAll(i)
			}), !0
		}
	}), t.menu = function() {
		var i = document.querySelector(".mui-action-menu");
		if (i) t.trigger(i, t.EVENT_START), t.trigger(i, "tap");
		else if (e.plus) {
			var n = t.currentWebview,
				s = n.parent();
			s && s.evalJS("mui&&mui.menu();")
		}
	};
	var i = function() {
			t.back()
		},
		n = function() {
			t.menu()
		};
	t.plusReady(function() {
		t.options.keyEventBind.backbutton && plus.key.addEventListener("backbutton", i, !1), t.options.keyEventBind.menubutton && plus.key.addEventListener("menubutton", n, !1)
	}), t.addInit({
		name: "keyEventBind",
		index: 1e3,
		handle: function() {
			t.plusReady(function() {
				t.options.keyEventBind.backbutton || plus.key.removeEventListener("backbutton", i), t.options.keyEventBind.menubutton || plus.key.removeEventListener("menubutton", n)
			})
		}
	})
}(mui, window), function(t) {
	t.addInit({
		name: "pullrefresh",
		index: 1e3,
		handle: function() {
			var e = t.options,
				i = e.pullRefresh || {},
				n = i.down && i.down.hasOwnProperty("callback"),
				s = i.up && i.up.hasOwnProperty("callback");
			if (n || s) {
				var o = i.container;
				if (o) {
					var a = t(o);
					1 === a.length && (t.os.plus && t.os.android ? t.plusReady(function() {
						var e = plus.webview.currentWebview();
						if (s) {
							var o = {};
							o.up = i.up, o.webviewId = e.id || e.getURL(), a.pullRefresh(o)
						}
						if (n) {
							var r = e.parent(),
								l = e.id || e.getURL();
							if (r) {
								s || a.pullRefresh({
									webviewId: l
								});
								var c = {
									webviewId: l
								};
								c.down = t.extend({}, i.down), c.down.callback = "_CALLBACK", r.evalJS("mui&&mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify(c) + "')")
							}
						}
					}) : a.pullRefresh(i))
				}
			}
		}
	})
}(mui), function(t, e, i) {
	var n = "application/json",
		s = "text/html",
		o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		a = /^(?:text|application)\/javascript/i,
		r = /^(?:text|application)\/xml/i,
		l = /^\s*$/;
	t.ajaxSettings = {
		type: "GET",
		beforeSend: t.noop,
		success: t.noop,
		error: t.noop,
		complete: t.noop,
		context: null,
		xhr: function(t) {
			return new e.XMLHttpRequest
		},
		accepts: {
			script: "text/javascript, application/javascript, application/x-javascript",
			json: n,
			xml: "application/xml, text/xml",
			html: s,
			text: "text/plain"
		},
		timeout: 0,
		processData: !0,
		cache: !0
	};
	var c = function(t, e) {
			var i = e.context;
			return e.beforeSend.call(i, t, e) !== !1 && void 0
		},
		u = function(t, e, i) {
			i.success.call(i.context, t, "success", e), d("success", e, i)
		},
		h = function(t, e, i, n) {
			n.error.call(n.context, i, e, t), d(e, i, n)
		},
		d = function(t, e, i) {
			i.complete.call(i.context, e, t)
		},
		p = function(e, i, n, s) {
			var o, a = t.isArray(i),
				r = t.isPlainObject(i);
			t.each(i, function(i, l) {
				o = t.type(l), s && (i = n ? s : s + "[" + (r || "object" === o || "array" === o ? i : "") + "]"), !s && a ? e.add(l.name, l.value) : "array" === o || !n && "object" === o ? p(e, l, n, i) : e.add(i, l)
			})
		},
		f = function(e) {
			if (e.processData && e.data && "string" != typeof e.data) {
				var s = e.contentType;
				!s && e.headers && (s = e.headers["Content-Type"]), s && ~s.indexOf(n) ? e.data = JSON.stringify(e.data) : e.data = t.param(e.data, e.traditional)
			}!e.data || e.type && "GET" !== e.type.toUpperCase() || (e.url = m(e.url, e.data), e.data = i)
		},
		m = function(t, e) {
			return "" === e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
		},
		g = function(t) {
			return t && (t = t.split(";", 2)[0]), t && (t === s ? "html" : t === n ? "json" : a.test(t) ? "script" : r.test(t) && "xml") || "text"
		},
		v = function(e, n, s, o) {
			return t.isFunction(n) && (o = s, s = n, n = i), t.isFunction(s) || (o = s, s = i), {
				url: e,
				data: n,
				success: s,
				dataType: o
			}
		};
	t.ajax = function(n, s) {
		"object" == typeof n && (s = n, n = i);
		var o = s || {};
		o.url = n || o.url;
		for (var a in t.ajaxSettings) o[a] === i && (o[a] = t.ajaxSettings[a]);
		f(o);
		var r = o.dataType;
		o.cache !== !1 && (s && s.cache === !0 || "script" !== r) || (o.url = m(o.url, "_=" + t.now()));
		var d, p = o.accepts[r && r.toLowerCase()],
			v = {},
			y = function(t, e) {
				v[t.toLowerCase()] = [t, e]
			},
			w = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : e.location.protocol,
			b = o.xhr(o),
			T = b.setRequestHeader;
		if (y("X-Requested-With", "XMLHttpRequest"), y("Accept", p || "*/*"), (p = o.mimeType || p) && (p.indexOf(",") > -1 && (p = p.split(",", 2)[0]), b.overrideMimeType && b.overrideMimeType(p)), (o.contentType || o.contentType !== !1 && o.data && "GET" !== o.type.toUpperCase()) && y("Content-Type", o.contentType || "application/x-www-form-urlencoded"), o.headers) for (var L in o.headers) y(L, o.headers[L]);
		if (b.setRequestHeader = y, b.onreadystatechange = function() {
			if (4 === b.readyState) {
				b.onreadystatechange = t.noop, clearTimeout(d);
				var e, i = !1,
					n = "file:" === w;
				if (b.status >= 200 && b.status < 300 || 304 === b.status || 0 === b.status && n && b.responseText) {
					r = r || g(o.mimeType || b.getResponseHeader("content-type")), e = b.responseText;
					try {
						"script" === r ? (0, eval)(e) : "xml" === r ? e = b.responseXML : "json" === r && (e = l.test(e) ? null : t.parseJSON(e))
					} catch (t) {
						i = t
					}
					i ? h(i, "parsererror", b, o) : u(e, b, o)
				} else {
					var s = b.status ? "error" : "abort",
						a = b.statusText || null;
					n && (s = "error", a = "404"), h(a, s, b, o)
				}
			}
		}, c(b, o) === !1) return b.abort(), h(null, "abort", b, o), b;
		if (o.xhrFields) for (var L in o.xhrFields) b[L] = o.xhrFields[L];
		var E = !("async" in o) || o.async;
		b.open(o.type.toUpperCase(), o.url, E, o.username, o.password);
		for (var L in v) v.hasOwnProperty(L) && T.apply(b, v[L]);
		return o.timeout > 0 && (d = setTimeout(function() {
			b.onreadystatechange = t.noop, b.abort(), h(null, "timeout", b, o)
		}, o.timeout)), b.send(o.data ? o.data : null), b
	}, t.param = function(t, e) {
		var i = [];
		return i.add = function(t, e) {
			this.push(encodeURIComponent(t) + "=" + encodeURIComponent(e))
		}, p(i, t, e), i.join("&").replace(/%20/g, "+")
	}, t.get = function() {
		return t.ajax(v.apply(null, arguments))
	}, t.post = function() {
		var e = v.apply(null, arguments);
		return e.type = "POST", t.ajax(e)
	}, t.getJSON = function() {
		var e = v.apply(null, arguments);
		return e.dataType = "json", t.ajax(e)
	}, t.fn.load = function(e, i, n) {
		if (!this.length) return this;
		var s, a = this,
			r = e.split(/\s/),
			l = v(e, i, n),
			c = l.success;
		return r.length > 1 && (l.url = r[0], s = r[1]), l.success = function(t) {
			if (s) {
				var e = document.createElement("div");
				e.innerHTML = t.replace(o, "");
				var i = document.createElement("div"),
					n = e.querySelectorAll(s);
				if (n && n.length > 0) for (var r = 0, l = n.length; l > r; r++) i.appendChild(n[r]);
				a[0].innerHTML = i.innerHTML
			} else a[0].innerHTML = t;
			c && c.apply(a, arguments)
		}, t.ajax(l), this
	}
}(mui, window), function(t) {
	var e = document.createElement("a");
	e.href = window.location.href, t.plusReady(function() {
		t.ajaxSettings = t.extend(t.ajaxSettings, {
			xhr: function(t) {
				if (t.crossDomain) return new plus.net.XMLHttpRequest;
				if ("file:" !== e.protocol) {
					var i = document.createElement("a");
					if (i.href = t.url, i.href = i.href, t.crossDomain = e.protocol + "//" + e.host != i.protocol + "//" + i.host, t.crossDomain) return new plus.net.XMLHttpRequest
				}
				return new window.XMLHttpRequest
			}
		})
	})
}(mui), function(t, e, i) {
	t.offset = function(t) {
		var n = {
			top: 0,
			left: 0
		};
		return typeof t.getBoundingClientRect !== i && (n = t.getBoundingClientRect()), {
			top: n.top + e.pageYOffset - t.clientTop,
			left: n.left + e.pageXOffset - t.clientLeft
		}
	}
}(mui, window), function(t, e) {
	t.scrollTo = function(t, i, n) {
		i = i || 1e3;
		var s = function(i) {
				if (0 >= i) return e.scrollTo(0, t), void(n && n());
				var o = t - e.scrollY;
				setTimeout(function() {
					e.scrollTo(0, e.scrollY + o / i * 10), s(i - 10)
				}, 16.7)
			};
		s(i)
	}, t.animationFrame = function(t) {
		var e, i, n;
		return function() {
			e = arguments, n = this, i || (i = !0, requestAnimationFrame(function() {
				t.apply(n, e), i = !1
			}))
		}
	}
}(mui, window), function(t) {
	var e = !1,
		i = /xyz/.test(function() {
			xyz
		}) ? /\b_super\b/ : /.*/,
		n = function() {};
	n.extend = function(t) {
		function n() {
			!e && this.init && this.init.apply(this, arguments)
		}
		var s = this.prototype;
		e = !0;
		var o = new this;
		e = !1;
		for (var a in t) o[a] = "function" == typeof t[a] && "function" == typeof s[a] && i.test(t[a]) ?
		function(t, e) {
			return function() {
				var i = this._super;
				this._super = s[t];
				var n = e.apply(this, arguments);
				return this._super = i, n
			}
		}(a, t[a]) : t[a];
		return n.prototype = o, n.prototype.constructor = n, n.extend = arguments.callee, n
	}, t.Class = n
}(mui), function(t, e, i) {
	var n = "mui-pull-top-pocket",
		s = "mui-pull-bottom-pocket",
		o = "mui-pull",
		a = "mui-pull-loading",
		r = "mui-pull-caption",
		l = "mui-pull-caption-down",
		c = "mui-pull-caption-refresh",
		u = "mui-pull-caption-nomore",
		h = "mui-icon",
		d = "mui-spinner",
		p = "mui-icon-pulldown",
		f = "mui-block",
		m = "mui-hidden",
		g = "mui-visibility",
		v = a + " " + h + " " + p,
		y = a + " " + h + " " + p,
		w = a + " " + h + " " + d,
		b = ['<div class="' + o + '">', '<div class="{icon}"></div>', '<div class="' + r + '">{contentrefresh}</div>', "</div>"].join(""),
		T = {
			init: function(e, i) {
				this._super(e, t.extend(!0, {
					scrollY: !0,
					scrollX: !1,
					indicators: !0,
					deceleration: .003,
					down: {
						height: 50,
						contentinit: "下拉可以刷新",
						contentdown: "下拉可以刷新",
						contentover: "释放立即刷新",
						contentrefresh: "正在刷新..."
					},
					up: {
						height: 50,
						auto: !1,
						contentinit: "上拉显示更多",
						contentdown: "上拉显示更多",
						contentrefresh: "正在加载...",
						contentnomore: "没有更多数据了",
						duration: 300
					}
				}, i))
			},
			_init: function() {
				this._super(), this._initPocket()
			},
			_initPulldownRefresh: function() {
				this.pulldown = !0, this.pullPocket = this.topPocket, this.pullPocket.classList.add(f), this.pullPocket.classList.add(g), this.pullCaption = this.topCaption, this.pullLoading = this.topLoading
			},
			_initPullupRefresh: function() {
				this.pulldown = !1, this.pullPocket = this.bottomPocket, this.pullPocket.classList.add(f), this.pullPocket.classList.add(g), this.pullCaption = this.bottomCaption, this.pullLoading = this.bottomLoading
			},
			_initPocket: function() {
				var t = this.options;
				t.down && t.down.hasOwnProperty("callback") && (this.topPocket = this.scroller.querySelector("." + n), this.topPocket || (this.topPocket = this._createPocket(n, t.down, y), this.wrapper.insertBefore(this.topPocket, this.wrapper.firstChild)), this.topLoading = this.topPocket.querySelector("." + a), this.topCaption = this.topPocket.querySelector("." + r)), t.up && t.up.hasOwnProperty("callback") && (this.bottomPocket = this.scroller.querySelector("." + s), this.bottomPocket || (this.bottomPocket = this._createPocket(s, t.up, w), this.scroller.appendChild(this.bottomPocket)), this.bottomLoading = this.bottomPocket.querySelector("." + a), this.bottomCaption = this.bottomPocket.querySelector("." + r), this.wrapper.addEventListener("scrollbottom", this))
			},
			_createPocket: function(t, i, n) {
				var s = e.createElement("div");
				return s.className = t, s.innerHTML = b.replace("{contentrefresh}", i.contentinit).replace("{icon}", n), s
			},
			_resetPullDownLoading: function() {
				var t = this.pullLoading;
				t && (this.pullCaption.innerHTML = this.options.down.contentdown, t.style.webkitTransition = "", t.style.webkitTransform = "", t.style.webkitAnimation = "", t.className = y)
			},
			_setCaptionClass: function(t, e, i) {
				if (!t) switch (i) {
				case this.options.up.contentdown:
					e.className = r + " " + l;
					break;
				case this.options.up.contentrefresh:
					e.className = r + " " + c;
					break;
				case this.options.up.contentnomore:
					e.className = r + " " + u
				}
			},
			_setCaption: function(t, e) {
				if (!this.loading) {
					var i = this.options,
						n = this.pullPocket,
						s = this.pullCaption,
						o = this.pullLoading,
						a = this.pulldown,
						r = this;
					n && (e ? setTimeout(function() {
						s.innerHTML = r.lastTitle = t, a ? o.className = y : (r._setCaptionClass(!1, s, t), o.className = w), o.style.webkitAnimation = "", o.style.webkitTransition = "", o.style.webkitTransform = ""
					}, 100) : t !== this.lastTitle && (s.innerHTML = t, a ? t === i.down.contentrefresh ? (o.className = w, o.style.webkitAnimation = "spinner-spin 1s step-end infinite") : t === i.down.contentover ? (o.className = v, o.style.webkitTransition = "-webkit-transform 0.3s ease-in", o.style.webkitTransform = "rotate(180deg)") : t === i.down.contentdown && (o.className = y, o.style.webkitTransition = "-webkit-transform 0.3s ease-in", o.style.webkitTransform = "rotate(0deg)") : (t === i.up.contentrefresh ? o.className = w + " " + g : o.className = w + " " + m, r._setCaptionClass(!1, s, t)), this.lastTitle = t))
				}
			}
		};
	t.PullRefresh = T
}(mui, document), function(t, e, i, n) {
	var s = "mui-scroll",
		o = "mui-scrollbar",
		a = "mui-scrollbar-indicator",
		r = o + "-vertical",
		l = o + "-horizontal",
		c = "mui-active",
		u = {
			quadratic: {
				style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
				fn: function(t) {
					return t * (2 - t)
				}
			},
			circular: {
				style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
				fn: function(t) {
					return Math.sqrt(1 - --t * t)
				}
			},
			outCirc: {
				style: "cubic-bezier(0.075, 0.82, 0.165, 1)"
			},
			outCubic: {
				style: "cubic-bezier(0.165, 0.84, 0.44, 1)"
			}
		},
		h = t.Class.extend({
			init: function(e, i) {
				this.wrapper = this.element = e, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller && this.scroller.style, this.stopped = !1, this.options = t.extend(!0, {
					scrollY: !0,
					scrollX: !1,
					startX: 0,
					startY: 0,
					indicators: !0,
					stopPropagation: !1,
					hardwareAccelerated: !0,
					fixedBadAndorid: !1,
					preventDefaultException: {
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/
					},
					momentum: !0,
					snapX: .5,
					snap: !1,
					bounce: !0,
					bounceTime: 500,
					bounceEasing: u.outCirc,
					scrollTime: 500,
					scrollEasing: u.outCubic,
					directionLockThreshold: 5,
					parallaxElement: !1,
					parallaxRatio: .5
				}, i), this.x = 0, this.y = 0, this.translateZ = this.options.hardwareAccelerated ? " translateZ(0)" : "", this._init(), this.scroller && (this.refresh(), this.scrollTo(this.options.startX, this.options.startY))
			},
			_init: function() {
				this._initParallax(), this._initIndicators(), this._initEvent()
			},
			_initParallax: function() {
				this.options.parallaxElement && (this.parallaxElement = i.querySelector(this.options.parallaxElement), this.parallaxStyle = this.parallaxElement.style, this.parallaxHeight = this.parallaxElement.offsetHeight, this.parallaxImgStyle = this.parallaxElement.querySelector("img").style)
			},
			_initIndicators: function() {
				var t = this;
				if (t.indicators = [], this.options.indicators) {
					var e, i = [];
					t.options.scrollY && (e = {
						el: this._createScrollBar(r),
						listenX: !1
					}, this.wrapper.appendChild(e.el), i.push(e)), this.options.scrollX && (e = {
						el: this._createScrollBar(l),
						listenY: !1
					}, this.wrapper.appendChild(e.el), i.push(e));
					for (var n = i.length; n--;) this.indicators.push(new d(this, i[n]))
				}
			},
			_initSnap: function() {
				this.currentPage = {}, this.pages = [];
				for (var t = this.snaps, e = t.length, i = 0, n = -1, s = 0, o = 0, a = 0, r = 0, l = 0; e > l; l++) {
					var u = t[l],
						h = u.offsetLeft,
						d = u.offsetWidth;
					(0 === l || h <= t[l - 1].offsetLeft) && (i = 0, n++), this.pages[i] || (this.pages[i] = []), s = this._getSnapX(h), r = Math.round(d * this.options.snapX), o = s - r, a = s - d + r, this.pages[i][n] = {
						x: s,
						leftX: o,
						rightX: a,
						pageX: i,
						element: u
					}, u.classList.contains(c) && (this.currentPage = this.pages[i][0]), s >= this.maxScrollX && i++
				}
				this.options.startX = this.currentPage.x || 0
			},
			_getSnapX: function(t) {
				return Math.max(Math.min(0, -t + this.wrapperWidth / 2), this.maxScrollX)
			},
			_gotoPage: function(t) {
				this.currentPage = this.pages[Math.min(t, this.pages.length - 1)][0];
				for (var e = 0, i = this.snaps.length; i > e; e++) e === t ? this.snaps[e].classList.add(c) : this.snaps[e].classList.remove(c);
				this.scrollTo(this.currentPage.x, 0, this.options.scrollTime)
			},
			_nearestSnap: function(t) {
				if (!this.pages.length) return {
					x: 0,
					pageX: 0
				};
				var e = 0,
					i = this.pages.length;
				for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX); i > e; e++) {
					var n = "left" === this.direction ? this.pages[e][0].leftX : this.pages[e][0].rightX;
					if (t >= n) return this.pages[e][0]
				}
				return {
					x: 0,
					pageX: 0
				}
			},
			_initEvent: function(i) {
				var n = i ? "removeEventListener" : "addEventListener";
				e[n]("orientationchange", this), e[n]("resize", this), this.scroller[n]("webkitTransitionEnd", this), this.wrapper[n](t.EVENT_START, this), this.wrapper[n](t.EVENT_CANCEL, this), this.wrapper[n](t.EVENT_END, this), this.wrapper[n]("drag", this), this.wrapper[n]("dragend", this), this.wrapper[n]("flick", this), this.wrapper[n]("scrollend", this), this.options.scrollX && this.wrapper[n]("swiperight", this);
				var s = this.wrapper.querySelector(".mui-segmented-control");
				s && mui(s)[i ? "off" : "on"]("click", "a", t.preventDefault), this.wrapper[n]("scrollstart", this), this.wrapper[n]("refresh", this)
			},
			_handleIndicatorScrollend: function() {
				this.indicators.map(function(t) {
					t.fade()
				})
			},
			_handleIndicatorScrollstart: function() {
				this.indicators.map(function(t) {
					t.fade(1)
				})
			},
			_handleIndicatorRefresh: function() {
				this.indicators.map(function(t) {
					t.refresh()
				})
			},
			handleEvent: function(e) {
				if (this.stopped) return void this.resetPosition();
				switch (e.type) {
				case t.EVENT_START:
					this._start(e);
					break;
				case "drag":
					this.options.stopPropagation && e.stopPropagation(), this._drag(e);
					break;
				case "dragend":
				case "flick":
					this.options.stopPropagation && e.stopPropagation(), this._flick(e);
					break;
				case t.EVENT_CANCEL:
				case t.EVENT_END:
					this._end(e);
					break;
				case "webkitTransitionEnd":
					this.transitionTimer && this.transitionTimer.cancel(), this._transitionEnd(e);
					break;
				case "scrollstart":
					this._handleIndicatorScrollstart(e);
					break;
				case "scrollend":
					this._handleIndicatorScrollend(e), this._scrollend(e), e.stopPropagation();
					break;
				case "orientationchange":
				case "resize":
					this._resize();
					break;
				case "swiperight":
					e.stopPropagation();
					break;
				case "refresh":
					this._handleIndicatorRefresh(e)
				}
			},
			_start: function(e) {
				if (this.moved = this.needReset = !1, this._transitionTime(), this.isInTransition) {
					this.needReset = !0, this.isInTransition = !1;
					var i = t.parseTranslateMatrix(t.getStyles(this.scroller, "webkitTransform"));
					this.setTranslate(Math.round(i.x), Math.round(i.y)), t.trigger(this.scroller, "scrollend", this), e.preventDefault()
				}
				this.reLayout(), t.trigger(this.scroller, "beforescrollstart", this)
			},
			_getDirectionByAngle: function(t) {
				return -80 > t && t > -100 ? "up" : t >= 80 && 100 > t ? "down" : t >= 170 || -170 >= t ? "left" : t >= -35 && 10 >= t ? "right" : null
			},
			_drag: function(i) {
				var n = i.detail;
				if ((this.options.scrollY || "up" === n.direction || "down" === n.direction) && t.os.ios && parseFloat(t.os.version) >= 8) {
					var s = n.gesture.touches[0].clientY;
					if (s + 10 > e.innerHeight || 10 > s) return void this.resetPosition(this.options.bounceTime)
				}
				var o = isReturn = !1;
				if (this._getDirectionByAngle(n.angle), "left" === n.direction || "right" === n.direction ? this.options.scrollX ? (o = !0, this.moved || (t.gestures.session.lockDirection = !0, t.gestures.session.startDirection = n.direction)) : this.options.scrollY && !this.moved && (isReturn = !0) : "up" === n.direction || "down" === n.direction ? this.options.scrollY ? (o = !0, this.moved || (t.gestures.session.lockDirection = !0, t.gestures.session.startDirection = n.direction)) : this.options.scrollX && !this.moved && (isReturn = !0) : isReturn = !0, (this.moved || o) && (i.stopPropagation(), n.gesture && n.gesture.preventDefault()), !isReturn) {
					this.moved ? i.stopPropagation() : t.trigger(this.scroller, "scrollstart", this);
					var a = 0,
						r = 0;
					this.moved ? (a = n.deltaX - t.gestures.session.prevTouch.deltaX, r = n.deltaY - t.gestures.session.prevTouch.deltaY) : (a = n.deltaX, r = n.deltaY);
					var l = Math.abs(n.deltaX),
						c = Math.abs(n.deltaY);
					l > c + this.options.directionLockThreshold ? r = 0 : c >= l + this.options.directionLockThreshold && (a = 0), a = this.hasHorizontalScroll ? a : 0, r = this.hasVerticalScroll ? r : 0;
					var u = this.x + a,
						h = this.y + r;
					(u > 0 || u < this.maxScrollX) && (u = this.options.bounce ? this.x + a / 3 : u > 0 ? 0 : this.maxScrollX), (h > 0 || h < this.maxScrollY) && (h = this.options.bounce ? this.y + r / 3 : h > 0 ? 0 : this.maxScrollY), this.requestAnimationFrame || this._updateTranslate(), this.direction = n.deltaX > 0 ? "right" : "left", this.moved = !0, this.x = u, this.y = h, t.trigger(this.scroller, "scroll", this)
				}
			},
			_flick: function(e) {
				if (this.moved) {
					e.stopPropagation();
					var i = e.detail;
					if (this._clearRequestAnimationFrame(), "dragend" !== e.type || !i.flick) {
						var n = Math.round(this.x),
							s = Math.round(this.y);
						if (this.isInTransition = !1, !this.resetPosition(this.options.bounceTime)) {
							if (this.scrollTo(n, s), "dragend" === e.type) return void t.trigger(this.scroller, "scrollend", this);
							var o = 0,
								a = "";
							return this.options.momentum && i.flickTime < 300 && (momentumX = this.hasHorizontalScroll ? this._momentum(this.x, i.flickDistanceX, i.flickTime, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
								destination: n,
								duration: 0
							}, momentumY = this.hasVerticalScroll ? this._momentum(this.y, i.flickDistanceY, i.flickTime, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
								destination: s,
								duration: 0
							}, n = momentumX.destination, s = momentumY.destination, o = Math.max(momentumX.duration, momentumY.duration), this.isInTransition = !0), n != this.x || s != this.y ? ((n > 0 || n < this.maxScrollX || s > 0 || s < this.maxScrollY) && (a = u.quadratic), void this.scrollTo(n, s, o, a)) : void t.trigger(this.scroller, "scrollend", this)
						}
					}
				}
			},
			_end: function(e) {
				this.needReset = !1, (!this.moved && this.needReset || e.type === t.EVENT_CANCEL) && this.resetPosition()
			},
			_transitionEnd: function(e) {
				e.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, t.trigger(this.scroller, "scrollend", this)))
			},
			_scrollend: function(e) {
				(0 === this.y && 0 === this.maxScrollY || Math.abs(this.y) > 0 && this.y <= this.maxScrollY) && t.trigger(this.scroller, "scrollbottom", this)
			},
			_resize: function() {
				var t = this;
				clearTimeout(t.resizeTimeout), t.resizeTimeout = setTimeout(function() {
					t.refresh()
				}, t.options.resizePolling)
			},
			_transitionTime: function(e) {
				if (e = e || 0, this.scrollerStyle.webkitTransitionDuration = e + "ms", this.parallaxElement && this.options.scrollY && (this.parallaxStyle.webkitTransitionDuration = e + "ms"), this.options.fixedBadAndorid && !e && t.os.isBadAndroid && (this.scrollerStyle.webkitTransitionDuration = "0.001s", this.parallaxElement && this.options.scrollY && (this.parallaxStyle.webkitTransitionDuration = "0.001s")), this.indicators) for (var i = this.indicators.length; i--;) this.indicators[i].transitionTime(e);
				e && (this.transitionTimer && this.transitionTimer.cancel(), this.transitionTimer = t.later(function() {
					t.trigger(this.scroller, "webkitTransitionEnd")
				}, e + 100, this))
			},
			_transitionTimingFunction: function(t) {
				if (this.scrollerStyle.webkitTransitionTimingFunction = t, this.parallaxElement && this.options.scrollY && (this.parallaxStyle.webkitTransitionDuration = t), this.indicators) for (var e = this.indicators.length; e--;) this.indicators[e].transitionTimingFunction(t)
			},
			_translate: function(t, e) {
				this.x = t, this.y = e
			},
			_clearRequestAnimationFrame: function() {
				this.requestAnimationFrame && (cancelAnimationFrame(this.requestAnimationFrame), this.requestAnimationFrame = null)
			},
			_updateTranslate: function() {
				var t = this;
				(t.x !== t.lastX || t.y !== t.lastY) && t.setTranslate(t.x, t.y), t.requestAnimationFrame = requestAnimationFrame(function() {
					t._updateTranslate()
				})
			},
			_createScrollBar: function(t) {
				var e = i.createElement("div"),
					n = i.createElement("div");
				return e.className = o + " " + t, n.className = a, e.appendChild(n), t === r ? (this.scrollbarY = e, this.scrollbarIndicatorY = n) : t === l && (this.scrollbarX = e, this.scrollbarIndicatorX = n), this.wrapper.appendChild(e), e
			},
			_preventDefaultException: function(t, e) {
				for (var i in e) if (e[i].test(t[i])) return !0;
				return !1
			},
			_reLayout: function() {
				if (this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.indicators.map(function(t) {
					t.refresh()
				}), this.options.snap && "string" == typeof this.options.snap) {
					var t = this.scroller.querySelectorAll(this.options.snap);
					this.itemLength = 0, this.snaps = [];
					for (var e = 0, i = t.length; i > e; e++) {
						var n = t[e];
						n.parentNode === this.scroller && (this.itemLength++, this.snaps.push(n))
					}
					this._initSnap()
				}
			},
			_momentum: function(t, e, i, s, o, a) {
				var r, l, c = parseFloat(Math.abs(e) / i);
				return a = a === n ? 6e-4 : a, r = t + c * c / (2 * a) * (0 > e ? -1 : 1), l = c / a, s > r ? (r = o ? s - o / 2.5 * (c / 8) : s, e = Math.abs(r - t), l = e / c) : r > 0 && (r = o ? o / 2.5 * (c / 8) : 0, e = Math.abs(t) + r, l = e / c), {
					destination: Math.round(r),
					duration: l
				}
			},
			_getTranslateStr: function(t, e) {
				return this.options.hardwareAccelerated ? "translate3d(" + t + "px," + e + "px,0px) " + this.translateZ : "translate(" + t + "px," + e + "px) "
			},
			setStopped: function(t) {
				this.stopped = !! t
			},
			setTranslate: function(e, i) {
				if (this.x = e, this.y = i, this.scrollerStyle.webkitTransform = this._getTranslateStr(e, i), this.parallaxElement && this.options.scrollY) {
					var n = i * this.options.parallaxRatio,
						s = 1 + n / ((this.parallaxHeight - n) / 2);
					s > 1 ? (this.parallaxImgStyle.opacity = 1 - n / 100 * this.options.parallaxRatio, this.parallaxStyle.webkitTransform = this._getTranslateStr(0, -n) + " scale(" + s + "," + s + ")") : (this.parallaxImgStyle.opacity = 1, this.parallaxStyle.webkitTransform = this._getTranslateStr(0, -1) + " scale(1,1)")
				}
				if (this.indicators) for (var o = this.indicators.length; o--;) this.indicators[o].updatePosition();
				this.lastX = this.x, this.lastY = this.y, t.trigger(this.scroller, "scroll", this)
			},
			reLayout: function() {
				this.wrapper.offsetHeight;
				var e = parseFloat(t.getStyles(this.wrapper, "padding-left")) || 0,
					i = parseFloat(t.getStyles(this.wrapper, "padding-right")) || 0,
					n = parseFloat(t.getStyles(this.wrapper, "padding-top")) || 0,
					s = parseFloat(t.getStyles(this.wrapper, "padding-bottom")) || 0,
					o = this.wrapper.clientWidth,
					a = this.wrapper.clientHeight;
				this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.wrapperWidth = o - e - i, this.wrapperHeight = a - n - s, this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0), this.maxScrollY = Math.min(this.wrapperHeight - this.scrollerHeight, 0), this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this._reLayout()
			},
			resetPosition: function(t) {
				var e = this.x,
					i = this.y;
				return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY), (e != this.x || i != this.y) && (this.scrollTo(e, i, t, this.options.scrollEasing), !0)
			},
			_reInit: function() {
				for (var t = this.wrapper.querySelectorAll("." + s), e = 0, i = t.length; i > e; e++) if (t[e].parentNode === this.wrapper) {
					this.scroller = t[e];
					break
				}
				this.scrollerStyle = this.scroller && this.scroller.style
			},
			refresh: function() {
				this._reInit(), this.reLayout(), t.trigger(this.scroller, "refresh", this), this.resetPosition()
			},
			scrollTo: function(t, e, i, n) {
				var n = n || u.circular;
				this.isInTransition = i > 0, this.isInTransition ? (this._clearRequestAnimationFrame(), this._transitionTimingFunction(n.style), this._transitionTime(i), this.setTranslate(t, e)) : this.setTranslate(t, e)
			},
			scrollToBottom: function(t, e) {
				t = t || this.options.scrollTime, this.scrollTo(0, this.maxScrollY, t, e)
			},
			gotoPage: function(t) {
				this._gotoPage(t)
			},
			destroy: function() {
				this._initEvent(!0), delete t.data[this.wrapper.getAttribute("data-scroll")], this.wrapper.setAttribute("data-scroll", "")
			}
		}),
		d = function(e, n) {
			this.wrapper = "string" == typeof n.el ? i.querySelector(n.el) : n.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = e, this.options = t.extend({
				listenX: !0,
				listenY: !0,
				fade: !1,
				speedRatioX: 0,
				speedRatioY: 0
			}, n), this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.fade && (this.wrapperStyle.webkitTransform = this.scroller.translateZ, this.wrapperStyle.webkitTransitionDuration = this.options.fixedBadAndorid && t.os.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
		};
	d.prototype = {
		handleEvent: function(t) {},
		transitionTime: function(e) {
			e = e || 0, this.indicatorStyle.webkitTransitionDuration = e + "ms", this.scroller.options.fixedBadAndorid && !e && t.os.isBadAndroid && (this.indicatorStyle.webkitTransitionDuration = "0.001s")
		},
		transitionTimingFunction: function(t) {
			this.indicatorStyle.webkitTransitionTimingFunction = t
		},
		refresh: function() {
			this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.wrapper.offsetHeight, this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px", this.maxPosX = this.wrapperWidth - this.indicatorWidth, this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX, this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px", this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
		},
		updatePosition: function() {
			var t = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
				e = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
			t < this.minBoundaryX ? (this.width = Math.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px", t = this.minBoundaryX) : t > this.maxBoundaryX ? (this.width = Math.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), e < this.minBoundaryY ? (this.height = Math.max(this.indicatorHeight + 3 * e, 8), this.indicatorStyle.height = this.height + "px", e = this.minBoundaryY) : e > this.maxBoundaryY ? (this.height = Math.max(this.indicatorHeight - 3 * (e - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", e = this.maxPosY + this.indicatorHeight - this.height) : this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px"), this.x = t, this.y = e, this.indicatorStyle.webkitTransform = this.scroller._getTranslateStr(t, e)
		},
		fade: function(t, e) {
			if (!e || this.visible) {
				clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
				var i = t ? 250 : 500,
					n = t ? 0 : 300;
				t = t ? "1" : "0", this.wrapperStyle.webkitTransitionDuration = i + "ms", this.fadeTimeout = setTimeout(function(t) {
					this.wrapperStyle.opacity = t, this.visible = +t
				}.bind(this, t), n)
			}
		}
	}, t.Scroll = h, t.fn.scroll = function(e) {
		var i = [];
		return this.each(function() {
			var n = null,
				s = this,
				o = s.getAttribute("data-scroll");
			if (o) n = t.data[o];
			else {
				o = ++t.uuid;
				var a = t.extend({}, e);
				s.classList.contains("mui-segmented-control") && (a = t.extend(a, {
					scrollY: !1,
					scrollX: !0,
					indicators: !1,
					snap: ".mui-control-item"
				})), t.data[o] = n = new h(s, a), s.setAttribute("data-scroll", o)
			}
			i.push(n)
		}), 1 === i.length ? i[0] : i
	}
}(mui, window, document), function(t, e, i, n) {
	var s = "mui-visibility",
		o = "mui-hidden",
		a = t.Scroll.extend(t.extend({
			handleEvent: function(t) {
				this._super(t), "scrollbottom" === t.type && t.target === this.scroller && this._scrollbottom()
			},
			_scrollbottom: function() {
				this.pulldown || this.loading || (this.pulldown = !1, this._initPullupRefresh(), this.pullupLoading())
			},
			_start: function(t) {
				t.touches && t.touches.length && t.touches[0].clientX > 30 && t.target && !this._preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault(), this.loading || (this.pulldown = this.pullPocket = this.pullCaption = this.pullLoading = !1), this._super(t)
			},
			_drag: function(t) {
				this._super(t), !this.pulldown && !this.loading && this.topPocket && "down" === t.detail.direction && this.y >= 0 && this._initPulldownRefresh(), this.pulldown && this._setCaption(this.y > this.options.down.height ? this.options.down.contentover : this.options.down.contentdown)
			},
			_reLayout: function() {
				this.hasVerticalScroll = !0, this._super()
			},
			resetPosition: function(t) {
				if (this.pulldown) {
					if (this.y >= this.options.down.height) return this.pulldownLoading(n, t || 0), !0;
					!this.loading && this.topPocket.classList.remove(s)
				}
				return this._super(t)
			},
			pulldownLoading: function(t, e) {
				if ("undefined" == typeof t && (t = this.options.down.height), this.scrollTo(0, t, e, this.options.bounceEasing), !this.loading) {
					this._initPulldownRefresh(), this._setCaption(this.options.down.contentrefresh), this.loading = !0, this.indicators.map(function(t) {
						t.fade(0)
					});
					var i = this.options.down.callback;
					i && i.call(this)
				}
			},
			endPulldownToRefresh: function() {
				var t = this;
				t.topPocket && t.loading && this.pulldown && (t.scrollTo(0, 0, t.options.bounceTime, t.options.bounceEasing), t.loading = !1, t._setCaption(t.options.down.contentdown, !0), setTimeout(function() {
					t.loading || t.topPocket.classList.remove(s)
				}, 350))
			},
			pullupLoading: function(t, e, i) {
				e = e || 0, this.scrollTo(e, this.maxScrollY, i, this.options.bounceEasing), this.loading || (this._initPullupRefresh(), this._setCaption(this.options.up.contentrefresh), this.indicators.map(function(t) {
					t.fade(0)
				}), this.loading = !0, t = t || this.options.up.callback, t && t.call(this))
			},
			endPullupToRefresh: function(t) {
				var e = this;
				e.bottomPocket && (e.loading = !1, t ? (this.finished = !0, e._setCaption(e.options.up.contentnomore), e.wrapper.removeEventListener("scrollbottom", e)) : (e._setCaption(e.options.up.contentdown), e.loading || e.bottomPocket.classList.remove(s)))
			},
			disablePullupToRefresh: function() {
				this._initPullupRefresh(), this.bottomPocket.className = "mui-pull-bottom-pocket " + o, this.wrapper.removeEventListener("scrollbottom", this)
			},
			enablePullupToRefresh: function() {
				this._initPullupRefresh(), this.bottomPocket.classList.remove(o), this._setCaption(this.options.up.contentdown), this.wrapper.addEventListener("scrollbottom", this)
			},
			refresh: function(t) {
				t && this.finished && (this.enablePullupToRefresh(), this.finished = !1), this._super()
			}
		}, t.PullRefresh));
	t.fn.pullRefresh = function(e) {
		if (1 === this.length) {
			var i = this[0],
				n = null;
			e = e || {};
			var s = i.getAttribute("data-pullrefresh");
			return s ? n = t.data[s] : (s = ++t.uuid, t.data[s] = n = new a(i, e), i.setAttribute("data-pullrefresh", s)), e.down && e.down.auto ? n.pulldownLoading(e.down.autoY) : e.up && e.up.auto && n.pullupLoading(), n
		}
	}
}(mui, window, document), function(t, e) {
	var i = "mui-slider",
		n = "mui-slider-group",
		s = "mui-slider-loop",
		o = "mui-action-previous",
		a = "mui-action-next",
		r = "mui-slider-item",
		l = "mui-active",
		c = "." + r,
		u = ".mui-slider-progress-bar",
		h = t.Slider = t.Scroll.extend({
			init: function(e, i) {
				this._super(e, t.extend(!0, {
					fingers: 1,
					interval: 0,
					scrollY: !1,
					scrollX: !0,
					indicators: !1,
					scrollTime: 1e3,
					startX: !1,
					slideTime: 0,
					snap: c
				}, i)), this.options.startX
			},
			_init: function() {
				this._reInit(), this.scroller && (this.scrollerStyle = this.scroller.style, this.progressBar = this.wrapper.querySelector(u), this.progressBar && (this.progressBarWidth = this.progressBar.offsetWidth, this.progressBarStyle = this.progressBar.style), this._super(), this._initTimer())
			},
			_triggerSlide: function() {
				var e = this;
				e.isInTransition = !1, e.currentPage, e.slideNumber = e._fixedSlideNumber(), e.loop && (0 === e.slideNumber ? e.setTranslate(e.pages[1][0].x, 0) : e.slideNumber === e.itemLength - 3 && e.setTranslate(e.pages[e.itemLength - 2][0].x, 0)), e.lastSlideNumber != e.slideNumber && (e.lastSlideNumber = e.slideNumber, e.lastPage = e.currentPage, t.trigger(e.wrapper, "slide", {
					slideNumber: e.slideNumber
				})), e._initTimer()
			},
			_handleSlide: function(e) {
				var i = this;
				if (e.target === i.wrapper) {
					var n = e.detail;
					n.slideNumber = n.slideNumber || 0;
					for (var s = i.scroller.querySelectorAll(c), o = [], a = 0, r = s.length; r > a; a++) {
						var u = s[a];
						u.parentNode === i.scroller && o.push(u)
					}
					var h = n.slideNumber;
					if (i.loop && (h += 1), !i.wrapper.classList.contains("mui-segmented-control")) for (var a = 0, r = o.length; r > a; a++) {
						var u = o[a];
						u.parentNode === i.scroller && (a === h ? u.classList.add(l) : u.classList.remove(l))
					}
					var d = i.wrapper.querySelector(".mui-slider-indicator");
					if (d) {
						d.getAttribute("data-scroll") && t(d).scroll().gotoPage(n.slideNumber);
						var p = d.querySelectorAll(".mui-indicator");
						if (p.length > 0) for (var a = 0, r = p.length; r > a; a++) p[a].classList[a === n.slideNumber ? "add" : "remove"](l);
						else {
							var f = d.querySelector(".mui-number span");
							if (f) f.innerText = n.slideNumber + 1;
							else for (var m = d.querySelectorAll(".mui-control-item"), a = 0, r = m.length; r > a; a++) m[a].classList[a === n.slideNumber ? "add" : "remove"](l)
						}
					}
					e.stopPropagation()
				}
			},
			_handleTabShow: function(t) {
				var e = this;
				e.gotoItem(t.detail.tabNumber || 0, e.options.slideTime)
			},
			_handleIndicatorTap: function(t) {
				var e = this,
					i = t.target;
				(i.classList.contains(o) || i.classList.contains(a)) && (e[i.classList.contains(o) ? "prevItem" : "nextItem"](), t.stopPropagation())
			},
			_initEvent: function(e) {
				var i = this;
				i._super(e);
				var n = e ? "removeEventListener" : "addEventListener";
				i.wrapper[n]("slide", this), i.wrapper[n](t.eventName("shown", "tab"), this)
			},
			handleEvent: function(e) {
				switch (this._super(e), e.type) {
				case "slide":
					this._handleSlide(e);
					break;
				case t.eventName("shown", "tab"):
					~this.snaps.indexOf(e.target) && this._handleTabShow(e)
				}
			},
			_scrollend: function(t) {
				this._super(t), this._triggerSlide(t)
			},
			_drag: function(t) {
				this._super(t);
				var i = t.detail.direction;
				if ("left" === i || "right" === i) {
					var n = this.wrapper.getAttribute("data-slidershowTimer");
					n && e.clearTimeout(n), t.stopPropagation()
				}
			},
			_initTimer: function() {
				var t = this,
					i = t.wrapper,
					n = t.options.interval,
					s = i.getAttribute("data-slidershowTimer");
				s && e.clearTimeout(s), n && (s = e.setTimeout(function() {
					i && ((i.offsetWidth || i.offsetHeight) && t.nextItem(!0), t._initTimer())
				}, n), i.setAttribute("data-slidershowTimer", s))
			},
			_fixedSlideNumber: function(t) {
				t = t || this.currentPage;
				var e = t.pageX;
				return this.loop && (e = 0 === t.pageX ? this.itemLength - 3 : t.pageX === this.itemLength - 1 ? 0 : t.pageX - 1), e
			},
			_reLayout: function() {
				this.hasHorizontalScroll = !0, this.loop = this.scroller.classList.contains(s), this._super()
			},
			_getScroll: function() {
				var e = t.parseTranslateMatrix(t.getStyles(this.scroller, "webkitTransform"));
				return e ? e.x : 0
			},
			_transitionEnd: function(e) {
				e.target === this.scroller && this.isInTransition && (this._transitionTime(), this.isInTransition = !1, t.trigger(this.wrapper, "scrollend", this))
			},
			_flick: function(t) {
				if (this.moved) {
					var e = t.detail,
						i = e.direction;
					this._clearRequestAnimationFrame(), this.isInTransition = !0, "flick" === t.type ? (e.deltaTime < 200 && (this.x = this._getPage(this.slideNumber + ("right" === i ? -1 : 1), !0).x), this.resetPosition(this.options.bounceTime)) : "dragend" !== t.type || e.flick || this.resetPosition(this.options.bounceTime), t.stopPropagation()
				}
			},
			_initSnap: function() {
				if (this.scrollerWidth = this.itemLength * this.scrollerWidth, this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0), this._super(), this.currentPage.x) this.slideNumber = this._fixedSlideNumber(), this.lastSlideNumber = "undefined" == typeof this.lastSlideNumber ? this.slideNumber : this.lastSlideNumber;
				else {
					var t = this.pages[this.loop ? 1 : 0];
					if (t = t || this.pages[0], !t) return;
					this.currentPage = t[0], this.slideNumber = 0, this.lastSlideNumber = "undefined" == typeof this.lastSlideNumber ? 0 : this.lastSlideNumber
				}
				this.options.startX = this.currentPage.x || 0
			},
			_getSnapX: function(t) {
				return Math.max(-t, this.maxScrollX)
			},
			_getPage: function(t, e) {
				return this.loop ? t > this.itemLength - (e ? 2 : 3) ? (t = 1, time = 0) : (e ? -1 : 0) > t ? (t = this.itemLength - 2, time = 0) : t += 1 : (e || (t > this.itemLength - 1 ? (t = 0, time = 0) : 0 > t && (t = this.itemLength - 1, time = 0)), t = Math.min(Math.max(0, t), this.itemLength - 1)), this.pages[t][0]
			},
			_gotoItem: function(e, i) {
				this.currentPage = this._getPage(e, !0), this.scrollTo(this.currentPage.x, 0, i, this.options.scrollEasing), 0 === i && t.trigger(this.wrapper, "scrollend", this)
			},
			setTranslate: function(t, e) {
				this._super(t, e);
				var i = this.progressBar;
				i && (this.progressBarStyle.webkitTransform = this._getTranslateStr(-t * (this.progressBarWidth / this.wrapperWidth), 0))
			},
			resetPosition: function(t) {
				return t = t || 0, this.x > 0 ? this.x = 0 : this.x < this.maxScrollX && (this.x = this.maxScrollX), this.currentPage = this._nearestSnap(this.x), this.scrollTo(this.currentPage.x, 0, t, this.options.scrollEasing), !0
			},
			gotoItem: function(t, e) {
				this._gotoItem(t, "undefined" == typeof e ? this.options.scrollTime : e)
			},
			nextItem: function() {
				this._gotoItem(this.slideNumber + 1, this.options.scrollTime)
			},
			prevItem: function() {
				this._gotoItem(this.slideNumber - 1, this.options.scrollTime)
			},
			getSlideNumber: function() {
				return this.slideNumber || 0
			},
			_reInit: function() {
				for (var t = this.wrapper.querySelectorAll("." + n), e = 0, i = t.length; i > e; e++) if (t[e].parentNode === this.wrapper) {
					this.scroller = t[e];
					break
				}
				this.scrollerStyle = this.scroller && this.scroller.style, this.progressBar && (this.progressBarWidth = this.progressBar.offsetWidth, this.progressBarStyle = this.progressBar.style)
			},
			refresh: function(e) {
				e ? (t.extend(this.options, e), this._super(), this._initTimer()) : this._super()
			},
			destroy: function() {
				this._initEvent(!0), delete t.data[this.wrapper.getAttribute("data-slider")], this.wrapper.setAttribute("data-slider", "")
			}
		});
	t.fn.slider = function(e) {
		var n = null;
		return this.each(function() {
			var s = this;
			if (this.classList.contains(i) || (s = this.querySelector("." + i)), s && s.querySelector(c)) {
				var o = s.getAttribute("data-slider");
				o ? (n = t.data[o], n && e && n.refresh(e)) : (o = ++t.uuid, t.data[o] = n = new h(s, e), s.setAttribute("data-slider", o))
			}
		}), n
	}, t.ready(function() {
		t(".mui-slider").slider(), t(".mui-scroll-wrapper.mui-slider-indicator.mui-segmented-control").scroll({
			scrollY: !1,
			scrollX: !0,
			indicators: !1,
			snap: ".mui-control-item"
		})
	})
}(mui, window), function(t, e) {
	t.os.plus && t.os.android && t.plusReady(function() {
		if (window.__NWin_Enable__ !== !1) {
			var i = "mui-plus-pullrefresh",
				n = "mui-visibility",
				s = "mui-hidden",
				o = "mui-block",
				a = "mui-pull-caption",
				r = "mui-pull-caption-down",
				l = "mui-pull-caption-refresh",
				c = "mui-pull-caption-nomore",
				u = t.Class.extend({
					init: function(t, e) {
						this.element = t, this.options = e, this.wrapper = this.scroller = t, this._init(), this._initPulldownRefreshEvent()
					},
					_init: function() {
						var t = this;
						window.addEventListener("dragup", t), e.addEventListener("plusscrollbottom", t), t.scrollInterval = window.setInterval(function() {
							t.isScroll && !t.loading && window.pageYOffset + window.innerHeight + 10 >= e.documentElement.scrollHeight && (t.isScroll = !1, t.bottomPocket && t.pullupLoading())
						}, 100)
					},
					_initPulldownRefreshEvent: function() {
						var e = this;
						e.topPocket && e.options.webviewId && t.plusReady(function() {
							var t = plus.webview.getWebviewById(e.options.webviewId);
							if (t) {
								e.options.webview = t;
								var i = e.options.down,
									n = i.height;
								t.addEventListener("close", function() {
									var t = e.options.webviewId && e.options.webviewId.replace(/\//g, "_");
									e.element.removeAttribute("data-pullrefresh-plus-" + t)
								}), t.addEventListener("dragBounce", function(n) {
									switch (e.pulldown ? e.pullPocket.classList.add(o) : e._initPulldownRefresh(), n.status) {
									case "beforeChangeOffset":
										e._setCaption(i.contentdown);
										break;
									case "afterChangeOffset":
										e._setCaption(i.contentover);
										break;
									case "dragEndAfterChangeOffset":
										t.evalJS("mui&&mui.options.pullRefresh.down.callback()"), e._setCaption(i.contentrefresh)
									}
								}, !1), t.setBounce({
									position: {
										top: 2 * n + "px"
									},
									changeoffset: {
										top: n + "px"
									}
								})
							}
						})
					},
					handleEvent: function(t) {
						var e = this;
						e.stopped || (e.isScroll = !1, ("dragup" === t.type || "plusscrollbottom" === t.type) && (e.isScroll = !0, setTimeout(function() {
							e.isScroll = !1
						}, 1e3)))
					}
				}).extend(t.extend({
					setStopped: function(t) {
						this.stopped = !! t;
						var e = plus.webview.currentWebview();
						if (this.stopped) e.setStyle({
							bounce: "none"
						}), e.setBounce({
							position: {
								top: "none"
							}
						});
						else {
							var i = this.options.down.height;
							e.setStyle({
								bounce: "vertical"
							}), e.setBounce({
								position: {
									top: 2 * i + "px"
								},
								changeoffset: {
									top: i + "px"
								}
							})
						}
					},
					pulldownLoading: function() {
						t.plusReady(function() {
							plus.webview.currentWebview().setBounce({
								offset: {
									top: this.options.down.height + "px"
								}
							})
						}.bind(this))
					},
					_pulldownLoading: function() {
						var e = this;
						t.plusReady(function() {
							var t = plus.webview.getWebviewById(e.options.webviewId);
							t.setBounce({
								offset: {
									top: e.options.down.height + "px"
								}
							})
						})
					},
					endPulldownToRefresh: function() {
						var t = plus.webview.currentWebview();
						t.parent().evalJS("mui&&mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify({
							webviewId: t.id
						}) + "')._endPulldownToRefresh()")
					},
					_endPulldownToRefresh: function() {
						var t = this;
						t.topPocket && t.options.webview && (t.options.webview.endPullToRefresh(), t.loading = !1, t._setCaption(t.options.down.contentdown, !0), setTimeout(function() {
							t.loading || t.topPocket.classList.remove(o)
						}, 350))
					},
					pullupLoading: function(t) {
						var e = this;
						e.isLoading || (e.isLoading = !0, e.pulldown !== !1 ? e._initPullupRefresh() : this.pullPocket.classList.add(o), setTimeout(function() {
							e.pullLoading.classList.add(n), e.pullLoading.classList.remove(s), e.pullCaption.innerHTML = "", e.pullCaption.className = a + " " + l, e.pullCaption.innerHTML = e.options.up.contentrefresh, t = t || e.options.up.callback, t && t.call(e)
						}, 300))
					},
					endPullupToRefresh: function(t) {
						var i = this;
						i.pullLoading && (i.pullLoading.classList.remove(n), i.pullLoading.classList.add(s), i.isLoading = !1, t ? (i.finished = !0, i.pullCaption.className = a + " " + c, i.pullCaption.innerHTML = i.options.up.contentnomore, e.removeEventListener("plusscrollbottom", i), window.removeEventListener("dragup", i)) : (i.pullCaption.className = a + " " + r, i.pullCaption.innerHTML = i.options.up.contentdown))
					},
					disablePullupToRefresh: function() {
						this._initPullupRefresh(), this.bottomPocket.className = "mui-pull-bottom-pocket " + s, window.removeEventListener("dragup", this)
					},
					enablePullupToRefresh: function() {
						this._initPullupRefresh(), this.bottomPocket.classList.remove(s), this.pullCaption.className = a + " " + r, this.pullCaption.innerHTML = this.options.up.contentdown, e.addEventListener("plusscrollbottom", this), window.addEventListener("dragup", this)
					},
					scrollTo: function(e, i, n) {
						t.scrollTo(i, n)
					},
					scrollToBottom: function(i) {
						t.scrollTo(e.documentElement.scrollHeight, i)
					},
					refresh: function(t) {
						t && this.finished && (this.enablePullupToRefresh(), this.finished = !1)
					}
				}, t.PullRefresh));
			t.fn.pullRefresh = function(n) {
				var s;
				0 === this.length ? (s = e.createElement("div"), s.className = "mui-content", e.body.appendChild(s)) : s = this[0];
				var o = n;
				n = n || {}, "string" == typeof n && (n = t.parseJSON(n)), !n.webviewId && (n.webviewId = plus.webview.currentWebview().id || plus.webview.currentWebview().getURL());
				var a = null,
					r = n.webviewId && n.webviewId.replace(/\//g, "_"),
					l = s.getAttribute("data-pullrefresh-plus-" + r);
				return !(!l && "undefined" == typeof o) && (l ? a = t.data[l] : (l = ++t.uuid, s.setAttribute("data-pullrefresh-plus-" + r, l), e.body.classList.add(i), t.data[l] = a = new u(s, n)), n.down && n.down.auto ? a._pulldownLoading() : n.up && n.up.auto && a.pullupLoading(), a)
			}
		}
	})
}(mui, document), function(t, e, i, n) {
	var s = "mui-off-canvas-left",
		o = "mui-off-canvas-right",
		a = "mui-off-canvas-backdrop",
		r = "mui-off-canvas-wrap",
		l = "mui-slide-in",
		c = "mui-active",
		u = "mui-transitioning",
		h = ".mui-inner-wrap",
		d = t.Class.extend({
			init: function(e, n) {
				this.wrapper = this.element = e, this.scroller = this.wrapper.querySelector(h), this.classList = this.wrapper.classList, this.scroller && (this.options = t.extend(!0, {
					dragThresholdX: 10,
					scale: .8,
					opacity: .1,
					preventDefaultException: {
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/
					}
				}, n), i.body.classList.add("mui-fullscreen"), this.refresh(), this.initEvent())
			},
			_preventDefaultException: function(t, e) {
				for (var i in e) if (e[i].test(t[i])) return !0;
				return !1
			},
			refresh: function(t) {
				this.slideIn = this.classList.contains(l), this.scalable = this.classList.contains("mui-scalable") && !this.slideIn, this.scroller = this.wrapper.querySelector(h), this.offCanvasLefts = this.wrapper.querySelectorAll("." + s), this.offCanvasRights = this.wrapper.querySelectorAll("." + o), t ? t.classList.contains(s) ? this.offCanvasLeft = t : t.classList.contains(o) && (this.offCanvasRight = t) : (this.offCanvasRight = this.wrapper.querySelector("." + o), this.offCanvasLeft = this.wrapper.querySelector("." + s)), this.offCanvasRightWidth = this.offCanvasLeftWidth = 0, this.offCanvasLeftSlideIn = this.offCanvasRightSlideIn = !1, this.offCanvasRight && (this.offCanvasRightWidth = this.offCanvasRight.offsetWidth, this.offCanvasRightSlideIn = this.slideIn && this.offCanvasRight.parentNode === this.wrapper), this.offCanvasLeft && (this.offCanvasLeftWidth = this.offCanvasLeft.offsetWidth, this.offCanvasLeftSlideIn = this.slideIn && this.offCanvasLeft.parentNode === this.wrapper), this.backdrop = this.scroller.querySelector("." + a), this.options.dragThresholdX = this.options.dragThresholdX || 10, this.visible = !1, this.startX = null, this.lastX = null, this.offsetX = null, this.lastTranslateX = null
			},
			handleEvent: function(e) {
				switch (e.type) {
				case t.EVENT_START:
					e.target && !this._preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
					break;
				case "webkitTransitionEnd":
					e.target === this.scroller && this._dispatchEvent();
					break;
				case "drag":
					var i = e.detail;
					this.startX ? this.lastX = i.center.x : (this.startX = i.center.x, this.lastX = this.startX), !this.isDragging && Math.abs(this.lastX - this.startX) > this.options.dragThresholdX && ("left" === i.direction || "right" === i.direction) && (this.slideIn ? (this.scroller = this.wrapper.querySelector(h), this.classList.contains(c) ? this.offCanvasRight && this.offCanvasRight.classList.contains(c) ? (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth) : (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : "left" === i.direction && this.offCanvasRight ? (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth) : "right" === i.direction && this.offCanvasLeft ? (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : this.scroller = null) : this.classList.contains(c) ? "left" === i.direction ? (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth) : "right" === i.direction ? (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth), this.offCanvas && this.scroller && (this.startX = this.lastX, this.isDragging = !0, t.gestures.session.lockDirection = !0, t.gestures.session.startDirection = i.direction, this.offCanvas.classList.remove(u), this.scroller.classList.remove(u), this.offsetX = this.getTranslateX(), this._initOffCanvasVisible())), this.isDragging && (this.updateTranslate(this.offsetX + (this.lastX - this.startX)), i.gesture.preventDefault(), e.stopPropagation());
					break;
				case "dragend":
					if (this.isDragging) {
						var i = e.detail,
							n = i.direction;
						this.isDragging = !1, this.offCanvas.classList.add(u), this.scroller.classList.add(u);
						var s = 0,
							o = this.getTranslateX();
						if (this.slideIn) {
							if (s = o >= 0 ? this.offCanvasRightWidth && o / this.offCanvasRightWidth || 0 : this.offCanvasLeftWidth && o / this.offCanvasLeftWidth || 0, "right" === n && 0 >= s && (s >= -.5 || i.swipe) ? this.openPercentage(100) : "right" === n && s > 0 && (s >= .5 || i.swipe) ? this.openPercentage(0) : "right" === n && -.5 >= s ? this.openPercentage(0) : "right" === n && s > 0 && .5 >= s ? this.openPercentage(-100) : "left" === n && s >= 0 && (.5 >= s || i.swipe) ? this.openPercentage(-100) : "left" === n && 0 > s && (-.5 >= s || i.swipe) ? this.openPercentage(0) : "left" === n && s >= .5 ? this.openPercentage(0) : "left" === n && s >= -.5 && 0 > s ? this.openPercentage(100) : this.openPercentage(0), 1 === s || -1 === s || 0 === s) return void this._dispatchEvent()
						} else {
							if (s = o >= 0 ? this.offCanvasLeftWidth && o / this.offCanvasLeftWidth || 0 : this.offCanvasRightWidth && o / this.offCanvasRightWidth || 0, 0 === s) return this.openPercentage(0), void this._dispatchEvent();
							"right" === n && s >= 0 && (s >= .5 || i.swipe) ? this.openPercentage(100) : "right" === n && 0 > s && (s > -.5 || i.swipe) ? this.openPercentage(0) : "right" === n && s > 0 && .5 > s ? this.openPercentage(0) : "right" === n && .5 > s ? this.openPercentage(-100) : "left" === n && 0 >= s && (-.5 >= s || i.swipe) ? this.openPercentage(-100) : "left" === n && s > 0 && (.5 >= s || i.swipe) ? this.openPercentage(0) : "left" === n && 0 > s && s >= -.5 ? this.openPercentage(0) : "left" === n && s > .5 ? this.openPercentage(100) : this.openPercentage(0), (1 === s || -1 === s) && this._dispatchEvent()
						}
					}
				}
			},
			_dispatchEvent: function() {
				this.classList.contains(c) ? t.trigger(this.wrapper, "shown", this) : t.trigger(this.wrapper, "hidden", this)
			},
			_initOffCanvasVisible: function() {
				this.visible || (this.visible = !0, this.offCanvasLeft && (this.offCanvasLeft.style.visibility = "visible"), this.offCanvasRight && (this.offCanvasRight.style.visibility = "visible"))
			},
			initEvent: function() {
				var e = this;
				e.backdrop && e.backdrop.addEventListener("tap", function(t) {
					e.close(), t.detail.gesture.preventDefault()
				}), this.classList.contains("mui-draggable") && (this.wrapper.addEventListener(t.EVENT_START, this), this.wrapper.addEventListener("drag", this), this.wrapper.addEventListener("dragend", this)), this.wrapper.addEventListener("webkitTransitionEnd", this)
			},
			openPercentage: function(t) {
				var e = t / 100;
				this.slideIn ? (this.offCanvasLeft && t >= 0 ? (e = 0 === e ? -1 : 0, this.updateTranslate(this.offCanvasLeftWidth * e), this.offCanvasLeft.classList[0 !== t ? "add" : "remove"](c)) : this.offCanvasRight && 0 >= t && (e = 0 === e ? 1 : 0, this.updateTranslate(this.offCanvasRightWidth * e), this.offCanvasRight.classList[0 !== t ? "add" : "remove"](c)), this.classList[0 !== t ? "add" : "remove"](c)) : (this.offCanvasLeft && t >= 0 ? (this.updateTranslate(this.offCanvasLeftWidth * e), this.offCanvasLeft.classList[0 !== e ? "add" : "remove"](c)) : this.offCanvasRight && 0 >= t && (this.updateTranslate(this.offCanvasRightWidth * e), this.offCanvasRight.classList[0 !== e ? "add" : "remove"](c)), this.classList[0 !== e ? "add" : "remove"](c))
			},
			updateTranslate: function(e) {
				if (e !== this.lastTranslateX) {
					if (this.slideIn) {
						if (this.offCanvas.classList.contains(o)) {
							if (0 > e) return void this.setTranslateX(0);
							if (e > this.offCanvasRightWidth) return void this.setTranslateX(this.offCanvasRightWidth)
						} else {
							if (e > 0) return void this.setTranslateX(0);
							if (e < -this.offCanvasLeftWidth) return void this.setTranslateX(-this.offCanvasLeftWidth)
						}
						this.setTranslateX(e)
					} else {
						if (!this.offCanvasLeft && e > 0 || !this.offCanvasRight && 0 > e) return void this.setTranslateX(0);
						if (this.leftShowing && e > this.offCanvasLeftWidth) return void this.setTranslateX(this.offCanvasLeftWidth);
						if (this.rightShowing && e < -this.offCanvasRightWidth) return void this.setTranslateX(-this.offCanvasRightWidth);
						this.setTranslateX(e), e >= 0 ? (this.leftShowing = !0, this.rightShowing = !1, e > 0 && (this.offCanvasLeft && t.each(this.offCanvasLefts, function(t, e) {
							e === this.offCanvasLeft ? this.offCanvasLeft.style.zIndex = 0 : e.style.zIndex = -1
						}.bind(this)), this.offCanvasRight && (this.offCanvasRight.style.zIndex = -1))) : (this.rightShowing = !0, this.leftShowing = !1, this.offCanvasRight && t.each(this.offCanvasRights, function(t, e) {
							e === this.offCanvasRight ? e.style.zIndex = 0 : e.style.zIndex = -1
						}.bind(this)), this.offCanvasLeft && (this.offCanvasLeft.style.zIndex = -1))
					}
					this.lastTranslateX = e
				}
			},
			setTranslateX: t.animationFrame(function(t) {
				if (this.scroller) if (this.scalable && this.offCanvas.parentNode === this.wrapper) {
					var e = Math.abs(t) / this.offCanvasWidth,
						i = 1 - (1 - this.options.scale) * e,
						n = this.options.scale + (1 - this.options.scale) * e,
						o = (1 - (1 - this.options.opacity) * e, this.options.opacity + (1 - this.options.opacity) * e);
					this.offCanvas.classList.contains(s) ? (this.offCanvas.style.webkitTransformOrigin = "-100%", this.scroller.style.webkitTransformOrigin = "left") : (this.offCanvas.style.webkitTransformOrigin = "200%", this.scroller.style.webkitTransformOrigin = "right"), this.offCanvas.style.opacity = o, this.offCanvas.style.webkitTransform = "translate3d(0,0,0) scale(" + n + ")", this.scroller.style.webkitTransform = "translate3d(" + t + "px,0,0) scale(" + i + ")"
				} else this.slideIn ? this.offCanvas.style.webkitTransform = "translate3d(" + t + "px,0,0)" : this.scroller.style.webkitTransform = "translate3d(" + t + "px,0,0)"
			}),
			getTranslateX: function() {
				if (this.offCanvas) {
					var e = this.slideIn ? this.offCanvas : this.scroller,
						i = t.parseTranslateMatrix(t.getStyles(e, "webkitTransform"));
					return i && i.x || 0
				}
				return 0
			},
			isShown: function(t) {
				var e = !1;
				if (this.slideIn) e = "left" === t ? this.classList.contains(c) && this.wrapper.querySelector("." + s + "." + c) : "right" === t ? this.classList.contains(c) && this.wrapper.querySelector("." + o + "." + c) : this.classList.contains(c) && (this.wrapper.querySelector("." + s + "." + c) || this.wrapper.querySelector("." + o + "." + c));
				else {
					var i = this.getTranslateX();
					e = "right" === t ? this.classList.contains(c) && 0 > i : "left" === t ? this.classList.contains(c) && i > 0 : this.classList.contains(c) && 0 !== i
				}
				return e
			},
			close: function() {
				this._initOffCanvasVisible(), this.offCanvas = this.wrapper.querySelector("." + o + "." + c) || this.wrapper.querySelector("." + s + "." + c), this.offCanvasWidth = this.offCanvas.offsetWidth, this.scroller && (this.offCanvas.offsetHeight, this.offCanvas.classList.add(u), this.scroller.classList.add(u), this.openPercentage(0))
			},
			show: function(t) {
				return this._initOffCanvasVisible(), !this.isShown(t) && (t || (t = this.wrapper.querySelector("." + o) ? "right" : "left"), "right" === t ? (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth) : (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth), this.scroller && (this.offCanvas.offsetHeight, this.offCanvas.classList.add(u), this.scroller.classList.add(u), this.openPercentage("left" === t ? 100 : -100)), !0)
			},
			toggle: function(t) {
				var e = t;
				t && t.classList && (e = t.classList.contains(s) ? "left" : "right", this.refresh(t)), this.show(e) || this.close()
			}
		}),
		p = function(t) {
			if (parentNode = t.parentNode, parentNode) {
				if (parentNode.classList.contains(r)) return parentNode;
				if (parentNode = parentNode.parentNode, parentNode.classList.contains(r)) return parentNode
			}
		},
		f = function(e, n) {
			if ("A" === n.tagName && n.hash) {
				var s = i.getElementById(n.hash.replace("#", ""));
				if (s) {
					var o = p(s);
					if (o) return t.targets._container = o, s
				}
			}
			return !1
		};
	t.registerTarget({
		name: n,
		index: 60,
		handle: f,
		target: !1,
		isReset: !1,
		isContinue: !0
	}), e.addEventListener("tap", function(e) {
		if (t.targets.offcanvas) for (var n = e.target; n && n !== i; n = n.parentNode) if ("A" === n.tagName && n.hash && n.hash === "#" + t.targets.offcanvas.id) {
			e.detail && e.detail.gesture && e.detail.gesture.preventDefault(), t(t.targets._container).offCanvas().toggle(t.targets.offcanvas), t.targets.offcanvas = t.targets._container = null;
			break
		}
	}), t.fn.offCanvas = function(e) {
		var i = [];
		return this.each(function() {
			var n = null,
				s = this;
			s.classList.contains(r) || (s = p(s));
			var o = s.getAttribute("data-offCanvas");
			o ? n = t.data[o] : (o = ++t.uuid, t.data[o] = n = new d(s, e), s.setAttribute("data-offCanvas", o)), ("show" === e || "close" === e || "toggle" === e) && n.toggle(), i.push(n)
		}), 1 === i.length ? i[0] : i
	}, t.ready(function() {
		t(".mui-off-canvas-wrap").offCanvas()
	})
}(mui, window, document, "offcanvas"), function(t, e) {
	var i = "mui-action",
		n = function(t, e) {
			var n = e.className || "";
			return "string" != typeof n && (n = ""), !(!n || !~n.indexOf(i)) && (e.classList.contains("mui-action-back") && t.preventDefault(), e)
		};
	t.registerTarget({
		name: e,
		index: 50,
		handle: n,
		target: !1,
		isContinue: !0
	})
}(mui, "action"), function(t, e, i, n) {
	var s = "mui-modal",
		o = function(t, e) {
			if ("A" === e.tagName && e.hash) {
				var n = i.getElementById(e.hash.replace("#", ""));
				if (n && n.classList.contains(s)) return n
			}
			return !1
		};
	t.registerTarget({
		name: n,
		index: 50,
		handle: o,
		target: !1,
		isReset: !1,
		isContinue: !0
	}), e.addEventListener("tap", function(e) {
		t.targets.modal && (e.detail.gesture.preventDefault(), t.targets.modal.classList.toggle("mui-active"))
	})
}(mui, window, document, "modal"), function(t, e, i, n) {
	var s = "mui-popover",
		o = "mui-popover-arrow",
		a = "mui-popover-action",
		r = "mui-backdrop",
		l = "mui-bar-popover",
		c = "mui-bar-backdrop",
		u = "mui-backdrop-action",
		h = "mui-active",
		d = "mui-bottom",
		p = function(e, n) {
			if ("A" === n.tagName && n.hash) {
				if (t.targets._popover = i.getElementById(n.hash.replace("#", "")), t.targets._popover && t.targets._popover.classList.contains(s)) return n;
				t.targets._popover = null
			}
			return !1
		};
	t.registerTarget({
		name: n,
		index: 60,
		handle: p,
		target: !1,
		isReset: !1,
		isContinue: !0
	});
	var f, m = function(t) {},
		g = function(e) {
			this.removeEventListener("webkitTransitionEnd", g), this.addEventListener(t.EVENT_MOVE, t.preventDefault), t.trigger(this, "shown", this)
		},
		v = function(e) {
			T(this, "none"), this.removeEventListener("webkitTransitionEnd", v), this.removeEventListener(t.EVENT_MOVE, t.preventDefault), m(!1), t.trigger(this, "hidden", this)
		},
		y = function() {
			var e = i.createElement("div");
			return e.classList.add(r), e.addEventListener(t.EVENT_MOVE, t.preventDefault), e.addEventListener("tap", function(e) {
				var n = t.targets._popover;
				n && (n.addEventListener("webkitTransitionEnd", v), n.classList.remove(h), w(n), i.body.setAttribute("style", ""))
			}), e
		}(),
		w = function(e) {
			y.setAttribute("style", "opacity:0"), t.targets.popover = t.targets._popover = null, f = t.later(function() {
				!e.classList.contains(h) && y.parentNode && y.parentNode === i.body && i.body.removeChild(y)
			}, 350)
		};
	e.addEventListener("tap", function(e) {
		if (t.targets.popover) {
			for (var n = !1, s = e.target; s && s !== i; s = s.parentNode) s === t.targets.popover && (n = !0);
			n && (e.detail.gesture.preventDefault(), b(t.targets._popover, t.targets.popover))
		}
	});
	var b = function(t, e, n) {
			if (!("show" === n && t.classList.contains(h) || "hide" === n && !t.classList.contains(h))) {
				f && f.cancel(), t.removeEventListener("webkitTransitionEnd", g), t.removeEventListener("webkitTransitionEnd", v), y.classList.remove(c), y.classList.remove(u);
				var s = i.querySelector(".mui-popover.mui-active");
				if (s && (s.addEventListener("webkitTransitionEnd", v), s.classList.remove(h), t === s)) return void w(s);
				var o = !1;
				(t.classList.contains(l) || t.classList.contains(a)) && (t.classList.contains(a) ? (o = !0, y.classList.add(u)) : y.classList.add(c)), T(t, "block"), t.offsetHeight, t.classList.add(h), y.setAttribute("style", ""), i.body.appendChild(y), m(!0), L(t, e, o), y.classList.add(h), t.addEventListener("webkitTransitionEnd", g)
			}
		},
		T = function(t, e, i, n) {
			var s = t.style;
			"undefined" != typeof e && (s.display = e), "undefined" != typeof i && (s.top = i + "px"), "undefined" != typeof n && (s.left = n + "px")
		},
		L = function(n, s, r) {
			if (n && s) {
				if (r) return void T(n, "block");
				var l = e.innerWidth,
					c = e.innerHeight,
					u = n.offsetWidth,
					h = n.offsetHeight,
					p = s.offsetWidth,
					f = s.offsetHeight,
					m = t.offset(s),
					g = n.querySelector("." + o);
				g || (g = i.createElement("div"), g.className = o, n.appendChild(g));
				var v = g && g.offsetWidth / 2 || 0,
					y = 0,
					w = 0,
					b = 0,
					L = 0,
					E = n.classList.contains(a) ? 0 : 5,
					x = "top";
				h + v < m.top - e.pageYOffset ? y = m.top - h - v : h + v < c - (m.top - e.pageYOffset) - f ? (x = "bottom", y = m.top + f + v) : (x = "middle", y = Math.max((c - h) / 2 + e.pageYOffset, 0), w = Math.max((l - u) / 2 + e.pageXOffset, 0)), "top" === x || "bottom" === x ? (w = p / 2 + m.left - u / 2, b = w, E > w && (w = E), w + u > l && (w = l - u - E), g && ("top" === x ? g.classList.add(d) : g.classList.remove(d), b -= w, L = u / 2 - v / 2 + b, L = Math.max(Math.min(L, u - 2 * v - 6), 6), g.setAttribute("style", "left:" + L + "px"))) : "middle" === x && g.setAttribute("style", "display:none"), T(n, "block", y, w)
			}
		};
	t.createMask = function(e) {
		var n = i.createElement("div");
		n.classList.add(r), n.addEventListener(t.EVENT_MOVE, t.preventDefault), n.addEventListener("tap", function() {
			s.close()
		});
		var s = [n];
		return s._show = !1, s.show = function() {
			return s._show = !0, n.setAttribute("style", "opacity:1"), i.body.appendChild(n), s
		}, s._remove = function() {
			return s._show && (s._show = !1, n.setAttribute("style", "opacity:0"), t.later(function() {
				var t = i.body;
				n.parentNode === t && t.removeChild(n)
			}, 350)), s
		}, s.close = function() {
			e ? e() !== !1 && s._remove() : s._remove()
		}, s
	}, t.fn.popover = function() {
		var e = arguments;
		this.each(function() {
			t.targets._popover = this, ("show" === e[0] || "hide" === e[0] || "toggle" === e[0]) && b(this, e[1], e[0])
		})
	}
}(mui, window, document, "popover"), function(t, e, i, n, s) {
	var o = "mui-control-item",
		a = "mui-segmented-control",
		r = "mui-segmented-control-vertical",
		l = "mui-control-content",
		c = "mui-bar-tab",
		u = "mui-tab-item",
		h = function(t, e) {
			return !(!e.classList || !e.classList.contains(o) && !e.classList.contains(u)) && (e.parentNode && e.parentNode.classList && e.parentNode.classList.contains(r) || t.preventDefault(), e)
		};
	t.registerTarget({
		name: n,
		index: 80,
		handle: h,
		target: !1
	}), e.addEventListener("tap", function(e) {
		var s = t.targets.tab;
		if (s) {
			for (var r, h, d, p = "mui-active", f = "." + p, m = s.parentNode; m && m !== i; m = m.parentNode) {
				if (m.classList.contains(a)) {
					r = m.querySelector(f + "." + o);
					break
				}
				m.classList.contains(c) && (r = m.querySelector(f + "." + u))
			}
			r && r.classList.remove(p);
			var g = s === r;
			if (s && s.classList.add(p), s.hash && (d = i.getElementById(s.hash.replace("#", "")))) {
				if (!d.classList.contains(l)) return void s.classList[g ? "remove" : "add"](p);
				if (!g) {
					var v = d.parentNode;
					h = v.querySelectorAll("." + l + f);
					for (var y = 0; y < h.length; y++) {
						var w = h[y];
						w.parentNode === v && w.classList.remove(p)
					}
					d.classList.add(p);
					for (var b = [], T = v.querySelectorAll("." + l), y = 0; y < T.length; y++) T[y].parentNode === v && b.push(T[y]);
					t.trigger(d, t.eventName("shown", n), {
						tabNumber: Array.prototype.indexOf.call(b, d)
					}), e.detail && e.detail.gesture.preventDefault()
				}
			}
		}
	})
}(mui, window, document, "tab"), function(t, e, i) {
	var n = "mui-switch",
		s = "mui-switch-handle",
		o = "mui-active",
		a = "mui-dragging",
		r = "mui-disabled",
		l = "." + s,
		c = function(t, e) {
			return !(!e.classList || !e.classList.contains(n)) && e
		};
	t.registerTarget({
		name: i,
		index: 100,
		handle: c,
		target: !1
	});
	var u = function(t) {
			this.element = t, this.classList = this.element.classList, this.handle = this.element.querySelector(l), this.init(), this.initEvent()
		};
	u.prototype.init = function() {
		this.toggleWidth = this.element.offsetWidth, this.handleWidth = this.handle.offsetWidth, this.handleX = this.toggleWidth - this.handleWidth - 3
	}, u.prototype.initEvent = function() {
		this.element.addEventListener(t.EVENT_START, this), this.element.addEventListener("drag", this), this.element.addEventListener("swiperight", this), this.element.addEventListener(t.EVENT_END, this), this.element.addEventListener(t.EVENT_CANCEL, this)
	}, u.prototype.handleEvent = function(e) {
		if (!this.classList.contains(r)) switch (e.type) {
		case t.EVENT_START:
			this.start(e);
			break;
		case "drag":
			this.drag(e);
			break;
		case "swiperight":
			this.swiperight();
			break;
		case t.EVENT_END:
		case t.EVENT_CANCEL:
			this.end(e)
		}
	}, u.prototype.start = function(t) {
		this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = ".2s", this.classList.add(a), (0 === this.toggleWidth || 0 === this.handleWidth) && this.init()
	}, u.prototype.drag = function(t) {
		var e = t.detail;
		this.isDragging || ("left" === e.direction || "right" === e.direction) && (this.isDragging = !0, this.lastChanged = void 0, this.initialState = this.classList.contains(o)), this.isDragging && (this.setTranslateX(e.deltaX), t.stopPropagation(), e.gesture.preventDefault())
	}, u.prototype.swiperight = function(t) {
		this.isDragging && t.stopPropagation()
	}, u.prototype.end = function(e) {
		this.classList.remove(a), this.isDragging ? (this.isDragging = !1, e.stopPropagation(), t.trigger(this.element, "toggle", {
			isActive: this.classList.contains(o)
		})) : this.toggle()
	}, u.prototype.toggle = function(e) {
		var i = this.classList;
		e === !1 ? this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = "0s" : this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = ".2s", i.contains(o) ? (i.remove(o), this.handle.style.webkitTransform = "translate(0,0)") : (i.add(o), this.handle.style.webkitTransform = "translate(" + this.handleX + "px,0)"), t.trigger(this.element, "toggle", {
			isActive: this.classList.contains(o)
		})
	}, u.prototype.setTranslateX = t.animationFrame(function(t) {
		if (this.isDragging) {
			var e = !1;
			(this.initialState && -t > this.handleX / 2 || !this.initialState && t > this.handleX / 2) && (e = !0), this.lastChanged !== e && (e ? (this.handle.style.webkitTransform = "translate(" + (this.initialState ? 0 : this.handleX) + "px,0)", this.classList[this.initialState ? "remove" : "add"](o)) : (this.handle.style.webkitTransform = "translate(" + (this.initialState ? this.handleX : 0) + "px,0)", this.classList[this.initialState ? "add" : "remove"](o)), this.lastChanged = e)
		}
	}), t.fn.
	switch = function(e) {
		var i = [];
		return this.each(function() {
			var e = null,
				n = this.getAttribute("data-switch");
			n ? e = t.data[n] : (n = ++t.uuid, t.data[n] = new u(this), this.setAttribute("data-switch", n)), i.push(e)
		}), i.length > 1 ? i : i[0]
	}, t.ready(function() {
		t("." + n).
		switch ()
	})
}(mui, window, "toggle"), function(t, e, i) {
	function n(t, e) {
		var i = e ? "removeEventListener" : "addEventListener";
		t[i]("drag", P), t[i]("dragend", P), t[i]("swiperight", P), t[i]("swipeleft", P), t[i]("flick", P)
	}
	var s, o, a = "mui-active",
		r = "mui-selected",
		l = "mui-grid-view",
		c = "mui-table-view-radio",
		u = "mui-table-view-cell",
		h = "mui-collapse-content",
		d = "mui-disabled",
		p = "mui-switch",
		f = "mui-btn",
		m = "mui-slider-handle",
		g = "mui-slider-left",
		v = "mui-slider-right",
		y = "mui-transitioning",
		w = "." + m,
		b = "." + g,
		T = "." + v,
		L = "." + r,
		E = "." + f,
		x = .8,
		S = isOpened = openedActions = progress = !1,
		_ = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = !1,
		k = translateX = lastTranslateX = sliderActionLeftWidth = sliderActionRightWidth = 0,
		C = function(t) {
			t ? o ? o.classList.add(a) : s && s.classList.add(a) : (k && k.cancel(), o ? o.classList.remove(a) : s && s.classList.remove(a))
		},
		A = function() {
			if (translateX !== lastTranslateX) {
				if (buttonsRight && buttonsRight.length > 0) {
					progress = translateX / sliderActionRightWidth, translateX < -sliderActionRightWidth && (translateX = -sliderActionRightWidth - Math.pow(-translateX - sliderActionRightWidth, x));
					for (var t = 0, e = buttonsRight.length; e > t; t++) {
						var i = buttonsRight[t];
						"undefined" == typeof i._buttonOffset && (i._buttonOffset = i.offsetLeft), buttonOffset = i._buttonOffset, N(i, translateX - buttonOffset * (1 + Math.max(progress, -1)))
					}
				}
				if (buttonsLeft && buttonsLeft.length > 0) {
					progress = translateX / sliderActionLeftWidth, translateX > sliderActionLeftWidth && (translateX = sliderActionLeftWidth + Math.pow(translateX - sliderActionLeftWidth, x));
					for (var t = 0, e = buttonsLeft.length; e > t; t++) {
						var n = buttonsLeft[t];
						"undefined" == typeof n._buttonOffset && (n._buttonOffset = sliderActionLeftWidth - n.offsetLeft - n.offsetWidth), buttonOffset = n._buttonOffset, buttonsLeft.length > 1 && (n.style.zIndex = buttonsLeft.length - t), N(n, translateX + buttonOffset * (1 - Math.min(progress, 1)))
					}
				}
				N(_, translateX), lastTranslateX = translateX
			}
			sliderRequestAnimationFrame = requestAnimationFrame(function() {
				A()
			})
		},
		N = function(t, e) {
			t && (t.style.webkitTransform = "translate(" + e + "px,0)")
		};
	e.addEventListener(t.EVENT_START, function(e) {
		s && C(!1), s = o = !1, S = isOpened = openedActions = !1;
		for (var a = e.target, r = !1; a && a !== i; a = a.parentNode) if (a.classList) {
			var m = a.classList;
			if (("INPUT" === a.tagName && "radio" !== a.type && "checkbox" !== a.type || "BUTTON" === a.tagName || m.contains(p) || m.contains(f) || m.contains(d)) && (r = !0), m.contains(h)) break;
			if (m.contains(u)) {
				s = a;
				var g = s.parentNode.querySelector(L);
				if (!s.parentNode.classList.contains(c) && g && g !== s) return t.swipeoutClose(g), void(s = r = !1);
				if (!s.parentNode.classList.contains(l)) {
					var v = s.querySelector("a");
					v && v.parentNode === s && (o = v)
				}
				var y = s.querySelector(w);
				y && (n(s), e.stopPropagation()), r || (y ? (k && k.cancel(), k = t.later(function() {
					C(!0)
				}, 100)) : C(!0));
				break
			}
		}
	}), e.addEventListener(t.EVENT_MOVE, function(t) {
		C(!1)
	});
	var P = {
		handleEvent: function(t) {
			switch (t.type) {
			case "drag":
				this.drag(t);
				break;
			case "dragend":
				this.dragend(t);
				break;
			case "flick":
				this.flick(t);
				break;
			case "swiperight":
				this.swiperight(t);
				break;
			case "swipeleft":
				this.swipeleft(t)
			}
		},
		drag: function(t) {
			if (s) {
				S || (_ = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = !1, _ = s.querySelector(w), _ && (sliderActionLeft = s.querySelector(b), sliderActionRight = s.querySelector(T), sliderActionLeft && (sliderActionLeftWidth = sliderActionLeft.offsetWidth, buttonsLeft = sliderActionLeft.querySelectorAll(E)), sliderActionRight && (sliderActionRightWidth = sliderActionRight.offsetWidth, buttonsRight = sliderActionRight.querySelectorAll(E)), s.classList.remove(y), isOpened = s.classList.contains(r), isOpened && (openedActions = s.querySelector(b + L) ? "left" : "right")));
				var e = t.detail,
					i = e.direction,
					n = e.angle;
				if ("left" === i && (n > 150 || -150 > n) ? (buttonsRight || buttonsLeft && isOpened) && (S = !0) : "right" === i && n > -30 && 30 > n && (buttonsLeft || buttonsRight && isOpened) && (S = !0), S) {
					t.stopPropagation(), t.detail.gesture.preventDefault();
					var o = t.detail.deltaX;
					if (isOpened && ("right" === openedActions ? o -= sliderActionRightWidth : o += sliderActionLeftWidth), o > 0 && !buttonsLeft || 0 > o && !buttonsRight) {
						if (!isOpened) return;
						o = 0
					}
					0 > o ? sliderDirection = "toLeft" : o > 0 ? sliderDirection = "toRight" : sliderDirection || (sliderDirection = "toLeft"), sliderRequestAnimationFrame || A(), translateX = o
				}
			}
		},
		flick: function(t) {
			S && t.stopPropagation()
		},
		swipeleft: function(t) {
			S && t.stopPropagation()
		},
		swiperight: function(t) {
			S && t.stopPropagation()
		},
		dragend: function(e) {
			if (S) {
				e.stopPropagation(), sliderRequestAnimationFrame && (cancelAnimationFrame(sliderRequestAnimationFrame), sliderRequestAnimationFrame = null);
				var i = e.detail;
				S = !1;
				var n = "close",
					o = "toLeft" === sliderDirection ? sliderActionRightWidth : sliderActionLeftWidth,
					a = i.swipe || Math.abs(translateX) > o / 2;
				a && (isOpened ? "left" === i.direction && "right" === openedActions ? n = "open" : "right" === i.direction && "left" === openedActions && (n = "open") : n = "open"), s.classList.add(y);
				var l;
				if ("open" === n) {
					var c = "toLeft" === sliderDirection ? -o : o;
					if (N(_, c), l = "toLeft" === sliderDirection ? buttonsRight : buttonsLeft, "undefined" != typeof l) {
						for (var u = null, h = 0; h < l.length; h++) u = l[h], N(u, c);
						u.parentNode.classList.add(r), s.classList.add(r), isOpened || t.trigger(s, "toLeft" === sliderDirection ? "slideleft" : "slideright")
					}
				} else N(_, 0), sliderActionLeft && sliderActionLeft.classList.remove(r), sliderActionRight && sliderActionRight.classList.remove(r), s.classList.remove(r);
				var d;
				if (buttonsLeft && buttonsLeft.length > 0 && buttonsLeft !== l) for (var h = 0, p = buttonsLeft.length; p > h; h++) {
					var f = buttonsLeft[h];
					d = f._buttonOffset, "undefined" == typeof d && (f._buttonOffset = sliderActionLeftWidth - f.offsetLeft - f.offsetWidth), N(f, d)
				}
				if (buttonsRight && buttonsRight.length > 0 && buttonsRight !== l) for (var h = 0, p = buttonsRight.length; p > h; h++) {
					var m = buttonsRight[h];
					d = m._buttonOffset, "undefined" == typeof d && (m._buttonOffset = m.offsetLeft), N(m, -d)
				}
			}
		}
	};
	t.swipeoutOpen = function(e, i) {
		if (e) {
			var n = e.classList;
			if (!n.contains(r)) {
				i || (i = e.querySelector(T) ? "right" : "left");
				var s = e.querySelector(t.classSelector(".slider-" + i));
				if (s) {
					s.classList.add(r), n.add(r), n.remove(y);
					for (var o, a = s.querySelectorAll(E), l = s.offsetWidth, c = "right" === i ? -l : l, u = a.length, h = 0; u > h; h++) o = a[h], "right" === i ? N(o, -o.offsetLeft) : N(o, l - o.offsetWidth - o.offsetLeft);
					n.add(y);
					for (var h = 0; u > h; h++) N(a[h], c);
					N(e.querySelector(w), c)
				}
			}
		}
	}, t.swipeoutClose = function(e) {
		if (e) {
			var i = e.classList;
			if (i.contains(r)) {
				var n = e.querySelector(T + L) ? "right" : "left",
					s = e.querySelector(t.classSelector(".slider-" + n));
				if (s) {
					s.classList.remove(r), i.remove(r), i.add(y);
					var o, a = s.querySelectorAll(E),
						l = s.offsetWidth,
						c = a.length;
					N(e.querySelector(w), 0);
					for (var u = 0; c > u; u++) o = a[u], "right" === n ? N(o, -o.offsetLeft) : N(o, l - o.offsetWidth - o.offsetLeft)
				}
			}
		}
	}, e.addEventListener(t.EVENT_END, function(t) {
		s && (C(!1), _ && n(s, !0))
	}), e.addEventListener(t.EVENT_CANCEL, function(t) {
		s && (C(!1), _ && n(s, !0))
	});
	var R = function(e) {
			var i = e.target && e.target.type || "";
			if ("radio" !== i && "checkbox" !== i) {
				var n = s.classList;
				if (n.contains("mui-radio")) {
					var o = s.querySelector("input[type=radio]");
					o && (o.disabled || o.readOnly || (o.checked = !o.checked, t.trigger(o, "change")))
				} else if (n.contains("mui-checkbox")) {
					var o = s.querySelector("input[type=checkbox]");
					o && (o.disabled || o.readOnly || (o.checked = !o.checked, t.trigger(o, "change")))
				}
			}
		};
	e.addEventListener(t.EVENT_CLICK, function(t) {
		s && s.classList.contains("mui-collapse") && t.preventDefault()
	}), e.addEventListener("doubletap", function(t) {
		s && R(t)
	});
	var I = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
	e.addEventListener("tap", function(e) {
		if (s) {
			var i = !1,
				n = s.classList,
				o = s.parentNode;
			if (o && o.classList.contains(c)) {
				if (n.contains(r)) return;
				var l = o.querySelector("li" + L);
				return l && l.classList.remove(r), n.add(r), void t.trigger(s, "selected", {
					el: s
				})
			}
			if (n.contains("mui-collapse") && !s.parentNode.classList.contains("mui-unfold")) {
				if (I.test(e.target.tagName) || e.detail.gesture.preventDefault(), !n.contains(a)) {
					var u = s.parentNode.querySelector(".mui-collapse.mui-active");
					u && u.classList.remove(a), i = !0
				}
				n.toggle(a), i && t.trigger(s, "expand")
			} else R(e)
		}
	})
}(mui, window, document), function(t, e) {
	t.alert = function(i, n, s, o) {
		if (t.os.plus) {
			if ("undefined" == typeof i) return;
			"function" == typeof n ? (o = n, n = null, s = "确定") : "function" == typeof s && (o = s, s = null), t.plusReady(function() {
				plus.nativeUI.alert(i, o, n, s)
			})
		} else e.alert(i)
	}
}(mui, window), function(t, e) {
	t.confirm = function(i, n, s, o) {
		if (t.os.plus) {
			if ("undefined" == typeof i) return;
			"function" == typeof n ? (o = n, n = null, s = null) : "function" == typeof s && (o = s, s = null), t.plusReady(function() {
				plus.nativeUI.confirm(i, o, n, s)
			})
		} else o(e.confirm(i) ? {
			index: 0
		} : {
			index: 1
		})
	}
}(mui, window), function(t, e) {
	t.prompt = function(i, n, s, o, a) {
		if (t.os.plus) {
			if ("undefined" == typeof message) return;
			"function" == typeof n ? (a = n, n = null, s = null, o = null) : "function" == typeof s ? (a = s, s = null, o = null) : "function" == typeof o && (a = o, o = null), t.plusReady(function() {
				plus.nativeUI.prompt(i, a, s, n, o)
			})
		} else {
			var r = e.prompt(i);
			a(r ? {
				index: 0,
				value: r
			} : {
				index: 1,
				value: ""
			})
		}
	}
}(mui, window), function(t, e) {
	var i = "mui-active";
	t.toast = function(e, n) {
		var s = {
			long: 3500,
			short: 2e3
		};
		if (n = t.extend({
			duration: "short"
		}, n || {}), !t.os.plus || "div" === n.type) {
			"number" == typeof n.duration ? duration = n.duration > 0 ? n.duration : s.short : duration = s[n.duration], duration || (duration = s.short);
			var o = document.createElement("div");
			return o.classList.add("mui-toast-container"), o.innerHTML = '<div class="mui-toast-message">' + e + "</div>", o.addEventListener("webkitTransitionEnd", function() {
				o.classList.contains(i) || (o.parentNode.removeChild(o), o = null)
			}), o.addEventListener("click", function() {
				o.parentNode.removeChild(o), o = null
			}), document.body.appendChild(o), o.offsetHeight, o.classList.add(i), setTimeout(function() {
				o && o.classList.remove(i)
			}, duration), {
				isVisible: function() {
					return !!o
				}
			}
		}
		t.plusReady(function() {
			plus.nativeUI.toast(e, {
				verticalAlign: "bottom",
				duration: n.duration
			})
		})
	}
}(mui, window), function(t, e, i) {
	var n = "mui-popup",
		s = "mui-popup-backdrop",
		o = "mui-popup-in",
		a = "mui-popup-out",
		r = "mui-popup-inner",
		l = "mui-popup-title",
		c = "mui-popup-text",
		u = "mui-popup-input",
		h = "mui-popup-buttons",
		d = "mui-popup-button",
		p = "mui-popup-button-bold",
		s = "mui-popup-backdrop",
		f = "mui-active",
		m = [],
		g = function() {
			var e = i.createElement("div");
			return e.classList.add(s), e.addEventListener(t.EVENT_MOVE, t.preventDefault), e.addEventListener("webkitTransitionEnd", function() {
				this.classList.contains(f) || e.parentNode && e.parentNode.removeChild(e)
			}), e
		}(),
		v = function(t) {
			return '<div class="' + u + '"><input type="text" autofocus placeholder="' + (t || "") + '"/></div>'
		},
		y = function(t, e, i) {
			return '<div class="' + r + '"><div class="' + l + '">' + e + '</div><div class="' + c + '">' + t.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>") + "</div>" + (i || "") + "</div>"
		},
		w = function(t) {
			for (var e = t.length, i = [], n = 0; e > n; n++) i.push('<span class="' + d + (n === e - 1 ? " " + p : "") + '">' + t[n] + "</span>");
			return '<div class="' + h + '">' + i.join("") + "</div>"
		},
		b = function(e, s) {
			var r = i.createElement("div");
			r.className = n, r.innerHTML = e;
			var l = function() {
					r.parentNode && r.parentNode.removeChild(r), r = null
				};
			r.addEventListener(t.EVENT_MOVE, t.preventDefault), r.addEventListener("webkitTransitionEnd", function(t) {
				r && t.target === r && r.classList.contains(a) && l()
			}), r.style.display = "block", i.body.appendChild(r), r.offsetHeight, r.classList.add(o), g.classList.contains(f) || (g.style.display = "block", i.body.appendChild(g), g.offsetHeight, g.classList.add(f));
			var c = t.qsa("." + d, r),
				h = r.querySelector("." + u + " input"),
				p = {
					element: r,
					close: function(t, e) {
						if (r) {
							var i = s && s({
								index: t || 0,
								value: h && h.value || ""
							});
							if (i === !1) return;
							e !== !1 ? (r.classList.remove(o), r.classList.add(a)) : l(), m.pop(), m.length ? m[m.length - 1].show(e) : g.classList.remove(f)
						}
					}
				},
				v = function(t) {
					p.close(c.indexOf(t.target))
				};
			return t(r).on("tap", "." + d, v), m.length && m[m.length - 1].hide(), m.push({
				close: p.close,
				show: function(t) {
					r.style.display = "block", r.offsetHeight, r.classList.add(o)
				},
				hide: function() {
					r.style.display = "none", r.classList.remove(o)
				}
			}), p
		},
		T = function(e, i, n, s, o) {
			return "undefined" != typeof e ? ("function" == typeof i ? (s = i, o = n, i = null, n = null) : "function" == typeof n && (o = s, s = n, n = null), t.os.plus && "div" !== o ? plus.nativeUI.alert(e, s, i || "提示", n || "确定") : b(y(e, i || "提示") + w([n || "确定"]), s)) : void 0
		},
		L = function(e, i, n, s, o) {
			return "undefined" != typeof e ? ("function" == typeof i ? (s = i, o = n, i = null, n = null) : "function" == typeof n && (o = s, s = n, n = null), t.os.plus && "div" !== o ? plus.nativeUI.confirm(e, s, i, n || ["取消", "确认"]) : b(y(e, i || "提示") + w(n || ["取消", "确认"]), s)) : void 0
		},
		E = function(e, i, n, s, o, a) {
			return "undefined" != typeof e ? ("function" == typeof i ? (o = i, a = n, i = null, n = null, s = null) : "function" == typeof n ? (o = n, a = s, n = null, s = null) : "function" == typeof s && (a = o, o = s, s = null), t.os.plus && "div" !== a ? plus.nativeUI.prompt(e, o, n || "提示", i, s || ["取消", "确认"]) : b(y(e, n || "提示", v(i)) + w(s || ["取消", "确认"]), o)) : void 0
		},
		x = function() {
			return !!m.length && (m[m.length - 1].close(), !0)
		},
		S = function() {
			for (; m.length;) m[m.length - 1].close()
		};
	t.closePopup = x, t.closePopups = S, t.alert = T, t.confirm = L, t.prompt = E
}(mui, window, document), function(t, e) {
	var i = "mui-progressbar",
		n = "mui-progressbar-in",
		s = "mui-progressbar-out",
		o = "mui-progressbar-infinite",
		a = ".mui-progressbar",
		r = function(e) {
			if (e = t(e || "body"), 0 !== e.length) {
				if (e = e[0], e.classList.contains(i)) return e;
				var n = e.querySelectorAll(a);
				if (n) for (var s = 0, o = n.length; o > s; s++) {
					var r = n[s];
					if (r.parentNode === e) return r
				}
			}
		},
		l = function(r, l, c) {
			if ("number" == typeof r && (c = l, l = r, r = "body"), r = t(r || "body"), 0 !== r.length) {
				r = r[0];
				var h;
				if (r.classList.contains(i)) h = r;
				else {
					var d = r.querySelectorAll(a + ":not(." + s + ")");
					if (d) for (var p = 0, f = d.length; f > p; p++) {
						var m = d[p];
						if (m.parentNode === r) {
							h = m;
							break
						}
					}
					h ? h.classList.add(n) : (h = e.createElement("span"), h.className = i + " " + n + ("undefined" != typeof l ? "" : " " + o) + (c ? " " + i + "-" + c : ""), "undefined" != typeof l && (h.innerHTML = "<span></span>"), r.appendChild(h))
				}
				return l && u(r, l), h
			}
		},
		c = function(t) {
			var e = r(t);
			if (e) {
				var i = e.classList;
				i.contains(n) && !i.contains(s) && (i.remove(n), i.add(s), e.addEventListener("webkitAnimationEnd", function() {
					e.parentNode && e.parentNode.removeChild(e), e = null
				}))
			}
		},
		u = function(t, e, i) {
			"number" == typeof t && (i = e, e = t, t = !1);
			var n = r(t);
			if (n && !n.classList.contains(o)) {
				e && (e = Math.min(Math.max(e, 0), 100)), n.offsetHeight;
				var s = n.querySelector("span");
				if (s) {
					var a = s.style;
					a.webkitTransform = "translate3d(" + (-100 + e) + "%,0,0)", "undefined" != typeof i ? a.webkitTransitionDuration = i + "ms" : a.webkitTransitionDuration = ""
				}
				return n
			}
		};
	t.fn.progressbar = function(t) {
		var e = [];
		return t = t || {}, this.each(function() {
			var i = this,
				n = i.mui_plugin_progressbar;
			n ? t && n.setOptions(t) : i.mui_plugin_progressbar = n = {
				options: t,
				setOptions: function(t) {
					this.options = t
				},
				show: function() {
					return l(i, this.options.progress, this.options.color)
				},
				setProgress: function(t) {
					return u(i, t)
				},
				hide: function() {
					return c(i)
				}
			}, e.push(n)
		}), 1 === e.length ? e[0] : e
	}
}(mui, document), function(t, e, i) {
	var n = "mui-icon",
		s = "mui-icon-clear",
		o = "mui-icon-speech",
		a = "mui-icon-search",
		r = "mui-icon-eye",
		l = "mui-input-row",
		c = "mui-placeholder",
		u = "mui-tooltip",
		h = "mui-hidden",
		d = "mui-focusin",
		p = "." + s,
		f = "." + o,
		m = "." + r,
		g = "." + c,
		v = "." + u,
		y = function(t) {
			for (; t && t !== i; t = t.parentNode) if (t.classList && t.classList.contains(l)) return t;
			return null
		},
		w = function(t, e) {
			this.element = t, this.options = e || {
				actions: "clear"
			}, ~this.options.actions.indexOf("slider") ? (this.sliderActionClass = u + " " + h, this.sliderActionSelector = v) : (~this.options.actions.indexOf("clear") && (this.clearActionClass = n + " " + s + " " + h, this.clearActionSelector = p), ~this.options.actions.indexOf("speech") && (this.speechActionClass = n + " " + o, this.speechActionSelector = f), ~this.options.actions.indexOf("search") && (this.searchActionClass = c, this.searchActionSelector = g), ~this.options.actions.indexOf("password") && (this.passwordActionClass = n + " " + r, this.passwordActionSelector = m)), this.init()
		};
	w.prototype.init = function() {
		this.initAction(), this.initElementEvent()
	}, w.prototype.initAction = function() {
		var e = this,
			i = e.element.parentNode;
		i && (e.sliderActionClass ? e.sliderAction = e.createAction(i, e.sliderActionClass, e.sliderActionSelector) : (e.searchActionClass && (e.searchAction = e.createAction(i, e.searchActionClass, e.searchActionSelector), e.searchAction.addEventListener("tap", function(i) {
			t.focus(e.element), i.stopPropagation()
		})), e.speechActionClass && (e.speechAction = e.createAction(i, e.speechActionClass, e.speechActionSelector), e.speechAction.addEventListener("click", t.stopPropagation), e.speechAction.addEventListener("tap", function(t) {
			e.speechActionClick(t)
		})), e.clearActionClass && (e.clearAction = e.createAction(i, e.clearActionClass, e.clearActionSelector), e.clearAction.addEventListener("tap", function(t) {
			e.clearActionClick(t)
		})), e.passwordActionClass && (e.passwordAction = e.createAction(i, e.passwordActionClass, e.passwordActionSelector), e.passwordAction.addEventListener("tap", function(t) {
			e.passwordActionClick(t)
		}))))
	}, w.prototype.createAction = function(t, e, s) {
		var o = t.querySelector(s);
		if (!o) {
			var o = i.createElement("span");
			o.className = e, e === this.searchActionClass && (o.innerHTML = '<span class="' + n + " " + a + '"></span><span>' + this.element.getAttribute("placeholder") + "</span>", this.element.setAttribute("placeholder", ""), this.element.value.trim() && t.classList.add("mui-active")), t.insertBefore(o, this.element.nextSibling)
		}
		return o
	}, w.prototype.initElementEvent = function() {
		var e = this.element;
		if (this.sliderActionClass) {
			var i = this.sliderAction,
				n = null,
				s = function() {
					i.classList.remove(h);
					var t = e.offsetLeft,
						s = e.offsetWidth - 28,
						o = i.offsetWidth,
						a = Math.abs(e.max - e.min),
						r = s / a * Math.abs(e.value - e.min);
					i.style.left = 14 + t + r - o / 2 + "px", i.innerText = e.value, n && clearTimeout(n), n = setTimeout(function() {
						i.classList.add(h)
					}, 1e3)
				};
			e.addEventListener("input", s), e.addEventListener("tap", s), e.addEventListener(t.EVENT_MOVE, function(t) {
				t.stopPropagation()
			})
		} else {
			if (this.clearActionClass) {
				var o = this.clearAction;
				if (!o) return;
				t.each(["keyup", "change", "input", "focus", "cut", "paste"], function(t, i) {
					!
					function(t) {
						e.addEventListener(t, function() {
							o.classList[e.value.trim() ? "remove" : "add"](h)
						})
					}(i)
				}), e.addEventListener("blur", function() {
					o.classList.add(h)
				})
			}
			this.searchActionClass && (e.addEventListener("focus", function() {
				e.parentNode.classList.add("mui-active")
			}), e.addEventListener("blur", function() {
				e.value.trim() || e.parentNode.classList.remove("mui-active")
			}))
		}
	}, w.prototype.setPlaceholder = function(t) {
		if (this.searchActionClass) {
			var e = this.element.parentNode.querySelector(g);
			e && (e.getElementsByTagName("span")[1].innerText = t)
		} else this.element.setAttribute("placeholder", t)
	}, w.prototype.passwordActionClick = function(t) {
		"text" === this.element.type ? this.element.type = "password" : this.element.type = "text", this.passwordAction.classList.toggle("mui-active"), t.preventDefault()
	}, w.prototype.clearActionClick = function(e) {
		var i = this;
		i.element.value = "", t.focus(i.element), i.clearAction.classList.add(h), e.preventDefault()
	}, w.prototype.speechActionClick = function(n) {
		if (e.plus) {
			var s = this,
				o = s.element.value;
			s.element.value = "", i.body.classList.add(d), plus.speech.startRecognize({
				engine: "iFly"
			}, function(e) {
				s.element.value += e, t.focus(s.element), plus.speech.stopRecognize(), t.trigger(s.element, "recognized", {
					value: s.element.value
				}), o !== s.element.value && (t.trigger(s.element, "change"), t.trigger(s.element, "input"))
			}, function(t) {
				i.body.classList.remove(d)
			})
		} else alert("only for 5+");
		n.preventDefault()
	}, t.fn.input = function(e) {
		var i = [];
		return this.each(function() {
			var e = null,
				n = [],
				s = y(this.parentNode);
			if ("range" === this.type && s.classList.contains("mui-input-range")) n.push("slider");
			else {
				var o = this.classList;
				o.contains("mui-input-clear") && n.push("clear"), t.os.android && t.os.stream || !o.contains("mui-input-speech") || n.push("speech"), o.contains("mui-input-password") && n.push("password"), "search" === this.type && s.classList.contains("mui-search") && n.push("search")
			}
			var a = this.getAttribute("data-input-" + n[0]);
			if (a) e = t.data[a];
			else {
				a = ++t.uuid, e = t.data[a] = new w(this, {
					actions: n.join(",")
				});
				for (var r = 0, l = n.length; l > r; r++) this.setAttribute("data-input-" + n[r], a)
			}
			i.push(e)
		}), 1 === i.length ? i[0] : i
	}, t.ready(function() {
		t(".mui-input-row input").input()
	})
}(mui, window, document), function(t, e) {
	var i = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
		n = function(t) {
			var e = t.match(i);
			return e && 5 === e.length ? [e[1], e[2], e[3], e[4]] : []
		},
		s = function(e, i) {
			this.element = e, this.options = t.extend({
				top: 0,
				offset: 150,
				duration: 16
			}, i || {}), this._style = this.element.style, this._bgColor = this._style.backgroundColor;
			var s = n(mui.getStyles(this.element, "backgroundColor"));
			if (!s.length) throw new Error("元素背景颜色必须为RGBA");
			this._R = s[0], this._G = s[1], this._B = s[2], this._A = s[3], this._bufferFn = t.buffer(this.handleScroll, this.options.duration, this), this.initEvent()
		};
	s.prototype.initEvent = function() {
		e.addEventListener("scroll", this._bufferFn), e.addEventListener(t.EVENT_MOVE, this._bufferFn)
	}, s.prototype.handleScroll = function() {
		this._style.backgroundColor = "rgba(" + this._R + "," + this._G + "," + this._B + "," + (e.scrollY - this.options.top) / this.options.offset + ")"
	}, s.prototype.destory = function() {
		e.removeEventListener("scroll", this._bufferFn), e.removeEventListener(t.EVENT_MOVE, this._bufferFn), this.element.style.backgroundColor = this._bgColor, this.element.mui_plugin_transparent = null
	}, t.fn.transparent = function(t) {
		t = t || {};
		var e = [];
		return this.each(function() {
			var i = this.mui_plugin_transparent;
			if (!i) {
				var n = this.getAttribute("data-top"),
					o = this.getAttribute("data-offset"),
					a = this.getAttribute("data-duration");
				null !== n && "undefined" == typeof t.top && (t.top = n), null !== o && "undefined" == typeof t.offset && (t.offset = o), null !== a && "undefined" == typeof t.duration && (t.duration = a), i = this.mui_plugin_transparent = new s(this, t)
			}
			e.push(i)
		}), 1 === e.length ? e[0] : e
	}, t.ready(function() {
		t(".mui-bar-transparent").transparent()
	})
}(mui, window), function(t) {
	var e = "ontouchstart" in document,
		i = e ? "tap" : "click",
		n = "change",
		s = "mui-numbox",
		o = ".mui-btn-numbox-plus,.mui-numbox-btn-plus",
		a = ".mui-btn-numbox-minus,.mui-numbox-btn-minus",
		r = ".mui-input-numbox,.mui-numbox-input",
		l = t.Numbox = t.Class.extend({
			init: function(e, i) {
				var n = this;
				if (!e) throw "构造 numbox 时缺少容器元素";
				n.holder = e, i = i || {}, i.step = parseInt(i.step || 1), n.options = i, n.input = t.qsa(r, n.holder)[0], n.plus = t.qsa(o, n.holder)[0], n.minus = t.qsa(a, n.holder)[0], n.checkValue(), n.initEvent()
			},
			initEvent: function() {
				var e = this;
				e.plus.addEventListener(i, function(i) {
					var s = parseInt(e.input.value) + e.options.step;
					e.input.value = s.toString(), t.trigger(e.input, n, null)
				}), e.minus.addEventListener(i, function(i) {
					var s = parseInt(e.input.value) - e.options.step;
					e.input.value = s.toString(), t.trigger(e.input, n, null)
				}), e.input.addEventListener(n, function(i) {
					e.checkValue();
					var s = parseInt(e.input.value);
					t.trigger(e.holder, n, {
						value: s
					})
				})
			},
			getValue: function() {
				var t = this;
				return parseInt(t.input.value)
			},
			checkValue: function() {
				var t = this,
					e = t.input.value;
				if (null == e || "" == e || isNaN(e)) t.input.value = t.options.min || 0, t.minus.disabled = null != t.options.min;
				else {
					var e = parseInt(e);
					null != t.options.max && !isNaN(t.options.max) && e >= parseInt(t.options.max) ? (e = t.options.max, t.plus.disabled = !0) : t.plus.disabled = !1, null != t.options.min && !isNaN(t.options.min) && e <= parseInt(t.options.min) ? (e = t.options.min, t.minus.disabled = !0) : t.minus.disabled = !1, t.input.value = e
				}
			},
			setOption: function(t, e) {
				var i = this;
				i.options[t] = e
			},
			setValue: function(t) {
				this.input.value = t, this.checkValue()
			}
		});
	t.fn.numbox = function(t) {
		return this.each(function(t, e) {
			if (!e.numbox) if (n) e.numbox = new l(e, n);
			else {
				var i = e.getAttribute("data-numbox-options"),
					n = i ? JSON.parse(i) : {};
				n.step = e.getAttribute("data-numbox-step") || n.step, n.min = e.getAttribute("data-numbox-min") || n.min, n.max = e.getAttribute("data-numbox-max") || n.max, e.numbox = new l(e, n)
			}
		}), this[0] ? this[0].numbox : null
	}, t.ready(function() {
		t("." + s).numbox()
	})
}(mui), function(t, e, i) {
	var n = "mui-disabled",
		s = "reset",
		o = "loading",
		a = {
			loadingText: "Loading...",
			loadingIcon: "mui-spinner mui-spinner-white",
			loadingIconPosition: "left"
		},
		r = function(e, i) {
			this.element = e, this.options = t.extend({}, a, i), this.options.loadingText || (this.options.loadingText = a.loadingText), null === this.options.loadingIcon && (this.options.loadingIcon = "mui-spinner", "rgb(255, 255, 255)" === t.getStyles(this.element, "color") && (this.options.loadingIcon += " mui-spinner-white")), this.isInput = "INPUT" === this.element.tagName, this.resetHTML = this.isInput ? this.element.value : this.element.innerHTML, this.state = ""
		};
	r.prototype.loading = function() {
		this.setState(o)
	}, r.prototype.reset = function() {
		this.setState(s)
	}, r.prototype.setState = function(t) {
		if (this.state === t) return !1;
		if (this.state = t, t === s) this.element.disabled = !1, this.element.classList.remove(n), this.setHtml(this.resetHTML);
		else if (t === o) {
			this.element.disabled = !0, this.element.classList.add(n);
			var e = this.isInput ? this.options.loadingText : "<span>" + this.options.loadingText + "</span>";
			this.options.loadingIcon && !this.isInput && ("right" === this.options.loadingIconPosition ? e += '&nbsp;<span class="' + this.options.loadingIcon + '"></span>' : e = '<span class="' + this.options.loadingIcon + '"></span>&nbsp;' + e), this.setHtml(e)
		}
	}, r.prototype.setHtml = function(t) {
		this.isInput ? this.element.value = t : this.element.innerHTML = t
	}, t.fn.button = function(t) {
		var e = [];
		return this.each(function() {
			var i = this.mui_plugin_button;
			if (!i) {
				var n = this.getAttribute("data-loading-text"),
					a = this.getAttribute("data-loading-icon"),
					l = this.getAttribute("data-loading-icon-position");
				this.mui_plugin_button = i = new r(this, {
					loadingText: n,
					loadingIcon: a,
					loadingIconPosition: l
				})
			}(t === o || t === s) && i.setState(t), e.push(i)
		}), 1 === e.length ? e[0] : e
	}
}(mui, window, document), function(t, e, i, n) {
	var s = 30,
		o = 90,
		a = 40,
		r = 10,
		l = t.rad2deg = function(t) {
			return t / (Math.PI / 180)
		},
		c = (t.deg2rad = function(t) {
			return t * (Math.PI / 180)
		}, navigator.platform.toLowerCase()),
		u = navigator.userAgent.toLowerCase(),
		h = (u.indexOf("iphone") > -1 || u.indexOf("ipad") > -1 || u.indexOf("ipod") > -1) && (c.indexOf("iphone") > -1 || c.indexOf("ipad") > -1 || c.indexOf("ipod") > -1),
		d = t.Picker = function(t, e) {
			var i = this;
			i.holder = t, i.options = e || {}, i.init(), i.initInertiaParams(), i.calcElementItemPostion(!0), i.bindEvent()
		};
	d.prototype.findElementItems = function() {
		var t = this;
		return t.elementItems = [].slice.call(t.holder.querySelectorAll("li")), t.elementItems
	}, d.prototype.init = function() {
		var t = this;
		t.list = t.holder.querySelector("ul"), t.findElementItems(), t.height = t.holder.offsetHeight, t.r = t.height / 2 - r, t.d = 2 * t.r, t.itemHeight = t.elementItems.length > 0 ? t.elementItems[0].offsetHeight : a, t.itemAngle = parseInt(t.calcAngle(.8 * t.itemHeight)), t.hightlightRange = t.itemAngle / 2, t.visibleRange = o, t.beginAngle = 0, t.beginExceed = t.beginAngle - s, t.list.angle = t.beginAngle, h && (t.list.style.webkitTransformOrigin = "center center " + t.r + "px")
	}, d.prototype.calcElementItemPostion = function(t) {
		var e = this;
		t && (e.items = []), e.elementItems.forEach(function(i) {
			var n = e.elementItems.indexOf(i);
			if (e.endAngle = e.itemAngle * n, i.angle = e.endAngle, i.style.webkitTransformOrigin = "center center -" + e.r + "px", i.style.webkitTransform = "translateZ(" + e.r + "px) rotateX(" + -e.endAngle + "deg)", t) {
				var s = {};
				s.text = i.innerHTML || "", s.value = i.getAttribute("data-value") || s.text, e.items.push(s)
			}
		}), e.endExceed = e.endAngle + s, e.calcElementItemVisibility(e.beginAngle)
	}, d.prototype.calcAngle = function(t) {
		var e = this,
			i = b = parseFloat(e.r);
		t = Math.abs(t);
		var n = 180 * parseInt(t / e.d);
		t %= e.d;
		var s = (i * i + b * b - t * t) / (2 * i * b),
			o = n + l(Math.acos(s));
		return o
	}, d.prototype.calcElementItemVisibility = function(t) {
		var e = this;
		e.elementItems.forEach(function(i) {
			var n = Math.abs(i.angle - t);
			n < e.hightlightRange ? i.classList.add("highlight") : n < e.visibleRange ? (i.classList.add("visible"), i.classList.remove("highlight")) : (i.classList.remove("highlight"), i.classList.remove("visible"))
		})
	}, d.prototype.setAngle = function(t) {
		var e = this;
		e.list.angle = t, e.list.style.webkitTransform = "perspective(1000px) rotateY(0deg) rotateX(" + t + "deg)", e.calcElementItemVisibility(t)
	}, d.prototype.bindEvent = function() {
		var e = this,
			i = 0,
			n = null,
			s = !1;
		e.holder.addEventListener(t.EVENT_START, function(t) {
			s = !0, t.preventDefault(), e.list.style.webkitTransition = "", n = (t.changedTouches ? t.changedTouches[0] : t).pageY, i = e.list.angle, e.updateInertiaParams(t, !0)
		}, !1), e.holder.addEventListener(t.EVENT_END, function(t) {
			s = !1, t.preventDefault(), e.startInertiaScroll(t)
		}, !1), e.holder.addEventListener(t.EVENT_CANCEL, function(t) {
			s = !1, t.preventDefault(), e.startInertiaScroll(t)
		}, !1), e.holder.addEventListener(t.EVENT_MOVE, function(t) {
			if (s) {
				t.preventDefault();
				var o = (t.changedTouches ? t.changedTouches[0] : t).pageY,
					a = o - n,
					r = e.calcAngle(a),
					l = a > 0 ? i - r : i + r;
				l > e.endExceed && (l = e.endExceed), l < e.beginExceed && (l = e.beginExceed), e.setAngle(l), e.updateInertiaParams(t)
			}
		}, !1), e.list.addEventListener("tap", function(t) {
			elementItem = t.target, "LI" == elementItem.tagName && e.setSelectedIndex(e.elementItems.indexOf(elementItem), 200)
		}, !1)
	}, d.prototype.initInertiaParams = function() {
		var t = this;
		t.lastMoveTime = 0, t.lastMoveStart = 0, t.stopInertiaMove = !1
	}, d.prototype.updateInertiaParams = function(t, e) {
		var i = this,
			n = t.changedTouches ? t.changedTouches[0] : t;
		if (e) i.lastMoveStart = n.pageY, i.lastMoveTime = t.timeStamp || Date.now(), i.startAngle = i.list.angle;
		else {
			var s = t.timeStamp || Date.now();
			s - i.lastMoveTime > 300 && (i.lastMoveTime = s, i.lastMoveStart = n.pageY)
		}
		i.stopInertiaMove = !0
	}, d.prototype.startInertiaScroll = function(t) {
		var e = this,
			i = t.changedTouches ? t.changedTouches[0] : t,
			n = t.timeStamp || Date.now(),
			s = (i.pageY - e.lastMoveStart) / (n - e.lastMoveTime),
			o = s > 0 ? -1 : 1,
			a = 6e-4 * o * -1,
			r = Math.abs(s / a),
			l = s * r / 2,
			c = e.list.angle,
			u = e.calcAngle(l) * o,
			h = u;
		return c + u < e.beginExceed && (u = e.beginExceed - c, r = r * (u / h) * .6), c + u > e.endExceed && (u = e.endExceed - c, r = r * (u / h) * .6), 0 == u ? void e.endScroll() : void e.scrollDistAngle(n, c, u, r)
	}, d.prototype.scrollDistAngle = function(t, e, i, n) {
		var s = this;
		s.stopInertiaMove = !1, function(t, e, i, n) {
			var o = 13,
				a = n / o,
				r = 0;
			!
			function t() {
				if (!s.stopInertiaMove) {
					var n = s.quartEaseOut(r, e, i, a);
					return s.setAngle(n), r++, r > a - 1 || n < s.beginExceed || n > s.endExceed ? void s.endScroll() : void setTimeout(t, o)
				}
			}()
		}(t, e, i, n)
	}, d.prototype.quartEaseOut = function(t, e, i, n) {
		return -i * ((t = t / n - 1) * t * t * t - 1) + e
	}, d.prototype.endScroll = function() {
		var t = this;
		if (t.list.angle < t.beginAngle) t.list.style.webkitTransition = "150ms ease-out", t.setAngle(t.beginAngle);
		else if (t.list.angle > t.endAngle) t.list.style.webkitTransition = "150ms ease-out", t.setAngle(t.endAngle);
		else {
			var e = parseInt((t.list.angle / t.itemAngle).toFixed(0));
			t.list.style.webkitTransition = "100ms ease-out", t.setAngle(t.itemAngle * e)
		}
		t.triggerChange()
	}, d.prototype.triggerChange = function(e) {
		var i = this;
		setTimeout(function() {
			var n = i.getSelectedIndex(),
				s = i.items[n];
			!t.trigger || n == i.lastIndex && e !== !0 || t.trigger(i.holder, "change", {
				index: n,
				item: s
			}), i.lastIndex = n, "function" == typeof e && e()
		}, 0)
	}, d.prototype.correctAngle = function(t) {
		var e = this;
		return t < e.beginAngle ? e.beginAngle : t > e.endAngle ? e.endAngle : t
	}, d.prototype.setItems = function(t) {
		var e = this;
		e.items = t || [];
		var i = [];
		e.items.forEach(function(t) {
			null !== t && t !== n && i.push("<li>" + (t.text || t) + "</li>")
		}), e.list.innerHTML = i.join(""), e.findElementItems(), e.calcElementItemPostion(), e.setAngle(e.correctAngle(e.list.angle)), e.triggerChange(!0)
	}, d.prototype.getItems = function() {
		var t = this;
		return t.items
	}, d.prototype.getSelectedIndex = function() {
		var t = this;
		return parseInt((t.list.angle / t.itemAngle).toFixed(0))
	}, d.prototype.setSelectedIndex = function(t, e, i) {
		var n = this;
		n.list.style.webkitTransition = "";
		var s = n.correctAngle(n.itemAngle * t);
		if (e && e > 0) {
			var o = s - n.list.angle;
			n.scrollDistAngle(Date.now(), n.list.angle, o, e)
		} else n.setAngle(s);
		n.triggerChange(i)
	}, d.prototype.getSelectedItem = function() {
		var t = this;
		return t.items[t.getSelectedIndex()]
	}, d.prototype.getSelectedValue = function() {
		var t = this;
		return (t.items[t.getSelectedIndex()] || {}).value
	}, d.prototype.getSelectedText = function() {
		var t = this;
		return (t.items[t.getSelectedIndex()] || {}).text
	}, d.prototype.setSelectedValue = function(t, e, i) {
		var n = this;
		for (var s in n.items) {
			var o = n.items[s];
			if (o.value == t) return void n.setSelectedIndex(s, e, i)
		}
	}, t.fn && (t.fn.picker = function(t) {
		return this.each(function(e, i) {
			if (!i.picker) if (t) i.picker = new d(i, t);
			else {
				var n = i.getAttribute("data-picker-options"),
					s = n ? JSON.parse(n) : {};
				i.picker = new d(i, s)
			}
		}), this[0] ? this[0].picker : null
	}, t.ready(function() {
		t(".mui-picker").picker()
	}))
}(window.mui || window, window, document, void 0), function(t, e) {
	t.dom = function(i) {
		return "string" != typeof i ? i instanceof Array || i[0] && i.length ? [].slice.call(i) : [i] : (t.__create_dom_div__ || (t.__create_dom_div__ = e.createElement("div")), t.__create_dom_div__.innerHTML = i, [].slice.call(t.__create_dom_div__.childNodes))
	};
	var i = '<div class="mui-poppicker">\t\t<div class="mui-poppicker-header">\t\t\t<button class="mui-btn mui-poppicker-btn-cancel">取消</button>\t\t\t<button class="mui-btn mui-btn-blue mui-poppicker-btn-ok">确定</button>\t\t\t<div class="mui-poppicker-clear"></div>\t\t</div>\t\t<div class="mui-poppicker-body">\t\t</div>\t</div>',
		n = '<div class="mui-picker">\t\t<div class="mui-picker-inner">\t\t\t<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\t\t\t<ul class="mui-pciker-list">\t\t\t</ul>\t\t\t<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\t\t</div>\t</div>';
	t.PopPicker = t.Class.extend({
		init: function(n) {
			var s = this;
			s.options = n || {}, s.options.buttons = s.options.buttons || ["取消", "确定"], s.panel = t.dom(i)[0], e.body.appendChild(s.panel), s.ok = s.panel.querySelector(".mui-poppicker-btn-ok"), s.cancel = s.panel.querySelector(".mui-poppicker-btn-cancel"), s.body = s.panel.querySelector(".mui-poppicker-body"), s.mask = t.createMask(), s.cancel.innerText = s.options.buttons[0], s.ok.innerText = s.options.buttons[1], s.cancel.addEventListener("tap", function(t) {
				s.hide()
			}, !1), s.ok.addEventListener("tap", function(t) {
				if (s.callback) {
					var e = s.callback(s.getSelectedItems());
					e !== !1 && s.hide()
				}
			}, !1), s.mask[0].addEventListener("tap", function() {
				s.hide()
			}, !1), s._createPicker(), s.panel.addEventListener(t.EVENT_START, function(t) {
				t.preventDefault()
			}, !1), s.panel.addEventListener(t.EVENT_MOVE, function(t) {
				t.preventDefault()
			}, !1)
		},
		_createPicker: function() {
			var i = this,
				s = i.options.layer || 1,
				o = 100 / s + "%";
			i.pickers = [];
			for (var a = 1; a <= s; a++) {
				var r = t.dom(n)[0];
				r.style.width = o, i.body.appendChild(r);
				var l = t(r).picker();
				i.pickers.push(l), r.addEventListener("change", function(t) {
					var i = this.nextSibling;
					if (i && i.picker) {
						var n = t.detail || {},
							s = n.item || {};
						i.picker.setItems(s.children);
						var o = e.querySelectorAll(".mui-picker");
						if ("undefined" != typeof s.children && 0 != s.children.length && "2" === s.key) {
							r.style.display = "block";
							for (var a = 0; a < o.length; a++) o[a].style.width = "33.3333%"
						} else {
							r.style.display = "none";
							for (var a = 0; a < o.length; a++) o[a].style.width = "50%"
						}
					}
				}, !1)
			}
		},
		setData: function(t) {
			var e = this;
			t = t || [], e.pickers[0].setItems(t)
		},
		getSelectedItems: function() {
			var t = this,
				e = [];
			for (var i in t.pickers) {
				var n = t.pickers[i];
				e.push(n.getSelectedItem() || {})
			}
			return e
		},
		show: function(i) {
			var n = this;
			n.callback = i, n.mask.show(), e.body.classList.add(t.className("poppicker-active-for-page")), n.panel.classList.add(t.className("active")), n.__back = t.back, t.back = function() {
				n.hide()
			}
		},
		hide: function() {
			var i = this;
			i.disposed || (i.panel.classList.remove(t.className("active")), i.mask.close(), e.body.classList.remove(t.className("poppicker-active-for-page")), t.back = i.__back)
		},
		dispose: function() {
			var t = this;
			t.hide(), setTimeout(function() {
				t.panel.parentNode.removeChild(t.panel);
				for (var e in t) t[e] = null, delete t[e];
				t.disposed = !0
			}, 300)
		}
	})
}(mui, document), function t(e, i, n) {
	function s(a, r) {
		if (!i[a]) {
			if (!e[a]) {
				var l = "function" == typeof require && require;
				if (!r && l) return l(a, !0);
				if (o) return o(a, !0);
				var c = new Error("Cannot find module '" + a + "'");
				throw c.code = "MODULE_NOT_FOUND", c
			}
			var u = i[a] = {
				exports: {}
			};
			e[a][0].call(u.exports, function(t) {
				var i = e[a][1][t];
				return s(i ? i : t)
			}, u, u.exports, t, e, i, n)
		}
		return i[a].exports
	}
	for (var o = "function" == typeof require && require, a = 0; a < n.length; a++) s(n[a]);
	return s
}({
	1: [function(t, e, i) {
		!
		function(t, e) {
			var i = {};
			i.HOST = "http://apigateway.blissmall.net", i.URL = i.HOST + "/api/front/v1/baseinfo", t.init(), t.ready(function() {
				function n(t) {
					return '<li><a href="javascript:void(0);" data-cityid="' + t.cityId + '" data-mappingurl="' + t.mappingUrl + '">' + t.cityName + "</a></li>";
				}
				function s() {
					//热门城市获取
					$.ajax({
						type: "GET",
						//url: i.URL + "/city/queryHotCityByouzan",
						url: "json/awesome.json",
						dataType: "json",
						contentType: "application/json",
						success: function(t) {
							if ("00000" == t.meta.code && t.data && t.data.length > 0) {
								var e = t.data,
									i = '<ul class="ui-hotCity">',
									s = '<ul class="ui-hotCity">',
									o = 6;
								e.length < o && (o = e.length);
								for (var a = 0; a < o; a++) 440300 == e[a].cityId && (b.mappingUrl = e[a].mappingUrl, b.isOpen = 0), a < 3 ? i += n(e[a]) : s += n(e[a]);
								i += "</ul>" + s + "</ul>", $("#fn-hotCities").append(i)
							}
						},
						error: function() {
							m("网络连接失败，获取热门城市失败，请刷新重试！")
						}
					})
				}
				function o() {
					try {
						//定义获取经纬度
						var t = new BMap.Geolocation;
						t.getCurrentPosition(function(t) {
							0 == this.getStatus() ? a(t.point.lng, t.point.lat) : r()
						}, {
							enableHighAccuracy: !0
						})
					} catch (t) {
						r()
					}
				}
				function a(t, e) {
					//解析城市信息
					var i = new BMap.Point(t, e),
						n = new BMap.Geocoder;
					n.getLocation(i, function(t) {
						if (null != t && null != t.addressComponents && null != t.addressComponents.city && "" != t.addressComponents.city) {
							var e = t.addressComponents.city;
							e = e.replace("市", ""), l(e)
						} else r()
					})
				}
				function r() {
					//热门城市获取
					g(), $.ajax({
						type: "GET",
						url: i.URL + "/city/autoPositionCity",
						dataType: "json",
						contentType: "application/json",
						success: function(t) {
							v(), null != t && null != t.data ? p(t) : p()
						},
						error: function() {
							v(), p()
						}
					})
				}
				function l(t) {
					//获取城市相关配置信息
					g();
					var e = {
						location: t
					};
					$.ajax({
						type: "GET",
						//url: i.URL + "/city/queryCityLocationByLocation",
						url: "json/detail.json",
						dataType: "json",
						contentType: "application/json",
						//data: e,
						success: function(t) {
							v();
							if(null != t && null != t.data) {
								for (var o in t.data){
									if(o == e.location) {
										p(t.data[o]);
										break;
									}
								}
							}else{
								p();
							}
						},
						error: function() {
							v(), p()
						}
					})
				}
				function c() {
					//
					return g(), (T = w()) ? (v(), void d()) : void $.ajax({
						type: "GET",
						//url: i.URL + "/city/queryOpenCities",
						url:"json/openCity.json",
						dataType: "json",
						contentType: "application/json",
						success: function(t) {
							v(), null != t && "00000" === t.meta.code && (T = t.data.mappings, T = h(T), y(T), d())
						},
						error: function(t) {
							v(), T = w(), T ? d() : m("网络连接失败，城市选择列表获取失败，请刷新重试！")
						}
					})
				}
				function u(t, e) {
					g();
					var n = {
						regionalismId: t,
						channel: 29,
						needHomePageShow: 0
					};
					$.ajax({
						type: "POST",
						url: i.URL + "/cityclosingconfig/queryCityClosingConfigDesc",
						data: JSON.stringify(n),
						dataType: "json",
						contentType: "application/json",
						success: function(t) {
							v(), "00000" == t.meta.code && null != t.data && null != t.data.controlUrl && "" != t.data.controlUrl ? window.location.href = t.data.controlUrl : window.location.href = e
						},
						error: function(t) {
							v(), window.location.href = e
						}
					})
				}
				function h(t) {
					var e = [],
						i = {},
						n = {},
						s = {};
					for (var o in t) {
						s = {}, s.text = o, s.children = [];
						for (var a in t[o]) {
							i = {}, i.text = a, i.key = "1", n = t[o][a];
							for (var r in n) if (i.isopen = n.isopen, i.cityid = n.cityid, i.value = n.mappingurl, i.key = "2", "undefined" != typeof n.counties) {
								var l = {};
								i.children = [];
								for (var c = 0; c < n.counties.length; c++) l = {
									text: n.counties[c].cityname,
									cityid: n.counties[c].cityid,
									isopen: n.counties[c].isopen,
									value: n.counties[c].mappingurl,
									key: "3"
								}, i.children.push(l)
							}
							if ("undefined" != typeof n.counties && "undefined" != typeof n.isopen && "undefined" != typeof n.mappingurl && 0 != n.counties.length && 0 == n.isopen && 0 != n.mappingurl.length) {
								var u = {
									text: n.cityname,
									cityid: n.cityid,
									isopen: n.isopen,
									value: n.mappingurl
								};
								i.children.push(u)
							}
							s.children.push(i)
						}
						e.push(s)
					}
					return e
				}
				function d() {
					function i() {
						c.show(function(t) {
							var e = {
								province: {
									name: (t[0] || {}).text
								},
								city: {
									name: (t[1] || {}).text,
									cityid: (t[1] || {}).cityid,
									isopen: (t[1] || {}).isopen,
									value: (t[1] || {}).value
								},
								area: {
									name: t[2] ? t[2].text : "",
									cityid: t[2] ? t[2].cityid : "",
									isopen: t[2] ? t[2].isopen : "",
									value: t[2] ? t[2].value : ""
								}
							};
							f(e)
						})
					}
					var n = T,
						s = e.getElementById("fn-provinceCmp"),
						o = e.getElementById("fn-cityCmp"),
						a = e.getElementById("fn-areaCmp"),
						r = s.innerHTML,
						l = o.innerHTML,
						c = (a.innerHTML, new t.PopPicker({
							layer: 3
						}));
					c.setData(n);
					for (var u = !1, h = 0; h < n.length && !u; h++) if (n[h].text == r) {
						c.pickers[0].setSelectedIndex(h);
						for (var d = 0; d < n[h].children.length; d++) if (n[h].children[d].text == l) {
							c.pickers[1].setSelectedIndex(d), u = !0;
							break
						}
					}
					s.addEventListener("tap", function(t) {
						i()
					}, !1), o.addEventListener("tap", function(t) {
						i()
					}, !1), a.addEventListener("tap", function(t) {
						i()
					}, !1)
				}
				function p(t) {
					//设置筛选框
					var e = $(".ui-locationCity"),
						i = $("#fn-provinceCmp"),
						n = $("#fn-cityCmp");
					t ? (e.data("mappingurl", (t.data || {}).mappingurl).data("isopen", (t.data || {}).isopen).data("cityid", (t.data || {}).cityid).html((t.data || {}).cityname), i.html((t.data || {}).provincename), n.data("mappingurl", (t.data || {}).mappingurl).data("isopen", (t.data || {}).isopen).data("cityid", (t.data || {}).cityid).html((t.data || {}).cityname)) : 
					(e.data("mappingurl", b.mappingUrl).data("isopen", b.isOpen).data("cityid", b.cityId).html(b.cityName), i.html(b.provinceName), n.data("mappingurl", b.mappingUrl).data("isopen", b.isOpen).data("cityid", b.cityId).html(b.cityName)), c()
				}
				function f(t) {
					$("#fn-provinceCmp").html(t.province.name), $("#fn-cityCmp").html(t.city.name).data("isopen", t.city.isopen).data("mappingurl", t.city.value).data("cityid", t.city.cityid), t.area.name ? ($("#fn-areaInput").show(), $("#fn-areaCmp").html(t.area.name).data("isopen", t.area.isopen).data("mappingurl", t.area.value).data("cityid", t.area.cityid)) : ($("#fn-areaInput").hide(), $("#fn-areaCmp").html("").data("isopen", "").data("mappingurl", "").data("cityid", ""))
				}
				function m(t) {
					var e = '<section class="ui-modal-cmp">\t\t\t\t\t<div class="ui-modal-body">\t\t\t\t\t\t<p class="ui-modal-head">温馨提示</p>\t\t\t\t\t\t<p class="ui-modal-tip">' + t + "</p>\t\t\t\t\t</div>\t\t\t\t</section>";
					$("body").append(e), $(".ui-modal-cmp").one("tap", function(t) {
						t.preventDefault(), t.stopPropagation(), $(this).remove()
					})
				}
				function g() {
					var t = '<section class="ui-modal">\t\t\t\t\t<div class="ui-modal-loading">\t\t\t\t\t\t<div class="ui-loading-tip">请稍候……</div>\t\t\t\t\t</div>\t\t\t\t</section>';
					$("body").append(t)
				}
				function v() {
					$(".ui-modal").remove()
				}
				function y(t) {
					localStorage.setItem(L, JSON.stringify(t)), localStorage.setItem(E, JSON.stringify((new Date).getTime()))
				}
				function w() {
					try {
						var t = localStorage.getItem(L),
							e = localStorage.getItem(E);
						return t = JSON.parse(t), e && (new Date).getTime() - JSON.parse(e) > 6e4 && (localStorage.removeItem(L), localStorage.removeItem(E), t = null, e = null), t
					} catch (t) {
						return v(), null
					}
				}
				var b = {
					mappingUrl: "",
					isOpen: 1,
					cityId: 440300,
					cityName: "深圳",
					provinceName: "广东省"
				},T = "";
				$(".ui-locationCity").on("tap", function(t) {
					t.preventDefault(), t.stopPropagation();
					var e = $(this).data("mappingurl"),
						i = $(this).data("isopen"),
						n = $(this).data("cityid");
					"undefined" != typeof i ? 0 == i ? u(n, e) : m("当前城市暂未开通，敬请期待！") : m("定位失败，请刷新页面！")
				}), $("#fn-confirmBtn").on("tap", function(t) {
					t.preventDefault(), t.stopPropagation();
					var e = $("#fn-areaInput"),
						i = $("#fn-areaCmp"),
						n = i.data("mappingurl"),
						s = i.data("cityid"),
						o = i.data("isopen");
					if ("none" != e.css("display")) {
						if (!n) return void m("请选择您当前购买的所在区域");
						0 == o ? u(s, n) : m("当前城市暂未开通，敬请期待！")
					} else {
						var a = $("#fn-cityCmp"),
							r = a.data("mappingurl"),
							l = a.data("cityid"),
							c = a.data("isopen");
						0 == c ? u(l, r) : m("当前城市暂未开通，敬请期待！")
					}
				}), $(".ui-footer").delegate(".ui-hotCity li a", "tap", function(t) {
					t.preventDefault(), t.stopPropagation();
					var e = $(this).data("cityid"),
						i = $(this).data("mappingurl");
					u(e, i)
				});
				var L = "citiesCache_201706091728",
					E = "citiesCacheTime_201706091728";
				s(), o()
			})
		}(mui, document)
	}, {}]
}, {}, [1]);