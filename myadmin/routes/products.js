var express = require("express");
var router = express.Router();
var http = require("http");
var fs = require("fs");
var fileUpload = require('express-fileupload');
var path = require('path');
const check = require('express-validator/check').check;
const validationResult = require('express-validator/check').validationResult;
var mv = require("mv");
var authentication_mdl = require("../middlewares/authentication");
var session_store;
/* GET product page. */

router.get("/", authentication_mdl.is_login, function (req, res, next) {
  req.getConnection(function (err, connection) {
    var query = connection.query(
      "SELECT * FROM sepatu",
      function (err, rows) {
        if (err) var errornya = ("Error Selecting : %s ", err);
        req.flash("msg_error", errornya);
        res.render("product/list", {
          title: "Sepatu",
          data: rows,
          session_store: req.session,
        });
      }
    );
    //console.log(query.sql);
  });
});

router.delete(
  "/delete/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.getConnection(function (err, connection) {
      var sepatu = {
        id: req.params.id,
      };
      var delete_sql = "DELETE from sepatu where ?";
      req.getConnection(function (err, connection) {
        var query = connection.query(
          delete_sql,
          sepatu,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Delete : %s ", err);
              req.flash("msg_error", errors_detail);
              res.redirect("/products");
            } else {
              req.flash("msg_info", "Delete Product Success");
              res.redirect("/products");
            }
          }
        );
      });
    });
  }
);
router.get(
  "/edit/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.getConnection(function (err, connection) {
      var query = connection.query("SELECT * FROM sepatu where id=" + req.params.id,
        function (err, rows) {
          if (err) {
            var errors_detail = ("Error Selecting : %s ", err);
            req.flash("msg_error", errors_detail);
            res.redirect("/products");
          } else {
            if (rows.length <= 0) {
              req.flash("msg_error", "Product tidak ditemukan!");
              res.redirect("/products");
            } else {
              console.log(rows);
              res.render("product/edit", {
                title: "Edit",
                data: rows[0],
                session_store: req.session,
              });
            }
          }
        }
      );
    });
  }
);
router.put(
  "/edit/(:id)",
  authentication_mdl.is_login,
  function (req, res, next) {
    req.assert("merk", "Harap isi merk!").notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
      v_merk = req.sanitize("merk").escape().trim();
      v_warna = req.sanitize("warna").escape().trim();
      v_ukuran = req.sanitize("ukuran").escape().trim();
      v_harga = req.sanitize("harga").escape();

      if (!req.files) {
        var sepatu = {
          merk: v_merk,
          warna: v_warna,
          ukuran: v_ukuran,
          harga: v_harga,
          };
      }else{
        var file = req.files.gambar;
        file.mimetype == "image/jpg";
        file.mv("public/images/upload/" + file.name);

      var sepatu = {
        merk: v_merk,
        warna: v_warna,
        ukuran: v_ukuran,
        harga: v_harga,
        gambar: file.name,
      }
      };

      var update_sql = "update sepatu SET ? where id = " + req.params.id;
      req.getConnection(function (err, connection) {
        var query = connection.query(
          update_sql,
          sepatu,
          function (err, result) {
            if (err) {
              var errors_detail = ("Error Update : %s ", err);
              req.flash("msg_error", errors_detail);
              res.render("product/edit", {
                merk: req.param("merk"),
                warna: req.param("warna"),
                ukuran: req.param("ukuran"),
                harga: req.param("harga"),
              });
            } else {
              req.flash("msg_info", "Update product success");
              res.redirect("/products/edit/" + req.params.id);
            }
          }
        );
      });
    } else {
      console.log(errors);
      errors_detail = "<p>Sory there are error</p><ul>";
      for (i in errors) {
        error = errors[i];
        errors_detail += "<li>" + error.msg + "</li>";
      }
      errors_detail += "</ul>";
      req.flash("msg_error", errors_detail);
      res.redirect("/products/edit/" + req.params.id);
    }
  }
);

router.post("/add", authentication_mdl.is_login, function (req, res, next) {
  req.assert("merk", "Please fill the merk").notEmpty();
  var errors = req.validationErrors();
  if (!errors) {
    v_merk = req.sanitize("merk").escape().trim();
    v_warna = req.sanitize("warna").escape().trim();
    v_ukuran = req.sanitize("ukuran").escape().trim();
    v_harga = req.sanitize("harga").escape();

    var file = req.files.gambar;
    file.mimetype == "image/jpg";
    file.mv("public/images/upload/" + file.name);

    var sepatu = {
      merk: v_merk,
      warna: v_warna,
      ukuran: v_ukuran,
      harga: v_harga,
      gambar: file.name,
    };
    
    var insert_sql = "INSERT INTO sepatu SET ?";
    req.getConnection(function (err, connection) {
      var query = connection.query(
        insert_sql,
        sepatu,
        function (err, result) {
          if (err) {
            var errors_detail = ("Error Insert : %s ", err);
            req.flash("msg_error", errors_detail);
            res.render("product/add-product", {
              merk: req.param("merk"),
              warna: req.param("warna"),
              ukuran: req.param("ukuran"),
              harga: req.param("harga"),
              session_store: req.session,
            });
          } else {
            req.flash("msg_info", "Create product success");
            res.redirect("/products");
          }
        }
      );
    });
  } else {
    console.log(errors);
    errors_detail = "<p>Sory there are error</p><ul>";
    for (i in errors) {
      error = errors[i];
      errors_detail += "<li>" + error.msg + "</li>";
    }
    errors_detail += "</ul>";
    req.flash("msg_error", errors_detail);
    res.render("product/add-product", {
      merk: req.param("merk"),
      ukuran: req.param("ukuran"),
      session_store: req.session,
    });
  }
});

router.get("/add", authentication_mdl.is_login, function (req, res, next) {
  res.render("product/add-product", {
    title: "Add New Product",
    merk: "",
    warna: "",
    harga: "",
    ukuran: "",
    session_store: req.session,
  });
});

module.exports = router;
