function ajax_submit( form_, callbacks_ )
{
 // フォームの指定が無ければ即時返却
 if( $.trim( form_ ).length <= 0 ) return;
 
 // コールバックのデフォルト値を設定
 var defaults = {
  'begin'   : function(){},
  'success'  : analyzeCallback,
  'error'   : function(){},
  'complete'  : function(){},
 };
 // デフォルト値とマージ
 var callbacks = $.extend( defaults, callbacks_ );
 
 // 開始コールバックを起動
 callbacks['begin']();
 
 // フォームオブジェクトを取得
 var $form_obj  = $(form_);
 
 // フォームのデータを元にFormDataオブジェクトを作成
 var form_data  = new FormData( $form_obj[0] );
 
 // フォームのアクションを取得
 var action   = $form_obj.attr("action");
 
 // フォームのメソッドを取得
 var method   = $form_obj.attr("method");
 
 // 非同期通信
 $.ajax({
  url   : action,
  type  : method,
  processData : false,
  contentType : false,
  data  : form_data,
  enctype  : 'multipart/form-data',
  dataType : 'Json',
  success: function( result ){
   // 成功コールバックを起動
   callbacks['success'](result);
  },
  error: function(XMLHttpRequest, textStatus, errorThrown){
   // 失敗コールバックを起動
   callbacks['error'](XMLHttpRequest, textStatus, errorThrown);
  },
  complete : function( result ){
   // 完了コールバックを起動
   callbacks['complete'](result);
  }
 });
}

function analyzeCallback(result){
    $("#analyzeResult").text(JSON.stringify(result));
    // jsonを解析
    var obj = JSON.parse(JSON.stringify(result));
    //alert(obj[0].faceRectangle.height);
    /*for(var i = 0; i < obj.length; ++i){
        alert(obj[0].faceRectangle.left
                    +" / "+ obj[0].faceRectangle.top
                    +" / "+ obj[0].faceRectangle.height
                    +" / "+ obj[0].faceRectangle.width);
    }*/
    
    // オリジナルサイズに解析結果を反映
    var imageArray = [$('#img_area').attr('src'), './data/img01.png'];　// 読み込みたい画像のパスの配列
    var xhr = new XMLHttpRequest();
    xhr.open('GET', $('#img_area').attr('src'), true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        var bytes = new Uint8Array(this.response);
        var binaryData = "";
        for (var i = 0, len = bytes.byteLength; i < len; i++) {
            binaryData += String.fromCharCode(bytes[i]);
        }
        var bytes = new Uint8Array(this.response);
        if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[bytes.byteLength-2] === 0xff && bytes[bytes.byteLength-1] === 0xd9) {
            imgSrc = "data:image/jpeg;base64,";
        }
        else if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
            imgSrc = "data:image/png;base64,";
        }
        else if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
            imgSrc = "data:image/gif;base64,";
        }
        else if (bytes[0] === 0x42 && bytes[1] === 0x4d) {
            imgSrc = "data:image/bmp;base64,";
        }
        else {
            imgSrc = "data:image/unknown;base64,";
        }
        var image = new Image();
        image.src = imgSrc + window.btoa(binaryData);
        image.onload = function() {
            try {
                var canvas = document.getElementById('loadImage2');
                if (canvas.getContext) {
                    var context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0, image.width, image.height);
                    // 線を描画
                    //var w = 350;
                    //var h = 350;
                    //var top = 517;
                    //var left = 255;
                    context.beginPath();
                    //context.rect(left, top, h, w);
                    //context.drawImage('./data/img01.png', left, top, h, w);
                    //var w = 340;
                    //var h = 340;
                    //var top = 705;
                    //var left = 2150;
                    //context.rect(left, top, h, w);
                    
                    // 感情指数
                    var now_param;
                    // 感情番号 
                    var param_num; 
                    
                    for(var i = 0; i < obj.length; ++i){
                        // 感情によって色を変える
                        now_param = obj[i].scores.anger
                        param_num = 0;
                        if(now_param < obj[i].scores.contempt) {
                            now_param = obj[i].scores.contempt.toFixed(3);
                            context.strokeStyle = 'rgb(255, 0, 0)';
                        }
                        if(now_param < obj[i].scores.disgust) {
                            now_param = obj[i].scores.disgust.toFixed(3);
                            context.strokeStyle = 'rgb(255, 0, 0)';
                        }
                        if(now_param < obj[i].scores.fear) {
                            now_param = obj[i].scores.fear.toFixed(3);
                            context.strokeStyle = 'rgb(255, 0, 0)';
                        }
                        if(now_param < obj[i].scores.happiness) {
                            now_param = obj[i].scores.happiness.toFixed(3);
                            context.strokeStyle = 'rgb(0, 255, 0)';
                        }
                        if(now_param < obj[i].scores.neutral) {
                            now_param = obj[i].scores.neutral.toFixed(3);
                            context.strokeStyle = 'rgb(255, 255, 255)';
                        }
                        if(now_param < obj[i].scores.sadness) {
                            now_param = obj[i].scores.sadness.toFixed(3);
                            context.strokeStyle = 'rgb(0, 153, 255)';
                        }
                        if(now_param < obj[i].scores.surprise) {
                            now_param = obj[i].scores.surprise.toFixed(3);
                            context.strokeStyle = 'rgb(0, 255, 0)';
                        }
 
                        context.lineWidth = 10;
                        //context.strokeStyle = 'rgb(155, 187, 89)';
                        context.rect(obj[i].faceRectangle.left
                                   , obj[i].faceRectangle.top
                                   , obj[i].faceRectangle.height
                                   , obj[i].faceRectangle.width);
                        
                        var image1 = new Image();
                        image1.src = './images/img01.png';
                        image1.addEventListener('load', function() {
                            context.drawImage(image1
                                            , obj[i].faceRectangle.top, obj[i].faceRectangle.left
                                            , 350, 350);
                        }, false);
                    }
                    context.stroke();
                    context.restore();
                }
            } catch (exp) {
            // エラー処理
            return;
            }
        };
    };
    xhr.send();
    
    
    // 感情解析結果をもとに各配列に値をセット
    // 画像位置をセット
    // 感情解析結果に対する画像をセット
    
    // 生成した配列をもとに画像を合成
    
    // １枚の画像として取得
    /*var canvas = document.getElementById('loadImage2');
      if ( ! canvas || ! canvas.getContext ) { return false; }
      var ctx = canvas.getContext('2d');*/
      /* Imageオブジェクトを生成 */
      /*var img = new Image();
      //img.src = reader.result;
      var img_width = img.width;
      var img_height = img.height;
      /* 画像が読み込まれるのを待ってから処理を続行 */
      /*img.onload = function() {
          ctx.drawImage(img, 0, 0, 720, 480);
      }
      img.src = reader.result;*/
    // canvasへ再描画
    
}

