'use strict';

module.exports = function(grunt){

require('load-grunt-tasks')(grunt);

require('time-grunt')(grunt);

grunt.initConfig({

	watch: {
		compass: {
			files: ['sass/{,*/}*.scss'],
			tasks: ['compass:dist']
		},
		haml: {
			files: ['{,*/}*.haml', 'partials/*.haml'],
			tasks: ['haml']
		},
		js: {
            files: ['Gruntfile.js', 'js/{,*/}*.js'],
            tasks: ['jshint'],
            options: {
                livereload: true
               }
            },

		livereload: {
			options: {
				livereload: '<%= connect.options.livereload %>'
			},
			files: [
				'index.html',
				'partials/*.html',
				'css/*.css'
			]
		}
	},

	connect: {
		options: {
			port: 9000,
			livereload: 35729,
			hostname: 'localhost'
		},
		livereload: {
			options: {
				open:true,
			}
		}
	},

	compass: {
		dist: {
			options: {
				sassDir: 'sass',
				cssDir: 'css'
			}
		}
	},

	haml: {
		dist: {
			files: {
				'index.html': 'index.haml',
				'partials/tabs.html': 'partials/tabs.haml'
			}
		}
	},
	jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'js/main.js',
            ]
        },


});

grunt.registerTask('serve', function(target){
	grunt.task.run([
		'haml',
		'compass:dist',
		'connect:livereload',
		'watch'

	]);
});
};