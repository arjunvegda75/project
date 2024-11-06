let allcat = JSON.parse(localStorage.getItem("catInfo"));
let tr = `<option>--select Category--</option>`;
allcat.map((i) => {
  tr += `<option value="${i.id}">${i.name}</option>`;
});
// console.log(tr);
document.getElementById("prcat").innerHTML = tr;

let prData = []; //3
const savePr = () => {
  let allprData = JSON.parse(localStorage.getItem("prInfo"));
  let lnth = allprData != null ? allprData.length + 1 : 1;
  //1
  let catid = document.prfrm.prcat.value;
  let pname = document.prfrm.prname.value;
  let pprice = document.prfrm.prprice.value;
  let pimage = localStorage.getItem("productImage");
  let pdis = document.prfrm.prdis.value;

  let prdid = document.prfrm.prid.value;
  console.log(prdid);

  if (prdid != "") {
    let updatedData = allprData.map((i) => {
      if (i.id == prdid) {
        i.catid = catid;
        i.Name = pname;
        i.Price = pprice;
        i.productImg = pimage != null ? pimage : i.productImg;
        i.Dis = pdis;
      }
      return i;
    });
    prData = updatedData;
    document.prfrm.prid.value = "";
    console.log("updated data", updatedData);
  } else {
    let probj = {
      //2
      id: lnth,
      catid: catid,
      Name: pname,
      Price: pprice,
      productImg: pimage,
      Dis: pdis,
    };
    prData.push(probj);
    console.log("save data", prData);
  }
  localStorage.setItem("prInfo", JSON.stringify(prData));
  document.prfrm.reset();
  document.prfrm.prid.value = "";
  document.getElementById("image").src = "";
  localStorage.removeItem("productImage");
  disp();
};

let disp = () => {
  let allprData = JSON.parse(localStorage.getItem("prInfo"));
  let tr = "";
  // let categoryName = "No Category";
  allprData.map((i) => {
    allcat.map((j) => {
      if (j.id == i.catid) {
        i.cname = j.name;
      }
      return i;
    });

    tr += `<tr>
        <td>${i.id}</td>
        <td>${i.cname}</td>
        <td>${i.Name}</td>
        <td>${i.Price}</td>
         <td><img src=${i.productImg} height="50px" width="50px"></td>
        <td class="d-flex "><button class = "btn btn-danger" onclick="editData(${i.id})"><i class=" fa fa-pen"></i></button>&nbsp;<button class = "btn btn-danger" onclick="delprData(${i.id})">De</button></td></tr>`;
  });
  document.getElementById("tblPrData").innerHTML = tr;
};

const delprData = (id) => {
  let allprData = JSON.parse(localStorage.getItem("prInfo"));
  let newallprData = allprData.filter((i) => {
    return i.id != id;
  });

  let j = 1;
  let prarr = newallprData.map((i) => {
    i.id = j++;
    return i;
  });
  localStorage.setItem("prInfo", JSON.stringify(prarr));
  disp();
};

const editData = (id) => {
  let allprData = JSON.parse(localStorage.getItem("prInfo"));
  let result_Data = allprData.find((i) => {
    return i.id == id;
  });
  document.prfrm.prid.value = result_Data.id;
  document.prfrm.prcat.value = result_Data.catid;
  document.prfrm.prname.value = result_Data.Name;
  document.prfrm.prprice.value = result_Data.Price;
  document.getElementById("image").src = editedVal.productImg;
  document.prfrm.prdis.value = result_Data.Dis;

  document.prfrm.prid.value = id;
  disp();
};

const dispImage = (event) => {
  var reader = new FileReader();
  reader.onload = function () {
    document.getElementById("image").src = reader.result;
    localStorage.setItem("productImage", reader.result);
  };
  reader.readAsDataURL(event.target.files[0]);
};

disp();
// console.log(i);

// let temp = allcat.filter((j) => {
//   if (j.id == i.Category) {
//     categoryName = j.name;
//     return j;
//   }
// });

// categoryName = temp[0].name;
// console.log(categoryName);
