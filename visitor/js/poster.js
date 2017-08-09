window.doxa = window.doxa || {};

window.doxa.poster = {
    
    getSetting : function(){
        
        /* get TOPIC ID FROM COOKIE */
        var host      = 'http://doxa.lan/data',
            posPath   = host + '/position',
            reactPath = host + '/reaction' ;
        
        return {
            endpoint : {
                posform : posPath,
                reactform : reactPath
            }          
        };
    },
    
    
    /******************************************************
                        Action Method
    ******************************************************/
    subflowEditor : function(){
                 
        var editor = document.getElementById('reactor');
        
//        var check = document.getElementById(this.getAttribute('data-side'));
//        if(check){check.click();}
        
        $('#' + this.getAttribute('data-position')).after(editor);
        editor.className = 'show';
        document.getElementById('reactform').elements['position'].value = this.getAttribute('data-position');
    },
    
    checkFormValue : function(fields){
                    
        // check argument content
        var rgx = /^$|^[\s|\r|\n]*$/g;
        var argcontent = this.elements['body'].value;

        // check radio button
        var radio = $( this.id + " input:radio:checked").length > 0;
        
        return (rgx.test(argcontent) || !radio);
    },
    
    inProgress : function(type){
        
        var icon = this.getElementsByClassName('formload')[0];
        
        var inload = !!type;
        
        if(inload){
            this.elements['submit'].disabled = "disabled";
            icon.style.display = "block";
            
        }else{
            this.elements['submit'].removeAttribute('disabled');
            icon.style.display = "none";
        }
    },
    
    /*********************************************
                       Server Call 
     *********************************************/
    
    pushComment : function(e){
        
        e.preventDefault();
        /*
         */   
        if(!window.doxa.poster.checkFormValue.call(this)){
                alert('bad input in form');
                return false;
            }
            
        window.doxa.poster.demoPush(this);
        return;
       
    
        /*  
        var form = this;
        var endpoint = window.doxa.poster.getSetting()['endpoint'][form.id],
        dataForm = $(form).serialize();

        console.log(dataForm);
        console.log(endpoint);
        
        var queryStatus = false , 
            queryMessage = 'error';
        
        jQuery.ajax({
            method :"post",
            url : endpoint, 
            data : dataForm,
            dataType : "JSON",
            beforeSend : function(){
                window.doxa.poster.inProgress.call(form , true);
            }
            // complete
        }).error(function(xhr){
                
              queryMessage += ' : ' + xhr.statusText;
              
        }).done(function(){
            queryStatus = true;
            queryMessage = 'Votre opinion a été ajoutée';
            form.reset();
            
            // change react-form position 
            // to prevent to be removed after reloading position flow
            $('#poseditor').after(document.getElementById('reactor'));
            // load position flow
            var recent = Date.now();
            window.doxa.topic.httpGetPositionFlow(recent);            

        }).always(function(xhr){
            window.doxa.poster.inProgress.call(form , false);                
            window.doxa.dialogue.setMessage(queryStatus , queryMessage);
            

            console.log('xhr : '+ xhr);
            console.log(xhr);

        });
        */
    },
    
    demoPush:function(form){
        
        var status = true,
            message = "votre opinion a été ajoutée";
        

        var timeout = null;
        var progress = this.inProgress;
        srvResponse = function(){

            clearTimeout(timeout);

            progress.call(form ,false);
            //reset
            form.reset();
            // change react-form position 
            // to prevent to be removed after reloading position flow
            $('#poseditor').after(document.getElementById('reactor'));
            
            // load position flow
            var recent = Date.now();
            window.doxa.topic.httpGetPositionFlow(recent);

            window.doxa.dialogue.setMessage(status , message);
        };

        progress.call(form ,true);
        //run query
        timeout = setTimeout(srvResponse, 1000);        
    },
    
    init:function(){
        
        // Position form
        var posform = document.getElementById('posform');
            posform.elements['topic'].value = $.cookie('topic');
            posform.onsubmit = this.pushComment;
            
        document.getElementById('reactform').onsubmit = this.pushComment;     
    }     
};

window.doxa.poster.init();
