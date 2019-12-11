(function ($) {
    $(function () {
        //get modal trigger
        let openModal = document.querySelector(".open-modal");

        openModal.addEventListener("click", () => {
            //initialize all modals
            $('.modal').modal();

            //now you can open modal from code
            $('#modal1').modal('open');

            //or by click on trigger
            $('.trigger-modal').modal();
        });


    }); // end of document ready
})(jQuery); // end of jQuery name space