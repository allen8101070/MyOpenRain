$( document ).ready(function() {
  $(".search").on("click", function(event) {
    //阻止原本button的搜尋功能
    //event.preventDefault();
    $(".content").html("");
    var div = $("<div></div>").addClass("cssloading");
    var cssload = $("<div class='cssload-container'></div>").appendTo(div);
    var c1 = $("<div class='cssload-speeding-wheel'></div>").appendTo(cssload);
    $("<h2>" + "載入資料中...." + "</h2>").appendTo(div);
    div.appendTo(".content");

    var url = "http://opendata.epa.gov.tw/ws/Data/RainTenMin/?format=json";
    $.ajax({
      url: url,
      type: "get",
      dataType: "jsonp",

      success: function(data) {
        var city = $("#city").val();
        //var thisData = JSONP.parse(data);
        console.log("AJAX讀取成功");

        //內容清空
        $(".content").html("");
        var table = $("<table></table>").addClass(
          "table table-bordered mytable"
        );
        var thead = $(
          "<thead>" +
            "<tr>" +
            "<th>" +
            "縣市" +
            "</th>" +
            "<th>" +
            "鄉鎮" +
            "</th>" +
            "<th>" +
            "地區" +
            "</th>" +
            "<th>" +
            "10分鐘內" +
            "</th>" +
            "<th>" +
            "1小時內" +
            "</th>" +
            "<th>" +
            "3小時內" +
            "</th>" +
            "<th>" +
            "6小時內" +
            "</th>" +
            "<th>" +
            "12小時內" +
            "</th>" +
            "<th>" +
            "24小時內" +
            "</th>" +
            "<th>" +
            "今日累積" +
            "</th>" +
            "</tr>" +
            "</thead>"
        ).appendTo(table);

        var tbody = $("<tbody></tbody>").appendTo(table);
        $(".content").append(table);

        for (i = 0; data.length > i; i++) {
          if (city == data[i].County) {
            str =
              "<tr>" +
              "<td>" +
              data[i].County +
              "</td>" +
              "<td>" +
              data[i].Township +
              "</td>" +
              "<td>" +
              data[i].SiteName +
              "</td>" +
              "<td>" +
              data[i].Rainfall10min +
              "mm" +
              "</td>" +
              "<td>" +
              data[i].Rainfall1hr +
              "mm" +
              "</td>" +
              "<td>" +
              data[i].Rainfall3hr +
              "mm" +
              "</td>" +
              "<td>" +
              data[i].Rainfall6hr +
              "mm" +
              "</td>" +
              "<td>" +
              data[i].Rainfall12hr +
              "mm" +
              "</td>" +
              "<td>" +
              data[i].Rainfall24hr +
              "mm" +
              "</td>" +
              "<td>" +
              data[i].Now +
              "mm" +
              "</td>" +
              "</tr>";

            $(tbody).append(str);
          }
        }
      },
      error: function() {
        console.log("要求讀取政府資料失敗,請重新整理或洽開發人員");
      }
    });
  });
});