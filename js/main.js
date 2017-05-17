$(document).ready(function() {
  var sum_money;
  var sum_people;
  var min_money = 0.01;
  var remain_money;
  var remain_people;
  var arr;
  var goodluck_money;
  var goodluck_people;

  $("#all_in").click(function() {
    arr = new Array();
    init();
    while (remain_people > 0) {
      if (remain_people > 0) {
        onebyone();
      } else {
        $("#tips").text("红包已经领完啦");
      }
    }
    goodluck();
    showlist();
  });

  $("#count").click(function() {
    count();
  });

  // 初始化红包
  function init() {
    sum_money = $("#sum_money").val();
    sum_people = $("#sum_people").val();
    remain_money = sum_money;
    remain_people = sum_people;
  }

  // 获取单个红包的大小
  function getmoney(min) {
    var money;
    if (remain_people == 1) {
      // 如果剩余数量等于1,则将剩下的钱都返回.
      money = Math.floor(remain_money * 100) / 100;
      remain_money = 0;
      remain_people--;
    } else if (remain_people > 1) {
      // 如果剩余数量大于1,则取最小值至剩余平均值*2之间的任意一个值;
      min = min_money;
      var max = 2.0 * (remain_money / remain_people);
      money = max * Math.random();
      if (money < min)
        money = min;
      money = Math.floor(money * 100) / 100;
      remain_money = remain_money - money;
      remain_people--;
    } else {
      // 如果剩余数量等于0,则返回-1;
      money = -1;
    }
    return money;
  }

  // 一个一个抢红包方法
  function onebyone() {
    var money = getmoney(min_money);
    if (money == -1)
      $("#tips").text("红包已经领完啦");
    else
    // 将金额写入数组
      arr[sum_people - remain_people - 1] = money;
  }

  // 显示列表方法
  function showlist() {
    // var num = sum_people - remain_people;
    // var money;
    $("#list").empty();
    for (var i = 1; i < arr.length + 1; i++)
      $("#list").append('<div class="item"><pre>' + i + '&#9|' + arr[i - 1] + '</pre></div>');
    $("#list").append('<div class="item"><pre>全场最佳|第' + goodluck_people + '&#9|' + goodluck_money + '</pre></div>');

  }

  // 计算手气最佳
  function goodluck() {
    goodluck_people = 0;
    goodluck_money = min_money;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > goodluck_money) {
        goodluck_money = arr[i];
        goodluck_people = i + 1;
      }
    }
  }

  // 统计
  function count() {
    init();
    var arr2 = new Array();
    for (var i = 0; i < sum_people; i++)
      arr2[i] = 0;
    for (var i = 0; i < 100000; i++) {
      arr = new Array();
      init();
      while (remain_people > 0) {
        onebyone();
      }
      goodluck();
      // console.log(goodluck_people);
      arr2[goodluck_people - 1]++;
    }
    console.log(arr2);
  }


});