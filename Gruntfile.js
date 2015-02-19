module.exports = function (grunt) {
    grunt.initConfig({
        cssmin: {
            target: {
                files: {
                    'build/css/style.css': [
                        'app/css/style.css'
                    ]
                }
            }
        },
        html2js: {
            options: {
                base: './',
                rename: function (moduleName) {
                    return './' + moduleName;
                },
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: ['app/module/**/**/*.html', 'app/module/**/**/**/*.html'],
                dest: 'build/app/templates.js'
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app/css/',
                        dest: 'build/css/',
                        src: [
                            'fonts/*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app/',
                        dest: 'build/app/',
                        src: [
                            'img/**/**/*.*'
                        ]
                    },
//                    {
//                        expand: true,
//                        dot: true,
//                        cwd: 'app/',
//                        dest: 'build/app/',
//                        src: [
//                            'scripts/*.json'
//                        ]
//                    },
//                    {
//                        expand: true,
//                        dot: true,
//                        cwd: 'app/',
//                        dest: 'build/app/',
//                        src: [
//                            'languages/*.*'
//                        ]
//                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '.',
                        src: 'index_prod.html',
                        dest: 'build/',
                        rename: function (dest, src) {
                            return dest + "index.html";
                        }
                    }, {
                        expand: true,
                        dot: true,
                        cwd: '.',
                        src: 'vendor/requirejs/require.js',
                        dest: 'build/app/',
                        rename: function (dest, src) {
                            return dest + "require.js";
                        }
                    }]
            }
        },
        requirejs: {
            options: {
                mainConfigFile: 'app/module/application/config/main.js',
                removeCombined: true,
                out: 'build/app/app.js',
                optimize: 'none',
                name: 'bootstrap'
            },
            dev: {
                options: {
                    optimize: 'none'
                }
            },
            release: {
                options: {
                    optimize: 'uglify'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('css', ['cssmin', 'copy:dist']);
    grunt.registerTask('templates', ['html2js']);
    grunt.registerTask('dev', ['requirejs:dev']);
    grunt.registerTask('release', ['cssmin', 'copy:dist', 'html2js', 'requirejs:release']);
};
