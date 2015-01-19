module.exports = function(grunt) {

  // Project and task configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/development/materialMenu.js'],
        dest: 'js/production/materialMenu.js',
      },
    },
    uglify: {
      my_target: {
        files: {
          'js/production/materialMenu.min.js': ['js/production/materialMenu.js']
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'css/style.min.css': ['css/style.css']
        }
      }
    }
  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default tasks.
  grunt.registerTask('default', ['concat','uglify','cssmin']);

};