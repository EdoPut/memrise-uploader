'use strict';
function populate(targetColumn, callBack) {
    var myJson = {};
    $('.thing').each(
        function () {
            var word = $(this).children().find('.text').first().html();
            var button = $(this).find('button')[targetColumn - 1];
            myJson[word] = {
                'word': word,
                'id': $(this).attr('data-thing-id'),
                'hasFile': !($(button).hasClass('disabled'))
            };
        });

    callBack(myJson);
}

function comunication (myWord) {
    if( Object.getOwnPropertyNames(myWord).length > 0){
        self.port.emit('list populated', myWord);
    }
    else{
        self.port.emit('list empty');
    }
}

self.port.on('filetype', function () {
    // get asked to return which filetype the user is uploading
    if( $('#choice').prop('checked') ) {
        self.port.emit('audio');
    } else {
        self.port.emit('image');
    }
});

self.port.on('check', function (data) {
    // search for the correct column to upload
    self.port.emit('targetColumn', {
        'targetColumn' : $('td').filter(data.tipo).attr('data-key')
    });
});

self.port.on('populate', function (data) {
    populate(data.targetColumn, comunication);
});