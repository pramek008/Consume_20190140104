//* GET Data --------
function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:8080/book");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHtml = '';
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                trHtml += '<tr>';
                trHtml += '<td>' + object['id'] + '</td>';
                trHtml += '<td>' + object['namaBuku'] + '</td>';
                trHtml += '<td>' + object['kategori'] + '</td>';
                trHtml += '<td>' + object['penerbit'] + '</td>';
                trHtml += '<td>' + object['pengarang'] + '</td>';
                trHtml += '<td>' + object['harga'] + '</td>';
                trHtml += '<td><button type="button" class="btn btn-outline-secondary" onclick = "showUserEditBox(' + object['id'] + ')">Edit</button></td>';
                trHtml += '<td><button type="button" class="btn btn-outline-danger" onclick="userDelete(' + object['id'] + ')"> Del</button></td>';
                // trHtml += '<td><button type="button" class="btn btn-outline-success" onclick="showDialogDelete(' + object['id'] + ')"> Del</button></td>';
                trHtml += '</tr>';
            }
            document.getElementById("mytable").innerHTML = trHtml;
        }
    };
}
loadTable();
//* POST Data --------
function showUserCreateBox() {
    Swal.fire({
        title: 'Add Book',
        html: '<input id="id" type="hidden">' +
            '<input id="namaBuku" class="swal2-input" placeholder="Judul Buku">' +
            '<input id="kategori" class="swal2-input" placeholder="Kategori Buku">' +
            '<input id="penerbit" class="swal2-input" placeholder="Penerbit">' +
            '<input id="pengarang" class="swal2-input" placeholder="Pengarang Buku">' +
            '<input id="harga" class="swal2-input" placeholder="Harga Buku">',
        focusConfirm: false,
        preConfirm: () => { userCreate(); }
    })
}

function userCreate() {
    const namaBuku = document.getElementById("namaBuku").value;
    const kategori = document.getElementById("kategori").value;
    const penerbit = document.getElementById("penerbit").value;
    const pengarang = document.getElementById("pengarang").value;
    const harga = document.getElementById("harga").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:8080/book");
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.send(JSON.stringify({
        "namaBuku": namaBuku,
        "kategori": kategori,
        "penerbit": penerbit,
        "pengarang": pengarang,
        "harga": harga
    }));
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);
            loadTable();
        }
    }
}

//* PUT Data --------
function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:8080/book/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            const user = objects["user"];
            console.log(user);
            Swal.fire({
                title: 'Edit Book',
                html: '<input id="id" type="hidden" value="' + objects['id'] + '">' +
                    '<input id="namaBuku" class="swal2-input" placeholder="Judul Buku" value="' + objects['namaBuku'] + '">' +
                    '<input id="kategori" class="swal2-input" placeholder="Kategori Buku" value="' + objects['kategori'] + '">' +
                    '<input id="penerbit" class="swal2-input" placeholder="Penerbit" value="' + objects['penerbit'] + '">' +
                    '<input id="pengarang" class="swal2-input" placeholder="Pengarang Buku" value="' + objects['pengarang'] + '">' +
                    '<input id="harga" class="swal2-input" placeholder="Harga Buku" value="' + objects['harga'] + '">',
                focusConfirm: false,
                preConfirm: () => { userEdit(); }
            })
        }
    };
}

function userEdit() {
    const id = document.getElementById("id").value;
    const namaBuku = document.getElementById("namaBuku").value;
    const kategori = document.getElementById("kategori").value;
    const penerbit = document.getElementById("penerbit").value;
    const pengarang = document.getElementById("pengarang").value;
    const harga = document.getElementById("harga").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://127.0.0.1:8080/book/updatebook");
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.send(JSON.stringify({
        "id": id,
        "namaBuku": namaBuku,
        "kategori": kategori,
        "penerbit": penerbit,
        "pengarang": pengarang,
        "harga": harga
    }));
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);
            loadTable();
        }
    }
}

//* DELETE Data --------
// function showDialogDelete(id) {
//     console.log(id);
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "http://127.0.0.1:8080/book/" + id);
//     xhttp.send();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             const objects = JSON.parse(this.responseText);
//             const user = objects["user"];
//             console.log(user);
//             Swal.fire({
//                 title: 'Book with name : ' + id + ' is deleted',
//                 focusConfirm: true,
//                 preConfirm: () => { userDelete(); }
//             })
//         }
//     };
// }

function userDelete(id) {
    // const id = document.getElementById("id").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://127.0.0.1:8080/book/" + id);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.send(JSON.stringify({ "id": id }));
    xhttp.onreadystatechange = function() {
        if (this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects["message"]);
            loadTable();
        }
    }
}