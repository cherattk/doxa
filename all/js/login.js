window.doxa = window.doxa || {};

window.doxa.auth = {
    
    // Development Mode
    devData : function(callback , data){
        
        callback(window.data[data]());
    },
    
    // Module's Setting
    getSetting : function()
    {        
        var host = 'http://doxa.lan';
                    
        return {
            endpoint : {
                loginform : host + '/login',
                signinform : host + '/signin'
            }
        };
    },
    
    ajaxProgress : function(progress){
        
        var icon = this.getElementsByClassName('formload')[0];
        
        var inload = !!progress;
        
        if(inload){
            this.elements['submit'].disabled = "disabled";
            icon.style.display = "block";
            
        }else{
            this.elements['submit'].removeAttribute('disabled');
            icon.style.display = "none";
        }
    },
    
    
    callback : {
        
        loginform : function(response){

            if(response.status){
                
                window.location.reload(true);
                
            }else{
                var msg = this.getElementsByClassName('badmsg')[0],
                    msgText = response.message;
            
                if(typeof msg === 'undefined'){

                    msg = document.createElement('P');
                    msg.className = "badmsg";
                    this.insertBefore(msg , this.getElementsByClassName('sendform')[0]);

                }else {
                    msg.style.display = "block";
                   
                }
                
                msg.innerHTML = msgText;
            }
        },
        signinform : function(){

        }
    },
            
    // Server Action
    httpAuth: function(e)
    {
        // file : login.js
        e.preventDefault();
        
        var form = this;
        var endpoint = window.doxa.auth.getSetting()['endpoint'][form.id],
            dataForm = $(form).serialize(),
            callback = window.doxa.auth.callback[form.id];
            
        window.doxa.auth.demoAuth(form);  return;
        
        
        jQuery.ajax({
            method :"post",
            url : endpoint, 
            data : dataForm,
            dataType : "JSON",
            beforeSend : function(){
                window.doxa.auth.ajaxProgress.call(form , true);
            }
            
            // complete
        }).error(function(xhr){
                
              var queryMessage = ' Error : ' + xhr.statusText;
              console.log(queryMessage);
              
        }).done(function(response , txtStatus , xhr){
           
            callback.call(form , response);

        }).always(function(xhr){
            
            window.doxa.auth.ajaxProgress.call(form , false);
        });
        
    },
    
    demoAuth : function(form){
        
        var timeout = null,
            callback = window.doxa.auth.callback[form.id];
        
        srvResponse = function(){

            clearTimeout(timeout);

            window.doxa.auth.ajaxProgress.call(form ,false);
            
            callback.call(form , {status:false, message:'bad user name'});

        };

        window.doxa.auth.ajaxProgress.call(form ,true);
        //run query
        timeout = setTimeout(srvResponse, 1000);   
        
    },
    
    init : function() 
    { 
        document.getElementById('loginform').onsubmit = this.httpAuth;
        document.getElementById('signinform').onsubmit = this.httpAuth;
    }
};
// run module
window.doxa.auth.init();

