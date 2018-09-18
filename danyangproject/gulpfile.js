
let gulp = require("gulp");  //引入gulp模块
let minifyJS = require("gulp-babel-minify");  //引入编译压缩JS模块
let minifyCSS = require("gulp-clean-css");    //引入压缩CSS模块
let connec = require("gulp-connect");
let connect = require("gulp-connect-proxy");
let sass = require("gulp-sass");

gulp.task("build", ()=>{
  //压缩jS
  gulp.src("./project/**/*.js") //读取文件
      .pipe(minifyJS()) //编译压缩处理
      .pipe(gulp.dest("./dist")) //生成到指定目录
  //复制HTML
  gulp.src("./project/**/*.html")  //读取文件
      .pipe(gulp.dest("./dist"))  //生成到指定目录
  //压缩CSS
  gulp.src("./project/**/*.css") //读取文件
      .pipe(minifyCSS())  //压缩处理
      .pipe(gulp.dest("./dist"))  //生成到指定目录
});

gulp.task("refreshHTML", ()=>{
  gulp.src("./project/**/*.html")
      .pipe(gulp.dest("./dist"))        
      .pipe(connec.reload());
})

gulp.task("refreshCSS", ()=>{
  gulp.src("./project/**/*.css")
      .pipe(minifyCSS())
      .pipe(gulp.dest("./dist"))        
})

gulp.task("refreshJS", ()=>{
  gulp.src("./project/**/*.js")
      .pipe(minifyJS())
      .pipe(gulp.dest("./dist"))        
})
gulp.task("refreshsass", ()=>{
  gulp.src("./project/**/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("./dist"))        
})

gulp.task("server", ()=>{
  //创建一个服务器
  connec.server({
      root : "dist", //指定服务器根目录在哪
      port : 8080, 
      livereload : true  //服务器是否可以热部署（即时刷新）
  })

  //监听所有文件的变化， 执行相应的任务
})
gulp.task('server', function () {
    connec.server({
      root:"dist",
      port: 9000,
      livereload: true,
      middleware: function (connect, opt) {
        var Proxy = require('gulp-connect-proxy');
        opt.route = '/proxy';
        var proxy = new Proxy(opt);
        return [proxy];
      }
    });
  });


  gulp.watch("./project/**/*.html", ["refreshHTML"]);
  gulp.watch("./project/**/*.css", ["refreshCSS", "refreshHTML"]);
  gulp.watch("./project/**/*.scss", ["refreshsass", "refreshHTML"]);
  gulp.watch("./project/**/*.js", ["refreshJS","refreshHTML"]);