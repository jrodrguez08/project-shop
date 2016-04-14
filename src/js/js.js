$(document).ready(function () {

    $(document).on("keypress", "#clientCard", function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            $.alert("Por favor ingrese sólo números", {
                closeTime: 3000,
                position: ['center']

            });
            return false;
        }
    });

});