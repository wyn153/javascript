class GoodsList {
  constructor() {
    this.getData();
    this.getNum();
  }
  // 获取数据的方法
  async getData() {
    let { meta, data } = await axios.get(baseUrl + "server.php?fn=lst");
    //console.log(meta, data);
    if (meta.status != 200) return;
    let html = "";
    // 循环服务器返回的数据
    data.forEach((ele) => {
      //  console.log(ele);
      let { id, goodsName, goodsImg, price } = ele;
      html += `<div class="shop-box">
      <a href="javascript:" id="InitCartUrl" class="btn-special1 btn-lg" onclick="GoodsList.addCart(${id},1)">加入购物车</a>
      </div>`;
    });
    // 追加到页面
    $("#cont").innerHTML=html;
    // console.log(html);
  }
  // 加入购物车的方法
  static addCart(gId, num) {
    //  console.log(gId, num);
    // 1 获取local中的数据
    let goodsData = localStorage.getItem("cart");

    // 2 判断cart这个key是否有数据
    if (goodsData) {
      // 有数据
      // 2-1 转化为对象
      goodsData = JSON.parse(goodsData);
      // 商品是否存在的状态
      let state = true;
      // console.log(goodsData);
      // 2-2 当前添加的商品,是否存在于购物车
      goodsData.forEach((goodsObj, key) => {
        // console.log(goodsObj);
        if (goodsObj.id == gId) {
          // 2-3 商品存在则直接更新数量
          goodsData[key].num = goodsData[key].num - 0 + num;
          state = false;
        }
      });
      //2-4 商品不存在则添加
      state && goodsData.push({ id: gId, num });
      // console.log(goodsData);
      // 2-5 存储到local
      localStorage.setItem("cart", JSON.stringify(goodsData));
    } else {
      // 没数据
      // 3 构造数据存进去
      goodsData = [{ id: gId, num: num }];
      // console.log(goodsData);
      localStorage.setItem("cart", JSON.stringify(goodsData));
    }
    location.reload();
  }
  
  // 更新顶端数量方法
  getNum(){
    let n = -10;
    let goodsData = localStorage.getItem("cart");
    goodsData = JSON.parse(goodsData);
    goodsData.forEach((gObj) => {
      n += gObj.num - 0;
      // console.log(gObj.num - 0);
    });
    $(".gouwc span").innerHTML = n;
  }
}
new GoodsList();
