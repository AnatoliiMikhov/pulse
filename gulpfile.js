const {src, dest, watch, parallel, series} = require('gulp');
const sass = require('gulp-sass');
const {init, stream, reload} = require('browser-sync');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

// Static server
function server(){
	init({
		server: {
			baseDir: "src"
		}
	});
};

function styles(){
	return src("src/sass/**/*.+(sass|scss)")
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({
			prefix: "",
			suffix: ".min",
		}))
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(sourcemaps.write('./'))
		.pipe(dest("src/css"))
		.pipe(stream());
};

function tracking(){
	watch('src/sass/**/*.+(sass|scss)', styles);
	watch('src/*html').on('change', reload)
};

exports.default = parallel(tracking, series(styles, server));
