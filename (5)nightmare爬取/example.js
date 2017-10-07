var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false })

nightmare
  .goto('https://box.jimu.com/Venus/List')
  .evaluate(function () {
    var links = document.querySelectorAll(".project");//获取class=project的所有元素的集合
	var listArr = [];//数组
	var listObj = {};//对象
	var len = links.length;//class=project的元素的个数
	for(let i = 0;i<len ;i++){
		listObj.name = links[i].getElementsByClassName("title")[0].innerText;
		listObj.rate = links[i].getElementsByClassName("invest-item-profit")[0].innerText;
		listObj.mouth = links[i].getElementsByClassName("time-limit")[0].innerText;
		listObj.status = links[i].getElementsByClassName("status-blue")[0].innerText;
		listArr.push(listObj);
		listObj = {};
	}
	return listArr;
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
});