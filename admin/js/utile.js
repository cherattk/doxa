/*************************************************************************
This content is released under the MIT License : www.doxa.com/LICENSE.txt
    
************* What this module do *************

 *****************************************************************************/
(function(doxa , $){
    
doxa.utile = {

    navigation:function(){

        $(".hnav").each(function(){
            
            this.onclick = function(e){

                if(e.target.tagName === "LI"){

                    var li_old_idx = this.getAttribute("data-idxli");

                    var li_check_idx = e.target.getAttribute('data-idx');

                    if(li_check_idx !== li_old_idx){

                    var li_old_el = this.getElementsByTagName('li')[li_old_idx - 1];
                    var t_mod = e.target.getAttribute("data-mod");

                    // display and hide module
                    $(t_mod).show();
                    $(this.getAttribute("data-div")).hide();

                    // styling navigation bar
                    $(e.target).toggleClass("check");
                    $(li_old_el).toggleClass("check");           

                    // store navigation state
                    this.setAttribute("data-div",t_mod);
                    this.setAttribute("data-idxli",li_check_idx);
                    }
                }
            };
        });
    },

    init:function(){

        this.navigation();

        //this.notification();
    }
};
    
    
// run
doxa.utile.init();
    
})(window.doxa = window.doxa || {} , jQuery);
