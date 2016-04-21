module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat:{
            options : {
                sourceMap: true
            },
            css: {
                src: 'src/css/*.css',
                dest: 'dist/css/styles.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('concat-css','concat');
};