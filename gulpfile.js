// Hämta in Gulp och nödvändiga metoder
const { src, dest, parallel, series, watch } = require('gulp');

// Hämta in paketet Gulp-concat (för att slå ihop filer)
const concat = require('gulp-concat');

// Hämta in paketet Gulp-terser (för att minifiera JS-filer)
const terser = require('gulp-terser');

// Hämta in paketet Imagemin (för att komprimera bildfiler)
const imagemin = require('gulp-imagemin');

// Hämta in paketet BrowserSync för att kunna förhandsvisa i webbläsaren
const browserSync = require('browser-sync').create();

// Hämta in paketet Sourcemaps (för att kartlägga ursprungliga källkodsfiler)
const sourcemaps = require('gulp-sourcemaps');

// Hämta in compilator samt paket för SASS
const sass = require('gulp-sass')(require('sass'));

// Hämta in paket för Babel
const babel = require('gulp-babel');

// Definiera sökvägar för HTML-filer, CSS-filer, JavaScript-filer och bilder
const files = {
    // HTML
    htmlPath: "src/**/*.html",

    //SASS (OBS endast SCSS-filer)
    sassPath: "src/sass/*.scss",

    // JavaScript
    jsPath: "src/js/*.js",

    // Bilder
    imagePath: "src/images/*"
}

// Task för att kopiera alla existerande HTML-filer i src-mappen till pub-mappen
function copyHTML() {
    // Hämta sökvägen för HTML-källkodsfiler
    return src(files.htmlPath)

        // Placera dessa i pub-katalogen
        .pipe(dest('pub'));
}

// Task för att kompilera SASS till CSS och minifiera denna
function sassTask() {

    // Hämta sökvägen för SASS-källkodsfiler (OBS endast SCSS-filer)
    return src(files.sassPath)

        // Initiera Sourcemaps
        .pipe(sourcemaps.init())

        // Kompilera från SCSS till CSS-filer, skriv ut eventuella fel i terminalen
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))

        // Placera CSS-filer i pub-katalogen
        .pipe(dest('pub/css'))

        // Kör BrowserSync Stream för att uppdatera webbläsaren efter förändring
        .pipe(browserSync.stream());
}

// Task för att kopiera alla JavaScript-filer till pub-mappen, samt slå ihop JS-filerna till en och minifiera den
function copyJS() {
    // Hämta sökvägen för JavaScript-källkodsfiler
    return src(files.jsPath)

        // Initiera Sourcemaps
        .pipe(sourcemaps.init())

        // Transpilera med Babel
        .pipe(babel({
            presets: ["@babel/preset-env"]
          }))

        // Slå ihop flera JavaScript-filer till en med namnet main.js
        .pipe(concat('main.js'))

        // Minifiera JavaScript-filen
        .pipe(terser())

        // Skriv sourcemaps till katalogen "maps"
        .pipe(sourcemaps.write('../maps'))

        // Placera JavaScript-filen i pub-katalogen
        .pipe(dest('pub/js'));
}

// Task för att kopiera alla bilder till pub-mappen
function copyImages() {
    // Hämta sökvägen för bilder
    return src(files.imagePath)

        // Komprimera bilder
        .pipe(imagemin())

        // Placera bilder i pub-katalogen
        .pipe(dest('pub/images'));
}

// Task för att lyssna efter förändringar i källkodsfiler
function watchTask() {
    // Initiera BrowserSync
    browserSync.init({
        server: "./pub"
    });

    // Lyssna efter förändringar i källkodsfiler, i så fall kör "publiceringsfunktioner" samt ladda om BrowserSync
    watch([files.htmlPath, files.sassPath, files.jsPath, files.imagePath], parallel(copyHTML, sassTask, copyJS, copyImages)).on('change', browserSync.reload);
}

// Exportera funktionerna till Gulp-default för att kunna köra dessa utifrån. Kör stegen i serie efter varandra.
exports.default = series(
    // Kör funktionerna för att bl.a. minifiera och kopiera källkodsfilerna parallelt med varandra
    parallel(copyHTML, sassTask, copyJS, copyImages),

    // Kör watchTask för att lyssna efter förändringar i källkodsfilerna och kör BrowserSync
    watchTask
);