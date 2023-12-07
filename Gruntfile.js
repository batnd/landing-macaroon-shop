module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                },
                files : {
                    "src/css/style.css": "src/less/style.less"
                }
            },
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['src/less/*.less'],
                tasks: ['less'],
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};