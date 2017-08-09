
window.doxa = window.doxa || {};

window.doxa.adminpos = {
    
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
                position : dataHost + '/data'
            }
        };
    },
    
    // attach the received Data To Application
    appendData :
    {
        listingPos : function(data)
        {
            var pos_listing = document.getElementById('position-list'),
                arg = "",
                max = data.length;
        
                pos_listing.innerHTML = "";
            
            for (var i = 0 ; i < max ; i++) {

                arg = '<div class="grid">';        
                // arg description
                arg += '<table class="grid-desc">';
                arg += '<tr><td><label>Date</label></td><td>'+data[i].date+'</td></tr>';
                arg += '<tr><td><label>Par</label></td><td>'+data[i].username+'</td></tr>';
                arg += '<tr><td><label>Dans</label></td><td>'+data[i].question+'</td></tr>';
                arg += '</table>';

                // arg content
                arg += '<div class="grid-content">';
                arg += '<h4>'+data[i].argtitle+'</h4>';
                arg += '<p>'+data[i].argcontent+'</p>';

                // topic control                        
                arg += '<div class="grid-ctrl" data-topic="'+data[i].arg+'">';
                arg += '<button type="button" class="icon-del bt defaultbt">Supprimer</button>\n\
                        <button type="button" class="icon-mail bt defaultbt">Send Mail</button>\n\
                        </div>';

                // close arg         
                arg += '</div>';                        
                // close grid
                arg += '</div>';

                pos_listing.innerHTML += arg;
            }
        }
        
    },
    
    // Server Action
    httpGetListingPos : function()
    {
        var that = this,
            endpoint = this.getSetting()['endpoint']['position'],
            callback = function(reponse){                           
            if(reponse.status){                
                that.appendData.listingPos(reponse.argliste);
            };
        };
        
        this.testQuery(callback , "listingPos");
        //$.getJSON(endpoint).done(function(reponse){callback(reponse);});
        
    },
    
    init : function() 
    {
        this.httpGetListingPos();
    }
};
// run module
window.doxa.adminpos.init();

