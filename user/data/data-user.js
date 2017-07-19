/*************************************************************************
This content is released under the MIT License : www.doxa.com/LICENSE.txt
    
************* What this module do *************

 *****************************************************************************/
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
    
    opinion : function()
    {
        var response = this.getResponseFormat(),
            date = new Date().toDateString(),
            txt = this.getText();
        
        /***************************************************
         *{ subarg, date, username , targetarg ,subargcontent} 
         ****************************************************/
        var txt = this.getText();
        
        response.opinion = [            
            {
            id : "111",
            date : date,
            position : txt.slice(1, 100),
            body : txt
            },
            {
            id : "222",
            date : date,
            position : txt.slice(1, 200),
            body : txt
            },
            {
            id : "333",
            date : date,
            position : txt.slice(1, 180),
            body : txt
            }
            
        ];
        
        return response;
    }
    
};
