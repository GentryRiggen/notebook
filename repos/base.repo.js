var db = require('../db');

var repo = function (tableName, model) {
  var baseRepo = {};

  baseRepo.getPaginatedParams = function (params) {
    var page = 'page' in params ? parseInt(params.page) : 1,
      pageSize = 'pageSize' in params ? parseInt(params.pageSize) : 5,
      skip = (page - 1) * pageSize;

    return { page: page, pageSize: pageSize, skip: skip };
  };

  baseRepo.getAll = function () {
    return db(tableName)
      .then(function (results) {
        var models = [];
        for (var i = 0; i < results.length; i++) {
          models.push(model.toJson(results[i]));
        }
        return models;
      });
  };

  baseRepo.getById = function (id, idField) {
    var selectField = idField ? idField : 'id';
    return db(tableName).where(selectField, id).first()
      .then(function (item) {
        return model.toJson(item);
      });
  };

  baseRepo.getByIds = function (idsArray, idField, orderByField, orderByDirection) {
    var selectField = idField ? idField : 'id';
    var query = db(tableName)
      .whereIn(selectField, idsArray);

    if (orderByField) {
      var direction = orderByDirection && (orderByDirection == 'ASC' || orderByDirection == 'DESC') ?
        orderByDirection : 'ASC';
      query.orderBy(orderByField, direction);
    }

    return query.then(function (results) {
      var modeledResults = [];
      results.forEach(function (result) {
        modeledResults.push(model.toJson(result));
      });

      return modeledResults;
    });
  };

  baseRepo.createOrUpdate = function (data, convert) {
    if (convert && model.fromJson) {
      data = model.fromJson(data);
    }
    var update = data.id > 0;
    if (!update) {
      delete data.id;
    }
    var query = update ? db(tableName).where('id', data.id).update(data) : db.insert(data).into(tableName).returning('id');
    return query.then(function (ids) {
      return update ? null : baseRepo.getById(ids[0]);
    });
  };

  baseRepo.del = function (id) {
    return db(tableName).where('id', id).del();
  };

  baseRepo.objectifySQLResult = function (results, collectionName) {
    var i,
      prop,
      roots = [],
      root = {},
      collection = [],
      currentId,
      collectionItem = {};
    for (i = 0; i < results.length; i++) {
      if (!currentId) {
        currentId = results[i].id;
      }

      if (currentId != results[i].id) {
        currentId = results[i].id;
        root[collectionName] = collection;
        roots.push(root);
        collection = [];
        root = {};
      }

      collectionItem = {};
      for (prop in results[i]) {
        if (prop.indexOf(collectionName) !== -1) {
          collectionItem[(prop.substr(collectionName.length + 1))] = results[i][prop];
        } else {
          root[prop] = results[i][prop];
        }
      }

      collection.push(collectionItem);
    }

    root[collectionName] = collection;
    roots.push(root);
    return roots;
  };

  return baseRepo;
};

module.exports = repo;
