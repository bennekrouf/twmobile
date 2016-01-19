var db = require('./pghelper'),
    Q = require('q'),
    wallet = require('./wallet'),
    wishlist = require('./wishlist');

/**
 * Add activity
 * @param req
 * @param res
 * @param next
 */
function addItem(req, res, next) {
  console.log('Adding activity req.body: ' + JSON.stringify(req.body));
    var userId = req.externalUserId, activity = req.body;

    getPointBalance(userId)
        .then(function(result) {
            var balance = (result && result.points) ? result.points : 0;

            console.log("IN getPointBalance / addItem / getPointBalance, activity.offerId, activity.productId, activity.type, activity.points, activity.name, activity.image",

            userId, activity.offerId, activity.productId, activity.type, activity.points, activity.name, activity.image);

            // db.query('INSERT INTO salesforce.interaction__c (contact_orsay__c, campaign__c, product__c, type__c, points__c, name__c, picture__c) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            //         [userId, activity.offerId, activity.productId, activity.type, activity.points, activity.name, activity.image], true)
            // .then(function() {
            //     res.send({originalBalance: balance, points: activity.points, newBalance: balance + activity.points, originalStatus: getStatus(balance), newStatus: getStatus(balance + activity.points)});
            // })
            // .catch(function(err){
            //   console.log("error in insert getPointBalance : ", err);
            //   next();
            // });
            db.query('INSERT INTO salesforce.interaction__c (contact_orsay__c, campaign__c, product__c, type__c, points__c) VALUES ($1, $2, $3, $4, $5)',
                    [userId, activity.offerId, activity.productId, activity.type, activity.points], true)
            .then(function() {
                res.send({originalBalance: balance, points: activity.points, newBalance: balance + activity.points, originalStatus: getStatus(balance), newStatus: getStatus(balance + activity.points)});
            })
            .catch(function(err){
              console.log("error in insert getPointBalance : ", err);
              next();
            });
        })
        .catch(next);

}

/**
 * Get user's recent activity
 * @param req
 * @param res
 * @param next
 */
function getItems(req, res, next) {
  console.log('Activities - getItems:' + externalUserId);

    var externalUserId = req.externalUserId;

    db.query("SELECT contact_orsay__c AS userId, campaign__c AS campaign, type__c AS type, name__c as name, picture__c as picture, points__c as points, createdDate FROM salesforce.interaction__c WHERE contact_orsay__c=$1 ORDER BY id DESC LIMIT 20", [externalUserId])
        .then(function (activities) {
            console.log(JSON.stringify(activities));
            return res.send(JSON.stringify(activities));
        })
        .catch(next);
}

/**
 * Delete all activities for logged in user. Used for demo purpose to reset activities and start demo with empty list.
 * Also deletes user's wallet and wish list for consistency.
 * @param req
 * @param res
 * @param next
 */
function deleteAll(req, res, next) {
  console.log('Activities - deleteAll:' + externalUserId);
    var externalUserId = req.externalUserId,
        userId = req.userId;

    Q.all([deleteItems(externalUserId), wallet.deleteItems(userId), wishlist.deleteItems(userId)])
        .then(function () {
            return res.send('ok');
        })
        .catch(next);
}

/**
 * Delete all activities for the given user
 * @param userId
 * @returns {*}
 */
function deleteItems(userId) {
    console.log('deleting activity items for user ' + userId);
    return db.query("DELETE FROM salesforce.interaction__c WHERE contact_orsay__c=$1", [userId]);
}

/**
 * Get user's point balance
 * @param userId
 * @returns {*}
 */
function getPointBalance(userId) {
  console.log('getPointBalance activity items for user ' + userId);

    return db.query('select sum(points__c) as points from salesforce.interaction__c where contact_orsay__c=$1', [userId], true);
}

/**
 * Returns status level based on number of points
 * @param points
 * @returns {number}
 */
function getStatus(points) {
    if (points>9999) {
        return 3;
    } else if (points>4999) {
        return 2;
    } else {
        return 1;
    }
}

exports.getItems = getItems;
exports.addItem = addItem;
exports.getPointBalance = getPointBalance;
exports.getStatus = getStatus;
exports.deleteAll = deleteAll;
