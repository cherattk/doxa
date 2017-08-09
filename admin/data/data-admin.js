window.doxa = (window.doxa || {} );

window.doxa.data = {
        
    // Admin Data //
    getResponseFormat : function()
    {
        return  {status :true};
    },
    
    getText : function(){
        var str = 'Lorem ipsum dolor sit amet, consectetur adipiscing\
         elit. Cras id eros ut lacus rhoncus consectetur id non nisl. Praesent\
         posuere mauris in metus vestibulum eleifend. Quisque pulvinar eget augue\
         quis lacinia. Nulla eget ligula commodo, iaculis enim vitae, scelerisque\
         sapien. Integer in elementum neque, vitae sagittis sem. Curabitur \
         Vestibulum sem libero, tempor et porttitor accumsan, bibendum eget nisi. \
        Proin mattis vel lacus euismod fringilla. Nullam eu porta mi. Sed et nisl\
         maximus dui venenatis imperdiet. Vivamus porta ut ante et egestas. Proin \
        sapien sapien, ultrices quis dictum nec, dapibus ut mi. Etiam et tempor erat,\
         id vulputate ligula.';
        
        return str.trim().replace(/\s{2,}|\n/g , ' ');
        
    },
    
    listingTopic : function()
    {
        
        var response = this.getResponseFormat(),
            date = new Date().toDateString(),
            txt = this.getText();
        
        /*****************************************************
         * { topic , date , question ,  context , categorie }
         *****************************************************/ 
        response.topicliste =  [
            {
            topicid : "111",
            date : date,
            question : "Super Question title",
            context : txt,
            categorie : "Societe",
            topicurl : 'topic.html'
            },
            {
            topicid : "222",/* topic id*/
            date : date,
            question : "Super Question title",
            context : txt,
            categorie : "Culture",
            topicurl : 'topic.html'
            },
            {
            topicid : "333",/* topic id*/
            date : date,
            question : "Super Question title",
            context : txt,
            categorie : "Monde",
            topicurl : 'topic.html'
            }
        ];
        
        return response;     
    },
    
    listingPos : function()
    {        
        var response = this.getResponseFormat(),
            date = new Date().toDateString(),
            txt = this.getText();
        
        /***************************************************************
         * {arg , date , username , question, argtitle , argcontent }
         **************************************************************/
        response.argliste =  [
            {
            arg : "111",
            date : date,
            username : "John Doe",
            question:txt.slice(1, 100),
            argtitle : txt.slice(1, 100),
            argcontent : txt
            },
            {
            arg : "222",/* arg id*/
            date : date,
            username : "John Doe",
            question: txt.slice(1, 50),
            argtitle : txt.slice(1, 100),
            argcontent : txt
            },
            {
            arg : "333",/* arg id*/
            date : date,
            username : "John Doe",
            question:txt.slice(1, 100),
            argtitle : txt.slice(1, 50),
            argcontent : txt
            }
        ];
        
        return response;   
    },
    
    listingReaction : function()
    {
        var response = this.getResponseFormat(),
            date = new Date().toDateString(),
            txt = this.getText();
        
        /***************************************************
         *{ subarg, date, username , targetarg ,subargcontent} 
         ****************************************************/
        var txt = this.getText();
        
        response.reactliste = [            
            {
            reactid : "111",
            date : date,
            username : "John Doe",
            pos : txt.slice(1, 100),
            reactcontent : txt
            },
            {
            reactid : "222",/* arg id*/
            date : date,
            username : "John Doe",
            pos : txt.slice(1, 100),
            reactcontent : txt
            },
            {
            reactid : "333",/* arg id*/
            date : date,
            username : "John Doe",
            pos : txt.slice(1, 100),
            reactcontent : txt
            }
            
        ];
        
        return response;
    },
    
    topic : function(){
        
        var response = this.getResponseFormat();
        
        var txt = this.getText();
        
        /************************************************
         * {topic , date , question , context, categorie}
         ************************************************/
        response.topic = {
            topicid : "111",
            categorie : "Culture",
            choice : "",
            question : txt.slice(1, 100),
            context : txt,
            date : new Date().toDateString()
        };
        return response;
    }
    
};
