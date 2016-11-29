module.exports = {

    CalcDist: function (userLat, userLng, placeMap) {
        var m = module.exports;
        var R = 6371; // km

        var dLat = m.toRad(parseFloat(placeMap.regLat) - parseFloat(userLat));
        var dLon = m.toRad(parseFloat(placeMap.regLng) - parseFloat(userLng));
        var lat1 = m.toRad(parseFloat(userLat));
        var lat2 = m.toRad(parseFloat(placeMap.regLat));

        /*var dLat = m.toRad(parseFloat(placeMap.lat) - parseFloat(user.currentLat));
        var dLon = m.toRad(parseFloat(placeMap.lng) - parseFloat(user.currentLng));
        var lat1 = m.toRad(parseFloat(user.currentLat));
        var lat2 = m.toRad(parseFloat(placeMap.lat));*/

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    },

    toRad: function (value) {
        return value * Math.PI / 180;
    },

    translate: function (locals, lang) {
        if (lang === undefined || lang === "" || lang.length > 2)
            lang = "en";
        locals.setLocale(lang);
    }
}
