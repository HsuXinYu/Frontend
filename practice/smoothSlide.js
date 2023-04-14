//設計a href錨點來切換至區塊位置，但因為切換沒有滑動效果，所以需要加再上動畫滾動效果
$(document).ready(function () {
  //要執行回到最上方
  $(".backTop").on("click", function () {
    $("html,body").animate(
      {
        scrollTop: 0, //回到第一個區塊
      },
      800
    );
  });
  //其它連到對應區塊
  $("a").on("click", function () {
    var hrefLink = $(this).attr("href");
    console.log(hrefLink);
    $("html,body").animate(
      {
        scrollTop: $(hrefLink).offset().top, //直接到相對位置
      },
      800
    );
  });
});
