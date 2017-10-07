
  ! function() {
    var t = window.location.href.toLowerCase();
    if(-1 == t.indexOf("localhost") && -1 == t.indexOf("l.jimu.com") && -1 == t.indexOf("jimubox.com") && -1 == t.indexOf("qa-") && -1 == t.indexOf("gray") && -1 == t.indexOf("test") && -1 == t.indexOf("wf.") && -1 == t.indexOf("jmbx")) {
      window.JMAnalytics = {
        trackEvent: function(t, n, o, e) {
          if(_hmt.push(["_trackEvent", t || "", n || "", o || "", e || ""]), $ && $.ajax) {
            var c = "";
            c += "//campaigns.jimu.com/box/category/" + (t || "category"), c += "/action/" + (n || "action"), $.ajax({
              url: c,
              type: "GET"
            })
          }
        }
      };
      var n = function() {
          var t = {
            type: "text/javascript",
            async: "true",
            protocol: e
          };
          return {
            init: function(n, o) {
              var o = o || {},
                e = document.createElement("script");
              e.type = o.type || t.type, !1 === o.async ? e.async = !1 : e.async = !0, e.src = (o.protocol || t.protocol) + n, document.body.appendChild(e)
            }
          }
        },
        o = function() {
          var t = n();
          t.init("dn-growing.qbox.me/vds.js"), t.init("t.agrantsem.com/js/agt.js")
        };
      window.addEventListener ? window.addEventListener("load", o, !1) : window.attachEvent ? window.attachEvent("onload", o) : window.onload = o;
      var e = "https:" == document.location.protocol ? " https://" : " http://",
        c = document.getElementsByTagName("body")[0],
        a = document.createElement("script");
      a.src = e + "hm.baidu.com/hm.js?b52e68eb56d57aeecdafc769040770d4", c.appendChild(a);
      var i = document.createElement("script");
      i.src = e + "hm.baidu.com/hm.js?1dc096a18210fb74c17c2feb1eb75e9c", c.appendChild(i);
      var d = window.console || {
        log: function() {}
      };
      d && d.log && (d.log("加入积木，成为一名耐撕的前端工程师。"), d.log("请将简历发送至 %c hr#jimu.com (邮件标题请以“姓名-应聘前端工程师-来自console”命名)", "color:red"))
    } else window.JMAnalytics = {
      trackEvent: function() {}
    }
  }();
