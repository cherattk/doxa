/**********************************************************************
Released under MIT License : http://karimcheratt.me.pn/license.txt
************************************************************************/
window.doxa = window.doxa || {};

window.doxa.admintopic = {
    
    /*** For Dev Only ***/
    devData : function(callback , dataTest , param){        
        if(dataTest){            
            callback(window.doxa.data[dataTest](param));
        }
    },

    getSetting : function(){        
        var datahost = "http://adminer.doxa.lan/data";
        
        return {
            endpoint : {
                guihost :' http://guihost.tld',
                topic   : datahost + "/topic"
            }
        };
    },
    
    fillTopicEditor : function(topic, show){
        // Fill topic form
        if(topic){
            var collect = document.getElementById('topicform').elements;
                collect['topic'].value = topic.topicid;
                collect['question'].value = topic.question;
                collect['body'].value = topic.context;            
                collect['categorie'].value = topic.categorie;
            
        }
        
        if(show){
            document.getElementById('div-filter').style.display = "block";
            $('#topic-editor').show();
            $('#topic-listing').hide();
        }
        
        window.scrollTo(0,0);
    },
    
    topicAction : function(){
        //var that = this;                
        var action = {            
            gettopic : function(){
                alert('load topic');
            },
            
            deltopic : function(){
                
                alert("action : delete topic\ntopic-id = " + this.parentNode.getAttribute('data-topic'));
            },
            opentopic : function(){
                
                //var gui_host = that.getSetting()['endpoint']['guihost'];
                var gui_host = '../visitor/';
                var topic_path = this.parentNode.getAttribute('data-path');                
                var topic_url = gui_host + topic_path;                
                window.open(topic_url,'_blank');
            }
        };
        
        document.getElementById('topic-list').onclick = function(e){
                        
            if( e.target.tagName.toLowerCase() !== "button" ||
                !$.isFunction(action[e.target.value])){
                return false;
            }
            var fun = e.target.value;
            action[fun].call(e.target);
        };
    },
    
    appendData : {
        listingTopic : function(data)
        {
            var topic_listing = document.getElementById('topic-list'),            
                topic = '',
                max = data.length;
                             
            topic_listing.innerHTML = "";
            
            for (var i = 0 ; i < max ; i++) {
                
                topic = '<div class="grid">';
                // topic description
                topic += '<table class="grid-desc">';
                topic += '<tr><td><label>Categorie</label></td><td>'+data[i].categorie+'</td></tr>';
                topic += '<tr><td><label>Date</label></td><td>'+data[i].date+'</td></tr>';
                topic += '<tr><td><label>Question</label></td><td>'+ data[i].question + '</td></tr>';
                topic += '</table>';
                
                // topic content
                topic += '<div class="grid-content"><p>'+data[i].context+'</p>';
                    // topic control                        
                topic += '<div class="grid-ctrl"\
                                data-path="' + data[i].topicurl + '"' + 
                                'data-topic="' + data[i].topicid + '">';
                topic += '<button type="button"\
                                  value="gettopic"\
                                  class="icon-edit bt defaultbt">Editer</button>\
                          <button type="button" \
                                  value="deltopic"\
                                  class="icon-del bt defaultbt">Supprimer</button>\
                          <button type="button" \
                                  value="opentopic"\
                                  class="icon-link bt defaultbt">View</button>\
                         </div>';        
                // close topic content
                topic += '</div>';

                // close grid
                topic += '</div>';

                topic_listing.innerHTML += topic;
            }
        }
    },
    
    /****** Server Call ********/
    httpCreateTopic : function()
    {
        var that = this,
            endpoint = this.getSetting()['endpoint']['topic'],
            callback = function(data){                    
                if(data.status){
                    that.fillTopicEditor(data.topic, true);
                }else{
                    alert("error");
                }
            };
        
        var query = {
            method :"put",
            url:endpoint,
            dataType:"JSON",
            success:callback
        };
        
        this.devData(callback , "topic");
        //console.log(endpoint);return;
        //jQuery.ajax(query);
        
    },
    
    httpUpdateTopic : function()
    {
        var that = this,
            endpoint = this.getSetting()['endpoint']['topic'];

        
        $('#topicform').submit(function(e){
            e.preventDefault();
            var data = $(this).serialize(),
                callback = function(data){                    
                    if(data.status){
                        that.fillTopicEditor(data.topic);
                    }else{
                        alert("error");
                    }
                };

            //that.devData(callback , "topic");
            //console.log(data);return;

            jQuery.ajax({
                method :"post",
                url:endpoint,
                dataType:"JSON",
                success:callback
            });
            
            return false;                    
        });
        
    },
    
    httpGetTopic : function(topic_id)
    {
        var that = this,
            endpoint = this.getSetting()['endpoint']['topic'] + topic_id,            
            callback = function(data){                    
                if(data.status){
                    that.getTopicEditor(data.topic);
                }else{
                    alert("error");
                }
            };

            this.devData(callback , "topic");
            
            //$.getJSON(endpoint).done(function(reponse){callback(reponse);});
    },
    
    httpGetListingTopic : function(range)
    {
        var that = this,
            endpoint = this.getSetting()['endpoint']['topic'] + '/' + range,
            callback = function(reponse){                               
                if(reponse.status){                
                    that.appendData.listingTopic(reponse.topicliste);
                }
            };
        
        this.devData(callback , "listingTopic");            
        //$.getJSON(endpoint).done(function(reponse){callback(reponse);});
        
    },
    
    init:function()
    {        
        var that = this;
        
        document.getElementById('addtopic').onclick = function(){
            
            that.httpCreateTopic();
        };
        
        this.httpUpdateTopic();
        
        /* Load Data */
        this.httpGetListingTopic();
        
        /* listing's topic listener */
        this.topicAction();
    }
};
    
// Run Module
window.doxa.admintopic.init();
