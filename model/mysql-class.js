// Generated by CoffeeScript 1.7.1
var config, connectionthis, copy_table, mysql, sql_count, sql_insert, sql_select, sql_update;

mysql = require('mysql');

config = require('../config').config;

connectionthis = function(callback) {
  var connection;
  connection = mysql.createConnection({
    host: config.mydb,
    user: config.db_user,
    password: config.db_passwd,
    database: config.db_database
  });
  connection.connect();
  callback.call(connection);
  return connection.end();
};

sql_select = function(options) {
  var $fields, $limit, $orderby, $sort, $sql, $tbname, $where;
  if (options.tbname != null) {
    $tbname = options.tbname;
  } else {
    $tbname = "test";
  }
  if (options.where != null) {
    $where = options.where;
  } else {
    $where = false;
  }
  if (options.limit != null) {
    $limit = options.limit;
  } else {
    $limit = false;
  }
  if (options.fields != null) {
    $fields = options.fields;
  } else {
    $fields = "*";
  }
  if (options.orderby != null) {
    $orderby = options.orderby;
  } else {
    $orderby = "id";
  }
  if (options.sorts != null) {
    $sort = options.sorts;
  } else {
    $sort = "DESC";
  }
  $sql = ("SELECT " + $fields + " FROM `" + $tbname + "` ") + ($where ? "WHERE " + $where : "") + (" ORDER BY " + $orderby + " " + $sort + " ") + ($limit ? "limit " + $limit : "");
  return $sql;
};

sql_insert = function(tbname) {
  var sql;
  sql = "INSERT INTO " + tbname + " SET ?";
  return sql;
};

sql_update = function(tbname, where, data) {
  var sql;
  sql = ("UPDATE " + tbname + " SET " + data + " ") + (where ? "WHERE " + where : "");
  return sql;
};

sql_count = function(tbname, where) {
  var sql;
  sql = ("SELECT count(id) as row_sum FROM `" + tbname + "` ") + (where != null ? " WHERE " + where : "");
  return sql;
};

copy_table = function(tbname, newtbname) {
  return "CREATE TABLE " + newtbname + " LIKE " + tbname;
};

exports.query = function(sql, callback) {
  console.log(sql);
  return connectionthis(function() {
    return this.query(sql, callback);
  });
};

exports.row_select = function(options, callback) {
  return connectionthis(function() {
    return this.query(sql_select(options), callback);
  });
};

exports.row_insert = function(tbname, data, callback) {
  return connectionthis(function() {
    console.log("insert: ", data);
    return this.query(sql_insert(tbname), data, callback);
  });
};

exports.row_update = function(tbname, data, where, callback) {
  return connectionthis(function() {
    return this.query(sql_update(tbname, where, data), callback);
  });
};

exports.row_count = function(tbname, where, callback) {
  console.log(sql_count(tbname, where));
  return connectionthis(function() {
    return this.query(sql_count(tbname, where), function(err, result) {
      return callback(err, result[0].row_sum);
    });
  });
};

exports.copy_table = function(tbname, newtbname, callback) {
  return connectionthis(function() {
    return this.query(copy_table(tbname, newtbname), callback);
  });
};

exports.check_table = function(tbname, callback) {
  return connectionthis(function() {
    return this.query("SHOW TABLES LIKE '" + tbname + "'", callback);
  });
};
