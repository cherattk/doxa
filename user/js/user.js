window.doxa = window.doxa || {};

window.doxa.module = {
    
    // Development Mode
    devData : function(callback , data){
        callback(window.doxa.data[data]());
    },
    
    // Module's Setting
    getSetting : function()
    {        
        var dataPath = 'www.myapp.com';
                    
        return {
            endpoint : {
                opinion : dataPath + '/path_1',
                endpoint_2 : dataPath + '/path_2'
            }
        };
    },
    
    selectFile : function(){
               
        var allForms = document.querySelectorAll(".selectfile");
	    
        var selectImage =  function(){
            
            var elements = this.elements;
            
            elements['browse'].onclick = function(){
                
                elements['file'].click();
            };

            elements['file'].onchange = function(){

                if(this.value == ""){ return;}
                
                elements['browse'].style.display = "none";
                elements['save'].style.display = "block";
                elements['cancel'].style.display = "block";
                
            }; 
            
            this.onsubmit = function(e){
                
                //e.preventDefault();
                
                if(elements['file'].value === ""){
                    e.preventDefault();
                    alert('You Must choose a file');
                    return;
                }
                
                this.action = this.getAttribute("data-action");
            };
            
            this.onreset = function(){
                
                elements['save'].style.display = "none";
                elements['cancel'].style.display = "none";                
                elements['browse'].style.display = "block";
            };
        };
        
        // attache select file handler
        for(var i = 0 , max = allForms.length ; i < max  ; i++){            
                selectImage.call(allForms[i]);                                  
        };
        
    },
    
    // attach the received Data To Application
    appendData :
    {
        listingOpinion : function(data)
        {
            var liste = document.getElementById('opinion-list');

            var max = data.length;

            for(var i = 0; i < max; i++) {

                arg = '<div class="grid">';        
                // arg description
                arg += '<table class="grid-desc">';
                arg += '<tr><td><label>Date</label></td><td>'+data[i].date+'</td></tr>';
                arg += '<tr><td><label>Dans</label></td><td>'+data[i].position+'</td></tr>';
                arg += '</table>';

                // arg content
                arg += '<div class="grid-content">';
                arg += '<p>'+data[i].body+'</p>';

                /*
                // topic control                        
                arg += '<div class="grid-ctrl" data-opinion="'+data[i].id+'">';
                arg += '<button type="button" class="icon-del bt greybt">Supprimer</button>\n\
                        <button type="button" class="icon-mail bt greybt">Send Mail</button>\n\
                        </div>';
                        */
                       
                // close arg content         
                arg += '</div>';                        
                // close grid
                arg += '</div>';

                liste.innerHTML += arg;
            }
        }
        
    },
    
    // Server Action
    httpGetOpinion : function()
    {
       var that = this,
            endpoint = this.getSetting()['endpoint']['opinion'],
            callback = function(reponse){                           
                if(reponse.status){                
                    that.appendData.listingOpinion(reponse.opinion);
                };
            };
        
        this.devData(callback , "opinion");
        //$.getJSON(endpoint).done(function(reponse){callback(reponse);});
    },
    
    init : function() 
    {        
        this.httpGetOpinion();
        this.selectFile();
    }
};
// run module
window.doxa.module.init();

