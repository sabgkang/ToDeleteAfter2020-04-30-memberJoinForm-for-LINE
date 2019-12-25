function addCourse() {
  console.log("addCourse");

 if (!isLogin) {
   alert("必須登入後才能新增課程");
   return 0;
 }  

  courseNum++;
  $("#courseNumber").text("新增團課課程 - U" + zeroFill(courseNum, 4));

  $("#courseTable").hide();
  $("#courseHistoryTable").hide();
  $("#spacerBetweenTables").hide();

  $(".dataTables_filter").hide();
  $(".dataTables_info").hide();
  $('#courseTable_paginate').hide();
  $('#courseHistoryTable_paginate').hide();

  $("#addCourse").show();


  $("#inProgress").hide();
  $("#addCourseBtn").hide();
  $("#refreshBtn").hide();
  //      $("#addCourseBtn").attr("disabled", true);
  //      $("#refreshBtn").attr("disabled", true);
}

function courseConfirm() {
  console.log("courseConfirm");
  
 if (!isLogin) {
   alert("必須登入後才能新增課程");
   return 0;
 }

  var dataToAdd = [
            "U" + zeroFill(courseNum, 4),
            $("#courseName").val(),
            $("#coachName").val(),
            $("#courseTime").val(),
            $("#Calories").val(),
            $("#maxPersons").val(),
            $("#assistName").val(),
            $("#fee").val(),
            $("#otherDesc").val(),
          ];

  // 更新 local courseData
  courseData.push(dataToAdd);

  
  // 課程寫入資料庫
  database.ref('users/林口運動中心/團課課程').set({
    現在課程: JSON.stringify(courseData),
    過去課程: JSON.stringify(courseHistory),
  }, function(error){
      if (error) {
        console.log("Write to database error, revert courseData back");
        courseData.pop();
      }
        console.log('Write to database successful');
  });
       
  courseMember.push(["U" + zeroFill(courseNum, 4)]); 
  database.ref('users/林口運動中心/課程管理').set({
    課程會員: JSON.stringify(courseMember),
  }, function(error){
        if (error) {
          //console.log(error);
          return 0;
        }
          console.log('Write to database successful');
  });
  
  // 更新課程表格
  var courseTable = $('#courseTable').DataTable();
  courseTable.clear().draw();
  courseTable.rows.add(courseData);
  courseTable.draw();

  $("#addCourse").hide();
  $("#courseTable").show();
  $("#spacerBetweenTables").show();
  $("#courseHistoryTable").show();

  $(".dataTables_filter").show();
  $(".dataTables_info").show();
  $('#courseTable_paginate').show();
  $('#courseHistoryTable_paginate').show();

  $("#inProgress").show();
  $("#addCourseBtn").show();
  $("#refreshBtn").show();
  //      $("#addCourseBtn").attr("disabled", false);
  //      $("#refreshBtn").attr("disabled", false);      
}

function courseCancel() {
  console.log("courseCancel");
  courseNum--;
  $("#addCourse").hide();
  $("#spacerBetweenTables").show();
  $("#courseHistoryTable").show();
  $("#courseTable").show();

  $(".dataTables_filter").show();
  $(".dataTables_info").show();
  $('#courseTable_paginate').show();
  $('#courseHistoryTable_paginate').show();

  $("#inProgress").show();
  $("#addCourseBtn").show();
  $("#refreshBtn").show();
  //      $("#addCourseBtn").attr("disabled", false);
  //      $("#refreshBtn").attr("disabled", false);       
}

function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + ""; // always return a string
}

function refreshCourse() {
  console.log("Refresh Course");

  // TODO: 讀取 Database 的課程資料

  var courseTable = $('#courseTable').DataTable();
  courseTable.clear().draw();
  courseTable.rows.add(courseData);
  courseTable.draw();

  var courseTable = $('#courseHistoryTable').DataTable();
  courseTable.clear().draw();
  courseTable.rows.add(courseHistory);
  courseTable.draw();
}

function backToHome() {
  console.log("Refresh Course");

  $("#courseDetail").hide();

  $("#courseTable").show();
  $("#courseHistoryTable").show();
  $("#spacerBetweenTables").show();

  $(".dataTables_filter").show();
  $(".dataTables_info").show();
  $('#courseTable_paginate').show();
  $('#courseHistoryTable_paginate').show();
  $("#addCourse").hide();
  $("#inProgress").show();
  $("#addCourseBtn").show();
  $("#refreshBtn").show();
}