// Resize Base64 Image
//   img_base64_src: string "data:image/png;base64,xxxxxxxx"
function ImgB64Resize(imgB64_src, width, height, callback) {
    // Image Type
    var img_type = imgB64_src.substring(5, imgB64_src.indexOf(";"));
    // Source Image
    var img = new Image();
    img.onload = function() {
        // New Canvas
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        // Draw (Resize)
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        // Destination Image
        var imgB64_dst = canvas.toDataURL(img_type);
        callback(imgB64_dst);
    };
    img.src = imgB64_src;
}

$(function() {
  $('input[type=file]').after('<span></span>');

  // アップロードするファイルを選択
  $('input[type=file]').change(function() {
    var file = $(this).prop('files')[0];

    // 画像以外は処理を停止
    if (! file.type.match('image.*')) {
      // クリア
      $(this).val('');
      $('#loadImage').html('');
      return;
    }

    // 画像表示
    var reader = new FileReader();
    reader.onload = function() {
      var img_src = $('<img>').attr('src', reader.result).attr('height',"256").attr('id',"img_area");
      $('#loadImage').html(img_src);
      
      /*var canvas = document.getElementById('loadImage2');
      if ( ! canvas || ! canvas.getContext ) { return false; }
      var ctx = canvas.getContext('2d');*/
      /* Imageオブジェクトを生成 */
      /*var img = new Image();
      //img.src = reader.result;
      var img_width = img.width;
      var img_height = img.height;
      /* 画像が読み込まれるのを待ってから処理を続行 */
      /*img.onload = function() {
          ctx.drawImage(img, 0, 0, 720, 480);
      }
      img.src = reader.result;*/
      
    }
    reader.readAsDataURL(file);
  });
});
