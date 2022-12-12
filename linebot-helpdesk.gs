function replyMsg(replyToken, Msg, channelToken) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': Msg
    })
  };
  UrlFetchApp.fetch(url, opt);
}

function pushMsg(usrId, Msg, channelToken) {
  var url = 'https://api.line.me/v2/bot/message/push';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'to': usrId,
      'messages': Msg
    })
  };
  UrlFetchApp.fetch(url, opt);
}

function doPost(e) {
  var value = JSON.parse(e.postData.contents);
  var events = value.events;
  if (events != null) {
    for (var i in events) {
      var event = events[i];
      var type = event.type;
      var channelToken = "Channel Access Token";
      var replyToken = event.replyToken;
      var sourceType = event.source.type;
      var userId = event.source.userId;
      var groupId = event.source.groupId;
      var timeStamp = event.timestamp;
      var url = "https://api.line.me/v2/bot/profile/"+userId;
      var headers = {
        "contentType": "application/json",
        "headers":{"Authorization": "Bearer "+channelToken}
      };
      var getprofile = UrlFetchApp.fetch(url, headers);
      var profiledata = JSON.parse(getprofile.getContentText());
      var displayName = profiledata.displayName;
      var statusMessage = profiledata.statusMessage;
      var pictureUrl = profiledata.pictureUrl;
      var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/....../edit");
      var sheet = ss.getSheetByName("SHEET NAME (HELPDESK)");
      var logUser = ss.getSheetByName("SHEET NAME (LogUsersId)");
      var date = Utilities.formatDate(new Date(), 'Asia/Bangkok', 'วันที่ dd / เดือน MM / ปี yyyy | เวลา HH:mm:ss');
      var uid = logUser.getRange(2, 1, logUser.getLastRow(),logUser.getLastColumn()).getValues();
      //ประเภทข้อความ
      switch (type) {
        case 'postback':
          break;
        case 'message':
          var messageType = event.message.type;
          var messageId = event.message.id;
          var messageText = event.message.text;

          if(messageText.indexOf("conf ")>-1){
            var confId = messageText.split(' ',2)[1];
            for(var i = 0;i<uid.length; i++){
              if(confId == uid[i][0]){
                logUser.getRange(i+2,5).setValue("TRUE");
                var mess = [{'type': 'text', 'text': 'ได้รับการยืนยันจากผู้ดูแล'}];
                pushMsg(confId, mess, channelToken);
              }
            }
          }

          for(var i = 0;i<uid.length; i++){
              if(userId == uid[i][0]){
                var checkconf = logUser.getRange(i+2,5).getValue();
                var mode = logUser.getRange(i+2,10).getValue();
                if(checkconf == true){
                var conff = true;
                }
              }
          }
          
          if(conff){

          if(messageText == "ยกเลิก"){
            for(var i = 0;i<uid.length; i++){
              if(userId == uid[i][0]){
                logUser.getRange(i+2,10).setValue("0");
                var mess = [{'type': 'text', 'text': "ยกเลิกการแจ้งปัญหาเรียบร้อย","quickReply": { 
                  "items": [
                    {
                      "type": "action",
                      "imageUrl": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
                      "action": {
                        "type": "message",
                        "label": "เมนูหลัก",
                        "text": "เมนูหลัก"
                      }
                    },{
                    "type": "action",
                    "imageUrl": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
                    "action": {
                      "type": "message",
                      "label": "แจ้งปัญหาการใช้งานอีกครั้ง",
                      "text": "แจ้งปัญหาการใช้งาน"
                    }
                  }]}}];
                replyMsg(replyToken, mess, channelToken);
              }
            }
          }
            if(messageText == "เมนูหลัก"){
              for(var i = 0;i<uid.length; i++){
                if(userId == uid[i][0]){
                  logUser.getRange(i+2,10).setValue("0");
                  var mess = [{'type': 'text', 'text': "เลือก Quick เมนูด้านล่าง","quickReply": { 
                    "items": [
                      {
                        "type": "action",
                        "imageUrl": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
                        "action": {
                          "type": "message",
                          "label": "เมนูหลัก",
                          "text": "เมนูหลัก"
                        }
                      },{
                        "type": "action",
                        "imageUrl": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
                        "action": {
                          "type": "message",
                          "label": "แจ้งปัญหาการใช้งานอีกครั้ง",
                          "text": "แจ้งปัญหาการใช้งาน"
                        }
                      },{
                        "type": "action",
                        "imageUrl": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
                        "action": {
                          "type": "message",
                          "label": "ราคาน้ำมันวันนี้",
                          "text": "ราคาน้ำมัน"
                        }
                      },{
                        "type": "action",
                        "imageUrl": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
                        "action": {
                          "type": "message",
                          "label": "ยกเลิก",
                          "text": "ยกเลิก"
                        }
                      }]}}];
                  replyMsg(replyToken, mess, channelToken);
                }
              }
            }
            
            else if(messageText == "แจ้งปัญหาการใช้งาน"){
              var mess = [{'type': 'text', 'text': "กรุณาระบุรายละเอียดของผู้แจ้ง\n-ชื่อผู้แจ้ง","quickReply": { 
                "items": [
                  {
                    "type": "action",
                    "imageUrl": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
                    "action": {
                      "type": "message",
                      "label": "ยกเลิก",
                      "text": "ยกเลิก"
                    }
                  }]}}];
              replyMsg(replyToken, mess, channelToken);
              for(var i = 0;i<uid.length; i++){
                if(userId == uid[i][0]){
                  logUser.getRange(i+2,10).setValue("1");
                }
              }
            }
            else if(mode == "1"){
              var mess = [{'type': 'text', 'text': "กรุณาระบุ\เบอร์โทรติดต่อ","quickReply": { 
                "items": [
                  {
                    "type": "action",
                    "imageUrl": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
                    "action": {
                      "type": "message",
                      "label": "ยกเลิก",
                      "text": "ยกเลิก"
                    }
                  }]}}];
              replyMsg(replyToken, mess, channelToken);
              for(var i = 0;i<uid.length; i++){
                if(userId == uid[i][0]){
                  logUser.getRange(i+2,10).setValue("2");
                  logUser.getRange(i+2,7).setValue(messageText); //ละเอียดของผู้แจ้ง
                }
              }
            }
            else if(mode == "2"){
              var mess = [{'type': 'text', 'text': "กรุณาระบุ\n-ปัญหาที่พบเจอ","quickReply": { 
                "items": [
                  {
                    "type": "action",
                    "imageUrl": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
                    "action": {
                      "type": "message",
                      "label": "ยกเลิก",
                      "text": "ยกเลิก"
                    }
                  }]}}];
              replyMsg(replyToken, mess, channelToken);
              for(var i = 0;i<uid.length; i++){
                if(userId == uid[i][0]){
                  logUser.getRange(i+2,10).setValue("3");
                  logUser.getRange(i+2,8).setValue(messageText); //ละเอียดของเบอร์โทรติดต่อ
                }
              }
            }
            else if(mode == "3"){
              var mess = [{'type': 'text', 'text': "กรุณายืนยันข้อมูลและกดบันทึก","quickReply": { 
                "items": [
                  {
                    "type": "action",
                    "imageUrl": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
                    "action": {
                      "type": "message",
                      "label": "บันทึก",
                      "text": "บันทึก"
                    }
                  },{
                    "type": "action",
                    "imageUrl": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
                    "action": {
                      "type": "message",
                      "label": "ยกเลิก",
                      "text": "ยกเลิก"
                    }
                  }
                ]}}];
              replyMsg(replyToken, mess, channelToken);
              for(var i = 0;i<uid.length; i++){
                if(userId == uid[i][0]){
                  logUser.getRange(i+2,10).setValue("4");
                  logUser.getRange(i+2,9).setValue(messageText); //ละเอียดของปัญหาการแจ้งงานของ Users
                }
              }
            }
            
            else if(mode == "4"){
              if(messageText == "บันทึก"){
                var mess = [{'type': 'text', 'text': "ได้รับข้อมูลของท่านแล้ว"}];
                replyMsg(replyToken, mess, channelToken);
                for(var i = 0;i<uid.length; i++){
                  if(userId == uid[i][0]){
                    logUser.getRange(i+2,10).setValue("0");
                    var img = '=IMAGE("'+pictureUrl+'")';
                    var data0 = logUser.getRange(i+2,1).getValue();
                    var data1 = logUser.getRange(i+2,7).getValue();
                    var data2 = logUser.getRange(i+2,8).getValue();
                    var data3 = logUser.getRange(i+2,9).getValue();
                    sheet.appendRow([date,data1,data2,data3,userId,displayName,img]);
                  }
                }
                // เมื่อ Users กด "บันทึก" จะมี Notify แจ้งไปยัง Admin (ผู้ดูแลระบบ) เมื่อมีการแจ้งปัญหาการใช้งาน
                var strToken = "Token ของ Line Notify";
                var options =
                    {
                      "method"  : "post",
                      "payload" : "message=" + date + "\n"+"ชื่อผู้แจ้ง : "+ data1 +"\n"+"เบอร์ผู้ติดต่อ : "+ data2 +"\n"+"ปัญหาที่แจ้งงาน : "+ data3 +"\n"+"DisplayName : "+ displayName +"\n",
                      "headers" : {"Authorization" : "Bearer "+ strToken}
                
                };
              
              UrlFetchApp.fetch("https://notify-api.line.me/api/notify",options);
              
            }else{
              logUser.getRange(i+2,10).setValue("0");
              }
            }
            // เมื่อ Users พิมพ์ "qr " จะแสดงผล QR Code ของ Users นั้นเอง เพื่อความสะดวกในการหา QR Code ของตัวเอง              
            if(messageText.indexOf("qr ")>-1){
              var cutmessage = messageText.split(' ',2)[1];
              var exqr = "https://chart.googleapis.com/chart?chs=150x150&choe=UTF-8&cht=qr&chl="+cutmessage
              var mess = [{'type': 'text', 'text': "นี่คือ QR Code : "+cutmessage+"\nของคุณ "+displayName}, {'type': 'image', 'originalContentUrl': exqr, 'previewImageUrl': exqr}];
              replyMsg(replyToken, mess, channelToken);
            }
          }
          break;
        case 'join':
          var mess = [{'type': 'text', 'text': "join"}];
          replyMsg(replyToken, mess, channelToken);
          break;
        case 'leave':
          var mess = [{'type': 'text', 'text': "leave"}];
          replyMsg(replyToken, mess, channelToken);
          break;
        case 'memberLeft':
          var mess = [{'type': 'text', 'text': "memberLeft"}];
          replyMsg(replyToken, mess, channelToken);
          break;
        case 'memberJoined':
          var mess = [{'type': 'text', 'text': "memberJoined"}];
          replyMsg(replyToken, mess, channelToken);
          break;
        case 'follow':
          var mess = [{'type': 'text', 'text': "อยู่ระหว่างการตรวจสอบและยืนยันจากผู้ดูแลระบบ"}];
          replyMsg(replyToken, mess, channelToken);
          for(var i = 0;i<uid.length; i++){
            if(userId == uid[i][0]){
              var already = true;
              logUser.getRange(i+2,2).setValue(displayName);
              logUser.getRange(i+2,3).setValue(statusMessage);
              logUser.getRange(i+2,4).setValue('=IMAGE("'+pictureUrl+'")');
            }
          }
          if(!already){
            var img = '=IMAGE("'+pictureUrl+'")';
            logUser.appendRow([userId, displayName, statusMessage, img, "false", date, "", "", "", "0"]);
            // UID ของ Admin (ผู้ดูแลระบบ) จะแจ้งเตือนในกรณี ที่มี Users Add Friend ใหม่เข้ามา ให้กด "ยืนยัน หรือ ยกเลิก"
            var admId1 = "UID Admin คนที่ 1";
            var admId2 = "UID Admin คนที่ 2";
            var mess = [{
              "type": "flex",
              "altText": "ยืนยันสมากชิกใหม่หรือไม่!!",
              "contents": {
                "type": "bubble",
                "hero": {
                  "type": "image",
                  "size": "full",
                  "aspectRatio": "20:13",
                  "aspectMode": "cover",
                  "url": pictureUrl
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "md",
                  "contents": [
                    {
                      "type": "text",
                      "text": displayName,
                      "size": "xl",
                      "weight": "bold",
                      "align": "center"
                    }
                  ]
                },
                "footer": {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "style": "primary",
                      "color": "#41A317",
                      "action": {
                        "type": "message",
                        "label": "ยืนยัน",
                        "text": "conf "+userId
                      },
                      "gravity": "center"
                    },
                    {
                      "type": "separator",
                      "margin": "sm"
                    },
                    {
                      "type": "button",
                      "style": "primary",
                      "color": "#9F000F",
                      "action": {
                        "type": "message",
                        "label": "ยกเลิก",
                        "text": "REJECT"
                      },
                      "gravity": "center"
                    }
                  ]
                }
              }
            }];
            pushMsg(admId1, mess, channelToken);
                        var mess = [{
              "type": "flex",
              "altText": "ยืนยันสมากชิกใหม่หรือไม่!!",
              "contents": {
                "type": "bubble",
                "hero": {
                  "type": "image",
                  "size": "full",
                  "aspectRatio": "20:13",
                  "aspectMode": "cover",
                  "url": pictureUrl
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "spacing": "md",
                  "contents": [
                    {
                      "type": "text",
                      "text": displayName,
                      "size": "xl",
                      "weight": "bold",
                      "align": "center"
                    }
                  ]
                },
                "footer": {
                  "type": "box",
                  "layout": "horizontal",
                  "contents": [
                    {
                      "type": "button",
                      "style": "primary",
                      "color": "#41A317",
                      "action": {
                        "type": "message",
                        "label": "ยืนยัน",
                        "text": "conf "+userId
                      },
                      "gravity": "center"
                    },
                    {
                      "type": "separator",
                      "margin": "sm"
                    },
                    {
                      "type": "button",
                      "style": "primary",
                      "color": "#9F000F",
                      "action": {
                        "type": "message",
                        "label": "ยกเลิก",
                        "text": "REJECT"
                      },
                      "gravity": "center"
                    }
                  ]
                }
              }
            }];
            pushMsg(admId2, mess, channelToken);
          }
          break;
        case 'unfollow':
          var mess = [{'type': 'text', 'text': "unfollow"}];
          replyMsg(replyToken, mess, channelToken);
          break;
        default:
          break;
      }
    }
  }
}