function logInAndOut() {
//  if (!isLogin) {
//    $("#password").val("");
//    $("#loginDiv").show();
//  } else {
//    firebase.auth().signOut();
  console.log(isLogin);
  if (!isLogin) {
    window.location.href = '0-login.html';
  } else {
    firebase.auth().signOut();
  }    
}

//function signIn() {
//  //check email
//  if (!validateEmail($("#emailAddress").val())) {
//    $("#emailAddress").val("");
//    $("#emailAddress").attr("placeholder", "Email Address Error, try again!");
//    $("#emailAddress").css("background-color", "yellow");
//  } else {
//    $("#loginDiv").hide();
//    firebase.auth().signInWithEmailAndPassword($("#emailAddress").val(), $("#password").val()).catch(function (error) {
//      // Handle Errors here.
//      var errorCode = error.code;
//      var errorMessage = error.message;
//      alert("Login Error! Try again!")
//    });
//  }
//
//}

//function validateEmail(email) {
//  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//
//  return re.test(String(email).toLowerCase());
//}
//
//
//function signInAbort() {
//  $("#loginDiv").hide();
//}

function addNewCoach() {
  console.log("Query and Check coach");
  
  var coachs = $('#coachList').DataTable();
  coachs.clear().draw();
  coachs.rows.add(coachSet);
  coachs.draw();  
  
  $("#addCourse").hide();  
  $("#coachTable").show();
  $("#coachList_paginate").css({"font-size": "16px"});

}

function backToAddCourse() {
  console.log("Back to AddCourse");
  
  $("#addCourse").show();  
  $("#coachTable").hide();
  $("#newCoachInfo").hide();
}

function goToAddCoach() {
  console.log("goto add new coach");
    
  $("#coachTable").hide();
  $("#newCoachInfo").show();
}
function addCoachInfo() {
  console.log("Add Coach Info");
  
  if ($("#newCoachName").val()=="") {
    alert("老師姓名不能為空白");
    return 0;
  }
  
  var dataToAdd = [
    $("#newCoachName").val(),
    $("#newCoachGender").val(),
    $("#newCoachOthers").val(),
  ];

  // 更新 local courseData
  coachSet.push(dataToAdd);
  
  // update database  
  database.ref('users/林口運動中心/教練管理').set({
    老師資料: JSON.stringify(coachSet),  
  }, function(error){
      if (error) {
        //console.log(error);
        return 0;
      }
        console.log('Write to database successful');
  });
  
  // update the form
  $("#coachName").val( $("#newCoachName").val());
  
  backToAddCourse();
}

function memberManage() {
  console.log("客戶管理");

 if (!isLogin) {
   alert("必須登入後才能進行客戶管理");
   return 0;
 } 
 
window.location.href = '1-addMember.html';
  
//  $("#memberDiv").show();
//  var memberTable = $('#memberTable').DataTable();
//  memberTable.clear().draw();
//  memberTable.rows.add(memberData);
//  memberTable.draw();
}

function closeMember()
{
  console.log("關閉客戶管理");
  
  $("#memberDiv").hide();  
}

function addMember(){
  console.log("新增客戶");
  
  $("#memberDiv").hide();
  $("#addMemberInfo").show();  
}

function closeAddMember(){
  console.log("close addMemberInfo");
  $("#addMemberInfo").hide();
  $("#memberDiv").show();
}

function addMemberInfo (){
  console.log("確定新增會員");
  
  if (!isLogin) {
    alert("必須登入後才能進行新增客戶");
    return 0;
  }   
  
  var dataToAdd = [
            $("#newMemberName").val(),
            $("#newMemberLINEId").val(),
            $("#newMemberGender").val(),
            $("#newMemberBirth").val(),
            $("#newMemberPhoneNum").val(),
            $("#newMemberIdNum").val(),
            $("#newMemberAssress").val(),
          ];

  //console.log(dataToAdd);
  
  // 更新 local courseData
  memberData.push(dataToAdd);

  
  // 會員資料寫入資料庫
  database.ref('users/林口運動中心/客戶管理').set({
    會員資料: JSON.stringify(memberData),
  }, function(error){
      if (error) {
        console.log("Write to database error");
        courseData.pop();
      }
        console.log('Write to database successful'); 
  });
                                       

  // 更新課程表格  
//  var memberTable = $('#memberTable').DataTable();
//  memberTable.clear().draw();
//  memberTable.rows.add(memberData);
//  memberTable.draw();  
//  
//  $("#addMemberInfo").hide();
//  $("#memberDiv").show();  
}