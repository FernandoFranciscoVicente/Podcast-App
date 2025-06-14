//Nos permite extraer ciertas funciones de gulp desde node_modules
const { src, dest, watch, series } = require('gulp');

//Compilar CSS
const sass = require('gulp-sass')(require('sass'));

//Compilar imágenes
const imagemin = require('gulp-imagemin');

//Para compilar sass es necesario seguir 3 pasos:

function css(done){
    //1- Identificar el archivo principal
    console.log("Compilando scss...")
    src('src/scss/app.scss')
    //2- Compilar SASS
        .pipe(sass().on('error', sass.logError))
    //3- Exportalo o guardalo en una ubicación
        .pipe(dest('build/css'))     
        
    //Callback
    done();
}

//Agregar un watch (permite observar por cambios en ciertos archivos)
function dev( ){
    //Invocamos la función 'watch' extraído de gulp
    //Asignamos la ruta del archivo a observar
    //Asignamos qué función ejecutará cuando watch interprete cambios
    console.log("Watcheando los archivos scss...")
    watch('src/scss/**/*.scss', css);
}

//Minificación de imagenes
function imagenes(done){
    src('src/img/**/*')
        .pipe( imagemin({optimizationLevel: 3}))
        .pipe( dest('build/img'))
    //callback
    done();
}

exports.dev = dev;
exports.css = css;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);
