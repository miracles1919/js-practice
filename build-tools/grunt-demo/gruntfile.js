const sass = require('node-sass');
const loadGruntTasks = require('load-grunt-tasks');

module.exports = (grunt) => {
  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      dist: {
        files: {
          'dist/index.css': 'src/index.scss',
        },
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'dist/index.js': 'src/index.js'
        }
      }
    }

    //grunt-contrib-watch
  })


  loadGruntTasks(grunt)

  grunt.registerTask('default', ['sass', 'babel'])
}