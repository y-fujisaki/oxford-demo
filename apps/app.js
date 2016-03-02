/**
 * 顔感情判定App
 */

// require定義
var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var http       = require('http');
var multer     = require('multer');
var app        = express(); 

// ViewEngine定義
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// App設定
app.use(express.static('public')); // 静的ファイルの提供パス
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// multer(ファイルアップロード用のパーサー)をシングルファイル(post名=upload_image)で利用する
app.use(multer({ dest: './uploads/'}).single("upload_image"));

// ルーティングの設定
var routes = {
    index  : require('./routes/index'), // 初期表示用
    upload : require('./routes/upload') // ファイルアップロード用
};

// URLのパスをルーティングを割り当てる
app.use('/', routes.index);                      　　// ルートURLにroutes.Indexを割り当てる
app.post('/upload', routes.upload.post); // uploadladにrotes.upload.postを割り当てる

// モジュールにAppを設定する //
module.exports = app;
 
// サーバのポートを設定する
app.set('port', 3000);

// App用のHttpサーバーを起動する //
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});