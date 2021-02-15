const {src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass');
const {init, stream, reload} = require('browser-sync');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');


// Static server
function server() {
	init({
		server: {
			baseDir: "dist"
		}
	});

	watch('src/*html').on('change', reload);
}

function styles() {
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
		.pipe(dest("dist/css"))
		.pipe(stream());
}

function html() {
	return src("src/*html")
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(dest("dist/"));
}

function scripts() {
	return src("src/js/**/*.js")
		.pipe(dest("dist/js"));
}

function fonts() {
	return src("src/fonts/**/*")
		.pipe(dest("dist/fonts"));
}

function icons() {
	return src("src/icons/**/*")
		.pipe(dest("dist/icons"));
}

function images() {
	src("src/img/**/*")
		.pipe(imagemin())
		.pipe(dest("dist/img"));
}

function mailer() {
	return src("src/mailer/**/*")
		.pipe(dest("dist/mailer"));
}

function tracking() {
	watch('src/sass/**/*.+(sass|scss)', styles);
	watch('src/*html').on('change', html);
}

exports.default = parallel(tracking, server, html, fonts, icons, images, styles, scripts, mailer);
