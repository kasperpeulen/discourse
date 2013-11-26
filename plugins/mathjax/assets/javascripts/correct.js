(function() {
function correct(searchString, replaceString) {
    $("textarea").bind("keyup", function () {
        var $input = $(this),text = $input.val();
        var pos = $('textarea').prop("selectionStart");
        if (new RegExp(searchString).test(text.substring(pos-searchString.length,pos)) == true) {
            var newText = text.substring(0,pos-searchString.length) + replaceString + text.substring(pos);
            $input.val(newText);
            var newpos = pos - searchString.length + replaceString.length;
            this.setSelectionRange(newpos,newpos);
        }
    });
}
correct(",,", "′");
})();