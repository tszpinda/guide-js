QUnit.test( "findDomain", function( assert ) {
    var tutThem = new TutThem();
    assert.equal(tutThem.findDomain("http://onet.pl?john"),     "onet.pl");
    assert.equal(tutThem.findDomain("http://onet.pl"),          "onet.pl");
    assert.equal(tutThem.findDomain("http://onet.pl/"),         "onet.pl");
    assert.equal(tutThem.findDomain("http://onet.pl#/john"),    "onet.pl");
    assert.equal(tutThem.findDomain("https://onet.pl?john"),     "onet.pl");
    assert.equal(tutThem.findDomain("https://onet.pl"),          "onet.pl");
    assert.equal(tutThem.findDomain("https://onet.pl/"),         "onet.pl");
    assert.equal(tutThem.findDomain("https://onet.pl#/john"),    "onet.pl");

});
