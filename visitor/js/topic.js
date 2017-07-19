/**********************************************************************
Released under MIT License : http://karimcheratt.me.pn/license.txt
 **********************************************************************/
window.doxa = window.doxa || {};

window.doxa.topic = {
    
    /*** For Dev Only ***/
    devData : function(callback , data){
        callback(window.doxa.data[data]());
    },
    
    // Topic's Module Setting
    getSetting : function()
    {
        /* get TOPIC ID FROM COOKIE 
         * use cookie jQuery plugin
         * https://plugins.jquery.com/cookie/
         * */
        var topic_id =  $.cookie('topic');
        
        var host      = 'http://doxa.lan/data',
            topicPath = host + '/topic/' + topic_id,
            posPath   = host + '/position/' + topic_id + '/range/',
            reactPath = host + '/reaction' ;
        
        
        return { endpoint : {
                topic : topicPath,
                position : posPath,
                reaction : reactPath
            }};
    },
    
    /*********************************
            * Browser Action *
    *********************************/    
    
    flowNav:function()
    {
        var old = null;
        var old_div = null;
        
        $('#flownav').find('input[name="flownav"]').each(function() {
            
            this.onchange =  function(){
                
                if(old && (old.id !== this.id)){
                    $(this).toggleClass('check');
                    $(old).toggleClass('check');
                    document.getElementById(this.value).style.display='block';
                    document.getElementById(old_div).style.display='none';

                    old_div = this.value;
                    old = this;
                }
            };

            if(this.checked) {
                $(this).toggleClass('check');
                old_div = this.value;
                document.getElementById(this.value).style.display='block';
                old = this;
            }
        });
    },
    
    flowAction : function()
    {
        var that = this,
            flag = function(){
            alert("Do Something With This Flag");
            },
            like = function() {
                    alert("Do Something With This Heart");
            };
        
        $('#flow').on('click' , function(e){
            
            if(e.target.tagName === 'SPAN' && e.target.parentNode.tagName === 'H2')
            {
                e.target.parentNode.click();
                return;
            }
            
            if(e.target.tagName === 'H2')
            {                
               // open-close subflow tree
                $(e.target.parentNode).toggleClass('open');
                
                if(e.target.getAttribute('data-init') === 'false')
                {
                    var lastindex = Date.now();
                    that.httpGetReactionFlow(e.target.id, lastindex , $(e.target.parentNode).next());
                    e.target.setAttribute('data-init' , 'true');
                }
            }
            
            else if(e.target.className === 'icon-flag')
            {
                flag();
            }
            else if(e.target.className === 'icon-heart')
            {
                like();
            }
            else if(e.target.className === 'icon-edit')
            {
                if(typeof window.doxa.poster !== 'undefined')
                {
                      window.doxa.poster.subflowEditor.call(e.target);
//                    inlineEditor.call(e.target);
                }
                else
                {                    
                    alert('please connect');
                }
            }
            
        });
    },
    
    appendData :
    {        
        topic : function(data){
            var topic = document.getElementById('topic');
            
            topicHTML = '<p><label>Question&nbsp;:&nbsp;</label>'
                        + data.question + '</p>' 
                        + '<p><label>Contexte&nbsp;:&nbsp;</label>'
                        + data.context + '</p>';
    
            topic.innerHTML =  topicHTML;
        },

        flowlist :  function(data)
        {        
            var flow = {
                    '1':'',
                    '0' :''
                },
                grid = '',
                empty = '<div class="empty-flow cart"><p>Empty State</p></div>';
            
            for(var i = 0 , max = data.length ; i < max ; i++){

                grid  = '<div class="arg cart">';
                grid += '<div class="flowhead"><h2 data-init="false" id="'+data[i].position+'">\
                         <span class="icon">\
                            <span class="plus"></span><span class="minus"></span>\
                         </span>' + data[i].title + '</h2></div>';

                // subflow editor
//                grid += '<div class="subeditor"></div>';
                
                // Start Flow
                grid += '<div class="subflow">\
                         <ul><li class="in-arg">\
                            <h3>Argument</h3>\
                            <span class="icon-edit" data-side="check-yes" \
                                data-position="'+data[i].position+'">\
                             <span class="block-arrow right-arrow">\
                                Ajouter un argument</span>\
                            </span>\
                            </li>\
                        <li class="out-arg">\
                            <h3>Contre Argument</h3>\
                            <span class="icon-edit" data-side="check-no" \
                                    data-position="'+data[i].position+'">\
                            <span class="block-arrow right-arrow">\
                                Réfuter un argument</span>\
                            </span>\
                            </li>\
                        <li class="splitline"></li>\
                        </ul>\
                        </div>\
                        </div>';

                if(data[i].side === '1' || data[i].side === '0'){                
                    flow[data[i].side] += grid;
                }            
            }
            
            document.getElementById('flowleft').innerHTML = flow['1'] ? flow['1'] : empty;
            document.getElementById('flowright').innerHTML = flow['0'] ? flow['0'] : empty;
        },
        
        subflowlist : function(data , treeflow)
        {                
            // treeflow = <ul>
            var tree =  $(treeflow).children('li'),
                grid = '',
                subflow = {
                    '1' : '',
                    '0' :''
                },
                empty = '<div class="empty-subflow"><p>Empty</p></div>';
            
            for(var i = 0  , max = data.length ; i < max ; i++){
                
                grid = '<div class="arg-content">\
                        <div class="vote">\
                        <span class="icon-heart"></span>\
                        <span class="icon-flag"></span>\
                        </div>';
                grid += '<label>' + data[i].username + '</label>';
                grid += '<p>' + data[i].body + '</p></div>';
                
                if(data[i].side  === '1' || data[i].side  === '0')
                {
                   subflow[data[i].side] += grid ;
                }                
            }
            
            tree[0].innerHTML += subflow['1'] ? subflow['1'] : empty;
            tree[1].innerHTML += subflow['0'] ? subflow['0'] : empty;
            
            if(data.length > 2 )
            {
                $(treeflow).after('<button type="button" class="getmore">get more</button>');
            }
        }
    },
    
    /******************************************
              * Server Call *
    *******************************************/
    httpGetTopic : function(){
        
        var that = this,
            endpoint = this.getSetting()['endpoint']['topic'],
            renderData = this.appendData.topic,
            callback = function(response){
                
                //console.log( 'httpGetFlow : '+ this);return;                
                if(response.status){                    
                    renderData(response.topic);
                    // load position flow
                    var recent = Date.now();
                    that.httpGetPositionFlow(recent);
                }
            };
              
        this.devData(callback , 'topic');
//        jQuery.getJSON(endpoint).done(function(response){callback(response);});
        
    },
    
    /* Load Position Flow */
    httpGetPositionFlow : function(lastIndex)
    {
        var renderData = this.appendData.flowlist,
            endpoint = this.getSetting()['endpoint']['position'] + lastIndex,
            callback = function(response){
                
                //console.log( 'httpGetFlow : '+ this);return;                
                if(response.status){                    
                    renderData(response.flow);
                }
            };
            
        this.devData(callback , 'flow');        
//        jQuery.getJSON(endpoint).done(function(response){callback(response);});      
        
    },
    
    httpGetReactionFlow : function(position_id, range , treeDiv /* treeDiv == jQuery Obj */)
    {   
        var liste_range = range ? parseInt(range) : 1; // 
                
        var renderData = this.appendData.subflowlist,
            endpoint = this.getSetting()['endpoint']['reaction'] + '/'
                        + position_id + '/range/' + liste_range,
                        
            callback = function(response){                
                //argdiv.setAttribute('data-init' , '1');

                if(response.status){                    
                    renderData(response.subflow , treeDiv.children('ul'));
                }
        };
//        
        this.devData(callback , 'subflow');
//        jQuery.getJSON(endpoint).done(function(response){ callback(response); });
        
    },
    
    init:function()
    {          
        // navigation action
        this.flowNav();
        
        // event listener
        this.flowAction();
        
        this.httpGetTopic();
        
        /* shorten plugin must be initialized after 
        // appending data to DOM tree
        s =  document.createElement('script');
        s.type   = 'text/javascript';
        s.src    = '../any/js/vendor/shorten/shorten.1.0.js';         
        s.onload = function(){

            $('.split').shorten({showChars:444});
        };
        document.getElementsByTagName('head')[0].appendChild(s);
        */
    }
    
    /*
    loadFormStyle:function()
    {        
        var browser = 'http://browser.doxa.lan',
            frm = $('#slideform').children('div'),
            cssFile = (frm.id === 'editdiv' ? 'editor.css' :'login.css');
            
        var cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.type = 'text/css';
            cssLink.href = browser + '/visitor/css/' + cssFile;
        
        document.getElementsByTagName('head')[0].appendChild(cssLink);
            
    },
    */
};

//required 
window.doxa.topic.init();