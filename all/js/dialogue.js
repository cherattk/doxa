window.doxa = window.doxa || {};

window.doxa.dialogue = {
    
    dialBox : function(){
        
        var box = document.getElementById('ajaxmsg');
    
        if(box){
            return box;
            
        }else {
            
        var  boxFilter = document.getElementById('div-filter');
        
            box = document.createElement('DIV');
            box.id = "ajaxmsg";
            box.style.display = "none";
            box.className = "modalbox";
            box.innerHTML += '<span id="closebox">x</span><div></div>';
    
            box.onclick = function(e){
              
                if(e.target.id === 'closebox'){
                    boxFilter.style.display = 'none';
                    this.style.display = 'none';
                }
            };
            
            boxFilter.appendChild(box);
            
            return box;
        }

            
    },
    
    setMessage : function(status , message){

        var box = this.dialBox(),
            statusStyle = status ? "icon-success" : "icon-error";            
        
        var content = box.getElementsByTagName('DIV')[0];
            content.innerHTML = '<span class="' + statusStyle + '"></span>';
            content.innerHTML += '<p>' + message + '</p>';
            
            
       //display
        box.style.display = "block";
        box.parentNode.style.display = "block";
        
        window.scrollTo(0, 0);
    },
    
    loginBox : function(){
      
        
    },
    
    init : function(){
        this.dialBox();
    }
};

window.doxa.dialogue.init();