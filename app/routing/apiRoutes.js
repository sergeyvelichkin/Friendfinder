var express = require('express');
var router = express.Router();
var path = require('path');
var friends = require('../data/friends')

router.get('/api/friends', function (req, res) {

    res.send(friends.arr)

});

router.post('/api/friends', function (req, res) {
    let newChar = req.body;

    let newCharArr = (newChar.scores).map(function (x) {
        return parseInt(x, 10);
    });
    
    function matcher(firstArr, secondArr) {
        let result = 0;
        for (var i = 0; i < firstArr.length; i++) {
            result += Math.abs(firstArr[i] - secondArr[i]);
        }
        return result
    }


    function matcher2() {

        let theOne = {
            "name": "nothing",
            "photo": "url"
        }
        let bestMatch = 0;


        for (var j = 0; j < (friends.arr).length; j++) {
            var friendArr = (friends.arr[j].scores).map(function (x) {
                return parseInt(x, 10);
            });
            var check = matcher(newCharArr, friendArr);

            if (bestMatch == 0) {
                check = bestMatch;
                theOne['name'] = friends.arr[j].name;
                theOne['photo'] = friends.arr[j].photo;
            }

            else if (check < bestMatch) {
                check = bestMatch;
                theOne['name'] = friends.arr[j].name;
                theOne['photo'] = friends.arr[j].photo;
            };

        };
        return theOne;
    }

    let theMan = matcher2();

    console.log(theMan);
    (friends.arr).push(newChar);

    res.json(theMan);

});

module.exports = router;