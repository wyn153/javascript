class Cart {
  constructor() {
    this.getCartGoods();
    this.checkAllGoods();
    this.checkOneGoodsClick();
  }

  // 1 获取购物车中商品数据
  async getCartGoods() {
    //2 取出local中数据,拿出id
    let goodsData = localStorage.getItem("cart");
    // 2-1,判断是否有数据
    if (!goodsData) return;
    let goodsIdStr = "";
    // 转化数据，拿到id
    let tmpIdNum = {};
    // 2-2 转化为json字符串 并且遍历拿到id
    JSON.parse(goodsData).forEach((goodsObj) => {
      //  拿到商品的id，和数量存储
      tmpIdNum[goodsObj.id] = goodsObj.num;
      goodsIdStr += goodsObj.id + ",";
    });
    //console.log(goodsIdStr);

    // 发送ajax请求
    let { meta, data } = await axios.post(
      baseUrl + "cart.php?fn=lst",
      "goodsId=" + goodsIdStr
    );
    if (meta.status != 200) return;
    // console.log(goodsData);
    let html = "";
    // console.log(tmpIdNum);

    data.forEach((ele) => {
      let { id, goodsName, goodsImg, price } = ele;
      let goodsNum = tmpIdNum[id];
      html += `<tr>
        <td class="checkbox">
          <input class="check-one check" type="checkbox" />
        </td>
        <td class="goods">
          <img src="${goodsImg}" alt="" />
          <span>小米全面屏电视E32C   <br>  灰色 32英寸</span>
        </td>
        <td class="price">${price}</td>
        <td class="count">
          <span class="reduce" onclick="Cart.subGoodsNum(this,${id},${price})">-</span>
          <input class="count-input" type="text" value="${goodsNum}" />
          <span class="add" onclick="Cart.addGoodsNum(this,${id},${price})">+</span>
        </td>
        <td class="subtotal">${(goodsNum * price).toFixed(2)}</td>
        <td class="operation">
          <span class="delete" onclick="Cart.deleGoodsNum(this,${id},${price})">删除</span>
        </td>
      </tr>`;
    });
    $("tbody").innerHTML = html;
  }

  // 全选的实现
  checkAllGoods() {
    //1 获取全选按钮
    let checkAll = $$(".check-all");

    //console.log(checkAll);
    // 2 给按钮绑定点击事件
    let state = "";
    checkAll[0].onclick = (eve) => {
      // console.log(eve.target.checked);
      state = eve.target.checked;
      this.checkOneGoods(state, 1);
    };

    checkAll[1].onclick = (eve) => {
      state = eve.target.checked;
      this.checkOneGoods(state, 0);
    };
  }
  // 单个商品和另一个全选的选中
  checkOneGoods(state, another) {
    $$(".check-one").forEach((v) => {
      // 设置单个商品状态跟随全选
      v.checked = state;
    });

    $$(".check-all")[another].checked = state;

    // 统计数量和价格的
    Cart.totalPriceNum();
  }
  // 点击单个商品选中

  checkOneGoodsClick() {
    // 使用事件委托,将check-one的点击绑定给tbody
    $("tbody").onclick = (eve) => {
      let target = eve.target;
      // console.log(target.className);
      // 判断当前点击的是否是input
      if (target.className != "check-one check") return;
      //console.log(target);
      // 如果当前点击的是选中
      if (target.checked) {
        // 遍历所有的input,判断状态
        let inputLeng = $$(".check-one").length;
        // 注意位数字的问题
        let res = Array.from($$(".check-one")).filter((input) => {
          return input.checked;
        });
        // console.log(res);
        //当选中的数量和页面中input的数量一致, 设置全选选中
        if (res.length == inputLeng) {
          $$(".check-all")[0].checked = true;
          $$(".check-all")[1].checked = true;
        }
      } else {
        // 有一个check-one取消则取消全选
        $$(".check-all")[0].checked = false;
        $$(".check-all")[1].checked = false;
      }
      Cart.totalPriceNum();
    };
  }

  // 统计数量和价格的方法
  static totalPriceNum() {
    // 保存数量的
    let totalNum = 0;
    // 保存小计的
    let totalPrice = 0;
    //1 循环遍历所以有的商品列表
    $$(".check-one").forEach((ele) => {
      // console.log(ele);
      // 2 获取当前选中的按钮
      if (ele.checked) {
        // 3 通过input找到tr
        let trObj = ele.parentNode.parentNode;
        //console.log(trObj);
        totalNum = trObj.querySelector(".count-input").value - 0 + totalNum;
        //  console.log(totalNum);
        totalPrice =
          trObj.querySelector(".subtotal").innerHTML - 0 + totalPrice;
      }
    });

    // console.log(totalNum, totalPrice);
    // 将小计和数量放到右下方
    $("#priceTotal").innerHTML = parseInt(totalPrice * 100) / 100;
    $("#selectedTotal").innerHTML = totalNum;
  }
  //增加商品数量
  static addGoodsNum(eve, goodsId, price) {
    // console.log(eve);
    // 获取当前商品数量
    let goodsNumEle = eve.previousElementSibling;
    //console.log(goodsNumEle);
    goodsNumEle.value = goodsNumEle.value - 0 + 1;
    //将商品数量更新到local
    let goodsData = localStorage.getItem("cart");
    if (!goodsData) return;
    goodsData = JSON.parse(goodsData);
    // 遍历local中存储的购物车数据,增加数量
    goodsData.forEach((goods) => {
      if (goods.id == goodsId) {
        // 找到当前增加数量的商品
        // 将input中值,设置给商品的num
        goods.num = goodsNumEle.value - 0;
      }
    });
    //  console.log(goodsData);
    // 将更新数量之后的数据,存在local中
    localStorage.setItem("cart", JSON.stringify(goodsData));

    // 更新小计
    let xjTotal = price * goodsNumEle.value;
    eve.parentNode.nextElementSibling.innerHTML = xjTotal.toFixed(2);

    Cart.totalPriceNum();
  }

  // 减少商品数量
  static subGoodsNum(eve, goodsId, price) {
    //获取当前商品的数量
    let goodsNumEle = eve.nextElementSibling;
    if (goodsNumEle.value == 0) {
      goodsNumEle.value = 0;
    } else {
      goodsNumEle.value = goodsNumEle.value - 0 - 1;
    }
    // 将商品数量更新到localStorage
    let goodsData = localStorage.getItem("cart");
    if (!goodsData) return;
    goodsData = JSON.parse(goodsData);
    // 遍历local中存储的购物车数据,增加数量
    goodsData.forEach((goods) => {
      if (goods.id == goodsId) {
        // 找到当前减少数量的商品
        // 将input中值,设置给商品的num
        goods.num = goodsNumEle.value - 0;
      }
    });
    // 将更新数量之后的数据,存在local中
    localStorage.setItem("cart", JSON.stringify(goodsData));
    // 更新小计
    let xjTotal = price * goodsNumEle.value;
    eve.parentNode.nextElementSibling.innerHTML = xjTotal.toFixed(2);
    // 调用统计方法更新设置
    Cart.totalPriceNum();
  }

  // 删除商品数量
  static deleGoodsNum(eve, goodsId) {
    // 找到父元素tr将其删除
    let trEle = eve.parentNode.parentNode;
    trEle.remove();
    // 获取local中的数据将点击的商品删除
    let goodsData = localStorage.getItem("cart");
    if (!goodsData) return;
    goodsData = JSON.parse(goodsData);
    goodsData.forEach((goods, keys) => {
      // 找到当前删除的商品,将其删除
      if (goods.id == goodsId) {
        goodsData.splice(keys, 1);
      }
    });
    // 将删除后的商品数据更新存入
    localStorage.setItem("cart", JSON.stringify(goodsData));
    // 调用统计方法更新设置
    Cart.totalPriceNum();
  }
}
new Cart();
