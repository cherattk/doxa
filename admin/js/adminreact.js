/**********************************************************************
Released under MIT License : http://karimcheratt.me.pn/license.txt
************************************************************************/
window.doxa = window.doxa || {};

window.doxa.reaction = {
    
    // Development Mode
    testQuery : function(callback , getData , param){        
        if(getData){            
            callback(window.doxa.data[getData](param));
        }            
    },
    
    // Module's Setting
    getSetting : function()
    {        
        var dataHost = 'http://datahost.tld';
                    
        return {
            endpoint : {
                reaction : dataHost + '/path_1'
            }
        };
    },
    
    // attach the received Data To Application
    appendData :
    {
        listingReact : function(data)
        {
            var liste = document.getElementById('react-list');

            var max = data.length;

            for(var i = 0; i < max; i++) {

                arg = '<div class="grid">';        
                // arg description
                arg += '<table class="grid-desc">';
                arg += '<tr><td><label>Date</label></td><td>'+data[i].date+'</td></tr>';
                arg += '<tr><td><label>Par</label></td><td>'+data[i].username+'</td></tr>';
                arg += '<tr><td><label>Dans</label></td><td>'+data[i].pos+'</td></tr>';
                arg += '</table>';

                // arg content
                arg += '<div class="grid-content">';
                arg += '<p>'+data[i].reactcontent+'</p>';

                // topic control                        
                arg += '<div class="grid-ctrl" data-topic="'+data[i].reactid+'">';
                arg += '<button type="button" class="icon-del bt defaultbt">Supprimer</button>\n\
                        <button type="button" class="icon-mail bt defaultbt">Send Mail</button>\n\
                        </div>';

                // close arg content         
                arg += '</div>';                        
                // close grid
                arg += '</div>';

                liste.innerHTML += arg;
            }
        }
        
    },
    
    // Server Action
    httpGetListingReact : function()
    {
       var that = this,
            endpoint = this.getSetting()['endpoint']['reaction'],
            callback = function(reponse){                           
                if(reponse.status){                
                    that.appendData.listingReact(reponse.reactliste);
                };
            };
        
        this.testQuery(callback , "listingReaction");
        //$.getJSON(endpoint).done(function(reponse){callback(reponse);});
    },
    
    init : function() 
    {
        this.httpGetListingReact();
    }
};
// run module
window.doxa.reaction.init();

