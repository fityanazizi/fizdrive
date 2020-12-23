Dropzone.autoDiscover = false;
$("div#dropzone").dropzone({ 
    url: "/upload",
    method: 'post',
    success: function(){
        $('#files').empty();
        $.get('/files', function(data, status){
            $(data.files).each(function(i, val){
                let content = '<h2>'+
                    val.filename+
                    '<form method="get" action="/file/'+val.filename+'">'+
                    '<button class="button-blue full mb-1 mt-1" id="download'+val.fileId+'"'+
                    ' style="float: right;">Download</button></form>'+
                    '<button class="button-red full mb-2" id="delete'+val.fileId+'"'+
                    ' style="float: right;">Delete</button></h2>';
                $('#files').append(content);
            });
        });
    }
});
$(document).ready(function(){
    $.get('/files', function(data, status){
        $(data.files).each(function(i, val){
            let content = '<h2>'+
                val.filename+
                '<form method="get" action="/file/'+val.filename+'">'+
                '<button class="button-blue full mb-1 mt-1" id="download'+val.fileId+'"'+
                ' style="float: right;">Download</button></form>'+
                '<button class="button-red full mb-2" id="delete'+val.fileId+'"'+
                ' style="float: right;">Delete</button></h2>';
            $('#files').append(content);
        });
    });
});
$(document).on('click', 'button', function(){
    let stringId = $(this).attr('id').toString();
    let deleteId = stringId.substr(6);
    if(stringId.includes('delete')){
        $.ajax({
            url: '/delete/'+deleteId,
            type: 'delete',
            success: function(){
                $('#files').empty();
                $.get('/files', function(data, status){
                    $(data.files).each(function(i, val){
                        let content = '<h2>'+
                            val.filename+
                            '<form method="get" action="/file/'+val.filename+'">'+
                            '<button class="button-blue full mb-1 mt-1" id="download'+val.fileId+'"'+
                            ' style="float: right;">Download</button></form>'+
                            '<button class="button-red full mb-2" id="delete'+val.fileId+'"'+
                            ' style="float: right;">Delete</button></h2>';
                        $('#files').append(content);
                    });
                });
            }
        });
    }
});