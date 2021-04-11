// Grunt 的入口文件
// 需要定义一些需要Grunt自动执行的任务

module.exports = (grunt) => {
  // grunt.registerTask('foo', () => {
  //   console.log('grunt');
  // });

  // grunt.registerTask('bar', '任务描述', () => {
  //   console.log('bar');
  // });

  // grunt.registerTask('err', () => {
  //   console.log('err');
  //   return false;
  // });

  // grunt.registerTask('async-task', function () {
  //   const done = this.async();
  //   setTimeout(() => {
  //     console.log('async task working');
  //     done();
  //   }, 1000);
  // });

  // grunt.registerTask('default', ['foo', 'err', 'bar']);

  grunt.initConfig({
    build: {
      options: {
        compress: true,
      },
      src: '/src',
      entry: './index',
    },
    clean: {
      temp: 'temp/**'
    }
  });

  grunt.registerMultiTask('build', function () {
    console.log(this.options())
    console.log(`target: ${this.target}, data: ${this.data}`);
  });

  grunt.loadNpmTasks('grunt-contrib-clean')
};
