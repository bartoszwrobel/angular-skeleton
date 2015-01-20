module.exports = function (grunt) {
    grunt.initConfig({
//        cssmin: {
//            target: {
//                files: {
//                    'build/style.css': [
//                        'app/css/bootstrap.min.css'
//                    ]
//                }
//            }
//        },
//        html2js: {
//            options: {
//                base: 'app/module'
//            },
//            main: {
//                src: ['app/module/**/**/*.html', 'app/module/**/**/**/*.html'],
//                dest: 'build/templates.js'
//            },
//        },
//        copy: {
//            dist: {
//                files: [{
//                        expand: true,
//                        dot: true,
//                        cwd: 'app/css/',
//                        dest: 'build/',
//                        src: [
//                            'fonts/*.*'
//                        ]
//                    },
//                    {
//                        expand: true,
//                        dot: true,
//                        cwd: '.',
//                        src: 'index_prod.html',
//                        dest: 'build/',
//                        rename: function (dest, src) {
//                            return dest + "index.html";
//                        }
//                    }, {
//                        expand: true,
//                        dot: true,
//                        cwd: '.',
//                        src: 'vendor/requirejs/require.js',
//                        dest: 'build/',
//                        rename: function (dest, src) {
//                            return dest + "require.js";
//                        }
//                    }]
//            }
//        },
        requirejs: {
            options: {
                baseUrl: '/',
                //mainConfigFile: "app/module/application/config/main.js",
                paths: {
                    bootstrap: 'module/application/config/bootstrap',
                    domReady: 'vendor/requirejs-domready/domReady',
                    angular: 'vendor/angular/angular',
                    applicationConfig: 'module/application/config/config',
                    applicationController: 'module/application/controller/applicationController',
                    authConfig: 'module/auth/config/config',
                    authController: 'module/application/controller/authController',
                    'angular-route': 'vendor/angular-route/angular-route.min',
                    jquery: 'vendor/jquery/dist/jquery.min',
                    restangular: 'vendor/restangular/dist/restangular.min',
                    'ui-router': 'vendor/angular-ui-router/release/angular-ui-router.min',
                    underscore: 'vendor/underscore/underscore',
                    registerManager: 'module/application/service/registerManager',
                    routeManager: 'module/application/service/routeManager',
                    liveDirective: 'module/application/directive/live'
                },
                shim: {
                    angular: {exports: 'angular'},
                    'angular-route': ['angular'],
                    restangular: ['angular'],
                    'ui-router': ['angular'],
                    application: ['angular']
                },
                removeCombined: true,
                out: 'build/app.js',
                optimize: 'none',
                name: 'application/config/bootstrap'
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
//    grunt.loadNpmTasks('grunt-contrib-cssmin');
//    grunt.loadNpmTasks('grunt-contrib-copy');
//    grunt.loadNpmTasks('grunt-html2js');
//    grunt.registerTask('css', ['cssmin', 'copy:dist']);
//    grunt.registerTask('templates', ['html2js']);
    grunt.registerTask('dev', ['requirejs:dev']);
    grunt.registerTask('release', ['requirejs:release']);
};
