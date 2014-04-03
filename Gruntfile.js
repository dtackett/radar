/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.    
    pkg: grunt.file.readJSON('package.json'),
    distdir: 'dist',
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>*/',
    clean: ['<%= distdir %>/*'],
    bower: {
      install: {     
        options: {
          cleanup: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },      
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['scripts/*.js']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    mocha: {
      index: [ 'test/runner/index.html' ]
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-bower-task');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('default', ['bower', 'jshint']);

  grunt.registerTask('test', ['bower', 'jshint', 'mocha']);

};
