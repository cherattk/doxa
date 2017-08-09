window.doxa = window.doxa || {};


window.doxa.data = {
    
    // Visitor DATA //
    dataFormat : function(){
        return  {status :true};
    },
    
    getTXT : function(){
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
    
    flow : function(){
        /**************  FLOW DATA FORMAT *****************
        data.flow = 
            [
               { position : int, // position-id
                username: string, 
                side: string, // value = {'1','right'}
                title : string, // value < 160
                },
            ]
        ****************************************************/
        
        var text = this.getTXT();
        
        var data = this.dataFormat();        
            data.flow = [
                {   position: "P1",
                    side:'1',
                    title : text.slice(0,100)
                },
//                {   position: "P2",
//                    side:'1',
//                    title : text.slice(0,120)
//                },
//                {   position: "P3",
//                    username:'Mrs Smith', 
//                    side:'1',
//                    title :text.slice(0,180)
//                }
            ];
            
        return data;
    },
    
    
    subflow : function(){
        /*************  SUBFLOW DATA FORMAT *************
        data.subflow = 
            [
                { username: string, // value < 50
                  side:string , // value = {'yes','not'}
                  text :  string // value < 500
                },
            ]
        **************************************************/
        
        var text = this.getTXT();
        
        //var pos = 'yes' ;
        var data = this.dataFormat();
            data.subflow = [
                    {
                        // position initiator : must be side:true
                        username:'Mr Smith',
                        side :'1',
                        body : text
                    },
                    {
                        username:'Mr Smith Jr',
                        side :'1',
                        body : text.concat(text)
                    },
                    /*
                    */
                    {
                        username:'John Doe',
                        side :'0',
                        body : text.concat(text)
                    }
                ];
                
            // case where there is not subflow
            //data.subflow = [];
        return data ;
    },
    
    topic : function(){
        /************* TOPIC DATA FORMAT *****************************
            data.topic = 
                {
                    topic : string, // topic-id
                    question : string, // value < 160
                    context : string , // value = 500                    
                    categorie : string // value = {ctg-1,...ctg-N}
                };
        ***************************************************************/
                 
        var text = this.getTXT();
        var data = this.dataFormat();
            data.topic = {
                    question : 'Lorem Ipsum is simply dummy text of'+
                                'the printing and typesetting industry',
                    context : text,
                    categorie : 'Sport'
                };
                
        return data;
    }
};
