var setupButtons = function(){
    $('button[type="submit"]').click(function(e){
    disableEditor();
    });
};
var enableEditor = function(){
    $('.ui-layout__section--primary').css("flex-basis","100%");
    // create new ace instance
    editor.session.setValue(textArea.value)
    // set theme
    editor.setTheme("ace/theme/textmate");
    // set mode
    editor.getSession().setMode("ace/mode/liquid");
    // set size
    editor.container.style.height = "600px";
    editor.container.style.width = "100%";
    // replace textarea with the editor
    textArea.parentNode.replaceChild(editor.container, textArea);
    // trigger redraw of the editor
    editor.getSession().setUseWrapMode(true);
    editor.resize();
    // enable button on change
    editor.getSession().on('change', function() {
        $('button[type="submit"]').removeClass('btn-disabled')
    });
};

var disableEditor = function(){
    var value = editor.getValue();
    var start = editor.session.doc.positionToIndex(editor.selection.getRange().start);
    var end   = editor.session.doc.positionToIndex(editor.selection.getRange().end);
    textArea.value = value;
    textArea.setSelectionRange(start, end);
    editor.container.parentNode.replaceChild(textArea, editor.container);
    editor.destroy();
};

$(document).on('ready page:load', function() {
    if (document.getElementById('email_template_body_html') != null){
        editor = ace.edit(document.createElement("div"));
        textArea = document.getElementById('email_template_body_html');
        enableEditor();
        setupButtons();
    }
});

var editor;
var textArea;
