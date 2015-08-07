module.exports = function (grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-contrib-*', 'grunt-*']});

function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['dist'],
      tmp: '.tmp'
    },

    // Copy static files to dist folder
    copy: {
      dist: {
        expand: true,
        cwd: 'app',
        src: ['fonts/**/*', '*.html' ],
        dest: 'dist/'
      },
      tmp: {
        expand: true,
        cwd: 'app',
        src: ['images/**/*', 'fonts/**/*'],
        dest: '.tmp/'
      }
    },

    sass: {
      local: {
        files: {
          '.tmp/styles/main.css': 'app/styles/main.scss'
        }
      },
      dist: {
        files: {
          '.tmp/styles/main.css': 'app/styles/main.scss',
          '.tmp/styles/h5bp.css': 'app/styles/h5bp.css'

        }
      }
    },

    autoprefixer: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles',
          src: ['main.css', 'h5bp.css'],
          dest: '.tmp/styles'
        }]
      }
    },

    useminPrepare: {
      html: ['dist/*.html']
    },

    usemin:{
      html:['dist/*.html'],
      options: {
        blockReplacements: {
          livereload: function (block) {
            return null;
          }
        }
      }
    },

    imagemin: {
      static: {                          // Target
        options: {                       // Target options
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: '.tmp/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images'
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },

      styles: {
        files: ['app/styles/**/*.scss'],
        tasks: ['sass:local', 'autoprefixer:dist']
      },
      html: {
        files: ['app/*.html'],
      },
      scripts: {
        files: ['app/scripts/*.js']
      }
    },

    connect: {
      local: {
        options: {
          base: ['.tmp', './', 'app']
        }
      },
      dist: {
        options: {
          base: ['dist']
        }
      },
    },
    aws: grunt.file.readJSON(getUserHome() + '/.makapen/config.json'),
    s3: {
      options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        // this bucket is for production
        // bucket: "makapen.co",
        // this bucket is for staging
        bucket: "makapen",
        region: 'us-west-2'
      },
      build: {
        cwd: "dist/",
        src: "**"
      }
    }
  });

  grunt.registerTask('styles:local', ['sass:local']);
  grunt.registerTask('styles:dist', ['sass:dist']);

  grunt.registerTask('build', [
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'cssmin:generated',
    // 'filerev',
    'imagemin',
    'usemin'
  ]);

  grunt.registerTask('default', ['server']);
  grunt.registerTask('server', ['clean:tmp', 'styles:local', 'connect:local', 'watch']);
  grunt.registerTask('dist', ['clean', 'copy', 'styles:dist', 'build', 'connect:dist', 'watch']);
  grunt.registerTask('publish-staging', ['s3']);
  //grunt.registerTask('publish-production', ['s3']);

}
