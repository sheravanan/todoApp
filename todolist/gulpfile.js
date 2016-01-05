var gulp = require("gulp");
var connect = require("gulp-connect");
var uglify = require("gulp-uglify");

//create gulp server

gulp.task("server", function(){

	connect.server({
		root : "./",
		livereload :true
	});
});
// live reload task created

gulp.task("livereload",function (){

	return gulp.src(["directive/**", "!bower_components","!node_modules"])
	.pipe(connect.reload());
})
// js minified
gulp.task("minified", function (){

gulp.src("js/**/*.js").
	pipe(uglify()).
	pipe(gulp.dest("build/"));

});
// watches the live-reload 
gulp.task("watcher", function (){
return gulp.watch(["./**/*"],["livereload"]);
});

gulp.task("default", ["server","watcher","minified"]);