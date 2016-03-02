/*
 * ファイルアップロード処理
 */
(function() {
// require
    var oxford = require('project-oxford') // project-oxford用のNodeModule

    // クライントを生成する
    var oxfordClient = new oxford.Client('f85def3a201a406c8aafc76e8ccec6fc');

    /**
     * 感情解析処理を呼び出す
     */
    exports.analyzeEmotion = function(imageFileName, resultCallBack){
        
        // 感情を解析する
        oxfordClient.emotion.analyzeEmotion({
            path: imageFileName,
        }).then(function (response) {
            resultCallBack(response)
        });
        
    };        


    // イメージファイル受信処理 //
    exports.post = function (req, res) {
    
        // アップロードされたファイルパスを取得する(一時ファイル名になっている)
        var tempFilePath = req.file.path;
        
        // 感情解析関数を呼び出す //
        exports.analyzeEmotion(tempFilePath, function(response) {
        
            // 解析に成功したとき JSON形式で返却する //
            res.json(response);
            console.log("感情解析結果");
            console.log(JSON.stringify(response));
            
        });
        
    };
    
})();