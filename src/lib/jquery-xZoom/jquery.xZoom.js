
;function magnifier(fatherName, MainWidth, MainHeight, img_src, SelectWidth, SelectHeight, BigBoxWidth) {
	var bei = (BigBoxWidth / SelectWidth);
	
	$(fatherName).html("<div class='magnifierMainBox'></div><div class='magnifierBigBox'></div>")
	$(".magnifierMainBox").css({
		"position": "relative",
		"width": MainWidth + "px",
		"height": MainHeight + "px",
		"border": "1px solid #eee",
		"box-size": "border-box"
	}).html("<img class='magnifierMainImg' src='" + img_src + "'/><div class='magnifierSelect'></div>");
	$(".magnifierMainImg").css({
		"width": "100%",
		"height": "100%"
	})
	
	$(".magnifierSelect").css({
		"display": "none",
		"position": "absolute",
		"width": SelectWidth + "px",
		"height": SelectHeight + "px",
		"background": "rgba(252,197,5,0.3)",
		"cursor": "move"
	});
	
	$(".magnifierBigBox").css({
		"display": "none",
		"background": "url(" + img_src + ")",
		"width": BigBoxWidth + "px",
		"height": BigBoxWidth * SelectHeight / SelectWidth + "px",
		"border": "1px solid #eee",
		"overflow": "hidden",
		"position": "relative",
		"left": MainWidth + "px",
		"top": -MainHeight - 2 + "px",
		"box-size": "border-box",
		"z-index": "99",
		"background-size": MainWidth * bei + "px " + MainHeight * bei + "px"
	})
	
	$(".magnifierMainBox").mouseenter(function() {
		$(".magnifierSelect").show();
		$(".magnifierBigBox").show();
	}).mousemove(function(e) {
		var e = e || window.event;
		var _left = e.pageX + $("body").scrollLeft() - $(".magnifierMainBox").offset().left - SelectWidth / 2;
		var _top = e.pageY + $("body").scrollTop() - $(".magnifierMainBox").offset().top - SelectHeight /2;
		if(_left < 0) {
			_left = 0;
		}
		if(_left > MainWidth - SelectWidth) {
			_left = MainWidth - SelectWidth;
		}

		if(_top < 0) {
			_top = 0;
		}
		if(_top > MainHeight - SelectHeight) {
			_top = MainHeight - SelectHeight;
		}
		$(".magnifierSelect").css({
			"left": _left + "px",
			"top": _top + "px"
		})
		$(".magnifierBigBox").css({
			"background-position": (-_left * bei) + "px " + (-_top * bei) + "px"
		})
	}).mouseleave(function() {
		$(".magnifierSelect").hide();
		$(".magnifierBigBox").hide();
	})
};