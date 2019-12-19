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

        // //initialize date picker
        //     $('.datepicker').datepicker();

            //time picker initialization
        // $('.timepicker').timepicker();


    }); // end of document ready
})(jQuery); // end of jQuery name space

const datePicker = document.querySelector('.datepicker');
M.Datepicker.init(datePicker, {
    format: 'mmmm-dd-yyyy',
    autoClose: true
});

const timePicker = document.querySelector('.timepicker');
M.Timepicker.init(timePicker, {
    autoClose: true
})

// var options = {
//     i18n: inter_es,
// };
//
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.datepicker');
//     var instances = M.Datepicker.init(elems, options);
// });