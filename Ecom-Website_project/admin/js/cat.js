let catData = [];

//  Add Category
const saveCat = () => {
  let allData = JSON.parse(localStorage.getItem("catInfo"));
  // console.log(allData);
  let len = allData != null ? allData.length + 1 : 1;

  let cname = document.catfrm.catname.value;
  let cid = document.catfrm.catid.value;

  if (cid != "") {
    // update
    let updatedData = allData.map((i) => {
      if (i.id == cid) {
        i.name = cname;
      }
      return i;
    });
    
    catData = updatedData;
  } else {
    // insert
    let obj = {
      id: len,
      name: cname,
    };
    catData.push(obj);
  }

  localStorage.setItem("catInfo", JSON.stringify(catData));
  document.catfrm.reset();
  document.catfrm.catid.value = "";
  disp();
};

// display all categories

const disp = () => {
  let allData = JSON.parse(localStorage.getItem("catInfo"));
  let tr = "";
  allData.map((i) => {
    tr += `<tr>
        <td>${i.id}</td>
        <td>${i.name}</td>
        <td class="d-flex "><button class = "btn btn-danger" onclick="editData(${i.id})">Edit</button>&nbsp;<button class = "btn btn-danger" onclick="deleteCat(${i.id})">Delete</button> </td>
        </tr>`;
  });
  document.getElementById("tblCatData").innerHTML = tr;
};

// Delete Category IdWise

let deleteCat = (id) => {
  let allData = JSON.parse(localStorage.getItem("catInfo"));
  let arr = allData.filter((i) => {
    return i.id != id;
  });
  let j = 1;
  let a = arr.map((i) => {
    i.id = j++;
    return i;
  });
  allData = a;
  localStorage.setItem("catInfo", JSON.stringify(allData));
  disp();
};

// edit data//
let editData = (id) => {
  let allData = JSON.parse(localStorage.getItem("catInfo"));
  let final_res = allData.find((i) => {
    return i.id == id;
  });
  document.catfrm.catname.value = final_res.name;
  document.catfrm.catid.value = id;
  disp();
};
disp();
