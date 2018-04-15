require.config({
	paths:{
		jquery:'../lib/jquery-3.2.1',
		xcarousel:'../lib/jquery-xcarousel/jquery.xCarousel',
		xzoom:'../lib/jquery-xZoom/jquery.xZoom',
		common:'common',
		header:'header'
	},
	shim:{
		xcarousel:['jquery'],
		xzoom:['jquery']
	}
	
})
