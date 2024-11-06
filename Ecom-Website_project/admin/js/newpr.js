let allcat = JSON.parse(localStorage.getItem("catInfo"));
let pr = `<option>--select Category--</option>`;
allcat.map((i) => {
  pr += `<option >${i.name}</option>`;
});
console.log(pr);
document.getElementById("prcat").innerHTML = pr;

let prData = [];
const savePr = () => {
  console.log("hello");

  let allData = JSON.parse(localStorage.getItem("proData"));
  console.log(allData);
  let len = allData != null ? allData.length + 1 : 1;

  let idPro = document.prfrm.prid.value;
  let catPro = document.prfrm.prcat.value;
  let namePro = document.prfrm.prname.value;
  let pricePro = document.prfrm.prprice.value;
  let imagePro = document.prfrm.primg.value;
  let disPro = document.prfrm.prdis.value;

  let objPr = {
    id: len,
    cat: catPro,
    name: namePro,
    price: pricePro,
    image: imagePro,
    dis: disPro,
  };
  prData.push(objPr);

  localStorage.setItem("proData", JSON.stringify(prData));
  document.prfrm.reset();
  disply();
};

const disply = () => {
  let prData = JSON.parse(localStorage.getItem("proData"));
  let tr = "";
  prData.map((i) => {
    tr += `<tr>
        <td>${i.id}</td>
        <td>${i.cat}</td>
        <td>${i.name}</td>
        <td>${i.price}</td>
        <td>image</td>
        <td class="d-flex "><button class = "btn btn-danger" onclick="editData(${i.id})"><i class=" fa fa-pen"></i></button>&nbsp;<button class = "btn btn-danger" onclick="delprData(${i.id})">De</button></td></tr>`;
  });

  document.getElementById("tblPrData").innerHTML = tr;
};

const delprData = (id) => {
  let allData = JSON.parse(localStorage.getItem("proData"));

  let newData = allData.filter((i) => {
    return i.id != id;
  });
  let j = 1;
  let allnewData = newData.map((i) => {
    i.id = j++;
    return i;
  });
  allData = allnewData;
  localStorage.setItem("proData", JSON.stringify(allData));
  disply();
};

const editData = (id) => {
  let allData = JSON.parse(localStorage.getItem("proData"));

  let result = allData.find((i) => {
    return i.id == id;
  });
  document.prfrm.prid.value = result.id;
  document.prfrm.prcat.value = result.cat;
  document.prfrm.prname.value = result.name;
  document.prfrm.prprice.value = result.price;
  document.prfrm.primage.value = result.image;
  document.prfrm.prdis.value = result.dis;
};
disply();
