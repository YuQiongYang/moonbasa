let gulp = require('gulp');
let sass = require('gulp-sass');

//sass->css
gulp.task('compileSass',function(){
	//先查找sass文件所在目录
	gulp.src('./src/sass/*.scss')//返回文件流

	//scss->css
	.pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))

	//输出到硬盘
	.pipe(gulp.dest('./src/css'))
});

// 监听文件修改，自动执行编译任务
gulp.task('jtSass',function(){
	gulp.watch('./src/sass/*.scss',['compileSass'])
})

gulp.task('default',['server']);


// js压缩
// let uglify = require('gulp-uglify');
// let pump = require('pump');
// let concat = require('gulp-concat');
// let rename = require('gulp-rename');

// gulp.task('compressJs',function(cb){
// 	// gulp.src('./src/js/**/*.js')

// 	// .pipe(uglify())

// 	// // 输出到构建目录
// 	// .pipe(gulp.dest('./dist/js/'))

// 	pump([
// 		gulp.src('./src/js/*.js'),

// 		// 合并
// 		concat('index.js'),
// 		gulp.dest('./dist/js/'),

// 		// 压缩
// 		uglify(),

// 		// 重命名
// 		rename({
// 			suffix:'.min'
// 		}),

// 		gulp.dest('dist/js/')
// 	],cb );
// });

// 自动刷新服务器
let browserSync = require('browser-sync');

// 静态服务器
gulp.task('server',()=>{
	browserSync({
		// 服务器路径
		// server:'./src/',

		// 代理服务器
		proxy:'http://localhost:9774',

		// 端口
		// port:0704,

		// 监听文件修改，自动刷新
		files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
	});

	// 监听sass文件修改，并自动编译
	gulp.watch('./src/sass/*.scss',['compileSass'])
})