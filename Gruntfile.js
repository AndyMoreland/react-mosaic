module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify:{
        main: {
            src: 'dest/app.js',
            dest: 'dest/bundle.js'
        }
    },
    watch: {
        scripts : {
            files: ['dest/*.js','dest/**/*.js'],
            tasks: ['browserify'],
            options: {
                spawn: false
            }
        }
    }
  });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //grunt.registerTask('watch', ['browserify']);

    //grunt.registerTask('default', [/*'fixmyjs',*/'jshint', 'csscomb', 'concat', 'uglify', 'cssmin']);

    grunt.event.on('watch',function(action,filepath,target){
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
};